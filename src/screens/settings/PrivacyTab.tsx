import { TILE, ActionRow, BadgeRow, SectionNote } from './shared'

export default function PrivacyTab({ onToast }: { onToast: (m: string) => void }) {
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <section style={TILE} aria-label="Your team's data">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>{"Your team's data"}</h2>
        <ActionRow title="Who can see what" desc="Coach, fitness, manager, parent, director" label="Role map" toast="Opening role map." onToast={onToast} />
        <ActionRow title="Consent by player" desc="16 agreed · 1 waiting" label="Open" toast="Opening consent." onToast={onToast} />
        <BadgeRow title="Full match video" desc="Deleted after 90 days · set by the club" badge="Club rule" />
        <ActionRow title="Export the team's season" desc="Plans, minutes and goals as a file. No wellness or growth" label="Export" toast="We'll email you the file within an hour." onToast={onToast} />
        <SectionNote text="Wellness answers and growth never leave the app, even in an export." />
      </section>

      <section style={TILE} aria-label="Your own data">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Your own data</h2>
        <ActionRow title="Download my data" desc="Everything Clean Sheet holds about you" label="Download" toast="We'll email you a copy within a day." onToast={onToast} />
        <ActionRow title="Sign-in history" desc="This tablet, and your phone" label="View" toast="2 devices signed in." onToast={onToast} />
        <ActionRow title="Leave this team" desc="Your plans stay with the team" label="Leave" toast="Pick who takes over first." onToast={onToast} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
          <span style={{ flexGrow: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>Delete my account</span>
            <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>Removes you. The team's data stays with the club</span>
          </span>
          <button onClick={() => onToast("Are you sure? We'll email you to confirm.")} style={{ flexShrink: 0, height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c39797', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#8a4f4f', whiteSpace: 'nowrap' as const }}>Delete</button>
        </div>
        <SectionNote text="Deleting your account keeps only what the law says the club must keep." />
      </section>
    </main>
  )
}
