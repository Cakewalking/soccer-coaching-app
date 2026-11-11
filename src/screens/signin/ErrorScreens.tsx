const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'

/* Shared coach top bar + tab chrome for tablet error screens */
function CoachChrome({ children, page = 'Home' }: { children: React.ReactNode; page?: string }) {
  const tabs = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)' }}>
      {/* Top nav */}
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginRight: 8 }}>Clean Sheet</span>
        {tabs.map(t => (
          <button key={t} style={{
            height: 36, padding: '0 14px', borderRadius: 8, border: 0,
            background: t === page ? 'rgba(255,255,255,0.15)' : 'none',
            color: t === page ? '#fff' : 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit', fontSize: 13, fontWeight: t === page ? 700 : 400, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ height: 34, padding: '0 14px', borderRadius: 8, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.8)', gap: 6 }}>
          U12 Sam · Wattle Creek
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8fa09b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 6 }}>SK</div>
      </div>
      {/* Sub-tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e9e7', display: 'flex', alignItems: 'center', padding: '0 24px', height: 44 }}>
        {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map((t, i) => (
          <button key={t} style={{
            height: 44, padding: '0 14px', border: 0, background: 'none',
            borderBottom: i === 0 ? `2px solid ${G}` : '2px solid transparent',
            color: i === 0 ? G : MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: i === 0 ? 700 : 400, cursor: 'pointer',
          }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT, fontWeight: 600 }}>Head coach</div>
      </div>
      {/* Page heading */}
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>{page}</span>
          <span style={{ fontSize: 13, color: MUT }}>U12 Sam · Thu 4 June</span>
        </div>
      </div>
      {children}
    </div>
  )
}

/* Two-column layout: main left + sidebar right */
function TwoCols({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, padding: '0 24px 40px', alignItems: 'start' }}>
      <div style={{ background: '#fff', border: '1px solid #e8e9e7', borderRadius: 16, minHeight: 580, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        {left}
      </div>
      <div style={{ background: '#fff', border: '1px solid #e8e9e7', borderRadius: 16, padding: '24px 24px 32px' }}>
        {right}
      </div>
    </div>
  )
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 68, height: 68, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      {children}
    </div>
  )
}

function NumberedList({ title, items }: { title: string; items: { label: string; sub: string }[] }) {
  return (
    <>
      <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 16 }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #eceeed' : 'none', alignItems: 'flex-start' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: MUT }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{item.sub}</div>
          </div>
        </div>
      ))}
    </>
  )
}

const BTN_GREEN: React.CSSProperties = {
  height: 44, padding: '0 20px', borderRadius: 10, border: 0,
  background: GD, color: '#fff', fontFamily: 'inherit',
  fontSize: 14, fontWeight: 700, cursor: 'pointer',
}
const BTN_OUTLINE: React.CSSProperties = {
  height: 44, padding: '0 20px', borderRadius: 10,
  border: '1.5px solid #d4d6d4', background: '#fff', color: INK,
  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
}

/* ER1 — Something went wrong (tablet, inside coach home) */
export function ER1SomethingWrong() {
  return (
    <CoachChrome>
      <TwoCols
        left={
          <>
            <IconCircle>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </IconCircle>
            <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: INK, textAlign: 'center' }}>That didn't work</h2>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: MUT, textAlign: 'center', maxWidth: 340, lineHeight: 1.5 }}>
              Something went wrong on our side. Nothing you've done was lost.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={BTN_GREEN}>Try again</button>
              <button style={BTN_OUTLINE}>Tell us what happened</button>
            </div>
          </>
        }
        right={
          <NumberedList
            title="If it keeps happening"
            items={[
              { label: 'Check your signal', sub: 'A weak signal at the ground is the usual cause' },
              { label: 'Carry on offline', sub: 'Line-ups, minutes and notes still save on this tablet' },
              { label: 'Tell us', sub: 'Quote ref 7K2-41 so we can find it fast' },
            ]}
          />
        }
      />
    </CoachChrome>
  )
}

