interface Props {
  onAvailability: () => void
  onRaiseConcern: () => void
}

const THIS_WEEK = [
  { day: 'THU', title: 'Training',              note: '5:45 to 7:15 pm · Wattle Creek Oval · bring water',          bg: '#2f6252', color: '#fff'     },
  { day: 'SAT', title: 'vs Harbour Rovers',     note: 'Home · be there 8:40 for a 9:30 start · white kit',          bg: '#cbbeb5', color: '#10211f'  },
  { day: 'TUE', title: 'Goal chat with Sam',    note: '10 minutes after training · parents welcome',                 bg: '#eef5f2', color: '#2f6252'  },
]

const MINS_GAMES = [
  { label: 'Kes', h: 68 },
  { label: 'Bay', h: 74 },
  { label: 'Nor', h: 62 },
  { label: 'Sal', h: 71 },
  { label: 'Iro', h: 78 },
]

export default function ParentView({ onAvailability, onRaiseConcern }: Props) {
  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>

      <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12 · parent</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Mia's week</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>LT</div>
        </div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px 32px' }}>

        {/* Availability + duty row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <button onClick={onAvailability} style={{ padding: '14px', borderRadius: 14, border: '1.5px dashed #2f6252', background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#2f6252', marginBottom: 4 }}>CAN MIA MAKE IT?</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Tue 9 Jun training</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>Tap to answer</div>
          </button>
          <div style={{ padding: '14px', borderRadius: 14, border: '1px solid #e9eae8', background: '#fff' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#4a5a57', marginBottom: 4 }}>YOUR DUTY SATURDAY</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Canteen 10 to 11</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>Confirmed · from Rob</div>
          </div>
        </div>

        {/* This week */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>This week</div>
          {THIS_WEEK.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
              <span style={{ flex: 'none', padding: '5px 8px', borderRadius: 8, background: item.bg, color: item.color, fontSize: 11, fontWeight: 700 }}>{item.day}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', marginTop: 2 }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message from Rob */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>RO</span>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 4 }}>Rob, team manager · 7:12 pm</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', lineHeight: '21px' }}>Meet time now 8:40 on Saturday. We're on pitch 2.</div>
          </div>
          <button style={{ flex: 'none', height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Got it</button>
        </div>

        {/* Mia's minutes */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Mia's minutes</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '2px 8px' }}>Fair share every game</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60 }}>
            {MINS_GAMES.map((g, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: '#2f6252', borderRadius: '4px 4px 0 0', height: g.h * 0.56 }} />
                <div style={{ fontSize: 11, color: '#6f7f7b', fontWeight: 600 }}>{g.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Check-ins */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Check-ins</div>
          <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>Mia answered 9 of 10 this month. You can see her answers because she's under 15.</div>
        </div>

        {/* What's recorded */}
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 16, border: '1px solid #e9eae8', background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 20 }}>
          <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </span>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>What's recorded for Mia</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>5 of 6 on · change any time</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>

        <button onClick={onRaiseConcern} style={{ width: '100%', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: '#2f6252', cursor: 'pointer', textAlign: 'center' }}>
          Worried about something? Tell the club privately
        </button>
      </div>
    </div>
  )
}
