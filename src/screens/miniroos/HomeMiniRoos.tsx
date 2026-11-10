const NEEDS_YOU = [
  { ini: 'AV', iconBg: '#40826d', iconColor: '#fff', category: 'Availability', time: 'Saturday', badge: 'Today', title: "2 families haven't said if they're coming", unread: true },
  { ini: 'RF', iconBg: '#cbbeb5', iconColor: '#10211f', category: 'Referees', time: 'Yesterday', badge: '', title: 'Saturday still needs a game leader', unread: true },
]

const TURN_ITEMS = [
  { label: 'Had a go in goal', num: 7, of: 10 },
  { label: 'Been captain',     num: 6, of: 10 },
  { label: 'Started a game',  num: 10, of: 10 },
]

const LAST_SAT_FINDINGS = [
  { text: 'Brave dribbling. Lots of kids took a player on', label: 'Keep',    keep: true  },
  { text: 'Six different kids had a shot',                  label: 'Keep',    keep: true  },
  { text: 'Bunching round the ball. Next: find a friend in space', label: 'Tonight', keep: false },
]

const MINI_WEEK = [
  { day: 'Mon', date: 1, type: 'rest',  label: 'Rest' },
  { day: 'Tue', date: 2, type: 'today', label: 'Training 5:00 pm' },
  { day: 'Thu', date: 4, type: 'rest',  label: 'Rest' },
  { day: 'Sat', date: 6, type: 'game',  label: 'Northgate City · 8:30' },
  { day: 'Sun', date: 7, type: 'rest',  label: 'Rest' },
]

function miniWeekStyle(type: string) {
  const base = { display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 8, minHeight: 32 } as const
  if (type === 'today') return { ...base, background: '#2f6252', color: '#ffffff' }
  if (type === 'game')  return { ...base, background: '#cbbeb5', color: '#10211f' }
  return { ...base, color: '#10211f' }
}

