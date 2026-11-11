import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
type PollType = 'help' | 'coming' | 'own'
export default function TM13ManagerPoll(_: { onBack?: () => void }) {
  const [type, setType] = useState<PollType>('help')
  const [fillRoster, setFillRoster] = useState(true)
  const [remind, setRemind] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} style={{ width: 52, height: 32, borderRadius: 999, background: on ? G : '#c5c8c4', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start', padding: 3, flexShrink: 0 }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
    </button>
  )
  const labels: Record<PollType, { q: string; opts: string[] }> = {
    help: { q: 'Who can do canteen on Saturday?', opts: ['9 to 10', '10 to 11', '11 to 12'] },
    coming: { q: "Who's coming on Saturday?", opts: ['Coming', "Can't come", 'Not sure yet'] },
    own: { q: 'Your question here', opts: ['Option 1', 'Option 2'] },
  }
  const { q, opts } = labels[type]
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam team chat</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>New poll</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(['help', 'coming', 'own'] as PollType[]).map(pt => (
            <button key={pt} onClick={() => setType(pt)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, fontSize: 14, fontWeight: 700, border: type === pt ? `2px solid ${G}` : `1px solid ${LN}`, background: type === pt ? PALE : '#fff', color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>
              {{ help: 'Who can help?', coming: "Who's coming?", own: 'Your own' }[pt]}
            </button>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Question</div>
          <div style={{ minHeight: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 15, background: '#fff' }}>{q}</div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Answers · one family each</div>
          {opts.map((opt, i) => (
            <div key={i} style={{ minHeight: 44, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 15 }}>{opt}</div>
          ))}
          <button onClick={() => t('Answer added.')} style={{ minHeight: 44, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, background: 'none', border: 0, cursor: 'pointer', fontFamily: 'inherit', color: G }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>Add an answer
          </button>
        </div>
        <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '4px 14px' }}>
          {[
            { label: 'Fill in the duty roster', sub: 'Each yes goes straight onto Saturday\'s roster', on: fillRoster, toggle: () => setFillRoster(x => !x) },
            { label: 'Remind anyone who hasn\'t answered', sub: 'Friday at noon, once', on: remind, toggle: () => setRemind(x => !x) },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 58, borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
              </div>
              <Toggle on={item.on} onToggle={item.toggle} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}` }}>
        <button onClick={() => t('Poll sent to 17 families. The roster fills in as they answer.')} style={{ width: '100%', height: 52, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>Send poll</button>
      </div>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
