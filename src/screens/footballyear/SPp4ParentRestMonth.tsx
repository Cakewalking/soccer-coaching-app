const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SPp4ParentRestMonth(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative', margin: '0 auto' }}>
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>9:41</div>
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        {/* Header */}
        <div style={{ background: G, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Wattle Creek FC U12 Sam</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>Rest month — December</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>No training or games until February</div>
        </div>

        {/* Message from Sam */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>From Sam (Head coach)</div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>What a year. Training is done and we won't have any scheduled football until February. The research on growing athletes is pretty clear: a few weeks completely away from organised sport each year is one of the best things for long-term development. So please, don't sign them up for a holiday clinic just to keep them busy — a rest actually works. We'll be in touch in January about registration for 2027. Happy holidays to all families.</div>
        </div>

        {/* Rest note for Mia */}
        <div style={{ background: '#fff3d6', border: `1px solid #e8d4a0`, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6b5a1a', marginBottom: 4 }}>Mia's break check</div>
          <div style={{ fontSize: 13, color: '#7a6a2a', lineHeight: 1.5 }}>She played outdoor, indoor and the Summer Cup. That means December is her four weeks off — the app will confirm her break is complete by end of December.</div>
        </div>

        {/* Back in January */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Back in January</div>
          <div style={{ fontSize: 13, color: MUT }}>Registration for 2027 opens. Sam will send a message when it's ready.</div>
        </div>
      </div>

    </div>
  )
}
