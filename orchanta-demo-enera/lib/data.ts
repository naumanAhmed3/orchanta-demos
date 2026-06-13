// Sample data for the Enera "Control Room" prototype (built by Orchanta).
// All data is fictional and clearly sample. "Voltway Networks" is an invented Charge Point
// Operator — not a real company. Failure modes mirror Enera's own published taxonomy.

export type Channel = "call" | "whatsapp" | "email";
export type SessionStatus = "charging" | "completed" | "failed" | "recovered";
export type FailureCode =
  | "RFID_UNREAD"
  | "PAYMENT_DECLINED"
  | "CONNECTOR_LOCK_JAM"
  | "HANDSHAKE_TIMEOUT"
  | "FIRMWARE_UNRESPONSIVE"
  | "DRIVER_CONFUSED";

export interface Telemetry {
  connector: string;
  connectorState: string;
  rfid: string;
  payment: string;
  firmware: string;
  ocpp: string;
  soc: string;
}

export interface Session {
  id: string;
  site: string;
  stall: string;
  city: string;
  driver: string;
  vehicle: string;
  channel: Channel;
  status: SessionStatus;
  failure?: FailureCode;
  driverMessage?: string;
  telemetry?: Telemetry;
  startedAt: string;
  kwh: number;
}

export const FAILURE_LABEL: Record<FailureCode, string> = {
  RFID_UNREAD: "RFID not recognised",
  PAYMENT_DECLINED: "Payment declined",
  CONNECTOR_LOCK_JAM: "Connector lock jammed",
  HANDSHAKE_TIMEOUT: "Handshake timeout",
  FIRMWARE_UNRESPONSIVE: "Firmware unresponsive",
  DRIVER_CONFUSED: "Driver needs guidance",
};

