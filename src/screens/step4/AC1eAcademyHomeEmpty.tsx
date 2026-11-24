import OwnerHeader from '../academy/OwnerHeader'
import { openScreen } from '../openThing'
import { Glyph } from '../Glyph'
import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function AC1eAcademyHomeEmpty({ onNav }: { onBack?: () => void; onNav?: (id: string) => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#faf5ec', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>

      {/* The owner's menu: six main items and the screens under each (academy handover, 24 Nov) */}
      <OwnerHeader current="AC1e-AcademyHomeEmpty" onGo={onNav ?? openScreen} />

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Overview</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Tall Timber Academy · no programs yet</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>

        {/* Left 8 cols: empty state tile */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 16, maxWidth: 400, textAlign: 'center' as const, margin: 'auto' }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}><Glyph n="clipboard" /></div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginBottom: 8 }}>Add your first program</div>
              <div style={{ fontSize: 15, color: MUT, lineHeight: 1.5 }}>A program is a group that trains together — Foundation, Development, or one-on-one sessions.</div>
            </div>
            <button onClick={() => t('New program setup...')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              Add a program
            </button>
          </div>
        </div>

        {/* Right 4 cols: steps tile */}
        <div style={{ gridColumn: 'span 4', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: INK, marginBottom: 4 }}>Three steps to open</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16, flex: 1 }}>
            {[
              { n: 1, bold: 'Add a program', gray: 'Set the age group, days and times' },
              { n: 2, bold: 'Add your coaches', gray: 'They get their own login' },
              { n: 3, bold: 'Share the trial link', gray: 'Families book their first session' },
            ].map(({ n, bold, gray }) => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: G, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{bold}</div>
                  <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{gray}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: MUT, fontSize: 13, borderTop: `1px solid ${LN}`, paddingTop: 10, marginTop: 4 }}>Takes about 10 minutes.</div>
        </div>

      </div>

      {/* TOAST */}
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
