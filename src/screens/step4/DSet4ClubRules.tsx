import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

const RULES = [
  { n: 1, title: 'Fair game time', desc: 'Equal time up to U13 · at least a third of the game from U14', status: 'Set', action: 'Change', warn: false },
  { n: 2, title: 'Heading in training', desc: 'Nothing is limited until you choose a policy', status: 'Not chosen', action: 'Choose', warn: true },
  { n: 3, title: 'Filming and sensors', desc: "Filming at any age with a parent's yes · sensors from U12", status: 'Set', action: 'Change', warn: false },
  { n: 4, title: 'Full match video', desc: 'Deleted after 90 days. Clips stay for the season', status: 'Set', action: 'Change', warn: false },
  { n: 5, title: 'Code of conduct', desc: 'Signed by 188 of 192 families at registration', status: '4 to sign', action: 'Remind', warn: true },
  { n: 6, title: 'Who can message players', desc: 'Under 18s: a parent is always copied in', status: 'Set', action: 'Open', warn: false },
]

const LEAGUE_RULES = [
  { n: 1, title: 'No scores under 12', desc: 'MiniRoos keep no results or ladders' },
  { n: 2, title: 'Head knocks', desc: 'Under 19s: no games for at least 21 days' },
  { n: 3, title: 'Hot days', desc: "Football Victoria's heat rule" },
  { n: 4, title: 'Children checks', desc: 'Needed before anyone sees player data' },
]

export default function DSet4ClubRules() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100% - 52px)' }}>
        <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
          {['Club details', 'People and roles', 'Connections', 'Club rules', 'Plan', 'Partner academies'].map(item => (
            <div key={item} style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: item === 'Club rules' ? 700 : 500,
              color: item === 'Club rules' ? G : MUT,
              background: item === 'Club rules' ? PALE : 'transparent',
              borderLeft: item === 'Club rules' ? `3px solid ${G}` : '3px solid transparent',
              cursor: 'pointer',
            }}>{item}</div>
          ))}
        </div>

        <div style={{ flexGrow: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Club rules</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Set once here, followed by every team</div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '4px 0', marginBottom: 20 }}>
            <div style={{ padding: '12px 20px 8px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Rules the club sets · 6 rules · 2 need you</div>
            {RULES.map((r, i) => (
              <div key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderTop: i === 0 ? `1px solid ${LN}` : `1px solid ${LN}` }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.warn ? '#fef2f2' : PALE, border: `2px solid ${r.warn ? '#c05' : G}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: r.warn ? '#c05' : G, flexShrink: 0 }}>{r.n}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.desc}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: r.warn ? '#c05' : MUT, flexShrink: 0 }}>{r.status}</div>
                <button onClick={() => st('Opening rule settings.')} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer', flexShrink: 0 }}>{r.action}</button>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: MUT, marginBottom: 20 }}>A coach can't switch a club rule off. Changing one emails every coach, and families where it affects them.</div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '4px 0' }}>
            <div style={{ padding: '12px 20px 8px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Set by the league, not you</div>
            {LEAGUE_RULES.map((r, i) => (
              <div key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderTop: i === 0 ? `1px solid ${LN}` : `1px solid ${LN}` }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0f0f0', border: `2px solid #ccc`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#6f7f7b', flexShrink: 0 }}>{r.n}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '12px 20px', fontSize: 12, color: MUT }}>These are built in and update when the league changes them.</div>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
