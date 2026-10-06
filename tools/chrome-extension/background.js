// Background worker: every few minutes, fetch the leads, put the number of
// NEW ones on the toolbar badge, and raise a desktop notification for any
// booking that has not been seen before. The popup reads the same stored list,
// so it opens instantly and refreshes on demand.
import { CHECK_EVERY_MINUTES, ADMIN_URL } from './lib/config.js';
import { fetchLeads, NotSignedIn, ordinal } from './lib/leads.js';

const ALARM = 'vihakids-check-leads';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#3E9767' });
  chrome.alarms.create(ALARM, { periodInMinutes: CHECK_EVERY_MINUTES });
  checkLeads();
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create(ALARM, { periodInMinutes: CHECK_EVERY_MINUTES });
  checkLeads();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM) checkLeads();
});

// The popup asks for a refresh after signing in or when the button is pressed.
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === 'check-leads') {
    checkLeads().then(() => sendResponse({ ok: true })).catch(() => sendResponse({ ok: false }));
    return true; // keep the channel open for the async reply
  }
  return false;
});

chrome.notifications.onClicked.addListener(() => {
  chrome.tabs.create({ url: ADMIN_URL });
});

async function checkLeads() {
  try {
    const leads = await fetchLeads();
    const newCount = leads.filter((l) => (l.status || 'new') === 'new').length;
    await chrome.action.setBadgeText({ text: newCount ? String(newCount) : '' });
    await chrome.action.setTitle({ title: newCount ? `Vihakids: ${newCount} new lead${newCount === 1 ? '' : 's'}` : 'Vihakids leads' });

    const { seenIds = null } = await chrome.storage.local.get('seenIds');
    const ids = leads.map((l) => l.id);
    // On the very first check nothing is "new to us" — notifying about every
    // historical booking would be noise.
    if (Array.isArray(seenIds)) {
      const unseen = leads.filter((l) => !seenIds.includes(l.id));
      for (const lead of unseen.slice(0, 5)) notify(lead);
    }
    await chrome.storage.local.set({
      leads: leads.slice(0, 25),
      seenIds: ids,
      lastCheck: Date.now(),
      lastError: null,
    });
  } catch (err) {
    if (err instanceof NotSignedIn) {
      await chrome.action.setBadgeText({ text: '!' });
      await chrome.action.setTitle({ title: 'Vihakids leads — sign in' });
    } else {
      await chrome.storage.local.set({ lastError: err.message || 'Could not reach the Vihakids API.' });
    }
  }
}

function notify(lead) {
  const subjects = (lead.subjects || []).join(', ');
  chrome.notifications.create(`lead-${lead.id}`, {
    type: 'basic',
    iconUrl: 'icons/icon-192.png',
    title: 'New demo booking',
    message: `${lead.parentName} — ${ordinal(lead.grade)} Std, ${subjects}`,
    priority: 1,
  });
}
