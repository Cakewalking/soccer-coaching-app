import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

type View = 'main' | 'why' | 'ask' | 'whatituses' | 'whatworked'

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionHead({ label }: { label: string }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>{label}</div>
}

function BackBtn({ onBack, label = 'Back to suggestions' }: { onBack: () => void; label?: string }) {
  return (
    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 14px 0 10px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      {label}
    </button>
  )
}

function EvidenceBadge({ level }: { level: 'strong' | 'good' | 'early' }) {
  const map = {
    strong: { label: 'Strong evidence', color: G,    bg: PALE },
    good:   { label: 'Good evidence',   color: G2,   bg: PALE },
    early:  { label: 'Early sign',      color: MUT,  bg: '#f7f7f6' },
  }
  const { label, color, bg } = map[level]
  return <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 999, border: `1px solid ${color}22` }}>{label}</span>
}

function MiniBarChart({ data }: { data: { label: string; value: number; highlight?: boolean }[] }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 70 }}>
      {data.map((d, i) => {
        const h = (d.value / max) * 54
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: d.highlight ? G : INK }}>{d.value}</div>
            <div style={{ width: 28, height: h, background: d.highlight ? G : LN, borderRadius: '4px 4px 0 0' }}/>
            <div style={{ fontSize: 10, color: MUT, whiteSpace: 'nowrap' as const }}>{d.label}</div>
          </div>
        )
      })}
    </div>
  )
}

// ─── SG1 — Main suggestions list ─────────────────────────────────────────────

