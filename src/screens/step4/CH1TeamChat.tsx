import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Channel = 'team' | 'announcements'
interface Msg { id: number; from: string; role: string; time: string; body: string; type: 'text' | 'poll' | 'media'; pollQ?: string; pollOpts?: string[]; pollVotes?: number[] }

const TEAM: Msg[] = [
  { id: 1, from: 'Sam', role: 'Coach', time: '8:30 am', body: 'Great energy at training last night. Well done everyone.', type: 'text' },
  { id: 2, from: 'Jess Wu', role: 'Co-coach', time: '8:34 am', body: 'Who can help carry the goals on Saturday? Meet at the reserve at 8:15.', type: 'text' },
  { id: 3, from: 'Sam', role: 'Coach', time: '9:01 am', body: 'Who\'s bringing oranges this week?', type: 'poll', pollQ: 'Oranges this Saturday?', pollOpts: ['I can bring them', 'I\'ll help but can\'t buy', 'Can\'t help this week'], pollVotes: [3, 1, 4] },
  { id: 4, from: 'Mia\'s mum', role: 'Parent', time: '9:14 am', body: 'We can bring them! On our way to the reserve anyway.', type: 'text' },
]
const ANNOUNCEMENTS: Msg[] = [
  { id: 10, from: 'Sam', role: 'Coach', time: 'Mon 2 Jun', body: 'First home game is Saturday 6 Jun at Wattle Creek Reserve, kick off 9:30 am. Arrive by 9:00.', type: 'text' },
  { id: 11, from: 'Sam', role: 'Coach', time: 'Fri 30 May', body: 'Training is on this Thursday despite the forecast. BOM says rain stops by 5 pm.', type: 'text' },
]

export default function CH1TeamChat(_: { onBack?: () => void }) {
  const [channel, setChannel] = useState<Channel>('team')
  const [msg, setMsg] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [voted, setVoted] = useState<number | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const msgs = channel === 'team' ? TEAM : ANNOUNCEMENTS
  const totalVotes = (TEAM[2] as Msg).pollVotes!.reduce((a, b) => a + b, 0)

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Chat · U12 Sam</div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 300px', height: 768 }}>
        {/* Left sidebar */}
        <div style={{ background: '#fff', borderRight: `1px solid ${LN}`, display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ padding: '16px 16px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, textTransform: 'uppercase' as const }}>Channels</div>
          {(['team', 'announcements'] as const).map(ch => (
            <div key={ch} onClick={() => setChannel(ch)} style={{ padding: '10px 16px', background: channel === ch ? PALE : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: channel === ch ? GD : INK }}>{ch === 'team' ? 'Team chat' : 'Announcements'}</div>
                <div style={{ fontSize: 11, color: MUT }}>{ch === 'team' ? 'Everyone' : 'Coaches only'}</div>
              </div>
              {ch === 'team' && <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, fontSize: 11, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${LN}` }}>
            <div style={{ fontSize: 12, color: MUT }}>17 parents · 2 coaches · no phone numbers shared</div>
          </div>
        </div>

        {/* Main chat */}
        <div style={{ display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, background: '#fff' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{channel === 'team' ? 'Team chat' : 'Announcements'}</div>
            <div style={{ fontSize: 12, color: MUT }}>{channel === 'team' ? 'Parents and coaches · U12 Sam' : 'From coaches to parents · read only for parents'}</div>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {msgs.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: msg.role === 'Coach' ? GD : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: msg.role === 'Coach' ? '#fff' : GD, flex: 'none' }}>
                  {msg.from[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{msg.from}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{msg.role}</div>
                    <div style={{ fontSize: 11, color: MUT, marginLeft: 'auto' }}>{msg.time}</div>
                  </div>
                  {msg.type === 'text' && <div style={{ fontSize: 14, color: INK, background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '8px 12px', display: 'inline-block', maxWidth: 480 }}>{msg.body}</div>}
                  {msg.type === 'poll' && (
                    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', maxWidth: 360 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>{msg.pollQ}</div>
                      {msg.pollOpts!.map((opt, i) => {
                        const pct = Math.round((msg.pollVotes![i] / totalVotes) * 100)
                        return (
                          <div key={i} onClick={() => setVoted(i)} style={{ marginBottom: 6, cursor: 'pointer' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                              <div style={{ color: voted === i ? GD : INK, fontWeight: voted === i ? 700 : 400 }}>{opt}</div>
                              <div style={{ color: MUT }}>{msg.pollVotes![i]} · {pct}%</div>
                            </div>
                            <div style={{ height: 6, background: LN, borderRadius: 999, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: voted === i ? GD : G, borderRadius: 999 }} />
                            </div>
                          </div>
                        )
                      })}
                      <div style={{ fontSize: 11, color: MUT, marginTop: 6 }}>{totalVotes} responses</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${LN}`, background: '#fff' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {[
                { icon: <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>, label: 'Photo' },
                { icon: <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M15 12l-6-4v8l6-4z"/></>, label: 'Video' },
                { icon: <><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></>, label: 'Voice' },
                { icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></>, label: 'Poll' },
              ].map(btn => (
                <button key={btn.label} onClick={() => t(`${btn.label} composer would open.`)} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="1.5" strokeLinecap="round">{btn.icon}</svg>
                </button>
              ))}
              <input value={msg} onChange={e => setMsg(e.target.value)} placeholder={channel === 'team' ? 'Message the team…' : 'Write an announcement…'} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, outline: 'none' }} />
              <button onClick={() => { if (msg) { t('Message sent.'); setMsg('') } }} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: msg ? G : LN, color: msg ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', flex: 'none' }}>Send</button>
            </div>
          </div>
        </div>

        {/* Right info panel */}
        <div style={{ background: '#fff', borderLeft: `1px solid ${LN}`, padding: '16px 18px', overflow: 'auto' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>About this channel</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Every parent in U12 Sam can read and reply. Names are shown — this is not anonymous.</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Rules</div>
            {[
              'No phone numbers or emails shared',
              'Coaches can delete any message',
              'Messages stay for the season, then archive',
            ].map(r => (
              <div key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: G, marginTop: 6, flex: 'none' }} />
                <div style={{ fontSize: 12, color: MUT }}>{r}</div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Announcements vs chat</div>
            <div style={{ fontSize: 12, color: GD }}>Announcements are from coaches only. Chat is two-way. Parents can reply in chat but only coaches post in announcements.</div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
