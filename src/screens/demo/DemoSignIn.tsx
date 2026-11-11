import { useState } from 'react'

interface Props {
  onDemo: () => void
  onSandbox: () => void
  onOpenSandbox: () => void
  onWhy: () => void
  hasSandbox?: boolean
}

export default function DemoSignIn({ onDemo, onSandbox, onOpenSandbox, onWhy, hasSandbox = false }: Props) {
  const [confirmReplace, setConfirmReplace] = useState(false)

  function handleStartEmpty() {
    if (hasSandbox && !confirmReplace) {
      setConfirmReplace(true)
      return
    }
    onSandbox()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ background: '#1f4a3e', padding: '0 32px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>Try Clean Sheet.</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Two ways in. You can switch between them at any time.</span>
        </div>
        <button onClick={onWhy} style={{ height: 32, padding: '0 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'none', color: 'rgba(255,255,255,0.8)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Why trust it</button>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 48px 0', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 28, height: 28, background: '#2f6252', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f' }}>Clean Sheet</span>
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: '#10211f' }}>How do you want to look around?</h1>
        <p style={{ margin: '0 0 40px', fontSize: 15, color: '#4a5a57', maxWidth: 560 }}>See it full of a made-up club's season, or start with nothing and set up your own.</p>
      </div>

      {/* Two cards */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 48px 48px', width: '100%', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Demo card */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#2f6252', marginBottom: 6 }}>No sign-in · Best for a first look</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f', marginBottom: 10 }}>Follow the demo</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5, marginBottom: 16 }}>Wattle Creek FC and Tall Timber Academy, mid-season, with games, video, sensors and messages already in.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'A guided tour for each of 20 roles, or look around on your own',
                'Every screen has data in it, so you see what a normal week looks like',
                'Nothing you tap is saved, and nothing needs setting up',
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 14, color: '#10211f', lineHeight: 1.4 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onDemo} style={{ height: 48, borderRadius: 12, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Start the demo</button>
          <button onClick={onWhy} style={{ height: 36, borderRadius: 10, border: 0, background: 'none', color: '#4a5a57', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>The idea in one minute</button>
        </div>

        {/* Sandbox card */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 6 }}>Yours to fill · Best for trying it properly</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f', marginBottom: 10 }}>Start with an empty club</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5, marginBottom: 16 }}>Your own sandbox. Set up a team, add players, plan a session and add a game, and watch each screen fill in.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                'Starts empty, exactly as a new club would see it',
                'What you add is saved in this browser for 14 days',
                'Stuck? Fill it with sample data in one tap',
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#f5f6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 14, color: '#10211f', lineHeight: 1.4 }}>{point}</span>
                </div>
              ))}
            </div>

            {confirmReplace ? (
              <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>You already have a sandbox</div>
                <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 14, lineHeight: 1.4 }}>Carry on with the one you have, or start again? Starting again removes everything in it.</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={onOpenSandbox} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Carry on</button>
                  <button onClick={onSandbox} style={{ flex: 1, height: 44, borderRadius: 10, border: '1.5px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Start again</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                <button onClick={handleStartEmpty} style={{ height: 48, borderRadius: 12, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Start with an empty club</button>
                <button onClick={onOpenSandbox} style={{ height: 48, borderRadius: 12, border: '1.5px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Open my sandbox</button>
              </div>
            )}
            <div style={{ marginTop: 14, fontSize: 13, color: '#6f7f7b', lineHeight: 1.5 }}>No email and no password. It stays on this device, so it won't be there on another phone or computer.</div>
          </div>
          <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: 1.5 }}>In a sandbox, use made-up names. Please don't enter real children's details. It isn't a live club, nobody is invited or messaged, and everything is deleted after 14 days.</div>
        </div>
      </div>
    </div>
  )
}
