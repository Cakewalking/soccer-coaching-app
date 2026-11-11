import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TEAMS = [
  { initial: 'G', name: 'Glenview FC · U12',         note: 'Division 1 last year · 9 km away · Sat 14 March, 10:00, at theirs', status: 'Booked' },
  { initial: 'N', name: 'Northgate City · U12',       note: 'Division 2 last year · 6 km away · Sat 21 March, any time, at ours', status: 'Say yes', askedYou: true },
  { initial: 'K', name: 'Kingfisher · U12 Girls',     note: 'Division 1 last year · 14 km away · Sun 22 March, afternoon', status: 'Ask' },
  { initial: 'E', name: 'Elderberry Park · U13',      note: 'A year older · 4 km away · Sat 28 March, morning', status: 'Ask' },
]

export default function SP7Friendlies(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Friendlies</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 12 March · pre-season · 4 weeks to round 1 · other Clean Sheet clubs looking for a game</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Opening \'add one yourself\'')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add one yourself</button>
          <button onClick={() => setSheet('spfree')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Say when you're free</button>
        </div>
      </div>

      {/* Teams list */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, background: '#f7f8f7' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT }}>Teams looking for a game</div>
        </div>
        {TEAMS.map(team => (
          <div key={team.name} style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) auto', gap: 12, padding: '12px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 14, fontWeight: 700, color: G }}>{team.initial}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{team.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{team.note}</div>
              {team.askedYou && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#7a5a1a', background: '#fff3d6', padding: '2px 6px', borderRadius: 4, marginTop: 4, display: 'inline-block' }}>Asked you</span>}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {team.status === 'Booked' && <span style={{ fontSize: 13, fontWeight: 600, color: G }}>Booked</span>}
              {team.status === 'Say yes' && <button onClick={() => t("Yes sent to Northgate City. Rob will tell parents once they confirm.")} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Say yes</button>}
              {team.status === 'Ask' && <button onClick={() => t(`Asked ${team.initial === 'K' ? 'Kingfisher' : 'Elderberry Park'} for a friendly.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Ask</button>}
              {team.status !== 'Booked' && <button onClick={() => t('Opening')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Open</button>}
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', background: '#f9faf9', fontSize: 12, color: MUT }}>Only the coach's name, the age group and last year's division are shared. Never players' names.</div>
      </div>

      {/* What a friendly counts for */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>What a friendly counts for</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {[
            { label: 'Record it',                   val: 'Clips and a review, like any game' },
            { label: 'Count towards season numbers', val: 'Off: shown apart, so try things' },
            { label: 'Fair minutes',                 val: 'Everyone plays at least half' },
          ].map(r => (
            <div key={r.label} style={{ padding: '10px 12px', borderRadius: 10, background: '#f7f8f7', border: `1px solid #e5e6e4` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 13, color: INK }}>{r.val}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 10 }}>You don't have to keep the score in a friendly.</div>
      </div>

      {/* Free slot sheet */}
      {sheet === 'spfree' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 480, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>When are you free for a friendly?</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>Shown to Clean Sheet clubs within 20 km.</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 12 }}>
            {['Sat 14 Mar','Sat 21 Mar','Sun 22 Mar','Sat 28 Mar'].map(d => (
              <button key={d} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{d}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 14 }}>Only your name, age group and last year's division are shown.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t("Posted. You'll hear when a club says yes."); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Post it</button>
            <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
