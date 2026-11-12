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
const LOVED_ON = new Set(['Being captain', 'Treasure island'])
const BETTER_ON = new Set(['Joining in', 'Dribbling'])

export default function HM6SeasonNotes(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Squad' ? '#40826d' : 'transparent', color: t === 'Squad' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Players', "Who's coming", 'Consent'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Players' ? INK : MUT, borderBottom: t === 'Players' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer' }}>{t}</div>
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
        <button onClick={() => st('Sending 4 drafted notes.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Send the 4 drafts</button>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: '400px minmax(0, 1fr)' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px 8px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Players</div>
          {PLAYERS.map(p => (
            <div key={p.short} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 54, borderTop: `1px solid ${LN}`, cursor: 'pointer', background: p.short === 'Arlo' ? PALE : 'transparent', margin: p.short === 'Arlo' ? '0 -8px' : 0, padding: p.short === 'Arlo' ? '0 8px' : 0, borderRadius: p.short === 'Arlo' ? 10 : 0 }}>
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
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>AK</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 700 }}>Arlo Kaur</div>
              <div style={{ fontSize: 14, color: MUT }}>To his dad, Raj · drafted from your game notes</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>He loved</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {LOVED.map(l => (
                <div key={l} style={{ minHeight: 48, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, cursor: 'pointer', background: LOVED_ON.has(l) ? G : '#fff', color: LOVED_ON.has(l) ? '#fff' : INK, border: LOVED_ON.has(l) ? 'none' : `1px solid #c5c8c4` }}>{l}</div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>He got better at</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {BETTER.map(l => (
                <div key={l} style={{ minHeight: 48, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, cursor: 'pointer', background: BETTER_ON.has(l) ? G : '#fff', color: BETTER_ON.has(l) ? '#fff' : INK, border: BETTER_ON.has(l) ? 'none' : `1px solid #c5c8c4` }}>{l}</div>
              ))}
            </div>
          </div>

          <div style={{ border: `1px solid #c5c8c4`, borderRadius: 12, padding: '12px 14px', fontSize: 16, lineHeight: '24px', background: '#fff' }}>
            Arlo joined us in term 2 and by June he was captain. He loves Treasure island and now dribbles with his head up. Thank you for getting him to every session. See you next year!
          </div>

          <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>No scores or comparisons. Two things he loved, two he got better at, in your words.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => st('Opening note editor.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
            <button onClick={() => st("Note sent to Arlo's dad.")} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Send to Arlo's dad</button>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
