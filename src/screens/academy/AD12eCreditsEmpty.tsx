// AD12e-CreditsEmpty: Empty: Nothing is owed to families.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD12eCreditsEmpty() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Credits and pauses</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Nothing owed</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }} />
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="Credits and pauses" style={S.tile}>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
            <span style={{ width: 72, height: 72, borderRadius: 999, background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v18M16 7H10a3 3 0 000 6h4a3 3 0 010 6H7" />
              </svg>
            </span>
            <span style={{ fontSize: 22, lineHeight: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>Nothing is owed to families</span>
            <span style={{ fontSize: 15, lineHeight: '22px', color: '#4a5a57', maxWidth: 460 }}>Make-ups, credits, pauses and refunds show here as they happen.</span>
            <Tap say="Your rules open: make-ups, pauses and refunds." style={S.primary}>See your rules</Tap>
          </div>
        </section>
        <aside aria-label="Your rules cover" style={S.tile}>
          <h2 style={S.h2}>Your rules cover</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Make-ups</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Notice and when they can be used</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Pauses</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>How long a place is held</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Refunds</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>What comes back</span>
            </span>
          </div>
        </aside>
      </main>
    </>
  )
}
