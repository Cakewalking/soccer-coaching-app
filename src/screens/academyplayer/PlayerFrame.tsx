// The frame the academy player's own screens share (13 and over): a green head with Back, the page, one button at the foot.

import type { ReactNode } from 'react'

import { G, INK, LINE } from './styles'

export default function PlayerFrame({ id, title, onBack, children, foot }: { id: string; title: string; onBack: () => void; children: ReactNode; foot: ReactNode }) {
  return (
    <div data-board={id} style={{ width: 390, height: 844, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button aria-label="Back" onClick={onBack} style={{ flex: 'none', width: 44, height: 44, marginLeft: -8, borderRadius: 999, border: 0, padding: 0, background: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <span style={{ flexGrow: 1 }}>
          <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>Kai O · Tall Timber Academy</span>
          <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>{title}</span>
        </span>
        <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>KO</span>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, overflow: 'hidden', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
      <div style={{ flex: 'none', padding: '10px 14px 14px', background: '#ffffff', borderTop: `1px solid ${LINE}`, display: 'flex', gap: 8 }}>{foot}</div>
    </div>
  )
}
