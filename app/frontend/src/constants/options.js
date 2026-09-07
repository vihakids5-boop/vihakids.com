export const SUBJECTS = ['English', 'Hindi', 'Math', 'Science', 'Kannada'];

export const GRADE_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export const GRADE_BAND_OPTIONS = ['1-5', '6-8', '9-10'];
export const GRADE_LABELS = { '1-5': '1st–5th', '6-8': '6th–8th', '9-10': '9th–10th' };

export const EXPERIENCE_OPTIONS = ['0-1', '1-3', '3-5', '5+'];
export const EXPERIENCE_LABELS = {
  '0-1': 'Fresher (0–1 yr)',
  '1-3': '1–3 yrs',
  '3-5': '3–5 yrs',
  '5+': '5+ yrs',
};

export const STATUSES = { new: 'New', contacted: 'Contacted', demo: 'Demo scheduled', enrolled: 'Enrolled', closed: 'Closed' };
export const TEACH_STATUSES = { new: 'New', contacted: 'Contacted', interviewed: 'Interviewed', hired: 'Hired', rejected: 'Rejected' };

export function ordinal(n) {
  return n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');
}
