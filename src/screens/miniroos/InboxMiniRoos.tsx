import { useRead, markRead } from '../readStore'
import { useState } from 'react'
import { EmptyCard } from '../clubadmin/ui'

const MESSAGES = [
  { id: 'availability', ini: 'SA', bg: '#cbbeb5', from: 'Saturday', date: 'Today', text: '2 families haven\'t said if they\'re coming', unread: true },
  { id: 'referee', ini: 'RF', bg: '#c39797', from: 'Referees', date: 'Yesterday', text: 'Saturday still needs a game leader', unread: true },
  { id: 'omar', ini: 'SH', bg: '#e9eae8', from: 'Sami Haddad · Omar\'s dad', date: 'Mon', text: 'Omar\'s away this week', unread: false },
  { id: 'photo', ini: 'BR', bg: '#e9eae8', from: 'Bianca Rossi · club', date: 'Mon', text: 'Photo day is Saturday 20 June', unread: false },
]

const DETAIL: Record<string, { title: string; from: string; time: string; body: string; reply: string; note: string; badge: string }> = {
  omar: {
    title: 'Omar\'s away this week',
    from: 'Sami Haddad, Omar\'s dad',
    time: 'Monday 7:40 pm',
    body: 'Hi Tom, Omar\'s at his grandparents\' this week so he\'ll miss Tuesday and Saturday. Back next week. He\'s keen for his turn in goal!',
    reply: 'Thanks Sami. I\'ve marked him away. He\'s first in goal when he\'s back.',
    note: 'Done for you: Omar is marked away for Tuesday and Saturday, and his turn in goal moves to Sat 13 Jun.',
    badge: 'Marked away',
  },
  availability: {
    title: '2 families haven\'t said if they\'re coming',
    from: 'Saturday availability',
    time: 'Today 8:00 am',
    body: 'Leo Wright and Arlo Kaur haven\'t replied to the availability request for Saturday 6 June.',
    reply: '',
    note: 'A nudge will go out automatically on Friday if they haven\'t answered.',
    badge: '2 waiting',
  },
  referee: {
    title: 'Saturday still needs a game leader',
    from: 'Referees',
    time: 'Yesterday 4:12 pm',
    body: 'No game leader has been assigned for Sat 6 Jun vs Northgate City. You can ask a family or the club coordinator can help.',
    reply: '',
    note: 'Game leaders are needed for all MiniRoos games under Football Victoria rules.',
    badge: 'Action needed',
  },
  photo: {
    title: 'Photo day is Saturday 20 June',
    from: 'Bianca Rossi · club coordinator',
    time: 'Monday 9:15 am',
    body: 'Hi coaches — photo day is Saturday 20 June after the morning games. Kids should wear the full kit. The photographer will be on Pitch 1.',
    reply: '',
    note: 'This note has been added to your calendar for Sat 20 Jun.',
    badge: 'Info',
  },
}

type DetailShape = (typeof DETAIL)[string]
type SentMsg = { id: string; ini: string; bg: string; from: string; date: string; text: string; unread?: boolean; detail: DetailShape }

