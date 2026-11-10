// F2 · F3/F3e · F4/F4e · F5 — fitness-coach tabs added to main Squad/Training/Matchday/Review screens
import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'
const WARN = '#c3a84a'

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', ...style }}>{children}</div>
}
function Ini({ ini, color = G }: { ini: string; color?: string }) {
  return <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{ini}</div>
}
function Chip({ label, value, color = G }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 14px' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
    </div>
  )
}
function pctColor(p: number) { return p >= 120 ? ROSE : p >= 100 ? WARN : G }

// ─── F2 — Fitness coach tab on Squad screen ───────────────────────────────────

type SquadFilter = 'all' | 'ready' | 'load' | 'checkin' | 'goals' | 'keepers'

const FILTERS: Array<{ id: SquadFilter; label: string; count: number }> = [
  { id: 'all',     label: 'All',             count: 16 },
  { id: 'ready',   label: 'Ready',           count: 11 },
  { id: 'load',    label: 'Manage load',     count: 4  },
  { id: 'checkin', label: 'Check in',        count: 1  },
  { id: 'goals',   label: 'Goals need work', count: 3  },
  { id: 'keepers', label: 'Keepers',         count: 2  },
]

const SQUAD_SECTIONS = [
  { group: 'KEEPERS', players: [
    { ini: 'AL', name: 'Ava L.',   note: 'Short on sleep',    pct: 95,  status: 'ready'   as const },
    { ini: 'TR', name: 'Tom R.',   note: 'Wrist check',       pct: 70,  status: 'checkin' as const },
  ]},
  { group: 'DEFENDERS', players: [
    { ini: 'LM', name: 'Leo M.',   note: 'Back-post runner',  pct: 105, status: 'load'    as const },
    { ini: 'GO', name: 'Grace O.', note: 'Leads the call',    pct: 100, status: 'ready'   as const },
    { ini: 'KR', name: 'Kai R.',   note: 'Ready',             pct: 90,  status: 'ready'   as const },
    { ini: 'SD', name: 'Sam D.',   note: 'No check-in today', pct: 98,  status: 'ready'   as const },
    { ini: 'RC', name: 'Ruby C.',  note: 'Ready',             pct: 102, status: 'ready'   as const },
  ]},
  { group: 'MIDFIELDERS', players: [
    { ini: 'MT', name: 'Mia T.',   note: 'High load',         pct: 125, status: 'load'    as const },
    { ini: 'JP', name: 'Jai P.',   note: 'Extra minutes',     pct: 118, status: 'load'    as const },
    { ini: 'EB', name: 'Ella B.',  note: 'Low wellness',      pct: 92,  status: 'checkin' as const },
    { ini: 'IM', name: 'Isla M.',  note: 'Ready',             pct: 100, status: 'ready'   as const },
    { ini: 'OB', name: 'Oscar B.', note: 'Set a goal',        pct: 97,  status: 'goals'   as const },
  ]},
  { group: 'FORWARDS', players: [
    { ini: 'NO', name: 'Noah O.',  note: 'Growth spurt',      pct: 130, status: 'load'    as const },
    { ini: 'ZH', name: 'Zoe H.',  note: 'Growth spurt',      pct: 128, status: 'load'    as const },
    { ini: 'FW', name: 'Finn W.',  note: 'Ready',             pct: 100, status: 'ready'   as const },
    { ini: 'LN', name: 'Lily N.',  note: 'Set a goal',        pct: 96,  status: 'goals'   as const },
  ]},
]

