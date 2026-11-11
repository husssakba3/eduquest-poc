// Google Apps Script: collects EduQuest feedback into a Google Sheet.
const PASS = 'change-me'; // admin passcode, change this before deploying

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName('Feedback') || ss.insertSheet('Feedback');
}
function clean_(x, n) { // stop spreadsheet formula injection
  return String(x == null ? '' : x).slice(0, n).replace(/^[=+\-@]/, "'$&");
}
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const s = sheet_();
  if (s.getLastRow() === 0) s.appendRow(['Time', 'Name', 'Rating', 'Message', 'Grade']);
  s.appendRow([new Date(), clean_(d.name, 60), Number(d.rating) || '', clean_(d.msg, 1000), clean_(d.grade, 4)]);
  return ContentService.createTextOutput('ok');
}
function doGet(e) {
  const out = ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
  if (e.parameter.key !== PASS) return out.setContent('[]');
  const rows = sheet_().getDataRange().getValues().slice(1)
    .map(r => ({ ts: r[0], name: r[1], rating: r[2], msg: r[3], grade: r[4] })).reverse();
  return out.setContent(JSON.stringify(rows));
}
