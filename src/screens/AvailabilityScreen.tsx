import { openThing } from './openThing'
import { useState } from 'react'
import { useSandbox } from './sandbox/SandboxContext'
import { setAnswer, niceDate, type SbAnswer } from './sandbox/sandboxStore'
import { goSetup } from './sandbox/sandboxNav'
import { SQUAD_PLAYERS, YOUTH_SQUAD_PLAYERS, SENIORS_SQUAD_PLAYERS, type SquadPlayer } from '../data'

function AvailabilityEmpty() {
  const { active: inSandbox, store } = useSandbox()
  // A sandbox team with players and a game has real answers to show.
  if (inSandbox && store.players.length > 0 && store.fixtures.length > 0) return <AvailabilitySandbox />
  const EmptyCol = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{title}</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#4a5a57' }}>0</span>
      </div>
      {[70, 55, 65].map((w, i) => (
        <div key={i} style={{ height: 54, border: '1px dashed #c5c8c4', borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
          <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
        </div>
      ))}
    </div>
  )
  return (
    <div style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Availability</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>No players or fixtures yet</span>
      </div>
      <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', flexShrink: 0 }}>
        <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Know who's in before you pick</div>
          <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>Each week, parents get one question for every game and session: can they make it? Answers land here, sorted.</div>
        </div>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr)) 300px', gap: 12, overflow: 'hidden' }}>
        <EmptyCol title="In" />
        <EmptyCol title="Maybe" />
        <EmptyCol title="Can't make it" />
        <EmptyCol title="No answer" />
        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Two things first</div>
          {[
            { n: 1, title: 'Add your players', sub: 'With a parent contact for each', btn: 'Add players' },
            { n: 2, title: 'Add your fixtures and sessions', sub: 'Questions go out a week before each', btn: 'Add fixtures' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 12 }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: '#2f6252', color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.n}</span>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 8, lineHeight: '16px' }}>{item.sub}</div>
                <button onClick={() => goSetup(item.n === 1 ? 'players' : 'fixtures', 'Opening setup.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{item.btn}</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', background: '#faf5ec', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>
            <strong>What parents see:</strong> "Can Mia play on Sunday?" with Yes, Maybe or No, and space for a reason.
          </div>
        </aside>
      </div>
    </div>
  )
}

type AvTeam = 'juniors' | 'youth' | 'seniors'
type Ans = 'in' | 'maybe' | 'cant' | 'none'
type Row = { ini: string; name: string; note: string }

