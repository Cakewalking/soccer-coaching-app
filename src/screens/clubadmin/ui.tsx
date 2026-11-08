export const SubTabBar = ({ items, active, onSelect }: { items: { id: string; label: string }[]; active: string; onSelect: (id: string) => void }) => (
  <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff', overflowX: 'auto', flexShrink: 0 }}>
    {items.map(t => (
      <button key={t.id} onClick={() => onSelect(t.id)} style={{ flexShrink: 0, padding: '0 14px', height: 40, border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: active === t.id ? 700 : 400, cursor: 'pointer', color: active === t.id ? '#1f4a3e' : '#6f7f7b', borderBottom: active === t.id ? '2px solid #1f4a3e' : '2px solid transparent', whiteSpace: 'nowrap' }}>{t.label}</button>
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