export default function InboxMiniRoos({ empty, onChat }: { empty?: boolean; onChat?: () => void }) {
  const [selected, setSelected] = useState('omar')
  const [toast, setToast] = useState('')
  const [composeOpen, setComposeOpen] = useState(false)
  const [subject, setSubject] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [sent, setSent] = useState<SentMsg[]>([])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3200)
  }

  const read = useRead(); markRead(`mini-inbox:${selected}`)   // the message that is open has been read
  const allMessages = [...sent, ...MESSAGES].map(m => ({ ...m, unread: !!m.unread && !read(`mini-inbox:${m.id}`) }))
  const fresh = allMessages.filter(m => m.unread).length
  const detail = sent.find(s => s.id === selected)?.detail ?? DETAIL[selected]
  const selIni = allMessages.find(m => m.id === selected)?.ini

  function sendToAll() {
    const text = bodyText.trim()
    if (!text) return
    const id = `sent-${sent.length + 1}`
    const title = subject.trim() || 'Message to all families'
    const msg: SentMsg = {
      id, ini: 'TA', bg: '#7a9e7e', from: 'You · to all 10 families', date: 'Now',
      text: subject.trim() || text,
      detail: { title, from: 'You → all U9 Tom families', time: 'Just now', body: text, reply: '', note: 'Sent to all 10 families. Replies come back to this inbox.', badge: 'Sent' },
    }
    setSent(prev => [msg, ...prev])
    setSelected(id)
    setComposeOpen(false)
    setSubject(''); setBodyText('')
    showToast('Sent to all 10 families.')
  }

  if (empty) return <EmptyCard icon="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" title="No messages yet" desc="When a parent or the club writes to you, it lands here. You can message all your families at once." cta="Message all families" sidebarTitle="What arrives here" items={[{ title: 'Parents', desc: "Who's away, and questions" }, { title: 'The club', desc: 'Photo day, kit and ground changes' }, { title: 'Clean Sheet', desc: 'Only what needs you' }]} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      {/* Page header */}
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Inbox</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U9 Tom · {fresh ? `${fresh} new · ` : ''}4 this week</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {onChat && <button onClick={onChat} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#2f6252' }}>Family chat</button>}
          <button onClick={() => setComposeOpen(true)} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Message all families
          </button>
        </div>
      </div>

      {/* 2-col grid */}
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: '400px minmax(0,1fr)' }}>

        {/* Message list */}
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px' }}><h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>This week</h2></div>
          {allMessages.map(m => (
            <button key={m.id} onClick={() => setSelected(m.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minHeight: 72, padding: '10px 16px', borderTop: '1px solid #e9eae8', textAlign: 'left', borderLeft: 0, borderRight: 0, borderBottom: 0, background: selected === m.id ? '#eef5f2' : '#fff', cursor: 'pointer', fontFamily: 'inherit', color: '#10211f', width: '100%' }}>
              <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{m.ini}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13, color: '#4a5a57' }}>
                  <span>{m.from}</span><span>{m.date}</span>
                </span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: m.unread ? 700 : 600, lineHeight: '21px' }}>{m.text}</span>
              </span>
              {m.unread && <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '999px', background: '#40826d', marginTop: 6 }} />}
            </button>
          ))}
          <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', padding: '12px 16px' }}>Parents message you here, not on your own phone number.</span>
        </section>

        {/* Detail panel */}
        {detail && (
          <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '999px', background: '#e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>
                {selIni}
              </span>
              <span style={{ flexGrow: 1 }}>
                <span style={{ display: 'block', fontSize: 19, fontWeight: 700, lineHeight: '25px' }}>{detail.title}</span>
                <span style={{ fontSize: 14, color: '#4a5a57' }}>{detail.from} · {detail.time}</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: '#e9eae8', color: '#10211f', whiteSpace: 'nowrap' }}>{detail.badge}</span>
            </div>

            <div style={{ alignSelf: 'flex-start', maxWidth: 520, background: '#f0f1ef', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', fontSize: 15, lineHeight: '22px' }}>{detail.body}</div>

            {detail.reply && (
              <div style={{ alignSelf: 'flex-end', maxWidth: 520, background: '#2f6252', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '12px 14px', fontSize: 15, lineHeight: '22px' }}>{detail.reply}</div>
            )}

            {detail.note && (
              <div style={{ background: '#eef5f2', borderRadius: 12, padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}><strong>Done for you:</strong> {detail.note}</div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ flexGrow: 1, minHeight: 48, border: '1px solid #c5c8c4', borderRadius: 12, padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 15, color: '#4a5a57', background: '#fff' }}>Write a reply</span>
              <button onClick={() => showToast('Reply sent.')} style={{ height: 48, padding: '0 20px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Send</button>
            </div>
          </section>
        )}
      </main>

      {composeOpen && (
        <div onClick={() => setComposeOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(16,33,31,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 540, maxWidth: '92%', maxHeight: '86%', overflowY: 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 12px 40px rgba(16,33,31,0.3)', padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f', marginBottom: 4 }}>Message all families</div>
            <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 18, lineHeight: 1.5 }}>Goes to all 10 U9 Tom families. They reply to you here, not to your phone number.</div>

            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject (optional)"
              style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid #e8edeb', padding: '0 12px', fontSize: 14, color: '#10211f', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: 10 }} />
            <textarea value={bodyText} onChange={e => setBodyText(e.target.value)} placeholder="Write your message to all families…"
              style={{ width: '100%', minHeight: 170, borderRadius: 10, border: '1.5px solid #e8edeb', padding: '12px', fontSize: 14, lineHeight: 1.6, color: '#10211f', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center', marginTop: 18 }}>
              <button onClick={() => setComposeOpen(false)} style={{ height: 40, padding: '0 18px', borderRadius: 999, border: '1.5px solid #e8edeb', background: '#fff', fontSize: 13, color: '#10211f', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={sendToAll} disabled={!bodyText.trim()} style={{ height: 44, padding: '0 22px', borderRadius: 999, border: 'none', background: bodyText.trim() ? '#2f6252' : '#aebbb6', color: '#fff', fontSize: 13, fontWeight: 700, cursor: bodyText.trim() ? 'pointer' : 'default', fontFamily: 'inherit' }}>Send to 10 families</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
