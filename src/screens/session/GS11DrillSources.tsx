// GS11 · Director › Coaches › Suggestion sources. The menu suggested drills are picked from, and the club's rules.
// The national curriculum is the federation's: it stays off, and cannot be switched on, until there is an agreement.

import { Btn, Note, Switch, tile, h2, cap, label, G, INK, MUT, LINE } from '../capture/marks'
import { Page, col } from '../capture/CaptureScreens'
import { SOURCES, type SourceId } from './sessionEngine'
import { setSession } from './sessionStore'
import type { GsProps } from './SessionScreens'

const HOW: [string, string][] = [['1 · What happened', 'Film, wearables, the coach’s taps and notes, players’ views'], ['2 · What matters most', 'The two biggest things, not ten'], ['3 · What fits', 'Drills for that age, from the sources you allow'], ['4 · Who is there', 'Sized to the poll, with the coach’s level of detail']]
export default function GS11DrillSources({ s, go, say }: GsProps) {
  const grid = 'minmax(0,1.5fr) 70px 110px 130px 130px'
  const flip = (id: SourceId, name: string) => { const on = !s.rules.sources[id]; setSession(x => ({ rules: { ...x.rules, sources: { ...x.rules.sources, [id]: on } } })); say(`${name}: turned ${on ? 'on' : 'off'} for suggestions.`) }
  const rule = (key: 'endWithGame' | 'noLines' | 'warmupFirst' | 'noHeadingU12', a: string, b: string) => { const on = s.rules[key]; return (
    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minHeight: 52, borderTop: `1px solid ${LINE}` }}>
      <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>{a}</strong><span style={{ fontSize: 13, color: MUT }}>{b}</span></span>
      <span style={{ display: 'flex', alignItems: 'center' }}><Switch on={on} label={a} onChange={() => { setSession(x => ({ rules: { ...x.rules, [key]: !on } })); say(`${a}: ${on ? 'off' : 'on'}.`) }} /><strong style={{ fontSize: 13 }}>{on ? 'On' : 'Off'}</strong></span>
    </div>) }
  return (
    <Page id="GS11-DrillSources" title="Where suggested drills come from" sub="Wattle Creek FC · the menu Clean Sheet picks from" go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('DF0-Library')}>Club drill library</Btn><Btn primary big onClick={() => say('Saved. Suggestions use these sources from tonight.')}>Save</Btn></>}>
      <div style={col}>
        <section aria-label="The menu" style={{ ...tile, gap: 0, padding: '12px 8px 8px' }}>
          <h2 style={{ ...h2, padding: '0 10px 6px' }}>The menu</h2>
          <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 8, padding: '0 10px 6px', ...label }}><span>Source</span><span>Drills</span><span>Ages</span><span>Checked by</span><span>Use</span></div>
          {SOURCES.map(src => { const on = s.rules.sources[src.id], locked = !!src.locked; return (
            <div key={src.id} data-source={src.id} style={{ display: 'grid', gridTemplateColumns: grid, gap: 8, alignItems: 'center', minHeight: 50, padding: '2px 10px', borderTop: `1px solid ${LINE}`, fontSize: 14 }}>
              <span style={{ display: 'flex', flexDirection: 'column' }}><strong>{src.name}</strong><span style={{ fontSize: 13, color: MUT }}>{locked ? src.locked : src.sub}</span></span>
              <span>{src.drills}</span><span>{src.ages}</span><span>{src.by}</span>
              <span style={{ display: 'flex', alignItems: 'center', marginLeft: -6 }}><Switch on={on} locked={locked} label={`${src.name}: use for suggestions`} onChange={locked ? () => say('The national curriculum is the federation’s. It can be switched on once they agree.') : () => flip(src.id, src.name)} /><strong style={{ fontSize: 13 }}>{on ? 'On' : 'Off'}</strong></span>
            </div>) })}
          <span style={{ ...cap, fontSize: 13, padding: '10px 10px 0' }}>A drill is only ever suggested to an age group it is written for.</span>
        </section>
        <section aria-label="How a session is chosen" style={{ ...tile, padding: '12px 18px 12px' }}>
          <h2 style={h2}>How a session is chosen</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>{HOW.map(([a, b]) => <span key={a} style={{ borderRadius: 10, background: '#eef5f2', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14, color: G }}>{a}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: INK }}>{b}</span></span>)}</div>
        </section>
      </div>
      <div style={col}>
        <section aria-label="Your club’s rules" style={{ ...tile, gap: 0, padding: '14px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Your club’s rules</h2>
          {rule('endWithGame', 'Every session ends with a game', 'Under 6 to under 13')}{rule('noLines', 'No laps, no lines, no lectures', 'Drills that break this are never suggested')}{rule('warmupFirst', 'The warm-up is always first', 'From under 7')}{rule('noHeadingU12', 'Heading practice', 'Off under 12, by club policy')}
        </section>
        <Note title="The reason is always shown">Whatever the source, a coach sees why a drill was picked and the evidence for it. A coach can always swap it.</Note>
        <Note title="Curriculum content">The national curriculum is the federation’s. Using its drills inside the app needs their agreement.</Note>
      </div>
    </Page>
  )
}
