/**
 * KidsInspiring Nation — Form Hub
 * One Apps Script web app that receives EVERY form on the site, appends each
 * submission to a Google Sheet (one tab per form type), and pings Telegram.
 *
 * SETUP (once) — see FORM_HUB_SETUP.md in the repo root for the full guide:
 *  1. Create a Google Sheet; copy its ID from the URL.
 *  2. In this Apps Script project: Project Settings → Script Properties, add:
 *       SHEET_ID           = <your sheet id>
 *       TELEGRAM_BOT_TOKEN = <token from @BotFather>
 *       TELEGRAM_CHAT_ID   = <your group/channel chat id>
 *  3. Deploy → New deployment → Web app → Execute as: Me,
 *     Who has access: Anyone. Copy the /exec URL into SITE.formHubUrl
 *     (src/siteConfig.js) and redeploy the site.
 *
 * Every submission arrives with a `_form` field naming its type
 * (e.g. "registration", "club-request", "funder-inquiry", "contact").
 */

const PROPS = PropertiesService.getScriptProperties();

function doPost(e) {
  try {
    const data = parseBody_(e);
    const form = String(data._form || "general").replace(/[^\w-]/g, "").slice(0, 40) || "general";
    delete data._form;

    appendToSheet_(form, data);
    sendTelegram_(form, data);

    return json_({ ok: true });
  } catch (err) {
    // Log for debugging (View → Executions) but never leak internals.
    console.error(err);
    return json_({ ok: false });
  }
}

// Health check: open the /exec URL in a browser.
function doGet() {
  return json_({ ok: true, service: "KIN Form Hub" });
}

/* ── helpers ─────────────────────────────────────────────────────── */

function parseBody_(e) {
  // Accept both urlencoded (what the site sends — avoids CORS preflight)
  // and raw JSON (for future callers).
  if (e.parameter && Object.keys(e.parameter).length) return Object.assign({}, e.parameter);
  if (e.postData && e.postData.contents) return JSON.parse(e.postData.contents);
  return {};
}

function appendToSheet_(form, data) {
  const ss = SpreadsheetApp.openById(PROPS.getProperty("SHEET_ID"));
  const sheet = ss.getSheetByName(form) || ss.insertSheet(form);

  // Header row = union of existing headers and this submission's keys,
  // so adding a field to a form never breaks the sheet.
  let headers = [];
  if (sheet.getLastRow() >= 1) {
    headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0].filter(String);
  }
  if (!headers.length) headers = ["Timestamp"];
  const newKeys = Object.keys(data).filter((k) => headers.indexOf(k) === -1);
  if (newKeys.length) {
    headers = headers.concat(newKeys);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  }

  const row = headers.map((h) => (h === "Timestamp" ? new Date() : data[h] != null ? String(data[h]) : ""));
  sheet.appendRow(row);
}

function sendTelegram_(form, data) {
  const token = PROPS.getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = PROPS.getProperty("TELEGRAM_CHAT_ID");
  if (!token || !chatId) return; // Telegram optional — sheet still works.

  const TITLES = {
    "registration": "🇳🇬 New NBC Registration",
    "club-request": "🏫 New Club Request",
    "funder-inquiry": "🤝 New Funder Inquiry",
    "contact": "✉️ New Contact Message",
  };
  const title = TITLES[form] || "📥 New " + form + " submission";

  // First ~10 fields, skipping empties, so messages stay scannable.
  const lines = Object.entries(data)
    .filter(([, v]) => v != null && String(v).trim() !== "" && String(v) !== "—")
    .slice(0, 10)
    .map(([k, v]) => "<b>" + esc_(k) + ":</b> " + esc_(String(v).slice(0, 200)));

  const text = "<b>" + title + "</b>\n" + lines.join("\n");

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" }),
    muteHttpExceptions: true,
  });
}

function esc_(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
