const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Status = 'Yes' | 'Maybe' | 'Away' | 'No reply'
interface Player { init: string; name: string; note: string; status: Status; goal: boolean; cap: boolean }

const PLAYERS: Player[] = [
  { init: 'IC', name: 'Ivy Chen',    note: 'Loves to dribble',    status: 'Yes',     goal: true,  cap: true  },
  { init: 'MB', name: 'Max Bailey',  note: 'Asks to go in goal',  status: 'Yes',     goal: true,  cap: false },
  { init: 'AK', name: 'Arlo Kaur',   note: 'New this term',       status: 'Yes',     goal: false, cap: true  },
  { init: 'ZM', name: 'Zara Moore',  note: 'Passes early',        status: 'Yes',     goal: true,  cap: true  },
  { init: 'LW', name: 'Leo Wright',  note: 'Quiet, likes a job',  status: 'Yes',     goal: true,  cap: false },
  { init: 'EN', name: 'Evie Nolan',  note: 'Left footer',         status: 'Yes',     goal: true,  cap: true  },
  { init: 'TS', name: 'Theo Santos', note: 'Runs all day',         status: 'Yes',     goal: false, cap: false },
  { init: 'PD', name: 'Poppy Dunn',  note: 'Shy with the ball',   status: 'Maybe',   goal: true,  cap: true  },
  { init: 'OH', name: 'Omar Haddad', note: 'Back next week',       status: 'Away',    goal: true,  cap: false },
  { init: 'JL', name: 'Jude Lim',    note: 'Plays futsal too',    status: 'No reply', goal: false, cap: true  },
]

const statusBg: Record<Status, string> = { Yes: G, Maybe: '#cbbeb5', Away: '#e9eae8', 'No reply': '#c39797' }
const statusColor: Record<Status, string> = { Yes: '#fff', Maybe: INK, Away: INK, 'No reply': INK }

function Check({ on }: { on: boolean }) {
  return (
    <span style={{ width: 18, height: 18, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: on ? G : 'transparent', border: on ? 'none' : `2px solid #c5c8c4`, boxSizing: 'border-box' as const }}>
      {on && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>}
    </span>
  )
}

export default function HM2SquadMiniRoos(_: { onBack?: () => void }) {
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
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Squad</h1>
          <span style={{ fontSize: 14, color: MUT }}>10 players · U9 Tom · 7 coming Saturday, 1 maybe, 1 away, 1 to answer</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Remind 1 family</button>
          <button style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>+ Add a player</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 330px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>Players</div>
            <div style={{ fontSize: 14, color: MUT }}>Ticks show who has had a turn in goal and as captain this term</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {PLAYERS.map(p => (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 14, background: '#fff', border: p.status === 'Maybe' ? `2px solid ${G}` : `1px solid #c5c8c4`, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{p.init}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.note}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: statusBg[p.status], color: statusColor[p.status] }}>Sat: {p.status}</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: p.goal ? INK : MUT }}><Check on={p.goal} />Goal</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: p.cap ? INK : MUT }}><Check on={p.cap} />Captain</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>No ratings, rankings or running numbers at this age. Just who's here, who's had a turn, and what helps each child.</div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>PD</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 700 }}>Poppy Dunn</div>
              <div style={{ fontSize: 14, color: MUT }}>Second term · plays anywhere</div>
            </div>
          </div>
          <div style={{ background: PALE, borderRadius: 12, padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}><strong>What helps Poppy:</strong> she's shy with the ball. Pair her with Zara in the first game and give her the first kick-off.</div>
          {[
            { icon: '✓', label: 'Turn in goal', note: 'Sat 16 May', bg: PALE },
            { icon: '✓', label: 'Captain', note: 'Sat 23 May', bg: PALE },
            { icon: '?', label: 'Saturday', note: "Mum says maybe · school concert", bg: '#cbbeb5' },
            { icon: '+', label: 'First-aid card', note: 'Nothing to know', bg: LN },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 48, borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 30, height: 30, borderRadius: 999, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{ height: 44, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Message her mum</button>
            <button style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Add a note</button>
          </div>
        </div>
      </div>
    </div>
  )
}
