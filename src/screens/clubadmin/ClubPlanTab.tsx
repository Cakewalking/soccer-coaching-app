import { useState } from 'react'
import { EmptyCard, FOOTER_DEFAULT } from './ui'

export default function ClubPlanTab({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  if (empty) return <EmptyCard icon="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5" title="No season dates yet" desc="Add your season start and Clean Sheet lays out grading, tests, courses and registrations across the year." cta="Set season dates" items={[{ title: 'The year on one line', desc: 'By age group' }, { title: "What's coming up", desc: 'In the next month' }]} footer={FOOTER_DEFAULT} />

  return (
    <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16 }}>

      {/* Plan card */}
      <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 16, background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5 9-10"/>
            </svg>
          </span>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>Pilot · free until the end of the 2026 season</div>
            <span style={{ fontSize: 15, color: '#4a5a57' }}>Last game 22 Aug 2026 · no card on file · nothing to pay</span>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', borderRadius: '999px', fontSize: 13, fontWeight: 700, background: '#2f6252', color: '#fff', whiteSpace: 'nowrap' as const }}>Pilot club</span>
        </div>

        <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '12px 14px', fontSize: 14, lineHeight: '20px', marginTop: 'auto' }}>
          <strong>After the pilot.</strong> We'll tell the committee the price at least 60 days before the pilot ends. If it isn't for you, you leave with your data and owe nothing.
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button onClick={() => showToast('We\'ll call Greg this week.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Talk to us</button>
          <button onClick={() => showToast('Leaving needs two club admins to confirm.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#4a5a57' }}>Leave the pilot</button>
        </div>
      </section>

      {/* What we ask */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 10px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700 }}>What we ask in return</h2>
        {[
          { n: '1', title: 'Honest feedback', desc: 'A short chat with two coaches each month' },
          { n: '2', title: 'A committee contact', desc: 'Greg Lawson, chair' },
          { n: '3', title: 'Tell us what\'s missing', desc: 'From any screen, under Help' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.n}</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{r.title}</span>
              <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{r.desc}</span>
            </span>
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>What's coming next</div>
          {[
            'Older player app (15+)',
            'Referee and game leader tools',
            'Season-end review for the committee',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              <span style={{ fontSize: 14, color: '#4a5a57' }}>{item}</span>
            </div>
          ))}
        </div>
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
