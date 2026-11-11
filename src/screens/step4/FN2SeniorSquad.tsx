const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const SQUAD = [
  { name: 'Daniel Costa', pos: 'Striker', min: '360', load: '1.42', checkin: 'Tired', reg: 'Registered', loadWarn: true },
  { name: 'Josh Barker', pos: 'Centre back', min: '360', load: '1.05', checkin: 'Good', reg: 'Registered', loadWarn: false },
  { name: 'Alex Nguyen', pos: 'Midfield', min: '312', load: '1.18', checkin: 'Good', reg: 'Registered', loadWarn: false },
  { name: 'Ryan Doyle', pos: 'Keeper', min: '360', load: '0.96', checkin: 'Good', reg: 'Registered', loadWarn: false },
  { name: 'Sam Okoro', pos: 'Winger', min: '145', load: '0.71', checkin: 'Sore hamstring', reg: 'Registered', loadWarn: false },
  { name: 'Luca Ferraro', pos: 'Midfield', min: '0', load: '—', checkin: '—', reg: 'Clearance pending', loadWarn: false },
  { name: 'Ben Harris', pos: 'Full back', min: '290', load: '1.12', checkin: 'Good', reg: 'Registered', loadWarn: false },
]

export default function FN2SeniorSquad({ mode }: { onBack?: () => void; mode?: 'registration' }) {
  const isReg = mode === 'registration'
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>Men's 1sts</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>NPL 3 · coach Marko Petrovic</div>
        <div style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Next: Sat 6 Jun vs Banksia Park SC · away</div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>{isReg ? 'Registration & clearances' : 'Squad load'}</div>
            <div style={{ fontSize: 13, color: MUT }}>{isReg ? '7 of 22 · window closes 30 Jun' : '7 of 22 shown · last 4 weeks'}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ background: PALE, borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: G }}>Games filmed: 9 of 9</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: G }}>Opposition clips: 14</div>
          </div>
        </div>

        {/* Reg warning */}
        <div style={{ background: isReg ? '#fff3cd' : '#fef2f2', border: `1px solid ${isReg ? '#ffc107' : '#f5c6c6'}`, borderRadius: 12, padding: isReg ? '12px 16px' : '10px 14px', marginBottom: 16, display: 'flex', gap: 10 }}>
          <div style={{ fontSize: isReg ? 14 : 13, fontWeight: isReg ? 700 : 400, color: isReg ? '#7a4f00' : '#c00' }}>Registration window closes 30 Jun · Luca Ferraro clearance pending</div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 100px 90px 90px 1fr 120px', fontSize: 11, fontWeight: 700, color: MUT, padding: '10px 20px', background: PALE }}>
            {['Player', 'Minutes', 'Load ratio', 'Check-in today', 'Note', 'Registration'].map((h, i) => (
              <div key={h} style={{ color: isReg && i === 5 ? INK : MUT }}>{h}</div>
            ))}
          </div>
          {SQUAD.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 100px 90px 90px 1fr 120px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 11, color: MUT }}>{p.pos}</div>
              </div>
              <div style={{ fontSize: 14, color: INK }}>{p.min}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: p.loadWarn ? '#c05' : (parseFloat(p.load) > 1.2 ? '#b78c00' : G) }}>{p.load}</div>
              <div style={{ fontSize: 13, color: p.checkin === 'Good' ? G : '#c05' }}>{p.checkin}</div>
              <div style={{ fontSize: 12, color: MUT }}>{p.name === 'Daniel Costa' ? 'Played every minute for 4 games' : ''}</div>
              <div style={{ fontSize: isReg ? 14 : 12, fontWeight: 600, color: p.reg === 'Registered' ? G : '#c05' }}>{p.reg}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, color: MUT, marginTop: 12 }}>{isReg ? 'Clearance pending means the player cannot be named in a matchday squad until the association confirms.' : "Load ratio is this week's training load against the last 4 weeks. It's a prompt to look, not an injury forecast."}</div>
      </div>
    </div>
  )
}
