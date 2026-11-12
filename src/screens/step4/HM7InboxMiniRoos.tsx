import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const MESSAGES = [
  { init: 'SA', bg: '#cbbeb5', from: 'Saturday', when: 'Today',     subject: "2 families haven't said if they're coming", unread: true },
  { init: 'RF', bg: '#c39797', from: 'Referees',  when: 'Yesterday', subject: 'Saturday still needs a game leader',         unread: true },
  { init: 'SH', bg: '#e9eae8', from: "Sami Haddad · Omar's dad", when: 'Mon', subject: "Omar's away this week", active: true },
  { init: 'BR', bg: '#e9eae8', from: 'Bianca Rossi · club',       when: 'Mon', subject: 'Photo day is Saturday 20 June' },
]

export default function HM7InboxMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Home' ? '#40826d' : 'transparent', color: t === 'Home' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Overview', 'Inbox', 'Calendar', 'Team staff'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Inbox' ? INK : MUT, borderBottom: t === 'Inbox' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Inbox</h1>
          <span style={{ fontSize: 14, color: MUT }}>U9 Tom · 2 new · 4 this week</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => st('Opening family chat.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Family chat</button>
          <button onClick={() => st('Opening message to all families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Message all families</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: '400px minmax(0, 1fr)' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px 10px' }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>This week</div>
          </div>
          {MESSAGES.map(m => (
            <div key={m.subject} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minHeight: 72, padding: '10px 16px', borderTop: `1px solid ${LN}`, background: m.active ? PALE : 'transparent', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{m.init}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: MUT, gap: 8 }}><span>{m.from}</span><span>{m.when}</span></div>
                <div style={{ fontSize: 15, fontWeight: m.unread ? 700 : 600, color: INK, marginTop: 2 }}>{m.subject}</div>
              </div>
              {m.unread && <div style={{ width: 10, height: 10, borderRadius: 999, background: '#40826d', marginTop: 6, flexShrink: 0 }} />}
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '12px 16px', fontSize: 14, color: MUT }}>Parents message you here, not on your own phone number.</div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>SH</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 700 }}>Omar's away this week</div>
              <div style={{ fontSize: 14, color: MUT }}>Sami Haddad, Omar's dad · Monday 7:40 pm</div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: '#e9eae8', color: INK }}>Marked away</div>
          </div>

          <div style={{ alignSelf: 'flex-start', maxWidth: 520, background: '#f0f1ef', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', fontSize: 15, lineHeight: '22px' }}>
            Hi Tom, Omar's at his grandparents' this week so he'll miss Tuesday and Saturday. Back next week. He's keen for his turn in goal!
          </div>

          <div style={{ alignSelf: 'flex-end', maxWidth: 520, background: G, color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '12px 14px', fontSize: 15, lineHeight: '22px' }}>
            Thanks Sami. I've marked him away. He's first in goal when he's back.
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Done for you:</strong> Omar is marked away for Tuesday and Saturday, and his turn in goal moves to Sat 13 Jun.
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, minHeight: 48, border: `1px solid #c5c8c4`, borderRadius: 12, padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 15, color: MUT, background: '#fff' }}>Write a reply</div>
            <button onClick={() => st('Reply sent.')} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
