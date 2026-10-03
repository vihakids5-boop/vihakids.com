// Montserrat and Fraunces, self-hosted as ordinary static files — one file per
// weight — instead of Google Fonts' single variable file.
//
// Why: on an iPhone in Lockdown Mode, Safari turns font variations off. Google
// serves Montserrat as one variable file whose default is the THIN weight, so
// every word on the site rendered hair-thin and was close to unreadable
// (reported with a screenshot, 2026-10-04). A static file has exactly one
// weight in it, so there is nothing to fall back to.
//
// Latin and Latin-Extended only (Extended carries the ₹ sign). Each file is
// downloaded only if the page uses that weight.
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-ext-400.css';
import '@fontsource/montserrat/latin-400-italic.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-ext-500.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/latin-ext-600.css';
import '@fontsource/montserrat/latin-600-italic.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/montserrat/latin-ext-700.css';
import '@fontsource/montserrat/latin-800.css';
import '@fontsource/montserrat/latin-ext-800.css';
import '@fontsource/fraunces/latin-500.css';
import '@fontsource/fraunces/latin-ext-500.css';
import '@fontsource/fraunces/latin-500-italic.css';
import '@fontsource/fraunces/latin-600.css';
import '@fontsource/fraunces/latin-ext-600.css';
import '@fontsource/fraunces/latin-600-italic.css';
