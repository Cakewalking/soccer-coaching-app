import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']
const MSGS = [
  { ini: 'CS', name: 'Clean Sheet · Wellness check-ins', time: '7:30 am', text: 'Ella has felt low two days running', sub: 'Needs a look', bold: true, badge: '#c04040' },
  { ini: 'CS', name: 'Clean Sheet · Data', time: '7:12 am', text: '3 GPS vests didn\'t sync', sub: 'Fix before Saturday' },
  { ini: 'PS', name: 'Priya Shah · Fitness coach', time: 'Yesterday', text: 'Sprint caps set for Noah and Zoe', sub: 'Both are in a growth spurt. I\'ve capped them…' },
  { ini: 'LT', name: 'Linh Tran · Mia\'s mum', time: 'Tue', text: 'Mia might be 10 minutes late Thursday', sub: 'Waiting on you' },
  { ini: 'CS', name: 'Clean Sheet', time: 'Mon', text: 'Player goals: 3 need work', sub: 'Grace, Leo and Ava are behind on their goals.' },
  { ini: 'CS', name: 'Clean Sheet', time: 'Sun', text: 'Last week\'s plan worked', sub: 'Pressing wins in their half up from 11 to 13.' },
]

export default function I1bInboxElla(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Home' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Home' ? G2 : 'transparent', cursor: 'pointer' }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: n === 'Inbox' ? 700 : 500, color: n === 'Inbox' ? INK : MUT, borderBottom: `3px solid ${n === 'Inbox' ? G2 : 'transparent'}`, cursor: 'pointer' }}>{n}{n === 'Inbox' && <span style={{ background: '#c04040', color: '#fff', fontSize: 10, fontWeight: 800, width: 16, height: 16, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span>}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
      </div>
      <main style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '340px minmax(0,1fr)', overflow: 'hidden' }}>
        {/* Inbox list */}
        <div style={{ borderRight: `1px solid ${LN}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: INK }}>Inbox</div>
            <button onClick={() => st('Opening new message.')} style={{ height: 36, padding: '0 14px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>New message</button>
          </div>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${LN}` }}>
            {['All', 'Unread 2', 'People', 'Clean Sheet'].map((f, i) => <button key={f} style={{ flex: 1, height: 36, border: 'none', borderBottom: i === 0 ? `2px solid ${G}` : '2px solid transparent', background: 'transparent', fontSize: 12, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? G : MUT, cursor: 'pointer' }}>{f}</button>)}
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            {MSGS.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: i === 0 ? PALE : '#fff', cursor: 'pointer', borderLeft: i === 0 ? `3px solid #c04040` : '3px solid transparent' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: i < 2 ? '#d0d8d4' : (i === 2 ? '#8c6e5a' : '#c9b8d0'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{msg.ini}</div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{msg.name}</span>
                    <span style={{ fontSize: 11, color: MUT, flexShrink: 0, marginLeft: 4 }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: msg.bold ? 700 : 600, color: INK, marginTop: 1 }}>{msg.text}</div>
                  <div style={{ fontSize: 12, color: MUT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{msg.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Ella panel */}
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '16px 20px', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: '#c04040', fontWeight: 700 }}>Ella Brandt · wellness</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginTop: 2 }}>From this morning's check-in · seen by coaches and her parent</div>
            </div>
            <button onClick={() => st('Marked as done.')} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Mark as done</button>
          </div>
          <div style={{ background: '#fff', border: `1.5px solid #e0c0c0`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>Ella has felt low two days running</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Ella scored 2 out of 5 on Wednesday and today. She said she is sleeping badly. Her legs and energy are fine.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>What you can do</div>
            {[{ label: 'Keep tonight light for Ella', sub: 'Adds her to Adjust tonight: first 15 min of the small game only', done: true }, { label: 'Have a quick chat before warm-up', sub: "Adds a reminder to tonight's session", done: false }, { label: "Message Ella's parent", sub: 'Anna Brandt. Her check-in answers aren\'t shared', done: false }].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: a.done ? G : '#fff', border: `2px solid ${a.done ? G : LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  {a.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{a.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{a.sub}</div>
                  {a.done && <div style={{ fontSize: 12, fontWeight: 700, color: G, marginTop: 2 }}>Added</div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Ella's check-ins · coaches and her parent only</div>
            <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(4,1fr)', gap: 1, fontSize: 12 }}>
              {['', 'Mon', 'Tue', 'Wed', 'Thu'].map((h, i) => <div key={i} style={{ padding: '4px 6px', fontWeight: 700, color: MUT, textAlign: 'center' as const }}>{h}</div>)}
              {[{ row: 'Sleep', vals: [4, 3, 2, 2] }, { row: 'Body', vals: [4, 4, 4, 4] }, { row: 'Mood', vals: [4, 3, 2, 2] }].map(r => [
                <div key={r.row} style={{ padding: '6px 6px', color: MUT, fontWeight: 600 }}>{r.row}</div>,
                ...r.vals.map((v, i) => <div key={i} style={{ padding: '6px', textAlign: 'center' as const, fontWeight: 700, color: v <= 2 ? '#c04040' : v <= 3 ? '#c0a040' : G }}>{v}</div>)
              ])}
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>To Anna Brandt (Ella's mum) · Ella's check-in answers won't be attached</div>
            <input defaultValue="Just checking in on Ella" style={{ width: '100%', height: 44, borderRadius: 8, border: `1.5px solid ${LN}`, padding: '0 12px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, marginBottom: 8 }}/>
            <textarea defaultValue="All OK at home?" style={{ width: '100%', height: 60, borderRadius: 8, border: `1.5px solid ${LN}`, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'none' as const, boxSizing: 'border-box' as const, marginBottom: 8 }}/>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              {['Player', 'Clip', 'Drill', 'Session'].map(t => <button key={t} onClick={() => st(`Adding ${t}.`)} style={{ height: 32, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G, cursor: 'pointer' }}>{t}</button>)}
            </div>
            <button onClick={() => st('Message sent to Anna.')} style={{ height: 44, width: '100%', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Send</button>
            <div style={{ fontSize: 11, color: MUT, marginTop: 8 }}>Messages with parents are kept by the club. Your club welfare officer can see them.</div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
