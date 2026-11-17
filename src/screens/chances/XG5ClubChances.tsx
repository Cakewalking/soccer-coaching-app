// XG5 · Director › Teams › Chances and points. Every team with film.
// Teams in an age band with chances off are summarised in one row.
// No sorting by xGD across the table and no club-wide average: age groups are not compared.

import { Mark, Src, Btn, Note, tile, h2, cap, INK, MUT, LINE } from '../capture/marks'
import { FixRow } from '../capture/CaptureScreens'
import { useCapture, allowed } from '../capture/captureStore'
import { CLUB_ROWS, signed, type ClubRow } from './chanceData'

export default function XG5ClubChances({ onNav, onTeam }: { onNav?: (s: string) => void; onTeam?: (r: ClubRow) => void }) {
  const s = useCapture()
  const shown = CLUB_ROWS.filter(r => allowed(s, r.band).chances), hidden = CLUB_ROWS.length - shown.length
  const under8 = allowed(s, 'u6').chances
  const grid = 'minmax(0,1fr) 62px 112px 96px 70px 96px 104px'
  const open = (r: ClubRow) => onTeam ? onTeam(r) : onNav?.('XG2-ChancesSeason')
  const find = (name: string) => CLUB_ROWS.find(r => r.team === name)!
  const u14 = find('U14 Josh'), u13 = find('U13 Chris')
  return (
    <div data-screen="XG5-ClubChances" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ flex: 'none', padding: '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Chances and points</h1>
          <span style={cap}>Wattle Creek FC · every team with film · this season</span>
        </div>
        <div style={{ flex: 'none', display: 'flex', gap: 8 }}>
          <Btn big onClick={() => onNav?.('QC10-HowWeMeasure')}>How we measure</Btn>
          <Btn big onClick={() => onNav?.('QC11-ClubCaptureRules')}>What teams may capture</Btn>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '12px 24px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 332px', gap: 14, alignItems: 'start' }}>
        <section aria-label="Teams" style={{ ...tile, gap: 0, padding: '12px 18px 12px', alignSelf: 'stretch', minHeight: 560 }}>
          <div style={{ display: 'grid', gridTemplateColumns: grid, alignItems: 'end', gap: 0, paddingBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, lineHeight: '15px' }}>
            <span>Team</span><span>Games filmed</span><span>Chance difference a game · xGD</span><span>Goal difference</span><span>PPI</span><span>Ladder</span><span>Chances are</span>
          </div>
          {shown.map(r => {
            const may = allowed(s, r.band), mini = r.ppi === undefined
            return (
              <button key={r.team} data-team={r.team} onClick={() => open(r)} style={{ display: 'grid', gridTemplateColumns: grid, alignItems: 'center', minHeight: 51, padding: '3px 0', width: '100%', background: 'none', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer', fontVariantNumeric: 'tabular-nums' }}>
                <span style={{ display: 'flex', flexDirection: 'column', paddingRight: 8 }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{r.team}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{r.sub}{r.note ? ` · ${r.note}` : ''}</span></span>
                <span style={{ fontSize: 14 }}>{r.games}</span>
                <strong style={{ fontSize: 15 }}>{signed(r.xgd)}</strong>
                {mini
                  ? <span style={{ gridColumn: 'span 3', fontSize: 13, color: MUT }}>No scores kept, no ladder</span>
                  : may.ladder
                    ? <><span style={{ fontSize: 14 }}>{signed(r.goalDiff ?? 0, 0)}</span><strong data-ppi style={{ fontSize: 15 }}>{r.ppi!.toFixed(2)}</strong><span style={{ fontSize: 13 }}>{r.ladder}</span></>
                    : <><span style={{ fontSize: 14 }}>{signed(r.goalDiff ?? 0, 0)}</span><span style={{ gridColumn: 'span 2', fontSize: 13, color: MUT }}>Ladder is off for this age</span></>}
                <span><Mark kind="estimate" /></span>
              </button>
            )
          })}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '6px 0', borderTop: `1px solid ${LINE}` }}>
            <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 14, lineHeight: '19px' }}>MiniRoos under 8 · 3 teams{hidden ? ` · and ${hidden} more with chances off` : ''}</strong>
              <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{under8 ? 'Chance numbers are on for under 6 and under 7. They appear after each team’s first filmed game.' : 'Chance numbers are off for under 6 and under 7 at your club. You can turn them on.'}</span>
            </span>
            <Btn big onClick={() => onNav?.('QC11-ClubCaptureRules')}>Change the rules</Btn>
          </div>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <section aria-label="What to look at" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
            <h2 style={{ ...h2, paddingBottom: 6 }}>What to look at</h2>
            <FixRow title={`${u14.team} are giving up more than they make`} sub={`${signed(u14.xgd)} a game over ${u14.games} games. Outside the usual swing`}><Btn primary big onClick={() => open(u14)}>Open</Btn></FixRow>
            <FixRow title={`${u13.team}’s results are ahead of their chances`} sub={`${signed(u13.goalDiff ?? 0, 0)} on goals, ${signed(u13.xgd)} on chances. May not last`}><Btn big onClick={() => open(u13)}>Open</Btn></FixRow>
          </section>
          <Note title="Reading the two together">Chance difference says how a team is playing. PPI says what it has earned, allowing for who it played. When they disagree, the chances are usually the better guide to what comes next.</Note>
          <Note title="Do not compare age groups">Each age group has its own pitch, goals and chance values <Src n={8} onOpen={n => onNav?.(`QC10-HowWeMeasure#src${n}`)} />. Compare a team with itself and with its own division.</Note>
        </div>
      </main>
    </div>
  )
}
