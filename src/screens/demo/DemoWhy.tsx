interface Props {
  onBack: () => void
}

const PILLARS = [
  {
    heading: 'Built on football',
    body: `Clean Sheet is designed around how clubs actually work in Australia — PlayFootball registrations, Dribl fixtures, MiniRoos formats, Working with Children checks, and Football Victoria safeguarding rules are all built in.\n\nWattle Creek FC is a fictional club. Everything it does in the demo — the games, the drills, the families — is realistic but made up.`,
    items: ['PlayFootball import in one step', 'Dribl sync for fixtures and cards', 'MiniRoos turns and no-scores format', 'Football Australia drill curriculum', 'State federation safeguarding rules'],
  },
  {
    heading: 'Backed by research',
    body: `The load caps, growth-spurt flags, and heading restrictions aren't defaults we made up. They follow the evidence on youth athlete development and the guidelines Football Australia publishes.\n\nFair-minutes rules, development goals, and the wellness check-in are based on what coaches at grassroots clubs actually need — not features designed for elite academies and scaled down.`,
    items: ['FIFA 11+ Kids warm-up built in', 'Growth-spurt load capping (PHV model)', 'Heading restriction by age group', 'Fair-minutes tracking', 'Wellness flags, not scores'],
  },
  {
    heading: 'Safe for children',
    body: `No child's data is visible until a parent has set consent and the coach's children check is confirmed. Parents control what's filmed and what's tracked — and can change their mind any time.\n\nWelfare concerns go to the welfare officer directly, not to the coach. Children can raise a concern from their own app without a parent or coach seeing it.`,
    items: ['Children check required before access', 'Per-child consent: 6 switches', 'Welfare concerns bypass the coach', 'Children can self-report privately', 'Data deletion on request'],
  },
  {
    heading: 'Private and local',
    body: `Under 15s join through a parent. The parent creates the account, sets six consent switches, and can remove everything at any time. A player under 15 never has a login that a parent doesn't share.\n\nData is stored in Australia and is never sold or used for advertising. Clean Sheet holds only what's needed to run the team.`,
    items: ['Under 15s join through a parent', 'Data is stored in Australia', 'No advertising tracking', 'No player data in grant reports', 'Right to deletion, any time'],
  },
]

export default function DemoWhy({ onBack }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)' }}>

      {/* Top bar */}
      <div style={{ background: '#1f4a3e', height: 48, display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to demo
        </button>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginLeft: 8 }}>Why trust it</span>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 48px 32px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: '#10211f', margin: '0 0 12px' }}>Why trust it</h1>
        <p style={{ fontSize: 16, color: '#4a5a57', margin: 0, maxWidth: 600 }}>Three things you should check before showing Clean Sheet to families at your club.</p>
      </div>

      {/* Pillars */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 48px 64px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {PILLARS.map((p, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 20, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#1f4a3e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i === 0 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z"/></svg>}
              {i === 1 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m-8 9a9 9 0 110-14"/></svg>}
              {i === 2 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
              {i === 3 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f', margin: 0 }}>{p.heading}</h2>
            <p style={{ fontSize: 14, color: '#4a5a57', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>{p.body}</p>
            <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {p.items.map((item, j) => (
                <li key={j} style={{ fontSize: 13, color: '#10211f', fontWeight: 600, lineHeight: '1.4' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 48px 64px' }}>
        <div style={{ background: '#1f4a3e', borderRadius: 20, padding: '28px 32px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>This is a demo, not a live system</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>Wattle Creek FC doesn't exist. Mia Tran, Sam K, Bianca Rossi and everyone else in the demo are fictional. Nothing you tap is saved, and no real data is used anywhere in this demo.</div>
          </div>
          <button onClick={onBack} style={{ flex: 'none', height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Explore the demo</button>
        </div>
      </div>
    </div>
  )
}
