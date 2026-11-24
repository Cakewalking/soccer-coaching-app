// GP1-AfterTraining: Training › After training. Two taps a player (same or better tonight) and a
// short note. Notes are seen by the head coach and the assistant coach only.

import { Btn, EmptyTile, FlowPage, Steps, Tile, say, G, INK, LINE, MUT, SOFT } from './ui'
import { useKept } from './flowStore'

type Mark = 'Same' | 'Better'
const PLAYERS: [ini: string, name: string, mark: Mark, note: string][] = [
  ['MT', 'Mia Tran', 'Better', 'Scanned before every pass'],
  ['JP', 'Jai Patel', 'Same', ''],
  ['ZH', 'Zoe Hartley', 'Better', 'Pressed first, twice'],
  ['NO', 'Noah Okafor', 'Same', 'Quiet tonight'],
  ['GR', 'Grace Reid', 'Same', ''],
  ['FN', 'Finn Noble', 'Better', 'Used his left'],
]
const CAME = 14
const QUICK = ['Scanned before every pass', 'Pressed first', 'Won it back fast', 'Used the weaker foot', 'Quiet tonight', 'Helped a team-mate']
const DRAWN = { marks: Object.fromEntries(PLAYERS.map(p => [p[0], p[2]])) as Record<string, Mark>, notes: Object.fromEntries(PLAYERS.map(p => [p[0], p[3]])) as Record<string, string> }

export default function GP1AfterTraining({ go, assistant }: { go: (id: string) => void; /** the assistant coach is looking */ assistant?: boolean }) {
  const [s, set] = useKept('gp1', DRAWN)
  const marked = PLAYERS.filter(p => s.marks[p[0]]).length
  const done = () => { say(`Saved. ${marked} of ${CAME} marked. Only you and ${assistant ? 'the head coach' : 'your assistant coach'} see the notes.`); go('T3-TrainingTab') }
  return (
    <FlowPage id="GP1-AfterTraining" title="After training" sub="U12 Sam · Tuesday 9 June · 14 came · tonight’s focus: winning it back"
      actions={<><Btn onClick={() => { say('Kept as it is. Finish it from Training, under After training.'); go('T3-TrainingTab') }}>Finish later</Btn><Btn primary onClick={done}>{`Done · ${marked} of ${CAME} marked`}</Btn></>}>
      <Tile title="Two taps each" footLine="Showing 6 of 14. Opens when you close a session on the tablet or the phone. About two minutes.">
        <datalist id="gp1-quick">{QUICK.map(q => <option key={q} value={q} />)}</datalist>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PLAYERS.map(([ini, name]) => (
            <div key={ini} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 190px minmax(0,1fr) 44px', gap: 10, alignItems: 'center', minHeight: 60, padding: '7px 0', boxSizing: 'content-box', borderTop: `1px solid ${SOFT}` }}>
              <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ini}</span>
              <strong style={{ fontSize: 15 }}>{name}</strong>
              <span role="radiogroup" aria-label={`${name}: winning it back tonight`} style={{ display: 'flex', gap: 6 }}>
                {(['Same', 'Better'] as const).map(m => {
                  const on = s.marks[ini] === m
                  return <button key={m} type="button" role="radio" aria-checked={on} onClick={() => { set({ marks: { ...s.marks, [ini]: m } }); say(`${name}: ${m}.`) }} style={{ flex: 1, height: 44, borderRadius: 12, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', background: on ? G : '#fff', color: on ? '#fff' : INK, border: `1px solid ${on ? G : LINE}` }}>{m}</button>
                })}
              </span>
              <input className="gp1-note" list="gp1-quick" aria-label={`Note about ${name}`} placeholder="Add a note" value={s.notes[ini] ?? ''} onFocus={() => say('Pick a quick note or type one.')} onChange={e => set({ notes: { ...s.notes, [ini]: e.target.value } })}
                style={{ minHeight: 44, minWidth: 0, width: '100%', boxSizing: 'border-box', padding: '0 4px', margin: '0 -4px', border: '1px solid transparent', borderRadius: 8, background: 'transparent', fontFamily: 'inherit', fontSize: 14, color: INK }} />
              <button type="button" aria-label={`Say a note about ${name}`} onClick={() => say('Hold to talk. Up to 30 seconds. It is typed out for you.')} style={{ width: 44, height: 44, borderRadius: 999, border: `1px solid ${LINE}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, cursor: 'pointer', padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM6 11a6 6 0 0012 0M12 17v4" /></svg>
              </button>
            </div>
          ))}
        </div>
        <style>{`.gp1-note::placeholder{color:${MUT};opacity:1}.gp1-note:focus{outline:none;border-color:${G}!important;background:#fff!important}`}</style>
      </Tile>
      <Steps title="What the taps do" steps={[
        ['Tick a goal', 'If it matches the player’s own goal'],
        ['Fill the profile', 'Notes sit on the player’s page, with the date'],
        ['Draft the season report', 'Written from these and your game notes'],
        ['Stay private', assistant ? 'Only you and the head coach see notes' : 'Only you and your assistant coach see notes'],
      ]} footLine="Skip anyone you didn’t see enough of. Nothing here is shown to players or parents as written." />
    </FlowPage>
  )
}

/** GP1e-AfterTrainingEmpty: no session has been closed yet, so there is nobody to mark. */
export function GP1eAfterTrainingEmpty({ go }: { go: (id: string) => void }) {
  return (
    <FlowPage id="GP1e-AfterTrainingEmpty" title="After training" sub="No session to close" side={320}>
      <EmptyTile label="After training" title="Nothing to mark yet" line="Close a session on the tablet or your phone and each player gets two taps here.">
        <Btn primary onClick={() => go('T3-TrainingTab')}>Open tonight’s plan</Btn>
      </EmptyTile>
      <Steps title="What the taps do" gap={8} steps={[['Tick a goal', 'When it matches the player’s own'], ['Fill the profile', 'Notes with the date'], ['Draft the report', 'For the end of the season']]} />
    </FlowPage>
  )
}
