import { useState } from 'react'
import { PLAYERS } from './squadData'
import { SKILLS, STEPS, TURNS } from './MiniRoosExtras'
import { CONSENT } from './ConsentMiniRoos'

// HM2c — a MiniRoos player's profile. Same job as the older teams' profile, kept
// to what suits an under 9: how often they came, their turns, what the coach has
// noticed and what is good to know. No scores, ratings or rankings.

const INK = '#10211f', MUT = '#4a5a57', LN = '#e9eae8', G = '#2f6252', GD = '#1f4a3e', PALE = '#eef5f2', SAND = '#cbbeb5', SANDBG = '#f6f1e9', BORDER = '#c5c8c4'
const first = (n: string) => n.split(' ')[0]

type About = { her: 'her' | 'his'; turns: string; family: string; noticed: [string, string][]; aid: string; pickup: string }
const ABOUT: Record<string, About> = {
  IC: { her: 'her', turns: 'Turns 9 in March', family: 'mum Mei, dad Wen', noticed: [['Loves dribbling', 'Tapped 3 Saturdays running'], ['Looks up before she passes', 'New in the last month'], ['Kind to new players', 'Showed Arlo each game on Tuesday']], aid: 'Nothing to know', pickup: 'Mum or dad' },
  MB: { her: 'his', turns: 'Turns 9 in October', family: 'mum Jo', noticed: [['Brave in goal', 'Asks for a turn every week'], ['Listens better with a job', 'Gave him the cones on Tuesday'], ['Loud and keen', 'Helps the quiet ones join in']], aid: 'Nothing to know', pickup: 'Mum, or Grandad (Ray) on Tuesdays' },
  AK: { her: 'his', turns: 'Turns 8 in July', family: 'dad Harjit', noticed: [['Settling in well', 'Second week, stayed for every game'], ['Stops the ball with his sole', 'Having a go at training'], ['Happiest next to Ivy', 'Pair them for the first game']], aid: 'Nothing to know', pickup: 'Dad' },
  ZM: { her: 'her', turns: 'Turns 9 in January', family: 'mum Tess, dad Rob', noticed: [['Passes early', 'Finds a friend before the crowd arrives'], ['Trying her other foot', 'Five left-foot passes on Tuesday'], ['Looks after Poppy', 'Stands next to her at kick-off']], aid: 'Nothing to know', pickup: 'Mum or dad' },
  LW: { her: 'his', turns: 'Turns 9 in May', family: 'mum Dana', noticed: [['Likes a job', 'Captain of the bibs on Tuesday'], ['Called for the ball', 'Once on Sat 30 May, and got it'], ['Quiet at the start', 'Fine after the first game']], aid: 'Hay fever in spring · tablet before games', pickup: 'Mum, or his sister Jade (16)' },
  EN: { her: 'her', turns: 'Turns 9 in November', family: 'mum Clare, mum Sam', noticed: [['Strong left foot', 'Scores from the left most weeks'], ['Using her right too', 'Scored with it in the small game'], ['Never stops running', 'Came 5 of 5 this term']], aid: 'Nothing to know', pickup: 'Either mum' },
  TS: { her: 'his', turns: 'Turns 9 in February', family: 'dad Luis, mum Ana', noticed: [['Runs all day', 'First to every ball'], ['Finding a friend', 'Two passes instead of two shots'], ['Gets cross when it goes wrong', 'A quick word and he is back in']], aid: 'Nothing to know', pickup: 'Dad' },
  PD: { her: 'her', turns: 'Turns 9 in August', family: 'mum Sarah, dad Chris', noticed: [['Loves dribbling', 'Tapped 3 Saturdays running'], ['Took the first kick-off', 'Tuesday, with Zara next to her'], ['Quiet on 23 May', 'Fine the week after']], aid: 'Asthma · puffer in her bag', pickup: 'Mum, dad or Nan (Jean)' },
  OH: { her: 'his', turns: 'Turns 9 in April', family: 'dad Sami', noticed: [['Turns away from a defender', 'Twice in the last game'], ['Thanked Tom for his goalie turn', 'From Sami, in the family chat'], ['Away this week', 'Back for training on Tuesday']], aid: 'Nothing to know', pickup: 'Dad' },
  JL: { her: 'his', turns: 'Turns 9 in June', family: 'mum Wei', noticed: [['Stays on the ball when it is busy', 'Kept it three times under pressure'], ['Plays futsal on Fridays', 'Can be tired on Saturday'], ['Good at the gates game', 'Beat his own score twice']], aid: 'Nothing to know', pickup: 'Mum, or Uncle Han' },
}

