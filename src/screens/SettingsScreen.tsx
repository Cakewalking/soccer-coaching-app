import { useState } from 'react'
import AccountTab from './settings/AccountTab'
import TeamTab from './settings/TeamTab'
import NotificationsTab from './settings/NotificationsTab'
import DevicesTab from './settings/DevicesTab'
import PrivacyTab from './settings/PrivacyTab'
import DisplayTab from './settings/DisplayTab'
import HelpTab from './settings/HelpTab'

type SettingsTab = 'account' | 'team' | 'notifications' | 'devices' | 'privacy' | 'display' | 'help'

const TABS: Array<{ id: SettingsTab; label: string }> = [
  { id: 'account',       label: 'Account' },
  { id: 'team',          label: 'Team' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'devices',       label: 'Devices' },
  { id: 'privacy',       label: 'Privacy and data' },
  { id: 'display',       label: 'Display' },
  { id: 'help',          label: 'Help' },
]

export default function SettingsScreen({ onDone, initialTab }: { onDone: () => void; initialTab?: SettingsTab }) {
  const [tab, setTab] = useState<SettingsTab>(initialTab ?? 'account')
  const [toast, setToast] = useState('')
  const [toastKey, setToastKey] = useState(0)

  function showToast(msg: string) {
    setToast(msg)
    setToastKey(k => k + 1)
    setTimeout(() => setToast(''), 2800)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#f5f6f4', display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: '#1f4a3e', flexShrink: 0, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 72 }}>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc', fontWeight: 500, lineHeight: '16px' }}>Sam Kelly · head coach, U12 Sam</div>
          <div style={{ fontSize: 24, color: '#fff', fontWeight: 700, lineHeight: '30px' }}>Settings</div>
        </div>
        <span style={{ flexShrink: 0, padding: '4px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#cfe6dc', fontSize: 12, fontWeight: 700 }}>Settings</span>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={() => showToast('Saved.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Save</button>
          <button onClick={onDone} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Done</button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e9eae8', flexShrink: 0, padding: '0 28px', display: 'flex', gap: 0, overflowX: 'auto' as const }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ height: 48, padding: '0 18px', border: 'none', background: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? '#2f6252' : '#4a5a57', cursor: 'pointer', borderBottom: tab === t.id ? '2px solid #2f6252' : '2px solid transparent', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flexGrow: 1, minHeight: 0, overflow: 'auto' }}>
        {tab === 'account'       && <AccountTab       onToast={showToast} />}
        {tab === 'team'          && <TeamTab          onToast={showToast} />}
        {tab === 'notifications' && <NotificationsTab onToast={showToast} />}
        {tab === 'devices'       && <DevicesTab       onToast={showToast} />}
        {tab === 'privacy'       && <PrivacyTab       onToast={showToast} />}
        {tab === 'display'       && <DisplayTab       onToast={showToast} />}
        {tab === 'help'          && <HelpTab          onToast={showToast} />}
      </div>

      {/* Toast */}
      {toast && (
        <div key={toastKey} style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '12px 22px', borderRadius: 12, fontSize: 14, fontWeight: 500, pointerEvents: 'none', whiteSpace: 'nowrap' as const, zIndex: 200 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
