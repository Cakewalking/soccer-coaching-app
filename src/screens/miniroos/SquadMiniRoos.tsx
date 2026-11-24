import { useState } from 'react'
import { goSetup } from '../sandbox/sandboxNav'

import { PLAYERS, type Player, type Avail } from './squadData'
import { saveMiniGoal, useMiniGoal } from '../clubflows/flowStore'
import { demoToast } from '../demoToast'
import PlayerProfileMiniRoos from './PlayerProfileMiniRoos'
export { PLAYERS }

function availStyle(a: Avail) {
  if (a === 'yes')     return { bg: '#40826d', color: '#fff',    label: 'Yes'      }
  if (a === 'maybe')   return { bg: '#e8cfcf', color: '#10211f', label: 'Maybe'    }
  if (a === 'away')    return { bg: '#e9eae8', color: '#4a5a57', label: 'Away'     }
  return                      { bg: '#f0f1ef', color: '#5c6b67', label: 'No reply' }
}

const Check = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
)

export default function SquadMiniRoos({ empty, onSeasonNotes }: { empty?: boolean; onSeasonNotes?: () => void }) {
  const [sel, setSel] = useState<Player>(PLAYERS[7])
  const [profile, setProfile] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const selFirst = sel.name.split(' ')[0], goal = useMiniGoal(selFirst)   // a goal saved on GP7-MiniGoal: words only, with a tick box for the coach

  if (empty) {
    return (
      <div style={{ flexGrow: 1, padding: '28px 32px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 500 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Squad</h1>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>No players yet</span>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24, marginBottom: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Players appear here once registered</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6, marginBottom: 16 }}>The director or coordinator registers players to the club. Each player then gets game notifications and their turn in goal and as captain is tracked automatically.</div>
            <button onClick={() => goSetup('players', 'Opening the add player form.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>+ Add a player</button>
          </div>
        </div>
        {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
      </div>
    )
  }

  const tabBar = (
    <div style={{ flex: 'none', padding: '14px 28px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Squad</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>10 players · U9 Tom · 7 coming Saturday, 1 maybe, 1 away, 1 to answer</span>
        <div style={{ flexGrow: 1 }} />
        <button onClick={() => showToast('Reminder sent to the 1 family who hasn\'t replied.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Remind 1 family</button>
        <button onClick={() => goSetup('players', 'Opening the add player form.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ Add a player</button>
      </div>
    </div>
  )


  if (profile) return <PlayerProfileMiniRoos ini={profile} onPick={setProfile} onBack={() => setProfile(null)} onSeasonNotes={onSeasonNotes} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>

      {tabBar}

      {/* Grid + sidebar */}
      <div style={{ flexGrow: 1, minHeight: 0, padding: '0 28px 0', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, overflow: 'hidden' }}>

        {/* Player grid */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', paddingBottom: 48 }}>
          <div style={{ flex: 'none', fontSize: 12, color: '#4a5a57', marginBottom: 10 }}>Ticks show who has had a turn in goal and as captain this term</div>
          <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, alignContent: 'start' }}>
            {PLAYERS.map(p => {
              const av = availStyle(p.avail)
              const active = sel.ini === p.ini
              return (
                <button key={p.ini} onClick={() => setSel(p)} style={{
                  display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px',
                  background: active ? '#eef5f2' : '#fff',
                  border: `1px solid ${active ? '#40826d' : '#c5c8c4'}`,
                  borderRadius: 14, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#e8cfcf', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: '#4a5a57' }}>{p.note}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: av.bg, color: av.color }}>Sat: {av.label}</span>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: 12, fontWeight: 600, background: p.hadGoal ? '#eef5f2' : '#f0f1ef', color: p.hadGoal ? '#2f6252' : '#6f7f7b', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {p.hadGoal && <Check />}Goal
                    </span>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: 12, fontWeight: 600, background: p.hadCaptain ? '#eef5f2' : '#f0f1ef', color: p.hadCaptain ? '#2f6252' : '#6f7f7b', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {p.hadCaptain && <Check />}Captain
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto', paddingBottom: 48 }}>
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flex: 'none', width: 40, height: 40, borderRadius: '999px', background: '#e8cfcf', color: '#10211f', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sel.ini}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{sel.name}</div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>{sel.note === 'New this term' ? 'First term' : 'Second term'} · plays anywhere</div>
              </div>
            </div>
            <div style={{ background: '#eef5f2', borderRadius: 10, padding: '10px 12px', fontSize: 13, lineHeight: '18px', color: '#1f4a3e' }}>
              <span style={{ fontWeight: 700 }}>What helps {sel.name.split(' ')[0]}:</span> {sel.helpNote}
            </div>
            {sel.history.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: '1px solid #e9eae8' }}>
                <span style={{ flex: 'none', width: 20, height: 20, borderRadius: '999px', background: '#f0f1ef', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5c6b67' }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{h.label}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57' }}>{h.value}</div>
                </div>
              </div>
            ))}
            {goal && (
              <button role="checkbox" aria-checked={!!goal.done} onClick={() => { saveMiniGoal(selFirst, { ...goal, done: !goal.done }); if (!goal.done) demoToast(`Well done sent to ${selFirst} and the family. Pick the next one together.`) }} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '8px 0 0', border: 0, borderTop: '1px solid #e9eae8', background: 'none', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', color: '#10211f' }}>
                <span style={{ flex: 'none', width: 26, height: 26, borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(goal.done ? { background: '#2f6252', color: '#fff' } : { border: '2px solid #8a9794', background: '#fff' }) }}>{goal.done && <Check />}</span>
                <span><span style={{ display: 'block', fontSize: 13, fontWeight: 700 }}>Goal: {goal.goal}</span><span style={{ display: 'block', fontSize: 12, color: '#4a5a57' }}>{goal.done ? 'Ticked' : goal.how}</span></span>
              </button>
            )}
          </div>
          <button onClick={() => setProfile(sel.ini)} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Open {sel.name.split(' ')[0]}’s profile</button>
          <button onClick={() => showToast(`Message started to ${sel.name.split(' ')[0]}’s family.`)} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Message {sel.name.split(' ')[0]}’s family</button>
          <button onClick={() => showToast(`Note added for ${sel.name.split(' ')[0]}.`)} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add a note</button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #e9eae8', padding: '10px 28px', background: '#fff' }}>
        <span style={{ fontSize: 13, color: '#4a5a57' }}>No ratings, rankings or running numbers at this age. Just who is here, who has had a turn, and what helps each child.</span>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
