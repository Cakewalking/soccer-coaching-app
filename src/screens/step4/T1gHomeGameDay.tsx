const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function T1gHomeGameDay(_: { onBack?: () => void }) {
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
        <div style={{ flex: 1, padding: '24px 32px 32px' }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Needs you</div>
            {[
              { from: 'Team talk', time: '8:30 am', text: 'Team talk is ready · 3 focus points', urgent: false },
              { from: 'Wellness check-ins', time: '7:50 am', text: '11 of 16 checked in · Ella rated 2.5', urgent: true },
              { from: 'Opposition', time: '7:00 am', text: 'Harbour Rovers scout notes ready', urgent: false },
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
                { label: 'Pressing speed', val: '5.2 s', note: 'Improving · training working', warn: false },
                { label: 'Squad ready', val: '14 of 16', note: 'Noah and Zoe: managed load', warn: false },
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
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Today · Saturday 6 Jun · away · 9:30 am</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>Harbour Rovers · League</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>Harbour Reserve · kick-off 9:30 · 3 focus points from training</div>
            {['Press high, win it back in 5 seconds', 'Keep the lines within 20 m', 'Manage Noah and Zoe: 60 min max'].map(d => (
              <div key={d} style={{ display: 'flex', gap: 8, padding: '4px 0', fontSize: 13, color: INK }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: G, marginTop: 5, flex: 'none' }} />
                {d}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Team talk</button>
              <button style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Line-up</button>
              <button style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Live game</button>
            </div>
          </div>
        </div>

        <div style={{ width: 300, padding: '24px 24px 32px 0' }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Harbour Rovers</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>3 wins · 2 draws · 2 losses</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>Play wide · fast transitions</div>
            <div style={{ fontSize: 12, color: G }}>→ Full scout report</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Today's schedule</div>
            {[
              { d: '8:30', t: 'Leave Wattle Creek' },
              { d: '9:00', t: 'Arrive · warm-up', bold: true },
              { d: '9:30', t: 'Kick-off', bold: true },
              { d: '10:50', t: 'Full time' },
              { d: '11:30', t: 'Travel home' },
            ].map(day => (
              <div key={day.d} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 12 }}>
                <div style={{ color: MUT }}>{day.d}</div>
                <div style={{ color: (day as any).bold ? GD : INK, fontWeight: (day as any).bold ? 700 : 400 }}>{day.t}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Squad · 16 players</div>
            {[{ label: 'Ready', val: '14', color: G }, { label: 'Manage', val: '2', color: '#b78c00' }, { label: 'Not checked in', val: '1', color: '#c05' }].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: MUT }}>{r.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
