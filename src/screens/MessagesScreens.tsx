import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

function Icon({ d, size = 20, stroke = 'currentColor', sw = 2, fill = 'none' }: { d: string; size?: number; stroke?: string; sw?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d}/>
    </svg>
  )
}

function Toast({ msg }: { msg: string }) {
  return <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{msg}</div>
}

const ICONS = {
  home:     'M4 11l8-7 8 7v9H4z',
  squad:    'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
  training: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4',
  matchday: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  clips:    'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z',
  record:   'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z',
  chevdown: 'M6 9l6 6 6-6',
  back:     'M15 6l-6 6 6 6',
  search:   'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  msg:      'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  attach:   'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13',
  mic:      'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8',
  send:     'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  lock:     'M5 11a7 7 0 0114 0v1a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zM12 17a1 1 0 100-2 1 1 0 000 2z',
  welfare:  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  info:     'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  plus:     'M12 5v14M5 12h14',
}

const NAV6 = [
  { id: 'home',     label: 'Home',      icon: ICONS.home },
  { id: 'squad',    label: 'Squad',     icon: ICONS.squad },
  { id: 'training', label: 'Training',  icon: ICONS.training },
  { id: 'matchday', label: 'Match day', icon: ICONS.matchday },
  { id: 'clips',    label: 'Clips',     icon: ICONS.clips },
  { id: 'record',   label: 'Record',    icon: ICONS.record },
]

const HOME_SUBS = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']

