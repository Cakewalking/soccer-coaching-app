import { TILE, ActionRow, BadgeRow, SectionNote } from './shared'

export default function AccountTab({ onToast }: { onToast: (m: string) => void }) {
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <section style={TILE} aria-label="You">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>You</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 8 }}>
          {[
            { label: 'Name', value: 'Sam Kelly' },
            { label: 'Email', value: 'sam.kelly@example.com' },
            { label: 'Mobile', value: '0412 555 014' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>{f.label}</span>
              <span style={{ minHeight: 48, border: '1px solid #c5c8c4', borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 15, background: '#fff' }}>{f.value}</span>
            </div>
          ))}
        </div>
        <SectionNote text="Your name shows to families and staff. Your email and mobile show only to the club." />
      </section>

      <section style={TILE} aria-label="Signing in and checks">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Signing in and checks</h2>
        <ActionRow title="Password" desc="Changed 3 months ago" label="Change" toast="We've emailed you a link to change it." onToast={onToast} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
          <span style={{ flexGrow: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>Two-step sign-in</span>
            <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>A code by text when you sign in on a new device</span>
          </span>
          <span style={{ flexShrink: 0, width: 52, height: 32, borderRadius: '999px', background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 3, boxSizing: 'border-box' as const }}><span style={{ width: 26, height: 26, borderRadius: '999px', background: '#fff' }} /></span>
        </div>
        <BadgeRow title="Working with Children Check" desc="Valid to Mar 2028 · reminder 60 days before" badge="Valid" badgeBg="#2f6252" badgeColor="#fff" />
        <ActionRow title="Your roles" desc="Head coach, U12 Sam · parent of no players" label="Switch view" toast="Switching view." onToast={onToast} />
        <ActionRow title="Sign out of this tablet" desc="The club tablet signs out after 30 minutes idle" label="Sign out" toast="Signing out." onToast={onToast} />
        <SectionNote text="If your children check runs out, Clean Sheet hides player data until it's renewed." />
      </section>
    </main>
  )
}
