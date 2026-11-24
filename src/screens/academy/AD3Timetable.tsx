// AD3-Timetable: Academy owner: the week by time slot and half-pitch, with every team and its coach.
// A template over the store (programs v2, 24 Nov): each tile is a team in the list and opens THAT team's page.
import { S, INK } from './adStyles'
import Tap from './Tap'
import { PROGRAMS, programCounts, teamBoard, useAcademy, type Program } from './academyStore'
import { Cap, Head, Link, MAIN, MAUVE, PALE, Tile } from './kit'

const LONG: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }
// Sample values, not in the list of players: the one session next week that needs cover, and one-on-one bookings.
const NEEDS_COVER: Record<string, string> = { U13Gold: 'Thu 11 June: needs cover' }

export default function AD3Timetable() {
  const a = useAcademy()
  // A slot is a program's days and time. Teams the owner has moved to another time get a slot of their own.
  const slots = PROGRAMS.flatMap(p => { const s = programCounts(a, p), by = new Map<string, typeof s.teams>(); for (const g of s.teams) by.set(g.when, [...(by.get(g.when) ?? []), g]); return [...by.entries()].map(([when, teams]) => ({ p: p as Program, when, teams, n: s.players.filter(x => teams.some(g => g.id === x.group)).length })) })
  const title = (when: string, p: Program) => { const [days, time] = when.split(' · '); return `${days.split(' and ').map(d => LONG[d] ?? d).join(' and ')} · ${time ?? ''} · ${p}` }
  const cover = a.groups.find(g => NEEDS_COVER[g.id])
  return (
    <main style={MAIN}>
      <Head title="Timetable" sub="Next week · 8 to 11 June · Messmate Primary School · three pitches, used as six halves">
        <Tap say="Pick the session. Families are told at once and each child gets a make-up." style={S.more}>Cancel a session</Tap>
        <Tap to="AD20-NewProgram" style={S.primary}>+ Add a session</Tap>
      </Head>
      {slots.map(s => (
        <Tile key={s.p + s.when} title={title(s.when, s.p)} right={<Cap>{s.teams.length} {s.teams.length === 1 ? 'team' : 'teams'} · {s.n} players</Cap>}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', gap: 8, paddingTop: 6 }}>
            {s.teams.map(g => { const flag = NEEDS_COVER[g.id]; return (
              <Tap key={g.id} to={teamBoard(g)} style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 12, padding: '8px 10px', minHeight: 76, boxSizing: 'border-box', textDecoration: 'none', color: INK, background: flag ? MAUVE : PALE, border: `1px solid ${flag ? '#c39797' : '#cfe3da'}` }}>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>{g.name}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{g.coach}</span>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{flag ?? g.where.split(' · ')[1] ?? g.where}</span>
              </Tap>
            ) })}
          </div>
        </Tile>
      ))}
      <Tile title="One-on-ones · 7:00, pitch 1" right={<Link to="ACC5-OneOnOne">Bookings</Link>}>
        <span style={{ fontSize: 14, lineHeight: '20px', paddingTop: 4 }}>Dani on Monday and Wednesday, Reece on Tuesday and Thursday. 10 booked next week.</span>
      </Tile>
      <Cap>Each tile opens the team.{cover ? ` ${cover.coach} is away on Thursday 11 June, so ${cover.name} needs cover.` : ''}</Cap>
    </main>
  )
}
