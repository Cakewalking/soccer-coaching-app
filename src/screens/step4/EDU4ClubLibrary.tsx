import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU4ClubLibrary({ onLesson, onMakeLesson }: { onLesson?: () => void; onMakeLesson?: () => void }) {
  const [search, setSearch] = useState('')
  const [ageFilter, setAgeFilter] = useState('All ages')
  const [posFilter, setPosFilter] = useState('All positions')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const lessons = [
    { title: 'Scanning before the ball arrives', age: 'U12–U16', pos: 'All', coach: 'Sam Knight', team: 'U12 Sam', len: '0:18', used: 4 },
    { title: 'Playing out from the back', age: 'U13–U16', pos: 'Defender', coach: 'Dana Fox', team: 'U14 Josh', len: '0:22', used: 2 },
    { title: 'In goal: starting again', age: 'U12+', pos: 'Goalkeeper', coach: 'Chris Ward', team: 'U13 Girls', len: '0:16', used: 1 },
    { title: 'Make a half-turn across the lines', age: 'U13+', pos: 'Midfielder', coach: 'Sam Knight', team: 'U12 Sam', len: '0:17', used: 3 },
    { title: 'Starting position for a through ball', age: 'U13+', pos: 'Striker', coach: 'Meg Obi', team: 'U13 Girls', len: '0:21', used: 2 },
    { title: 'Recovery shape after a goal kick', age: 'U14+', pos: 'All', coach: 'Dana Fox', team: 'U14 Josh', len: '0:19', used: 1 },
    { title: 'First touch away from pressure', age: 'U12+', pos: 'All', coach: 'Sam Knight', team: 'U12 Sam', len: '0:19', used: 5 },
    { title: 'Closing the space behind the press', age: 'U13+', pos: 'Defender', coach: 'Chris Ward', team: 'U13 Girls', len: '0:11', used: 3 },
  ]

  const filtered = lessons.filter(l =>
    (!search || l.title.toLowerCase().includes(search.toLowerCase())) &&
    (ageFilter === 'All ages' || l.age.includes(ageFilter.replace('U', ''))) &&
    (posFilter === 'All positions' || l.pos === posFilter || l.pos === 'All')
  )

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>Wattle Creek FC</div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Club files', 'Templates', 'Lesson library', 'Settings'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Lesson library' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Lesson library' ? 700 : 500, color: t === 'Lesson library' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ background: '#fff', padding: '14px 32px', borderBottom: `1px solid ${LN}`, display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lessons" style={{ width: '100%', height: 36, paddingLeft: 32, paddingRight: 12, border: `1.5px solid ${LN}`, borderRadius: 999, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        {(['All ages', 'U12', 'U13', 'U14', 'U15'] as const).map(a => (
          <button key={a} onClick={() => setAgeFilter(a)} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${ageFilter === a ? G : LN}`, background: ageFilter === a ? PALE : '#fff', fontSize: 13, color: ageFilter === a ? G : MUT, fontWeight: ageFilter === a ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{a}</button>
        ))}
        {(['All positions', 'Goalkeeper', 'Defender', 'Midfielder', 'Striker'] as const).map(p => (
          <button key={p} onClick={() => setPosFilter(p)} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${posFilter === p ? G : LN}`, background: posFilter === p ? PALE : '#fff', fontSize: 13, color: posFilter === p ? G : MUT, fontWeight: posFilter === p ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', display: p === 'All positions' ? 'flex' : p.length > 8 ? 'none' : 'flex', alignItems: 'center' }}>{p.length <= 8 ? p : p === 'Goalkeeper' ? 'GK' : p}</button>
        ))}
        <button onClick={onMakeLesson} style={{ marginLeft: 'auto', height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Make a lesson</button>
      </div>

      <div style={{ flex: 1, padding: '24px 32px' }}>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>{filtered.length} lessons · {lessons.reduce((a, l) => a + l.used, 0)} team uses this season</div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 80px 60px', padding: '10px 20px', borderBottom: `1.5px solid ${LN}`, background: '#f7f8f7' }}>
            {['Lesson', 'Age', 'Position', 'Coach', 'Uses', ''].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: MUT }}>{h}</div>
            ))}
          </div>
          {filtered.map((l, i) => (
            <div key={l.title} onClick={onLesson} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 80px 60px', padding: '12px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = PALE}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{l.title}</div>
                <div style={{ fontSize: 11, color: MUT }}>by {l.coach} · {l.team} · {l.len}</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>{l.age}</div>
              <div style={{ fontSize: 12, color: MUT }}>{l.pos}</div>
              <div style={{ fontSize: 12, color: MUT }}>{l.coach}</div>
              <div style={{ fontSize: 12, color: l.used >= 3 ? G : MUT, fontWeight: l.used >= 3 ? 700 : 400 }}>{l.used} team{l.used !== 1 ? 's' : ''}</div>
              <button onClick={e => { e.stopPropagation(); st(`Adding to your team.`) }} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: '#fff', border: `1.5px solid ${LN}`, fontSize: 11, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add</button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: MUT }}>No lessons match</div>
          )}
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
