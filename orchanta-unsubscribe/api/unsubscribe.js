// api/unsubscribe.js — Orchanta unsubscribe endpoint (Vercel Node function).
// GET  /unsubscribe?e=<email>  -> records the opt-out, returns a confirmation page.
// POST /unsubscribe?e=<email>  -> RFC 8058 one-click (mail clients auto-POST); records + 200.
// Records each opt-out to the shared sheet's "Unsubscribes" tab via the Apps Script web app.
// Env (server-side, set in Vercel): APPS_SCRIPT_URL, APPS_SCRIPT_KEY.

const APPS_URL = process.env.APPS_SCRIPT_URL;
const APPS_KEY = process.env.APPS_SCRIPT_KEY;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pktStamp() {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const p = Object.fromEntries(f.formatToParts(new Date()).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second} PKT`;
}

async function record(email, source) {
  if (!APPS_URL || !APPS_KEY) return false;
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetch(APPS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        redirect: "follow",
        body: JSON.stringify({ action: "appendRow", key: APPS_KEY, tab: "Unsubscribes", values: [pktStamp(), email, source] }),
      });
      if (res.ok) return true;
    } catch { /* retry once */ }
  }
  return false;
}

function esc(s) {
  return String(s || "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}

function page(email, ok) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribe · Orchanta</title>
<style>body{margin:0;background:#0d0d10;color:#f7f3ec;font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;display:grid;place-items:center;min-height:100vh}
.c{max-width:460px;padding:40px 28px;text-align:center}.badge{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:#13251b;color:#2fcf8e;font-size:22px;margin:0 auto 18px}
h1{font-size:22px;margin:0 0 10px;letter-spacing:-.01em}p{color:#b9b9c4;line-height:1.6;margin:0 0 8px;font-size:15px}a{color:#9a9aa5}</style></head>
<body><div class="c"><div class="badge">${ok ? "&#10003;" : "&#33;"}</div>
<h1>${ok ? "You&rsquo;re unsubscribed" : "Unsubscribe"}</h1>
${ok
    ? `<p>${email ? "<strong>" + esc(email) + "</strong> has" : "You have"} been removed from Orchanta outreach. You won&rsquo;t hear from us again.</p>`
    : `<p>We couldn&rsquo;t read a valid email from this link. If you keep getting messages, reply with &ldquo;unsubscribe&rdquo; and we&rsquo;ll remove you right away.</p>`}
<p style="margin-top:18px"><a href="https://orchanta.tech">orchanta.tech</a></p></div></body></html>`;
}

module.exports = async (req, res) => {
  let email = "";
  try {
    const u = new URL(req.url, "https://x");
    email = (u.searchParams.get("e") || "").trim();
  } catch { /* ignore */ }
  const valid = EMAIL_RE.test(email);
  if (valid) await record(email, req.method === "POST" ? "one-click" : "link");

  if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true, unsubscribed: valid ? email : null }));
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(page(email, valid));
};
