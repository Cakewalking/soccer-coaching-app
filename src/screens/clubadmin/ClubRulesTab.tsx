import { useState } from 'react'
import { EmptyCard } from './ui'

type RuleStatus = 'on' | 'needs-you' | 'off'

const CLUB_RULES: { title: string; desc: string; status: RuleStatus; detail?: string }[] = [
  { title: 'Fair game time', desc: 'Everyone gets close to equal minutes', status: 'on', detail: 'Coaches track it; the app flags if someone falls behind.' },
  { title: 'Goal turns', desc: 'Rotate who goes in goal each game', status: 'on', detail: 'The game-day turns list includes goal. Applied to all teams with a goal.' },
  { title: 'Youngest age for filming', desc: 'Under 12 — parents have confirmed', status: 'needs-you', detail: 'Pick the youngest age that can be filmed. It can\'t go below U12.' },
  { title: 'Wellness check-in', desc: 'Player rates effort and mood after each session', status: 'on' },
  { title: 'Parent messaging', desc: 'Families contact the coach through the app, not by personal number', status: 'on' },
  { title: 'Player data on leaving', desc: '4 families haven\'t confirmed the data policy yet', status: 'needs-you', detail: 'This one follows the club\'s child-safe policy.' },
]

const LEAGUE_RULES = [
  { n: '1', title: 'No scores under 12', desc: 'MiniRoos keep no results or ladders' },
  { n: '2', title: 'Head knocks', desc: 'Under 19s: no games for at least 21 days' },
  { n: '3', title: 'Hot days', desc: 'Football Victoria\'s heat rule' },
  { n: '4', title: 'Children checks', desc: 'Needed before anyone sees player data' },
]

function StatusBadge({ status }: { status: RuleStatus }) {
  if (status === 'on') return <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: '#eef5f2', color: '#2f6252' }}>On</span>
  if (status === 'needs-you') return <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: '#cbbeb5', color: '#10211f' }}>Needs you</span>
  return <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: '#e9eae8', color: '#4a5a57' }}>Off</span>
}

export default function ClubRulesTab({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  if (empty) return <EmptyCard icon="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" title="Start with fair game time" desc="Pick how minutes are shared at each age. Every coach's line-up then follows it without you checking." cta="Set fair game time" sidebarTitle="Already built in" sidebarBody="League rules are on from day one: no scores under 12, the head-knock rule, the heat rule and children checks." />

  return (
    <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 16, minHeight: 0 }}>

      {/* Club rules */}
      <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 20px 10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Rules the club sets</h2>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>6 rules · 2 need you</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.4fr 100px', gap: 10, padding: '8px 0' }}>
          {['Rule', 'What it does', 'Status'].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>{h}</span>
          ))}
        </div>

        {CLUB_RULES.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.4fr 100px', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8' }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{r.title}</span>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>{r.desc}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusBadge status={r.status} />
              {r.detail && (
                <button onClick={() => showToast(r.detail!)} style={{ width: 28, height: 28, borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5a57', fontFamily: 'inherit', fontWeight: 700, fontSize: 14 }}>→</button>
              )}
            </span>
          </div>
        ))}

        <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginTop: 'auto', paddingTop: 8 }}>
          A coach can't switch a club rule off. Changing one emails every coach, and families where it affects them.
        </span>
      </section>

      {/* League rules */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700 }}>Set by the league, not you</h2>
        {LEAGUE_RULES.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '999px', background: '#e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.n}</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{r.title}</span>
              <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{r.desc}</span>
            </span>
          </div>
        ))}
        <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginTop: 'auto', paddingTop: 8 }}>These are built in and update when the league changes them.</span>
      </aside>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' as const }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
