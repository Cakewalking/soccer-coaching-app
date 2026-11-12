import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

function DirNav({ active = 'Club' }: { active?: string }) {
  const tabs = ['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports']
  return (
    <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
      {tabs.map(t => (
        <div key={t} style={{ fontSize: 13, fontWeight: t === active ? 700 : 500, color: t === active ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
      ))}
      <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
    </div>
  )
}

function SettingsSidebar({ active }: { active: string }) {
  return (
    <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
      {['Club details', 'People and roles', 'Connections', 'Club rules', 'Plan', 'Partner academies'].map(item => (
        <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: item === active ? 700 : 500, color: item === active ? G : MUT, background: item === active ? PALE : 'transparent', borderLeft: item === active ? `3px solid ${G}` : '3px solid transparent', cursor: 'pointer' }}>{item}</div>
      ))}
    </div>
  )
}

// ─── DSet5 Club Plan ──────────────────────────────────────────────────────────

export function DSet5ClubPlan() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <DirNav active="Club" />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SettingsSidebar active="Plan" />
        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Plan</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>What the club is on, and what it costs</div>

          <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>Pilot club</div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20, background: PALE, color: G }}>Pilot · free until end of 2026 season</span>
            </div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Last game 22 Aug 2026 · no card on file · nothing to pay</div>

            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Included</div>
            {[
              { title: 'Every team and every role', desc: '14 teams · coaches, families, players and the committee' },
              { title: 'Match reviews and clips', desc: 'From any camera the club already owns' },
              { title: 'Set-up help', desc: 'A person to call, weekdays and Saturday mornings' },
              { title: 'Your data stays yours', desc: 'Download it or delete it at any time' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <span style={{ color: G, fontWeight: 700, flexShrink: 0 }}>✓</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>After the pilot</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>We'll tell the committee the price at least 60 days before the pilot ends. If it isn't for you, you leave with your data and owe nothing.</div>

            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What we ask in return</div>
            {[
              { n: 1, title: 'Honest feedback', desc: 'A short chat with two coaches each month' },
              { n: 2, title: 'A committee contact', desc: 'Greg Lawson, chair' },
              { n: 3, title: 'Tell us what\'s missing', desc: 'From any screen, under Help' },
            ].map(r => (
              <div key={r.n} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: G, flexShrink: 0 }}>{r.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => st('Opening contact form.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Talk to us about the plan</button>
            <button onClick={() => st('Opening pilot exit flow.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer' }}>Leave the pilot</button>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── DRo1 Rollover ─────────────────────────────────────────────────────────────

export function DRo1Rollover() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const teams = [
    { from: 'U7 Dan', to: 'U8 Dan' },
    { from: 'U8 Priya', to: 'U9 Priya' },
    { from: 'U9 Blue Mark', to: 'U10 Blue Mark' },
    { from: 'U9 Green Tom', to: 'U10 Green Tom' },
    { from: 'U10 Nadia', to: 'U11 Nadia' },
    { from: 'U12 Girls Ana', to: 'U13 Girls Ana' },
    { from: 'U12 Sam', to: 'U13 Sam' },
    { from: 'U13 Boys Chris', to: 'U14 Boys Chris' },
    { from: 'U13 Girls Meg', to: 'U14 Girls Meg' },
    { from: 'U14 Mixed', to: 'U15 Mixed' },
    { from: 'U15 Girls', to: 'U16 Girls' },
    { from: 'U16 Boys Ollie', to: 'Seniors — leaves juniors' },
    { from: 'Seniors — Ash', to: 'Seniors — Ash (stays)' },
  ]
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Teams' ? 700 : 500, color: t === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 220, background: '#fff', borderRight: `1px solid ${LN}`, padding: '12px 0' }}>
          {['All teams', 'Seniors', 'Fixtures', 'League sync', 'Grading', 'Referees', 'Cards', 'Kit and cameras', 'Next season'].map(item => (
            <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: item === 'Next season' ? 700 : 500, color: item === 'Next season' ? G : MUT, background: item === 'Next season' ? PALE : 'transparent', borderLeft: item === 'Next season' ? `3px solid ${G}` : '3px solid transparent', cursor: 'pointer' }}>{item}</div>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Next season</div>
              <div style={{ fontSize: 13, color: MUT }}>Roll every team up a year for 2027 · nothing changes until you press the button</div>
            </div>
            <button onClick={() => st('Starting 2027 season rollover.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Start 2027</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Teams · 13 move up · U16 Ollie finishes juniors</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ background: '#fafafa' }}>
                  <th style={{ padding: '10px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, textAlign: 'left' as const, borderBottom: `1px solid ${LN}` }}>This season</th>
                  <th style={{ padding: '10px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, textAlign: 'left' as const, borderBottom: `1px solid ${LN}` }}>Next season</th>
                  <th style={{ padding: '10px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, textAlign: 'left' as const, borderBottom: `1px solid ${LN}` }}>What changes</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${LN}` }}>
                    <td style={{ padding: '10px 20px', fontSize: 13, fontWeight: 600, color: INK }}>{t.from}</td>
                    <td style={{ padding: '10px 20px', fontSize: 13, color: G, fontWeight: 600 }}>{t.to}</td>
                    <td style={{ padding: '10px 20px', fontSize: 12, color: MUT }}>Players move up</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 20px', fontSize: 12, color: MUT, borderTop: `1px solid ${LN}` }}>Nothing changes until you press Start 2027. After that, existing season data stays in archive.</div>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}

export function DRo1eRolloverEmpty() {
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Teams' ? 700 : 500, color: t === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 220, background: '#fff', borderRight: `1px solid ${LN}`, padding: '12px 0' }}>
          {['All teams', 'Seniors', 'Fixtures', 'League sync', 'Grading', 'Referees', 'Cards', 'Kit and cameras', 'Next season'].map(item => (
            <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: item === 'Next season' ? 700 : 500, color: item === 'Next season' ? G : MUT, background: item === 'Next season' ? PALE : 'transparent', borderLeft: item === 'Next season' ? `3px solid ${G}` : '3px solid transparent', cursor: 'pointer' }}>{item}</div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ textAlign: 'center' as const, maxWidth: 420 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Season rollover isn't available yet</div>
            <div style={{ fontSize: 14, color: MUT }}>Rollover opens 60 days before the season ends. The current season runs until 22 Aug 2026.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
