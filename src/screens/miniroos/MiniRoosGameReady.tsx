import { useState } from 'react'

// Game-day "Get ready" for MiniRoos: sync the camera + vests, then the pre-match
// team talk. Same shape as the junior match-day experience, tuned for U9.

const PLAYERS = ['Ivy Chen', 'Max Bailey', 'Arlo Kaur', 'Zara Moore', 'Leo Wright', 'Evie Nolan', 'Theo Santos', 'Poppy Dunn', 'Omar Haddad']

const GREEN = '#2f6252'
const LEAF = '#40826d'
const MUT = '#4a5a57'
const HAIR = '#e9eae8'
const LINE = '#c5c8c4'

type SyncState = 'idle' | 'syncing' | 'done'

const TALK_SLIDES = [
  { label: 'START', title: 'Have fun today', color: '#2f6252' },
  { label: 'WE LOVED', title: 'Passed to a friend 14 times', color: '#40826d' },
  { label: 'WE LOVED', title: 'Everyone had a shot', color: '#40826d' },
  { label: 'TRY TODAY', title: 'Look up before you kick', color: '#6b4a4e' },
  { label: 'EVERYONE', title: 'Everyone gets a go', color: '#2f6252' },
  { label: 'GO', title: 'vs Northgate City', color: '#2f6252' },
]

