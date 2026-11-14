import type { CSSProperties, ReactNode } from 'react'

// Start page (STA1 desktop / STA2 phone). Ported pixel-for-pixel from
// source/STA1-StartPage.dc.html and source/STA2-StartPagePhone.dc.html.
// Colours per HANDOVER-START.md. Amber #f4c95d appears only in the five
// listed places. DM Sans, weights 400/700.

const DARK = '#1c3a33', GREEN = '#2f6252', INK = '#10211f', GREY = '#4a5a57'
const PALE = '#a9cfc0', PALEG = '#dcefe8', AMBER = '#f4c95d'
const PAGE = '#f4f5f3', BORDER = '#c5c8c4', ICONBG = '#eef5f2'

type Handlers = {
  onDemo: () => void
  onWhy: () => void
  onStory: () => void
  onSandbox: () => void
  onOpenSandbox: () => void
}

const logoIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/></svg>
)
const arrow = (s = 18, sw = 2.2) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
)
const tick = (stroke: string, s = 18, sw = 2.6) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
)
const play = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>
)

const whatYouGetIcons = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19V9M12 19V5M19 19v-7"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 16l5-5 4 4 7-8M15 7h5v5"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5M18 8v6M15 11h6"/></svg>,
]
const problemIcons = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z"/></svg>,
]
const reasonIcons = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0114-5l2-2v6h-6l2-2a5 5 0 10.5 6"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 11a3 3 0 100-6 3 3 0 000 6zM16 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 15c3 0 8 1 8 5"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>,
]

const label = (color: string): CSSProperties => ({ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color })
const band = (bg: string): CSSProperties => ({ background: bg, width: '100%' })
const inner = (padV: string, padH = 56): CSSProperties => ({ maxWidth: 1180, margin: '0 auto', padding: `${padV}` , paddingLeft: padH, paddingRight: padH, boxSizing: 'border-box' })

const WHAT_YOU_GET = [
  { t: 'An edge on Saturday', d: 'Know what your team does well, where it leaks, and how next week’s opponent plays. Most of your rivals are still guessing.' },
  { t: 'Players who get better, faster', d: 'Every player has one goal, a clip that shows it and a session built around it. Improvement you can point to, not hope for.' },
  { t: 'A club players want to join', d: 'Show a new family exactly how you develop players: the plan, the clips, the progress. It is the strongest pitch you will ever make at a trial day.' },
]
const PROBLEMS = [
  { t: 'Coaches are volunteers', d: 'Most have an hour a week to plan. Nobody has time to watch 60 minutes of film, so it stays on a phone.' },
  { t: 'Families can’t see what they pay for', d: 'They get a result on Saturday. What their child is learning stays in the coach’s head, and the club down the road is one good trial day away.' },
  { t: 'The club runs on five apps and a group chat', d: 'Film in one place, vest numbers in another, check-ins in a third, messages in a group chat. Nothing joins up.' },
]
const SLICES = [
  { t: 'Cameras', d: 'Record the game and tag the goals.', stop: 'what happened' },
  { t: 'Wearables', d: 'Count sprints, distance and load.', stop: 'how much' },
  { t: 'Team apps', d: 'Messages, rosters and who is coming.', stop: 'who’s there' },
]
const ALERTS = [
  { src: 'FILM', t: 'Noah fades after minute 45' },
  { src: 'VEST', t: 'Load up 30% in a growth spurt' },
  { src: 'CHECK-IN', t: 'Sore knee, two days running' },
]
const REASONS = [
  { t: 'It proves what works', d: 'Every plan comes from your last game, and the next game is checked against the plan. Keep what moved the numbers. Drop what didn’t.' },
  { t: 'The work is done before you open it', d: 'Sessions built, clips cut, reminders sent, line-ups drafted. A volunteer coach gets a professional’s preparation.' },
  { t: 'One app for the whole club', d: 'Coaches, parents, players, the director and the committee. Twenty roles, one set of facts, and no more chasing five apps.' },
  { t: 'Right for every age', d: 'MiniRoos: no scores, a turn for every child. Youth: growth and load watched. Seniors: results, the ladder and the opposition scouted. Consent and child safety built in throughout.' },
  { t: 'No new kit needed', d: 'Any camera, any vests, or none at all. A team with nothing starts with three taps after the game, and adds feeds later.' },
]
const ROLE_CARDS = [
  { who: 'MiniRoos to seniors', name: 'A coach', d: 'Walk into Tuesday knowing exactly what to fix.' },
  { who: 'On your phone', name: 'A parent or player', d: 'See your child getting better, with the clip to prove it.' },
  { who: 'Director, chair, coordinator', name: 'Running the club', d: 'Every team playing the club way, and a story to tell new families.' },
  { who: 'Owner, coach, family', name: 'An academy', d: 'Progress families can see, and a reason to re-enrol.' },
]
const CHIPS = ['Film', 'Vests and boot sensors', 'Wellness check-ins', 'Coach’s taps', 'Other coaches’ notes', 'Who turned up']
const BARS = [
  { n: '11', h: 34, when: 'Round 3', amber: false },
  { n: '9', h: 28, when: 'Round 6', amber: false },
  { n: '7', h: 22, when: 'Saturday', amber: true },
]

