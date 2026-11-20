// LNp1 · this week's lesson on the coach's phone before training. LNp2 · three quick answers afterwards.
// The same lesson, the same answers and the same store as the tablet pages.

import { useState } from 'react'
import { demoToast } from '../demoToast'
import { openScreen } from '../openThing'
import { useBackState } from '../../backState'
import LearnPlayer, { chaptersFor } from './LearnPlayer'
import { ALL, ctxFor, effectOf, lesson, moduleOf, moduleOrder, nextLesson, setCoach, useCoach } from './course'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4'
const SPARK = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'
const round: React.CSSProperties = { flex: 'none', width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }
const chip = (on: boolean): React.CSSProperties => ({ minHeight: 44, padding: '0 14px', borderRadius: 999, border: on ? 0 : `1px solid ${LINE}`, background: on ? G : '#fff', color: on ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' })
const wide = (primary = false): React.CSSProperties => ({ height: 48, borderRadius: 12, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' })
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }

export default function LearnPhone({ start = 'LNp1-LessonPhone', onNav }: { start?: string; onNav?: (s: string) => void }) {
  const x = ctxFor('u11'), c = useCoach(x.who)
  const [id, setId] = useBackState(start)
  const go = (s: string) => s.startsWith('LNp') ? setId(s) : onNav ? onNav(s) : openScreen(s)
  const l = nextLesson(c) ?? lesson('4.2') ?? ALL[0], m = moduleOf(l), short = l.title.split(',')[0]
  const [tried, setTried] = useState('Yes'), [ans, setAns] = useState(l.id === '4.2' ? 'Silence' : l.answers[0].answer), [feel, setFeel] = useState(3)
  const phone: React.CSSProperties = { width: 390, minHeight: 844, margin: '0 auto', background: '#faf5ec', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }
  const head = (over: string, title: string) => (
    <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
      <button aria-label="Back" onClick={() => go('LN1-LearnHome')} style={{ ...round, border: 0, background: 'transparent', color: '#fff', marginLeft: -10 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg></button>
      <span style={{ flexGrow: 1 }}><span style={{ display: 'block', fontSize: 12, color: '#cfe6dc' }}>{over}</span><strong style={{ fontSize: 21 }}>{title}</strong></span>
      <button aria-label="Ask Clean Sheet" onClick={() => go('ASKp2-PhoneAskOpen')} style={{ ...round, border: '1.5px solid #a9cfc0', background: 'transparent', color: '#fff' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={SPARK} /></svg></button>
      <span style={{ ...round, cursor: 'default', background: '#e8cfcf', color: INK, fontSize: 14, fontWeight: 700 }}>LF</span>
    </div>)

  if (id === 'LNp2-HowItWentPhone') {
    const a = l.answers.find(v => v.answer === ans) ?? l.answers[0], fx = effectOf(l, a)
    const after = fx.kind === 'lesson' ? fx.to! : moduleOrder(c).flatMap(v => v.lessons).find(v => !c.done[v.id] && v.id !== l.id)
    return (
      <div data-screen="LNp2-HowItWentPhone" style={phone}>
        {head('After training · 20 seconds', 'How did it go?')}
        <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <section style={card}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT }}>YOU WERE GOING TO TRY</span><strong style={{ fontSize: 16 }}>{l.id === '4.2' ? 'Asking a question in Keep-ball 4 v 2.' : `${short}.`}</strong></section>
          <section style={card}>
            <strong style={{ fontSize: 14 }}>Did you try it?</strong>
            <div role="radiogroup" aria-label="Did you try it?" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{['Yes', 'Sort of', 'Didn’t get to it'].map(o => <button key={o} role="radio" aria-checked={tried === o} onClick={() => { demoToast(`${o}: ${tried === o ? 'taken off' : 'picked'}.`); setTried(o) }} style={chip(tried === o)}>{o}</button>)}</div>
            <strong style={{ fontSize: 14 }}>What happened?</strong>
            <div role="radiogroup" aria-label="What happened?" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{l.answers.map(o => <button key={o.answer} role="radio" aria-checked={ans === o.answer} onClick={() => { demoToast(`${o.answer}: ${ans === o.answer ? 'taken off' : 'picked'}.`); setAns(o.answer) }} style={chip(ans === o.answer)}>{o.answer}</button>)}</div>
            <strong style={{ fontSize: 14 }}>How did it feel?</strong>
            <div role="radiogroup" aria-label="How did it feel?" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>{[1, 2, 3, 4, 5].map(n => <button key={n} role="radio" aria-checked={feel === n} onClick={() => { setFeel(n); demoToast(`How did it feel? ${n} of 5.`) }} style={{ ...chip(feel === n), borderRadius: 10, padding: 0 }}>{n}</button>)}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUT }}><span>Awkward</span><span>Natural</span></div>
          </section>
          <span style={{ fontSize: 13, color: MUT, textAlign: 'center' }}>Only you see this. It picks your next lesson.</span>
        </div>
        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, padding: '12px 14px 16px', borderTop: `1px solid ${LINE}`, background: '#fff' }}>
          <button style={wide()} onClick={() => { setCoach(x.who, v => ({ skipped: [...v.skipped, l.id] })); demoToast('Skipped. We won’t ask again for this session.') }}>Skip</button>
          <button style={wide(true)} onClick={() => { setCoach(x.who, v => ({ done: { ...v.done, [l.id]: { tried, answer: ans, feel, when: 'this week' } }, next: fx.kind === 'lesson' ? fx.to!.id : null, did: fx.kind === 'product' ? [`${l.title}: ${a.then}`, ...v.did] : v.did })); demoToast(after ? `Saved. Next week: “${after.title}”.` : 'Saved. Course finished.') }}>Save</button>
        </div>
      </div>)
  }
  const time = l.try_at.match(/^(\d+:\d\d) · (.+)$/), tonight = l.id === '4.2' ? 'After the second swap, stop for 20 seconds. Ask one question. Count to five. Play on.' : l.try_task
  return (
    <div data-screen="LNp1-LessonPhone" style={phone}>
      {head(`${m.title} · ${m.lessons.indexOf(l) + 1} of ${m.lessons.length}`, short)}
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* no film is made yet: the player runs the coach's own clip, when one fits, then the lesson drawn */}
        <LearnPlayer phone chapters={chaptersFor(l, x.hasFilm)} ratio="362 / 215" chips={[`Lesson ${l.id}`, 'Film coming']} captions={c.captions !== false} onCaptions={on => setCoach(x.who, { captions: on })} say={demoToast}
          tryCard={{ heading: 'Tonight', at: '', task: tonight, button: '', done: false, onAdd: () => {} }} />
        <section style={{ ...card, border: `2.5px solid ${INK}`, gap: 6 }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><strong style={{ fontSize: 17 }}>{time ? `Tonight, ${time[1]}` : 'Tonight'}</strong><span style={{ display: 'inline-flex', alignItems: 'center', minHeight: 24, padding: '0 9px', borderRadius: 999, background: G, color: '#fff', fontSize: 12, fontWeight: 700 }}>{time ? time[2] : l.try_at}</span></span>
          <span style={{ fontSize: 15, lineHeight: '21px' }}>{tonight}</span>
        </section>
        {l.words_to_use.length > 0 && <section style={card}><strong style={{ fontSize: 15 }}>Words you can use</strong>{[...(c.ownWords[l.id] ?? []), ...l.words_to_use].slice(0, 3).map(w => <span key={w} style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 15, lineHeight: '21px' }}><span style={{ color: G }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" /></svg></span>“{w}”</span>)}</section>}
        <span style={{ fontSize: 13, lineHeight: '18px', color: MUT, textAlign: 'center' }}>Training starts in 40 minutes. This lesson takes six. Captions are on, so you can watch with the sound off.</span>
      </div>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '12px 14px 16px', borderTop: `1px solid ${LINE}`, background: '#fff' }}>
        <button style={wide()} onClick={() => go('GS3-RunSheet')}>Run sheet</button>
        <button style={wide(true)} onClick={() => { demoToast('Good luck tonight. We’ll ask how it went at 6:15.'); setId('LNp2-HowItWentPhone') }}>Got it</button>
      </div>
    </div>)
}
