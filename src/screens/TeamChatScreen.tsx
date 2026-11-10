import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

// ─── Types ──────────────────────────────────────────────────────────────────

type ChatId    = 'u12' | 'coaching' | 'linh' | 'wcfc'
type PanelView = 'chat' | 'announcements' | 'newchat' | 'newpoll' | 'pollresults' | 'media' | 'chatinfo'
type Overlay   = 'photocheck' | 'messageactions' | null

// ─── Static data ────────────────────────────────────────────────────────────

interface ChatItem {
  id: ChatId; ini: string; iniColor: string
  name: string; lastMsg: string; time: string; unread?: number
}
const CHATS: ChatItem[] = [
  { id:'u12',      ini:'U12', iniColor:G,         name:'U12 Sam team chat',       lastMsg:'Linh: Mia found her other boot!',               time:'7:48 pm', unread:3 },
  { id:'coaching', ini:'SJ',  iniColor:GD,        name:'Coaching team',           lastMsg:'Priya: Sprint caps set for Noah and Zoe',       time:'Yesterday' },
  { id:'linh',     ini:'LT',  iniColor:ROSE,      name:'Linh Tran · Mia\'s mum',  lastMsg:'Mia might be 10 minutes late Thursday',         time:'Tue', unread:1 },
  { id:'wcfc',     ini:'WC',  iniColor:'#738678', name:'Wattle Creek FC',         lastMsg:'Wet weather: grounds decision by 7 am',         time:'Tue' },
]

// ─── Shared micro-components ────────────────────────────────────────────────

function Ini({ s, bg, size=32 }: { s: string; bg: string; size?: number }) {
  const fs = s.length > 2 ? 10 : 12
  return (
    <div style={{ width:size, height:size, borderRadius:'999px', background:bg, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:fs, fontWeight:700, flexShrink:0 }}>
      {s}
    </div>
  )
}

function Btn({ label, primary, onClick, small }: { label:string; primary?:boolean; onClick?:()=>void; small?:boolean }) {
  return (
    <button onClick={onClick} style={{ height: small?32:40, padding: small?'0 12px':'0 18px', borderRadius:999, border: primary?'none':`1px solid ${LN}`, background: primary?G:'#fff', color: primary?'#fff':MUT, fontSize: small?12:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
      {label}
    </button>
  )
}

// ─── Left sidebar ────────────────────────────────────────────────────────────

function Sidebar({ selectedChat, panelView, onChat, onAnnouncements, onNewChat }:
  { selectedChat:ChatId; panelView:PanelView; onChat:(id:ChatId)=>void; onAnnouncements:()=>void; onNewChat:()=>void }) {
  return (
    <div style={{ width:264, flexShrink:0, borderRight:`1px solid ${LN}`, display:'flex', flexDirection:'column', background:'#fff' }}>
      {/* Top actions */}
      <div style={{ padding:'14px 16px 10px', borderBottom:`1px solid ${LN}` }}>
        <div style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:10 }}>Chats</div>
        <div style={{ display:'flex', gap:6 }}>
          <button style={{ flex:1, height:32, borderRadius:999, border:`1px solid ${panelView==='chat'?G:LN}`, background:panelView==='chat'?PALE:'#fff', color:panelView==='chat'?G:MUT, fontSize:13, fontWeight:panelView==='chat'?700:400, cursor:'pointer', fontFamily:'inherit' }}>
            Inbox
          </button>
          <button onClick={onNewChat} style={{ flex:1, height:32, borderRadius:999, border:`1px solid ${panelView==='newchat'?G:LN}`, background:panelView==='newchat'?PALE:'#fff', color:panelView==='newchat'?G:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            New chat
          </button>
        </div>
      </div>

      {/* Announcement notification strip */}
      <button onClick={onAnnouncements} style={{ padding:'10px 16px', borderBottom:`1px solid ${LN}`, background: panelView==='announcements'?PALE:'transparent', border:'none', textAlign:'left', cursor:'pointer', fontFamily:'inherit', display:'block', width:'100%' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:2 }}>
          <span style={{ fontSize:13, fontWeight:700, color: panelView==='announcements'?G:INK }}>Announcements</span>
          <span style={{ fontSize:11, color:MUT }}>7:12 pm</span>
        </div>
        <div style={{ fontSize:12, color:MUT, lineHeight:1.4 }}>Rob: Meet time now 8:40 on Saturday</div>
      </button>

      {/* Chat list */}
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ padding:'6px 16px 4px', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:MUT }}>Direct messages</div>
        {CHATS.map(c => {
          const active = selectedChat===c.id && panelView==='chat'
          return (
            <button key={c.id} onClick={() => onChat(c.id)} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 16px', border:'none', borderBottom:`1px solid ${LN}`, background:active?PALE:'transparent', textAlign:'left', cursor:'pointer', fontFamily:'inherit', width:'100%' }}>
              <Ini s={c.ini} bg={c.iniColor} size={36}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:2 }}>
                  <span style={{ fontSize:14, fontWeight:active?700:600, color:active?G:INK, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:130 }}>{c.name}</span>
                  <span style={{ fontSize:11, color:MUT, flexShrink:0 }}>{c.time}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:4 }}>
                  <span style={{ fontSize:12, color:MUT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.lastMsg}</span>
                  {c.unread && <span style={{ background:ROSE, color:'#fff', borderRadius:'999px', padding:'0 6px', fontSize:11, fontWeight:700, lineHeight:'18px', flexShrink:0 }}>{c.unread}</span>}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer note */}
      <div style={{ padding:'10px 16px', fontSize:11, color:MUT, lineHeight:1.5, borderTop:`1px solid ${LN}`, background:'#fafafa' }}>
        Nobody's phone number is shared. Families leave these chats when the season ends.
      </div>
    </div>
  )
}

// ─── Compose bar ─────────────────────────────────────────────────────────────

