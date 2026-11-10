import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SPp8StandInAsked(_: { onBack?: () => void }) {
  const [accepted, setAccepted] = useState<boolean | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  function respond(val: boolean) {
    setAccepted(val)
    t(val
      ? 'Sam and Rob have been told you\'re in. The team will get a message.'
      : 'Sam has been told. No worries at all.')
  }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative', margin: '0 auto' }}>
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>9:41</div>
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        {/* Sam's ask */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '20px 18px', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: G }}>SC</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Sam (Head coach)</div>
              <div style={{ fontSize: 12, color: MUT }}>Message via Clean Sheet</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.6, marginBottom: 14 }}>Hi Linh. I'm away from 26 September to 11 October — 3 games and training in between. Jess Wu is leading the sessions but it would be great to have you there as well. Would you be up for it?</div>

          {accepted === null ? (
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              <button onClick={() => respond(true)} style={{ height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Yes, I'll be there</button>
              <button onClick={() => respond(false)} style={{ height: 48, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Sorry, I can't</button>
            </div>
          ) : (
            <div style={{ padding: '12px 14px', background: accepted ? PALE : '#f7f8f7', borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: accepted ? GD : MUT }}>
                {accepted ? 'You\'re in! Sam and Rob know.' : 'Sam has been told. Thanks anyway.'}
              </div>
            </div>
          )}
        </div>

        {/* WWC note */}
        <div style={{ background: '#fff3d6', border: `1px solid #e8d4a0`, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6b5a1a', marginBottom: 4 }}>Working with Children check</div>
          <div style={{ fontSize: 13, color: '#7a6a2a', lineHeight: 1.5 }}>To lead or support a session you need a current check. Yours is still being processed — the app will remind Sam when it clears.</div>
        </div>

        {/* What you'll see */}
        {accepted && (
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 6 }}>What you'll see in the app</div>
            {[
              'The session plan for each week',
              'Player notes (allergies, injuries)',
              'Who is coming to each session',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 8, padding: '4px 0', alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: G, flex: 'none', marginTop: 7 }} />
                <div style={{ fontSize: 13, color: G }}>{item}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
