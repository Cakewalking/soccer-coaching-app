import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const MSGS = [
  { from: 'Ella Brandt', subject: 'Ella has felt low two days running', preview: 'Scored 2 out of 5 on Wednesday and today.', tag: 'Needs a look', urgent: true },
  { from: 'GPS vests', subject: '3 GPS vests didn\'t sync', preview: 'Ruby, Isla and Finn after Tuesday training.', tag: 'Fix before Saturday', urgent: true },
  { from: 'Priya Shah · Fitness coach', subject: 'Sprint caps set for Noah and Zoe', preview: 'Both are in a growth spurt. I\'ve capped them…', tag: null, urgent: false },
  { from: 'Linh Tran · Mia\'s mum', subject: 'Mia might be 10 minutes late Thursday', preview: 'She has a dentist appointment, sorry!', tag: 'Waiting on you', urgent: false },
  { from: 'Player goals', subject: '3 need work', preview: 'Grace, Leo and Ava are behind on their goals.', tag: null, urgent: false },
  { from: 'Clean Sheet', subject: 'Last week\'s plan worked', preview: 'Pressing wins in their half up from 11 to 13.', tag: null, urgent: false },
]

export default function I1Inbox(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState(0)

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Inbox' ? 700 : 500, color: t === 'Inbox' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left pane */}
        <div style={{ width: 380, background: '#fff', borderRight: `1px solid ${LN}`, display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Inbox</div>
            <button style={{ height: 44, padding: '0 12px', borderRadius: 8, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>New message</button>
          </div>
          <div style={{ padding: '0 16px', borderBottom: `1px solid ${LN}`, display: 'flex', gap: 16, height: 40, alignItems: 'center' }}>
            {['All', 'Unread 2', 'People', 'Clean Sheet'].map(t => (
              <div key={t} style={{ fontSize: 12, fontWeight: t === 'All' ? 700 : 500, color: t === 'All' ? G : MUT, borderBottom: t === 'All' ? `2px solid ${G}` : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>{t}</div>
            ))}
          </div>
          <div style={{ overflow: 'auto', flex: 1 }}>
            {MSGS.map((m, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ width: '100%', display: 'block', padding: '12px 16px', background: selected === i ? PALE : '#fff', textAlign: 'left' as const, cursor: 'pointer', border: 'none', borderBottom: `1px solid ${LN}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>{m.from}</div>
                  {m.urgent && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c05', marginTop: 3 }} />}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 2 }}>{m.subject}</div>
                <div style={{ fontSize: 12, color: MUT }}>{m.preview}</div>
                {m.tag && <div style={{ marginTop: 4, fontSize: 11, fontWeight: 700, background: m.urgent ? '#fef2f2' : PALE, color: m.urgent ? '#c05' : G, padding: '2px 8px', borderRadius: 20, display: 'inline-block' }}>{m.tag}</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Right pane */}
        <div style={{ flex: 1, padding: '24px 32px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>{MSGS[selected].subject}</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>From {MSGS[selected].from}</div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.6, marginBottom: 24 }}>{MSGS[selected].preview}</div>
          {selected === 0 && (
            <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 8 }}>What to do</div>
              {['Keep tonight light for Ella', 'Have a quick chat before warm-up', "Message Ella's parent"].map(a => (
                <div key={a} style={{ fontSize: 13, color: G, padding: '4px 0', cursor: 'pointer' }}>→ {a}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
