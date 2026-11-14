import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FIL5ClubFiles({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const docs = [
    { name: 'Code of behaviour on the sideline', to: 'All coaches, managers', opened: 10, of: 31 },
    { name: 'Club constitution 2026', to: 'All coaches, managers', opened: 28, of: 31 },
    { name: 'Child safety policy', to: 'All coaches, managers', opened: 31, of: 31 },
    { name: 'First-aid procedures', to: 'All coaches, managers', opened: 29, of: 31 },
    { name: 'Kit ordering guide', to: 'Club coordinators', opened: 4, of: 4 },
  ]
  const templates = [
    { name: 'Game day info', desc: 'Meet time, ground, what to bring', editTarget: 'FIL2-Sheet' as string | null },
    { name: 'Tournament team sheet', desc: 'Squad, games, turns in goal', editTarget: 'FIL3-Doc' as string | null },
    { name: 'Season letter to families', desc: 'Your words, club header', editTarget: null },
    { name: 'End of season letter', desc: 'Thanks, next season dates', editTarget: null },
  ]
  const teams = [
    { name: 'U12 Sam', used: 1.2, of: 5 },
    { name: 'U13 Chris', used: 2.1, of: 5 },
    { name: 'U15 Girls Bec', used: 0.4, of: 5 },
    { name: 'U16 Ollie', used: 4.6, of: 25 },
    { name: "Men's 1sts", used: 0.8, of: 5 },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }} data-lasttool={lastTool}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} onClick={() => tool(t)} style={{ fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Club' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '0 12px', cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </div>
          <div onClick={() => tool('Whole club')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center', gap: 4 }}>
            Whole club
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {[
          { label: 'Overview' },
          { label: 'Messages', target: 'MSG4-DirectorMessages' },
          { label: 'Calendar' },
          { label: 'Season plan' },
          { label: 'Playing style' },
          { label: 'Files' },
          { label: 'Features and billing', target: 'PRM1-FeaturesByTeam' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => target ? onNav?.(target) : tool(label)} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', borderBottom: label === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: label === 'Files' ? 700 : 500, color: label === 'Files' ? G : MUT, cursor: 'pointer' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Page header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Club files</div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button onClick={() => tool('Upload')} style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Upload</button>
                <button onClick={() => tool('New template')} style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>New template</button>
              </div>
            </div>
            <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · club documents, templates every team gets, and space used</div>
          </div>

          {/* Club documents */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Club documents</div>
              <div style={{ fontSize: 12, color: MUT }}>"Read by" counts families who opened it in Clean Sheet.</div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              {docs.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: i < docs.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: MUT }}>To: {d.to}</div>
                  </div>
                  <div style={{ fontSize: 13, color: MUT, marginRight: 16 }}>{d.opened} of {d.of} read</div>
                  {d.opened < d.of && (
                    <button onClick={() => tool(`Nudge-${d.name}`)} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, background: PALE, border: 'none', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge</button>
                  )}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Their files stay with the team. A coach who leaves loses access the same day.</div>
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
                  <button onClick={() => t.editTarget ? onNav?.(t.editTarget) : tool(`Edit-${t.name}`)} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
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
            <button onClick={() => onNav?.('PRM1-FeaturesByTeam')} style={{ marginTop: 14, width: '100%', minHeight: 44, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add space</button>
            <div style={{ fontSize: 11, color: MUT, marginTop: 8, textAlign: 'center' }}>5 GB for each of 14 teams. Video is separate.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
