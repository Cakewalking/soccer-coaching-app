import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

type View    = 'list' | 'teamchat' | 'announcements' | 'private' | 'settings' | 'report' | 'readonly'
type Overlay = 'poll' | 'attach' | 'photocheck' | 'report' | null

function PhoneWrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', position: 'relative' as const }}>
      {children}
    </div>
  )
}

function TopBar({ title, sub, onBack, right }: { title: string; sub?: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <div style={{ background: GD, padding: '44px 20px 16px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {sub && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>{sub}</div>}
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{title}</div>
        </div>
        {right}
      </div>
    </div>
  )
}

function Ini({ s, bg, size = 34 }: { s: string; bg: string; size?: number }) {
  const fs = s.length > 2 ? 10 : 12
  return <div style={{ width: size, height: size, borderRadius: '999px', background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fs, fontWeight: 700, flexShrink: 0 }}>{s}</div>
}

function VoiceRow({ dur }: { dur: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
      <button style={{ width: 26, height: 26, borderRadius: '999px', border: 'none', background: G, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
      </button>
      <div style={{ flex: 1, height: 3, background: LN, borderRadius: 999 }}><div style={{ width: '12%', height: '100%', background: G2, borderRadius: 999 }}/></div>
      <span style={{ fontSize: 12, color: MUT }}>{dur}</span>
    </div>
  )
}

function Reactions({ items }: { items: { emoji: string; count: number }[] }) {
  return (
    <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
      {items.map(r => (
        <span key={r.emoji} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#f0f4f2', borderRadius: 999, padding: '1px 7px', fontSize: 12 }}>
          {r.emoji} <span style={{ fontSize: 11, color: MUT }}>{r.count}</span>
        </span>
      ))}
    </div>
  )
}

// ─── PM1 · Chat list ──────────────────────────────────────────────────────────

function ChatListView({ empty, onTeamChat, onAnnouncements, onPrivate, onReadOnly }:
  { empty: boolean; onTeamChat: () => void; onAnnouncements: () => void; onPrivate: () => void; onReadOnly: () => void }) {

  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '44px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12 · parent</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Messages</div>
        </div>
        <Ini s="LT" bg={ROSE} size={36}/>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
        {empty ? (
          <div style={{ padding: '32px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', marginBottom: 28 }}>
              <div style={{ width: 56, height: 56, borderRadius: '999px', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round"><path d="M4 5h16v11H8l-4 4z"/></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>No messages yet</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Announcements from Sam and Rob, the team chat and your own chats with the coach all show here.</div>
              <button onClick={onPrivate} style={{ marginTop: 4, height: 44, padding: '0 24px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Message the coach</button>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Fills in like this</div>
            {[
              { ini: 'U12', bg: G, name: 'U12 Sam team chat', note: 'Team news and updates', time: '—' },
              { ini: 'SK', bg: GD, name: 'Sam K · coach', note: 'Your private chat with the coach', time: '—' },
            ].map(item => (
              <div key={item.ini} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: `1px solid ${LN}`, opacity: 0.5 }}>
                <Ini s={item.ini} bg={item.bg} size={40}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Team section */}
            <div style={{ padding: '10px 16px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>U12 Sam</div>
            <button onClick={onAnnouncements} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: `1px solid ${LN}`, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M22 7l-10 10L2 7"/><rect x={2} y={4} width={20} height={16} rx={2}/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>Announcements</span>
                  <span style={{ fontSize: 12, color: MUT }}>7:12 pm</span>
                </div>
                <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>Rob: Meet time now 8:40 on Saturday</div>
              </div>
              <span style={{ background: ROSE, color: '#fff', borderRadius: 999, padding: '1px 6px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>1</span>
            </button>
            <button onClick={onTeamChat} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: `1px solid ${LN}`, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
              <Ini s="U12" bg={G} size={40}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>U12 Sam team chat</span>
                  <span style={{ fontSize: 12, color: MUT }}>7:55 pm</span>
                </div>
                <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>Jess: Voice note · 0:14</div>
              </div>
              <span style={{ background: ROSE, color: '#fff', borderRadius: 999, padding: '1px 6px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>3</span>
            </button>

            {/* Private chats */}
            {[
              { ini: 'SK', bg: GD, name: 'Sam K · coach', time: 'Tue', preview: 'You: Mia might be 10 minutes late', onClick: onPrivate },
              { ini: 'RO', bg: MUT, name: 'Rob Owusu · team manager', time: 'Tue', preview: 'Canteen swapped to 11 to 12. Thanks!', onClick: onPrivate },
            ].map(item => (
              <button key={item.ini} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: `1px solid ${LN}`, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                <Ini s={item.ini} bg={item.bg} size={40}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.name}</span>
                    <span style={{ fontSize: 12, color: MUT }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{item.preview}</div>
                </div>
              </button>
            ))}

            {/* Club */}
            <div style={{ padding: '10px 16px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Club</div>
            <button onClick={onReadOnly} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: `1px solid ${LN}`, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#738678', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0 }}>WC</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>Wattle Creek FC</span>
                  <span style={{ fontSize: 12, color: MUT }}>Tue</span>
                </div>
                <div style={{ fontSize: 13, color: MUT }}>Wet weather: grounds decision by 7 am</div>
              </div>
            </button>
          </>
        )}
      </div>
      <div style={{ padding: '12px 16px', fontSize: 12, color: MUT, textAlign: 'center' as const, background: '#fff', borderTop: `1px solid ${LN}` }}>
        Other families see your name and whose parent you are. They never see your phone number.
      </div>
    </PhoneWrap>
  )
}

// ─── PM2 · Team chat ──────────────────────────────────────────────────────────

function TeamChatView({ empty, onBack, onPoll, onAttach, onSettings, onReport, onPhotoCheck }:
  { empty: boolean; onBack: () => void; onPoll: () => void; onAttach: () => void; onSettings: () => void; onReport: () => void; onPhotoCheck: () => void }) {
  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '44px 16px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>17 families, Sam, Jess and Rob</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>U12 Sam team chat</div>
          </div>
          <Ini s="LT" bg={ROSE} size={30}/>
        </div>
        {/* Pinned */}
        <div style={{ marginTop: 6, padding: '7px 10px', background: 'rgba(255,255,255,0.12)', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
          📌 Saturday, be there 8:40 at pitch 2. White kit.
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {empty ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Nobody has written yet</div>
            <div style={{ fontSize: 13, color: MUT, maxWidth: 280, lineHeight: 1.5 }}>Rob has let parents post here. Say hello, or share a photo from the weekend.</div>
          </div>
        ) : (
          <>
            {/* Rob's poll */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <Ini s="RO" bg={MUT} size={28}/>
                <div style={{ fontSize: 12, color: MUT }}>Rob · team manager · 6:30 pm</div>
              </div>
              <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '10px 12px', marginLeft: 36 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G2, marginBottom: 3 }}>Poll</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Who can bring oranges on Saturday?</div>
                {[{ label: 'We will', votes: 2 }, { label: 'Only if no one else can', votes: 2 }].map(opt => (
                  <div key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <div style={{ flex: 1, height: 26, background: LN, borderRadius: 999, overflow: 'hidden', position: 'relative' as const }}>
                      <div style={{ width: `${opt.votes / 4 * 100}%`, height: '100%', background: PALE }}/>
                      <span style={{ position: 'absolute' as const, left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: INK }}>{opt.label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{opt.votes}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: MUT }}>4 of 17 · closes Fri 6 pm</span>
                  <button onClick={onPoll} style={{ fontSize: 12, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Change</button>
                </div>
              </div>
            </div>
            {/* Linh's voice (this is "You" = Linh's view) */}
            <div style={{ marginBottom: 14, alignSelf: 'flex-end' }}>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 4, textAlign: 'right' as const }}>You · 7:48 pm</div>
              <div style={{ background: G, borderRadius: 12, padding: '8px 12px', maxWidth: 260, marginLeft: 'auto' }}>
                <VoiceRow dur="0:21"/>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Mia found her other boot! And she got to 14 juggles.</div>
              </div>
              <Reactions items={[{ emoji: '👍', count: 6 }, { emoji: '🙌', count: 3 }]}/>
            </div>
            {/* Sam's reply */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <Ini s="SK" bg={GD} size={26}/>
                <span style={{ fontSize: 12, color: MUT }}>Sam · coach · 7:52 pm</span>
              </div>
              <div style={{ marginLeft: 34 }}>
                <div style={{ background: LN, borderRadius: 8, padding: '5px 9px', marginBottom: 4, fontSize: 12, color: MUT }}>
                  <div style={{ fontSize: 10, color: G2, fontWeight: 700, marginBottom: 1 }}>You</div>
                  Mia found her other boot!
                </div>
                <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', fontSize: 14, color: INK, lineHeight: 1.5 }}>14 is a new best. Tell her I said so.</div>
                <Reactions items={[{ emoji: '❤️', count: 2 }]}/>
              </div>
            </div>
            {/* Jess's voice */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <Ini s="JW" bg={G2} size={26}/>
                <span style={{ fontSize: 12, color: MUT }}>Jess · co-coach · 7:55 pm</span>
              </div>
              <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34, maxWidth: 180 }}>
                <VoiceRow dur="0:14"/>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Compose */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '8px 12px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <button onClick={onAttach} style={{ width: 32, height: 32, borderRadius: '999px', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <button onClick={onPhotoCheck} style={{ width: 32, height: 32, borderRadius: '999px', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><rect x={3} y={3} width={18} height={18} rx={2}/><circle cx={8.5} cy={8.5} r={1.5}/><path d="M21 15l-5-5L5 21"/></svg>
          </button>
          <input placeholder="Write to the team chat" style={{ flex: 1, height: 36, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: INK, background: '#fafafa' }}/>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onSettings} style={{ fontSize: 12, color: MUT, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0' }}>Chat settings and mute</button>
          <button onClick={onReport} style={{ fontSize: 12, color: MUT, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0' }}>Report a message</button>
        </div>
      </div>
    </PhoneWrap>
  )
}

// ─── PM3 · Announcements ──────────────────────────────────────────────────────

function AnnouncementsView({ onBack, onPrivate }: { onBack: () => void; onPrivate: () => void }) {
  return (
    <PhoneWrap>
      <TopBar title="Announcements" sub="Only Sam, Jess and Rob post here" onBack={onBack} right={<Ini s="LT" bg={ROSE} size={30}/>}/>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Ann 1 */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 10, border: `1px solid ${LN}` }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Ini s="RO" bg={MUT} size={28}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Rob Owusu · team manager</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: MUT }}>Mon 6:10 pm</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: G2 }}>17 of 17 seen</span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 3 }}>Fixture list for term 3</div>
          <div style={{ fontSize: 13, color: INK, marginBottom: 10, lineHeight: 1.5 }}>Six games, three at home.</div>
          <div style={{ display: 'flex', gap: 8, padding: '8px 10px', background: '#f5f6f4', borderRadius: 10, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/></svg>
            </div>
            <div><div style={{ fontSize: 12, fontWeight: 600, color: INK }}>U12 fixtures, term 3.pdf</div><div style={{ fontSize: 11, color: MUT }}>1 page · 84 KB</div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#f0f4f2', borderRadius: 999, padding: '2px 8px', fontSize: 13 }}>👍 <span style={{ fontSize: 11, color: MUT }}>11</span></span>
            <span style={{ fontSize: 12, color: G2, fontWeight: 700 }}>You've seen this</span>
          </div>
        </div>

        {/* Ann 2 */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', border: `1px solid ${LN}` }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Ini s="RO" bg={MUT} size={28}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Rob Owusu · team manager</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: MUT }}>Today 7:12 pm</span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 3 }}>Meet time now 8:40 on Saturday</div>
          <div style={{ fontSize: 13, color: INK, marginBottom: 10, lineHeight: 1.5 }}>We're on pitch 2, not pitch 4. White kit. Your calendar is already updated.</div>
          <div style={{ display: 'flex', gap: 8, padding: '8px 10px', background: '#f5f6f4', borderRadius: 10, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: '#5a7a6e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7zM12 9a2 2 0 100-4 2 2 0 000 4"/></svg>
            </div>
            <div><div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Pitch 2, Wattle Creek Reserve</div><div style={{ fontSize: 11, color: MUT }}>Gate on Banksia Street · tap for directions</div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#f0f4f2', borderRadius: 999, padding: '2px 8px', fontSize: 13 }}>👍 <span style={{ fontSize: 11, color: MUT }}>11</span></span>
            <button style={{ height: 32, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Got it</button>
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 16px', background: '#fff', borderTop: `1px solid ${LN}`, flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: MUT, textAlign: 'center' as const, marginBottom: 8 }}>You can't write here. A question?</div>
        <button onClick={onPrivate} style={{ display: 'block', width: '100%', height: 44, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Rob privately</button>
      </div>
    </PhoneWrap>
  )
}

// ─── PM4 · Poll vote ──────────────────────────────────────────────────────────

function PollVoteOverlay({ onClose }: { onClose: () => void }) {
  const [chosen, setChosen] = useState<string>('')
  return (
    <div style={{ position: 'absolute' as const, inset: 0, zIndex: 50, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ background: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', padding: '20px 20px 32px', boxShadow: '0 -8px 32px rgba(0,0,0,0.2)' }}>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>U12 Sam team chat · from Rob</div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G2, marginBottom: 4 }}>Poll</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Ini s="LT" bg={ROSE} size={28}/>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, flex: 1 }}>Who's coming on Saturday? Harbour Rovers, 9:30 at home. Be there 8:40.</div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>For Mia</div>
        {[
          { label: 'Coming', count: 11 },
          { label: "Can't come", count: 2 },
          { label: 'Not sure yet', count: 1 },
        ].map(opt => (
          <button key={opt.label} onClick={() => setChosen(opt.label)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 14px', border: `2px solid ${chosen === opt.label ? G : LN}`, borderRadius: 10, background: chosen === opt.label ? PALE : '#fff', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: chosen === opt.label ? 700 : 400, color: chosen === opt.label ? G : INK }}>{opt.label}</span>
            <span style={{ fontSize: 13, color: MUT }}>{opt.count} so far</span>
          </button>
        ))}
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>This also answers "Can Mia make it?" You don't need to do both.</div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, color: MUT, letterSpacing: '0.06em', marginBottom: 6 }}>Who has answered</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>14 of 17 families. Everyone in the chat can see who chose what. Change your answer any time until Friday 6 pm.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={onClose} style={{ flex: 2, height: 44, borderRadius: 10, border: 'none', background: G, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Save my answer</button>
        </div>
      </div>
    </div>
  )
}

// ─── PM5 · Attach picker ──────────────────────────────────────────────────────

function AttachPickerOverlay({ onClose }: { onClose: () => void }) {
  const opts = [
    { label: 'Photo', note: 'Take one or pick from your phone' },
    { label: 'Video', note: 'Up to 3 minutes' },
    { label: 'Voice note', note: 'Up to 2 minutes' },
    { label: 'Place', note: 'A pin on the map' },
    { label: 'File', note: 'A PDF or document, up to 25 MB' },
    { label: 'Poll', note: 'Rob has kept polls for coaches and the manager', disabled: true },
  ]
  return (
    <div style={{ position: 'absolute' as const, inset: 0, zIndex: 50, background: 'rgba(16,33,31,0.4)', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ background: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', padding: '16px 20px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Add to your message</div>
          <button onClick={onClose} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        {opts.map(opt => (
          <button key={opt.label} onClick={!opt.disabled ? onClose : undefined} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 0', border: 'none', background: 'transparent', cursor: opt.disabled ? 'default' : 'pointer', textAlign: 'left', fontFamily: 'inherit', borderBottom: `1px solid ${LN}`, opacity: opt.disabled ? 0.5 : 1 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{opt.note}</div>
            </div>
          </button>
        ))}
        <div style={{ fontSize: 12, color: ROSE, marginTop: 12, lineHeight: 1.5 }}>Photos of other people's children: one family hasn't said yes to photos, so you'll be asked if their child is in it.</div>
      </div>
    </div>
  )
}

// ─── PM6 · Chat settings ──────────────────────────────────────────────────────

function ChatSettingsView({ onBack }: { onBack: () => void }) {
  const [notif, setNotif] = useState<'all' | 'some' | 'none'>('all')
  return (
    <PhoneWrap>
      <TopBar title="Chat settings" sub="U12 Sam team chat" onBack={onBack} right={<Ini s="LT" bg={ROSE} size={30}/>}/>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <Section label="Tell me about">
          {([
            { id: 'all', label: 'Every message', note: 'A notification each time' },
            { id: 'some', label: 'Polls and my name only', note: 'And replies to something you wrote' },
            { id: 'none', label: 'Nothing from this chat', note: 'Muted. It still fills up quietly' },
          ] as const).map(opt => (
            <label key={opt.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: `1px solid ${LN}`, cursor: 'pointer' }}>
              <div onClick={() => setNotif(opt.id)} style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${notif === opt.id ? G : LN}`, background: notif === opt.id ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {notif === opt.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{opt.note}</div>
              </div>
            </label>
          ))}
          <div style={{ padding: '10px 0', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, color: INK }}>Quiet hours, 9 pm to 7 am</div>
              <div style={{ fontSize: 12, color: MUT }}>Set by Rob for everyone in this chat</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: G2 }}>On</span>
          </div>
          <div style={{ padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, color: INK }}>Save photos to my phone</div>
              <div style={{ fontSize: 12, color: MUT }}>Off: they stay in the chat</div>
            </div>
            <div style={{ width: 36, height: 22, borderRadius: 11, background: LN, position: 'relative' as const }}>
              <div style={{ position: 'absolute' as const, top: 3, left: 3, width: 16, height: 16, borderRadius: '50%', background: '#fff' }}/>
            </div>
          </div>
        </Section>

        {[
          { label: 'Who\'s in this chat', note: '17 families, Sam, Jess and Rob' },
          { label: 'Photos, videos and files', note: '19 photos and videos · 3 files' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${LN}` }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        ))}

        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${LN}`, width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: ROSE }}>Report a message</div>
            <div style={{ fontSize: 12, color: MUT }}>To the welfare officer, privately</div>
          </div>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div style={{ padding: '12px 0', fontSize: 12, color: MUT, lineHeight: 1.5 }}>Announcements always come through, so you never miss a time change. You leave this chat when Mia leaves the team.</div>
      </div>
    </PhoneWrap>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  )
}

// ─── PM7 · Report ─────────────────────────────────────────────────────────────

function ReportOverlay({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState('')
  return (
    <div style={{ position: 'absolute' as const, inset: 0, zIndex: 50, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ background: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', padding: '20px 20px 32px' }}>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>Goes to Helen Park, welfare officer</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: INK, marginBottom: 12 }}>Report a message</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <Ini s="LT" bg={ROSE} size={28}/>
          <div style={{ background: '#f5f6f4', borderRadius: 10, padding: '8px 12px', flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 2 }}>Dan Chen · Ruby's dad · 8:02 pm</div>
            <div style={{ fontSize: 13, color: INK }}>Why does Ruby only ever get one half? Some kids never come off.</div>
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>What's wrong with it?</div>
        {[
          { label: "It's unkind or aggressive" },
          { label: 'About a child, a parent or a coach' },
          { label: "It shares something private", note: 'A photo, a health detail, an address' },
          { label: "It's about a child's safety", note: 'Helen will call you today' },
        ].map(opt => (
          <button key={opt.label} onClick={() => setReason(opt.label)} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%', padding: '10px 0', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${reason === opt.label ? ROSE : LN}`, background: reason === opt.label ? ROSE : '#fff', flexShrink: 0, marginTop: 2 }}>
              {reason === opt.label && <div style={{ width: 8, height: 8, margin: '3px auto', borderRadius: '50%', background: '#fff' }}/>}
            </div>
            <div>
              <div style={{ fontSize: 14, color: INK }}>{opt.label}</div>
              {opt.note && <div style={{ fontSize: 12, color: MUT }}>{opt.note}</div>}
            </div>
          </button>
        ))}
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, margin: '10px 0 14px' }}>Dan and the coaches are not told who reported it. Helen can hide the message while she looks.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={onClose} style={{ flex: 2, height: 44, borderRadius: 10, border: 'none', background: ROSE, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Send to Helen</button>
        </div>
      </div>
    </div>
  )
}

// ─── PM8 · Read-only chat ──────────────────────────────────────────────────────

function ReadOnlyView({ onBack }: { onBack: () => void }) {
  return (
    <PhoneWrap>
      <TopBar title="U10 Mixed team chat" sub="14 families, Ben and Aroha" onBack={onBack} right={<Ini s="LT" bg={ROSE} size={30}/>}/>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Pinned */}
        <div style={{ background: '#f5f6f4', borderRadius: 10, padding: '8px 12px', marginBottom: 14, fontSize: 12, color: MUT }}>📌 Training is Wednesdays 5:00 at pitch 4.</div>
        {/* Poll */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <Ini s="AK" bg={G2} size={26}/>
            <span style={{ fontSize: 12, color: MUT }}>Aroha · team manager · Mon 6:02 pm</span>
          </div>
          <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '10px 12px', marginLeft: 34 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G2, marginBottom: 3 }}>Poll</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Who can do canteen on Saturday?</div>
            {[{ label: '9 to 10', votes: 2 }, { label: '10 to 11', votes: 1 }, { label: '11 to 12', votes: 0 }].map(opt => (
              <div key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ flex: 1, height: 24, background: LN, borderRadius: 999, overflow: 'hidden', position: 'relative' as const }}>
                  <div style={{ width: `${opt.votes / 3 * 100}%`, height: '100%', background: PALE }}/>
                  <span style={{ position: 'absolute' as const, left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: INK }}>{opt.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: INK, minWidth: 12 }}>{opt.votes}</span>
              </div>
            ))}
            <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>3 of 14 · fills the duty roster</div>
          </div>
        </div>
        {/* Ben's message */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <Ini s="BC" bg={GD} size={26}/>
            <span style={{ fontSize: 12, color: MUT }}>Ben · coach · Wed 5:40 pm</span>
          </div>
          <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34, fontSize: 14, color: INK, lineHeight: 1.5 }}>
            New bibs have arrived. Thanks to the canteen crew for paying for them.
          </div>
          <Reactions items={[{ emoji: '👍', count: 9 }, { emoji: '🙌', count: 4 }]}/>
        </div>
      </div>
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 16px 20px', flexShrink: 0 }}>
        <div style={{ fontSize: 13, color: MUT, textAlign: 'center' as const, marginBottom: 10 }}>Only coaches and the manager can post in this chat. You can react and vote.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Message Sam</button>
          <button onClick={onBack} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Message Aroha</button>
        </div>
      </div>
    </PhoneWrap>
  )
}

// ─── PM9 · Private with coach ─────────────────────────────────────────────────

function PrivateChatView({ empty, onBack }: { empty: boolean; onBack: () => void }) {
  return (
    <PhoneWrap>
      <TopBar title="Sam" sub="Sam K · U12 Sam coach" onBack={onBack} right={<Ini s="LT" bg={ROSE} size={30}/>}/>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <div style={{ fontSize: 12, color: MUT, textAlign: 'center' as const, marginBottom: 16 }}>Just you and Sam. The club keeps a copy, and its welfare officer can read it.</div>
        {empty ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Nothing here yet</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, maxWidth: 280 }}>Running late, a question about game time, or something Sam should know about Mia. It stays between you and Sam.</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
              {['Mia will be late', "Mia can't make it", 'Can we talk after training?'].map(msg => (
                <button key={msg} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{msg}</button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 14, alignSelf: 'flex-end' }}>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 4, textAlign: 'right' as const }}>You · Tue 4:10 pm</div>
              <div style={{ background: G, borderRadius: 12, padding: '8px 12px', fontSize: 14, color: '#fff', lineHeight: 1.5, maxWidth: 260, marginLeft: 'auto' }}>Mia might be 10 minutes late Thursday. She has a dentist appointment, sorry!</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}><Ini s="SK" bg={GD} size={26}/><span style={{ fontSize: 12, color: MUT }}>Sam · coach · Tue 4:32 pm</span></div>
              <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34, fontSize: 14, color: INK, lineHeight: 1.5 }}>No problem at all. She won't miss the warm-up game.</div>
            </div>
            <div style={{ background: PALE, borderRadius: 10, padding: '8px 12px', marginBottom: 14, fontSize: 12, color: G, textAlign: 'center' as const, fontWeight: 600 }}>Mia is marked 10 minutes late for Thursday</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}><Ini s="SK" bg={GD} size={26}/><span style={{ fontSize: 12, color: MUT }}>Sam · coach · Tue 4:33 pm</span></div>
              <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '8px 12px', marginLeft: 34 }}>
                <VoiceRow dur="0:12"/>
                <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>One for Mia to watch. Her first touch set up the second goal.</div>
              </div>
              <Reactions items={[{ emoji: '❤️', count: 1 }]}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 4, textAlign: 'right' as const }}>You · Tue 6:05 pm</div>
              <div style={{ background: G, borderRadius: 12, padding: '8px 12px', maxWidth: 180, marginLeft: 'auto' }}>
                <VoiceRow dur="0:09"/>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '8px 16px 16px', flexShrink: 0, display: 'flex', gap: 8 }}>
        <input placeholder="Write to Sam" style={{ flex: 1, height: 40, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: INK, background: '#fafafa' }}/>
        <button style={{ height: 40, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
      </div>
    </PhoneWrap>
  )
}

// ─── PM10 · Photo check ───────────────────────────────────────────────────────

function PhotoCheckOverlay({ onClose }: { onClose: () => void }) {
  const [choice, setChoice] = useState('')
  return (
    <div style={{ position: 'absolute' as const, inset: 0, zIndex: 50, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ background: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', padding: '20px 20px 32px' }}>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>Before this goes to 17 families</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: INK, marginBottom: 12 }}>One quick check</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Ini s="LT" bg={ROSE} size={28}/>
          <div style={{ flex: 1, height: 80, background: '#e8edeb', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: MUT }}>Your photo · today 6:05 pm</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Is Harper Quinn in this photo?</div>
        <div style={{ fontSize: 13, color: ROSE, marginBottom: 12 }}>Her parent hasn't said yes to photos yet. Everyone else in U12 Sam has.</div>
        {[
          { label: "No, she's not in it", note: 'Send it as it is' },
          { label: 'Yes. Blur her and send', note: 'Tap her face on the next screen' },
          { label: "Yes. Don't send it", note: 'Pick a different photo' },
        ].map(opt => (
          <button key={opt.label} onClick={() => setChoice(opt.label)} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%', padding: '10px 0', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${choice === opt.label ? G : LN}`, background: choice === opt.label ? G : '#fff', flexShrink: 0, marginTop: 2 }}>
              {choice === opt.label && <div style={{ width: 8, height: 8, margin: '3px auto', borderRadius: '50%', background: '#fff' }}/>}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{opt.note}</div>
            </div>
          </button>
        ))}
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, margin: '10px 0 14px' }}>You're only asked when someone in the team has no yes for photos. Coaches get the same question.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={onClose} style={{ flex: 2, height: 44, borderRadius: 10, border: 'none', background: G, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Blur and send</button>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ParentChatScreen({ empty = false, onBack }: { empty?: boolean; onBack?: () => void }) {
  const [view, setView]       = useState<View>('list')
  const [overlay, setOverlay] = useState<Overlay>(null)

  const goBack = () => {
    if (view !== 'list') { setView('list'); return }
    onBack?.()
  }

  if (view === 'announcements') return <AnnouncementsView onBack={goBack} onPrivate={() => setView('private')}/>
  if (view === 'settings')      return <ChatSettingsView onBack={() => setView('teamchat')}/>
  if (view === 'readonly')      return <ReadOnlyView onBack={goBack}/>
  if (view === 'private')       return <PrivateChatView empty={empty} onBack={goBack}/>

  if (view === 'teamchat') {
    return (
      <div style={{ position: 'relative' as const }}>
        <TeamChatView
          empty={empty} onBack={goBack}
          onPoll={() => setOverlay('poll')}
          onAttach={() => setOverlay('attach')}
          onSettings={() => setView('settings')}
          onReport={() => setOverlay('report')}
          onPhotoCheck={() => setOverlay('photocheck')}
        />
        {overlay === 'poll'       && <PollVoteOverlay onClose={() => setOverlay(null)}/>}
        {overlay === 'attach'     && <AttachPickerOverlay onClose={() => setOverlay(null)}/>}
        {overlay === 'photocheck' && <PhotoCheckOverlay onClose={() => setOverlay(null)}/>}
        {overlay === 'report'     && <ReportOverlay onClose={() => setOverlay(null)}/>}
      </div>
    )
  }

  return <ChatListView empty={empty} onTeamChat={() => setView('teamchat')} onAnnouncements={() => setView('announcements')} onPrivate={() => setView('private')} onReadOnly={() => setView('readonly')}/>
}