function ComposeBar({ onPoll, hint, placeholder='Write to the team chat' }: { onPoll?:()=>void; hint?:string; placeholder?:string }) {
  const attachIcons = [
    { label:'Photo',   icon:'M4 16l4-4 4 4 4-6 4 6' },
    { label:'Video',   icon:'M15 10l4.5-2.5v9L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { label:'Voice',   icon:'M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4zM5 10a7 7 0 0014 0M12 19v4' },
    { label:'Poll',    icon:'M9 11l3 3 8-8M3 12a9 9 0 1018 0 9 9 0 00-18 0' },
    { label:'Place',   icon:'M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7zM12 9a2 2 0 100-4 2 2 0 000 4' },
    { label:'File',    icon:'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6' },
    { label:'Clip or drill', icon:'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
  ]
  return (
    <div style={{ flexShrink:0, borderTop:`1px solid ${LN}`, background:'#fff' }}>
      {/* Attachment row */}
      <div style={{ display:'flex', gap:0, padding:'8px 16px 0', overflowX:'auto' }}>
        {attachIcons.map(a => (
          <button key={a.label} onClick={a.label==='Poll'?onPoll:undefined} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'4px 10px', border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d={a.icon}/></svg>
            <span style={{ fontSize:10, color:MUT }}>{a.label}</span>
          </button>
        ))}
      </div>
      {/* Text + send */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 16px 10px' }}>
        <input placeholder={placeholder} style={{ flex:1, height:40, padding:'0 14px', borderRadius:999, border:`1px solid ${LN}`, fontSize:14, fontFamily:'inherit', outline:'none', color:INK, background:'#fafafa' }}/>
        <button style={{ height:40, padding:'0 20px', borderRadius:999, border:'none', background:G, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Send</button>
      </div>
      {hint && <div style={{ padding:'0 16px 10px', fontSize:11, color:MUT }}>{hint}</div>}
    </div>
  )
}

// ─── Chat panel (CH1) ────────────────────────────────────────────────────────

function PollCard({ onResults }: { onResults:()=>void }) {
  return (
    <div style={{ background:'#f5f6f4', borderRadius:12, padding:'12px 14px', marginBottom:4 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:G2, marginBottom:4 }}>Poll</div>
      <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:10 }}>Who can bring oranges on Saturday?</div>
      {[{label:'We will', votes:2}, {label:'Only if no one else can', votes:2}].map(opt => (
        <div key={opt.label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
          <div style={{ flex:1, height:28, background:'#e8edeb', borderRadius:999, overflow:'hidden', position:'relative' as const }}>
            <div style={{ width:`${opt.votes/4*100}%`, height:'100%', background:PALE }}/>
            <span style={{ position:'absolute' as const, left:12, top:'50%', transform:'translateY(-50%)', fontSize:13, color:INK }}>{opt.label}</span>
          </div>
          <span style={{ fontSize:14, fontWeight:700, color:INK, minWidth:16, textAlign:'right' as const }}>{opt.votes}</span>
        </div>
      ))}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:6 }}>
        <span style={{ fontSize:12, color:MUT }}>4 of 17 families have voted · closes Fri 6 pm</span>
        <button onClick={onResults} style={{ fontSize:12, fontWeight:600, color:G2, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', padding:0 }}>See who</button>
      </div>
    </div>
  )
}

function VoiceMsg({ duration, text, reactions }: { duration:string; text:string; reactions:{emoji:string; count:number}[] }) {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
        <button style={{ width:28, height:28, borderRadius:'999px', border:'none', background:G, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
        </button>
        <div style={{ flex:1, height:3, background:LN, borderRadius:999 }}>
          <div style={{ width:'15%', height:'100%', background:G2, borderRadius:999 }}/>
        </div>
        <span style={{ fontSize:12, color:MUT, whiteSpace:'nowrap' as const }}>{duration}</span>
      </div>
      {text && <div style={{ fontSize:13, color:MUT, lineHeight:1.5, marginBottom:4 }}>{text}</div>}
      <div style={{ display:'flex', gap:6 }}>
        {reactions.map(r => (
          <span key={r.emoji} style={{ display:'inline-flex', alignItems:'center', gap:4, background:'#f0f4f2', borderRadius:999, padding:'2px 8px', fontSize:13 }}>
            {r.emoji} <span style={{ fontSize:12, color:MUT, fontWeight:600 }}>{r.count}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function ChatBubble({ ini, iniColor, sender, time, children }: { ini:string; iniColor:string; sender:string; time:string; children:React.ReactNode }) {
  return (
    <div style={{ display:'flex', gap:10, marginBottom:16 }}>
      <Ini s={ini} bg={iniColor} size={34}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:4 }}>
          <span style={{ fontSize:13, fontWeight:700, color:INK }}>{sender}</span>
          <span style={{ fontSize:11, color:MUT }}>{time}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

function ChatPanel({ empty, selectedChat, onResults, onPoll, onMedia, onInfo, onPhotoCheck, onMsgActions }:
  { empty:boolean; selectedChat:ChatId; onResults:()=>void; onPoll:()=>void; onMedia:()=>void; onInfo:()=>void; onPhotoCheck:()=>void; onMsgActions:()=>void }) {

  const chat = CHATS.find(c=>c.id===selectedChat)!
  const isU12 = selectedChat==='u12'

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Chat header */}
      <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', gap:12, flexShrink:0, background:'#fff' }}>
        <Ini s={chat.ini} bg={chat.iniColor} size={38}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:15, fontWeight:700, color:INK }}>{chat.name}</div>
          {isU12 && <div style={{ fontSize:12, color:MUT }}>17 families, Sam, Jess and Rob · parents can post · set up by Rob</div>}
          {selectedChat==='coaching' && <div style={{ fontSize:12, color:MUT }}>Sam, Jess, Priya · coaching team only</div>}
          {selectedChat==='linh' && <div style={{ fontSize:12, color:MUT }}>Private · Linh Tran</div>}
          {selectedChat==='wcfc' && <div style={{ fontSize:12, color:MUT }}>Wattle Creek FC · all staff</div>}
        </div>
        <button onClick={onMedia} style={{ height:32, padding:'0 12px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Photos &amp; files</button>
        <button onClick={onInfo} style={{ width:36, height:36, borderRadius:999, border:`1px solid ${LN}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10}/><path d="M12 16v-4M12 8h.01"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px 20px 12px' }}>
        {empty ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8, textAlign:'center', paddingBottom:40 }}>
            <Ini s={chat.ini} bg={chat.iniColor} size={56}/>
            <div style={{ fontSize:16, fontWeight:700, color:INK, marginTop:4 }}>
              {isU12 ? 'U12 Sam team chat' : chat.name}
            </div>
            {isU12 && <div style={{ fontSize:13, color:MUT, marginBottom:8 }}>17 families invited · 9 have joined so far</div>}
            <div style={{ fontSize:14, fontWeight:600, color:INK }}>Say hello to the team</div>
            <div style={{ fontSize:13, color:MUT, maxWidth:360, lineHeight:1.5 }}>Families see this chat as soon as they join Clean Sheet. Try a poll for Saturday, or a photo from training.</div>
          </div>
        ) : (
          <>
            {isU12 && (
              <>
                <ChatBubble ini="RO" iniColor={MUT} sender="Rob Owusu · team manager" time="6:12 pm">
                  <PollCard onResults={onResults}/>
                </ChatBubble>
                <ChatBubble ini="LT" iniColor={ROSE} sender="Linh Tran · Mia's mum" time="7:48 pm">
                  <VoiceMsg duration="0:21" text="Mia found her other boot! And she got to 14 juggles." reactions={[{emoji:'👍',count:6},{emoji:'🙌',count:3}]}/>
                </ChatBubble>
                <ChatBubble ini="JW" iniColor={G2} sender="Jess Wu · co-coach" time="7:55 pm">
                  <VoiceMsg duration="0:14" text="" reactions={[]}/>
                </ChatBubble>
              </>
            )}
            {selectedChat==='coaching' && (
              <ChatBubble ini="PS" iniColor={G2} sender="Priya Shah · fitness coach" time="Yesterday 4:30 pm">
                <div style={{ fontSize:14, color:INK, lineHeight:1.5 }}>Sprint caps set for Noah and Zoe tonight. I've marked them in the session. Let me know if you need any changes.</div>
              </ChatBubble>
            )}
            {selectedChat==='linh' && (
              <ChatBubble ini="LT" iniColor={ROSE} sender="Linh Tran · Mia's mum" time="Tue 3:40 pm">
                <div style={{ fontSize:14, color:INK, lineHeight:1.5 }}>Mia might be 10 minutes late Thursday — traffic on the M1 on school days. She'll be there by 5:15.</div>
              </ChatBubble>
            )}
            {selectedChat==='wcfc' && (
              <ChatBubble ini="WC" iniColor={'#738678'} sender="Wattle Creek FC" time="Tue 6:50 am">
                <div style={{ background:'#f5f6f4', borderRadius:10, padding:'10px 12px' }}>
                  <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:2 }}>Wet weather: grounds decision by 7 am</div>
                  <div style={{ fontSize:13, color:MUT, lineHeight:1.5 }}>Check your club page or the FC app for the status. All game cancellations go through the fixtures system.</div>
                </div>
              </ChatBubble>
            )}

            {/* Dan Chen's message (shown in CH9 message actions context) */}
            {isU12 && (
              <button onClick={onMsgActions} style={{ display:'flex', gap:10, marginBottom:16, background:'transparent', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit', width:'100%', padding:0 }}>
                <Ini s="DC" bg={MUT} size={34}/>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:INK }}>Dan Chen · Ruby's dad</span>
                    <span style={{ fontSize:11, color:MUT }}>8:02 pm</span>
                  </div>
                  <div style={{ background:'#f5f6f4', borderRadius:10, padding:'10px 12px', fontSize:14, color:INK, lineHeight:1.5 }}>
                    Why does Ruby only ever get one half? Some kids never come off.
                  </div>
                </div>
              </button>
            )}

            {isU12 && (
              <div style={{ marginBottom:8, padding:'0 44px' }}>
                <button onClick={onPhotoCheck} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:10, border:`1px dashed ${LN}`, background:'transparent', color:G2, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x={3} y={3} width={18} height={18} rx={2}/><circle cx={8.5} cy={8.5} r={1.5}/><path d="M21 15l-5-5L5 21"/></svg>
                  Add a photo
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Compose */}
      <ComposeBar
        onPoll={onPoll}
        placeholder={selectedChat==='coaching' ? 'Write to the coaching team' : 'Write to the team chat'}
        hint={isU12 ? 'Everyone in this chat can see this. Players under 15 are not in team chats.' : undefined}
      />
    </div>
  )
}

// ─── Announcements panel (CH2 / CH2e) ────────────────────────────────────────

function AnnouncementCard({ ini, name, time, seen, total, subject, body, attach, reactions, canNudge, nudgeCount }:
  { ini:string; name:string; time:string; seen:number; total:number; subject:string; body:string; attach?:{icon:string;label:string;sub:string}; reactions:{emoji:string;count:number}[]; canNudge?:boolean; nudgeCount?:number }) {
  const allSeen = seen===total
  return (
    <div style={{ background:'#fff', border:`1px solid ${LN}`, borderRadius:14, padding:'14px 16px', marginBottom:12 }}>
      <div style={{ display:'flex', gap:10, marginBottom:10 }}>
        <Ini s={ini} bg={MUT} size={34}/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:INK }}>{name}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:2 }}>
            <span style={{ fontSize:11, color:MUT }}>{time}</span>
            <span style={{ fontSize:11, fontWeight:600, color: allSeen ? G2 : ROSE }}>{seen} of {total} seen</span>
          </div>
        </div>
      </div>
      <div style={{ fontSize:15, fontWeight:700, color:INK, marginBottom:4 }}>{subject}</div>
      <div style={{ fontSize:14, color:INK, lineHeight:1.6, marginBottom:attach?10:8 }}>{body}</div>
      {attach && (
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'#f5f6f4', borderRadius:10, marginBottom:10, cursor:'pointer' }}>
          <div style={{ width:32, height:32, borderRadius:8, background:G, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d={attach.icon}/></svg>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:INK }}>{attach.label}</div>
            <div style={{ fontSize:11, color:MUT }}>{attach.sub}</div>
          </div>
        </div>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ display:'flex', gap:6, flex:1 }}>
          {reactions.map(r => (
            <span key={r.emoji} style={{ display:'inline-flex', alignItems:'center', gap:4, background:'#f0f4f2', borderRadius:999, padding:'3px 10px', fontSize:13 }}>
              {r.emoji} <span style={{ fontSize:12, color:MUT, fontWeight:600 }}>{r.count}</span>
            </span>
          ))}
        </div>
        <button style={{ fontSize:12, fontWeight:600, color:MUT, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit' }}>Who has seen it</button>
      </div>
      {canNudge && nudgeCount && (
        <div style={{ marginTop:10, padding:'10px 12px', background:'#fdf5f0', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:13, color:ROSE }}>3 families haven't seen the change: Brennan, Delaney and Quinn.</span>
          <button style={{ height:32, padding:'0 14px', borderRadius:999, border:'none', background:ROSE, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' as const, marginLeft:12 }}>Nudge the {nudgeCount}</button>
        </div>
      )}
    </div>
  )
}

function AnnouncementsPanel({ empty }: { empty:boolean }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, background:'#fff' }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:INK }}>Announcements</div>
          <div style={{ fontSize:12, color:MUT }}>Only Sam, Jess and Rob post here · families can react and tap Got it</div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>
        {empty ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8, textAlign:'center', paddingBottom:40 }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:PALE, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round"><path d="M22 7l-10 10L2 7"/><rect x={2} y={4} width={20} height={16} rx={2}/></svg>
            </div>
            <div style={{ fontSize:15, fontWeight:700, color:INK }}>Nothing announced yet</div>
            <div style={{ fontSize:13, color:MUT, maxWidth:360, lineHeight:1.5 }}>Use this for things nobody should miss: a time change, a wet-weather call, the kit colour. You'll see who has seen it.</div>
          </div>
        ) : (
          <>
            <AnnouncementCard
              ini="RO" name="Rob Owusu · team manager" time="Mon 6:10 pm"
              seen={17} total={17} subject="Fixture list for term 3"
              body="Six games, three at home."
              attach={{ icon:'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6', label:'U12 fixtures, term 3.pdf', sub:'1 page · 84 KB' }}
              reactions={[{emoji:'👍',count:9}]}
            />
            <AnnouncementCard
              ini="RO" name="Rob Owusu · team manager" time="Today 7:12 pm"
              seen={14} total={17} subject="Meet time now 8:40 on Saturday"
              body="We're on pitch 2, not pitch 4. White kit. The calendar is already updated."
              attach={{ icon:'M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7zM12 9a2 2 0 100-4 2 2 0 000 4', label:'Pitch 2, Wattle Creek Reserve', sub:'Gate on Banksia Street' }}
              reactions={[{emoji:'👍',count:11},{emoji:'❤️',count:2}]}
              canNudge nudgeCount={3}
            />
          </>
        )}
      </div>
      <ComposeBar placeholder="Write an announcement" hint="Goes to all 17 families with a notification, even if they have muted the team chat." />
    </div>
  )
}

// ─── New chat form (CH3) ─────────────────────────────────────────────────────

function NewChatPanel({ onCancel, onCreate }: { onCancel:()=>void; onCreate:()=>void }) {
  const [postPerm, setPostPerm] = useState<'coaches'|'everyone'>('coaches')
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, background:'#fff' }}>
        <div style={{ fontSize:15, fontWeight:700, color:INK }}>New chat</div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn label="Cancel" onClick={onCancel}/>
          <Btn label="Create chat" primary onClick={onCreate}/>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
        <div style={{ fontSize:13, color:MUT, marginBottom:16 }}>You'll own this chat. You can change these later.</div>

        <Section label="Chat name">
          <input defaultValue="U12 Sam · carpool to away games" style={{ width:'100%', height:44, padding:'0 14px', borderRadius:10, border:`1px solid ${LN}`, fontSize:14, fontFamily:'inherit', outline:'none', color:INK, boxSizing:'border-box' }}/>
        </Section>

        <Section label="Who's in">
          {[['All U12 families · 17','checked'],['Coaches · 3','checked'],['Rob, team manager','checked']].map(([label, state]) => (
            <label key={label} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom:`1px solid ${LN}`, cursor:'pointer' }}>
              <div style={{ width:20, height:20, borderRadius:5, background: state==='checked'?G:LN, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {state==='checked' && <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <span style={{ fontSize:14, color:INK }}>{label}</span>
            </label>
          ))}
          <button style={{ display:'flex', alignItems:'center', gap:6, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:600, color:G2, padding:'10px 0' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Pick people
          </button>
          <div style={{ fontSize:12, color:MUT, marginTop:4 }}>Players under 15 can't be added to a chat. They get announcements through a parent.</div>
        </Section>

        <Section label="Who can post">
          {(['coaches','everyone'] as const).map(v => (
            <label key={v} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'12px 0', borderBottom:`1px solid ${LN}`, cursor:'pointer' }}>
              <div onClick={() => setPostPerm(v)} style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${postPerm===v?G:LN}`, background:postPerm===v?G:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                {postPerm===v && <div style={{ width:8, height:8, borderRadius:'50%', background:'#fff' }}/>}
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:INK }}>{v==='coaches'?'Coaches and the manager only':'Everyone in the chat'}</div>
                <div style={{ fontSize:12, color:MUT, marginTop:2 }}>{v==='coaches'?'Parents can read, react, vote in polls and reply to you privately':'Parents can write, and send what you switch on'}</div>
              </div>
            </label>
          ))}
          <div style={{ fontSize:12, color:MUT, marginTop:8 }}>A new chat starts as coaches and manager only. Parents can post only if you choose it here.</div>
        </Section>

        {postPerm==='everyone' && (
          <Section label="What parents can send">
            {[
              {label:'Photos and videos',  note:'Checked against each child\'s photo consent'},
              {label:'Voice notes',        note:'Up to 2 minutes'},
              {label:'Polls',              note:'Off: only you, Jess and Rob can ask', off:true},
              {label:'Files and places',   note:'PDFs, and a pin on the map'},
            ].map(item => (
              <div key={item.label} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:`1px solid ${LN}` }}>
                <div style={{ width:36, height:22, borderRadius:11, background: item.off?LN:G, position:'relative' as const, flexShrink:0, cursor:'pointer' }}>
                  <div style={{ position:'absolute' as const, top:3, [item.off?'left':'right']:3, width:16, height:16, borderRadius:'50%', background:'#fff' }}/>
                </div>
                <div>
                  <div style={{ fontSize:14, color:INK }}>{item.label}</div>
                  <div style={{ fontSize:12, color:MUT }}>{item.note}</div>
                </div>
              </div>
            ))}
          </Section>
        )}

        <Section label="Quiet hours">
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0' }}>
            <div style={{ width:36, height:22, borderRadius:11, background:G, position:'relative' as const, cursor:'pointer' }}>
              <div style={{ position:'absolute' as const, top:3, right:3, width:16, height:16, borderRadius:'50%', background:'#fff' }}/>
            </div>
            <div>
              <div style={{ fontSize:14, color:INK }}>No notifications 9 pm to 7 am</div>
              <div style={{ fontSize:12, color:MUT }}>Messages still arrive, silently</div>
            </div>
          </div>
        </Section>

        <div style={{ fontSize:12, color:MUT, lineHeight:1.6, padding:'4px 0 20px' }}>Set by Wattle Creek FC and can't be turned off: the welfare officer can read every chat with families, and messages are kept by the club.</div>
      </div>
    </div>
  )
}

function Section({ label, children }: { label:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:MUT, marginBottom:8 }}>{label}</div>
      {children}
    </div>
  )
}

// ─── New poll form (CH4) ──────────────────────────────────────────────────────

function NewPollPanel({ onCancel, onSend }: { onCancel:()=>void; onSend:()=>void }) {
  const [preset, setPreset] = useState<string>("Who's coming?")
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, background:'#fff' }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:INK }}>New poll</div>
          <div style={{ fontSize:12, color:MUT }}>To U12 Sam team chat</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn label="Cancel" onClick={onCancel}/>
          <Btn label="Send poll" primary onClick={onSend}/>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
        <Section label="Start from">
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {["Who's coming?","Who can help?","Pick a date","Your own question"].map(p => (
              <button key={p} onClick={() => setPreset(p)} style={{ height:32, padding:'0 14px', borderRadius:999, border:`1px solid ${preset===p?G:LN}`, background:preset===p?G:'#fff', color:preset===p?'#fff':MUT, fontSize:13, fontWeight:preset===p?700:400, cursor:'pointer', fontFamily:'inherit' }}>{p}</button>
            ))}
          </div>
        </Section>

        <Section label="Question">
          <input defaultValue="Who's coming on Saturday? Harbour Rovers, 9:30 at home" style={{ width:'100%', height:44, padding:'0 14px', borderRadius:10, border:`1px solid ${LN}`, fontSize:14, fontFamily:'inherit', outline:'none', color:INK, boxSizing:'border-box' }}/>
        </Section>

        <Section label="Answers">
          {['Coming','Can\'t come','Not sure yet'].map((a,i) => (
            <div key={a} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <input defaultValue={a} style={{ flex:1, height:40, padding:'0 12px', borderRadius:8, border:`1px solid ${LN}`, fontSize:14, fontFamily:'inherit', outline:'none', color:INK }}/>
              {i>0 && <button style={{ width:32, height:32, borderRadius:999, border:'none', background:LN, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>}
            </div>
          ))}
          <button style={{ display:'flex', alignItems:'center', gap:6, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:600, color:G2, padding:'4px 0' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add an answer
          </button>
          <div style={{ fontSize:12, color:MUT, marginTop:6 }}>Up to 10 answers. Parents answer once for each of their children.</div>
        </Section>

        <Section label="What the answers do">
          <div style={{ background:PALE, borderRadius:10, padding:'10px 14px' }}>
            <div style={{ fontSize:13, fontWeight:700, color:GD, marginBottom:2 }}>Fill in Who's coming for Saturday</div>
            <div style={{ fontSize:12, color:G }}>No need to copy answers across</div>
          </div>
        </Section>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:MUT, marginBottom:8 }}>Remind anyone who hasn't answered</div>
            <div style={{ fontSize:14, color:INK }}>Friday at noon, once</div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:MUT, marginBottom:8 }}>Show who voted</div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:36, height:22, borderRadius:11, background:LN, position:'relative' as const, cursor:'pointer' }}>
                <div style={{ position:'absolute' as const, top:3, left:3, width:16, height:16, borderRadius:'50%', background:'#fff' }}/>
              </div>
              <span style={{ fontSize:13, color:MUT }}>Off makes the poll anonymous</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:MUT, marginBottom:8 }}>Closes</div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:14, color:INK }}>Friday 6 pm</span>
              <button style={{ fontSize:12, fontWeight:600, color:G2, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit' }}>Change</button>
            </div>
          </div>
        </div>

        <Section label="How it will look">
          <div style={{ background:'#f5f6f4', borderRadius:12, padding:'12px 14px', maxWidth:400 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:G2, marginBottom:4 }}>Poll</div>
            <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:10 }}>Who's coming on Saturday? Harbour Rovers, 9:30 at home</div>
            {["Coming","Can't come","Not sure yet"].map(a => (
              <div key={a} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <div style={{ flex:1, height:28, background:LN, borderRadius:999, overflow:'hidden' }}>
                  <span style={{ display:'block', padding:'4px 12px', fontSize:13, color:INK }}>{a}</span>
                </div>
                <span style={{ fontSize:14, color:MUT }}>0</span>
              </div>
            ))}
            <div style={{ fontSize:11, color:MUT, marginTop:4 }}>One answer per player · closes Fri 6 pm</div>
          </div>
        </Section>
      </div>
    </div>
  )
}

