import { useState } from 'react'

type Chip = 'Meet time' | 'Venue or pitch' | 'Cancelled' | 'Kit or other'
type ThreadKey = 'coaches' | 'linh' | 'all' | 'wattle'
type MgrView = 'list' | 'teamchat' | 'setup' | 'newpoll'

const G  = '#2f6252'
const G2 = '#40826d'
const GD = '#1f4a3e'
const INK = '#10211f'
const MUT = '#4a5a57'
const LN = '#e8edeb'
const ROSE = '#c39797'

function ManagerIni({ s, bg, size = 32 }: { s: string; bg: string; size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: '999px', background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s.length > 2 ? 10 : 12, fontWeight: 700, flexShrink: 0 }}>{s}</div>
}

/* TM12 — Manager sets up the team chat */
function SetUpChatView({ onDone }: { onDone: () => void }) {
  const [postPerm, setPostPerm] = useState<'coaches' | 'everyone'>('coaches')
  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, color: MUT }}>U12 Sam · you own this chat</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: INK, letterSpacing: '-0.01em' }}>Set up the team chat</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
        <ManagerIni s="RO" bg={MUT} size={28}/>
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>In the chat: 17 families, Sam and Jess. Players under 15 aren't added. The welfare officer can read it.</div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Who can post</div>
      {(['coaches', 'everyone'] as const).map(v => (
        <label key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 12, border: `1.5px solid ${postPerm === v ? G : LN}`, cursor: 'pointer', background: postPerm === v ? '#f5f9f7' : '#fff' }}>
          <div onClick={() => setPostPerm(v)} style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${postPerm === v ? G : LN}`, background: postPerm === v ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            {postPerm === v && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{v === 'coaches' ? 'Coaches and me only' : 'Everyone in the chat'}</div>
            <div style={{ fontSize: 12, color: MUT }}>{v === 'coaches' ? 'Parents read, react, vote and reply to us privately' : 'Parents can write and send what\'s switched on below'}</div>
          </div>
        </label>
      ))}
      {postPerm === 'everyone' && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Parents can send</div>
          {[{ label: 'Photos and videos', note: 'Checked against photo consent' }, { label: 'Voice notes', note: 'Up to 2 minutes' }, { label: 'Polls', note: 'Off: only coaches and you can ask', off: true }, { label: 'Files and places', note: 'PDFs and a pin on the map' }].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 36, height: 22, borderRadius: 11, background: item.off ? LN : G, position: 'relative' as const, flexShrink: 0 }}>
                <div style={{ position: 'absolute' as const, top: 3, [item.off ? 'left' : 'right']: 3, width: 16, height: 16, borderRadius: '50%', background: '#fff' }}/>
              </div>
              <div>
                <div style={{ fontSize: 13, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 11, color: MUT }}>{item.note}</div>
              </div>
            </div>
          ))}
        </>
      )}
      <div style={{ padding: '8px 10px', background: '#fafafa', borderRadius: 10, fontSize: 12, color: MUT, lineHeight: 1.5 }}>Quiet hours, 9 pm to 7 am · No notifications overnight</div>
      <button onClick={onDone} style={{ height: 52, borderRadius: 12, border: 'none', background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Create the chat</button>
    </div>
  )
}

/* TM13 — Manager creates a poll */
function NewPollView({ onBack }: { onBack: () => void }) {
  const [preset, setPreset] = useState("Who can help?")
  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <button onClick={onBack} style={{ width: 30, height: 30, border: 'none', background: LN, borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, letterSpacing: '-0.01em' }}>New poll</div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Start from</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
        {["Who can help?", "Who's coming?", "Your own"].map(p => (
          <button key={p} onClick={() => setPreset(p)} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${preset === p ? G : LN}`, background: preset === p ? G : '#fff', color: preset === p ? '#fff' : MUT, fontSize: 13, fontWeight: preset === p ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
        ))}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Question</div>
      <input defaultValue="Who can do canteen on Saturday?" style={{ width: '100%', height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: INK, boxSizing: 'border-box' as const }}/>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Answers · one family each</div>
      {['9 to 10', '10 to 11', '11 to 12'].map(a => (
        <div key={a} style={{ display: 'flex', gap: 6 }}>
          <input defaultValue={a} style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: INK }}/>
        </div>
      ))}
      <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G2, padding: '2px 0' }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        Add an answer
      </button>
      <div style={{ padding: '8px 10px', background: '#fafafa', borderRadius: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 2 }}>Fill in the duty roster</div>
        <div style={{ fontSize: 12, color: MUT }}>Each yes goes straight onto Saturday's roster</div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 0' }}>
        <div style={{ fontSize: 13, color: INK, flex: 1 }}>Remind anyone who hasn't answered</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: G2 }}>Friday at noon, once</span>
      </div>
      <button onClick={onBack} style={{ height: 52, borderRadius: 12, border: 'none', background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send poll</button>
    </div>
  )
}

