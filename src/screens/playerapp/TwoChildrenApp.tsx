import { useState } from 'react'

type ChildTab = 'both' | 'mia' | 'bao'
type AppView = 'home' | 'seasonsummary' | 'settings' | 'notifications' | 'data' | 'availability' | 'clips'

interface ChildCard {
  ini: string
  name: string
  team: string
  color: string
  events: { day: string; label: string }[]
  todo: { label: string; cta?: string }
  note?: string
}

const MIA: ChildCard = {
  ini: 'MT', name: 'Mia', team: 'U12 Sam', color: '#2f6252',
  events: [
    { day: 'Thu', label: 'Training 5:45 pm' },
    { day: 'Sat', label: 'Harbour Rovers 9:30 · you said yes' },
  ],
  todo: { label: 'Nothing' },
}

const BAO: ChildCard = {
  ini: 'BT', name: 'Bao', team: 'U8 Hannah', color: '#c39797',
  events: [
    { day: 'Wed', label: 'Training 5:00 pm · done' },
    { day: 'Sat', label: "Festival 8:30 · not answered" },
  ],
  todo: { label: "Say if Bao's coming", cta: 'Answer for Bao' },
  note: "Bao is 7, so nothing is filmed or measured for him. You gave consent for each child separately.",
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 48, height: 28, borderRadius: '999px', background: on ? '#2f6252' : '#c5c8c4', position: 'relative', cursor: 'pointer', flex: 'none' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: '999px', background: '#fff', transition: 'left 0.15s' }} />
    </div>
  )
}

function ChildSection({ card, onSeasonSummary, onAvailability }: { card: ChildCard; onSeasonSummary?: () => void; onAvailability?: () => void }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 32, height: 32, borderRadius: '999px', background: card.color, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{card.ini}</span>
        <div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{card.name}</span>
          <span style={{ fontSize: 12, color: '#6f7f7b', marginLeft: 6 }}>{card.team}</span>
        </div>
        <button onClick={onSeasonSummary} style={{ marginLeft: 'auto', height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#2f6252' }}>Open</button>
      </div>
      {card.events.map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderTop: '1px solid #e9eae8' }}>
          <span style={{ flex: 'none', width: 32, fontSize: 12, fontWeight: 700, color: '#6f7f7b' }}>{e.day}</span>
          <span style={{ fontSize: 13, color: '#10211f' }}>{e.label}</span>
        </div>
      ))}
      <div style={{ padding: '6px 0', borderTop: '1px solid #e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#4a5a57', marginBottom: 2 }}>TO DO</div>
          <div style={{ fontSize: 13, fontWeight: card.todo.cta ? 700 : 400, color: card.todo.cta ? '#c39797' : '#6f7f7b' }}>{card.todo.label}</div>
        </div>
        {card.todo.cta && (
          <button onClick={onAvailability} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{card.todo.cta}</button>
        )}
      </div>
      {card.note && (
        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '17px', padding: '6px 0', borderTop: '1px solid #e9eae8' }}>{card.note}</div>
      )}
    </div>
  )
}

function HomeView({ childTab, setChildTab, onSeasonSummary, onAvailability }: {
  childTab: ChildTab
  setChildTab: (t: ChildTab) => void
  onSeasonSummary: () => void
  onAvailability: () => void
}) {
  return (
    <>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '48px 20px 16px', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek FC · parent</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Your family's week</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>LT</div>
        </div>
        {/* Child tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {(['both', 'mia', 'bao'] as ChildTab[]).map(t => (
            <button key={t} onClick={() => setChildTab(t)} style={{
              height: 36, padding: '0 16px', border: 0, borderRadius: '999px',
              background: childTab === t ? 'rgba(255,255,255,0.2)' : 'transparent',
              fontFamily: 'inherit', fontSize: 14, fontWeight: childTab === t ? 700 : 500,
              color: '#fff', cursor: 'pointer', textTransform: 'capitalize',
            }}>{t === 'both' ? 'Both' : t === 'mia' ? 'Mia' : 'Bao'}</button>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '14px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Saturday banner (Both view) */}
        {childTab === 'both' && (
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#2f6252', marginBottom: 4 }}>SATURDAY, BOTH AT HOME</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>8:30 Bao, pitch 6 · 9:30 Mia, pitch 2</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>Your canteen shift is 10 to 11. You'll see all of Bao's game and the first half of Mia's.</div>
          </div>
        )}

        {(childTab === 'both' || childTab === 'mia') && <ChildSection card={MIA} onSeasonSummary={onSeasonSummary} />}
        {(childTab === 'both' || childTab === 'bao') && <ChildSection card={BAO} onAvailability={onAvailability} />}
      </div>
    </>
  )
}

