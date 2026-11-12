import { useState } from 'react'

interface EmptyItem { title: string; desc: string }

export interface EmptyCardProps {
  icon: string
  title: string
  desc: string
  cta?: string
  sidebarTitle?: string
  sidebarBody?: string
  items?: EmptyItem[]
  footer?: string
}

export const FOOTER_DEFAULT = 'This page fills in on its own once there\'s something to show.'

export function EmptyCard({ icon, title, desc, cta, sidebarTitle = 'What you\'ll see', sidebarBody, items = [], footer }: EmptyCardProps) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 16, padding: '16px 20px 20px', boxSizing: 'border-box', alignContent: 'start', flexGrow: 1 }}>
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 380, padding: '40px 48px', textAlign: 'center', gap: 10 }}>
        <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon}/></svg>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>{title}</div>
        <div style={{ fontSize: 15, color: '#4a5a57', lineHeight: '22px', maxWidth: 380 }}>{desc}</div>
        {cta && <button onClick={() => st('Opening setup.')} style={{ marginTop: 6, height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{cta}</button>}
      </div>
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{sidebarTitle}</div>
        {sidebarBody && <p style={{ margin: '0 0 12px', fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>{sidebarBody}</p>}
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#2f6252' }}>{i + 1}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.desc}</div>
            </div>
          </div>
        ))}
        {footer && <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 13, color: '#4a5a57', lineHeight: '18px', borderTop: items.length > 0 ? '1px solid #e9eae8' : 'none' }}>{footer}</div>}
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}

export const SubTabBar = ({ items, active, onSelect }: { items: { id: string; label: string }[]; active: string; onSelect: (id: string) => void }) => (
  <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff', overflowX: 'auto', flexShrink: 0 }}>
    {items.map(t => (
      <button key={t.id} onClick={() => onSelect(t.id)} style={{ flexShrink: 0, padding: '0 14px', height: 44, border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: active === t.id ? 700 : 400, cursor: 'pointer', color: active === t.id ? '#1f4a3e' : '#6f7f7b', borderBottom: active === t.id ? '2px solid #1f4a3e' : '2px solid transparent', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>{t.label}</button>
    ))}
  </div>
)

export const ResultChip = ({ r }: { r: string }) => (
  <span style={{ width: 18, height: 18, borderRadius: 4, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: r === 'W' ? '#2f6252' : r === 'D' ? '#c3a84a' : '#c39797', color: '#fff', flexShrink: 0 }}>{r}</span>
)

export const BackBtn = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: '0 0 14px 0' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    {label}
  </button>
)
