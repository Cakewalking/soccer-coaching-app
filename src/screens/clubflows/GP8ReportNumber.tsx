// GP8-ReportNumber: the coach says a number from the game looks wrong. While the report is open the
// number reads "Being checked" on every screen that shows it. A person replies within 2 days
// (placeholder), and a fix also corrects the season average.

import { setCapture } from '../capture/captureStore'
import { Btn, Field, FlowPage, Pills, Steps, Tile, say, G, INK, MUT } from './ui'
import { BEING_CHECKED, reportNumber, useBeingChecked, useKept } from './flowStore'

const NUMBERS = ['Goal kicks played short · 64%', 'Wins in their half · 13', 'Another'] as const
const CLIPS: [title: string, line: string, tilt: number][] = [['Goal kick, minute 12', 'Counted as long', 140], ['Goal kick, minute 31', 'Counted as long', 190]]
const DRAWN = { which: NUMBERS[0] as typeof NUMBERS[number], why: 'Higher. We went short 9 of 11 times, I counted.', clips: [] as string[] }
const nameOf = (n: string) => n.split(' · ')[0]

export default function GP8ReportNumber({ go }: { go: (id: string) => void }) {
  const [s, set] = useKept('gp8', DRAWN)
  const open = useBeingChecked()
  function send() {
    if (!s.why.trim()) { say(s.which === 'Another' ? 'Say which number, and what you think it should be.' : 'Say what you think it should be first.'); return }
    reportNumber(nameOf(s.which), s.why.trim())
    setCapture(c => ({ flagged: [...new Set([...c.flagged, 'general'])] }))   // the "looks wrong" buttons on How we measure show it was sent
    say('Sent. The number shows “Being checked” until we write back, within 2 days.')
  }
  const thumb = (tilt: number) => ({ height: 64, borderRadius: 10, background: `linear-gradient(${tilt}deg,#1c3a33,#40826d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' })
  const clip = { flex: 1, minWidth: 0, minHeight: 44, display: 'flex', flexDirection: 'column', gap: 4, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' } as const
  return (
    <FlowPage id="GP8-ReportNumber" title="This number looks wrong" sub="Sunday 7 June · v Ironbark United"
      actions={<><Btn onClick={() => go('RD1-GameReview')}>Cancel</Btn><Btn primary onClick={send}>Send to be checked</Btn></>}>
      <Tile title="Which number, and why" footLine="Opens from any number’s “How we measure” link.">
        <Pills label="Which number" options={NUMBERS} value={s.which} onChange={v => set({ which: v })} show={o => open[nameOf(o)] && o !== 'Another' ? `${nameOf(o)} · ${BEING_CHECKED}` : o} />
        <Field label="What you think it should be" value={s.why} onChange={v => set({ why: v })} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>A clip that shows it · optional</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {CLIPS.map(([title, line, tilt]) => {
              const on = s.clips.includes(title)
              return (
                <button key={title} type="button" aria-pressed={on} aria-label={`${title} · ${line}`} onClick={() => { set({ clips: on ? s.clips.filter(x => x !== title) : [...s.clips, title] }); say('The clip plays.') }} style={clip}>
                  <span style={{ ...thumb(tilt), outline: on ? `3px solid ${G}` : undefined, outlineOffset: 2 }}><Play /></span>
                  <strong style={{ fontSize: 13, lineHeight: '17px' }}>{title}</strong>
                  <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{on ? `${line} · going with your report` : line}</span>
                </button>
              )
            })}
            <button type="button" aria-label="Add a clip · From this game" onClick={() => say('The clip plays.')} style={clip}>
              <span style={thumb(215)}><Play /></span>
              <strong style={{ fontSize: 13, lineHeight: '17px' }}>Add a clip</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>From this game</span>
            </button>
          </div>
        </div>
      </Tile>
      <Steps title="What happens" steps={[
        ['A person looks', 'At the clips, not just the count'],
        ['The number is marked', '“Being checked”, on every screen it shows'],
        ['You hear back', 'Within 2 days, with what we found'],
        ['If you were right', 'The number is fixed and so is the season average'],
      ]} footLine="Every one makes the counting better." />
    </FlowPage>
  )
}
const Play = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 5l12 7-12 7z" /></svg>
