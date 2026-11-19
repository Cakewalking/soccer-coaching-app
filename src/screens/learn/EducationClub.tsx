// EC10 · the Education centre, for the director: what is in the library, who checks it, clips waiting for a check,
// and what each age band receives. Counts only: never which coach opened what, or which family watched what.

import { Btn, Note, Switch, tile, h2, cap, label, LINE, MUT, G } from '../capture/marks'
import { Page, col } from '../capture/CaptureScreens'
import { Thumb } from './LearnPlayer'
import { EVERY, MADE_COUNT, SOURCES, setClub, useClub } from './library'

const BANDS: [string, string, string][] = [['Under 6 to 9', 'A game to play, never a drill', 'To a parent, two a week at most'], ['Under 10 to 12', 'Plus one challenge', 'To a parent, two a week at most'], ['Under 13 to 15', 'Adds “Understanding the game”', 'To the player and a parent'], ['16 and over', 'Adds their own clips', 'To the player']]
const GRID = 'minmax(0,1fr) 56px 150px 150px 64px'

export default function EC10DirectorLibrary({ go, say }: { go: (id: string) => void; say: (m: string) => void }) {
  const club = useClub()
  const flip = (id: string, name: string) => { const off = club.off.includes(id); setClub({ off: off ? club.off.filter(v => v !== id) : [...club.off, id] }); say(`${name}: turned ${off ? 'on' : 'off'} for your club.`) }
  return (
    <Page id="EC10-DirectorLibrary" title="Education centre" sub="Wattle Creek FC · what is in the library, who checks it, and what families get" go={go} cols="minmax(0,1fr) 348px" smallSub
      right={<><Btn big onClick={() => go('EC6-CoachesHome')}>Open the library</Btn><Btn primary big onClick={() => say('Saved. Coaches and families see the change on their next visit.')}>Save</Btn></>}>
      <div style={col}>
        <section aria-label="What is in it" style={{ ...tile, gap: 0, padding: '14px 18px 10px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>What is in it</h2>
          <div style={{ display: 'grid', gridTemplateColumns: GRID, gap: 10, padding: '4px 0 6px' }}>{['Source', 'Items', 'For', 'Checked by', 'Show'].map(t => <span key={t} style={label}>{t}</span>)}</div>
          {SOURCES.map(src => { const on = !club.off.includes(src.id); return (
            <div key={src.id} style={{ display: 'grid', gridTemplateColumns: GRID, gap: 10, alignItems: 'center', minHeight: 56, borderTop: `1px solid ${LINE}`, fontSize: 14 }}>
              <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong>{src.name}</strong><span style={{ fontSize: 13, color: MUT }}>{src.sub}</span></span>
              <strong>{src.n}</strong><span>{src.for}</span><span>{src.by}</span>
              <Switch on={on} onChange={() => flip(src.id, src.name)} label={`${on ? 'On' : 'Off'}, ${src.name}`} />
            </div>) })}
          <span style={{ ...cap, fontSize: 13, paddingTop: 8, borderTop: `1px solid ${LINE}` }}>Every item shows where it came from. Research claims carry their source. Clean Sheet’s safety items cannot be switched off.</span>
          <span style={{ ...cap, fontSize: 13 }}>Not made yet: {EVERY.length - MADE_COUNT} of the {EVERY.length} items planned. The titles are the plan.</span>
        </section>
        <section aria-label="Waiting for a check" style={{ ...tile, gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><h2 style={h2}>Waiting for a check</h2><span style={cap}>{club.approved ? 'Nothing waiting' : '1 clip'}</span></span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Thumb kind="team" len="0:10" />
            <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>Poppy takes a player on</strong><span style={{ fontSize: 13, color: MUT }}>U9 Tom · family said yes on Sunday</span><span style={{ fontSize: 13, color: MUT }}>From Tom Albers</span>{club.approved && <span style={{ fontSize: 13, fontWeight: 700, color: G }}>{club.shared ? 'Approved for U9 Tom, and shared with the whole club' : 'Approved for U9 Tom'}</span>}</span>
            <Btn onClick={() => go('EC5-MakeOne')}>Watch</Btn>
            {!club.approved ? <Btn primary onClick={() => { setClub({ approved: true }); say('Approved for U9 Tom. Share with the whole club from the clip.') }}>Approve</Btn>
              : <Btn aria-pressed={club.shared} onClick={() => { setClub({ shared: !club.shared }); say(club.shared ? 'No longer shared with the whole club. U9 Tom still has it.' : 'Shared with the whole club.') }}>{club.shared ? 'Stop sharing with the club' : 'Share with the whole club'}</Btn>}
          </div>
        </section>
      </div>
      <div style={col}>
        <section aria-label="What families get" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>What families get</h2>
          {BANDS.map(([band, what, who]) => <div key={band} style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderTop: `1px solid ${LINE}` }}><strong style={{ fontSize: 14 }}>{band}</strong><span style={{ fontSize: 13, lineHeight: '18px' }}>{what}</span><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{who}</span></div>)}
        </section>
        <section aria-label="This term" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>This term</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}`, fontSize: 14 }}><span>Families who opened a clip</span><strong style={{ flex: 'none' }}>182 of 256 · 71%</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}`, fontSize: 14 }}><span style={{ display: 'flex', flexDirection: 'column' }}>Coaches who opened the library<span style={{ fontSize: 13, color: MUT }}>Counts only, never names</span></span><strong style={{ flex: 'none' }}>11 of 14</strong></div>
        </section>
        <Note title="Your club’s rules still apply">Heading clips stay off under 12. A player with a “no” on film is never in a clip.</Note>
      </div>
    </Page>)
}
