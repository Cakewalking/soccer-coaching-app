import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function HM10StaffMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Home' ? '#40826d' : 'transparent', color: t === 'Home' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Overview', 'Inbox', 'Calendar', 'Team staff'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Team staff' ? INK : MUT, borderBottom: t === 'Team staff' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Team staff</h1>
          <span style={{ fontSize: 14, color: MUT }}>U9 Tom · 3 adults · everyone needs a children check</span>
        </div>
        <button onClick={() => st('Opening invite form.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>+ Invite someone</button>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Who helps with this team</div>
          {[
            { init: 'TA', role: 'Head coach · you', note: 'Children check valid to Feb 2028', badge: 'Valid', badgeBg: G, badgeColor: '#fff' },
            { init: 'JF', role: 'Co-coach',         note: 'Sees everything you see',         badge: 'Valid', badgeBg: G, badgeColor: '#fff' },
            { init: 'KN', role: 'Team manager · Evie\'s mum', note: 'Who\'s coming, messages and the first-aid card', badge: 'Check due 30 Jun', badgeBg: '#cbbeb5', badgeColor: INK },
          ].map(s => (
            <div key={s.init} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{s.init}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{s.init === 'TA' ? 'Tom Albers' : s.init === 'JF' ? 'Jo Franklin' : 'Kim Nolan'} · <span style={{ fontWeight: 400 }}>{s.role}</span></div>
                <div style={{ fontSize: 13, color: MUT }}>{s.note}</div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: s.badgeBg, color: s.badgeColor, flexShrink: 0 }}>{s.badge}</div>
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: `1px solid ${LN}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>?</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Game leader this Saturday</div>
              <div style={{ fontSize: 13, color: MUT }}>Nobody yet. The club's young game leaders have been asked</div>
            </div>
            <button onClick={() => st('Sending another reminder.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Ask again</button>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 8, fontSize: 14, color: MUT }}>Kim's check runs out on 30 June. She's been reminded, and can't see player details after that until it's renewed.</div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Who sees what</div>
          {[
            { n: '1', label: 'Coaches',      note: 'Players, turns, notes and messages' },
            { n: '2', label: 'Team manager', note: "Who's coming, messages, first-aid card" },
            { n: '3', label: 'Game leader',  note: 'Only the game: time, ground, teams' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 30, height: 30, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 8, fontSize: 14, color: MUT }}>Under 12 there are no scores or fitness data, so there's less to share.</div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
