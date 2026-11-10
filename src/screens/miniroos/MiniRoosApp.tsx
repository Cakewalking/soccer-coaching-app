import { useState } from 'react'
import HomeMiniRoos      from './HomeMiniRoos'
import TrainingMiniRoos  from './TrainingMiniRoos'
import InboxMiniRoos     from './InboxMiniRoos'
import CalendarMiniRoos  from './CalendarMiniRoos'
import StaffMiniRoos     from './StaffMiniRoos'

type MiniNav = 'home' | 'squad' | 'training' | 'gameday'
type HomeTab = 'overview' | 'inbox' | 'calendar' | 'staff'

const NAV: Array<{ id: MiniNav; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',     icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',    icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training', icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'gameday',  label: 'Game day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
]

const HOME_TABS: Array<{ id: HomeTab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'inbox',    label: 'Inbox' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'staff',    label: 'Team staff' },
]

export default function MiniRoosApp({ onBack }: { onBack: () => void }) {
  const [nav, setNav]         = useState<MiniNav>('home')
  const [homeTab, setHomeTab] = useState<HomeTab>('overview')

  const contextTabs = nav === 'home' ? HOME_TABS.map(t => t.label) : []
  const activeTabIndex = nav === 'home' ? HOME_TABS.findIndex(t => t.id === homeTab) : 0

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav */}
      <header style={{ flex: 'none', background: '#1f4a3e', color: '#ffffff' }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', flexShrink: 0 }}>Clean Sheet</span>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {NAV.map(tab => (
              <button key={tab.id} onClick={() => setNav(tab.id)} style={{
                height: 60, padding: '0 16px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: nav === tab.id ? 700 : 500,
                color: nav === tab.id ? '#ffffff' : 'rgba(255,255,255,0.65)', cursor: 'pointer',
                borderBottom: nav === tab.id ? '3px solid #ffffff' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: 7, boxSizing: 'border-box',
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
                {tab.label}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.15)', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>
              U9 Tom · Wattle Creek
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>TA</div>
          </div>
        </div>

        {/* Sub-tabs */}
        {nav === 'home' && (
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24, background: '#ffffff', borderBottom: '1px solid #e9eae8' }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
              {contextTabs.map((tab, i) => {
                const active = i === activeTabIndex
                return (
                  <button key={tab} onClick={() => setHomeTab(HOME_TABS[i].id)} style={{
                    height: 44, padding: '0 16px', border: 0, background: 'transparent',
                    fontFamily: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                    color: active ? '#10211f' : '#6f7f7b', cursor: 'pointer',
                    borderBottom: active ? '3px solid #40826d' : '3px solid transparent',
                    display: 'flex', alignItems: 'center', paddingBottom: 3, boxSizing: 'border-box',
                  }}>
                    {tab}
                  </button>
                )
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', height: 44, gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"/></svg>
                Coach · MiniRoos
              </span>
              <button onClick={onBack} style={{ height: 28, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Head coach view</button>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {nav === 'home' && homeTab === 'overview'  && <HomeMiniRoos onTraining={() => setNav('training')} />}
        {nav === 'home' && homeTab === 'inbox'     && <InboxMiniRoos />}
        {nav === 'home' && homeTab === 'calendar'  && <CalendarMiniRoos />}
        {nav === 'home' && homeTab === 'staff'     && <StaffMiniRoos />}
        {nav === 'training' && <TrainingMiniRoos />}
        {nav === 'squad' && (
          <div style={{ padding: '40px 28px', color: '#4a5a57', fontSize: 15 }}>Squad · Coming soon in this view</div>
        )}
        {nav === 'gameday' && (
          <div style={{ padding: '40px 28px', color: '#4a5a57', fontSize: 15 }}>Game day · Coming soon in this view</div>
        )}
      </div>
    </div>
  )
}
