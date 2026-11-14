import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', BG = '#f5f6f4'

function Session({ time, group, detail, plan, tag }: { time: string; group: string; detail: string; plan: string; tag?: string }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT }}>{time}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>{group}</div>
          <div style={{ fontSize: 13, color: MUT }}>{detail}</div>
        </div>
        {tag && <div style={{ fontSize: 11, fontWeight: 700, background: '#fef2f2', color: '#c05', padding: '3px 10px', borderRadius: 20, border: '1px solid #fca5a5', flexShrink: 0 }}>{tag}</div>}
      </div>
      <div style={{ fontSize: 12, color: MUT }}>Plan: {plan}</div>
    </div>
  )
}

export default function ACC1CoachToday() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 28, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Today', 'Players', 'Game day', 'Library'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Today' ? 700 : 500, color: t === 'Today' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Tall Timber Academy</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>RW</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 'calc(820px - 52px)' }}>
        {/* Left sidebar */}
        <div style={{ background: '#fff', borderRight: `1px solid ${LN}`, padding: '12px 0' }}>
          {['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested'].map(item => (
            <div key={item} style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: item === 'Today' ? 700 : 500,
              color: item === 'Today' ? G : MUT,
              background: item === 'Today' ? '#eef5f2' : 'transparent',
              borderLeft: item === 'Today' ? `3px solid ${G}` : '3px solid transparent',
              cursor: 'pointer',
            }}>{item}</div>
          ))}
          <div style={{ marginTop: 'auto', padding: '12px 20px', borderTop: `1px solid ${LN}`, fontSize: 11, color: MUT }}>Academy coach</div>
        </div>

        {/* Main */}
        <div style={{ overflowY: 'auto', padding: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 2 }}>Hi Reece</div>
            <div style={{ fontSize: 13, color: MUT }}>Thursday 4 June · 3 sessions today at Messmate Primary School</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button onClick={() => st('Opening group chats.')} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Group chats</button>
              <button onClick={() => st('Opening message to Dani.')} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Message Dani</button>
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Today · tap a session to run it</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <Session time="4:30" group="Development · 9 to 11" detail="14 coming · Arjun Mehta is on trial" plan="First touch on the move" tag="1 trial" />
            <Session time="5:30" group="Advanced · 12 to 14" detail="20 coming · Lola and Finn are making up a missed session" plan="Finishing with the weaker foot" tag="2 make-ups" />
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', cursor: 'pointer' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT }}>6:45</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>One-on-one · Kai Okonkwo</div>
              <div style={{ fontSize: 13, color: MUT }}>45 minutes · pitch 2, in open view</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Plan: Built from Kai's goal: weaker-foot finishing</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>Parent told</div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Plans come from each group's term plan. Swap any drill from the library.</div>

          {/* Alerts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            <div style={{ background: '#fff', border: `1px solid #fca5a5`, borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 16, flexShrink: 0 }}>⚠</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Zane: easy on sprints</div>
                <div style={{ fontSize: 12, color: MUT }}>5 sessions this week across club and academy</div>
              </div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 16, flexShrink: 0 }}>+</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Arjun's first time</div>
                <div style={{ fontSize: 12, color: MUT }}>Assess him in the last 10 minutes</div>
              </div>
            </div>
          </div>

          {/* Reports card */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Term reports</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>8 of your 52 are drafted from your notes. 4 are ready for you to check.</div>
            <button onClick={() => st('Opening draft report.')} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Check a draft</button>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
