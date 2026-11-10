import { TILE, ActionRow, BadgeRow, SectionNote } from './shared'

export default function HelpTab({ onToast }: { onToast: (m: string) => void }) {
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <section style={TILE} aria-label="Get help">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Get help</h2>
        <ActionRow title="How-to guides" desc="Short step-by-step articles for every part of the app" label="Open" toast="Guides opened." onToast={onToast} />
        <ActionRow title="Talk to a person" desc="Message the Clean Sheet support team" label="Message us" toast="We usually reply within an hour." onToast={onToast} />
        <ActionRow title="Something looks wrong" desc="Send a screenshot and a description" label="Report" toast="Report sent. We'll follow up by email." onToast={onToast} />
        <ActionRow title="Replay the first-use tour" desc="Walk through the main features again" label="Replay" toast="Starting the tour." onToast={onToast} />
        <SectionNote text="For urgent player safety concerns, contact your club's welfare officer directly." />
      </section>

      <section style={TILE} aria-label="About">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>About</h2>
        <ActionRow title="What's new" desc="See what changed in recent updates" label="Read" toast="Release notes opened." onToast={onToast} />
        <ActionRow title="How numbers are worked out" desc="Wellness scores, game time, turn ratings" label="Open" toast="Opening methodology." onToast={onToast} />
        <ActionRow title="Privacy policy" desc="How Clean Sheet stores and uses your data" label="Read" toast="Privacy policy opened." onToast={onToast} />
        <BadgeRow title="Version" desc="All data on this screen is made up" badge="1.0 demo" />
        <SectionNote text="Clean Sheet is built for Australian community football. Some features vary by club or league." />
      </section>
    </main>
  )
}
