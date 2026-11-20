interface Props {
  onBack: () => void
}

// "Why trust it": four questions a committee member or parent asks, each with a
// short answer, the rules behind it, and the place in the demo that shows it.

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', BORDER = '#c5c8c4', PALE = '#eef5f2', SANDBG = '#f6f1e9', SAND = '#e8cfcf'

const PILLARS: { q: string; heading: string; body: string; items: string[]; see: { label: string; href: string }[]; icon: string }[] = [
  {
    q: 'Is my child safe on it?',
    heading: 'Children come first',
    body: 'No adult sees a child until their children check is confirmed and a parent has said yes. A worry goes to the welfare officer, never through the coach it might be about.',
    items: ['Children check before any access', 'Six consent switches per child, changed any time', 'Concerns go straight to the welfare officer', 'A child can raise a worry privately from their own phone', 'A coach never messages a child alone: a parent is always copied in'],
    see: [{ label: 'Welfare officer', href: '/look/welfare' }, { label: 'Parent consent', href: '/look/parent' }],
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    q: 'Who sees what?',
    heading: 'Private by design',
    body: 'Under 15s join through a parent, who can take everything away again. Each role sees only what it needs: a fitness coach sees load, not messages, and a chair sees club totals, not a child.',
    items: ['Under 15s have no login a parent does not share', 'Each role has its own, smaller view', 'No advertising and no selling of data', 'No player names in grant or sponsor reports', 'Delete everything on request'],
    see: [{ label: 'Player under 15', href: '/look/playeryoung' }, { label: 'Chair', href: '/look/chair' }],
    icon: 'M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2zM7 11V7a5 5 0 0110 0v4',
  },
  {
    q: 'Is it good for young players?',
    heading: 'Built on the evidence',
    body: 'The limits are not ours. They follow published guidance on how children grow and get hurt. For under 12s there are no scores, ratings or rankings anywhere: only turns, effort and what to try next.',
    items: ['No scores, ratings or ladders under 12', 'Fair minutes tracked for every player', 'Sprints capped through a growth spurt', 'Heading limits by age group', 'Wellness answers raise a flag, never a score'],
    see: [{ label: 'MiniRoos coach', href: '/look/miniroos' }, { label: 'Fitness coach', href: '/look/fitness' }],
    icon: 'M9 12l2 2 4-4M12 21a9 9 0 100-18 9 9 0 000 18z',
  },
  {
    q: 'Who is in charge, the coach or the computer?',
    heading: 'The coach decides',
    body: 'Clean Sheet drafts: a match review, a training plan, a line-up that worked before. The coach reads it, changes it, and adds their own take. Nothing reaches a player or a parent until the coach sends it.',
    items: ['Every review shows the clip it is based on', 'Moments it is unsure about wait for the coach to check', 'The coach’s take replaces the draft', 'Plans use drills from the national curriculum', 'Works with no sensors and any camera'],
    see: [{ label: 'Junior coach', href: '/look/coach' }, { label: 'The one-minute story', href: '/tour/story/0' }],
    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  },
]

const WONT = [
  'Rank or score a child under 12',
  'Show a child to an adult without a children check',
  'Film or track a child whose parent said no',
  'Send a player something the coach has not seen',
  'Sell data or show advertising',
]

const STATUS: { label: string; state: string; body: string }[] = [
  { label: 'Every screen in this demo', state: 'Built', body: '20 roles on tablet and phone, with the same made-up club behind all of them.' },
  { label: 'The sandbox', state: 'Built', body: 'Set up your own team. It is saved in your browser only and sent nowhere.' },
  { label: 'Film to review to plan', state: 'Shown, not live', body: 'The reviews and plans here are written examples. No video is analysed in the demo.' },
  { label: 'Registration and fixture imports', state: 'Shown, not live', body: 'The connections screens show how they will work. Nothing is connected in the demo.' },
  { label: 'Messages, reminders and check-ins', state: 'Shown, not live', body: 'You can see what each person gets. Nothing is sent to a real phone.' },
]

export default function DemoWhy({ onBack }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)', color: INK }}>
      <div style={{ background: GD, height: 48, display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to demo
        </button>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 32px 24px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 10px' }}>Why trust it</h1>
        <p style={{ fontSize: 17, lineHeight: 1.5, color: MUT, margin: 0, maxWidth: 680 }}>Four questions a parent or a committee will ask before Clean Sheet goes near their club. Each answer points to the place in the demo where you can check it yourself.</p>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
        {PILLARS.map(p => (
          <section key={p.heading} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ flex: 'none', width: 44, height: 44, borderRadius: 12, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p.icon} /></svg>
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: G }}>{p.q}</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>{p.heading}</h2>
              </div>
            </div>
            <p style={{ fontSize: 15, color: MUT, lineHeight: 1.55, margin: 0 }}>{p.body}</p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.items.map(item => (
                <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', marginTop: 2 }}><path d="M20 6L9 17l-5-5" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: MUT }}>See it:</span>
              {p.see.map(l => (
                <a key={l.href} href={l.href} style={{ display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 14px', borderRadius: 10, background: PALE, color: GD, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        <section style={{ background: SANDBG, border: `1px solid ${SAND}`, borderRadius: 20, padding: '24px 26px', alignSelf: 'start' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px' }}>What it will never do</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {WONT.map(w => (
              <li key={w} style={{ display: 'flex', gap: 10, fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" aria-hidden="true" style={{ flex: 'none', marginTop: 3 }}><path d="M6 6l12 12M18 6L6 18" /></svg>
                {w}
              </li>
            ))}
          </ul>
        </section>
        <section style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '24px 26px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>What is real today</h2>
          <p style={{ fontSize: 14, color: MUT, margin: '0 0 8px', lineHeight: 1.5 }}>This is a demo. Here is what is built and what is only shown.</p>
          {STATUS.map(s => (
            <div key={s.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '2px 12px', padding: '10px 0', borderTop: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{s.label}</div>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: s.state === 'Built' ? PALE : '#f0f1ef', color: s.state === 'Built' ? GD : MUT, alignSelf: 'start', whiteSpace: 'nowrap' }}>{s.state}</span>
              <div style={{ gridColumn: '1 / -1', fontSize: 14, color: MUT, lineHeight: 1.45 }}>{s.body}</div>
            </div>
          ))}
        </section>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px 56px' }}>
        <div style={{ background: GD, borderRadius: 20, padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 420px' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Nobody in the demo is real</div>
            <div style={{ fontSize: 15, color: '#cfe6dc', lineHeight: 1.55 }}>Wattle Creek FC does not exist. Mia Tran, Sam K, Bianca Rossi and everyone else are made up. Nothing you tap is sent anywhere, and no real person’s data is used.</div>
          </div>
          <button onClick={onBack} style={{ flex: 'none', height: 48, padding: '0 24px', borderRadius: 10, border: 0, background: '#fff', color: GD, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Explore the demo</button>
        </div>
      </div>
    </div>
  )
}
