import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

function CoachClipsShell({ activeTab, children }: { activeTab: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, height: 44, flexShrink: 0 }}>
        {['Browse', 'Playlists', 'Shared with players'].map(t => (
          <div key={t} style={{ padding: '0 16px', height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: t === activeTab ? 700 : 500, color: t === activeTab ? G : MUT, borderBottom: t === activeTab ? `2px solid ${G}` : '2px solid transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ padding: '0 16px', height: 44, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: activeTab === 'To check' ? 700 : 500, color: activeTab === 'To check' ? G : MUT, borderBottom: activeTab === 'To check' ? `2px solid ${G}` : '2px solid transparent', cursor: 'pointer' }}>
          To check
          {activeTab !== 'To check' && <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 20, background: '#dc2626', color: '#fff' }}>3</span>}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

// ─── C3 Clips By Player ────────────────────────────────────────────────────────

export function C3ClipsByPlayer() {
  const players = [
    { init: 'ALL', name: 'Everyone', clips: 22 },
    { init: 'MT', name: 'Mia', clips: 6 },
    { init: 'NO', name: 'Noah', clips: 3 },
    { init: 'EB', name: 'Ella', clips: 6 },
    { init: 'JP', name: 'Jai', clips: 8 },
    { init: 'ZH', name: 'Zoe', clips: 4 },
    { init: 'AL', name: 'Ava', clips: 5 },
    { init: 'LM', name: 'Leo', clips: 6 },
    { init: 'GO', name: 'Grace', clips: 6 },
    { init: 'TR', name: 'Tom', clips: 5 },
  ]
  const miaClips = [
    { label: 'Good example', title: '8 passes', dur: '0:18', desc: 'Eight passes out from the keeper', measure: 'Building out · min 9 · Ironbark' },
    { label: 'Good example', title: 'Goal in 8 s', dur: '0:12', desc: 'Win it, go, goal in 8 seconds', measure: 'Counter-attacks · min 37 · Ironbark' },
    { label: 'Good example', title: 'Goal', dur: '0:09', desc: "Mia's goal, 3–1", measure: 'Goals and chances · min 47 · Ironbark' },
    { label: 'To work on', title: 'No press', dur: '0:10', desc: 'Slow to close down, legs gone', measure: 'Pressing high · min 52 · Ironbark' },
    { label: 'Good example', title: 'Set piece goal', dur: '0:08', desc: 'Corner routine, Mia converts', measure: 'Set pieces · min 61 · Saltmarsh' },
    { label: 'To work on', title: 'First touch', dur: '0:11', desc: 'Under pressure, touch went behind', measure: 'Ball control · min 15 · Tallwood City' },
  ]
  return (
    <CoachClipsShell activeTab="Browse">
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 28px', height: 48, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>22 clips · 4 games</div>
        <div style={{ flex: 1 }} />
        {['By game', 'By measure', 'By player'].map(v => (
          <div key={v} style={{ padding: '6px 14px', borderRadius: 8, background: v === 'By player' ? PALE : 'transparent', border: v === 'By player' ? `1px solid ${G}` : `1px solid ${LN}`, fontSize: 13, fontWeight: v === 'By player' ? 700 : 500, color: v === 'By player' ? G : MUT, cursor: 'pointer' }}>{v}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: 'calc(100% - 48px)', overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRight: `1px solid ${LN}`, overflowY: 'auto', padding: '8px 0' }}>
          {players.map(p => (
            <div key={p.init} style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, background: p.init === 'MT' ? PALE : 'transparent', borderLeft: p.init === 'MT' ? `3px solid ${G}` : '3px solid transparent' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.init === 'ALL' ? LN : G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: p.init === 'ALL' ? MUT : '#fff', flexShrink: 0 }}>{p.init === 'ALL' ? '·' : p.init}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: p.init === 'MT' ? 700 : 500, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{p.clips} clips</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ overflowY: 'auto', padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Mia Tran · 6 clips this season</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['All', 'Good', 'To work on'].map(f => (
              <div key={f} style={{ padding: '4px 12px', borderRadius: 6, background: f === 'All' ? G : '#fff', border: `1px solid ${f === 'All' ? G : LN}`, fontSize: 12, fontWeight: f === 'All' ? 700 : 500, color: f === 'All' ? '#fff' : MUT, cursor: 'pointer' }}>{f}</div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {miaClips.map((c, i) => {
              const good = c.label === 'Good example'
              return (
                <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: good ? '#f0fdf4' : '#fef2f2', color: good ? '#16a34a' : '#dc2626' }}>{c.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: MUT }}>{c.dur}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{c.desc}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{c.measure}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </CoachClipsShell>
  )
}

// ─── CL1 Playlists ─────────────────────────────────────────────────────────────

export function CL1Playlists() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const playlists = [
    { title: 'Team talk · Harbour Rovers', clips: 5, dur: '4 min', note: 'Ready for Saturday' },
    { title: "Pressing: what good looks like", clips: 9, dur: 'from 4 games', note: 'Used in 3 team talks' },
    { title: 'Back-post defending', clips: 4, dur: 'Leo and Grace', note: '' },
  ]
  return (
    <CoachClipsShell activeTab="Playlists">
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>Playlists and shared clips</div>
          <button onClick={() => st('Creating new playlist.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>+ New playlist</button>
        </div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Build a playlist once, use it in team talks or send it to players</div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {playlists.map((p, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid #fff', marginLeft: 3 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{p.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{p.clips} clips · {p.dur}</div>
                {p.note && <div style={{ fontSize: 12, color: G }}>{p.note}</div>}
              </div>
              <div style={{ fontSize: 20, color: MUT }}>›</div>
            </div>
          ))}
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </CoachClipsShell>
  )
}

// ─── TC1 To Check ─────────────────────────────────────────────────────────────

export function TC1ToCheck() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const checks = [
    { title: 'A win in their half?', game: 'Ironbark · min 24', question: 'Did we win the ball in their half?', certainty: '62% sure', desc: "Jai and their defender reached the ball together, right on halfway. It's hard to tell who got there first, and which side of the line it was.", options: ['Yes, in their half', 'Yes, but in our half', "No, they kept it", "Not sure, skip for now"] },
    { title: 'Who is this?', game: 'Ironbark · min 34', question: 'Which player is this?', certainty: '58% sure', desc: 'Two players are very close together here. Clean Sheet thinks it\'s Noah, but Ella is nearby.', options: ['Noah Okafor', 'Ella Brandt', 'Hard to tell', 'Skip for now'] },
    { title: 'A goal?', game: 'Ironbark · min 44', question: 'Did this go in?', certainty: '71% sure', desc: 'The ball crossed the line close to the post. Camera angle makes it uncertain.', options: ['Yes, it went in', 'No, it was saved', 'No, it went wide', 'Skip for now'] },
  ]
  return (
    <CoachClipsShell activeTab="To check">
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>To check</div>
          <div style={{ fontSize: 13, color: MUT }}>3 of 3 left · Ironbark United</div>
        </div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Only moments Clean Sheet is less than 80% sure about end up here. Most games have two or three.</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {checks.map((c, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ background: '#10211f', borderRadius: 8, aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '11px solid #fff', marginLeft: 3 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{c.title}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: '#fffbeb', color: '#d97706' }}>{c.certainty}</span>
                </div>
                <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>{c.game}</div>
                <div style={{ fontSize: 13, color: INK, marginBottom: 10 }}>{c.desc}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 8 }}>{c.question}</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                {c.options.map((opt, j) => (
                  <button key={j} style={{ height: 40, borderRadius: 8, border: `1px solid ${LN}`, background: j === 0 ? PALE : '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: j === 0 ? 700 : 500, color: j === 0 ? G : INK, cursor: 'pointer', textAlign: 'left' as const, paddingLeft: 14 }}>{opt}</button>
                ))}
              </div>
              <button onClick={() => st('Confirmed.')} style={{ width: '100%', height: 44, marginTop: 10, borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Confirm</button>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT }}>Your answer updates the review straight away.</div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </CoachClipsShell>
  )
}

export function TC1bToCheckDone() {
  return (
    <CoachClipsShell activeTab="To check">
      <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center' as const, maxWidth: 420 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>All checked</div>
          <div style={{ fontSize: 14, color: MUT }}>Ironbark United · 3 moments confirmed. The review has been updated.</div>
        </div>
      </div>
    </CoachClipsShell>
  )
}

export function TC1eToCheckEmpty() {
  return (
    <CoachClipsShell activeTab="To check">
      <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center' as const, maxWidth: 420 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Nothing to check</div>
          <div style={{ fontSize: 14, color: MUT }}>Clean Sheet was confident enough about every moment in this game. No review needed.</div>
        </div>
      </div>
    </CoachClipsShell>
  )
}
