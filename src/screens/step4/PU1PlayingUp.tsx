import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Dot = 'full' | 'ring' | 'empty'
type Player = { initials: string; bg: string; name: string; from: string; to: string; sub: string; dots: [Dot,Dot,Dot,Dot,Dot]; status: string; statusColor: string }

function DotMark({ d, label }: { d: Dot; label: string }) {
  return (
    <div title={label} aria-label={label} style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${d === 'empty' ? '#c8d4d0' : G}`, background: d === 'full' ? G : 'transparent', flexShrink: 0 }} />
  )
}

const DOT_LABELS = ['Football', 'Body', 'Head', 'Settling in', 'Load']

export default function PU1PlayingUp({ onPlayer, onNominate, onSettings }: { onPlayer?: () => void; onNominate?: () => void; onSettings?: () => void }) {
  const [ageFilter, setAgeFilter] = useState<'All ages' | 'Girls' | 'Boys'>('All ages')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const worthLook: Player[] = [
    { initials: 'MT', bg: '#7a9e7e', name: 'Mia Tran', from: 'U12 Sam', to: 'U13 Girls Meg', sub: 'Sam nominated her too · strong for 8 weeks', dots: ['full','full','full','ring','full'], status: 'Ready to try', statusColor: G },
    { initials: 'TA', bg: '#8fa09b', name: 'Tane Waru', from: 'U14 Josh', to: 'U16 Ollie', sub: 'Head: coach has not answered yet', dots: ['full','full','ring','empty','ring'], status: 'Needs a view', statusColor: '#f59e0b' },
    { initials: 'ZP', bg: '#c0a070', name: 'Zoe Park', from: 'U11 Luke', to: 'U12 Girls Ana', sub: 'Would be her third team this year', dots: ['full','ring','ring','ring','ring'], status: 'Talk first', statusColor: MUT },
  ]
  const playingNow: Player[] = [
    { initials: 'LC', bg: '#6b9eab', name: 'Leo Costa', from: 'U13 Chris', to: 'U14 Josh', sub: 'Week 3 of 4 · training up, playing his own age', dots: ['full','full','full','full','ring'], status: 'Review 18 Jun', statusColor: G },
    { initials: 'AW', bg: '#a09080', name: 'Ava Walsh', from: 'U12 Sam', to: 'U13 Girls Meg', sub: 'Moved up in May · check-in every 6 weeks', dots: ['full','full','full','full','full'], status: 'Going well', statusColor: G },
  ]
  const heldBack: Player[] = [
    { initials: 'NO', bg: '#c05050', name: 'Noah Okafor', from: 'U14 Josh', to: '', sub: 'Growing fast, knee pain. Looked at in 8 weeks.', dots: ['full','empty','full','full','ring'], status: '', statusColor: '' },
  ]

  function PlayerRow({ p }: { p: Player }) {
    return (
      <div onClick={() => onPlayer?.()} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, cursor: 'pointer', gap: 12 }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = PALE}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
          <div style={{ fontSize: 12, color: MUT }}>{p.from}{p.to ? ` → ${p.to}` : ''}</div>
          <div style={{ fontSize: 11, color: MUT }}>{p.sub}</div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {p.dots.map((d, i) => <DotMark key={i} d={d} label={DOT_LABELS[i]} />)}
        </div>
        {p.status && (
          <div style={{ height: 28, padding: '0 12px', borderRadius: 999, background: p.statusColor === G ? PALE : p.statusColor === '#f59e0b' ? '#fffbeb' : '#f7f8f7', color: p.statusColor, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', flexShrink: 0 }}>{p.status}</div>
        )}
        <div style={{ color: MUT, fontSize: 16 }}>›</div>
      </div>
    )
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
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

      {/* Sub nav */}
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
              <button onClick={() => onSettings ? onSettings() : st('Opening what the club counts.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>What the club counts</button>
              <button onClick={() => onNominate?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Nominate a player</button>
            </div>
          </div>

          {/* Segments */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'An age group up · 3', active: true },
              { label: 'An age group down · 2', active: false },
              { label: 'Mixed-age sessions', active: false },
            ].map(s => (
              <button key={s.label} onClick={() => st(`Switching to ${s.label}.`)} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${s.active ? G : LN}`, background: s.active ? PALE : '#fff', fontSize: 13, color: s.active ? G : MUT, fontWeight: s.active ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{s.label}</button>
            ))}
            <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Up, down or mixed: the same idea. The right challenge for each player.</div>
          </div>

          {/* Column labels */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 0 8px 60px', gap: 12 }}>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 4 }}>
              {['F','B','H','S','L'].map(l => (
                <div key={l} style={{ width: 14, textAlign: 'center', fontSize: 11, fontWeight: 700, color: MUT }}>{l}</div>
              ))}
            </div>
            <div style={{ width: 100 }} />
            <div style={{ width: 24 }} />
          </div>

          {/* Worth a look */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, flex: 1 }}>Worth a look</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['All ages', 'Girls', 'Boys'] as const).map(f => (
                  <button key={f} onClick={() => setAgeFilter(f)} style={{ height: 28, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${ageFilter === f ? G : LN}`, background: ageFilter === f ? PALE : '#fff', fontSize: 12, color: ageFilter === f ? G : MUT, fontWeight: ageFilter === f ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 11, color: MUT, marginBottom: 12 }}>A to Z · full dot: strong · ring: some · empty: not yet</div>
            {worthLook.map(p => <PlayerRow key={p.name} p={p} />)}
          </div>

          {/* Playing up now */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Playing up now</div>
            {playingNow.map(p => <PlayerRow key={p.name} p={p} />)}
          </div>

          {/* Held back */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Held back by a rule</div>
            {heldBack.map(p => <PlayerRow key={p.name} p={p} />)}
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: MUT }}>Not a ranking and not a score. It says who is worth a conversation. People decide.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>How a player gets here</div>
            {[
              { n: 1, label: 'Stretched for 6 weeks', sub: 'Well above their own age group in games' },
              { n: 2, label: 'Nothing says wait', sub: 'Not in a growth spurt, not sore, not overloaded' },
              { n: 3, label: "Their coach agrees", sub: 'Or the coach nominates first' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>{item.n}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Held back by a rule</div>
            <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c05050', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>NO</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>Noah Okafor</div>
                <div style={{ fontSize: 12, color: MUT }}>Growing fast, knee pain. Looked at in 8 weeks.</div>
              </div>
            </div>
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 6 }}>Never used</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Size alone, results, or what a parent has asked for.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
