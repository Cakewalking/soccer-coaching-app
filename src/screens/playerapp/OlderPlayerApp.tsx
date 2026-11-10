import { useState } from 'react'

type View = 'home' | 'messages' | 'body' | 'adult'

const THIS_WEEK = [
  { dayLabel: 'THU', dayNum: '4', title: 'Training', sub: '7:00 pm · Wattle Creek Reserve', done: true },
  { dayLabel: 'SAT', dayNum: '6', title: 'at Harbour Rovers', sub: 'Meet 2:40 · kick-off 3:30 · away kit', done: false },
  { dayLabel: 'MON', dayNum: '8', title: 'Goal chat with Ollie', sub: '15 min check-in · optional', done: false },
]

const CHAT_MSGS = [
  { from: 'Ollie Grant', time: 'Tuesday', body: "Great work at training today Cal. You were reading the game well — keep that going Saturday." },
  { from: 'Ollie', time: '5:14 pm', body: "Priya has set a sprint cap for you this week — 8 max. You're in a growth spurt so we're just being careful." },
  { from: 'Cal', time: 'Now', body: "Thanks. Will I still get a full game on Saturday?" },
]

const LOAD_BARS = [
  { label: 'Mon', h: 0 }, { label: 'Tue', h: 72 }, { label: 'Thu', h: 88 }, { label: 'Sat', h: 50 },
]

const TESTS = [
  { label: 'Countermovement jump', value: '38 cm', trend: '+2 cm', good: true  },
  { label: 'Hamstring strength', value: '82 N', trend: 'Same', good: true  },
  { label: 'Hip flexor tightness', value: 'Moderate', trend: 'Watch', good: false },
]

const SEASON_STATS = [
  { label: 'Apps', value: '8' }, { label: 'Goals', value: '4' },
  { label: 'Assists', value: '3' }, { label: 'Avg mins', value: '72' },
]

