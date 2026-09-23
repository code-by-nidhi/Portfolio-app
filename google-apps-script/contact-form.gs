/**
 * Contact form → Google Sheets bridge.
 *
 * Setup
 * 1. Create a Google Sheet. Extensions → Apps Script, paste this file in, save.
 * 2. Deploy → New deployment → type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 *    Authorise when prompted, then copy the web-app URL (ends in /exec).
 * 3. Set it as NEXT_PUBLIC_GOOGLE_SHEETS_URL — in `.env.local` for local dev,
 *    and in the Render environment settings — then rebuild the site.
 *
 * After editing this script, use Deploy → Manage deployments → Edit →
 * Version: New version, so the same /exec URL picks up the change.
 */

var SHEET_NAME = "Submissions";
var HEADERS = ["Timestamp", "Name", "Email", "Phone", "Message", "Page"];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Honeypot filled in → quietly pretend success.
  if (p.website) return respond({ ok: true });

  var name = clean(p.name, 100);
  var email = clean(p.email, 200);
  var message = clean(p.message, 3000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond({ ok: false, error: "Please fill in every field." });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet();
    sheet.appendRow([
      new Date(),
      name,
      email,
      clean(p.phone, 20),
      message,
      clean(p.page, 300),
    ]);
  } finally {
    lock.releaseLock();
  }

  return respond({ ok: true });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Trim, cap length, and stop values being read as spreadsheet formulas. */
function clean(value, max) {
  var s = String(value || "").trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
