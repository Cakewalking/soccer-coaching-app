import { useState } from 'react'
import YTFrame from './YTFrame'
import { INK, MUT, GREEN, CTL, HAIR, PALEGREEN } from '../step4/directorParts'
import { YT_PLAYERS, COACH_GAME_RATINGS, COACH_NOTES, parentAverage, type Rating } from './data'

const GD = '#1f4a3e'
const ROWS = YT_PLAYERS.slice(0, 7)

export default function YT3PlayerNotes({ onNav, bare = false, seniors = false }: { onNav?: (s: string) => void; bare?: boolean; seniors?: boolean }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [ratings, setRatings] = useState<Record<string, Rating>>({ ...COACH_GAME_RATINGS })
  const [notes, setNotes] = useState<Record<string, string>>({ ...COACH_NOTES })

  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2800) }
  function setRating(id: string, n: Rating) {
    setRatings(prev => { const c = { ...prev }; if (c[id] === n) delete c[id]; else c[id] = n; return c })
    setLastTool(`${id}-${n}`)
  }
  function rateRest3() {
    setRatings(prev => { const c = { ...prev }; YT_PLAYERS.forEach(p => { if (c[p.id] == null) c[p.id] = 3 }); return c })
    say('The rest are rated 3. Change any with a tap.')
  }
  function acceptFilm(id: string, text: string) { setNotes(prev => ({ ...prev, [id]: text })); say('Added from the film.') }

  const ratedCount = Object.keys(ratings).length
  const noteCount = Object.values(notes).filter(n => n && n.trim()).length

  const th: React.CSSProperties = { padding: '10px 14px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, textAlign: 'left', borderBottom: `2px solid ${HAIR}` }

  return (
    <YTFrame
      onNav={onNav} active="players" lastTool={lastTool} bare={bare}
      heading="Players · Sat 30 May · Won 3-1 at Ironbark United"
      sentence="Nine of sixteen have a rating. Four have a note."
      support="One tap rates a player. Only you see your ratings and notes. They feed season summaries and awards."
      figures={[{ num: `${ratedCount} of 16`, label: 'rated', proof: true }, { num: `${noteCount}`, label: 'notes' }]}
      buttons={[
        { label: 'Save', main: true, onClick: () => say('Saved. Your ratings and notes stay with you.') },
        { label: 'Rate the rest 3', onClick: rateRest3 },
      ]}
    >
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, minHeight: 0 }}>
        <section style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: 210 }} /><col style={{ width: 230 }} /><col /></colgroup>
              <thead><tr><th style={th}>Player</th><th style={th}>Rating · 1 to 5</th><th style={th}>Your note</th></tr></thead>
              <tbody>
                {ROWS.map((p, i) => {
                  const pa = parentAverage(p.id)
                  const note = notes[p.id]
                  const suggestion = !note && p.clipNote ? `From the film: ${p.clipNote}. Add it?` : null
                  return (
                    <tr key={p.id} style={{ borderTop: i ? `1px solid ${HAIR}` : 'none' }}>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 34, height: 34, borderRadius: '50%', background: PALEGREEN, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.ini}</span>
                          <span><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{p.minutes} min{seniors ? '' : ` · parents ${pa == null ? '—' : pa.toFixed(1)}`}</span></span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {[1, 2, 3, 4, 5].map(n => { const on = ratings[p.id] === n; return (
                            <button key={n} onClick={() => setRating(p.id, n as Rating)} style={{ width: 36, height: 36, borderRadius: 8, border: `1.5px solid ${on ? GD : CTL}`, background: on ? GD : '#fff', color: on ? '#fff' : INK, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{n}</button>
                          ) })}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {suggestion ? (
                          <button onClick={() => acceptFilm(p.id, p.clipNote!)} style={{ fontSize: 13, color: GREEN, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', padding: 0 }}>{suggestion}</button>
                        ) : (
                          <input value={note ?? ''} onChange={e => setNotes(prev => ({ ...prev, [p.id]: e.target.value }))} placeholder="Add a note"
                            style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 13, color: note ? INK : '#9aa6a2', fontFamily: 'inherit', outline: 'none', padding: '4px 0' }} />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${HAIR}`, fontSize: 12, color: MUT }}>Showing 7 of 16, most minutes first. A rating is for this game only.</div>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Where these go</div>
            {[['Season summaries', 'Your notes become the first draft'], ['Awards night', seniors ? 'Your ratings, counted for you' : "Yours and parents', counted for you"], ['Thursday', 'A low rating twice asks if you want a check-in']].map(([t, s], i) => (
              <div key={t} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i ? `1px solid ${HAIR}` : 'none' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: PALEGREEN, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <span><span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK }}>{t}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{s}</span></span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Who sees them</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>{seniors ? 'Your ratings and notes: only you.' : 'Your ratings and notes: only you. A parent’s ratings: that parent and you.'}</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginTop: 8 }}>{seniors ? 'Nobody else: not players, other coaches or the club.' : 'Nobody else, at any age: not players, other parents, other coaches or the club.'}</div>
          </div>
        </aside>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, padding: '12px 16px', borderRadius: 14, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </YTFrame>
  )
}
