import { useState } from 'react'
import { useSandbox } from './sandbox/SandboxContext'
import { addFixture } from './sandbox/sandboxStore'

function Illus() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
      {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => (
        <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />
      ))}
    </div>
  )
}

function Skel({ rows = 7 }: { rows?: number }) {
  const ws = [55, 45, 65, 40, 55, 50, 48]
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 8 }}>Fills in like this</div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} style={{ height: 44, border: '1px dashed #c5c8c4', borderRadius: 10, marginBottom: 6, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
          <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${ws[i % ws.length]}%` }} />
          <div style={{ marginLeft: 'auto', width: 48, height: 10, borderRadius: 5, background: '#e9eae8', flex: 'none' }} />
        </div>
      ))}
    </div>
  )
}

function FixturesSandboxView() {
  const { store, update } = useSandbox()
  const [showForm, setShowForm] = useState(false)
  const [opponent, setOpponent] = useState('')
  const [date, setDate] = useState('')
  const [home, setHome] = useState(true)
  const fixtures = store.fixtures
  const teamId = store.teams[0]?.id ?? 'sandbox-team'

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!opponent.trim() || !date) return
    update(addFixture(store, { teamId, opponent: opponent.trim(), date, home }))
    setOpponent('')
    setDate('')
    setShowForm(false)
  }

  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Fixtures and results</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>{fixtures.length > 0 ? `${fixtures.length} game${fixtures.length !== 1 ? 's' : ''}` : 'No fixtures yet'}</span>
          <div style={{ flexGrow: 1 }} />
          <button onClick={() => setShowForm(true)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            {fixtures.length > 0 ? 'Add another' : 'Add a fixture'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' as const }}>
            <div style={{ flex: '2 1 180px' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4a5a57', marginBottom: 4 }}>Opponent</label>
              <input value={opponent} onChange={e => setOpponent(e.target.value)} placeholder="e.g. Banksia Park SC" autoFocus style={{ width: '100%', height: 44, padding: '0 12px', border: '1px solid #c5c8c4', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none', color: '#10211f' }} />
            </div>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4a5a57', marginBottom: 4 }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', height: 44, padding: '0 12px', border: '1px solid #c5c8c4', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none', color: '#10211f', background: '#fff' }} />
            </div>
            <div style={{ flex: '1 1 100px' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4a5a57', marginBottom: 4 }}>Venue</label>
              <select value={home ? 'home' : 'away'} onChange={e => setHome(e.target.value === 'home')} style={{ width: '100%', height: 44, padding: '0 12px', border: '1px solid #c5c8c4', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none', color: '#10211f', background: '#fff' }}>
                <option value="home">Home</option>
                <option value="away">Away</option>
              </select>
            </div>
            <button type="submit" style={{ height: 44, padding: '0 18px', borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', flex: 'none' }}>Add</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', flex: 'none' }}>Cancel</button>
          </form>
        )}

        {fixtures.length > 0 ? (
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
            {fixtures.map((f, i) => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#2f6252', flex: 'none' }}>
                  {f.home ? 'H' : 'A'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>vs {f.opponent}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57' }}>{f.date} · {f.home ? 'Home' : 'Away'}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
            <Illus />
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Add your season</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Import the fixture list from your league, or add games one by one. Training is planned around your game days.</div>
              <button onClick={() => setShowForm(true)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add a fixture</button>
            </div>
          </div>
        )}
      </div>
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>What you'll see</div>
        {[
          { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zM9 5a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 00-2-2h-2a2 2 0 00-2 2v2z', title: 'Results and the ladder', body: 'From U12, when the league keeps one' },
          { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', title: 'Meet times to parents', body: 'Your team manager sends changes' },
          { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', title: 'A review for each game', body: 'When the camera records it' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
            </div>
          </div>
        ))}
      </aside>
    </main>
  )
}

function FixturesEmpty() {
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Fixtures and results</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>No fixtures yet</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
          <Illus />
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Add your season</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Import the fixture list from your league, or add games one by one. Training is planned around your game days.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4-4 4M12 4v12"/></svg>
                Import from the league
              </button>
              <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add a fixture</button>
            </div>
          </div>
        </div>
        <Skel rows={7} />
      </div>
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>What you'll see</div>
        {[
          { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zM9 5a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 00-2-2h-2a2 2 0 00-2 2v2z', title: 'Results and the ladder', body: 'From U12, when the league keeps one' },
          { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', title: 'Meet times to parents', body: 'Your team manager sends changes' },
          { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', title: 'A review for each game', body: 'When the camera records it' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Mini Roos under 12 don't keep a ladder. Results are still saved for your own review.</div>
      </aside>
    </main>
  )
}

const RESULTS = [
  { date: 'Sat 30 May', opp: 'Ironbark United', ha: 'A', score: '3–1', result: 'W' },
  { date: 'Sat 23 May', opp: 'Saltmarsh',       ha: 'A', score: '1–2', result: 'L' },
  { date: 'Sat 16 May', opp: 'Northgate',        ha: 'H', score: '1–1', result: 'D' },
  { date: 'Sat 9 May',  opp: 'Tealside Town',     ha: 'A', score: '2–0', result: 'W' },
  { date: 'Sat 2 May',  opp: 'Kestrel Park',     ha: 'H', score: '3–1', result: 'W' },
  { date: 'Sat 25 Apr', opp: 'Lyndhurst SC',     ha: 'H', score: '2–1', result: 'W' },
  { date: 'Sat 18 Apr', opp: 'Riverside',        ha: 'A', score: '0–2', result: 'L' },
  { date: 'Sat 11 Apr', opp: 'Banksia FC',       ha: 'H', score: '4–2', result: 'W' },
]

const COMING_UP = [
  { date: 'SAT\n6',  venue: 'vs Harbour Rovers',  sub: '9:30 · meet 8:40 · white kit', note: 'Rob booked camera' },
  { date: 'SAT\n13', venue: 'at Kestrel Park',     sub: '9:00 · their ground',           note: '' },
  { date: 'SAT\n20', venue: 'at Banksia FC',        sub: '9:00',                           note: '' },
  { date: 'SAT\n27', venue: 'vs Riverside',         sub: '9:30',                           note: '' },
]

const LADDER = [
  { pos: 1, name: 'Saltmarsh',       played: 8, pts: 20 },
  { pos: 2, name: 'Riverside',       played: 8, pts: 19 },
  { pos: 3, name: 'Wattle Creek',    played: 8, pts: 16, us: true },
  { pos: 4, name: 'Kestrel Park',    played: 8, pts: 14 },
  { pos: 5, name: 'Tealside Town',   played: 8, pts: 12 },
  { pos: 6, name: 'Harbour Rovers',  played: 8, pts: 11 },
]

function resultDot(r: string) {
  if (r === 'W') return { bg: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { bg: '#c39797', color: '#10211f' }
  return { bg: '#cbbeb5', color: '#10211f' }
}

export default function FixturesScreen({ empty }: { empty?: boolean }) {
  const { active: inSandbox } = useSandbox()
  if (inSandbox) return <FixturesSandboxView />
  const [synced, setSynced] = useState(false)
  if (empty) return <FixturesEmpty />
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>

      {/* Left: results table */}
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Fixtures and results</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U12 Sam · 3rd of 10 · 16 points from 8 games · 2 × 30 minutes, 9 a side</span>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => setSynced(true)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${synced ? '#2f6252' : '#c5c8c4'}`, background: synced ? '#e4f2eb' : '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: synced ? '#2f6252' : '#10211f' }}>{synced ? 'Synced to calendar' : 'Sync to my calendar'}</button>
          <button style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>+ Add a fixture</button>
        </div>

        <div style={{ flex: '0 1 auto', minHeight: 0, overflow: 'auto', background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) 36px minmax(0,80px) 48px', gap: 12, alignItems: 'center', height: 44, borderBottom: '1px solid #e9eae8', position: 'sticky', top: 0, background: '#ffffff', zIndex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Date</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Opponent</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', textAlign: 'center' }}>H/A</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Score</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', textAlign: 'center' }}>Result</span>
          </div>
          {RESULTS.map((r, i) => {
            const c = resultDot(r.result)
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) 36px minmax(0,80px) 48px', gap: 12, alignItems: 'center', minHeight: 48, borderTop: '1px solid #f0f1ef', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: '#4a5a57' }}>{r.date}</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{r.opp}</span>
                <span style={{ fontSize: 13, color: '#6f7f7b', textAlign: 'center' }}>{r.ha}</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{r.score}</span>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ width: 32, height: 32, borderRadius: '999px', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{r.result}</span>
                </span>
              </div>
            )
          })}
          <div style={{ padding: '12px 0', fontSize: 12, color: '#4a5a57', borderTop: '1px solid #e9eae8' }}>5 wins, 1 draw, 2 losses · 16 goals for, 10 against · every game recorded</div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>

        {/* Coming up */}
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Coming up</span>
          {COMING_UP.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef', alignItems: 'flex-start' }}>
              <div style={{ flex: 'none', width: 44, height: 44, borderRadius: 10, background: '#eef5f2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {f.date.split('\n').map((l, li) => (
                  <span key={li} style={{ fontSize: li === 0 ? 10 : 18, fontWeight: li === 0 ? 700 : 800, letterSpacing: li === 0 ? '0.06em' : '-0.01em', color: '#2f6252', lineHeight: li === 0 ? '13px' : '21px' }}>{l}</span>
                ))}
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: '20px' }}>{f.venue}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{f.sub}</div>
                {f.note && <div style={{ fontSize: 12, color: '#40826d', fontWeight: 600, marginTop: 2 }}>{f.note}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Ladder */}
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Ladder</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>Top 6 of 10 · from Dribl</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) 36px 36px', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>#</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>Team</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', textAlign: 'center' }}>P</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', textAlign: 'center' }}>Pts</span>
          </div>
          {LADDER.map((l, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) 36px 36px', gap: 8, alignItems: 'center', minHeight: 36, background: l.us ? '#eef5f2' : 'transparent', borderRadius: l.us ? 8 : 0, padding: l.us ? '0 6px' : '0' }}>
              <span style={{ fontSize: 14, fontWeight: l.us ? 700 : 400, color: l.us ? '#2f6252' : '#4a5a57' }}>{l.pos}</span>
              <span style={{ fontSize: 15, fontWeight: l.us ? 700 : 400, color: l.us ? '#2f6252' : '#10211f' }}>{l.name}</span>
              <span style={{ fontSize: 14, textAlign: 'center', color: '#4a5a57' }}>{l.played}</span>
              <span style={{ fontSize: 15, fontWeight: 700, textAlign: 'center', color: l.us ? '#2f6252' : '#10211f' }}>{l.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
