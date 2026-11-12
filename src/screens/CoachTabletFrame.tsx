import { useState } from 'react'
import type { ReactNode } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

interface CoachTabletFrameProps {
  navTabs: { id: string; label: string; icon: string }[]
  activeNav: string
  onNav: (id: string) => void
  subTabs?: string[]
  activeSubTabIndex?: number
  onSubTab?: (i: number) => void
  roleChip: string
  teamLabel: string
  avatarLetters: string
  avatarBg?: string
  showAsk?: boolean
  askOpen?: boolean
  onAskToggle?: () => void
  showBadge?: (tab: string) => boolean
  children: ReactNode
}

export default function CoachTabletFrame({
  navTabs, activeNav, onNav,
  subTabs = [], activeSubTabIndex = 0, onSubTab,
  roleChip, teamLabel, avatarLetters, avatarBg = '#c39797',
  showAsk = true, askOpen = false, onAskToggle,
  showBadge,
  children,
}: CoachTabletFrameProps) {
  const [askInput, setAskInput] = useState('')
  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      <div style={{ flex: 'none', background: '#ffffff', borderBottom: `1px solid ${LN}` }}>

        {/* 64px green nav bar */}
        <div style={{ height: 64, padding: '0 28px', background: G, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => onNav('home')} style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: '0 8px', alignSelf: 'stretch', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            Clean Sheet
          </button>
          <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
            {navTabs.map(t => (
              <button key={t.id} onClick={() => onNav(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: 7, height: 44, padding: '0 14px', borderRadius: '999px',
                border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: activeNav === t.id ? G2 : 'transparent', color: '#fff',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
                {t.label}
              </button>
            ))}
          </nav>
          {showAsk && (
            <button onClick={onAskToggle} aria-label="Ask Clean Sheet" style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.3)', background: askOpen ? 'rgba(255,255,255,0.15)' : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
              Ask
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', fontSize: 15, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
            {teamLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '999px', background: avatarBg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{avatarLetters}</div>
        </div>

        {/* 44px white sub-tabs bar */}
        {subTabs.length > 0 && (
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
              {subTabs.map((tab, i) => {
                const active = i === activeSubTabIndex
                return (
                  <button key={tab} onClick={() => onSubTab?.(i)} style={{
                    height: 44, padding: '0 16px', border: 0, background: 'transparent',
                    fontFamily: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                    color: active ? INK : MUT, cursor: 'pointer',
                    borderBottom: active ? `3px solid ${G2}` : '3px solid transparent',
                    display: 'flex', alignItems: 'center', paddingBottom: 3, gap: 6,
                    boxSizing: 'border-box',
                  }}>
                    {tab}
                    {showBadge?.(tab) && (
                      <span style={{ background: '#c39797', color: INK, borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>
                    )}
                  </button>
                )
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: '999px', background: PALE, color: G, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"/></svg>
                {roleChip}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content + Ask overlay */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
        {showAsk && askOpen && (
          <aside role="dialog" aria-label="Ask Clean Sheet" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 400, background: '#fff', borderLeft: `1px solid ${LN}`, boxShadow: '-8px 0 32px rgba(16,33,31,0.12)', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>Ask Clean Sheet</span>
              <button onClick={onAskToggle} aria-label="Close" style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 20 }}>
                {['Who needs a rest?', 'What to work on tonight?', 'Is everyone getting fair minutes?', 'Why did we concede Saturday?'].map(q => (
                  <button key={q} onClick={() => setAskInput(q)} style={{ padding: '7px 12px', borderRadius: 100, border: `1px solid ${LN}`, background: askInput === q ? G : PALE, color: askInput === q ? '#fff' : G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
                ))}
              </div>
              <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: G, marginBottom: 8, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>Clean Sheet</div>
                Mia has played 58% of available minutes — 9 of the last 12 games. She was absent for one game and came off at half-time twice, both times with a note about hamstring load. She is under the equal-minutes threshold for U12.
              </div>
              <div style={{ fontSize: 11, color: MUT, marginTop: 16, lineHeight: 1.6 }}>It answers from what you can see as head coach. It never sends anything by itself. Wellness and welfare concerns are never used.</div>
            </div>
            <div style={{ padding: '12px 16px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8, flexShrink: 0 }}>
              <input value={askInput} onChange={e => setAskInput(e.target.value)} placeholder="Ask about your team…" style={{ flex: 1, height: 44, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', outline: 'none', color: INK }} />
              <button onClick={() => setAskInput('')} style={{ height: 44, padding: '0 16px', borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask</button>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
