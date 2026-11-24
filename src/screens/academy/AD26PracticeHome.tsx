// AD26-PracticeHome: Academy owner: practice at home across the academy (pack v35). Who sets it, the rules for each program,
// every team this week, the term's ladder and what families say. The menus above it are the owner app's own (OwnerHeader).
// The rules are the shared practice store's (`practice.ts`): a row opens in place and every choice goes through `setRule`, so the
// coach's flow (ADC19) reads the new limit at once. "Turn on for Development" goes through `turnOn`.
// COUNTED here: the five numbers (added up from the team rows), each team's players (from the academy's list, not the practice
// file's `n`), the signed-in coach's team row (from the practice store's own players, so it moves when the coach answers a video),
// kept and changed, the survey answer and its count by program, the next Monday.
// STILL SAMPLE: the other teams' rows (the practice file's `teams`), the ladder (written for under 13s only), "90 written" (ten
// weeks times the age groups: the file writes out one age), and "Changed last on 20 April".
import { useState, type ReactNode } from 'react'
import { S, INK } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { Head, Tile, Cap, Pill, Bar, Proof, Th, MAIN, LINE, MUTED, G, PALE } from './kit'
import { Chip, Open } from './curriculumKit'
import { useAcademy, surveyOf, PROGRAMS, groupsIn, type Academy, type Group, type Program } from './academyStore'
import { usePractice, setRule, turnOn, ruleOf, type Practice, type Rule, type TeamWeek } from './practice'
import { PHASES, pickAge, openLibrary } from './curriculum'
import sample from './data/academy-practice.json'

const QUESTION = 'I know what to practise at home'
const RULE_COLS = '1fr 0.8fr 0.9fr 0.9fr 1fr 1fr 0.7fr', TEAM_COLS = '1fr 1.05fr 1.5fr 1.25fr 1.2fr 0.85fr'
const OFTEN = ['', 'Once', 'Twice', 'Three times'], MINUTES = [5, 10, 15, 20]
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
/** What a program gets when it is turned on with no limits yet: the shortest, and video to the parent only. A placeholder to confirm. */
const FIRST_LIMITS: Partial<Rule> = { longest_minutes: 5, most_often: 2, video_back: 'to parent only', coach_can_swap: true, sends: 'Monday 4 pm' }
/** The Monday after today: a changed rule applies from then. */
function nextMonday(today: string) { const d = new Date(today), add = (8 - d.getUTCDay()) % 7 || 7; d.setUTCDate(d.getUTCDate() + add); return `Monday ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}` }
const agesOf = (gs: Group[]) => { const v = gs.map(g => g.age); return v.length ? `U${Math.min(...v)} to U${Math.max(...v)}` : '' }
const list = (v: string[]) => v.length > 1 ? `${v.slice(0, -1).join(', ')} and ${v[v.length - 1]}` : v[0] ?? ''

type TeamRow = { g: Group; on: boolean; /** turned on here, so its first practice goes on Monday */ fromMonday: boolean; name: string; by: string; n: number; did: number; vid: number; rep: number }
/** One row for each team in the academy's list, in its order (age order). The team the practice store holds players for is counted from them. */
function teamRows(a: Academy, p: Practice): TeamRow[] {
  return a.groups.map(g => { const t: TeamWeek | undefined = p.teams.find(x => x.team === g.name), n = a.players.filter(x => x.group === g.id).length, on = !!t?.on
    if (on && g.name === p.team) { const set = p.this_week
      return { g, on, fromMonday: false, name: set.name, n, by: set.set_by === 'curriculum' ? (set.kept_by_coach === false ? 'Curriculum' : 'Curriculum, kept') : /swap|library/i.test(set.set_by) ? 'Coach swapped it' : 'Coach’s own',
        did: p.players.filter(x => (x.goes_by_week[p.week - 1] ?? 0) > 0).length, vid: p.players.filter(x => x.this_week_video).length, rep: p.players.filter(x => x.this_week_video === 'coach replied').length } }
    const fromMonday = on && /from Monday/.test(t?.by ?? '')
    return { g, on, fromMonday, name: on ? t?.name ?? 'The curriculum’s pick' : 'Nothing set', by: on ? t?.by ?? 'Curriculum' : 'Not on', n, did: t?.did ?? 0, vid: t?.vid ?? 0, rep: t?.rep ?? 0 } })
}

