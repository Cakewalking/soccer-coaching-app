import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function T1TabletTraining(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Overview' ? 700 : 500, color: t === 'Overview' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '24px 32px 32px' }}>
          {/* Needs you */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Needs you · new</div>
            {[
              { from: 'Wellness check-ins', time: '7:30 am', text: 'Ella has felt low two days running', urgent: true },
              { from: 'Data', time: '7:12 am', text: '3 GPS vests didn\'t sync', urgent: true },
              { from: 'Priya Shah · Fitness Coach', time: 'Yesterday', text: 'Sprint caps set for Noah and Zoe', urgent: false },
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

          {/* Where we're at */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Where we're at</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Winning the ball back', val: '7 s', note: 'Needs work', warn: true },
                { label: 'Pressing wins in their half', val: '13', note: 'Getting better', warn: false },
              ].map(m => (
                <div key={m.label} style={{ padding: '10px 12px', background: PALE, borderRadius: 10 }}>
                  <div style={{ fontSize: 12, color: MUT }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: m.warn ? '#7a3838' : GD }}>{m.val}</div>
                  {m.warn
                    ? <span style={{ display: 'inline-block', background: '#c39797', color: '#10211f', borderRadius: 999, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{m.note}</span>
                    : <div style={{ fontSize: 11, color: G }}>{m.note}</div>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Today */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Today · 5:45 pm · Wattle Creek Reserve</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>Training tonight</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>90 minutes · warm-up and 4 drills · built from Saturday's game</div>
            {['Win the ball back faster', 'Keep the lines close', 'Strong last 15 minutes'].map(d => (
              <div key={d} style={{ display: 'flex', gap: 8, padding: '4px 0', fontSize: 13, color: INK }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: G, marginTop: 5, flex: 'none' }} />
                {d}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => st('Opening the plan.')} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Open the plan</button>
              <button onClick={() => st('Opening team talk.')} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Team talk</button>
              <button onClick={() => st('Opening recording.')} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Record</button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 300, padding: '24px 24px 32px 0' }}>
          {/* Last game */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Last game · Sat 30 May · away</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: GD }}>W Ironbark United</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>Mia, Jai and Zoe scored · 3–1</div>
            <div style={{ fontSize: 12, color: G }}>→ Open the review · 7 clips</div>
          </div>

          {/* Week */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>This week</div>
            {[
              { d: 'Mon 1', t: 'Rest' },
              { d: 'Tue 2', t: 'Training · done' },
              { d: 'Wed 3', t: 'Rest' },
              { d: 'Thu 4', t: 'Training 5:45 pm', bold: true },
              { d: 'Fri 5', t: 'Rest' },
              { d: 'Sat 6', t: 'Harbour Rovers 9:30', bold: true },
              { d: 'Sun 7', t: 'Review' },
            ].map(day => (
              <div key={day.d} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 12 }}>
                <div style={{ color: MUT }}>{day.d}</div>
                <div style={{ color: (day as any).bold ? GD : INK, fontWeight: (day as any).bold ? 700 : 400 }}>{day.t}</div>
              </div>
            ))}
          </div>

          {/* Squad */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Squad · 17 players</div>
            {[
              { label: 'Ready', val: '12', color: G },
              { label: 'Manage', val: '4', color: '#b78c00' },
              { label: 'Check in', val: '1', color: '#c05' },
            ].map(r => (
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
