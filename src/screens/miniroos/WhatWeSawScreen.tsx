import { useState } from 'react'

type Sel = Set<number>

const WENT_WELL = ['Brave dribbling', 'Lots of shots', 'Passing to a friend', 'Getting back to help', 'Everyone had fun']
const NEXT_STEP = ['Find space', 'Use both feet', 'Look up', 'Keep going after a mistake']
const NEEDS_HAND = ['Poppy', 'Arlo', 'Jude', 'Nobody this week']

function PillGroup({ label, items, sel, toggle }: { label: string; items: string[]; sel: Sel; toggle: (i: number) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 16, fontWeight: 700 }}>{label}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
        {items.map((item, i) => (
          <button key={i} onClick={() => toggle(i)} style={{ minHeight: 48, padding: '0 16px', borderRadius: '999px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: sel.has(i) ? 0 : '1px solid #c5c8c4', background: sel.has(i) ? '#2f6252' : '#fff', color: sel.has(i) ? '#fff' : '#10211f' }}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function WhatWeSawScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [wentWell, setWentWell] = useState<Sel>(new Set([0, 2]))
  const [nextStep, setNextStep] = useState<Sel>(new Set([0]))
  const [needsHand, setNeedsHand] = useState<Sel>(new Set([1]))
  const [toast, setToast] = useState('')

  const toggle = (setter: (fn: (prev: Sel) => Sel) => void) => (i: number) => {
    setter(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s })
  }

  const handleSave = () => {
    setToast('Saved. Sending thank-you to parents.')
    setTimeout(() => { setToast(''); onSave() }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>What we saw</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>Sat 6 Jun v Northgate City · no score kept · 30 seconds</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Back to turns</button>
          <button onClick={handleSave} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Save and thank the parents</button>
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <PillGroup label="1 · What went well?" items={WENT_WELL} sel={wentWell} toggle={toggle(setWentWell)} />
          <PillGroup label="2 · What's next?" items={NEXT_STEP} sel={nextStep} toggle={toggle(setNextStep)} />
          <PillGroup label="3 · Who needs a hand?" items={NEEDS_HAND} sel={needsHand} toggle={toggle(setNeedsHand)} />
          <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginTop: 'auto' }}>Tuesday's four games are picked from what you tap here. Nothing is scored and no child is rated.</span>
        </section>

        <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700 }}>What happens with this</h2>
          {[
            { n: '1', title: 'Tuesday\'s games', desc: 'One game on finding space' },
            { n: '2', title: 'Arlo', desc: 'A reminder to show him each game first' },
            { n: '3', title: 'Parents', desc: 'A thank-you with one thing the team did well' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8' }}>
              <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.n}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{r.title}</span>
                <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{r.desc}</span>
              </span>
            </div>
          ))}
          <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 8 }}>Turns in goal and as captain were saved from the game timer.</span>
        </aside>
      </main>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