function Num5({ value, label, sub }: { value: ReactNode; label: string; sub: string }) {
  return <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}><strong style={{ ...S.num, fontSize: 24, lineHeight: '28px', letterSpacing: '-0.02em' }}>{value}</strong><strong style={{ fontSize: 13, lineHeight: '17px' }}>{label}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{sub}</span></span>
}
function Hand({ n, title, words, fact }: { n: number; title: string; words: string; fact: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: G, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{n}</span><strong style={{ fontSize: 15 }}>{title}</strong></span>
      <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{words}</span>
      <strong style={{ fontSize: 13, lineHeight: '18px' }}>{fact}</strong>
    </div>
  )
}
const Choice = ({ label, children }: { label: string; children: ReactNode }) => (
  <div role="group" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 12, fontWeight: 700, color: MUTED }}>{label}</span><span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</span></div>
)

export default function AD26PracticeHome() {
  const a = useAcademy(), p = usePractice(), [open, setOpen] = useState<string | null>(null)
  const rows = teamRows(a, p), on = rows.filter(r => r.on), thisWeek = on.filter(r => !r.fromMonday), starting = on.filter(r => r.fromMonday), off = rows.filter(r => !r.on)
  const sum = (k: 'n' | 'did' | 'vid' | 'rep', l = thisWeek) => l.reduce((t, r) => t + r[k], 0)
  const monday = nextMonday(a.today), daysToGo = Math.max(0, 6 - new Date(a.today).getUTCDay())
  const byProg = PROGRAMS.map(prog => { const gs = groupsIn(a, prog), mine = rows.filter(r => r.g.prog === prog), k = mine.filter(r => r.on).length, sv = surveyOf(a, a.players.filter(x => x.program === prog)), q = sv.q.find(x => x.text === QUESTION)
    return { prog, gs, teams: mine, k, rule: ruleOf(p, prog), avg: q?.avg ?? 0, answers: sv.n } })
  const all = surveyOf(a, a.players), qi = all.q.findIndex(x => x.text === QUESTION), lowest = all.n > 0 && qi >= 0 && all.q.every(x => x.avg >= all.q[qi].avg)
  const kept = thisWeek.filter(r => /^Curriculum/.test(r.by)).length
  const changedHere = JSON.stringify(p.rules) !== JSON.stringify(sample.rules)
  // the next program to turn on: one where some teams have it and some do not
  const next = byProg.find(x => x.k > 0 && x.k < x.teams.length) ?? byProg.find(x => typeof x.rule?.on === 'string' && x.k < x.teams.length)
  const top = [...byProg].filter(x => x.answers).sort((x, y) => y.avg - x.avg)[0]

  function turnOnFor(prog: Program) {
    const x = byProg.find(y => y.prog === prog); if (!x) return
    const fresh = x.teams.filter(r => !r.on)
    if (x.rule?.longest_minutes == null) setRule(prog, FIRST_LIMITS)
    turnOn(prog, fresh.map(r => r.g.name), { name: 'The curriculum’s pick' })
    const ages = new Set(x.gs.map(g => g.age)).size
    if (!fresh.length) { demoToast(`${prog}: on for all ${x.teams.length} teams.`); return }
    demoToast(`${prog} families get a weekly practice from ${monday}. ${fresh.length} ${fresh.length === 1 ? 'coach is' : 'coaches are'} told today. ${ages * 10} practices are already written for these ages.`)
  }
  const pillOf = (x: typeof byProg[number]) => x.rule?.on === false ? (x.k ? <Pill kind="mauve">Off from Monday</Pill> : <Pill>Off</Pill>) : x.k === x.teams.length && x.k > 0 ? <Pill kind="good">On</Pill> : <Pill kind="mauve">{x.k} of {x.teams.length} teams</Pill>

  return (
    <main style={MAIN}>
      <Head title="Practice at home" sub={`What each team is asked to do between sessions, who set it, and whether it happens · week ${p.week} of 10`}>
        <Tap say="Pick the block and the week. Choose a drill from the library or film one." style={S.more}>Write a week</Tap>
        {next && <button type="button" onClick={() => turnOnFor(next.prog)} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>Turn on for {next.prog}</button>}
      </Head>

      <section aria-label="This week in numbers" style={{ ...S.tile, flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 20, padding: '12px 16px' }}>
        <Num5 value={`${on.length} of ${rows.length}`} label="Teams with it on" sub={byProg.filter(x => x.k).sort((x, y) => Number(y.k === y.teams.length) - Number(x.k === x.teams.length)).map((x, i) => `${x.k === x.teams.length ? (i ? 'all ' : 'All ') : ''}${x.k} ${x.prog}`).join(', ') || 'None yet'} />
        <Num5 value={`${sum('did')} of ${sum('n')}`} label="Players did it this week" sub={`At least once, with ${daysToGo === 1 ? 'one day' : `${['no', 'one', 'two', 'three', 'four', 'five', 'six'][daysToGo]} days`} to go${starting.length ? `. ${starting.length} more ${starting.length === 1 ? 'team starts' : 'teams start'} Monday` : ''}`} />
        <Num5 value={sum('vid')} label="Videos sent back" sub={`${sum('rep')} answered by a coach`} />
        <Num5 value={all.n && qi >= 0 ? `${all.q[qi].avg.toFixed(1)} of 5` : 'No answers'} label="“I know what to practise”" sub={`${lowest ? 'Your lowest survey answer, from' : 'From'} ${all.n} families`} />
        <Num5 value={sum('n', off)} label="Players with nothing set" sub={list(byProg.filter(x => x.k < x.teams.length).map((x, i) => { const w = x.k === 0 ? x.prog : `${x.k * 2 < x.teams.length ? 'most' : 'some'} of ${x.prog}`; return i ? w : w.charAt(0).toUpperCase() + w.slice(1) })) || 'Every team has one'} />
      </section>

      <section aria-label="Three hands on it" style={{ ...S.tile, flex: 'none', gap: 10, padding: '12px 16px' }}>
        <h2 style={S.h2}>Three hands on it</h2>
        <div style={{ display: 'flex', gap: 20 }}>
          <Hand n={1} title="The curriculum picks" words="Every week of every block has one practice that matches that week’s step. It goes out on Monday without anyone doing anything." fact={`${10 * PHASES.reduce((t, x) => t + x.hi - x.lo + 1, 0)} written: 10 weeks for each of ${PHASES.reduce((t, x) => t + x.hi - x.lo + 1, 0)} age groups`} />
          <Hand n={2} title="You set the rules" words="Which programs get it, how long, how often, and whether video comes back. A coach can’t go past them." fact={changedHere ? `Below. Changed today, from ${monday}` : 'Below. Changed last on 20 April'} />
          <Hand n={3} title="The coach makes it theirs" words="Keeps the pick, swaps it from the library, films their own, or adds one for a single player’s goal." fact={`This week: ${kept} kept, ${thisWeek.length - kept} changed`} />
        </div>
      </section>

      <Tile title="Your rules, by program" right={<Cap>Tap a row to change it</Cap>} label="Your rules, by program">
        <Th cols={RULE_COLS} heads={['Program', 'Weekly practice', 'Longest', 'Most often', 'Video back', 'Coach can swap', 'Sends']} />
        {byProg.map(x => { const r = x.rule, has = !!r && r.on !== false && r.longest_minutes != null, isOpen = open === x.prog, young = x.gs.every(g => g.age < 13)
          const video = r?.video_back === true ? 'Yes' : typeof r?.video_back === 'string' ? r.video_back.charAt(0).toUpperCase() + r.video_back.slice(1) : 'No'
          return (
            <div key={x.prog} style={{ borderTop: `1px solid ${LINE}` }}>
              <button type="button" aria-expanded={isOpen} aria-label={`${x.prog}: change the rule`} onClick={() => setOpen(isOpen ? null : x.prog)}
                style={{ display: 'grid', gridTemplateColumns: RULE_COLS, gap: 10, alignItems: 'center', width: '100%', minHeight: 46, padding: 0, border: 0, background: 'transparent', font: 'inherit', fontSize: 14, lineHeight: '19px', color: INK, textAlign: 'left', cursor: 'pointer' }}>
                <strong style={{ fontSize: 14 }}>{x.prog} · {agesOf(x.gs)}</strong>
                {pillOf(x)}
                <span>{has ? `${r?.longest_minutes} minutes` : ''}</span><span>{has ? OFTEN[r?.most_often ?? 0] ?? `${r?.most_often} times` : ''}</span>
                <span>{has ? video : ''}</span><span>{has ? (r?.coach_can_swap ? 'Yes' : 'No') : ''}</span><span>{has ? (r?.sends ?? '').replace('Monday', 'Mon') : ''}</span>
              </button>
              {isOpen && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', alignItems: 'flex-end', padding: '8px 12px 12px', margin: '0 0 8px', borderRadius: 12, background: PALE }}>
                  <Choice label="Weekly practice">
                    <Chip on={r?.on !== false && x.k === x.teams.length} onPick={() => turnOnFor(x.prog)}>On for all {x.teams.length} teams</Chip>
                    <Chip on={r?.on === false} onPick={() => { setRule(x.prog, { on: false }); demoToast(`${x.prog}: off from ${monday}.${x.k ? ' This week’s practice stays.' : ''}`) }}>Off</Chip>
                  </Choice>
                  {has && <>
                    <Choice label="Longest">{MINUTES.map(m => <Chip key={m} on={r?.longest_minutes === m} onPick={() => setRule(x.prog, { longest_minutes: m })}>{m} minutes</Chip>)}</Choice>
                    <Choice label="Most often, a week">{[1, 2, 3].map(n => <Chip key={n} on={r?.most_often === n} onPick={() => setRule(x.prog, { most_often: n })}>{OFTEN[n]}</Chip>)}</Choice>
                    <Choice label="Video back">
                      {!young && <Chip on={r?.video_back === true} onPick={() => setRule(x.prog, { video_back: true })}>Yes</Chip>}
                      <Chip on={r?.video_back === 'to parent only'} onPick={() => setRule(x.prog, { video_back: 'to parent only' })}>To parent only</Chip>
                      <Chip on={!r?.video_back} onPick={() => setRule(x.prog, { video_back: false })}>No</Chip>
                    </Choice>
                    <Choice label="Coach can swap">
                      <Chip on={!!r?.coach_can_swap} onPick={() => setRule(x.prog, { coach_can_swap: true })}>Yes</Chip>
                      <Chip on={!r?.coach_can_swap} onPick={() => setRule(x.prog, { coach_can_swap: false })}>No</Chip>
                    </Choice>
                  </>}
                  <span style={{ flexBasis: '100%', fontSize: 13, lineHeight: '18px' }}>Applies from {monday}. {has ? 'A coach setting next week’s practice sees the new limit straight away.' : 'Turn it on and each team gets the curriculum’s pick, 5 minutes, twice a week, to the parent’s app. Change the limits after.'}{young && has ? ' Every player here is under 13, so a video only ever goes back to the parent’s app.' : ''}</span>
                </div>
              )}
            </div>
          ) })}
        <Cap style={{ borderTop: `1px solid ${LINE}`, paddingTop: 8 }}>For every program: “Sore or tired? Skip it” is on each practice, there are no streaks or tables, one reminder at most, and under 13 it goes to the parent’s app only. You can hear any reply a coach sends a child.</Cap>
      </Tile>

      <Tile title="Every team, this week" right={<Cap>In age order. Tap a team to open it</Cap>} label="Every team, this week">
        <Th cols={TEAM_COLS} heads={['Team', 'Coach', 'This week’s practice', 'Set by', 'Did it at least once', 'Videos answered']} />
        {rows.map(r => { const live = r.on && !r.fromMonday, waiting = r.vid - r.rep
          return (
            <Tap key={r.g.id} to={r.g.board} aria-label={`${r.g.name}: open the team`} style={{ display: 'grid', gridTemplateColumns: TEAM_COLS, gap: 10, alignItems: 'center', minHeight: 47, borderTop: `1px solid ${LINE}`, fontSize: 14, lineHeight: '19px', color: INK, textDecoration: 'none' }}>
              <strong>{r.g.name}</strong><span>{r.g.coach}</span>
              <span style={{ color: r.on ? INK : MUTED }}>{r.fromMonday ? `${r.name}, from Monday` : r.name}</span>
              <Pill kind={!r.on ? 'plain' : /^Curriculum/.test(r.by) ? 'soft' : 'mauve'}>{r.by}</Pill>
              {live ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bar pct={r.n ? Math.round(100 * r.did / r.n) : 0} w={110} /><span style={{ ...S.num, whiteSpace: 'nowrap' }}><strong>{r.did}</strong> of {r.n}</span></span> : <span style={{ color: MUTED }}>{r.fromMonday ? `${r.n} players` : ''}</span>}
              <span style={{ ...S.num, whiteSpace: 'nowrap' }}>{live ? (r.vid ? <><strong>{r.rep}</strong> of {r.vid}{waiting ? ` · ${waiting} waiting` : ' answered'}</> : 'None sent') : ''}</span>
            </Tap>
          ) })}
      </Tile>

      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 374px', gap: 12, alignItems: 'start' }}>
        <Tile title="The ladder this term · under 13s" right={<Open to="AD6-YearPlan" before={() => pickAge(13)} style={{ fontSize: 14, fontWeight: 700, color: G, textDecoration: 'underline', padding: '13px 0', margin: '-13px 0' }}>The year plan</Open>} label="The ladder this term">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', columnGap: 20, paddingTop: 4 }}>
            {p.ladder_u13_term2.map(w => { const now = w.week === p.week
              return (
                <Open key={w.week} to="ADL1-DrillLibrary" before={() => openLibrary('')} label={`Week ${w.week}${now ? ', this week' : ''}: ${w.practice}`} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 46, borderTop: `1px solid ${LINE}`, boxSizing: 'border-box', ...(now ? { background: PALE, borderRadius: 8, padding: '0 8px', margin: '0 -8px' } : null) }}>
                  <strong style={{ ...S.num, flex: 'none', width: 20, fontSize: 14 }}>{w.week}</strong>
                  <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{w.practice}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{w.theme}</span></span>
                </Open>
              ) })}
          </div>
          <Cap style={{ borderTop: `1px solid ${LINE}`, paddingTop: 8 }}>Each practice is the week’s theme, cut down to what one child can do with a ball and a wall. Week {p.week} is this week.</Cap>
        </Tile>

        <Tile title="Do families feel it?" right={<Proof kind="Estimate" />} label="Do families feel it?">
          <Cap>“{QUESTION}”, out of 5, from the {a.term.split(' · ')[0]} survey.</Cap>
          {byProg.map(x => (
            <div key={x.prog} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 46, borderTop: `1px solid ${LINE}`, fontSize: 15 }}>
              <span>{x.prog} <span style={{ fontSize: 13, color: MUTED }}>· {x.answers} {x.answers === 1 ? 'family' : 'families'}</span></span>
              <strong style={{ ...S.num, fontSize: 16 }}>{x.answers ? x.avg.toFixed(1) : 'No answers'}</strong>
            </div>
          ))}
          <Cap style={{ borderTop: `1px solid ${LINE}`, paddingTop: 8 }}>{top && top.k === top.teams.length && top.k > 0 && next
            ? `${top.prog} has a weekly practice and answers highest. That is the likely reason, not a proven one. Turning it on for ${next.prog} is the test.`
            : top && top.k === top.teams.length && top.k > 0 ? `${top.prog} has had a weekly practice longest and answers highest. That is the likely reason, not a proven one. The next survey is the test.`
            : 'A gap under 0.3 between programs is no gap. Read these as pointers, not proof.'}</Cap>
          <Tap to="AD15-Families" style={{ fontSize: 14, fontWeight: 700, textDecoration: 'underline', minHeight: 44, display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>The family survey</Tap>
        </Tile>
      </div>
    </main>
  )
}
