const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FW1GirlsWomen(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Girls and women</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>76 girls (40% of juniors) and 19 women · season 2026</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Girls playing', val: '76', sub: '62 in girls teams · 14 in mixed' },
            { label: 'Came back', val: '84%', sub: 'Boys: 81%' },
            { label: 'New this season', val: '+11', sub: 'Most came to the U9 come-and-try day' },
            { label: 'Women coaching', val: '7 of 31', sub: 'Up from 4 last season' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: GD }}>{s.val}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          {/* Pathway */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Pathway at Wattle Creek FC</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
              {[
                { group: 'U6 to U10', note: 'Mixed MiniRoos · no U9 girls team yet', count: '9', gapWarn: true },
                { group: 'U11', note: 'U11 Girls Kate + 5 girls in mixed teams', count: '14' },
                { group: 'U12 to U13', note: 'U12 Girls Ana · U13 Girls Meg', count: '33' },
                { group: 'U15', note: 'U15 Girls Bec · no U14 or U16 girls team yet', count: '15', gapWarn: true },
                { group: 'Seniors', note: "Women's 1sts State League 2", count: '19' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{row.group}</div>
                    <div style={{ fontSize: 11, color: (row as any).gapWarn ? '#c05' : MUT }}>{row.note}</div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: GD }}>{row.count}</div>
                </div>
              ))}
            </div>
            <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px' }}>
              <div style={{ fontSize: 13, color: GD }}>Gaps: U9 girls, U14 girls and U16 girls. The U15s move up to seniors in two seasons.</div>
            </div>
          </div>

          {/* Next steps */}
          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Next steps</div>
              {[
                { action: 'Start a U9 girls team', note: '9 girls already play' },
                { action: 'Apply for the girls fund', note: 'Closes 11 Sep' },
                { action: 'Run a come-and-try day', note: 'Last one brought 11 girls' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: G }}>{s.action}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