/* TM14 — Manager's view of the team chat */
function ManagerTeamChatView({ onBack, onNewPoll, onSetup }: { onBack: () => void; onNewPoll: () => void; onSetup: () => void }) {
  void onSetup
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flexGrow: 1 }}>
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onBack} style={{ width: 30, height: 30, border: 'none', background: LN, borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>U12 Sam team chat</div>
          <div style={{ fontSize: 11, color: MUT }}>17 families and Sam and Jess</div>
        </div>
        <ManagerIni s="RO" bg={MUT} size={28}/>
      </div>
      <div style={{ background: '#fdf5f0', padding: '8px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: MUT }}>
        <span>You own this chat. Parents can post. <button onClick={onSetup} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: ROSE, padding: 0 }}>Change</button></span>
      </div>
      {/* Poll indicator */}
      <div style={{ padding: '10px 14px', background: '#f5f9f7', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, color: GD }}>Your poll: oranges. 4 of 17 so far</div>
        <button style={{ fontSize: 12, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>See who</button>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '14px' }}>
        {/* Linh's voice */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <ManagerIni s="LT" bg={ROSE} size={26}/>
            <span style={{ fontSize: 12, color: MUT }}>Linh · Mia's mum · 7:48 pm</span>
          </div>
          <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{ width: 24, height: 24, borderRadius: '999px', border: 'none', background: G, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={8} height={8} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
              </button>
              <div style={{ flex: 1, height: 2, background: LN, borderRadius: 999 }}/>
              <span style={{ fontSize: 11, color: MUT }}>0:21</span>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 3 }}>Mia found her other boot! And she got to 14 juggles.</div>
          </div>
          <div style={{ display: 'flex', gap: 5, marginLeft: 34, marginTop: 3 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#f0f4f2', borderRadius: 999, padding: '1px 7px', fontSize: 12 }}>👍 <span style={{ fontSize: 11, color: MUT }}>6</span></span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#f0f4f2', borderRadius: 999, padding: '1px 7px', fontSize: 12 }}>🙌 <span style={{ fontSize: 11, color: MUT }}>3</span></span>
          </div>
        </div>
        {/* Sam's reply */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <ManagerIni s="SK" bg={GD} size={26}/>
            <span style={{ fontSize: 12, color: MUT }}>Sam · coach · 7:52 pm</span>
          </div>
          <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34, fontSize: 14, color: INK, lineHeight: 1.5 }}>14 is a new best. Tell her I said so.</div>
        </div>
        {/* Dan's message with action hint */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <ManagerIni s="DC" bg={MUT} size={26}/>
            <span style={{ fontSize: 12, color: MUT }}>Dan · Ruby's dad · 8:02 pm</span>
          </div>
          <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34, fontSize: 14, color: INK, lineHeight: 1.5 }}>Why does Ruby only ever get one half? Some kids never come off.</div>
        </div>
        <div style={{ marginLeft: 34, marginBottom: 14 }}>
          <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: ROSE, cursor: 'pointer', fontFamily: 'inherit' }}>Move this out of the group</button>
        </div>
      </div>
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '8px 14px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <button onClick={onNewPoll} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Poll</button>
          <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Announce</button>
          <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Pinned</button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Write to the team chat" style={{ flex: 1, height: 38, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: INK, background: '#fafafa' }}/>
          <button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
        </div>
      </div>
    </div>
  )
}

