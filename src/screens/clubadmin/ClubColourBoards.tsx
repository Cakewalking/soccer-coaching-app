// The club-colours boards: what the theme does to real screens at other clubs.
// KC2 is the rule board. KC5, KC6 and KC7 are the session screens at a red, a navy-and-gold and a sky blue club.
// KC8 is a season report with the club's band. KCp1 to KCp3 are a parent with children at two clubs.

import { openAsk } from '../../ask/askState'
import { useBackState } from '../../backState'
import { AMBER, BAYSIDE, ClubScope, Crest, HARBOUR, INK, IRONBARK, REDGUM, CS_GREEN } from '../../clubTheme'
import CoachTabletFrame from '../CoachTabletFrame'
import SessionFramed, { NAV } from '../session/SessionFramed'
import { demoToast } from '../demoToast'
import { openScreen } from '../openThing'
import { markDone, useDone } from '../doneStore'

const G = '#2f6252', MUT = '#4a5a57', LINE = '#c5c8c4', HAIR = '#e9eae8', PALE = '#eef5f2'
const tile: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14 }
type Nav = (s: string) => void
const SPARK = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'

// A small pitch: three of ours on the left, three of theirs on the right.
const MiniPitch = ({ w = 132 }: { w?: number }) => <svg width={w} height={w * 0.52} viewBox="0 0 132 68" aria-hidden="true" style={{ flex: 'none', borderRadius: 8, background: '#40826d' }}>
  <rect x="6" y="6" width="120" height="56" fill="none" stroke="#fff" strokeWidth="1.5" /><path d="M66 6v56" stroke="#fff" strokeWidth="1.5" />
  {[[28, 20], [50, 34], [28, 48]].map(([x, y]) => <circle key={`${x}${y}`} data-club-home="" cx={x} cy={y} r="6" fill="#40826d" stroke="#fff" strokeWidth="2" />)}
  {[[104, 20], [84, 34], [104, 48]].map(([x, y]) => <circle key={`${x}${y}`} data-club-away="" cx={x} cy={y} r="6" fill="#faf5ec" stroke={INK} strokeWidth="2" />)}
</svg>

