// Cookie consent for Google Analytics + the Meta Pixel.
// index.html only loads those tags (window.vkLoadTracking) once the stored
// choice is 'accepted'; this module owns reading and changing that choice.
// The same key is read by the inline script in index.html — keep them in sync.
export const CONSENT_KEY = 'vk-cookie-consent';
export const OPEN_SETTINGS_EVENT = 'vk-open-cookie-settings';

export function getConsent() {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

function storeConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode etc.): the choice holds for this page view only.
  }
}

// Cookies Google Analytics (_ga, _ga_<id>, _gid) and the Meta Pixel (_fbp, _fbc) set.
function clearTrackingCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => n === '_gid' || n === '_fbp' || n === '_fbc' || n === '_ga' || n.startsWith('_ga_'));
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function acceptTracking() {
  storeConsent('accepted');
  if (typeof window.vkLoadTracking === 'function') window.vkLoadTracking();
}

export function declineTracking() {
  const wasLoaded = Boolean(window.vkTrackingLoaded);
  storeConsent('declined');
  clearTrackingCookies();
  // Scripts that already ran can't be unloaded; a reload starts the page without them.
  if (wasLoaded) window.location.reload();
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
