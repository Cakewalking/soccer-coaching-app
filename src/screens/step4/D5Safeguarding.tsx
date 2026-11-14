import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function D5Safeguarding({ initialTab = 'consent' }: { onBack?: () => void; initialTab?: 'consent' | 'concerns' | 'data' }) {
  const [tab, setTab] = useState<'consent' | 'concerns' | 'data'>(initialTab)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  const todos = [
    { text: "Chris Pham's check ends in 9 days", sub: "Can't coach U13 Chris from 14 Jun without it." },
    { text: "Luke Fraser's check ends in 12 days", sub: 'Reminded once on 31 May.' },
    { text: '8 players without consent', sub: 'Their clips are blurred and sensor data not kept.' },
    { text: 'Bec Ward and Priya Shah, under 30 days', sub: 'Automatic reminders are on.' },
  ]
  const whoCanSee = [
    { item: 'Team clips and numbers', dir: 'Yes', coach: 'Yes', fit: 'Yes', mgr: '—', par: '—' },
    { item: 'Wellness, growth, pain', dir: '#', coach: 'Yes', fit: 'Yes', mgr: '—', par: 'Yes' },
    { item: 'First-aid card', dir: '—', coach: 'Yes', fit: 'Yes', mgr: 'Yes', par: '—' },
    { item: 'Other teams', dir: 'Yes', coach: '—', fit: '—', mgr: '—', par: '—' },
    { item: 'Parent messages', dir: 'Yes', coach: 'Yes', fit: '—', mgr: 'Yes', par: 'Yes' },
  ]
  const tabs: { key: typeof tab; label: string }[] = [
    { key: 'consent', label: 'Club consent settings' },
    { key: 'concerns', label: 'Concerns (2)' },
    { key: 'data', label: 'Data requests' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const, minHeight: 820, position: 'relative' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Safeguarding' ? 700 : 500, color: t === 'Safeguarding' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ height: 44, padding: '0 4px', background: 'none', border: 'none', borderBottom: tab === t.key ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t.label}</button>
        ))}
      </div>

      {tab === 'consent' && (
        <div style={{ display: 'flex', flex: 1, padding: 32, gap: 24 }}>
          {/* Main column */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Safeguarding</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Children checks, consent, messages and footage, for the whole club</div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Children checks', val: '31 of 31', sub: '4 to renew within 30 days', ok: true },
                { label: 'Parent consent', val: '184 of 192', sub: '8 waiting · 5 are new players', ok: true },
                { label: 'Concerns open', val: '2', sub: 'Both with the welfare officer', ok: false },
                { label: 'Full video kept', val: '90 days', sub: 'Kept clips go at season end', ok: true },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.ok ? GD : '#c05' }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* To do */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>To do (oldest first)</div>
              {todos.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fef2f2', border: '2px solid #c05', flex: 'none', marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{t.text}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ width: 340 }}>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Who can see what</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(5,36px)', gap: 2, fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 6, textAlign: 'center' as const }}>
                <div style={{ textAlign: 'left' as const }}></div>
                {['Dir', 'Coach', 'Fit', 'Mgr', 'Par'].map(h => <div key={h}>{h}</div>)}
              </div>
              {whoCanSee.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(5,36px)', gap: 2, fontSize: 12, padding: '6px 0', borderBottom: `1px solid ${LN}`, textAlign: 'center' as const }}>
                  <div style={{ textAlign: 'left' as const, color: INK }}>{row.item}</div>
                  {[row.dir, row.coach, row.fit, row.mgr, row.par].map((v, j) => (
                    <div key={j} style={{ color: v === 'Yes' ? G : v === '#' ? '#b78c00' : '#aaa' }}>{v}</div>
                  ))}
                </div>
              ))}
              <div style={{ fontSize: 11, color: MUT, marginTop: 8 }}># means counts only. Parents see their own child only.</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'concerns' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
          <div style={{ display: 'flex', gap: 32, maxWidth: 900, width: '100%' }}>
            {/* Left: no-access message */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: INK }}>This one is only for the welfare officer</h2>
              <p style={{ margin: '0 0 28px', fontSize: 15, color: MUT, maxWidth: 420, lineHeight: 1.6 }}>
                Concerns are read by Helen Park and nobody else, so families and children can speak freely. As director you see how many are open and how long they take.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setTab('consent')} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>See the counts</button>
                <button onClick={() => st('Opening a message to Helen Park.')} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: '#fff', color: G, border: `1.5px solid ${G}`, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Message Helen</button>
              </div>
            </div>
            {/* Right: who sees what */}
            <div style={{ width: 300 }}>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 16 }}>Who sees what</div>
                {[
                  { initials: 'HP', label: 'Welfare officer', sub: 'Every concern, in full', bg: '#8fa09b' },
                  { initials: 'RM', label: 'Director and chair', sub: 'Counts and time to close', bg: '#c0a070' },
                  { initials: 'C', label: 'Coaches', sub: 'Nothing — they can raise one', bg: '#7a9e7e' },
                  { initials: 'P', label: 'Parents', sub: 'Nothing — they can raise one', bg: '#a09080' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flex: 'none' }}>{r.initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'data' && (
        <div style={{ flex: 1, padding: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Data requests</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Requests from families to access or delete their data</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '32px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 14, color: MUT }}>No open data requests.</div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, pointerEvents: 'none' }}>{toast}</div>
      )}
    </div>
  )
}