// ── KC2: the same screen at five clubs ───────────────────────────────────────
const FIVE: Array<{ name: string; line: string; main: string; second: string }> = [
  { ...REDGUM, line: 'Red and black' }, { ...HARBOUR, line: 'Navy and gold' }, { ...IRONBARK, line: 'Black and white' }, { ...BAYSIDE, line: 'Sky blue and navy' },
  { name: 'Wattle Creek FC', line: 'Not set: Clean Sheet green', main: CS_GREEN, second: '#ffffff' },
]
export function KC2FiveClubs() {
  return (
    <div data-screen="KC2-FiveClubs" style={{ width: 1180, margin: '0 auto', padding: '18px 28px 24px', boxSizing: 'border-box', background: '#faf5ec', fontFamily: "'DM Sans',system-ui,sans-serif", color: INK, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}><h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>The same screen at five clubs</h1><span style={{ fontSize: 14, color: MUT }}>Bar, crest, kit and the two big tiles change. Green buttons and amber proof never do.</span></div>
      {FIVE.map(c => <ClubScope key={c.name} main={c.main} second={c.second} name={c.name}>
        <section aria-label={c.name} style={{ ...tile, overflow: 'hidden' }}>
          <div data-club-bar="" style={{ height: 44, display: 'flex', alignItems: 'center', gap: 4, padding: '0 14px', background: G, color: '#fff' }}>
            <strong style={{ fontSize: 16, marginRight: 10 }}>Clean Sheet</strong>
            {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => <span key={t} data-club-tab={t === 'Training' ? 'on' : 'off'} style={{ fontSize: 13, fontWeight: 600, padding: '7px 11px' }}>{t}</span>)}
            <span style={{ flexGrow: 1 }} />
            <span data-club-pill="" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: '#fff' }}><Crest size={16} />U11 · {c.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px' }}>
            <span style={{ width: 150 }}><strong style={{ display: 'block', fontSize: 15 }}>{c.name}</strong><span style={{ fontSize: 13, color: MUT }}>{c.line}</span></span>
            <MiniPitch />
            <span style={{ display: 'flex' }}>{['AD', 'JP', 'PS'].map((p, i) => <span key={p} data-club-badge="" style={{ width: 30, height: 30, borderRadius: 999, marginLeft: i ? -2 : 0, background: G, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p}</span>)}</span>
            {/* the two big tiles: a club on green keeps today's greens */}
            {(['big', 'next'] as const).map(k => <span key={k} data-club-tile={c.name === 'Wattle Creek FC' ? undefined : k} style={{ flex: 'none', width: 74, height: 44, borderRadius: 8, background: k === 'big' ? '#1c3a33' : G, color: c.name === 'Bayside Rovers' && k === 'next' ? INK : '#fff', display: 'flex', alignItems: 'flex-end', padding: '0 0 5px 7px', boxSizing: 'border-box', fontSize: 9, fontWeight: 700 }}>{k === 'big' ? 'Story tile' : 'Next tile'}</span>)}
            <span style={{ flexGrow: 1, fontSize: 14 }}>Lost the ball <strong style={{ background: AMBER, color: INK, borderRadius: 6, padding: '2px 7px' }}>9 times</strong> playing out</span>
            <button onClick={() => openScreen('GS3-RunSheet')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Open the run sheet</button>
          </div>
        </section>
      </ClubScope>)}
    </div>
  )
}

// ── KC5, KC6, KC7: the session screens at three clubs ────────────────────────
const SESSION: Record<string, { club: typeof REDGUM; start: string }> = { 'KC5-SessionRedClub': { club: REDGUM, start: 'GS1-ProposedSession' }, 'KC6-DrillGoldClub': { club: HARBOUR, start: 'GS2-DrillWhy' }, 'KC7-SessionPaleClub': { club: BAYSIDE, start: 'GS4-ResizeAttendance' } }
export const isSessionBoard = (id: string) => id in SESSION
export function KCSession({ id, onNav }: { id: string; onNav?: Nav }) {
  const b = SESSION[id]
  return <div data-screen={id}><ClubScope {...b.club}><SessionFramed start={b.start} onNav={onNav} /></ClubScope></div>
}

// ── KC8: a season report in the club's colours ───────────────────────────────
const Tick = () => <span style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>
const Rows = ({ title, rows }: { title: string; rows: [string, string][] }) => <section aria-label={title} style={{ ...tile, padding: '14px 16px 6px' }}>
  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, paddingBottom: 8 }}>{title}</h2>
  {rows.map(([a, b]) => <div key={a} style={{ display: 'flex', gap: 10, padding: '9px 0', borderTop: `1px solid ${LINE}` }}><Tick /><span><strong style={{ display: 'block', fontSize: 15, lineHeight: '20px' }}>{a}</strong><span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span></span></div>)}
</section>