// ─── Poll results (CH5 / CH5e) ────────────────────────────────────────────────

function PollResultsPanel({ empty, onBack }: { empty:boolean; onBack:()=>void }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, background:'#fff' }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:INK }}>Poll results</div>
          <div style={{ fontSize:12, color:MUT }}>Who's coming on Saturday? · closes Fri 6 pm</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn label="Back to chat" onClick={onBack}/>
          {!empty && <Btn label="Close poll now" onClick={onBack}/>}
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
        {empty ? (
          <>
            <div style={{ fontSize:14, color:MUT, marginBottom:24, lineHeight:1.5 }}>Answers show here as they come in, and fill in Who's coming for Saturday. Anyone who hasn't answered gets one reminder on Friday at noon.</div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[{n:1,text:'Families vote in the chat',sub:'One answer per child'},{n:2,text:'Who\'s coming fills in',sub:'No copying across'},{n:3,text:'One reminder',sub:'Friday at noon'}].map(s => (
                <div key={s.n} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:PALE, color:G, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:INK }}>{s.text}</div>
                    <div style={{ fontSize:13, color:MUT }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize:14, color:MUT, marginBottom:16 }}>14 of 17 families have answered</div>
            {[
              {answer:'Coming', count:11, names:'Tran, Marsh, Owusu, Chen, Patel, Brandt, Morgan, Reyes, Russo, Nguyen, Lindqvist', color:G},
              {answer:"Can't come", count:2, names:'Okafor (away), Hartley (unwell)', color:ROSE},
              {answer:'Not sure yet', count:1, names:'Park', color:MUT},
            ].map(r => (
              <div key={r.answer} style={{ marginBottom:16, background:'#fff', border:`1px solid ${LN}`, borderRadius:12, padding:'12px 16px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:r.color }}>{r.answer}</span>
                  <span style={{ fontSize:22, fontWeight:800, color:INK, letterSpacing:'-0.03em' }}>{r.count}</span>
                </div>
                <div style={{ fontSize:13, color:MUT }}>{r.names}</div>
              </div>
            ))}
            <div style={{ background:PALE, borderRadius:12, padding:'14px 16px', marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:GD, marginBottom:4 }}>Done for you</div>
              <div style={{ fontSize:14, color:INK, fontWeight:600 }}>Who's coming is filled in: 11 players for Saturday.</div>
              <div style={{ fontSize:13, color:MUT, marginBottom:10 }}>Enough for a 9-a-side with two on the bench.</div>
              <Btn label="Open Who's coming" small/>
            </div>
            <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:10 }}>Haven't answered</div>
            {[
              {ini:'B', name:'Brennan family',  note:'Seen the poll'},
              {ini:'D', name:'Delaney family',  note:'Not seen yet'},
              {ini:'Q', name:'Quinn family',    note:'Not seen yet · joined Tuesday'},
            ].map(f => (
              <div key={f.ini} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom:`1px solid ${LN}` }}>
                <Ini s={f.ini} bg={MUT} size={32}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, color:INK }}>{f.name}</div>
                  <div style={{ fontSize:12, color:MUT }}>{f.note}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:14 }}>
              <Btn label="Nudge the 3" primary/>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Media panel (CH6 / CH6e) ────────────────────────────────────────────────

