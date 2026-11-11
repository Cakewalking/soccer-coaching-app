import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const GAMES = [
  { time: '9:00',  opp: 'v Glenview FC',    pitch: 'Pitch 3', result: 'Won 2–1' },
  { time: '10:30', opp: 'v Northgate City',  pitch: 'Pitch 1', result: 'Drew 0–0' },
  { time: '12:40', opp: 'v Elderberry Park', pitch: 'Pitch 3', result: 'Next · in 35 minutes', next: true },
]

const MINUTES = [
  { initials: 'MT', name: 'Mia',   mins: 30, rest: false },
  { initials: 'RC', name: 'Ruby',  mins: 45, rest: true },
  { initials: 'LM', name: 'Leo',   mins: 30, rest: false },
  { initials: 'AL', name: 'Ava',   mins: 45, rest: true },
  { initials: 'GO', name: 'Grace', mins: 60, rest: true },
  { initials: 'IM', name: 'Isla',  mins: 30, rest: false },
  { initials: 'FW', name: 'Finn',  mins: 45, rest: true },
  { initials: 'PN', name: 'Priya', mins: 30, rest: false },
]

export default function SP12TournamentDay({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Tournament day</div>
          <div style={{ fontSize: 14, color: MUT }}>Sat 21 November · Kingfisher Summer Cup · 12:05 pm</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Squad</button>
          <button onClick={() => t('Opening game 3')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Start game 3</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Games */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Today's games</div>
            {GAMES.map(game => (
              <div key={game.time} style={{ display: 'grid', gridTemplateColumns: '48px minmax(0,1fr) auto', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: game.next ? G : MUT }}>{game.time}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: game.next ? 700 : 400, color: INK }}>{game.opp}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{game.pitch}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: game.next ? G : MUT }}>{game.result}</span>
              </div>
            ))}
            <div style={{ fontSize: 13, color: G, fontWeight: 600, marginTop: 8 }}>Second in the group. A draw in game 3 is enough for Sunday.</div>
          </div>

          {/* Between games */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Between games</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {[
                'Shade, water and food',
                '70 minutes since game 2',
                '28° forecast at 1 pm',
                'Drinks break each half',
              ].map(note => (
                <span key={note} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: '#f0f1ef', color: MUT }}>{note}</span>
              ))}
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#8b3a3a' }}>Jai rolled an ankle</div>
                <div style={{ fontSize: 12, color: MUT }}>Sitting out game 3 · his dad is here</div>
              </div>
              <button onClick={() => setSheet('loginjury')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #f0c0c0`, background: '#fff', color: '#8b3a3a', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Log it</button>
            </div>
          </div>
        </div>

        {/* Right: minutes */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Minutes across the day</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Fair share by the end of game 3: 40 each</div>
            {MINUTES.map(p => (
              <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '32px minmax(0,1fr) auto', gap: 8, padding: '6px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 10, fontWeight: 700, color: G }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.mins} min · {p.rest ? 'rests first' : 'starts next'}</div>
                </div>
              </div>
            ))}
            <button onClick={() => t('Opening line-up for game 3')} style={{ width: '100%', height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 10 }}>See it</button>
          </div>
        </div>
      </div>

      {sheet === 'loginjury' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 400, marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>Log an injury</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>Takes 3 taps. The parent and coaches are told.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t('Saved. The parent and Sam have been told.'); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save</button>
            <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
