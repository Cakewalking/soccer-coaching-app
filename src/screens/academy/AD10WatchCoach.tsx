// AD10-WatchCoach: Academy owner: watching a filmed session with a coach, timed notes, the coach’s own view beside yours, and one thing to try.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { BALL_ROLLING_FROM_FILM } from './notYet'

export default function AD10WatchCoach() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Sofia Marin</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Foundation · Wednesday 3 June · 50 minutes · filmed on the tablet</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="ADC15-MySession" style={S.more}>Sofia’s own view</Tap>
          <Tap say="Sofia can see your notes and the three moments. Nobody else can." style={S.primary}>Send to Sofia</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 360px' }}>
        <section aria-label="The session" style={{ ...S.tile, gap: 10 }}>
          <Tap say="The clip plays." aria-label="Play: Foundation · Wednesday 3 June" style={{ flex: 'none', height: 300, borderRadius: 14, background: 'linear-gradient(160deg,#1c3a33,#2f5d50)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#ffffff' }}>
            <span style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 5l11 7-11 7z" />
              </svg>
            </span>
            <span style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 13, fontWeight: 700 }}>Foundation · Wednesday 3 June</span>
            <span style={{ position: 'absolute', right: 12, bottom: 10, fontSize: 12 }}>50:00</span>
          </Tap>
          {/* How long each part ran is timed from the film. That counting is not built yet, so it stays hidden until the switch is on. */}
          {BALL_ROLLING_FROM_FILM && (
            <>
              <div role="img" aria-label="Session shape: arrival game, skill practice, skill game, game" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <span style={{ flex: '14', height: 26, borderRadius: 6, background: '#cfe3da', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>Arrival</span>
                <span style={{ flex: '34', height: 26, borderRadius: 6, background: '#f4e6e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>Practice</span>
                <span style={{ flex: '28', height: 26, borderRadius: 6, background: '#cfe3da', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>Skill game</span>
                <span style={{ flex: '24', height: 26, borderRadius: 6, background: '#cfe3da', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>Game</span>
              </div>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Practice ran 17 minutes of 50. Your shape allows about 12.</span>
            </>
          )}
          <Tap say="Jumps to 4:10 in the film." style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 50, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
            <span style={{ ...S.num, flex: 'none', width: 48, fontWeight: 700 }}>4:10</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Arrival game</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Every child on a ball inside a minute</span>
            </span>
          </Tap>
          <Tap say="Jumps to 18:30 in the film." style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 50, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
            <span style={{ ...S.num, flex: 'none', width: 48, fontWeight: 700 }}>18:30</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Skill practice</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Two queues of seven. About a third of the group was waiting</span>
            </span>
          </Tap>
          <Tap say="Jumps to 31:00 in the film." style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 50, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
            <span style={{ ...S.num, flex: 'none', width: 48, fontWeight: 700 }}>31:00</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Skill game</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Great question: “Where was the space?”</span>
            </span>
          </Tap>
        </section>
        <aside aria-label="Your notes" style={{ ...S.tile, gap: 8 }}>
          <h2 style={S.h2}>How it went</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 70px 70px', gap: '6px 8px', alignItems: 'center', fontSize: 14 }}>
            <span />
            <span style={S.th}>You</span>
            <span style={S.th}>Sofia</span>
            <span>Ball rolling</span>
            <span role="img" aria-label="3 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
            </span>
            <span role="img" aria-label="4 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
            </span>
            <span>Clear, short words</span>
            <span role="img" aria-label="4 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
            </span>
            <span role="img" aria-label="3 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
            </span>
            <span>Every child noticed</span>
            <span role="img" aria-label="5 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
            </span>
            <span role="img" aria-label="4 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
            </span>
            <span>Followed the plan</span>
            <span role="img" aria-label="3 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
            </span>
            <span role="img" aria-label="3 of 5" style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#2f6252' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', border: '1.5px solid #c5c8c4' }} />
            </span>
          </div>
          <div style={{ borderRadius: 12, background: '#f4e6e6', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>One thing to try</strong>
            <br />
            Split skill practice into three small groups, so nobody waits.
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Keep doing</strong>
            <br />
            Asking, not telling. The children answered every time.
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Sofia fills in her own view first. You see both side by side, then talk. This is for coaching the coach, never for pay.</span>
        </aside>
      </main>
    </>
  )
}
