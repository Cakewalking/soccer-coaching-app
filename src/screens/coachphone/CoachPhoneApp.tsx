import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'

type Tab = 'home' | 'coming' | 'messages' | 'game'
type Phase = 'preseason' | 'season' | 'postseason' | 'restmonth'

/* ---- shared chrome ---- */

function PhoneShell({ children, tab, onTab, onPlan }: {
  children: React.ReactNode
  tab: Tab
  onTab: (t: Tab) => void
  onPlan?: () => void
}) {
  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'home', label: 'Home',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    },
    {
      key: 'coming', label: 'Coming',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    },
    {
      key: 'messages', label: 'Messages',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    },
    {
      key: 'game', label: 'Game',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    },
  ]
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f5f6f4', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Status bar stub */}
      <div style={{ background: GD, height: 44, display: 'flex', alignItems: 'flex-end', padding: '0 20px 10px', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {tab === 'home' && onPlan && (
            <button onClick={onPlan} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 7, height: 44, padding: '0 10px', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Tonight's plan</button>
          )}
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#8fa09b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 68 }}>
        {children}
      </div>
      {/* Bottom tab bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 390, margin: '0 auto', background: '#fff', borderTop: '1px solid #e8e9e7', display: 'flex', height: 68, zIndex: 10 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => onTab(t.key)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
            border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit',
            color: tab === t.key ? GD : '#8a9896',
            paddingBottom: 8,
          }}>
            {t.icon}
            <span style={{ fontSize: 11, fontWeight: tab === t.key ? 700 : 400 }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, padding: '14px 16px 6px' }}>{children}</div>
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', margin: '0 12px 10px', borderRadius: 14, border: '1px solid #e8e9e7', ...style }}>{children}</div>
}

function Row({ icon, label, sub, right, onPress }: { icon?: React.ReactNode; label: string; sub?: string; right?: React.ReactNode; onPress?: () => void }) {
  return (
    <div onClick={onPress} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: '1px solid #f0f1f0', cursor: onPress ? 'pointer' : 'default' }}>
      {icon && <div style={{ width: 32, height: 32, borderRadius: 8, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{icon}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: INK, lineHeight: 1.3 }}>{label}</div>
        {sub && <div style={{ fontSize: 13, color: MUT, lineHeight: 1.3 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

function Pill({ label, color = G }: { label: string; color?: string }) {
  return <div style={{ height: 22, padding: '0 8px', borderRadius: 11, background: color + '20', display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 700, color, flexShrink: 0 }}>{label}</div>
}

/* ---- Phase-specific Home tabs ---- */
function CoachPhonePreSeasonHome() {
  const [toast, setToast] = useState<string | null>(null)
  function st(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const items = [
    { label: 'Set how we play', note: 'Done · press high, play out from the back', done: true },
    { label: 'Confirm the squad', note: '14 confirmed · 4 trialling', done: false, action: 'Open' },
    { label: 'Consent for 2026', note: '12 of 17 families answered', done: false, action: 'Remind 5' },
    { label: 'Baseline tests', note: '2 of 4 done · finish by 20 March', done: false, action: 'Open' },
    { label: 'Kit sizes', note: '17 of 17 · order sent', done: true },
  ]
  const doneCount = items.filter(i => i.done).length
  return (
    <>
      <SectionHead>Pre-season · 4 weeks to round 1</SectionHead>
      <Card>
        <div style={{ padding: '10px 14px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#e8e9e7', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(doneCount / items.length) * 100}%`, background: G, borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: G }}>{doneCount}/{items.length} ready</span>
        </div>
        {items.map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderTop: '1px solid #f0f1f0' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.done ? G : '#f0f1ef', border: item.done ? 'none' : '1.5px solid #d4d6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              {item.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: item.done ? 400 : 600, color: item.done ? MUT : INK, textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
            </div>
            {(item as { action?: string }).action && (
              <button onClick={() => st(`${(item as { action?: string }).action} tapped`)} style={{ height: 32, padding: '0 10px', borderRadius: 7, border: '1px solid #d4d6d4', background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{(item as { action?: string }).action}</button>
            )}
          </div>
        ))}
      </Card>
      <SectionHead>Tonight</SectionHead>
      <Card>
        <div style={{ padding: '12px 14px 10px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Training · Thu 12 March · 6 pm</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>U12 Sam · Wattle Creek</div>
        </div>
        <div style={{ borderTop: '1px solid #f0f1f0', padding: '10px 14px' }}>
          <button onClick={() => st('Opening tonight\'s session plan.')} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Tonight's session</button>
        </div>
      </Card>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 10, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

function CoachPhonePostSeasonHome() {
  const [toast, setToast] = useState<string | null>(null)
  function st(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <>
      <SectionHead>Season done · great run, U12 Sam</SectionHead>
      <Card>
        <div style={{ padding: '12px 14px 10px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>2026 season · final result</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>Wattle Creek 2 – 1 Banksia Park</div>
          <div style={{ fontSize: 14, color: MUT }}>3rd place · Division 1 · 10 wins, 3 draws, 3 losses</div>
        </div>
        <div style={{ borderTop: '1px solid #f0f1f0', padding: '10px 14px' }}>
          <button onClick={() => st('Opening the season review.')} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>See the season review</button>
        </div>
      </Card>
      <SectionHead>Next up</SectionHead>
      <Card>
        <Row
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>}
          label="Roll the squad over to 2027"
          sub="Move players up and confirm staff"
          right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>}
          onPress={() => st('Opening the season rollover.')}
        />
        <Row
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5c0 .83-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z"/><path d="M8.5 5H10V3.5c0-.83-.67-1.5-1.5-1.5S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>}
          label="Tournaments and gala days"
          sub="2 available in October"
          right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>}
          onPress={() => st('Opening tournament options.')}
        />
      </Card>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 10, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

function CoachPhoneRestMonthHome() {
  const [toast, setToast] = useState<string | null>(null)
  function st(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <>
      <SectionHead>Rest month · no training</SectionHead>
      <div style={{ margin: '0 12px 10px', padding: '14px', borderRadius: 14, background: PALE, border: `1px solid #c5d9d0` }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>Good time to step back</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>No training or games this month. Players are resting. Pre-season starts in 4 weeks.</div>
      </div>
      <SectionHead>When you're ready</SectionHead>
      <Card>
        <Row
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>}
          label="Plan pre-season"
          sub="Set goals and sessions for March"
          right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>}
          onPress={() => st('Opening the pre-season planner.')}
        />
        <Row
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
          label="Check in with parents"
          sub="Let them know when pre-season starts"
          right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>}
          onPress={() => st('Opening the message to parents.')}
        />
      </Card>
      <div style={{ margin: '0 12px 20px', padding: '12px 14px', borderRadius: 12, background: '#f0f1f0', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
        Review, clips and planning are on the tablet.
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 10, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

/* ---- CPh1 Home (populated) ---- */
function CoachPhoneHomeTab({ onPlan }: { onPlan: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <>
      {/* Tonight's training card */}
      <SectionHead>Tonight</SectionHead>
      <Card>
        <div style={{ padding: '14px 14px 10px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Training · Thu 4 June · 6 pm</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>U12 Sam · Wattle Creek</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            <Pill label="14 of 16 coming" />
            <Pill label="Pitch 3" />
          </div>
        </div>
        <div style={{ borderTop: '1px solid #f0f1f0', padding: '10px 14px', display: 'flex', gap: 8 }}>
          <button onClick={onPlan} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Tonight's plan</button>
          <button onClick={() => st("Opening tonight's availability.")} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #d4d6d4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Coming</button>
        </div>
      </Card>

      {/* Needs you */}
      <SectionHead>Needs you</SectionHead>
      <Card>
        <Row
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>}
          label="Set the line-up"
          sub="2 of 16 not placed"
          right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>}
        />
        <Row
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          label="2 haven't replied"
          sub="Tom Blake · Isla Chen"
          right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>}
        />
      </Card>

      {/* Saturday game */}
      <SectionHead>Saturday</SectionHead>
      <Card>
        <div style={{ padding: '14px 14px 10px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Game · Sat 6 June · 10 am</div>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>vs Banksia Park</div>
          <div style={{ fontSize: 14, color: MUT }}>Home · Wattle Creek Reserve</div>
        </div>
        <div style={{ borderTop: '1px solid #f0f1f0', padding: '10px 14px', display: 'flex', gap: 8 }}>
          <button onClick={() => st('Opening team sheet.')} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #d4d6d4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Team sheet</button>
          <button onClick={() => st('Opening game day.')} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #d4d6d4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Game day</button>
        </div>
      </Card>

      {/* Tablet note */}
      <div style={{ margin: '8px 12px 20px', padding: '12px 14px', borderRadius: 12, background: '#f0f1f0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        <span style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>Review, clips and planning are on the tablet.</span>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 10, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

/* ---- CPh2 Coming (populated) ---- */
function CoachPhoneComingTab() {
  const players = [
    { initials: 'AL', name: 'Alex Lim', in: true },
    { initials: 'BI', name: 'Bella Irving', in: true },
    { initials: 'CB', name: 'Charlie Burns', in: true },
    { initials: 'DS', name: 'Dani Suresh', in: true },
    { initials: 'EM', name: 'Ethan Ma', in: null },
    { initials: 'FO', name: 'Freya Okafor', in: true },
    { initials: 'GL', name: 'Grace Lam', in: true },
    { initials: 'HV', name: 'Hugo Valdez', in: null },
    { initials: 'IC', name: 'Isla Chen', in: false },
    { initials: 'JW', name: 'Jack Walsh', in: true },
    { initials: 'KP', name: 'Kira Patel', in: true },
    { initials: 'LN', name: 'Luca Nguyen', in: true },
    { initials: 'MR', name: 'Mia Roux', in: true },
    { initials: 'NB', name: 'Noah Blake', in: true },
    { initials: 'OT', name: 'Olivia Tan', in: true },
    { initials: 'PH', name: 'Priya Huang', in: true },
  ]
  const [states, setStates] = useState<(boolean | null)[]>(players.map(p => p.in))
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <>
      {/* Summary row */}
      <div style={{ padding: '12px 16px', display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #e8e9e7', padding: '10px 12px', textAlign: 'center' as const }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: GD }}>{states.filter(s => s === true).length}</div>
          <div style={{ fontSize: 12, color: MUT }}>Coming</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #e8e9e7', padding: '10px 12px', textAlign: 'center' as const }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#b05020' }}>{states.filter(s => s === false).length}</div>
          <div style={{ fontSize: 12, color: MUT }}>Not coming</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #e8e9e7', padding: '10px 12px', textAlign: 'center' as const }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: MUT }}>{states.filter(s => s === null).length}</div>
          <div style={{ fontSize: 12, color: MUT }}>No reply</div>
        </div>
      </div>

      {/* Remind button for no-reply */}
      {states.some(s => s === null) && (
        <div style={{ padding: '0 12px 10px' }}>
          <button onClick={() => st(`Reminder sent to ${states.filter(s => s === null).length} players.`)} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Remind {states.filter(s => s === null).length} who haven't answered
          </button>
        </div>
      )}

      {/* Player list */}
      <Card style={{ margin: '0 12px 20px' }}>
        {players.map((p, i) => (
          <div key={p.initials} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#d4d6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flex: 'none' }}>{p.initials}</div>
            <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: INK }}>{p.name}</div>
            {/* Toggle buttons */}
            <button onClick={() => setStates(prev => { const n = [...prev]; n[i] = true; return n })}
              style={{ width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${states[i] === true ? G : '#d4d6d4'}`, background: states[i] === true ? PALE : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={states[i] === true ? G : '#b0bab8'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </button>
            <button onClick={() => setStates(prev => { const n = [...prev]; n[i] = false; return n })}
              style={{ width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${states[i] === false ? '#c0392b' : '#d4d6d4'}`, background: states[i] === false ? '#fef0ee' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={states[i] === false ? '#c0392b' : '#b0bab8'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        ))}
      </Card>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 10, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

/* ---- CPh3 Messages (populated) ---- */
function CoachPhoneMessagesTab() {
  const threads = [
    { initials: 'U1', name: 'U12 Sam · Team', last: 'You: Good run tonight everyone 🙌', time: '8:14 pm', unread: 0, isGroup: true },
    { initials: 'BM', name: 'Ben Mills (parent)', last: 'Is Isla recovered for Saturday?', time: '6:40 pm', unread: 1, isGroup: false },
    { initials: 'HP', name: 'Helen Park · Welfare', last: 'All clear for Sat', time: 'Thu', unread: 0, isGroup: false },
    { initials: 'RC', name: 'Rhys Cooper (parent)', last: 'Thanks for today!', time: 'Wed', unread: 0, isGroup: false },
    { initials: 'CL', name: 'Coaches · Wattle Creek', last: 'AK: Confirmed for the ref', time: 'Tue', unread: 0, isGroup: true },
  ]
  return (
    <>
      <SectionHead>Messages</SectionHead>
      <Card>
        {threads.map((t, i) => (
          <div key={t.name} style={{ display: 'flex', gap: 10, padding: '12px 14px', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', cursor: 'pointer', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: t.isGroup ? 10 : '50%', background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flex: 'none' }}>{t.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <div style={{ fontSize: 15, fontWeight: t.unread > 0 ? 700 : 600, color: INK }}>{t.name}</div>
                <div style={{ fontSize: 12, color: MUT, flexShrink: 0, marginLeft: 8 }}>{t.time}</div>
              </div>
              <div style={{ fontSize: 13, color: t.unread > 0 ? INK : MUT, fontWeight: t.unread > 0 ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{t.last}</div>
            </div>
            {t.unread > 0 && (
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flex: 'none' }}>{t.unread}</div>
            )}
          </div>
        ))}
      </Card>
    </>
  )
}

/* ---- CPh4 Game (populated) ---- */
function CoachPhoneGameTab() {
  const [score, setScore] = useState({ us: 1, them: 0 })
  const [minutes, setMinutes] = useState(23)
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <>
      {/* Score + clock */}
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>U12 Sam · vs Banksia Park · Sat 6 June</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ flex: 1, textAlign: 'center' as const }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek</div>
            <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{score.us}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
              <button onClick={() => setScore(s => ({ ...s, us: Math.max(0, s.us - 1) }))} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>−</button>
              <button onClick={() => setScore(s => ({ ...s, us: s.us + 1 }))} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>+</button>
            </div>
          </div>
          <div style={{ textAlign: 'center' as const }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>–</div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '4px 10px', fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 8 }}>{minutes}'</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' as const }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Banksia Park</div>
            <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{score.them}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
              <button onClick={() => setScore(s => ({ ...s, them: Math.max(0, s.them - 1) }))} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>−</button>
              <button onClick={() => setScore(s => ({ ...s, them: s.them + 1 }))} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setMinutes(m => m + 1)} style={{ flex: 1, height: 44, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+1 min</button>
          <button onClick={() => setMinutes(m => m + 5)} style={{ flex: 1, height: 44, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+5 min</button>
        </div>
      </div>

      {/* Next change */}
      <SectionHead>Next change · fair minutes</SectionHead>
      <Card>
        <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#d4d6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flex: 'none' }}>IC</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Isla Chen → off</div>
            <div style={{ fontSize: 13, color: MUT }}>Has 24 min · target 25 min</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#d4d6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flex: 'none' }}>TB</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Tom Blake → on</div>
            <div style={{ fontSize: 13, color: MUT }}>Has 14 min</div>
          </div>
        </div>
        <div style={{ padding: '0 14px 12px' }}>
          <button onClick={() => st('Change recorded: Isla off, Tom on.')} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Record this change</button>
        </div>
      </Card>

      {/* Quick actions */}
      <SectionHead>Quick actions</SectionHead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 12px 20px' }}>
        {[
          { label: 'Goal', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg> },
          { label: 'Mark a moment', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
          { label: 'Head knock', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
          { label: 'Half time', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg> },
        ].map(a => (
          <button key={a.label} onClick={() => st(`${a.label} recorded.`)} style={{ height: 56, borderRadius: 12, border: '1px solid #e8e9e7', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 10, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}

/* ---- CPh5 Plan (sub-screen from Home) ---- */
function CoachPhonePlanScreen({ onBack }: { onBack: () => void }) {
  const drills = [
    { title: 'Warm-up jog + dynamic stretch', duration: '10 min', done: true },
    { title: 'Rondos · 4v2 in pairs', duration: '10 min', done: true },
    { title: 'Press trigger drill', duration: '15 min', done: false },
    { title: 'Small-sided game · 5v5 high press', duration: '15 min', done: false },
    { title: 'Team talk + stretch cool-down', duration: '10 min', done: false },
  ]
  const [done, setDone] = useState(drills.map(d => d.done))

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f5f6f4', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Tonight's plan</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Thu 4 June · 6 pm · Pitch 3</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 32px' }}>
        {/* Focus */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8e9e7', padding: '12px 14px', marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Tonight's focus</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>High press triggers and shape</div>
        </div>
        {/* Drill list */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8e9e7' }}>
          {drills.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <button onClick={() => setDone(prev => { const n = [...prev]; n[i] = !n[i]; return n })}
                style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${done[i] ? G : '#c5c8c4'}`, background: done[i] ? G : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                {done[i] && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: done[i] ? MUT : INK, textDecoration: done[i] ? 'line-through' : 'none' }}>{d.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{d.duration}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 2px 0', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
          Edit the plan on the tablet. Only the ticks change here.
        </div>
      </div>
    </div>
  )
}

/* ---- Empty states ---- */
function EmptyState({ icon, title, sub, action, onAction }: { icon: React.ReactNode; title: string; sub: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '48px 32px', textAlign: 'center' as const }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 15, color: MUT, lineHeight: 1.5, marginBottom: 24 }}>{sub}</div>
      {action && <button onClick={onAction} style={{ height: 48, padding: '0 20px', borderRadius: 12, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{action}</button>}
    </div>
  )
}

/* ---- Main component (full app, tabs) ---- */
export default function CoachPhoneApp({ initialTab = 'home', phase = 'season' as Phase }: { initialTab?: Tab; phase?: Phase }) {
  const [tab, setTab] = useState<Tab>(initialTab)
  const [showPlan, setShowPlan] = useState(false)

  if (showPlan) return <CoachPhonePlanScreen onBack={() => setShowPlan(false)} />

  return (
    <PhoneShell tab={tab} onTab={setTab} onPlan={tab === 'home' && phase === 'season' ? () => setShowPlan(true) : undefined}>
      {tab === 'home' && phase === 'preseason'  && <CoachPhonePreSeasonHome />}
      {tab === 'home' && phase === 'postseason' && <CoachPhonePostSeasonHome />}
      {tab === 'home' && phase === 'restmonth'  && <CoachPhoneRestMonthHome />}
      {tab === 'home' && phase === 'season'     && <CoachPhoneHomeTab onPlan={() => setShowPlan(true)} />}
      {tab === 'coming'   && <CoachPhoneComingTab />}
      {tab === 'messages' && <CoachPhoneMessagesTab />}
      {tab === 'game'     && <CoachPhoneGameTab />}
    </PhoneShell>
  )
}

/* ---- Named exports for per-screen access from DevScreens / DemoApp ---- */
export function CPh1CoachPhoneHome() { return <CoachPhoneApp initialTab="home" /> }
export function CPh2CoachPhoneComing() { return <CoachPhoneApp initialTab="coming" /> }
export function CPh3CoachPhoneMessages() { return <CoachPhoneApp initialTab="messages" /> }
export function CPh4CoachPhoneGame() { return <CoachPhoneApp initialTab="game" /> }
export function CPh5CoachPhonePlan() { return <CoachPhonePlanScreen onBack={() => {}} /> }

export function CPh1eCoachPhoneHomeEmpty() {
  const [toast, setToast] = useState<string|null>(null)
  return (
    <PhoneShell tab="home" onTab={() => {}}>
      <EmptyState
        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
        title="Nothing on yet"
        sub="When you add a session or game, the details appear here."
        action="Add a session"
        onAction={() => { setToast('Opening session creator.'); setTimeout(() => setToast(null), 3000) }}
      />
      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 10, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </PhoneShell>
  )
}

export function CPh2eCoachPhoneComingEmpty() {
  return (
    <PhoneShell tab="coming" onTab={() => {}}>
      <EmptyState
        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>}
        title="No session to track"
        sub="Add players to a session and you can track who's coming here."
      />
    </PhoneShell>
  )
}

export function CPh3eCoachPhoneMessagesEmpty() {
  return (
    <PhoneShell tab="messages" onTab={() => {}}>
      <EmptyState
        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
        title="No messages yet"
        sub="When parents and players message you, they appear here."
      />
    </PhoneShell>
  )
}

export function CPh4eCoachPhoneGameEmpty() {
  return (
    <PhoneShell tab="game" onTab={() => {}}>
      <EmptyState
        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>}
        title="No game today"
        sub="When a game is scheduled, the live sideline screen opens here."
      />
    </PhoneShell>
  )
}
