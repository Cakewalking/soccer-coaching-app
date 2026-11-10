const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function D5Safeguarding(_: { onBack?: () => void }) {
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

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const, minHeight: 820 }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Safeguarding' ? 700 : 500, color: t === 'Safeguarding' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Club consent settings', 'Concerns (2)', 'Data requests'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Club consent settings' ? 700 : 500, color: t === 'Club consent settings' ? G : MUT, borderBottom: t === 'Club consent settings' ? `2px solid ${G}` : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>{t}</div>
        ))}
      </div>

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
    </div>
  )
}
