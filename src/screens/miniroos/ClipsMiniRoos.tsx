import { useState } from 'react'

// Comprehensive MiniRoos clips browser — same depth as the junior/youth Clips
// screen (filter modes, type filter, card grid, detail panel) but tuned for U9:
// browse by child / game / skill, "great moments" vs "things to try", and an
// equal-time "who had a go" lens. No tactical measures.

const G = '#2f6252', G2 = '#40826d', GD = '#1f4a3e', INK = '#10211f'
const MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', ROSE = '#c39797'
const AMBERBG = '#fdf8e8'

type Kind = 'great' | 'try'
type Clip = {
  id: string
  ini: string; name: string
  skill: string
  game: string
  min: number
  kind: Kind
  note: string
  avatarShade: 0 | 1 | 2
}

const GAMES = [
  { id: 'sat6',  label: 'Sat 6 Jun · Harbour',   sub: 'Filmed · 44 min' },
  { id: 'tue',   label: 'Tue training',          sub: 'Filmed · 30 min' },
  { id: 'may30', label: 'Sat 30 May · Ironbark', sub: 'Filmed · 40 min' },
]

const SKILLS = ['First touch', 'Dribbling', 'Passing', 'Defending', 'Shooting', 'Never gives up']

const CHILDREN = ['Ava Lindgren', 'Ella Brooks', 'Jai Patel', 'Mia Tran', 'Noah Okafor', 'Oscar Brennan', 'Lily Huang', 'Cal Wheeler', 'Grace Oni']

const CLIPS: Clip[] = [
  { id: 'c1',  ini: 'AL', name: 'Ava Lindgren',  skill: 'First touch',    game: 'sat6',  min: 23, kind: 'great', note: 'Controls a bouncing ball under pressure', avatarShade: 0 },
  { id: 'c2',  ini: 'EB', name: 'Ella Brooks',   skill: 'Dribbling',      game: 'sat6',  min: 11, kind: 'great', note: 'Dribbles past two defenders to set up a goal', avatarShade: 1 },
  { id: 'c3',  ini: 'JP', name: 'Jai Patel',     skill: 'First touch',    game: 'sat6',  min: 34, kind: 'great', note: 'First touch out of feet into space', avatarShade: 2 },
  { id: 'c4',  ini: 'MT', name: 'Mia Tran',      skill: 'Defending',      game: 'sat6',  min: 8,  kind: 'great', note: 'Tracks back and wins the ball near her own goal', avatarShade: 0 },
  { id: 'c5',  ini: 'NO', name: 'Noah Okafor',   skill: 'Passing',        game: 'sat6',  min: 41, kind: 'great', note: 'Volleys the ball to a teammate rather than the wall', avatarShade: 1 },
  { id: 'c6',  ini: 'OB', name: 'Oscar Brennan', skill: 'Shooting',       game: 'sat6',  min: 29, kind: 'try',   note: 'Takes a touch before shooting instead of first-time', avatarShade: 2 },
  { id: 'c7',  ini: 'LH', name: 'Lily Huang',    skill: 'Passing',        game: 'sat6',  min: 17, kind: 'great', note: 'Finds the open player instead of forcing it', avatarShade: 0 },
  { id: 'c8',  ini: 'CW', name: 'Cal Wheeler',   skill: 'Never gives up', game: 'sat6',  min: 38, kind: 'great', note: "Keeps going after losing the ball — doesn't stop", avatarShade: 1 },
  { id: 'c9',  ini: 'GO', name: 'Grace Oni',     skill: 'Dribbling',      game: 'tue',   min: 12, kind: 'great', note: 'Runs with the ball with her head up', avatarShade: 2 },
  { id: 'c10', ini: 'MT', name: 'Mia Tran',      skill: 'Shooting',       game: 'tue',   min: 20, kind: 'great', note: 'Lines up a shot after a quick turn', avatarShade: 0 },
  { id: 'c11', ini: 'AL', name: 'Ava Lindgren',  skill: 'Passing',        game: 'tue',   min: 25, kind: 'try',   note: 'Can look up a little earlier before passing', avatarShade: 0 },
  { id: 'c12', ini: 'NO', name: 'Noah Okafor',   skill: 'Defending',      game: 'may30', min: 14, kind: 'great', note: 'Jockeys the attacker instead of diving in', avatarShade: 1 },
  { id: 'c13', ini: 'JP', name: 'Jai Patel',     skill: 'Never gives up', game: 'may30', min: 31, kind: 'great', note: 'Chases a lost cause and wins a throw', avatarShade: 2 },
  { id: 'c14', ini: 'EB', name: 'Ella Brooks',   skill: 'First touch',    game: 'may30', min: 9,  kind: 'try',   note: 'A heavy first touch — soft cushion next time', avatarShade: 1 },
]

const SHADES = [G, GD, ROSE]

type Mode = 'child' | 'game' | 'skill'
type TypeFilter = 'all' | 'great' | 'try'

