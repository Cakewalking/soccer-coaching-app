// AD10-WatchCoach: Academy owner: the list of who has been watched this term, who is due and why (pack v31, 25 Nov).
// The rule is stated: every coach is watched at least once a term, on film or beside the pitch. One session is `ADW1-WatchSession`.
// From coachStore: sessions filmed, last watched and by whom are the pack's `academy-curriculum.json`; "Watch next" picks a coach who asked,
// one who is new and not watched, and the one lowest on the basics counted from the list of players. In team order, never ranked.
// Sending feedback from ADW1 moves this list and its tiles while the app is open.
import { useContext, useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { OwnerGo } from './ownerMenu'
import { useAcademy, type Group } from './academyStore'
import { coachBoard, first, useCoachStore, watchCoach, watchNext, watchOf, watchTotals, whereOf, type Where } from './coachStore'
import { Avatar, Cap, Head, Kpi, Kpis, LINE, MAIN, MAUVE, MUTED, Num, PALE, Pill, SAND, Th, Tile } from './kit'

const COLS = '1.5fr 0.9fr 0.8fr 1.1fr 0.9fr 1fr'
const PILL: Record<Where, 'mauve' | 'good' | 'soft' | 'warn'> = { 'Draft, not sent': 'mauve', 'Sent and read': 'good', 'Sent, not opened': 'soft', 'Due · nothing filmed': 'warn', 'Due': 'mauve' }
const row = { display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'center', minHeight: 50, borderTop: `1px solid ${LINE}`, fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' } as const

export default function AD10WatchCoach() {
  const a = useAcademy(), go = useContext(OwnerGo)
  useCoachStore()
  /** "I watched one in person": the owner picks the coach, and each row then opens the four lines without film. */
  const [inPerson, setInPerson] = useState(false)
  const t = watchTotals(a), next = watchNext(a)
  function session(g: Group, beside = false) { watchCoach(g.coach, beside); go('ADW1-WatchSession') }
  const open = (g: Group, beside = false) => (e: React.MouseEvent) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); session(g, beside) }
  return (
    <main style={MAIN}>
      <Head title="Watching a coach" sub={`Every coach is watched at least once a term, on film or beside the pitch · ${t.watched} of ${t.coaches} done in Term 2`}>
        <Tap to="AD7-HowWeCoach" style={S.more}>How we coach</Tap>
        <button type="button" aria-pressed={inPerson} onClick={() => setInPerson(v => !v)} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>I watched one in person</button>
      </Head>
      <Kpis n={4}>
        <Kpi label="Watched this term" value={`${t.watched} of ${t.coaches}`} sub={t.due ? `${t.due} still due before week 10` : 'Every coach has been watched'} bg={PALE} />
        <Kpi label="Sessions filmed" value={t.filmed} sub="On the tablet, at training" />
        <Kpi label="Feedback opened" value={`${t.opened} of ${t.watched}`} sub="By the coach it was sent to" />
        <Kpi label="Coaches with nothing filmed" value={t.noFilm} sub="Watch these in person" bg={MAUVE} />
      </Kpis>
      <Tile title="Watch next" right={<Cap>Clean Sheet suggests. You choose</Cap>}>
        {next.map(s => (
          <span key={s.g.id} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, borderTop: `1px solid ${LINE}`, boxSizing: 'content-box' }}>
            <Avatar bg={s.main ? MAUVE : SAND} size={34}>{s.g.ci}</Avatar>
            <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>{s.g.coach} · {s.g.name}</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUTED }}>{s.why}</span>
            </span>
            <a href="/__screen/ADW1-WatchSession" onClick={open(s.g)} aria-label={`${s.label}: ${s.g.coach}`} style={{ ...(s.main ? S.primary : S.more), flex: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>{s.label}</a>
          </span>
        ))}
        {next.length === 0 && <Cap style={{ borderTop: `1px solid ${LINE}`, padding: '12px 0' }}>Nobody to suggest. Every coach who is due is in the list below.</Cap>}
      </Tile>
      {inPerson && (
        <div role="status" style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 12, background: PALE, border: '1px solid #cfe3da' }}>
          <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '19px' }}><strong>Pick the coach you watched.</strong> You fill in the same four lines without film.</span>
          <button type="button" onClick={() => setInPerson(false)} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}
      <Tile title="Every coach" right={<Cap>In team order</Cap>}>
        <Th cols={COLS} heads={['Coach', 'Team', 'Filmed', 'Last watched', 'By', 'Where it is']} />
        {a.groups.map(g => { const w = watchOf(g), where = whereOf(g), cells = (
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}><Avatar bg={SAND}>{g.ci}</Avatar><strong>{g.coach}</strong></span>
            <span>{g.name}</span>
            <Num>{w.filmed}</Num>
            <span>{w.watched ?? 'Not this term'}</span>
            <span>{w.watched ? w.by : ''}</span>
            <Pill kind={PILL[where]}>{where}</Pill>
          </>
        )
          // A row opens the coach. A draft the owner has started opens the session it is on, and so does every row while picking who was watched in person.
          return inPerson || where === 'Draft, not sent'
            ? <a key={g.id} href="/__screen/ADW1-WatchSession" onClick={open(g, inPerson)} aria-label={inPerson ? `I watched ${first(g.coach)} in person` : `Carry on with ${g.coach}’s session`} style={row}>{cells}</a>
            : <Tap key={g.id} to={coachBoard(a, g)} style={row}>{cells}</Tap>
        })}
        <Cap style={{ paddingTop: 6 }}>A session is filmed when the coach props the tablet up and taps record. Watching is to help the coach, and the coach always sees what you wrote. It is not used for pay.</Cap>
      </Tile>
    </main>
  )
}
