// The trial pack on the family's phone: already made, two taps to share.
// A parent shares for anyone under 18. An adult player shares for themselves.
// A player under 18 can look, change it and ask a parent to share it.

import { useState } from 'react'
import type { SquadPlayer } from '../../data'
import { Mark, Ico, IC, G, INK, MUT, LINE, PALE, DARK, tile, cap, label } from '../capture/marks'
import { usePack, setPack, clipById, clipLength, factsFor, historyFor, approver, linkEnds, linkLive, linkPath, packKey, TEAM, MAX_CLIPS, LINK_DAYS, DRAFT_RULE, type TeamKey } from './trialStore'
import { ClipPicker, FactPicker } from './TrialPack'
import { TrialShareBody } from './TrialShare'

export default function TrialPackPhone({ player, team, as, onNav = () => {}, home }: { player: SquadPlayer; team: TeamKey; as: 'parent' | 'player'; onNav?: (s: string) => void; home: string }) {
  const t = TEAM[team], key = packKey(team, player.ini)
  const pk = usePack(key, player)
  const set = (patch: Parameters<typeof setPack>[1]) => setPack(key, patch, player)
  const [edit, setEdit] = useState(false)
  const [preview, setPreview] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(x => x === m ? null : x), 3200) }
  const first = player.fullName.split(' ')[0]
  const whose = as === 'parent' ? `${first}’s` : 'Your'
  // Who may send it: a parent, or the player if they are an adult.
  const maySend = as === 'parent' || approver(t.band) === 'player'
  const live = linkLive(pk), url = `${window.location.origin}${linkPath(key)}`
  // A change after sharing turns the old link off: the club must not see something the sender has not looked at.
  const change = (patch: Parameters<typeof setPack>[1]) => { set({ ...patch, ...(pk.link && !pk.link.off ? { approval: 'none' as const, link: { ...pk.link, off: true } } : {}) }); if (live) say('The old link is off. Share again when you are happy with it.') }
  const toggleClip = (id: number) => pk.clips.includes(id) ? change({ clips: pk.clips.filter(c => c !== id) }) : pk.clips.length < MAX_CLIPS ? change({ clips: [...pk.clips, id] }) : say(`A reel holds ${MAX_CLIPS} clips. Take one out first.`)
  const toggleFact = (id: string) => change({ facts: pk.facts.includes(id) ? pk.facts.filter(f => f !== id) : [...pk.facts, id] })
  const share = () => { set({ approval: 'yes', link: { made: Date.now() } }); say('Link made. Copy it and send it to the new club.') }
  const copy = async () => { try { await navigator.clipboard.writeText(url); say('Link copied.') } catch { say('Copy the address shown above.') } }
  const btn = (primary: boolean) => ({ flex: 1, minHeight: 48, padding: '0 12px', borderRadius: 10, border: `1px solid ${primary ? G : LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' } as const)
  const clips = pk.clips.map(id => clipById(id)!).filter(Boolean), facts = factsFor(player).filter(f => pk.facts.includes(f.id))

  if (preview) return (
    <div data-screen="TPp1-TrialPackPhone" style={{ width: 390, minHeight: 844, margin: '0 auto', background: '#f7f8f7' }}>
      <div style={{ padding: '8px 12px', background: G }}><button onClick={() => setPreview(false)} style={{ minHeight: 44, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 0, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}><Ico d={IC.back} size={16} sw={2.4} />Back</button></div>
      <TrialShareBody player={player} team={t.name} coach={t.coach} pack={pk} preview />
    </div>
  )
  return (
    <div data-screen="TPp1-TrialPackPhone" style={{ width: 390, minHeight: 844, margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ flex: 'none', background: G, color: '#fff', padding: '10px 12px 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => onNav(home)} aria-label="Back" style={{ flex: 'none', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, color: '#fff', cursor: 'pointer' }}><Ico d="M15 18l-6-6 6-6" size={20} sw={2.4} /></button>
        <span style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 12, color: '#dcefe8' }}>{t.name} · for a trial at a new club</span><h1 style={{ margin: 0, fontSize: 22, lineHeight: '27px', letterSpacing: '-0.02em' }}>{whose} trial pack</h1></span>
      </header>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <section aria-label="Ready" style={{ borderRadius: 16, background: DARK, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#a9cfc0' }}>{live ? 'SHARED' : 'MADE FOR YOU'}</span>
          <strong style={{ fontSize: 20, lineHeight: '26px', letterSpacing: '-0.01em' }}>{live ? `The link is on until ${linkEnds(pk.link!.made)}.` : `It is ready. ${maySend ? 'Share it when you need it.' : 'Ask a parent to share it.'}`}</strong>
          <span style={{ fontSize: 14, lineHeight: '20px', color: '#a9cfc0' }}>{clips.length} clips ({clipLength(pk.clips)}), {facts.length} numbers{pk.history ? ' and playing history' : ''}. {live ? 'You can turn it off at any time.' : 'Nothing is sent until you share it.'}</span>
        </section>
        {pk.approval === 'asked' && as === 'parent' && !live && <div role="note" style={{ borderRadius: 12, background: PALE, padding: '10px 14px', fontSize: 14, lineHeight: '20px' }}><strong>{first} has asked you to share this.</strong> Have a look, then share it or leave it.</div>}
        {live && (
          <section aria-label="Link" style={{ ...tile, padding: '12px 14px', gap: 8 }}>
            <span style={label}>The link to send</span>
            <span style={{ fontSize: 13, lineHeight: '18px', wordBreak: 'break-all', background: PALE, borderRadius: 8, padding: '8px 10px' }}>{url}</span>
            <span style={{ display: 'flex', gap: 8 }}><button style={btn(true)} onClick={copy}>Copy link</button><button style={btn(false)} onClick={() => { set({ link: { ...pk.link!, off: true }, approval: 'none' }); say('The link is off.') }}>Turn link off</button></span>
          </section>
        )}
        <section aria-label="Highlights" style={{ ...tile, padding: '12px 14px', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>Highlights</strong><span style={{ ...cap, fontSize: 13 }}>{clips.length} of {MAX_CLIPS} · {clipLength(pk.clips)}</span></div>
          <ClipPicker pk={pk} ini={player.ini} team={team} onToggle={edit ? toggleClip : undefined} />
          <span style={{ ...cap, fontSize: 13 }}>{DRAFT_RULE} Other players are blurred.</span>
        </section>
        <section aria-label="Numbers" style={{ ...tile, padding: '12px 14px 6px', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>This season</strong><Mark kind="strong" label="Counted or recorded" /></div>
          <FactPicker pk={pk} player={player} onToggle={edit ? toggleFact : undefined} />
        </section>
        {(pk.history || edit) && (
          <section aria-label="Playing history" style={{ ...tile, padding: '12px 14px 6px', gap: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 4 }}><strong style={{ fontSize: 16 }}>Playing history</strong>
              {edit && <button role="switch" aria-checked={pk.history} onClick={() => change({ history: !pk.history })} style={{ minHeight: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LINE}`, background: pk.history ? PALE : '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{pk.history ? 'Shown' : 'Hidden'}</button>}</div>
            {pk.history && historyFor(player, t.name).map(s => <div key={s.year} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, minHeight: 40, alignItems: 'center', borderTop: `1px solid ${LINE}`, fontSize: 14 }}><span><strong>{s.year}</strong> · {s.team.split(' · ')[0]}</span><span style={{ color: MUT }}>{s.games} games</span></div>)}
          </section>
        )}
        {pk.note.trim() && (
          <section aria-label="From the coach" style={{ ...tile, padding: '12px 14px', gap: 8 }}>
            <span style={label}>{t.coach} added a few words</span>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>“{pk.note.trim()}”</span>
            <button role="switch" aria-checked={pk.noteOk} onClick={() => change({ noteOk: !pk.noteOk })} style={{ ...btn(pk.noteOk), flex: 'none' }}>{pk.noteOk ? 'Included. Tap to leave out' : 'Include these words'}</button>
          </section>
        )}
        <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Never on a trial pack: health, wellbeing, contact details, date of birth, or anything about another player.</span>
      </div>
      <div style={{ flex: 'none', position: 'sticky', bottom: 0, background: '#f7f8f7', borderTop: `1px solid ${LINE}`, padding: '10px 14px 16px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button style={btn(false)} onClick={() => setEdit(e => !e)} aria-pressed={edit}>{edit ? 'Done' : 'Change it'}</button>
        <button style={btn(false)} onClick={() => setPreview(true)}>Preview</button>
        {!live && (maySend
          ? <button style={{ ...btn(true), flexBasis: '100%' }} onClick={share}>Share with a new club · link lasts {LINK_DAYS} days</button>
          : <button style={{ ...btn(true), flexBasis: '100%' }} onClick={() => { set({ approval: 'asked' }); say('Sent to your parent. They share it from their phone.') }} aria-pressed={pk.approval === 'asked'}>{pk.approval === 'asked' ? 'Asked. Waiting for a parent' : 'Ask a parent to share it'}</button>)}
      </div>
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 150, transform: 'translateX(-50%)', zIndex: 60, maxWidth: 340, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, textAlign: 'center' }}>{toast}</div>}
    </div>
  )
}