function SeasonSummaryView({ onBack, empty }: { onBack: () => void; empty?: boolean }) {
  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', flex: 'none' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Settings
        </button>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12 · season 2026</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{"Mia's season"}</div>
      </div>
      {empty && (
        <div style={{ flexGrow: 1, padding: '28px 20px' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px 20px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Ready at the end of the season</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5 }}>{"In September, Sam writes a short note for every player, with her goals and a favourite moment."}</div>
          </div>
        </div>
      )}

      {!empty && <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Coach note */}
        <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>FROM SAM, HER COACH</div>
          <div style={{ fontSize: 15, color: '#fff', lineHeight: '21px' }}>
            Mia set out to use her left foot more, and by August she was scoring with it. She's the first to help a teammate up. Next year: keep looking before the ball comes.
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { val: '17 of 18', label: 'games played' },
            { val: 'Fair', label: 'share of minutes' },
            { val: '2 of 2', label: 'goals met' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f', marginBottom: 2 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Favourite moment */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Her favourite moment</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 60, height: 48, borderRadius: 10, background: '#1f4a3e', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z"/></svg>
            </div>
            <div style={{ fontSize: 13, color: '#10211f', lineHeight: '19px' }}>Left foot, low across the keeper, v Ironbark United. Picked by Mia.</div>
          </div>
        </div>

        {/* Next season */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Next season</div>
          {[
            { label: 'Team', value: 'U13 · coach to be confirmed' },
            { label: 'Register by', value: '31 Jan, in PlayFootball' },
            { label: 'Her data', value: 'Kept, unless you ask to delete it' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #e9eae8' : '1px solid #e9eae8' }}>
              <span style={{ fontSize: 14, color: '#4a5a57' }}>{row.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f', textAlign: 'right', maxWidth: '55%' }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '17px', textAlign: 'center' }}>No scores, rankings or comparisons with other children.</div>

        {/* CTAs */}
        <button style={{ width: '100%', height: 52, borderRadius: 14, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Share with family</button>
        <button style={{ width: '100%', height: 52, borderRadius: 14, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Download as a PDF</button>
      </div>}
    </>
  )
}

function SettingsView({ onBack, onNotifications, onData }: { onBack: () => void; onNotifications: () => void; onData: () => void }) {
  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', flex: 'none' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek FC · parent</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Settings</div>
        <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f', position: 'absolute', top: 48, right: 20 }}>LT</div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* YOU section */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b' }}>YOU</div>
          {[
            { label: 'Linh Tran', sub: 'linh.tran@example.com · 0412 345 678' },
            { label: 'Your children', sub: 'Mia, U12 Sam · Bao, U8 Hannah' },
            { label: 'Another parent or carer', sub: 'Add someone who can also answer for Mia' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8', cursor: 'pointer' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{row.label}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.sub}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* THE APP section */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b' }}>THE APP</div>
          {[
            { label: 'Notifications', sub: 'Meet times, changes, check-in reminders', action: 'chevron', onClick: onNotifications },
            { label: "What's recorded", sub: '5 of 6 on for Mia · nothing for Bao', action: 'chevron', onClick: undefined },
            { label: 'Add games to my calendar', sub: 'Google, Apple or Outlook', action: 'chevron', onClick: undefined },
            { label: 'Text size', sub: 'Standard', action: 'chevron', onClick: undefined },
          ].map((row, i) => (
            <div key={i} onClick={row.onClick} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8', cursor: row.onClick ? 'pointer' : 'default' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{row.label}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.sub}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* YOUR DATA section */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b' }}>YOUR DATA</div>
          {[
            { label: 'Download or delete', sub: 'A copy of everything, or remove it', onClick: onData },
            { label: 'Help and privacy policy', sub: 'In plain words' },
            { label: 'Sign out', sub: undefined },
          ].map((row, i) => (
            <div key={i} onClick={row.onClick} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8', cursor: row.onClick ? 'pointer' : 'default' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{row.label}</div>
                {row.sub && <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.sub}</div>}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function NotificationsView({ onBack }: { onBack: () => void }) {
  const [toggles, setToggles] = useState({ coming: true, duty: true, clip: true, checkin: false, news: false, text: true })
  const toggle = (key: keyof typeof toggles) => setToggles(t => ({ ...t, [key]: !t[key] }))

  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', flex: 'none' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Settings
        </button>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Notifications</div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          {[
            { label: 'Meet time or venue changes', sub: 'Always on, so you never miss one', fixed: true },
            { label: 'Can they make it?', sub: 'One question per game or session', key: 'coming' as const },
            { label: 'Your duty this week', sub: 'Canteen, oranges, linesman', key: 'duty' as const },
            { label: 'A clip or note from the coach', sub: 'When Sam sends Mia something', key: 'clip' as const },
            { label: "Mia's check-in reminder", sub: "On her phone, and yours if she hasn't answered", key: 'checkin' as const },
            { label: 'Club news', sub: 'About once a month', key: 'news' as const },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{row.label}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.sub}</div>
              </div>
              {row.fixed ? (
                <span style={{ padding: '4px 12px', borderRadius: '999px', background: '#f0f1ef', color: '#4a5a57', fontSize: 13, fontWeight: 700 }}>Always</span>
              ) : (
                <div onClick={() => toggle(row.key!)}><Toggle on={toggles[row.key!]} /></div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Quiet hours</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>9 pm to 7 am</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Also text me</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>For changes on the day of a game</div>
            </div>
            <div onClick={() => toggle('text')}><Toggle on={toggles.text} /></div>
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '17px', textAlign: 'center' }}>A head knock or a cancelled game always reaches you, whatever you choose here.</div>
      </div>
    </>
  )
}

function DataView({ onBack }: { onBack: () => void }) {
  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', flex: 'none' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Settings
        </button>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Your family's data</div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Download a copy</div>
          <div style={{ fontSize: 13, color: '#6f7f7b', lineHeight: '18px', marginBottom: 12 }}>Everything held about you and your children: clips, numbers, check-ins, consent.</div>
          <button style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Email me a copy</button>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px', fontSize: 15, fontWeight: 700 }}>Delete some things</div>
          {["Mia's clips", "Mia's sensor and growth numbers", "Mia's check-in answers"].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8', cursor: 'pointer' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{label}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>{i === 0 ? 'Numbers stay' : i === 1 ? 'Clips stay' : ''}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #e8d5d0', padding: '16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: '#10211f' }}>Leave and delete everything</div>
          <div style={{ fontSize: 13, color: '#6f7f7b', lineHeight: '18px', marginBottom: 12 }}>Removes your account and your children's data within 7 days. The club keeps only what the law says it must, such as a head-knock record.</div>
          <button style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #e8d5d0', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#c39797' }}>Delete everything</button>
        </div>

        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '17px', textAlign: 'center' }}>Mia can still play. Deleting data never affects her place in the team.</div>
      </div>
    </>
  )
}

function AvailabilityAnswerView({ onBack }: { onBack: () => void }) {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)
  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', flex: 'none' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U8 Hannah · this Saturday</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Is Bao coming?</div>
      </div>
      <div style={{ flexGrow: 1, padding: '20px 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Festival — Saturday 8:30</div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Wattle Creek Sportsground · Pitch 6</div>
        </div>
        <button onClick={() => setAnswer('yes')} style={{ width: '100%', height: 52, borderRadius: 14, border: `2px solid ${answer === 'yes' ? '#2f6252' : '#e9eae8'}`, background: answer === 'yes' ? '#eef5f2' : '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: answer === 'yes' ? '#2f6252' : '#10211f' }}>
          {answer === 'yes' ? '✓ Yes, Bao is coming' : "Yes, he'll be there"}
        </button>
        <button onClick={() => setAnswer('no')} style={{ width: '100%', height: 52, borderRadius: 14, border: `2px solid ${answer === 'no' ? '#c39797' : '#e9eae8'}`, background: answer === 'no' ? '#fdf5f3' : '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: answer === 'no' ? '#c39797' : '#10211f' }}>
          {answer === 'no' ? "✓ Can't make it" : "No, he can't make it"}
        </button>
        {answer && (
          <button onClick={onBack} style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}>Done</button>
        )}
      </div>
    </>
  )
}

function ClipsView({ onBack }: { onBack: () => void }) {
  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', flex: 'none' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek FC · parent</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Clips</div>
      </div>
      <div style={{ flexGrow: 1, padding: '20px 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z"/></svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{"Mia's clips appear here"}</div>
          <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>Goals, assists and moments Sam tags for Mia during games.</div>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-around', padding: '8px 0 20px' }}>
        {[
          { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', onClick: onBack },
          { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', active: true },
          { label: 'Settings', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0' },
        ].map(tab => (
          <button key={tab.label} onClick={tab.onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 20px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tab.active ? '#2f6252' : '#6f7f7b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: tab.active ? '#2f6252' : '#6f7f7b' }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default function TwoChildrenApp({ empty = false }: { onBack: () => void; empty?: boolean }) {
  const [childTab, setChildTab] = useState<ChildTab>('both')
  const [view, setView] = useState<AppView>('home')

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', position: 'relative' }}>

      {view === 'home' && (empty ? (
        <div style={{ flexGrow: 1, padding: '48px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 2 }}>Wattle Creek U12 · parent</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#10211f' }}>Welcome, Linh</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{"Mia's week will show here"}</div>
          <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5 }}>{"Once Sam adds training and games, you'll see where to be and when, and one question for each: can Mia make it?"}</div>
          <div style={{ marginTop: 8, padding: '12px 14px', background: '#eef5f2', borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', marginBottom: 6 }}>{"What's recorded for Mia"}</div>
            <div style={{ fontSize: 13, color: '#4a5a57' }}>You said yes to 5 of 6</div>
          </div>
        </div>
      ) : <HomeView childTab={childTab} setChildTab={setChildTab} onSeasonSummary={() => setView('seasonsummary')} onAvailability={() => setView('availability')} />)}
      {view === 'seasonsummary' && <SeasonSummaryView onBack={() => setView('home')} empty={empty} />}
      {view === 'settings'      && <SettingsView onBack={() => setView('home')} onNotifications={() => setView('notifications')} onData={() => setView('data')} />}
      {view === 'notifications' && <NotificationsView onBack={() => setView('settings')} />}
      {view === 'data'          && <DataView onBack={() => setView('settings')} />}
      {view === 'availability'  && <AvailabilityAnswerView onBack={() => setView('home')} />}
      {view === 'clips'         && <ClipsView onBack={() => setView('home')} />}

      {/* Bottom nav (home only) */}
      {view === 'home' && (
        <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-around', padding: '8px 0 20px' }}>
          {[
            { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', active: true, onClick: undefined as (() => void) | undefined },
            { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', active: false, onClick: () => setView('clips') },
            { label: 'Settings', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0', active: false, onClick: () => setView('settings') },
          ].map(tab => (
            <button key={tab.label} onClick={tab.onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 20px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tab.active ? '#2f6252' : '#6f7f7b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon}/></svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: tab.active ? '#2f6252' : '#6f7f7b' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