const CHIPS: Chip[] = ['Meet time', 'Venue or pitch', 'Cancelled', 'Kit or other']

const THREADS: Array<{ id: ThreadKey; ini: string; bg: string; name: string; time: string; preview: string; unread: boolean }> = [
  { id: 'coaches', ini: 'SJ', bg: '#cbbeb5', name: 'Coaches · Sam, Jess', time: '7:40 pm', preview: "Sam: Line-up done, I'll send it Friday night", unread: true },
  { id: 'linh',    ini: 'LT', bg: '#cbbeb5', name: 'Linh Tran (Mia)',      time: '6:02 pm', preview: "Can I swap canteen to 11 to 12? Mia's dentist",   unread: true },
  { id: 'all',     ini: 'U12', bg: '#e9eae8', name: 'All U12 families',   time: '7:12 pm', preview: 'You: Meet time now 8:40 on Saturday',              unread: false },
  { id: 'wattle',  ini: 'WC', bg: '#eef5f2', name: 'Wattle Creek FC',      time: 'Tue',     preview: 'Wet weather: grounds decision by 7 am Saturday',   unread: false },
]

const THREAD_CONTENT: Record<ThreadKey, { title: string; msgs: Array<{ from: string; side: 'l' | 'r'; text: string }> }> = {
  coaches: { title: 'Coaches · Sam, Jess', msgs: [
    { side: 'l', from: 'Sam',  text: "Line-up done, I'll send it Friday night" },
    { side: 'l', from: 'Jess', text: "I'll bring the cones and do the warm-up" },
    { side: 'r', from: 'You',  text: "Camera's booked, I'll set up on pitch 2" },
  ]},
  linh: { title: 'Linh Tran (Mia)', msgs: [
    { side: 'l', from: 'Linh', text: "Can I swap canteen to 11 to 12? Mia's dentist" },
    { side: 'r', from: 'You',  text: "No problem, I'll ask the Bells to swap" },
  ]},
  all: { title: 'All U12 families', msgs: [
    { side: 'r', from: 'You',      text: "Meet time now 8:40 on Saturday. We're on pitch 2." },
    { side: 'l', from: "Isla's mum", text: 'Got it, thanks Rob' },
    { side: 'l', from: "Kai's dad",  text: "Kai can't make it, wedding. Sorry!" },
  ]},
  wattle: { title: 'Wattle Creek FC', msgs: [
    { side: 'l', from: 'Club', text: 'Wet weather: grounds decision by 7 am Saturday. Check the app.' },
  ]},
}