export default function MiniRoosGameReady({ onPlayTeamTalk }: { onPlayTeamTalk: () => void }) {
  const [camera, setCamera] = useState<SyncState>('idle')
  const [vests, setVests] = useState(0)            // 0..9 named
  const [checkIn, setCheckIn] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [slide, setSlide] = useState(0)
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2600) }

  function connectCamera() {
    if (camera !== 'idle') return
    setCamera('syncing')
    setTimeout(() => { setCamera('done'); say('Camera connected. It will film the whole game.') }, 1100)
  }

  const vestsDone = vests >= PLAYERS.length
  const readyCount = (camera === 'done' ? 1 : 0) + (vestsDone ? 1 : 0) + (checkIn ? 1 : 0)

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Match info row */}
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${HAIR}`, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: MUT, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Sun 7 Jun · 9:30 am · home · 9 playing</div>
          <h1 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>vs Northgate City</h1>
        </div>
        <div style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${LEAF}`, background: '#edf8f2', display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: GREEN }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: LEAF }} />Kick-off in 2 h 15 min
        </div>
        <div style={{ height: 36, padding: '0 14px', borderRadius: 999, background: readyCount === 3 ? '#edf8f2' : '#fdf8e8', border: `1px solid ${readyCount === 3 ? LEAF : '#e9d88a'}`, display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: readyCount === 3 ? GREEN : '#7a5a00' }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: readyCount === 3 ? LEAF : '#d4a844' }} />{readyCount} of 3 set up
        </div>
      </div>

      {/* Body: team talk (left) + set-up (right) */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 16, padding: '18px 28px', overflow: 'hidden' }}>
        {/* Left — team talk */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#10211f' }}>Team talk</span>
            <span style={{ fontSize: 14, color: MUT }}>6 slides · 2 min · built from last Sunday</span>
          </div>

          {/* Filmstrip */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {TALK_SLIDES.map((sl, i) => (
              <button key={i} onClick={() => setSlide(i)} style={{ flex: 'none', width: 108, height: 66, borderRadius: 10, background: sl.color, border: `2px solid ${slide === i ? '#fff' : 'transparent'}`, outline: slide === i ? `2px solid ${LEAF}` : 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '7px 8px', boxSizing: 'border-box', fontFamily: 'inherit' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'left' }}>{sl.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', lineHeight: '14px', textAlign: 'left' }}>{sl.title.length > 24 ? sl.title.slice(0, 24) + '…' : sl.title}</span>
              </button>
            ))}
          </div>

          {/* Large slide preview */}
          <div style={{ borderRadius: 16, background: TALK_SLIDES[slide].color, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 28, minHeight: 190 }}>
            <div style={{ flexGrow: 1, minWidth: 0, color: '#fff' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 10 }}>{TALK_SLIDES[slide].label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '32px' }}>{TALK_SLIDES[slide].title}</div>
            </div>
            <button onClick={onPlayTeamTalk} aria-label="Play the team talk" style={{ flex: 'none', width: 72, height: 72, borderRadius: 999, border: '3px solid rgba(255,255,255,0.75)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>
            </button>
          </div>

          {/* Slide dots + play full */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, flexGrow: 1 }}>
              {TALK_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === slide ? 20 : 8, height: 8, borderRadius: 4, background: i === slide ? LEAF : '#d0d4d2', border: 0, cursor: 'pointer', padding: 0 }} />
              ))}
            </div>
            <button onClick={onPlayTeamTalk} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: GREEN, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>Play the team talk
            </button>
          </div>

          <div style={{ background: '#eef5f2', border: '1px solid #c5d9d0', borderRadius: 14, padding: '14px 16px', fontSize: 13, color: MUT, lineHeight: '19px' }}>
            Two things we loved, one thing to try, and a reminder that everyone gets a go. Nothing about scores — tap “Show the team” in the talk to play it on the big screen for the children.
          </div>
        </div>

        {/* Right — set up the game */}
        <aside style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Set up the game</div>
            <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Sync the camera and vests so Clean Sheet can film and measure. A quick checklist each game day.</div>
          </div>

          {/* Camera */}
          <SyncRow
            icon="M23 7l-7 5 7 5V7zM1 5h15v14H1z"
            title="Match camera"
            sub={camera === 'done' ? 'Connected · battery 92% · angle good' : 'Charge it and set it on the halfway line, raised.'}
            state={camera}
            actionIdle="Connect"
            onAction={connectCamera}
          />

          {/* Vests */}
          <div style={{ padding: '10px 0', borderTop: `1px solid ${HAIR}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <IconBadge done={vestsDone} path="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 4a3 3 0 006 0" />
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>GPS vests</div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: '16px' }}>{vestsDone ? `All ${PLAYERS.length} named to a child` : 'One per child. Name each vest so the numbers find the right child.'}</div>
              </div>
              <button onClick={() => setAssignOpen(o => !o)} style={{ flex: 'none', height: 36, padding: '0 12px', borderRadius: 8, border: vestsDone ? 0 : `1px solid ${LINE}`, background: vestsDone ? '#edf8f2' : '#fff', color: vestsDone ? GREEN : GREEN, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{vestsDone ? '✓ Named' : assignOpen ? 'Close' : 'Assign'}</button>
            </div>
            {/* Progress */}
            <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: HAIR, overflow: 'hidden' }}>
              <div style={{ height: 6, borderRadius: 3, background: LEAF, width: `${(vests / PLAYERS.length) * 100}%`, transition: 'width 160ms' }} />
            </div>
            <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>{vests} of {PLAYERS.length} vests named</div>
            {assignOpen && !vestsDone && (
              <div style={{ marginTop: 10, border: `1px solid ${HAIR}`, borderRadius: 10, overflow: 'hidden' }}>
                {PLAYERS.map((p, i) => (
                  <button key={p} onClick={() => setVests(v => Math.max(v, i + 1))} disabled={i < vests} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderTop: i ? `1px solid ${HAIR}` : 'none', background: i < vests ? '#f4faf7' : '#fff', border: 'none', cursor: i < vests ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                    <span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, border: `1.5px solid ${i < vests ? LEAF : LINE}`, background: i < vests ? LEAF : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i < vests && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
                    </span>
                    <span style={{ fontSize: 13, color: '#10211f', flexGrow: 1 }}>Vest {i + 1} → {p}</span>
                    {i >= vests && <span style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>Tap to name</span>}
                  </button>
                ))}
                <button onClick={() => { setVests(PLAYERS.length); say('All 9 vests named. The numbers will match each child.') }} style={{ width: '100%', padding: '10px 12px', borderTop: `1px solid ${HAIR}`, background: '#eef5f2', border: 'none', color: GREEN, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Name the rest automatically</button>
              </div>
            )}
          </div>

          {/* Check-in */}
          <div style={{ padding: '10px 0', borderTop: `1px solid ${HAIR}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <IconBadge done={checkIn} path="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Parent check-in</div>
              <div style={{ fontSize: 12, color: MUT, lineHeight: '16px' }}>{checkIn ? 'On · families get a reminder at 8:30 am' : 'A friendly reminder to families on game morning.'}</div>
            </div>
            <button onClick={() => { setCheckIn(v => !v); say(checkIn ? 'Check-in reminders off.' : 'Check-in reminders on for 8:30 am.') }} style={{ flex: 'none', height: 36, padding: '0 12px', borderRadius: 8, border: checkIn ? 0 : `1px solid ${LINE}`, background: checkIn ? '#edf8f2' : '#fff', color: GREEN, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{checkIn ? '✓ On' : 'Turn on'}</button>
          </div>

          <button onClick={() => say('Playing the 90-second setup guide.')} style={{ marginTop: 'auto', height: 44, borderRadius: 10, border: `1px solid ${GREEN}`, background: '#fff', color: GREEN, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>Watch the 90-second setup guide
          </button>
        </aside>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

function IconBadge({ done, path }: { done: boolean; path: string }) {
  return (
    <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 8, background: done ? '#edf8f2' : '#f3f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={done ? '#2f6252' : '#6f7f7b'} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
    </span>
  )
}

function SyncRow({ icon, title, sub, state, actionIdle, onAction }: { icon: string; title: string; sub: string; state: SyncState; actionIdle: string; onAction: () => void }) {
  const done = state === 'done'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <IconBadge done={done} path={icon} />
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>{sub}</div>
      </div>
      <button onClick={onAction} disabled={state !== 'idle'} style={{ flex: 'none', height: 44, padding: '0 12px', borderRadius: 8, border: done ? 0 : '1px solid #c5c8c4', background: done ? '#edf8f2' : '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: state === 'idle' ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 6 }}>
        {state === 'syncing' && <span style={{ width: 11, height: 11, borderRadius: 999, border: '2px solid #cdd8d3', borderTopColor: '#2f6252', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />}
        {done ? '✓ Ready' : state === 'syncing' ? 'Connecting…' : actionIdle}
      </button>
    </div>
  )
}
