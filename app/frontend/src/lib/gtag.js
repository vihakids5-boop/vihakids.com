export function trackEvent(name, params) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  // Mirror lead-generation events to the Meta Pixel so ad campaigns can
  // optimise for and report on actual registrations, not just clicks.
  if (name === 'generate_lead' && typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', params);
  }
}
