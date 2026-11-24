// AD27e-CoachLearningEmpty (pack v39): Empty: nothing to show until a coach joins.
// Drawn from the board. The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

const SEE: [string, string][] = [['Required, by name', 'Done or not, for each coach'], ['Everything else', 'In totals only, never who'], ['Your own lessons', 'Made from your coaches’ film']]

export default function AD27eCoachLearningEmpty() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Coach learning</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>No coaches yet</span>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="Coach learning" style={S.tile}>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
            <span style={{ width: 72, height: 72, borderRadius: 999, background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 4-9 4-9-4zM7 9v5c0 2 2.5 3.5 5 3.5s5-1.5 5-3.5V9" /></svg>
            </span>
            <span style={{ fontSize: 22, lineHeight: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>Nothing to show until a coach joins</span>
            <span style={{ fontSize: 15, lineHeight: '22px', color: '#4a5a57', maxWidth: 460 }}>Each coach gets short lessons picked from their own film and the block they are coaching. You set the required ones.</span>
            <Tap to="AD23-AddCoach" style={S.primary}>Add a coach</Tap>
          </div>
        </section>
        <aside aria-label="What you’ll see" style={S.tile}>
          <h2 style={S.h2}>What you’ll see</h2>
          {SEE.map(([t, sub], i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{t}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{sub}</span>
              </span>
            </div>
          ))}
        </aside>
      </main>
    </>
  )
}
