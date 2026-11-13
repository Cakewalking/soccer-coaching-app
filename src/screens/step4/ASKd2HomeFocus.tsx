import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const HOME_SUB = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', 'Where we\'re at', 'Team staff'] as const

const SUGGESTIONS = [
  'Who needs a rest this week?',
  'What should we work on tonight?',
  'Is everyone getting fair minutes?',
  'Why did we concede on Saturday?',
  "Who hasn't answered for Saturday?",
] as const

export default function ASKd2HomeFocus({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 20 }}>Clean Sheet</div>
        {(['Home', 'Squad', 'Training', 'Match day', 'Clips'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: t === 'Home' ? 700 : 500, color: t === 'Home' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Home' ? 'rgba(255,255,255,0.15)' : 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>{t}</button>
        ))}
        <button onClick={() => onNav?.('REC1-RecordHub')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Record</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => tool('U12 Sam · Wattle Creek')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam · Wattle Creek</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 4, height: 44, alignItems: 'center' }}>
        {HOME_SUB.map(t => (
          <button key={t} onClick={() => t === 'Overview' ? onNav?.('PH1-HomeJuniorsSame') : t === 'Where we\'re at' ? onNav?.('WA1-WhereWeAt') : tool(t)} style={{ height: 44, padding: '0 12px', background: 'none', border: 'none', borderBottom: t === 'Overview' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Overview' ? 700 : 500, color: t === 'Overview' ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
        ))}
      </div>

      {/* Ask line — focused */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '12px 32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button onClick={() => onNav?.('ASKd2-HomeFocus')} style={{ flex: 1, height: 44, background: '#f7f8f7', border: `1.5px solid ${G}`, borderRadius: 10, textAlign: 'left', padding: '0 14px', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>
            Type a question…
          </button>
          <div style={{ fontSize: 11, color: MUT }}>Uses only what you can see as head coach. Wellness answers and welfare concerns are never used.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SUGGESTIONS.map(q => (
            <button key={q} onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#f7f8f7', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>{q}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '24px 32px', overflowY: 'auto' }}>
        {/* Left column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ background: GD, padding: '12px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>TONIGHT</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>TODAY · 5:45 pm · Wattle Creek Reserve</div>
            </div>
            <div style={{ padding: '12px 20px' }}>
              <div style={{ fontSize: 13, color: INK, marginBottom: 8 }}>90 minutes · warm-up and 4 drills · built from Saturday's game</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Pressing high: keep. Gap between the lines: tonight.</div>
              <button onClick={() => tool('Open the plan')} style={{ height: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open the plan</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 6 }}>LAST GAME</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Sat 30 May at Ironbark United · won 3–1</div>
            <button onClick={() => tool('Review')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Review</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 8 }}>MESSAGES</div>
            <div style={{ fontSize: 13, color: INK, marginBottom: 12 }}>4 unread · last from Ella's dad 1 h ago</div>
            <button onClick={() => tool('All messages · 4 more')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>All messages · 4 more</button>
          </div>
        </div>

        {/* Right column */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, flex: 1 }}>Where we're at</div>
              <button onClick={() => onNav?.('WA1-WhereWeAt')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>All 6</button>
            </div>
            <div style={{ fontSize: 12, color: INK, marginBottom: 4 }}>Everyone within 6 minutes of the average. 3 players under half a game on Saturday.</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>Pressing high: keep. Gap between the lines: working on it tonight.</div>
            <button onClick={() => tool('Minutes')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Minutes</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 6 }}>NEXT GAME</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Sat 6 June v Harbour Rovers · home</div>
            <div style={{ fontSize: 12, color: MUT }}>9:30 · Wattle Creek Reserve</div>
          </div>
        </div>
      </div>

    </div>
  )
}
