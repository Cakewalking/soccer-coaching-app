// ADC1-PlayerFile: one player's file. The four core skills as the coach and the player each see
// them, the whole player in four short lines, and numbers from the game with the clips behind them.
// It replaces ACC4-PlayerPlan as the coach's player screen; the goal card still opens ACC4.

import { demoToast } from '../demoToast'
import { playClips } from '../clips/clipSheet'
import { type CoreSkill } from './skills'
import { Dots, Estimate, Head, More, Page, Primary, Strong, TileHead, Two } from './kit'
import { HAIR, INK, MAUVE_PALE, MUT, foot, label, listTile, plain, th } from './styles'

const SKILLS: Array<{ skill: CoreSkill; line: string; clips: number; you: number; kai: number }> = [
  { skill: 'First touch',           line: 'Up a step. Sets it out of his feet now.', clips: 3, you: 3, kai: 4 },
  { skill: 'Running with the ball', line: 'Head up at speed. His strength.',         clips: 2, you: 4, kai: 4 },
  { skill: 'One against one',       line: 'Wins most. Thinks he doesn’t.',           clips: 4, you: 4, kai: 3 },
  { skill: 'Striking the ball',     line: 'This term’s goal: the left foot.',        clips: 3, you: 2, kai: 2 },
]
const WHOLE = [
  { a: 'With the ball',         b: 'Strong on the right. Left foot is the work.' },
  { a: 'Game sense',            b: 'Finds space late. Ask him what he saw.' },
  { a: 'Body',                  b: 'Grown 4 cm since February. Keep sprints short.' },
  { a: 'Head, and with others', b: 'Leads the arrival game now. Quiet in a new group.' },
]
// Game numbers show only because Kai plays in the academy's own game team.
const GAME: Array<{ what: string; n: string; proof: 'strong' | 'estimate' }> = [
  { what: 'Passes completed', n: '21 of 27', proof: 'strong' },
  { what: 'Took a player on', n: '3 of 5',   proof: 'strong' },
  { what: 'Left-foot shots',  n: '2',        proof: 'strong' },
  { what: 'Sprints',          n: '14',       proof: 'estimate' },
]
const CLIPS = [{ title: 'Left-foot shot', when: '31st minute', tilt: 140 }, { title: 'Takes on two', when: '44th minute', tilt: 190 }]

const COLS = 'minmax(0,1.1fr) 78px 78px'

export default function ADC1PlayerFile({ go }: { go: (id: string) => void }) {
  // The mauve note: the player marks himself a step or more below the coach. The board draws it for
  // one against one only, not for first touch where Kai marks himself a step above, so that is the rule here.
  const apart = SKILLS.filter(s => s.you - s.kai >= 1)
  const openClips = (s: typeof SKILLS[number]) => {
    const name = s.skill.toLowerCase()
    playClips(Array.from({ length: s.clips }, (_, k) => ({ title: `${s.skill}, clip ${k + 1} of ${s.clips}`, sub: 'Kai Okonkwo. Newest first.', len: 9 })), s.skill)
    demoToast(`${s.clips} clips of ${name} open, newest first.`)
  }
  const play = (title: string, when: string) => { playClips([{ title, sub: `Kai Okonkwo, ${when}, U13 Timber v Eastbank.`, len: 9 }], 'Sunday’s game'); demoToast('The clip plays.') }

  return (
    <Page columns="repeat(12, minmax(0,1fr))" head={
      <Head title="Kai Okonkwo, 13" sub="Advanced · joined 13 May · came to 5 of 6">
        <More onClick={() => go('ACC13-AcademyChat')}>Message Kai’s mum</More>
        <More onClick={() => go('ADC5-ReviewChats')}>Book a review chat</More>
        <Primary onClick={() => go('ACC6-ReportDraft')}>Write term report</Primary>
      </Head>
    }>
      <section aria-label="Four core skills" style={{ ...listTile, gridColumn: 'span 5' }}>
        <TileHead title="Four core skills" right="Week 1 to now" />
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 8, alignItems: 'end', paddingBottom: 4 }}><span /><span style={th}>You</span><span style={th}>Kai</span></div>
        {SKILLS.map(s => (
          <button key={s.skill} onClick={() => openClips(s)} style={{ ...plain, display: 'grid', gridTemplateColumns: COLS, gap: 8, alignItems: 'center', minHeight: 74, borderTop: `1px solid ${HAIR}` }}>
            <Two a={s.skill} b={`${s.line} · ${s.clips} clips`} />
            <Dots step={s.you} /><Dots step={s.kai} />
          </button>
        ))}
        {apart.map(s => (
          <div key={s.skill} style={{ borderRadius: 12, background: MAUVE_PALE, padding: '10px 12px', fontSize: 14, lineHeight: '20px', color: INK }}>
            <strong>You and Kai see {s.skill.toLowerCase()} differently.</strong> A good place to start the review chat.
          </div>
        ))}
        <span style={foot}>Five steps per skill, set from your session notes. Kai marks his own in the app. Nobody sees anyone else’s.</span>
      </section>

      <section aria-label="The whole player" style={{ ...listTile, gridColumn: 'span 4' }}>
        <TileHead title="The whole player" />
        <button onClick={() => go('ACC4-PlayerPlan')} style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 14, border: '2px solid #2f6252', padding: '10px 12px', marginBottom: 6 }}>
          <span style={label}>Goal this term</span>
          <strong style={{ fontSize: 17, lineHeight: '22px' }}>Score with his left foot in a game</strong>
          <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>3 left-foot finishes in training · home practice 2 of 3 this week</span>
        </button>
        {WHOLE.map(w => (
          <div key={w.a} style={{ display: 'flex', alignItems: 'center', minHeight: 60, borderTop: `1px solid ${HAIR}` }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{w.a}</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{w.b}</span>
            </span>
          </div>
        ))}
        <span style={foot}>Kai’s week: 5 sessions across the academy, his club and school. Keep repeated sprints short.</span>
      </section>

      <section aria-label="Sunday’s game" style={{ ...listTile, gridColumn: 'span 3' }}>
        <TileHead title="Sunday’s game" right="31 May" />
        {GAME.map(g => (
          <div key={g.what} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, borderTop: `1px solid ${HAIR}` }}>
            <span style={{ flexGrow: 1, fontSize: 14 }}>{g.what}</span>
            <strong style={{ fontSize: 15, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{g.n}</strong>
            {g.proof === 'strong' ? <Strong /> : <Estimate />}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8, paddingTop: 10 }}>
          {CLIPS.map(c => (
            <button key={c.title} onClick={() => play(c.title, c.when)} style={{ ...plain, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ height: 64, borderRadius: 10, background: `linear-gradient(${c.tilt}deg,#1c3a33,#40826d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
              </span>
              <strong style={{ fontSize: 13, lineHeight: '17px' }}>{c.title}</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{c.when}</span>
            </button>
          ))}
        </div>
        <span style={foot}>U13 Timber v Eastbank, filmed by Wattle Creek FC and shared with you because Kai plays in your game team.</span>
      </section>
    </Page>
  )
}
