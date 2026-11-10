import { TILE, ToggleRow, ActionRow, BadgeRow, SegmentRow, SectionNote } from './shared'

export default function DisplayTab({ onToast }: { onToast: (m: string) => void }) {
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <section style={TILE} aria-label="Reading">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Reading</h2>
        <SegmentRow title="Text size" desc="Changes headings, labels and body text" options={['Standard', 'Large', 'Largest']} active={0} />
        <ToggleRow title="Bright sunlight mode" desc="Stronger contrast for direct sun" on={false} />
        <ToggleRow title="Less movement" desc="Reduces animated transitions" on={false} />
        <ToggleRow title="Colour-blind friendly" desc="Uses shapes and labels alongside colour" on={true} />
        <SectionNote text="Text size changes take effect next time the app opens." />
      </section>

      <section style={TILE} aria-label="Language and units">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Language and units</h2>
        <ActionRow title="Language" desc="English" label="Change" toast="More languages are coming." onToast={onToast} />
        <BadgeRow title="Parents can read in" desc="Translated automatically in their app" badge="Automatic" />
        <SegmentRow title="Distance" desc="Metres and kilometres, or yards and miles" options={['Metric', 'Imperial']} active={0} />
        <SegmentRow title="Week starts on" desc="Calendar and planning views" options={['Monday', 'Sunday']} active={0} />
        <SectionNote text="Language changes apply to labels and system text, not names or notes you have typed." />
      </section>
    </main>
  )
}
