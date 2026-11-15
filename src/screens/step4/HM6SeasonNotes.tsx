import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type NoteStatus = 'Sent' | 'Draft' | 'To write'
interface NoteRow { init: string; short: string; note: string; status: NoteStatus }

const PLAYERS: NoteRow[] = [
  { init: 'IC', short: 'Ivy',   note: 'Dribbling at players',         status: 'Sent' },
  { init: 'MB', short: 'Max',   note: 'Brave in goal',                status: 'Sent' },
  { init: 'AK', short: 'Arlo',  note: 'Joined in term 2, now a captain', status: 'Draft' },
  { init: 'ZM', short: 'Zara',  note: 'Passes early',                 status: 'Draft' },
  { init: 'LW', short: 'Leo',   note: 'Found his voice',              status: 'Draft' },
  { init: 'EN', short: 'Evie',  note: 'Left foot',                    status: 'Draft' },
  { init: 'TS', short: 'Theo',  note: 'Never stops running',          status: 'To write' },
  { init: 'PD', short: 'Poppy', note: 'Asks for the ball now',        status: 'To write' },
  { init: 'OH', short: 'Omar',  note: 'Helps pack up',                status: 'To write' },
  { init: 'JL', short: 'Jude',  note: 'Tries both feet',              status: 'To write' },
]

const statusStyle: Record<NoteStatus, { bg: string; color: string }> = {
  'Sent':     { bg: G,         color: '#fff' },
  'Draft':    { bg: '#cbbeb5', color: INK },
  'To write': { bg: '#e9eae8', color: INK },
}

const LOVED = ['Being captain', 'Treasure island', 'Scoring', 'His turn in goal']
const BETTER = ['Joining in', 'Dribbling', 'Passing', 'Listening']

export default function HM6SeasonNotes(_: { onBack?: () => void }) {
  const [activeNav, setActiveNav] = useState('Squad')
  const [activeSub, setActiveSub] = useState('Players')
  const [selected, setSelected] = useState(PLAYERS.findIndex(p => p.short === 'Arlo'))
  const [loved, setLoved] = useState<string[]>(['Being captain', 'Treasure island'])
  const [better, setBetter] = useState<string[]>(['Joining in', 'Dribbling'])
  const [draftsSent, setDraftsSent] = useState(false)
  const [noteSent, setNoteSent] = useState(false)
  const [editing, setEditing] = useState(false)
  const sel = PLAYERS[selected]
  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>, v: string) =>
    set(arr => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v])
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} onClick={() => setActiveNav(t)} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === activeNav ? '#40826d' : 'transparent', color: t === activeNav ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Players', "Who's coming", 'Consent'].map(t => (
          <div key={t} onClick={() => setActiveSub(t)} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === activeSub ? INK : MUT, borderBottom: t === activeSub ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Season notes</h1>
          <span style={{ fontSize: 14, color: MUT }}>One short note for each family · 2 sent, 4 drafted, 4 to write</span>
        </div>
        <button onClick={() => setDraftsSent(true)} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: draftsSent ? '#40826d' : G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{draftsSent ? '✓ 4 drafts sent' : 'Send the 4 drafts'}</button>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: '400px minmax(0, 1fr)' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px 8px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Players</div>
          {PLAYERS.map((p, i) => (
            <div key={p.short} onClick={() => { setSelected(i); setNoteSent(false); setEditing(false) }} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 54, borderTop: `1px solid ${LN}`, cursor: 'pointer', background: i === selected ? PALE : 'transparent', margin: i === selected ? '0 -8px' : 0, padding: i === selected ? '0 8px' : 0, borderRadius: i === selected ? 10 : 0 }}>
              <div style={{ width: 30, height: 30, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.init}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{p.short}</div>
                <div style={{ fontSize: 13, color: MUT }}>{p.note}</div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: statusStyle[p.status].bg, color: statusStyle[p.status].color, flexShrink: 0 }}>{p.status}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>{sel.init}</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 700 }}>{sel.short}</div>
              <div style={{ fontSize: 14, color: MUT }}>{sel.note} · drafted from your game notes · {sel.status}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>They loved</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {LOVED.map(l => (
                <div key={l} onClick={() => toggle(setLoved, l)} style={{ minHeight: 48, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, cursor: 'pointer', background: loved.includes(l) ? G : '#fff', color: loved.includes(l) ? '#fff' : INK, border: loved.includes(l) ? 'none' : `1px solid #c5c8c4` }}>{l}</div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>They got better at</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {BETTER.map(l => (
                <div key={l} onClick={() => toggle(setBetter, l)} style={{ minHeight: 48, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, cursor: 'pointer', background: better.includes(l) ? G : '#fff', color: better.includes(l) ? '#fff' : INK, border: better.includes(l) ? 'none' : `1px solid #c5c8c4` }}>{l}</div>
              ))}
            </div>
          </div>

          <div style={{ border: `1px solid #c5c8c4`, borderRadius: 12, padding: '12px 14px', fontSize: 16, lineHeight: '24px', background: '#fff' }}>
            Arlo joined us in term 2 and by June he was captain. He loves Treasure island and now dribbles with his head up. Thank you for getting him to every session. See you next year!
          </div>

          <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>No scores or comparisons. {loved.length} they loved, {better.length} they got better at, in your words.</div>
          {editing && <div style={{ fontSize: 13, color: G, fontWeight: 600 }}>Editing — tap the chips above to change what goes in the note.</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setEditing(e => !e)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${editing ? G : LN}`, background: editing ? PALE : '#fff', color: editing ? G : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{editing ? 'Done' : 'Edit'}</button>
            <button onClick={() => setNoteSent(true)} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${G}`, background: noteSent ? '#40826d' : G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{noteSent ? `✓ Sent to ${sel.short}'s family` : `Send to ${sel.short}'s family`}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
