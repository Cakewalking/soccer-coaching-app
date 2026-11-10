import { useState } from 'react'

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 48, height: 28, borderRadius: '999px', background: on ? '#2f6252' : '#c5c8c4', position: 'relative', cursor: 'pointer', flex: 'none' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: '999px', background: '#fff' }} />
    </div>
  )
}

export default function PlayerMeScreen(_props: { onBack: () => void }) {
  const [reminders, setReminders] = useState(true)
  const [bigText, setBigText] = useState(false)

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Me</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>MT</div>
        </div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Player identity */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#10211f', flex: 'none' }}>MT</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>Mia Tran</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>#8 · central midfield</div>
          </div>
        </div>

        {/* Preferences */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>My kit colour</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>Green</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Reminders</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>Check-in before training</div>
            </div>
            <div onClick={() => setReminders(r => !r)}><Toggle on={reminders} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Bigger writing</div>
            </div>
            <div onClick={() => setBigText(b => !b)}><Toggle on={bigText} /></div>
          </div>
        </div>

        {/* Privacy */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Who can see my stuff</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>Sam, Priya and Mum</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #e9eae8', cursor: 'pointer' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Need to tell someone something?</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>Other people can help</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '17px', textAlign: 'center' }}>Mum looks after the rest of your settings until you're 15.</div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-around', padding: '8px 0 20px' }}>
        {[
          { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z' },
          { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
          { label: 'Goals', icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 8v4l3 3' },
          { label: 'Me', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0', active: true },
        ].map(tab => (
          <button key={tab.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 16px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={(tab as { active?: boolean }).active ? '#2f6252' : '#6f7f7b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: (tab as { active?: boolean }).active ? '#2f6252' : '#6f7f7b' }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
