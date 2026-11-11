import { useState } from 'react'

export const TILE: React.CSSProperties = { background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, boxSizing: 'border-box', padding: '14px 18px 12px', display: 'flex', flexDirection: 'column', gap: 0, minHeight: 0, minWidth: 0 }

export function Toggle({ on }: { on: boolean }) {
  return (
    <span style={{ flexShrink: 0, width: 52, height: 32, borderRadius: '999px', background: on ? '#2f6252' : '#c5c8c4', display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start', padding: 3, boxSizing: 'border-box' as const }}>
      <span style={{ width: 26, height: 26, borderRadius: '999px', background: '#fff' }} />
    </span>
  )
}

export function ToggleRow({ title, desc, on: defaultOn }: { title: string; desc: string; on: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
      <span style={{ flexGrow: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{title}</span>
        <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{desc}</span>
      </span>
      <button onClick={() => setOn(o => !o)} style={{ border: 0, padding: 0, background: 'transparent', cursor: 'pointer', flexShrink: 0 }} aria-pressed={on} aria-label={title}>
        <Toggle on={on} />
      </button>
    </div>
  )
}

export function ActionRow({ title, desc, label, toast, onToast }: { title: string; desc: string; label: string; toast: string; onToast: (m: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
      <span style={{ flexGrow: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{title}</span>
        <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{desc}</span>
      </span>
      <button onClick={() => onToast(toast)} style={{ flexShrink: 0, height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f', whiteSpace: 'nowrap' as const }}>{label}</button>
    </div>
  )
}

export function BadgeRow({ title, desc, badge, badgeBg = '#e9eae8', badgeColor = '#10211f' }: { title: string; desc: string; badge: string; badgeBg?: string; badgeColor?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
      <span style={{ flexGrow: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{title}</span>
        <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{desc}</span>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: badgeBg, color: badgeColor, whiteSpace: 'nowrap' as const }}>{badge}</span>
    </div>
  )
}

export function SegmentRow({ title, desc, options, active }: { title: string; desc: string; options: string[]; active: number }) {
  const [sel, setSel] = useState(active)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
      <span style={{ flexGrow: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{title}</span>
        <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{desc}</span>
      </span>
      <span style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 12, background: '#e9eae8', flexShrink: 0 }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => setSel(i)} style={{ height: 44, padding: '0 14px', borderRadius: 9, fontSize: 14, border: 0, cursor: 'pointer', fontFamily: 'inherit', background: sel === i ? '#fff' : 'transparent', fontWeight: sel === i ? 700 : 600, color: sel === i ? '#10211f' : '#4a5a57', boxShadow: sel === i ? '0 1px 2px rgba(16,33,31,0.12)' : 'none' }}>{o}</button>
        ))}
      </span>
    </div>
  )
}

export function SectionNote({ text }: { text: string }) {
  return <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 10 }}>{text}</span>
}
