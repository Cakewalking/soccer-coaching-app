// QC11 · Director: what teams may capture, by age group, and the quality rules.
// Under Club › Features and billing. Applies from each team's next recording.
// Coaches can turn things off for their team, never turn a locked one on.

import { useState } from 'react'
import { Btn, Note, Src, Switch, Ico, IC, tile, h2, cap, label, G, INK, MUT, LINE } from './marks'
import { useCapture, setCapture, rankLocked, AGES, type RuleKey, type CapState } from './captureStore'

const COLS: [string, string][] = [['MiniRoos', 'U6 to U11'], ['Juniors', 'U12, U13'], ['Youth', 'U14 to U18'], ['Seniors', '']]
const ROWS: { k: RuleKey; t: string; d: string }[] = [
  { k: 'film', t: 'Film games and training', d: 'Clips, passes, where things happened' },
  { k: 'vests', t: 'Distance and load from vests', d: 'To watch for a sudden jump in work' },
  { k: 'sprints', t: 'Show sprint and speed numbers to players', d: 'Each player sees only their own' },
  { k: 'rank', t: 'Rank players against each other', d: 'League tables of players' },
  { k: 'shareClips', t: 'Share clips with families', d: 'The coach approves each clip' },
  { k: 'parentRatings', t: 'Parents’ ratings', d: 'Only that parent and the head coach see them' },
  { k: 'estimateToFamilies', t: 'Show “Estimate” numbers to families', d: 'Off: families see Strong numbers only' },
  { k: 'checkin', t: 'Morning wellness check-in', d: 'Players under 15 answer through a parent' },
]

function Seg<T extends string | number>({ what, value, options, onPick }: { what: string; value: T; options: [T, string][]; onPick: (v: T, l: string) => void }) {
  return (
    <div role="group" aria-label={what} style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length},1fr)`, border: `1px solid ${LINE}`, borderRadius: 10, overflow: 'hidden' }}>
      {options.map(([v, l], i) => (
        <button key={String(v)} aria-pressed={value === v} onClick={() => onPick(v, l)} style={{ height: 46, padding: '0 4px', border: 0, borderLeft: i ? `1px solid ${LINE}` : 0, background: value === v ? G : '#fff', color: value === v ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{l}</button>
      ))}
    </div>
  )
}
const POOR_NOTE: Record<CapState['poor'], string> = {
  keep: 'Keep, marked: its numbers stay, each one marked “Estimate”.',
  clips: 'Clips only: the film is kept for coaching. Its numbers are left out of every trend.',
  none: 'Don’t keep: the recording is deleted after you have seen the quality report.',
}

export default function QC11ClubCaptureRules({ onNav }: { onNav?: (s: string) => void }) {
  const s = useCapture()
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const src = (n: number) => onNav?.(`QC10-HowWeMeasure#src${n}`)
  const flip = (k: RuleKey, i: number, t: string) => {
    const on = s.rules[k][i]
    setCapture(c => { const row = [...c.rules[k]] as CapState['rules'][RuleKey]; row[i] = !on; return { rules: { ...c.rules, [k]: row } } })
    say(`${t}: turned ${on ? 'off' : 'on'}.`)
  }
  const grid = 'minmax(0,1fr) repeat(4,116px)'
  return (
    <div data-screen="QC11-ClubCaptureRules" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ flex: 'none', padding: '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>What teams may capture</h1>
          <span style={cap}>Wattle Creek FC · your rules. Coaches can turn things off, not on</span>
        </div>
        <div style={{ flex: 'none', display: 'flex', gap: 8 }}>
          <Btn big onClick={() => onNav?.('QC10-HowWeMeasure')}>How we measure</Btn>
          <Btn primary big onClick={() => say('Saved. 14 teams follow these rules from their next recording.')}>Save</Btn>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '12px 24px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 332px', gap: 14, alignItems: 'start' }}>
        <section aria-label="By age group" style={{ ...tile, gap: 0, padding: '12px 18px 14px', alignSelf: 'stretch', minHeight: 560 }}>
          <div style={{ display: 'grid', gridTemplateColumns: grid, alignItems: 'end', paddingBottom: 8 }}>
            <h2 style={h2}>By age group</h2>
            {COLS.map(([a, b]) => <span key={a} style={{ display: 'flex', flexDirection: 'column', fontSize: 13, lineHeight: '17px' }}><strong>{a}</strong><span style={{ color: MUT }}>{b}</span></span>)}
          </div>
          {ROWS.map(r => (
            <div key={r.k} style={{ display: 'grid', gridTemplateColumns: grid, alignItems: 'center', minHeight: 50, padding: '2px 0', borderTop: `1px solid ${LINE}` }}>
              <span style={{ display: 'flex', flexDirection: 'column', paddingRight: 12 }}>
                <strong style={{ fontSize: 14, lineHeight: '19px' }}>{r.t}</strong>
                <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{r.d}</span>
              </span>
              {AGES.map((age, i) => r.k === 'rank' && rankLocked(age)
                ? <span key={age} style={{ display: 'flex', alignItems: 'center', gap: 5, minHeight: 44, fontSize: 13, fontWeight: 700, color: MUT }}><Ico d={IC.lock} size={13} />Never</span>
                : <span key={age} style={{ display: 'flex', alignItems: 'center', marginLeft: -6 }}>
                    <Switch on={s.rules[r.k][i]} label={`${r.t}, ${COLS[i][0]}`} onChange={() => flip(r.k, i, r.t)} />
                    <strong style={{ fontSize: 13 }}>{s.rules[r.k][i] ? 'On' : 'Off'}</strong>
                  </span>)}
            </div>
          ))}
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <section aria-label="Quality rules" style={{ ...tile, padding: '12px 16px 14px', gap: 8 }}>
            <h2 style={h2}>Quality rules</h2>
            <span style={label}>Show a trend after</span>
            <Seg what="Show a trend after" value={s.trendAfter} options={[[2, '2 games'], [3, '3 games'], [5, '5 games']]} onPick={(v, l) => { setCapture({ trendAfter: v }); say(`A trend is shown after ${l}.`) }} />
            <span style={{ ...label, marginTop: 4 }}>A recording marked “Poor”</span>
            <Seg what="A recording marked Poor" value={s.poor} options={[['keep', 'Keep, marked'], ['clips', 'Clips only'], ['none', 'Don’t keep']]} onPick={(v, l) => { setCapture({ poor: v }); say(`A poor recording: ${l.toLowerCase()}.`) }} />
            <span style={{ ...cap, fontSize: 13 }}>{POOR_NOTE[s.poor]}</span>
          </section>
          <Note title="Why three games">One game is noisy. How much a player runs at speed swings by about a quarter between games <Src n={3} onOpen={src} />.</Note>
          <Note title="Why no rankings for children">Children of the same age can be years apart in physical maturity <Src n={10} onOpen={src} />. A ranking mostly shows who has grown.</Note>
        </div>
      </main>
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </div>
  )
}
