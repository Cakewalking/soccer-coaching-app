import { TILE, ToggleRow, ActionRow, BadgeRow, SectionNote } from './shared'

// `inRecord`: shown inside the coach's Record tab, where the kit must read the same as the Record page beside it.
export default function DevicesTab({ onToast, inRecord }: { onToast: (m: string) => void; inRecord?: boolean }) {
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', alignItems: inRecord ? 'start' : undefined }}>
      <section style={TILE} aria-label="Connected">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Connected</h2>
        <BadgeRow title={inRecord ? 'Match camera · Kit 2' : 'Match camera · Kit 1'} desc={inRecord ? 'Battery 84% · last recording Sat 30 May' : 'Battery 96% · last recording Sat 30 May'} badge="Connected" badgeBg="#2f6252" badgeColor="#fff" />
        {inRecord && <BadgeRow title="Spare camera" desc="On charge in the kit room" badge="Charging" badgeBg="#eef5f2" badgeColor="#10211f" />}
        <ActionRow title="Boot sensors" desc="16 pairs · all synced Thursday" label="Sync now" toast="Hold the boots near the tablet." onToast={onToast} />
        <ActionRow title="GPS vests" desc="15 vests · 3 not synced" label="See who" toast="Checking vest sync status." onToast={onToast} />
        <BadgeRow title="This tablet" desc="Club tablet 2 · saved for offline use" badge="Ready" badgeBg="#2f6252" badgeColor="#fff" />
        <SectionNote text="Kit belongs to the club. The coordinator sees the same list for every team." />
      </section>

      <section style={TILE} aria-label="Set up">
        <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Set up</h2>
        <ActionRow title="Pair a new device" desc="Any camera, boots or a vest. Cameras with a live feed can stream straight in" label="Pair" toast="Looking for devices nearby." onToast={onToast} />
        <ActionRow title="Who wears what" desc="Assign boots and vests to players" label="Assign" toast="Pick a player, then a vest." onToast={onToast} />
        <ToggleRow title="Upload on wi-fi only" desc="Match video is large" on={true} />
        <ToggleRow title="Keep tonight's session offline" desc="So the plan works with no signal" on={true} />
        <ActionRow title="Forget a device" desc="Remove a lost vest or an old camera" label="Choose" toast="Pick the device to forget." onToast={onToast} />
        <SectionNote text="No camera? Training plans, turns and messages all work without one." />
      </section>
    </main>
  )
}
