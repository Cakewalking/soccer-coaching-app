// The justified session: the coach's screens.
// GS1 the proposed session · GS2 one drill explained · GS3 run sheet · GS4 who's coming ·
// GS5 how much to explain · GS6 a week with nothing to go on · GS7 season so far · GS8 learn to coach.
// Every part shows a one-line why and its evidence, at every level.

import { useState, type ReactNode } from 'react'
import { Btn, Note, Ico, tile, h2, cap, label, G, INK, MUT, LINE, PALE, DARK } from '../capture/marks'
const AMBER = '#f4c95d'   // proof figures marked Strong, and nothing else
import { Page, col } from '../capture/CaptureScreens'
import { playClips } from '../clips/clipSheet'
import { TEAMS, ABOUT, TAG, menu, size, groups, proposeSession, whatChanged, kit, type Chip, type Drill, type Level, type Part, type Player, type Session, type Team, type TeamKey } from './sessionEngine'
import { useSession, setSession, setTeam, present, counts, sessionFor, type Answer, type SessionState } from './sessionStore'

export type Go = (target: string) => void
export interface GsProps { s: SessionState; k: TeamKey; go: Go; say: (m: string) => void; part: number; setPart: (i: number) => void; /** start the session at the pitch, where the app has a pitch-side mode */ start?: () => void }
const LEVEL_NAME: Record<Level, string> = { new: 'New to coaching', some: 'A few seasons in', experienced: 'Experienced' }
const day = (t: Team) => t.day.startsWith('Tue') ? 'Tuesday' : 'Thursday'
const ICON: Record<Chip['kind'], string> = {
  film: 'M4 7h11v10H4zM15 10l5-3v10l-5-3', vests: 'M7 4l5 3 5-3 3 4-3 2v10H7V10L4 8z', note: 'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z',
  rating: 'M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z', players: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  curriculum: 'M6 4h12v16H6zM9 4v16', season: 'M5 5h14v15H5zM5 10h14M9 3v4M15 3v4',
}
function ChipTag({ c, long }: { c: Chip; long?: boolean }) {
  const text = c.mark ? `${long && c.kind === 'film' ? 'Counted from film' : c.text} · ${c.mark === 'strong' ? 'Strong' : 'Estimate'}` : c.text
  return <span data-chip={c.kind} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 28, padding: '3px 10px', borderRadius: 8, background: PALE, color: INK, fontSize: 13, lineHeight: '18px' }}><Ico d={ICON[c.kind]} size={14} /><span>{text}</span></span>
}
const Line = ({ a, b, v }: { a: string; b?: string; v: ReactNode }) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 46, padding: '5px 0', borderTop: `1px solid ${LINE}` }}><span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{a}</strong>{b && <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{b}</span>}</span><strong style={{ flex: 'none', fontSize: 14, textAlign: 'right', whiteSpace: 'nowrap' }}>{v}</strong></div>

// ── Set-up pictures: drawn from the kind of drill, sized by how many squares ──
function Picture({ drill, big }: { drill: Drill; big?: boolean }) {
  const dot = (x: number, y: number, on = true, key?: string) => <circle key={key ?? `${x}-${y}`} cx={x} cy={y} r={big ? 7 : 5} fill={on ? '#fff' : 'none'} stroke="#fff" strokeWidth="1.8" />
  const w = 200, h = big ? 112 : 104
  const body = drill.kind === 'game' || drill.kind === 'all'
    ? <><rect x="18" y="12" width={w - 36} height={h - 24} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" /><path d={`M${w / 2} 12v${h - 24}`} stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />{drill.kind === 'game' && <><rect x="12" y={h / 2 - 12} width="6" height="24" fill="none" stroke="#fff" strokeOpacity="0.7" /><rect x={w - 18} y={h / 2 - 12} width="6" height="24" fill="none" stroke="#fff" strokeOpacity="0.7" /></>}
        {[[46, 30], [88, 24], [70, 52], [46, 76]].map(([x, y]) => dot(x, y))}{[[124, 30], [146, 52], [124, 76], [112, 82]].map(([x, y]) => dot(x, y, false))}<circle cx="98" cy="52" r="4" fill={AMBER} /></>
    : drill.kind === 'gate'
      ? <><rect x="26" y="14" width={w - 52} height={h - 28} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />{dot(46, 36)}{dot(46, 76)}{dot(86, 56)}{dot(108, 56, false)}<path d="M52 38l28 14M92 56h60" stroke="#fff" strokeWidth="1.6" strokeDasharray="0" fill="none" /><path d={`M${w - 30} 44l8 0M${w - 30} 68l8 0`} stroke="#fff" strokeWidth="3" /></>
      : drill.kind === 'unit' || drill.kind === 'lanes'
        ? <><rect x="18" y="12" width={w - 36} height={h - 24} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" /><rect x="18" y={h / 2 - 22} width="34" height="44" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />{[[36, 52], [70, 28], [70, 76], [104, 52], [138, 30], [138, 74]].map(([x, y]) => dot(x, y))}{[[92, 36], [120, 52], [92, 70]].map(([x, y]) => dot(x, y, false))}<path d="M42 50l22-18M76 30l24 18" stroke="#fff" strokeWidth="1.6" fill="none" /></>
        : <><rect x="50" y="16" width="100" height={h - 32} fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.5" />{dot(100, 16)}{dot(50, h / 2)}{dot(150, h / 2)}{dot(100, h - 16)}{dot(90, h / 2 - 6, false)}{dot(112, h / 2 + 6, false)}<path d={`M106 20l38 ${h / 2 - 26}`} stroke="#fff" strokeWidth="1.6" /><path d={`M144 ${h / 2 + 6}l-38 ${h / 2 - 26}`} stroke="#fff" strokeWidth="1.6" strokeDasharray="4 4" /><circle cx="100" cy="8" r="3.5" fill={AMBER} /></>
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`How to set up ${drill.name}`} style={{ display: 'block', width: '100%', borderRadius: 12, background: G }}>{body}</svg>
}
const setupText = (d: Drill, n: number) => { const z = size(d, n), t = n >= 12 ? 'Three taggers' : n >= 7 ? 'Two taggers' : 'One tagger'; return d.setup.replace('{squares}', z.groups).replace('{taggers}', t) }

