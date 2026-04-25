/**
 * KidsInspiring Nation — Daily Check-in → Google Sheets
 *
 * 1) Create a Google Sheet with a tab named "daily_checkins"
 * 2) Extensions → Apps Script → paste this file
 * 3) Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4) Copy the Web app URL to VITE_DAILY_CHECKIN_URL
 *
 * Note: CORS can be inconsistent with Apps Script across environments.
 * The website client will attempt normal fetch, then fallback to no-cors fire-and-forget.
 */

function doPost(e) {
  try {
    var body = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(body);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName("daily_checkins");
    if (!sh) sh = ss.insertSheet("daily_checkins");

    if (sh.getLastRow() === 0) {
      sh.appendRow([
        "ts",
        "dateKey",
        "userId",
        "promptId",
        "promptTitle",
        "choiceIndex",
        "correct",
        "streak",
        "bestStreak",
        "totalCheckins",
        "tz",
        "path",
        "userAgent",
        "raw",
      ]);
    }

    sh.appendRow([
      data.ts || new Date().toISOString(),
      data.dateKey || "",
      data.userId || "",
      data.promptId || "",
      data.promptTitle || "",
      data.choiceIndex,
      data.correct,
      data.streak,
      data.bestStreak,
      data.totalCheckins,
      data.tz || "",
      data.path || "",
      data.userAgent || "",
      body,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