function CoachTopBar({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div style={{ background: GD, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 2, height: 56, flexShrink: 0 }}>
      <span style={{ color: '#e9eae8', fontWeight: 800, fontSize: 16, marginRight: 10 }}>Clean Sheet</span>
      {NAV6.map(tab => (
        <button key={tab.id} onClick={() => onNav(tab.id)}
          style={{ height: 48, padding: '0 14px', borderRadius: 12, background: tab.id === 'home' ? G2 : 'transparent', color: '#e9eae8', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          <Icon d={tab.icon} size={18}/> {tab.label}
        </button>
      ))}
      <div style={{ flex: 1 }}/>
      <button onClick={() => onNav('team')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e9eae8', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
        U12 Sam · Wattle Creek <Icon d={ICONS.chevdown} size={14}/>
      </button>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginLeft: 8 }}>SK</div>
    </div>
  )
}

function CoachSubNav({ activeSub, onNav }: { activeSub: string; onNav: (id: string) => void }) {
  return (
    <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4, flexShrink: 0 }}>
      {HOME_SUBS.map(tab => (
        <button key={tab} onClick={() => onNav('sub:' + tab)}
          style={{ height: 44, padding: '0 4px', marginRight: 16, fontSize: 15, fontWeight: 600, color: tab === activeSub ? G : MUT, background: 'transparent', border: 'none', borderBottom: `3px solid ${tab === activeSub ? G : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
          {tab}
        </button>
      ))}
    </div>
  )
}

function Ini({ s, bg, color, size = 36 }: { s: string; bg?: string; color?: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg || PALE, color: color || G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.33, fontWeight: 700, flexShrink: 0 }}>{s}</div>
  )
}

// MSG0 — Who can message whom
export function MessagesRules({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const sections = [
    {
      title: 'Adults',
      rules: [
        'Anyone at the club can message anyone else — 1 to 1 or in a group',
        'Parents can message other parents within their own team',
        'Anyone can write to the welfare officer privately',
      ],
    },
    {
      title: 'Players and referees aged 15–17',
      rules: [
        'Can message teammates aged 15 and over',
        'Can receive messages from coaches, but a parent is always copied',
        'Adults cannot start a chat with them — the coach or referee co-ordinator adds them to the group',
        'Group chats always have at least two coaches present',
      ],
    },
    {
      title: 'Players under 15',
      rules: [
        'No chats at all',
        'News and updates from their coach come through, but they don\'t reply',
        'They can write to the welfare officer',
        'Their parent messages on their behalf — coaches send to the parent',
      ],
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button onClick={() => t('Back.')} style={{ background: 'transparent', border: 'none', color: '#e9eae8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', padding: '0 10px 0 0' }}>
          <Icon d={ICONS.back} size={18}/> Back
        </button>
        <span style={{ color: '#e9eae8', fontWeight: 800, fontSize: 16 }}>Who can message whom</span>
      </div>
      <div style={{ maxWidth: 720, margin: '32px auto', padding: '0 24px', width: '100%' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: INK, marginBottom: 4, letterSpacing: '-0.03em' }}>Who can message whom</h1>
        <p style={{ fontSize: 15, color: MUT, marginBottom: 32, lineHeight: 1.6 }}>Clean Sheet makes sure every conversation follows safeguarding rules automatically.</p>
        {sections.map(section => (
          <div key={section.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 12 }}>{section.title}</div>
            <ul style={{ margin: 0, padding: '0 0 0 18px', listStyle: 'disc' }}>
              {section.rules.map(r => (
                <li key={r} style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 2 }}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16, fontSize: 13, color: G, lineHeight: 1.6 }}>
          <strong>These rules apply everywhere.</strong> Every screen that shows a person's name has a card with a Message button — the right rules apply automatically, so you never have to work out what's allowed.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={() => t('Coach messages view opens — MSG1.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See it as a coach</button>
          <button onClick={() => t('Parent messages view opens — MSGp1.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: '#fff', color: INK, border: `1px solid ${LN}`, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See it as a parent</button>
        </div>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// MSG1 — New message picker
export function CoachNewMessage({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const groups = [
    {
      heading: 'My team · U12 Sam',
      contacts: [
        { ini: 'JM', name: 'Jess Marsh',    role: 'Co-coach' },
        { ini: 'RO', name: 'Rob Owusu',     role: 'Team manager' },
        { ini: 'PS', name: 'Priya Shah',    role: 'Fitness coach' },
      ],
    },
    {
      heading: 'Parents · 17 families',
      contacts: [
        { ini: 'LT', name: 'Linh Tran',   role: 'Mia and Bao\'s mum' },
        { ini: 'KQ', name: 'Kate Quinn',  role: 'Harper\'s mum' },
        { ini: 'DS', name: 'Dev Singh',   role: 'Noah\'s dad' },
      ],
      showAll: 'Show all 17',
    },
    {
      heading: 'The club',
      contacts: [
        { ini: 'RM', name: 'Rachel M',     role: 'Director of football' },
        { ini: 'BR', name: 'Bianca Rossi', role: 'Club co-ordinator' },
        { ini: 'HP', name: 'Helen Park',   role: 'Welfare officer · private', welfare: true },
        { ini: 'RT', name: 'Ruth Tan',     role: 'Registrar' },
        { ini: 'OG', name: 'Ollie Grant',  role: 'Youth coach' },
        { ini: 'TA', name: 'Tom Albers',   role: 'MiniRoos coach' },
      ],
    },
    {
      heading: 'Players',
      contacts: [
        { ini: 'MT', name: 'Mia Tran',  role: 'Via her parent, Linh' },
      ],
      note: 'Under 15 · message goes to Linh',
    },
  ]

  const rules = [
    '1 to 1 and group chats with other coaches and club staff',
    'Parents of your players — messages about their child',
    'The welfare officer privately',
    'Players 15+ directly (parent is copied); under 15 goes via their parent',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      <CoachTopBar onNav={(id) => t(`${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}/>
      <CoachSubNav activeSub="Messages" onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id} opens.`)}/>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', gap: 0 }}>
        {/* Left: new message picker */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 24px 28px', display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, maxWidth: 560 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700, color: INK }}>New message</h2>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input placeholder="Search for a person or group…" style={{ width: '100%', height: 44, padding: '0 16px 0 40px', borderRadius: 10, border: `1px solid ${LN}`, fontSize: 14, color: INK, background: '#fff', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }}/>
              <span style={{ position: 'absolute', left: 12, top: 12, color: MUT }}><Icon d={ICONS.search} size={20}/></span>
            </div>
            {groups.map(g => (
              <div key={g.heading} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>{g.heading}</div>
                <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
                  {g.contacts.map((c, i) => (
                    <button key={c.ini} onClick={() => t(`Opening new message to ${c.name}.`)}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', width: '100%', background: 'transparent', border: 'none', borderBottom: i < g.contacts.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                      <Ini s={c.ini} bg={'welfare' in c && c.welfare ? '#f0f4f0' : PALE}/>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: MUT }}>{c.role}</div>
                      </div>
                      {'welfare' in c && c.welfare && <span style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, padding: '2px 8px', borderRadius: 100 }}>Private</span>}
                    </button>
                  ))}
                  {g.showAll && <button onClick={() => t('All parents list opens.')} style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>{g.showAll}</button>}
                </div>
                {g.note && <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{g.note}</div>}
              </div>
            ))}
          </div>
        </div>
        {/* Right: rules aside */}
        <div style={{ width: 320, flexShrink: 0, borderLeft: `1px solid ${LN}`, background: '#fff', padding: '24px 20px', overflowY: 'auto' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Who can a head coach message?</div>
          <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
            {rules.map(r => <li key={r} style={{ fontSize: 13, color: INK, lineHeight: 1.7, marginBottom: 4 }}>{r}</li>)}
          </ul>
          <button onClick={() => t('Full rules — MSG0 opens.')} style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: G, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>See the full rules →</button>
        </div>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// MSG2 — Direct chat
export function CoachMessages({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [input, setInput] = useState('')
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const chats = [
    { ini: 'U1', name: 'U12 Sam team', preview: 'Rob: Can someone grab…', time: '2:30pm', unread: 2, group: true },
    { ini: 'BR', name: 'Bianca Rossi', preview: 'Yes pitch 2 from 9:00', time: '2:15pm', active: true },
    { ini: 'CT', name: 'Coaching team', preview: 'Priya: I\'ll have the data…', time: '11:40am', unread: 1 },
    { ini: 'LT', name: 'Linh Tran',    preview: 'Thanks so much', time: 'Mon' },
    { ini: 'RT', name: 'Ruth Tan',     preview: 'Confirmed.', time: 'Mon' },
    { ini: 'OG', name: 'Ollie Grant',  preview: 'No problem', time: 'Sun' },
    { ini: 'HP', name: 'Helen Park',   preview: 'Private', time: 'Sat', private: true },
  ]

  const transcript = [
    { from: 'SK', text: 'Hi Bianca, do you know which pitch we have this Saturday?', mine: true, time: '2:08pm' },
    { from: 'BR', text: 'Let me check for you…', mine: false, time: '2:10pm' },
    { from: 'BR', text: 'Yes, pitch 2 from 9:00. I\'ll put the cones out early.', mine: false, time: '2:14pm' },
    { from: 'SK', text: 'Brilliant, thank you!', mine: true, time: '2:15pm' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      <CoachTopBar onNav={(id) => t(`${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}/>
      <CoachSubNav activeSub="Messages" onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id} opens.`)}/>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0 }}>
        {/* Chat list */}
        <div style={{ width: 300, flexShrink: 0, borderRight: `1px solid ${LN}`, background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ position: 'relative' }}>
              <input placeholder="Search…" style={{ width: '100%', height: 40, padding: '0 12px 0 36px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 13, background: PALE, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }}/>
              <span style={{ position: 'absolute', left: 10, top: 10, color: MUT }}><Icon d={ICONS.search} size={18}/></span>
            </div>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {chats.map(c => (
              <button key={c.name} onClick={() => t(`${c.name} chat opens.`)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', width: '100%', background: 'active' in c && c.active ? PALE : 'transparent', border: 'none', borderBottom: `1px solid ${LN}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <Ini s={c.ini} size={36} bg={PALE}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: MUT, flexShrink: 0, marginLeft: 8 }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'private' in c && c.private ? G : MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.preview}</div>
                </div>
                {'unread' in c && c.unread && <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{c.unread}</div>}
              </button>
            ))}
          </div>
          <div style={{ padding: '12px 14px', borderTop: `1px solid ${LN}` }}>
            <button onClick={() => t('New message — MSG1 opens.')} style={{ width: '100%', height: 40, borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>+ New message</button>
          </div>
        </div>
        {/* Active chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Chat header */}
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Ini s="BR" size={36}/>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Bianca Rossi</div>
              <button onClick={() => t('Person card opens — MSG3.')} style={{ fontSize: 12, color: G, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>Club co-ordinator · Wattle Creek FC</button>
            </div>
          </div>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {transcript.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.mine ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ padding: '10px 14px', borderRadius: m.mine ? '14px 14px 2px 14px' : '14px 14px 14px 2px', background: m.mine ? GD : '#fff', border: m.mine ? 'none' : `1px solid ${LN}`, color: m.mine ? '#fff' : INK, fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                  <div style={{ fontSize: 11, color: MUT, textAlign: m.mine ? 'right' : 'left', marginTop: 4 }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Composer */}
          <div style={{ padding: '12px 20px', borderTop: `1px solid ${LN}`, background: '#fff', display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => t('Attachment picker opens.')} style={{ width: 40, height: 40, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
              <Icon d={ICONS.attach} size={18}/>
            </button>
            <button onClick={() => t('Voice message opens.')} style={{ width: 40, height: 40, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
              <Icon d={ICONS.mic} size={18}/>
            </button>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Message Bianca…"
              style={{ flex: 1, height: 40, padding: '0 14px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}/>
            <button onClick={() => { t('Message sent.'); setInput('') }} style={{ width: 40, height: 40, borderRadius: 8, background: G, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={ICONS.send} size={18} stroke="#fff"/>
            </button>
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// MSG3 — Person card overlay on MSG2
export function CoachMessagesPersonCard({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7', position: 'relative' }}>
      <CoachTopBar onNav={() => t('Tab opens.')}/>
      <CoachSubNav activeSub="Messages" onNav={() => t('Tab opens.')}/>
      {/* MSG2 background (blurred) */}
      <div style={{ flex: 1, background: '#f7f8f7', filter: 'blur(2px)', opacity: 0.5, position: 'absolute', inset: '112px 0 0 0' }}/>
      {/* Person card dialog */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10, background: '#fff', borderRadius: 20, border: `1px solid ${LN}`, boxShadow: '0 20px 60px rgba(16,33,31,0.18)', width: 380, padding: '28px 24px' }}>
        <button onClick={() => t('Card closed.')} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', fontSize: 16, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <Ini s="BR" size={64} bg={PALE}/>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginTop: 10 }}>Bianca Rossi</div>
          <div style={{ fontSize: 13, color: MUT }}>Club co-ordinator · Wattle Creek FC</div>
        </div>
        <button onClick={() => t('Message opens — MSG2.')} style={{ display: 'block', width: '100%', height: 44, borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10 }}>Message</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          <button onClick={() => t('Add to group opens.')} style={{ height: 40, borderRadius: 10, background: '#fff', color: INK, border: `1px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Add to group</button>
          <button onClick={() => t('Role info opens.')} style={{ height: 40, borderRadius: 10, background: '#fff', color: INK, border: `1px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Role info</button>
        </div>
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>Looks after</div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6 }}>Fixtures and pitches · Kit · Team registrations</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: MUT }}>WWCC</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: G }}>Valid</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Notifications muted.')} style={{ height: 36, padding: '0 12px', borderRadius: 8, background: '#fff', color: MUT, border: `1px solid ${LN}`, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flex: 1 }}>Mute</button>
          <button onClick={() => t('Block and report opens.')} style={{ height: 36, padding: '0 12px', borderRadius: 8, background: '#fff', color: '#b04', border: `1px solid ${LN}`, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flex: 1 }}>Block and report</button>
        </div>
        <div style={{ fontSize: 11, color: MUT, textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          Every person has this card, on every screen where their name shows. No phone number or email is shown.
        </div>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// MSG4 — Director messages
export function DirectorMessages({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [input, setInput] = useState('')
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const DIRECTOR_NAV = ['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports']
  const CLUB_SUBS = ['Overview', 'Messages', 'Calendar', 'Settings']

  const chats = [
    { ini: 'AC', name: 'All coaches',    preview: 'You: Reminder — CWW training…', time: 'Mon', unread: 0 },
    { ini: 'SK', name: 'Sam K',         preview: 'Can we have a second ball bag…', time: '2:15pm', unread: 1, active: true },
    { ini: 'BR', name: 'Bianca Rossi',  preview: 'On it.', time: '11:40am', unread: 0 },
    { ini: 'GL', name: 'Greg Lawson',   preview: 'Thanks Rachel', time: 'Yesterday', unread: 0 },
    { ini: 'HP', name: 'Helen Park',    preview: '1 concern · closed', time: 'Sat', private: true, welfare: true },
    { ini: 'DK', name: 'Dan Kovac',     preview: 'U7 parent · Okay thank you', time: 'Tue', unread: 0 },
  ]

  const transcript = [
    { from: 'SK', text: 'Hi Rachel — could we get a second ball bag for training? The squad is up to 18 now.', mine: false, time: '2:08pm' },
    { from: 'RM', text: 'Absolutely — I\'ll ask Bianca to sort it before Thursday. Good catch.', mine: true, time: '2:15pm' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      {/* Director top bar */}
      <div style={{ background: GD, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 2, height: 56, flexShrink: 0 }}>
        <span style={{ color: '#e9eae8', fontWeight: 800, fontSize: 16, marginRight: 10 }}>Clean Sheet</span>
        {DIRECTOR_NAV.map(tab => (
          <button key={tab} onClick={() => t(`${tab} opens.`)}
            style={{ height: 48, padding: '0 14px', borderRadius: 12, background: tab === 'Club' ? G2 : 'transparent', color: '#e9eae8', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            {tab}
          </button>
        ))}
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => t('Club selector.')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e9eae8', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
            Wattle Creek FC <Icon d={ICONS.chevdown} size={14}/>
          </button>
          <Ini s="RM" size={36} bg={ROSE} color="#fff"/>
        </div>
      </div>
      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4, flexShrink: 0 }}>
        {CLUB_SUBS.map(tab => (
          <button key={tab} onClick={() => t(`${tab} opens.`)}
            style={{ height: 44, padding: '0 4px', marginRight: 16, fontSize: 15, fontWeight: 600, color: tab === 'Messages' ? G : MUT, background: 'transparent', border: 'none', borderBottom: `3px solid ${tab === 'Messages' ? G : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', boxSizing: 'border-box' }}>
            {tab}
          </button>
        ))}
      </div>
      {/* Layout */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0 }}>
        {/* Chat list */}
        <div style={{ width: 300, flexShrink: 0, borderRight: `1px solid ${LN}`, background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', gap: 8 }}>
            <button onClick={() => t('Message all coaches opens.')} style={{ flex: 1, height: 36, borderRadius: 8, background: PALE, color: G, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Message all coaches</button>
            <button onClick={() => t('New message opens.')} style={{ width: 36, height: 36, borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer' }}>+</button>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {chats.map(c => (
              <button key={c.name} onClick={() => t(`${c.name} chat opens.`)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', width: '100%', background: 'active' in c && c.active ? PALE : 'transparent', border: 'none', borderBottom: `1px solid ${LN}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <Ini s={c.ini} size={36} bg={'welfare' in c && c.welfare ? '#f0f4f0' : PALE}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: MUT, flexShrink: 0, marginLeft: 8 }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'private' in c && c.private ? G : MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.preview}</div>
                </div>
                {(c.unread ?? 0) > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{c.unread}</div>}
              </button>
            ))}
          </div>
        </div>
        {/* Active chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Ini s="SK" size={36}/>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Sam K</div>
              <div style={{ fontSize: 12, color: MUT }}>Head coach · U12 Sam</div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {transcript.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.mine ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ padding: '10px 14px', borderRadius: m.mine ? '14px 14px 2px 14px' : '14px 14px 14px 2px', background: m.mine ? GD : '#fff', border: m.mine ? 'none' : `1px solid ${LN}`, color: m.mine ? '#fff' : INK, fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                  <div style={{ fontSize: 11, color: MUT, textAlign: m.mine ? 'right' : 'left', marginTop: 4 }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 20px', borderTop: `1px solid ${LN}`, background: '#fff', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Message Sam…"
              style={{ flex: 1, height: 40, padding: '0 14px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}/>
            <button onClick={() => { t('Message sent.'); setInput('') }} style={{ width: 40, height: 40, borderRadius: 8, background: G, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={ICONS.send} size={18} stroke="#fff"/>
            </button>
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// Phone shell helper
function PhoneShell({ headerLeft, title, ini, children, toast }: { headerLeft: React.ReactNode; title: string; ini: string; children: React.ReactNode; toast: string | null }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f7f8f7', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', maxWidth: 390, margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, flexShrink: 0 }}>
        {headerLeft}
        <span style={{ flex: 1, color: '#e9eae8', fontSize: 15, fontWeight: 700 }}>{title}</span>
        <Ini s={ini} size={32} bg={G} color="#fff"/>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {children}
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

function PhoneBackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background: 'transparent', border: 'none', color: '#e9eae8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
      <Icon d={ICONS.back} size={20} stroke="#e9eae8"/>
    </button>
  )
}

// MSGp1 — Parent messages
export function ParentMessages({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const chats = [
    { ini: 'U1', name: 'U12 Sam team chat', preview: 'Sam K: Don\'t forget shin pads!', time: '2:30pm', unread: 2 },
    { ini: 'SK', name: 'Sam K · Mia\'s coach', preview: 'Great session today', time: '1:00pm', unread: 0 },
    { ini: 'KQ', name: 'Kate Quinn · Harper\'s mum', preview: 'See you Saturday!', time: 'Mon', unread: 1 },
    { ini: 'RO', name: 'Rob Owusu · Team manager', preview: 'Kit is in the room.', time: 'Mon', unread: 0 },
    { ini: 'U8', name: 'U8 Hannah team chat', preview: 'Tom: Great work everyone', time: 'Sun', unread: 0 },
    { ini: 'HP', name: 'Helen Park · welfare', preview: 'Private', time: 'Sat', private: true },
  ]

  return (
    <PhoneShell headerLeft={<PhoneBackBtn onClick={() => t('Back.')}/>} title="Wattle Creek FC | Messages" ini="LT" toast={toast}>
      <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', marginBottom: 14, fontSize: 13, color: G, lineHeight: 1.6 }}>
        <strong>Mia and Bao are under 15,</strong> so they have no chats. Anything a coach sends them comes to you too.
      </div>
      {chats.map(c => (
        <button key={c.name} onClick={() => t(`${c.name} chat opens.`)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', width: '100%', background: '#fff', border: `none`, borderBottom: `1px solid ${LN}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderRadius: 0 }}>
          <Ini s={c.ini} size={40} bg={'private' in c && c.private ? '#f0f4f0' : PALE}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
              <span style={{ fontSize: 11, color: MUT, flexShrink: 0 }}>{c.time}</span>
            </div>
            <div style={{ fontSize: 12, color: 'private' in c && c.private ? G : MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.preview}</div>
          </div>
          {'unread' in c && (c.unread ?? 0) > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{c.unread}</div>}
        </button>
      ))}
      <button onClick={() => t('New message — MSGp2 opens.')} style={{ display: 'block', width: '100%', height: 48, borderRadius: 12, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 16 }}>+ New message</button>
    </PhoneShell>
  )
}

// MSGp1e — Parent messages empty
export function ParentMessagesEmpty({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <PhoneShell headerLeft={<PhoneBackBtn onClick={() => t('Back.')}/>} title="Wattle Creek FC | Messages" ini="LT" toast={toast}>
      <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', marginBottom: 24, fontSize: 13, color: G, lineHeight: 1.6 }}>
        <strong>Mia and Bao are under 15,</strong> so they have no chats. Anything a coach sends them comes to you too.
      </div>
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 20px', textAlign: 'center', marginBottom: 16 }}>
        <div style={{ color: G, marginBottom: 12 }}><Icon d={ICONS.msg} size={36} stroke={G} sw={1.5}/></div>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No messages yet</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>You'll hear from your team's coach when there's something to share. You can start a message any time.</div>
      </div>
      <button onClick={() => t('New message — MSGp2 opens.')} style={{ display: 'block', width: '100%', height: 48, borderRadius: 12, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>+ New message</button>
    </PhoneShell>
  )
}

// MSGp2 — Parent new message
export function ParentNewMessage({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const groups = [
    {
      heading: 'Mia\'s team',
      contacts: [
        { ini: 'SK', name: 'Sam K',          role: 'Head coach' },
        { ini: 'RO', name: 'Rob Owusu',      role: 'Team manager' },
        { ini: 'KQ', name: 'Kate Quinn',     role: 'Harper\'s mum' },
        { ini: 'DS', name: 'Dev Singh',      role: 'Noah\'s dad' },
      ],
    },
    {
      heading: 'The club',
      contacts: [
        { ini: 'HP', name: 'Helen Park',   role: 'Welfare officer · private', welfare: true },
        { ini: 'BR', name: 'Bianca Rossi', role: 'Club co-ordinator' },
      ],
    },
    {
      heading: 'Children',
      contacts: [
        { ini: 'HQ', name: 'Harper Quinn', role: 'Under 15 · message her mum, Kate', child: true },
      ],
      note: 'Mia and Bao are under 15 and have no chats.',
    },
  ]

  return (
    <PhoneShell headerLeft={<PhoneBackBtn onClick={() => t('Back.')}/>} title="New message" ini="LT" toast={toast}>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <input placeholder="Search…" style={{ width: '100%', height: 44, padding: '0 14px 0 40px', borderRadius: 10, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}/>
        <span style={{ position: 'absolute', left: 12, top: 12, color: MUT }}><Icon d={ICONS.search} size={20}/></span>
      </div>
      {groups.map(g => (
        <div key={g.heading} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>{g.heading}</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {g.contacts.map((c, i) => (
              <button key={c.ini} onClick={() => t('child' in c && c.child ? 'You can message Kate instead.' : `New message to ${c.name} opens.`)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', width: '100%', background: 'transparent', border: 'none', borderBottom: i < g.contacts.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <Ini s={c.ini} size={36} bg={'child' in c && c.child ? LN : PALE} color={'child' in c && c.child ? MUT : G}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'child' in c && c.child ? MUT : INK }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{c.role}</div>
                </div>
                {'welfare' in c && c.welfare && <span style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, padding: '2px 8px', borderRadius: 100 }}>Private</span>}
              </button>
            ))}
          </div>
          {g.note && <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{g.note}</div>}
        </div>
      ))}
      <button onClick={() => t('New group chat opens.')} style={{ display: 'block', width: '100%', height: 44, borderRadius: 12, background: '#fff', border: `1px solid ${LN}`, color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>New group</button>
    </PhoneShell>
  )
}

// MSGp3 — Referee messages
export function RefereeMessages({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const chats = [
    { ini: 'RT', name: 'Ruth Tan · referee co-ordinator', preview: 'You\'re on pitch 2 on Saturday', time: '10:30am', unread: 1, active: true },
    { ini: 'GL', name: 'Game leaders group', preview: 'Ruth: Don\'t forget your flags', time: 'Tue', unread: 0 },
    { ini: 'AF', name: 'Amy Fox · U10 TM', preview: 'Thanks Zoe!', time: 'Sun', unread: 0 },
  ]

  return (
    <PhoneShell headerLeft={<PhoneBackBtn onClick={() => t('Back.')}/>} title="Wattle Creek FC · referees | Messages" ini="ZP" toast={toast}>
      <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', marginBottom: 14, fontSize: 13, color: G, lineHeight: 1.6 }}>
        You're 16, so your mum is copied on messages from adults and can read these chats. Other adults can't start a chat with you: Ruth adds them.
      </div>
      {chats.map(c => (
        <button key={c.name} onClick={() => t(`${c.name} chat opens.`)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', width: '100%', background: 'active' in c && c.active ? PALE : '#fff', border: 'none', borderBottom: `1px solid ${LN}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
          <Ini s={c.ini} size={40} bg={PALE}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
              <span style={{ fontSize: 11, color: MUT, flexShrink: 0 }}>{c.time}</span>
            </div>
            <div style={{ fontSize: 12, color: MUT }}>{c.preview}</div>
          </div>
          {c.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{c.unread}</div>}
        </button>
      ))}
      {/* Welfare officer card */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', marginTop: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f0f4f0', color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={ICONS.welfare} size={18} stroke={G}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Helen Park · welfare officer</div>
            <div style={{ fontSize: 12, color: MUT }}>Private · you can always write to Helen</div>
          </div>
        </div>
        <button onClick={() => t('Opening welfare chat.')} style={{ marginTop: 10, width: '100%', height: 40, borderRadius: 10, background: '#fff', border: `1px solid ${LN}`, color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Write to Helen privately</button>
      </div>
      <button onClick={() => t('New message — Ruth adds contacts.')} style={{ display: 'block', width: '100%', height: 48, borderRadius: 12, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>+ New message</button>
    </PhoneShell>
  )
}

export default CoachMessages
