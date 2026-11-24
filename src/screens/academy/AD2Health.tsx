// AD2-Health: Academy owner: are families staying, are places filling, and who might leave.
// COUNTED from the store (programs v2): places filled, this term's player count, and the families worth a call (missed the last three sessions and not said about Term 3).
// STILL SAMPLE: the three earlier terms, who stayed from Term 1, trials, where new players came from, and why families left. That history is not in `academy-data.json`.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { WAITING, cameOf, groupOf, initials, pct, playerBoard, programCounts, useAcademy, worthACall } from './academyStore'

// Sample history: players in each of the three terms before this one, and why the 28 families who left after Term 1 said they did.
const EARLIER: [number, string][] = [[164, 'Term 3, 2025'], [181, 'Term 4, 2025'], [204, 'Term 1, 2026']]
const LEFT: [string, number][] = [['Moved to a club’s own program', 9], ['Cost', 6], ['Clash with another sport', 5], ['Moved away', 3], ['Didn’t say', 5]]

export default function AD2Health() {
  const a = useAcademy(), all = programCounts(a)
  // Late fees first (they are already with the owner), then the list's order. Three are shown; the count is all of them.
  const calls = a.players.filter(worthACall), shown = [...calls].sort((x, y) => Number(y.fees_status === 'Late') - Number(x.fees_status === 'Late')).slice(0, 3)
  const terms: [number, string][] = [...EARLIER, [all.n, 'Term 2, 2026']], most = Math.max(...terms.map(t => t[0]))
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Health of the academy</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · four terms shown</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="The numbers are on their way to your email as a spreadsheet." style={S.more}>Download</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Stayed from Term 1</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>176 of 204</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>86% came back · 28 left</span>
          </div>
          <div style={{ ...S.tile, background: '#f4e6e6', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Trials that joined</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>4 of 9</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>This month · 3 waiting on an offer</span>
          </div>
          <div style={{ ...S.tile, background: '#eef5f2', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Places filled</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>{pct(all.n, all.cap)}%</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{all.n} of {all.cap} · {WAITING.Advanced} on a waiting list</span>
          </div>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>New this term</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>18</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>11 from a trial · 7 from a friend</span>
          </div>
        </div>
        <section aria-label="Players, term by term" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Players, term by term</h2>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 18, padding: '8px 6px 0' }}>
            {terms.map(([n, label], k) => (
              <span key={label} style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <strong style={{ ...S.num, fontSize: 18 }}>{n}</strong>
                <span style={{ width: '100%', height: Math.round(208 * n / most), borderRadius: '10px 10px 0 0', background: k === terms.length - 1 ? '#2f6252' : '#a9cfc0' }} />
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57', textAlign: 'center' }}>{label}</span>
              </span>
            ))}
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>
            {`Up ${all.n - EARLIER[0][0]} players in a year. Growth has come from Development, ages 9 to 11. `}
            <Tap to="ADP15-HowHeard">How we know where families came from</Tap>
          </span>
        </section>
        <section aria-label="Why 28 families left after Term 1" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Why 28 families left after Term 1</h2>
          </div>
          {LEFT.map(([why, n]) => (
            <div key={why} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flexGrow: 1, fontSize: 15 }}>{why}</span>
              <span style={{ flex: 'none', display: 'inline-block', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: `${n * 10}%`, background: '#40826d' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>{n}</span>
            </div>
          ))}
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Asked in a two-question form when a family doesn’t re-enrol. 23 of 28 answered.</span>
        </section>
        <section aria-label="Worth a call" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Worth a call</h2>
            <span style={S.cap}>{calls.length} {calls.length === 1 ? 'family' : 'families'}{calls.length > shown.length ? ` · ${shown.length} shown` : ''}</span>
          </div>
          {shown.map(p => { const c = cameOf(p); return (
            <Tap key={p.id} to={playerBoard(p)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box', textDecoration: 'none', color: '#10211f' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{initials(p.name)}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{p.name} · {groupOf(a, p.group)?.name}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Came to {c.came} of {c.of} · {p.fees_status === 'Late' ? `fees ${p.fees_note}` : 'missed the last 3'} · not re-enrolled</span>
              </span>
            </Tap>
          ) })}
          {calls.length === 0 && <span style={{ ...S.cap, borderTop: '1px solid #e9eae8', paddingTop: 10 }}>No family is worth a call this week.</span>}
          {calls.length > 0 && <Tap say={`New message to ${calls.length} ${calls.length === 1 ? 'family' : 'families'}. Nothing is sent until you press send.`} style={{ ...S.more, marginTop: 10, alignSelf: 'flex-start' }}>Message these families</Tap>}
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A family shows here when they have missed the last three sessions and haven’t said about Term 3. It is a prompt to call, not a prediction.</span>
        </section>
      </main>
    </>
  )
}
