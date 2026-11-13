import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU1eLearnEmpty({ onMakeLesson }: { onMakeLesson?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Clips' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['By game', 'By measure', 'By player', 'Playlists', 'Learn'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Learn' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Learn' ? 700 : 500, color: t === 'Learn' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8, textAlign: 'center' }}>No lessons yet</div>
        <div style={{ fontSize: 14, color: MUT, maxWidth: 440, textAlign: 'center', lineHeight: 1.6, marginBottom: 32 }}>
          Lessons are short clips of your players doing something well, with what to notice and something to try. You make them from clips you have already recorded — it takes about two minutes.
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
          {[
            { title: 'Pick a clip', body: 'Find a moment from any recorded game where a player did something worth copying.' },
            { title: 'Add two lines', body: 'What to notice. Something to try. That is the whole lesson.' },
            { title: 'Share', body: 'Send it to your team, the whole club, or just the players it is for.' },
          ].map((s, i) => (
            <div key={i} style={{ width: 200, background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{i + 1}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>{s.body}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onMakeLesson} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Make a lesson from a clip</button>
          <button onClick={() => st('Opening club library.')} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Browse the club library</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
