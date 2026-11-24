// ADC18-Learn (pack v39, rebuilt, 1,340 tall): the academy coach's Learn page. This week's lesson and why it was picked, where lessons
// come from, the week's lessons each with its source, why the coach is seeing it and what to try, whether trying it showed on film,
// what is required, and exactly what the owner can see.
// Everything is read from `academy/learnStore`, the same store the owner's `AD27-CoachLearning` reads. What the coach does here is real
// in the demo: finishing a lesson and "I tried it" move the three counts and the owner's totals; finishing a required lesson moves the
// coach's row on the owner's page; sharing a lesson puts it under "Shared with you" there. Questions stay on this side.
// READ FROM A STORE in a "why": the block and its weeks (the curriculum, by the team's age), the weaker-foot aim (the team's style),
// and Sunday's score (the game day store). SAMPLE: every other number in a "why" (18%, 38%, 7 seconds, 12 moments), and the lessons.
import { useContext, useState, type CSSProperties, type ReactNode } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { LIBRARY, OWN_MADE, coachDo, coachView, rules, useLearn, type Source } from '../../academy/learnStore'
import { lower, phaseOfAge, termNo, useCurriculum, weekNow, yearOf } from '../../academy/curriculum'
import { useCoachTeam } from '../coachTeam'
import { GAME } from '../gameDay'
import { useTeamStyle } from '../teamStyle'
import { G, HAIR, INK, LINE, MAUVE_PALE, MUT, PALE, T, plain } from '../styles'

