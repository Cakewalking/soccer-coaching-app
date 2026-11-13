import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Row = { label: string; val: string; pct: number; tag: string; tagColor: string }

function CompareRow({ r }: { r: Row }) {
  const tagBg = r.tagColor === G ? PALE : r.tagColor === '#f59e0b' ? '#fffbeb' : '#f7f8f7'
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 60px 1fr 100px', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
      <div style={{ fontSize: 13, color: INK }}>{r.label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.val}</div>
      <div style={{ position: 'relative', height: 20 }}>
        {/* Range band */}
        <div style={{ position: 'absolute', left: '20%', right: '20%', top: 6, height: 8, background: '#e0ece8', borderRadius: 999 }} />
        {/* Middle line */}
        <div style={{ position: 'absolute', left: '50%', top: 2, width: 2, height: 16, background: GD, borderRadius: 999 }} />
        {/* Player dot */}
        <div style={{ position: 'absolute', left: `${r.pct * 100}%`, top: 4, width: 12, height: 12, borderRadius: '50%', background: G, border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', transform: 'translateX(-6px)' }} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, background: tagBg, color: r.tagColor, borderRadius: 999, padding: '2px 10px', textAlign: 'center' }}>{r.tag}</div>
    </div>
  )
}

export default function PU4Compare({ onBack, onTrial }: { onBack?: () => void; onTrial?: () => void }) {
  const [posFilter, setPosFilter] = useState(false)
  const bodyRows: Row[] = [
    { label: 'Top speed', val: '24.1 km/h', pct: 0.72, tag: 'Upper third', tagColor: G },
    { label: '10 m sprint', val: '2.08 s', pct: 0.68, tag: 'Upper third', tagColor: G },
    { label: 'Sprints a game', val: '11', pct: 0.60, tag: 'Middle', tagColor: '#f59e0b' },
    { label: 'Distance a game', val: '4.4 km', pct: 0.78, tag: 'Above', tagColor: G },
  ]
  const footballRows: Row[] = [
    { label: 'Duels won', val: '71%', pct: 0.80, tag: 'Above', tagColor: G },
    { label: 'Fwd passes under press.', val: '68%', pct: 0.73, tag: 'Upper third', tagColor: G },
    { label: 'Wins of the ball', val: '7', pct: 0.65, tag: 'Middle', tagColor: '#f59e0b' },
    { label: 'Goals and assists', val: '0.9', pct: 0.70, tag: 'Upper third', tagColor: G },
    { label: 'Touches', val: '48', pct: 0.55, tag: 'Middle', tagColor: '#f59e0b' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Mia Tran</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Mia against the team above</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: INK, cursor: 'pointer' }}>
            <input type="checkbox" checked={posFilter} onChange={e => setPosFilter(e.target.checked)} />
            Midfielders only
          </label>
          <button onClick={onBack} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Back to Mia</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '24px 24px 24px 32px' }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>Mia against the team above</div>
            <div style={{ fontSize: 13, color: MUT }}>U13 Girls Meg · all 14 players · per 60 minutes played</div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 16, fontSize: 12, color: MUT }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 40, height: 8, background: '#e0ece8', borderRadius: 999 }} />
              <span>U13 Meg range</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 2, height: 16, background: GD }} />
              <span>Their middle</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: G, border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              <span>Mia</span>
            </div>
          </div>

          {/* Body block */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, flex: 1 }}>Body</div>
              <div style={{ fontSize: 12, color: MUT, background: '#f0faf5', borderRadius: 999, padding: '2px 10px' }}>Fair to compare</div>
            </div>
            {bodyRows.map(r => <CompareRow key={r.label} r={r} />)}
          </div>

          {/* Football block */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, flex: 1 }}>Football · her games against U13s</div>
              <div style={{ fontSize: 12, color: '#f59e0b', background: '#fffbeb', borderRadius: 999, padding: '2px 10px' }}>Compare with care</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>2 guest sessions with the U13s. These are the fairest evidence once a trial starts.</div>
            {footballRows.map(r => <CompareRow key={r.label} r={r} />)}
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: MUT }}>Ranges hidden if fewer than 8 players have data. The older team appears as a range only — no player is named.</div>
        </div>

        {/* Summary */}
        <div style={{ width: 220, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>In one line</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: G }}>9 of 9</div>
            <div style={{ fontSize: 13, color: MUT, marginTop: 4, lineHeight: 1.5 }}>Inside or above the U13 range. Above their middle on 5.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>The best evidence</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>2 guest sessions with the U13s. As they flag, once a trial starts, they replace the own-age numbers as the main view.</div>
            <button onClick={() => onTrial?.()} style={{ marginTop: 10, height: 32, padding: '0 14px', borderRadius: 999, background: PALE, border: 'none', fontSize: 12, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a trial →</button>
          </div>
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 14, padding: '14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>Read with care</div>
            <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.5 }}>Small, run against older players with more experience. Numbers tell part of the story. People decide.</div>
          </div>
        </div>
      </div>

    </div>
  )
}
