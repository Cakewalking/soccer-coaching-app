import { useState } from 'react'

// Pre-match team talk for MiniRoos — gentle, age-appropriate, built from last
// game's clips. Mirrors the junior/youth TeamTalkScreen presentation mode but
// swaps tactical data for things a U9 coach actually says.

type Slide = {
  label: string
  title: string
  message: string
  clip: string          // what the clip shows
  stat?: string         // a friendly, non-competitive number
  say: string           // coach note (hidden in "Show the team")
}

const SLIDES: Slide[] = [
  { label: 'START', title: 'Have fun today', message: 'We are playing Northgate City at their ground. Smiles on — let us enjoy it and help each other.', clip: 'The whole team walking out together last Sunday.', say: 'Keep it short and warm. Everyone is here to have a go.' },
  { label: 'WE LOVED', title: 'You passed to a friend 14 times', message: 'Last game you looked for a teammate again and again. That is how we play.', clip: 'Ivy passes across to Max, who passes it on.', stat: '14 passes to a teammate', say: 'Name two children who passed well. Ask the team: who else did it?' },
  { label: 'WE LOVED', title: 'Everyone had a shot', message: 'Every child had a go at scoring last week. Brilliant — keep sharing it around.', clip: "Poppy's shot from the edge of the box.", stat: '9 of 9 had a shot', say: 'Celebrate that everyone had a turn. No tally of who scored.' },
  { label: 'TRY TODAY', title: 'Look up before you kick', message: 'One thing to try: a quick look up to find a friend before you pass or shoot.', clip: 'Leo looks up, spots Zara, and finds her.', say: 'Make it a game, not a correction. "Can we beat 14 passes today?"' },
  { label: 'EVERYONE', title: 'Everyone gets a go', message: 'Equal time on the pitch and a turn in goal for every child — just like every week.', clip: 'The turns plan for today, child by child.', stat: 'Equal minutes · a turn in goal', say: 'Remind them nobody sits out more than anyone else. Point to the turns sheet.' },
  { label: 'GO', title: 'vs Northgate City', message: 'Have a go, look up, help each other, and enjoy it. Off we go!', clip: 'Last week’s team huddle before kick-off.', say: 'Build them up. Big cheer, then out they go.' },
]

export default function MiniRoosTeamTalk({ onClose }: { onClose: () => void }) {
  const [slide, setSlide] = useState(0)
  const [teamView, setTeamView] = useState(false)
  const [playing, setPlaying] = useState(false)
  const s = SLIDES[slide]
  const total = SLIDES.length

  return (
    <div style={{ width: '100%', minHeight: 'var(--frame-h, 100vh)', background: '#10211f', color: '#fff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px' }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#7cc4ab' }}>Team talk · U9 Tom · Wattle Creek FC</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, color: '#a3b0ad' }}>{slide + 1} of {total}</span>
          <button onClick={() => setTeamView(v => !v)} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: '1px solid #a3b0ad', background: teamView ? '#2f4442' : 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{teamView ? 'Coach view' : 'Show the team'}</button>
          <button onClick={onClose} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: '1px solid #a3b0ad', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Close</button>
          <button onClick={() => { setPlaying(false); setSlide(n => Math.min(total - 1, n + 1)) }} disabled={slide === total - 1} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: 0, background: slide < total - 1 ? '#40826d' : '#2f4442', color: slide < total - 1 ? '#fff' : '#6f8581', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: slide < total - 1 ? 'pointer' : 'default' }}>Next</button>
        </div>
      </div>

      {/* Two-column content */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 40, padding: '0 40px 24px', alignItems: 'center' }}>
        {/* Left — words */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7cc4ab' }}>{s.label}</div>
          <h1 style={{ margin: 0, fontSize: 48, lineHeight: '52px', fontWeight: 700, letterSpacing: '-0.02em' }}>{s.title}</h1>
          <p style={{ margin: 0, fontSize: 22, lineHeight: '30px', color: '#e9eae8' }}>{s.message}</p>
          {s.stat && (
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 10, background: '#172725', borderRadius: 14, padding: '14px 18px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7cc4ab" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
              <span style={{ fontSize: 20, fontWeight: 700 }}>{s.stat}</span>
            </div>
          )}
          {/* Coach note — hidden when showing the team */}
          {!teamView && (
            <div style={{ borderLeft: '3px solid #40826d', paddingLeft: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f8581', marginBottom: 4 }}>Say this</div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: '23px', color: '#c7d0cd' }}>{s.say}</p>
            </div>
          )}
        </div>

        {/* Right — video + clip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <button onClick={() => setPlaying(p => !p)} style={{ position: 'relative', height: 320, borderRadius: 20, background: '#172725', border: '1px solid #2f4442', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
            <div style={{ width: 84, height: 84, borderRadius: 999, border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
              {playing
                ? <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                : <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff"><polygon points="8 5 19 12 8 19 8 5" /></svg>}
            </div>
            <span style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 14, fontWeight: 600, color: '#a3b0ad' }}>{playing ? 'Playing clip…' : 'Tap to play the clip'}</span>
          </button>
          <div style={{ fontSize: 18, lineHeight: '26px' }}>{s.clip}</div>
          <div style={{ fontSize: 15, lineHeight: '20px', color: '#a3b0ad' }}>Clip from last Sunday’s match camera, picked for this talk.</div>
          {/* Slide dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => { setPlaying(false); setSlide(i) }} aria-label={`Slide ${i + 1}`} style={{ width: i === slide ? 36 : 12, height: 8, borderRadius: 999, background: i === slide ? '#7cc4ab' : '#2f4442', border: 0, cursor: 'pointer', padding: 0 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
