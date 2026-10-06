// Same values the website itself ships to every visitor (see
// app/frontend/.env.production.local and the built bundle). The Firebase API
// key is a public identifier, not a secret: what it can do is governed by
// Firebase Auth and the API's own admin check (ADMIN_EMAILS on the server).
export const API_BASE = 'https://api.vihakids.com';
export const FIREBASE_API_KEY = 'AIzaSyDPnjkEuDXnZJdzCrBPLuYdFD0tF9wjoGM';
export const ADMIN_URL = 'https://www.vihakids.com/admin';

// How often the background check runs, in minutes. Chrome's minimum is 0.5;
// five keeps the API quiet and is still quicker than a parent expects a reply.
export const CHECK_EVERY_MINUTES = 5;
