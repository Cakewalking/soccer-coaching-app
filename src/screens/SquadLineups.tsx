import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

function Icon({ d, size = 20, stroke = 'currentColor', sw = 2 }: { d: string; size?: number; stroke?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
}

const NAV6 = [
  { id: 'home',     label: 'Home',      icon: ICONS.home },
  { id: 'squad',    label: 'Squad',     icon: ICONS.squad },
  { id: 'training', label: 'Training',  icon: ICONS.training },
  { id: 'matchday', label: 'Match day', icon: ICONS.matchday },
  { id: 'clips',    label: 'Clips',     icon: ICONS.clips },
  { id: 'record',   label: 'Record',    icon: ICONS.record },
]

const SQUAD_SUBS = ['Players', 'Line-ups', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']

function CoachFrame({ activeNav, activeSub, subTabs, pageTitle, pageSub, pageRight, children, toast, onNavTab }: {
  activeNav: string; activeSub: string; subTabs: string[]; pageTitle: string; pageSub: string;
  pageRight?: React.ReactNode; children: React.ReactNode; toast: string | null; onNavTab: (t: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      {/* Top bar */}
      <div style={{ background: GD, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 2, height: 56, flexShrink: 0 }}>
        <span style={{ color: '#e9eae8', fontWeight: 800, fontSize: 16, marginRight: 10 }}>Clean Sheet</span>
        {NAV6.map(tab => (
          <button key={tab.id} onClick={() => onNavTab(tab.id)}
            style={{ height: 48, padding: '0 14px', borderRadius: 12, background: tab.id === activeNav ? G2 : 'transparent', color: '#e9eae8', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            <Icon d={tab.icon} size={18}/> {tab.label}
          </button>
        ))}
        <div style={{ flex: 1 }}/>
        <button onClick={() => onNavTab('team')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e9eae8', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
          U12 Sam · Wattle Creek <Icon d={ICONS.chevdown} size={14}/>
        </button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginLeft: 8 }}>SK</div>
      </div>
      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', flex: 1 }}>
          {subTabs.map(tab => (
            <button key={tab} onClick={() => onNavTab('sub:' + tab)}
              style={{ height: 44, padding: '0 4px', marginRight: 16, fontSize: 15, fontWeight: 600, color: tab === activeSub ? G : MUT, background: 'transparent', border: 'none', borderBottom: `3px solid ${tab === activeSub ? G : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
              {tab}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: MUT, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <Icon d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z" size={13}/>Head coach
        </span>
      </div>
      {/* Page heading */}
      <div style={{ padding: '20px 28px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{pageTitle}</h1>
          {pageSub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{pageSub}</div>}
        </div>
        {pageRight && <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>{pageRight}</div>}
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 32px' }}>
        {children}
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

function BtnMore({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>{label}</button>
}
function BtnPrimary({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>{label}</button>
}

// SQ1 — Best lineups screen
export function SquadLineups({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [active, setActive] = useState(0)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const methods = [
    { label: 'Most goals scored',      stat: '7 goals',      note: 'in 142 minutes together',  players: 'Ruby, Grace, Ava, Leo, Noah, Mia, Zoe, Jai, Ella' },
    { label: 'Fewest goals against',   stat: '1 against',    note: 'in 118 minutes together',  players: 'Ruby, Grace, Ava, Isla, Noah, Mia, Zoe, Finn, Ella' },
    { label: 'Longest time winning',   stat: '96 minutes',   note: 'ahead, of 142 together',   players: 'Ruby, Grace, Ava, Leo, Noah, Mia, Zoe, Jai, Ella' },
    { label: 'Won the ball back fastest', stat: '4.6 seconds', note: 'team average is 7',       players: 'Ruby, Grace, Ava, Leo, Noah, Mia, Harper, Jai, Ella' },
  ]

  const pitchPlayers = [
    { ini: 'RW', top: '72%', left: '15%' },
    { ini: 'GK', top: '72%', left: '50%' },
    { ini: 'AW', top: '72%', left: '85%' },
    { ini: 'LM', top: '48%', left: '20%' },
    { ini: 'NS', top: '48%', left: '50%' },
    { ini: 'MT', top: '48%', left: '80%' },
    { ini: 'ZH', top: '24%', left: '20%' },
    { ini: 'JP', top: '24%', left: '50%' },
    { ini: 'EB', top: '24%', left: '80%' },
  ]

  const pairs = [
    { ini: 'NM', names: 'Noah and Mia', note: 'In 8 of the 9 games recorded. Central midfield.' },
    { ini: 'RE', names: 'Ruby and Ella', note: 'Right side · most goals scored and longest winning' },
    { ini: 'AI', names: 'Ava and Isla', note: 'Centre back · fewest goals against' },
  ]

  return (
    <CoachFrame
      activeNav="squad" activeSub="Line-ups" subTabs={SQUAD_SUBS}
      pageTitle="Line-ups that worked"
      pageSub="U12 Sam · from 9 recorded games this season"
      pageRight={<><BtnMore label="This season" onClick={() => t('Season selector opens.')}/><BtnPrimary label="Try it on Saturday" onClick={() => t('Opening Saturday\'s team sheet with this line-up.')}/></>}
      toast={toast}
      onNavTab={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Left: method cards + pitch */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* 4 method cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {methods.map((m, i) => (
              <button key={m.label} onClick={() => setActive(i)}
                style={{ background: '#fff', border: `1.5px solid ${i === active ? G : LN}`, borderRadius: 16, padding: '14px 16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: MUT, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>{m.stat}</div>
                <div style={{ fontSize: 12, color: MUT }}>{m.note}</div>
                <div style={{ fontSize: 12, color: G, marginTop: 6, lineHeight: 1.4 }}>{m.players}</div>
              </button>
            ))}
          </div>
          {/* Pitch diagram */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{methods[active].label} · 3-2-3</div>
              <div style={{ fontSize: 12, color: MUT }}>Played together in 6 of 9 games</div>
            </div>
            {/* Pitch */}
            <div style={{ position: 'relative', background: '#1f6b3a', borderRadius: 12, height: 240, overflow: 'hidden', marginBottom: 10 }}>
              {/* Pitch markings */}
              <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 1, background: 'rgba(255,255,255,0.3)' }}/>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)' }}/>
              <div style={{ position: 'absolute', top: '75%', left: '25%', right: '25%', height: '20%', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent' }}/>
              <div style={{ position: 'absolute', top: '5%', left: '25%', right: '25%', height: '20%', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent' }}/>
              {pitchPlayers.map(p => (
                <div key={p.ini} style={{ position: 'absolute', top: p.top, left: p.left, transform: 'translate(-50%,-50%)', width: 32, height: 32, borderRadius: '50%', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, border: '2px solid #fff' }}>{p.ini}</div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Noah and Mia in midfield together are the common thread in three of the four.</div>
          </div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Built from recorded games only. Never shown to players, parents or the team manager. Not available for MiniRoos or any team younger than U12.</div>
        </div>
        {/* Right: pairs aside */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>Pairs that work</span>
            </div>
            {pairs.map((p, i) => (
              <div key={p.ini} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingTop: i > 0 ? 12 : 0, borderTop: i > 0 ? `1px solid ${LN}` : 'none', paddingBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.names}</div>
                  <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4 }}>{p.note}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10 }}>From the same method cards above. Tap a card to see who's in each.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>How it works</div>
            {[
              { n: '1', t: 'From recorded games', n2: 'Each player who was on the pitch, and when' },
              { n: '2', t: 'Four ways to look', n2: 'Attack, defence, control, and pressure' },
              { n: '3', t: 'You make the call', n2: 'Availability, positions and fair minutes still come first' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.n2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CoachFrame>
  )
}

// SQ1e — Best lineups empty state
export function SquadLineupsEmpty({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <CoachFrame
      activeNav="squad" activeSub="Line-ups" subTabs={SQUAD_SUBS}
      pageTitle="Line-ups that worked"
      pageSub="U12 Sam · 1 game recorded so far"
      toast={toast}
      onNavTab={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 2 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>
              <Icon d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z" size={28} stroke={G}/>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Record 3 games to see this</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20, maxWidth: 400, margin: '0 auto 20px' }}>
              Clean Sheet needs to see who was on the pitch together, for long enough to mean something. You have 1 of 3.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <BtnPrimary label="Record Saturday's game" onClick={() => t('Opening the Record tab.')}/>
              <BtnMore label="Set Saturday's line-up" onClick={() => t('Opening the team sheet.')}/>
            </div>
          </div>
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>What it will show</div>
            {[
              { n: '1', t: 'Most goals scored', n2: 'Which nine, and for how long' },
              { n: '2', t: 'Fewest goals against', n2: 'And pairs that defend well' },
              { n: '3', t: 'Longest time winning', n2: 'Minutes ahead while together' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.n2}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10, lineHeight: 1.5 }}>
              Not shown for under 12s who play without scores. Never shown to players or parents.
            </div>
          </div>
        </div>
      </div>
    </CoachFrame>
  )
}

export default SquadLineups
