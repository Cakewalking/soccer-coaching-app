import { useState } from 'react'

function InboxEmpty() {
  const [filterTab, setFilterTab] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <main style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '340px minmax(0,1fr)', overflow: 'hidden' }}>
      {/* Left: empty message list */}
      <div style={{ borderRight: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', background: '#ffffff' }}>
        <div style={{ flex: 'none', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f0f1ef' }}>
          <button onClick={() => showToast('Opening message search.')} aria-label="Search messages" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10211f" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
          </button>
          <button onClick={() => showToast('Opening a new message.')} style={{ flexGrow: 1, height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            New message
          </button>
        </div>
        <div style={{ flex: 'none', display: 'flex', gap: 2, padding: '8px 12px', borderBottom: '1px solid #f0f1ef' }}>
          {['All', 'Unread 0', 'People', 'Clean Sheet'].map((t, i) => (
            <button key={i} onClick={() => setFilterTab(i)} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: filterTab === i ? '#10211f' : '#f0f1ef', color: filterTab === i ? '#ffffff' : '#4a5a57' }}>{t}</button>
          ))}
        </div>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Nothing here yet</div>
          <div style={{ fontSize: 13, color: '#4a5a57', textAlign: 'center', lineHeight: '18px' }}>Messages and alerts arrive once your squad and first game are in.</div>
        </div>
        <div style={{ flex: 'none', padding: '0 16px 16px' }}>
          {[65, 50].map((w, i) => (
            <div key={i} style={{ height: 54, border: '1px dashed #c5c8c4', borderRadius: 10, marginBottom: 6, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Right: what lands here */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minHeight: 0, overflowY: 'auto', background: '#fafafa', padding: '20px 24px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What lands here</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {[
            { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', bg: '#40826d', title: 'Match reviews', body: 'About 25 minutes after a recorded game, with your three things to work on.' },
            { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', bg: '#c39797', title: 'Wellness alerts', body: "When a player feels low or sore two days running, with what to do next." },
            { icon: 'M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9zM13 2v7h7', bg: '#cbbeb5', title: 'Data problems', body: "A vest that didn't sync or a camera that lost the ball, with a one-tap fix." },
            { icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z', bg: '#40826d', title: 'Messages', body: 'From your coaching team and from parents. Reply right here.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Bring in your coaching team</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>Invite an assistant or fitness coach to message them here. Parents can message you once they've joined.</div>
            </div>
            <button onClick={() => showToast('Opening the invite flow for coaches.')} style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Invite coaches</button>
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Keeping messages safe</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { title: 'Coach chats stay with coaches', body: 'Players and parents never see them.' },
            { title: 'Parent messages are kept by the club', body: 'Your welfare officer can see them.' },
            { title: 'Players are never messaged alone', body: 'Anything sent to a player is copied to their parent.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <span style={{ flex: 'none', width: 6, height: 6, borderRadius: '999px', background: '#40826d', marginTop: 7 }} />
              <div>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{item.title}</span>
                <span style={{ fontSize: 13, color: '#4a5a57' }}> {item.body}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => showToast('Showing a sample busy inbox.')} style={{ marginTop: 12, border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0, textAlign: 'left' }}>See a busy inbox →</button>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </main>
  )
}

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
  { from: 'Priya Shah', time: 'Wednesday', body: "Both are in a growth spurt. I've capped them at 3 sprints on Thursday and 8 on Saturday." },
  { from: 'Priya', sub: 'Noah Okafor', subNote: 'Grew 1.1 cm this month · 26 sprints last week, limit 20', time: '4:52 pm', isPlayer: true },
  { from: 'Priya', sub: 'Zoe Hartley',  subNote: 'Grew 0.9 cm this month · 24 sprints last week, limit 20', time: '4:52 pm', isPlayer: true },
  { from: 'Priya', time: '4:53 pm', body: "Shout if you want them to play more than 35 minutes." },
]

const FILTER_TABS = ['All', 'Unread 3', 'People', 'Clean Sheet']

function EllaPanelContent() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 24px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff' }}>
        <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: '#40826d', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>CS</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px' }}>Wellness check-in</div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Today · 7:30 am</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <button onClick={() => showToast('Wellness check-in marked as done.')} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#2f6252' }}>Mark as done</button>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Ella has felt low two days running</div>
          <div style={{ fontSize: 15, lineHeight: '22px', color: '#4a5a57' }}>Ella scored 2 out of 5 on Wednesday and again today. She said she is sleeping badly. Her legs and energy are fine.</div>
        </div>
        <div style={{ background: '#eef5f2', border: '1px solid #c5d9d0', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: '#2f6252', marginBottom: 8 }}>SUGGESTED ACTION</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Keep tonight light for Ella</div>
          <div style={{ fontSize: 14, lineHeight: '20px', color: '#1f4a3e', marginBottom: 12 }}>She can join in but step back if she needs to. Check in with her quietly at training.</div>
          <button onClick={() => showToast('Noted — keeping it light for Ella tonight.')} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Note that — keep it light for Ella</button>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Message Ella's parent</div>
          <div style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57', marginBottom: 10 }}>Let them know you've seen the check-in and are keeping it light tonight.</div>
          <button onClick={() => showToast("Opening a message to Ella's parent.")} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Message Ella's parent</button>
        </div>
        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '17px', textAlign: 'center' }}>Low check-ins stay private to your coaching team. Ella's classmates and parents do not see the detail.</div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

const LINH_MSGS = [
  { from: 'Linh Tran', day: 'Tuesday', body: "Hi Sam, Mia has a dentist appointment on Thursday, so she might be 10 minutes late to training. Sorry!" },
  { from: 'Coach', day: 'Today', body: "No problem at all, thanks for letting me know. She can join the warm-up when she gets there." },
]

function LinhPanelContent() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 24px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff' }}>
        <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>LT</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px' }}>Linh Tran</div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Mia's mum · parent</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <button onClick={() => showToast('Conversation marked as done.')} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#2f6252' }}>Mark as done</button>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {LINH_MSGS.map((msg, i) => {
          const isCoach = msg.from === 'Coach'
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isCoach ? 'flex-end' : 'flex-start', gap: 2 }}>
              {!isCoach && <div style={{ fontSize: 12, color: '#6f7f7b' }}>{msg.from} · {msg.day}</div>}
              <div style={{ maxWidth: '80%', background: isCoach ? '#2f6252' : '#fff', border: isCoach ? 'none' : '1px solid #e9eae8', borderRadius: isCoach ? '14px 14px 4px 14px' : '14px 14px 14px 4px', padding: '10px 14px', fontSize: 15, lineHeight: '21px', color: isCoach ? '#fff' : '#10211f' }}>
                {msg.body}
              </div>
              {isCoach && <div style={{ fontSize: 12, color: '#6f7f7b' }}>You · {msg.day}</div>}
            </div>
          )
        })}
        <div style={{ background: '#eef5f2', borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#2f6252' }}>Linh has read your reply.</div>
      </div>
      <div style={{ flex: 'none', padding: '12px 24px', borderTop: '1px solid #e9eae8', background: '#ffffff' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' as const }}>
          {['No problem, thanks for letting me know', 'She can join the warm-up when she arrives', 'Mark Mia as late tonight'].map(r => (
            <button key={r} onClick={() => showToast('Reply sent to Linh.')} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#10211f' }}>{r}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div style={{ flexGrow: 1, minHeight: 44, background: '#f7f8f7', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 14px', fontSize: 15, color: '#6f7f7b' }}>Reply to Linh…</div>
          {[
            { label: 'Player', path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8' },
            { label: 'Clip',   path: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
          ].map(a => (
            <button key={a.label} onClick={() => showToast(`Attaching a ${a.label.toLowerCase()}.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#4a5a57', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={a.path}/></svg>
              {a.label}
            </button>
          ))}
          <button onClick={() => showToast('Message sent to Linh.')} style={{ height: 44, padding: '0 16px', borderRadius: 12, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send</button>
        </div>
        <div style={{ marginTop: 6, fontSize: 12, color: '#6f7f7b', textAlign: 'center' }}>Messages with parents are kept by the club. Your club welfare officer can see them.</div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

export default function InboxScreen({ empty }: { empty?: boolean }) {
  if (empty) return <InboxEmpty />
  const [sel, setSel] = useState(0)
  const [filterTab, setFilterTab] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <main style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '340px minmax(0,1fr)', overflow: 'hidden' }}>

      {/* Left: message list */}
      <div style={{ borderRight: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', background: '#ffffff' }}>
        <div style={{ flex: 'none', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f0f1ef' }}>
          <button onClick={() => showToast('Opening message search.')} aria-label="Search messages" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10211f" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
          </button>
          <button onClick={() => showToast('Opening a new message.')} style={{ flexGrow: 1, height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            New message
          </button>
        </div>
        <div style={{ flex: 'none', display: 'flex', gap: 2, padding: '8px 12px', borderBottom: '1px solid #f0f1ef' }}>
          {FILTER_TABS.map((t, i) => (
            <button key={i} onClick={() => setFilterTab(i)} style={{
              height: 30, padding: '0 12px', borderRadius: '999px', border: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: filterTab === i ? '#10211f' : '#f0f1ef', color: filterTab === i ? '#ffffff' : '#4a5a57',
            }}>{t}</button>
          ))}
        </div>
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
                {m.tag && <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '1px 8px', borderRadius: '999px', background: m.tagBg!, color: m.tagColor! }}>{m.tag}</span>}
              </span>
              {m.unread && <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: '#40826d', marginTop: 8 }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Right: dynamic panel */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', background: '#fafafa' }}>
        {sel === 0 && <EllaPanelContent />}
        {sel === 3 && <LinhPanelContent />}
        {sel !== 0 && sel !== 3 && (
          <>
            <div style={{ flex: 'none', padding: '14px 24px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff' }}>
              <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: '#c39797', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>PS</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px' }}>Priya Shah</div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>Fitness coach · U12 coaching team</div>
              </div>
              <div style={{ flexGrow: 1 }} />
              <button onClick={() => showToast('Conversation marked as done.')} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#2f6252' }}>Mark as done</button>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ textAlign: 'center', fontSize: 12, color: '#6f7f7b', marginBottom: 4 }}>Wednesday</div>
              {THREAD_MSGS.map((msg, i) => {
                if (msg.isPlayer) {
                  return (
                    <div key={i} onClick={() => showToast(`Opening ${msg.sub}'s profile.`)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 10, cursor: 'pointer' }}>
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
            <div style={{ flex: 'none', padding: '12px 24px', borderTop: '1px solid #e9eae8', background: '#ffffff' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' as const }}>
                {["Thanks, sounds good", "Can Zoe play 60 if we're short?", "Let's chat at training"].map(r => (
                  <button key={r} onClick={() => showToast('Reply sent to Priya.')} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#10211f' }}>{r}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ flexGrow: 1, minHeight: 44, background: '#f7f8f7', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 14px', fontSize: 15, color: '#6f7f7b' }}>Reply…</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { label: 'Player', path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8' },
                    { label: 'Clip',   path: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
                    { label: 'Drill',  path: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16' },
                    { label: 'Session',path: 'M4 11l8-7 8 7v9H4z' },
                  ].map(a => (
                    <button key={a.label} onClick={() => showToast(`Attaching a ${a.label.toLowerCase()}.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#4a5a57', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={a.path}/></svg>
                      {a.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => showToast('Message sent to Priya.')} style={{ height: 44, padding: '0 16px', borderRadius: 12, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send</button>
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: '#6f7f7b', textAlign: 'center' }}>Coaching team only. Players and parents never see this.</div>
            </div>
          </>
        )}
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </main>
  )
}
