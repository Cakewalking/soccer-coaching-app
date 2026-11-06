import { useState } from 'react'
import { ROLES, type Role } from './data'
import HomeScreen         from './screens/HomeScreen'
import SquadScreen        from './screens/SquadScreen'
import TrainingScreen     from './screens/TrainingScreen'
import MatchDayScreen     from './screens/MatchDayScreen'
import TeamTalkScreen     from './screens/TeamTalkScreen'
import ClipsScreen        from './screens/ClipsScreen'
import OurStyleScreen     from './screens/OurStyleScreen'
import PlayerProfileScreen from './screens/PlayerProfileScreen'
import './index.css'

export type Screen = 'home' | 'squad' | 'training' | 'matchday' | 'teamtalk' | 'clips' | 'player'

const NAV_TABS: Array<{ id: Screen; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',      icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',     icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { id: 'training', label: 'Training',  icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'matchday', label: 'Match day', icon: 'M22 12h-4M6 12H2M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83' },
  { id: 'clips',    label: 'Clips',     icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
]

const HOME_TABS  = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style']
const SQUAD_TABS = ['Players', 'Development goals', 'Wellness', 'Availability']
const TRAINING_TABS  = ["Tonight's session", 'This week', 'Drill library', 'Player load']
const MATCHDAY_TABS  = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review']
const CLIPS_TABS     = ['Browse', 'Playlists', 'Shared with players', 'To check']

function RolePills({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
      <span style={{ fontSize: 13, color: '#6f7f7b', fontWeight: 500, marginRight: 4 }}>Viewing as</span>
      {ROLES.map(r => (
        <button key={r.id} onClick={() => setRole(r.id)} style={{
          height: 32, padding: '0 14px', borderRadius: '999px', border: 0,
          fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          background: r.id === role ? '#2f6252' : 'transparent',
          color: r.id === role ? '#ffffff' : '#6f7f7b',
        }}>{r.label}</button>
      ))}
    </div>
  )
}

function TeamPicker() {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px',
      borderRadius: '999px', border: '1px solid rgba(255,255,255,0.6)', background: 'transparent',
      fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#ffffff',
    }}>
      U14 · Wattle Creek
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  )
}

function TeamPickerLight() {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px',
      borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff',
      fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f',
    }}>
      U14 · Wattle Creek
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  )
}

function Avatar() {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '999px', background: '#c39797',
      color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 15, flexShrink: 0,
    }}>SK</div>
  )
}