export function KC8Report({ onNav }: { onNav?: Nav }) {
  const go = (s: string) => onNav ? onNav(s) : openScreen(s)
  const sent = useDone('kc8:sent')
  const btn = (primary = false): React.CSSProperties => ({ height: 44, padding: '0 18px', borderRadius: 10, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' })
  return (
    <div data-screen="KC8-ReportClubColours" style={{ width: 1180, margin: '0 auto' }}><ClubScope {...REDGUM}>
      <CoachTabletFrame navTabs={NAV} activeNav="squad" onNav={n => go(NAV.find(x => x.id === n)?.to ?? 'HM2-SquadMiniRoos')} subTabs={['Players', 'Formation', 'Season reports', 'Catch-ups', 'Handover']} activeSubTabIndex={2} onSubTab={i => go(['T4-SquadTab', 'FB1-Formation', 'CN9-SeasonReport', 'CN10-CatchUps', 'CN13-Handover'][i])}
        roleChip="Coach · MiniRoos" teamLabel="U11 Luke · Redgum United" onTeam={() => go('VS1-SwitchView')} avatarLetters="LF" showAsk={false}>
        <div style={{ padding: '14px 24px 24px', display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'DM Sans',system-ui,sans-serif", color: INK }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>Season report</h1><span style={{ flexGrow: 1, fontSize: 14, color: MUT }}>Ari Demir · ready to send to Dana and Kerem</span>
            <button style={btn()} onClick={() => go('CN9-SeasonReport')}>Change the wording</button>
            <button style={btn(true)} aria-pressed={!!sent} onClick={() => { markDone('kc8:sent'); demoToast('Sent to Dana and Kerem. They can read it in the app or save it as a PDF.') }}>{sent ? 'Sent to the family' : 'Send to the family'}</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '522px minmax(0,1fr)', gap: 18, alignItems: 'start' }}>
            <article aria-label="The report" style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, boxShadow: '0 2px 8px rgba(16,33,31,0.12)', minHeight: 600, display: 'flex', flexDirection: 'column' }}>
              <div data-club-band="" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 26px', background: G, color: '#fff' }}><Crest size={44} /><span><strong style={{ display: 'block', fontSize: 21 }}>Redgum United</strong><span style={{ fontSize: 13 }}>Season report 2026 · Under 11</span></span></div>
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12, flexGrow: 1 }}>
                <span><strong style={{ display: 'block', fontSize: 24 }}>Ari Demir</strong><span style={{ fontSize: 13, color: MUT }}>From Luke Fraser, coach</span></span>
                <span style={{ fontSize: 15, lineHeight: '21px' }}>Ari played in 14 of 16 games and tried every position, including a half in goal. His first touch under pressure is the thing that changed most.</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>{[['14', 'games'], ['5', 'positions'], ['22', 'sessions']].map(([n, l]) => <span key={l} style={{ background: PALE, borderRadius: 8, padding: '8px 10px' }}><strong style={{ display: 'block', fontSize: 20 }}>{n}</strong><span style={{ fontSize: 11, color: MUT }}>{l}</span></span>)}</div>
                <span style={{ fontSize: 14 }}>Kept the ball when closed down: <strong style={{ background: AMBER, color: INK, borderRadius: 6, padding: '1px 7px' }}>4 in 10, now 7 in 10</strong> <span style={{ fontSize: 12, color: MUT }}>Strong · from film</span></span>
                <span style={{ fontSize: 14 }}><strong>Next season:</strong> looking up before the ball arrives.</span>
                <div style={{ marginTop: 'auto', borderTop: `1px solid ${LINE}`, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: MUT }}><span>Redgum United · page 1 of 2</span><span>Made with <strong style={{ color: G }}>Clean Sheet</strong></span></div>
              </div>
            </article>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Rows title="What carries the club’s colours" rows={[['The cover band and crest', 'On screen, in print and as a PDF'], ['Shared clips and match cards', 'The club’s band at the top, crest in the corner'], ['Sponsor pages', 'With the sponsor’s own logo'], ['Emails and texts from the club', 'A thin band in the main colour']]} />
              <Rows title="What stays Clean Sheet" rows={[['Amber on a figure marked Strong', 'The same at every club'], ['“Made with Clean Sheet” in the footer', 'Small, in green, on everything that leaves the app']]} />
              <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', fontSize: 13, lineHeight: '19px' }}><strong style={{ display: 'block' }}>Printing</strong>A pale main colour prints with dark writing, the same as on screen.</div>
            </div>
          </div>
        </div>
      </CoachTabletFrame>
    </ClubScope></div>
  )
}

