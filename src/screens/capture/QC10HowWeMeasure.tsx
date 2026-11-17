// QC10 · How we measure, with sources. The fourth tab under Record.
// Source chips elsewhere open this page at that row (#src1 to #src12).
// Wording matches RESEARCH.md: no accuracy figure for Clean Sheet anywhere, and
// "Our own checks" stays "Not published yet" until real results exist.

import { useEffect, useRef, useState } from 'react'
import { Mark, Btn, Dot, tile, h2, cap, G, INK, MUT, LINE, PALE, DARK } from './marks'
import { useCapture, setCapture } from './captureStore'

const STRONG = [
  ['Passes, shots, tackles, goals', 'Counted from film. Every one is a clip you can open.'],
  ['Total distance and load', 'From vests. The most dependable number a vest gives.'],
  ['Touches and which foot', 'From boot sensors.'],
  ['How hard it felt, how they feel', 'From the player. Ten seconds after the session.'],
  ['Your ratings, notes and marks', 'From you. Nothing else records what you saw.'],
]
const ESTIMATE = [
  ['Where each player stood', 'From one camera. The far side is less exact.'],
  ['Team shape and spacing', 'Built from those positions.'],
  ['Top speed and sprint counts', 'Fast, short runs are the hardest thing to measure.'],
  ['Anything from a recording with a problem', 'A cut-off corner, faded lines, a vest that dropped out.'],
  ['Any trend with fewer than six games', 'Shown from three games, marked until six.'],
]
const DONT = [
  ['Recognise faces', 'Not for children. Not ever.'],
  ['Work out speed from one camera', 'No vest, no speed.'],
  ['Predict injuries', 'We show a jump in load and ask a person.'],
  ['Rank children under 12', 'No scores, no league tables of players.'],
  ['Compare your players with other clubs', 'Different pitches, different kit, different games.'],
]
const RESEARCH: [string, string, string, string][] = [
  ['Vests are best at total distance and weakest at short, fast bursts. Vests that take ten readings a second do better than older ones.', 'Distance and load are marked Strong. Top speed and sprint counts are marked Estimate.', 'Scott, Scott & Kelly (2016)', 'Journal of Strength and Conditioning Research 30(5)'],
  ['For every kind of tracker, the error grows as the player moves faster. Total distance was within a few per cent. Fast running was far less exact.', 'We do not rank children by speed. Top speed and sprint counts are marked Estimate.', 'Linke, Link & Lames (2018)', 'PLOS ONE 13(7)'],
  ['How far a player runs at speed swings by about a quarter from one game to the next, even for professionals.', 'No trend until three games. One game is never called a verdict.', 'Gregson, Drust, Atkinson & Di Salvo (2010)', 'International Journal of Sports Medicine 31(4)'],
  ['Experienced coaches recalled about six in ten key moments of a half. Novices recalled about four in ten.', 'Film is there to back your memory, not to replace your judgement.', 'Laird & Waters (2008)', 'International Journal of Performance Analysis in Sport 8(1)'],
  ['What athletes say about how they feel tracked training load more consistently than common objective tests such as heart rate and blood markers.', 'A ten-second check-in counts as data and is marked Strong.', 'Saw, Main & Gastin (2016)', 'British Journal of Sports Medicine 50(5)'],
  ['A change only means something when it is bigger than the normal noise in the test.', 'Every chart shows its usual swing. Inside it we say “about the same”.', 'Hopkins (2004)', 'Sportscience 8'],
  ['Trained people counting the same game agreed with each other very closely.', 'Passes, shots and tackles are the kind of number that can be counted dependably. Each one opens as a clip, and your marks are used to check ours.', 'Liu, Hopkins, Gómez & Molinuevo (2013)', 'International Journal of Performance Analysis in Sport 13(3)'],
  ['A bigger pitch for the same number of players means more running and a harder game.', 'We ask the pitch size, and only compare games on the same format.', 'Casamichana & Castellano (2010)', 'Journal of Sports Sciences 28, 1615–1623'],
  ['Working out positions and names from a single moving camera is hard: the camera moves, players hide each other, and shirt numbers blur.', 'Positions from one camera are marked Estimate. You confirm who is who.', 'Golovkin and others (2025); Balaji, Bright, Chen & Clausi (2023)', 'CVPR Workshops 2025, 6074–6084; arXiv preprint 2309.06285'],
  ['Children of the same age can be years apart in physical maturity.', 'Each player is compared with their own past, not with team-mates.', 'Cumming, Lloyd, Oliver, Eisenmann & Malina (2017)', 'Strength and Conditioning Journal 39(2)'],
  ['A popular load ratio has no good evidence behind it as a way to prevent injury.', 'Clean Sheet does not predict injuries. It shows a jump in load and asks the coach and parent.', 'Impellizzeri, Tenan, Kempton, Novak & Coutts (2020)', 'International Journal of Sports Physiology and Performance 15(6)'],
  ['How hard a session felt, times its length, tracked heart-rate measures of load in young soccer players.', 'With no vests, load comes from one question and the minutes played.', 'Impellizzeri, Rampinini, Coutts, Sassi & Marcora (2004)', 'Medicine & Science in Sports & Exercise 36(6)'],
]