const RECIPIENTS = [
  { icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6', title: 'All U12 parents and players', desc: "17 families · parents get players' copies", badge: '17', badgeBg: '#e9eae8', badgeColor: '#10211f' },
  { icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0',        title: 'Sam and Jess',               desc: 'Coaches see it in their inbox',            badge: '2',  badgeBg: '#e9eae8', badgeColor: '#10211f' },
  { icon: 'M4 5h16v15H4zM4 10h16M9 3v4M15 3v4',                        title: 'Updates the calendar',      desc: 'The new meet time, for everyone',          badge: 'On', badgeBg: '#eef5f2', badgeColor: '#2f6252' },
]

function ChangeForm({ chips, toggle, onSend }: { chips: Set<Chip>; toggle: (c: Chip) => void; onSend: () => void }) {
  const sel = (c: Chip) => chips.has(c)
  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>What changed?</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {CHIPS.map(c => (
          <button key={c} onClick={() => toggle(c)} style={{ height: 44, borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: sel(c) ? 0 : '1px solid #c5c8c4', background: sel(c) ? '#2f6252' : '#fff', color: sel(c) ? '#fff' : '#10211f' }}>{c}</button>
        ))}
      </div>

      {/* Change card */}
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ flexShrink: 0, width: 44, height: 48, borderRadius: 12, background: '#cbbeb5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700 }}>SAT</span>
            <span style={{ fontSize: 18, lineHeight: '20px', fontWeight: 700 }}>6</span>
          </span>
          <span style={{ flexGrow: 1, fontSize: 15, lineHeight: '20px', fontWeight: 700 }}>vs Harbour Rovers</span>
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }}>
          <span style={{ border: '1px solid #c5c8c4', borderRadius: 12, padding: '8px 10px' }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>Was</span>
            <span style={{ display: 'block', fontSize: 18, fontWeight: 700, color: '#6f7f7b', textDecoration: 'line-through' }}>9:00 am</span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a5a57" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          <span style={{ border: '2px solid #2f6252', borderRadius: 12, padding: '8px 10px' }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#2f6252' }}>Now</span>
            <span style={{ display: 'block', fontSize: 18, fontWeight: 700 }}>8:40 am</span>
          </span>
        </div>

        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', marginTop: 2 }}>Message</span>
        <span style={{ border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', fontSize: 15, lineHeight: '22px' }}>
          Hi all, please arrive by <strong>8:40</strong> on Saturday, not 9:00. We've moved to pitch 2 and need time to set up the camera. Kick-off is still 9:30. Thanks, Rob
        </span>
      </div>

      {/* Recipients card */}
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px', display: 'flex', flexDirection: 'column' }}>
        {RECIPIENTS.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
            <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={r.icon}/></svg>
            </span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{r.title}</span>
              <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{r.desc}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: r.badgeBg, color: r.badgeColor, whiteSpace: 'nowrap' as const }}>{r.badge}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button onClick={onSend} style={{ height: 52, width: '100%', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>Send and ask families to confirm</button>
      <span style={{ fontSize: 12, color: '#4a5a57', textAlign: 'center' as const }}>{"You'll see who has seen it. A nudge goes to anyone who hasn't by Friday 6 pm."}</span>
    </div>
  )
}

export default function MessagesTab({ showChange, setShowChange }: { showChange: boolean; setShowChange: (v: boolean) => void }) {
  const [chips, setChips] = useState<Set<Chip>>(new Set(['Meet time' as Chip]))
  const [sheet, setSheet] = useState<ThreadKey | null>(null)
  const [toast, setToast] = useState('')
  const [mgrView, setMgrView] = useState<MgrView>('list')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3200) }
  const toggle = (c: Chip) => setChips(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n })

  const handleSend = () => { setShowChange(false); showToast("Sent to 17 families. You'll see who's seen it.") }

  if (showChange) {
    return <ChangeForm chips={chips} toggle={toggle} onSend={handleSend} />
  }

  if (mgrView === 'teamchat') {
    return <ManagerTeamChatView onBack={() => setMgrView('list')} onNewPoll={() => setMgrView('newpoll')} onSetup={() => setMgrView('setup')}/>
  }
  if (mgrView === 'setup') {
    return <SetUpChatView onDone={() => setMgrView('teamchat')}/>
  }
  if (mgrView === 'newpoll') {
    return <NewPollView onBack={() => setMgrView('teamchat')}/>
  }

  const tc = sheet ? THREAD_CONTENT[sheet] : null

  return (
    <>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Something changed banner */}
        <button onClick={() => setShowChange(true)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '0 14px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', border: 0, textAlign: 'left' as const, width: '100%' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>
          <span style={{ flexGrow: 1 }}>Something changed? Tell parents</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>

        {/* Sent message card */}
        <div style={{ border: '2px solid #2f6252', borderRadius: 16, padding: '12px 14px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ flexGrow: 1, fontSize: 16, fontWeight: 700 }}>Meet time now 8:40 on Saturday</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: '#eef5f2', color: '#2f6252', whiteSpace: 'nowrap' as const }}>Sent 7:12 pm</span>
          </span>
          <span style={{ fontSize: 13, color: '#4a5a57' }}>To all 17 families, Sam and Jess · calendar updated</span>
          <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
            <span style={{ flex: 14, background: '#2f6252', borderRadius: 5 }} />
            <span style={{ flex: 3, background: '#e9eae8', borderRadius: 5 }} />
          </div>
          <span style={{ fontSize: 14 }}><strong>14 of 17</strong> have seen it · Brennan, Delaney and Quinn families haven't</span>
          <button onClick={() => showToast("Nudge sent to the 3 families who haven't seen it.")} style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Nudge the 3 now</button>
        </div>

        {/* Conversations */}
        <div style={{ border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', padding: '8px 0 4px' }}>Conversations</span>
          {THREADS.map(t => (
            <button key={t.id} onClick={() => t.id === 'all' ? setMgrView('teamchat') : setSheet(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 62, borderLeft: 0, borderRight: 0, borderBottom: 0, borderTop: '1px solid #e9eae8', background: 'transparent', padding: '0', cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'inherit', color: '#10211f', width: '100%' }}>
              <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{t.ini}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: '#4a5a57', flexShrink: 0 }}>{t.time}</span>
                </span>
                <span style={{ display: 'block', fontSize: 13, color: '#4a5a57', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</span>
              </span>
              {t.unread && <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '999px', background: '#2f6252' }} />}
            </button>
          ))}
        </div>

        <span style={{ fontSize: 12, color: '#4a5a57', textAlign: 'center' as const, padding: '0 6px' }}>{"Messages to a player always copy in their parent. The club's welfare officer can see every family thread."}</span>
      </div>

      {/* Thread sheet */}
      {sheet && tc && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ position: 'absolute', inset: 0, border: 0, padding: 0, background: 'rgba(16,33,31,0.45)', cursor: 'default', width: '100%', height: '100%' }} />
          <div role="dialog" aria-label={tc.title} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, borderRadius: '20px 20px 0 0', maxHeight: 780, padding: '18px 16px 22px', boxSizing: 'border-box' as const, background: '#fff', color: '#10211f', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(16,33,31,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flexGrow: 1 }}>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>{tc.title}</span>
                <span style={{ fontSize: 14, color: '#4a5a57' }}>Conversation</span>
              </div>
              <button type="button" onClick={() => setSheet(null)} aria-label="Close" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flexGrow: 1 }}>
              {tc.msgs.map((m, i) => (
                <div key={i} style={{ alignSelf: m.side === 'r' ? 'flex-end' : 'flex-start', maxWidth: '85%', borderRadius: 14, padding: '8px 12px', background: m.side === 'r' ? '#2f6252' : '#e9eae8', color: m.side === 'r' ? '#fff' : '#10211f', fontSize: 15, lineHeight: '21px' }}>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 700, opacity: 0.85 }}>{m.from}</span>
                  {m.text}
                </div>
              ))}
            </div>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4a5a57', marginBottom: 4 }}>Reply</span>
              <input placeholder="Write a message" style={{ width: '100%', boxSizing: 'border-box' as const, minHeight: 46, border: '1px solid #c5c8c4', borderRadius: 10, padding: '10px 12px', fontFamily: 'inherit', fontSize: 16, color: '#10211f', background: '#fff' }} />
            </label>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setSheet(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', background: '#fff', color: '#10211f', border: '1px solid #c5c8c4' }}>Cancel</button>
              <button type="button" onClick={() => { setSheet(null); showToast('Sent.') }} style={{ height: 48, padding: '0 18px', borderRadius: 10, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', background: '#2f6252', color: '#fff', border: '1px solid #2f6252', flexGrow: 1 }}>Send</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" style={{ position: 'fixed', left: 16, right: 16, bottom: 92, zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </>
  )
}
