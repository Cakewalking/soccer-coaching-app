import { useState } from 'react'
import { EmptyCard } from '../clubadmin/ui'

type ConsentVal = 'yes' | 'no' | 'waiting'

const PLAYERS: { ini: string; name: string; photos: ConsentVal; firstAid: ConsentVal; news: ConsentVal }[] = [
  { ini: 'IC', name: 'Ivy Chen',    photos: 'yes',     firstAid: 'yes',     news: 'yes' },
  { ini: 'MB', name: 'Max Bailey',  photos: 'yes',     firstAid: 'yes',     news: 'yes' },
  { ini: 'AK', name: 'Arlo Kaur',   photos: 'waiting', firstAid: 'yes',     news: 'waiting' },
  { ini: 'ZM', name: 'Zara Moore',  photos: 'yes',     firstAid: 'yes',     news: 'yes' },
  { ini: 'LW', name: 'Leo Wright',  photos: 'no',      firstAid: 'yes',     news: 'yes' },
  { ini: 'EN', name: 'Evie Nolan',  photos: 'yes',     firstAid: 'yes',     news: 'yes' },
  { ini: 'TS', name: 'Theo Santos', photos: 'yes',     firstAid: 'yes',     news: 'yes' },
  { ini: 'PD', name: 'Poppy Dunn',  photos: 'yes',     firstAid: 'yes',     news: 'no' },
  { ini: 'OH', name: 'Omar Haddad', photos: 'yes',     firstAid: 'yes',     news: 'yes' },
  { ini: 'JL', name: 'Jude Lim',   photos: 'yes',     firstAid: 'waiting', news: 'yes' },
]

function Badge({ val }: { val: ConsentVal }) {
  const cfg = {
    yes:     { label: 'Yes',     bg: '#2f6252', color: '#fff' },
    no:      { label: 'No',      bg: '#e9eae8', color: '#10211f' },
    waiting: { label: 'Waiting', bg: '#cbbeb5', color: '#10211f' },
  }[val]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: cfg.bg, color: cfg.color, whiteSpace: 'nowrap' as const }}>
      {cfg.label}
    </span>
  )
}

export default function ConsentMiniRoos({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  if (empty) return <EmptyCard icon="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" title="Parents answer when they join" desc="Each parent gets three yes-or-no questions when they add their child. Until they answer, it's treated as no." cta="Copy the team link" sidebarTitle="What parents are asked" items={[{ title: 'Team photos', desc: 'Can their child be in them?' }, { title: 'First-aid card', desc: 'Allergies and who to call' }, { title: 'Club news', desc: 'First name only' }]} />

  const waiting = PLAYERS.filter(p => p.photos === 'waiting' || p.firstAid === 'waiting' || p.news === 'waiting')
  const answered = PLAYERS.length - waiting.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Consent</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U9 Tom · {answered} of {PLAYERS.length} families have answered everything</span>
        </div>
        <button onClick={() => showToast('Reminder sent to 2 families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Remind 2 families</button>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px' }}>

        {/* Consent table */}
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 10, paddingBottom: 8 }}>
            {['Child', 'Team photos', 'First-aid card', 'First name in club news'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>{h}</span>
            ))}
          </div>

          {PLAYERS.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 50, borderTop: '1px solid #e9eae8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{p.ini}</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{p.name}</span>
              </span>
              <span><Badge val={p.photos} /></span>
              <span><Badge val={p.firstAid} /></span>
              <span><Badge val={p.news} /></span>
            </div>
          ))}

          <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 8 }}>Until a parent says yes, the answer is treated as no.</span>
        </section>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section style={{ flexShrink: 0, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Less to ask under 12</h2>
            <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>There's no filming, sensors or wellness check-in at this age, so parents are asked three things, not six.</span>
          </section>

          <section style={{ flexGrow: 1, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h2 style={{ margin: '0 0 0', fontSize: 17, fontWeight: 700 }}>Waiting on</h2>
            {waiting.map((p, i) => {
              const missing = [
                p.photos === 'waiting' && 'Photos',
                p.firstAid === 'waiting' && 'First-aid card',
                p.news === 'waiting' && 'Club news',
              ].filter(Boolean).join(' and ')
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: '1px solid #e9eae8' }}>
                  <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{p.ini}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{p.name}</span>
                    <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{missing}</span>
                  </span>
                </div>
              )
            })}
            <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 8 }}>Until a parent says yes, the answer is treated as no.</span>
          </section>
        </div>
      </main>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
