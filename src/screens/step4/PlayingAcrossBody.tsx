import { useState } from 'react'
import { OpeningPanel, ChipRow, type ChipState, GREEN as G, INK, MUT, AMBER, PALEGREEN, CTL, HAIR } from './directorParts'

const GD = '#1f4a3e', LN = '#e8edeb'

// The shared "Playing across" content: dark panel, up/down/mixed tabs, Worth-a-look
// and Playing-up-now rows, and the Needs-you / Held-back / What-the-club-counts rail.
// Used by the standalone PU1 board and the in-frame PlayersTab, so they stay identical.
type WorthRow = { ini: string; name: string; move: string; chips: ChipState[]; reason: string; btn: string; main?: boolean; target?: string; say?: string }
type NowRow = { ini: string; name: string; move: string; sub: string; done: number; of: number; btn: string; target: string }

const WORTH: WorthRow[] = [
  { ini: 'MT', name: 'Mia Tran', move: 'U12 Sam → U13 Girls Meg', chips: ['strong', 'some', 'strong', 'strong', 'strong'], reason: 'Sam nominated her too', btn: 'Open Mia', main: true, target: 'PU2-PlayerReadiness' },
  { ini: 'TA', name: 'Tane Waru', move: 'U14 Josh → U16 Ollie', chips: ['strong', 'strong', 'some', 'notyet', 'strong'], reason: 'Josh has not answered', btn: 'Ask Josh again', say: 'Josh is asked again for his three taps on Tane.' },
  { ini: 'ZP', name: 'Zoe Park', move: 'U11 Luke → U12 Girls Ana', chips: ['strong', 'strong', 'strong', 'some', 'some'], reason: 'Her third team this year', btn: 'Talk to Luke first', say: 'A message to Luke opens, about Zoe.' },
]
const NOW: NowRow[] = [
  { ini: 'LC', name: 'Leo Costa', move: 'U13 Chris → U14 Josh', sub: 'Trains up on Tuesdays, plays his own age', done: 3, of: 4, btn: 'Review on 18 June', target: 'PU3-TrialPlan' },
  { ini: 'AW', name: 'Ava Walsh', move: 'U12 Sam → U13 Girls Meg', sub: 'Moved up in May · going well', done: 6, of: 6, btn: 'Open her check-in', target: 'PU3-TrialPlan' },
]
const SEGMENTS: { id: 'up'|'down'|'mixed'; label: string; count: number }[] = [
  { id: 'up', label: 'An age group up', count: 3 },
  { id: 'down', label: 'An age group down', count: 2 },
  { id: 'mixed', label: 'Mixed-age sessions', count: 0 },
]