function BottomNav({ view, setView }: { view: View; setView: (v: View) => void }) {
  const tabs: Array<{ id: View; label: string; icon: string }> = [
    { id: 'home',     label: 'Home',     icon: 'M4 11l8-7 8 7v9H4z' },
    { id: 'body',     label: 'Body',     icon: 'M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 0116 0' },
    { id: 'messages', label: 'Messages', icon: 'M4 5h16v11H8l-4 4z' },
  ]
  return (
    <div style={{ flex: 'none', background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', height: 56 }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => setView(tab.id)} style={{
          flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
          fontFamily: 'inherit', fontSize: 10, fontWeight: 600, cursor: 'pointer',
          color: view === tab.id ? '#2f6252' : '#4a5a57',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Greeting */}
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Hi Cal 👋</div>
        <div style={{ fontSize: 14, color: '#4a5a57', marginTop: 2 }}>Wattle Creek U16 · this week</div>
      </div>

      {/* Next game */}
      <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px 18px', color: '#fff' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>NEXT GAME</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>SAT 6 · at Harbour Rovers</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Meet 2:40 at Rovers Park · kick-off 3:30</div>
        <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>I'm in</button>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: 'transparent', color: 'rgba(255,255,255,0.75)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Can't make it</button>
        </div>
      </div>

      {/* Load alert */}
      <div style={{ background: '#fdf4f4', border: '1px solid #e9d0d0', borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c39797" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 0116 0"/></svg>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Big week for your legs</div>
          <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', marginTop: 2 }}>Priya has capped your sprints at 8 this week — you're in a growth spurt. Full game still planned Saturday.</div>
          <button onClick={() => setView('body')} style={{ marginTop: 6, border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>See your body data →</button>
        </div>
      </div>

      {/* This week */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>This week</div>
        {THIS_WEEK.map((e, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1ef' : 'none' }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: '#eef5f2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', color: '#2f6252', textTransform: 'uppercase' as const }}>{e.dayLabel}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#2f6252', lineHeight: '22px' }}>{e.dayNum}</span>
            </div>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: e.done ? '#4a5a57' : '#10211f', textDecoration: e.done ? 'line-through' : 'none' }}>{e.title}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>{e.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* My goal */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>My goal this term</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1f4a3e', marginBottom: 6 }}>Keep possession under pressure</div>
        <div style={{ background: '#f0f1ef', borderRadius: '999px', height: 8, marginBottom: 6, overflow: 'hidden' }}>
          <div style={{ width: '60%', height: '100%', background: '#40826d', borderRadius: '999px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4a5a57' }}>
          <span>Week 3 of 5</span>
          <span>Chat with Ollie Monday</span>
        </div>
      </div>
    </div>
  )
}

type MsgChat = 'list' | 'group' | 'private'

function MessagesView() {
  const [chat, setChat] = useState<MsgChat>('list')

  /* PO6 — messages list */
  if (chat === 'list') return (
    <div style={{ flexGrow: 1, overflowY: 'auto', background: '#fff' }}>
      <div style={{ padding: '10px 16px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>U16</div>
      {/* Announcements */}
      <button onClick={() => setChat('group')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: '1px solid #e9eae8', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1f4a3e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M22 7l-10 10L2 7"/><rect x={2} y={4} width={20} height={16} rx={2}/></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Announcements</span>
            <span style={{ fontSize: 12, color: '#4a5a57' }}>Wed</span>
          </div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Ollie: Team meeting Friday 6:00 pm</div>
        </div>
      </button>
      {/* Group chat */}
      <button onClick={() => setChat('group')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: '1px solid #e9eae8', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
        <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>U16</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>U16 players and coaches</span>
            <span style={{ fontSize: 12, color: '#4a5a57' }}>8:15 am</span>
          </div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Jai: who's got the spare shin pads</div>
        </div>
        <span style={{ background: '#c39797', color: '#fff', borderRadius: 999, padding: '1px 6px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>4</span>
      </button>
      {/* Private with Ollie */}
      <button onClick={() => setChat('private')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: '1px solid #e9eae8', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
        <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>OG</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>Ollie Grant · your coach</span>
            <span style={{ fontSize: 12, color: '#4a5a57' }}>Thu</span>
          </div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Also: Priya wants you fresh.</div>
        </div>
      </button>
      <div style={{ padding: '12px 16px', fontSize: 12, color: '#4a5a57', lineHeight: 1.5 }}>Your mum, Mel, can read these chats. That's the rule for every player under 18. You can't start a chat with one adult by yourself — a coach is always in a group with at least two adults.</div>
    </div>
  )

  /* PO7 — U16 group chat */
  if (chat === 'group') return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ flex: 'none', padding: '10px 16px', borderBottom: '1px solid #e9eae8', background: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setChat('list')} style={{ width: 30, height: 30, border: 'none', background: '#e9eae8', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#4a5a57" strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>U16 players and coaches</div>
          <div style={{ fontSize: 11, color: '#4a5a57' }}>16 players, Ollie and Priya · parents can read this chat. Two coaches are always in it.</div>
        </div>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '14px 16px' }}>
        {/* Ollie's poll */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 26, height: 26, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>OG</div>
            <span style={{ fontSize: 12, color: '#4a5a57' }}>Ollie · coach · Wed 6:10 pm</span>
          </div>
          <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '10px 12px', marginLeft: 34 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#40826d', marginBottom: 3 }}>Poll</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Team meeting: which works?</div>
            {[{ label: 'Fri 6:00 pm', votes: 9 }, { label: 'Sat 1:30, before the game', votes: 4 }].map(opt => (
              <div key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ flex: 1, height: 26, background: '#e8edeb', borderRadius: 999, overflow: 'hidden', position: 'relative' as const }}>
                  <div style={{ width: `${opt.votes / 13 * 100}%`, height: '100%', background: '#eef5f2' }}/>
                  <span style={{ position: 'absolute' as const, left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#10211f' }}>{opt.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{opt.votes}</span>
              </div>
            ))}
            <div style={{ fontSize: 11, color: '#4a5a57', marginTop: 4 }}>13 of 16 · closes tonight</div>
          </div>
        </div>
        {/* Jai's message */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 26, height: 26, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>JP</div>
            <span style={{ fontSize: 12, color: '#4a5a57' }}>Jai · 8:15 am</span>
          </div>
          <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34, fontSize: 14, color: '#10211f' }}>who's got the spare shin pads</div>
          <div style={{ display: 'flex', gap: 4, marginLeft: 34, marginTop: 3 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#f0f4f2', borderRadius: 999, padding: '1px 7px', fontSize: 12 }}>😂 <span style={{ fontSize: 11, color: '#4a5a57' }}>3</span></span>
          </div>
        </div>
        {/* You (player) sent a voice note */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 4, textAlign: 'right' as const }}>You · 8:20 am</div>
          <div style={{ background: '#2f6252', borderRadius: 12, padding: '8px 12px', maxWidth: 180, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ width: 24, height: 24, borderRadius: '999px', border: 'none', background: 'rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={8} height={8} viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21"/></svg>
            </button>
            <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 999 }}/>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>0:06</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 'none', padding: '8px 16px 12px', borderTop: '1px solid #e9eae8', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input placeholder="Write to the team" style={{ flex: 1, height: 38, padding: '0 12px', borderRadius: 999, border: '1px solid #e9eae8', fontSize: 14, fontFamily: 'inherit', outline: 'none', color: '#10211f', background: '#fafafa' }}/>
          <button style={{ height: 38, padding: '0 14px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
        </div>
        <div style={{ fontSize: 11, color: '#4a5a57', textAlign: 'center' as const, marginTop: 6 }}>Be the teammate you'd want. Anyone can report a message to Helen.</div>
      </div>
    </div>
  )

  /* Private with Ollie */
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ flex: 'none', padding: '10px 16px', borderBottom: '1px solid #e9eae8', background: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setChat('list')} style={{ width: 30, height: 30, border: 'none', background: '#e9eae8', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#4a5a57" strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Ollie Grant · your coach</div>
          <div style={{ fontSize: 11, color: '#4a5a57' }}>Your parent, Mel, can see this. The club keeps a record.</div>
        </div>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CHAT_MSGS.map((m, i) => {
          const isMe = m.from === 'Cal'
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', gap: 2 }}>
              {!isMe && <div style={{ fontSize: 12, color: '#6f7f7b', paddingLeft: 2 }}>{m.from} · {m.time}</div>}
              <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isMe ? '#2f6252' : '#fff', border: isMe ? 'none' : '1px solid #e9eae8', fontSize: 14, lineHeight: '20px', color: isMe ? '#fff' : '#10211f' }}>{m.body}</div>
              {isMe && <div style={{ fontSize: 12, color: '#6f7f7b', paddingRight: 2 }}>{m.time}</div>}
            </div>
          )
        })}
      </div>
      <div style={{ flex: 'none', padding: '8px 16px 12px', borderTop: '1px solid #e9eae8', background: '#fff', display: 'flex', gap: 8 }}>
        <input placeholder="Message Ollie…" style={{ flex: 1, height: 38, padding: '0 12px', borderRadius: 999, border: '1px solid #e9eae8', fontSize: 14, fontFamily: 'inherit', outline: 'none', color: '#10211f' }}/>
        <button style={{ width: 38, height: 38, borderRadius: 10, border: 0, background: '#2f6252', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  )
}

function BodyView() {
  return (
    <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>My body</div>

      {/* Load chart */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Load this week</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
          {LOAD_BARS.map((b, i) => (
            <div key={i} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: b.h, background: b.h > 80 ? '#c39797' : '#40826d', borderRadius: '6px 6px 0 0' }} />
              <span style={{ fontSize: 11, color: '#4a5a57', fontWeight: 600 }}>{b.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#4a5a57' }}>Thursday training was high — Saturday is capped at 8 sprints.</div>
      </div>

      {/* Add other sport */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Other sport this week</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
          {['Basketball', 'Swimming', 'Tennis', 'Running', 'Gym', '+ Add'].map(s => (
            <button key={s} style={{ height: 36, padding: '0 14px', borderRadius: '999px', border: `1.5px solid ${s === '+ Add' ? '#2f6252' : '#c5c8c4'}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', color: s === '+ Add' ? '#2f6252' : '#10211f' }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Tests */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>My tests</div>
        {TESTS.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1ef' : 'none' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>{t.trend}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{t.value}</div>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: t.good ? '#eef5f2' : '#fdf4f4', color: t.good ? '#2f6252' : '#c39797' }}>{t.good ? '✓' : '!'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdultView() {
  const [checkin, setCheckin] = useState<number | null>(null)
  return (
    <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Hi Josh 👋</div>
        <div style={{ fontSize: 14, color: '#4a5a57', marginTop: 2 }}>Wattle Creek Men's 1sts · NPL3</div>
      </div>

      <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px 18px', color: '#fff' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>NEXT GAME</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>SAT 6 · vs FC Bayshore</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Home · kick-off 3:00 · white kit</div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>How are you feeling?</div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
          {['😴', '😕', '😐', '🙂', '💪'].map((e, i) => (
            <button key={i} onClick={() => setCheckin(i)} style={{ flex: 1, height: 48, borderRadius: 12, border: `2px solid ${checkin === i ? '#40826d' : '#e9eae8'}`, background: checkin === i ? '#eef5f2' : '#fff', fontSize: 20, cursor: 'pointer' }}>{e}</button>
          ))}
        </div>
        {checkin !== null && <div style={{ marginTop: 8, fontSize: 13, color: '#4a5a57', textAlign: 'center' }}>Logged — only you and your coach can see this.</div>}
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>My season</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {SEASON_STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 4px', background: '#f7f8f7', borderRadius: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#4a5a57', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#eef5f2', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1f4a3e' }}>What's recorded about me</div>
          <div style={{ fontSize: 12, color: '#2f6252' }}>Load, test results, check-ins · 5 of 6 this month</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ marginLeft: 'auto', flexShrink: 0 }}><path d="M9 6l6 6-6 6"/></svg>
      </div>
    </div>
  )
}

export default function OlderPlayerApp({ empty = false }: { empty?: boolean }) {
  const [view, setView] = useState<View>('home')

  return (
    <div style={{ width: 390, minHeight: '100vh', background: '#f7f8f7', display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '48px 20px 16px', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500, letterSpacing: '0.04em' }}>
              {view === 'adult' ? 'WATTLE CREEK MEN\'S 1STS · NPL3' : 'WATTLE CREEK U16'}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>
              {view === 'messages' ? 'Messages' : view === 'body' ? 'My body' : view === 'adult' ? 'Player app' : 'Player app'}
            </div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
            {view === 'adult' ? 'JW' : 'CW'}
          </div>
        </div>
        {/* Adult/U16 toggle */}
        <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
          <button onClick={() => setView('home')} style={{ height: 28, padding: '0 12px', borderRadius: '999px', border: 0, background: view !== 'adult' ? '#fff' : 'rgba(255,255,255,0.2)', color: view !== 'adult' ? '#1f4a3e' : '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Cal · U16</button>
          <button onClick={() => setView('adult')} style={{ height: 28, padding: '0 12px', borderRadius: '999px', border: 0, background: view === 'adult' ? '#fff' : 'rgba(255,255,255,0.2)', color: view === 'adult' ? '#1f4a3e' : '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Josh · Men's 1sts</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
        {view === 'home' && (empty ? (
          <div style={{ flexGrow: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{"You're on U16 Ollie"}</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5 }}>Games, training and messages from your coach show here. First, a parent needs to OK filming and sensors.</div>
            <button style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Text my parent the link</button>
            <div style={{ padding: '12px 14px', background: '#eef5f2', borderRadius: 10, fontSize: 13, color: '#2f6252' }}>{"Until they answer you can still play, check in and message Ollie. You're blurred in clips."}</div>
          </div>
        ) : <HomeView setView={setView} />)}
        {view === 'messages' && (empty ? (
          <div style={{ flexGrow: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>No messages yet</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5 }}>Message Ollie about training, games or anything you're unsure of. A parent can read the chat until you're 18.</div>
            <button style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Write to Ollie</button>
          </div>
        ) : <MessagesView />)}
        {view === 'body' && (empty ? (
          <div style={{ flexGrow: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>Nothing measured yet</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5 }}>{"After your first week with a vest, you'll see how much you've done and when to rest. Add school sport so the picture is whole."}</div>
            <button style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add other sport</button>
          </div>
        ) : <BodyView />)}
        {view === 'adult'    && <AdultView />}
      </div>

      {/* Bottom nav (hide for adult view which has its own feel) */}
      {view !== 'adult' && <BottomNav view={view} setView={setView} />}
    </div>
  )
}