export default function ClipsMiniRoos({ empty, onBack }: { empty?: boolean; onBack?: () => void }) {
  const [mode, setMode] = useState<Mode>('child')
  const [child, setChild] = useState<string | null>(null)
  const [game, setGame] = useState<string | null>(null)
  const [skill, setSkill] = useState<string | null>(null)
  const [kind, setKind] = useState<TypeFilter>('all')
  const [selected, setSelected] = useState<Clip>(CLIPS[0])
  const [picked, setPicked] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2800) }
  function togglePick(id: string) { setPicked(p => p.includes(id) ? p.filter(x => x !== id) : p.length >= 2 ? [p[1], id] : [...p, id]) }

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: LN, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x={1} y={5} width={15} height={14} rx={2} /></svg>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Nothing filmed yet</div>
      <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 400 }}>Film a game or training session and the best moment for each child appears here.</div>
      {onBack && <button onClick={onBack} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Film something</button>}
    </div>
  )

  const base = CLIPS.filter(c =>
    (mode === 'child' ? (!child || c.name === child) : true) &&
    (mode === 'game' ? (!game || c.game === game) : true) &&
    (mode === 'skill' ? (!skill || c.skill === skill) : true)
  )
  const filtered = base.filter(c => kind === 'all' ? true : c.kind === kind)
  const childrenWithClips = new Set(CLIPS.map(c => c.name))

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ flex: 'none', padding: '16px 28px 0', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          {onBack && (
            <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: 999, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            </button>
          )}
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Clips</div>
            <div style={{ fontSize: 13, color: MUT }}>{CLIPS.length} clips · {GAMES.length} films · a moment for every child</div>
          </div>
          <div style={{ flexGrow: 1 }} />
          <button onClick={() => say(picked.length ? `${picked.length} clip${picked.length > 1 ? 's' : ''} saved for Tuesday.` : 'Tap clips to pick two for Tuesday.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Pick two for Tuesday{picked.length ? ` · ${picked.length}` : ''}</button>
          <button onClick={() => say(`Clips sent to ${childrenWithClips.size} families — each sees only their own child.`)} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to families</button>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12 }}>
          <div style={{ display: 'flex', gap: 2, background: '#f4f6f5', borderRadius: 999, padding: 3 }}>
            {(['child', 'game', 'skill'] as Mode[]).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ height: 32, padding: '0 16px', borderRadius: 999, border: 0, background: mode === m ? '#fff' : 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: mode === m ? INK : MUT, boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>By {m}</button>
            ))}
          </div>
          <div style={{ flexGrow: 1 }} />
          {(['all', 'great', 'try'] as TypeFilter[]).map(t => (
            <button key={t} onClick={() => setKind(t)} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: `1px solid ${kind === t ? G2 : LN}`, background: kind === t ? PALE : '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: kind === t ? G : MUT }}>{t === 'all' ? 'All' : t === 'great' ? 'Great moments' : 'Things to try'}</button>
          ))}
        </div>

        {/* Mode-specific chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 12 }}>
          {mode === 'child' && <>
            <Chip active={!child} onClick={() => setChild(null)} label="Everyone" count={CLIPS.length} />
            {CHILDREN.map(name => {
              const ini = name.split(' ').map(w => w[0]).join('').slice(0, 2)
              const n = CLIPS.filter(c => c.name === name).length
              return <Chip key={name} active={child === name} onClick={() => setChild(child === name ? null : name)} label={name.split(' ')[0]} count={n} avatar={ini} dim={n === 0} />
            })}
          </>}
          {mode === 'game' && <>
            <Chip active={!game} onClick={() => setGame(null)} label="All films" count={CLIPS.length} />
            {GAMES.map(g => <Chip key={g.id} active={game === g.id} onClick={() => setGame(game === g.id ? null : g.id)} label={g.label} count={CLIPS.filter(c => c.game === g.id).length} />)}
          </>}
          {mode === 'skill' && <>
            <Chip active={!skill} onClick={() => setSkill(null)} label="All skills" count={CLIPS.length} />
            {SKILLS.map(s => <Chip key={s} active={skill === s} onClick={() => setSkill(skill === s ? null : s)} label={s} count={CLIPS.filter(c => c.skill === s).length} />)}
          </>}
        </div>
      </div>

      {/* Body: grid + detail */}
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 4px 12px' }}>
            <span style={{ fontSize: 13, color: MUT }}>{filtered.length} clip{filtered.length !== 1 ? 's' : ''}{child ? ` · ${child.split(' ')[0]}` : game ? ` · ${GAMES.find(g => g.id === game)?.label}` : skill ? ` · ${skill}` : ''}</span>
            <div style={{ flexGrow: 1 }} />
            <button onClick={() => say(`Playing all ${filtered.length} clips.`)} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: 0, background: INK, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3" /></svg>Play all {filtered.length}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {filtered.map(c => (
              <ClipCard key={c.id} clip={c} selected={selected.id === c.id} picked={picked.includes(c.id)} onClick={() => setSelected(c)} onPick={() => togglePick(c.id)} />
            ))}
            {filtered.length === 0 && <div style={{ gridColumn: 'span 3', padding: 40, textAlign: 'center', color: MUT, fontSize: 15 }}>No clips match this filter.</div>}
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Who had a go</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>All 9 children have a clip this fortnight. Mia and Cal had the most touches. Harper and Bao aren't tracked — tap a child to film them Tuesday.</div>
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ width: 320, flex: 'none', borderLeft: `1px solid ${LN}`, background: '#fff', overflowY: 'auto', padding: 20 }}>
          <ClipDetail clip={selected} picked={picked.includes(selected.id)} onPick={() => togglePick(selected.id)} onSay={say} />
        </div>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

