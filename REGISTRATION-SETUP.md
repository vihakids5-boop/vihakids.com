# Parent registration — setup (one time, ~10 minutes)

The form at `register.html` saves each registration to a Firebase Firestore database
(collection `registrations`). Until you connect Firebase, the form shows a friendly
"not set up yet — WhatsApp us" message instead of failing.

## 1. Create the Firebase project
1. Open https://console.firebase.google.com and sign in with vihakids5@gmail.com.
2. **Add project** → name it `vihakids` → you can turn Google Analytics off (the site already has GA) → Create.

## 2. Create the database
1. Left menu **Build → Firestore Database → Create database**.
2. Location: `asia-south1 (Mumbai)`. Mode: **Production**. Create.
3. Open the **Rules** tab, delete everything, paste the contents of `firestore.rules`, click **Publish**.
   These rules let the website *add* a registration only if it is well-formed, and block all
   reading/editing from the website. Only you (in the console) can see the data.

## 3. Register the website and copy the config
1. Click the gear icon → **Project settings** → scroll to **Your apps** → click the web icon `</>`.
2. App nickname: `vihakids.com`. Do not tick Firebase Hosting. Register app.
3. It shows a `firebaseConfig = { apiKey: "...", ... }` block. Copy each value into
   `firebase-config.js` (replace the `PASTE_...` placeholders). Save.
4. Commit and push (`git add . && git commit -m "Add parent registration" && git push`).

## 4. Set up the admin login (for admin.html)
1. Firebase console → **Build → Authentication → Get started**.
2. **Sign-in method** tab → **Email/Password** → Enable → Save.
3. **Users** tab → **Add user** → email `vihakids5@gmail.com` + a strong password → Add user.
   (This password is separate from your Gmail password. Use a password manager.)
4. To allow another staff member: add them as a user here AND add their email to the
   `isAdmin()` list at the top of `firestore.rules`, then re-publish the rules.
   Without the rules entry they can sign in but will see "not allowed to view registrations".

## 5. Test
Open https://www.vihakids.com/register.html, submit a test registration, then in the Firebase
console open **Firestore Database → Data → registrations**. Your entry should be there with
parentName, phone (+91…), grade, subjects, source, page and createdAt.

## Viewing / exporting registrations
- Day to day: open **https://www.vihakids.com/admin.html** and sign in. Two tabs:
  - **Parent registrations** — counts (total / new / last 7 days / enrolled), a searchable table,
    a one-click WhatsApp reply button per parent, a status dropdown
    (New → Contacted → Demo scheduled → Enrolled → Closed), a notes box that auto-saves, delete,
    and **Download CSV**.
  - **Teacher applications** — same pattern (New → Contacted → Interviewed → Hired → Rejected)
    for people who apply at `teach.html`.
- The Firebase console (Firestore → `registrations` / `teacherApplications`) shows the same raw data.
- The page is hidden from Google (`noindex` + robots.txt) and the database itself refuses
  reads from anyone not signed in as an admin, so the URL being public is fine.
- To get notified on every registration or application: Firebase console → **Build → Extensions** →
  install **Trigger Email from Firestore** (free tier) and point it at the `registrations` and/or
  `teacherApplications` collection, or ask Claude to add a small Cloud Function that sends you a
  WhatsApp/email.

## What each file does
| File | Purpose |
|------|---------|
| `register.html` | The parent registration page (parent name, WhatsApp number, grade, subjects). Validates input, blocks bots with a hidden honeypot field, then writes to Firestore (`registrations`) and shows a WhatsApp button pre-filled with the parent's details. Fires a GA `generate_lead` event. |
| `teach.html` | The teacher application page (name, WhatsApp number, email, subjects, grade ranges, experience, qualification). Same validation/honeypot/WhatsApp pattern, writes to Firestore (`teacherApplications`). |
| `admin.html` | Password-protected dashboard, tabbed between parent registrations and teacher applications (Firebase Authentication email/password; only emails listed in `firestore.rules` can read data). |
| `firebase-config.js` | Your Firebase project keys (safe to publish; access is controlled by the rules). |
| `firestore.rules` | Database security rules for both `registrations` and `teacherApplications` — paste into Firebase console. |
| `index.html` | Links to Register (nav, mobile menu, hero and contact buttons) and to Teach with us (footer). Kannada/Hindi script replaced with English text to keep the Quora ad compliant. |
| `sitemap.xml` | Includes register.html and teach.html. |

Tip for ads: link Quora/Google ads to `https://www.vihakids.com/register.html?utm_source=quora`
— the `utm_source` is stored in each registration's `source` field so you can see which ad
brought the parent.