export default function App() {
  const [screen, setScreen]           = useState<Screen>('home')
  const [role, setRole]               = useState<Role>('head')
  const [homeTab, setHomeTab]         = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  const navTo = (s: Screen) => { setScreen(s) }

  if (screen === 'teamtalk') {
    return <TeamTalkScreen role={role} onClose={() => setScreen('training')} />
  }

  const isHomeGroup = screen === 'home' || screen === 'squad'
  const isSubTabScreen = screen === 'training' || screen === 'matchday' || screen === 'clips'
  const isPlayerScreen = screen === 'player'

  const subTabs =
    screen === 'training' ? TRAINING_TABS :
    screen === 'matchday' ? MATCHDAY_TABS :
    screen === 'clips'    ? CLIPS_TABS    : []

  return (
    <div style={{
      width: 1180, minHeight: '100vh', margin: '0 auto',
      background: 'var(--surface-100)', color: 'var(--ink)',
      fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column',
    }}>

      {/* ── App bar ── */}
      {isHomeGroup && (
        <div style={{ flex: 'none', background: '#ffffff', borderBottom: '1px solid var(--line)' }}>
          {/* Row 1 */}
          {screen === 'home' ? (
            <div style={{ height: 64, padding: '0 28px', background: '#2f6252', display: 'flex', alignItems: 'center', gap: 16 }}>
              <button onClick={() => navTo('home')} style={{ fontSize: 21, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, flexShrink: 0 }}>Clean Sheet</button>
              <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                {NAV_TABS.map(tab => (
                  <button key={tab.id} onClick={() => navTo(tab.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 14px', borderRadius: '999px',
                    border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    background: screen === tab.id ? 'rgba(255,255,255,0.18)' : 'transparent', color: '#ffffff',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
                    {tab.label}
                  </button>
                ))}
              </nav>
              <TeamPicker />
              <Avatar />
            </div>
          ) : (
            <div style={{ height: 64, padding: '0 28px', background: '#ffffff', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 16 }}>
              <button onClick={() => navTo('home')} style={{ fontSize: 21, fontWeight: 700, color: '#2f6252', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, flexShrink: 0 }}>Clean Sheet</button>
              <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                {NAV_TABS.map(tab => (
                  <button key={tab.id} onClick={() => navTo(tab.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 14px', borderRadius: '999px',
                    border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    background: screen === tab.id ? '#f7f8f7' : 'transparent',
                    color: screen === tab.id ? '#10211f' : '#6f7f7b',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
                    {tab.label}
                  </button>
                ))}
              </nav>
              <TeamPickerLight />
              <Avatar />
            </div>
          )}
          {/* Row 2: secondary nav + role pills */}
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end' }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
              {(screen === 'home' ? HOME_TABS : SQUAD_TABS).map((tab, i) => {
                const active = screen === 'home' ? i === homeTab : i === 0
                return (
                  <button key={tab} onClick={() => screen === 'home' && setHomeTab(i)} style={{
                    height: 44, padding: '0 16px', border: 0, background: 'transparent',
                    fontFamily: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                    color: active ? '#10211f' : '#6f7f7b', cursor: 'pointer',
                    borderBottom: active ? '2px solid #40826d' : '2px solid transparent',
                    display: 'flex', alignItems: 'flex-end', paddingBottom: 2, gap: 6,
                  }}>
                    {tab}
                    {tab === 'Inbox' && <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>}
                    {tab === 'To check' && <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>}
                  </button>
                )
              })}
            </nav>
            <RolePills role={role} setRole={setRole} />
          </div>
        </div>
      )}

      {isSubTabScreen && (
        <div style={{ height: 64, padding: '0 28px', background: '#ffffff', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', flex: 'none' }}>
          <button onClick={() => navTo('home')} style={{ fontSize: 22, fontWeight: 700, color: '#2f6252', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, flexShrink: 0, marginRight: 8 }}>Clean Sheet</button>
          <nav style={{ display: 'flex', height: '100%' }}>
            {subTabs.map((tab, i) => (
              <button key={tab} style={{
                height: 64, padding: '0 16px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                color: i === 0 ? '#10211f' : '#6f7f7b',
                borderBottom: i === 0 ? '2px solid #40826d' : '2px solid transparent',
                display: 'flex', alignItems: 'center', paddingBottom: 0,
              }}>{tab}</button>
            ))}
          </nav>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <RolePills role={role} setRole={setRole} />
            <TeamPickerLight />
            <Avatar />
          </div>
        </div>
      )}

      {isPlayerScreen && (
        <div style={{ height: 64, padding: '0 28px', background: '#ffffff', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
          <button onClick={() => navTo('squad')} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Squad
          </button>
          <div style={{ flexGrow: 1 }} />
          <TeamPickerLight />
          <Avatar />
        </div>
      )}

      {/* ── Screen content ── */}
      {screen === 'home'  && homeTab !== 4 && <HomeScreen role={role} onRole={setRole} onNav={navTo} />}
      {screen === 'home'  && homeTab === 4 && <OurStyleScreen />}
      {screen === 'squad' && <SquadScreen role={role} onPlayerProfile={ini => { setSelectedPlayer(ini); navTo('player') }} />}
      {screen === 'training' && <TrainingScreen role={role} onNav={navTo} />}
      {screen === 'matchday' && <MatchDayScreen onNav={navTo} />}
      {screen === 'clips'    && <ClipsScreen />}
      {screen === 'player'   && <PlayerProfileScreen playerIni={selectedPlayer ?? 'MT'} />}
    </div>
  )
}
