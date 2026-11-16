import { useState } from 'react'
import { INK, MUT, GREEN, CTL, PALEON, DARK, PALEGREEN } from '../step4/directorParts'
import { YT_PLAYERS, PARENT_RATINGS, type Rating } from './data'

const GD = '#1f4a3e', AMBER = '#f4c95d'

// This parent is Mia's parent (p-tran). Own child = mia.
const ME = PARENT_RATINGS[0]
const SHOWN = ['mia', 'grace', 'jai', 'noah', 'ruby'].map(id => YT_PLAYERS.find(p => p.id === id)!)

export default function YTp1ParentVotes({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [ratings, setRatings] = useState<Record<string, Rating>>({ ...ME.ratings })
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2600) }
  function setRating(id: string, n: Rating) {
    setRatings(prev => { const c = { ...prev }; if (c[id] === n) delete c[id]; else c[id] = n; return c })
    setLastTool(`${id}-${n}`)
  }

  return (
    <div data-screen="YTp1-ParentVotes" data-lasttool={lastTool} style={{ width: 390, minHeight: 844, background: '#f4f6f5', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', margin: '0 auto', position: 'relative' }}>
      {/* Top bar */}
      <div style={{ background: GD, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button aria-label="Back" onClick={() => onNav?.('ASKd8-PhoneHome')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>U12 Sam · Saturday at Ironbark</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#fff' }}>Rate the game</div>
        </div>
        <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>LT</div>
      </div>

      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 90 }}>
        {/* Dark panel */}
        <div style={{ background: DARK, borderRadius: 16, padding: '18px 18px', color: '#fff' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: AMBER, textTransform: 'uppercase', marginBottom: 8 }}>Won 3–1 · Closes Tuesday</div>
          <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>How did they go on Saturday?</div>
          <div style={{ fontSize: 14, color: PALEON, lineHeight: 1.5 }}>Rate as many as you like, 1 to 5. Effort and fair play count as much as goals.</div>
        </div>

        {/* Player cards */}
        {SHOWN.map(p => {
          const own = p.id === ME.ownChildId
          return (
            <div key={p.id} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, padding: '14px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: PALEGREEN, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{p.ini}</span>
                <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: INK }}>{p.name}</span>
                {own && <span style={{ fontSize: 12, color: MUT, fontWeight: 600 }}>Your child</span>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3, 4, 5].map(n => { const on = ratings[p.id] === n; return (
                  <button key={n} onClick={() => setRating(p.id, n as Rating)} style={{ flex: 1, height: 48, borderRadius: 10, border: `1.5px solid ${on ? GD : CTL}`, background: on ? GD : '#fff', color: on ? '#fff' : INK, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{n}</button>
                ) })}
              </div>
            </div>
          )
        })}

        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Only you and Sam can see your ratings. Showing {SHOWN.length} of 16.</div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: `1px solid ${CTL}`, padding: '12px 16px 20px', display: 'flex', gap: 10, flexShrink: 0 }}>
        <button onClick={() => say('Skipped this week. Nothing is sent.')} style={{ flex: 1, height: 52, borderRadius: 12, border: `1.5px solid ${CTL}`, background: '#fff', fontSize: 15, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Skip this week</button>
        <button onClick={() => say('Sent. You can change them until rating closes on Tuesday.')} style={{ flex: 1.4, height: 52, borderRadius: 12, border: 'none', background: GREEN, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send my ratings</button>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 96, transform: 'translateX(-50%)', zIndex: 60, maxWidth: 340, padding: '12px 16px', borderRadius: 14, background: GD, color: '#fff', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', textAlign: 'center' }}>{toast}</div>}
    </div>
  )
}
