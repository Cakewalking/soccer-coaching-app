import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const DOCS = [
  { name: 'Child-safe policy 2026',              to: 'Every family and coach', opened: 171, of: 192 },
  { name: 'Hot weather and lightning rules',      to: 'Every coach and manager', opened: 29, of: 31 },
  { name: 'Code of behaviour on the sideline',   to: 'Every family', opened: 160, of: 192 },
  { name: 'Fees and refunds',                     to: 'Every family', opened: 188, of: 192 },
]
const TEMPLATES = [
  { name: 'Tournament team sheet', desc: 'Sheet · club header', usage: 'Used by 9 teams' },
  { name: 'Game day info',          desc: 'Doc · club header',   usage: 'Used by 12 teams' },
]
const TEAMS = [
  { name: 'U16 Ollie',   used: 4.6, of: 5,  alert: true },
  { name: 'U12 Sam',     used: 1.2, of: 5,  alert: false },
  { name: "Men's 1sts",  used: 0.9, of: 5,  alert: false },
]

export default function FilesTab({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-lasttool={lastTool} style={{ flex: 1, display: 'flex', gap: 24, padding: '24px 24px 32px' }}>
      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Files</div>
            <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · club documents, templates every team gets, and space used</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button onClick={() => tool('Upload')} style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Upload</button>
            <button onClick={() => tool('New template')} style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>New template</button>
          </div>
        </div>

        {/* Club documents */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Club documents</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {DOCS.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: i < DOCS.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer' }} onClick={() => tool(d.name)}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{d.to}</div>
                </div>
                <div style={{ fontSize: 13, color: MUT, marginRight: 16 }}>{d.opened} of {d.of} families</div>
                {d.opened < d.of && (
                  <button onClick={e => { e.stopPropagation(); tool(`Nudge-${d.name}`) }} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, background: PALE, border: 'none', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge</button>
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>"Read by" counts families who opened it in Clean Sheet.</div>
        </div>

        {/* Templates */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Templates every team starts from</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {TEMPLATES.map((t, i) => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: i < TEMPLATES.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer' }} onClick={() => tool(t.name)}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{t.desc}</div>
                </div>
                <div style={{ fontSize: 13, color: MUT, marginRight: 16 }}>{t.usage}</div>
                <button onClick={e => { e.stopPropagation(); tool(`Edit-${t.name}`) }} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: MUT }}>Their files stay with the team. A coach who leaves loses access the same day.</div>
      </div>

      {/* Space sidebar */}
      <div style={{ width: 260, flexShrink: 0 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Space</div>
            <button onClick={() => onNav?.('PRM1-FeaturesByTeam')} style={{ minHeight: 44, padding: '0 12px', background: 'none', border: 'none', fontSize: 13, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Add space</button>
          </div>
          <div style={{ height: 8, background: LN, borderRadius: 999, overflow: 'hidden', marginBottom: 4 }}>
            <div style={{ height: '100%', width: '44%', background: GD, borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 13, color: INK, marginBottom: 2 }}>31 of 70 GB used</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>5 GB for each of 14 teams. Video is separate.</div>

          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Most space used</div>
          {TEAMS.map(t => (
            <div key={t.name} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: INK }}>{t.name}</div>
                {t.alert && <div style={{ fontSize: 11, fontWeight: 700, color: '#c05', background: '#fff0f0', padding: '2px 8px', borderRadius: 999 }}>Nearly full</div>}
                {!t.alert && <div style={{ fontSize: 12, color: MUT }}>{t.used} of {t.of} GB</div>}
              </div>
              <div style={{ height: 4, background: LN, borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(t.used / t.of) * 100}%`, background: t.alert ? '#c05' : G, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: 20, marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>When someone leaves</div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Their files stay with the team. A coach who leaves loses access the same day.</div>
        </div>
      </div>
    </div>
  )
}
