// The Vihakids mark: a cream V on a brand-green tile.
//
// Inlined rather than loaded from /vihakids-mark.svg so it paints with the
// first render (no extra request, nothing to flash in) and so the prerendered
// HTML carries it for crawlers. The standalone file at the repo root is the
// same artwork, kept for favicons, social profiles and anything off-site.
//
// Deliberately one shape: an earlier version had an open-book curve under the
// V, which turned to mush at favicon size.
export default function BrandMark({ size = 34, className = '' }) {
  return (
    <svg
      className={`brand-mark ${className}`.trim()}
      viewBox="0 0 128 128"
      width={size}
      height={size}
      role="img"
      aria-label="Vihakids"
      focusable="false"
    >
      <rect width="128" height="128" rx="30" fill="var(--marigold)" />
      <path
        d="M38 40 L64 94 L90 40"
        fill="none"
        stroke="var(--paper-raised)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
