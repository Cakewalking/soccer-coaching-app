interface Props { onBack: () => void }

export default function GameDayPapersScreen({ onBack }: Props) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#f7f8f7', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', width: 390, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, padding: '14px 18px 12px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ flexGrow: 1 }}>
          <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>U13 Girls Meg · Sat 6 Jun · vs Northcote City</span>
          <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>Game-day papers</span>
        </span>
        <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</span>
      </div>

      {/* Content */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Pre-game checklist */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px' }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4a5a57', padding: '8px 0 4px' }}>Before you send the team sheet</span>
          {[
            { title: 'No one is suspended', sub: 'Checked against Dribl last night', done: true },
            { title: '1 player needs her letter', sub: 'Tess Nolan · playing down from U14', done: true },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: '1px solid #e9eae8' }}>
              <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '999px', background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
              </span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '20px', fontWeight: 700 }}>{item.title}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{item.sub}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Dispensation letter */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>TN</span>
            <span style={{ flexGrow: 1 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>Tess Nolan</span>
              <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>FV approval · 12 Mar 2026</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: '#2f6252', color: '#fff' }}>Approved</span>
          </span>
          {/* Letter preview (skeleton) */}
          <div style={{ border: '1px solid #c5c8c4', borderRadius: 10, background: '#f7f8f7', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }} aria-label="Approval letter preview">
            <span style={{ fontSize: 13, fontWeight: 700 }}>Dispensation letter</span>
            {[92, 84, 96, 60].map((w, i) => (
              <span key={i} style={{ display: 'block', height: 8, borderRadius: 4, background: '#e9eae8', width: `${w}%` }} />
            ))}
          </div>
          <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Show the referee</button>
        </div>

        <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', padding: '0 2px' }}>FV asks for the letter at every game. It stays on this phone, even with no signal.</span>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, padding: '10px 14px 12px', background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button style={{ height: 50, borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Send the team sheet</button>
        <button onClick={onBack} style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to game day</button>
      </div>
    </div>
  )
}
