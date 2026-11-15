import type { ReactNode } from 'react'

// Shared parts for the director-feedback boards (HANDOVER "The six parts").
// Palette: dark panel, pale-on-dark, amber (heading + proof number + main button only).
export const DARK = '#1c3a33', PALEON = '#a9cfc0', AMBER = '#f4c95d', GREEN = '#2f6252'
export const INK = '#10211f', MUT = '#4a5a57', HAIR = '#e9eae8', CTL = '#c5c8c4', PALEGREEN = '#eef5f2'

export type Figure = { num: string; label: string; proof?: boolean }
export type PanelBtn = { label: string; onClick?: () => void; main?: boolean }

// 1. The opening panel — dark #1c3a33, amber heading + proof figure + main button.
export function OpeningPanel({
  heading, sentence, support, figures, buttons, right, landing = false, rightWidth = 340,
}: {
  heading: string; sentence: string; support?: string;
  figures?: Figure[]; buttons?: PanelBtn[]; right?: ReactNode; landing?: boolean; rightWidth?: number;
}) {
  return (
    <div style={{ flex: 'none', padding: '14px 28px 0' }}>
      <section aria-label={heading} style={{ borderRadius: 20, background: DARK, color: '#fff', padding: '16px 22px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: `minmax(0,1fr) ${rightWidth}px`, gap: 26, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER, textTransform: 'uppercase' as const }}>{heading}</span>
          <h1 style={{ margin: 0, fontSize: landing ? 23 : 21, lineHeight: landing ? '30px' : '28px', letterSpacing: '-0.02em', fontWeight: 700 }}>{sentence}</h1>
          {support && <span style={{ fontSize: 15, lineHeight: '21px', color: PALEON }}>{support}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {right ?? (figures && (
            <span style={{ display: 'flex', gap: 8 }}>
              {figures.map((f, i) => (
                <span key={i} style={{ flex: 1, minWidth: 0, borderRadius: 12, background: 'rgba(255,255,255,0.10)', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <strong style={{ fontSize: 24, lineHeight: '30px', letterSpacing: '-0.01em', color: f.proof ? AMBER : '#fff', fontVariantNumeric: 'tabular-nums' }}>{f.num}</strong>
                  <span style={{ fontSize: 12, lineHeight: '16px', color: PALEON }}>{f.label}</span>
                </span>
              ))}
            </span>
          ))}
          {buttons && (
            <span style={{ display: 'flex', gap: 8 }}>
              {buttons.map((b, i) => (
                <button key={i} onClick={b.onClick} style={{ flex: b.main ? 1 : 'none', height: 46, padding: '0 18px', borderRadius: 12, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' as const, background: b.main ? AMBER : 'transparent', color: b.main ? INK : '#fff', border: b.main ? `1px solid ${AMBER}` : `1px solid ${PALEON}` }}>{b.label}</button>
              ))}
            </span>
          )}
        </div>
      </section>
    </div>
  )
}

// 2. A readiness chip: Football / Body / Head / Settling / Load.
export type ChipState = 'strong' | 'some' | 'notyet'
export function Chip({ label, state }: { label: string; state: ChipState }) {
  const base = { height: 28, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box' as const, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' as const }
  const s = state === 'strong' ? { background: GREEN, color: '#fff', border: `1px solid ${GREEN}` }
    : state === 'some' ? { background: PALEGREEN, color: INK, border: `1px solid ${PALEGREEN}` }
    : { background: '#fff', color: MUT, border: '1px dashed #8a9794' }
  return (
    <span style={{ ...base, ...s }}>
      {state === 'strong' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>}
      {label}
    </span>
  )
}
export const CHIP_LABELS = ['Football', 'Body', 'Head', 'Settling', 'Load'] as const
export function ChipRow({ states }: { states: ChipState[] }) {
  return <span style={{ display: 'inline-flex', gap: 4 }}>{CHIP_LABELS.map((l, i) => <Chip key={l} label={l} state={states[i] ?? 'notyet'} />)}</span>
}

// 4. The dark empty panel — for the empty states + PRM4-CoachOff.
export function DarkEmptyPanel({ icon, title, body, buttons }: { icon?: ReactNode; title: string; body: string; buttons: PanelBtn[] }) {
  return (
    <div style={{ background: DARK, borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' as const, color: '#fff', maxWidth: 560, margin: '0 auto' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', border: `1.5px solid ${AMBER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: AMBER }}>
        {icon ?? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 14, lineHeight: '21px', color: PALEON, maxWidth: 420 }}>{body}</div>
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        {buttons.map((b, i) => (
          <button key={i} onClick={b.onClick} style={{ height: 46, padding: '0 20px', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: b.main ? 'none' : `1px solid ${PALEON}`, background: b.main ? AMBER : 'transparent', color: b.main ? INK : '#fff' }}>{b.label}</button>
        ))}
      </div>
    </div>
  )
}

// 5. The attention card for the file editors — dark, amber main button.
export function AttentionCard({ title, body, buttons }: { title: string; body?: string; buttons: PanelBtn[] }) {
  return (
    <div style={{ background: DARK, borderRadius: 14, padding: '14px 16px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
      {body && <div style={{ fontSize: 14, lineHeight: '20px', color: PALEON }}>{body}</div>}
      <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
        {buttons.map((b, i) => (
          <button key={i} onClick={b.onClick} style={{ height: 44, padding: '0 16px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: b.main ? 'none' : `1px solid ${PALEON}`, background: b.main ? AMBER : 'transparent', color: b.main ? INK : '#fff' }}>{b.label}</button>
        ))}
      </div>
    </div>
  )
}
