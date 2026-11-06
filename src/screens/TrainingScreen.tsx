import { DATA, COLOR_MAP, type Role } from '../data'

type Screen = 'home' | 'training' | 'matchday' | 'teamtalk'

interface Props {
  role: Role
  onNav: (s: Screen) => void
}


function DrillDiagram({ tag }: { tag: string }) {
  const bg = COLOR_MAP[tag] ?? '#cbbeb5'
  const isFocus1 = tag === 'Focus 1'
  const isFocus2 = tag === 'Focus 2'
  const isWarmup = tag === 'Warm-up'

  return (
    <div style={{
      width: 72, height: 56, borderRadius: 10, flex: 'none',
      background: bg, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: 0.9,
    }}>
      <svg width="60" height="46" viewBox="0 0 60 46" fill="none" aria-hidden="true">
        {/* Pitch outline */}
        <rect x="2" y="4" width="56" height="38" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
        {isWarmup && <>
          {/* Rondo circle formation */}
          {[0,60,120,180,240,300].map((a,i) => (
            <circle key={i} cx={30 + 14 * Math.cos(a * Math.PI / 180)} cy={23 + 10 * Math.sin(a * Math.PI / 180)} r="3" fill="rgba(255,255,255,0.8)" />
          ))}
          <circle cx="30" cy="23" r="3" fill="rgba(255,255,255,0.4)" />
        </>}
        {isFocus1 && <>
          {/* Two teams pressing */}
          <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="22" cy="18" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="12" cy="30" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="22" cy="34" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="38" cy="12" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="48" cy="18" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="38" cy="30" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="48" cy="34" r="3" fill="rgba(255,255,255,0.4)" />
          <line x1="30" y1="4" x2="30" y2="42" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        </>}
        {isFocus2 && <>
          {/* Half-pitch with zones */}
          <line x1="2" y1="19" x2="58" y2="19" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="2" y1="29" x2="58" y2="29" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />
          {[10,20,30,40,50].map((x,i) => (
            <circle key={i} cx={x} cy={i % 2 === 0 ? 11 : 24} r="2.5" fill="rgba(255,255,255,0.8)" />
          ))}
          {[10,30,50].map((x,i) => (
            <circle key={i} cx={x} cy="37" r="2.5" fill="rgba(255,255,255,0.4)" />
          ))}
        </>}
        {tag === 'Recovery' && <>
          {/* Circle formation */}
          {[0,45,90,135,180,225,270,315].map((a,i) => (
            <circle key={i} cx={30 + 16 * Math.cos(a * Math.PI / 180)} cy={23 + 12 * Math.sin(a * Math.PI / 180)} r="2.5" fill="rgba(255,255,255,0.7)" />
          ))}
        </>}
      </svg>
    </div>
  )
}

