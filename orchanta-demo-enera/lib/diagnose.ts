// diagnose.ts — the demo's "intelligence". A transparent diagnosis engine: it reads a failed
// session's telemetry, identifies the root cause from Enera's failure taxonomy, and produces a
// resolution action + a driver-facing message. Deterministic (reliable, no API key).
//
// PRODUCTION NOTE: in a live build this maps cleanly onto an LLM agent — swap `diagnose()` for a
// Claude call via @ai-sdk/anthropic with the telemetry as structured context and the resolution
// actions as tools. The UI/flow stays identical.

import type { Session, Channel } from "./data";

export interface Diagnosis {
  rootCause: string;
  confidence: number;
  evidence: string[];
  steps: string[];
  action: string;
  driverMessage: string;
  eta: string;
}

const CHANNEL_VERB: Record<Channel, string> = {
  call: "read back to the driver on the live call",
  whatsapp: "sent to the driver on WhatsApp",
  email: "emailed to the driver",
};

export function diagnose(s: Session): Diagnosis {
  const t = s.telemetry;
  const sentTo = s.channel ? CHANNEL_VERB[s.channel] : "sent to the driver";

  switch (s.failure) {
    case "RFID_UNREAD":
      return {
        rootCause: "RFID tag is not linked to an account, so authorisation never completes — the charger stays in Preparing and never energises.",
        confidence: 96,
        evidence: [
          `RFID: ${t?.rfid}`,
          `Connector: ${t?.connectorState}`,
          `OCPP: ${t?.ocpp}`,
        ],
        steps: [
          "Reading session telemetry for stall " + s.stall + " at " + s.site + "…",
          "RFID tag E1A2-7F returned 3 failed reads with no account match → not a hardware fault.",
          "Connector is healthy (plugged, Preparing) and firmware heartbeat is current → charger is fine.",
          "Root cause is authorisation, not the charger. Remote-authorising this session bypasses the unmatched tag.",
        ],
        action: "Issued a remote RemoteStartTransaction for stall 04 (account resolved by vehicle + bay), bypassing the unmatched RFID tag.",
        driverMessage:
          "Hi — sorted it from our side. You don't need to tap again. I've started the session remotely on Stall 04; the cable will click and charging begins in ~10 seconds. Sorry for the hassle!",
        eta: "~15s to energise",
      };

    case "PAYMENT_DECLINED":
      return {
        rootCause: "Pre-authorisation was declined by the card issuer (code 51 — hold/insufficient funds), not by the charger. The bay is ready; only the payment hold is blocking it.",
        confidence: 93,
        evidence: [
          `Payment: ${t?.payment}`,
          `Connector: ${t?.connectorState}`,
          `RFID: ${t?.rfid}`,
        ],
        steps: [
          "Reading payment + connector telemetry for stall " + s.stall + "…",
          "Issuer returned code 51 on a £35 pre-auth → bank-side hold, charger is healthy.",
          "Driver is time-pressured (from their message) → offer an instant alternative, don't make them re-queue.",
          "Lower the pre-auth to £15 and send a one-tap payment link to a backup method.",
        ],
        action: "Re-issued the pre-auth at £15 and generated a one-tap Apple Pay / card link for stall 02.",
        driverMessage:
          "That decline was your bank's pre-authorisation hold, not the charger. I've lowered the hold to £15 — here's a one-tap link to start right now: voltway.app/pay/VW-2268. You'll be charging in under a minute.",
        eta: "~45s after driver taps link",
      };

    case "CONNECTOR_LOCK_JAM":
      return {
        rootCause: "Charging completed normally but the connector lock actuator failed to release, trapping the cable. Purely mechanical — a remote unlock cycle clears it.",
        confidence: 95,
        evidence: [
          `Connector: ${t?.connectorState}`,
          `OCPP: ${t?.ocpp}`,
          `Payment: ${t?.payment} · session billed correctly`,
        ],
        steps: [
          "Charge is complete (80% SoC, £24.10 captured) → billing is fine, this is a release fault.",
          "ConnectorLockFailure after 2 actuator attempts → send a remote UnlockConnector before escalating to a truck-roll.",
          "Driver is physically stuck at the bay → respond immediately with clear instructions.",
        ],
        action: "Sent a remote UnlockConnector command to stall 09 (cycle the lock), and flagged the actuator for preventive maintenance.",
        driverMessage:
          "Thanks for your patience — your charge finished fine (you're all paid up). I've just released the lock remotely; give the cable a firm pull now and it'll come free. I've also logged that connector for a check so it won't happen again.",
        eta: "immediate",
      };

    case "HANDSHAKE_TIMEOUT":
      return {
        rootCause: "The ISO 15118 / SLAC handshake is timing out on the release-candidate firmware (v3.9.0-rc) at this site — the vehicle and charger never finish negotiating, so charging aborts.",
        confidence: 88,
        evidence: [
          `OCPP: ${t?.ocpp}`,
          `Firmware: ${t?.firmware}`,
          `Connector: ${t?.connectorState}`,
        ],
        steps: [
          "Handshake aborts at 30s with SLAC failure → negotiation layer, not payment or auth.",
          "This stall is on firmware v3.9.0-rc; matching the pattern across other -rc units at Bristol.",
          "Remote-reset the connector to force a clean re-negotiation, and route the driver to a stable stall as a fallback.",
          "Flag the -rc rollout at this site for the platform team.",
        ],
        action: "Sent a Reset(connector) to stall 06 to force a clean handshake, and reserved stall 03 (firmware v3.8.1, stable) as a fallback.",
        driverMessage:
          "Sorry you've had a run of bad luck here — this is a firmware issue on a few bays, not your car. I've reset Stall 06 to try again; if it doesn't take in 30 seconds, Stall 03 two along is held for you and will work first time.",
        eta: "~30s, fallback held",
      };

    case "FIRMWARE_UNRESPONSIVE":
      return {
        rootCause: "The charger has missed 6 heartbeats and gone offline to the CSMS — its firmware is hung. No local action will help; it needs a remote reboot and the driver needs rerouting.",
        confidence: 91,
        evidence: [
          `Firmware: ${t?.firmware}`,
          `OCPP: ${t?.ocpp}`,
          `Connector: ${t?.connectorState}`,
        ],
        steps: [
          "6 missed heartbeats + no StatusNotification for 7m → the unit is hung, not the session.",
          "A frozen screen confirms a firmware hang → schedule a hard reset (≈90s to rejoin).",
          "Driver can't wait 90s → reroute to the nearest free working stall now.",
        ],
        action: "Queued a hard Reset for stall 11 (≈90s to rejoin the network) and reserved the nearest free working bay (stall 07) for the driver.",
        driverMessage:
          "That charger's locked up — nothing you did. I'm rebooting it now, but so you're not waiting, I've reserved Stall 07 just across from you; it's free and ready. Head over and it'll start as soon as you plug in.",
        eta: "reroute now · unit back in ~90s",
      };

    case "DRIVER_CONFUSED":
      return {
        rootCause: "No fault on the charger — it's Available and idle with no cable inserted. This is a first-time driver who needs a quick guided start.",
        confidence: 97,
        evidence: [
          `Connector: ${t?.connectorState}`,
          `OCPP: ${t?.ocpp}`,
          `RFID: ${t?.rfid}`,
        ],
        steps: [
          "Charger is Available and healthy, no cable inserted → not a fault, a usage question.",
          "Driver said it's their first fast charge → send 3 simple steps, not jargon.",
          "Offer to start the session for them once the cable is in.",
        ],
        action: "Sent the driver a 3-step guided start and armed stall 03 to auto-start once it detects the cable.",
        driverMessage:
          "No problem, happy to help! 1) Plug the thick cable into your car first. 2) Tap your bank card on the reader. 3) That's it — it'll start automatically. I've set the charger to begin the moment it senses the cable, so you're all set.",
        eta: "guided · auto-start armed",
      };

    default:
      return {
        rootCause: "Session is healthy — no intervention required.",
        confidence: 100,
        evidence: [],
        steps: ["Telemetry nominal."],
        action: "No action needed.",
        driverMessage: "",
        eta: "—",
      };
  }
}

export { CHANNEL_VERB };
