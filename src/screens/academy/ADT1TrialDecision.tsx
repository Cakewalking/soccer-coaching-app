// ADT1-TrialDecision: Academy owner: the coach's recommendation for a trial player, what the coach saw, the places at that
// age, what the family would pay, and the owner's three choices. Drawn from the board in pack v29 (programs v2, 25 Nov).
// It reads the open trial from `trialStore` (the card tapped on AC3; Arjun when nothing was tapped). Until Reece sends his own
// assessment from ACC3, Arjun is shown with the assessment the boards draw filled in (`ARJUN`).
// COUNTED: "Places at this age" from the academy's list of players, and the price from the team's price and the weeks left this term.
// STILL SAMPLE: the waiting list (a number for each program, in the store), "Nobody is waiting for" a team, and the words he, she, his and her.
import { useContext } from 'react'
import { demoToast } from '../demoToast'
import { S, INK } from './adStyles'
import Tap from './Tap'
import { OwnerGo } from './ownerMenu'
import { WAITING, groupOf, money, playersIn, teamBoard, useAcademy } from './academyStore'
import { ARJUN, decide, useOpenTrial, type Assessment } from './trialStore'
import { Cap, G, Head, LINE, Pill, chevron } from './kit'

// Sample people have no "he" or "she" in the data. These are the trial players and coaches the sample itself calls "she" or "her".
const SHE = new Set(['Ivy Barlow', 'Lola Ferris', 'Billie Nguyen', 'Priya Nair', 'Sofia Marin', 'Lena Fischer', 'Jess Halloran', 'Aisha Khan', 'Mei Tanaka', 'Nadia Haddad', 'Carla Mendes'])
const words = (name: string) => SHE.has(name) ? { he: 'she', him: 'her', his: 'her' } : { he: 'he', him: 'him', his: 'his' }
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const DAY: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MARK = ['not yet', 'some', 'strong'], COUNT = ['no', 'one', 'two', 'three', 'four']

