import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

export default function DSet1ClubSettings() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100% - 52px)' }}>
        {/* Left nav */}
        <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
          {['Club details', 'People and roles', 'Connections', 'Club rules', 'Plan', 'Partner academies'].map(item => (
            <div key={item} style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: item === 'Club details' ? 700 : 500,
              color: item === 'Club details' ? G : MUT,
              background: item === 'Club details' ? PALE : 'transparent',
              borderLeft: item === 'Club details' ? `3px solid ${G}` : '3px solid transparent',
              cursor: 'pointer',
            }}>{item}</div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Club settings</div>
              <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · only the chair and director can change these</div>
            </div>
            <button style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }} onClick={() => st('Settings saved.')}>Save</button>
          </div>

          {/* Club details */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 16 }}>Club details</div>
            {[
              { label: 'Club name', value: 'Wattle Creek FC' },
              { label: 'Home ground', value: 'Wattle Creek Reserve, 5 pitches' },
              { label: 'State and league', value: 'Victoria · Football Victoria' },
              { label: 'Club colours', value: 'Green and white' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{f.label}</div>
                <input defaultValue={f.value} style={{ width: '100%', height: 44, padding: '0 14px', border: `1px solid ${LN}`, borderRadius: 8, fontFamily: 'inherit', fontSize: 14, color: INK, background: '#fafafa', boxSizing: 'border-box' as const }} />
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT }}>The club name and ground show to every family and coach.</div>
          </div>

          {/* Season and defaults */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 16 }}>Season and defaults</div>
            {[
              { label: 'Season', value: '11 Apr to 22 Aug 2026' },
              { label: 'Full match video kept', value: '90 days' },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 14, color: INK }}>{f.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: G }}>{f.value}</div>
              </div>
            ))}
            {[
              { label: 'Clips can be downloaded', value: false },
              { label: 'Faces blurred outside coaching', value: true },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 14, color: INK }}>{f.label}</div>
                <div style={{ width: 44, height: 26, borderRadius: 13, background: f.value ? G : '#d1d5db', position: 'relative' as const, cursor: 'pointer' }}>
                  <div style={{ position: 'absolute' as const, top: 2, left: f.value ? 20 : 2, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 14, color: INK }}>Data stored in</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: G }}>Australia</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 14, color: INK }}>Welfare officer</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: G }}>Helen Park</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 14, color: INK }}>Concussion officer</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: G }}>Marco Bellini</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Changing a privacy default emails every family before it takes effect.</div>
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
