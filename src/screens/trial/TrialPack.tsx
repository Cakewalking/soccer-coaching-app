// The Trial pack tab on a player's profile, as the coach sees it.
// Clean Sheet drafts the pack and the family shares it from their phone, so
// there is nothing the coach has to do. They can add a few words, which the
// family chooses to include, and tell the family it is ready.

import { useState } from 'react'
import type { SquadPlayer } from '../../data'
import { Mark, MarkDot, Btn, Note, Dot, tile, h2, cap, label, G, INK, MUT, LINE } from '../capture/marks'
import type { Age } from '../capture/captureStore'
import { usePack, setPack, reelChoices, clipById, clipLength, factsFor, factMark, historyFor, approver, linkEnds, linkLive, teamKeyOf, packKey, MAX_CLIPS, NEVER, DRAFT_RULE, type Pack, type TeamKey } from './trialStore'
import { TrialShareBody } from './TrialShare'
import { ReelPlayer, ClipList } from './Reel'

/** The reel: a player with the clips as thumbnails. In "change it" mode the list is every clip that could go in. */
export function ClipPicker({ pk, ini, team, onToggle }: { pk: Pack; ini: string; team: TeamKey; onToggle?: (id: number) => void }) {
  const [at, setAt] = useState(0)
  const [playing, setPlaying] = useState(false)
  const chosen = pk.clips.map(id => clipById(id)!).filter(Boolean)
  if (onToggle) return <ClipList clips={reelChoices(ini, team)} chosen={pk.clips} onToggle={onToggle} />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ maxWidth: 520 }}><ReelPlayer clips={chosen} at={at} setAt={setAt} playing={playing} setPlaying={setPlaying} /></div>
      <ClipList clips={chosen} chosen={pk.clips} at={at} playing={playing} onPlay={i => { setAt(i); setPlaying(true) }} />
    </div>
  )
}

