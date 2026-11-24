import { useState } from 'react'
import YTFrame from './YTFrame'
import { INK, MUT, GREEN, CTL, HAIR, PALEGREEN } from '../step4/directorParts'
import { SEASON, PLAYER, awards, familiesRated, YT_TEAM } from './data'

const GD = '#1f4a3e'

// `seniors`: an adult team has no parents rating the game, so this board is the coach's own ratings only.
export default function YT4VotesAwards({ onNav, bare = false, seniors = false }: { onNav?: (s: string) => void; bare?: boolean; seniors?: boolean }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [scope, setScope] = useState<'season' | 'saturday'>('season')
  const [reminded, setReminded] = useState(false)
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2800) }

  const rated = familiesRated()
  const remaining = YT_TEAM.families - rated
  const a = awards()

  const th: React.CSSProperties = { padding: '10px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, borderBottom: `2px solid ${HAIR}` }
  const td: React.CSSProperties = { padding: '12px', fontSize: 14, color: INK, fontVariantNumeric: 'tabular-nums' }

  const AWARDS = [
    { cap: "Coach's pick", name: PLAYER(a.coachPick.id).name, sub: `Your highest, ${a.coachPick.value}` },
    { cap: "Parents' pick", name: PLAYER(a.parentsPick.id).name, sub: `Their highest, ${a.parentsPick.value}` },
    { cap: 'Most improved', name: PLAYER(a.mostImproved.id).name, sub: a.mostImproved.detail },
    { cap: "Coach's award", name: a.coachAward.id ? PLAYER(a.coachAward.id).name : 'Yours to choose', sub: a.coachAward.id ? '' : 'Your notes are here' },
  ].filter(x => !(seniors && x.cap === "Parents' pick"))

  return (
    <YTFrame
      onNav={onNav} active="awards" lastTool={lastTool} bare={bare}
      heading="Ratings and awards · Sun 31 May · Won 3-1 at Ironbark United"
      sentence={seniors ? 'Nine of sixteen players have your rating for Saturday. They add up to the season’s awards.' : 'Eleven of seventeen families have rated Sunday. Their ratings sit beside yours.'}
      support={seniors ? 'Only you see your ratings and notes. Nobody else sees any of it.' : 'Each parent sees only their own ratings. You see them all. Nobody else sees any of it.'}
      figures={seniors ? [{ num: '9 of 16', label: 'players rated', proof: true }, { num: '8', label: 'games so far' }] : [{ num: `${rated} of ${YT_TEAM.families}`, label: 'families have rated', proof: true }, { num: 'Tue', label: 'rating closes' }]}
      buttons={[
        { label: reminded ? '✓ Reminded' : `Remind the ${remaining}`, main: true, onClick: () => { setReminded(true); say(`One reminder sent to each of the ${remaining} families who have not rated.`) } },
        { label: 'Rate players', main: seniors, onClick: () => onNav?.('YT3-PlayerNotes') },
      ].filter(b => !(seniors && b.label !== 'Rate players'))}
    >
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, minHeight: 0 }}>
        <section style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, flex: 1 }}>The season so far · 8 games</h2>
            <div style={{ display: 'flex', border: `1.5px solid ${HAIR}`, borderRadius: 999, overflow: 'hidden' }}>
              {(['season', 'saturday'] as const).map(s => (
                <button key={s} onClick={() => { setScope(s); setLastTool(s) }} style={{ height: 34, padding: '0 14px', background: scope === s ? GD : '#fff', color: scope === s ? '#fff' : INK, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{s === 'season' ? 'Season' : seniors ? 'Saturday' : 'Sunday'}</button>
              ))}
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup><col /><col style={{ width: 70 }} />{!seniors && <><col style={{ width: 80 }} /><col style={{ width: 80 }} /></>}<col style={{ width: 70 }} /></colgroup>
            <thead><tr><th style={{ ...th, textAlign: 'left' }}>Player</th><th style={{ ...th, textAlign: 'right' }}>You</th>{!seniors && <><th style={{ ...th, textAlign: 'right' }}>Parents</th><th style={{ ...th, textAlign: 'right' }}>Ratings</th></>}<th style={{ ...th, textAlign: 'right' }}>Games</th></tr></thead>
            <tbody>
              {SEASON.map(r => { const p = PLAYER(r.id); return (
                <tr key={r.id} style={{ borderTop: `1px solid ${HAIR}` }}>
                  <td style={td}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 30, height: 30, borderRadius: '50%', background: PALEGREEN, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{p.ini}</span><strong style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</strong></div></td>
                  <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{(scope === 'saturday' ? Math.min(5, r.you + 0.1) : r.you).toFixed(1)}</td>
                  {!seniors && <><td style={{ ...td, textAlign: 'right', color: MUT }}>{r.parents.toFixed(1)}</td>
                  <td style={{ ...td, textAlign: 'right', color: MUT }}>{scope === 'saturday' ? Math.round(r.ratings / r.games) : r.ratings}</td></>}
                  <td style={{ ...td, textAlign: 'right', color: MUT }}>{scope === 'saturday' ? 1 : r.games}</td>
                </tr>
              ) })}
            </tbody>
          </table>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7a4b5b', marginBottom: 8 }}>Awards so far · you make the final call</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {AWARDS.map(aw => (
                <div key={aw.cap} style={{ border: `1px solid ${HAIR}`, borderRadius: 12, padding: '10px 12px', background: '#fafbfa' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#b88a2a', marginBottom: 4 }}>{aw.cap}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{aw.name}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{aw.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 10 }}>Top 5 of 16, averages out of 5. A player with fewer than three games is flagged, so a missed month costs nobody.</div>
          </div>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Who sees what</div>
            {[['Your ratings and notes', 'Only you'], ["A parent's ratings", 'That parent, and you'], ['This page', 'Only you']].filter(r => !(seniors && r[0].startsWith('A parent'))).map(([t, s], i) => (
              <div key={t} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i ? `1px solid ${HAIR}` : 'none' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: PALEGREEN, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <span><span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK }}>{t}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{s}</span></span>
              </div>
            ))}
          </div>
          {!seniors && <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>How parents rate</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>1 to 5 for any player after each game. No notes. The same for every age group.</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginTop: 8 }}>A parent’s rating of their own child is kept for them and you, and left out of the awards count.</div>
          </div>}
          <button onClick={() => say('Coming soon: a printable list for awards night.')} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', color: INK, textAlign: 'left' }}>
            <span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>Take it to awards night</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>A printable list, when you are ready · Coming soon</span></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </aside>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, padding: '12px 16px', borderRadius: 14, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </YTFrame>
  )
}
