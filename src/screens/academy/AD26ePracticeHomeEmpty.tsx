// AD26e-PracticeHomeEmpty: Empty: No team has a practice at home yet (pack v35).
// Drawn as the other empty owner boards are. The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

const HOW: [string, string][] = [['The curriculum picks', 'One for each week of a block'], ['You set the rules', 'How long, how often, video or not'], ['The coach makes it theirs', 'Keeps it, swaps it or films one']]

export default function AD26ePracticeHomeEmpty() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Practice at home</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Not turned on</span>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px', alignItems: 'start' }}>
        <section aria-label="Practice at home" style={{ ...S.tile, padding: '56px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
            <span style={{ width: 72, height: 72, borderRadius: 999, background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9H4z" /><circle cx="12" cy="14" r="2.5" /></svg>
            </span>
            <span style={{ fontSize: 22, lineHeight: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>No team has a practice at home yet</span>
            <span style={{ fontSize: 15, lineHeight: '22px', color: '#4a5a57', maxWidth: 460 }}>Turn it on for a program and each team gets one short practice a week, matched to the curriculum.</span>
            <Tap say="Pick the program. It starts next Monday." style={S.primary}>Turn it on for a program</Tap>
          </div>
        </section>
        <aside aria-label="How it works" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>How it works</h2>
          {HOW.map(([title, line], i) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{title}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{line}</span>
              </span>
            </div>
          ))}
        </aside>
      </main>
    </>
  )
}
