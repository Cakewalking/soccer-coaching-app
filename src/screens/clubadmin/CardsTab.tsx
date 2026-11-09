const CARDS_DATA = [
  { ini: 'RP', name: 'Ryan Petersen', team: 'U16 Ollie', cards: [{ c: 'Y' }, { c: 'Y' }, { c: 'R' }], cardsLabel: '2 yellows · 1 red', badgeText: 'Suspended · misses Sat 6 Jun', badgeBg: '#c39797', note: "Out of Ollie's line-up" },
  { ini: 'DV', name: 'Dean Vukovic',  team: "Men's 1sts", cards: [{ c: 'Y' }, { c: 'Y' }, { c: 'Y' }, { c: 'Y' }], cardsLabel: '4 yellows', badgeText: '1 yellow from a ban', badgeBg: '#cbbeb5', note: 'Marko told' },
  { ini: 'NF', name: 'Nina Ferraro',  team: "Women's 1sts", cards: [{ c: 'Y' }, { c: 'Y' }, { c: 'Y' }], cardsLabel: '3 yellows', badgeText: 'OK', badgeBg: '', note: '' },
  { ini: 'LB', name: 'Leon Brooks',   team: 'U14 Josh', cards: [{ c: 'Y' }, { c: 'Y' }], cardsLabel: '2 yellows', badgeText: 'OK', badgeBg: '', note: '' },
  { ini: 'CN', name: 'Cody Nash',     team: 'U13 Chris', cards: [{ c: 'Y' }], cardsLabel: '1 yellow', badgeText: 'OK', badgeBg: '', note: '' },
  { ini: 'JO', name: 'Jade Okoro',    team: 'U12 Girls Ana', cards: [{ c: 'Y' }], cardsLabel: '1 yellow', badgeText: 'OK', badgeBg: '', note: '' },
]

function CardRect({ c }: { c: 'Y' | 'R' }) {
  return (
    <span style={{ width: 12, height: 16, borderRadius: 3, background: c === 'R' ? '#c39797' : '#cbbeb5', border: '1px solid #10211f', flexShrink: 0, display: 'inline-block' }} />
  )
}

export default function CardsTab() {
  return (
    <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, alignItems: 'start' }}>

      {/* Main: table */}
      <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Cards and suspensions</h2>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U12 and up · season 2026 · from Dribl</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Players with cards</h3>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>1 suspended · 1 close</span>
        </div>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) minmax(0,1.3fr) 150px', borderTop: '1px solid #e9eae8', padding: '6px 0', gap: '0 8px' }}>
          {['Player', 'This season', 'Status', ''].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>{h}</span>
          ))}
        </div>

        {/* Table rows */}
        {CARDS_DATA.map(row => (
          <div key={row.ini} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) minmax(0,1.3fr) 150px', alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', gap: '0 8px' }}>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</span>
              <span style={{ display: 'block', fontSize: 12, color: '#4a5a57', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.team}</span>
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {row.cards.map((cd, i) => <CardRect key={i} c={cd.c as 'Y' | 'R'} />)}
                <span style={{ marginLeft: 6, fontSize: 13, color: '#4a5a57', fontVariantNumeric: 'tabular-nums' }}>{row.cardsLabel}</span>
              </span>
            </span>
            <span style={{ minWidth: 0 }}>
              {row.badgeBg ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: row.badgeBg, color: '#10211f', whiteSpace: 'nowrap' }}>{row.badgeText}</span>
              ) : (
                <span style={{ fontSize: 14, color: '#4a5a57' }}>{row.badgeText}</span>
              )}
            </span>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>{row.note}</span>
          </div>
        ))}

        <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 12, background: '#eef5f2', fontSize: 13, lineHeight: '19px', display: 'flex', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true"><path d="M12 8v5M12 16h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg>
          <span>MiniRoos players don't accumulate yellow cards. Cards reset at the start of each finals series, not each season.</span>
        </div>
      </section>

      {/* Sidebar */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>How FV counts</h2>
        {[
          { badge: 'R', badgeBg: '#c39797', title: 'Red card', sub: 'Misses the next game automatically' },
          { badge: '5', badgeBg: '#cbbeb5', title: '5, 10 and 15 yellows', sub: 'Each one brings a suspension' },
          { badge: '—', badgeBg: '#eef5f2', title: 'MiniRoos', sub: 'No accumulation · cards not counted' },
        ].map(r => (
          <div key={r.badge} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: r.badgeBg, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.badge}</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{r.title}</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{r.sub}</span>
            </span>
          </div>
        ))}
        <span style={{ fontSize: 13, color: '#4a5a57', marginTop: 'auto', paddingTop: 12, lineHeight: '18px' }}>A suspended player can't be put in a line-up or on a team sheet. Their coach and parent are told the same day.</span>
        <div style={{ marginTop: 12, fontSize: 12, color: '#6f7f7b', borderTop: '1px solid #e9eae8', paddingTop: 10 }}>Last checked against Dribl: today 7:03 am</div>
      </aside>
    </div>
  )
}