// Availability is asked once per game and per session. Each event has its own answers.
const TEAM_AV: Record<AvTeam, { squad: SquadPlayer[]; side: number; gameMins: number; adults: boolean; events: { label: string; sub: string; title: string; game: boolean; closes: string }[]; reasons: { maybe: string; cant: string[]; training: string }; know: string[] }> = {
  juniors: {
    squad: SQUAD_PLAYERS, side: 9, gameMins: 60, adults: false,
    events: [
      { label: 'Sun 7 Jun · 9:30', sub: 'vs Harbour Rovers', title: 'Sunday vs Harbour Rovers', game: true, closes: 'Answers close Friday 6 pm. Anyone who has not answered is reminded at 4 pm.' },
      { label: 'Tonight · 5:45', sub: 'Training', title: 'Training tonight', game: false, closes: 'Answers closed at 3 pm today.' },
      { label: 'Sun 14 Jun · 9:00', sub: 'at Kestrel Park', title: 'Sunday 14 June at Kestrel Park', game: true, closes: 'Asked on Monday 8 June. Five families answered early from the fixture list.' },
    ],
    reasons: { maybe: 'Might have a school concert', cant: ['Away: family wedding', 'Sick, back next week'], training: 'Dentist at 5:00' },
    know: ['Kai and Lily are out. Grace covers left back.', 'Harper’s parent hasn’t answered consent either. She can play but won’t be filmed.', 'Noah and Zoe have sprint caps from Priya.'],
  },
  youth: {
    squad: YOUTH_SQUAD_PLAYERS, side: 11, gameMins: 80, adults: false,
    events: [
      { label: 'Sun 7 Jun · 3:30', sub: 'at Harbour Rovers', title: 'Sunday at Harbour Rovers', game: true, closes: 'Answers close Friday 6 pm. Anyone who has not answered is reminded at 4 pm.' },
      { label: 'Tue 9 Jun · 6:00', sub: 'Training', title: 'Training on Tuesday', game: false, closes: 'Answers close Tuesday 3 pm.' },
      { label: 'Sun 14 Jun · 1:30', sub: 'vs Kestrel Park', title: 'Sunday 14 June vs Kestrel Park', game: true, closes: 'Asked on Monday 8 June. Five answered early from the fixture list.' },
    ],
    reasons: { maybe: 'Exam on Friday, will know Thursday', cant: ['Suspended: 1 game', 'Away: school camp'], training: 'Exam revision night' },
    know: ['Ryan is suspended for one game. Hugo has covered centre back twice.', 'Players 15 and over answer for themselves. A parent is copied in until they turn 18.', 'Luka is on a high load this week.'],
  },
  seniors: {
    squad: SENIORS_SQUAD_PLAYERS, side: 11, gameMins: 90, adults: true,
    events: [
      { label: 'Sat 6 Jun · 3:00', sub: 'at Banksia Park SC', title: 'Saturday at Banksia Park SC', game: true, closes: 'Answers close Friday 6 pm. Anyone who has not answered is reminded at 4 pm.' },
      { label: 'Tue 9 Jun · 7:00', sub: 'Training', title: 'Training on Tuesday', game: false, closes: 'Answers close Tuesday 4 pm.' },
      { label: 'Sat 13 Jun · 3:00', sub: 'vs Riverside', title: 'Saturday 13 June vs Riverside', game: true, closes: 'Asked on Monday 8 June. Five answered early from the fixture list.' },
    ],
    reasons: { maybe: 'On shift until 2:00, will know Friday', cant: ['Away: wedding', 'Suspended: 1 game'], training: 'Working late' },
    know: ['Ryan is suspended for one game.', 'Rico has a tight hamstring. Marco is on a high load.', 'Every player answers for himself. No parent is involved for adults.'],
  },
}

function answersFor(team: AvTeam, event: number): Record<Ans, Row[]> {
  const t = TEAM_AV[team], n = t.squad.length
  const out: Record<Ans, Row[]> = { in: [], maybe: [], cant: [], none: [] }
  const suspended = t.squad.findIndex(p => p.note.startsWith('Suspended'))
  t.squad.forEach((p, i) => {
    let a: Ans = 'in', note = ''
    if (event === 0) {
      const cant = team === 'juniors' ? [4, 15] : [suspended, n - 2]
      if (i === cant[0]) { a = 'cant'; note = team === 'juniors' ? t.reasons.cant[0] : t.reasons.cant[team === 'youth' ? 0 : 1] }
      else if (i === cant[1]) { a = 'cant'; note = team === 'juniors' ? t.reasons.cant[1] : t.reasons.cant[team === 'youth' ? 1 : 0] }
      else if (i === 6) { a = 'maybe'; note = t.reasons.maybe }
      else if (i === 5 || i === n - 1) a = 'none'
      else if (p.status === 'checkin' && i !== suspended) note = 'Low check-ins this week'
    } else if (event === 1) {
      if (i === 9) { a = 'cant'; note = t.reasons.training }
      else if (i === 2 || i === 11 || i === 13) a = 'none'
    } else {
      if (![0, 2, 3, 7, 8].includes(i)) a = 'none'
    }
    out[a].push({ ini: p.ini, name: p.fullName, note })
  })
  return out
}

