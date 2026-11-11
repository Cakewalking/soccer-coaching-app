import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const WINDOWS = [
  { group: 'U12 to U13',      dates: '12 to 25 October',          status: 'Open' },
  { group: 'U14 to U16',      dates: '12 October to 7 November',  status: 'Open' },
  { group: 'U17 and U18',     dates: '12 October to 7 November',  status: 'Open' },
  { group: 'MiniRoos, U7 to U11', dates: 'No trials · Everyone who registers plays', status: 'None' },
]

const RULES = [
  'Current players are asked first',
  'Two sessions before a no',
  'Every family hears back in 2 days',
  'Birth month shown to coaches',
]
const RULE_NOTES = [
  'Before any place is offered outside',
  'One bad day isn\'t a trial',
  'In the club\'s kind words, never scores',
  'So younger players aren\'t missed',
]

export default function SP19TrialWindow(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Director of football</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Trial dates and rules</div>
          <div style={{ fontSize: 14, color: MUT }}>Wattle Creek FC · for the 2027 season</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Trial dates published on the club page and sent to every coach.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Run a club trial</button>
          <button onClick={() => t('Trial dates published on the club page and sent to every coach.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Publish to families</button>
        </div>
      </div>

      {/* Trial windows */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>When teams can trial</div>
        </div>
        {WINDOWS.map((w, i) => (
          <div key={w.group} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '12px 16px', alignItems: 'center', borderBottom: i < WINDOWS.length - 1 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{w.group}</div>
            <div style={{ fontSize: 14, color: MUT }}>{w.dates}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: w.status === 'Open' ? G : MUT }}>{w.status}</div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', background: '#f9faf9', fontSize: 12, color: MUT }}>A coach can't add a trial player outside these dates. Where a league sets its own trial window, as Football Victoria does for junior NPL, those dates are used and can't be widened.</div>
      </div>

      {/* Club rules */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>The club's rules for every trial</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {RULES.map((rule, i) => (
            <div key={rule} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 2 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{rule}</div>
                <div style={{ fontSize: 12, color: MUT }}>{RULE_NOTES[i]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16 }}>
        {[
          { day: 'FRI', date: '13', label: 'Squad lists to you', note: '13 November' },
          { day: 'MON', date: '11', label: 'Registration opens', note: '11 January, in PlayFootball' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 48, flex: 'none', textAlign: 'center' as const }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>{item.day}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>{item.date}</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.label}</div>
              <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, background: PALE, borderRadius: 12, padding: '12px 16px' }}>
        Coaches can't message a player at another club. A family asks to trial; the club never approaches a child.
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