export function FitnessSquadTab({ empty }: { empty: boolean }) {
  const [filter, setFilter] = useState<SquadFilter>('all')
  const [selected, setSelected] = useState<string>('EB')

  if (empty) return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px' }}>
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Fitness coach · U12 Sam</div>
        <Card><div style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>Start with heights</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Measure once, and Clean Sheet flags anyone growing fast and sets safe sprint and jump limits.</div>
        </div></Card>
      </div>
    </div>
  )

  const allPlayers = SQUAD_SECTIONS.flatMap(s => s.players)
  const sel = allPlayers.find(p => p.ini === selected)

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0, padding: '12px 28px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Squad</div>
          <div style={{ fontSize: 13, color: MUT }}>17 players, 16 shown · Thursday 4 Jun · 2 days to Harbour Rovers</div>
        </div>
        <div style={{ flex: 1 }}/>
        <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Message parents</button>
        <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add player</button>
      </div>

      <div style={{ flexShrink: 0, padding: '10px 28px', display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ height: 32, padding: '0 12px', borderRadius: 999, border: `1px solid ${filter === f.id ? GD : LN}`, background: filter === f.id ? GD : '#fff', color: filter === f.id ? '#fff' : MUT, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {f.label} {f.count}
          </button>
        ))}
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16, padding: '0 28px 20px', overflow: 'hidden' }}>
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SQUAD_SECTIONS.map(section => {
            const visible = section.players.filter(p =>
              filter === 'all' ? true :
              filter === 'keepers' ? section.group === 'KEEPERS' :
              p.status === filter
            )
            if (visible.length === 0) return null
            return (
              <div key={section.group}>
                <div style={{ padding: '8px 0 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: MUT }}>{section.group} · {visible.length}</div>
                <Card>
                  {visible.map((p, i) => (
                    <button key={p.ini} onClick={() => setSelected(p.ini)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', width: '100%', textAlign: 'left', border: 'none', borderBottom: i < visible.length - 1 ? `1px solid ${LN}` : 'none', background: selected === p.ini ? PALE : '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
                      <Ini ini={p.ini} color={p.pct >= 120 ? ROSE : p.pct >= 110 ? WARN : G}/>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: pctColor(p.pct) }}>{p.pct}%</div>
                    </button>
                  ))}
                </Card>
              </div>
            )
          })}
          <div style={{ fontSize: 12, color: MUT, padding: '8px 0' }}>Numbers show load this week as a share of each player's usual.</div>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Chip label="Development goals" value="11 / 16" color={G}/>
            <Chip label="Wellness this week" value="3.8 / 5" color={G2}/>
            <Chip label="Load this week" value="4 above" color={ROSE}/>
            <Chip label="Team load" value="118%" color={ROSE}/>
          </div>
          {sel && (
            <Card>
              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Ini ini={sel.ini} color={pctColor(sel.pct)}/>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{allPlayers.find(p => p.ini === sel.ini)?.name ?? sel.ini}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{sel.note}</div>
                </div>
              </div>
              {([
                { label: 'WELLNESS', value: sel.ini === 'EB' ? '2.3' : sel.ini === 'TR' ? '3.2' : '3.6', color: sel.ini === 'EB' ? ROSE : MUT },
                { label: 'LOAD', value: `${sel.pct}% of usual`, color: pctColor(sel.pct) },
                { label: 'MINUTES', value: '250 / 250', color: G },
                { label: 'DEVELOPMENT GOAL', value: 'On track', color: G },
              ] as const).map(r => (
                <div key={r.label} style={{ padding: '8px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.value}</span>
                </div>
              ))}
              {sel.ini === 'EB' && <div style={{ padding: '10px 14px', fontSize: 13, color: MUT, lineHeight: 1.5, background: PALE }}>Have a quick chat before warm-up. Keep it light if she wants.</div>}
              <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, height: 36, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>Full profile</button>
                <button style={{ flex: 1, height: 36, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Message parent</button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── F3/F3e — Fitness coach tab on Training screen ────────────────────────────

const TONIGHT_DRILLS = [
  { time: '5:45', dur: '15 min', focus: 'Focus 2', title: '11+ Kids warm-up', why: 'cuts injuries by about half when done twice a week. You lead it.', who: 'Whole squad', size: 'Half pitch', kit: 'Cones, 6 poles', adj: 'Noah and Zoe: skip the jumps' },
  { time: '6:00', dur: '35 min', focus: 'Focus 1', title: 'Rondo, then win it back (Sam leads)', why: 'count Noah and Zoe sprints and stop them at 3. Kai passes only.', who: '8 v 8', size: '40 × 30 m', kit: 'Clicker for sprints', adj: 'Noah and Zoe: 3 sprints max' },
  { time: '6:35', dur: '30 min', focus: 'Focus 3', title: 'Small game (Sam leads)', why: 'watch who fades in the last 10 minutes.', who: '7 v 7 + keepers', size: 'Half pitch', kit: 'Mini goals', adj: null },
  { time: '7:05', dur: '10 min', focus: 'Recovery', title: 'Cool-down and pain check', why: 'ask who has sore knees or heels.', who: 'Whole squad', size: 'Centre circle', kit: 'None', adj: null },
]

const WHY_PLAN = [
  { n: '1', t: 'Protect growing players', d: 'Noah and Zoe are growing fast, and both reported pain this week.', note: '1 drill tonight · clip and data' },
  { n: '2', t: 'Warm up to prevent injuries', d: 'The 11+ Kids warm-up was done once this week. Twice works best.', note: '1 drill tonight · clip and data' },
  { n: '3', t: 'Strong to the final whistle, through football', d: 'Running dropped in the last 10 minutes on Saturday.', note: '1 drill tonight · clip and data' },
]

const ADJUST_TONIGHT = [
  { ini: 'NO', note: 'Noah · no jumps, 3 sprints, knee check' },
  { ini: 'ZH', note: 'Zoe · no jumps, 3 sprints, heel check' },
  { ini: 'KR', note: 'Kai · tight hamstring: passing only' },
  { ini: 'EB', note: 'Ella · ask about sleep' },
]

export function FitnessTrainingTab({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px' }}>
      <div style={{ maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Fitness coach</div>
        <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: G, lineHeight: 1.5 }}>Your part appears when Sam plans the session. Once the head coach sets tonight's training, you'll see the warm-up, who to go easy on, and where your 15 minutes fit.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ height: 40, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Sam to plan it</button>
          <button style={{ height: 40, padding: '0 16px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Browse warm-ups</button>
        </div>
        <Card>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>What you will see</div>
          {[{ t: 'The warm-up', d: '11+ Kids, ready to run' }, { t: 'Who to go easy on', d: 'Growing fast, or coming back from injury' }, { t: 'How hard it was', d: 'Players tap their effort afterwards' }].map((r, i) => (
            <div key={r.t} style={{ padding: '10px 14px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.t}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.d}</div>
            </div>
          ))}
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}`, fontSize: 12, color: G }}>At Play level your part is the warm-up and keeping an eye on growing players.</div>
        </Card>
      </div>
    </div>
  )

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', overflow: 'hidden' }}>
      <div style={{ overflowY: 'auto', padding: '16px 20px 20px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginBottom: 2 }}>Your part tonight · 5:45–7:15 pm</div>
          <div style={{ fontSize: 13, color: MUT }}>Wattle Creek Reserve · 16 players · 90 minutes · 2 days to Harbour Rovers</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Team talk', 'Edit my part', 'Record'].map(l => (
            <button key={l} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
          ))}
          <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Start session</button>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Adjust tonight</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
          {ADJUST_TONIGHT.map(a => (
            <div key={a.ini} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: `1px solid ${LN}`, borderRadius: 999, padding: '4px 10px 4px 6px' }}>
              <Ini ini={a.ini} color={ROSE}/>
              <span style={{ fontSize: 12, color: MUT }}>{a.note}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>4 drills · tap for full set-up</div>
        {TONIGHT_DRILLS.map((d, i) => (
          <Card key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', alignItems: 'stretch' }}>
              <div style={{ background: GD, padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{d.time}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{d.dur}</div>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: G2, marginBottom: 2 }}>{d.focus}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{d.title}</div>
                <div style={{ fontSize: 12, color: MUT }}>Why: {d.why}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                  {[d.who, d.size, d.kit].map(tag => <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: G, background: PALE, borderRadius: 999, padding: '1px 7px' }}>{tag}</span>)}
                </div>
                {d.adj && <div style={{ marginTop: 4, fontSize: 11, fontWeight: 700, color: ROSE }}>{d.adj}</div>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ overflowY: 'auto', padding: '16px 28px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Why this plan</div>
        <div style={{ fontSize: 13, color: MUT }}>What growth checks, the warm-up log and the vests showed</div>
        {WHY_PLAN.map(w => (
          <Card key={w.n}>
            <div style={{ display: 'flex', gap: 10, padding: '12px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{w.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{w.t}</div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4 }}>{w.d}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: G2, marginTop: 4 }}>{w.note}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── F4/F4e — Fitness coach tab on Match day ──────────────────────────────────

const MATCH_PLAYERS = [
  { ini: 'KR', name: 'Kai',  note: 'Tight hamstring', action: 'Test it in the warm-up with three hard strides.', wellness: 3.3 },
  { ini: 'NO', name: 'Noah', note: 'Sore knees',      action: 'No long sprints.',                                wellness: 3.8 },
  { ini: 'MT', name: 'Mia',  note: 'Heavy legs',      action: 'Stick to the plan: first half only.',             wellness: 3.3 },
  { ini: 'EB', name: 'Ella', note: 'Low 3 days',      action: 'Have a quiet word before the warm-up.',           wellness: 2.3 },
]

const SLIDES = ['Legs and energy today', 'Lighter Tuesdays worked', 'The late-game fade', 'Growing players, careful sprints', 'Three things today']

export function FitnessMatchTab({ empty }: { empty: boolean }) {
  const [slideIdx, setSlideIdx] = useState(0)

  if (empty) return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px' }}>
      <div style={{ maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Fitness coach · Match day</div>
        <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: G, lineHeight: 1.5 }}>No game this week. When the next fixture arrives, you will see who should play fewer minutes and the warm-up for the day.</div>
        <Card><div style={{ padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>A bye week is a good time for a measuring session.</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a session</button>
            <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>See the fixtures</button>
          </div>
        </div></Card>
      </div>
    </div>
  )

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', overflow: 'hidden' }}>
      <div style={{ overflowY: 'auto', padding: '16px 20px 20px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginBottom: 2 }}>vs Harbour Rovers</div>
          <div style={{ fontSize: 13, color: MUT }}>Sat 6 Jun · 9:30 am · home · kick-off in 2 h 15 min</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ height: 36, padding: '0 14px', borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 700, color: G }}>3 of 5 ready</div>
          {['Load limits', 'Record'].map(l => (
            <button key={l} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Fitness talk · 5 slides · 2 min 15 s</div>
        <Card>
          <div style={{ padding: '10px 14px', background: GD, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>SAY THIS · {slideIdx + 1} of {SLIDES.length}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setSlideIdx(i => Math.max(0, i - 1))} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>‹</button>
              <button onClick={() => setSlideIdx(i => Math.min(SLIDES.length - 1, i + 1))} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>›</button>
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>{SLIDES[slideIdx]}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {SLIDES.map((s, i) => (
                <button key={s} onClick={() => setSlideIdx(i)} style={{ flex: 1, height: 4, borderRadius: 2, border: 'none', background: i === slideIdx ? GD : LN, cursor: 'pointer', padding: 0 }}/>
              ))}
            </div>
          </div>
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 10 }}>
            <div style={{ background: PALE, borderRadius: 8, padding: '6px 10px', flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: G, letterSpacing: '0.07em' }}>WENT WELL</div>
              <div style={{ fontSize: 12, color: G2 }}>Lighter Tuesdays worked +14%</div>
            </div>
            <div style={{ background: '#fdf4f4', borderRadius: 8, padding: '6px 10px', flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: ROSE, letterSpacing: '0.07em' }}>NOT SO GOOD</div>
              <div style={{ fontSize: 12, color: ROSE }}>Late-game fade −22%</div>
            </div>
          </div>
          <div style={{ padding: '8px 14px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8 }}>
            <button style={{ height: 36, flex: 1, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Edit talk</button>
            <button style={{ height: 36, flex: 1, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>START</button>
          </div>
        </Card>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Player check · 14 of 16 done · avg 3.6</div>
        <div style={{ background: PALE, borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: G }}>
          <span>Not filled in: Zoe and Sam</span>
          <button style={{ fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>Remind</button>
        </div>
      </div>

      <div style={{ overflowY: 'auto', padding: '16px 28px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Watch these four today</div>
        {MATCH_PLAYERS.map(p => (
          <Card key={p.ini}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: `1px solid ${LN}` }}>
              <Ini ini={p.ini} color={p.wellness < 3 ? ROSE : G}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
              </div>
              <div style={{ textAlign: 'right' as const }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: p.wellness < 3 ? ROSE : WARN }}>{p.wellness}</div>
                <div style={{ fontSize: 10, color: MUT }}>out of 5</div>
              </div>
            </div>
            <div style={{ padding: '10px 14px', fontSize: 13, color: G, background: PALE }}>{p.action}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── F5 — Fitness section on Review screen ────────────────────────────────────

export function FitnessReviewSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Load and fitness this week</div>

      {[
        { min: 'Min 44', label: 'Late-game fade',              note: 'Five players ran a quarter less in the last 10 min',   pct: '−24%', color: ROSE },
        { min: 'Min 25', label: 'Growing players over sprint cap', note: 'Noah and Zoe 30% over their safe limit',           pct: '+30%', color: ROSE },
        { min: 'Season', label: 'Team load above plan',        note: 'Two weeks running',                                   pct: '118%', color: WARN },
      ].map(r => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: MUT, width: 50, flexShrink: 0 }}>{r.min}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.label}</div>
            <div style={{ fontSize: 11, color: MUT }}>{r.note}</div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, color: r.color }}>{r.pct}</span>
        </div>
      ))}

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Load flags</div>
      {[
        { ini: 'NO', name: 'Noah Okafor', label: 'Sprints', note: '26 this week, safe limit 20. Partial data (vest stopped).', color: ROSE },
        { ini: 'ZH', name: 'Zoe Hartley', label: 'Sprints', note: '24 this week, safe limit 20. Growth spurt.', color: ROSE },
        { ini: 'MT', name: 'Mia Tran',    label: 'Load',    note: 'Highest distance: 6.1 km. Light on Thursday.', color: WARN },
      ].map(f => (
        <div key={f.ini} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10 }}>
          <Ini ini={f.ini} color={f.color}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{f.name} · {f.label}</div>
            <div style={{ fontSize: 11, color: MUT }}>{f.note}</div>
          </div>
        </div>
      ))}

      <button style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Open Thursday's fitness block →</button>
    </div>
  )
}
