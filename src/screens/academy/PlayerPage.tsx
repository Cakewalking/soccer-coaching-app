// ADF01-Player to ADF226-Player: ONE page for a player as the owner sees them, drawn like the boards and counted from the store.
// The four core skills, attendance session by session, the goal, the family, fees, Term 3, the report, and what is worth knowing.
// The page has its own dark bar (back to the team, and all players) in place of the owner's menus, as the boards draw it.
import type { ReactNode } from 'react'
import { S, INK } from './adStyles'
import Tap from './Tap'
import { cameOf, firstName, groupOf, isNew, money, playerOf, teamBoard, useAcademy, worthACall } from './academyStore'
import { Cap, FeePill, G, Head, LINE, MAUVE, Pill, Proof, ReportPill, Term3Pill, chevron } from './kit'

const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const parts = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return { d, m: MONTH[m - 1], w: DAY[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] } }
const dayLong = (iso: string) => { const x = parts(iso); return `${x.w} ${x.d} ${x.m}` }
const dayShort = (iso: string) => { const x = parts(iso); return `${x.d} ${x.m}` }

const bar = { height: 44, padding: '0 14px', display: 'inline-flex', alignItems: 'center', fontWeight: 700, textDecoration: 'none' } as const

function Fact({ label, to, children }: { label: string; to?: string; children: ReactNode }) {
  const look = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14, textDecoration: 'none', color: INK, boxSizing: 'content-box' } as const
  const inner = <><span style={{ color: '#33443f' }}>{label}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>{children}{to && chevron}</span></>
  return to ? <Tap to={to} style={look}>{inner}</Tap> : <span style={look}>{inner}</span>
}

