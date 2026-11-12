import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

export default function RC4eRecordingNoCameraEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div style={{ background: '#fff', border: `2px solid #c05`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 16, textAlign: 'center' as const }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="12" height="12" rx="2"/><path d="M22 7l-4 4-4-4M22 17l-4-4-4 4"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Camera not found</div>
          <div style={{ fontSize: 14, color: MUT, fontWeight: 600 }}>Win it back in 6 seconds · ready to start</div>
          <div style={{ fontSize: 15, color: MUT, maxWidth: 420, lineHeight: 1.6 }}>Check it's switched on and near the tablet. Or carry on without it: vests and boots still record, and you can count the wins by hand.</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button onClick={() => st('Searching for camera again.')} style={{ height: 48, padding: '0 24px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Try again</button>
            <button onClick={() => st('Starting without camera.')} style={{ height: 48, padding: '0 24px', borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Start without camera</button>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Kit status</div>
          {[
            { label: 'Camera', status: 'Not found', ok: false },
            { label: 'GPS vests (11 of 16)', status: 'OK', ok: true },
            { label: 'Boot sensors (12 of 16)', status: 'OK', ok: true },
          ].map(k => (
            <div key={k.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${LN}`, fontSize: 14 }}>
              <span style={{ color: MUT }}>{k.label}</span>
              <span style={{ fontWeight: 700, color: k.ok ? G : '#c05' }}>{k.status}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, fontSize: 13, color: MUT, lineHeight: 1.6 }}>Vests and sensors still work without the camera. You'll get load data but no clips.</div>
        </div>
      </main>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
