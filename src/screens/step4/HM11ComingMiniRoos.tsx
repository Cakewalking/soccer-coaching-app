import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const COMING = ['Ivy Chen', 'Max Bailey', 'Arlo Kaur', 'Zara Moore', 'Leo Wright', 'Evie Nolan', 'Theo Santos']
const MAYBE = [{ name: 'Poppy Dunn', reason: 'School concert. Mum will say by Friday' }]
const NOANSWER = [{ name: 'Jude Lim', reason: 'Asked Tuesday and Thursday' }]
const AWAY = [{ name: 'Omar Haddad', reason: "At his grandparents'. Back next week" }]

export default function HM11ComingMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>U9 Tom · Wattle Creek</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Game day' ? 700 : 500, color: t === 'Game day' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>MiniRoos</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Who's coming</div>
            <div style={{ fontSize: 13, color: MUT }}>Sat 6 Jun · 8:30 vs Northgate City · you need 7</div>
          </div>
          <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }} onClick={() => st('Sending reminders.')}>Remind 2 families</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            {/* Coming */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 10 }}>Coming · {COMING.length} · enough for a game</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
                {COMING.map(name => (
                  <div key={name} style={{ background: PALE, borderRadius: 8, padding: '5px 10px', fontSize: 13, color: GD, fontWeight: 500 }}>{name}</div>
                ))}
              </div>
            </div>

            {/* Maybe */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>Maybe · {MAYBE.length}</div>
              {MAYBE.map(p => (
                <div key={p.name} style={{ padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.reason}</div>
                </div>
              ))}
            </div>

            {/* No answer */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>No answer · {NOANSWER.length}</div>
              {NOANSWER.map(p => (
                <div key={p.name} style={{ padding: '5px 0' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.reason}</div>
                </div>
              ))}
            </div>

            {/* Away */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>Away · {AWAY.length}</div>
              {AWAY.map(p => (
                <div key={p.name} style={{ padding: '5px 0' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>Saturday looks fine</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>7 for sure, and you need 7</div>
              <div style={{ fontSize: 12, color: MUT }}>If Poppy and Jude both come, everyone gets a rest block.</div>
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Training tonight</div>
              <div style={{ fontSize: 13, color: MUT }}>9 coming · Omar is away</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>If fewer than 7 can make a game, Clean Sheet tells you and the club on Thursday.</div>
            </div>
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
