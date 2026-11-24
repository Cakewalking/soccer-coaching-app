import CoachNav from '../academycoach/CoachNav'
import { coachGo } from '../academycoach/menu'
import { openThing } from '../openThing'
import { Glyph } from '../Glyph'
import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', BG = '#f5f6f4'

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

export default function ACC1CoachToday({ onNav }: { onNav?: (s: string) => void } = {}) {
  const [toast, setToast] = useState<string|null>(null)
  void st   // kept for lines this screen may still need to say
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <CoachNav active="today" sub="Today" go={coachGo(onNav)} />

      <div style={{ height: 'calc(820px - 108px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 2 }}>Hi Reece</div>
            <div style={{ fontSize: 13, color: MUT }}>Thursday 4 June · 3 sessions today at Messmate Primary School</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button onClick={() => openThing('group chats', 'academy')} style={{ height: 44, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Group chats</button>
              <button onClick={() => onNav ? onNav('ACC13-AcademyChat') : openThing('message to Dani', 'academy')} style={{ height: 44, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Message Dani</button>
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#7a4b5b', marginBottom: 10 }}>Today · tap a session to run it</div>

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
              <div style={{ fontSize: 16, flexShrink: 0 }}><Glyph n="warn" /></div>
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
            <button onClick={() => openThing('draft report', 'academy')} style={{ height: 44, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Check a draft</button>
          </div>
        </div>
      </div>
      {toast && <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
