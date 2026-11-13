import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Lesson = { title: string; tag: string; len: string; series?: string; watched?: string; thumb?: string }

function LessonCard({ l, onClick }: { l: Lesson; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = G}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = LN}
    >
      {/* Thumbnail */}
      <div style={{ background: GD, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '2px 6px' }}>{l.len}</div>
        {l.series && <div style={{ position: 'absolute', top: 6, left: 8, fontSize: 10, fontWeight: 700, color: '#fff', background: G, borderRadius: 4, padding: '2px 6px' }}>Series</div>}
      </div>
      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</div>
        <div style={{ fontSize: 11, color: MUT, background: PALE, borderRadius: 4, display: 'inline-block', padding: '2px 8px', marginBottom: 4 }}>{l.tag}</div>
        {l.series && <div style={{ fontSize: 11, color: MUT }}>{l.series}</div>}
        {l.watched && <div style={{ fontSize: 11, color: G, fontWeight: 600 }}>{l.watched}</div>}
      </div>
    </div>
  )
}

export default function EDU1Learn({ onLesson, onMakeLesson }: { onLesson?: () => void; onMakeLesson?: () => void }) {
  const [subTab, setSubTab] = useState<'players' | 'coaches'>('players')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const picked: Lesson[] = [
    { title: 'Stepping up together', tag: 'Staying compact', len: '0:14', series: '1 of 4 in "Staying compact"', watched: '9 of 16 watched' },
    { title: 'Closing the space behind the press', tag: 'Defender', len: '0:11', watched: '5 of 16 watched' },
  ]
  const club: Lesson[] = [
    { title: 'Scanning before the ball arrives', tag: 'Building up', len: '0:18' },
    { title: 'Playing out from the back', tag: 'Defender', len: '0:22' },
    { title: 'In goal: starting again', tag: 'Goalkeeper', len: '0:16' },
  ]
  const always: Lesson[] = [
    { title: 'First touch away from pressure', tag: 'Attacking', len: '0:19' },
    { title: 'Make a half-turn across the lines', tag: 'Midfielder', len: '0:17' },
    { title: 'Starting position for a through ball', tag: 'Striker', len: '0:21' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Clips' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Clip sub-tabs */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['By game', 'By measure', 'By player', 'Playlists', 'Learn'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Learn' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Learn' ? 700 : 500, color: t === 'Learn' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* For players / For coaches toggle */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 48 }}>
        <div style={{ display: 'flex', border: `1.5px solid ${LN}`, borderRadius: 999, overflow: 'hidden' }}>
          {(['players', 'coaches'] as const).map(v => (
            <button key={v} onClick={() => setSubTab(v)} style={{ height: 34, padding: '0 20px', background: subTab === v ? G : '#fff', border: 'none', fontSize: 13, color: subTab === v ? '#fff' : MUT, fontWeight: subTab === v ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>For {v}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search or skill or player" style={{ width: 220, height: 34, paddingLeft: 30, paddingRight: 12, border: `1.5px solid ${LN}`, borderRadius: 999, fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
          </div>
          {['By position', 'By position'].map((_f, i) => (
            <button key={i} onClick={() => st('Filtering.')} style={{ height: 34, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>{i === 0 ? 'Club style ▾' : 'By position ▾'}</button>
          ))}
          <button onClick={onMakeLesson} style={{ height: 34, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Make one from a clip</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>Learn</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Short clips of Wattle Creek players doing it well, with what to notice and something to try.</div>

        {/* Picked for this week */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Picked for this week</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Your gap between the lines is 26 m, target 18 — these lessons match.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {picked.map(l => <LessonCard key={l.title} l={l} onClick={onLesson} />)}
          </div>
        </div>

        {/* Series */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Staying compact · 1 of 4</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {picked.slice(0, 1).map(l => <LessonCard key={l.title} l={l} onClick={onLesson} />)}
          </div>
        </div>

        {/* New from the club */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>New from the club</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {club.map(l => <LessonCard key={l.title} l={l} onClick={onLesson} />)}
          </div>
        </div>

        {/* Always */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Always useful</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {always.map(l => <LessonCard key={l.title} l={l} onClick={onLesson} />)}
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
