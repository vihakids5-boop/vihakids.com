# Vihakids Leads — Chrome extension

A small toolbar extension for the Vihakids owner. It shows how many new demo
bookings are waiting, lists the latest ones, raises a desktop notification
when a new booking arrives, and opens the admin page in one click.

It talks to the same API as the admin page (`GET /api/registrations`) and
signs in with the same admin email and password. Nobody else can use it:
the API only answers accounts listed in the server's `ADMIN_EMAILS`.

## Install (about a minute)

1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and choose this folder: `tools/chrome-extension`.
4. Click the puzzle-piece icon in the toolbar and **pin** "Vihakids Leads".
5. Click the green V icon and sign in with the admin email and password.

That's it. The badge on the icon shows the number of bookings still marked
"New". It checks every 5 minutes; click **Refresh** in the popup for an
immediate check.

## What it does

- **Badge:** number of leads with status New. `!` means it needs you to sign in.
- **Popup:** the 12 most recent bookings — parent, phone, class, subjects,
  status, and the demo-plan answers from the homepage planner (goal, preferred
  time, language). Each has WhatsApp and Call links.
- **Notification:** a desktop notification for each booking it has not seen
  before (not on the very first check, so it does not announce old bookings).
  Clicking the notification opens the admin page.
- **Open admin:** opens `https://www.vihakids.com/admin`.

## Updating

After pulling a newer version of this folder, go to `chrome://extensions` and
click the ↻ reload icon on the extension's card.

## Notes

- It is not on the Chrome Web Store and does not need to be — "Load unpacked"
  is the normal way to run a private extension on your own computer.
- The sign-in is stored only in this extension's own storage on this computer.
  **Sign out** in the popup removes it.
- The Firebase key in `lib/config.js` is the same public key the website ships
  to every visitor; it identifies the project and does not grant access by
  itself.
