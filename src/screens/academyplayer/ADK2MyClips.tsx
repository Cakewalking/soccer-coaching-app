// ADK2-MyClips: the player picks up to six clips for their passport. Other children in a clip stay blurred
// unless their family has agreed. The family, not the academy, decides who the passport is sent to.
// The board marks a picked clip in amber; amber is kept for proof only, so a picked clip is marked with a dark edge and a white tick here.

import { useState } from 'react'
import { demoToast } from '../demoToast'
import { markDone } from '../doneStore'
import { coachGo } from '../academycoach/menu'
import PlayerFrame from './PlayerFrame'
import { INK, MUT, card, save } from './styles'

const CLIPS = [
  { title: 'Left-foot finish',      when: 'Thu 4 June' },
  { title: 'Takes on two',          when: 'Sun 31 May' },
  { title: 'First touch, turn',     when: 'Tue 26 May' },
  { title: 'Pass through the line', when: 'Sun 24 May' },
  { title: 'Wins it back',          when: 'Thu 21 May' },
  { title: 'Run from halfway',      when: 'Sun 17 May' },
]
const MOST = 6
const WORD = ['no', 'one', 'two', 'three', 'four', 'five', 'six']

export default function ADK2MyClips({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [picked, setPicked] = useState<string[]>(CLIPS.slice(0, 4).map(c => c.title))
  const toggle = (title: string) => {
    const on = picked.includes(title)
    setPicked(p => on ? p.filter(t => t !== title) : [...p, title])
    demoToast(`${title}: ${on ? 'taken out' : 'added'}.`)
  }
  const left = MOST - picked.length
  return (
    <PlayerFrame id="ADK2-MyClips" title="My six clips" onBack={() => go('ACK1-AcademyPlayerHome')}
      foot={<button onClick={() => { markDone('adk2:picked', picked.join('|')); demoToast(left > 0 ? `Saved. Pick ${WORD[left]} more any time.` : 'Saved.') }} style={save}>{picked.length} of {MOST} picked · Save</button>}>
      <div style={{ ...card, gap: 4, padding: '12px 14px' }}>
        <strong style={{ fontSize: 15 }}>Pick the six that show you best</strong>
        <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>They go in your passport. Your mum decides who it is sent to.</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {CLIPS.map((c, i) => {
          const on = picked.includes(c.title)
          return (
            <button key={c.title} role="checkbox" aria-checked={on} aria-label={`${c.title} · ${c.when}`} onClick={() => toggle(c.title)}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 3, border: 0, padding: 0, background: 'transparent', color: 'inherit', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
              <span style={{ alignSelf: 'stretch', height: 86, borderRadius: 12, background: `linear-gradient(${130 + i * 22}deg,#1c3a33,#40826d)`, boxSizing: 'border-box', border: `3px solid ${on ? INK : 'transparent'}` }} />
              {on && (
                <span style={{ position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: 999, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
                </span>
              )}
              <strong style={{ fontSize: 13, lineHeight: '17px' }}>{c.title}</strong>
              <span style={{ fontSize: 12, color: MUT }}>{c.when}</span>
            </button>
          )
        })}
      </div>
      <span style={{ fontSize: 13, lineHeight: '18px', color: MUT, textAlign: 'center' }}>Other players in your clips stay blurred unless their family has agreed.</span>
    </PlayerFrame>
  )
}