// ── KCp1, KCp2, KCp3: a parent with children at two clubs ────────────────────
const KIDS = { ari: { club: REDGUM, child: 'Ari', team: 'U11 Luke', next: 'next game Sunday 9:30', id: 'KCp1-ParentRedClub' }, mia: { club: BAYSIDE, child: 'Mia', team: 'U14 Girls', next: 'next game Sunday 11:00', id: 'KCp2-ParentPaleClub' } }
const round: React.CSSProperties = { flex: 'none', width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }
const Ask = () => <button aria-label="Ask Clean Sheet" onClick={() => openAsk({ phone: true })} style={{ ...round, border: '1.5px solid #a9cfc0', background: 'transparent', color: '#fff' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={SPARK} /></svg></button>
const Me = () => <span data-club-keep="" style={{ ...round, cursor: 'default', background: '#e8cfcf', color: INK, fontSize: 14, fontWeight: 700 }}>DB</span>

export function KCParent({ start = 'KCp1-ParentRedClub', onNav }: { start?: string; onNav?: Nav }) {
  const [id, setId] = useBackState(start)
  const out = (s: string) => onNav ? onNav(s) : openScreen(s)
  const go = (s: string) => s.startsWith('KCp') ? setId(s) : out(s)
  const k = id === 'KCp2-ParentPaleClub' ? KIDS.mia : KIDS.ari
  const coming = useDone(`kcp:coming:${k.child}`)
  const phone: React.CSSProperties = { width: 390, minHeight: 844, margin: '0 auto', background: '#faf5ec', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }
  const card: React.CSSProperties = { ...tile, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }
  const cap: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT }
  const wide = (primary = false): React.CSSProperties => ({ height: 48, borderRadius: 12, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' })

  if (id === 'KCp3-TwoClubs') return (
    <div data-screen="KCp3-TwoClubs" style={phone}>
      {/* A screen that spans clubs stays Clean Sheet green */}
      <div data-club-none="" style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button aria-label="Back" onClick={() => go('KCp1-ParentRedClub')} style={{ ...round, border: 0, background: 'transparent', color: '#fff', marginLeft: -10 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg></button>
        <span style={{ flexGrow: 1 }}><span style={{ display: 'block', fontSize: 12, color: '#cfe6dc' }}>Dana Boyd</span><strong style={{ fontSize: 21 }}>Your children</strong></span>
        <Ask /><Me />
      </div>
      <div role="radiogroup" aria-label="Your children" style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[KIDS.ari, KIDS.mia].map((c, i) => <ClubScope key={c.child} {...c.club}>
          <button role="radio" aria-checked={i === 0} onClick={() => go(c.id)} style={{ ...tile, padding: 0, overflow: 'hidden', textAlign: 'left', fontFamily: 'inherit', color: INK, cursor: 'pointer', border: i === 0 ? `2px solid ${INK}` : `1px solid ${LINE}` }}>
            <span data-club-band="" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: G, color: '#fff', borderBottomWidth: 4 }}><Crest size={24} /><strong style={{ flexGrow: 1, fontSize: 15 }}>{c.club.name}</strong>{i === 0 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>}</span>
            <span style={{ display: 'block', padding: '10px 16px 12px' }}><strong style={{ display: 'block', fontSize: 18 }}>{c.child}</strong><span style={{ fontSize: 13, color: MUT }}>{c.team} · {c.next}</span></span>
          </button>
        </ClubScope>)}
        <p style={{ margin: '2px 2px', fontSize: 13, lineHeight: '19px', color: MUT, textAlign: 'center' }}>The colours change with the club. Everything else is in the same place: the same buttons, the same words, the same marks.</p>
        <div style={{ ...tile, padding: '2px 16px' }}>{[['Buttons', 'Always green'], ['Proof', 'Always amber'], ['Header and crest', 'The club’s']].map(([a, b], i) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: i ? `1px solid ${HAIR}` : 0, fontSize: 14 }}><span>{a}</span><strong>{b}</strong></div>)}</div>
      </div>
    </div>
  )

  return (
    <div data-screen={k.id} style={phone}><ClubScope {...k.club}>
      <div data-club-bar="" style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ flexGrow: 1 }}><span style={{ display: 'block', fontSize: 12 }}>U11 Luke · {k.club.name}</span><strong style={{ fontSize: 21 }}>Hi Dana</strong></span>
        <Ask /><Me />
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <section style={card}><span style={cap}>SUNDAY</span><strong style={{ fontSize: 19 }}>9:30 v Ridgeway, home</strong><span style={{ fontSize: 14, color: MUT }}>Be there by 9:00 · {k.club.name} Reserve, pitch 3</span>
          <button style={wide(true)} aria-pressed={!!coming} onClick={() => { markDone(`kcp:coming:${k.child}`); demoToast(`Luke can see ${k.child} is coming.`) }}>{k.child} is coming</button></section>
        <section style={card}><span style={cap}>FROM LUKE</span><strong style={{ fontSize: 17 }}>Two to try before Tuesday</strong><span style={{ fontSize: 14, color: MUT }}>Five minutes each. A ball and a wall is enough.</span>
          <button style={wide()} onClick={() => go('GSp9-HomeLibrary')}>Football at home</button></section>
        <section style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 12 }}><MiniPitch w={108} /><span><strong style={{ display: 'block', fontSize: 15 }}>Last week: {k.child} played 3 positions</strong><span style={{ fontSize: 13, color: MUT }}>Equal time for everyone</span></span></section>
      </div>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '12px 14px 16px', borderTop: `1px solid ${LINE}`, background: '#fff' }}>
        <button style={wide()} onClick={() => go('MSGp1-ParentMessages')}>Message Luke</button><button style={wide()} onClick={() => go('KCp3-TwoClubs')}>Switch child</button>
      </div>
    </ClubScope></div>
  )
}