const ICON = {
  heart: 'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z',
  target: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z',
  chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01',
  people: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
}
const Ico = ({ d }: { d: string }) => (
  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', background: '#f0f1ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  </span>
)
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px' }
const label: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: MUT }

export default function PlayerProfileMiniRoos({ ini, onPick, onBack, onSeasonNotes }: { ini: string; onPick: (ini: string) => void; onBack: () => void; onSeasonNotes?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [aidOpen, setAidOpen] = useState(false)
  const [notes, setNotes] = useState<Record<string, string[]>>({})
  const [draft, setDraft] = useState('')
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const p = PLAYERS.find(x => x.ini === ini) ?? PLAYERS[0]
  const a = ABOUT[p.ini], t = TURNS[p.ini], sk = SKILLS[p.ini], c = CONSENT.find(x => x.ini === p.ini)
  const name = first(p.name)
  const photos = !c ? 'Not asked yet' : c.photos === 'no' ? 'No photos or film. Blurred and left out of clips' : c.photos === 'waiting' ? 'Waiting on the family. Not filmed until they answer' : c.news === 'no' ? 'Yes to the team, no to club news' : c.news === 'waiting' ? 'Yes to the team. Club news not answered yet' : 'Yes to the team and to club news'
  const stats = [
    { k: 'Came', v: `${t.games} of 5`, s: p.note === 'New this term' ? 'Joined this term' : 'This term' },
    { k: 'Turns in goal', v: t.goal ? String(t.goal) : 'Due', s: t.goal ? 'Everyone gets a go' : 'Next on the list', due: !t.goal },
    { k: 'Started', v: `${t.started} of ${t.games}`, s: 'Turns shared out' },
    { k: 'Captain', v: p.hadCaptain ? 'Had a turn' : 'Due', s: p.hadCaptain ? 'This term' : 'This term still', due: !p.hadCaptain },
  ]
  const mine = notes[p.ini] ?? []

  return (
    <div data-screen="HM2c-PlayerCardMiniRoos" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '14px 28px 10px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>← All players</button>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Squad</h1>
        <span style={{ fontSize: 14, color: MUT }}>U9 Tom · {PLAYERS.length} children</span>
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, padding: '0 28px 16px', display: 'grid', gridTemplateColumns: '250px minmax(0,1fr)', gap: 14, overflow: 'hidden' }}>
        {/* Everyone, so the coach can move from child to child */}
        <div style={{ ...card, padding: 10, overflowY: 'auto' }}>
          {PLAYERS.map(x => {
            const on = x.ini === p.ini
            return (
              <button key={x.ini} onClick={() => { onPick(x.ini); setAidOpen(false); setDraft('') }} aria-pressed={on} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '6px 10px', borderRadius: 12, border: `1.5px solid ${on ? G : 'transparent'}`, background: on ? '#fafcfb' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '50%', background: on ? PALE : '#f0f1ef', color: INK, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{x.ini}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{x.name}</span>
                  <span style={{ display: 'block', fontSize: 12, color: MUT }}>Came {TURNS[x.ini].games} of 5</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* The profile */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ flex: 'none', width: 56, height: 56, borderRadius: '50%', background: PALE, color: INK, fontSize: 17, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
            <div style={{ flexGrow: 1, minWidth: 180 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>{p.name}</div>
              <div style={{ fontSize: 14, color: MUT }}>{a.turns} · {a.family} · {p.note === 'New this term' ? 'first term' : 'second term'}, plays anywhere</div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, padding: '5px 12px', borderRadius: 999, background: p.avail === 'yes' ? '#40826d' : p.avail === 'maybe' ? SAND : '#f0f1ef', color: p.avail === 'yes' ? '#fff' : INK }}>Saturday: {p.avail === 'yes' ? 'coming' : p.avail === 'maybe' ? 'maybe' : p.avail === 'away' ? 'away' : 'no reply yet'}</span>
            <button onClick={() => say(`Message started to ${name}’s family.`)} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Message {a.her} family</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10 }}>
            {stats.map(s => (
              <div key={s.k} style={{ border: `1px solid ${s.due ? SAND : BORDER}`, background: s.due ? SANDBG : '#fff', borderRadius: 14, padding: '10px 14px' }}>
                <div style={label}>{s.k}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>{s.v}</div>
                <div style={{ fontSize: 13, color: MUT }}>{s.s}</div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px', fontSize: 14, lineHeight: 1.5, color: GD }}><strong>What helps {name}:</strong> {p.helpNote}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 14px' }}>
              <div style={label}>What you’ve noticed</div>
              {a.noticed.map(([title, sub], i) => (
                <div key={title} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: `1px solid ${LN}`, marginTop: i ? 0 : 8 }}>
                  <Ico d={[ICON.heart, ICON.target, ICON.chat][i]} />
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{title}</div><div style={{ fontSize: 13, color: MUT }}>{sub}</div></div>
                </div>
              ))}
              {mine.map((n, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: `1px solid ${LN}` }}>
                  <Ico d={ICON.chat} />
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{n}</div><div style={{ fontSize: 13, color: MUT }}>Your note · just now</div></div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: `1px solid ${LN}` }}>
                <input value={draft} onChange={e => setDraft(e.target.value)} placeholder={`Something you noticed about ${name}`} aria-label={`Add a note about ${name}`} style={{ flexGrow: 1, minWidth: 0, height: 44, borderRadius: 10, border: `1px solid ${BORDER}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: INK, outline: 'none' }} />
                <button onClick={() => { const v = draft.trim(); if (!v) { say('Write a few words first.'); return } setNotes(n => ({ ...n, [p.ini]: [...(n[p.ini] ?? []), v] })); setDraft(''); say(`Note added for ${name}. Only coaches see it.`) }} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer' }}>Add note</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={label}>Practising now</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{sk.skill}</div>
                    <div style={{ fontSize: 13, color: MUT }}>{STEPS[sk.step]} · {sk.saw}</div>
                  </div>
                  <span style={{ flex: 'none', display: 'flex', gap: 4 }} aria-hidden="true">{STEPS.map((_, k) => <span key={k} style={{ width: 20, height: 8, borderRadius: 4, background: k <= sk.step ? '#40826d' : LN }} />)}</span>
                </div>
                <div style={{ fontSize: 13, color: GD, marginTop: 8 }}>Say it like this: “{sk.say}”</div>
              </div>

              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={label}>Good to know</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: `1px solid ${LN}`, marginTop: 8 }}>
                  <Ico d={ICON.shield} />
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Photos and clips</div><div style={{ fontSize: 13, color: MUT }}>{photos}</div></div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: `1px solid ${LN}` }}>
                  <Ico d={ICON.info} />
                  <div style={{ flexGrow: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: INK }}>First-aid card</div><div style={{ fontSize: 13, color: MUT }}>{a.aid}</div></div>
                  <button onClick={() => setAidOpen(o => !o)} aria-expanded={aidOpen} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer' }}>{aidOpen ? 'Close' : 'Open'}</button>
                </div>
                {aidOpen && <div style={{ background: SANDBG, border: `1px solid ${SAND}`, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: INK, lineHeight: 1.5, marginBottom: 8 }}>{a.aid === 'Nothing to know' ? `Nothing on ${name}’s card. In an emergency call ${a.family.split(',')[0]} first.` : `${a.aid}. In an emergency call ${a.family.split(',')[0]} first. The card comes with you to every game, even with no signal.`}</div>}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: `1px solid ${LN}` }}>
                  <Ico d={ICON.people} />
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Pick-up</div><div style={{ fontSize: 13, color: MUT }}>{a.pickup}</div></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 4 }}>
            <span style={{ flexGrow: 1, fontSize: 13, color: MUT }}>No scores, ratings or rankings for under 12s.</span>
            <button onClick={() => onSeasonNotes ? onSeasonNotes() : say(`Opening ${name}’s season note.`)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer' }}>Write {a.her} season note</button>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </div>
  )
}
