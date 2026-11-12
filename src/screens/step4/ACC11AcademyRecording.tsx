import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e'

export default function ACC11AcademyRecording(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, background: '#0e1a17', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', boxSizing: 'border-box' }}>
      <div style={{ padding: '20px 28px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}>Recording</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>Finishing circuit · run 3</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Works with no signal. Uploads when you're back online.</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => st('Pausing recording.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Pause</button>
          <button onClick={() => st('Stopping and saving.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, background: '#c0392b', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Stop and save</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '28px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '28px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>Round 2 of 3</div>
            <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>1:42</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>Left in this round</div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 18px', marginTop: 20, textAlign: 'left' as const }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Coaching cue</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.5 }}>Say: "Open your hips, lock the ankle, pick your corner."</div>
            </div>
            <button onClick={() => st('Starting next round.')} style={{ marginTop: 20, height: 48, padding: '0 32px', borderRadius: 12, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Next round</button>
            <button onClick={() => st('Moment marked.')} style={{ marginTop: 10, height: 44, padding: '0 24px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Mark a moment</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 6 }}>So far tonight</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>14 / 22</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>weaker-foot shots on target</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>Last run they finished on 52%. Full results about 10 minutes after you stop.</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Capturing</div>
          {[
            { label: 'Academy camera', sub: 'All three stations in view', status: 'ok' },
            { label: 'GPS vests', sub: 'Not used tonight', status: 'off' },
            { label: 'Boot sensors', sub: '19 of 20 · Zane\'s aren\'t on', status: 'warn' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.status === 'ok' ? G : item.status === 'warn' ? '#c0a040' : 'rgba(255,255,255,0.2)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
