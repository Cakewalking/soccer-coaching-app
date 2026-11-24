// ADK1-MySkills: "How am I going?" The player marks their own step on each of the four core skills and
// writes one thing they are proud of. Only the player and their coaches see it; it feeds the "Kai" column
// on the coach's player file (ADC1). No ranking, and nobody else's steps.

import { useState } from 'react'
import { demoToast } from '../demoToast'
import { markDone } from '../doneStore'
import { coachGo } from '../academycoach/menu'
import { CORE_SKILLS, SKILL_STEPS, type CoreSkill } from '../academycoach/skills'
import PlayerFrame from './PlayerFrame'
import { G, HAIR, INK, LINE, MUT, card, save } from './styles'

// As drawn: the same steps Kai shows on the coach's player file.
const DRAWN: Record<CoreSkill, number> = { 'First touch': 4, 'Running with the ball': 4, 'One against one': 3, 'Striking the ball': 2 }

export default function ADK1MySkills({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [steps, setSteps] = useState(DRAWN)
  const [proud, setProud] = useState('My left-foot goal on Thursday')
  const mark = (skill: CoreSkill, step: number) => { setSteps(s => ({ ...s, [skill]: step })); markDone(`adk1:${skill}`, String(step)); demoToast(`${skill}: step ${step}. Saved.`) }
  return (
    <PlayerFrame id="ADK1-MySkills" title="How am I going?" onBack={() => go('ACK1-AcademyPlayerHome')}
      foot={<button onClick={() => { markDone('adk1:proud', proud); demoToast('Saved. Reece can see it now.') }} style={save}>Save</button>}>
      <div style={{ ...card, padding: '12px 14px 4px' }}>
        <strong style={{ fontSize: 15 }}>Where do you think you are?</strong>
        <span style={{ fontSize: 14, lineHeight: '20px', color: MUT, paddingBottom: 4 }}>1 is just starting. 5 is doing it in a game without thinking.</span>
        {CORE_SKILLS.map(skill => (
          <div key={skill} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 0', borderTop: `1px solid ${HAIR}` }}>
            <strong style={{ fontSize: 15 }}>{skill}</strong>
            <span role="radiogroup" aria-label={skill} style={{ display: 'flex', gap: 8 }}>
              {Array.from({ length: SKILL_STEPS }, (_, i) => i + 1).map(n => (
                <button key={n} role="radio" aria-checked={steps[skill] === n} onClick={() => mark(skill, n)}
                  style={{ flex: 1, height: 44, borderRadius: 12, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', ...(n <= steps[skill] ? { background: G, color: '#ffffff', border: 0 } : { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }) }}>
                  {n}
                </button>
              ))}
            </span>
          </div>
        ))}
      </div>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>One thing I’m proud of this term</span>
        <input value={proud} onChange={e => setProud(e.target.value)} style={{ minHeight: 48, borderRadius: 10, border: '1px solid #8d9794', background: '#ffffff', padding: '0 12px', fontFamily: 'inherit', fontSize: 16, color: INK, boxSizing: 'border-box' }} />
        <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>Reece reads this before your chat</span>
      </label>
      <span style={{ fontSize: 13, lineHeight: '18px', color: MUT, textAlign: 'center' }}>Reece sees your answers next to his own. Nobody else does, and there is no right answer.</span>
    </PlayerFrame>
  )
}
