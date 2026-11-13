import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU4ClubLibrary({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const waiting = [
    { title: 'Stepping up together', coach: 'Sam Knight', team: 'U12 Sam', len: '0:14', days: '2 days ago' },
    { title: 'Recovery shape after a goal kick', coach: 'Dana Fox', team: 'U14 Josh', len: '0:19', days: '4 days ago' },
  ]

  const published = [
    { title: 'Closing the space behind the press', coach: 'Chris Ward', team: 'U13 Chris', uses: 4 },
    { title: 'First touch away from pressure', coach: 'Sam Knight', team: 'U12 Sam', uses: 5 },
    { title: 'Scanning before the ball arrives', coach: 'Meg Obi', team: 'U13 Girls Meg', uses: 2 },
  ]

  const requests = [
    { topic: 'Counter-attacks', asked: '2 coaches have been asked', note: 'Could you make a lesson on counter-attacks?' },
    { topic: 'Young keeper starts', asked: 'No lessons yet', note: 'Could you make a lesson for young keepers?' },
  ]

  const ChevronDown = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Director top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 8 }}>Clean Sheet</div>
        {(['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 10px', fontSize: 13, fontWeight: t === 'Coaches' ? 700 : 500, color: t === 'Coaches' ? '#fff' : 'rgba(255,255,255,0.65)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>{t}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => tool('Whole club')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
            Whole club<ChevronDown />
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      {/* Coaches sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={() => tool('All coaches')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>All coaches</button>
        <button onClick={() => tool('Courses')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Courses</button>
        <button onClick={() => tool('Learn library')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Learn library</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      {/* For players / For coaches sub-tabs */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 44, gap: 0 }}>
        <button style={{ height: 44, padding: '0 20px', background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>For players</button>
        <button onClick={() => onNav?.('EDU6-CoachPaths')} style={{ height: 44, padding: '0 20px', background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>For coaches</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => { tool('Add one from Clean Sheet'); st('Pick from ready-made lessons with players who are not from your club.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add one from Clean Sheet</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        {/* Library stats */}
        <div style={{ background: GD, borderRadius: 12, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Wattle Creek FC · 38 lessons from 9 coaches · 3 waiting for you</div>
          <div style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>41 players have been an example. 22 girls, 19 boys. No player more than 4 times.</div>
        </div>

        {/* Waiting for review */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Waiting for your review</div>
              <div style={{ fontSize: 12, color: MUT }}>You check that it shows the club's way of playing and that it is kind. Consent is checked for you.</div>
            </div>
            <button onClick={() => onNav?.('EDU2-Lesson')} style={{ marginLeft: 'auto', height: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Check the next one</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px 80px', padding: '10px 20px', borderBottom: `1.5px solid ${LN}`, background: '#f7f8f7' }}>
              {['Lesson', 'Coach', 'Team', 'Added', ''].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: MUT }}>{h}</div>
              ))}
            </div>
            {waiting.map((l, i) => (
              <div key={l.title} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px 80px', padding: '12px 20px', borderBottom: i < waiting.length - 1 ? `1px solid ${LN}` : 'none', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{l.len}</div>
                </div>
                <div style={{ fontSize: 12, color: MUT }}>{l.coach}</div>
                <div style={{ fontSize: 12, color: MUT }}>{l.team}</div>
                <div style={{ fontSize: 12, color: MUT }}>{l.days}</div>
                <button onClick={() => onNav?.('EDU2-Lesson')} style={{ height: 44, padding: '0 14px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Check</button>
              </div>
            ))}
          </div>
        </div>

        {/* Published lessons */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Published · {published.length} lessons</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {published.map((l, i) => (
              <div key={l.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px', borderBottom: i < published.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: MUT }}>by {l.coach} · {l.team} · {l.uses} team{l.uses !== 1 ? 's' : ''}</div>
                </div>
                <button onClick={() => onNav?.('EDU3-MakeLesson')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open</button>
              </div>
            ))}
          </div>
        </div>

        {/* Ask a coach */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Ask a coach to make a lesson</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Send a request to any coach. They get a note with the topic.</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {requests.map((r, i) => (
              <div key={r.topic} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: i < requests.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.topic}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{r.asked}</div>
                </div>
                <button onClick={() => { tool(`ask-coach-${i + 1}`); st(`Pick a coach. They get a note: "${r.note}"`) }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Ask a coach</button>
              </div>
            ))}
          </div>
        </div>

        {/* Consent note */}
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>A player or parent can ask at any time. It is gone the same day.</div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