const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14, textDecoration: 'none', color: INK } as const
const right = { display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' } as const

export default function ADT1TrialDecision() {
  const a = useAcademy(), t = useOpenTrial(), go = useContext(OwnerGo)
  const own = groupOf(a, t.team), coach = own?.coach ?? 'The coach', coachFirst = coach.split(' ')[0], ownName = own?.name ?? t.team
  const first = t.name.split(' ')[0], kid = words(t.name), co = words(coach)
  // The coach's own assessment once it is sent. Before that, Arjun is shown as the boards draw him.
  const as: Assessment | null = t.a.sent || t.a.rec ? t.a : t.id === 'arjun' ? { ...ARJUN, sent: '7:52 pm' } : null
  // The team a place would be in: the one the coach names, or the team the trial was with.
  const place = groupOf(a, as?.recTeam ?? t.team) ?? own, placeName = place?.name ?? ownName
  const [y, m, d] = a.today.split('-').map(Number)
  const day = /^Today/.test(t.when) || !t.when ? `${DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]} ${d} ${MONTHS[m - 1]}` : t.when.replace(/^(\w{3})\b/, (w: string) => DAY[w] ?? w)

  const yes = as?.rec === 'mine' || as?.rec === 'other'
  const recommends = !as ? `${coach} has not sent a recommendation yet` : `${coach} recommends ${yes ? `a place in ${placeName}` : as.rec === 'second' ? 'a second trial' : 'no place this term'}${as.sure ? ` · ${co.he} is ${as.sure.toLowerCase()}` : ''}`
  const sub = t.asked === 'offer' ? `The offer of a place in ${placeName} has gone to ${t.parent}. Waiting on the family.` : t.asked === 'second' ? `You asked for a second trial. ${t.parent.split(' ')[0]} and ${coachFirst} have been told.` : recommends
  const verdict = !as ? '' : as.rec === 'mine' ? `Yes, in ${co.his} own team: ${placeName}` : as.rec === 'other' ? `Yes, in another team: ${placeName}` : as.rec === 'second' ? 'Not yet: a second trial' : 'Not this term'

  // Against the coach's own team: "with them on two skills, ahead on one and behind on one".
  const against = as ? ([[1, 'with them on'], [2, 'ahead on'], [0, 'behind on']] as const).map(([v, w]) => ({ w, n: as.against.filter(x => x === v).length })).filter(x => x.n) : []
  const againstLine = against.map((x, i) => `${x.w} ${COUNT[x.n]}${i === 0 ? (x.n === 1 ? ' skill' : ' skills') : ''}`).reduce((s, x, i, l) => s + (i === 0 ? '' : i === l.length - 1 ? ' and ' : ', ') + x, '')

  // Places at this age, counted from the list of players.
  const sameAge = a.groups.filter(g => own ? g.age === own.age : false)
  const prog = place?.prog ?? own?.prog
  // What the family would pay: the team's price for the weeks of term that are left, then a full instalment.
  const wk = a.term.match(/week (\d+) of (\d+)/), left = wk ? Number(wk[2]) - Number(wk[1]) : 0, of = wk ? Number(wk[2]) : 10
  const price = place?.price ?? 0

  const askSecond = () => { decide(t.id, 'second'); demoToast(`${t.parent.split(' ')[0]} is asked to bring ${first} back next week. ${coachFirst} is told.`) }
  const offer = () => { decide(t.id, 'offer'); go('ACP2-Offer') }
  const told = (s: string) => { const x = s.trim().replace(new RegExp(`^${first}\\s+`), ''); return x.charAt(0).toLowerCase() + x.slice(1) }

  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Head title={`${t.name}, ${t.age} · trial on ${day}`} sub={sub}>
        <Tap to="AC3-Trials" style={S.more}>All trials</Tap>
        <button onClick={askSecond} disabled={t.asked === 'second'} style={{ ...S.more, font: 'inherit', fontSize: 15, fontWeight: 600, cursor: t.asked === 'second' ? 'default' : 'pointer', ...(t.asked === 'second' ? { color: '#4a5a57', background: '#eceeed' } : null) }}>{t.asked === 'second' ? 'Second trial asked for' : 'Ask for a second trial'}</button>
        <button onClick={offer} style={{ ...S.primary, font: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Offer a place in {placeName}</button>
      </Head>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label="The coach’s recommendation" style={{ ...S.tile, gap: 6, padding: '14px 16px', border: `2px solid ${G}` }}>
            <span style={S.label}>{coachFirst}’s recommendation{as?.sent ? ` · sent ${as.sent}` : ''}</span>
            {as ? <>
              <strong style={{ fontSize: 20, lineHeight: '26px' }}>{verdict}</strong>
              <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {as.sure && <Pill kind="good">{as.sure}</Pill>}
                {as.why.map(w => w === 'My team is full' ? <Pill key={w} kind="mauve">{cap(co.his)} own team is full</Pill> : <Pill key={w} kind="soft">{w}</Pill>)}
              </span>
              {as.note && <span style={{ fontSize: 15, lineHeight: '22px' }}>“{as.note}”</span>}
              {as.rec === 'other' && as.ifOpens && <Cap>If a place opens in {ownName}, {coachFirst} would {as.ifOpens === 'move' ? `move ${kid.him} up` : `leave ${kid.him} in ${placeName}`}.</Cap>}
            </> : <>
              <strong style={{ fontSize: 20, lineHeight: '26px' }}>Not sent yet</strong>
              <Cap>{coachFirst} marks the four skills, the whole player and the game, then says whether to offer a place. You can still decide now.</Cap>
            </>}
          </section>
          <section aria-label={`What ${coachFirst} saw`} style={{ ...S.tile, gap: 0, padding: '12px 16px', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}>
              <h2 style={S.h2}>What {coachFirst} saw</h2>
              {as && as.clips > 0 && <Tap say={`${cap(COUNT[as.clips] ?? String(as.clips))} ${as.clips === 1 ? 'clip' : 'clips'} from the trial ${as.clips === 1 ? 'plays' : 'play'} here.`} style={{ fontSize: 14, fontWeight: 700, paddingTop: 13, paddingBottom: 13, marginTop: -13, marginBottom: -13 }}>{as.clips} {as.clips === 1 ? 'clip' : 'clips'}, {as.clipSeconds} seconds</Tap>}
            </div>
            {as ? <>
              {a.skills.map((skill, k) => { const step = as.steps[k] ?? 0; return (
                <div key={skill} style={{ display: 'grid', gridTemplateColumns: '170px 96px minmax(0,1fr)', gap: 12, alignItems: 'center', minHeight: 44, borderTop: `1px solid ${LINE}` }}>
                  <strong style={{ fontSize: 14 }}>{skill}</strong>
                  <span role="img" aria-label={step ? `${step} of 5` : 'Not marked'} style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ width: 13, height: 13, borderRadius: 999, boxSizing: 'border-box', ...(i <= step ? { background: G } : { background: '#ffffff', border: '1.5px solid #c5c8c4' }) }} />)}
                  </span>
                  <span style={{ fontSize: 13, color: '#33443f' }}>{step ? a.step_words[skill]?.[step - 1] ?? '' : 'Not marked'}</span>
                </div>
              ) })}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 10, borderTop: `1px solid ${LINE}` }}>
                {(['Game sense', 'Body', 'Head', 'With others'] as const).map((w, k) => as.whole[k] != null && <Pill key={w} kind={as.whole[k] === 2 ? 'soft' : 'plain'}>{w}: {MARK[as.whole[k]!]}</Pill>)}
                {as.game[2] != null && <Pill kind={as.game[2] === 2 ? 'soft' : 'plain'}>The team played better with {kid.him}: {MARK[as.game[2]]}</Pill>}
              </div>
              {againstLine && <Cap style={{ marginTop: 'auto', paddingTop: 8 }}>Against {ownName} {kid.he} was {againstLine}. That is for placing {kid.him}, and stays with coaches and you.</Cap>}
            </> : <Cap style={{ borderTop: `1px solid ${LINE}`, paddingTop: 10 }}>Nothing is marked yet. It shows here as soon as {coachFirst} sends it.</Cap>}
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label={`Places at ${kid.his} age`} style={{ ...S.tile, gap: 0, padding: '12px 14px' }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>Places at {kid.his} age</h2>
            {sameAge.map(g => { const n = playersIn(a, g.id).length, open = g.cap - n; return (
              <Tap key={g.id} to={teamBoard(g)} style={row}><span style={{ color: '#33443f' }}>{g.name} · {g.coach.split(' ')[0]}</span><span style={right}>{n} of {g.cap} · {open > 0 ? `${open} open` : 'full'}{chevron}</span></Tap>
            ) })}
            {prog && WAITING[prog] > 0 && <Tap to="ADP14-WaitingList" style={row}><span style={{ color: '#33443f' }}>Waiting for {prog}</span><span style={right}>{WAITING[prog]} families{chevron}</span></Tap>}
            <Cap style={{ paddingTop: 6 }}>Nobody is waiting for {placeName}.</Cap>
          </section>
          <section aria-label="What the family would pay" style={{ ...S.tile, gap: 0, padding: '12px 14px' }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>What the family would pay</h2>
            <span style={row}><span style={{ color: '#33443f' }}>This term, {left} {left === 1 ? 'week' : 'weeks'} left</span><span style={{ ...right, ...S.num }}>{money(price * left / of)}</span></span>
            <span style={row}><span style={{ color: '#33443f' }}>Term 3 instalment</span><span style={{ ...right, ...S.num }}>{money(price)}</span></span>
            <span style={row}><span style={{ color: '#33443f' }}>Family</span><span style={right}>{t.parent}, {kid.his} {t.parentIs}</span></span>
          </section>
          <section aria-label="What the family will be told" style={{ ...S.tile, gap: 4, padding: '12px 14px', flexGrow: 1 }}>
            <h2 style={S.h2}>What the family will be told</h2>
            {as?.well ? <span style={{ fontSize: 14, lineHeight: '20px' }}>Does well: {told(as.well)}</span> : null}
            {as?.work ? <span style={{ fontSize: 14, lineHeight: '20px' }}>To work on: {told(as.work)}</span> : null}
            {!as?.well && !as?.work && <Cap>Drafted from the coach’s taps: one thing done well, one thing to work on.</Cap>}
            <Cap style={{ marginTop: 'auto' }}>The offer goes from you, not the coach.</Cap>
          </section>
        </div>
      </div>
    </main>
  )
}
