import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const COACHES = [
  { name: 'Dan Walsh', team: 'U7', training: 'Mon', check: 'Valid', sessions: 8, reviewed: 5 },
  { name: 'Hannah Lee', team: 'U8', training: 'Wed', check: 'Valid', sessions: 10, reviewed: 7 },
  { name: 'Mark Davis', team: 'U9', training: 'Tue', check: 'Valid', sessions: 9, reviewed: 4 },
  { name: 'Tom Ellis', team: 'U9', training: 'Thu', check: 'Valid', sessions: 7, reviewed: 6 },
  { name: 'Nadia Chen', team: 'U10', training: 'Wed', check: 'Valid', sessions: 11, reviewed: 8 },
  { name: 'Kate Morris', team: 'U11 Girls', training: 'Tue', check: 'Valid', sessions: 10, reviewed: 9 },
  { name: 'Luke Park', team: 'U11', training: 'Thu', check: 'Valid', sessions: 8, reviewed: 5 },
  { name: 'Sam Nguyen', team: 'U12', training: 'Mon', check: 'Valid', sessions: 12, reviewed: 10 },
  { name: 'Chris Pham', team: 'U13', training: 'Wed', check: '9 days', sessions: 11, reviewed: 7, warn: true },
]
export default function D3Coaches(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState('Chris Pham')
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  const sel = COACHES.find(c => c.name === selected)!
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Coaches' ? 700 : 500, color: tab === 'Coaches' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>All coaches</div>
              <div style={{ fontSize: 13, color: MUT }}>9 coaches · Wattle Creek FC</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setSheet('joinreq')} style={{ height: 36, padding: '0 14px', borderRadius: 9, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Join request</button>
              <button onClick={() => setSheet('invite')} style={{ height: 36, padding: '0 14px', borderRadius: 9, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Invite coach</button>
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 80px 80px 1fr 100px 100px', gap: 8, padding: '8px 16px', fontSize: 11, fontWeight: 700, color: MUT, background: PALE }}>
              {['Coach', 'Team', 'Training', 'Children check', 'Sessions', 'Reviewed'].map(h => <div key={h}>{h}</div>)}
            </div>
            {COACHES.map(c => (
              <div key={c.name} onClick={() => setSelected(c.name)} style={{ display: 'grid', gridTemplateColumns: '160px 80px 80px 1fr 100px 100px', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center', cursor: 'pointer', background: selected === c.name ? PALE : '#fff' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{c.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{c.team}</div>
                <div style={{ fontSize: 12, color: MUT }}>{c.training}</div>
                <div style={{ fontSize: 12, fontWeight: c.warn ? 700 : 400, color: c.warn ? '#c00' : G }}>{c.warn ? `Ends in ${c.check}` : '✓ Valid'}</div>
                <div style={{ fontSize: 12, color: MUT }}>{c.sessions} planned</div>
                <div style={{ fontSize: 12, color: MUT }}>{c.reviewed} games</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '18px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 2 }}>{sel.name}</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 14 }}>{sel.team} · trains {sel.training}</div>
            {[{ label: 'Sessions planned', val: `${sel.sessions}` }, { label: 'Games reviewed', val: `${sel.reviewed}` }, { label: 'Children\'s check', val: sel.warn ? `Expires in ${sel.check}` : '✓ Valid', red: sel.warn }].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}`, fontSize: 13 }}>
                <span style={{ color: MUT }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: s.red ? '#c00' : INK }}>{s.val}</span>
              </div>
            ))}
            <button onClick={() => t(`Message sent to ${sel.name.split(' ')[0]}.`)} style={{ width: '100%', height: 38, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 14 }}>Message {sel.name.split(' ')[0]}</button>
            {sel.warn && <button onClick={() => t('Reminder sent.')} style={{ width: '100%', height: 38, borderRadius: 10, border: 0, background: '#c00', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>Send check reminder</button>}
          </div>
        </div>
      </div>
      {sheet && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: 380 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>{sheet === 'invite' ? 'Invite a coach' : 'Join request'}</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>{sheet === 'invite' ? 'They\'ll get an email to join Wattle Creek FC.' : 'Review a pending request to join.'}</div>
            <input placeholder={sheet === 'invite' ? 'Email address' : 'Request ID'} style={{ width: '100%', height: 38, borderRadius: 8, border: `1px solid ${LN}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, boxSizing: 'border-box' as const, marginBottom: 14 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setSheet(null)} style={{ flex: 1, height: 40, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(null); t(sheet === 'invite' ? 'Invite sent.' : 'Request reviewed.') }} style={{ flex: 1, height: 40, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{sheet === 'invite' ? 'Send invite' : 'Approve'}</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
