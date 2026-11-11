import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TEAMS = [
  { team: 'U12 Sam',       coach: 'Sam K',   jobs: 5, total: 7, status: 'On track' },
  { team: 'U12 Girls Ana', coach: 'Ana R',   jobs: 7, total: 7, status: 'Ready' },
  { team: 'U12 Luke',      coach: 'To confirm', jobs: 2, total: 7, status: 'Needs a coach' },
  { team: 'U13 Chris',     coach: 'Chris D', jobs: 4, total: 7, status: 'On track' },
  { team: 'U9 Tom',        coach: 'Tom Albers', jobs: 3, total: 4, status: 'On track' },
  { team: 'U14 Josh',      coach: 'Josh P',  jobs: 3, total: 7, status: 'Behind' },
]

export default function SP18ClubPhases(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const statusColor = (s: string) => s === 'Ready' ? G : s === 'Behind' ? '#c35b5b' : s === 'Needs a coach' ? '#8b7a3a' : MUT

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Director of football</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>The football year</div>
          <div style={{ fontSize: 14, color: MUT }}>Wattle Creek FC · Thu 12 March · pre-season</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setSheet('spdates')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Change the dates</button>
          <button onClick={() => t('Nudge sent to the coaches of U12 Luke and U14 Josh.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Nudge teams that are behind</button>
        </div>
      </div>

      {/* Season dates bar */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: MUT, fontWeight: 600, marginBottom: 8 }}>Juniors, under 12 to under 18 · MiniRoos and seniors have their own dates</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {[
            { phase: 'Pre-season',  dates: '2 Feb to 10 Apr', active: true },
            { phase: 'Season',      dates: '11 Apr to 30 Aug' },
            { phase: 'Post-season', dates: '31 Aug to 29 Nov' },
            { phase: 'Rest month',  dates: 'December' },
          ].map(p => (
            <div key={p.phase} style={{ padding: '8px 12px', borderRadius: 8, background: p.active ? PALE : '#f7f8f7', border: `1px solid ${p.active ? '#b0ccc5' : '#e5e6e4'}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.active ? G : INK }}>{p.phase}</div>
              <div style={{ fontSize: 11, color: MUT }}>{p.dates}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Teams table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Ready for round 1</div>
          <div style={{ fontSize: 13, color: MUT }}>6 of 14 teams shown</div>
        </div>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', padding: '8px 16px', background: '#f7f8f7', borderBottom: `1px solid ${LN}` }}>
          {['Team','Coach','Pre-season jobs',''].map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
          ))}
        </div>
        {TEAMS.map(team => (
          <div key={team.team} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', padding: '12px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{team.team}</div>
            <div style={{ fontSize: 14, color: MUT }}>{team.coach}</div>
            <div style={{ fontSize: 14, color: INK, marginRight: 20 }}>{team.jobs} of {team.total}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: statusColor(team.status) }}>{team.status}</div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', background: '#f9faf9', fontSize: 12, color: MUT }}>Each team's jobs are its coach's checklist.</div>
      </div>

      {/* Who does what */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Who does what in pre-season</div>
          <button onClick={() => setSheet('spjobs')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Other parts of the year</button>
        </div>
        {[
          { badge: 'D', role: 'Director',         desc: 'Dates, trial rules, coaches for every team' },
          { badge: 'C', role: 'Coordinator',       desc: 'Registrations, kit order, pitch bookings, tournament entries' },
          { badge: 'C', role: 'Coach',             desc: 'Squad, tests, friendlies, grading scores' },
          { badge: 'T', role: 'Team manager',      desc: 'Families, consent, the duty roster' },
          { badge: 'W', role: 'Welfare officer',   desc: "Children checks renewed before the first session" },
        ].map(r => (
          <div key={r.role} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: G }}>{r.badge}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.role}</div>
              <div style={{ fontSize: 13, color: MUT }}>{r.desc}</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 12, color: MUT, marginTop: 10 }}>Each role sees its own list on its Home. This is the whole picture.</div>
      </div>

      {/* Dates sheet */}
      {sheet === 'spdates' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 500, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Dates for the football year</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>U12 Sam · the club's dates are filled in</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t('Dates saved. Home changes on each date.'); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save dates</button>
            <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {sheet === 'spjobs' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 540, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>Who does what, the rest of the year</div>
          {[
            { phase: 'Season',      desc: 'Coach: weekly plan and reviews. Manager: who\'s coming and the roster. Director: regrades at halfway' },
            { phase: 'Post-season', desc: 'Coach: player reviews, who\'s coming back. Coordinator: kit back, tournament entries. Director: trial dates, coaches for next year' },
            { phase: 'Rest month',  desc: 'Nobody. The roll-over to next year happens on 1 January' },
          ].map(r => (
            <div key={r.phase} style={{ padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 2 }}>{r.phase}</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{r.desc}</div>
            </div>
          ))}
          <button onClick={() => { t('Closed.'); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 14 }}>Done</button>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
