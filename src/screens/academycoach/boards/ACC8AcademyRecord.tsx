// ACC8-AcademyRecord, rebuilt as pack v38 draws it: the tablet's view as the hero, the four things worth recording and what each
// gives back, the last three recordings, and what to do with no kit.
// COUNTED: tonight's team, time and pitch, and how many players there are (the academy's list); how many drills are on tonight's plan
// (the curriculum, so a swap shows); Sunday's kick-off and opponent (gameDay); the moments in each of the last three (the film store).
// SAMPLE, held in filmStore: the tablet's battery, whose boot sensors are flat, who has no filming consent, and the recordings themselves.
// The one-on-one's time is ACC5's. A tile is as tall as its content. Hand-built: do not make it again from the board's source.

import { useContext, type CSSProperties, type ReactNode } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { nightOfDate, teamSessionOf, useCurriculum, weekNow } from '../../academy/curriculum'
import { clock, dayMonth, firstName, names, shortDate, useCoachTeam } from '../coachTeam'
import { GAME } from '../gameDay'
import { GAME_FILM_GOOD, KIT, his, he, look, recordingsOf, useFilm, type RecId } from '../filmStore'
import { Pair, PlayMark, Still, Viewfinder } from '../filmParts'
import { HERO_BG, heroBtn } from '../filmStyles'
import { FILM_COUNTS_SKILLS_CHECK } from '../skills'
import { INK, MUT, PALE, T, plain, textLink } from '../styles'
import { Chevron } from '../teamParts'

// SAMPLE: the next one-on-one (the time is the one-on-one screen's, ACC5) and when the skills check is due.
const ONE_ON_ONE = { name: 'Kai Okonkwo', day: 'Friday', at: '4:15' }
const CHECK_DUE_WEEK = 8
const ICON = { drill: 'M4 7h16v13H4zM8 3v4M16 3v4', one: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21a7 7 0 0114 0', check: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z', game: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z' }
const tick = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>

/** One line of the kit check on the hero: a tick, or a mauve mark when something is not ready. Mauve is a nudge, never an error. */
const Ready = ({ id, ok, title, line }: { id: string; ok: boolean; title: string; line: string }) => (
  <span data-ready={id} data-ok={ok} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, ...(ok ? { background: 'rgba(255,255,255,0.18)', color: '#ffffff' } : { background: '#c39797', color: INK }) }}>{ok ? tick : '!'}</span>
    <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 13, lineHeight: '17px' }}>{title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>{line}</span></span>
  </span>
)
function Card({ id, icon, title, chip, line, back, onClick }: { id: string; icon: string; title: string; chip: string; line: string; back: ReactNode; onClick: () => void }) {
  return (
    <button data-card={id} onClick={onClick} style={{ ...plain, ...T.tile, gap: 6, padding: '14px 16px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 12, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg></span>
        <strong style={{ flexGrow: 1, fontSize: 17, lineHeight: '22px' }}>{title}</strong>
        <span data-chip="" style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: PALE, color: INK }}>{chip}</span>
        <Chevron size={16} />
      </span>
      <span style={{ fontSize: 14, lineHeight: '20px' }}>{line}</span>
      <span style={{ fontSize: 12, lineHeight: '17px', color: '#33443f' }}><strong style={{ color: INK }}>You get back:</strong> {back}</span>
    </button>
  )
}