const SOFT = '#33443f'
const tile: CSSProperties = { ...T.tile, flex: 'none' }
const pill = (bg: string, color = INK): CSSProperties => ({ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: bg, color })
const SOURCE_BG: Record<Source, string> = { block: PALE, film: MAUVE_PALE, owner: HAIR }
const more: CSSProperties = { ...plain, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#ffffff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', boxSizing: 'border-box', flex: 'none' }
const fact: CSSProperties = { ...plain, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14, boxSizing: 'content-box' }
const field: CSSProperties = { font: 'inherit', fontSize: 14, color: INK, height: 44, padding: '0 10px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#ffffff', boxSizing: 'border-box', minWidth: 0 }
const chevron = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M9 6l6 6-6 6" /></svg>
const play = (size: number) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
const Fact = ({ label, value, onTap }: { label: string; value: ReactNode; onTap?: () => void }) => onTap
  ? <button onClick={onTap} style={fact}><span style={{ color: SOFT }}>{label}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>{value}{chevron}</span></button>
  : <span style={{ ...fact, cursor: 'default' }}><span style={{ color: SOFT }}>{label}</span><span style={{ fontWeight: 700, textAlign: 'right' }}>{value}</span></span>
/** A block's name as it reads in a sentence. A block with no words of its own is said as it is named. */
const BLOCK_SAYS: Record<string, string> = { 'Finishing, weaker foot': 'finishing with the weaker foot' }

export default function ADC18Learn({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g } = useCoachTeam(), cur = useCurriculum(), style = useTeamStyle()
  useLearn()
  const v = coachView(a, g)
  const [panel, setPanel] = useState<'' | 'ask' | 'all'>(''), [question, setQuestion] = useState(''), [sharing, setSharing] = useState(false), [note, setNote] = useState(''), [openReq, setOpenReq] = useState('')
  // The block the team is in, from the curriculum: which half of the term, its weeks, and its name.
  const week = weekNow(a), half = week <= 5 ? 0 : 1, block = yearOf(a, cur, phaseOfAge(g.age))[termNo(a) - 1]?.[half], blockSays = block ? BLOCK_SAYS[block.title] ?? lower(block.title) : ''
  const blockWhy = `weeks ${half * 5 + 1} to ${half * 5 + 5} are ${blockSays}.`
  const aim = style.measures.find(m => m.name === 'Weaker-foot touches')?.aim
  const whyOf = (id: string, why: string) => id === 'weaker' ? blockWhy : why
  const hero = v.week.find(w => w.state !== 'Done') ?? v.week[0]
  const last = GAME.last, result = `${last.us > last.themGoals ? 'Won' : last.us < last.themGoals ? 'Lost' : 'Drew'} ${last.us}–${last.themGoals}`
  const reqDone = v.required.filter(r => r.done).length
  function open(id: string, title: string) { coachDo.play(id); demoToast(`The lesson opens: ${title}.`) }
  function finish(id: string, title: string) { coachDo.finish(id); demoToast(`Done: ${title}. Dani sees one more coach in the total, not that it was you.`) }
  function tried(id: string) { coachDo.tried(id); demoToast('Noted that you tried it. Your next film counts whether it showed.') }
  function ask() { if (!question.trim()) { demoToast('Type your question first.'); return } coachDo.ask(question); setQuestion(''); demoToast('Kept. Only you see your questions. Answers are not turned on in this demo yet.') }
  const from = (n: number) => `${n} of this week’s ${v.sources.of}`
  return (
    <div data-board="ADC18-Learn" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="learn" go={go} />}
      <main style={{ ...T.main, flexGrow: 0 }}>
        {hero && (
          <section aria-label="This week’s lesson" style={{ flex: 'none', borderRadius: 18, background: 'radial-gradient(120% 150% at 85% 0%,#2f6b5a 0%,#1c3a33 55%,#10211f 100%)', color: '#ffffff', padding: '20px 22px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px', gap: 24, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#f4c95d', textTransform: 'uppercase' }}>This week’s lesson · {hero.minutes} minutes · {hero.id === 'weaker' ? 'picked from your block and Sunday’s film' : hero.source === 'film' ? 'picked from your own film' : hero.source === 'block' ? 'picked from your block' : 'set by Dani'}</span>
              <h1 style={{ margin: 0, fontSize: 38, lineHeight: '42px', letterSpacing: '-0.025em' }}>{hero.title}</h1>
              <span style={{ fontSize: 15, lineHeight: '21px', color: '#cfe6dc' }}>{hero.id === 'weaker'
                ? `Your block is ${blockSays}, and on Sunday your team used it for 18% of touches${aim ? ` against an aim of ${aim}%` : ''}. This lesson is three clips of Tall Timber coaches getting more of it without stopping the game.`
                : `You’re seeing it because ${whyOf(hero.id, hero.why)}`}</span>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 12 }}>
                {/* The one film button on the page, and so the one amber button. */}
                <button onClick={() => { coachDo.play(hero.id); demoToast('The lesson plays. It ends with one thing to try tonight.') }} style={{ ...plain, height: 44, padding: '0 16px', borderRadius: 999, background: '#f4c95d', color: INK, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>{play(16)}Play the lesson · {hero.minutes} min</button>
                <button aria-expanded={panel === 'ask'} onClick={() => setPanel(panel === 'ask' ? '' : 'ask')} style={{ ...plain, height: 44, padding: '0 16px', borderRadius: 999, background: '#ffffff', color: INK, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>Ask a question</button>
                <button aria-expanded={panel === 'all'} onClick={() => setPanel(panel === 'all' ? '' : 'all')} style={{ ...plain, height: 44, padding: '0 16px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.75)', boxSizing: 'border-box', color: '#ffffff', display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>All {LIBRARY} lessons</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
              <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.1)', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <strong style={{ fontSize: 14 }}>It ends with one thing to try tonight</strong>
                <span style={{ fontSize: 13, lineHeight: '19px', color: '#e4f1eb' }}>{hero.id === 'weaker' ? '“In the last game, a weaker-foot goal counts double. Say nothing else about it.”' : hero.tryLine ? `“${hero.tryLine.charAt(0).toUpperCase()}${hero.tryLine.slice(1)}”` : 'This one has nothing to try. It is for reading.'}</span>
                {hero.id === 'weaker' && <span style={{ fontSize: 12, lineHeight: '17px', color: '#cfe6dc' }}>Tonight’s film then counts weaker-foot shots, so you see whether it changed anything.</span>}
              </div>
              <div style={{ display: 'flex', gap: 16, padding: '0 4px' }}>
                {([[v.counts.done, 'lessons done this term'], [v.counts.tried, 'things tried after one'], [v.counts.showed, 'showed on film']] as const).map(([n, t]) => (
                  <span key={t} style={{ display: 'flex', flexDirection: 'column' }}><strong data-count={t} style={{ ...T.num, fontSize: 22 }}>{n}</strong><span style={{ fontSize: 12, color: '#cfe6dc' }}>{t}</span></span>
                ))}
              </div>
            </div>
          </section>
        )}
        {panel === 'ask' && (
          <section aria-label="Ask a question" style={{ ...tile, gap: 8 }}>
            <div style={T.between}><h2 style={T.h2}>Ask a question</h2><span style={T.cap}>Only you see your questions. Dani never does</span></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input aria-label="Your question" value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') ask() }} placeholder="Type your question" style={{ ...field, flexGrow: 1 }} />
              <button onClick={ask} style={{ ...more, background: G, color: '#ffffff', border: `1px solid ${G}` }}>Ask</button>
            </div>
            {v.questions.map((q, i) => <span key={i} style={{ fontSize: 14, lineHeight: '20px', borderTop: `1px solid ${HAIR}`, paddingTop: 8 }}>{q}</span>)}
            <span style={T.sub}>The answer comes from the lessons and How we coach, and says so when it doesn’t know.</span>
          </section>
        )}
        {panel === 'all' && (
          <section aria-label="All lessons" style={{ ...tile, gap: 0 }}>
            <div style={{ ...T.between, paddingBottom: 4 }}><h2 style={T.h2}>All {LIBRARY} lessons, and Tall Timber’s {OWN_MADE}</h2><span style={T.cap}>The ones this demo names</span></div>
            {v.library.map(l => (
              <span key={l.id} style={{ ...fact, cursor: 'default' }}><span>{l.title} <span style={{ fontSize: 12, color: SOFT }}>{l.minutes} min{l.required ? ' · required' : ''}</span></span><span style={{ fontWeight: 700, textAlign: 'right' }}>{l.state}</span></span>
            ))}
            <span style={{ ...T.sub, paddingTop: 6 }}>{LIBRARY + OWN_MADE - v.library.length} more are in the library. The sample does not name them yet.</span>
          </section>
        )}
        <section style={{ ...tile, gap: 10 }}>
          <h2 style={T.h2}>Where your lessons come from</h2>
          <div style={{ display: 'flex', gap: 20 }}>
            {([['Your own film', 'After each session and game, the review finds the one thing that would help most and matches a lesson to it.', from(v.sources.film)],
              ['The block you’re in', 'Each block of the curriculum has a lesson on coaching that skill, shown in its first two weeks.', from(v.sources.block)],
              ['Dani', 'She sets lessons for an age group or for everyone, makes her own from Tall Timber film, and decides which are required.', `${from(v.sources.owner)}, and ${v.required.length} required`]] as const).map(([t, s, n], i) => (
              <div key={t} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: G, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</span><strong style={{ fontSize: 15 }}>{t}</strong></span>
                <span style={{ fontSize: 13, lineHeight: '18px', color: SOFT }}>{s}</span>
                <strong style={{ fontSize: 13, lineHeight: '18px' }}>{n}</strong>
              </div>
            ))}
          </div>
          <span style={T.cap}>The {LIBRARY} lessons in the library came with Clean Sheet. Six more are Tall Timber’s own, made by Dani from your coaches’ sessions.</span>
        </section>
        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="For you this week" style={tile}>
              <div style={T.between}><h2 style={T.h2}>For you this week</h2><span style={T.cap}>Short on purpose. Each ends with one thing to try</span></div>
              {v.week.map((w, i) => (
                <div key={w.id} data-lesson={w.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', borderTop: `1px solid ${HAIR}`, padding: '12px 0' }}>
                  <button onClick={() => open(w.id, w.title)} aria-label={`Open the lesson: ${w.title}`} style={{ ...plain, flex: 'none', width: 120, height: 76, borderRadius: 10, background: `linear-gradient(${130 + i * 20}deg,#1c3a33,#40826d)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 999, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{play(12)}</span>
                  </button>
                  <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: 16, lineHeight: '21px' }}>{w.title}</strong>
                      <span style={{ fontSize: 12, color: SOFT }}>{w.minutes} min</span>
                      <span style={pill(SOURCE_BG[w.source])}>{w.pill}</span>
                    </span>
                    <span style={{ fontSize: 13, lineHeight: '18px' }}><strong>Why you’re seeing it:</strong> {whyOf(w.id, w.why)}</span>
                    {w.tryLine && <span style={{ fontSize: 13, lineHeight: '18px', color: SOFT }}><strong style={{ color: INK }}>Try at your next session:</strong> {w.tryLine}</span>}
                  </span>
                  <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span data-state style={pill(w.state === 'New' || w.state === 'Done' ? G : w.state === 'Half done' ? MAUVE_PALE : PALE, w.state === 'New' || w.state === 'Done' ? '#ffffff' : INK)}>{w.state}</span>
                    {w.state !== 'Done' ? <button onClick={() => finish(w.id, w.title)} aria-label={`Mark as done: ${w.title}`} style={more}>Mark as done</button>
                      : !w.tryLine ? null : w.tried ? <span style={pill(PALE)}>Tried it</span>
                      : <button onClick={() => tried(w.id)} aria-label={`I tried it: ${w.title}`} style={more}>I tried it</button>}
                  </span>
                </div>
              ))}
              {v.week.length === 0 && <span style={{ ...T.cap, borderTop: `1px solid ${HAIR}`, padding: '12px 0' }}>Nothing picked for you this week yet. Lessons come after your first filmed session.</span>}
            </section>
            <section aria-label="Did it show?" style={{ ...tile, gap: 8 }}>
              <div style={T.between}><h2 style={T.h2}>Did it show?</h2>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}><span style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', background: '#f4c95d', border: '1px solid #b98f1d' }} />Strong</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {v.showed.map(s => (
                  <div key={s.lesson} style={{ borderRadius: 12, border: '1px solid #d9dcd8', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <strong style={{ fontSize: 14, lineHeight: '18px' }}>{s.title}</strong>
                    <span style={{ fontSize: 13, lineHeight: '18px', color: SOFT }}>You tried: {s.tried}</span>
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={{ ...T.num, flex: 'none', whiteSpace: 'nowrap', fontSize: 22 }}>{s.big}</strong><span style={{ fontSize: 12, color: SOFT }}>{s.line}</span></span>
                  </div>
                ))}
              </div>
              <span style={T.cap}>Counted from your own film, before and after. One session each way is a small count, so read it as a sign, not proof.</span>
            </section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="Required by Tall Timber" style={{ ...tile, gap: 0, padding: '12px 14px' }}>
              <div style={{ ...T.between, paddingBottom: 4 }}><h2 style={T.h2}>Required by Tall Timber</h2><span data-required-done style={T.cap}>{reqDone} of {v.required.length} done</span></div>
              {v.required.map(r => r.done
                ? (r.reads ? <Fact key={r.id} label={r.title} value={r.label} onTap={() => go(r.reads!)} /> : <Fact key={r.id} label={r.title} value={r.label} />)
                : <div key={r.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Fact label={r.title} value={r.label} onTap={() => { setOpenReq(openReq === r.id ? '' : r.id); if (openReq !== r.id) demoToast(`The lesson opens. ${r.minutes === 8 ? 'Eight' : r.minutes} minutes, with five questions at the end.`) }} />
                    {openReq === r.id && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8 }}>
                        <span style={{ flexGrow: 1, fontSize: 13, lineHeight: '18px', color: SOFT }}>Finished it and the five questions?</span>
                        <button onClick={() => { coachDo.finishRequired(a, r.id); setOpenReq(''); demoToast(`Done: ${r.title}. Dani’s list now shows it as done, by name.`) }} style={more}>Mark as done</button>
                      </span>
                    )}
                    {r.reminded && <span style={{ fontSize: 12, lineHeight: '16px', color: SOFT, paddingBottom: 6 }}>Dani reminded you on {r.reminded}.</span>}
                  </div>)}
              <span style={{ ...T.cap, paddingTop: 6 }}>Dani sees whether each of these is done, by name. These are the only ones.</span>
            </section>
            <section aria-label="What Dani can see" style={{ ...tile, gap: 6, padding: '12px 14px', background: PALE }}>
              <h2 style={T.h2}>What Dani can see</h2>
              {/* The same list the owner's page draws, from the one place in the store. */}
              {rules().map(r => <span key={r.head} data-rule={r.head} style={{ fontSize: 13, lineHeight: '19px' }}><strong>{r.head}:</strong> {r.coach}</span>)}
              <span style={{ display: 'flex', paddingTop: 2 }}><button aria-expanded={sharing} onClick={() => setSharing(!sharing)} style={{ ...more, fontSize: 15, padding: '0 16px' }}>Share a lesson with Dani</button></span>
              {sharing && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 4 }}>
                  <span style={{ fontSize: 13, lineHeight: '18px', color: SOFT }}>Pick a finished lesson. Dani sees that you did it and what you tried. You can take it back.</span>
                  <input aria-label="A note to go with it" value={note} onChange={e => setNote(e.target.value)} placeholder="A note to go with it, if you like" style={{ ...field, width: '100%' }} />
                  {v.canShare.map(l => (
                    <span key={l.id} data-share={l.id} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, borderTop: '1px solid #cfe3da' }}>
                      <span style={{ flexGrow: 1, minWidth: 0, fontSize: 13, lineHeight: '17px' }}><strong>{l.title}</strong>{l.shared ? <span style={{ display: 'block', color: SOFT }}>Shared{l.note ? `: ${l.note}` : ''}</span> : null}</span>
                      {l.shared
                        ? <button onClick={() => { coachDo.unshare(l.id); demoToast('Taken back. Dani no longer sees it.') }} aria-label={`Stop sharing: ${l.title}`} style={more}>Stop sharing</button>
                        : <button onClick={() => { coachDo.share(l.id, note); setNote(''); demoToast(`Shared with Dani: ${l.title}.`) }} aria-label={`Share: ${l.title}`} style={more}>Share</button>}
                    </span>
                  ))}
                  {v.canShare.length === 0 && <span style={{ fontSize: 13, color: MUT }}>Finish a lesson first.</span>}
                </div>
              )}
            </section>
            <section aria-label="From your own sessions" style={{ ...tile, gap: 0, padding: '12px 14px' }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>From your own sessions</h2>
              <Fact label="Your own view of Thursday" value="Four quick ratings" onTap={() => go('ADC15-MySession')} />
              <Fact label="Film" value="12 moments to check" onTap={() => go('ADC3-SessionFilm')} />
              <Fact label="Sunday’s review" value={result} onTap={() => go('ADC7-GameReview')} />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