export default function PlayerPage({ id }: { id: string }) {
  const a = useAcademy(), p = playerOf(a, Number(id.match(/\d+/)?.[0])), g = p && groupOf(a, p.group)
  if (!p || !g) return (
    <main style={{ flexGrow: 1, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}><Head title="Player not found" sub="This player is not in the academy’s list."><Tap to="AC4-AcademyPlayers" style={S.more}>All players</Tap></Head></main>
  )
  const f = firstName(p), c = cameOf(p), fresh = isNew(a, p), ups = p.skills_now.filter((v, k) => v > p.skills_then[k]).length, call = worthACall(p)
  const know: string[] = []
  if (p.ready_to_move_to) know.push(`${g.coach.split(' ')[0]} thinks ${f} is ready for ${p.ready_to_move_to} in Term 3.`)
  if (p.same_step_two_terms) know.push(`${f} has been on the same steps for two terms. Worth a word with the coach.`)
  if (call) know.push(`${f} has missed the last three sessions and the family hasn’t said about Term 3. Worth a call.`)
  if (!p.notes_in_last_3_weeks) know.push('No coach notes in the last three weeks.')
  if (p.one_on_ones) know.push(`${f} also books one-on-ones.`)
  if (fresh) know.push(`${f} joined on ${dayShort(p.joined)}, so there is less to go on.`)
  // Not on the boards: they say "paid up" for a player who owes. A fee that is late or part-paid is said here, so that line is never untrue.
  if (p.fees_status === 'Late') know.push(`Fees are ${p.fees_note || 'late'}: ${money(p.fees_owed)} owed.`)
  else if (p.fees_owed > 0) know.push(`Paying in parts: ${money(p.fees_owed)} still to come.`)
  return (
    <>
      <div style={{ flex: 'none', height: 64, background: '#1c3a33', display: 'flex', alignItems: 'center', padding: '0 22px', gap: 12 }}>
        <Tap to={teamBoard(g)} style={{ ...bar, borderRadius: 12, border: '1px solid #a9cfc0', color: '#ffffff', gap: 8, fontSize: 15 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>{g.name}
        </Tap>
        <Tap to="AC4-AcademyPlayers" style={{ ...bar, color: '#cfe6dc', fontSize: 14 }}>All players</Tap>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Head title={`${p.name}, ${p.age}`} sub={`${g.name} · ${g.coach} · joined ${fresh ? `this term, ${dayShort(p.joined)}` : 'before this term'} · came to ${c.came} of ${c.of}`}>
          <Tap to="AC7-ReportsOut" style={S.more}>Term report</Tap>
          <Tap to="AC12-AcademyBroadcast" style={S.primary}>Message {f}’s {p.parent_is}</Tap>
        </Head>
        <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <section style={{ ...S.tile, gap: 2, padding: '12px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Where {f} is</h2><Cap>Steps 1 to 5 · {ups} up {fresh ? `since ${f} joined` : 'since week 1'}</Cap></div>
              {a.skills.map((skill, k) => { const now = p.skills_now[k], up = now - p.skills_then[k]; return (
                <div key={skill} style={{ display: 'grid', gridTemplateColumns: '170px 96px minmax(0,1fr)', gap: 12, alignItems: 'center', minHeight: 54, borderTop: `1px solid ${LINE}`, boxSizing: 'content-box' }}>
                  <strong style={{ fontSize: 15, lineHeight: '19px' }}>{skill}</strong>
                  <span role="img" aria-label={`Step ${now} of 5`} style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ width: 13, height: 13, borderRadius: 999, boxSizing: 'border-box', ...(i <= now ? { background: G } : { background: '#ffffff', border: '1.5px solid #c5c8c4' }) }} />)}
                  </span>
                  <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{up > 0 && <strong style={{ color: G }}>Up {up} this term. </strong>}{a.step_words[skill]?.[now - 1]}</span>
                </div>
              ) })}
              <Cap style={{ paddingTop: 6 }}>The coach’s own judgement, from two taps after a session. {f} is compared only with where {f} started.</Cap>
            </section>
            <section style={{ ...S.tile, gap: 8, padding: '12px 16px', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Came to {c.came} of {c.of} sessions</h2><Proof kind="Strong" /></div>
              <div role="img" aria-label={`Came to ${c.came} of ${c.of} sessions`} style={{ display: 'flex', gap: 5 }}>
                {p.roll.map((v, i) => <span key={i} style={{ flex: 1, maxWidth: 26, height: 22, borderRadius: 5, boxSizing: 'border-box', ...(v === null ? { background: '#eceeed' } : v ? { background: G } : { background: '#ffffff', border: '1.5px solid #a86b78' }) }} />)}
              </div>
              {g.dates.length > 0 && <div style={{ ...S.cap, display: 'flex', justifyContent: 'space-between' }}><span>{dayLong(g.dates[0])}</span><span>Green came · outlined missed{fresh ? ' · grey before joining' : ''}</span><span>{dayLong(g.dates[g.dates.length - 1])}</span></div>}
              <Cap style={{ marginTop: 'auto' }}>From the roll the coach takes at each session.</Cap>
            </section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {p.goal
              ? <section style={{ ...S.tile, gap: 4, padding: '14px 16px', border: `2px solid ${G}` }}><span style={S.label}>GOAL THIS TERM</span><strong style={{ fontSize: 20, lineHeight: '26px' }}>{p.goal}</strong>{p.goal_skill && <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Set with {f} by the coach. It works on: {p.goal_skill.toLowerCase()}.</span>}</section>
              : <section style={{ ...S.tile, gap: 6, padding: '14px 16px', background: MAUVE, borderColor: '#c39797' }}><span style={S.label}>GOAL THIS TERM</span><strong style={{ fontSize: 20, lineHeight: '26px' }}>No goal yet</strong><span style={{ display: 'flex' }}><Tap to="ADC10-SetGoal" style={S.more}>Ask the coach to set one</Tap></span></section>}
            <section style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
              <h2 style={{ ...S.h2, paddingBottom: 4 }}>Family and place</h2>
              <Fact label="Family">{p.parent}, {f}’s {p.parent_is}</Fact>
              <Fact label="Fees for Term 2" to="AC5-Fees"><FeePill p={p} />{p.fees_owed > 0 && <span>{money(p.fees_owed)} owed</span>}</Fact>
              <Fact label="Term 3" to="AD4-NextTerm"><Term3Pill p={p} /></Fact>
              <Fact label="Term report" to="AC7-ReportsOut"><ReportPill p={p} /></Fact>
              <Fact label="Clips sent home this term" to="ADC3-SessionFilm">{p.clips_sent_this_term > 0 ? p.clips_sent_this_term : <Pill kind="mauve">None yet</Pill>}</Fact>
              <Fact label="Game team">{p.game_team.split(' · ')[0]}</Fact>
            </section>
            <section style={{ ...S.tile, gap: 6, padding: '12px 16px', flexGrow: 1, ...(call || p.same_step_two_terms ? { background: MAUVE, borderColor: '#c39797' } : null) }}>
              <h2 style={S.h2}>Worth knowing</h2>
              {know.length ? know.map(t => <span key={t} style={{ fontSize: 14, lineHeight: '20px' }}>{t}</span>) : <span style={{ fontSize: 14, lineHeight: '20px' }}>Nothing needs you. {f} is coming, moving and paid up.</span>}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
