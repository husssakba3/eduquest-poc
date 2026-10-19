# EduQuest POC

Single-file maths practice demo, CBSE Grades 1-10. Open `index.html` in any browser, no build step.

- Grade 1 is free; other grades have a free trial then a simulated unlock.
- Grades 8-9 questions are hand-written; Grades 1-7 and 10 are template-generated samples.
- Feedback box (header and home screen). Open `/#admin` to read feedback.

## Connect feedback collection (Google Sheet)
1. Create a Google Sheet. Extensions > Apps Script. Paste `backend/Code.gs`, set `PASS`.
2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Copy the URL.
3. In `index.html` set `FEEDBACK_URL="<that URL>"` (and `SITE_URL` to your GitHub Pages URL).
4. Commit and push. Feedback appears as rows in the sheet; `/#admin` shows it in the app.

Without `FEEDBACK_URL`, comments are saved only in the sender's own browser.