function MediaPanel({ empty, onBack }: { empty:boolean; onBack:()=>void }) {
  const [tab, setTab] = useState(0)
  const mediaItems = [
    {ini:'LT', iniColor:ROSE,  label:'Mia with both boots',    sender:'Linh · today',   isVideo:false},
    {ini:'LT', iniColor:ROSE,  label:'0:21',                   sender:'Linh · today',   isVideo:true},
    {ini:'RO', iniColor:MUT,   label:'Team photo after Ironbark', sender:'Rob · Sat',    isVideo:false},
    {ini:'SK', iniColor:G,     label:'New goals on pitch 2',   sender:'Sam · Sat',      isVideo:false},
    {ini:'JW', iniColor:G2,    label:"0:09 Ruby's goal",       sender:'Jess · Sat',     isVideo:true},
    {ini:'AM', iniColor:'#c3a84a', label:'Oranges at half time', sender:'Aroha · Sat',  isVideo:false},
    {ini:'RO', iniColor:MUT,   label:'Medals from the gala day', sender:'Rob · 23 May', isVideo:false},
    {ini:'SK', iniColor:G,     label:'0:34 Warm-up game',      sender:'Sam · 21 May',   isVideo:true},
  ]
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, background:'#fff' }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:INK }}>Photos, videos and files</div>
          <div style={{ fontSize:12, color:MUT }}>U12 Sam team chat · everything shared this season</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn label="Back to chat" onClick={onBack}/>
          {!empty && <Btn label="Save all to this tablet"/>}
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display:'flex', borderBottom:`1px solid ${LN}`, background:'#fff', flexShrink:0, padding:'0 20px' }}>
        {[`Photos and videos · ${empty?0:19}`,`Files · ${empty?0:3}`,'Polls · 4','Places · 2'].map((t,i) => (
          <button key={t} onClick={() => setTab(i)} style={{ height:40, padding:'0 16px', border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:tab===i?700:400, color:tab===i?INK:MUT, borderBottom:tab===i?`2px solid ${G2}`:'2px solid transparent', boxSizing:'border-box' }}>{t}</button>
        ))}
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>
        {empty ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8, textAlign:'center' }}>
            <div style={{ fontSize:15, fontWeight:700, color:INK }}>Nothing shared yet</div>
            <div style={{ fontSize:13, color:MUT, maxWidth:360, lineHeight:1.5 }}>Photos, videos, files, polls and places sent in the chat are all kept here, so nobody has to scroll back for the fixture list.</div>
            <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:10, textAlign:'left', maxWidth:280 }}>
              {[{n:'1',t:'Photo consent is checked',s:'Before a photo reaches families'},{n:'2',t:'Kept for the season',s:'Then deleted'},{n:'3',t:'Parents can ask',s:'To have a photo removed'}].map(s => (
                <div key={s.n} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:24, height:24, borderRadius:'50%', background:PALE, color:G, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>{s.n}</div>
                  <div><div style={{ fontSize:13, fontWeight:700, color:INK }}>{s.t}</div><div style={{ fontSize:12, color:MUT }}>{s.s}</div></div>
                </div>
              ))}
            </div>
          </div>
        ) : tab === 0 ? (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:16 }}>
              {mediaItems.map((m,i) => (
                <div key={i} style={{ borderRadius:10, overflow:'hidden', background:LN, aspectRatio:'4/3', position:'relative' as const, cursor:'pointer' }}>
                  <div style={{ width:'100%', height:'100%', background:`${m.iniColor}30`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4 }}>
                    {m.isVideo && <svg width={24} height={24} viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)"><polygon points="5 3 19 12 5 21"/></svg>}
                    <span style={{ fontSize:11, color:INK, opacity:.6 }}>{m.label.substring(0,18)}</span>
                  </div>
                  <div style={{ position:'absolute' as const, bottom:0, left:0, right:0, background:'rgba(0,0,0,0.5)', padding:'4px 6px' }}>
                    <div style={{ fontSize:10, color:'#fff' }}>{m.sender}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:'#fdf5f0', borderRadius:12, padding:'12px 16px' }}>
              <div style={{ fontSize:13, fontWeight:700, color:ROSE, marginBottom:4 }}>Held back · 1</div>
              <div style={{ fontSize:13, color:INK, marginBottom:6 }}>A photo with Harper in it</div>
              <div style={{ fontSize:12, color:MUT, marginBottom:8 }}>Harper's parent hasn't answered about photos yet. Only you can see it.</div>
              <Btn label="Look" small/>
            </div>
            <div style={{ marginTop:16, fontSize:12, color:MUT, lineHeight:1.5 }}>Kept how long: until the season ends, then photos and videos are deleted unless the club saves them to its own albums. A parent can ask for any photo of their child to be removed.</div>
          </>
        ) : (
          <div style={{ padding:'24px 0', textAlign:'center', fontSize:14, color:MUT }}>Nothing in this tab yet</div>
        )}
      </div>
    </div>
  )
}

