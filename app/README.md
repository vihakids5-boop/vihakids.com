# Vihakids — decoupled React + Node app (core pages)

This is a new, isolated rebuild of the Home, Register, Teach, and Admin
pages as a **React frontend + Node.js/Express backend**, using **Firebase
(Firestore + Auth)** as the data layer. It lives entirely inside this `app/`
folder and does not touch or replace the live static site — `vihakids.com`
keeps running exactly as it does today until you decide to cut over.

Other pages (About, Blog, Terms, Privacy, Cookies) are not part of this app
yet; the header/footer here link out to the live static versions of those
pages.

## 1. One-time setup: get a Firebase service-account key

The backend needs admin access to Firestore/Auth, separate from the public
`apiKey` the website already uses.

1. Go to the [Firebase console](https://console.firebase.google.com/) → open
   the **vihakids-5db91** project → the gear icon → **Project settings** →
   **Service accounts** tab.
2. Click **Generate new private key**. A JSON file downloads.
3. Save that file as `app/backend/service-account.json`. **Never commit this
   file** — it's already excluded via `.gitignore`.

## 2. Configure environment variables

```bash
cp app/backend/.env.example app/backend/.env
cp app/frontend/.env.example app/frontend/.env
```

- `app/backend/.env` — defaults work as-is once `service-account.json` exists
  next to it. Update `ADMIN_EMAILS` if you add more admins.
- `app/frontend/.env` — set `VITE_FIREBASE_API_KEY` to the same `apiKey`
  value already published in the live site's `firebase-config.js` (safe to
  reuse — it's public by design; access control lives in the backend, not
  this key).

## 3. Install and run

```bash
cd app
npm install
npm run dev
```

This starts the backend on `http://localhost:4000` and the frontend on
`http://localhost:5173` together. Open the frontend URL in your browser.

- `/` — Home (hero registration form + all the marketing sections)
- `/register` — standalone registration page
- `/teach` — teacher application page
- `/admin` — sign in with the existing Firebase Auth admin account
  (`vihakids5@gmail.com`) to manage leads and applications

## Notes

- Local dev writes to the **real** Firestore project (there's no local
  emulator here) — delete any test leads/applications afterwards using the
  Delete button in `/admin`.
- The admin dashboard polls every ~25 seconds rather than updating in real
  time; inline edits (status/notes) apply instantly regardless.
- This app is not deployed anywhere yet — hosting the Node backend
  (Render, Railway, Fly.io, etc.) is a separate decision for later. When you
  pick a host, set `FIREBASE_SERVICE_ACCOUNT_JSON` (the service-account
  file's contents, base64-encoded) as a secret there instead of uploading
  the file.