export default function ACC8AcademyRecord({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam(), c = useCurriculum(), film = useFilm()
  const n = ps.length, night = nightOfDate(a.today) ?? 'Mon', onPlan = teamSessionOf(a, c, g, weekNow(a), night).drills.length
  const pitch = (g.where.split(' · ')[1] ?? '').split(',')[0]
  const flat = ps.filter(p => KIT.flatSensors.includes(p.name)), noFilm = ps.filter(p => KIT.noFilm.includes(p.name))
  const one = ps.find(p => p.name === ONE_ON_ONE.name)
  const clipsOnly = g.age < 12   // under 12 it is clips only: no scores or numbers for a child that age
  const lastThree = recordingsOf(a).filter(r => r.id !== 'tonight').sort((x, y) => y.date.localeCompare(x.date)).slice(0, 3)
  const openFilm = (rec?: RecId) => { if (rec) look({ view: 'recording', rec, at: null, walk: false }); go('ADC3-SessionFilm') }
  const wrap: CSSProperties = { ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }

  return (
    <div data-board="ACC8-AcademyRecord" style={wrap}>
      {!inApp && <CoachNav active="record" sub="Record" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <section aria-label="Ready to record" style={{ flex: 'none', borderRadius: 18, background: HERO_BG, color: '#ffffff', padding: '20px 22px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 430px', gap: 24, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
            {/* The board draws this line in amber. Amber is proof only and the film button, so it is pale green here. */}
            <span data-tonight="" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#cfe6dc', textTransform: 'uppercase' }}>Tonight · {g.name} · {clock(g)} · {pitch}</span>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: '42px', letterSpacing: '-0.025em' }}>Prop it up, press record, coach.</h1>
            <span style={{ fontSize: 15, lineHeight: '21px', color: '#cfe6dc' }}>The film is cut into moments for each player about 20 minutes after you stop. You don’t tag anything.</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 6 }}>
              <Ready id="tablet" ok title="Tablet on the stand" line={`Battery ${KIT.battery}%. Enough for tonight and Sunday`} />
              <Ready id="sensors" ok={!flat.length} title={`Boot sensors: ${n - flat.length} of ${n} charged`} line={flat.length ? `${names(flat)}’s pair is flat. ${flat.length === 1 ? `${he(flat[0]) === 'she' ? 'She' : 'He'} is` : 'They are'} still filmed` : 'Every pair is charged'} />
              <Ready id="filmed" ok title={`${n - noFilm.length} of ${n} can be filmed`} line={noFilm.length ? `${names(noFilm)} ${noFilm.length === 1 ? 'is' : 'are'} blurred. ${noFilm.length === 1 ? `${his(noFilm[0]) === 'her' ? 'Her' : 'His'} parent` : 'Their parents'} said no to filming` : 'Every family has agreed to filming'} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 10, paddingTop: 12 }}>
              <button onClick={() => go('ACC9-AcademyRecordDrill')} style={heroBtn(true)}>Record a drill</button>
              <button onClick={() => go('ACC11-AcademyRecording')} style={heroBtn(false)}>Just start filming</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Viewfinder height={250} />
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, fontSize: 12, color: '#cfe6dc' }}>
              <span>What the tablet sees now. Keep both corners of the box in.</span>
              <button onClick={() => demoToast('The view opens full screen with the lines to match.')} style={{ ...plain, flex: 'none', color: '#ffffff', fontSize: 12, fontWeight: 700, minHeight: 44, display: 'inline-flex', alignItems: 'center', textDecoration: 'underline' }}>Check the view</button>
            </span>
          </div>
        </section>

        <div style={{ flex: 'none', ...T.between }}><h2 style={T.h2}>What are you recording?</h2><span style={T.cap}>Pick one, or just start and say what it was afterwards</span></div>
        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card id="drill" icon={ICON.drill} title="A drill" chip={onPlan ? `${onPlan} on tonight’s plan` : 'None on tonight’s plan'} onClick={() => go('ACC9-AcademyRecordDrill')}
            line="One from tonight’s plan, any drill in the library, or one you describe in a sentence."
            back={clipsOnly ? 'each player’s moments worth showing. Under 12 it is clips only.' : 'who had how many goes, the moments worth showing, and a comparison if you’ve filmed it before.'} />
          <Card id="one" icon={ICON.one} title="A one-on-one" chip={one ? `${firstName(one)}, ${ONE_ON_ONE.day}` : ONE_ON_ONE.day} onClick={() => go('ACC5-OneOnOne')}
            line={one ? `${firstName(one)} at ${ONE_ON_ONE.at} on ${ONE_ON_ONE.day}${one.goal ? `, on ${his(one)} goal: ${one.goal.charAt(0).toLowerCase()}${one.goal.slice(1)}` : ''}.` : `${ONE_ON_ONE.at} on ${ONE_ON_ONE.day}.`}
            back={one ? `${his(one)} clips set beside last week’s, ready for ${his(one)} file and ${his(one)} family.` : 'the clips set beside last week’s.'} />
          {/* While FILM_COUNTS_SKILLS_CHECK is off the film does not count the stations: the coach's own taps do. The card says so. */}
          <Card id="check" icon={ICON.check} title="A skills check" chip={`Due week ${CHECK_DUE_WEEK}`} onClick={() => go('ADC4-SkillsCheck')}
            line={`Four stations, 25 minutes. Each player against their own last result, never each other.${FILM_COUNTS_SKILLS_CHECK ? '' : ' You count each station; the film keeps the clips.'}`}
            back={clipsOnly ? 'clips of each player. Under 12 it is clips only.' : FILM_COUNTS_SKILLS_CHECK ? 'each player’s own numbers, in their file and the term report.' : 'each player’s own numbers from your count, in their file and the term report.'} />
          <Card id="game" icon={ICON.game} title="Sunday’s game" chip={`Sun ${GAME.kickoff}`} onClick={() => go('ACC7-AcademyGameDay')}
            line={`${g.name} against ${GAME.opponent}. A parent films from the halfway line.`}
            back="the review in about 25 minutes, and each family’s clips that evening." />
        </div>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 12, alignItems: 'start' }}>
          <section aria-label="Your last three" style={{ ...T.tile, gap: 10, padding: '12px 16px' }}>
            <div style={T.between}><h2 style={T.h2}>Your last three</h2><button onClick={() => openFilm()} style={textLink}>All film</button></div>
            <div style={{ display: 'flex', gap: 12 }}>
              {lastThree.map((r, k) => { const found = film.moments.filter(m => m.rec === r.id).length
                return (
                  <button key={r.id} data-last={r.id} data-moments={found} onClick={() => openFilm(r.id)} style={{ ...plain, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Still height={86} angle={130 + 20 * k}><PlayMark /></Still>
                    <strong style={{ fontSize: 13, lineHeight: '17px' }}>{r.id === 'game' ? `Sunday’s game at ${GAME.last.them}` : r.name}</strong>
                    <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{r.id === 'game' ? `${dayMonth(r.date)} · ${GAME_FILM_GOOD}` : `${shortDate(r.date)} · ${r.minutes} minutes`} · {found} moments</span>
                  </button>
                ) })}
            </div>
            <span style={T.cap}>What you record becomes each player’s session note, and the evidence for their goal and term report.</span>
          </section>
          <section aria-label="No kit tonight?" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
            <h2 style={{ ...T.h2, paddingBottom: 4 }}>No kit tonight?</h2>
            <Pair id="phone" name="Film on your phone" onClick={() => go('ACC8p-PairCamera')}>Works the same</Pair>
            <Pair id="hand" name="Count by hand" onClick={() => go('ADC13-CheckEntry')}>One tap a go</Pair>
            <Pair id="camera" name="Pair another camera" onClick={() => go('ACC8p-PairCamera')}>Two minutes</Pair>
            <span style={{ ...T.cap, paddingTop: 6, color: MUT }}>Under 12 it’s clips only. No scores or numbers for any child that age.</span>
          </section>
        </div>
      </main>
    </div>
  )
}