/* ER2 — Upload failed (inside Clips screen chrome) */
export function ER2UploadFailed() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)' }}>
      {/* Top nav — Clips active */}
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginRight: 8 }}>Clean Sheet</span>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <button key={t} style={{
            height: 36, padding: '0 14px', borderRadius: 8, border: 0,
            background: t === 'Clips' ? 'rgba(255,255,255,0.15)' : 'none',
            color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit', fontSize: 13, fontWeight: t === 'Clips' ? 700 : 400, cursor: 'pointer',
          }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ height: 34, padding: '0 14px', borderRadius: 8, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.8)', gap: 6 }}>
          U12 Sam · Wattle Creek
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8fa09b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 6 }}>SK</div>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e9e7', display: 'flex', padding: '0 24px', height: 44 }}>
        {['Browse', 'Playlists', 'Shared with players', 'To check'].map((t, i) => (
          <button key={t} style={{ height: 44, padding: '0 14px', border: 0, background: 'none', borderBottom: i === 0 ? `2px solid ${G}` : '2px solid transparent', color: i === 0 ? G : MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: i === 0 ? 700 : 400, cursor: 'pointer' }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT, fontWeight: 600, display: 'flex', alignItems: 'center' }}>Head coach</div>
      </div>
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Add a game</span>
          <span style={{ fontSize: 13, color: MUT }}>Sat 30 May · away to Ironbark United</span>
        </div>
      </div>
      <TwoCols
        left={
          <>
            <IconCircle>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
              </svg>
            </IconCircle>
            <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: INK, textAlign: 'center' }}>The video stopped uploading</h2>
            <p style={{ margin: '0 0 20px', fontSize: 15, color: MUT, textAlign: 'center', maxWidth: 360, lineHeight: 1.5 }}>
              The signal dropped. We kept the part that made it, so it carries on from 62%.
            </p>
            {/* Progress bar */}
            <div style={{ width: '100%', maxWidth: 420, marginBottom: 8 }}>
              <div style={{ height: 8, background: '#e8e9e7', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', background: G, borderRadius: 4 }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 420, marginBottom: 24 }}>
              <span style={{ fontSize: 13, color: MUT }}>62% uploaded · 1.9 of 3.1 GB</span>
              <span style={{ fontSize: 13, color: MUT }}>Stopped at 11:42 am</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={BTN_GREEN}>Carry on</button>
              <button style={BTN_OUTLINE}>Wait for Wi-Fi</button>
            </div>
          </>
        }
        right={
          <NumberedList
            title="Good to know"
            items={[
              { label: 'The recording is safe', sub: 'It stays on the camera and this tablet until the upload is done' },
              { label: 'You can close this', sub: 'Uploading carries on in the background' },
              { label: 'Sensors synced', sub: '15 of 15 vests are in, so the review can start without the video' },
            ]}
          />
        }
      />
    </div>
  )
}

/* ER3 — Loading skeleton */
export function ER3Loading() {
  function Bone({ w, h = 16, r = 6 }: { w: number | string; h?: number; r?: number }) {
    return <div style={{ width: w, height: h, borderRadius: r, background: '#e8e9e7', flexShrink: 0 }} />
  }
  return (
    <CoachChrome>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, padding: '0 24px 40px', alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #e8e9e7', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tonight card skeleton */}
          <div style={{ border: '1px solid #e8e9e7', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Bone w={80} />
            <Bone w={260} h={22} r={8} />
            <Bone w={180} />
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <Bone w={120} h={40} r={10} />
              <Bone w={120} h={40} r={10} />
            </div>
          </div>
          {/* Needs you skeleton */}
          <Bone w={100} />
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 0', borderTop: '1px solid #f0f1f0', alignItems: 'center' }}>
              <Bone w={32} h={32} r={8} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Bone w="60%" />
                <Bone w="40%" />
              </div>
              <Bone w={20} h={20} r={4} />
            </div>
          ))}
          {/* Taking too long note */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0', marginTop: 8 }}>
            <button style={{ background: 'none', border: 'none', color: MUT, fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0 }}>
              Taking too long? Try again
            </button>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e8e9e7', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[80, 100, 60, 90, 70, 110, 55].map((w, i) => (
            <Bone key={i} w={w} />
          ))}
        </div>
      </div>
    </CoachChrome>
  )
}

/* ER4 — Not found (tablet) */
export function ER4NotFound() {
  return (
    <CoachChrome>
      <TwoCols
        left={
          <>
            <IconCircle>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </IconCircle>
            <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: INK, textAlign: 'center' }}>We can't find that page</h2>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: MUT, textAlign: 'center', maxWidth: 340, lineHeight: 1.5 }}>
              The link may be old, or the page has moved. Nothing is wrong with your team.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={BTN_GREEN}>Go to Home</button>
              <button style={BTN_OUTLINE}>Go back</button>
            </div>
          </>
        }
        right={
          <NumberedList
            title="Looking for something?"
            items={[
              { label: 'A player', sub: 'Squad › Players' },
              { label: 'A game or a clip', sub: 'Clips, or Home › Fixtures and results' },
              { label: 'A message', sub: 'Home › Inbox' },
            ]}
          />
        }
      />
    </CoachChrome>
  )
}

