import { useState } from 'react'

type Chip = 'Meet time' | 'Venue or pitch' | 'Cancelled' | 'Kit or other'
type ThreadKey = 'coaches' | 'linh' | 'all' | 'wattle'

const CHIPS: Chip[] = ['Meet time', 'Venue or pitch', 'Cancelled', 'Kit or other']

const THREADS: Array<{ id: ThreadKey; ini: string; bg: string; name: string; time: string; preview: string; unread: boolean }> = [
  { id: 'coaches', ini: 'SJ', bg: '#cbbeb5', name: 'Coaches · Sam, Jess', time: '7:40 pm', preview: "Sam: Line-up done, I'll send it Friday night", unread: true },
  { id: 'linh',    ini: 'LT', bg: '#cbbeb5', name: 'Linh Tran (Mia)',      time: '6:02 pm', preview: "Can I swap canteen to 11 to 12? Mia's dentist",   unread: true },
  { id: 'all',     ini: 'U12', bg: '#e9eae8', name: 'All U12 families',   time: '7:12 pm', preview: 'You: Meet time now 8:40 on Saturday',              unread: false },
  { id: 'wattle',  ini: 'WC', bg: '#eef5f2', name: 'Wattle Creek FC',      time: 'Tue',     preview: 'Wet weather: grounds decision by 7 am Saturday',   unread: false },
]

const THREAD_CONTENT: Record<ThreadKey, { title: string; msgs: Array<{ from: string; side: 'l' | 'r'; text: string }> }> = {
  coaches: { title: 'Coaches · Sam, Jess', msgs: [
    { side: 'l', from: 'Sam',  text: "Line-up done, I'll send it Friday night" },
    { side: 'l', from: 'Jess', text: "I'll bring the cones and do the warm-up" },
    { side: 'r', from: 'You',  text: "Camera's booked, I'll set up on pitch 2" },
  ]},
  linh: { title: 'Linh Tran (Mia)', msgs: [
    { side: 'l', from: 'Linh', text: "Can I swap canteen to 11 to 12? Mia's dentist" },
    { side: 'r', from: 'You',  text: "No problem, I'll ask the Bells to swap" },
  ]},
  all: { title: 'All U12 families', msgs: [
    { side: 'r', from: 'You',      text: "Meet time now 8:40 on Saturday. We're on pitch 2." },
    { side: 'l', from: "Isla's mum", text: 'Got it, thanks Rob' },
    { side: 'l', from: "Kai's dad",  text: "Kai can't make it, wedding. Sorry!" },
  ]},
  wattle: { title: 'Wattle Creek FC', msgs: [
    { side: 'l', from: 'Club', text: 'Wet weather: grounds decision by 7 am Saturday. Check the app.' },
  ]},
}

