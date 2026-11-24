// ADW1-WatchSession: Academy owner: one session of one coach (pack v31, 25 Nov). A band says why this one and shows the coach's other
// filmed sessions as chips that switch; then the film, the moments the owner marked (tap to jump), both views of how it went (the coach
// marks first, without seeing the owner's), one thing to try, keep doing, and since last time.
// ONE template: it opens on the coach the owner picked (`watchCoach` in coachStore), and on Sofia Marin's Wednesday when opened by its
// address, as the board draws it. A coach with nothing filmed is watched beside the pitch: the same four lines without film.
// INPUTS, kept while the app is open: the owner's four marks, a new moment, the two lines of words, and Send, which moves `AD10` and the
// coach's page. Only Sofia's Wednesday is in the sample; every other session starts with nothing marked by the owner.
import { useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { BALL_ROLLING_FROM_FILM } from './notYet'
import { useAcademy } from './academyStore'
import { LINES, SOFIA_SESSION, draftOf, filmedDates, first, longDate, recentDates, sendDraft, setDraft, useCoachStore, watchNext, watchOf, watching, type Moment } from './coachStore'
import { Cap, G, LINE, MAIN, MAUVE, MUTED, PALE, Pill } from './kit'

const PARTS = ['Arrival game', 'Skill practice', 'Skill game', 'Game']
const field = { height: 44, boxSizing: 'border-box', padding: '0 10px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, minWidth: 0 } as const
const words = { boxSizing: 'border-box', width: '100%', minHeight: 44, padding: '1px 8px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, lineHeight: '20px', resize: 'none' } as const
/** Five dots, read only: a mark the coach gave. */
const Dots = ({ n }: { n: number }) => (
  <span role="img" aria-label={`${n} of 5`} style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
    {[0, 1, 2, 3, 4].map(k => <span key={k} style={{ width: 11, height: 11, borderRadius: 999, boxSizing: 'border-box', ...(k < n ? { background: G } : { background: '#ffffff', border: `1.5px solid ${LINE}` }) }} />)}
  </span>
)
/** How long a session runs, from "4:30 to 5:20". */
const minutes = (slot: string) => { const m = slot.match(/(\d+):(\d+) to (\d+):(\d+)/); return m ? (Number(m[3]) * 60 + Number(m[4])) - (Number(m[1]) * 60 + Number(m[2])) : 0 }

export default function ADW1WatchSession() {
  const a = useAcademy()
  useCoachStore()
  const [focus] = useState(() => watching())
  const g = a.groups.find(x => x.coach === (focus?.coach ?? 'Sofia Marin')) ?? a.groups[0]
  const w = watchOf(g), fn = first(g.coach), inPerson = !!focus?.inPerson || w.filmed === 0
  const dates = inPerson ? recentDates(g) : filmedDates(g)
  const [at, setAt] = useState(0), session = dates[Math.min(at, dates.length - 1)] ?? ''
  /** Where the film is: the moment last jumped to. */
  const [pos, setPos] = useState<string | null>(null)
  const [add, setAdd] = useState<Moment>({ at: '', part: PARTS[0], note: '', tone: 'Keep' })
  const d = draftOf(g, session, inPerson), sample = g.coach === 'Sofia Marin' && !inPerson && session === SOFIA_SESSION.date
  const slot = g.when.split(' · ')[1] ?? '', mins = minutes(slot), length = mins ? `${mins}:00` : ''
  const change = (p: Parameters<typeof setDraft>[3]) => setDraft(g, session, inPerson, p)
  const why = sample ? SOFIA_SESSION.why : inPerson ? `You watched ${fn} beside the pitch${w.filmed ? '' : ', because nothing is filmed yet'}. Pick the session it was.` : watchNext(a).find(s => s.g.id === g.id)?.why.replace(/^She asked.*$/, `${fn} asked you to look at a session.`) ?? `You picked ${fn} from the list. Pick the session to watch.`
  function pick(i: number) { setAt(i); setPos(null) }
  function mark() {
    if (!add.note.trim()) { demoToast('Write what you saw, then mark it.'); return }
    change({ moments: [...d.moments, { ...add, at: add.at.trim() || (inPerson ? '' : pos ?? '0:00'), note: add.note.trim() }] }); setAdd({ ...add, at: '', note: '' })
  }
  function send() {
    const left = d.marks.filter(m => m === null).length
    if (left) { demoToast(`Mark ${left === 4 ? 'the four lines' : `the ${left} ${left === 1 ? 'line' : 'lines'} left`} under “How it went” first.`); return }
    if (!d.tryThis.trim()) { demoToast('Write one thing to try first.'); return }
    sendDraft(a, g, session, inPerson); demoToast(`Sent to ${fn}. ${d.coachMarks ? `${fn} sees your marks beside their own and can reply.` : `${fn} is asked to mark the session first, then sees yours.`}`)
  }
  if (!session) return (
    <main style={MAIN}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><h1 style={{ margin: 0, flexGrow: 1, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em' }}>{g.coach} · {g.name}</h1><Tap to="AD10-WatchCoach" style={S.more}>All coaches to watch</Tap></div>
      <Cap>{g.name} has not run a session yet, so there is nothing to watch.</Cap>
    </main>
  )
  return (
    <main style={{ ...MAIN, padding: '14px 28px 16px' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>{g.coach} · {g.name}</h1>
          <span style={{ fontSize: 14, lineHeight: '20px', color: MUTED }}>{longDate(session)}{slot ? ` · ${slot}` : ''}{sample ? ` · ${SOFIA_SESSION.topic}` : ''} · {inPerson ? 'watched beside the pitch' : 'filmed on the tablet'}</span>
        </div>
        <Tap to="AD10-WatchCoach" style={S.more}>All coaches to watch</Tap>
        {!inPerson && <Tap to="ADC15-MySession" style={S.more}>{fn}’s own view</Tap>}
        <button type="button" onClick={send} disabled={d.sent} style={{ ...S.primary, fontFamily: 'inherit', cursor: d.sent ? 'default' : 'pointer', ...(d.sent ? { background: PALE, color: '#10211f', border: '1px solid #cfe3da' } : null) }}>{d.sent ? `Sent to ${fn}` : `Send to ${fn}`}</button>
      </div>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 12, background: PALE, border: '1px solid #cfe3da' }}>
        <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '19px' }}><strong>Why this one.</strong> {why}</span>
        <span style={{ fontSize: 12, color: '#33443f', whiteSpace: 'nowrap' }}>{inPerson ? 'The last sessions' : `${fn}’s ${dates.length} filmed this term`}</span>
        {dates.map((t, i) => (
          <button key={t} type="button" aria-pressed={i === at} onClick={() => pick(i)} style={{ flex: 'none', minHeight: 44, boxSizing: 'border-box', borderRadius: 10, padding: '4px 8px', fontFamily: 'inherit', fontSize: 13, lineHeight: '16px', fontWeight: 700, cursor: 'pointer', ...(i === at ? { background: G, color: '#ffffff', border: `1px solid ${G}` } : { background: '#ffffff', color: '#10211f', border: '1px solid #c5c8c4' }) }}>{t}</button>
        ))}
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
        <section aria-label="The session" style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
          {inPerson ? (
            <div style={{ flex: 'none', minHeight: 64, borderRadius: 12, background: PALE, border: '1px solid #cfe3da', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 14, lineHeight: '20px' }}>No film for this one. You watched {g.name} beside the pitch on {longDate(session)}.</div>
          ) : (
            <button type="button" onClick={() => demoToast(pos ? `The film plays from ${pos}.` : 'The film plays from the start.')} aria-label="Play the session" style={{ flex: 'none', height: 230, border: 0, padding: 0, borderRadius: 12, background: 'linear-gradient(135deg,#1c3a33,#40826d)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', fontFamily: 'inherit' }}>
              <span style={{ width: 56, height: 56, borderRadius: 999, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
              </span>
              <span style={{ position: 'absolute', left: 14, bottom: 10, color: '#ffffff', fontSize: 13, fontWeight: 700 }}>{g.name} · {longDate(session)}{length ? ` · ${length}` : ''}</span>
              {pos && <span style={{ position: 'absolute', right: 14, bottom: 10, color: '#ffffff', fontSize: 13, fontWeight: 700 }}>At {pos}</span>}
            </button>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0 4px' }}><h2 style={S.h2}>Moments you marked</h2><Cap>{inPerson ? 'What you saw, in order' : 'Tap one to jump to it'}</Cap></div>
          {d.moments.map((m, i) => { const inner = (
            <>
              <strong style={{ ...S.num, flex: 'none', width: 52, fontSize: 15 }}>{m.at}</strong>
              <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{m.part}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{m.note}</span></span>
              <Pill kind={m.tone === 'To try' ? 'mauve' : 'soft'}>{m.tone}</Pill>
            </>
          ), look = { display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: `1px solid ${LINE}`, color: '#10211f', boxSizing: 'content-box' } as const
            return inPerson ? <div key={i} style={look}>{inner}</div>
              : <button key={i} type="button" onClick={() => { setPos(m.at); demoToast(`The film jumps to ${m.at}.`) }} aria-label={`Jump to ${m.at}: ${m.part}`} style={{ ...look, width: '100%', padding: 0, borderLeft: 0, borderRight: 0, borderBottom: 0, background: 'transparent', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>{inner}</button>
          })}
          {d.moments.length === 0 && <Cap style={{ borderTop: `1px solid ${LINE}`, padding: '10px 0' }}>Nothing marked yet. {inPerson ? 'Write what you saw below.' : 'Play the film and mark what you see below.'}</Cap>}
          {!d.sent && (
            <div role="group" aria-label="Mark a moment" style={{ display: 'flex', gap: 8, alignItems: 'center', borderTop: `1px solid ${LINE}`, paddingTop: 8 }}>
              <input aria-label="Minute, like 18:30" placeholder={inPerson ? 'When' : pos ?? '0:00'} value={add.at} onChange={e => setAdd({ ...add, at: e.target.value })} style={{ ...field, width: 72, flex: 'none' }} />
              <select aria-label="Part of the session" value={add.part} onChange={e => setAdd({ ...add, part: e.target.value })} style={{ ...field, flex: 'none' }}>{PARTS.map(p => <option key={p}>{p}</option>)}</select>
              <input aria-label="What you saw" placeholder="What you saw" value={add.note} onChange={e => setAdd({ ...add, note: e.target.value })} onKeyDown={e => { if (e.key === 'Enter') mark() }} style={{ ...field, flexGrow: 1 }} />
              <select aria-label="Keep, or to try" value={add.tone} onChange={e => setAdd({ ...add, tone: e.target.value as Moment['tone'] })} style={{ ...field, flex: 'none' }}><option>Keep</option><option>To try</option></select>
              <button type="button" onClick={mark} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer', flex: 'none' }}>Mark a moment</button>
            </div>
          )}
          {/* Ball rolling counted from the film is not built yet (notYet.ts), so the figure stays hidden until the switch is on. */}
          <Cap style={{ marginTop: 'auto', paddingTop: 8 }}>{inPerson ? 'Beside the pitch there is no film, so ball rolling is your own mark and is not counted.'
            : BALL_ROLLING_FROM_FILM && sample ? `Ball rolling for this session was ${SOFIA_SESSION.rolling}%, counted from the film. Your target is ${SOFIA_SESSION.target}%.`
            : 'Ball rolling is your mark and the coach’s. Counting it from the film is not turned on yet.'}</Cap>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, minWidth: 0 }}>
          <section aria-label="How it went" style={{ ...S.tile, gap: 0, padding: '8px 14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 130px 62px', gap: 8, alignItems: 'baseline' }}><h2 style={{ ...S.h2, whiteSpace: 'nowrap' }}>How it went</h2><span style={S.label}>You</span><span style={S.label}>{fn}</span></div>
            {LINES.map((line, k) => (
              <div key={line} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 130px 62px', gap: 8, alignItems: 'center', minHeight: 44, fontSize: 14, lineHeight: '18px' }}>
                <span>{line}</span>
                <span role="group" aria-label={`Your mark for ${line.toLowerCase()}`} style={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <button key={v} type="button" disabled={d.sent} aria-label={`${v} of 5`} aria-pressed={d.marks[k] === v} onClick={() => change({ marks: d.marks.map((m, j) => j === k ? v : m) })} style={{ width: 26, height: 44, padding: 0, border: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: d.sent ? 'default' : 'pointer' }}>
                      <span style={{ width: 14, height: 14, borderRadius: 999, boxSizing: 'border-box', ...(v <= (d.marks[k] ?? 0) ? { background: G } : { background: '#ffffff', border: '1.5px solid #8a9794' }) }} />
                    </button>
                  ))}
                </span>
                {d.coachMarks ? <Dots n={d.coachMarks[k]} /> : <span style={{ fontSize: 12, color: MUTED }}>Not yet</span>}
              </div>
            ))}
            <span style={{ fontSize: 12, lineHeight: '16px', color: MUTED }}>{d.coachMarks ? `${fn} marked first, without seeing yours.` : `${fn} is asked to mark it before seeing yours.`}</span>
          </section>
          <section aria-label="One thing to try" style={{ ...S.tile, gap: 4, padding: '4px 14px 8px', background: MAUVE, borderColor: '#c39797' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><strong id="adw1-try" style={{ fontSize: 14 }}>One thing to try</strong><Tap to="ADL2-Drill" style={{ ...S.more, height: 44, padding: '0 10px', fontSize: 13 }}>Attach a drill that does it</Tap></span>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <textarea aria-labelledby="adw1-try" value={d.tryThis} readOnly={d.sent} onChange={e => change({ tryThis: e.target.value })} rows={2} placeholder="One thing, in a line" style={words} />
            </label>
          </section>
          <section aria-label="Keep doing" style={{ ...S.tile, gap: 4, padding: '8px 14px', background: PALE }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <strong style={{ fontSize: 14 }}>Keep doing</strong>
              <textarea value={d.keep} readOnly={d.sent} onChange={e => change({ keep: e.target.value })} rows={2} placeholder="What went well" style={words} />
            </label>
          </section>
          <section aria-label="Since last time" style={{ ...S.tile, gap: 4, padding: '8px 14px', flexGrow: 1 }}>
            <strong style={{ fontSize: 14 }}>Since last time{sample ? ` · ${SOFIA_SESSION.sinceDate}` : ''}</strong>
            <span style={{ fontSize: 13, lineHeight: '19px' }}>{sample ? SOFIA_SESSION.since : d.sent ? `Sent on ${w.watched}. Next time, this says whether the thing to try changed.` : w.watched ? `Last watched on ${w.watched} by ${w.by === 'You' ? 'you' : w.by}. The sample does not hold what was asked for then.` : `${fn} has not been watched yet this term. Next time, this says whether the thing to try changed.`}</span>
          </section>
        </div>
      </div>
    </main>
  )
}
