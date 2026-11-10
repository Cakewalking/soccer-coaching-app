import { useState } from 'react'
import type { AdminTab } from './clubadmin/data'
import ClubTab from './clubadmin/ClubTab'
import TeamsTab from './clubadmin/TeamsTab'
import CoachesTab from './clubadmin/CoachesTab'
import PlayersTab from './clubadmin/PlayersTab'
import SafeguardingTab from './clubadmin/SafeguardingTab'
import ReportsTab from './clubadmin/ReportsTab'
import ClubRulesTab from './clubadmin/ClubRulesTab'
import ClubPlanTab from './clubadmin/ClubPlanTab'
import CalendarTab from './clubadmin/CalendarTab'
import LeagueSyncTab from './clubadmin/LeagueSyncTab'
import RefereesTab from './clubadmin/RefereesTab'
import SidelineTab from './clubadmin/SidelineTab'
import WelfareTab from './clubadmin/WelfareTab'

export default function ClubAdminScreen({ empty, role = 'chair' }: { empty?: boolean; role?: 'chair' | 'dof' }) {
  const [tab, setTab] = useState<AdminTab>('club')

  if (empty) {
    return (
      <div style={{ background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 32px', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
        <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#e4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f' }}>Club not set up yet</div>
        <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>Create the club account to start managing teams and coaches.</div>
        <button style={{ height: 48, padding: '0 32px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Get the club ready
        </button>
      </div>
    )
  }

  const TABS: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'club',         label: 'Club',          icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { id: 'teams',        label: 'Teams',         icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
    { id: 'coaches',      label: 'Coaches',       icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' },
    { id: 'players',      label: 'Players',       icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { id: 'safeguarding', label: 'Safeguarding',  icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'reports',      label: 'Reports',       icon: 'M18 20V10M12 20V4M6 20v-6' },
    { id: 'rules',        label: 'Club rules',    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
    { id: 'plan',         label: 'Plan',          icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5' },
    { id: 'calendar',     label: 'Calendar',      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'leaguesync',   label: 'League sync',   icon: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15' },
    { id: 'referees',     label: 'Referees',      icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'sideline',     label: 'Sideline',      icon: 'M15 10l4.553-2.069A1 1 0 0121 8.869v6.262a1 1 0 01-1.447.894L15 14M3 8h12v9H3z' },
    { id: 'welfare',      label: 'Welfare',       icon: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
  ]

  return (
    <div style={{ background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '14px 24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Clean Sheet</div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>·</span>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>CLUB</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              Whole club
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RM</div>
          </div>
        </div>

        {/* Main tab nav */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: 4 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, padding: '8px 14px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: tab === t.id ? 700 : 400, cursor: 'pointer', color: tab === t.id ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: tab === t.id ? '2px solid #fff' : '2px solid transparent' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Role badge strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e9eae8', padding: '0 24px', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 600 }}>{role === 'chair' ? 'Chair' : 'Director of Football'}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {tab === 'club'         && <ClubTab role={role} />}
        {tab === 'teams'        && <TeamsTab empty={empty} />}
        {tab === 'coaches'      && <CoachesTab empty={empty} />}
        {tab === 'players'      && <PlayersTab empty={empty} />}
        {tab === 'safeguarding' && <SafeguardingTab empty={empty} />}
        {tab === 'reports'      && <ReportsTab empty={empty} />}
        {tab === 'rules'        && <ClubRulesTab empty={empty} />}
        {tab === 'plan'         && <ClubPlanTab empty={empty} />}
        {tab === 'calendar'     && <CalendarTab empty={empty} />}
        {tab === 'leaguesync'   && <LeagueSyncTab empty={empty} />}
        {tab === 'referees'     && <RefereesTab empty={empty} />}
        {tab === 'sideline'     && <SidelineTab empty={empty} />}
        {tab === 'welfare'      && <WelfareTab />}
      </div>
    </div>
  )
}
