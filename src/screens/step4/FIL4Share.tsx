import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Access = 'edit' | 'view' | 'none'
type Group = { label: string; sub: string; access: Access }

const accessLabel: Record<Access, string> = { edit: 'Can edit', view: 'Can see', none: 'No access' }

export default function FIL4Share({ onClose }: { onClose?: () => void }) {
  const [groups, setGroups] = useState<Group[]>([
    { label: 'Coaching team', sub: 'Sam, Rob, fitness coach', access: 'edit' },
    { label: "U12 Sam's families", sub: '17 families', access: 'view' },
    { label: 'Team manager', sub: 'Jess Marsh', access: 'edit' },
    { label: 'The club', sub: 'Director, coordinators', access: 'none' },
  ])
  const [shared, setShared] = useState(false)
  const [downloading, setDownloading] = useState(false)

  function cycleAccess(i: number) {
    const order: Access[] = ['edit', 'view', 'none']
    setGroups(gs => gs.map((g, j) => j === i ? { ...g, access: order[(order.indexOf(g.access) + 1) % 3] } : g))
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '32px', width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, flex: 1 }}>Who can see this</div>
          <button onClick={() => onClose?.()} style={{ background: 'none', border: 'none', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>Close</button>
        </div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Summer sevens · team sheets</div>

        {groups.map((g, i) => (
          <div key={g.label} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{g.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{g.sub}</div>
            </div>
            <button onClick={() => cycleAccess(i)} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1.5px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', color: INK, background: '#fff' }}>
              {accessLabel[g.access]}
            </button>
          </div>
        ))}

        <div style={{ marginTop: 20, background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 10, padding: '12px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>Open link not allowed</div>
          <div style={{ fontSize: 12, color: '#78350f' }}>This file contains player names. It can only be shared with people in Clean Sheet.</div>
          <button onClick={() => setDownloading(true)} style={{ marginTop: 8, height: 30, padding: '0 14px', borderRadius: 999, background: downloading ? PALE : '#fff', border: '1.5px solid #fde68a', fontSize: 12, color: downloading ? G : '#92400e', cursor: 'pointer', fontFamily: 'inherit' }}>
            {downloading ? 'Downloading ✓' : 'Download without names'}
          </button>
        </div>

        <div style={{ marginTop: 20, fontSize: 13, color: MUT }}>Sharing with families posts the file into the team chat and shows it on their phones.</div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button onClick={() => onClose?.()} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={() => setShared(true)} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: shared ? '#5a8a7a' : G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {shared ? 'Shared ✓' : 'Share'}
          </button>
        </div>
      </div>
    </div>
  )
}
