import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU6Review({ onBack }: { onBack?: () => void }) {
  const [decision, setDecision] = useState<'both' | 'move' | 'back' | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Playing across</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Leo Costa · trial review · 18 June</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          {decision && <button onClick={() => st('Decision recorded. Leo and his family will be told.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record decision</button>}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Leo Costa · week 4 of 4</div>
            <div style={{ fontSize: 13, color: MUT }}>U13 Chris → U14 Josh · trial started 20 May · review 18 June</div>
          </div>

          {/* Leo's words first */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Leo's words first</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '14px 16px', marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 4 }}>How was each session?</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Hard but good', 'Hard but good', 'Really enjoyed it', 'Want to stay'].map((w, i) => (
                  <div key={i} style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 8, padding: '8px 10px', fontSize: 12, color: INK }}>Session {i + 1}: "{w}"</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 13, color: MUT }}>Leo said yes to doing it again after every session.</div>
          </div>

          {/* Numbers */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Numbers with U14 Josh · 4 sessions</div>
            <div style={{ fontSize: 12, color: G, marginBottom: 12 }}>These sessions replace the own-age numbers as the main view now.</div>
            {[
              { label: 'Duels won', val: '62%', pct: 0.62, tag: 'Middle' },
              { label: 'Forward passes', val: '71%', pct: 0.71, tag: 'Upper third' },
              { label: 'Sprints a game', val: '14', pct: 0.68, tag: 'Upper third' },
            ].map(r => (
              <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '160px 60px 1fr 100px', gap: 12, padding: '8px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: INK }}>{r.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.val}</div>
                <div style={{ position: 'relative', height: 16 }}>
                  <div style={{ position: 'absolute', left: '20%', right: '20%', top: 4, height: 8, background: '#e0ece8', borderRadius: 999 }} />
                  <div style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: 16, background: GD, borderRadius: 999 }} />
                  <div style={{ position: 'absolute', left: `${r.pct * 100}%`, top: 2, width: 12, height: 12, borderRadius: '50%', background: G, border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', transform: 'translateX(-6px)' }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, borderRadius: 999, padding: '2px 10px', textAlign: 'center' }}>{r.tag}</div>
              </div>
            ))}
          </div>

          {/* Three choices */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Three choices</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { key: 'both' as const, label: 'Do both', sub: 'Train and play for U14 Josh. Play league for U13 Chris when available. Check-in every 6 weeks.' },
                { key: 'move' as const, label: 'Move up', sub: 'Play only for U14 Josh from next week. U13 Chris is told today. Leo\'s history shows a completed trial.' },
                { key: 'back' as const, label: 'Back to own age', sub: 'Leo returns to U13 Chris only. His history shows a completed trial, not a failure. No label attached.' },
              ].map(c => (
                <div key={c.key} onClick={() => setDecision(c.key)} style={{ flex: 1, background: '#fff', border: `2px solid ${decision === c.key ? G : LN}`, borderRadius: 14, padding: '16px 20px', cursor: 'pointer' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: decision === c.key ? G : INK, marginBottom: 8 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Both coaches say</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Chris: "He's held his own. I'd say move up." Ollie (U16, acting for Josh): "Happy to have him."</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Family</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Jess Costa read the update on Monday. No questions yet.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
