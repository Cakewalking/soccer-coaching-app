const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', G = '#2f6252'

export default function PK1YoungNews(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Wattle Creek U12 · from your coach</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>News for Mia</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c9b8d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>MT</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { from: 'Rob, team manager', time: 'today', text: 'Be there 8:40 on Saturday', sub: 'Pitch 2. White kit.', extra: 'Pitch 2, Wattle Creek Reserve\nMum has the directions' },
          { from: 'Sam, your coach', time: 'today', text: '14 juggles is a new best!', sub: "Sam saw your video. Can you get to 15 by Thursday?", extra: null, reaction: true },
        ].map((msg, i) => (
          <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G }}>{msg.from}</div>
              <div style={{ fontSize: 12, color: MUT }}>{msg.time}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{msg.text}</div>
            <div style={{ fontSize: 13, color: MUT }}>{msg.sub}</div>
            {msg.extra && <div style={{ background: '#f0f4f2', borderRadius: 8, padding: '8px 10px', marginTop: 8, fontSize: 13, color: MUT, whiteSpace: 'pre-line' as const }}>{msg.extra}</div>}
            {msg.reaction && (
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {['👍', '😀', '⚽'].map(e => <button key={e} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 20, cursor: 'pointer' }}>{e}</button>)}
              </div>
            )}
          </div>
        ))}
        <div style={{ background: '#fffbf0', border: '1px solid #f0e0a0', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#7a6020' }}>No chat until you're 15. You get news from your coach here. Mum or Dad writes for you.</div>
        <button style={{ height: 44, borderRadius: 12, background: '#fff', border: `1.5px solid ${LN}`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Something not right? You can tell someone</button>
      </div>
      <div style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {[{ label: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }, { label: 'Clips', icon: 'M23 7l-7 5 7 5V7zM1 5h15v14H1z' }, { label: 'Goals', icon: 'M18 20V10M12 20V4M6 20v-6' }, { label: 'Me', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' }].map((item, i) => (
          <div key={item.label} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? G : MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? G : MUT }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
