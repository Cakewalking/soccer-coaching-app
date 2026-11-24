// GP6-SendLesson: the coach sends a short lesson to players. The coach sees who watched, not how
// long or how often. Under 15s get it through the parent's app. There is no table of who watched.

import { LINEUP } from '../capture/captureStore'
import { Btn, Field, FlowPage, Note, Pills, Steps, Tile, Tick, say, G, INK, LINE } from './ui'
import { useKept } from './flowStore'

const TO = ['All 16', 'Midfielders', 'Pick players'] as const
const BY = ['Thursday training', 'Sunday’s game', 'No date'] as const
const QUESTION = 'Ask one question at the end: “What did you see?”'
const SQUAD = LINEUP.slice(0, 16), MIDFIELDERS = 5
const DRAWN = { to: 'All 16' as typeof TO[number], picked: [] as string[], line: 'Watch before Thursday. We’ll try it in the first game.', by: 'Thursday training' as typeof BY[number], ask: true, sent: 0 }

export default function GP6SendLesson({ go }: { go: (id: string) => void }) {
  const [s, set] = useKept('gp6', DRAWN)
  const n = s.to === 'All 16' ? 16 : s.to === 'Midfielders' ? MIDFIELDERS : s.picked.length
  function send() {
    if (!n) { say('Pick at least one player first.'); return }
    set({ sent: n })
    say('Sent. Under 15s get it through their parent’s app.')
  }
  return (
    <FlowPage id="GP6-SendLesson" title="Send a lesson" sub="Scanning before you receive · 3 minutes · 4 clips of your own players"
      actions={<><Btn onClick={() => go('CL1-Playlists')}>Cancel</Btn><Btn primary onClick={send}>{s.to === 'Pick players' && !n ? 'Send to players' : `Send to ${n} ${n === 1 ? 'player' : 'players'}`}</Btn></>}>
      <Tile title="Who gets it">
        <Pills label="Send to" options={TO} value={s.to} onChange={v => set({ to: v })} />
        {s.to === 'Pick players' && (
          <div role="group" aria-label="Players" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -6 }}>
            {SQUAD.map(p => {
              const on = s.picked.includes(p.ini)
              return <button key={p.ini} type="button" aria-pressed={on} onClick={() => set({ picked: on ? s.picked.filter(x => x !== p.ini) : [...s.picked, p.ini] })} style={{ height: 44, padding: '0 14px', borderRadius: 999, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: on ? G : '#fff', color: on ? '#fff' : INK, border: `1px solid ${on ? G : LINE}` }}>{p.first}</button>
            })}
          </div>
        )}
        <Field label="A line from you" value={s.line} onChange={v => set({ line: v })} tall />
        <Pills label="Watch by" options={BY} value={s.by} onChange={v => set({ by: v })} />
        <Tick label={QUESTION} on={s.ask} onChange={v => set({ ask: v })} />
        <Note>Mia and Jai are in these clips. Both families have said yes to their clips being shown to the team.</Note>
      </Tile>
      <Steps title="What happens" steps={[
        ['Players get it', 'In their app, or their parent’s if under 15'],
        ['You see who watched', 'Not how long or how often'],
        ['Answers come back', 'To you only'],
        ['It stays in Learn', 'For the rest of the season'],
      ]} footLine="A lesson is never counted against a player. There is no table of who watched." />
    </FlowPage>
  )
}
