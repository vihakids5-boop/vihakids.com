// The homepage demo planner asks three things the registration record has no
// fields for: what the parent wants help with, when the family is free, and the comfort
// language. They travel as query parameters on the record's `page` value, e.g.
// "/?time=evening&focus=exam&lang=English+%2B+Kannada" (see DemoPlanner.jsx).
// This turns that back into words for the admin table and the CSV export.
// Older registrations, and ones from the other forms, simply have no plan.

const TIME_LABELS = {
  morning: 'Before school',
  afternoon: 'After school',
  evening: 'Evening',
  weekend: 'Weekend',
};

const FOCUS_LABELS = {
  behind: 'Keep up with school lessons',
  exam: 'Get ready for a test or exam',
  marks: 'Score better marks',
  basics: 'Build strong basics',
  fear: 'Feel confident in the subject',
  homework: 'Help with homework',
};

export function parseDemoPlan(page) {
  if (typeof page !== 'string' || !page.includes('?')) return { time: '', focus: '', lang: '' };
  const q = new URLSearchParams(page.slice(page.indexOf('?') + 1));
  const time = q.get('time');
  const focus = q.get('focus');
  return {
    time: TIME_LABELS[time] || time || '',
    focus: FOCUS_LABELS[focus] || focus || '',
    lang: q.get('lang') || '',
  };
}