function Btn({ children, onClick, style }: { children: ReactNode; onClick: () => void; style: CSSProperties }) {
  return <button onClick={onClick} style={{ fontFamily: 'inherit', cursor: 'pointer', ...style }}>{children}</button>
}

function StepTiles() {
  return (
    <>
      <div style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.09)' }}>
        <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, border: `1.5px solid ${PALE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>1</span>
        <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: PALE }}>ALL WEEK</span>
          <strong style={{ fontSize: 17, lineHeight: '22px' }}>Everything goes in</strong>
          <span style={{ fontSize: 14, lineHeight: '19px', color: PALE }}>Start with one. Add the others when you are ready.</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {CHIPS.map(c => <span key={c} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 700 }}>{c}</span>)}
          </span>
        </span>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.09)' }}>
        <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, border: `1.5px solid ${PALE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>2</span>
        <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: PALE }}>THE DAY AFTER A GAME</span>
          <strong style={{ fontSize: 17, lineHeight: '22px' }}>Clean Sheet reads it together</strong>
          <span style={{ fontSize: 14, lineHeight: '19px', color: PALE }}>One review, Tuesday’s session, and a clip for every player.</span>
        </span>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.09)' }}>
        <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, border: `1.5px solid ${PALE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>3</span>
        <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: PALE }}>THE NEXT GAME</span>
          <strong style={{ fontSize: 17, lineHeight: '22px' }}>You see what works</strong>
          <span style={{ marginTop: 6 }}>
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              {BARS.map(b => (
                <span key={b.when} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 64 }}>
                  <strong style={{ fontSize: b.amber ? 22 : 16, lineHeight: '24px', color: b.amber ? AMBER : PALE, fontVariantNumeric: 'tabular-nums' }}>{b.n}</strong>
                  <span style={{ width: '100%', height: b.h, borderRadius: '6px 6px 0 0', background: b.amber ? AMBER : 'rgba(255,255,255,0.28)' }} />
                  <span style={{ fontSize: 12, lineHeight: '16px', color: PALE, whiteSpace: 'nowrap' }}>{b.when}</span>
                </span>
              ))}
              <span style={{ alignSelf: 'center', fontSize: 13, lineHeight: '18px', color: PALE, maxWidth: 150 }}>seconds to win the ball back</span>
            </span>
          </span>
        </span>
      </div>
    </>
  )
}

function Desktop(h: Handlers) {
  const topBtn = (bg: string, color: string, borderC: string): CSSProperties => ({ flex: 'none', height: 44, padding: '0 22px', borderRadius: 14, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', background: bg, color, border: `1px solid ${borderC}` })
  const panelBtn = (bg: string, color: string, borderC: string): CSSProperties => ({ flex: 'none', height: 52, padding: '0 22px', borderRadius: 14, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap', background: bg, color, border: `1px solid ${borderC}` })
  return (
    <div data-screen="STA1-StartPage" style={{ width: '100%', background: PAGE, color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={band(DARK)}>
        <div style={{ ...inner('0'), height: 64, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{logoIcon}</span>
            <strong style={{ fontSize: 18 }}>Clean Sheet</strong>
          </span>
          <span style={{ display: 'flex', gap: 10 }}>
            <Btn onClick={h.onWhy} style={topBtn('transparent', '#fff', PALE)}>Why trust it</Btn>
            <Btn onClick={h.onDemo} style={topBtn('#fff', INK, '#fff')}>Start the demo</Btn>
          </span>
        </div>
      </header>

      {/* Top panel */}
      <section aria-label="What Clean Sheet is" style={band(DARK)}>
        <div style={{ ...inner('36px'), paddingTop: 36, paddingBottom: 48, color: '#fff', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 420px', gap: 48, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={label(AMBER)}>SMARTER COACHING FOR EVERY SOCCER CLUB</span>
            <h1 style={{ margin: 0, fontSize: 42, lineHeight: '49px', letterSpacing: '-0.025em', fontWeight: 700 }}>Clean Sheet reads everything your club records, lifts performance on and off the pitch, and proves what works.</h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: '27px', color: PALE }}>Film, vests, wellness check-ins, a coach’s three taps, a note from the fitness coach. Alone, each tells you a little. Read together, they show what Tuesday’s session needs and back every decision, on and off the pitch.</p>
            <span style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <Btn onClick={h.onDemo} style={panelBtn('#fff', INK, '#fff')}>Start the demo</Btn>
              <Btn onClick={h.onStory} style={panelBtn('transparent', '#fff', PALE)}>{play}The idea in one minute</Btn>
            </span>
            <span style={{ fontSize: 14, lineHeight: '20px', color: PALE }}>No sign-in. A made-up club, mid-season, with every screen filled in.</span>
          </div>
          <div aria-label="How a week works" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <StepTiles />
            <span style={{ fontSize: 13, lineHeight: '18px', color: PALE }}>From the demo club: U12 Sam worked on winning it back fast, using film, vests and check-ins.</span>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section aria-label="What you get" style={band('#fff')}>
        <div style={{ ...inner('52px'), paddingTop: 52, paddingBottom: 56, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={label(GREY)}>WHAT YOU GET</span>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: '43px', letterSpacing: '-0.02em', maxWidth: 900, color: INK }}>Every club is looking for an edge. This is where it comes from.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', marginTop: 14 }}>
            {WHAT_YOU_GET.map((c, i) => (
              <div key={c.t} style={{ padding: i === 0 ? '0 28px 0 0' : '0 28px', borderLeft: i === 0 ? undefined : `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ width: 48, height: 48, borderRadius: 999, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{whatYouGetIcons[i]}</span>
                <strong style={{ fontSize: 25, lineHeight: '31px', letterSpacing: '-0.01em' }}>{c.t}</strong>
                <span style={{ fontSize: 16, lineHeight: '24px', color: GREY }}>{c.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The problem */}
      <section aria-label="The problem" style={band(PAGE)}>
        <div style={{ ...inner('56px'), paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '400px minmax(0,1fr)', gap: 56, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={label(GREY)}>THE PROBLEM</span>
              <h2 style={{ margin: 0, fontSize: 34, lineHeight: '41px', letterSpacing: '-0.02em', maxWidth: 400, color: INK }}>Clubs record more than ever. Almost none of it changes Tuesday night.</h2>
            </div>
            <div style={{ borderRadius: 20, background: '#fff', border: `1px solid ${BORDER}`, padding: '6px 24px' }}>
              {PROBLEMS.map((p, i) => (
                <div key={p.t} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: i < PROBLEMS.length - 1 ? `1px solid ${BORDER}` : undefined }}>
                  <span style={{ flex: 'none', width: 44, height: 44, borderRadius: 12, background: ICONBG, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN }}>{problemIcons[i]}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <strong style={{ fontSize: 19, lineHeight: '25px' }}>{p.t}</strong>
                    <span style={{ fontSize: 15, lineHeight: '22px', color: GREY }}>{p.d}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The stakes */}
      <section aria-label="The stakes" style={band(GREEN)}>
        <div style={{ ...inner('44px'), paddingTop: 44, paddingBottom: 44, color: '#fff', display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ flex: 'none', width: 6, alignSelf: 'stretch', borderRadius: 3, background: AMBER }} />
          <strong style={{ fontSize: 30, lineHeight: '39px', letterSpacing: '-0.02em', maxWidth: 900 }}>The club that turns what it records into better training gets better players. Then it gets more of them.</strong>
        </div>
      </section>

      {/* Why different */}
      <section aria-label="Why Clean Sheet is different" style={band('#fff')}>
        <div style={{ ...inner('56px'), paddingTop: 56, paddingBottom: 56, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={label(GREY)}>WHY CLEAN SHEET IS DIFFERENT</span>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: '43px', letterSpacing: '-0.02em', maxWidth: 900, color: INK }}>Every other tool sees one slice. Clean Sheet reads them together.</h2>
          {/* Slices row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 56px minmax(0,1fr)', alignItems: 'stretch', marginTop: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SLICES.map(s => (
                <div key={s.t} style={{ borderRadius: 14, background: PAGE, border: `1px solid ${BORDER}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: 17, lineHeight: '22px' }}>{s.t}</strong>
                    <span style={{ fontSize: 14, lineHeight: '19px', color: GREY }}>{s.d}</span>
                  </span>
                  <span style={{ flex: 'none', textAlign: 'right', fontSize: 12, lineHeight: '16px', color: GREY }}>Stops at<br /><strong style={{ fontSize: 15, lineHeight: '20px', color: INK }}>{s.stop}</strong></span>
                </div>
              ))}
            </div>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            <div style={{ borderRadius: 18, background: DARK, color: '#fff', padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
              <strong style={{ fontSize: 26, lineHeight: '32px' }}>Clean Sheet</strong>
              <span style={{ fontSize: 16, lineHeight: '23px', color: PALE }}>Sits on top of all of them, plus what coaches and players tell it. Plans the next session, then checks the next game against the plan.</span>
              <span style={{ marginTop: 6, fontSize: 13, color: PALE }}>Tells you</span>
              <strong style={{ fontSize: 22, lineHeight: '28px', color: AMBER }}>what to do next, and what works</strong>
            </div>
          </div>
          {/* Example panel */}
          <div aria-label="One answer, not three alerts" style={{ marginTop: 14, borderRadius: 22, background: DARK, color: '#fff', padding: '30px 32px', display: 'grid', gridTemplateColumns: '270px minmax(0,1fr) 44px 300px', gap: 22, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...label(PALE), fontSize: 12 }}>FOR EXAMPLE</span>
              <strong style={{ fontSize: 28, lineHeight: '34px', letterSpacing: '-0.02em' }}>One answer, not three alerts.</strong>
              <span style={{ fontSize: 15, lineHeight: '22px', color: PALE }}>Three tools would send three warnings about the same boy. Nobody has time to join them up.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ALERTS.map(a => (
                <span key={a.src} style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.10)' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: PALE }}>{a.src}</span>
                  <span style={{ fontSize: 15, lineHeight: '20px' }}>{a.t}</span>
                </span>
              ))}
            </div>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            <div style={{ borderRadius: 16, background: AMBER, color: INK, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>ONE ANSWER</span>
              <strong style={{ fontSize: 24, lineHeight: '30px', letterSpacing: '-0.01em' }}>Cap Noah’s sprints this week.</strong>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>His coach, the fitness coach and his parent all see why.</span>
            </div>
          </div>
          {/* Reasons grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 14 }}>
            {REASONS.map((r, i) => (
              <div key={r.t} style={{ minWidth: 0, borderRadius: 18, background: '#fff', border: `1px solid ${BORDER}`, padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: ICONBG, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN }}>{reasonIcons[i]}</span>
                <strong style={{ fontSize: 18, lineHeight: '24px' }}>{r.t}</strong>
                <span style={{ fontSize: 15, lineHeight: '21px', color: GREY }}>{r.d}</span>
              </div>
            ))}
            <Btn onClick={h.onDemo} style={{ borderRadius: 18, background: GREEN, color: '#fff', padding: 20, display: 'flex', flexDirection: 'column', gap: 8, border: 'none', textAlign: 'left' }}>
              <strong style={{ fontSize: 22, lineHeight: '28px' }}>See all of this working</strong>
              <span style={{ fontSize: 15, lineHeight: '21px', color: PALEG }}>A made-up club, mid-season. No sign-in.</span>
              <span style={{ marginTop: 'auto', minHeight: 44, display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: '#fff' }}>Start the demo {arrow(18)}</span>
            </Btn>
          </div>
        </div>
      </section>

      {/* Pick who you are */}
      <section aria-label="Pick who you are" style={band(DARK)}>
        <div style={{ ...inner('52px'), paddingTop: 52, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={label(PALE)}>SEE IT AS YOURSELF</span>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: '43px', letterSpacing: '-0.02em', maxWidth: 860, color: '#fff' }}>Pick who you are</h2>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            {ROLE_CARDS.map(c => (
              <Btn key={c.name} onClick={h.onDemo} style={{ flex: 1, minWidth: 0, borderRadius: 16, background: '#fff', border: `1px solid ${BORDER}`, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 4, color: INK, textAlign: 'left' }}>
                <span style={{ fontSize: 12, lineHeight: '16px', color: GREY }}>{c.who}</span>
                <strong style={{ fontSize: 17, lineHeight: '22px' }}>{c.name}</strong>
                <span style={{ fontSize: 14, lineHeight: '19px', color: GREY }}>{c.d}</span>
                <span style={{ marginTop: 'auto', paddingTop: 8, minHeight: 36, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: GREEN }}>See it {arrow(16)}</span>
              </Btn>
            ))}
          </div>
          <Btn onClick={h.onDemo} style={{ alignSelf: 'flex-start', minHeight: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 700, color: '#fff', background: 'none', border: 'none' }}>All 20 roles</Btn>
        </div>
      </section>

      {/* Two ways in */}
      <section aria-label="Two ways in" style={band(PAGE)}>
        <div style={{ ...inner('52px'), paddingTop: 52, paddingBottom: 48, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={label(GREY)}>SEE IT FOR YOURSELF</span>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: '43px', letterSpacing: '-0.02em', maxWidth: 1060, color: INK }}>Ten minutes in the demo will tell you more than this page.</h2>
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            <div style={{ flex: 1, minWidth: 0, borderRadius: 18, background: '#fff', border: `1px solid ${BORDER}`, padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={label(GREY)}>NO SIGN-IN · BEST FOR A FIRST LOOK</span>
              <strong style={{ fontSize: 22, lineHeight: '28px' }}>Follow the demo</strong>
              <span style={{ fontSize: 15, lineHeight: '21px', color: GREY }}>Wattle Creek FC and Tall Timber Academy, mid-season, with games, film and messages already in.</span>
              <span style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: '20px' }}><span style={{ flex: 'none', display: 'flex' }}>{tick(GREEN)}</span><span>A guided tour for each role, or look around on your own</span></span>
              <span style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: '20px' }}><span style={{ flex: 'none', display: 'flex' }}>{tick(GREEN)}</span><span>Nothing you tap is saved</span></span>
              <span style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <Btn onClick={h.onDemo} style={panelBtn(GREEN, '#fff', GREEN)}>Start the demo</Btn>
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0, borderRadius: 18, background: '#fff', border: `1px solid ${BORDER}`, padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={label(GREY)}>YOURS TO FILL · BEST FOR TRYING IT PROPERLY</span>
              <strong style={{ fontSize: 22, lineHeight: '28px' }}>Start with an empty club</strong>
              <span style={{ fontSize: 15, lineHeight: '21px', color: GREY }}>Your own sandbox. Add a team and a game and watch each screen fill in.</span>
              <span style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: '20px' }}><span style={{ flex: 'none', display: 'flex' }}>{tick(GREEN)}</span><span>Starts empty, as a new club would see it</span></span>
              <span style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: '20px' }}><span style={{ flex: 'none', display: 'flex' }}>{tick(GREEN)}</span><span>Saved in this browser for 14 days. Use made-up names</span></span>
              <span style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <Btn onClick={h.onSandbox} style={panelBtn(GREEN, '#fff', GREEN)}>Start with an empty club</Btn>
                <Btn onClick={h.onOpenSandbox} style={panelBtn('#fff', INK, BORDER)}>Open my sandbox</Btn>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={band(DARK)}>
        <div style={{ ...inner('0'), height: 60, color: PALE, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14 }}>
          <span>Everything in the demo is a made-up club with made-up names.</span>
          <Btn onClick={h.onWhy} style={{ color: '#fff', fontWeight: 700, minHeight: 44, display: 'flex', alignItems: 'center', background: 'none', border: 'none', fontSize: 14 }}>Why trust it</Btn>
        </div>
      </footer>
    </div>
  )
}

