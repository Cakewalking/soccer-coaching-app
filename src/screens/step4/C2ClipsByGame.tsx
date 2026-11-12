const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

const GAMES = [
  { id: 'ironbark', opp: 'Ironbark United', date: 'Sat 30 May', res: 'W', score: '3–1', clips: 7, good: 4 },
  { id: 'saltmarsh', opp: 'Saltmarsh', date: 'Sat 23 May', res: 'L', score: '1–2', clips: 5, good: 1 },
  { id: 'tallwood', opp: 'Tallwood City', date: 'Sat 16 May', res: 'D', score: '1–1', clips: 5, good: 2 },
  { id: 'tealside', opp: 'Tealside Town', date: 'Sat 9 May', res: 'W', score: '2–0', clips: 5, good: 5 },
]

const CLIPS = [
  { id: 1, label: 'To work on', title: '9 s to win back', dur: '0:14', desc: 'Lost it on halfway', measure: 'Winning it back · min 16', players: ['NO', 'EB'], tagged: false },
  { id: 2, label: 'Good example', title: '8 passes', dur: '0:18', desc: 'Eight passes out from the keeper', measure: 'Building out · min 9', players: ['EB', 'MT'], tagged: true },
  { id: 3, label: 'Good example', title: 'Won in their half', dur: '0:11', desc: 'Front three force the mistake', measure: 'Pressing high · min 22', players: ['JP', 'ZH', 'LM'], tagged: false },
  { id: 4, label: 'To work on', title: '28 m gap', dur: '0:16', desc: 'A 28 m gap before their shot', measure: 'Gap between lines · min 29', players: ['TR', 'GO'], tagged: false },
  { id: 5, label: 'Good example', title: 'Goal in 8 s', dur: '0:12', desc: 'Win it, go, goal in 8 seconds', measure: 'Counter-attacks · min 37', players: ['ZH', 'JP', 'MT'], tagged: true },
  { id: 6, label: 'To work on', title: 'No press', dur: '0:10', desc: 'Slow to close down, legs gone', measure: 'Pressing high · min 52', players: ['LM', 'AL'], tagged: false },
  { id: 7, label: 'Good example', title: 'Goal', dur: '0:09', desc: "Mia's goal, 3–1", measure: 'Goals and chances · min 47', players: ['MT', 'AL'], tagged: false },
]

function ResChip({ res }: { res: string }) {
  const color = res === 'W' ? '#16a34a' : res === 'L' ? '#dc2626' : '#d97706'
  const bg = res === 'W' ? '#f0fdf4' : res === 'L' ? '#fef2f2' : '#fffbeb'
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: bg, color }}>{res}</span>
}

function LabelChip({ label }: { label: string }) {
  const good = label === 'Good example'
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: good ? '#f0fdf4' : '#fef2f2', color: good ? '#16a34a' : '#dc2626' }}>
      {label}
    </span>
  )
}

function Avatar({ init }: { init: string }) {
  return (
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{init}</div>
  )
}