function Chip({ active, onClick, label, count, avatar, dim }: { active: boolean; onClick: () => void; label: string; count: number; avatar?: string; dim?: boolean }) {
  return (
    <button onClick={onClick} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${active ? G2 : LN}`, background: active ? PALE : '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: dim ? '#9aa6a3' : INK, display: 'flex', alignItems: 'center', gap: 7, opacity: dim ? 0.7 : 1 }}>
      {avatar && <span style={{ width: 20, height: 20, borderRadius: 999, background: dim ? '#d6ddda' : '#cbbeb5', color: INK, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{avatar}</span>}
      {label}
      <span style={{ fontSize: 12, color: MUT, fontWeight: 400 }}>{count}</span>
    </button>
  )
}

function KindTag({ kind }: { kind: Kind }) {
  const great = kind === 'great'
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: great ? PALE : AMBERBG, color: great ? G : '#7a5a00' }}>{great ? 'Great moment' : 'To try'}</span>
}

function ClipCard({ clip, selected, picked, onClick, onPick }: { clip: Clip; selected: boolean; picked: boolean; onClick: () => void; onPick: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', border: `1.5px solid ${selected ? G2 : LN}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16 / 9', background: `linear-gradient(135deg, ${GD}, ${G})` }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill={G}><polygon points="6 3 20 12 6 21 6 3" /></svg>
          </div>
        </div>
        <span style={{ position: 'absolute', top: 8, left: 8 }}><KindTag kind={clip.kind} /></span>
        <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(16,33,31,0.6)', borderRadius: 6, padding: '2px 7px' }}>{clip.min}′</span>
        <button onClick={e => { e.stopPropagation(); onPick() }} aria-label="Pick for Tuesday" style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 999, border: 0, background: picked ? G2 : 'rgba(255,255,255,0.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={picked ? '#fff' : G} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">{picked ? <path d="M20 6L9 17l-5-5" /> : <path d="M12 5v14M5 12h14" />}</svg>
        </button>
      </div>
      {/* Meta */}
      <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 32, height: 32, borderRadius: 999, background: SHADES[clip.avatarShade], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{clip.ini}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{clip.name}</div>
          <div style={{ fontSize: 12, color: MUT }}>{clip.skill}</div>
        </div>
      </div>
    </div>
  )
}

function ClipDetail({ clip, picked, onPick, onSay }: { clip: Clip; picked: boolean; onPick: () => void; onSay: (m: string) => void }) {
  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', background: `linear-gradient(135deg, ${GD}, ${G})`, borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
        <button onClick={() => onSay(`Playing ${clip.name}'s clip.`)} style={{ position: 'absolute', inset: 0, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 54, height: 54, borderRadius: 999, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill={G}><polygon points="6 3 20 12 6 21 6 3" /></svg>
          </span>
        </button>
        <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 12, fontWeight: 700, color: '#fff', background: 'rgba(16,33,31,0.6)', borderRadius: 6, padding: '2px 8px' }}>min {clip.min} · 0:12</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ width: 36, height: 36, borderRadius: 999, background: SHADES[clip.avatarShade], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{clip.ini}</span>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{clip.name}</div>
          <div style={{ fontSize: 12, color: MUT }}>{GAMES.find(g => g.id === clip.game)?.label}</div>
        </div>
        <KindTag kind={clip.kind} />
      </div>

      <div style={{ fontSize: 14, color: INK, lineHeight: 1.5, marginBottom: 12 }}>{clip.note}.</div>

      <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: GD, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>What to say to {clip.name.split(' ')[0]}</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>{clip.kind === 'great' ? `"${clip.skill.toLowerCase()} — that was brilliant. Can you do it again on Saturday?"` : `"Let's try it a little differently next time. We'll practise ${clip.skill.toLowerCase()} on Tuesday."`}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => onSay(`${clip.name}'s clip sent to their family.`)} style={{ height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Send to {clip.name.split(' ')[0]}'s family</button>
        <button onClick={onPick} style={{ height: 44, borderRadius: 10, border: `1px solid ${picked ? G2 : LN}`, background: picked ? PALE : '#fff', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{picked ? '✓ Picked for Tuesday' : 'Add to Tuesday'}</button>
        <button onClick={() => onSay('Added to this clip for review.')} style={{ height: 40, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add a note</button>
      </div>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginTop: 14, borderTop: `1px solid ${LN}`, paddingTop: 12 }}>
        Families only see their own child's clip. The full video is deleted after 90 days; clips stay for the season.
      </div>
    </div>
  )
}
