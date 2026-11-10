import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const MONTHS = ['FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','JAN']
const SEASON_MONTHS = [false, true, true, false, false, true, true, true, true, true, false, false] // season months highlighted

const COMPARE = [
  { label: 'Home shows',       preSeason: 'A set-up checklist and weeks to round 1', season: 'This week, last game, what needs you',    postSeason: 'End-of-season jobs and next year',      rest: 'A quiet screen' },
  { label: 'Suggestions aim at', preSeason: 'Fitness base and the playing style',     season: 'What games and training show',              postSeason: 'Fun, small-sided and futsal',           rest: 'Nothing' },
  { label: 'Reminders',        preSeason: 'Consent, kit, registration',               season: "Who's coming, check-ins",                   postSeason: 'Reviews, kit return, coming back?',     rest: 'None' },
  { label: 'Numbers count',    preSeason: 'Baselines only',                           season: 'Yes',                                       postSeason: 'Shown apart from the season',           rest: 'Nothing measured' },
]

export default function SP1FootballYear({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [_sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>The football year</div>
          <div style={{ fontSize: 14, color: MUT }}>U12 Sam · dates set by Wattle Creek FC, you can adjust yours</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setSheet('spdates')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Change dates</button>
          <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>See what the club does</button>
        </div>
      </div>

      {/* Timeline card */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: MUT, fontWeight: 600, marginBottom: 12 }}>2026 · Today, Thu 4 Jun · in season, round 9 of 18</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { phase: 'Pre-season',  dates: '2 Feb to 10 Apr' },
            { phase: 'Season',      dates: '11 Apr to 30 Aug', active: true },
            { phase: 'Post-season', dates: '31 Aug to 29 Nov' },
            { phase: 'Rest month',  dates: 'December' },
          ].map(p => (
            <div key={p.phase} style={{ padding: '10px 14px', borderRadius: 10, background: p.active ? PALE : '#f7f8f7', border: `1px solid ${p.active ? '#b0ccc5' : '#e5e6e4'}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.active ? G : INK }}>{p.phase}</div>
              <div style={{ fontSize: 12, color: MUT }}>{p.dates}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 2 }}>
          {MONTHS.map((m, i) => (
            <div key={m} style={{ textAlign: 'center' as const, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: SEASON_MONTHS[i] ? '#fff' : MUT, padding: '4px 2px', borderRadius: 4, background: SEASON_MONTHS[i] ? G : '#f0f1ef' }}>{m}</div>
          ))}
        </div>
      </div>

      {/* What changes table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>What changes in each part of the year</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr 1fr' }}>
          <div style={{ background: '#f7f8f7' }} />
          {['Pre-season','Season','Post-season','Rest month'].map(h => (
            <div key={h} style={{ padding: '8px 14px', background: '#f7f8f7', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: h === 'Season' ? G : MUT, borderLeft: `1px solid ${LN}` }}>{h}</div>
          ))}
        </div>
        {COMPARE.map(row => (
          <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr 1fr', borderTop: `1px solid ${LN}` }}>
            <div style={{ padding: '12px 14px', fontSize: 12, fontWeight: 700, color: MUT, background: '#f7f8f7', lineHeight: 1.3 }}>{row.label}</div>
            {[row.preSeason, row.season, row.postSeason, row.rest].map((v, j) => (
              <div key={j} style={{ padding: '12px 14px', fontSize: 13, color: INK, lineHeight: 1.4, borderLeft: `1px solid ${LN}` }}>{v}</div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginBottom: 16 }}>Clean Sheet moves to the next part by itself on the date. You get a heads-up a week before.</div>

      {/* Open each part */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
        {[
          { title: 'Pre-season',  sub: 'Home in March' },
          { title: 'Post-season', sub: 'Home in October' },
          { title: 'Rest month',  sub: 'Home in December' },
        ].map(item => (
          <div key={item.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{item.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
            </div>
            <button onClick={() => t(`Opening ${item.title} view`)} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Open</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>Why a rest month</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Football Australia's youth guidelines ask for at least one month a year off structured football. MiniRoos and seniors have their own dates.</div>
      </div>

      {/* Dates card */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Dates for the football year</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 10 }}>
          {[
            { label: 'Pre-season starts', val: '2 February' },
            { label: 'Round 1',           val: '11 April' },
            { label: 'Last game',         val: '30 August' },
            { label: 'Rest month',        val: 'December' },
          ].map(r => (
            <div key={r.label} style={{ padding: '10px 14px', borderRadius: 10, background: '#f7f8f7', border: `1px solid #e5e6e4` }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{r.val}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button onClick={() => t('Dates saved. Home changes on each date.')} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save dates</button>
          <button onClick={() => setSheet(null)} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
