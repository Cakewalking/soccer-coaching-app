import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Sheet =
  | 'cacadnew' | 'cacadnews' | 'cacadgame' | 'cdani'
  | 'cacadmedia' | 'cacadinfo' | 'cvideo' | 'cvoice'
  | 'cacadpoll' | 'cfile' | null

function SheetOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.38)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '24px 24px 20px', width: 480, maxWidth: '90%', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
        {children}
      </div>
    </div>
  )
}

function InfoBox({ text }: { text: string }) {
  return (
    <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: MUT }}>{text}</div>
  )
}

function SheetFooter({ onCancel, confirmLabel, onConfirm }: { onCancel: () => void; confirmLabel: string; onConfirm: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 4 }}>
      <button onClick={onCancel} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
      <button onClick={onConfirm} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{confirmLabel}</button>
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ height: 44, padding: '0 14px', borderRadius: 999, background: active ? G : '#fff', color: active ? '#fff' : INK, border: active ? 'none' : `1px solid #c5c8c4`, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{label}</button>
  )
}

export default function ACC13AcademyChat(_: { onBack?: () => void }) {
  const [toast, setToast] = useState('')
  const [sheet, setSheet] = useState<Sheet>(null)
  const [composeText, setComposeText] = useState('')
  const [daniReply, setDaniReply] = useState('Yes, I can cover the 4:15 on Friday.')
  const [gameMsg, setGameMsg] = useState('Club kit on Saturdays — please no club training tops.')
  const [newChatFor, setNewChatFor] = useState<string[]>(['Advanced', 'Development', 'One-on-one'])
  const [whoCanPost, setWhoCanPost] = useState('Coaches only')
  const [mediaTab, setMediaTab] = useState('Videos')
  const [pollStart, setPollStart] = useState('Make-up times')
  const [videoChoice, setVideoChoice] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setSheet(null)
    setTimeout(() => setToast(''), 3000)
  }

  const closeSheet = () => setSheet(null)

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 21, fontWeight: 700, marginRight: 32, letterSpacing: '-0.01em' }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[{ label: 'Today', icon: '⌂', active: true }, { label: 'Players', icon: '👥' }, { label: 'Game day', icon: '⚽' }, { label: 'Library', icon: '📅' }].map(item => (
            <button key={item.label} style={{ background: (item as any).active ? 'rgba(255,255,255,0.18)' : 'none', border: 'none', color: '#fff', fontSize: 14, fontWeight: (item as any).active ? 700 : 500, padding: '0 14px', height: 64, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => showToast('Opening academy selector.')} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 44, borderRadius: 999, cursor: 'pointer', marginRight: 12 }}>Tall Timber Academy ▾</button>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: INK }}>RW</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', height: 44, borderBottom: `1px solid #c5c8c4`, display: 'flex', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
        {['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested'].map(tab => {
          const active = tab === 'Today'
          return (
            <button key={tab} style={{ background: 'none', border: 'none', borderBottom: active ? `2px solid ${G}` : '2px solid transparent', color: active ? G : MUT, fontSize: 14, fontWeight: active ? 700 : 500, padding: '0 14px', height: 44, cursor: 'pointer', marginBottom: -1 }}>
              {tab}
            </button>
          )
        })}
        <div style={{ flex: 1 }} />
        <span style={{ height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>Academy coach</span>
      </div>

      {/* Main: 2-col chat layout */}
      <div style={{ flex: 1, padding: '14px 28px 18px', display: 'flex', gap: 14, minHeight: 0 }}>
        {/* Left sidebar */}
        <div style={{ width: 340, flexShrink: 0, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: INK, flex: 1 }}>Chats</h1>
            <button onClick={() => showToast('Showing today.')} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Today</button>
            <button onClick={() => setSheet('cacadnew')} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: G, border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ New chat</button>
          </div>

          {/* Chat rows */}
          {[
            {
              icon: '📣', iconBg: PALE, iconIsEmoji: true,
              name: 'Tall Timber news', time: 'Mon', preview: 'Dani: July clinic bookings are open',
              sheet: 'cacadnews' as Sheet, unread: 0, active: false
            },
            {
              initials: 'ADV', iconBg: '#f5e6d0',
              name: 'Advanced · Tue and Thu', time: '4:15 pm', preview: 'Tess: Kai did all three practices!',
              sheet: null, unread: 2, active: true
            },
            {
              initials: 'U13', iconBg: '#f5e6d0',
              name: 'U13 Timber · game team', time: 'Wed', preview: 'You: Team sheet for Saturday',
              sheet: 'cacadgame' as Sheet, unread: 0, active: false
            },
            {
              initials: 'DO', iconBg: '#f5e6d0',
              name: 'Dani Okafor · owner', time: 'Wed', preview: 'Can you take the 4:15 on Friday?',
              sheet: 'cdani' as Sheet, unread: 1, active: false
            },
          ].map((row, i) => (
            <button
              key={i}
              onClick={() => row.sheet && setSheet(row.sheet)}
              style={{
                minHeight: 68, padding: '0 16px', borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10,
                background: row.active ? PALE : 'none', borderLeft: row.active ? `3px solid ${G}` : '3px solid transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left' as const, width: '100%',
                borderTopColor: LN, borderTopWidth: 1, borderTopStyle: 'solid',
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 999, background: row.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: (row as any).iconIsEmoji ? 20 : 12, fontWeight: 700, color: '#c47c20', flexShrink: 0 }}>
                {(row as any).iconIsEmoji ? (row as any).icon : (row as any).initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{row.name}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{row.time}</span>
                </div>
                <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{row.preview}</div>
              </div>
              {row.unread > 0 && (
                <div style={{ width: 20, height: 20, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{row.unread}</div>
              )}
            </button>
          ))}

          <div style={{ padding: '10px 16px', marginTop: 'auto', fontSize: 12, color: MUT, borderTop: `1px solid ${LN}` }}>
            Nobody's phone number is shared. Families leave these chats when the season ends.
          </div>
        </div>

        {/* Right: chat window */}
        <div style={{ flex: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
          {/* Chat header */}
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#f5e6d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#c47c20', flexShrink: 0 }}>ADV</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>Advanced · Tue and Thu</div>
              <div style={{ fontSize: 13, color: MUT }}>22 families, Reece and Dani · parents can post · set up by Dani</div>
            </div>
            <button onClick={() => setSheet('cacadmedia')} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Photos</button>
            <button onClick={() => setSheet('cacadinfo')} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Info</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '8px 16px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'flex-end', gap: 6, background: '#f7f8f7', overflowY: 'auto' as const }}>
            {/* Outgoing */}
            <div style={{ display: 'flex', flexDirection: 'row-reverse' as const, alignItems: 'flex-end', gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 4, maxWidth: '60%' }}>
                <span style={{ fontSize: 12, color: MUT }}>You · 3:30 pm</span>
                <div style={{ background: G, color: '#fff', borderRadius: '14px 14px 4px 14px', padding: '10px 12px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  <div style={{ width: 170, height: 64, background: GD, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative' as const }}>
                    <div style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>▶</div>
                    <span style={{ position: 'absolute' as const, bottom: 6, right: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 6 }}>0:48</span>
                  </div>
                  <span style={{ fontSize: 14 }}>This week's home practice: 20 left-foot finishes against a wall.</span>
                </div>
                <span style={{ fontSize: 13, padding: '4px 10px', borderRadius: 999, background: '#fff', border: `1px solid ${LN}`, color: INK }}>👍 8</span>
              </div>
            </div>

            {/* Incoming: Tess */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: '#f5e6d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#c47c20', flexShrink: 0 }}>TO</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, maxWidth: '60%' }}>
                <span style={{ fontSize: 12, color: MUT }}>Tess Okonkwo · Kai's mum · 4:15 pm</span>
                <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: '14px 14px 14px 4px', padding: '10px 12px', fontSize: 14, color: INK }}>
                  Kai did all three! Any make-up for next Tuesday?
                </div>
                <span style={{ fontSize: 13, padding: '4px 10px', borderRadius: 999, background: '#fff', border: `1px solid ${LN}`, color: INK, alignSelf: 'flex-start' as const }}>🙌 2</span>
              </div>
            </div>

            {/* Incoming: Poll */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: INK, flexShrink: 0 }}>RW</div>
              <div style={{ maxWidth: '62%' }}>
                <span style={{ fontSize: 12, color: MUT, display: 'block', marginBottom: 4 }}>You · 4:20 pm</span>
                <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: '14px 14px 14px 4px', padding: '12px 14px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em' }}>POLL</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>Make-up for Tuesday 9 June: which suits?</span>
                  {[
                    { label: 'Wed 10 June, 5:30', count: 3, pct: 100 },
                    { label: 'Fri 12 June, 4:15', count: 1, pct: 33 },
                  ].map((opt, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: INK }}>
                        <span>{opt.label}</span>
                        <span style={{ color: MUT, fontWeight: 600 }}>{opt.count}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 999, background: LN, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${opt.pct}%`, background: G, borderRadius: 999 }} />
                      </div>
                    </div>
                  ))}
                  <span style={{ fontSize: 12, color: MUT }}>4 of 22 families · your answer books the make-up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compose */}
          <div style={{ borderTop: `1px solid ${LN}`, padding: '10px 16px 12px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {/* Attachment buttons */}
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { label: 'Photo', action: () => showToast('Everyone in Advanced has a yes for photos.') },
                { label: 'Video', action: () => setSheet('cvideo') },
                { label: 'Voice', action: () => setSheet('cvoice') },
                { label: 'Poll', action: () => setSheet('cacadpoll') },
                { label: 'File', action: () => setSheet('cfile') },
                { label: 'Home practice', action: () => showToast('This week\'s home practice attached.') },
              ].map(btn => (
                <button key={btn.label} onClick={btn.action} style={{ height: 44, padding: '0 11px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{btn.label}</button>
              ))}
            </div>
            {/* Input row */}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={composeText}
                onChange={e => setComposeText(e.target.value)}
                placeholder="Write to the Advanced group"
                style={{ flex: 1, height: 40, borderRadius: 10, border: `1px solid #c5c8c4`, padding: '0 14px', fontSize: 14, color: INK, outline: 'none', background: '#fff' }}
              />
              <button onClick={() => { showToast('Sent to the Advanced group.'); setComposeText('') }} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send</button>
            </div>
            <div style={{ fontSize: 12, color: MUT }}>Notes about one player belong in their plan or a private reply, not the group.</div>
          </div>
        </div>
      </div>

      {/* ===== SHEETS ===== */}

      {sheet === 'cacadnew' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>New chat</h2>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6 }}>For</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
              {['Advanced', 'Development', 'One-on-one', 'Pick people'].map(opt => (
                <Chip key={opt} label={opt} active={newChatFor.includes(opt)} onClick={() => setNewChatFor(f => f.includes(opt) ? f.filter(x => x !== opt) : [...f, opt])} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6 }}>Chat name</div>
            <input defaultValue="One-on-one bookings" style={{ width: '100%', height: 38, borderRadius: 10, border: `1px solid #c5c8c4`, padding: '0 12px', fontSize: 14, color: INK, outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6 }}>Who can post</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Coaches only', 'Everyone'].map(opt => (
                <Chip key={opt} label={opt} active={whoCanPost === opt} onClick={() => setWhoCanPost(opt)} />
              ))}
            </div>
          </div>
          <InfoBox text="Families are added when you create the chat. You can add or remove people any time." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Create chat" onConfirm={() => showToast('Chat created. 6 families invited.')} />
        </SheetOverlay>
      )}

      {sheet === 'cacadnews' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>Tall Timber news</h2>
          {[
            { title: 'July clinic bookings are open', meta: 'Mon · Dani' },
            { title: 'Winter schedule: Saturdays at 11:00', meta: 'Last week · Dani' },
            { title: 'Grading results posted to player plans', meta: '2 weeks ago · Dani' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '10px 0', borderTop: i === 0 ? `1px solid ${LN}` : `1px solid ${LN}` }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{item.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{item.meta}</div>
            </div>
          ))}
          <InfoBox text="You can't post here. This channel is managed by Dani." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Got it" onConfirm={() => showToast('Marked as seen.')} />
        </SheetOverlay>
      )}

      {sheet === 'cacadgame' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>U13 Timber · game team</h2>
          <div style={{ fontSize: 13, color: MUT }}>16 families, Reece and Dani · game-day chat</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ background: '#f7f8f7', borderRadius: 10, padding: '10px 12px', fontSize: 14, color: MUT }}>
              <span style={{ fontWeight: 700, color: INK }}>You · Wed: </span>Team sheet for Saturday is up. 14 of 16 confirmed.
            </div>
            <div style={{ background: '#f7f8f7', borderRadius: 10, padding: '10px 12px', fontSize: 14, color: MUT }}>
              <span style={{ fontWeight: 700, color: INK }}>Dani · Wed: </span>Thanks Reece. Ana and Jonah's parents have been reminded.
            </div>
          </div>
          <textarea
            value={gameMsg}
            onChange={e => setGameMsg(e.target.value)}
            rows={3}
            style={{ borderRadius: 10, border: `1px solid #c5c8c4`, padding: '10px 12px', fontSize: 14, color: INK, resize: 'none' as const, outline: 'none' }}
          />
          <InfoBox text="All 16 families receive this message." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Send" onConfirm={() => showToast('Sent to U13 Timber.')} />
        </SheetOverlay>
      )}

      {sheet === 'cdani' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>Dani Okafor · owner</h2>
          <div style={{ background: '#f7f8f7', borderRadius: 10, padding: '10px 12px', fontSize: 14, color: INK }}>
            <span style={{ fontWeight: 700 }}>Dani · Wed: </span>Can you take the 4:15 on Friday? Mia's away.
          </div>
          <textarea
            value={daniReply}
            onChange={e => setDaniReply(e.target.value)}
            rows={3}
            style={{ borderRadius: 10, border: `1px solid #c5c8c4`, padding: '10px 12px', fontSize: 14, color: INK, resize: 'none' as const, outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: 6 }}>
            {['Yes, happy to', 'No, can\'t make it', 'Let me check'].map(r => (
              <button key={r} onClick={() => setDaniReply(r)} style={{ height: 44, padding: '0 12px', borderRadius: 999, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{r}</button>
            ))}
          </div>
          <SheetFooter onCancel={closeSheet} confirmLabel="Send to Dani" onConfirm={() => showToast('Sent to Dani.')} />
        </SheetOverlay>
      )}

      {sheet === 'cacadmedia' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>Photos, videos and files</h2>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Videos', 'Photos', 'Files'].map(tab => (
              <Chip key={tab} label={tab} active={mediaTab === tab} onClick={() => setMediaTab(tab)} />
            ))}
          </div>
          {[
            { name: 'Finishing drill — Thursday.mp4', meta: 'Thu · 0:48' },
            { name: 'Home practice demo.mp4', meta: 'Mon · 1:12' },
            { name: 'U13 warm-up clip.mp4', meta: 'Last week · 0:35' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', flexShrink: 0 }}>▶</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{f.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{f.meta}</div>
              </div>
            </div>
          ))}
          <InfoBox text="Only families who gave media consent appear in clips. Files are removed after the season." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Done" onConfirm={() => showToast('Closed.')} />
        </SheetOverlay>
      )}

      {sheet === 'cacadinfo' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>Advanced · Tue and Thu</h2>
          {[
            { label: 'Parents can post', value: 'Yes · set by Dani' },
            { label: 'Parents can send media', value: 'No' },
            { label: 'Quiet hours', value: '9 pm to 7 am' },
            { label: 'Dani can read', value: 'Yes · all chats in this academy' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
              <span style={{ color: MUT }}>{row.label}</span>
              <span style={{ fontWeight: 600, color: INK }}>{row.value}</span>
            </div>
          ))}
          <SheetFooter onCancel={closeSheet} confirmLabel="Mute this chat" onConfirm={() => showToast('Muted. Tall Timber news still comes through.')} />
        </SheetOverlay>
      )}

      {sheet === 'cvideo' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>Add a video</h2>
          {[
            { label: 'From this device', desc: 'Upload from your camera roll' },
            { label: 'Record now', desc: 'Open the camera' },
            { label: 'From a session clip', desc: 'Pick from your session recordings' },
          ].map((opt, i) => (
            <div key={i} onClick={() => setVideoChoice(opt.label)} style={{ padding: '10px 12px', borderRadius: 10, border: `1px solid ${videoChoice === opt.label ? G : '#c5c8c4'}`, background: videoChoice === opt.label ? PALE : '#fff', cursor: 'pointer' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 13, color: MUT }}>{opt.desc}</div>
            </div>
          ))}
          <InfoBox text="Only players whose parents agreed to media appear in clips sent to this group." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Add video" onConfirm={() => showToast('Video added.')} />
        </SheetOverlay>
      )}

      {sheet === 'cvoice' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>Voice note</h2>
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 4 }}>
            {Array.from({ length: 32 }, (_, i) => (
              <div key={i} style={{ width: 4, borderRadius: 999, background: G, height: `${10 + Math.sin(i * 0.6) * 10 + Math.random() * 8}px`, opacity: 0.7 }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Chip label="Listen" />
            <Chip label="Start again" />
          </div>
          <InfoBox text="Voice notes are not transcribed. Families receive the audio only." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Send voice note" onConfirm={() => showToast('Voice note sent.')} />
        </SheetOverlay>
      )}

      {sheet === 'cacadpoll' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>New poll</h2>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6 }}>Start from</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
              {['Make-up times', 'Available dates', 'Blank'].map(opt => (
                <Chip key={opt} label={opt} active={pollStart === opt} onClick={() => setPollStart(opt)} />
              ))}
            </div>
          </div>
          <input defaultValue="Make-up for Tuesday 9 June: which suits?" style={{ height: 38, borderRadius: 10, border: `1px solid #c5c8c4`, padding: '0 12px', fontSize: 14, color: INK, outline: 'none' }} />
          <input defaultValue="Wed 10 June, 5:30 / Fri 12 June, 4:15" style={{ height: 38, borderRadius: 10, border: `1px solid #c5c8c4`, padding: '0 12px', fontSize: 14, color: INK, outline: 'none' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6 }}>Answers do</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Nothing · survey only', 'Book a make-up'].map(opt => (
                <Chip key={opt} label={opt} active={opt === 'Book a make-up'} />
              ))}
            </div>
          </div>
          <InfoBox text="When a family votes, their answer is confirmed back to them. You see all responses." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Send poll" onConfirm={() => showToast('Poll sent. Make-ups booked.')} />
        </SheetOverlay>
      )}

      {sheet === 'cfile' && (
        <SheetOverlay>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK }}>Add a file</h2>
          {[
            { name: 'U13 Training schedule — Term 3.pdf', size: '84 KB' },
            { name: 'Player consent form.pdf', size: '32 KB' },
            { name: 'Academy code of conduct.pdf', size: '56 KB' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>📄</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{f.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{f.size}</div>
              </div>
            </div>
          ))}
          <InfoBox text="Files can be downloaded by all members of this chat." />
          <SheetFooter onCancel={closeSheet} confirmLabel="Attach" onConfirm={() => showToast('File attached.')} />
        </SheetOverlay>
      )}

      {toast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>
      )}
    </div>
  )
}
