const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

type RoleCard = {
  id: string
  title: string
  persona: string
  device: string
  homeQuestion: string
  tabs: string
  canSee: string[]
  cantSee: string[]
  keyScreens: string[]
  ctaLabel: string
}

const ROLES: RoleCard[] = [
  {
    id: 'coach',
    title: 'Coach',
    persona: 'Sam K and co-coach Jess Marsh',
    device: 'Tablet, pitch-side',
    homeQuestion: 'What do we work on tonight, and did last week work?',
    tabs: 'Home · Squad · Training · Match day · Clips',
    canSee: ["Their team's clips, numbers and plans", "Each player's wellness and goals", "Messages with parents and staff"],
    cantSee: ["Other teams", "Club-wide numbers"],
    keyScreens: ["Tonight's session", "Match review", "Home shared with a co-coach"],
    ctaLabel: "Open Home",
  },
  {
    id: 'fitness',
    title: 'Fitness coach',
    persona: 'Priya Shah · club-wide, 4 teams',
    device: 'Tablet or phone',
    homeQuestion: "Who's ready, who's at risk, who needs less?",
    tabs: 'Home · Squad · Training · Match day · Clips',
    canSee: ["Load, sprints and growth for their teams", "Wellness check-ins", "Sprint limits they set"],
    cantSee: ["Editing the training plan", "Other teams' players"],
    keyScreens: ["Growth watch", "Tests and results", "Fitness level by age"],
    ctaLabel: "Open Priya's Home",
  },
  {
    id: 'manager',
    title: 'Team manager',
    persona: 'Rob Owusu · parent volunteer',
    device: 'Phone',
    homeQuestion: "Who's coming, what's changed, is game day sorted?",
    tabs: 'Home · Game day · Messages · Team',
    canSee: ["Availability and fixtures", "Messages to parents", "First-aid card parents share"],
    cantSee: ["Clips and match numbers", "Wellness, growth and pain"],
    keyScreens: ["Tell parents about a change", "Game day checklist", "Team staff and access"],
    ctaLabel: "Open Rob's Home",
  },
  {
    id: 'director',
    title: 'Director and Chair',
    persona: 'Rachel Moore · Greg Lawson',
    device: 'Laptop or tablet',
    homeQuestion: 'Is the club healthy, and where do I step in?',
    tabs: 'Club · Teams · Coaches · Players · Safeguarding · Reports',
    canSee: ["Every team, read-only", "Coaches' checks and courses", "Counts for wellness and growth"],
    cantSee: ["A child's wellness answers by name", "Changing a team's plan"],
    keyScreens: ["All teams", "Coaches and checks", "Board report"],
    ctaLabel: "Open Club · Overview",
  },
  {
    id: 'parent',
    title: 'Parent and player',
    persona: 'Linh and Mia Tran',
    device: 'Phone',
    homeQuestion: "When's the next game, and how am I going?",
    tabs: 'Home · Check-in · Goals · Clips',
    canSee: ["Their own child only", "Clips the coach shares", "Game days and \"can you make it?\""],
    cantSee: ["Other players' numbers", "Messaging other players"],
    keyScreens: ["Joining the team", "Can Mia make it?", "Wellness check-in"],
    ctaLabel: "Open Player · Home",
  },
]

const FOOTER_NOTES = [
  { title: 'One person, one login', body: 'Switch teams or roles from the team menu. Coach and fitness on one team? You get one combined Home.' },
  { title: 'The club sets the rules', body: "Directors choose what's filmed, what's kept and who sees it. Coaches work inside that." },
  { title: 'Kids come through a parent', body: "Under 15s join from a parent's account. Parents see their own child, never anyone else's." },
]

export default function SKRoles() {
  return (
    <div style={{ background: '#f5f7f5', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '32px 48px 28px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
          Wattle Creek FC · One club, five views
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 6 }}>
          Same club data.
        </div>
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>
          Each person sees the slice they need.
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          The coach views stay green. The club view uses the darker green and a Club label, so a director always knows they're looking across every team.
        </div>
      </div>

      {/* Role cards */}
      <div style={{ padding: '24px 32px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 16, minWidth: 1050 }}>
          {ROLES.map(role => (
            <div key={role.id} style={{ flex: 1, background: '#fff', borderRadius: 16, border: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

              {/* Card header */}
              <div style={{ background: GD, padding: '16px 18px' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{role.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{role.persona}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 600, letterSpacing: '0.05em' }}>{role.device.toUpperCase()}</div>
              </div>

              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>

                {/* Home question */}
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aada9', marginBottom: 4 }}>Home answers</div>
                  <div style={{ fontSize: 12, color: INK, lineHeight: 1.5, fontStyle: 'italic' }}>"{role.homeQuestion}"</div>
                </div>

                {/* Tabs */}
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aada9', marginBottom: 4 }}>Tabs</div>
                  <div style={{ fontSize: 11, color: MUT, lineHeight: 1.5 }}>{role.tabs}</div>
                </div>

                {/* Can / Can't see */}
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aada9', marginBottom: 6 }}>What they see</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {role.canSee.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize: 11, color: INK, lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                    {role.cantSee.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c39797" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        <span style={{ fontSize: 11, color: MUT, lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key screens */}
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aada9', marginBottom: 6 }}>Key screens</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {role.keyScreens.map((s, i) => (
                      <div key={i} style={{ fontSize: 11, color: '#2f6252', fontWeight: 600 }}>{s}</div>
                    ))}
                  </div>
                  <button style={{ marginTop: 10, width: '100%', height: 44, borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                    {role.ctaLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer notes */}
      <div style={{ padding: '0 32px 40px', display: 'flex', gap: 16 }}>
        {FOOTER_NOTES.map((note, i) => (
          <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 12, padding: '14px 16px', border: `1px solid ${LN}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 4 }}>{note.title}</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>{note.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
