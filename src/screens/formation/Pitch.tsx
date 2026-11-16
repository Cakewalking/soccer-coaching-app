// A football pitch drawn to proportion, other team's goal at the top.
// Players sit at the same per-cent coordinates the Formation builder uses.

export type PitchToken = { id: string; num: number; name: string; pos: string; x: number; y: number; out?: boolean; ring?: boolean }
export type PitchLink = { a: string; b: string; strong?: boolean }

const W = 680, H = 960, M = 24            // drawing units; M = run-off around the lines
const FW = W - M * 2, FH = H - M * 2
const px = (x: number) => M + (x / 100) * FW
const py = (y: number) => M + (y / 100) * FH
const LINE = 'rgba(255,255,255,0.78)'
const LINK = '#f3dfa9'

export function PitchSvg({ tokens, links = [], label }: { tokens: PitchToken[]; links?: PitchLink[]; label: string }) {
  const at = Object.fromEntries(tokens.map(t => [t.id, t]))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14 }}>
      {/* grass, mown in bands */}
      <rect width={W} height={H} fill="#2c6a48" />
      {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={0} y={M + i * (FH / 6)} width={W} height={FH / 12} fill="#327452" />)}
      <g fill="none" stroke={LINE} strokeWidth={3} strokeLinecap="round">
        <rect x={M} y={M} width={FW} height={FH} />
        <line x1={M} y1={H / 2} x2={W - M} y2={H / 2} />
        <circle cx={W / 2} cy={H / 2} r={86} />
        {/* far end */}
        <rect x={150} y={M} width={380} height={150} />
        <rect x={255} y={M} width={170} height={52} />
        <path d={`M267.3 ${M + 150} A86 86 0 0 0 412.7 ${M + 150}`} />
        <rect x={300} y={M - 14} width={80} height={14} />
        {/* near end */}
        <rect x={150} y={H - M - 150} width={380} height={150} />
        <rect x={255} y={H - M - 52} width={170} height={52} />
        <path d={`M267.3 ${H - M - 150} A86 86 0 0 1 412.7 ${H - M - 150}`} />
        <rect x={300} y={H - M} width={80} height={14} />
        {/* corners */}
        <path d={`M${M} ${M + 14} A14 14 0 0 0 ${M + 14} ${M}`} />
        <path d={`M${W - M - 14} ${M} A14 14 0 0 0 ${W - M} ${M + 14}`} />
        <path d={`M${M + 14} ${H - M} A14 14 0 0 0 ${M} ${H - M - 14}`} />
        <path d={`M${W - M} ${H - M - 14} A14 14 0 0 0 ${W - M - 14} ${H - M}`} />
      </g>
      <g fill={LINE}>
        <circle cx={W / 2} cy={H / 2} r={5} /><circle cx={W / 2} cy={M + 104} r={5} /><circle cx={W / 2} cy={H - M - 104} r={5} />
      </g>
      {/* pairs that work */}
      {links.map(l => at[l.a] && at[l.b] ? (
        <line key={`${l.a}-${l.b}`} x1={px(at[l.a].x)} y1={py(at[l.a].y)} x2={px(at[l.b].x)} y2={py(at[l.b].y)} stroke={LINK} strokeWidth={l.strong ? 14 : 8} strokeLinecap="round" opacity={l.strong ? 1 : 0.8} />
      ) : null)}
      {tokens.map(t => (
        <g key={t.id} transform={`translate(${px(t.x)} ${py(t.y)})`} opacity={t.out ? 0.6 : 1}>
          {t.ring && <circle r={41} fill="none" stroke={LINK} strokeWidth={6} />}
          <circle r={33} fill="#fff" stroke={t.out ? '#10211f' : 'none'} strokeWidth={3} strokeDasharray={t.out ? '7 6' : undefined} />
          <text y={10} textAnchor="middle" fontSize={29} fontWeight={800} fill="#10211f">{t.num}</text>
          <text y={64} textAnchor="middle" fontSize={25} fontWeight={700} fill="#fff" stroke="rgba(16,33,31,0.75)" strokeWidth={7} strokeLinejoin="round" style={{ paintOrder: 'stroke' }}>
            {t.name}<tspan fontSize={19} fill="rgba(255,255,255,0.78)" dx={7}>{t.pos}</tspan>
          </text>
        </g>
      ))}
    </svg>
  )
}