export const sessions: Session[] = [
  {
    id: "VW-2271",
    site: "Manchester Arndale",
    stall: "Stall 04",
    city: "Manchester",
    driver: "A. Okafor",
    vehicle: "VW ID.4",
    channel: "whatsapp",
    status: "failed",
    failure: "RFID_UNREAD",
    driverMessage: "I've tapped my card three times and nothing happens. Screen just says ‘authorising’.",
    startedAt: "14:32",
    kwh: 0,
    telemetry: {
      connector: "CCS2 · 150 kW",
      connectorState: "Idle · plugged, not energised",
      rfid: "Tag E1A2-7F not matched to any account (3 read attempts)",
      payment: "No pre-auth attempted (blocked at auth)",
      firmware: "v3.8.1 · heartbeat 6s ago",
      ocpp: "StatusNotification: Preparing → SuspendedEVSE",
      soc: "Vehicle SoC 18%",
    },
  },
  {
    id: "VW-2268",
    site: "Leeds Trinity",
    stall: "Stall 02",
    city: "Leeds",
    driver: "M. Bianchi",
    vehicle: "Tesla Model 3",
    channel: "call",
    status: "failed",
    failure: "PAYMENT_DECLINED",
    driverMessage: "It said payment failed but my card works everywhere else. I need to get to a meeting.",
    startedAt: "14:25",
    kwh: 0,
    telemetry: {
      connector: "CCS2 · 250 kW",
      connectorState: "Idle · plugged, not energised",
      rfid: "Contactless tap OK",
      payment: "Pre-auth £35 declined · issuer code 51 (insufficient funds / hold)",
      firmware: "v3.8.1 · heartbeat 4s ago",
      ocpp: "StatusNotification: Preparing",
      soc: "Vehicle SoC 41%",
    },
  },
  {
    id: "VW-2262",
    site: "Birmingham Bullring",
    stall: "Stall 09",
    city: "Birmingham",
    driver: "S. Patel",
    vehicle: "Kia EV6",
    channel: "whatsapp",
    status: "failed",
    failure: "CONNECTOR_LOCK_JAM",
    driverMessage: "My car finished charging but the cable won't come out. I'm stuck at the bay.",
    startedAt: "13:58",
    kwh: 54.2,
    telemetry: {
      connector: "CCS2 · 150 kW",
      connectorState: "Locked · lock actuator no release after 2 attempts",
      rfid: "Session authorised (account #44021)",
      payment: "Captured £24.10",
      firmware: "v3.8.1 · heartbeat 5s ago",
      ocpp: "StatusNotification: Finishing · ConnectorLockFailure",
      soc: "Vehicle SoC 80% (complete)",
    },
  },
  {
    id: "VW-2259",
    site: "Bristol Cabot Circus",
    stall: "Stall 06",
    city: "Bristol",
    driver: "L. Nguyen",
    vehicle: "Polestar 2",
    channel: "email",
    status: "failed",
    failure: "HANDSHAKE_TIMEOUT",
    driverMessage: "Third charger I've tried here. Plug in, wait, then it just stops. Is the site down?",
    startedAt: "13:40",
    kwh: 0,
    telemetry: {
      connector: "CCS2 · 350 kW",
      connectorState: "Plugged · negotiation aborted",
      rfid: "Session authorised (app)",
      payment: "Pre-auth £40 held",
      firmware: "v3.9.0-rc · heartbeat 9s ago",
      ocpp: "ISO 15118 handshake timeout @ 30s · SLAC failed",
      soc: "Vehicle SoC 27%",
    },
  },
  {
    id: "VW-2244",
    site: "Sheffield Meadowhall",
    stall: "Stall 11",
    city: "Sheffield",
    driver: "R. Campbell",
    vehicle: "BMW i4",
    channel: "call",
    status: "failed",
    failure: "FIRMWARE_UNRESPONSIVE",
    driverMessage: "Screen's frozen on the loading logo. Won't respond to anything.",
    startedAt: "13:12",
    kwh: 0,
    telemetry: {
      connector: "CCS2 · 150 kW",
      connectorState: "Unknown · no status for 7m",
      rfid: "—",
      payment: "—",
      firmware: "v3.9.0-rc · last heartbeat 7m ago (missed 6)",
      ocpp: "No StatusNotification · charger offline to CSMS",
      soc: "—",
    },
  },
  {
    id: "VW-2241",
    site: "Nottingham Victoria",
    stall: "Stall 03",
    city: "Nottingham",
    driver: "K. Adeyemi",
    vehicle: "Renault Megane E-Tech",
    channel: "whatsapp",
    status: "failed",
    failure: "DRIVER_CONFUSED",
    driverMessage: "First time using a fast charger. Do I tap first or plug in first? Nothing's happening.",
    startedAt: "14:39",
    kwh: 0,
    telemetry: {
      connector: "CCS2 · 150 kW",
      connectorState: "Idle · no cable inserted",
      rfid: "No tap detected",
      payment: "—",
      firmware: "v3.8.1 · heartbeat 3s ago",
      ocpp: "StatusNotification: Available",
      soc: "—",
    },
  },
  // Healthy / completed sessions for context (not actionable)
  { id: "VW-2272", site: "Manchester Arndale", stall: "Stall 02", city: "Manchester", driver: "T. Evans", vehicle: "Hyundai Ioniq 5", channel: "whatsapp", status: "charging", startedAt: "14:41", kwh: 22.8 },
  { id: "VW-2270", site: "Leeds Trinity", stall: "Stall 05", city: "Leeds", driver: "D. Murphy", vehicle: "Audi Q4", channel: "call", status: "charging", startedAt: "14:30", kwh: 31.5 },
  { id: "VW-2266", site: "Birmingham Bullring", stall: "Stall 01", city: "Birmingham", driver: "F. Rossi", vehicle: "MG4", channel: "email", status: "completed", startedAt: "13:55", kwh: 47.0 },
  { id: "VW-2258", site: "Bristol Cabot Circus", stall: "Stall 02", city: "Bristol", driver: "H. Khan", vehicle: "Tesla Model Y", channel: "whatsapp", status: "completed", startedAt: "13:33", kwh: 61.4 },
  { id: "VW-2238", site: "Sheffield Meadowhall", stall: "Stall 07", city: "Sheffield", driver: "P. Walsh", vehicle: "Cupra Born", channel: "call", status: "recovered", startedAt: "12:48", kwh: 38.9 },
];

export const fleet = {
  operator: "Voltway Networks",
  sites: 42,
  chargers: 388,
  uptime: "99.1%",
  chargeSuccess: "71%",
  failRate: "29%",
  avgRecover: "2m 40s",
};
