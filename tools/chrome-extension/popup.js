import { signIn, signOut, getSession } from './lib/auth.js';
import { fetchLeads, NotSignedIn, STATUS_LABELS, demoPlan, ordinal, timeAgo, whatsappLink } from './lib/leads.js';

const $ = (id) => document.getElementById(id);

async function init() {
  const session = await getSession();
  if (!session) return showSignIn();
  $('signed-in-as').textContent = session.email;
  showLeads();
  // Show whatever the background worker stored last, then fetch fresh.
  const { leads } = await chrome.storage.local.get('leads');
  if (Array.isArray(leads)) render(leads);
  await refresh();
}

function showSignIn() {
  $('signin').hidden = false;
  $('leads-view').hidden = true;
  $('subtitle').textContent = 'Sign in';
  $('email').focus();
}

function showLeads() {
  $('signin').hidden = true;
  $('leads-view').hidden = false;
  $('subtitle').textContent = 'Demo bookings';
}

async function refresh() {
  $('refresh').disabled = true;
  $('error').hidden = true;
  try {
    const leads = await fetchLeads();
    render(leads);
    // Let the background worker update the badge and its "seen" list.
    chrome.runtime.sendMessage({ type: 'check-leads' }).catch(() => {});
  } catch (err) {
    if (err instanceof NotSignedIn) {
      await signOut();
      showSignIn();
      $('signin-error').textContent = err.message;
      $('signin-error').hidden = false;
    } else {
      $('error').textContent = err.message || 'Could not reach the Vihakids API.';
      $('error').hidden = false;
    }
  } finally {
    $('refresh').disabled = false;
  }
}

function render(leads) {
  const newCount = leads.filter((l) => (l.status || 'new') === 'new').length;
  $('summary').innerHTML = newCount
    ? `<b>${newCount}</b> new · ${leads.length} total`
    : `No new leads · ${leads.length} total`;
  const list = $('leads');
  list.replaceChildren();
  $('empty').hidden = leads.length > 0;
  for (const lead of leads.slice(0, 12)) list.appendChild(renderLead(lead));
}

// Built with createElement rather than innerHTML: every value here was typed
// by a member of the public into a form.
function renderLead(lead) {
  const li = el('li', 'lead');
  const status = lead.status || 'new';

  const name = el('div', 'lead-name', lead.parentName || '—');
  name.appendChild(el('small', '', lead.phone || ''));
  li.appendChild(name);
  li.appendChild(el('div', 'lead-when', timeAgo(lead.createdAt)));

  const meta = el('div', 'lead-meta');
  meta.appendChild(el('span', `status status-${status}`, STATUS_LABELS[status] || status));
  meta.appendChild(document.createTextNode(`  ${ordinal(lead.grade)} Std · ${(lead.subjects || []).join(', ')}`));
  li.appendChild(meta);

  const plan = demoPlan(lead.page);
  if (plan.length) {
    const wrap = el('div', 'lead-plan');
    for (const p of plan) wrap.appendChild(el('span', '', p));
    li.appendChild(wrap);
  }

  const actions = el('div', 'lead-actions');
  const wa = whatsappLink(lead.phone);
  if (wa) {
    const a = el('a', '', 'WhatsApp');
    a.href = wa; a.target = '_blank'; a.rel = 'noopener';
    actions.appendChild(a);
  }
  const tel = el('a', '', 'Call');
  tel.href = `tel:${lead.phone || ''}`;
  actions.appendChild(tel);
  li.appendChild(actions);
  return li;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

$('signin').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('signin-btn').disabled = true;
  $('signin-error').hidden = true;
  try {
    const email = await signIn($('email').value.trim(), $('password').value);
    $('password').value = '';
    $('signed-in-as').textContent = email;
    showLeads();
    await refresh();
  } catch (err) {
    $('signin-error').textContent = err.message;
    $('signin-error').hidden = false;
  } finally {
    $('signin-btn').disabled = false;
  }
});

$('refresh').addEventListener('click', refresh);
$('signout').addEventListener('click', async () => {
  await signOut();
  showSignIn();
});

init();
