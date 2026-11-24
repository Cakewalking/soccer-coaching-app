// ADC8-TeamStyle ("Our style"), rebuilt as pack v38 draws it: one row for each of the eight measures.
// Each row has four parts: the measure with who set it (Core / Academy / Aim changed / Yours) and its aim; the team's own seven games
// (season figure, last game, a square a game, "Met in N of 7", Strong); where the aim comes from, with the kind of evidence and its limit,
// and the coach's reason where there is one; then lower, raise and swap (no swap on a core measure).
// WORKED OUT (in ./teamStyle): the season figure, the last game, the green squares and "Met in N of 7", from the per-game values against
// the aim as it stands. Move an aim and they move. The band's counts and "N of the 8 have any" are counted from the eight rows.
// A share is shown with its count (the house rule); the board draws the share alone.
// SAMPLE: the per-game values (one constant, `GAMES_SAMPLE`), the eight as drawn, and seven games filmed by each under 13 team.
// A changed aim asks for a one-line reason. Dani is told; she does not approve.
// A tile is as tall as its content. Hand-built: do not make it again from the board's source.

import { useState } from 'react'
import { demoToast } from '../demoToast'
import { useCoachTeam } from './coachTeam'
import { GAMES_FILMED, KIND_WORDS, OUTSIDE, aimText, figures, moveAim, moved, resetToAcademy, setReason, startAdd, startSwap, stepAim, tagOf, useTeamStyle, type Measure, type Tag, type Unit } from './teamStyle'
import { G, INK, LINE, MAUVE_PALE, PALE, T, label, plain } from './styles'
import { StrongDot } from './teamParts'

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const word = (n: number) => WORDS[n] ?? String(n)
const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const TAG: Record<Tag, { background: string; color: string }> = { 'Core': { background: G, color: '#ffffff' }, 'Academy': { background: PALE, color: INK }, 'Aim changed': { background: '#c39797', color: INK }, 'Yours': { background: MAUVE_PALE, color: INK } }
const pill = { display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' } as const
const round = { height: 44, padding: '0 16px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' } as const
const step = { width: 44, height: 44, borderRadius: 10, border: `1px solid ${LINE}`, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', fontSize: 20, fontWeight: 700, cursor: 'pointer', padding: 0 } as const
/** An aim inside a sentence: "60%", "4 seconds". */
const inWords = (unit: Unit, n: number) => unit === 'pct' ? `${n}%` : unit === 'secs' ? `${n} seconds` : aimText(unit, n)

/** One row's reason: shown when there is one, asked for when the aim has been moved and there is none. */
function Reason({ m, why }: { m: Measure; why?: string }) {
  const [draft, setDraft] = useState('')
  if (why) return <span data-reason="" style={{ fontSize: 12, lineHeight: '17px', color: INK, background: MAUVE_PALE, borderRadius: 8, padding: '6px 8px' }}><strong>Your reason:</strong> “{why}”</span>
  return (
    <label data-reason-ask="" style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, lineHeight: '17px', fontWeight: 700, color: INK, background: MAUVE_PALE, borderRadius: 8, padding: '6px 8px' }}>
      Your reason for the change, in one line. Dani sees it.
      <span style={{ display: 'flex', gap: 6 }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && draft.trim()) { setReason(m.name, draft); demoToast('Reason saved. Dani is told; she doesn’t approve.') } }} placeholder="Why this aim suits your team"
          style={{ flexGrow: 1, minWidth: 0, height: 44, borderRadius: 10, border: `1px solid ${LINE}`, background: '#ffffff', padding: '0 10px', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 14, color: INK }} />
        <button onClick={() => { if (!draft.trim()) { demoToast('Write a line first.'); return } setReason(m.name, draft); demoToast('Reason saved. Dani is told; she doesn’t approve.') }} style={{ ...step, width: 'auto', padding: '0 14px', fontSize: 14 }}>Save</button>
      </span>
    </label>
  )
}

