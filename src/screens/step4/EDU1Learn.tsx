import { useState, useEffect, useRef } from 'react'
import { OpeningPanel, INK, MUT, HAIR, CTL, GREEN, PALEGREEN } from './directorParts'

const GD = '#1f4a3e', DARK = '#1c3a33'

function ClipReel({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'inherit', color: '#fff' }}>
      <span style={{ position: 'relative', display: 'block', height: 104, borderRadius: 10, background: GD, overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: '8%', right: '8%', top: '14%', bottom: '-20%', border: '2px solid rgba(255,255,255,0.25)', borderRadius: 4 }} />
        <span style={{ position: 'absolute', left: '50%', top: '14%', bottom: 0, width: 2, background: 'rgba(255,255,255,0.25)' }} />
        <span style={{ position: 'absolute', left: '50%', top: '50%', width: 40, height: 40, borderRadius: 999, background: 'rgba(16,33,31,0.6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(-50%,-50%)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 5l11 7-11 7z" /></svg></span>
        <span style={{ position: 'absolute', right: 8, bottom: 6, fontSize: 12, fontWeight: 700, color: '#fff' }}>0:14</span>
      </span>
      <span style={{ display: 'flex', gap: 6 }}>{['Step', 'Call', 'Offside'].map(c => <span key={c} style={{ flex: 1, height: 30, borderRadius: 6, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{c}</span>)}</span>
      <span style={{ fontSize: 13, lineHeight: '18px', color: '#a9cfc0' }}>Stepping up together · U14 Josh back four</span>
    </button>
  )
}

type Lesson = { title: string; credit: string; watched: string | null; skill: string; position: string; age: string; from: string }
const LESSONS: Lesson[] = [
  { title: 'Closing the space behind the press', credit: 'Grace Owusu, U12 Sam · v Tealside Town', watched: '5 of 17 watched', skill: 'Staying compact between the lines', position: 'Defender', age: 'Under 12', from: 'Your team' },
  { title: 'Scanning before the ball arrives', credit: 'From your club’s style', watched: null, skill: 'Playing out from the back', position: 'Midfielder', age: 'Under 12', from: 'The whole club' },
  { title: 'First touch away from pressure', credit: 'U12 Girls Ana · v Kestrel Park', watched: null, skill: 'Playing out from the back', position: 'Forward', age: 'Under 12', from: 'Your age group' },
  { title: 'Starting position for a through ball', credit: 'From the national curriculum', watched: null, skill: 'Attacking down the sides', position: 'Forward', age: 'Under 14', from: 'National curriculum' },
  { title: 'Winning it back in six seconds', credit: 'U14 Josh · v Ironbark', watched: null, skill: 'Winning it back in six seconds', position: 'Midfielder', age: 'Under 14', from: 'Your age group' },
  { title: 'Defending the back post', credit: 'From your club’s style', watched: null, skill: 'Defending crosses', position: 'Defender', age: 'Seniors', from: 'The whole club' },
  { title: 'The keeper’s starting spot', credit: 'From the national curriculum', watched: null, skill: 'Staying compact between the lines', position: 'Keeper', age: 'Under 9', from: 'National curriculum' },
]
const POSITIONS = ['Keeper', 'Defender', 'Midfielder', 'Forward']
const AGES = ['Under 9', 'Under 12', 'Under 14', 'Seniors']
const FROMS = ['Your team', 'Your age group', 'The whole club', 'National curriculum']
type FilterKey = 'skill' | 'position' | 'age' | 'from'
const SERIES = [
  { title: 'Staying compact', sub: '4 lessons in order · about 2 minutes', done: 1, of: 4 },
  { title: 'Playing out from the back', sub: '3 lessons · about 90 seconds', done: 0, of: 3 },
  { title: 'In goal: starting spots', sub: '2 lessons for your keepers', done: 0, of: 2 },
]
const SKILLS = [
  ['Playing out from the back', 7], ['Winning it back in six seconds', 6], ['Staying compact between the lines', 9],
  ['Counter-attacking', 4], ['Attacking down the sides', 5], ['Defending crosses', 3],
]

export default function EDU1Learn({ onNav, skillOpen = false, bare = false, audience }: { onNav?: (s: string) => void; skillOpen?: boolean; bare?: boolean; audience?: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null)
  const [nudged, setNudged] = useState(false)
  const [ticked, setTicked] = useState<number[]>(skillOpen ? [0] : [])
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(skillOpen ? 'skill' : null)
  const [filters, setFilters] = useState<{ position: string | null; age: string | null; from: string | null }>({ position: null, age: null, from: null })
  const [teamOn, setTeamOn] = useState(true)
  const [search, setSearch] = useState('')
  const filterRowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!openFilter) return
    const onDown = (e: MouseEvent) => { if (filterRowRef.current && !filterRowRef.current.contains(e.target as Node)) setOpenFilter(null) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [openFilter])
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const toggle = (i: number) => setTicked(t => t.includes(i) ? t.filter(x => x !== i) : [...t, i])

  const tickedSkills = ticked.map(i => SKILLS[i][0] as string)
  const filtered = LESSONS.filter(l =>
    (!teamOn || l.age === 'Under 12' || l.from === 'Your team') &&
    (tickedSkills.length === 0 || tickedSkills.includes(l.skill)) &&
    (!filters.position || l.position === filters.position) &&
    (!filters.age || l.age === filters.age) &&
    (!filters.from || l.from === filters.from) &&
    (!search.trim() || l.title.toLowerCase().includes(search.toLowerCase())),
  )

  const pill = (on: boolean): React.CSSProperties => ({ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${on ? GREEN : CTL}`, background: on ? PALEGREEN : '#fff', fontSize: 13, fontWeight: on ? 700 : 500, color: on ? GREEN : INK, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' })
  const Chevron = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>

  // single-select dropdown for Position / Age group / From
  function Dropdown({ fk, label, options }: { fk: 'position' | 'age' | 'from'; label: string; options: string[] }) {
    const val = filters[fk]
    const open = openFilter === fk
    return (
      <div style={{ position: 'relative' }}>
        <button onClick={() => setOpenFilter(open ? null : fk)} style={pill(!!val)}>{val ?? label}<Chevron /></button>
        {open && (
          <div style={{ position: 'absolute', top: 50, left: 0, minWidth: 190, background: '#fff', border: `1px solid ${CTL}`, borderRadius: 12, boxShadow: '0 12px 32px rgba(16,33,31,0.18)', zIndex: 40, padding: '6px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {options.map(o => (
              <button key={o} onClick={() => { setFilters(f => ({ ...f, [fk]: o })); setOpenFilter(null) }} style={{ height: 40, padding: '0 10px', borderRadius: 8, border: 'none', background: val === o ? PALEGREEN : 'none', fontSize: 13, fontWeight: val === o ? 700 : 500, color: val === o ? GREEN : INK, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>{o}</button>
            ))}
            {val && <button onClick={() => { setFilters(f => ({ ...f, [fk]: null })); setOpenFilter(null) }} style={{ height: 40, padding: '0 10px', borderRadius: 8, border: 'none', borderTop: `1px solid ${HAIR}`, background: 'none', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>Clear</button>}
          </div>
        )}
      </div>
    )
  }

  return (
    <div data-screen={skillOpen ? 'EDU1f-LearnFilter' : 'EDU1-Learn'} style={{ width: bare ? '100%' : 1180, height: bare ? '100%' : 820, flex: bare ? 1 : undefined, minHeight: 0, overflow: 'hidden', background: '#f7f8f7', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', boxSizing: 'border-box', color: INK }}>
      {/* Coach frame — omitted when embedded in a role frame (bare) to avoid a second nav */}
      {!bare && <>
      <div style={{ background: '#2f6252', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 56, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 8 }}>Clean Sheet</div>
        {[['Home', 'T1-TabletTraining'], ['Squad', 'T4-SquadTab'], ['Training', 'T3-TrainingTab'], ['Match day', 'T2-TabletMatch'], ['Clips', 'C1-ClipsTab'], ['Record', 'REC1-RecordHub']].map(([l, t]) => (
          <button key={l} onClick={() => onNav?.(t)} style={{ background: l === 'Clips' ? '#40826d' : 'none', borderRadius: 10, padding: '0 12px', height: 40, border: 'none', fontSize: 13, fontWeight: l === 'Clips' ? 700 : 600, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
        ))}
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 999, height: 36, padding: '0 12px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => onNav?.('VS1-SwitchView')} style={{ height: 40, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam ▾</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: INK }}>SK</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${CTL}`, padding: '0 28px', display: 'flex', gap: 24, height: 44, alignItems: 'center', flexShrink: 0 }}>
        {[['By game', 'C1-ClipsTab'], ['By measure', 'C1-ClipsTab'], ['By player', 'C1-ClipsTab'], ['Playlists', 'C1-ClipsTab'], ['Learn', 'EDU1-Learn']].map(([l, t]) => (
          <button key={l} onClick={() => onNav?.(t)} style={{ height: 44, background: 'none', border: 'none', borderBottom: l === 'Learn' ? `2.5px solid ${GREEN}` : '2px solid transparent', fontSize: 13, fontWeight: l === 'Learn' ? 700 : 600, color: l === 'Learn' ? INK : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
        ))}
      </div>
      </>}

      <OpeningPanel
        landing
        heading="LEARN · PICKED FOR THIS WEEK"
        sentence="Your gap between the lines is 26 metres. Watch Josh’s back four close theirs in three seconds."
        support="14 seconds from the under 14s v Ironbark, three things to notice, and a drill for tonight."
        rightWidth={300}
        right={<ClipReel onClick={() => onNav?.('EDU2-Lesson')} />}
        buttons={[{ label: 'Watch it', main: true, onClick: () => onNav?.('EDU2-Lesson') }, { label: nudged ? '✓ Sent to 8' : 'Send to the other 8', onClick: () => { setNudged(true); say('Sent to Finn, Isla and 6 others, with tonight’s drill.') } }]}
      />

      {/* Filter row */}
      <div ref={filterRowRef} style={{ flex: 'none', padding: '12px 28px 0', display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 30, flexWrap: 'wrap' as const }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${CTL}`, background: '#fff' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search 38 lessons" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: INK, fontFamily: 'inherit', width: 130 }} />
        </div>
        {audience}
        <button onClick={() => { setTeamOn(v => !v); say(teamOn ? 'Showing every lesson.' : 'Lessons picked for your team’s gaps.') }} style={pill(teamOn)}>For U12 Sam<Chevron /></button>

        {/* Skill — multi-select */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setOpenFilter(openFilter === 'skill' ? null : 'skill')} style={pill(tickedSkills.length > 0)}>{tickedSkills.length ? `${tickedSkills.length} skill${tickedSkills.length === 1 ? '' : 's'}` : 'Skill'}<Chevron /></button>
          {openFilter === 'skill' && (
            <div style={{ position: 'absolute', top: 50, left: 0, width: 300, background: '#fff', border: `1px solid ${CTL}`, borderRadius: 12, boxShadow: '0 12px 32px rgba(16,33,31,0.18)', zIndex: 40, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: MUT, marginBottom: 4 }}>FROM YOUR CLUB’S STYLE · 6 SKILLS</div>
              {SKILLS.map(([name, n], i) => (
                <button key={name as string} onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 40, padding: '0 4px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                  <span style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${ticked.includes(i) ? GREEN : CTL}`, background: ticked.includes(i) ? GREEN : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ticked.includes(i) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5 9-10" /></svg>}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: INK }}>{name}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{n}</span>
                </button>
              ))}
              <div style={{ display: 'flex', gap: 8, borderTop: `1px solid ${HAIR}`, paddingTop: 10, marginTop: 4 }}>
                <button onClick={() => setTicked([])} style={{ height: 40, padding: '0 14px', borderRadius: 8, border: `1px solid ${CTL}`, background: '#fff', fontSize: 13, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
                <button onClick={() => setOpenFilter(null)} style={{ flex: 1, height: 40, borderRadius: 8, border: 0, background: GREEN, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Show {filtered.length} lesson{filtered.length === 1 ? '' : 's'}</button>
              </div>
            </div>
          )}
        </div>

        <Dropdown fk="position" label="Position" options={POSITIONS} />
        <Dropdown fk="age" label="Age group" options={AGES} />
        <Dropdown fk="from" label="From" options={FROMS} />

        <span style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>{filtered.length} of {LESSONS.length} shown</span>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
          {filtered.length === 0 && (
            <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, padding: '24px', textAlign: 'center', color: MUT, fontSize: 14 }}>No lessons match those filters. Clear one to see more.</div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {filtered.map(l => (
              <button key={l.title} onClick={() => onNav?.('EDU2-Lesson')} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', padding: 0, display: 'flex', flexDirection: 'column' }}>
                <span style={{ height: 70, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 32, height: 32, borderRadius: 999, border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3" /></svg></span></span>
                <span style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <strong style={{ fontSize: 14, lineHeight: '19px', color: INK }}>{l.title}</strong>
                  <span style={{ fontSize: 12, color: MUT }}>{l.credit}</span>
                  {l.watched ? (
                    <><span style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: HAIR }}><span style={{ width: '31%', background: GREEN }} /></span><span style={{ fontSize: 12, color: MUT }}>{l.watched}</span></>
                  ) : <span style={{ fontSize: 12, color: MUT }}>Not sent to your players yet</span>}
                </span>
              </button>
            ))}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>In order, as a series</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {SERIES.map(s => (
              <button key={s.title} onClick={() => onNav?.('EDU2-Lesson')} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <strong style={{ fontSize: 14, color: INK }}>{s.title}</strong>
                <span style={{ fontSize: 12, color: MUT }}>{s.sub}</span>
                <span style={{ display: 'flex', gap: 3, marginTop: 'auto' }}>{Array.from({ length: s.of }, (_, i) => <span key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < s.done ? GREEN : HAIR }} />)}</span>
              </button>
            ))}
          </div>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Your players this week</h2>
            <div><div style={{ fontSize: 24, fontWeight: 800 }}>9 of 17</div><div style={{ fontSize: 13, color: MUT }}>watched “Stepping up together”</div></div>
            <div><div style={{ fontSize: 24, fontWeight: 800 }}>5 of 17</div><div style={{ fontSize: 13, color: MUT }}>tried the drill at home</div></div>
            <button onClick={() => { setNudged(true); say('Sent to Finn, Isla and 6 others, with tonight’s drill.') }} style={{ height: 44, borderRadius: 10, border: `1px solid ${CTL}`, background: '#fff', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>{nudged ? '✓ Nudged the 7' : 'Nudge the 8 who have not'}</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>From your team</h2>
            <div style={{ fontSize: 13, color: MUT, lineHeight: '19px' }}>Lessons you made from your own clips show here, ready to send or add to a series.</div>
          </div>
          <button onClick={() => onNav?.('EDU3-MakeLesson')} style={{ height: 46, borderRadius: 12, border: 0, background: GREEN, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Make one from a clip</button>
        </aside>
      </main>
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </div>
  )
}
