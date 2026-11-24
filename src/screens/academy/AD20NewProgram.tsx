// AD20-NewProgram: Academy owner: adding a team with its ages, days, coach, pitch, places and price, which fills the timetable, the trial link and the bills.
// An INPUT that writes to the store (programs v2, 24 Nov). "Add program" calls `addGroup`: the new team is in Programs, the timetable,
// Coaches, Next term and Program money, and has its own team page. Opened from "Change this team" on a team page, the same form
// changes THAT team (`setGroup`): its coach, places and price, and every screen that counts from them changes with it.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { useContext, useEffect, useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { Field, Picks } from './formKit'
import { OwnerGo } from './ownerMenu'
import { changeTeam, teamToChange } from './ownerFocus'
import { demoToast } from '../demoToast'
import { addGroup, groupOf, initials, money, nextTeamBoard, playersIn, setGroup, teamBoard, useAcademy, type Group, type Program } from './academyStore'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const label = { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 } as const
const two = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 } as const
const digits = (t: string) => Number(t.replace(/[^0-9]/g, '')) || 0
/** The program a team's youngest age puts it in: 8 and under Foundation, 9 to 11 Development, 12 and over Advanced. */
const programFor = (age: number): Program => age <= 8 ? 'Foundation' : age <= 11 ? 'Development' : 'Advanced'

export default function AD20NewProgram() {
  const a = useAcademy(), go = useContext(OwnerGo)
  // The team being changed, if this form was opened from a team page. Read once; forgotten when the form closes.
  const [editId] = useState(teamToChange)
  useEffect(() => () => changeTeam(null), [])
  const team = editId ? groupOf(a, editId) : undefined, here = team ? playersIn(a, team.id).length : 0
  const [f, setF] = useState(() => team
    ? { name: team.name, ages: team.ages, day: Math.max(0, DAYS.indexOf(team.days[0])), time: team.when.split(' · ')[1] ?? '', pitch: team.where.split(' · ')[1] ?? team.where, coach: team.coach, places: String(team.cap), price: money(team.price), games: /^No games/.test(team.team) ? 0 : 1 }
    : { name: 'Goalkeepers', ages: '9 to 14', day: 2, time: '5:30 to 6:20', pitch: 'Pitch 2', coach: 'Dani Okafor', places: '8', price: money(a.price_this_term.Foundation), games: 0 })
  const put = <K extends keyof typeof f>(k: K) => (v: (typeof f)[K]) => setF(x => ({ ...x, [k]: v }))
  const cap = digits(f.places), price = digits(f.price), name = f.name.trim(), coach = f.coach.trim()

  function save() {
    if (!name || !coach) { demoToast('Give the team a name and a coach first.'); return }
    if (cap < 1 || price < 1) { demoToast('Places and the price for the term both need a number.'); return }
    if (team) {
      if (cap < here) { demoToast(`${team.name} has ${here} players. Places can’t be fewer than that.`); return }
      // The days and time stay the team's own unless they were changed here: a team trains on its program's days.
      const when = f.time === (team.when.split(' · ')[1] ?? '') && DAYS[f.day] === team.days[0] ? team.when : `${DAYS[f.day]} · ${f.time}`
      setGroup(team.id, { name, coach, ci: initials(coach), cap, price, when, where: `${team.where.split(' · ')[0]} · ${f.pitch}`, ...(when !== team.when ? { days: [DAYS[f.day]] } : {}) })
      demoToast(`${name} saved: ${coach}, ${here} of ${cap} places, ${money(price)} a player this term. Its page, Programs and program money have moved.`)
      go(teamBoard(team)); return
    }
    const age = digits(f.ages.split(' ')[0]) || 9
    let id = name.replace(/[^A-Za-z0-9]/g, '') || 'Team'; while (a.groups.some(g => g.id === id)) id += '2'
    const g: Group = { id, board: nextTeamBoard(a), prog: programFor(age), name, age, ages: `Ages ${f.ages}`, when: `${DAYS[f.day]} · ${f.time}`, days: [DAYS[f.day]], where: `Messmate Primary · ${f.pitch}`, coach, ci: initials(coach), cap, size: 0, price,
      rate: a.coach_rate_a_session, pitch: a.half_pitch_a_term, team: f.games ? `Wattle Creek ${name}` : 'No games yet · training only', dates: [] }
    addGroup(g)
    demoToast(`${name} added to ${g.prog}: ${cap} places at ${money(price)} a player. It is on the timetable and in Programs, with its own page.`)
    go('AD3-Timetable')
  }

  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{team ? `Change ${team.name}` : 'New program'}</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>{team ? `${team.prog} · ${here} players this term · changes show on every screen that counts this team` : 'Term 3 · 13 July to 18 September'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to={team ? teamBoard(team) : 'AC2-Programs'} style={S.more}>Cancel</Tap>
          <button type="button" onClick={save} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>{team ? 'Save changes' : 'Add program'}</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="The basics" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>The basics</h2>
          <div style={two}>
            <label style={label}>Name<Field value={f.name} onChange={put('name')} /></label>
            <label style={label}>Ages<Field value={f.ages} onChange={put('ages')} /></label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Days</span>
            <Picks label="Days" start={f.day} options={DAYS} onChange={put('day')} />
            {team && team.days.length > 1 && <span style={{ fontSize: 12, color: '#4a5a57' }}>{team.name} trains on {team.days.length > 2 ? `${team.days.slice(0, -1).join(', ')} and ${team.days[team.days.length - 1]}` : team.days.join(' and ')}. Pick a day only to move it to one day a week.</span>}
          </div>
          <div style={two}>
            <label style={label}>Time<Field value={f.time} onChange={put('time')} /></label>
            <label style={label}>Pitch<Field value={f.pitch} onChange={put('pitch')} /></label>
          </div>
          <div style={two}>
            <label style={label}>Coach<Field value={f.coach} onChange={put('coach')} /></label>
            <label style={label}>
              Places
              <Field value={f.places} onChange={put('places')} />
              <span style={{ fontSize: 12, fontWeight: 400, color: '#4a5a57' }}>{team ? `${here} players are in the team now.` : `One coach to ${cap || 8} fits your rule.`}</span>
            </label>
          </div>
          <div style={two}>
            <label style={label}>
              Price for the term
              <Field value={f.price} onChange={put('price')} />
              <span style={{ fontSize: 12, fontWeight: 400, color: '#4a5a57' }}>What one player pays. {cap > 0 && price > 0 ? `${cap} places filled would bill ${money(cap * price)}.` : ''}</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Plays games?</span>
              <Picks label="Plays games?" start={f.games} options={['Training only', 'Has a game team']} onChange={put('games')} />
            </div>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>The same form adds a single extra session from the timetable. Games are played at Wattle Creek FC, your partner club.</span>
        </section>
        <aside aria-label="What this fills in" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>What this fills in</h2>
          {([['The timetable', `A session every ${LONG[f.day]}`], ['Your trial link', 'Families can book a free trial'], ['Fees', 'Billed when a family accepts a place'], ['The year plan', 'Pick its blocks next']] as const).map(([t, sub], i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{t}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{sub}</span>
              </span>
            </div>
          ))}
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Change anything later. Families already in the program are told if the day, time or price changes.</span>
        </aside>
      </main>
    </>
  )
}
