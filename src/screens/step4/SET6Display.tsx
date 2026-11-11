import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SET6Display(_: { onBack?: () => void }) {
  const [textSize, setTextSize] = useState(1)
  const [sunlight, setSunlight] = useState(false)
  const [motion, setMotion] = useState(true)
  const [colorblind, setColorblind] = useState(false)
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [lang] = useState('English')
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 999, background: on ? G : LN, position: 'relative', cursor: 'pointer', flex: 'none', transition: 'background 0.2s' }}>
        <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
      </div>
    )
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports', 'Settings'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Settings' ? 700 : 500, color: tab === 'Settings' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach · U12 Sam</div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44 }}>
        {['Notifications', 'Display', 'Devices'].map(tab => (
          <div key={tab} style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: tab === 'Display' ? 700 : 500, color: tab === 'Display' ? GD : MUT, borderBottom: tab === 'Display' ? `2px solid ${GD}` : '2px solid transparent', cursor: 'pointer' }}>{tab}</div>
        ))}
      </div>

      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '560px 1fr', gap: 32 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Display</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>How Clean Sheet looks and moves on this tablet</div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
            {/* Text size */}
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Text size</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Small', 'Default', 'Large', 'Larger'].map((s, i) => (
                  <button key={i} onClick={() => setTextSize(i)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: textSize === i ? 0 : `1px solid ${LN}`, background: textSize === i ? G : '#fff', color: textSize === i ? '#fff' : INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            {[
              { label: 'Sunlight mode', sub: 'Boosts contrast in bright outdoor conditions', val: sunlight, set: () => setSunlight(v => !v) },
              { label: 'Reduce movement', sub: 'Turns off animations and transitions', val: !motion, set: () => setMotion(v => !v) },
              { label: 'Colour-blind mode', sub: 'Removes reliance on red/green', val: colorblind, set: () => setColorblind(v => !v) },
            ].map(item => (
              <div key={item.label} style={{ padding: '14px 20px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
                </div>
                <Toggle on={item.val} onToggle={item.set} />
              </div>
            ))}

            {/* Units */}
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Units</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['metric', 'imperial'] as const).map(u => (
                  <button key={u} onClick={() => setUnits(u)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: units === u ? 0 : `1px solid ${LN}`, background: units === u ? G : '#fff', color: units === u ? '#fff' : INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{u === 'metric' ? 'Metric (km, kg)' : 'Imperial (mi, lb)'}</button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Language</div>
              <button onClick={() => t('Language options would open.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{lang} ▾</button>
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 8 }}>For the whole team</div>
            <div style={{ fontSize: 13, color: GD }}>Display settings are saved on this tablet. If another coach signs into this device they'll see your settings unless they change them.</div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
