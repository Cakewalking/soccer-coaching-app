import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV_BG = '#40826d'
function TopBar() {
  return (
    <div style={{ flexShrink: 0, height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
      <div style={{ flexGrow: 1, display: 'flex', gap: 2 }}>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map((n, i) => (
          <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, background: i === 0 ? NAV_BG : 'transparent', color: i === 0 ? '#fff' : '#e9eae8', fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center' }}>{n}</div>
        ))}
      </div>
      <div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>U12 Sam · Wattle Creek</div>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>SK</div>
    </div>
  )
}
function SubBar() {
  return (
    <div style={{ flexShrink: 0, height: 44, background: '#fff', borderBottom: `1px solid #c5c8c4`, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
      {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map((n, i) => (
        <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: i === 1 ? INK : MUT, borderBottom: i === 1 ? `3px solid ${NAV_BG}` : '3px solid transparent', boxSizing: 'border-box' }}>{n}</div>
      ))}
    </div>
  )
}
type PType = 'coming' | 'help' | 'date' | 'own'
const ptypes: { key: PType; label: string }[] = [
  { key: 'coming', label: "Who's coming?" },
  { key: 'help', label: 'Who can help?' },
  { key: 'date', label: 'Pick a date' },
  { key: 'own', label: 'Your own question' },
]
const presets: Record<PType, { q: string; opts: string[] }> = {
  coming: { q: "Who's coming on Saturday? Harbour Rovers, 9:30 at home", opts: ['Coming', "Can't come", 'Not sure yet'] },
  help: { q: 'Who can do canteen on Saturday?', opts: ['9 to 10', '10 to 11', '11 to 12'] },
  date: { q: 'Which date works for the end of season lunch?', opts: ['Saturday 28 June', 'Sunday 29 June', 'Either works'] },
  own: { q: 'Your question here', opts: ['Option 1', 'Option 2'] },
}
export default function CH4NewPoll(_: { onBack?: () => void }) {
  const [ptype, setPtype] = useState<PType>('coming')
  const [fillComing, setFillComing] = useState(true)
  const [remind, setRemind] = useState(true)
  const [showWho, setShowWho] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const { q, opts } = presets[ptype]
  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} style={{ width: 52, height: 32, borderRadius: 999, background: on ? G : '#c5c8c4', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start', padding: 3, flexShrink: 0 }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
    </button>
  )
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <TopBar />
      <SubBar />
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>New poll</h1>
          <span style={{ fontSize: 14, color: MUT }}>To U12 Sam team chat</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Cancelled.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={() => t('Poll sent to 17 families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Send poll</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Start from</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
              {ptypes.map(pt => (
                <button key={pt.key} onClick={() => setPtype(pt.key)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: ptype === pt.key ? `2px solid ${G}` : `1px solid #c5c8c4`, background: ptype === pt.key ? PALE : '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{pt.label}</button>
              ))}
            </div>
          </div>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Question</div>
              <div style={{ minHeight: 48, border: `1px solid #c5c8c4`, borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 15, background: '#fff' }}>{q}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Answers</div>
            {opts.map((opt, i) => (
              <div key={i} style={{ minHeight: 44, border: `1px solid #c5c8c4`, borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 15 }}>{opt}</div>
            ))}
            <button onClick={() => t('Answer added.')} style={{ alignSelf: 'flex-start', height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>Add an answer
            </button>
            <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>Up to 10 answers. Parents answer once for each of their children.</div>
          </div>
        </div>
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>What the answers do</div>
            {[
              { label: "Fill in Who's coming for Saturday", sub: "No need to copy answers across", on: fillComing, toggle: () => setFillComing(x => !x) },
              { label: 'Remind anyone who hasn\'t answered', sub: 'Friday at noon, once', on: remind, toggle: () => setRemind(x => !x) },
              { label: 'Show who voted for what', sub: 'Off makes the poll anonymous', on: showWho, toggle: () => setShowWho(x => !x) },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${LN}` }}>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
                </div>
                <Toggle on={item.on} onToggle={item.toggle} />
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${LN}` }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Closes</div>
                <div style={{ fontSize: 13, color: MUT }}>Friday 6 pm</div>
              </div>
              <button onClick={() => t('Pick a closing time.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Change</button>
            </div>
          </div>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>How it will look</div>
            <div style={{ background: '#f7f8f7', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: G }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>POLL
              </div>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>{q}</strong>
              {opts.map((opt, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #6f7f7b', flexShrink: 0 }} />
                    <span style={{ flexGrow: 1 }}>{opt}</span>
                    <strong>0</strong>
                  </div>
                  <div style={{ borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', width: '0%', background: NAV_BG }} /></div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: MUT }}>One answer per player · closes Fri 6 pm</div>
            </div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