export default function C2ClipsByGame() {
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, height: 44, flexShrink: 0 }}>
        {['Browse', 'Playlists', 'Shared with players'].map(t => (
          <div key={t} style={{ padding: '0 16px', height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: t === 'Browse' ? 700 : 500, color: t === 'Browse' ? G : MUT, borderBottom: t === 'Browse' ? `2px solid ${G}` : '2px solid transparent', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ padding: '0 16px', height: 44, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: MUT, borderBottom: '2px solid transparent', cursor: 'pointer' }}>
          To check
          <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 20, background: '#dc2626', color: '#fff' }}>3</span>
        </div>
      </div>

      {/* Browse header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, height: 48, flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>22 clips · 4 games</div>
        <div style={{ flex: 1 }} />
        {['By game', 'By measure', 'By player'].map(v => (
          <div key={v} style={{ padding: '6px 14px', borderRadius: 8, background: v === 'By game' ? PALE : 'transparent', border: v === 'By game' ? `1px solid ${G}` : `1px solid ${LN}`, fontSize: 13, fontWeight: v === 'By game' ? 700 : 500, color: v === 'By game' ? G : MUT, cursor: 'pointer' }}>{v}</div>
        ))}
        <div style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 13, color: MUT, cursor: 'pointer' }}>All games</div>
      </div>

      {/* Main 3-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 320px 1fr', flex: 1, overflow: 'hidden' }}>
        {/* Game list */}
        <div style={{ background: '#fff', borderRight: `1px solid ${LN}`, overflowY: 'auto', padding: '8px 0' }}>
          {GAMES.map(g => (
            <div key={g.id} style={{ padding: '12px 16px', cursor: 'pointer', background: g.id === 'ironbark' ? PALE : 'transparent', borderLeft: g.id === 'ironbark' ? `3px solid ${G}` : '3px solid transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <ResChip res={g.res} />
                <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{g.score}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{g.opp}</div>
              <div style={{ fontSize: 12, color: MUT }}>{g.date}</div>
              <div style={{ fontSize: 12, color: MUT }}>{g.clips} clips · {g.good} good</div>
            </div>
          ))}
        </div>

        {/* Clip list */}
        <div style={{ borderRight: `1px solid ${LN}`, overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', background: BG, borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Ironbark United · Sat 30 May · Won 3–1</div>
            <div style={{ fontSize: 12, color: MUT }}>Full match recorded · highlights are 4 min · review ready</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {['Highlights', 'All', 'Good', 'To work on'].map(f => (
                <div key={f} style={{ padding: '4px 10px', borderRadius: 6, background: f === 'All' ? G : '#fff', border: `1px solid ${f === 'All' ? G : LN}`, fontSize: 12, fontWeight: f === 'All' ? 700 : 500, color: f === 'All' ? '#fff' : MUT, cursor: 'pointer' }}>{f}</div>
              ))}
            </div>
          </div>
          {CLIPS.map((c) => (
            <div key={c.id} style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, cursor: 'pointer', background: c.id === 1 ? PALE : '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                <div>
                  <LabelChip label={c.label} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, flexShrink: 0 }}>{c.dur}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>{c.desc}</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>{c.measure}</div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {c.players.map(p => <Avatar key={p} init={p} />)}
                {c.tagged && <span style={{ fontSize: 11, color: MUT, marginLeft: 4 }}>Tagged by you</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Clip detail */}
        <div style={{ overflowY: 'auto', padding: 20 }}>
          <div style={{ background: '#10211f', borderRadius: 12, aspectRatio: '16/9', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid #fff', marginLeft: 4 }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>9 s to win back</div>
              <div style={{ fontSize: 13, color: MUT }}>Ironbark 3–1 · Sat 30 May · min 16 · Winning it back</div>
            </div>
            <LabelChip label="To work on" />
          </div>

          <div style={{ fontSize: 14, color: INK, marginBottom: 12 }}>Lost it on halfway. One player presses, the rest watch. Nine seconds before we win it back.</div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Win back', sub: 'Match camera', val: '9 s' },
              { label: 'Players pressing', sub: 'Match camera', val: '' },
              { label: 'Noah top speed', sub: 'GPS vest', val: '22 km/h' },
              { label: 'Distance to ball', sub: 'Match camera', val: '11 m' },
            ].map(d => (
              <div key={d.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{d.label}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{d.sub}</div>
                </div>
                {d.val && <div style={{ fontSize: 15, fontWeight: 800, color: G }}>{d.val}</div>}
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Measure</div>
            <div style={{ fontSize: 14, color: INK }}>Winning it back · Middle third · First half</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              <Avatar init="NO" />
              <Avatar init="EB" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '10px 14px', flex: 1, fontSize: 12, color: MUT, textAlign: 'center' as const }}>1 of 4</div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ height: 44, flex: 1, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>In Saturday's team talk</button>
            <button style={{ height: 44, flex: 1, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Send to 2 players</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button style={{ height: 44, flex: 1, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Add to playlist</button>
            <button style={{ height: 44, flex: 1, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Draw on it</button>
          </div>
        </div>
      </div>
    </div>
  )
}
