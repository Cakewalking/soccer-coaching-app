// Line icons in place of emoji. The rule is line icons only, so every picture
// character the app used to show (a calendar, a thumbs-up on a chat message, a
// check-in face) is drawn here in the same stroke as the rest of the icons.
// <Glyph n="calendar" /> in JSX; glyph('calendar') where the icon sits in data.

import { createElement, type ReactElement } from 'react'

const FACE = 'M12 21a9 9 0 100-18 9 9 0 000 18z'
const PATHS = {
  like: 'M7 11v9H4v-9zM7 11l4-8a2 2 0 012 2v4h5a2 2 0 012 2.3l-1.2 6A2 2 0 0116.8 20H7',
  cheer: 'M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z',
  hand: 'M7 11V6a1.5 1.5 0 013 0v4m0-5a1.5 1.5 0 013 0v5m0-4a1.5 1.5 0 013 0v7a6 6 0 01-6 6h-1a6 6 0 01-5-3l-2-4a1.5 1.5 0 012.6-1.5L7 14',
  person: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  people: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M18 14c2 .7 3 2.6 3 6',
  calendar: 'M5 5h14v15H5zM5 10h14M9 3v4M15 3v4',
  ball: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 8l3.5 2.5-1.3 4h-4.4l-1.3-4z',
  cap: 'M2 9l10-5 10 5-10 5zM6 11.5V16c2 2 10 2 12 0v-4.5',
  clipboard: 'M8 4h8v3H8zM6 5H5v16h14V5h-1M9 12h6M9 16h4',
  doc: 'M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h4',
  video: 'M3 7h12v10H3zM15 10l6-3v10l-6-3',
  pin: 'M12 17v5M8 3h8l-1 6 3 4H6l3-4z',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 018 0v4',
  place: 'M12 21s-6-6-6-11a6 6 0 0112 0c0 5-6 11-6 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  image: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 5M9 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  warn: 'M12 3l10 18H2zM12 10v5M12 18v.5',
  chat: 'M4 5h16v11H9l-5 4z',
  smile: `${FACE}M9 10v.5M15 10v.5M8.5 14.5a4 4 0 007 0`,
  neutral: `${FACE}M9 10v.5M15 10v.5M9 15h6`,
  sad: `${FACE}M9 10v.5M15 10v.5M8.5 16a4 4 0 017 0`,
  tired: `${FACE}M8 10h2M14 10h2M9 15.5h6`,
  laugh: `${FACE}M9 10v.5M15 10v.5M8 13h8a4 4 0 01-8 0z`,
  surprised: `${FACE}M9 10v.5M15 10v.5M12 16.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z`,
  clip: 'M8 12l6-6a3 3 0 014 4l-8 8a5 5 0 01-7-7l7-7',
  mic: 'M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM6 11a6 6 0 0012 0M12 17v4',
  megaphone: 'M4 10v4h3l8 4V6l-8 4zM18 9a4 4 0 010 6',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  star: 'M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z',
  run: 'M14 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 21l3-6-3-3 2-5 4 2 2 3M6 12l3-4',
  cup: 'M5 8h11v6a5 5 0 01-5 5h-1a5 5 0 01-5-5zM16 10h2a2 2 0 010 5h-2M7 3v2M11 3v2',
  orange: 'M12 21a8 8 0 100-16 8 8 0 000 16zM12 5c0-2 1-3 3-3',
  shop: 'M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6',
  flag: 'M5 21V4M5 4h12l-2 4 2 4H5',
  link: 'M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1',
  trophy: 'M7 4h10v5a5 5 0 01-10 0zM7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4M12 14v4M8 21h8',
  check: 'M5 12l5 5 9-10',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  sun: 'M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19',
  menu: 'M4 7h16M4 12h16M4 17h16',
  dot: 'M12 14a2 2 0 100-4 2 2 0 000 4z',
} as const
export type GlyphName = keyof typeof PATHS

/** One line icon, sized to the text around it (1.15em) unless `size` is given. */
export function Glyph({ n, size, label }: { n: GlyphName; size?: number | string; label?: string }) {
  return (
    <svg data-glyph={n} width={size ?? '1.15em'} height={size ?? '1.15em'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={{ display: 'inline-block', verticalAlign: '-0.18em', flex: 'none' }}>
      <path d={PATHS[n]} />
    </svg>
  )
}
/** The same icon for data files, where JSX is not written: `icon: glyph('calendar')`. */
export const glyph = (n: GlyphName, key?: string): ReactElement => createElement(Glyph, { n, key: key ?? n })
