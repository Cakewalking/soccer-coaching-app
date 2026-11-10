import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

type ChatId = 'announce' | 'u9' | 'sami'

const CHATS: Array<{ id: ChatId; ini: string; bg: string; label: string; time: string; preview: string; unread: number }> = [
  { id: 'announce', ini: '📢', bg: GD,   label: 'Announcements',           time: 'Mon',     preview: 'You: Photo day is Saturday 20 June', unread: 0 },
  { id: 'u9',       ini: 'U9', bg: G,    label: 'U9 Tom families',         time: '6:40 pm', preview: 'Sami: Omar says thanks for the goalie turn', unread: 2 },
  { id: 'sami',     ini: 'SH', bg: '#e9eae8', label: 'Sami Haddad · Omar\'s dad', time: 'Mon', preview: 'Omar\'s away this week', unread: 0 },
]

function U9GroupChat({ empty, onBack }: { empty?: boolean; onBack: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>U9 Tom families</div>
          <div style={{ fontSize: 12, color: MUT }}>10 families and Tom · parents can post · no scores or ladders here</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {empty ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Say hello to the families</div>
            <div style={{ fontSize: 13, color: MUT, maxWidth: 320, lineHeight: 1.5 }}>Ten families are in. A photo from training or a poll for game leader is a good first message.</div>
          </div>
        ) : (
          <>
            {/* Poll message from coach */}
            <div style={{ display: 'flex', gap: 10, flexDirection: 'row-reverse' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: ROSE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>TA</div>
              <div style={{ maxWidth: 420 }}>
                <div style={{ fontSize: 11, color: MUT, marginBottom: 2, textAlign: 'right' }}>You · 5:10 pm</div>
                <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: INK }}>POLL · Who can be game leader on Saturday?</div>
                  <div style={{ padding: '8px 14px', borderBottom: `1px solid ${LN}`, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: PALE }}/>
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>I can</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: G }}>2</span>
                    </div>
                  </div>
                  <div style={{ padding: '8px 14px', borderBottom: `1px solid ${LN}`, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '25%', background: PALE }}/>
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>I've never done it but I'll try</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: G }}>1</span>
                    </div>
                  </div>
                  <div style={{ padding: '8px 14px', fontSize: 12, color: MUT }}>3 of 10 families · the first yes fills Saturday's game leader</div>
                </div>
              </div>
            </div>

            {/* Mei Chen message */}
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: G2, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>MC</div>
              <div style={{ maxWidth: 400 }}>
                <div style={{ fontSize: 11, color: MUT, marginBottom: 2 }}>Mei Chen · Ivy's mum · 6:22 pm</div>
                <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 14px' }}>
                  <div style={{ fontSize: 14, color: INK, lineHeight: 1.4 }}>Ivy drew the whole team. Arlo is the one with the cape.</div>
                </div>
                <div style={{ fontSize: 12, marginTop: 4 }}>❤️ 7</div>
              </div>
            </div>

            {/* Sami message */}
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e9eae8', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>SH</div>
              <div style={{ maxWidth: 400 }}>
                <div style={{ fontSize: 11, color: MUT, marginBottom: 2 }}>Sami Haddad · Omar's dad · 6:40 pm</div>
                <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 14px' }}>
                  <div style={{ fontSize: 14, color: INK, lineHeight: 1.4 }}>Omar says thanks for the goalie turn. He's still talking about it.</div>
                </div>
                <div style={{ fontSize: 12, marginTop: 4 }}>👍 3</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Compose */}
      <div style={{ padding: '12px 20px', borderTop: `1px solid ${LN}`, background: '#fff', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {['📷', '🎥', '🎤', '📊', '📍', '📄'].map((icon, i) => (
            <button key={i} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', fontSize: 15 }}>{icon}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input defaultValue="" placeholder="Write to the families" style={{ flex: 1, height: 44, padding: '0 14px', border: `1px solid ${LN}`, borderRadius: 999, fontFamily: 'inherit', fontSize: 14, outline: 'none' }}/>
          <button style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: G, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
        <div style={{ fontSize: 11, color: MUT, marginTop: 6, textAlign: 'center' }}>
          {empty ? 'Everyone in this chat can see this.' : 'Clean Sheet steps in if someone posts a score or a ladder: under 12s don\'t keep them.'}
        </div>
      </div>
    </div>
  )
}

export default function TeamChatMiniRoos({ empty, onBack }: { empty?: boolean; onBack: () => void }) {
  const [activeChat, setActiveChat] = useState<ChatId | null>(null)

  if (activeChat === 'u9') {
    return <U9GroupChat empty={empty} onBack={() => setActiveChat(null)}/>
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 28px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flex: 1, fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Chats</div>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>New chat</button>
        </div>
        <div style={{ display: 'flex', borderBottom: `2px solid ${LN}`, marginBottom: 0 }}>
          <button style={{ height: 36, padding: '0 14px', border: 'none', background: 'transparent', borderBottom: `2px solid ${G2}`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: -2 }}>Inbox</button>
        </div>
      </div>

      {/* Chat list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px 32px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CHATS.map(c => (
          <button key={c.id} onClick={() => setActiveChat(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: `1px solid ${LN}`, borderRadius: 12, background: '#fff', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', marginBottom: 2 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: c.bg, color: c.id === 'sami' ? INK : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: c.id === 'announce' ? 18 : 12, fontWeight: 700, flexShrink: 0 }}>{c.ini}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.preview}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: MUT }}>{c.time}</div>
              {c.unread > 0 && (
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: ROSE, color: INK, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4, marginLeft: 'auto' }}>{c.unread}</div>
              )}
            </div>
          </button>
        ))}
        <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.5 }}>
          Nobody's phone number is shared. Families leave these chats when the season ends.
        </div>
      </div>
    </div>
  )
}
