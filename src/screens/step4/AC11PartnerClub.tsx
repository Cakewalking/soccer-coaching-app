import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function AC11PartnerClub(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const rows = [
    {
      bold: 'Who coaches on game day',
      desc: "The academy's coach · Reece Whitlam",
      btnLabel: 'Change', btnPrimary: false,
      toastMsg: "Choose: the academy's coach, or a coach from the club.",
    },
    {
      bold: 'Game time',
      desc: 'Set by Wattle Creek: every player gets at least half a game',
      badgeLabel: 'Set by the club', badgeBg: '#ebebeb', badgeColor: MUT,
      btnLabel: '', btnPrimary: false, toastMsg: '',
    },
    {
      bold: 'Registration',
      desc: '14 of 16 are registered with Football Victoria through the club',
      btnLabel: 'Chase 2', btnPrimary: false,
      toastMsg: 'Reminder sent to 2 families to finish club registration.',
    },
    {
      bold: 'Concerns',
      desc: "At a game: Helen Park, the club's welfare officer. At training: you",
      btnLabel: 'How it works', btnPrimary: false,
      toastMsg: 'Opening concern flow...',
    },
    {
      bold: 'Money',
      desc: 'Club registration goes straight to the club. Term fees come to you',
      btnLabel: 'Open fees', btnPrimary: false,
      toastMsg: 'Opening fees...',
    },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>

      {/* TOP NAV */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 0, flexShrink: 0 }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 20, letterSpacing: -0.5, marginRight: 36 }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[
            { label: 'Home', icon: '⌂' },
            { label: 'Programs', icon: '☰' },
            { label: 'Players', icon: '👤' },
            { label: 'Coaches', icon: '🎓' },
            { label: 'Money', icon: '$' },
          ].map(({ label, icon }) => (
            <button key={label} style={{ background: label === 'Home' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 40, fontSize: 14, fontWeight: label === 'Home' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 15 }}>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: '#fff', color: INK, border: 'none', borderRadius: 20, padding: '0 14px', height: 32, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tall Timber Academy ▾</button>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>DO</div>
        </div>
      </div>

      {/* SUB NAV */}
      <div style={{ background: '#fff', height: 44, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 0, borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        {['Overview', 'Trials', 'Reports', 'Child safety', 'Partner club'].map(tab => (
          <button key={tab} style={{ background: 'none', border: 'none', borderBottom: tab === 'Partner club' ? `2px solid ${G}` : '2px solid transparent', color: tab === 'Partner club' ? G : MUT, fontWeight: tab === 'Partner club' ? 700 : 500, fontSize: 14, padding: '0 16px', height: 44, cursor: 'pointer' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Partner club</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Your game team plays as part of Wattle Creek FC</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('New message to Rachel M, director of football.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Message the club</button>
          <button onClick={() => t('Pick a group. The club is asked to enter it in a league.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>+ Add a game team</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, alignItems: 'start' }}>

        {/* Left 8 cols */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>How the partnership runs</div>
            <span style={{ background: '#e3f0ea', color: GD, fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>Linked</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 18px', minHeight: 68, borderTop: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{r.bold}</div>
                <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{r.desc}</div>
              </div>
              {r.badgeLabel && (
                <span style={{ background: r.badgeBg, color: r.badgeColor, fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6, flexShrink: 0 }}>{r.badgeLabel}</span>
              )}
              {r.btnLabel && (
                <button onClick={() => t(r.toastMsg)} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>{r.btnLabel}</button>
              )}
            </div>
          ))}
          <div style={{ padding: '10px 18px 14px', borderTop: `1px solid ${LN}` }}>
            <div style={{ color: MUT, fontSize: 13 }}>You train the players and run the team. The club holds the registrations and the place in the league, so its rules apply on game day.</div>
          </div>
        </div>

        {/* Right 4 cols */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Game team tile */}
          <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>Game team</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>U13 Timber</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>16 players from Advanced · Saturday league, 11 a side · entered by Wattle Creek FC</div>
            <button onClick={() => t('Opening game day...')} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' as const, marginTop: 4 }}>See Saturday</button>
          </div>

          {/* What each side sees tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 12 }}>What each side sees</div>
            {[
              { letter: 'C', bg: '#f5ede0', color: '#7a5c2e', bold: 'The club sees', gray: 'Team sheets, cards, minutes and coach checks' },
              { letter: 'A', bg: PALE, color: G, bold: 'Only you see', gray: 'Term fees, trials and term reports' },
            ].map((r, i) => (
              <div key={r.letter} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: i === 0 ? 0 : 12, borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{r.letter}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{r.bold}</div>
                  <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{r.gray}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10, marginTop: 12 }}>Families are told this when they join the game team.</div>
          </div>
        </div>

      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
