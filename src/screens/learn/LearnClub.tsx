// LN9 · Coach learning, for the director: how many coaches, never which coach.
// What a coach watches, tries and rates is theirs. No count below 3 is shown.

import { Btn, Note, Switch, tile, h2, cap, label, DARK, LINE, MUT } from '../capture/marks'
import { Page, col } from '../capture/CaptureScreens'
import { MODULES } from './course'
import { useDoneAll, markDone, clearDone } from '../doneStore'

const STARTED = [11, 9, 7, 4, 2, 1], FINISHED = [9, 5, 4, 1, 0, 0], ASKS = ['By round 1', 'By round 3', '—', '—', '—', '—']
const few = (n: number) => n > 0 && n < 3 ? 'Fewer than 3' : String(n)   // a small count could point at one coach
const SETTINGS: [string, string, string][] = [['ln9:safe', 'Ask every new coach to do “Keeping players safe”', 'By round 3. We remind them, not you'], ['ln9:films', 'Show club films first', 'Six films from your own coaches'], ['ln9:mentor', 'Offer a mentor', 'Rachel Moore. A coach chooses whether to share']]

export default function LN9ClubCoachLearning({ go, say }: { go: (id: string) => void; say: (m: string) => void }) {
  const off = useDoneAll()   // a setting is on until it is switched off
  return (
    <Page id="LN9-ClubCoachLearning" title="Coach learning" sub="Wattle Creek FC · counts only, never names" go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('EDU5-CoachCorner')}>Add a club film</Btn><Btn primary big onClick={() => say('Saved. Coaches see the change on their next visit.')}>Save</Btn></>}>
      <div style={col}>
        <section style={{ borderRadius: 18, background: DARK, color: '#fff', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 22 }}>
          <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>14 COACHES THIS SEASON · 6 IN THEIR FIRST</span>
            <strong style={{ fontSize: 22, lineHeight: '28px' }}>11 of your 14 coaches have started the course.</strong>
            <span style={{ fontSize: 13, color: '#cfe6dc' }}>You see how many, not who. What a coach watches, tries and rates is theirs.</span>
          </span>
          {([['11', 'started'], ['5', 'finished', 'module 2']] as [string, string, string?][]).map(([n, a, b]) => <span key={a} style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 34, lineHeight: '40px' }}>{n}</strong><strong style={{ fontSize: 13 }}>{a}</strong>{b && <span style={{ fontSize: 12, color: '#cfe6dc' }}>{b}</span>}</span>)}
        </section>
        <section aria-label="By module" style={{ ...tile, gap: 0, padding: '14px 18px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>By module</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 90px 90px 120px', gap: 10, padding: '4px 0 6px' }}>{['Module', 'Started', 'Finished', 'Club asks for it'].map(t => <span key={t} style={label}>{t}</span>)}</div>
          {MODULES.map((m, i) => <div key={m.number} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 90px 90px 120px', gap: 10, alignItems: 'center', minHeight: 48, borderTop: `1px solid ${LINE}`, fontSize: 14 }}>
            <span style={{ display: 'flex', flexDirection: 'column' }}><strong>{m.title}</strong><span style={{ fontSize: 13, color: MUT }}>{m.lessons.length} lessons</span></span><strong>{few(STARTED[i])}</strong><strong>{few(FINISHED[i])}</strong><span style={{ color: MUT }}>{ASKS[i]}</span>
          </div>)}
        </section>
      </div>
      <div style={col}>
        <section aria-label="What the club sets" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What the club sets</h2>
          {SETTINGS.map(([key, a, b]) => { const on = !off[key]; return <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${LINE}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>{a}</strong><span style={{ fontSize: 13, color: MUT }}>{b}</span></span><Switch on={on} label={a} onChange={() => { if (on) markDone(key); else clearDone(key); say(`${a}: ${on ? 'left out' : 'added'}.`) }} /></div> })}
        </section>
        <section aria-label="Across the club" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Across the club</h2>
          {([['Coaches who feel surer than in round 1', 'Their own ratings, counted', '8 of 11'], ['Players who “knew what to do”', 'All teams, round 1 then now', '61% then 74%']] as const).map(([a, b, v]) => <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 50, borderTop: `1px solid ${LINE}` }}><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>{a}</strong><span style={cap}>{b}</span></span><strong style={{ flex: 'none', fontSize: 14 }}>{v}</strong></div>)}
        </section>
        <Note title="Why no names">Coaches use it more, and rate themselves honestly, when it is not a test.</Note>
      </div>
    </Page>)
}
