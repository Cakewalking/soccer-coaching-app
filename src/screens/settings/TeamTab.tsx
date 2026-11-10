import { TILE, ActionRow, BadgeRow, SectionNote } from './shared'

export default function TeamTab({ onToast }: { onToast: (m: string) => void }) {
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <section style={TILE} aria-label="Team">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Team</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 8 }}>
          {[
            { label: 'Team name', value: 'U12 Sam' },
            { label: 'Age group and format', value: 'U12 · Mixed · 9 a side, 2 × 30 minutes' },
            { label: 'Training', value: 'Tuesday and Thursday, 5:45 pm · Wattle Creek Oval' },
            { label: 'Fitness level', value: 'Play · set by age' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>{f.label}</span>
              <span style={{ minHeight: 48, border: '1px solid #c5c8c4', borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 15, background: '#fff' }}>{f.value}</span>
            </div>
          ))}
        </div>
        <SectionNote text="Age group and format come from the league, so a change here needs the club coordinator." />
      </section>

      <section style={TILE} aria-label="How the team runs">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>How the team runs</h2>
        <ActionRow title="Team staff" desc="Sam, Jess, Rob and Priya" label="Manage" toast="Managing team staff." onToast={onToast} />
        <ActionRow title="Our style" desc="Press high · build from the back" label="Change" toast="Opening style settings." onToast={onToast} />
        <BadgeRow title="Fair game time" desc="Equal time · set by the club" badge="Club rule" />
        <BadgeRow title="Heading in training" desc="No club policy chosen yet" badge="Club rule" />
        <ActionRow title="Team link for families" desc="17 of 17 families joined" label="Copy link" toast="Team link copied." onToast={onToast} />
        <ActionRow title="Hand the team to another coach" desc="They become head coach. You stay as co-coach or leave" label="Hand over" toast="Pick who takes over. They have to accept." onToast={onToast} />
        <SectionNote text="Club rules are set by the director of football and apply to every team." />
      </section>
    </main>
  )
}