function Column({ title, pill, rows }: { title: string; pill: React.ReactNode; rows: string[][] }) {
  return (
    <section aria-label={title} style={{ ...tile, gap: 0, padding: '12px 18px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8 }}><h2 style={h2}>{title}</h2>{pill}</div>
      {rows.map(([a, b]) => (
        <div key={a} style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderTop: `1px solid ${LINE}` }}>
          <strong style={{ fontSize: 15, lineHeight: '20px' }}>{a}</strong>
          <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span>
        </div>
      ))}
    </section>
  )
}

export default function QC10HowWeMeasure({ source, say }: { source?: number; say?: (m: string) => void }) {
  const s = useCapture()
  const root = useRef<HTMLDivElement>(null)
  const [lit, setLit] = useState<number | undefined>(source)
  const [told, setTold] = useState<string | null>(null)
  const tell = (m: string) => { if (say) say(m); else { setTold(m); setTimeout(() => setTold(null), 3200) } }
  useEffect(() => {
    setLit(source)
    if (!source) return
    const row = root.current?.querySelector(`#src${source}`)
    row?.scrollIntoView({ block: 'center' })
  }, [source])
  const grid = '46px minmax(0,1fr) minmax(0,1fr) minmax(0,0.85fr)'
  return (
    <div ref={root} data-screen="QC10-HowWeMeasure" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '14px 24px 28px', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>How we measure</h1>
          <span style={cap}>What Clean Sheet is good at, what it estimates, and what it does not do</span>
        </div>
        <Btn big aria-pressed={s.flagged.includes('general')} onClick={() => { setCapture(c => ({ flagged: [...new Set([...c.flagged, 'general'])] })); tell('Tell us which number and why. We check and write back within a day.') }}>Tell us a number looks wrong</Btn>
      </div>
      <section aria-label="In short" style={{ borderRadius: 20, background: DARK, color: '#fff', padding: '20px 24px 22px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>IN SHORT</span>
        <strong style={{ fontSize: 26, lineHeight: '33px', letterSpacing: '-0.02em', maxWidth: 900 }}>We count what can be counted, we mark what is a best reading, and we never show a number without how we got it.</strong>
        <span style={{ fontSize: 15, lineHeight: '22px', color: '#a9cfc0', maxWidth: 900 }}>Pitches, teams and players change every week. So we measure each game on its own terms, compare each player with their own past, and wait for three games before calling anything a trend.</span>
      </section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 14, alignItems: 'start' }}>
        <Column title="Strong" pill={<Mark kind="strong" />} rows={STRONG} />
        <Column title="Estimate" pill={<Mark kind="estimate" />} rows={ESTIMATE} />
        <Column title="What we don’t do" pill={<Mark kind="not" label="We don’t" />} rows={DONT} />
      </div>
      <section aria-label="What the research says" style={{ ...tile, gap: 0, padding: '14px 18px 6px' }}>
        <h2 style={h2}>What the research says, and what we do about it</h2>
        <span style={{ ...cap, fontSize: 13, paddingBottom: 6 }}>Most of these studies were done with adult or elite players. We apply them with care to children, and say so where it matters.</span>
        <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 14, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, paddingBottom: 6 }}>
          <span /><span>The finding</span><span>What Clean Sheet does</span><span>Source</span>
        </div>
        {RESEARCH.map(([finding, does, who, where], i) => (
          <div key={i} id={`src${i + 1}`} data-lit={lit === i + 1 || undefined} style={{ display: 'grid', gridTemplateColumns: grid, gap: 14, padding: '12px 0', borderTop: `1px solid ${LINE}`, fontSize: 14, lineHeight: '20px', scrollMarginTop: 80, background: lit === i + 1 ? PALE : undefined, outline: lit === i + 1 ? `2px solid ${G}` : undefined, outlineOffset: 2, borderRadius: lit === i + 1 ? 6 : 0 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
            <span>{finding}</span>
            <strong>{does}</strong>
            <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 13, lineHeight: '18px' }}>{who}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{where}</span></span>
          </div>
        ))}
      </section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14, alignItems: 'start' }}>
        <section aria-label="Our own checks" style={{ ...tile, padding: '14px 18px 16px', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={h2}>Our own checks</h2><Mark kind="needs" label="Not published yet" /></div>
          <span style={{ fontSize: 14, lineHeight: '21px' }}>The studies above are about this kind of measurement in general. They are not tests of Clean Sheet. During the pilot season we will count a sample of games by hand, compare film against vests, and publish our own error for each measure here.</span>
          <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>Until then, every mark on a number comes from the published research and from the quality of your recording.</span>
        </section>
        <section aria-label="How a number gets its mark" style={{ ...tile, gap: 0, padding: '14px 18px 8px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>How a number gets its mark</h2>
          {[['What kind of number it is', 'A count, a distance, a position, or something a person told us'], ['How good the recording was', 'Pitch found, camera placed, vests answering, players named'], ['How many games it rests on', 'One game, three, or six and more']].map(([a, b]) => (
            <div key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}` }}>
              <Dot ok />
              <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{a}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span></span>
            </div>
          ))}
        </section>
      </div>
      {told && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{told}</div>}
    </div>
  )
}
