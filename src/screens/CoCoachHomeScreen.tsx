import { useState } from 'react'
import { AskLine } from './HomeScreen'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function CoCoachHomeScreen({ empty, onNav, onAsk, askQuestions }: { empty?: boolean; onNav?: (s: string) => void; onAsk?: () => void; askQuestions?: string[] }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  if (empty) {
    return (
      <div style={{ flexGrow: 1, padding: '28px 32px', boxSizing: 'border-box' as const, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Hi Jess</div>
          <div style={{ fontSize: 14, color: MUT, marginTop: 2 }}>U12 Sam · shared coaching · Sam hasn't invited you yet</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>Waiting for Sam to send your invite</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>Once Sam invites you, you'll share training plans, match-day jobs and hand-over notes after each session.</div>
        </div>
      </div>
    )
  }

  const PLAN = [
    { time: '5:45', label: '11+ Kids warm-up', note: '15 min · Priya leads' },
    { time: '6:00', label: 'Warm-up rondo, 5 v 2', note: '10 min · Kai passing only' },
    { time: '6:10', label: 'Win it back in 6 seconds', note: '25 min · Noah and Zoe 3 sprints' },
    { time: '6:35', label: 'Small game, tight shape', note: '30 min · focus 2' },
    { time: '7:05', label: 'Cool-down and pain check', note: '10 min' },
  ]

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AskLine teamName="U12 Sam" questions={askQuestions ?? []} onAsk={onAsk} roleLabel="co-coach" />
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px 36px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Hi Jess</div>
          <div style={{ fontSize: 14, color: MUT, marginTop: 2 }}>U12 Sam · Thursday 4 Jun · Sam runs training tonight · you run the subs on Saturday</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onNav?.('teamtalk')} style={{ height: 44, padding: '0 16px', borderRadius: '999px', border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: INK }}>Team talk</button>
          <button onClick={() => onNav?.('pitchside')} style={{ height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Saturday warm-up</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Hand-over from Sam */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: GD, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>SK</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Hand-over from Sam</div>
              <div style={{ fontSize: 12, color: MUT }}>after Thursday's session</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: INK, lineHeight: '21px', fontStyle: 'italic', background: '#f7f8f7', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
            "Rondo looked good tonight — keep the same format on Saturday. Noah and Zoe both felt fine after. I'll do the line-up and talk if you do the warm-up and subs."
          </div>
          <button onClick={() => showToast('Reply sent to Sam.')} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: INK }}>Reply</button>
        </div>

        {/* This week jobs */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 12 }}>This week</div>
          {[
            { ini: 'SK', name: 'Sam', jobs: 'training, line-up, team talk', isMe: false },
            { ini: 'JM', name: 'You', jobs: 'Saturday warm-up and subs', isMe: true },
            { ini: 'PS', name: 'Priya', jobs: 'warm-up tonight, growth checks', isMe: false },
            { ini: 'RO', name: 'Rob', jobs: 'availability, roster, camera', isMe: false },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i > 0 ? `1px solid ${LN}` : 'none', alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.isMe ? G : '#8aad9a', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
              <div>
                <span style={{ fontSize: 14, fontWeight: p.isMe ? 700 : 600, color: INK }}>{p.name}</span>
                <span style={{ fontSize: 13, color: MUT }}> · {p.jobs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tonight's plan (view only) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Tonight · 5:45 to 7:15 · Sam leads</div>
          <button onClick={() => onNav?.('training')} style={{ fontSize: 13, fontWeight: 600, color: G, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Open plan →</button>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
          {PLAN.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', borderTop: i > 0 ? `1px solid ${LN}` : 'none', alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, background: GD, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{s.time}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{s.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: '10px 14px', background: PALE, borderRadius: 10, fontSize: 13, color: G, lineHeight: '18px' }}>
          Built from Saturday's game and your notes. Sam edits; you can suggest swaps.
        </div>
      </div>

      {/* Who's in Saturday */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Who's in Saturday</div>
          <div style={{ fontSize: 13, color: MUT }}>12 in · Rob is chasing 2</div>
        </div>
        <button onClick={() => onNav?.('matchday')} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: INK }}>See line-up</button>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
    </div>
  )
}
