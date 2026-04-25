/**
 * KidsInspiring Nation — Daily Prompts Sync
 *
 * Reliable strategy:
 * 1. Use YouTube Data API v3 to fetch the latest upload from the channel uploads playlist.
 * 2. If API is unavailable, fall back to the public uploads playlist RSS feed.
 * 3. If both fail, fall back to a manual latest-video URL stored in a settings sheet.
 * 4. Write the daily quiz + video into the `daily_prompts` row for today.
 *
 * Script Properties required for automatic YouTube sync:
 * - YOUTUBE_API_KEY = your YouTube Data API v3 key
 *
 * Sheets:
 * - daily_prompts
 * - quiz_bank
 * - settings (optional; auto-created)
 */

var CHANNEL_ID = "UCnQYGxz4gBIJWHR159IT0lg";
var UPLOADS_PLAYLIST_ID = "UU" + CHANNEL_ID.substring(2);
var PLAYLIST_FEED_URL = "https://www.youtube.com/feeds/videos.xml?playlist_id=" + UPLOADS_PLAYLIST_ID;
var SHEET_NAME = "daily_prompts";
var QUIZ_BANK_SHEET = "quiz_bank";
var SETTINGS_SHEET = "settings";
var CURRENT_THEME = "Positive Habits";

function lagosDateKey_(d) {
  return Utilities.formatDate(d, "Africa/Lagos", "yyyy-MM-dd");
}

function getScriptProperty_(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function ensureSheet_(ss) {
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow([
      "id",
      "title",
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "correctIndex",
      "explain",
      "videoUrl",
      "videoTitle",
      "requiredWatchSeconds",
      "startSeconds",
      "dateKey"
    ]);
  }
  return sh;
}

function ensureQuizBank_(ss) {
  var sh = ss.getSheetByName(QUIZ_BANK_SHEET);
  if (!sh) sh = ss.insertSheet(QUIZ_BANK_SHEET);
  if (sh.getLastRow() === 0) {
    sh.appendRow([
      "id",
      "theme",
      "active",
      "title",
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "correctIndex",
      "explain"
    ]);
  }
  return sh;
}

function ensureSettingsSheet_(ss) {
  var sh = ss.getSheetByName(SETTINGS_SHEET);
  if (!sh) sh = ss.insertSheet(SETTINGS_SHEET);
  if (sh.getLastRow() === 0) {
    sh.appendRow(["key", "value"]);
    sh.appendRow(["manual_latest_video_url", ""]);
    sh.appendRow(["manual_latest_video_title", ""]);
    sh.appendRow(["default_start_seconds", "0"]);
    sh.appendRow(["default_required_watch_seconds", "90"]);
  }
  return sh;
}

function headerIndex_(headerRow) {
  var idx = {};
  for (var i = 0; i < headerRow.length; i++) {
    var h = String(headerRow[i] || "").trim();
    if (h) idx[h] = i;
  }
  return idx;
}

function settingsMap_(sh) {
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return {};
  var rows = sh.getRange(2, 1, lastRow - 1, 2).getValues();
  var out = {};
  for (var i = 0; i < rows.length; i++) {
    var key = String(rows[i][0] || "").trim();
    if (!key) continue;
    out[key] = rows[i][1];
  }
  return out;
}

function fetchTextWithRetry_(url) {
  var lastErr = null;
  for (var i = 0; i < 3; i++) {
    try {
      var resp = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true,
        followRedirects: true,
        headers: {
          "User-Agent": "Mozilla/5.0 (AppsScript; KidsInspiringNation Daily Sync)",
          "Accept": "application/atom+xml,application/xml,text/xml,text/html,*/*"
        }
      });
      var code = resp.getResponseCode();
      if (code >= 200 && code < 300) return resp.getContentText();
      lastErr = new Error("Fetch failed [HTTP " + code + "] for " + url);
    } catch (e) {
      lastErr = e;
    }
    Utilities.sleep(800 * (i + 1));
  }
  throw lastErr || new Error("Fetch failed for " + url);
}

