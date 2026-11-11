const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const ORDER = [
  { ini: 'RB', name: 'Ruby Bell', status: 'done', t: '4.21' },
  { ini: 'IM', name: 'Isla Morgan', status: 'done', t: '4.09' },
  { ini: 'JP', name: 'Jai Patel', status: 'done', t: '4.17' },
  { ini: 'FW', name: 'Finn Walsh', status: 'current', t: null },
  { ini: 'LM', name: 'Leo Marsh', status: 'pending', t: null },
  { ini: 'MT', name: 'Mia Tran', status: 'pending', t: null },
  { ini: 'GO', name: 'Grace Owusu', status: 'pending', t: null },
  { ini: 'LA', name: 'Lily Avery', status: 'pending', t: null },
]

const Row = ({ p }: { p: typeof ORDER[0] }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 44, borderTop: `1px solid ${LN}`, background: p.status === 'current' ? PALE : undefined, borderRadius: p.status === 'current' ? 8 : undefined, padding: '0 4px' }}>
    <span style={{ width: 28, height: 28, borderRadius: '50%', background: p.status === 'done' ? G : p.status === 'current' ? PALE : '#e8edeb', border: p.status === 'current' ? `2px solid ${G}` : undefined, color: p.status === 'done' ? '#fff' : G, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</span>
    <span style={{ flex: 1, fontSize: 15, fontWeight: p.status === 'current' ? 700 : 500 }}>{p.name}</span>
    {p.status === 'done' && <span style={{ fontSize: 14, color: MUT, fontVariantNumeric: 'tabular-nums' }}>{p.t} s</span>}
    {p.status === 'current' && <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: G, color: '#fff' }}>Now</span>}
    {p.status === 'pending' && <span style={{ fontSize: 13, color: '#c5c8c4' }}>—</span>}
  </div>
)

export default function TL2TestMode(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 60, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1, fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>20 m sprint race · U12 Sam</div>
        <button style={{ height: 40, padding: '0 16px', borderRadius: 10, border: `1px solid rgba(255,255,255,0.3)`, background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Finish early</button>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '16px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 16 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 20, padding: '24px 28px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: MUT }}>NOW RUNNING</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 48, height: 48, borderRadius: '50%', background: PALE, color: G, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>FW</span>
            <span style={{ fontSize: 28, fontWeight: 700 }}>Finn Walsh</span>
          </div>
          <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: '-0.04em', color: GD, fontVariantNumeric: 'tabular-nums' }}>3.93<span style={{ fontSize: 32, fontWeight: 600, color: MUT }}>s</span></div>
          <div style={{ display: 'flex', gap: 12, fontSize: 14, color: MUT }}>
            <span>Go 2 of 2</span>
            <span>·</span>
            <span>Go 1 was 3.98 s</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Redo this go</button>
            <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Save · new best · next: Leo</button>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Running order</div>
          {ORDER.map((p, i) => <Row key={i} p={p} />)}
          <div style={{ marginTop: 'auto', fontSize: 13, color: MUT, paddingTop: 8 }}>2 goes each · best time recorded</div>
        </div>
      </div>
    </div>
  )
}