function MainView({ empty, onWhy, onAsk, onWhatItUses, onWhatWorked }:
  { empty: boolean; onWhy: () => void; onAsk: () => void; onWhatItUses: () => void; onWhatWorked: () => void }) {

  const [card1dismissed, setCard1dismissed] = useState(false)
  const [card3watching, setCard3watching] = useState(false)
  const [toast, setToast] = useState<string|null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Suggested for you</div>
      <div style={{ background: PALE, borderRadius: 16, padding: '24px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: GD, marginBottom: 8 }}>Not enough to go on yet</div>
        <div style={{ fontSize: 14, color: G, lineHeight: 1.6, marginBottom: 16 }}>Suggestions start after your first game. Until then, your plan follows the national curriculum for under 12s. Add a game or record a drill and Clean Sheet starts to tailor it.</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={() => showToast('Opening record screen.')} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add a game</button>
          <button onClick={() => showToast('Opening drill recorder.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Record a drill</button>
        </div>
      </div>
      <SectionHead label="What it will use"/>
      {[
        { n: '1', title: 'Your games', note: 'What keeps happening, not one-offs' },
        { n: '2', title: 'Your training', note: 'Which drills actually worked' },
        { n: '3', title: 'Your notes and taps', note: 'What you saw yourself' },
      ].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
            <div style={{ fontSize: 13, color: MUT }}>{s.note}</div>
          </div>
        </div>
      ))}
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Suggested for you</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>From your last 6 games, 9 recordings, this week's load and your notes</div>
        </div>
        <button onClick={onWhatItUses} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' as const }}>What it uses</button>
        <button onClick={onWhatWorked} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' as const }}>What worked</button>
        <button onClick={onAsk} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' as const }}>Ask a question</button>
      </div>

      {/* Card 1 */}
      {!card1dismissed && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>1</div>
            <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>Still slow to win the ball back in games</div>
            <EvidenceBadge level="strong"/>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 8 }}>BASED ON</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['4 games in a row', 'Training: getting better', 'Your note on Tuesday'].map(tag => (
                <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: G2, background: PALE, padding: '3px 10px', borderRadius: 999 }}>{tag}</span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginTop: 10 }}>In training it has dropped from 6.1 to 4.6 seconds, but in games it's still 7. The drill works. It now needs to look more like a game.</div>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: PALE }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Win it back in 6 seconds, on a bigger pitch</div>
            <div style={{ fontSize: 13, color: G, marginTop: 2 }}>Worked for your team in 3 runs · 25 min · 12 to 16 players</div>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
            <button onClick={onWhy} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Why</button>
            <button onClick={() => setCard1dismissed(true)} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Not relevant</button>
            <button onClick={() => showToast("'Win it back' added to Tuesday.")} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 'auto' }}>Add to Tuesday</button>
          </div>
        </div>
      )}

      {/* Card 2 */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>2</div>
          <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>Fading in the last 15 minutes</div>
          <EvidenceBadge level="good"/>
        </div>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 8 }}>BASED ON</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {['3 of the last 5 games', 'Vests: sprints down 22% late', 'A heavy week'].map(tag => (
              <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: G2, background: PALE, padding: '3px 10px', borderRadius: 999 }}>{tag}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginTop: 10 }}>More running would overload a week with two sessions and a game, and Noah and Zoe are growing fast. Short, flat-out games build the same thing with less load.</div>
        </div>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: PALE }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Small game, 3 rounds of 4 minutes at full effort</div>
          <div style={{ fontSize: 13, color: G, marginTop: 2 }}>Lower load than a running drill · Noah and Zoe do 2 rounds</div>
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
          <button onClick={onWhy} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Why</button>
          <button onClick={() => showToast('Dismissed from suggestions.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Not relevant</button>
          <button onClick={() => showToast("'Small game' added to Tuesday.")} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 'auto' }}>Add to Tuesday</button>
        </div>
      </div>

      {/* Card 3 */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>3</div>
          <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>The left side is hardly used</div>
          <EvidenceBadge level="early"/>
        </div>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 8 }}>BASED ON</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {['2 games only', 'Boots: 18% weaker-foot touches'].map(tag => (
              <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: MUT, background: '#f7f7f6', padding: '3px 10px', borderRadius: 999 }}>{tag}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginTop: 10 }}>Two games isn't enough to change training for. Clean Sheet will say so again if Saturday shows the same thing.</div>
        </div>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: '#fafafa' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: MUT }}>Nothing to change yet</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>One more game makes this a pattern, or not</div>
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
          <button onClick={() => setCard3watching(!card3watching)} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${card3watching ? G : LN}`, background: card3watching ? PALE : '#fff', fontSize: 13, fontWeight: 600, color: card3watching ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{card3watching ? 'Watching ✓' : 'Keep watching'}</button>
          <button onClick={() => showToast('Opening drill suggestion for left-side play.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Suggest a drill anyway</button>
        </div>
      </div>

      {/* Changed since last week */}
      <div>
        <SectionHead label="Changed since last week"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { icon: '↔', label: 'Playing out from the keeper', note: 'Fixed: 72% of goal kicks short. No longer suggested', color: G2 },
            { icon: '↔', label: 'First touch drill swapped', note: 'No real change after 3 runs', color: MUT },
            { icon: '×', label: 'Shadow play', note: 'You said not relevant', color: ROSE },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.color + '18', color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* You decide footer */}
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>You decide</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>These are suggestions, with the reasons shown. Add one, swap it or drop it. What you drop teaches Clean Sheet what you don't want.</div>
        <div style={{ fontSize: 12, color: G, marginTop: 6 }}>Drills come from the library, which is written to the national curriculum for your age group.</div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── SG2 — Why this is suggested ─────────────────────────────────────────────

function WhyView({ onBack }: { onBack: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackBtn onBack={onBack}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Why this is suggested</div>
          <div style={{ fontSize: 13, color: MUT }}>Still slow to win the ball back in games</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => showToast('Opening drill swap.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Swap the drill</button>
          <button onClick={() => showToast("Drill added to Tuesday.")} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add to Tuesday</button>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <EvidenceBadge level="strong"/>
      </div>

      {/* Evidence sections */}
      <div>
        <SectionHead label="In games · seconds to win it back"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
          <MiniBarChart data={[
            { label: '2 May', value: 4 },
            { label: '9 May', value: 5 },
            { label: '16 May', value: 6 },
            { label: '23 May', value: 7, highlight: true },
            { label: '26 May', value: 6, highlight: true },
            { label: '30 May', value: 7, highlight: true },
          ]}/>
          <div style={{ fontSize: 13, color: MUT, marginTop: 10, lineHeight: 1.5 }}>Your usual is 4. Above 6 in each of the last four.</div>
        </div>
      </div>

      <div>
        <SectionHead label="In training · the same measure"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
          <MiniBarChart data={[
            { label: 'Run 1', value: 61 },
            { label: 'Run 2', value: 54 },
            { label: 'Run 3', value: 46, highlight: true },
          ]}/>
          <div style={{ fontSize: 13, color: MUT, marginTop: 10, lineHeight: 1.5 }}>A real improvement over three runs.</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 6, fontStyle: 'italic' }}>Your note, Tuesday</div>
        <div style={{ fontSize: 14, color: INK, lineHeight: 1.5 }}>"Slow to react when we lose it. They watch the ball."</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: G2, background: PALE, padding: '2px 8px', borderRadius: 999 }}>Vests</span>
          Only 3 players sprint in the first 3 seconds after losing it
        </div>
        <button onClick={() => showToast('Opening 6 clips.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: PALE, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          6 clips · Watch
        </button>
      </div>

      {/* What Clean Sheet makes of it */}
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 6 }}>WHAT CLEAN SHEET MAKES OF IT</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.6 }}>The habit is there in a small space. It isn't carrying over to a full pitch.</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.6, marginTop: 6 }}>So the next step is the same drill, made more like a game: bigger area, and goals to attack once they win it.</div>
      </div>

      {/* Why this drill */}
      <div>
        <SectionHead label="Why this drill"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { icon: '↑', label: 'It moves this measure', note: 'It already has, three runs in a row' },
            { icon: '✓', label: 'Right for under 12s', note: "From the curriculum's small-sided games" },
            { icon: '✓', label: 'Fits Tuesday', note: '14 coming, and the load is fine' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 8 }}>Not sure it's right? Swap it. Two other drills check the same thing.</div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── SG3 — Ask Clean Sheet ────────────────────────────────────────────────────

function AskView({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [question, setQuestion] = useState('')
  const [toast, setToast] = useState<string|null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  const exampleQ = "We keep getting caught on the counter after our own corners. What should I run?"

  if (!submitted) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackBtn onBack={onBack}/>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Ask Clean Sheet</div>
      </div>
      <div style={{ fontSize: 14, color: MUT }}>Describe the problem in your own words</div>

      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Type or say it the way you'd tell another coach."
        style={{ height: 120, padding: 14, border: `1px solid ${LN}`, borderRadius: 12, fontFamily: 'inherit', fontSize: 14, color: INK, background: '#fff', resize: 'none', outline: 'none', lineHeight: 1.5 }}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => { setQuestion(exampleQ); setSubmitted(true) }} style={{ height: 44, flex: 1, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Ask
        </button>
        <button onClick={() => showToast('Opening voice input.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>
          Mic
        </button>
      </div>

      <div>
        <SectionHead label="Try asking"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            'Why do we concede late?',
            'What should Mia work on?',
            'A warm-up for 9 players and no goals',
            'Is the pressing drill working?',
          ].map(q => (
            <button key={q} onClick={() => { setQuestion(q); setSubmitted(true) }} style={{ textAlign: 'left' as const, padding: '10px 14px', border: `1px solid ${LN}`, borderRadius: 10, background: '#fff', fontFamily: 'inherit', fontSize: 13, color: G2, fontWeight: 600, cursor: 'pointer' }}>"{q}"</button>
          ))}
        </div>
      </div>

      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 6 }}>Where answers come from</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Only your own team's games, recordings and notes, and the drill library. If there isn't enough to go on, it says so and doesn't guess.</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5, marginTop: 6 }}>It won't rank players, or answer about a child whose parent hasn't agreed.</div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackBtn onBack={onBack}/>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Ask Clean Sheet</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.5, fontStyle: 'italic' }}>
        "{exampleQ}"
      </div>

      {/* What I found */}
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: G, marginBottom: 8 }}>WHAT I FOUND IN YOUR GAMES</div>
        <div style={{ fontSize: 13, color: GD, lineHeight: 1.5, marginBottom: 10 }}>In your last 6 games, 5 counters started from your own corners and 2 led to goals. Each time only Ava stayed back, and nobody stood in front of their striker.</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
          {['6 games', '5 clips', 'Vests: 4 players slow to turn'].map(t => (
            <span key={t} style={{ fontSize: 12, fontWeight: 600, color: G, background: '#fff', padding: '3px 10px', borderRadius: 999, border: `1px solid ${G2}44` }}>{t}</span>
          ))}
        </div>
        <button onClick={() => showToast('Opening 5 clips.')} style={{ marginTop: 10, height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Watch the 5 clips
        </button>
      </div>

      {/* Three drills */}
      <div>
        <SectionHead label="Three drills that fit"/>
        {[
          { n: '1', name: 'Rest defence: two stay, one screens', note: 'Set who stays back before every corner · 12 min · 10 players', tag: 'Teaches the shape' },
          { n: '2', name: 'Corner, then counter game', note: 'Attack a corner, then defend a 3 against 2 the other way · 15 min · 12 players', tag: 'Closest to what happened' },
          { n: '3', name: 'Recovery race', note: 'Sprint back past the ball before the pass is played · 8 min · whole squad', tag: 'Lower load · fits a heavy week' },
        ].map((drill) => (
          <div key={drill.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{drill.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{drill.name}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{drill.note}</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: G2, background: PALE, padding: '2px 8px', borderRadius: 999, marginTop: 6, display: 'inline-block' }}>{drill.tag}</span>
            </div>
            <button onClick={() => showToast(`${drill.name.split(':')[0]} added to Tuesday.`)} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Add</button>
          </div>
        ))}
      </div>

      {/* Follow up */}
      <div style={{ display: 'flex', gap: 10 }}>
        <input defaultValue="" placeholder="Ask a follow-up, or tap the microphone" style={{ flex: 1, height: 44, padding: '0 14px', border: `1px solid ${LN}`, borderRadius: 999, fontFamily: 'inherit', fontSize: 14, color: INK, outline: 'none', background: '#fff' }}/>
        <button onClick={() => showToast('Sending follow-up question.')} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask</button>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── SG4 — What it uses ───────────────────────────────────────────────────────

function WhatItUsesView({ onBack }: { onBack: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const sources = [
    { src: 'Game video',         have: '6 games this season',              use: 'What keeps happening, and where',           on: true },
    { src: 'Training recordings',have: '9 runs of 4 drills',               use: 'Which drills moved their measure',           on: true },
    { src: 'Vests and boots',    have: '15 vests · 16 pairs',              use: 'Load, sprints, touches and which foot',      on: true },
    { src: 'Your notes and taps',have: '14 this term',                     use: 'What you saw that a camera can\'t',          on: true },
    { src: "Who's coming",       have: 'Tuesday: 14',                      use: 'Drills that work with your numbers',         on: true },
    { src: 'Growth and wellness',have: 'Flags only, never the detail',     use: 'Lighter options for players who need them',  on: true },
    { src: "Other clubs' data",  have: 'Never',                            use: "Your team's data stays with your team",      on: false, never: true },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackBtn onBack={onBack}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>What suggestions use</div>
          <div style={{ fontSize: 13, color: MUT }}>Turn any of these off. The suggestion will say what it's missing</div>
        </div>
      </div>

      {/* Sources table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 60px', padding: '8px 14px', borderBottom: `1px solid ${LN}`, gap: 8 }}>
          {['SOURCE', 'YOU HAVE', 'USED FOR', ''].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</div>
          ))}
        </div>
        {sources.map((s, i) => (
          <div key={s.src} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 60px', padding: '12px 14px', borderBottom: i < sources.length - 1 ? `1px solid ${LN}` : 'none', gap: 8, alignItems: 'center', opacity: s.never ? 0.5 : 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{s.src}</div>
            <div style={{ fontSize: 12, color: MUT }}>{s.have}</div>
            <div style={{ fontSize: 12, color: MUT }}>{s.use}</div>
            {s.never
              ? <span style={{ fontSize: 11, fontWeight: 700, color: ROSE }}>Never</span>
              : (
                <div style={{ width: 36, height: 22, borderRadius: 11, background: s.on ? G : LN, position: 'relative' as const, cursor: 'pointer' }}>
                  <div style={{ position: 'absolute' as const, top: 3, [s.on ? 'right' : 'left']: 3, width: 16, height: 16, borderRadius: '50%', background: '#fff' }}/>
                </div>
              )
            }
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>A pattern needs at least 3 games, or 3 runs of a drill. Anything less is shown as an early sign.</div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}

      {/* What it never does */}
      <div>
        <SectionHead label="What it never does"/>
        {[
          { n: '1', title: 'Rank players', note: 'Or compare one child with another' },
          { n: '2', title: 'Change your plan by itself', note: 'It suggests. You add, swap or drop' },
          { n: '3', title: 'Use a child without consent', note: "They're left out of every number" },
        ].map(item => (
          <div key={item.n} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fdf4f4', color: ROSE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* By age */}
      <div>
        <SectionHead label="By age"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { label: 'Under 12', note: 'From your taps and the curriculum. No numbers', badge: 'U', dark: false },
            { label: 'U12 and up', note: 'All of the sources in the table above', badge: '12', dark: true },
          ].map((a, i) => (
            <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < 1 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: a.dark ? G : PALE, color: a.dark ? '#fff' : G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{a.badge}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{a.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{a.note}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => showToast('Restoring 2 dropped suggestions.')} style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>You dropped 2 suggestions this term. Bring them back</button>
      </div>
    </div>
  )
}

// ─── SG5 — What worked ────────────────────────────────────────────────────────

function WhatWorkedView({ empty, onBack, onRecord }: { empty: boolean; onBack: () => void; onRecord: () => void }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackBtn onBack={onBack}/>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>What worked</div>
      </div>
      <div style={{ background: PALE, borderRadius: 16, padding: '24px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: GD, marginBottom: 8 }}>No drill recorded more than once yet</div>
        <div style={{ fontSize: 14, color: G, lineHeight: 1.6, marginBottom: 16 }}>Record a drill three times with the same set-up and Clean Sheet can tell you whether it's working, and stop suggesting the ones that aren't.</div>
        <button onClick={onRecord} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record a drill</button>
      </div>
      <SectionHead label="Then you'll see"/>
      {[
        { n: '1', title: 'What moved', note: 'And whether it\'s a real change' },
        { n: '2', title: 'Whether it shows in games', note: 'The same measure on Saturday' },
        { n: '3', title: 'What happens next', note: 'Keep, make harder, or swap' },
      ].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
            <div style={{ fontSize: 13, color: MUT }}>{s.note}</div>
          </div>
        </div>
      ))}
    </div>
  )

  const rows = [
    { drill: 'Play out from the keeper, 6 v 4', runs: 4, moved: 'Goal kicks short: 48% to 72%', verdict: 'Worked',           next: 'Also in games. No longer suggested' },
    { drill: 'Win it back in 6 seconds',         runs: 3, moved: 'To win it back: 6.1 s to 4.6 s', verdict: 'Worked',        next: 'Not yet in games. Made more game-like' },
    { drill: 'First touch away from pressure',   runs: 3, moved: 'First touches kept: 61% to 62%', verdict: 'No real change', next: 'Swapped for Receive and turn' },
    { drill: 'Rondo, 5 against 2',               runs: 1, moved: 'One run only',                   verdict: 'Too early',      next: 'Run it twice more' },
  ]

  const verdictColor = (v: string) => v === 'Worked' ? G : v === 'No real change' ? ROSE : MUT

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackBtn onBack={onBack}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>What worked</div>
          <div style={{ fontSize: 13, color: MUT }}>Drills you've recorded more than once, and whether they moved anything</div>
        </div>
        <button onClick={onRecord} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record a drill</button>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '10px 14px' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>For your team · </span>
        <span style={{ fontSize: 14, color: G2, fontWeight: 600 }}>2 of 4 worked</span>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 130px 100px 1fr', padding: '8px 14px', borderBottom: `1px solid ${LN}`, gap: 8 }}>
          {['DRILL', 'RUNS', 'WHAT MOVED', 'VERDICT', 'WHAT HAPPENS NEXT'].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={r.drill} style={{ display: 'grid', gridTemplateColumns: '1fr 50px 130px 100px 1fr', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${LN}` : 'none', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.drill}</div>
            <div style={{ fontSize: 13, color: INK }}>{r.runs}</div>
            <div style={{ fontSize: 12, color: MUT }}>{r.moved}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: verdictColor(r.verdict) }}>{r.verdict}</div>
            <div style={{ fontSize: 12, color: MUT }}>{r.next}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>"Worked" means the change was bigger than the usual up and down, in at least 3 runs with the same set-up.</div>

      {/* What it has learned */}
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>What it has learned about U12 Sam</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Small-sided games with a clear rule work for this group. Unopposed pattern drills haven't.</div>
      </div>

      {/* Training then games */}
      <div>
        <SectionHead label="Training, then games"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { n: '1', label: 'Worked in training and games', drill: 'Playing out from the keeper' },
            { n: '2', label: 'Worked in training only',      drill: 'Winning the ball back' },
          ].map((item, i) => (
            <div key={item.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < 1 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 12, color: MUT }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.drill}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>A drill that only works in training is made more like a game before it's dropped.</div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SuggestionsScreen({ empty = false, onRecord }: { empty?: boolean; onRecord?: () => void }) {
  const [view, setView] = useState<View>('main')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {view === 'main'       && <MainView empty={empty} onWhy={() => setView('why')} onAsk={() => setView('ask')} onWhatItUses={() => setView('whatituses')} onWhatWorked={() => setView('whatworked')}/>}
      {view === 'why'        && <WhyView onBack={() => setView('main')}/>}
      {view === 'ask'        && <AskView onBack={() => setView('main')}/>}
      {view === 'whatituses' && <WhatItUsesView onBack={() => setView('main')}/>}
      {view === 'whatworked' && <WhatWorkedView empty={empty} onBack={() => setView('main')} onRecord={onRecord ?? (() => setView('main'))}/>}
    </div>
  )
}
