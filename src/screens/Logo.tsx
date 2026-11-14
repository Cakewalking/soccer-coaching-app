// Clean Sheet logo: three stacked sheets, top sheet marked as a pitch
// (halfway line + centre circle). White mark on the green tile #2f6252,
// corner radius 26% of the side. Switch the drawing at 36px: the small
// drawing below (thicker lines, filled spot), the large one from there up.
// No amber in the logo. Source: logo/clean-sheet-icon(.svg / -small.svg).

const GREEN = '#2f6252'

function MarkLarge({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
      <path d="M60 20l44 24-44 24-44-24z" fill="none" stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
      <path d="M16 62l44 24 44-24M16 79l44 24 44-24" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 32L38 56" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="60" cy="44" rx="10" ry="5.5" fill="none" stroke={stroke} strokeWidth="3.5" />
    </svg>
  )
}

function MarkSmall({ stroke, fill }: { stroke: string; fill: string }) {
  return (
    <svg viewBox="6 8 108 108" width="100%" height="100%" aria-hidden="true">
      <path d="M60 16l46 26-46 26-46-26z" fill="none" stroke={stroke} strokeWidth="8" strokeLinejoin="round" />
      <path d="M14 62l46 26 46-26M14 80l46 26 46-26" fill="none" stroke={stroke} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M83 29L37 55" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="60" cy="42" rx="7.5" ry="4.3" fill={fill} />
    </svg>
  )
}

/** The mark alone (no tile), in `color`. */
export function LogoMark({ size = 24, color = GREEN }: { size?: number; color?: string }) {
  return (
    <span style={{ width: size, height: size, display: 'inline-flex' }}>
      {size < 36 ? <MarkSmall stroke={color} fill={color} /> : <MarkLarge stroke={color} />}
    </span>
  )
}

/** The mark in white on the green tile (the app icon / brand tile). */
export default function Logo({ size = 32 }: { size?: number }) {
  const inner = size * 0.8
  return (
    <span style={{ width: size, height: size, borderRadius: size * 0.26, background: GREEN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ width: inner, height: inner, display: 'inline-flex' }}>
        {size < 36 ? <MarkSmall stroke="#fff" fill="#fff" /> : <MarkLarge stroke="#fff" />}
      </span>
    </span>
  )
}