function fetchJson_(url) {
  var resp = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    followRedirects: true,
    headers: { "Accept": "application/json" }
  });
  var code = resp.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error("Request failed [HTTP " + code + "] for " + url + " :: " + resp.getContentText().substring(0, 200));
  }
  return JSON.parse(resp.getContentText());
}

function parseLatestVideoFromFeed_(xml) {
  var doc = XmlService.parse(xml);
  var root = doc.getRootElement();
  var nsAtom = XmlService.getNamespace("http://www.w3.org/2005/Atom");
  var nsYT = XmlService.getNamespace("http://www.youtube.com/xml/schemas/2015");

  var entries = root.getChildren("entry", nsAtom);
  if (!entries || !entries.length) throw new Error("No entries found in YouTube feed.");

  var entry = entries[0];
  var videoId = entry.getChildText("videoId", nsYT);
  var title = entry.getChildText("title", nsAtom);
  var published = entry.getChildText("published", nsAtom);

  if (!videoId) throw new Error("Missing videoId in feed entry.");

  return {
    videoId: videoId,
    videoUrl: "https://www.youtube.com/watch?v=" + videoId,
    title: title || "Daily Teaching",
    published: published || ""
  };
}

function getUploadsPlaylistId_(apiKey) {
  var url = "https://www.googleapis.com/youtube/v3/channels"
    + "?part=contentDetails"
    + "&id=" + encodeURIComponent(CHANNEL_ID)
    + "&key=" + encodeURIComponent(apiKey);
  var data = fetchJson_(url);
  var items = data.items || [];
  if (!items.length) throw new Error("No channel found for CHANNEL_ID " + CHANNEL_ID);
  var playlistId = items[0].contentDetails.relatedPlaylists.uploads;
  if (!playlistId) throw new Error("Uploads playlist not found for channel.");
  return playlistId;
}

function fetchLatestVideoViaApi_() {
  var apiKey = getScriptProperty_("YOUTUBE_API_KEY");
  if (!apiKey) throw new Error("Missing Script Property YOUTUBE_API_KEY");

  var playlistId = getUploadsPlaylistId_(apiKey);
  var url = "https://www.googleapis.com/youtube/v3/playlistItems"
    + "?part=snippet"
    + "&playlistId=" + encodeURIComponent(playlistId)
    + "&maxResults=1"
    + "&key=" + encodeURIComponent(apiKey);

  var data = fetchJson_(url);
  var items = data.items || [];
  if (!items.length) throw new Error("No uploads found in uploads playlist.");

  var snippet = items[0].snippet || {};
  var resourceId = snippet.resourceId || {};
  var videoId = resourceId.videoId;
  if (!videoId) throw new Error("Latest upload missing videoId.");

  return {
    videoId: videoId,
    videoUrl: "https://www.youtube.com/watch?v=" + videoId,
    title: snippet.title || "Daily Teaching",
    published: snippet.publishedAt || ""
  };
}

function extractVideoId_(url) {
  if (!url) return null;
  var m = String(url).match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  var m2 = String(url).match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (m2) return m2[1];
  return null;
}

function fetchLatestVideoManual_(settings) {
  var url = String(settings.manual_latest_video_url || "").trim();
  if (!url) throw new Error("No manual_latest_video_url set in settings sheet.");
  var videoId = extractVideoId_(url);
  if (!videoId) throw new Error("manual_latest_video_url is not a valid YouTube video URL.");
  return {
    videoId: videoId,
    videoUrl: "https://www.youtube.com/watch?v=" + videoId,
    title: String(settings.manual_latest_video_title || "").trim() || "Daily Teaching",
    published: ""
  };
}

function fetchLatestVideo_(settings) {
  var errors = [];
  try {
    return fetchLatestVideoViaApi_();
  } catch (e0) {
    errors.push("API: " + e0);
  }
  try {
    return parseLatestVideoFromFeed_(fetchTextWithRetry_(PLAYLIST_FEED_URL));
  } catch (e1) {
    errors.push("Uploads playlist feed: " + e1);
  }
  try {
    return fetchLatestVideoManual_(settings);
  } catch (e2) {
    errors.push("Manual fallback: " + e2);
  }
  throw new Error("Could not fetch latest YouTube upload. " + errors.join(" | "));
}

