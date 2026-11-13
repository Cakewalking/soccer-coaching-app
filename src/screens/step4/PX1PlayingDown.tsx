import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PX1PlayingDown({ onPlayer, onBandedNight }: { onPlayer?: () => void; onBandedNight?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const worthTalk = [
    { initials: 'EW', bg: '#8fa09b', name: 'Eli Ward', from: 'U14 Josh', note: 'Worth a talk', sub: '148 cm against team middle of 162 · duels won 31%' },
    { initials: 'SI', bg: '#a09080', name: 'Sana Iyer', from: 'U13 Girls Meg', note: 'Needs a view', sub: 'Coach has not answered yet' },
  ]
  const trainingDown = [
    { initials: 'KO', bg: '#6b9eab', name: 'Kai Osei', from: 'U14 Josh', note: 'Going well', sub: 'Training with U14 Josh since May · check-in every 6 weeks' },
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
        {['All players', 'Pathway', 'Playing across', 'Fair game time'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Playing across' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Playing across' ? 700 : 500, color: t === 'Playing across' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '24px 24px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Playing across</div>
              <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · 192 players looked at each Monday</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
              <button onClick={onBandedNight} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Mixed-age sessions</button>
              <button onClick={() => st('Nominating a player.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Nominate a player</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'An age group up · 3', active: false },
              { label: 'An age group down · 2', active: true },
              { label: 'Mixed-age sessions', active: false },
            ].map(s => (
              <button key={s.label} onClick={() => s.label === 'Mixed-age sessions' ? onBandedNight?.() : st(`Switching to ${s.label}.`)} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${s.active ? G : LN}`, background: s.active ? PALE : '#fff', fontSize: 13, color: s.active ? G : MUT, fontWeight: s.active ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{s.label}</button>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Worth a talk</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Growing later than their year. Great footballers who the game is becoming physically harder for.</div>
            {worthTalk.map(p => (
              <div key={p.name} onClick={onPlayer} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, cursor: 'pointer', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.from}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.sub}</div>
                </div>
                <div style={{ height: 28, padding: '0 12px', borderRadius: 999, background: p.note === 'Needs a view' ? '#fffbeb' : PALE, color: p.note === 'Needs a view' ? '#92400e' : G, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{p.note}</div>
                <div style={{ color: MUT }}>›</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Training with a younger group now</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>One night a week where they can play their game.</div>
            {trainingDown.map(p => (
              <div key={p.name} onClick={onPlayer} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', cursor: 'pointer', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.from}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.sub}</div>
                </div>
                <div style={{ height: 28, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center' }}>Going well</div>
                <div style={{ color: MUT }}>›</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 14, padding: '14px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>League games down need a dispensation</div>
            <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.5 }}>Training down is the club's decision. Playing league games an age group down requires the league's approval. Clean Sheet shows the dates and what is needed under League sync › Dispensations. It never implies a player can play down without approval.</div>
          </div>
        </div>

        {/* Right */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Words to use</div>
            {[
              { right: '"One night a week where he can play his game"', wrong: 'Never "dropped" or "moved down"' },
              { right: '"Growing later than most of his year, which is normal"', wrong: '' },
              { right: '"He stays an under 14"', wrong: 'Never "struggling"' },
            ].map((w, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: G }}>{w.right}</div>
                {w.wrong && <div style={{ fontSize: 12, color: '#c05' }}>{w.wrong}</div>}
              </div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 6 }}>Never shown</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Clean Sheet does not tell anyone a child's growth stage. It uses monthly heights to prompt a conversation — not a diagnosis.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
