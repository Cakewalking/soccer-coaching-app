// What the new club sees when it opens a trial pack link. Read-only.
// No contact details, no date of birth, no wellness or medical notes, no other
// child's name. Other players in the clips are blurred.

import { useState } from 'react'
import type { SquadPlayer } from '../../data'
import { Mark, MarkDot, G, INK, MUT, LINE, PALE, DARK, tile, h2, cap, label } from '../capture/marks'
import Logo from '../Logo'
import { usePack, hasPack, factsFor, factMark, historyFor, clipLength, clipById, linkEnds, linkLive, TEAM, packKey, type Pack, type TeamKey } from './trialStore'

export function TrialShareBody({ player, team, pack, preview, demo, coach = 'Sam K' }: { player: SquadPlayer; team: string; pack: Pack; preview?: boolean; demo?: boolean; coach?: string }) {
  const clips = pack.clips.map(id => clipById(id)!).filter(Boolean)
  const [at, setAt] = useState(0)
  const facts = factsFor(player).filter(f => pack.facts.includes(f.id))
  const live = preview || demo || linkLive(pack)
  if (!live) return (
    <div data-screen="TP2-TrialShare" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#f7f8f7', fontFamily: "'DM Sans',system-ui,sans-serif", color: INK }}>
      <div style={{ ...tile, maxWidth: 440, padding: '24px', gap: 8, textAlign: 'center', alignItems: 'center' }}>
        <Logo size={40} />
        <strong style={{ fontSize: 20 }}>This link is not active</strong>
        <span style={{ ...cap }}>The family or the club has turned it off, or it has ended. Ask them for a new one.</span>
      </div>
    </div>
  )
  const cur = clips[at]
  return (
    <div data-screen="TP2-TrialShare" style={{ minHeight: '100vh', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ background: DARK, color: '#fff' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Logo size={32} /><strong style={{ fontSize: 17 }}>Clean Sheet</strong>
          <span style={{ flexGrow: 1 }} />
          <span style={{ fontSize: 13, color: '#a9cfc0' }}>Shared by Wattle Creek FC with the {team.startsWith('U') ? 'family’s' : 'player’s'} approval{pack.link ? ` · link ends ${linkEnds(pack.link.made)}` : ''}</span>
        </div>
      </header>
      <main style={{ maxWidth: 980, margin: '0 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {demo && <div role="note" style={{ borderRadius: 12, background: PALE, padding: '10px 14px', fontSize: 13, lineHeight: '19px' }}><strong>Demo.</strong> A made-up player at a made-up club. In the live app this page shows only what the family approved.</div>}
        {preview && <div role="note" style={{ borderRadius: 12, background: PALE, padding: '10px 14px', fontSize: 13, lineHeight: '19px' }}><strong>Preview.</strong> This is what the new club will see. Nothing has been shared yet.</div>}
        <section aria-label="Player" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ width: 64, height: 64, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>{player.ini}</span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 28, lineHeight: '34px', letterSpacing: '-0.02em' }}>{player.fullName}</h1>
            <span style={{ ...cap, fontSize: 15 }}>{player.pos} · {player.foot === 'left' ? 'Left' : 'Right'} footed · {team}, Wattle Creek FC</span>
          </span>
        </section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 14, alignItems: 'start' }}>
          <section aria-label="Highlights reel" style={{ ...tile, padding: '14px 16px', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}><h2 style={h2}>Highlights</h2><span style={{ ...cap, fontSize: 13 }}>{clips.length} clips · {clipLength(pack.clips)}</span></div>
            {cur ? <>
              <div role="img" aria-label={`Clip ${at + 1} of ${clips.length}: ${cur.title}`} style={{ aspectRatio: '16 / 9', borderRadius: 12, background: G, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 320 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true"><g stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"><rect x="14" y="12" width="292" height="156" /><path d="M160 12v156" /><circle cx="160" cy="90" r="24" /></g></svg>
                <span style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(16,33,31,0.55)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg></span>
                <span style={{ position: 'absolute', left: 10, bottom: 8, right: 10, display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 12, fontWeight: 700 }}><span>{cur.gameLabel} · min {cur.min}</span><span>{cur.duration}</span></span>
              </div>
              <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{cur.title}</strong><span style={{ ...cap, fontSize: 13 }}>Other players are blurred. Sound is off.</span></span>
              <div role="group" aria-label="Clips in this reel" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {clips.map((c, i) => <button key={c.id} onClick={() => setAt(i)} aria-pressed={i === at} style={{ minWidth: 44, height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${i === at ? G : LINE}`, background: i === at ? G : '#fff', color: i === at ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{i + 1}</button>)}
              </div>
            </> : <span style={cap}>No clips were added to this pack.</span>}
          </section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {facts.length > 0 && (
              <section aria-label="This season, counted" style={{ ...tile, padding: '14px 16px', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}><h2 style={h2}>This season</h2><Mark kind="strong" label="Counted or recorded" /></div>
                {facts.map(f => (
                  <div key={f.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LINE}` }}>
                    <span style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 14 }}>{f.label}</span><span style={{ fontSize: 12, color: MUT, display: 'flex', gap: 8, alignItems: 'center' }}>{f.from}{factMark(f) !== 'strong' && <MarkDot kind={factMark(f)} />}</span></span>
                    <strong style={{ fontSize: 18, fontVariantNumeric: 'tabular-nums' }}>{f.value}</strong>
                  </div>
                ))}
                <span style={{ ...cap, fontSize: 12, paddingTop: 8 }}>Numbers are for {player.fullName.split(' ')[0]}’s own team, pitch and age group. They are not a ranking and should not be compared across clubs.</span>
              </section>
            )}
            {pack.note.trim() && (pack.noteOk || preview) && (
              <section aria-label="From the coach" style={{ ...tile, padding: '14px 16px', gap: 6 }}>
                <span style={label}>From the coach</span>
                <span style={{ fontSize: 15, lineHeight: '22px' }}>“{pack.note.trim()}”</span>
                <span style={{ ...cap, fontSize: 13 }}>{coach}, head coach, {team}</span>
              </section>
            )}
          </div>
        </div>
        {pack.history && (
          <section aria-label="Playing history" style={{ ...tile, padding: '14px 16px', gap: 0 }}>
            <h2 style={{ ...h2, paddingBottom: 6 }}>Playing history</h2>
            {historyFor(player, team).map(s => (
              <div key={s.year} style={{ display: 'grid', gridTemplateColumns: '56px minmax(0,1fr) auto', alignItems: 'center', gap: 10, minHeight: 48, borderTop: `1px solid ${LINE}`, fontSize: 14 }}>
                <strong>{s.year}</strong>
                <span style={{ display: 'flex', flexDirection: 'column' }}><span>{s.team}</span><span style={{ fontSize: 12, color: MUT }}>{s.positions}</span></span>
                <span style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{s.games} games · {s.minutes} min</span>
              </div>
            ))}
          </section>
        )}
        <span style={{ ...cap, fontSize: 13 }}>This page shows no contact details, date of birth, health or wellbeing notes. To take it further, reply to the family or to Wattle Creek FC.</span>
      </main>
    </div>
  )
}

/** The public route: /share/wattle-creek-<team>-<initials>. */
export default function TrialShare({ slug }: { slug: string }) {
  const parts = slug.split('-'), ini = parts.pop()!.toUpperCase(), tk = (parts.pop() ?? 'u12') as TeamKey
  const team = TEAM[tk] ?? TEAM.u12, known = team.squad.find(p => p.ini === ini)
  const player = known ?? TEAM.u12.squad.find(p => p.ini === 'MT')!
  const key = packKey(known ? tk : 'u12', player.ini)
  const pack = usePack(key, player)
  const t = known ? team : TEAM.u12
  // The demo has no server. In a browser that never built this pack, show the made-up player's page so the link can be tried.
  if (!hasPack(key)) return <TrialShareBody player={player} team={t.name} coach={t.coach} pack={{ ...pack, noteOk: true, note: 'Works hard without the ball and listens. A good team-mate who has come on a long way this season.' }} demo />
  return <TrialShareBody player={player} team={t.name} coach={t.coach} pack={pack} />
}