export default function ADC8TeamStyle({ go }: { go: (id: string) => void }) {
  const { measures, reasons } = useTeamStyle()
  const { a, g } = useCoachTeam()
  const mine = measures.filter(m => m.academy === null).length, theirs = measures.length - mine
  const core = measures.filter(m => m.core).length, changed = measures.filter(moved).length
  const outside = measures.filter(m => OUTSIDE.includes(m.kind)).length
  const teams = a.groups.filter(x => x.age === g.age).length

  return (
    <div data-board="ADC8-TeamStyle" style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <section aria-label={`${g.name}’s style`} style={{ flex: 'none', borderRadius: 18, background: '#1c3a33', color: '#ffffff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <strong data-band={`${theirs}+${mine}`} style={{ ...T.num, flex: 'none', whiteSpace: 'nowrap', fontSize: 40, lineHeight: '44px', letterSpacing: '-0.02em' }}>{theirs} + {mine}</strong>
          <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 20, lineHeight: '26px' }}>{g.name}’s style</strong>
            <span data-band-line="" style={{ fontSize: 13, lineHeight: '18px', color: '#cfe6dc' }}>{cap1(word(measures.length))} things the film counts every game. {theirs} from Tall Timber ({core} of them core, {changed === 0 ? 'no aims' : changed === 1 ? '1 aim' : `${changed} aims`} changed) and {mine} of your own.</span>
          </span>
          <button onClick={() => go('AD18-AcademyStyle')} style={{ ...round, background: '#ffffff', color: INK, border: '1.5px solid #ffffff' }}>See the academy’s</button>
          <button onClick={() => { startAdd(); go('ADC9-PickMeasure') }} style={{ ...round, background: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.75)' }}>Add a measure</button>
          <button onClick={() => { resetToAcademy(); demoToast(`Back to the academy’s ${word(theirs)}, with its aims. Your own ${mine === 1 ? 'measure' : 'measures'} and your reasons are kept.`) }} style={{ ...round, background: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.75)' }}>Reset</button>
        </section>

        <section aria-label="How an aim gets set" style={{ ...T.tile, flex: 'none', gap: 10 }}>
          <h2 style={T.h2}>How an aim gets set</h2>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Your own film first', 'Each aim sits a step above what your team does now, so it can be reached this season.', `${cap1(word(GAMES_FILMED))} games filmed so far`],
              ['Then the academy', 'Dani sets a starting aim for each age from all the teams at that age. You can move it and say why.', `${cap1(word(teams))} under ${g.age} ${teams === 1 ? 'team' : 'teams'}, ${teams * GAMES_FILMED} games`],
              ['Then outside evidence', 'Where a policy or a study exists, it is named with its limit. Mostly it is about adults.', `${outside} of the ${measures.length} have any`]].map(([t, s, n], k) => (
              <div key={t} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: G, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{k + 1}</span><strong style={{ fontSize: 15 }}>{t}</strong></span>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{s}</span>
                <strong data-how={k} style={{ fontSize: 13, lineHeight: '18px' }}>{n}</strong>
              </div>
            ))}
          </div>
          <span style={T.cap}>No one has published what “good” looks like for under {g.age}s on most of these. So an aim here is a direction to move in, not a standard to be judged by. No player is scored on them.</span>
        </section>

        {measures.map((m, i) => {
          const f = figures(m), tag = tagOf(m), isMoved = moved(m), why = reasons[m.name]
          // − makes the number smaller and + bigger; for minutes, − lets one more player miss out and + one fewer
          const lo = stepAim(m, m.unit === 'all'), hi = stepAim(m, m.unit !== 'all')
          const count = m.unit === 'pct' && f.of ? `${f.n.toLocaleString('en-AU')} of ${f.of.toLocaleString('en-AU')} ${m.things ?? ''}`.trim() : ''
          const seasonPct = f.of ? Math.round(100 * f.n / f.of) : 0
          const gap = m.aim === seasonPct ? 'at' : `${Math.abs(m.aim - seasonPct) <= 5 ? 'just ' : ''}${m.aim < seasonPct ? 'under' : 'above'}`
          const fill = (s: string) => s.replace('{season}', f.season).replace('{count}', `${f.of} ${m.things ?? ''}`.trim()).replace('{best}', String(f.best)).replace('{aim}', inWords(m.unit, m.aim)).replace('{academy}', inWords(m.unit, m.academy ?? m.aim)).replace('{gap}', gap).replace('{games}', word(f.games.length))
          const limit = cap1(fill(`${m.limit}${isMoved && m.limitMoved ? ` ${m.limitMoved}` : ''}`))
          const say = (to: number) => { moveAim(i, to > m.aim); demoToast(`Aim ${m.unit === 'all' ? 'changed' : to > m.aim ? 'raised' : 'lowered'} one step, to ${aimText(m.unit, to)}. It starts from the next game.${m.academy !== null && to !== m.academy && !why ? ' Say why in one line.' : ''}`) }
          return (
            <section key={m.name} data-measure={m.name} data-tag={tag} data-aim={m.aim} data-met={f.metN} aria-label={m.name} style={{ ...T.tile, flex: 'none', display: 'grid', gridTemplateColumns: '230px 214px minmax(0,1fr) 76px', gap: 16, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <strong style={{ fontSize: 16, lineHeight: '21px' }}>{m.name}</strong>
                <span style={{ display: 'flex' }}><span data-tag-pill="" style={{ ...pill, ...TAG[tag] }}>{tag}</span></span>
                <strong data-aim-text="" style={{ ...T.num, fontSize: 26, lineHeight: '30px', letterSpacing: '-0.02em', paddingTop: 2 }}>{aimText(m.unit, m.aim)}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{m.of} · {m.academy === null ? 'your own' : m.core && !isMoved ? 'core' : `${m.core ? 'core · ' : ''}academy ${aimText(m.unit, m.academy)}`}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <span style={label}>Your {f.games.length || GAMES_FILMED} games</span>
                {f.games.length ? <>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, whiteSpace: 'nowrap' }}>Season <strong data-season="" style={{ ...T.num, fontSize: 16 }}>{f.season}</strong></span>
                    <span style={{ fontSize: 13, whiteSpace: 'nowrap' }}>Last <strong data-last="" style={{ ...T.num, fontSize: 16 }}>{f.last}</strong></span>
                  </span>
                  <span role="img" data-squares={f.met.map(x => x ? 'G' : '.').join('')} aria-label={`Met the aim in ${f.metN} of ${f.games.length} games`} style={{ display: 'flex', gap: 4 }}>
                    {f.met.map((ok, k) => <span key={k} style={{ width: 16, height: 16, borderRadius: 3, boxSizing: 'border-box', ...(ok ? { background: G } : { background: '#ffffff', border: '1.5px solid #8a9794' }) }} />)}
                  </span>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span data-met-line="" style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Met in {f.metN} of {f.games.length}</span><StrongDot /></span>
                  {count && <span data-count="" style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Season from {count}. Last from {f.lastN} of {f.lastOf}.</span>}
                </> : <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>Nothing counted yet. The film counts it from the next game.</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={label}>Where the aim comes from</span><span style={{ ...pill, background: m.kind === 'policy' ? PALE : m.kind === 'own' ? MAUVE_PALE : '#e9eae8', color: INK }}>{KIND_WORDS[m.kind]}</span></span>
                <span style={{ fontSize: 13, lineHeight: '18px' }}>{f.games.length ? fill(m.source) : 'No outside evidence, and no film of your own yet.'}</span>
                <span style={{ fontSize: 12, lineHeight: '17px', color: '#33443f' }}><strong style={{ color: INK }}>Its limit:</strong> {f.games.length ? limit : 'An aim you chose. It is tested only against your own film.'}</span>
                {(why && (isMoved || m.academy === null)) ? <Reason m={m} why={why} /> : isMoved ? <Reason m={m} /> : null}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <button aria-label={`${m.unit === 'all' ? 'Ease' : 'Lower'} the aim for ${m.name}${lo === m.aim ? '' : ` to ${aimText(m.unit, lo)}`}`} onClick={() => { const to = lo; if (to === m.aim) { demoToast('That is as low as this aim goes.'); return } say(to) }} style={step}>−</button>
                <button aria-label={`${m.unit === 'all' ? 'Tighten' : 'Raise'} the aim for ${m.name}${hi === m.aim ? '' : ` to ${aimText(m.unit, hi)}`}`} onClick={() => { const to = hi; if (to === m.aim) { demoToast(m.unit === 'all' ? 'It is already everyone who can play.' : 'That is as high as this aim goes.'); return } say(to) }} style={step}>+</button>
                {/* A core measure has no Swap: a coach can never remove or swap it. */}
                {!m.core && <button aria-label={`Swap ${m.name} for another measure`} onClick={() => { startSwap(i); go('ADC9-PickMeasure') }} style={{ ...plain, minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', color: G, fontSize: 14, fontWeight: 700, textDecoration: 'underline' }}>Swap</button>}
              </div>
            </section>
          )
        })}

        <span style={{ ...T.cap, flex: 'none' }}>Each square is a game, oldest on the left; green means the aim was met. The squares are your {word(GAMES_FILMED)} games against the aim as it stands now. Changes start from the next game, and earlier reviews keep the aims they had. Dani sees your changes and reasons. She is told; she doesn’t approve. Sources: Football Australia game time policy template; Carey and others, Journal of Sports Sciences, 2001; Vogelbein and others, Journal of Sports Sciences, 2014; Trainor, 2014.</span>
      </main>
    </div>
  )
}