// ─── Chat info (CH8) ─────────────────────────────────────────────────────────

function ChatInfoPanel({ onBack }: { onBack:()=>void }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, background:'#fff' }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:INK }}>Chat details</div>
          <div style={{ fontSize:12, color:MUT }}>U12 Sam team chat · set up by Rob on 2 March</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn label="Back to chat" onClick={onBack}/>
          <Btn label="Change settings"/>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
        {/* Members */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:MUT }}>In this chat · 20 adults</div>
            <button style={{ fontSize:12, fontWeight:600, color:G2, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit' }}>See all</button>
          </div>
          {[
            {ini:'RO', bg:MUT, name:'Rob Owusu', role:'Team manager · owner', badge:'Owner'},
            {ini:'SK', bg:G,   name:'Sam K (you)', role:'Head coach', badge:'Can manage'},
            {ini:'JW', bg:G2,  name:'Jess Wu', role:'Co-coach', badge:'Can manage'},
            {ini:'LT', bg:ROSE, name:'Linh Tran', role:"Mia's mum", badge:'Remove'},
            {ini:'AM', bg:'#c3a84a', name:'Aroha Marsh', role:"Leo's mum", badge:'Remove'},
            {ini:'DC', bg:MUT, name:'Dan Chen', role:"Ruby's dad", badge:'Remove'},
          ].map(m => (
            <div key={m.ini} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${LN}` }}>
              <Ini s={m.ini} bg={m.bg} size={32}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:INK }}>{m.name}</div>
                <div style={{ fontSize:12, color:MUT }}>{m.role}</div>
              </div>
              <span style={{ fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:999, background: m.badge==='Owner'?PALE:m.badge==='Can manage'?PALE:'#fff5f5', color: m.badge==='Owner'?G:m.badge==='Can manage'?G2:ROSE }}>{m.badge}</span>
            </div>
          ))}
          <div style={{ fontSize:12, color:MUT, padding:'8px 0' }}>And 14 more families. A family is added when their child joins the team and leaves when the child does.</div>
        </div>

        {/* Rules */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:MUT, marginBottom:10 }}>Rules for this chat</div>
          {[
            {label:'Parents can post', value:'On', note:'Chosen by Rob when he set up the chat'},
            {label:'Parents can send', value:'Photos, videos, voice notes, files and places', note:'No polls'},
            {label:'Quiet hours', value:'9 pm to 7 am', note:'On'},
            {label:'Welfare officer can read', value:'Helen Park', note:'A club rule'},
          ].map(r => (
            <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:`1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize:14, color:INK }}>{r.label}</div>
                {r.note && <div style={{ fontSize:12, color:MUT }}>{r.note}</div>}
              </div>
              <span style={{ fontSize:14, fontWeight:600, color:G2, flexShrink:0, marginLeft:12 }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* For you */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:MUT, marginBottom:10 }}>For you</div>
          {[
            {label:'Mute this chat', note:'Announcements and messages that name you still come through'},
            {label:'Pinned messages', note:'1 pinned: Saturday, be there 8:40', action:'See'},
            {label:'Pause the chat', note:''},
            {label:'Save a copy', note:''},
          ].map(item => (
            <div key={item.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:`1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize:14, color:INK }}>{item.label}</div>
                {item.note && <div style={{ fontSize:12, color:MUT }}>{item.note}</div>}
              </div>
              {item.action
                ? <button style={{ fontSize:12, fontWeight:600, color:G2, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit' }}>{item.action}</button>
                : <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Photo check overlay (CH7) ───────────────────────────────────────────────

function PhotoCheckOverlay({ onDone }: { onDone:()=>void }) {
  return (
    <div style={{ position:'absolute' as const, inset:0, zIndex:50, background:'rgba(16,33,31,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#fff', borderRadius:20, padding:28, width:480, boxShadow:'0 16px 48px rgba(0,0,0,0.25)' }}>
        <div style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:4 }}>Before this photo goes to 17 families</div>
        <div style={{ fontSize:13, color:ROSE, marginBottom:16 }}>One player in U12 Sam has no yes for photos</div>

        {/* Photo placeholder */}
        <div style={{ width:'100%', height:140, background:'#e8edeb', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, fontSize:12, color:MUT }}>
          Your photo · taken today 6:05 pm at Wattle Creek Reserve
        </div>

        {/* Question */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
          <Ini s="HQ" bg={ROSE} size={34}/>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:INK }}>Is Harper Quinn in this photo?</div>
            <div style={{ fontSize:12, color:MUT }}>Her parent hasn't answered about photos yet. Joined Tuesday.</div>
          </div>
        </div>

        {/* Options */}
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
          {[
            {label:"No, she's not in it", sub:'Send to the team chat as it is'},
            {label:'Yes. Blur her and send', sub:'You tap her face and it\'s blurred before anyone sees it'},
            {label:'Yes. Send to coaches only', sub:'Goes to the coaching team chat, not to families'},
          ].map(opt => (
            <button key={opt.label} onClick={onDone} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 14px', borderRadius:10, border:`1px solid ${LN}`, background:'#fff', cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}>
              <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${LN}`, marginTop:2, flexShrink:0 }}/>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:INK }}>{opt.label}</div>
                <div style={{ fontSize:12, color:MUT }}>{opt.sub}</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ fontSize:12, color:MUT, lineHeight:1.5, marginBottom:16 }}>You're only asked when someone in the team has no yes for photos. The same question goes to a parent who sends a photo.</div>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={onDone} style={{ height:36, padding:'0 16px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Ask Harper's parent again</button>
          <button onClick={onDone} style={{ height:36, padding:'0 16px', borderRadius:999, border:'none', background:G, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Blur and send</button>
        </div>
      </div>
    </div>
  )
}

