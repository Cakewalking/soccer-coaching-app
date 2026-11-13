import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Job = { label: string; time: string; places: number; taken: string[] }

export default function FIL6SignUp({ onParentView }: { onParentView?: () => void }) {
  const [view, setView] = useState<'jobs' | 'by-family'>('jobs')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const [jobs] = useState<Job[]>([
    { label: 'Canteen set-up', time: 'Sat 13 Dec · 8:00 am', places: 2, taken: ['Jess Marsh'] },
    { label: 'Canteen during games', time: 'Sat 13 Dec · 8:30–1:00', places: 3, taken: ['Ryan Chen', 'Priya Shah'] },
    { label: 'Oranges and water', time: 'Sat 13 Dec · all day', places: 2, taken: ['Lee Walsh', 'Dana Fox'] },
    { label: 'Car pool from oval', time: 'Sat 13 Dec · 8:00 am', places: 4, taken: ['Jess Marsh', 'Ryan Chen'] },
    { label: 'Pack-up canteen', time: 'Sat 13 Dec · 1:00 pm', places: 2, taken: [] },
    { label: 'First-aid kit', time: 'Sat 13 Dec · all day', places: 1, taken: ['Lee Walsh'] },
    { label: 'Photos', time: 'Sat 13 Dec · 9:00 am', places: 1, taken: [] },
  ])

  const totalPlaces = jobs.reduce((s, j) => s + j.places, 0)
  const filled = jobs.reduce((s, j) => s + j.taken.length, 0)
  const open = totalPlaces - filled

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '24px 24px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Summer sevens · who can help</div>
            <div style={{ fontSize: 13, color: MUT }}>Closes Thu 11 Dec 6:00 pm</div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              {(['jobs', 'by-family'] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{ height: 34, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${view === v ? G : LN}`, background: view === v ? PALE : '#fff', fontSize: 13, color: view === v ? G : INK, fontWeight: view === v ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {v === 'jobs' ? 'Jobs' : 'By family'}
                </button>
              ))}
              <button onClick={() => st('Printing sign-up sheet.')} style={{ height: 34, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Print</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Places open', val: `${open} of ${totalPlaces}`, col: open > 0 ? '#c05' : G },
              { label: 'Families answered', val: '11 of 17' },
              { label: 'Cannot help', val: '3 families' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.col || INK }}>{s.val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {jobs.map((j, i) => (
              <div key={j.label} style={{ padding: '14px 20px', borderBottom: i < jobs.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{j.label}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{j.time}</div>
                  </div>
                  <div style={{ fontSize: 12, color: j.taken.length >= j.places ? G : '#c05', fontWeight: 600 }}>{j.taken.length}/{j.places} filled</div>
                </div>
                {j.taken.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {j.taken.map(name => (
                      <div key={name} style={{ height: 26, padding: '0 10px', borderRadius: 999, background: PALE, fontSize: 12, color: G, display: 'flex', alignItems: 'center' }}>{name}</div>
                    ))}
                  </div>
                )}
                {Array.from({ length: j.places - j.taken.length }).map((_, k) => (
                  <div key={k} style={{ marginTop: 8, height: 26, width: 100, borderRadius: 999, border: `1.5px dashed ${LN}`, fontSize: 12, color: MUT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Open</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 240, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Places still open</div>
            {jobs.filter(j => j.taken.length < j.places).map(j => (
              <div key={j.label} style={{ fontSize: 12, color: MUT, padding: '4px 0', borderBottom: `1px solid ${LN}` }}>{j.label} · {j.places - j.taken.length} left</div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>6 families haven't answered</div>
            <button onClick={() => st('Sending reminder showing only open jobs.')} style={{ width: '100%', height: 36, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Remind the 6</button>
            <div style={{ fontSize: 11, color: MUT, marginTop: 8 }}>The reminder shows only open jobs.</div>
          </div>
          <button onClick={() => onParentView?.()} style={{ height: 36, borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>As a parent sees it</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
