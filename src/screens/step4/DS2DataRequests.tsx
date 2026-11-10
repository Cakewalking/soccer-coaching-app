const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DS2DataRequests(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Safeguarding' ? 700 : 500, color: tab === 'Safeguarding' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: '32px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Data requests</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Families can ask for a copy of their child's data, or to delete it</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
          <div>
            <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: GD, fontWeight: 600 }}>None waiting</div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Completed this season</div>
              {[
                { type: 'Copy of data', family: 'U10 Nadia family', asked: 'Asked 9 May', done: 'sent automatically 9 May' },
                { type: 'Delete data', family: 'U8 Hannah family', asked: 'Player left the club · asked 31 Mar', done: 'deleted 2 Apr' },
                { type: 'Delete clips only', family: 'U13 Girls Meg family', asked: 'Asked 17 Mar', done: 'clips removed 18 Mar, numbers kept' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.type} · {r.family}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{r.asked} · {r.done}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: G, background: PALE, padding: '3px 8px', borderRadius: 20 }}>Done</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>What the club keeps</div>
              {[
                ['Full match video', '90 days'],
                ['Kept clips', 'Until season end'],
                ['Sensor numbers', 'While at the club'],
                ['Wellness answers', '12 months'],
                ['Growth', 'While at the club'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 13, color: MUT }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 13, color: GD }}>Copies sent within a day. Deletes within 7 days unless there's an open concern. Parents ask from their app.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
