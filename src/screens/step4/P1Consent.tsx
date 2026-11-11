import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = [
  { name: 'Mia Tran', filmed: true, sensor: true, checkins: true, growth: true, clips: true, socials: false, done: true },
  { name: 'Ruby Chen', filmed: true, sensor: true, checkins: true, growth: true, clips: true, socials: true, done: true },
  { name: 'Leo Marsh', filmed: true, sensor: true, checkins: true, growth: true, clips: false, socials: false, done: true },
  { name: 'Harper Quinn', filmed: false, sensor: false, checkins: false, growth: false, clips: false, socials: false, done: false },
  { name: 'Ella Brandt', filmed: true, sensor: true, checkins: true, growth: true, clips: true, socials: false, done: true },
]

export default function P1Consent(_: { onBack?: () => void }) {
  const [_tab, setTab] = useState('Players')

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy'].map(t => (
          <div key={t} onClick={() => setTab(t)} style={{ fontSize: 13, fontWeight: t === 'Consent and privacy' ? 700 : 500, color: t === 'Consent and privacy' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ padding: '32px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Consent and privacy</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>What parents have agreed to for each player</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            {/* Player table */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '160px repeat(6,1fr) 80px', fontSize: 11, fontWeight: 700, color: MUT, padding: '10px 16px', background: PALE, textAlign: 'center' as const }}>
                <div style={{ textAlign: 'left' as const }}>Player</div>
                {['Filmed', 'Sensors', 'Check-ins', 'Growth', 'Clips', 'Socials'].map(h => <div key={h}>{h}</div>)}
                <div></div>
              </div>
              {PLAYERS.map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px repeat(6,1fr) 80px', padding: '10px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center', textAlign: 'center' as const, background: !p.done ? '#fef2f2' : '#fff' }}>
                  <div style={{ textAlign: 'left' as const, fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</div>
                  {[p.filmed, p.sensor, p.checkins, p.growth, p.clips, p.socials].map((v, j) => (
                    <div key={j}>
                      {p.done ? (
                        <div style={{ width: 20, height: 20, borderRadius: 6, background: v ? G : LN, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                          {v && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      ) : (
                        <div style={{ fontSize: 11, color: '#c05' }}>Waiting</div>
                      )}
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: MUT }}>See history</div>
                </div>
              ))}
            </div>

            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 13, color: GD }}>Only parents can change these. Coaches can ask, but can't switch anything on.</div>
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Club settings</div>
              {[
                ['Who can see clips', 'Coaches only'],
                ['Blur faces outside coaches', 'On'],
                ['Blur the other team', 'Always'],
                ['Delete full video', 'After 90 days'],
                ['Downloads', 'Off'],
                ['Stored in', 'Australia'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 12, color: MUT }}>{k}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>Not started</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#c05' }}>Harper Quinn</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>Her parents were reminded twice. Until they answer, Harper is blurred in every clip.</div>
              <button style={{ width: '100%', height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Remind again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