function debugYoutubeFeedUrls() {
  Logger.log("CHANNEL_ID: " + CHANNEL_ID);
  Logger.log("UPLOADS_PLAYLIST_ID: " + UPLOADS_PLAYLIST_ID);
  Logger.log("PLAYLIST_FEED_URL: " + PLAYLIST_FEED_URL);
}

function findOrCreateTodayRow_(sh, idx, todayKey) {
  var lastRow = sh.getLastRow();
  if (lastRow < 2) {
    sh.appendRow(makeDefaultRow_(todayKey));
    return sh.getLastRow();
  }

  var dateCol = idx.dateKey;
  if (dateCol === undefined) throw new Error('Header must include "dateKey".');

  var values = sh.getRange(2, 1, lastRow - 1, sh.getLastColumn()).getValues();
  for (var r = 0; r < values.length; r++) {
    var v = String(values[r][dateCol] || "").trim();
    if (v === todayKey) return r + 2;
  }

  sh.appendRow(makeDefaultRow_(todayKey));
  return sh.getLastRow();
}

function makeDefaultRow_(todayKey) {
  return [
    "daily-" + todayKey,
    "Daily Teaching",
    "From today’s teaching: what is the best next action?",
    "Start small and be consistent",
    "Wait for motivation",
    "Do nothing",
    "",
    0,
    "Small consistent actions compound.",
    "",
    "",
    90,
    0,
    todayKey
  ];
}

function setCell_(sh, row, colIdx, value) {
  sh.getRange(row, colIdx + 1).setValue(value);
}

function getCell_(sh, row, colIdx) {
  return sh.getRange(row, colIdx + 1).getValue();
}

function pickQuizForToday_(bankRows, bankIdx, todayKey) {
  var active = [];
  for (var i = 0; i < bankRows.length; i++) {
    var r = bankRows[i];
    var a = String(r[bankIdx.active] || "").trim().toLowerCase();
    if (a !== "yes" && a !== "true" && a !== "1") continue;
    active.push(r);
  }
  if (!active.length) return null;

  var themed = [];
  if (bankIdx.theme !== undefined && CURRENT_THEME) {
    for (var j = 0; j < active.length; j++) {
      var th = String(active[j][bankIdx.theme] || "").trim();
      if (th && th.toLowerCase() === String(CURRENT_THEME).toLowerCase()) themed.push(active[j]);
    }
  }

  var pool = themed.length ? themed : active;
  var h = 0;
  for (var k = 0; k < todayKey.length; k++) h = (h * 31 + todayKey.charCodeAt(k)) >>> 0;
  return pool[h % pool.length];
}

function fillQuizFromBank_(ss, sh, idx, row, todayKey) {
  var bankSh = ensureQuizBank_(ss);
  var bankHeader = bankSh.getRange(1, 1, 1, bankSh.getLastColumn()).getValues()[0];
  var bankIdx = headerIndex_(bankHeader);

  if (bankIdx.question === undefined || bankIdx.optionA === undefined || bankIdx.optionB === undefined || bankIdx.optionC === undefined || bankIdx.correctIndex === undefined) {
    throw new Error('quiz_bank must include at least: question, optionA, optionB, optionC, correctIndex.');
  }
  if (bankIdx.active === undefined) throw new Error('quiz_bank must include "active" (Yes/No).');

  if (idx.question !== undefined) {
    var q = String(getCell_(sh, row, idx.question) || "").trim();
    if (q) return;
  }

  var last = bankSh.getLastRow();
  if (last < 2) return;
  var bankRows = bankSh.getRange(2, 1, last - 1, bankSh.getLastColumn()).getValues();
  var picked = pickQuizForToday_(bankRows, bankIdx, todayKey);
  if (!picked) return;

  function copyIf(colNameBank, colNameDaily) {
    if (idx[colNameDaily] === undefined || bankIdx[colNameBank] === undefined) return;
    setCell_(sh, row, idx[colNameDaily], picked[bankIdx[colNameBank]]);
  }

  copyIf("title", "title");
  copyIf("question", "question");
  copyIf("optionA", "optionA");
  copyIf("optionB", "optionB");
  copyIf("optionC", "optionC");
  copyIf("optionD", "optionD");
  copyIf("correctIndex", "correctIndex");
  copyIf("explain", "explain");

  if (idx.id !== undefined) {
    var curId = String(getCell_(sh, row, idx.id) || "").trim();
    if (!curId) setCell_(sh, row, idx.id, "daily-" + todayKey);
  }
}

