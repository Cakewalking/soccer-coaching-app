import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function ASKd6States({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-screen="ASKd6-States" data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Title bar */}
      <div style={{ background: GD, padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Ask Clean Sheet · four states</div>
      </div>

      {/* Description */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '10px 24px', fontSize: 12, color: MUT }}>
        Each state is shown by giving Ask a different kind of question in the demo. States appear side by side here so every button is reachable.
      </div>

      {/* 4 panel states */}
      <div style={{ flex: 1, display: 'flex', gap: 12, padding: '20px 24px', overflowY: 'auto' }}>

        {/* State 1: Working */}
        <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 2 }}>STATE 1</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Working…</div>
            </div>
            <button onClick={() => onNav?.('ASKd3-AnyScreen')} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: 16, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, background: '#f7f8f7', borderRadius: 8, padding: '8px 10px' }}>Uses only what you can see as head coach. Never sends anything by itself.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: '#f7f8f7', borderRadius: 8 }}>
            <div style={{ flex: 1, fontSize: 12, color: MUT }}>Looking through your 9 games…</div>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2.5px solid ${G}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <div style={{ flex: 1, height: 44, borderRadius: 10, background: '#f7f8f7', border: `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 12, color: MUT, overflow: 'hidden' }}>Why is the gap not closing?</div>
            <button onClick={() => tool('Stopped. Your question is still in the box.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1.5px solid #c05`, background: '#fff5f5', fontSize: 12, fontWeight: 700, color: '#c05', cursor: 'pointer', fontFamily: 'inherit' }}>Stop</button>
            <button onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, minWidth: 44, padding: '0 14px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        </div>

        {/* State 2: Can't use that */}
        <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 2 }}>STATE 2</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Can't use that</div>
            </div>
            <button onClick={() => onNav?.('ASKd3-AnyScreen')} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: 16, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Says so plainly and points to the right place.</div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, background: '#f7f8f7', borderRadius: 8, padding: '10px 12px' }}>
            I don't read wellness answers. They stay between Ella, her parents and you. You can see hers on the Wellness tab.
          </div>
          <button onClick={() => tool('Open Wellness')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1.5px solid ${G}`, background: '#fff', fontSize: 12, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>Open Wellness</button>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <div style={{ flex: 1, height: 44, borderRadius: 10, background: '#f7f8f7', border: `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 12, color: MUT, overflow: 'hidden' }}>How is Ella feeling this week?</div>
            <button onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, minWidth: 44, padding: '0 14px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        </div>

        {/* State 3: Don't know */}
        <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 2 }}>STATE 3</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Don't know</div>
            </div>
            <button onClick={() => onNav?.('ASKd3-AnyScreen')} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: 16, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Never guesses. Says what would be needed.</div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, background: '#f7f8f7', borderRadius: 8, padding: '10px 12px' }}>
            I can't tell from what's recorded. Penalties aren't tagged in your 9 games. Tag them in Clips and I can answer.
          </div>
          <button onClick={() => tool('Open Clips')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1.5px solid ${G}`, background: '#fff', fontSize: 12, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>Open Clips</button>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <div style={{ flex: 1, height: 44, borderRadius: 10, background: '#f7f8f7', border: `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 12, color: MUT, overflow: 'hidden' }}>How do we do at penalties?</div>
            <button onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, minWidth: 44, padding: '0 14px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        </div>

        {/* State 4: No signal */}
        <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 2 }}>STATE 4</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>No signal</div>
            </div>
            <button onClick={() => onNav?.('ASKd3-AnyScreen')} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: 16, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
          <div style={{ fontSize: 11, color: MUT, lineHeight: 1.4, background: '#f7f8f7', borderRadius: 8, padding: '8px 10px' }}>Uses only what you can see as head coach. Never sends anything by itself.</div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, background: '#f7f8f7', borderRadius: 8, padding: '10px 12px' }}>
            Clean Sheet can't reach the server right now. Your question is saved — it will answer when you're back online.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <div style={{ flex: 1, height: 44, borderRadius: 10, background: '#f7f8f7', border: `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 12, color: MUT, overflow: 'hidden' }}>Any question…</div>
            <button onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, minWidth: 44, padding: '0 14px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        </div>

      </div>
    </div>
  )
}