// ─── Message actions overlay (CH9) ───────────────────────────────────────────

function MessageActionsOverlay({ onDone }: { onDone:()=>void }) {
  const reactions = ['👍','❤️','😂','🙌','😮','🙏']
  const actions = [
    {label:'Reply', note:'Quotes the message in the chat', icon:'M3 10a7 7 0 0114 0v1a7 7 0 01-7 7H3l3-3M3 10H0'},
    {label:'Reply privately', note:'Only Dan sees it', icon:'M18 2l3 3-3 3M15 5h6M9 18H3l3-3M3 18v-6a7 7 0 0114 0'},
    {label:'Pin for everyone', note:'Stays at the top of the chat', icon:'M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17l-6 4.7 2.5-7.6L3 9.4h7.6z'},
    {label:'Delete for everyone', note:'Coaches and the owner can remove any message', icon:'M3 6h18M19 6l-1 14H6L5 6M9 6V4h6v2'},
    {label:'Report to the welfare officer', note:'Helen Park sees the message and who sent it', icon:'M12 9v4M12 17h.01M10.3 3l-7.6 13A2 2 0 004.4 19h15.2a2 2 0 001.7-3L13.7 3a2 2 0 00-3.4 0z'},
  ]
  return (
    <div onClick={onDone} style={{ position:'absolute' as const, inset:0, zIndex:50, background:'rgba(16,33,31,0.3)' }}>
      <div onClick={e => e.stopPropagation()} style={{ position:'absolute' as const, left:264, right:0, bottom:0, background:'#fff', borderTopLeftRadius:20, borderTopRightRadius:20, boxShadow:'0 -8px 32px rgba(0,0,0,0.12)' }}>
        {/* Quoted message */}
        <div style={{ padding:'16px 20px 10px', borderBottom:`1px solid ${LN}` }}>
          <div style={{ display:'flex', gap:10 }}>
            <Ini s="DC" bg={MUT} size={28}/>
            <div style={{ background:'#f5f6f4', borderRadius:10, padding:'8px 12px', flex:1 }}>
              <div style={{ fontSize:12, fontWeight:700, color:MUT, marginBottom:3 }}>Dan Chen · Ruby's dad · 8:02 pm</div>
              <div style={{ fontSize:14, color:INK }}>Why does Ruby only ever get one half? Some kids never come off.</div>
            </div>
          </div>
        </div>
        {/* Emoji row */}
        <div style={{ display:'flex', gap:8, padding:'14px 20px', borderBottom:`1px solid ${LN}` }}>
          {reactions.map(r => (
            <button key={r} onClick={onDone} style={{ width:44, height:44, borderRadius:999, border:`1px solid ${LN}`, background:'#fff', fontSize:22, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{r}</button>
          ))}
        </div>
        {/* Actions */}
        <div style={{ padding:'8px 0' }}>
          {actions.map(a => (
            <button key={a.label} onClick={onDone} style={{ display:'flex', alignItems:'center', gap:12, width:'100%', padding:'12px 20px', border:'none', background:'transparent', cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={a.label.includes('Delete')?ROSE:a.label.includes('Report')?ROSE:MUT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={a.icon}/></svg>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color: a.label.includes('Delete')||a.label.includes('Report')?ROSE:INK }}>{a.label}</div>
                <div style={{ fontSize:12, color:MUT }}>{a.note}</div>
              </div>
            </button>
          ))}
        </div>
        {/* Compose bar */}
        <div style={{ padding:'8px 20px 10px', borderTop:`1px solid ${LN}` }}>
          <div style={{ fontSize:12, color:MUT, marginBottom:8 }}>Game time is easier one to one. "Reply privately" moves it out of the group.</div>
          <ComposeBar placeholder="Write to the team chat"/>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function TeamChatScreen({ empty = false, miniRoos = false }: { empty?: boolean; miniRoos?: boolean }) {
  const [selectedChat, setSelectedChat] = useState<ChatId>('u12')
  const [panelView, setPanelView]       = useState<PanelView>('chat')
  const [overlay, setOverlay]           = useState<Overlay>(null)

  const teamName    = miniRoos ? 'U9 Tom families' : 'U12 Sam team chat'
  const footerNote  = 'Nobody\'s phone number is shared. Families leave these chats when the season ends.'

  if (empty) {
    return (
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
        <div style={{ width:264, flexShrink:0, borderRight:`1px solid ${LN}`, display:'flex', flexDirection:'column', background:'#fff' }}>
          <div style={{ padding:'14px 16px 10px', borderBottom:`1px solid ${LN}` }}>
            <div style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:10 }}>Chats</div>
            <div style={{ display:'flex', gap:6 }}>
              <button style={{ flex:1, height:32, borderRadius:999, border:`1px solid ${G}`, background:PALE, color:G, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Inbox</button>
              <button style={{ flex:1, height:32, borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>New chat</button>
            </div>
          </div>
          <button style={{ padding:'10px 16px', borderBottom:`1px solid ${LN}`, background:'transparent', border:'none', textAlign:'left', cursor:'pointer', fontFamily:'inherit', display:'block', width:'100%' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
              <span style={{ fontSize:13, fontWeight:700, color:INK }}>Announcements</span>
            </div>
            <div style={{ fontSize:12, color:MUT }}>No messages yet</div>
          </button>
          <div style={{ flex:1, overflowY:'auto', padding:'6px 0' }}>
            <button style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 16px', border:'none', borderBottom:`1px solid ${LN}`, background:PALE, textAlign:'left', cursor:'pointer', fontFamily:'inherit', width:'100%' }}>
              <Ini s="U12" bg={G} size={36}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:INK }}>U12 Sam team chat</span>
                </div>
                <div style={{ fontSize:12, color:MUT }}>No messages yet</div>
              </div>
            </button>
          </div>
          <div style={{ padding:'10px 16px', fontSize:11, color:MUT, lineHeight:1.5, borderTop:`1px solid ${LN}`, background:'#fafafa' }}>{"Nobody's phone number is shared. Families leave these chats when the season ends."}</div>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#fff' }}>
          <div style={{ padding:'14px 20px 12px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', gap:10 }}>
            <Ini s="U12" bg={G} size={32}/>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:INK }}>U12 Sam team chat</div>
              <div style={{ fontSize:12, color:MUT }}>17 families invited · 9 have joined so far</div>
            </div>
          </div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 24px', gap:12, textAlign:'center' }}>
            <div style={{ fontSize:16, fontWeight:700, color:INK }}>Say hello to the team</div>
            <div style={{ fontSize:14, color:MUT, lineHeight:1.5, maxWidth:340 }}>Families see this chat as soon as they join Clean Sheet. Try a poll for Saturday, or a photo from training.</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginTop:4 }}>
              {['Photo','Video','Voice','Poll','Place','File','Clip or drill'].map(label => (
                <button key={label} style={{ height:32, padding:'0 12px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ padding:'12px 20px', borderTop:`1px solid ${LN}`, display:'flex', gap:8 }}>
            <input style={{ flex:1, height:40, borderRadius:10, border:`1px solid ${LN}`, padding:'0 14px', fontSize:14, fontFamily:'inherit', outline:'none' }} placeholder="Write to the team chat" readOnly />
            <button style={{ height:40, padding:'0 16px', borderRadius:10, border:0, background:G, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Send</button>
          </div>
          <div style={{ padding:'0 20px 12px', fontSize:12, color:MUT }}>Everyone in this chat can see this.</div>
        </div>
      </div>
    )
  }

  if (miniRoos) {
    return (
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
        {/* MiniRoos sidebar */}
        <div style={{ width:264, flexShrink:0, borderRight:`1px solid ${LN}`, display:'flex', flexDirection:'column', background:'#fff' }}>
          <div style={{ padding:'14px 16px 10px', borderBottom:`1px solid ${LN}` }}>
            <div style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:10 }}>Chats</div>
            <div style={{ display:'flex', gap:6 }}>
              <button style={{ flex:1, height:32, borderRadius:999, border:`1px solid ${G}`, background:PALE, color:G, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Inbox</button>
              <button onClick={() => setPanelView('newchat')} style={{ flex:1, height:32, borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>New chat</button>
            </div>
          </div>
          <button onClick={() => setPanelView('announcements')} style={{ padding:'10px 16px', borderBottom:`1px solid ${LN}`, background: panelView==='announcements'?PALE:'transparent', border:'none', textAlign:'left', cursor:'pointer', fontFamily:'inherit', display:'block', width:'100%' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
              <span style={{ fontSize:13, fontWeight:700, color: panelView==='announcements'?G:INK }}>Announcements</span>
              <span style={{ fontSize:11, color:MUT }}>Mon</span>
            </div>
            <div style={{ fontSize:12, color:MUT }}>You: Photo day is Saturday 20 June</div>
          </button>
          <div style={{ flex:1, overflowY:'auto', padding:'6px 0' }}>
            <button onClick={() => { setSelectedChat('u12'); setPanelView('chat') }} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 16px', border:'none', borderBottom:`1px solid ${LN}`, background: selectedChat==='u12'&&panelView==='chat'?PALE:'transparent', textAlign:'left', cursor:'pointer', fontFamily:'inherit', width:'100%' }}>
              <Ini s="U9" bg={G} size={36}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:INK }}>U9 Tom families</span>
                  <span style={{ fontSize:11, color:MUT }}>6:40 pm</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:12, color:MUT }}>Sami: Omar says thanks for the goalie turn</span>
                  <span style={{ background:ROSE, color:'#fff', borderRadius:'999px', padding:'0 6px', fontSize:11, fontWeight:700, lineHeight:'18px' }}>2</span>
                </div>
              </div>
            </button>
            <button style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 16px', border:'none', borderBottom:`1px solid ${LN}`, background:'transparent', textAlign:'left', cursor:'pointer', fontFamily:'inherit', width:'100%' }}>
              <Ini s="SH" bg={ROSE} size={36}/>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                  <span style={{ fontSize:14, fontWeight:600, color:INK }}>Sami Haddad · Omar's dad</span>
                  <span style={{ fontSize:11, color:MUT }}>Mon</span>
                </div>
                <span style={{ fontSize:12, color:MUT }}>Omar's away this week</span>
              </div>
            </button>
          </div>
          <div style={{ padding:'10px 16px', fontSize:11, color:MUT, lineHeight:1.5, borderTop:`1px solid ${LN}`, background:'#fafafa' }}>{footerNote}</div>
        </div>

        {/* MiniRoos chat panel */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', position:'relative' as const }}>
          {panelView==='newchat' ? (
            <NewChatPanel onCancel={() => setPanelView('chat')} onCreate={() => setPanelView('chat')}/>
          ) : panelView==='announcements' ? (
            <AnnouncementsPanel empty={false}/>
          ) : (
            <>
              <div style={{ padding:'12px 20px', borderBottom:`1px solid ${LN}`, display:'flex', alignItems:'center', gap:12, flexShrink:0, background:'#fff' }}>
                <Ini s="U9" bg={G} size={38}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:INK }}>{teamName}</div>
                  <div style={{ fontSize:12, color:MUT }}>10 families and Tom · parents can post · no scores or ladders here</div>
                </div>
              </div>
              <div style={{ flex:1, overflowY:'auto', padding:'20px 20px 12px' }}>
                {empty ? (
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8, textAlign:'center' }}>
                    <Ini s="U9" bg={G} size={56}/>
                    <div style={{ fontSize:16, fontWeight:700, color:INK, marginTop:4 }}>U9 Tom families</div>
                    <div style={{ fontSize:14, fontWeight:600, color:INK }}>Say hello to the families</div>
                    <div style={{ fontSize:13, color:MUT, maxWidth:360, lineHeight:1.5 }}>Ten families are in. A photo from training or a poll for game leader is a good first message.</div>
                  </div>
                ) : (
                  <>
                    <ChatBubble ini="TA" iniColor={G} sender="You · 5:10 pm" time="">
                      <div style={{ background:'#f5f6f4', borderRadius:12, padding:'12px 14px' }}>
                        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:G2, marginBottom:4 }}>Poll</div>
                        <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:8 }}>Who can be game leader on Saturday?</div>
                        {[{label:"I can", votes:2},{label:"I've never done it but I'll try",votes:1}].map(opt => (
                          <div key={opt.label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                            <div style={{ flex:1, height:28, background:LN, borderRadius:999, overflow:'hidden', position:'relative' as const }}>
                              <div style={{ width:`${opt.votes/3*100}%`, height:'100%', background:PALE }}/>
                              <span style={{ position:'absolute' as const, left:12, top:'50%', transform:'translateY(-50%)', fontSize:13, color:INK }}>{opt.label}</span>
                            </div>
                            <span style={{ fontSize:14, fontWeight:700, color:INK }}>{opt.votes}</span>
                          </div>
                        ))}
                        <div style={{ fontSize:12, color:MUT, marginTop:4 }}>3 of 10 families · the first yes fills Saturday's game leader</div>
                      </div>
                    </ChatBubble>
                    <ChatBubble ini="MC" iniColor={'#c3a84a'} sender="Mei Chen · Ivy's mum" time="6:22 pm">
                      <div>
                        <div style={{ width:'100%', height:80, background:'#e8edeb', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:6 }}>
                          <span style={{ fontSize:12, color:MUT }}>📸 Ivy drew the whole team. Arlo is the one with the cape.</span>
                        </div>
                        <div style={{ display:'flex', gap:6 }}>
                          <span style={{ display:'inline-flex', alignItems:'center', gap:4, background:'#f0f4f2', borderRadius:999, padding:'2px 8px', fontSize:13 }}>❤️ <span style={{ fontSize:12, color:MUT, fontWeight:600 }}>7</span></span>
                        </div>
                      </div>
                    </ChatBubble>
                    <ChatBubble ini="SH" iniColor={ROSE} sender="Sami Haddad · Omar's dad" time="6:40 pm">
                      <div>
                        <div style={{ fontSize:14, color:INK, lineHeight:1.5, marginBottom:6 }}>Omar says thanks for the goalie turn. He's still talking about it.</div>
                        <div style={{ display:'flex', gap:6 }}>
                          <span style={{ display:'inline-flex', alignItems:'center', gap:4, background:'#f0f4f2', borderRadius:999, padding:'2px 8px', fontSize:13 }}>👍 <span style={{ fontSize:12, color:MUT, fontWeight:600 }}>3</span></span>
                        </div>
                      </div>
                    </ChatBubble>
                  </>
                )}
              </div>
              <ComposeBar placeholder="Write to the families" hint="Clean Sheet steps in if someone posts a score or a ladder: under 12s don't keep them."/>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex:1, display:'flex', overflow:'hidden', position:'relative' as const }}>
      <Sidebar selectedChat={selectedChat} panelView={panelView} onChat={id => { setSelectedChat(id); setPanelView('chat') }} onAnnouncements={() => setPanelView('announcements')} onNewChat={() => setPanelView('newchat')}/>

      {/* Right panel */}
      {panelView === 'chat'         && <ChatPanel empty={empty} selectedChat={selectedChat} onResults={() => setPanelView('pollresults')} onPoll={() => setPanelView('newpoll')} onMedia={() => setPanelView('media')} onInfo={() => setPanelView('chatinfo')} onPhotoCheck={() => setOverlay('photocheck')} onMsgActions={() => setOverlay('messageactions')}/>}
      {panelView === 'announcements' && <AnnouncementsPanel empty={empty}/>}
      {panelView === 'newchat'       && <NewChatPanel onCancel={() => setPanelView('chat')} onCreate={() => setPanelView('chat')}/>}
      {panelView === 'newpoll'       && <NewPollPanel onCancel={() => setPanelView('chat')} onSend={() => setPanelView('chat')}/>}
      {panelView === 'pollresults'   && <PollResultsPanel empty={empty} onBack={() => setPanelView('chat')}/>}
      {panelView === 'media'         && <MediaPanel empty={empty} onBack={() => setPanelView('chat')}/>}
      {panelView === 'chatinfo'      && <ChatInfoPanel onBack={() => setPanelView('chat')}/>}

      {/* Overlays */}
      {overlay === 'photocheck'     && <PhotoCheckOverlay onDone={() => setOverlay(null)}/>}
      {overlay === 'messageactions' && <MessageActionsOverlay onDone={() => setOverlay(null)}/>}
    </div>
  )
}