// ── GS1 and GS6 · the session, and why each part is in it ────────────────────
function SessionBody({ s, k, go, say, setPart, ses, id }: GsProps & { ses: Session; id: string }) {
  const t = TEAMS[k], ts = s.teams[k], level = s.level, c = counts(ts), bye = ses.from === 'bye'
  const [swap, setSwap] = useState<number | null>(null)
  const [asked, setAsked] = useState<number | null>(null)
  return (
    <Page id={id} title={`${day(t)}’s session`} sub={bye ? `${t.label} · ${k === 'u11' ? 'Tue 30 June' : t.day}, ${t.time} · no game last weekend` : `${t.label} · ${t.day}, ${t.time} · ${t.place}`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('GS5-CoachLevel')}>Showing: {LEVEL_NAME[level].toLowerCase()}</Btn><Btn primary big onClick={() => go('GS3-RunSheet')}>Open the run sheet</Btn></>}>
      <div style={col}>
        <section aria-label="Why this session" style={{ borderRadius: 18, background: DARK, color: '#fff', padding: '13px 22px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>{bye ? 'A BYE WEEK · NOTHING NEW TO GO ON' : ses.from === 'small' ? 'A SMALL GROUP · A DIFFERENT SESSION' : 'BUILT FROM SATURDAY’S GAME · NOT A FIXED TIMETABLE'}</span>
            <strong style={{ fontSize: 22, lineHeight: '28px', letterSpacing: '-0.01em' }}>{ses.headline}</strong>
            <span style={{ fontSize: 13, lineHeight: '19px', color: '#cfe6dc' }}>{ses.sub}</span>
          </span>
          {([[String(ses.n), 'coming', bye ? `of ${t.polled}` : `of ${t.polled} · sized for ${ses.n}`], [String(ses.parts.reduce((a, p) => a + p.mins, 0)), 'minutes', `${ses.parts.length} parts`]] as const).map(([n, a, b]) => (
            <span key={a} style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 36, lineHeight: '40px', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{n}</strong><strong style={{ fontSize: 13 }}>{a}</strong><span style={{ fontSize: 12, color: '#a9cfc0' }}>{b}</span></span>
          ))}
        </section>
        <section aria-label="The session" style={{ ...tile, gap: 0, padding: '11px 18px 2px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>The session, and why each part is in it</h2>
          {ses.parts.map((p, i) => { const others = menu(p.drill.theme, t, s.rules).filter(x => x.id !== p.drill.id).slice(0, 3); return (
            <div key={i} data-part={i} style={{ borderTop: `1px solid ${LINE}`, padding: '8px 0 9px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '66px minmax(0,1fr) auto', gap: 12, alignItems: 'start' }}>
                <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>{p.at}</strong><span style={{ fontSize: 13, color: MUT }}>{p.mins} min</span></span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}><strong style={{ fontSize: 16, lineHeight: '22px' }}>{p.drill.name}</strong><span style={{ ...label, fontSize: 11 }}>{p.tag}</span></span>
                  <span style={{ fontSize: 14, lineHeight: '20px' }}>{level !== 'experienced' && <strong>Why: </strong>}{p.why[level]}</span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{p.chips.map(ch => <ChipTag key={ch.text} c={ch} />)}</span>
                </span>
                <span style={{ display: 'flex', gap: 6 }}>
                  <Btn primary aria-label={`Why this: ${p.drill.name}`} onClick={() => { setPart(i); go('GS2-DrillWhy') }}>Why this</Btn>
                  <Btn aria-label={`Swap ${p.drill.name}`} aria-pressed={swap === i} onClick={() => { setSwap(swap === i ? null : i); setAsked(null); if (swap !== i) say(others.length ? 'Three other games for the same reason. Pick one and the session changes.' : 'Nothing else in your club’s sources fits this reason yet.') }}>Swap</Btn>
                </span>
              </div>
              {swap === i && others.length > 0 && (
                <div role="group" aria-label={`Other games for ${p.tag.toLowerCase()}`} style={{ margin: '10px 0 0 78px', padding: 10, borderRadius: 12, background: PALE, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>For the same reason</span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{others.map(o => <Btn key={o.id} onClick={() => { setTeam(k, x => ({ swaps: { ...x.swaps, [i]: o.id } })); setSwap(null); setAsked(i); say(`${o.name} is in. Same reason, same evidence.`) }}>{o.name}</Btn>)}</span>
                </div>
              )}
              {asked === i && (
                <div role="group" aria-label="Why did you swap?" style={{ margin: '10px 0 0 78px', padding: 10, borderRadius: 12, background: PALE, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Why did you swap? One tap, and next week’s suggestions get closer.</span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{['Did it lately', 'Too hard for them', 'Not enough space', 'I prefer this one'].map(r => <Btn key={r} onClick={() => { setTeam(k, x => ({ swapWhy: { ...x.swapWhy, [i]: r } })); setAsked(null); say(`Noted: ${r.toLowerCase()}. We use it next week.`) }}>{r}</Btn>)}</span>
                </div>
              )}
            </div>) })}
        </section>
      </div>
      <div style={col}>
        {bye ? (
          <section aria-label="Why it looks different this week" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}>
            <h2 style={{ ...h2, paddingBottom: 6 }}>Why it looks different this week</h2>
            <Line a="No film" b="No game was played" v="" /><Line a="No notes or ratings from a game" v="" /><Line a="The curriculum for this age" b="Fills the gap, and we say so" v="" /><Line a="Your season so far" b="What you have and haven’t covered" v="" />
          </section>
        ) : (
          <section aria-label="What this is built from" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}>
            <h2 style={{ ...h2, paddingBottom: 6 }}>What this is built from</h2>
            {t.film && <Line a="Saturday’s film" b={t.film[0]} v={t.film[1]} />}
            <Line a="Your three taps and one note" b={`“${t.note}”`} v={t.noteWhen} />
            <Line a="Your ratings" b={`And ${Math.max(3, Math.floor(t.squad.length / 2))} players’ own views`} v={t.ratings} />
            <Line a="Who is coming" b={ts.atPitch ? 'You tapped who is here' : `Poll closes ${day(t)} 3 pm`} v={ts.atPitch ? `${ts.here.length} here` : `${c.yes} yes, ${c.no} no, ${c.none} no answer`} />
            {t.age <= 18 && <Line a={`What ${t.ageWord} should be learning`} b="From the national curriculum for this age" v={t.curriculumSkill} />}
          </section>
        )}
        {bye
          ? <><Note title="No film at all this season?">It still works. Three taps after each game and one note are enough to choose the session. Film makes the reasons more exact.</Note><Btn big onClick={() => go('GS7-SeasonLookBack')}>See your season so far</Btn></>
          : <button onClick={() => go('GS8-WelcomeCourse')} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, padding: '10px 14px', borderRadius: 14, border: 0, background: PALE, color: INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
              <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 10, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d="M8 5l11 7-11 7z" size={16} /></span>
              <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>Two minutes before {day(t)}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{ses.parts[1]?.drill.name.toLowerCase().startsWith('keep-ball') ? 'How to coach a keep-ball game without stopping it' : `A short film on “${ses.parts[1]?.drill.name}”, and what to say`}</span></span>
              <Ico d="M9 6l6 6-6 6" size={16} sw={2.4} />
            </button>}
        {!bye && <Note title="You are still the coach">Swap any part, change the times, or build your own. Tell us why you swapped and next week’s suggestions get closer to how you coach.</Note>}
        <Btn onClick={() => { setTeam(k, { bye: !bye, swaps: {} }); if (bye) go('GS1-ProposedSession'); say(bye ? 'Back to this week: built from Saturday’s game.' : 'Showing a week with no game.') }}>{bye ? 'Back to a week with a game' : 'See a week with no game'}</Btn>
      </div>
    </Page>
  )
}
export function GS1ProposedSession(p: GsProps) { const ses = sessionFor(p.s, p.k); return <SessionBody {...p} ses={ses} id={ses.from === 'bye' ? 'GS6-NothingToGoOn' : 'GS1-ProposedSession'} /> }
export function GS6NothingToGoOn(p: GsProps) { return <SessionBody {...p} ses={sessionFor(p.s, p.k, { bye: true })} id="GS6-NothingToGoOn" /> }

// ── GS2 · one drill explained ────────────────────────────────────────────────
export function GS2DrillWhy({ s, k, go, say, part }: GsProps) {
  const t = TEAMS[k], ts = s.teams[k], ses = sessionFor(s, k), p: Part = ses.parts[Math.min(part, ses.parts.length - 1)], d = p.drill, about = ABOUT[d.theme], level = s.level
  const [all, setAll] = useState(false)   // an experienced coach sees one line, and can open the rest
  const ev = t.evidence.find(e => e.theme === d.theme && ses.from !== 'bye'), strong = p.chips.some(c => c.kind === 'film' && c.mark === 'strong')
  const z = p.sized, sq = z.squares, isSq = d.kind === 'squares' || d.kind === 'gate'
  const kitList = d.kind === 'all' ? [`${d.theme === 'warmup' ? 8 : 4} cones`, `${ses.n} balls`, ...(z.bibs ? [`${z.bibs} bibs`] : [])] : d.kind === 'game' ? ['4 cones', '1 ball', `${z.bibs} bibs`, '2 small goals'] : isSq ? [`${4 * sq + (d.kind === 'gate' ? 2 : 0)} cones`, `${sq} ball${sq > 1 ? 's' : ''}`, `${2 * sq} bibs`] : ['8 cones', `${z.balls} balls`, `${z.bibs} bibs`]
  const first = present(k, ts)[0]?.name ?? t.squad[0].name
  const last = [...t.season].reverse().find((w, i) => i > 0 && w.theme === d.theme)?.wk
  const full = level === 'new' || all, mid = level !== 'experienced' || all
  const long = ev?.long ? ev.long.split('{num}') : null
  return (
    <Page id="GS2-DrillWhy" title={d.name} sub={`${day(t)}, ${p.at} · ${p.mins} minutes · ${p.tag.toLowerCase()}`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => { go('GS1-ProposedSession'); say('Three other games for the same reason. Pick one and the session changes.') }}>Swap for another</Btn><Btn primary big onClick={() => go('GS1-ProposedSession')}>Back to the session</Btn></>}>
      <div style={col}>
        <section aria-label="Why you are doing this" style={{ ...tile, padding: '12px 18px 14px', display: 'grid', gridTemplateColumns: strong ? 'minmax(0,1fr) 250px' : 'minmax(0,1fr)', gap: 16 }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={h2}>Why you are doing this</h2>
            <span style={{ fontSize: 16, lineHeight: '23px' }}>{long ? <>{long[0]}{ev?.num && <strong style={{ padding: '1px 6px', borderRadius: 6, background: strong ? AMBER : 'transparent' }}>{ev.num}</strong>}{long[1]}</> : `${p.why.new.charAt(0).toUpperCase()}${p.why.new.slice(1)}`}</span>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>{p.chips.map(c => <ChipTag key={c.text} c={c} long />)}</span>
          </span>
          {strong && <button onClick={() => { playClips([1, 2, 3].map(i => ({ title: `${p.tag.charAt(0)}${p.tag.slice(1).toLowerCase()}: clip ${i} of 3`, sub: 'From Saturday’s film.', len: i === 3 ? 12 : 11 })), 'See it happen'); say('Three clips play, 34 seconds in all.') }} style={{ minHeight: 150, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2 }}><strong style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}><Ico d="M8 5l11 7-11 7z" size={13} />See it happen</strong><span style={{ fontSize: 13, color: '#dcefe8' }}>3 clips from Saturday · 34 seconds</span></button>}
        </section>
        {full && <section aria-label="What the players get out of it" style={{ ...tile, padding: '12px 18px 14px' }}>
          <h2 style={h2}>What the players get out of it</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10 }}>{([['They learn', about.learn], ['Every player gets', about.gets], ['You will know it worked when', about.worked]] as const).map(([a, b]) => <span key={a} style={{ borderRadius: 10, background: PALE, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 12, color: MUT }}>{a}</strong><span style={{ fontSize: 14, lineHeight: '19px' }}>{b}</span></span>)}</div>
        </section>}
        {full && <section aria-label="What to say, and what to leave alone" style={{ ...tile, padding: '12px 18px 14px' }}>
          <h2 style={h2}>What to say, and what to leave alone</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={label}>Say</span>{about.say.map(x => <span key={x} style={{ display: 'flex', gap: 8, fontSize: 15, lineHeight: '20px' }}><Ico d="M4 5h16v11H9l-5 4z" size={15} />{x.replace('{name}', first)}</span>)}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={label}>Leave alone</span>{about.leave.map(x => <span key={x} style={{ fontSize: 15, lineHeight: '21px' }}>{x}</span>)}</span>
          </div>
        </section>}
        {!full && <Btn big onClick={() => setAll(true)}>{level === 'experienced' ? 'Tap for the evidence and clips, and the rest' : 'Show what to say and what to look for'}</Btn>}
      </div>
      <div style={col}>
        {mid && <section aria-label="Set it up" style={{ ...tile, padding: '14px 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={h2}>Set it up</h2><span style={{ height: 24, padding: '0 10px', borderRadius: 999, background: G, color: '#fff', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>Sized for {ses.n}</span></div>
          <Picture drill={d} big />
          <span style={{ fontSize: 15, lineHeight: '21px' }}>{setupText(d, ses.n)}</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{kitList.map(x => <span key={x} style={{ height: 26, padding: '0 10px', borderRadius: 999, background: '#e9eae8', fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>{x}</span>)}</span>
        </section>}
        {full && <section aria-label="If it is not working" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}><h2 style={{ ...h2, paddingBottom: 6 }}>If it is not working</h2><Line a={about.easier[0]} v={about.easier[1]} /><Line a={about.harder[0]} v={about.harder[1]} /></section>}
        <Note title="Where this sits">{t.skills.includes(d.theme) ? `${TAG[d.theme].charAt(0)}${TAG[d.theme].slice(1).toLowerCase()} is one of the four core skills for ${k === 'u11' ? 'under-10s and under-11s' : t.ageWord} in the national curriculum.${last ? ` You last worked on it in round ${last}.` : ''}` : d.theme === 'game' ? 'Your club asks for every session to end with a game.' : 'Your club asks for every session to start with a ball, not a lap.'}</Note>
      </div>
    </Page>
  )
}

// ── GS3 · run sheet ──────────────────────────────────────────────────────────
function useGroups(k: TeamKey, s: SessionState, ses: Session) {
  const ts = s.teams[k], here = present(k, ts), sq = Math.max(...ses.parts.map(p => (p.drill.kind === 'squares' || p.drill.kind === 'gate') ? p.sized.squares : 0), 1)
  const base = groups(here, sq), at = new Map<string, number>(); base.forEach((g, i) => g.forEach(p => at.set(p.name, i)))
  Object.entries(ts.moved).forEach(([n, i]) => { if (at.has(n) && i < sq) at.set(n, i) })
  const out: Player[][] = Array.from({ length: sq }, () => []); [...here].sort((a, b) => b.conf - a.conf).forEach(p => out[at.get(p.name) ?? 0].push(p))
  return out
}
const names = (g: Player[]) => g.map(p => p.name).join(', ')
export function GS3RunSheet({ s, k, go, say, start }: GsProps) {
  const t = TEAMS[k], ts = s.teams[k], ses = sessionFor(s, k), gs = useGroups(k, s, ses), kt = kit(ses)
  const [edit, setEdit] = useState(false), [pick, setPick] = useState<string | null>(null)
  const letters = 'ABC', firstSq = ses.parts.findIndex(p => p.drill.kind === 'squares' || p.drill.kind === 'gate')
  const big = gs.reduce((a, g, i) => g.length > gs[a].length ? i : a, 0), uneven = gs.some(g => g.length !== gs[0].length)
  const who = (p: Part, i: number): string => {
    if (p.drill.kind === 'all') return `All ${ses.n} together`
    if (p.drill.kind === 'squares' || p.drill.kind === 'gate') return i === firstSq || gs.length === 1 ? gs.map((g, j) => `${gs.length > 1 ? `Square ${letters[j]}: ` : ''}${names(g)}`).join(' · ') : `Same groups.${uneven ? ` Square ${letters[big]} has a spare: rotate every 2 minutes` : ''}`
    if (p.drill.kind === 'game') {
      const pool = gs.length === 2 ? gs : [gs.flat().filter((_, j) => j % 2 === 0), gs.flat().filter((_, j) => j % 2 === 1)]
      const spare = pool[0].length !== pool[1].length ? (pool[0].length > pool[1].length ? pool[0] : pool[1]).slice(-1)[0] : null
      return `Bibs: ${names(pool[0].filter(x => x !== spare))} · No bibs: ${names(pool[1].filter(x => x !== spare))}${spare ? ` · ${spare.name} plays for whoever has the ball` : ''}`
    }
    return p.sized.line
  }
  const bring: [boolean, string, string][] = [[true, `${kt.cones} cones`, firstSq >= 0 ? `Set the ${gs.length === 1 ? 'square' : `${['', '', 'two', 'three'][gs.length]} squares`} before ${ses.parts[0].at} and you won’t move them until the game` : 'Set up before the players arrive'], [true, `${kt.balls} balls`, t.age <= 13 ? 'One each for the arrival game' : 'One between two for the warm-up'], [true, `${kt.bibs} bibs`, ''],
    k === 'u11' ? [false, '2 small goals', 'The pop-up goals are booked by U9 Tom until 5:30. Use cones as goals'] : [true, '2 small goals', '']]
  return (
    <Page id="GS3-RunSheet" title="Run sheet" sub={`${t.day} · ${t.time} · ${t.place.split(', ').pop()} · ${ses.n} players`} go={go} cols="minmax(0,1fr) 348px"
      right={<>{start && <Btn big onClick={start}>Start session</Btn>}<Btn big onClick={() => { say('The run sheet is ready to print on one page.'); setTimeout(() => window.print(), 300) }}>Print</Btn><Btn primary big aria-pressed={ts.phone} onClick={() => { setTeam(k, { phone: true }); say(`Sent. It opens from your phone’s Home at ${ses.parts[0].at.replace(/:(\d\d)$/, (_, m) => `:${String(Math.max(0, Number(m) - 30)).padStart(2, '0')}`).replace(/^(\d+):(\d\d)$/, (_, h, m) => Number(m) === 0 && ses.parts[0].at.endsWith(':00') ? `${Number(h) - 1}:30` : `${h}:${m}`)} on ${day(t)}.`) }}>{ts.phone ? 'On your phone' : 'Send to my phone'}</Btn></>}>
      <section aria-label="What happens when" style={{ ...tile, gap: 0, padding: '14px 18px 6px' }}>
        <h2 style={{ ...h2, paddingBottom: 8 }}>What happens when</h2>
        {ses.parts.map((p, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '62px 150px minmax(0,1fr)', gap: 14, alignItems: 'center', padding: '10px 0', borderTop: `1px solid ${LINE}` }}>
            <strong style={{ fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>{p.at}</strong><Picture drill={p.drill} />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 16 }}>{p.drill.name}</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>{i > firstSq && (p.drill.kind === 'gate') ? p.drill.setup : setupText(p.drill, ses.n).split('. Four on')[0].replace(/\.$/, '')}{p.drill.id === 'rondo42' ? '. Swap when the ball is won.' : p.drill.setup.endsWith('.') && !(i > firstSq && p.drill.kind === 'gate') ? '.' : ''}</span><span data-groups={i} style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{who(p, i)}</span></span>
          </div>
        ))}
      </section>
      <div style={col}>
        <section aria-label="Bring" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Bring</h2>
          {bring.map(([ok, a, b]) => <div key={a} data-bring style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}` }}><span aria-label={ok ? 'Ready' : 'Not available'} style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, boxSizing: 'border-box', background: ok ? G : '#fff', border: ok ? 0 : `2px solid ${INK}`, color: ok ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={ok ? 'M5 12l5 5 9-10' : 'M6 6l12 12M18 6L6 18'} size={12} sw={3} /></span><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>{a}</strong>{b && <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span>}</span></div>)}
        </section>
        <section aria-label="Groups" style={{ ...tile, padding: '14px 16px 16px' }}>
          <h2 style={h2}>Groups</h2>
          <span style={{ fontSize: 14, lineHeight: '20px' }}>Mixed so each square has a confident player and a quieter one. Based on your ratings, not on who is best.</span>
          {edit && gs.length > 1 && <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{gs.map((g, j) => (
            <div key={j} role="group" aria-label={`Square ${letters[j]}`} style={{ borderRadius: 10, background: PALE, padding: 8, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
              <button onClick={() => { if (!pick) { say('Tap a name first, then the square to move them to.'); return } setTeam(k, x => ({ moved: { ...x.moved, [pick]: j } })); say(`${pick} moved to square ${letters[j]}. The run sheet is updated.`); setPick(null) }} style={{ minHeight: 44, padding: '0 12px', borderRadius: 8, border: `1.5px solid ${pick ? G : LINE}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Square {letters[j]}{pick ? ': move here' : ''}</button>
              {g.map(p => <button key={p.name} aria-pressed={pick === p.name} onClick={() => setPick(pick === p.name ? null : p.name)} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${pick === p.name ? G : LINE}`, background: pick === p.name ? G : '#fff', color: pick === p.name ? '#fff' : INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{p.name}</button>)}
            </div>))}</div>}
          <Btn big aria-pressed={edit} onClick={() => { setEdit(e => !e); setPick(null); if (!edit) say(gs.length > 1 ? 'Tap a name, then the square to move them to. The run sheet updates.' : 'Everyone is in one group tonight.') }}>{edit ? 'Done' : 'Change the groups'}</Btn>
        </section>
        <Note title="If numbers change on the night">Tap who is here when you arrive. The squares and teams are redrawn in a few seconds.</Note>
      </div>
    </Page>
  )
}

// ── GS4 · who's coming, and the session resized ──────────────────────────────
export function GS4ResizeAttendance({ s, k, go, say }: GsProps) {
  const t = TEAMS[k], ts = s.teams[k], c = counts(ts), now = sessionFor(s, k, { bye: false }), n = now.n
  const planned = proposeSession({ team: t, n: t.polled, rules: s.rules, swaps: ts.swaps }), rows = whatChanged(planned, now)
  // Those coming are shown in their groups, then those who can’t, then those yet to answer.
  const inGroups = groups(t.squad.filter(p => ts.poll[p.name] === 'yes'), Math.max(1, ...now.parts.map(p => p.drill.kind === 'squares' || p.drill.kind === 'gate' ? p.sized.squares : 0))).flat()
  const shown = [...inGroups, ...t.squad.filter(p => ts.poll[p.name] === 'no'), ...t.squad.filter(p => ts.poll[p.name] === 'none')]
  const noAnswer = t.squad.filter(p => ts.poll[p.name] === 'none').map(p => p.name)
  const tap = (name: string) => {
    if (ts.atPitch) { const here = ts.here.includes(name) ? ts.here.filter(x => x !== name) : [...ts.here, name]; setTeam(k, { here }); say(`${name} is ${here.includes(name) ? 'here' : 'not here'}. ${here.length} at the pitch: the session is redrawn.`); return }
    const next: Answer = ts.poll[name] === 'yes' ? 'no' : ts.poll[name] === 'no' ? 'none' : 'yes'
    setTeam(k, x => ({ poll: { ...x.poll, [name]: next } })); say(`${name}: ${next === 'yes' ? 'coming' : next === 'no' ? 'can’t come' : 'no answer yet'}. The session is redrawn.`)
  }
  const what = (m: number) => { if (m < 6) return 'Small games only. We tell you first'; const x = proposeSession({ team: t, n: m, rules: s.rules, swaps: ts.swaps }), sq = x.parts.find(p => p.drill.kind === 'squares' || p.drill.kind === 'gate'), g = x.parts[x.parts.length - 1].sized.groups; return sq ? (sq.sized.squares === 1 ? sq.sized.line : `${sq.sized.squares > (now.parts.find(p => p.drill === sq.drill)?.sized.squares ?? 0) ? 'Back to ' : ''}${['', 'one square', 'two squares', 'three squares'][sq.sized.squares]}, ${g}`.replace(/^./, ch => ch.toUpperCase())) : g }
  const same = n === t.polled
  return (
    <Page id="GS4-ResizeAttendance" title="Who’s coming" sub={`${t.day} · the poll went to ${t.polled} families on Sunday`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big disabled={!c.none || ts.nudged} onClick={() => { setTeam(k, { nudged: true }); say(`One reminder goes to ${c.none} ${c.none === 1 ? 'family' : 'families'}. No more after that.`) }}>{ts.nudged ? 'Reminder sent' : `Nudge the ${c.none}`}</Btn><Btn primary big aria-pressed={ts.atPitch} onClick={() => { const on = !ts.atPitch; setTeam(k, { atPitch: on, here: on ? t.squad.filter(p => ts.poll[p.name] === 'yes').map(p => p.name) : [] }); say(on ? 'Tap each player as they arrive. The session resizes as you go.' : 'Back to the poll’s answers.') }}>{ts.atPitch ? 'At the pitch: tap to finish' : 'I am at the pitch: tap who is here'}</Btn></>}>
      <div style={col}>
        <section aria-label="The session changed itself" style={{ borderRadius: 18, background: DARK, color: '#fff', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 22 }}>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>{same ? 'EVERYONE IS COMING' : n < 6 ? 'TOO FEW FOR THIS SESSION' : 'THE SESSION CHANGED ITSELF'}</span>
            <strong style={{ fontSize: 22, lineHeight: '28px' }}>{same ? `All ${n} are coming. ${day(t)} is drawn for ${n}.` : n < 6 ? `Only ${n} are ${ts.atPitch ? 'here' : 'coming'}. ${day(t)} becomes small games.` : `${n} are ${ts.atPitch ? 'here' : 'coming'}, not ${t.polled}. ${day(t)} has been redrawn for ${n}.`}</strong>
            <span style={{ fontSize: 13, color: '#cfe6dc' }}>{n < 6 ? 'A different session, and you are told first.' : 'Same reasons, same games, different sizes. Nothing for you to work out.'}</span>
          </span>
          {(ts.atPitch ? [[ts.here.length, 'here'], [t.polled - ts.here.length, 'not here']] : [[c.yes, 'yes'], [c.no, 'no'], [c.none, 'no answer']]).map(([v, a]) => <span key={a} style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}><strong data-count={a} style={{ fontSize: 36, lineHeight: '40px', fontVariantNumeric: 'tabular-nums' }}>{v}</strong><strong style={{ fontSize: 13 }}>{a}</strong></span>)}
        </section>
        <section aria-label="What changed" style={{ ...tile, gap: 0, padding: '14px 18px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What changed</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, ...label, padding: '0 0 6px' }}><span>Part</span><span>Planned for {t.polled}</span><span>Now for {n}</span></div>
          {same ? <span style={{ ...cap, borderTop: `1px solid ${LINE}`, padding: '14px 0' }}>Nothing. The session is as planned.</span> : rows.map(r => <div key={r.part} data-change style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 50, padding: '4px 0', borderTop: `1px solid ${LINE}`, fontSize: 14 }}><strong>{r.part}</strong><span style={{ color: MUT }}>{r.was}</span><strong style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Ico d="M5 12h14M13 6l6 6-6 6" size={13} sw={2.2} />{r.now}</strong></div>)}
        </section>
      </div>
      <div style={col}>
        <section aria-label={`The ${t.polled}`} style={{ ...tile, padding: '14px 16px 14px' }}>
          <h2 style={h2}>The {t.polled}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{shown.map(p => { const a = ts.poll[p.name], on = ts.atPitch ? ts.here.includes(p.name) : a === 'yes', no = !ts.atPitch && a === 'no'; return (
            <button key={p.name} aria-label={`${p.name}: ${ts.atPitch ? (on ? 'here' : 'not here') : a === 'yes' ? 'coming' : a === 'no' ? 'can’t come' : 'no answer yet'}`} onClick={() => tap(p.name)} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, boxSizing: 'border-box', border: on ? `1.5px solid ${G}` : no ? `1.5px solid ${INK}` : `1.5px dashed ${MUT}`, background: on ? G : '#fff', color: on ? '#fff' : no ? INK : MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>{on ? <Ico d="M5 12l5 5 9-10" size={11} sw={3} /> : no ? <Ico d="M6 6l12 12M18 6L6 18" size={10} sw={3} /> : null}{p.name}</button>) })}</div>
          <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{ts.atPitch ? 'Filled: here. Tap a name as they arrive.' : 'Filled: coming. Outlined: can’t. Dashed: no answer yet.'}</span>
        </section>
        <section aria-label="If it changes again" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>If it changes again</h2>
          {noAnswer.length > 0 && <Line a={`${noAnswer.slice(0, 2).join(' and ')} ${noAnswer.length > 1 ? 'both come' : 'comes'}`} b={what(n + Math.min(2, noAnswer.length))} v={n + Math.min(2, noAnswer.length)} />}
          <Line a="Two more drop out" b={what(n - 2)} v={Math.max(0, n - 2)} />
          <Line a="Fewer than 6" b="Small games only. We tell you first" v="A different session" />
        </section>
        <Note title="The poll">Families get one question on Sunday and it closes at 3 pm on {day(t)}. After that, you tap who is here.</Note>
      </div>
    </Page>
  )
}

// ── GS5 · how much the app explains ──────────────────────────────────────────
export function GS5CoachLevel({ s, k, go, say }: GsProps) {
  const t = TEAMS[k], ses = sessionFor(s, k, { bye: false }), p = ses.parts[1], about = ABOUT[p.drill.theme]
  const levels: [Level, string][] = [['new', 'Explain everything: why, what to say, how to set up, what to look for.'], ['some', 'Give me the why and the set-up. I know how to run it.'], ['experienced', 'One line of why. I will build most sessions myself.']]
  const head = `${p.drill.name} · ${p.mins} min`, setup = setupText(p.drill, ses.n).split('. Four')[0].replace(/\.$/, '')
  const B = ({ a, children }: { a: string; children: ReactNode }) => <span style={{ fontSize: 14, lineHeight: '20px' }}><strong>{a} </strong>{children}</span>
  return (
    <Page id="GS5-CoachLevel" title="How much should Clean Sheet explain?" sub={`${t.coachFull} · your choice, change it any time · only you see it`} go={go} cols="minmax(0,1fr)" right={<Btn primary big onClick={() => go('GS1-ProposedSession')}>Back to the session</Btn>}>
      <div style={col}>
        <div role="radiogroup" aria-label="How much to explain" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12 }}>
          {levels.map(([l, d]) => { const on = s.level === l; return <button key={l} role="radio" aria-checked={on} onClick={() => { setSession({ level: l }); say(`Level set to: ${LEVEL_NAME[l]}.`) }} style={{ minHeight: 90, padding: '14px 16px', borderRadius: 16, border: `1px solid ${on ? G : LINE}`, background: on ? G : '#fff', color: on ? '#fff' : INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 17 }}>{LEVEL_NAME[l]}</strong><span style={{ fontSize: 14, lineHeight: '19px', color: on ? '#dcefe8' : MUT }}>{d}</span></button> })}
        </div>
        <section aria-label="The same drill, three ways" style={{ ...tile, padding: '14px 18px 16px' }}>
          <h2 style={h2}>The same drill, three ways</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12, alignItems: 'stretch' }}>
            {levels.map(([l]) => <div key={l} data-level={l} style={{ borderRadius: 14, border: s.level === l ? `2px solid ${G}` : `1px solid ${LINE}`, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 190 }}>
              <span style={label}>{LEVEL_NAME[l]}</span><strong style={{ fontSize: 16 }}>{head}</strong>
              {l === 'new' && <><B a="Why:">{k === 'u11' ? 'the team lost the ball 9 times playing out. In most, the first touch went to the player closing down.' : p.why.new}</B><B a="They learn:">{k === 'u11' ? 'a first touch away from pressure.' : `${about.learn.charAt(0).toLowerCase()}${about.learn.slice(1)}.`}</B><B a="Say:">{about.say[0]}</B><B a="Set up:">{`${setup.charAt(0).toLowerCase()}${setup.slice(1)}`}. Picture, kit list and groups included.</B><B a={about.easier[0].split(':')[0] + '?'}>{about.easier[1]}.</B></>}
              {l === 'some' && <><B a="Why:">{p.why.some}</B><B a="Set up:">{`${setup.charAt(0).toLowerCase()}${setup.slice(1)}`.replace(' steps', '')}. Groups included.</B></>}
              {l === 'experienced' && <><span style={{ fontSize: 14, lineHeight: '20px' }}>{p.why.experienced}</span><span style={{ fontSize: 14, color: MUT }}>Tap for the evidence and clips.</span></>}
            </div>)}
          </div>
        </section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12 }}>
          <Note title="What never changes">The reason for each drill and the evidence behind it are always there, at every level. Only how much is spelled out changes.</Note>
          <Note title="Nobody is graded">This is not a qualification and your director does not see it. It is a setting, like text size.</Note>
          <Note title="We will ask again">After ten sessions we ask once whether you want less explained. You can say no.</Note>
        </div>
      </div>
    </Page>
  )
}

// ── GS7 · season so far ──────────────────────────────────────────────────────
const SKILL = (th: string) => { const x = TAG[th as keyof typeof TAG]; return x.charAt(0) + x.slice(1).toLowerCase().replace('1 v 1', '1 v 1') }
export function GS7SeasonLookBack({ k, go }: GsProps) {
  const t = TEAMS[k], n = (th: string) => t.season.filter(w => w.theme === th).length
  const least = [...t.skills].sort((a, b) => n(a) - n(b))[0], well = t.skills.filter(x => n(x) >= 2).length
  return (
    <Page id="GS7-SeasonLookBack" title="Season so far" sub={`${t.label} · ${t.season.length} sessions, against what ${t.ageWord} should learn`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('DL1-SessionPlans')}>What the curriculum says</Btn><Btn primary big onClick={() => go('GS1-ProposedSession')}>{day(t)}’s session</Btn></>}>
      <div style={col}>
        <section aria-label="The four core skills for this age" style={{ ...tile, gap: 0, padding: '14px 18px 14px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>The four core skills for this age</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '190px repeat(10,minmax(0,1fr)) 96px', gap: 5, alignItems: 'center', ...label, paddingBottom: 6 }}><span>Skill</span>{t.season.map(w => <span key={w.wk} style={{ textAlign: 'center' }}>{w.wk}</span>)}<span /></div>
          {t.skills.map(sk => <div key={sk} data-skill={sk} style={{ display: 'grid', gridTemplateColumns: '190px repeat(10,minmax(0,1fr)) 96px', gap: 5, alignItems: 'center', minHeight: 44, borderTop: `1px solid ${LINE}` }}>
            <strong style={{ fontSize: 14 }}>{SKILL(sk)}</strong>
            {t.season.map(w => <span key={w.wk} aria-label={`Week ${w.wk}: ${w.theme === sk ? 'the main thing' : 'not the main thing'}`} style={{ height: 26, borderRadius: 7, boxSizing: 'border-box', background: w.theme === sk ? G : 'transparent', border: w.theme === sk ? 0 : `1.5px dashed ${LINE}` }} />)}
            {sk === least ? <span style={{ justifySelf: 'end', height: 24, padding: '0 9px', borderRadius: 999, border: `1.5px solid ${INK}`, fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>{n(sk)} session{n(sk) === 1 ? '' : 's'}</span> : <span style={{ justifySelf: 'end', fontSize: 13, color: MUT, whiteSpace: 'nowrap' }}>{n(sk)} session{n(sk) === 1 ? '' : 's'}</span>}
          </div>)}
          <span style={{ ...cap, fontSize: 13, paddingTop: 10 }}>Each column is a week. A filled square means that skill was the main thing that week.</span>
        </section>
        <section aria-label="Why each week was what it was" style={{ ...tile, gap: 0, padding: '14px 18px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Why each week was what it was</h2>
          {[...t.season].reverse().filter(w => w.why).map(w => <div key={w.wk} style={{ display: 'grid', gridTemplateColumns: '62px 280px minmax(0,1fr)', gap: 10, alignItems: 'center', minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14 }}><strong>Wk {w.wk}</strong><span>{SKILL(w.theme)}</span><span style={{ color: MUT }}>{w.why}</span></div>)}
        </section>
      </div>
      <div style={col}>
        <section aria-label="What it says" style={{ ...tile, padding: '14px 16px 16px' }}><h2 style={h2}>What it says</h2><span style={{ fontSize: 15, lineHeight: '22px' }}>You have covered {['none', 'one', 'two', 'three', 'all four'][well]} of the four well. <strong>{SKILL(least)} has had {['no weeks', 'one week', 'two weeks'][n(least)] ?? `${n(least)} weeks`}.</strong> The next week with nothing pressing from Saturday will go there.</span></section>
        <section aria-label="Did it work?" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}><h2 style={{ ...h2, paddingBottom: 6 }}>Did it work?</h2>{t.worked.map(w => <Line key={w.t} a={w.t} b={w.note} v={w.fig} />)}</section>
        <Note title="A look back, not a timetable">Nothing here tells you what you must do in week 14. It shows that following the games has still covered what matters.</Note>
      </div>
    </Page>
  )
}

// ── GS8 · learn to coach. Nothing is marked; nobody else sees what was watched. ──
const FILMS: [string, string, string, string][] = [['w1', 'What a good {age} session looks like', 'Busy, lots of touches, ends with a game', '2:10'], ['w2', 'How to read your session in Clean Sheet', 'The why, the set-up, what to say', '1:45'], ['w3', 'Setting up before the players arrive', 'Cones once, not four times', '2:00'], ['w4', 'Asking a question, not giving an answer', '“Where is the space?” beats “pass it wide”', '2:15'], ['w5', 'When it is not working', 'Make it easier, make it harder, or move on', '1:50']]
const secs = (d: string) => { const [m, x] = d.split(':').map(Number); return m * 60 + x }
export function GS8WelcomeCourse({ s, k, go, say }: GsProps) {
  const t = TEAMS[k], ses = sessionFor(s, k, { bye: false }), main = ses.parts[1]
  const week: [string, string, string, string][] = [['m1', main.drill.name.toLowerCase().startsWith('keep-ball') ? 'Coaching a keep-ball game without stopping it' : `Coaching “${main.drill.name}”, and what to say`, 'Mark Dunn with U9 Mark', '1:55'], ['m2', `What “${ABOUT[main.drill.theme].learn.replace(/^To (take a )?/, '').split(' from the player')[0].replace('first touch away', 'first touch away from pressure')}” looks like`, 'Three clips from your own team', '0:34']]
  const films = FILMS.map(f => [f[0], f[1].replace('{age}', t.ageWord.replace(/s$/, '')), f[2], f[3]] as [string, string, string, string])
  const watched = films.filter(f => s.watched.includes(f[0])).length, left = films.filter(f => !s.watched.includes(f[0])).reduce((a, f) => a + secs(f[3]), 0)
  const play = (f: [string, string, string, string]) => { playClips([{ title: f[1], sub: f[2] + '.', len: Math.min(20, secs(f[3])) }], 'Learn to coach'); setSession(x => ({ watched: [...new Set([...x.watched, f[0]])] })); say(`The lesson plays: ${f[1]}.`) }
  const next = films.find(f => !s.watched.includes(f[0])) ?? week.find(f => !s.watched.includes(f[0])) ?? week[0]
  const row = (f: [string, string, string, string], i: number, small?: boolean) => { const done = s.watched.includes(f[0]); return (
    <button key={f[0]} onClick={() => play(f)} aria-label={`${done ? 'Watched: ' : ''}${f[1]}, ${f[3]}`} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', minHeight: small ? 62 : 68, padding: '8px 0', background: 'none', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, boxSizing: 'border-box', background: done ? G : '#fff', border: done ? 0 : `1.5px solid ${i === watched && !small ? G : LINE}`, color: done ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{done ? <Ico d="M5 12l5 5 9-10" size={14} sw={3} /> : i + 1}</span>
      <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{f[1]}</strong><span style={{ fontSize: 13, color: MUT }}>{f[2]}</span></span>
      <span style={{ fontSize: 13, color: MUT, fontVariantNumeric: 'tabular-nums' }}>{f[3]}</span><Ico d="M8 5l11 7-11 7z" size={12} />
    </button>) }
  return (
    <Page id="GS8-WelcomeCourse" title="Learn to coach" sub={`${t.coachFull} · short films from coaches at your club and the federation`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('DT1-Courses')}>Federation courses near you</Btn><Btn primary big onClick={() => play(next)}>Watch the next one</Btn></>}>
      <div style={col}>
        <section aria-label="Start here" style={{ borderRadius: 18, background: DARK, color: '#fff', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 22 }}>
          <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>START HERE · TEN MINUTES IN ALL</span><strong style={{ fontSize: 22, lineHeight: '28px' }}>Five short films before your first session.</strong><span style={{ fontSize: 13, lineHeight: '19px', color: '#cfe6dc' }}>You don’t need to have played. You need a plan, a few good questions and a game to finish on.</span></span>
          <span style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}><strong data-watched style={{ fontSize: 34, lineHeight: '40px' }}>{watched} of 5</strong><strong style={{ fontSize: 13 }}>watched</strong></span>
          <span style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 34, lineHeight: '40px' }}>{Math.round(left / 60)} min</strong><strong style={{ fontSize: 13 }}>to go</strong></span>
        </section>
        <section aria-label="Before your first session" style={{ ...tile, gap: 0, padding: '14px 18px 4px' }}><h2 style={{ ...h2, paddingBottom: 8 }}>Before your first session</h2>{films.map((f, i) => row(f, i))}</section>
      </div>
      <div style={col}>
        <section aria-label={`This week, to match ${day(t)}`} style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}><h2 style={{ ...h2, paddingBottom: 6 }}>This week, to match {day(t)}</h2>{week.map((f, i) => row(f, i, true))}</section>
        <section aria-label="Using the app" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}><h2 style={{ ...h2, paddingBottom: 6 }}>Using the app</h2>
          {([['a1', 'After a game: three taps'], ['a2', 'Who is coming, and resizing'], ['a3', 'Swapping a drill']] as const).map(([id, a]) => <button key={id} onClick={() => play([id, a, 'One minute', '1:00'])} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', minHeight: 52, background: 'none', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, cursor: 'pointer' }}><strong style={{ fontSize: 14 }}>{a}</strong><strong style={{ fontSize: 14 }}>1 min</strong></button>)}
        </section>
        <Note title="Not a qualification">Nothing is marked and nobody sees what you have watched. It sits beside the federation’s courses and does not replace them.</Note>
      </div>
    </Page>
  )
}

export { useSession }
