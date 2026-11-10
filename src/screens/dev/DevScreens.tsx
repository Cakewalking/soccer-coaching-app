import { useState } from 'react'
import { renderScreen } from '../demo/DemoApp'
import { TOURS } from '../demo/tours'

type Tab = 'step4' | 'footballyear'

export default function DevScreens() {
  const [tab, setTab]           = useState<Tab>('step4')
  const [activeKey, setActiveKey] = useState<string>(TOURS.step4.sections[0].steps[0].screen ?? '')

  const tour = TOURS[tab]
  const allSteps = tour.sections.flatMap(s => s.steps)
  const totalCount = allSteps.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f5f5f4' }}>

      {/* Top bar */}
      <div style={{ background: '#1f4a3e', color: '#fff', padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.2px' }}>/__screens</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>dev screen index</span>
        <div style={{ flex: 1 }} />
        {(['step4', 'footballyear'] as Tab[]).map(t => (
          <button key={t} onClick={() => { setTab(t); setActiveKey(TOURS[t].sections[0].steps[0].screen ?? '') }}
            style={{ height: 32, padding: '0 14px', border: 'none', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: tab === t ? '#fff' : 'transparent', color: tab === t ? '#1f4a3e' : 'rgba(255,255,255,0.7)' }}>
            {t === 'step4' ? `Step 4 (${TOURS.step4.sections.flatMap(s => s.steps).length})` : `Football year (${TOURS.footballyear.sections.flatMap(s => s.steps).length})`}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left panel — screen list */}
        <div style={{ width: 280, background: '#fff', borderRight: '1px solid #e5e7e6', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6f7f7b', borderBottom: '1px solid #f0f0f0' }}>
            {totalCount} screens
          </div>
          {tour.sections.map(section => (
            <div key={section.title}>
              <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9aada9', background: '#fafaf9' }}>
                {section.title}
              </div>
              {section.steps.map(step => {
                const key = step.screen ?? ''
                const active = key === activeKey
                return (
                  <button key={key} onClick={() => setActiveKey(key)}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 16px', border: 'none', borderLeft: active ? '3px solid #2f6252' : '3px solid transparent',
                      background: active ? '#eef5f2' : 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <div style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? '#1f4a3e' : '#10211f', lineHeight: 1.3 }}>{step.label}</div>
                    <div style={{ fontSize: 11, color: '#8a9896', marginTop: 1, lineHeight: 1.3 }}>{step.caption}</div>
                    <div style={{ fontSize: 10, color: '#b0bab8', marginTop: 1, fontFamily: 'monospace' }}>{key}</div>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Right panel — screen preview */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#e8e9e7', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 16px', background: '#fff', borderBottom: '1px solid #e5e7e6', fontSize: 12, color: '#6f7f7b', fontFamily: 'monospace', flexShrink: 0 }}>
            {activeKey}
          </div>
          <div style={{ flex: 1 }}>
            {renderScreen(activeKey)}
          </div>
        </div>

      </div>
    </div>
  )
}
