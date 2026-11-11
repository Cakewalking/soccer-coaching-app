import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

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
  chevright: 'M9 18l6-6-6-6',
  game:     'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  training2:'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4',
  test:     'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
  note:     'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z',
  photo:    'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z',
  injury:   'M22 12h-4l-3 9L9 3l-3 9H2',
  check:    'M5 12l5 5 9-10',
  move:     'M5 12h14M12 5l7 7-7 7',
}

const NAV6 = [
  { id: 'home',     label: 'Home',      icon: ICONS.home },
  { id: 'squad',    label: 'Squad',     icon: ICONS.squad },
  { id: 'training', label: 'Training',  icon: ICONS.training },
  { id: 'matchday', label: 'Match day', icon: ICONS.matchday },
  { id: 'clips',    label: 'Clips',     icon: ICONS.clips },
  { id: 'record',   label: 'Record',    icon: ICONS.record },
]

const REC_SUBS = ['Record', 'Recorded lately', 'Devices']

function CoachFrame({ activeNav, activeSub, subTabs, pageTitle, pageSub, pageRight, children, toast, onNavTab }: {
  activeNav: string; activeSub: string; subTabs: string[]; pageTitle: string; pageSub: string;
  pageRight?: React.ReactNode; children: React.ReactNode; toast: string | null; onNavTab: (t: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
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
          <Icon d={ICONS.matchday} size={13}/>Head coach
        </span>
      </div>
      <div style={{ padding: '20px 28px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{pageTitle}</h1>
          {pageSub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{pageSub}</div>}
        </div>
        {pageRight && <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>{pageRight}</div>}
      </div>
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

// REC1 — Record hub
export function RecordHub({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const options = [
    { icon: ICONS.game,     title: 'A game',            sub: 'Video, sensors, or both',       goes: 'Match review, Clips, each player\'s minutes and load',  onClick: () => t('Opening the game recording flow.') },
    { icon: ICONS.training2,title: 'Training',          sub: 'Tonight\'s session',             goes: 'Session notes, Clips, Growth and load',                  link: true },
    { icon: ICONS.test,     title: 'A test',            sub: 'Sprints, juggles, jumps, beep test', goes: 'Fitness tests, and each player\'s own trend',         onClick: () => t('Opening the test recording flow.') },
    { icon: ICONS.note,     title: 'A quick note',      sub: 'Say it or type it',              goes: 'The player or game you name. You check it first',        onClick: () => t('Opening the quick note flow.') },
    { icon: ICONS.photo,    title: 'Photos for families',sub: 'Checked against consent',       goes: 'The team chat, once you send',                           onClick: () => t('Opening the photos flow.') },
    { icon: ICONS.injury,   title: 'Head knock / injury',sub: 'Linked to the club welfare officer', goes: 'Head knock log, and welfare officer',               onClick: () => t('Opening the head knock log.') },
  ]

  return (
    <CoachFrame
      activeNav="record" activeSub="Record" subTabs={REC_SUBS}
      pageTitle="Record"
      pageSub="U12 Sam · camera kit 2 and 15 vests are ready"
      pageRight={<BtnMore label="Devices" onClick={() => t('Opening device settings.')}/>}
      toast={toast}
      onNavTab={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        {/* 6 record option cards */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>What are you recording?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {options.map(opt => (
              <button key={opt.title} onClick={opt.link ? () => t('Opening the training recording flow — Training saved screen is at REC2.') : opt.onClick}
                style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', gap: 6, boxSizing: 'border-box', minHeight: 120 }}>
                <span style={{ color: G }}>
                  <Icon d={opt.icon} size={22} stroke={G}/>
                </span>
                <strong style={{ fontSize: 15, fontWeight: 700, color: INK }}>{opt.title}</strong>
                <span style={{ fontSize: 13, color: MUT }}>{opt.sub}</span>
                <span style={{ fontSize: 12, color: MUT }}>
                  <strong style={{ fontWeight: 700 }}>Goes to:</strong> {opt.goes}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Right aside: devices */}
        <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Kit ready</div>
            {[
              { label: 'Camera kit 2',  note: 'Battery 84% · Connected',           ok: true },
              { label: '15 sensor vests', note: 'All charged',                      ok: true },
              { label: 'Spare camera',  note: 'On charge in the kit room',          ok: false, warn: false },
            ].map((k, i) => (
              <div key={k.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: k.ok ? G : LN, color: k.ok ? '#fff' : MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {k.ok ? '✓' : '·'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{k.label}</div>
                  <div style={{ fontSize: 12, color: k.warn ? ROSE : MUT }}>{k.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Consent to film</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: G, letterSpacing: '-0.03em' }}>17 of 18</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>parents said yes to filming</div>
            <div style={{ fontSize: 12, color: ROSE, lineHeight: 1.4 }}>1 · Ella is blurred in every clip</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.4 }}>Families set this in their app. Under 12: clips only, no scores or numbers.</div>
          </div>
        </div>
      </div>
    </CoachFrame>
  )
}

// REC2 — Record saved
export function RecordSaved({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const destinations = [
    { icon: ICONS.training2, title: 'The session',           note: 'Video and your notes, on Tuesday\'s plan' },
    { icon: ICONS.clips,     title: '6 clips',               note: 'Pressing on the whistle · tagged to 9 players' },
    { icon: ICONS.test,      title: 'Load for 15 players',   note: 'Noah and Zoe stayed under their sprint cap' },
    { icon: ICONS.squad,     title: 'Each player\'s profile',note: 'Their clips, minutes and load from tonight' },
    { icon: ICONS.note,      title: 'A note about Ella',     note: '"Joined in half, seemed brighter." Only you and Priya' },
  ]

  return (
    <CoachFrame
      activeNav="record" activeSub="Record" subTabs={REC_SUBS}
      pageTitle="Saved: Tuesday training"
      pageSub="2 June · 58 minutes · camera kit 2 and 15 vests"
      pageRight={<><BtnMore label="Record something else" onClick={() => t('Back to Record hub.')}/><BtnPrimary label="How did it go?" onClick={() => t('Opening the training review.')} /></>}
      toast={toast}
      onNavTab={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>Where it went</span>
            </div>
            {destinations.map((d, i) => (
              <div key={d.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < destinations.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon d={d.icon} size={18} stroke={G}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{d.note}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => t(`${d.title} opens.`)} style={{ height: 36, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Open</button>
                  <button onClick={() => t('Move destination opens.')} style={{ height: 36, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Move</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: MUT, lineHeight: 1.5 }}>
            Everything that was recorded is accounted for. Session notes are drafted from the footage — tap "How did it go?" to check them and add anything the camera didn't catch.
          </div>
        </div>
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>This recording</div>
            {[
              { label: 'Duration',      value: '58 minutes' },
              { label: 'Kit',           value: 'Camera + 15 vests' },
              { label: 'Clips tagged',  value: '6' },
              { label: 'Players filmed',value: '17 of 18' },
              { label: 'Upload',        value: 'Complete' },
            ].map((r, i) => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? `1px solid ${LN}` : 'none' }}>
                <span style={{ fontSize: 14, color: MUT }}>{r.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', marginTop: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>Load alert</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Noah and Zoe stayed under their sprint caps. Priya's limits are holding.</div>
          </div>
        </div>
      </div>
    </CoachFrame>
  )
}

// REC1e — Record hub empty state
export function RecordHubEmpty({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <CoachFrame
      activeNav="record" activeSub="Record" subTabs={REC_SUBS}
      pageTitle="Record"
      pageSub="U12 Sam · nothing recorded yet"
      toast={toast}
      onNavTab={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ color: G, marginBottom: 16 }}><Icon d={ICONS.record} size={40} stroke={G} sw={1.5}/></div>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Record your first session</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20, maxWidth: 400, margin: '0 auto 20px' }}>
              This tablet's camera is enough to start. A match camera and sensor vests can come later.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <BtnPrimary label="Record with this tablet" onClick={() => t('Opening the tablet camera recording flow.')}/>
              <BtnMore label="Pair a camera or vests" onClick={() => t('Opening device pairing.')}/>
            </div>
          </div>
        </div>
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>What you can record</div>
            {[
              { n: '1', t: 'Games and training', n2: 'Video, sensors, or both' },
              { n: '2', t: 'Tests',              n2: 'Each player against themselves' },
              { n: '3', t: 'Notes, photos, injuries', n2: 'Each goes to the right place' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.n2}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10, lineHeight: 1.5 }}>
              Families give consent before any child is filmed or measured.
            </div>
          </div>
        </div>
      </div>
    </CoachFrame>
  )
}

export default RecordHub