function syncTodayFromLatestUpload() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ensureSheet_(ss);
  var settingsSh = ensureSettingsSheet_(ss);
  var settings = settingsMap_(settingsSh);

  var header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var idx = headerIndex_(header);

  var todayKey = lagosDateKey_(new Date());
  var latest = fetchLatestVideo_(settings);
  var row = findOrCreateTodayRow_(sh, idx, todayKey);

  if (idx.videoUrl === undefined || idx.videoTitle === undefined) {
    throw new Error('Header must include "videoUrl" and "videoTitle".');
  }

  setCell_(sh, row, idx.videoUrl, latest.videoUrl);
  setCell_(sh, row, idx.videoTitle, latest.title);

  if (idx.requiredWatchSeconds !== undefined) {
    var cur = sh.getRange(row, idx.requiredWatchSeconds + 1).getValue();
    if (!cur) setCell_(sh, row, idx.requiredWatchSeconds, Number(settings.default_required_watch_seconds || 90));
  }
  if (idx.startSeconds !== undefined) {
    var cur2 = sh.getRange(row, idx.startSeconds + 1).getValue();
    if (cur2 === "" || cur2 === null) setCell_(sh, row, idx.startSeconds, Number(settings.default_start_seconds || 0));
  }

  fillQuizFromBank_(ss, sh, idx, row, todayKey);

  Logger.log("✓ Updated " + todayKey + " with video: " + latest.videoUrl + " (" + latest.title + ")");
}

function setupDailyTrigger() {
  var ts = ScriptApp.getProjectTriggers();
  for (var i = 0; i < ts.length; i++) {
    if (ts[i].getHandlerFunction && ts[i].getHandlerFunction() === "syncTodayFromLatestUpload") {
      ScriptApp.deleteTrigger(ts[i]);
    }
  }

  ScriptApp.newTrigger("syncTodayFromLatestUpload")
    .timeBased()
    .atHour(6)
    .everyDays(1)
    .create();

  Logger.log("✓ Trigger set: syncTodayFromLatestUpload daily at ~06:00");
}

function seedQuizBankSample() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ensureQuizBank_(ss);

  if (sh.getLastRow() > 1) {
    Logger.log("quiz_bank already has rows; skipping seed.");
    return;
  }

  sh.appendRow([
    "habits-001",
    "Positive Habits",
    "Yes",
    "Positive Habits",
    "What is the best way to build a positive habit?",
    "Wait for motivation",
    "Start small daily and stay consistent",
    "Do a big change once and stop",
    "",
    1,
    "Positive habits are built by small consistent actions, not one-time bursts."
  ]);

  sh.appendRow([
    "habits-002",
    "Positive Habits",
    "Yes",
    "Visibility",
    "Which is more powerful for habits: intentions or environment design?",
    "Intentions only",
    "Environment design (make the habit easy to see and do)",
    "Avoid planning",
    "",
    1,
    "Design your environment so the right habit becomes the easiest habit."
  ]);

  sh.appendRow([
    "habits-003",
    "Positive Habits",
    "Yes",
    "Consistency",
    "What should you do when you miss a day?",
    "Quit",
    "Reset immediately and continue tomorrow",
    "Wait a month to restart",
    "",
    1,
    "Builders do not chase perfection; they practise fast recovery."
  ]);

  Logger.log("✓ Seeded quiz_bank with sample questions.");
}

function seedSettingsSample() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSettingsSheet_(ss);
  Logger.log("✓ settings sheet ensured. Add YOUTUBE_API_KEY in Script Properties or set manual_latest_video_url in the settings sheet.");
}