export default function TrainingScreen({ role, onNav }: Props) {
  const d = DATA[role]
  const totalMins = d.drills.reduce((s, x) => s + x.mins, 0)
  const focus = d.focus.slice(0, 3)

  return (
    <>
      {/* Session info row (below the shared app bar sub-tabs) */}
      <div style={{ flex: 'none', background: '#ffffff', borderBottom: '1px solid #e9eae8', padding: '14px 32px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f', lineHeight: '28px' }}>
              Training tonight · {d.start}–{d.end}
            </h1>
            <div style={{ fontSize: 13, lineHeight: '18px', marginTop: 2, color: '#6f7f7b' }}>
              Wattle Creek Oval · 16 players · {totalMins} minutes · 2 days to Harbour Rovers
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 'none' }}>
            <button onClick={() => onNav('teamtalk')} style={{
              height: 36, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4',
              background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>
              Team talk
            </button>
            <button style={{
              height: 36, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4',
              background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Edit plan</button>
            <button style={{
              height: 36, padding: '0 16px', borderRadius: '999px', border: 0,
              background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              Start session
            </button>
          </div>
        </div>
      </div>

      {/* Body: left sidebar + main drill list */}
      <main style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left sidebar */}
        <aside style={{
          width: 280, flex: 'none', background: '#f7f8f7',
          borderRight: '1px solid #e9eae8', padding: '20px 20px 24px',
          display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto',
        }}>
          {/* Why this plan */}
          <section>
            <h2 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#10211f' }}>Why this plan</h2>
            <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>
              Three things to fix from Saturday vs Ironbark United
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {focus.map((f, i) => (
                <button key={i} onClick={() => onNav('teamtalk')} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 0', border: 0, borderTop: '1px solid #e9eae8', background: 'transparent',
                  textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <span style={{
                    flex: 'none', width: 22, height: 22, borderRadius: '999px',
                    background: '#40826d', color: '#ffffff', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                  }}>{i + 1}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 14, lineHeight: '20px', fontWeight: 600, color: '#10211f' }}>{f.title}</span>
                    <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#4a5a57', marginTop: 2 }}>
                      1 drill tonight · clip and data
                    </span>
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
                </button>
              ))}
            </div>
          </section>

          {/* Adjust tonight */}
          <section>
            <h2 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700, color: '#10211f' }}>Adjust tonight</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {d.players.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none',
                }}>
                  <span style={{
                    flex: 'none', width: 32, height: 32, borderRadius: '999px',
                    background: '#c39797', color: '#10211f', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{p.ini}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{p.name.split(' ')[0]}</span>
                    <span style={{ display: 'block', fontSize: 12, lineHeight: '17px', color: '#4a5a57', marginTop: 1 }}>{p.todo}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main: drill list */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0 32px 24px' }}>
          {/* Timeline bar */}
          <div style={{ padding: '20px 0 16px', borderBottom: '1px solid #e9eae8', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{d.drills.length} drills</span>
              <div style={{ display: 'flex', gap: 3, flex: 1 }}>
                {d.drills.map((x, i) => (
                  <div key={i} title={x.name} style={{ flex: `${x.mins} 1 0`, height: 10, borderRadius: 5, background: COLOR_MAP[x.tag] }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: '#4a5a57', fontWeight: 500 }}>Tap a drill for the full set-up</span>
            </div>
          </div>

          {/* Drills */}
          {d.drills.map((x, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, padding: '20px 0',
              borderBottom: '1px solid #e9eae8', alignItems: 'flex-start',
            }}>
              {/* Time */}
              <div style={{ flex: 'none', width: 44, paddingTop: 2 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{x.startTime ?? ''}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 2 }}>{x.mins} min</div>
              </div>

              {/* Diagram */}
              <DrillDiagram tag={x.tag} />

              {/* Info */}
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                    background: COLOR_MAP[x.tag], color: x.tag === 'Warm-up' || x.tag === 'Recovery' ? '#10211f' : '#ffffff',
                    borderRadius: 6, padding: '2px 8px',
                  }}>{x.tag}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#10211f', lineHeight: '22px', marginBottom: 4 }}>{x.name}</div>
                {x.why && (
                  <div style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57', marginBottom: 6 }}>
                    <strong style={{ color: '#10211f' }}>Why:</strong> {x.why}
                  </div>
                )}
                {x.format && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {x.format.map((f, j) => (
                      <span key={j} style={{
                        fontSize: 13, fontWeight: 500, color: '#4a5a57',
                        background: '#f7f8f7', border: '1px solid #e9eae8', borderRadius: 6, padding: '2px 8px',
                      }}>{f}</span>
                    ))}
                  </div>
                )}
                {x.playerNote && (
                  <div style={{
                    marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#e8f2ee', color: '#2f6252', borderRadius: 8, padding: '4px 10px',
                    fontSize: 13, fontWeight: 600,
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    {x.playerNote}
                  </div>
                )}
              </div>

              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', marginTop: 4 }}><path d="M9 6l6 6-6 6"/></svg>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
