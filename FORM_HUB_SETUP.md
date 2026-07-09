# Form Hub — one Sheet + Telegram alerts for every form

Every form on the site (NBC registration, club requests, funder inquiries,
contact messages) reports to **one Google Sheet** — a tab per form type — and
pings **Telegram** the moment something lands. No server, no monthly cost:
a single Google Apps Script does both.

The code is already wired on the site ([src/formHub.js](src/formHub.js)); you
just need to do this ~10-minute setup once.

---

## 1. Create the Sheet

1. Go to [sheets.new](https://sheets.new) → name it e.g. **"KIN Form Hub"**.
2. Copy the **Sheet ID** from the URL — the long string between `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`

Tabs are created automatically per form (`registration`, `club-request`,
`funder-inquiry`, `contact`) with bold headers — you don't set anything up.

## 2. Create the Telegram bot

1. In Telegram, message **@BotFather** → send `/newbot` → follow the prompts
   (name it e.g. "KIN Forms Bot"). Copy the **bot token** it gives you
   (looks like `1234567890:AAF...`).
2. Create a group for your team (e.g. "KIN Submissions") and **add the bot**
   to it.
3. Get the group's **chat id**: send any message in the group, then open
   `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   in a browser and find `"chat":{"id":-100xxxxxxxxxx,...}` — that negative
   number is the chat id. (If empty, send another message and refresh.)

## 3. Create the Apps Script

1. In your new Sheet: **Extensions → Apps Script**.
2. Delete the default code and paste the entire contents of
   [apps-script/FormHub.gs](apps-script/FormHub.gs).
3. **Project Settings (⚙️) → Script Properties → Add script property**, three times:
   | Property | Value |
   |---|---|
   | `SHEET_ID` | the ID from step 1 |
   | `TELEGRAM_BOT_TOKEN` | the token from step 2 |
   | `TELEGRAM_CHAT_ID` | the chat id from step 2 |

## 4. Deploy it

1. **Deploy → New deployment → ⚙️ → Web app**
   - Description: `form hub`
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required so the website can post to it
2. Click **Deploy**, authorise when asked, and copy the **Web app URL**
   (ends in `/exec`).
3. Sanity check: open that URL in a browser — you should see
   `{"ok":true,"service":"KIN Form Hub"}`.

## 5. Connect the site

Open [src/siteConfig.js](src/siteConfig.js), find `formHubUrl: ""`, paste the
`/exec` URL between the quotes, commit, and push. That's it — the next deploy
routes all four forms through the hub.

> The URL lives in the code rather than a secret because any endpoint a
> browser posts to is visible in the shipped bundle anyway — and the hub
> only *accepts* data, it never reveals any.

---

## What you get

- **One Sheet, four tabs** — every submission timestamped, new form fields
  become new columns automatically.
- **Instant Telegram messages** like:
  > **🏫 New Club Request**
  > **School:** Unity College, Ikeja
  > **Contact:** Mrs. Adeyemi
  > **Email:** …
- **Referral attribution** — submissions arriving via a Builder's share link
  carry a `referred_by` column with their Builder ID.
- **Fixes the live Contact + Registration forms** — their old endpoints came
  from env vars that were never set in the deployed build, so submissions
  errored in production. The hub is now their primary backend.
- Club requests and funder inquiries **also still email**
  KidsInspiringOperations@gmail.com via FormSubmit, as before — the hub is
  additive there, so nothing is lost if it's ever down.

## Updating the script later

Edit in the Apps Script editor → **Deploy → Manage deployments → ✏️ →
Version: New version → Deploy**. (Just saving isn't enough — you must create
a new version, but the URL stays the same.)
