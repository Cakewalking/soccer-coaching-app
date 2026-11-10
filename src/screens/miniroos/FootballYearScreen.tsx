const G   = '#2f6252'
const G2  = '#40826d'
const GD  = '#1f4a3e'
const INK = '#10211f'
const MUT = '#4a5a57'
const LN  = '#e8edeb'
const PALE = '#eef5f2'

const PARTS = [
  {
    part: 'Pre-season',
    when: 'March and April',
    what: 'Share the link, pick a level, one come-and-try day',
    different: 'No trials. No grading games',
  },
  {
    part: 'Season',
    when: 'Late April to August',
    what: 'Four fun games a week, turns shared out',
    different: 'No scores or ladders',
  },
  {
    part: 'Post-season',
    when: 'September to November',
    what: 'Gala days and summer 4 v 4',
    different: 'Clips only. A medal for everyone',
  },
  {
    part: 'Rest',
    when: 'December and January',
    what: 'Nothing',
    different: 'Other sports are great',
  },
]

export default function FootballYearScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>The football year</div>
          <div style={{ fontSize: 13, color: MUT }}>U9 Tom · MiniRoos keep it simpler</div>
        </div>
        <button style={{ marginLeft: 'auto', height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', color: G2, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add a gala day</button>
      </div>

      {/* Come-and-try note */}
      <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: GD }}>Come-and-try day</div>
          <div style={{ fontSize: 12, color: G }}>Sat 28 March · Wattle Creek Reserve</div>
        </div>
        <button style={{ height: 32, padding: '0 12px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Details</button>
      </div>

      {/* Four parts heading */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Four parts, for under 12s</div>

      {/* Table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 2fr', padding: '8px 16px', background: GD }}>
          {['PART', 'WHEN', 'WHAT YOU DO', "WHAT'S DIFFERENT"].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)' }}>{h}</div>
          ))}
        </div>
        {PARTS.map((p, i) => (
          <div key={p.part} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 2fr', padding: '14px 16px', borderBottom: i < PARTS.length - 1 ? `1px solid ${LN}` : 'none', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: p.part === 'Season' ? GD : INK }}>{p.part}</div>
            <div style={{ fontSize: 13, color: MUT }}>{p.when}</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.4, paddingRight: 12 }}>{p.what}</div>
            <div style={{ fontSize: 13, color: p.part === 'Season' ? G : MUT, lineHeight: 1.4 }}>{p.different}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>Everyone who registers plays. If more children join than one team can take, the club makes a second team.</div>

      {/* Gala day */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>A gala day</div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { label: 'Games', value: '4 short games, 12 minutes each' },
            { label: 'Turns', value: 'Shared across the whole day' },
            { label: 'Scores', value: 'Not kept' },
            { label: 'Filming', value: "Clips only, with a parent's yes" },
          ].map((r, i) => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: i < 3 ? `1px solid ${LN}` : 'none' }}>
              <span style={{ width: 100, fontSize: 13, fontWeight: 700, color: INK }}>{r.label}</span>
              <span style={{ fontSize: 13, color: MUT }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Moving up */}
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>Moving up</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>At the end of the year the club rolls U9 Tom up to U10 Tom, from 7 a side to 9 a side. Families are asked if they're coming back.</div>
      </div>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Summer 4 v 4 is its own short team, like indoor for older players.</div>
    </div>
  )
}
