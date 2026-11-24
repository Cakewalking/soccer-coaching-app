import OwnerHeader from '../academy/OwnerHeader'
import { openScreen } from '../openThing'
import { openThing } from '../openThing'
import { useState } from 'react'
const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252'

const TERMS = [
  { term: 'Term 1', when: 'Feb to Apr', clubs: 'Club pre-season', what: 'Academy leads on skill. Club load is building, so academy sprints are capped' },
  { term: 'Term 2', when: 'Apr to Jun', clubs: 'Club season', what: 'Two academy sessions and a club game. One-on-ones kept short' },
  { term: 'Term 3', when: 'Jul to Sep', clubs: 'Club season and finals', what: 'Lighter weeks around finals' },
  { term: 'Term 4', when: 'Oct to Dec', clubs: 'Club post-season', what: 'Trials for clubs. The academy writes a short note if a family asks' },
  { term: 'Holidays', when: 'Dec and Jan', clubs: 'Rest month', what: 'Clinics are optional, and count as football' },
]

export default function SPa1AcademyYear({ onNav }: { onBack?: () => void; onNav?: (id: string) => void }) {
  const [toast, setToast] = useState<string | null>(null)
  void st   // kept for lines this screen may still need to say
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, minHeight: 820, background: '#faf5ec', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <OwnerHeader current="SPa1-AcademyYear" onGo={onNav ?? openScreen} />
      <div style={{ padding: '24px 32px 0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>The football year</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Tall Timber · your terms beside the clubs' year</div>
        </div>
        <button onClick={() => openThing('term date editor', 'academy')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Change term dates</button>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 32px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 120px 180px 1fr', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, padding: '10px 20px', borderBottom: `1px solid ${LN}`, background: '#faf5ec' }}>
            <div>Term</div><div>When</div><div>At their clubs</div><div>What the academy does</div>
          </div>
          {TERMS.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 120px 180px 1fr', padding: '14px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{t.term}</div>
              <div style={{ fontSize: 13, color: MUT }}>{t.when}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{t.clubs}</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{t.what}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>Most of your players also play for a club. Where a family shares their week, both coaches see the whole load.</div>
          </div>
          <div style={{ background: '#fff', border: `2px solid #e8c0c0`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#c04040', marginBottom: 6 }}>6 players have had no month off</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Club, academy, indoor and a clinic add up. The December clinic is flagged as optional for them.</div>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>In trial season</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[{ n: '1', label: 'A note for a trial', sub: 'Only if the family asks for one' }, { n: '2', label: "You don't pick clubs", sub: "Or pass on a player's scores" }, { n: '3', label: 'Your own trials', sub: 'Free, any time of year', action: 'Open' }].map(r => (
              <div key={r.n} style={{ display: 'flex', gap: 10, padding: '10px 0' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: G }}>{r.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
                  {r.action && <button onClick={() => openThing('trials', 'academy')} style={{ marginTop: 4, height: 32, padding: '0 12px', borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{r.action}</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', fontSize: 13, color: MUT }}>
          Open: U13 Timber plays under Wattle Creek FC, so it follows the club's dates.
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
