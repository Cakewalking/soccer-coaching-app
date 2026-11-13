import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FIL5ClubFiles() {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const docs = [
    { name: 'Club constitution 2026', to: 'All coaches, managers', opened: 28, of: 31 },
    { name: 'Child safety policy', to: 'All coaches, managers', opened: 31, of: 31 },
    { name: 'First-aid procedures', to: 'All coaches, managers', opened: 24, of: 31 },
    { name: 'Kit ordering guide', to: 'Club coordinators', opened: 4, of: 4 },
  ]
  const templates = [
    { name: 'Game day info', desc: 'Meet time, ground, what to bring' },
    { name: 'Tournament team sheet', desc: 'Squad, games, turns in goal' },
    { name: 'Season letter to families', desc: 'Your words, club header' },
    { name: 'End of season letter', desc: 'Thanks, next season dates' },
  ]
  const teams = [
    { name: 'U12 Sam', used: 1.2, of: 5 },
    { name: 'U13 Chris', used: 2.1, of: 5 },
    { name: 'U15 Girls Bec', used: 0.4, of: 5 },
    { name: 'U16 Ollie', used: 4.6, of: 25 },
    { name: "Men's 1sts", used: 0.8, of: 5 },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Overview', 'Messages', 'Calendar', 'Season plan', 'Playing style', 'Files', 'Features and billing'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Files' ? 700 : 500, color: t === 'Files' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Club files</div>

          {/* Club documents */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Club documents</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              {docs.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: i < docs.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: MUT }}>To: {d.to}</div>
                  </div>
                  <div style={{ fontSize: 13, color: MUT, marginRight: 16 }}>{d.opened} of {d.of} read</div>
                  {d.opened < d.of && (
                    <button onClick={() => st(`Nudging ${d.of - d.opened} people.`)} style={{ height: 30, padding: '0 12px', borderRadius: 999, background: PALE, border: 'none', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge {d.of - d.opened}</button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => st('Opening new club document.')} style={{ marginTop: 10, height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ New document</button>
          </div>

          {/* Templates */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Templates every team starts from</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              {templates.map((t, i) => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: i < templates.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{t.desc}</div>
                  </div>
                  <button onClick={() => st(`Editing ${t.name} template.`)} style={{ height: 30, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Space sidebar */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 16 }}>Space by team</div>
            {teams.map(t => (
              <div key={t.name} style={{ padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, color: INK }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{t.used} / {t.of} GB</div>
                </div>
                <div style={{ height: 4, background: LN, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(t.used / t.of) * 100}%`, background: t.used / t.of > 0.8 ? '#c05' : G, borderRadius: 999 }} />
                </div>
              </div>
            ))}
            <button onClick={() => st('Opening extra space in Features and billing.')} style={{ marginTop: 14, width: '100%', height: 36, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add space</button>
            <div style={{ fontSize: 11, color: MUT, marginTop: 8, textAlign: 'center' }}>Video is not counted. It stays with Clips.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
