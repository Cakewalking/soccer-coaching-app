interface Props { onBack: () => void }

const CHECKLIST = [
  { title: 'Water at the bench for both teams', sub: 'FV asks for drinks to be on hand', done: true },
  { title: 'Ask the referee about drinks breaks', sub: "It's the referee's call · Dana says one each half", done: true },
  { title: 'Shade for the subs', sub: 'Club gazebo is in the kit room', done: false },
  { title: 'Short warm-up', sub: '10 minutes, in the shade if you can', done: false },
]

export default function HeatScreen({ onBack }: Props) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#f7f8f7', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', width: 390, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, padding: '14px 18px 12px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ flexGrow: 1 }}>
          <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>U12 Sam · Sat 14 Mar · grading game</span>
          <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>Hot day</span>
        </span>
        <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</span>
      </div>

      {/* Content */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Temperature card */}
        <div style={{ background: '#fff', border: '2px solid #c39797', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 40, lineHeight: '44px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>34°</span>
          <span>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 700 }}>Forecast for 10:00 kick-off</span>
            <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Football Victoria's heat rule starts at 32°. Bureau forecast, checked 7:00 am.</span>
          </span>
        </div>

        {/* Checklist */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px' }}>
          {CHECKLIST.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
              <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '999px', background: item.done ? '#2f6252' : 'transparent', border: item.done ? 'none' : '2px solid #c5c8c4', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                {item.done && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>}
              </span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '20px', fontWeight: 700 }}>{item.title}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{item.sub}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Tablet note */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Sam's tablet has changed too</span>
          <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Subs are suggested every 8 minutes, not 12. Sprint limits drop for Noah and Zoe.</span>
        </div>

        <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', padding: '0 2px' }}>Dizzy, confused, stopped sweating or vomiting: get them into shade, cool them down and call 000.</span>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, padding: '10px 14px 12px', background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button style={{ height: 50, borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tell families to bring extra water</button>
        <button onClick={onBack} style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to game day</button>
      </div>
    </div>
  )
}