export default function PlayingAcrossBody({ onNav }: { onNav?: (s: string) => void }) {
  const [segment, setSegment] = useState<'up' | 'down' | 'mixed'>('up')
  const [toast, setToast] = useState<string | null>(null)
  const [nudged, setNudged] = useState(false)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const avatar: React.CSSProperties = { width: 40, height: 40, borderRadius: 999, background: PALEGREEN, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }
  const outBtn: React.CSSProperties = { flex: 'none', width: 150, height: 44, padding: '0 14px', borderRadius: 10, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', background: '#fff', color: INK, border: `1px solid ${CTL}` }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <OpeningPanel
        landing
        heading="PLAYING ACROSS · 192 PLAYERS CHECKED ON MONDAY"
        sentence="Mia Tran has been ahead of her own team for eight weeks. She is ready to try the under 13s."
        support="Two more are worth a look, and Leo’s four-week trial is reviewed on Thursday 18 June."
        figures={[{ num: '3', label: 'worth a look', proof: true }, { num: '2', label: 'playing up now' }, { num: '1', label: 'held back by a rule' }]}
        buttons={[{ label: 'Open Mia', main: true, onClick: () => onNav?.('PU2-PlayerReadiness') }, { label: 'Nominate a player', onClick: () => st('Pick any player. Their coach is asked for a view.') }]}
      />
      <div style={{ display: 'flex', flex: 1, padding: '16px 20px 20px 20px', gap: 20, minHeight: 0, overflow: 'auto' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
            {SEGMENTS.map(s => (
              <button key={s.id} onClick={() => setSegment(s.id)} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${segment === s.id ? G : LN}`, background: segment === s.id ? '#eef5f2' : '#fff', fontSize: 13, color: segment === s.id ? G : MUT, fontWeight: segment === s.id ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{s.label} · {s.count}</button>
            ))}
          </div>

          {segment === 'up' && (
            <>
              <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 36 }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Worth a look</h2>
                  <span style={{ fontSize: 13, color: MUT }}>Filled: strong · pale: some · dashed: not yet</span>
                </div>
                {WORTH.map(p => (
                  <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 150px', columnGap: 10, alignItems: 'center', minHeight: 70, borderTop: `1px solid ${HAIR}`, padding: '4px 0' }}>
                    <span style={avatar}>{p.ini}</span>
                    <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 16, lineHeight: '22px' }}>{p.name}</strong><span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{p.move}</span></span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ChipRow states={p.chips} /><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{p.reason}</span></span>
                    </span>
                    <button onClick={() => p.target ? onNav?.(p.target) : st(p.say!)} style={p.main ? { ...outBtn, background: G, color: '#fff', border: `1px solid ${G}` } : outBtn}>{p.btn}</button>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', marginBottom: 14 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, marginBottom: 2 }}>Playing up now</h2>
                {NOW.map(p => (
                  <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 150px 150px', columnGap: 10, alignItems: 'center', minHeight: 56, borderTop: `1px solid ${HAIR}` }}>
                    <span style={avatar}>{p.ini}</span>
                    <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 16, lineHeight: '22px' }}>{p.name}</strong><span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{p.move}</span></span>
                      <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{p.sub}</span>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ display: 'flex', gap: 3 }}>{Array.from({ length: p.of }, (_, i) => <span key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i < p.done ? G : HAIR }} />)}</span>
                      <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>Week {p.done} of {p.of}</span>
                    </span>
                    <button onClick={() => onNav?.(p.target)} style={outBtn}>{p.btn}</button>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, color: MUT }}>Not a ranking and not a score. It says who is worth a conversation. People decide.</div>
            </>
          )}

          {segment === 'down' && (
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '32px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Playing down · 2 players</div>
              <div style={{ fontSize: 13, color: MUT }}>Growing later than their year. One training night a week in a matched group — they stay in their own team for games.</div>
            </div>
          )}

          {segment === 'mixed' && (
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '32px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>No mixed-age sessions yet</div>
              <div style={{ fontSize: 13, color: MUT }}>Mixed-age banded sessions appear here once your club sets one up.</div>
            </div>
          )}
        </div>

        {/* Right rail */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 4 }}><span style={{ width: 32, height: 32, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>{nudged ? 1 : 2}</span><h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Needs you</h2></span>
            {!nudged && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, borderTop: `1px solid ${HAIR}` }}>
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>Tane Waru</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Josh’s view, asked 6 days ago</span></span>
                <button onClick={() => { setNudged(true); st('Josh is asked again for his three taps on Tane.') }} style={{ ...outBtn, width: 'auto' }}>Nudge</button>
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, borderTop: `1px solid ${HAIR}` }}>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>Leo’s review</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Thursday 18 June, Leo first</span></span>
              <button onClick={() => onNav?.('PU6-Review')} style={{ ...outBtn, width: 'auto' }}>Open</button>
            </span>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Held back by a rule</h2>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 36, height: 36, borderRadius: 999, background: HAIR, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>NO</span><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>Noah Okafor</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Growing fast, knee pain</span></span></span>
            <div style={{ fontSize: 13, color: MUT, marginTop: 10 }}>Looked at again in 8 weeks.</div>
          </div>
          <button onClick={() => onNav?.('PU5-Settings')} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', color: INK, minHeight: 56, textAlign: 'left' }}>
            <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>What the club counts</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Never size alone, results, or a parent asking</span></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
