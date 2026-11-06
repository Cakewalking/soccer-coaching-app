import { useState } from 'react'

const MESSAGES = [
  { id: 0, from: 'Clean Sheet · Wellness check-ins', time: '7:30 am', preview: 'Ella has felt low two days running', tag: 'Needs a look', tagBg: '#c39797', tagColor: '#10211f', unread: true, icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 7v5l3 3', iconBg: '#40826d' },
  { id: 1, from: 'Clean Sheet · Data',                time: '7:12 am', preview: '3 GPS vests didn\'t sync', tag: 'Fix before Saturday', tagBg: '#cbbeb5', tagColor: '#10211f', unread: true, icon: 'M22 12h-4M6 12H2M12 2v4M12 18v4', iconBg: '#c39797' },
  { id: 2, from: 'Priya Shah · Fitness Coach',        time: 'Yesterday', preview: 'Sprint caps set for Noah and Zoe', tag: null, unread: false, icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8', iconBg: '#c39797' },
  { id: 3, from: 'Linh Tran · Mia\'s mum',           time: 'Tue',      preview: 'Mia might be 10 minutes late Thursday', tag: 'Waiting on you', tagBg: '#cbbeb5', tagColor: '#10211f', unread: false, icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8', iconBg: '#cbbeb5' },
  { id: 4, from: 'Clean Sheet',                       time: 'Mon',      preview: 'Player goals: 3 need work', tag: null, unread: false, icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6', iconBg: '#40826d' },
  { id: 5, from: 'Clean Sheet',                       time: 'Sun',      preview: 'Last week\'s plan worked', tag: null, unread: false, icon: 'M4 11l8-7 8 7v9H4z', iconBg: '#40826d' },
  { id: 6, from: 'Clean Sheet',                       time: 'Sun',      preview: 'Match review ready: Ironbark United, won 3–1', tag: null, unread: false, icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', iconBg: '#40826d' },
]

const THREAD_MSGS = [
  { from: 'Priya Shah', time: 'Wednesday', body: "Both are in a growth spurt. I've capped them at 3 sprints tonight and 8 on Saturday." },
  { from: 'Priya', sub: 'Noah Okafor', subNote: 'Grew 11 cm this month · 26 sprints last week, limit 20', time: '4:52 pm', isPlayer: true },
  { from: 'Priya', sub: 'Zoe Hartley',  subNote: 'Grew 0.8 cm this month · 24 sprints last week, limit 20', time: '4:52 pm', isPlayer: true },
  { from: 'Priya', time: '4:53 pm', body: "Shout if you want them to play more than 35 minutes." },
]

const FILTER_TABS = ['All', 'Unread 3', 'People', 'Clean Sheet']

export default function InboxScreen() {
  const [sel, setSel] = useState(2)
  const [filterTab, setFilterTab] = useState(0)

  return (
    <main style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '340px minmax(0,1fr)', overflow: 'hidden' }}>

      {/* Left: message list */}
      <div style={{ borderRight: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', background: '#ffffff' }}>
        {/* List header */}
        <div style={{ flex: 'none', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f0f1ef' }}>
          <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10211f" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
          </button>
          <button style={{ flexGrow: 1, height: 36, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            New message
          </button>
        </div>

        {/* Filter tabs */}
        <div style={{ flex: 'none', display: 'flex', gap: 2, padding: '8px 12px', borderBottom: '1px solid #f0f1ef' }}>
          {FILTER_TABS.map((t, i) => (
            <button key={i} onClick={() => setFilterTab(i)} style={{
              height: 30, padding: '0 12px', borderRadius: '999px', border: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: filterTab === i ? '#10211f' : '#f0f1ef', color: filterTab === i ? '#ffffff' : '#4a5a57',
            }}>{t}</button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {MESSAGES.map((m, i) => (
            <button key={i} onClick={() => setSel(i)} style={{
              width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 10,
              border: 0, borderTop: '1px solid #f0f1ef', background: sel === i ? '#eef5f2' : m.unread ? '#ffffff' : '#fafafa',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            }}>
              <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: m.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={m.icon}/></svg>
              </span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 12, color: '#4a5a57', fontWeight: m.unread ? 600 : 400 }}>{m.from}</span>
                  <span style={{ fontSize: 12, color: '#6f7f7b', flexShrink: 0 }}>{m.time}</span>
                </span>
                <span style={{ display: 'block', fontSize: 14, fontWeight: m.unread ? 700 : 400, lineHeight: '19px', marginBottom: m.tag ? 4 : 0 }}>{m.preview}</span>
                {m.tag && <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '1px 8px', borderRadius: '999px', background: m.tagBg, color: m.tagColor }}>{m.tag}</span>}
              </span>
              {m.unread && <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: '#40826d', marginTop: 8 }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Right: thread */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', background: '#fafafa' }}>
        {/* Thread header */}
        <div style={{ flex: 'none', padding: '14px 24px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff' }}>
          <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: '#c39797', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>PS</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px' }}>Priya Shah</div>
            <div style={{ fontSize: 13, color: '#4a5a57' }}>Fitness coach · U12 coaching team</div>
          </div>
          <div style={{ flexGrow: 1 }} />
          <button style={{ height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#2f6252' }}>Mark as done</button>
        </div>

        {/* Messages */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#6f7f7b', marginBottom: 4 }}>Wednesday</div>

          {THREAD_MSGS.map((msg, i) => {
            if (msg.isPlayer) {
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 10, cursor: 'pointer' }}>
                  <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>
                    {msg.sub === 'Noah Okafor' ? 'NO' : 'ZH'}
                  </span>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{msg.sub}</div>
                    <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>{msg.subNote}</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
                </div>
              )
            }
            return (
              <div key={i} style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 12, padding: '12px 16px' }}>
                <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 6 }}>{msg.time}</div>
                <div style={{ fontSize: 15, lineHeight: '22px' }}>{msg.body}</div>
              </div>
            )
          })}
        </div>

        {/* Quick replies + compose */}
        <div style={{ flex: 'none', padding: '12px 24px', borderTop: '1px solid #e9eae8', background: '#ffffff' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            {["Thanks, sounds good", "Can Zoe play 60 if we're short?", "Let's chat at training"].map(r => (
              <button key={r} style={{ height: 32, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#10211f' }}>{r}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ flexGrow: 1, minHeight: 44, background: '#f7f8f7', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 14px', fontSize: 15, color: '#6f7f7b' }}>
              Reply…
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { label: 'Player', path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8' },
                { label: 'Clip',   path: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
                { label: 'Drill',  path: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16' },
                { label: 'Session',path: 'M4 11l8-7 8 7v9H4z' },
              ].map(a => (
                <button key={a.label} style={{ height: 36, padding: '0 10px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#4a5a57', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={a.path}/></svg>
                  {a.label}
                </button>
              ))}
            </div>
            <button style={{ height: 44, padding: '0 16px', borderRadius: 12, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send</button>
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: '#6f7f7b', textAlign: 'center' }}>Coaching team only. Players and parents never see this.</div>
        </div>
      </div>
    </main>
  )
}
