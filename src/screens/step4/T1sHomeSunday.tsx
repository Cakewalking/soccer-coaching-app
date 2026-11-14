import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function T1sHomeSunday(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Overview' ? 700 : 500, color: t === 'Overview' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '24px 32px 32px' }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Needs you</div>
            {[
              { from: 'Match review', time: '8:00 am', text: "Saturday's review is ready · W Ironbark 3–1", urgent: false },
              { from: 'Wellness check-ins', time: '7:45 am', text: 'Ella has felt low three days running', urgent: true },
              { from: 'Match camera', time: '7:20 am', text: '7 clips tagged from yesterday', urgent: false },
            ].map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.urgent ? '#c05' : G, marginTop: 5, flex: 'none' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{n.time}</div>
                  </div>
                  <div style={{ fontSize: 11, color: MUT }}>{n.from}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Where we're at</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Winning the ball back', val: '5.2 s', note: 'Improving · –1.8 s since Thu', warn: false },
                { label: 'Line gap vs Ironbark', val: '21 m', note: 'Narrowed from 26 m', warn: false },
              ].map(m => (
                <div key={m.label} style={{ padding: '10px 12px', background: PALE, borderRadius: 10 }}>
                  <div style={{ fontSize: 12, color: MUT }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: GD }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: G }}>{m.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Today · Sunday 7 Jun</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>Match review · rest day</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>Review Saturday · plan next week · 7 clips to tag</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => st('Opening the review.')} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Open the review</button>
              <button onClick={() => st('Planning next week.')} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Plan next week</button>
            </div>
          </div>
        </div>

        <div style={{ width: 300, padding: '24px 24px 32px 0' }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Yesterday · Sat 6 Jun · away</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: GD }}>W Ironbark United</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>Mia, Jai and Zoe scored · 3–1</div>
            <div style={{ fontSize: 12, color: G }}>→ Open the review · 7 clips ready</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>This week ahead</div>
            {[
              { d: 'Sun 7', t: 'Review · today', bold: true },
              { d: 'Mon 8', t: 'Rest' },
              { d: 'Tue 9', t: 'Training 5:45 pm' },
              { d: 'Wed 10', t: 'Rest' },
              { d: 'Thu 11', t: 'Training 5:45 pm' },
              { d: 'Fri 12', t: 'Rest' },
              { d: 'Sat 13', t: 'Lyndhurst SC 10:00' },
            ].map(day => (
              <div key={day.d} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 12 }}>
                <div style={{ color: MUT }}>{day.d}</div>
                <div style={{ color: (day as any).bold ? GD : INK, fontWeight: (day as any).bold ? 700 : 400 }}>{day.t}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Squad · 16 players</div>
            {[{ label: 'Ready', val: '13', color: G }, { label: 'Manage', val: '2', color: '#b78c00' }, { label: 'Check in', val: '1', color: '#c05' }].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: MUT }}>{r.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