function HomeMiniRoosEmpty() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 16, padding: '16px 20px 20px', boxSizing: 'border-box', alignContent: 'start', flexGrow: 1 }}>
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, display: 'flex', flexDirection: 'column', padding: '32px 40px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9H4z"/></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Welcome, Tom</div>
        </div>
        {[
          { step: 1, label: 'Share the team link', cta: 'Copy link' },
          { step: 2, label: 'Add your training night', cta: 'Add' },
          { step: 3, label: 'Invite a team manager', cta: 'Invite' },
        ].map(({ step, label, cta }) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 12, background: '#f7f9f7', border: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#2f6252' }}>{step}</span>
            <span style={{ flexGrow: 1, fontSize: 16, fontWeight: 600, color: '#10211f' }}>{label}</span>
            <button style={{ height: 36, padding: '0 16px', borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>{cta}</button>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>What you'll see each week</div>
        {[
          { title: "Who's coming", desc: 'Parents answer in the app' },
          { title: 'Four games for training', desc: 'A new skill each fortnight' },
          { title: 'Turns on game day', desc: 'Minutes, goal and captain' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#2f6252' }}>{i + 1}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.desc}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 13, color: '#4a5a57', lineHeight: '18px', borderTop: '1px solid #e9eae8' }}>No camera, sensors or scores at this age. You don't need any kit.</div>
      </div>
    </div>
  )
}

interface Props {
  empty?: boolean
  onTraining?: () => void
  onSeasonNotes?: () => void
  onFootballYear?: () => void
  onAllMessages?: () => void
  onCalendar?: () => void
  onSwapGame?: () => void
  onWhatWeSaw?: () => void
  onThankParents?: () => void
  onInboxItem?: () => void
}

export default function HomeMiniRoos({ empty, onTraining, onSeasonNotes, onFootballYear, onAllMessages, onCalendar, onSwapGame, onWhatWeSaw, onThankParents, onInboxItem }: Props) {
  if (empty) return <HomeMiniRoosEmpty />
  return (
    <main style={{
      flexGrow: 1, minHeight: 0, padding: '18px 28px 22px',
      boxSizing: 'border-box', display: 'grid',
      gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gap: 18,
    }}>

      {/* ── Left column (span 4): Needs you + Everyone gets a turn ── */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

        <section className="tile" style={{ flex: 'none', padding: '0', overflow: 'hidden', gap: 0 }} aria-label="Needs you">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#1f4a3e', color: '#ffffff' }}>
            <h2 className="h2">Needs you</h2>
            <span style={{ background: '#ffffff', color: '#006666', borderRadius: '999px', padding: '2px 10px', fontSize: 13, lineHeight: '18px', fontWeight: 700 }}>2 new</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {NEEDS_YOU.map((item, i) => (
              <button key={i} onClick={onInboxItem} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', minHeight: 68, padding: '10px 18px', boxSizing: 'border-box', border: 0, borderTop: '1px solid #e9eae8', background: '#ffffff', color: '#10211f', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', marginTop: 2, background: item.iconBg, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                  {item.ini}
                </span>
                <span style={{ flexGrow: 1, minWidth: 0 }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{item.category} · {item.time}</span>
                    {item.badge && <span style={{ flex: 'none', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252' }}>{item.badge}</span>}
                  </span>
                  <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 600 }}>{item.title}</span>
                </span>
                <span style={{ flex: 'none', width: 10, height: 10, borderRadius: '999px', background: '#40826d', marginTop: 6 }} />
              </button>
            ))}
          </div>
          <button onClick={onAllMessages} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%', height: 40, border: 0, borderTop: '1px solid #e9eae8', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: '#2f6252', fontWeight: 600 }}>
            All messages · 2 more
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </section>

        <section className="tile" style={{ flexGrow: 1, gap: 0, overflow: 'hidden' }} aria-label="Everyone gets a turn">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 18px 10px' }}>
            <h2 className="h2">Everyone gets a turn</h2>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252' }}>Term 2</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #e9eae8' }}>
            {TURN_ITEMS.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <span style={{ flexGrow: 1, fontSize: 14, color: '#10211f' }}>{t.label}</span>
                <span style={{ flex: 'none', fontSize: 15, fontWeight: 700, color: t.num === t.of ? '#2f6252' : '#10211f' }}>{t.num} of {t.of}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid #e9eae8', marginTop: 'auto' }}>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>Next in goal: Ivy, Max and Arlo. Clean Sheet lines up Saturday's turns for you.</div>
          </div>
        </section>
      </div>

      {/* ── Center column (span 5): TODAY + Last Saturday ── */}
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

        {/* TODAY card */}
        <section style={{ flex: 'none', position: 'relative', overflow: 'hidden', background: '#40826d', color: '#ffffff', borderRadius: 18, padding: '20px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }} aria-label="Today">
          <svg width="60" height="80" viewBox="0 0 60 80" style={{ position: 'absolute', right: 16, top: 14 }} aria-hidden="true">
            <g fill="#2f6252">
              <circle cx="8" cy="8" r="6"/><circle cx="30" cy="8" r="6"/><circle cx="52" cy="8" r="6"/>
              <circle cx="8" cy="28" r="6"/><circle cx="30" cy="28" r="6"/><circle cx="52" cy="28" r="6"/>
              <circle cx="30" cy="48" r="6"/><circle cx="52" cy="48" r="6"/>
              <circle cx="52" cy="68" r="6"/>
            </g>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: '#ffffff', color: '#2f6252', borderRadius: '999px', padding: '2px 10px', fontSize: 13, lineHeight: '18px', fontWeight: 700, letterSpacing: '0.04em' }}>TODAY</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>5:00 pm · Wattle Creek Reserve</span>
          </div>
          <div>
            <div style={{ fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Training tonight</div>
            <div style={{ fontSize: 14, lineHeight: '20px', marginTop: 2 }}>45 minutes · 4 games · a ball each, no laps, no lines</div>
          </div>
          <div>
            <span style={{ background: 'rgba(255,255,255,0.18)', borderRadius: '999px', padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>This fortnight: running with the ball</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onTraining} style={{ flex: 1, height: 44, borderRadius: 12, border: '2px solid #ffffff', background: '#ffffff', color: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Open tonight's games
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <button onClick={onSwapGame} style={{ height: 44, padding: '0 16px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Swap a game</button>
          </div>
        </section>

        {/* Last Saturday */}
        <section className="tile" style={{ flexGrow: 1, gap: 10 }} aria-label="Last Saturday">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="h2">Last Saturday</h2>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>Sat 30 May · home</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>Glenview Park</div>
              <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 2 }}>All 10 played · 22 to 26 minutes each</div>
            </div>
            <span style={{ padding: '4px 12px', borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 13, fontWeight: 700 }}>No score kept</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {LAST_SAT_FINDINGS.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={f.keep ? '#40826d' : '#6f7f7b'} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flex: 'none', marginTop: 2 }}><path d="M5 12l5 5 9-10"/></svg>
                <span style={{ flexGrow: 1, fontSize: 14, color: '#10211f', lineHeight: '19px' }}>{f.text}</span>
                <span style={{ flex: 'none', padding: '2px 10px', borderRadius: '999px', fontSize: 13, fontWeight: 700, background: f.keep ? '#40826d' : '#cbbeb5', color: f.keep ? '#ffffff' : '#10211f' }}>{f.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
            <button onClick={onWhatWeSaw} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>What we saw</button>
            <button onClick={onThankParents} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Thank the parents</button>
          </div>
          {onSeasonNotes && (
            <button onClick={onSeasonNotes} style={{ width: '100%', height: 40, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#2f6252', marginTop: 2 }}>Season notes →</button>
          )}
        </section>
      </div>

      {/* ── Right column (span 3): This week + Saturday + Why no scores ── */}
      <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

        <section className="tile" style={{ flex: 'none', gap: 4 }} aria-label="This week">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <h2 className="h2">This week</h2>
            <button onClick={onCalendar} style={{ border: 0, background: 'transparent', color: 'var(--green-deep)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Calendar</button>
          </div>
          {MINI_WEEK.map(d => (
            <div key={d.day} style={miniWeekStyle(d.type)}>
              <span style={{ flex: 'none', width: 48, fontSize: 13, fontWeight: 700 }}>{d.day} {d.date}</span>
              <span style={{ flexGrow: 1, fontSize: 13, lineHeight: '17px' }}>{d.label}</span>
            </div>
          ))}
        </section>

        <section className="tile" style={{ flex: 'none', gap: 8 }} aria-label="Saturday">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="h2">Saturday</h2>
            <span className="cap">7 a side</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>8:30 vs Northgate City</div>
          <div style={{ background: '#cbbeb5', color: '#10211f', borderRadius: 10, padding: '6px 10px', fontSize: 14, lineHeight: '20px' }}>
            Away, Redgum Reserve · 7 coming, 1 away, 2 to answer
          </div>
        </section>

        <section className="tile" style={{ flexGrow: 1, gap: 8 }} aria-label="Why no scores here">
          <h2 className="h2">Why no scores here</h2>
          <p style={{ margin: 0, fontSize: 13, color: '#4a5a57', lineHeight: '19px' }}>
            Under 12s play MiniRoos. Football Victoria keeps no results or ladders, so Clean Sheet doesn't either. No filming, sensors or style numbers until U12.
          </p>
          {onFootballYear && (
            <button onClick={onFootballYear} style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 600, color: '#40826d', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginTop: 4 }}>The football year →</button>
          )}
        </section>
      </div>

    </main>
  )
}
