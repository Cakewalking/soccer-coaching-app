import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM6ParentChatSettings(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [notif, setNotif] = useState<string>('pollsname')
  const [quietHours, setQuietHours] = useState(true)
  const [savePhotos, setSavePhotos] = useState(false)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const notifOptions = [
    { key: 'every', label: 'Every message' },
    { key: 'pollsname', label: 'Polls and when my name is used' },
    { key: 'nothing', label: 'Nothing' },
  ]

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <div onClick={onToggle} style={{ width: 48, height: 28, borderRadius: 14, background: on ? G : '#ccc', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff', transition: 'left 0.2s' }} />
      </div>
    )
  }

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={_.onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: 0, lineHeight: 1 }}>‹</button>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Chat settings</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 100px', display: 'flex', flexDirection: 'column' as const, gap: 20 }}>

        {/* Notifications section */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8, paddingLeft: 4 }}>Notifications</div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
            {notifOptions.map((opt, i) => (
              <div
                key={opt.key}
                onClick={() => setNotif(opt.key)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: i < notifOptions.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', background: notif === opt.key ? PALE : '#fff' }}
              >
                <div style={{ width: 22, height: 22, borderRadius: 999, border: notif === opt.key ? `6px solid ${G}` : `2px solid #ccc`, background: '#fff', flexShrink: 0 }} />
                <span style={{ fontSize: 15, fontWeight: notif === opt.key ? 600 : 400, color: INK }}>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other section — toggles */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8, paddingLeft: 4 }}>Other</div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: INK }}>Quiet hours</div>
                <div style={{ fontSize: 13, color: MUT }}>8 pm to 7 am</div>
              </div>
              <Toggle on={quietHours} onToggle={() => setQuietHours(v => !v)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: INK }}>Save photos automatically</div>
              </div>
              <Toggle on={savePhotos} onToggle={() => setSavePhotos(v => !v)} />
            </div>
          </div>
        </div>

        {/* Navigation rows */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          <div onClick={() => setSheet('whoinchat')} style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', borderBottom: `1px solid ${LN}`, cursor: 'pointer' }}>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: INK }}>Who's in this chat</span>
            <span style={{ fontSize: 18, color: MUT }}>›</span>
          </div>
          <div onClick={() => setSheet('media')} style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', borderBottom: `1px solid ${LN}`, cursor: 'pointer' }}>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: INK }}>Photos, videos and files</span>
            <span style={{ fontSize: 18, color: MUT }}>›</span>
          </div>
          <div onClick={() => t('Opening report flow...')} style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', cursor: 'pointer' }}>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#c0392b' }}>Report a message</span>
            <span style={{ fontSize: 18, color: MUT }}>›</span>
          </div>
        </div>

        {/* Footer note */}
        <div style={{ fontSize: 13, color: MUT, padding: '0 4px', lineHeight: 1.5 }}>
          These settings are for U12 Sam only. You can't turn off announcements from the club.
        </div>
      </div>

      {/* Sheet: Who's in chat */}
      {sheet === 'whoinchat' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 350, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: INK, marginBottom: 4 }}>Who's in U12 Sam</div>
              <div style={{ fontSize: 14, color: MUT }}>17 families, Sam K and Rob</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
              {[
                { initials: 'SK', name: 'Sam K', role: 'Coach', roleColor: G },
                { initials: 'RO', name: 'Rob Owusu', role: 'Manager', roleColor: MUT },
                { initials: 'LT', name: 'Linh Tran', role: 'You', roleColor: MUT },
              ].map((p, i) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>{p.initials}</div>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: INK }}>{p.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: p.roleColor, background: p.roleColor === G ? PALE : '#f0f0f0', borderRadius: 999, padding: '2px 8px' }}>{p.role}</span>
                </div>
              ))}
              <div style={{ padding: '10px 0', fontSize: 14, color: MUT }}>+ 14 more families</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSheet(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Sheet: Media */}
      {sheet === 'media' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 350, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: INK, marginBottom: 4 }}>Photos, videos and files</div>
              <div style={{ fontSize: 14, color: MUT }}>U12 Sam · this season</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
              {[
                { icon: '🖼️', label: 'Pre-season photo · 12 Jan · tap to view' },
                { icon: '🎥', label: 'Training video · 3 Mar · 0:28' },
                { icon: '📄', label: 'Fixture PDF · 2 Jun · 84 KB' },
              ].map((item, i) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, color: INK }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSheet(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
