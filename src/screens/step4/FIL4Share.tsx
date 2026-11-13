import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

type Access = 'edit' | 'view' | 'none'
type Group = { label: string; sub: string; access: Access }

export default function FIL4Share({ onClose }: { onClose?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [groups, setGroups] = useState<Group[]>([
    { label: 'Coaching team', sub: 'Sam, Rob, fitness coach', access: 'edit' },
    { label: "U12 Sam's families", sub: '17 families', access: 'view' },
    { label: 'Team manager', sub: 'Jess Marsh', access: 'view' },
    { label: 'The club', sub: 'Director, coordinators', access: 'none' },
  ])
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const accessLabels: Record<Access, string> = { edit: 'Can edit', view: 'Can see', none: 'No access' }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 48 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '32px', width: 520 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: INK, flex: 1 }}>Who can see this</div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, color: MUT, cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Summer sevens · team sheets</div>

          {groups.map((g, i) => (
            <div key={g.label} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{g.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{g.sub}</div>
              </div>
              <select value={g.access} onChange={e => setGroups(gs => gs.map((gx, j) => j === i ? { ...gx, access: e.target.value as Access } : gx))} style={{ height: 36, padding: '0 10px', borderRadius: 8, border: `1.5px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', color: INK }}>
                {(['edit', 'view', 'none'] as Access[]).map(a => <option key={a} value={a}>{accessLabels[a]}</option>)}
              </select>
            </div>
          ))}

          <div style={{ marginTop: 20, background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>Open link not allowed</div>
            <div style={{ fontSize: 12, color: '#78350f' }}>This file contains player names. It can only be shared with people in Clean Sheet.</div>
            <button onClick={() => st('Downloading with names replaced by shirt numbers.')} style={{ marginTop: 8, height: 30, padding: '0 14px', borderRadius: 999, background: '#fff', border: '1.5px solid #fde68a', fontSize: 12, color: '#92400e', cursor: 'pointer', fontFamily: 'inherit' }}>Download without names</button>
          </div>

          <div style={{ marginTop: 20, fontSize: 13, color: MUT }}>Sharing with families posts the file into the team chat and shows it on their phones.</div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={() => { st('Sharing settings saved.'); onClose?.() }} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
