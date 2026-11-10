const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function X7InboxEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Inbox' ? 700 : 500, color: t === 'Inbox' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: 380, background: '#fff', borderRight: `1px solid ${LN}`, padding: '12px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Inbox</div>
          <div style={{ display: 'flex', gap: 16, height: 36, alignItems: 'center', marginBottom: 16 }}>
            {['All', 'Unread 0', 'People', 'Clean Sheet'].map(t => (
              <div key={t} style={{ fontSize: 12, color: MUT }}>{t}</div>
            ))}
          </div>
          <div style={{ textAlign: 'center' as const, padding: '32px 0', color: MUT, fontSize: 13 }}>Nothing here yet</div>
        </div>

        <div style={{ flex: 1, padding: 48 }}>
          <div style={{ maxWidth: 480 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 8 }}>Nothing here yet</div>
            <div style={{ fontSize: 14, color: MUT, marginBottom: 24 }}>Messages and alerts arrive once your squad and first game are in.</div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>What lands here</div>
              {[
                { title: 'Match reviews', body: 'About 25 minutes after a recorded game, with your three things to work on.' },
                { title: 'Wellness alerts', body: 'When a player feels low or sore two days running, with what to do next.' },
                { title: 'Data problems', body: "A vest that didn't sync or a camera that lost the ball, with a one-tap fix." },
                { title: 'Messages', body: 'From your coaching team and from parents. Reply right here.' },
              ].map(item => (
                <div key={item.title} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.body}</div>
                </div>
              ))}
            </div>

            <button style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Invite coaches</button>

            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Keeping messages safe</div>
              <div style={{ fontSize: 12, color: GD }}>Coach chats stay with coaches. Parent messages are kept by the club. Players are never messaged alone.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
