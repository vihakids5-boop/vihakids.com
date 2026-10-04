// Country codes offered in the booking forms: India, plus the four countries
// we have tuition pages for. The server accepts exactly these and nothing
// else (app/backend/src/validation/shared.js) — if you add a country here, add
// it there too, or its bookings will be rejected.
//
// `pattern` checks the national number only (no country code, no leading 0).
// Deliberately loose: length and first digit, enough to catch a mistyped
// number without pretending to be a carrier database.
export const PHONE_COUNTRIES = [
  { code: '+91', flag: '🇮🇳', name: 'India', pattern: /^[6-9][0-9]{9}$/, digits: 10, placeholder: '10-digit mobile' },
  { code: '+971', flag: '🇦🇪', name: 'UAE', pattern: /^5[0-9]{8}$/, digits: 9, placeholder: '50 123 4567' },
  { code: '+1', flag: '🇺🇸', name: 'USA', pattern: /^[2-9][0-9]{9}$/, digits: 10, placeholder: '415 555 2671' },
  { code: '+44', flag: '🇬🇧', name: 'UK', pattern: /^7[0-9]{9}$/, digits: 10, placeholder: '7911 123456' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore', pattern: /^[689][0-9]{7}$/, digits: 8, placeholder: '9123 4567' },
];

export const DEFAULT_PHONE_CODE = '+91';

export function phoneCountry(code) {
  return PHONE_COUNTRIES.find((c) => c.code === code) || PHONE_COUNTRIES[0];
}

// Returns the number as the API wants it, or null if it is not valid for that
// country. India is sent as bare digits, the way every form always has.
export function toApiPhone(code, raw) {
  const country = phoneCountry(code);
  // People often keep the trunk "0" (07911… in the UK, 050… in the UAE).
  const national = String(raw || '').replace(/[^0-9]/g, '').replace(/^0+/, '');
  if (!country.pattern.test(national)) return null;
  return country.code === '+91' ? national : `${country.code}${national}`;
}

export function phoneErrorText(code) {
  const c = phoneCountry(code);
  return `Please enter a valid ${c.digits}-digit ${c.name} mobile number.`;
}