/* ER5 — No access (director trying to open welfare cases) */
export function ER5NoAccess() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)' }}>
      {/* Director top nav */}
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginRight: 8 }}>Clean Sheet</span>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <button key={t} style={{
            height: 36, padding: '0 14px', borderRadius: 8, border: 0,
            background: t === 'Safeguarding' ? 'rgba(255,255,255,0.15)' : 'none',
            color: t === 'Safeguarding' ? '#fff' : 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit', fontSize: 13, fontWeight: t === 'Safeguarding' ? 700 : 400, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ height: 34, padding: '0 14px', borderRadius: 8, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.8)', gap: 6 }}>
          Wattle Creek FC
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 6 }}>RM</div>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e9e7', display: 'flex', padding: '0 24px', height: 44 }}>
        {['Overview', 'Concerns'].map((t, i) => (
          <button key={t} style={{ height: 44, padding: '0 14px', border: 0, background: 'none', borderBottom: i === 1 ? `2px solid ${G}` : '2px solid transparent', color: i === 1 ? G : MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: i === 1 ? 700 : 400, cursor: 'pointer' }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT, fontWeight: 600, display: 'flex', alignItems: 'center' }}>Director of football</div>
      </div>
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Safeguarding</span>
          <span style={{ fontSize: 13, color: MUT }}>Wattle Creek FC</span>
        </div>
      </div>
      <TwoCols
        left={
          <>
            <IconCircle>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </IconCircle>
            <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: INK, textAlign: 'center' }}>This one is only for the welfare officer</h2>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: MUT, textAlign: 'center', maxWidth: 400, lineHeight: 1.6 }}>
              Concerns are read by Helen Park and nobody else, so families and children can speak freely. As director you see how many are open and how long they take.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={BTN_GREEN}>See the counts</button>
              <button style={BTN_OUTLINE}>Message Helen</button>
            </div>
          </>
        }
        right={
          <>
            <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 16 }}>Who sees what</div>
            {[
              { initials: 'HP', label: 'Welfare officer', sub: 'Every concern, in full', bg: '#8fa09b' },
              { initials: 'RM', label: 'Director and chair', sub: 'Counts and time to close', bg: '#c0a070' },
              { initials: 'SK', label: 'Coaches', sub: 'Only what Helen shares with them', bg: '#8fa09b' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #eceeed' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flex: 'none' }}>{item.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
                </div>
              </div>
            ))}
            <p style={{ margin: '20px 0 0', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
              The same screen shows for any link you're not allowed to open, with the reason in plain words.
            </p>
          </>
        }
      />
    </div>
  )
}

/* ERp1 — Something went wrong (phone) */
export function ERp1SomethingWrong() {
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f5f6f4', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#f5f6f4', height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
        <span style={{ color: G, fontWeight: 800, fontSize: 15 }}>Clean Sheet</span>
        <button style={{ background: 'none', border: 'none', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Help</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: 68, height: 68, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: INK, textAlign: 'center' }}>That didn't work</h2>
        <p style={{ margin: '0 0 32px', fontSize: 15, color: MUT, textAlign: 'center', lineHeight: 1.5 }}>
          Something went wrong on our side. Your answer wasn't sent, so please try again.
        </p>
      </div>
      <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ width: '100%', height: 52, borderRadius: 14, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Try again</button>
        <button style={{ width: '100%', height: 52, borderRadius: 14, border: '1.5px solid #d4d6d4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Tell us what happened</button>
      </div>
    </div>
  )
}

/* ERp2 — Not found / not yours (phone) */
export function ERp2NotFound() {
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f5f6f4', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#f5f6f4', height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
        <span style={{ color: G, fontWeight: 800, fontSize: 15 }}>Clean Sheet</span>
        <button style={{ background: 'none', border: 'none', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Help</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: 68, height: 68, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: INK, textAlign: 'center' }}>We can't open that</h2>
        <p style={{ margin: '0 0 32px', fontSize: 15, color: MUT, textAlign: 'center', lineHeight: 1.5 }}>
          The link may be old, or it's for someone else. You can only see your own children and their teams.
        </p>
      </div>
      <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ width: '100%', height: 52, borderRadius: 14, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Go to Home</button>
        <button style={{ width: '100%', height: 52, borderRadius: 14, border: '1.5px solid #d4d6d4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Sign in as someone else</button>
      </div>
    </div>
  )
}