const RECIPIENTS = [
  { icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6', title: 'All U12 parents and players', desc: "17 families · parents get players' copies", badge: '17', badgeBg: '#e9eae8', badgeColor: '#10211f' },
  { icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0',        title: 'Sam and Jess',               desc: 'Coaches see it in their inbox',            badge: '2',  badgeBg: '#e9eae8', badgeColor: '#10211f' },
  { icon: 'M4 5h16v15H4zM4 10h16M9 3v4M15 3v4',                        title: 'Updates the calendar',      desc: 'The new meet time, for everyone',          badge: 'On', badgeBg: '#eef5f2', badgeColor: '#2f6252' },
]

function ChangeForm({ chips, toggle, onSend }: { chips: Set<Chip>; toggle: (c: Chip) => void; onSend: () => void }) {
  const sel = (c: Chip) => chips.has(c)
  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>What changed?</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {CHIPS.map(c => (
          <button key={c} onClick={() => toggle(c)} style={{ height: 44, borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: sel(c) ? 0 : '1px solid #c5c8c4', background: sel(c) ? '#2f6252' : '#fff', color: sel(c) ? '#fff' : '#10211f' }}>{c}</button>
        ))}
      </div>

      {/* Change card */}
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ flexShrink: 0, width: 44, height: 48, borderRadius: 12, background: '#cbbeb5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700 }}>SAT</span>
            <span style={{ fontSize: 18, lineHeight: '20px', fontWeight: 700 }}>6</span>
          </span>
          <span style={{ flexGrow: 1, fontSize: 15, lineHeight: '20px', fontWeight: 700 }}>vs Harbour Rovers</span>
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }}>
          <span style={{ border: '1px solid #c5c8c4', borderRadius: 12, padding: '8px 10px' }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>Was</span>
            <span style={{ display: 'block', fontSize: 18, fontWeight: 700, color: '#6f7f7b', textDecoration: 'line-through' }}>9:00 am</span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a5a57" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          <span style={{ border: '2px solid #2f6252', borderRadius: 12, padding: '8px 10px' }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#2f6252' }}>Now</span>
            <span style={{ display: 'block', fontSize: 18, fontWeight: 700 }}>8:40 am</span>
          </span>
        </div>

        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', marginTop: 2 }}>Message</span>
        <span style={{ border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', fontSize: 15, lineHeight: '22px' }}>
          Hi all, please arrive by <strong>8:40</strong> on Saturday, not 9:00. We've moved to pitch 2 and need time to set up the camera. Kick-off is still 9:30. Thanks, Rob
        </span>
      </div>

      {/* Recipients card */}
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px', display: 'flex', flexDirection: 'column' }}>
        {RECIPIENTS.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
            <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={r.icon}/></svg>
            </span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{r.title}</span>
              <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{r.desc}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: r.badgeBg, color: r.badgeColor, whiteSpace: 'nowrap' as const }}>{r.badge}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button onClick={onSend} style={{ height: 52, width: '100%', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>Send and ask families to confirm</button>
      <span style={{ fontSize: 12, color: '#4a5a57', textAlign: 'center' as const }}>{"You'll see who has seen it. A nudge goes to anyone who hasn't by Friday 6 pm."}</span>
    </div>
  )
}

export default function MessagesTab({ showChange, setShowChange }: { showChange: boolean; setShowChange: (v: boolean) => void }) {
  const [chips, setChips] = useState<Set<Chip>>(new Set(['Meet time' as Chip]))
  const [sheet, setSheet] = useState<ThreadKey | null>(null)
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3200) }
  const toggle = (c: Chip) => setChips(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n })

  const handleSend = () => { setShowChange(false); showToast("Sent to 17 families. You'll see who's seen it.") }

  if (showChange) {
    return <ChangeForm chips={chips} toggle={toggle} onSend={handleSend} />
  }

  const tc = sheet ? THREAD_CONTENT[sheet] : null

  return (
    <>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Something changed banner */}
        <button onClick={() => setShowChange(true)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '0 14px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', border: 0, textAlign: 'left' as const, width: '100%' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>
          <span style={{ flexGrow: 1 }}>Something changed? Tell parents</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>

        {/* Sent message card */}
        <div style={{ border: '2px solid #2f6252', borderRadius: 16, padding: '12px 14px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ flexGrow: 1, fontSize: 16, fontWeight: 700 }}>Meet time now 8:40 on Saturday</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: '#eef5f2', color: '#2f6252', whiteSpace: 'nowrap' as const }}>Sent 7:12 pm</span>
          </span>
          <span style={{ fontSize: 13, color: '#4a5a57' }}>To all 17 families, Sam and Jess · calendar updated</span>
          <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
            <span style={{ flex: 14, background: '#2f6252', borderRadius: 5 }} />
            <span style={{ flex: 3, background: '#e9eae8', borderRadius: 5 }} />
          </div>
          <span style={{ fontSize: 14 }}><strong>14 of 17</strong> have seen it · Brennan, Delaney and Quinn families haven't</span>
          <button onClick={() => showToast("Nudge sent to the 3 families who haven't seen it.")} style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Nudge the 3 now</button>
        </div>

        {/* Conversations */}
        <div style={{ border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', padding: '8px 0 4px' }}>Conversations</span>
          {THREADS.map(t => (
            <button key={t.id} onClick={() => setSheet(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 62, borderLeft: 0, borderRight: 0, borderBottom: 0, borderTop: '1px solid #e9eae8', background: 'transparent', padding: '0', cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'inherit', color: '#10211f', width: '100%' }}>
              <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{t.ini}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: '#4a5a57', flexShrink: 0 }}>{t.time}</span>
                </span>
                <span style={{ display: 'block', fontSize: 13, color: '#4a5a57', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</span>
              </span>
              {t.unread && <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '999px', background: '#2f6252' }} />}
            </button>
          ))}
        </div>

        <span style={{ fontSize: 12, color: '#4a5a57', textAlign: 'center' as const, padding: '0 6px' }}>{"Messages to a player always copy in their parent. The club's welfare officer can see every family thread."}</span>
      </div>

      {/* Thread sheet */}
      {sheet && tc && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ position: 'absolute', inset: 0, border: 0, padding: 0, background: 'rgba(16,33,31,0.45)', cursor: 'default', width: '100%', height: '100%' }} />
          <div role="dialog" aria-label={tc.title} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, borderRadius: '20px 20px 0 0', maxHeight: 780, padding: '18px 16px 22px', boxSizing: 'border-box' as const, background: '#fff', color: '#10211f', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(16,33,31,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flexGrow: 1 }}>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>{tc.title}</span>
                <span style={{ fontSize: 14, color: '#4a5a57' }}>Conversation</span>
              </div>
              <button type="button" onClick={() => setSheet(null)} aria-label="Close" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flexGrow: 1 }}>
              {tc.msgs.map((m, i) => (
                <div key={i} style={{ alignSelf: m.side === 'r' ? 'flex-end' : 'flex-start', maxWidth: '85%', borderRadius: 14, padding: '8px 12px', background: m.side === 'r' ? '#2f6252' : '#e9eae8', color: m.side === 'r' ? '#fff' : '#10211f', fontSize: 15, lineHeight: '21px' }}>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 700, opacity: 0.85 }}>{m.from}</span>
                  {m.text}
                </div>
              ))}
            </div>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#4a5a57', marginBottom: 4 }}>Reply</span>
              <input placeholder="Write a message" style={{ width: '100%', boxSizing: 'border-box' as const, minHeight: 46, border: '1px solid #c5c8c4', borderRadius: 10, padding: '10px 12px', fontFamily: 'inherit', fontSize: 16, color: '#10211f', background: '#fff' }} />
            </label>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setSheet(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', background: '#fff', color: '#10211f', border: '1px solid #c5c8c4' }}>Cancel</button>
              <button type="button" onClick={() => { setSheet(null); showToast('Sent.') }} style={{ height: 48, padding: '0 18px', borderRadius: 10, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', background: '#2f6252', color: '#fff', border: '1px solid #2f6252', flexGrow: 1 }}>Send</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" style={{ position: 'fixed', left: 16, right: 16, bottom: 92, zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </>
  )
}
