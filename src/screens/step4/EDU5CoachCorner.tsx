import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU5CoachCorner({ onLesson }: { onLesson?: () => void }) {
  const [activeArticle, setActiveArticle] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const articles = [
    { id: 'a1', tag: 'Game model', title: 'Helping your team stay compact in the press', mins: 4, preview: 'When the front player presses, the whole line needs to move with them — but it rarely does by accident. Here is how to train it without overloading the session.' },
    { id: 'a2', tag: 'Player welfare', title: 'Talking to a 12-year-old about effort vs outcome', mins: 3, preview: 'Some players think trying hard and winning are the same thing. When they are not, here is a conversation that tends to help.' },
    { id: 'a3', tag: 'Game model', title: 'Build-up: when to go long', mins: 5, preview: 'Playing from the back is a principle, not a rule. Here are four situations where the right answer is a direct ball — and how to tell your players that without confusing them.' },
    { id: 'a4', tag: 'Session design', title: 'The 15-minute block that coaches underuse', mins: 4, preview: 'Most coaches end sessions with a scrimmage. That last 15 minutes is often the best learning opportunity — if the scrimmage has a clear constraint.' },
    { id: 'a5', tag: 'Player welfare', title: 'What to do when two players do not get along', mins: 3, preview: 'It happens in most squads at some point. Here is a framework for handling it without taking sides.' },
    { id: 'a6', tag: 'Working with parents', title: 'The pre-season meeting that saves time all year', mins: 5, preview: 'Thirty minutes in September means fewer uncomfortable conversations through spring. Here is an agenda that works.' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Clips' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['By game', 'By measure', 'By player', 'Playlists', 'Learn'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Learn' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Learn' ? 700 : 500, color: t === 'Learn' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          {['For players', 'For coaches', 'Coach\'s Corner'].map(t => (
            <div key={t} style={{ fontSize: 13, fontWeight: t === "Coach's Corner" ? 700 : 500, color: t === "Coach's Corner" ? G : MUT, cursor: 'pointer', borderBottom: t === "Coach's Corner" ? `2px solid ${G}` : '2px solid transparent', padding: '0 2px', height: 44, display: 'flex', alignItems: 'center' }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 24, padding: '24px 32px' }}>
        {/* Left: article list */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Coach's Corner</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Short reads for coaches at Wattle Creek. Written to fit in the five minutes before training.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {articles.map(a => (
              <div key={a.id} onClick={() => setActiveArticle(a.id === activeArticle ? null : a.id)} style={{ background: '#fff', border: `2px solid ${activeArticle === a.id ? G : LN}`, borderRadius: 14, padding: '16px 20px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <div style={{ height: 22, padding: '0 8px', borderRadius: 4, background: a.tag === 'Player welfare' ? '#fef2f2' : a.tag === 'Session design' ? '#eff6ff' : PALE, color: a.tag === 'Player welfare' ? '#991b1b' : a.tag === 'Session design' ? '#1e40af' : G, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>{a.tag}</div>
                      <div style={{ fontSize: 11, color: MUT }}>{a.mins} min read</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>{a.title}</div>
                    <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{a.preview}</div>
                  </div>
                  <div style={{ fontSize: 18, color: MUT, transform: activeArticle === a.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>›</div>
                </div>
                {activeArticle === a.id && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${LN}` }}>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 16 }}>
                      {a.preview} The key is to build the habit in training first — before expecting it in games.
                      <br /><br />
                      Start by giving the front player a job: press the goalkeeper on every goal kick. Then give the two players next to them a job: when you see the front player start to move, step up with them.
                      <br /><br />
                      Within two or three sessions, the line will start to move as a unit. That is when you can start talking about the gap between the lines.
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={e => { e.stopPropagation(); onLesson?.() }} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>See related lesson</button>
                      <button onClick={e => { e.stopPropagation(); st('Bookmarked.') }} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Bookmark</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Topics</div>
            {['Game model', 'Player welfare', 'Session design', 'Working with parents', 'Goalkeeping'].map(t => (
              <div key={t} onClick={() => st(`Filtering by ${t}.`)} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}`, fontSize: 13, color: MUT, cursor: 'pointer' }}>{t}</div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 6 }}>Suggest a topic</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginBottom: 10 }}>Something you want to read about? Let Rachel know.</div>
            <button onClick={() => st('Opening suggestion form.')} style={{ width: '100%', height: 32, borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 12, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Suggest a topic</button>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
