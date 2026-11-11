const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'

const ABOUT_CHIPS = ['Me', 'A friend', 'A grown-up', 'Not sure']

const Chip = ({ label, active }: { label: string; active?: boolean }) => (
  <div style={{ height: 40, padding: '0 16px', borderRadius: 99, border: `2px solid ${active ? G : '#c5c8c4'}`, background: active ? PALE : '#fff', display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: active ? 700 : 500, color: active ? G : INK, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>{label}</div>
)

export default function PC2bTellHelen(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, height: 844, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={_?.onBack} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.18)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC</span>
          <span style={{ display: 'block', fontSize: 19, fontWeight: 700 }}>Write to Helen</span>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: PALE, color: G, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>HP</div>
          <div>
            <strong style={{ fontSize: 16 }}>Helen Park</strong>
            <div style={{ fontSize: 13, color: MUT }}>Welfare officer · Wattle Creek FC</div>
            <div style={{ fontSize: 13, color: MUT }}>Only Helen will read your message</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Who is it about?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {ABOUT_CHIPS.map(c => <Chip key={c} label={c} active={c === 'Me'} />)}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>What happened?</div>
          <textarea
            placeholder="Write what you want Helen to know. You can say as much or as little as you like."
            style={{ width: '100%', minHeight: 180, borderRadius: 12, border: '2px solid #c5c8c4', padding: '12px 14px', fontSize: 15, lineHeight: '22px', fontFamily: 'inherit', boxSizing: 'border-box' as const, resize: 'vertical' as const, color: INK }}
            defaultValue=""
          />
        </div>
        <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px', fontSize: 13, lineHeight: '19px', color: G }}>
          Helen will respond to you privately. This message will not be shared with coaches or other parents without your permission.
        </div>
        <button style={{ width: '100%', height: 52, borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Send to Helen</button>
      </div>
    </div>
  )
}
