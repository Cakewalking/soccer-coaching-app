import { TILE, ToggleRow, ActionRow, SectionNote } from './shared'

export default function NotificationsTab({ onToast }: { onToast: (m: string) => void }) {
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <section style={TILE} aria-label="Tell me when">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Tell me when</h2>
        <ToggleRow title="A player's check-in is low two days running" desc="Straight away" on={true} />
        <ToggleRow title="Match review is ready" desc="About 25 minutes after upload" on={true} />
        <ToggleRow title="Someone changes whether they're coming" desc="Bundled at 4 pm" on={true} />
        <ToggleRow title="A parent or coach messages you" desc="Straight away" on={true} />
        <ToggleRow title="Kit didn't sync" desc="Morning after" on={true} />
        <ToggleRow title="Weekly summary" desc="Sunday 6 pm" on={false} />
        <SectionNote text="Safety alerts, like a head knock or a concern, always come through." />
      </section>

      <section style={TILE} aria-label="How and when">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>How and when</h2>
        <ToggleRow title="On this tablet" desc="A banner and a dot on Home" on={true} />
        <ToggleRow title="On my phone" desc="Push notifications" on={true} />
        <ToggleRow title="By email" desc="Only the weekly summary" on={false} />
        <ActionRow title="Quiet hours" desc="9 pm to 7 am · safety alerts still come through" label="Change" toast="Pick your quiet hours." onToast={onToast} />
        <ToggleRow title="Game-day mode" desc="Only line-up, head knocks and weather on Saturdays" on={true} />
        <SectionNote text="Parents choose their own notifications. Nothing here changes what they get." />
      </section>
    </main>
  )
}