function PlayerPill({ ini, name, note, selected, onClick }: Row & { selected?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={!!selected} style={{ padding: '10px 12px', minHeight: 48, background: selected ? '#eef5f2' : '#ffffff', border: `1px solid ${selected ? '#2f6252' : '#e9eae8'}`, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '999px', background: '#e8cfcf', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ini}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{name}</span>
      </span>
      {note && <span style={{ fontSize: 12, color: '#4a5a57', paddingLeft: 36, lineHeight: '16px' }}>{note}</span>}
    </button>
  )
}

const COLS: { key: Ans; title: string; accent?: string }[] = [{ key: 'in', title: 'In', accent: '#2f6252' }, { key: 'maybe', title: 'Maybe' }, { key: 'cant', title: 'Can’t make it', accent: '#8a5a5a' }, { key: 'none', title: 'No answer' }]

export default function AvailabilityScreen({ empty, teamType = 'juniors', onNav }: { empty?: boolean; teamType?: AvTeam; onNav?: (s: string) => void }) {
  const [activeEvent, setActiveEvent] = useState(0)
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [reminded, setReminded] = useState<number[]>([])
  // What the coach has changed by hand (a parent rang, a player said at training), per event.
  const [moved, setMoved] = useState<Record<string, { to: Ans; note: string }>>({})
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }
  if (empty) return <AvailabilityEmpty />

  const t = TEAM_AV[teamType], ev = t.events[activeEvent], n = t.squad.length
  const base = answersFor(teamType, activeEvent)
  const cols: Record<Ans, Row[]> = { in: [], maybe: [], cant: [], none: [] }
  ;(Object.keys(base) as Ans[]).forEach(k => base[k].forEach(r => { const m = moved[`${activeEvent}:${r.name}`]; cols[m ? m.to : k].push(m ? { ...r, note: m.note } : r) }))
  const inN = cols.in.length, noneN = cols.none.length
  const subs = Math.max(0, inN - t.side)
  const who = t.adults ? 'players' : teamType === 'youth' ? 'families and players' : 'families'
  const sel = selectedName ? ([...cols.in, ...cols.maybe, ...cols.cant, ...cols.none].find(r => r.name === selectedName) ?? null) : null
  const selIn: Ans | null = sel ? (Object.keys(cols) as Ans[]).find(k => cols[k].includes(sel)) ?? null : null
  const move = (to: Ans) => { if (!sel) return; const first = sel.name.split(' ')[0]; setMoved(m => ({ ...m, [`${activeEvent}:${sel.name}`]: { to, note: to === 'in' ? 'You marked this' : to === 'none' ? '' : 'You marked this · no reason given' } })); say(`${first} moved to ${COLS.find(c => c.key === to)!.title}. ${t.adults ? 'He' : 'The family'} can still change it.`) }

  return (
    <div style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Availability</h1>
          <span style={{ fontSize: 13, color: '#4a5a57' }}>{n} players · asked for every game and session · answers from {who}</span>
        </div>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {t.events.map((f, i) => (
            <button key={f.label} aria-pressed={activeEvent === i} onClick={() => { setActiveEvent(i); setSelectedName(null) }} style={{ minHeight: 44, padding: '4px 14px', borderRadius: 10, border: `1px solid ${activeEvent === i ? '#2f6252' : '#c5c8c4'}`, background: activeEvent === i ? '#eef5f2' : '#ffffff', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: activeEvent === i ? '#2f6252' : '#4a5a57' }}>{f.label}</div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>{f.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 300px', gap: 12, overflow: 'hidden' }}>
        {COLS.map(c => (
          <div key={c.key} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{c.title}</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: c.accent ?? '#10211f', lineHeight: '26px' }}>{cols[c.key].length}</span>
            </div>
            {cols[c.key].map(p => <PlayerPill key={p.name} {...p} selected={selectedName === p.name} onClick={() => setSelectedName(selectedName === p.name ? null : p.name)} />)}
            {c.key === 'none' && noneN > 0 && (
              <button onClick={() => { setReminded(r => [...r, activeEvent]); say(`Reminder sent to ${noneN} ${t.adults ? (noneN === 1 ? 'player' : 'players') : (noneN === 1 ? 'family' : 'families')}. It is the same one-tap question.`) }} style={{ minHeight: 44, borderRadius: 10, border: 0, background: reminded.includes(activeEvent) ? '#40826d' : '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 'auto', flexShrink: 0 }}>
                {reminded.includes(activeEvent) ? `Reminded ${noneN}` : `Remind ${noneN} ${t.adults ? (noneN === 1 ? 'player' : 'players') : (noneN === 1 ? 'family' : 'families')}`}
              </button>
            )}
          </div>
        ))}

        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ background: '#eef5f2', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2f6252', marginBottom: 4 }}>{ev.title}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252', lineHeight: '38px' }}>{inN} in of {n}</div>
            <div style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', marginTop: 6 }}>
              {!ev.game ? `${cols.cant.length} can’t make it, ${noneN} still to answer.` : inN >= t.side ? `Enough for ${t.side} a side with ${subs} ${subs === 1 ? 'sub' : 'subs'}.${teamType === 'seniors' ? '' : ` Fair share is about ${Math.round((t.side * t.gameMins) / inN)} minutes each.`}` : `${t.side - inN} short of ${t.side} a side so far. ${noneN} still to answer.`}
            </div>
            <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: '#c5d8d0' }}><div style={{ height: 6, borderRadius: 3, background: '#2f6252', width: `${(inN / n) * 100}%` }} /></div>
            {ev.game && <button onClick={() => onNav ? onNav('FB1-Formation') : openThing('Formation with the players who are in', 'coach')} style={{ marginTop: 12, width: '100%', height: 44, borderRadius: 10, border: '1px solid #2f6252', background: '#ffffff', color: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Pick the line-up</button>}
          </div>

          {sel && selIn ? (
            <div style={{ border: '1px solid #2f6252', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{sel.name}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', margin: '2px 0 10px' }}>{selIn === 'none' ? 'Has not answered for this one.' : `${COLS.find(c => c.key === selIn)!.title}${sel.note ? ` · ${sel.note}` : ''}`} Told you another way? Mark it here.</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {COLS.filter(c => c.key !== selIn && c.key !== 'none').map(c => <button key={c.key} onClick={() => move(c.key)} style={{ minHeight: 44, padding: '0 12px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#10211f', cursor: 'pointer' }}>{c.title}</button>)}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Good to know</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.know.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}><span style={{ flex: 'none', width: 6, height: 6, borderRadius: '999px', background: '#40826d', marginTop: 6 }} />{item}</div>
                ))}
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid #e9eae8', paddingTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>How they are asked</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>One question per game and session, five days before: In, Maybe or Can’t. Can’t and Maybe ask for a reason. {t.adults ? 'Each player answers for himself.' : teamType === 'youth' ? 'Players 15 and over answer themselves; a parent answers for the rest.' : 'A parent answers for each child.'}</div>
            <button onClick={() => onNav ? onNav(t.adults || teamType === 'youth' ? 'PO3-OlderAvailability' : 'AV2-ParentAvailability') : openThing('what they see', 'coach')} style={{ marginTop: 10, width: '100%', minHeight: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#10211f', cursor: 'pointer' }}>See what {t.adults || teamType === 'youth' ? 'a player' : 'a parent'} gets</button>
          </div>

          <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>{ev.closes}</div>
        </aside>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', maxWidth: 560, textAlign: 'center' }}>{toast}</div>}
    </div>
  )
}

// ── Sandbox: the visitor's own team, one board per game ─────────────────────
// Answers come from the parent role (switch role to try it) or the coach marks them here.
function AvailabilitySandbox() {
  const { store, update } = useSandbox()
  const fixtures = [...store.fixtures].sort((a, b) => a.date.localeCompare(b.date))
  const [fid, setFid] = useState(fixtures[0].id)
  const [sel, setSel] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const f = fixtures.find(x => x.id === fid) ?? fixtures[0]
  const ans = (pid: string): SbAnswer | undefined => store.availability?.[`${f.id}:${pid}`]
  const groups: { key: 'in' | 'maybe' | 'cant' | 'none'; title: string }[] = [{ key: 'in', title: 'In' }, { key: 'maybe', title: 'Maybe' }, { key: 'cant', title: 'Can’t make it' }, { key: 'none', title: 'No answer' }]
  const inKey = (pid: string) => ans(pid)?.a ?? 'none'
  const inN = store.players.filter(p => inKey(p.id) === 'in').length
  const player = store.players.find(p => p.id === sel)
  const mark = (a: 'in' | 'maybe' | 'cant' | null) => { if (!player) return; update(setAnswer(store, f.id, player.id, a ? { a, reason: a === 'in' ? undefined : reason.trim() || undefined, by: 'coach' } : null)); setReason(''); setSel(null) }
  return (
    <div data-screen="AV1-Availability" style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Availability</h1>
          <span style={{ fontSize: 13, color: '#4a5a57' }}>{store.players.length} players · asked for every game</span>
        </div>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {fixtures.slice(0, 4).map(x => (
            <button key={x.id} aria-pressed={x.id === f.id} onClick={() => { setFid(x.id); setSel(null) }} style={{ minHeight: 44, padding: '4px 14px', borderRadius: 10, border: `1px solid ${x.id === f.id ? '#2f6252' : '#c5c8c4'}`, background: x.id === f.id ? '#eef5f2' : '#fff', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: x.id === f.id ? '#2f6252' : '#4a5a57' }}>{niceDate(x.date)}</div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>{x.home ? 'vs' : 'at'} {x.opponent}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr)) 300px', gap: 12, overflow: 'hidden' }}>
        {groups.map(g => {
          const rows = store.players.filter(p => inKey(p.id) === g.key)
          return (
            <div key={g.key} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}><span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{g.title}</span><span style={{ fontSize: 20, fontWeight: 700, lineHeight: '26px' }}>{rows.length}</span></div>
              {rows.map(p => { const a = ans(p.id); return <PlayerPill key={p.id} ini={p.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()} name={p.name} note={[a?.reason, a && (a.by === 'coach' ? 'You marked this' : 'From the parent')].filter(Boolean).join(' · ')} selected={sel === p.id} onClick={() => { setSel(sel === p.id ? null : p.id); setReason('') }} /> })}
            </div>
          )
        })}
        <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ background: '#eef5f2', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2f6252', marginBottom: 4 }}>{niceDate(f.date)} {f.home ? 'vs' : 'at'} {f.opponent}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252', lineHeight: '38px' }}>{inN} in of {store.players.length}</div>
          </div>
          {player ? (
            <div style={{ border: '1px solid #2f6252', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>{player.name}</div>
              <input value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason, if Maybe or Can’t" aria-label="Reason" style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #c5c8c4', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box', outline: 'none', marginBottom: 8 }} />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {([['in', 'In'], ['maybe', 'Maybe'], ['cant', 'Can’t']] as const).map(([k, l]) => <button key={k} onClick={() => mark(k)} style={{ flex: 1, minHeight: 44, borderRadius: 10, border: k === 'in' ? 0 : '1px solid #c5c8c4', background: k === 'in' ? '#2f6252' : '#fff', color: k === 'in' ? '#fff' : '#10211f', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{l}</button>)}
              </div>
              {ans(player.id) && <button onClick={() => mark(null)} style={{ marginTop: 6, width: '100%', minHeight: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#4a5a57', cursor: 'pointer' }}>Clear the answer</button>}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}><strong style={{ color: '#10211f' }}>Tap a player</strong> to mark an answer they gave you another way.</div>
          )}
          <div style={{ borderTop: '1px solid #e9eae8', paddingTop: 12, fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>
            <strong style={{ color: '#10211f' }}>Try the parent’s side.</strong> Use “Switch role” at the top left and open Parent: they are asked about each of these games, and their answer lands here.
          </div>
        </aside>
      </div>
    </div>
  )
}