/** The numbers on the pack. Counted or recorded ones are ticked in the draft; an estimate is shown as one. */
export function FactPicker({ pk, player, onToggle }: { pk: Pack; player: SquadPlayer; onToggle?: (id: string) => void }) {
  const facts = factsFor(player).filter(f => onToggle || pk.facts.includes(f.id))
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '0 16px' }}>
      {facts.map(f => {
        const on = pk.facts.includes(f.id)
        const inner = <>
          {onToggle && <span aria-hidden="true" style={{ flex: 'none', width: 22, height: 22, borderRadius: 6, boxSizing: 'border-box', background: on ? G : '#fff', border: on ? 0 : `1.5px solid ${MUT}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>}</span>}
          <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 14 }}>{f.label} · <strong>{f.value}</strong></span><span style={{ fontSize: 12, color: MUT, display: 'flex', gap: 8, alignItems: 'center' }}>{f.from} <MarkDot kind={factMark(f)} /></span></span>
        </>
        const st = { display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, padding: '4px 0', borderTop: `1px solid ${LINE}`, color: INK, fontFamily: 'inherit', textAlign: 'left' } as const
        return onToggle ? <button key={f.id} role="checkbox" aria-checked={on} onClick={() => onToggle(f.id)} style={{ ...st, background: 'none', border: 0, borderTop: `1px solid ${LINE}`, cursor: 'pointer' }}>{inner}</button> : <div key={f.id} style={st}>{inner}</div>
      })}
    </div>
  )
}

export default function TrialPack({ player, team = 'U12 Sam', band = 'juniors', coach = 'Sam K', parent }: { player: SquadPlayer; team?: string; band?: Age; coach?: string; parent?: string }) {
  const tk = teamKeyOf(band), key = packKey(tk, player.ini)
  const pk = usePack(key, player)
  const [preview, setPreview] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3200) }
  const first = player.fullName.split(' ')[0]
  const byParent = approver(band) === 'parent'
  const who = byParent ? (parent ? `${parent}, ${first}’s parent` : `${first}’s parent`) : first
  const whoShort = who.split(',')[0]
  const live = linkLive(pk)

  if (preview) return (
    <div data-screen="TP1-TrialPack" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 32px', borderBottom: `1px solid ${LINE}`, background: '#fff' }}><Btn onClick={() => setPreview(false)}>Back to the trial pack</Btn></div>
      <TrialShareBody player={player} team={team} pack={pk} preview coach={coach} />
    </div>
  )
  const head = (t: string, d: string) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}><h2 style={h2}>{t}</h2><span style={{ ...cap, fontSize: 13 }}>{d}</span></div>
  return (
    <div data-screen="TP1-TrialPack" style={{ padding: '20px 32px 32px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, alignItems: 'start', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div>
          <strong style={{ fontSize: 20, letterSpacing: '-0.01em' }}>{first}’s trial pack is ready</strong>
          <div style={{ ...cap, marginTop: 2 }}>Clean Sheet put it together from this season’s film and team sheets. {byParent ? `${first}’s family shares it from their phone when ${first} trials at a new club.` : `${first} shares it from their phone when trialling at a new club.`} There is nothing you have to do.</div>
        </div>
        <section aria-label="Highlights reel" style={{ ...tile, padding: '14px 16px', gap: 10 }}>
          {head('Highlights reel', `${pk.clips.length} of ${MAX_CLIPS} clips · ${clipLength(pk.clips)}`)}
          {pk.clips.length === 0 ? <span style={cap}>No clips of {first} yet. Film a game and the good moments appear here.</span> : <ClipPicker pk={pk} ini={player.ini} team={tk} />}
          <span style={{ ...cap, fontSize: 13 }}>{DRAFT_RULE} {byParent ? 'The family' : first} can swap any of them. Every other child is blurred.</span>
        </section>
        <section aria-label="Facts to show" style={{ ...tile, padding: '14px 16px', gap: 6 }}>
          {head('This season', 'Counted or recorded numbers only, unless the family adds an estimate')}
          <FactPicker pk={pk} player={player} />
        </section>
        {pk.history && (
          <section aria-label="Playing history" style={{ ...tile, padding: '14px 16px', gap: 0 }}>
            <div style={{ paddingBottom: 6 }}>{head('Playing history', 'From each season’s team sheets')}</div>
            {historyFor(player, team).map(s => (
              <div key={s.year} style={{ display: 'grid', gridTemplateColumns: '50px minmax(0,1fr) auto', gap: 10, alignItems: 'center', minHeight: 40, borderTop: `1px solid ${LINE}`, fontSize: 14 }}>
                <strong>{s.year}</strong><span>{s.team} <span style={{ color: MUT }}>· {s.positions}</span></span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{s.games} games · {s.minutes} min</span>
              </div>
            ))}
          </section>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <section aria-label="Sharing" style={{ ...tile, padding: '14px 16px', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8 }}><h2 style={h2}>Sharing</h2>{live ? <Mark kind="strong" label="Link is on" /> : <Mark kind="not" label="Not shared" />}</div>
          <div style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: `1px solid ${LINE}` }}>
            <Dot ok={live} />
            <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <strong style={{ fontSize: 14 }}>{live ? `Shared by ${whoShort} · link ends ${linkEnds(pk.link!.made)}` : pk.approval === 'asked' ? `${first} has asked a parent to share it` : `${whoShort} shares it, not you`}</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{live ? 'They can turn the link off at any time.' : `It is on ${byParent ? 'the family’s' : `${first}’s`} phone, ready to send. Nothing leaves the club until they share it.`}</span>
              {!live && <Btn onClick={() => say(`Sent to ${whoShort}: “${first}’s trial pack is ready to share.”`)} style={{ alignSelf: 'flex-start' }}>Tell {whoShort} it is ready</Btn>}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 0', borderTop: `1px solid ${LINE}` }}>
            <label htmlFor="tp-note" style={label}>A few words from you (optional)</label>
            <textarea id="tp-note" value={pk.note} onChange={e => setPack(key, { note: e.target.value.slice(0, 400), noteOk: false }, player)} rows={4} placeholder={`What a new coach should know about ${first} as a player and a team-mate`} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 14, lineHeight: '20px', color: INK, resize: 'vertical' }} />
            <span style={{ ...cap, fontSize: 12 }}>{pk.note.length} of 400. {pk.note.trim() ? (pk.noteOk ? `${whoShort} has included your words.` : `${whoShort} sees your words and chooses whether to include them.`) : 'Write about football. Health, family and school stay out.'}</span>
          </div>
          <div style={{ borderTop: `1px solid ${LINE}`, padding: '10px 0 4px' }}><Btn onClick={() => setPreview(true)} style={{ width: '100%' }}>See what a new club would see</Btn></div>
        </section>
        <Note title="Never on a trial pack">{NEVER.join('. ')}.</Note>
        <Note title="Why the family shares it">{byParent ? `${first} is under 18. A child’s film and numbers leave the club only when a parent sends them, and the parent can turn the link off at any time.` : `${first} is an adult, so ${first} shares the pack and can turn the link off at any time.`}</Note>
        <Note title="In this demo">The link opens a made-up player’s page. Choices are kept in this browser only.</Note>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 100, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </div>
  )
}