function Phone(h: Handlers) {
  const pBtn = (bg: string, color: string, borderC: string): CSSProperties => ({ height: 52, padding: '0 22px', borderRadius: 14, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap', background: bg, color, border: `1px solid ${borderC}`, width: '100%' })
  const PHONE_SLICES = [
    { t: 'Cameras', s: 'stops at what happened' },
    { t: 'Wearables', s: 'stops at how much' },
    { t: 'Check-in apps', s: 'stops at how they feel' },
    { t: 'Team apps', s: 'stops at who’s there' },
  ]
  const PHONE_REASONS = [...REASONS]
  return (
    <div data-screen="STA2-StartPagePhone" style={{ width: 390, margin: '0 auto', background: PAGE, color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ height: 56, background: DARK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flex: 'none' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 32, height: 32, borderRadius: 9, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{logoIcon}</span>
          <strong style={{ fontSize: 18 }}>Clean Sheet</strong>
        </span>
        <Btn onClick={h.onDemo} style={{ height: 44, padding: '0 22px', borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, background: '#fff', color: INK, border: '1px solid #fff' }}>Start</Btn>
      </header>

      <section aria-label="What Clean Sheet is" style={{ background: DARK, color: '#fff', padding: '18px 16px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={label(AMBER)}>SMARTER COACHING FOR EVERY SOCCER CLUB</span>
        <h1 style={{ margin: 0, fontSize: 27, lineHeight: '33px', letterSpacing: '-0.02em', fontWeight: 700 }}>Clean Sheet reads everything your club records, lifts performance on and off the pitch, and proves what works.</h1>
        <p style={{ margin: 0, fontSize: 16, lineHeight: '23px', color: PALE }}>Film, vests, wellness check-ins, a coach’s three taps, a note from the fitness coach. Alone, each tells you a little. Read together, they show what Tuesday’s session needs and back every decision, on and off the pitch.</p>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Btn onClick={h.onDemo} style={pBtn('#fff', INK, '#fff')}>Start the demo</Btn>
          <Btn onClick={h.onStory} style={pBtn('transparent', '#fff', PALE)}>{play}The idea in one minute</Btn>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}><StepTiles /></span>
      </section>

      <section aria-label="What you get" style={{ background: '#fff', padding: '28px 16px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={label(GREY)}>WHAT YOU GET</span>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: '30px', letterSpacing: '-0.015em', color: INK }}>Every club is looking for an edge. This is where it comes from.</h2>
        <div>
          {WHAT_YOU_GET.map((c, i) => (
            <div key={c.t} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 0', borderBottom: i < WHAT_YOU_GET.length - 1 ? `1px solid ${BORDER}` : undefined }}>
              <span style={{ width: 40, height: 40, borderRadius: 999, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{whatYouGetIcons[i]}</span>
              <strong style={{ fontSize: 21, lineHeight: '27px' }}>{c.t}</strong>
              <span style={{ fontSize: 15, lineHeight: '22px', color: GREY }}>{c.d}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="The problem" style={{ background: PAGE, padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={label(GREY)}>THE PROBLEM</span>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: '30px', letterSpacing: '-0.015em', color: INK }}>Clubs record more than ever. Almost none of it changes Tuesday night.</h2>
        {PROBLEMS.map((p, i) => (
          <div key={p.t} style={{ borderRadius: 16, background: '#fff', border: `1px solid ${BORDER}`, padding: '14px 16px', display: 'flex', gap: 12 }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: ICONBG, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN }}><span style={{ transform: 'scale(0.818)' }}>{problemIcons[i]}</span></span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 16, lineHeight: '21px' }}>{p.t}</strong>
              <span style={{ fontSize: 14, lineHeight: '19px', color: GREY }}>{p.d}</span>
            </span>
          </div>
        ))}
      </section>

      <section aria-label="The stakes" style={{ background: GREEN, color: '#fff', padding: '26px 16px', display: 'flex', gap: 14 }}>
        <span style={{ flex: 'none', width: 5, borderRadius: 3, background: AMBER }} />
        <strong style={{ fontSize: 21, lineHeight: '28px', letterSpacing: '-0.01em' }}>The club that turns what it records into better training gets better players. Then it gets more of them.</strong>
      </section>

      <section aria-label="Why Clean Sheet is different" style={{ background: '#fff', padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={label(GREY)}>WHY CLEAN SHEET IS DIFFERENT</span>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: '30px', letterSpacing: '-0.015em', color: INK }}>Every other tool sees one slice. Clean Sheet reads them together.</h2>
        <div style={{ borderRadius: 16, background: PAGE, border: `1px solid ${BORDER}`, padding: '4px 16px', display: 'flex', flexDirection: 'column' }}>
          {PHONE_SLICES.map(s => (
            <span key={s.t} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, minHeight: 44, alignItems: 'center', borderBottom: `1px solid ${BORDER}`, fontSize: 15 }}>
              <strong>{s.t}</strong><span style={{ color: GREY, textAlign: 'right' }}>{s.s}</span>
            </span>
          ))}
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '12px 0' }}>
            <strong style={{ fontSize: 15 }}>Clean Sheet</strong>
            <span style={{ fontSize: 15, lineHeight: '21px' }}>tells you what to do next, and what works</span>
          </span>
        </div>
        <div style={{ borderRadius: 18, background: DARK, color: '#fff', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={label(PALE)}>FOR EXAMPLE</span>
          <strong style={{ fontSize: 22, lineHeight: '28px' }}>One answer, not three alerts.</strong>
          {ALERTS.map(a => (
            <span key={a.src} style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.10)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: PALE }}>{a.src}</span>
              <span style={{ fontSize: 15, lineHeight: '20px' }}>{a.t}</span>
            </span>
          ))}
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></span>
          <div style={{ borderRadius: 16, background: AMBER, color: INK, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>ONE ANSWER</span>
            <strong style={{ fontSize: 20, lineHeight: '26px', letterSpacing: '-0.01em' }}>Cap Noah’s sprints this week.</strong>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>His coach, the fitness coach and his parent all see why.</span>
          </div>
        </div>
        {PHONE_REASONS.map((r, i) => (
          <div key={r.t} style={{ borderRadius: 16, background: '#fff', border: `1px solid ${BORDER}`, padding: '14px 16px', display: 'flex', gap: 12 }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: ICONBG, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN }}><span style={{ transform: 'scale(0.9)' }}>{reasonIcons[i]}</span></span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 16, lineHeight: '21px' }}>{r.t}</strong>
              <span style={{ fontSize: 14, lineHeight: '19px', color: GREY }}>{r.d}</span>
            </span>
          </div>
        ))}
      </section>

      <section aria-label="Two ways in" style={{ background: PAGE, padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={label(GREY)}>SEE IT FOR YOURSELF</span>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: '30px', letterSpacing: '-0.015em', color: INK }}>Ten minutes in the demo will tell you more than this page.</h2>
        <div style={{ borderRadius: 16, background: '#fff', border: `1px solid ${BORDER}`, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <strong style={{ fontSize: 19, lineHeight: '24px' }}>Follow the demo</strong>
          <span style={{ fontSize: 14, lineHeight: '20px', color: GREY }}>A made-up club, mid-season. No sign-in. Pick any of 20 roles.</span>
          <Btn onClick={h.onDemo} style={pBtn(GREEN, '#fff', GREEN)}>Start the demo</Btn>
        </div>
        <div style={{ borderRadius: 16, background: '#fff', border: `1px solid ${BORDER}`, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <strong style={{ fontSize: 19, lineHeight: '24px' }}>Start with an empty club</strong>
          <span style={{ fontSize: 14, lineHeight: '20px', color: GREY }}>Your own sandbox, saved in this browser for 14 days. Use made-up names.</span>
          <Btn onClick={h.onSandbox} style={pBtn('#fff', INK, BORDER)}>Start with an empty club</Btn>
        </div>
      </section>

      <footer style={{ marginTop: 'auto', background: DARK, color: PALE, padding: '14px 16px', fontSize: 13, lineHeight: '18px' }}>
        Everything in the demo is a made-up club with made-up names. <Btn onClick={h.onWhy} style={{ color: '#fff', fontWeight: 700, background: 'none', border: 'none', padding: 0, fontSize: 13, display: 'inline-flex', alignItems: 'center', minHeight: 44, verticalAlign: 'middle' }}>Why trust it</Btn>
      </footer>
    </div>
  )
}

export default function StartPage({ phone, ...h }: Handlers & { phone?: boolean }) {
  return phone ? Phone(h) : Desktop(h)
}
