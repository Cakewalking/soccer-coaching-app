// AD8-SessionQuality: Academy owner: whether sessions follow the plan, notes are written and the ball is rolling, by coach, with how sure each number is.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import type { CSSProperties } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { BALL_ROLLING_FROM_FILM } from './notYet'

// Amber is proof only: Strong means the number was counted from film of every session. Estimate is white with a dashed edge.
const chip: CSSProperties = { flex: 'none', height: 22, padding: '0 8px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', color: '#10211f' }
function Proof({ kind }: { kind: 'strong' | 'estimate' }) {
  return kind === 'strong' ? <span style={{ ...chip, background: '#f4c95d' }}>Strong</span> : <span style={{ ...chip, background: '#ffffff', border: '1px dashed #8a9794' }}>Estimate</span>
}
// One coach's ball rolling. Counting it from film is not built yet, so until the switch is on every coach reads "Not filmed".
function Rolling({ share, proof }: { share: string; proof: 'strong' | 'estimate' }) {
  if (!BALL_ROLLING_FROM_FILM) return <span style={{ color: '#4a5a57' }}>Not filmed</span>
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ ...S.num, fontWeight: 700 }}>{share}</span>
      <Proof kind={proof} />
    </span>
  )
}

export default function AD8SessionQuality() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Session quality</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>This week · 15 sessions · 7 filmed</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="RC8-HowWeMeasure" style={S.more}>How we measure</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="By coach" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>By coach</h2>
            <span style={S.cap}>Tap a coach to watch a session</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr 0.8fr 0.8fr 1.5fr 1fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>Coach</span>
            <span style={S.th}>Sessions</span>
            <span style={S.th}>Followed the plan</span>
            <span style={S.th}>Notes written</span>
            <span style={S.th}>Ball rolling</span>
            <span style={S.th}>Players up a step</span>
          </div>
          <Tap to="AD10-WatchCoach" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr 0.8fr 0.8fr 1.5fr 1fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RW</span>
              Reece Whitlam
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>5</span>
            <span>5 of 5</span>
            <span>5 of 5</span>
            <Rolling share="71%" proof="strong" />
            <span style={{ ...S.num, fontWeight: 700 }}>27 of 34</span>
          </Tap>
          <Tap to="AD10-WatchCoach" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr 0.8fr 0.8fr 1.5fr 1fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>SM</span>
              Sofia Marin
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>4</span>
            <span>3 of 4</span>
            <span>3 of 4</span>
            <Rolling share="64%" proof="estimate" />
            <span style={{ ...S.num, fontWeight: 700 }}>22 of 30</span>
          </Tap>
          <Tap to="AD10-WatchCoach" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr 0.8fr 0.8fr 1.5fr 1fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>BC</span>
              Ben Castellano
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>2</span>
            <span>2 of 2</span>
            <span>2 of 2</span>
            <span style={{ color: '#4a5a57' }}>Not filmed</span>
            <span style={{ ...S.num, fontWeight: 700 }}>12 of 16</span>
          </Tap>
          <Tap to="AD10-WatchCoach" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr 0.8fr 0.8fr 1.5fr 1fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>DO</span>
              You · one-on-ones
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>4</span>
            <span>Own plans</span>
            <span>4 of 4</span>
            <span style={{ color: '#4a5a57' }}>Not filmed</span>
            <span style={{ ...S.num, fontWeight: 700 }}>6 of 8</span>
          </Tap>
          {BALL_ROLLING_FROM_FILM && (
            <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
              <Proof kind="strong" />
              {' means every session was filmed and counted. '}
              <Proof kind="estimate" />
              {' means some were, so the number may move.'}
            </div>
          )}
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Ball rolling is the share of the session where players are on the ball or in a game, counted from film. Players up a step is this term, from the coach’s own notes.</span>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          {BALL_ROLLING_FROM_FILM && (
            <section aria-label="Your target" style={{ ...S.tile, gap: 6 }}>
              <h2 style={S.h2}>Your target</h2>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <strong style={{ ...S.num, fontSize: 30, lineHeight: '36px' }}>65%</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>of each session with the ball rolling</span>
              </span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>You set this in How we coach. It is your own target, not a standard.</span>
            </section>
          )}
          <section aria-label="Worth a look" style={{ ...S.tile, gap: 6, flexGrow: 1, borderTop: '4px solid #c39797' }}>
            <h2 style={S.h2}>Worth a look</h2>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>9 minutes in a queue</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced, Thursday · the finishing drill had one goal for 20 players</span>
            </span>
            <Tap say="The clip plays." aria-label="Play: Advanced · finishing drill" style={{ flex: 'none', height: 120, borderRadius: 14, background: 'linear-gradient(160deg,#1c3a33,#2f5d50)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#ffffff' }}>
              <span style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 5l11 7-11 7z" />
                </svg>
              </span>
              <span style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 13, fontWeight: 700 }}>Advanced · finishing drill</span>
              <span style={{ position: 'absolute', right: 12, bottom: 10, fontSize: 12 }}>0:40</span>
            </Tap>
            <Tap to="AD10-WatchCoach" style={{ ...S.more, alignSelf: 'flex-start' }}>Watch with Reece</Tap>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A clip is a prompt for a chat. It is never sent to families.</span>
          </section>
        </div>
      </main>
    </>
  )
}
