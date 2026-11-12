import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const CHOICES = [
  { label: 'Filming in games and training', val: true },
  { label: 'Boot sensors and a GPS vest', val: true },
  { label: 'Quick wellness check-ins', val: true },
  { label: 'Growth checks', val: true },
  { label: 'Sending Harper her own clips', val: false },
  { label: 'Club highlights and social media', val: false },
  { label: 'First-aid notes for the team manager', val: true },
]

export default function P2cParentConsentStep2() {
  const [deleteSheet, setDeleteSheet] = useState(false)
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', padding: '32px 20px', position: 'relative' }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: GD, marginBottom: 2 }}>Thanks, Kate.</div>
      <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Sam can see your choices now.</div>

      {CHOICES.map(c => (
        <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, color: INK }}>{c.label}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.val ? G : MUT }}>{c.val ? 'Yes' : 'No'}</div>
        </div>
      ))}

      <div style={{ fontSize: 12, color: MUT, marginTop: 16, lineHeight: 1.5 }}>Change any of these whenever you like in this app. You can also download everything we hold about Harper, or ask us to delete it.</div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16, marginBottom: 20 }}>
        <button onClick={() => st("Downloading Harper's data.")} style={{ flex: 1, height: 44, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Download Harper's data</button>
        <button onClick={() => setDeleteSheet(true)} style={{ flex: 1, height: 44, borderRadius: 12, border: `1px solid #c05`, background: '#fff', color: '#c05', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete Harper's data</button>
      </div>

      <button onClick={() => st('Done. Email on its way.')} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Done · we've emailed you a copy</button>

      {deleteSheet && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100, padding: '0 0 24px' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 24, width: 350 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>Delete Harper's data?</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>This can't be undone.</div>
            {[
              ['Clips and video', 'Removed from every playlist'],
              ['Sensor and growth numbers', 'Deleted, not just hidden'],
              ['Wellness answers', 'Deleted'],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{k}</div>
                <div style={{ fontSize: 12, color: MUT }}>{v}</div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 10, marginBottom: 16 }}>Harper can still play. The club keeps her registration and the first-aid card so she's safe at games.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteSheet(false)} style={{ flex: 1, height: 44, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { st("Harper's data has been deleted."); setDeleteSheet(false) }} style={{ flex: 1, height: 44, borderRadius: 12, border: 0, background: '#c05', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Delete her data</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:200, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
