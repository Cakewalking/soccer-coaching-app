import { kept, keep } from '../kept'
import { useState } from 'react'
import { playClips } from '../clips/clipSheet'
import YTFrame from './YTFrame'
import { INK, MUT, GREEN, CTL, HAIR, PALEGREEN } from '../step4/directorParts'

const GD = '#1f4a3e'

const DRAFT_TITLE = 'Won 3–1 at Ironbark United'
const DRAFT_BODY = `We set out to win the ball back quickly, and for 40 minutes we did. Thirteen of our wins came in their half, and two of the three goals started from one. Mia and Jai pressed as a pair all morning, which is exactly what we worked on at training.

Legs went a little after half time and Ironbark had their best spell. We will keep Thursday shorter and sharper because of it.

Goals: Mia, Jai, Zoe. Everyone played at least half the game.`

// `seniors`: an adult team's report goes to the squad, not to families.
export default function YT2MatchReport({ onNav, bare = false, seniors = false }: { onNav?: (s: string) => void; bare?: boolean; seniors?: boolean }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const draft = kept(seniors ? 'cs_report_seniors_v1' : 'cs_report_v1', { title: DRAFT_TITLE, body: DRAFT_BODY, keptAt: '' })
  const [title, setTitle] = useState(draft.title)
  const [body, setBody] = useState(draft.body)
  const [keptNow, setKeptNow] = useState(!!draft.keptAt)
  const [listening, setListening] = useState(false)
  // Say it: the browser writes down what it hears and adds it to the report. Not every browser can.
  function dictate() {
    type Rec = { lang: string; onresult: (e: { results: { 0: { transcript: string } }[] }) => void; onend: () => void; onerror: () => void; start: () => void }
    const W = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec }
    const R = W.SpeechRecognition ?? W.webkitSpeechRecognition
    if (!R) { say('This browser cannot listen. Type the report, or open Clean Sheet in Chrome or Safari.'); return }
    try { const r = new R(); r.lang = 'en-AU'; r.onresult = e => { const heard = e.results[0][0].transcript; setBody(b => (b ? b + ' ' : '') + heard); setKeptNow(false); say('Added what you said to the report.') }; r.onend = () => setListening(false); r.onerror = () => { setListening(false); say('Could not hear anything. Check the microphone is allowed.') }; setListening(true); r.start(); say('Listening. Say the report and Clean Sheet writes it down.') } catch { setListening(false); say('Could not start listening on this device.') }
  }
  const [groups, setGroups] = useState<Record<string, boolean>>({ families: true, club: false, players: false })
  const [sent, setSent] = useState(false)

  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  function toggleGroup(k: string) { setGroups(prev => ({ ...prev, [k]: !prev[k] })); setLastTool(k) }
  function send() {
    const to: string[] = []
    if (groups.families) to.push(seniors ? 'the squad' : '17 families')
    if (groups.club) to.push('club news (Rachel checks it first)')
    if (groups.players) to.push('players 15 and over')
    if (!to.length) { say('Tick at least one group to send to.'); return }
    setSent(true)
    say(`Sent to ${to.join(', ')}. A copy is saved under Files, marked sent just now.`)
  }

  const GROUPS = [
    seniors ? { k: 'families', title: 'The squad', sub: '18 players, in the app' } : { k: 'families', title: 'U12 Sam families', sub: '17 families, in the app' },
    { k: 'club', title: 'Club news', sub: 'Rachel checks it first' },
    { k: 'players', title: 'Players 15 and over', sub: 'Not this team' },
  ].filter(g => !(seniors && g.k === 'players'))   // for an adult team the squad is the players

  return (
    <YTFrame
      onNav={onNav} active="report" lastTool={lastTool} bare={bare}
      heading="Match report · Sat 30 May · Won 3-1 at Ironbark United"
      sentence="Your match report is drafted. Change anything, then share it."
      support={`Written from your take, the film and the vests, in your words where you gave them. Nothing goes to ${seniors ? 'the squad' : 'families'} until you send it.`}
      buttons={[
        { label: sent ? '✓ Sent' : seniors ? 'Send to the squad' : 'Send to 17 families', main: true, onClick: send },
        { label: keptNow ? 'Kept on this tablet' : 'Keep it for me', onClick: () => { keep(seniors ? 'cs_report_seniors_v1' : 'cs_report_v1', { title, body, keptAt: new Date().toISOString() }); setKeptNow(true); say('Kept. Only you can see it until you send it.') } },
      ]}
    >
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, minHeight: 0 }}>
        <section style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, flex: 1 }}>Round 8 · away · Redgum Reserve</span>
            <button onClick={() => { setBody(DRAFT_BODY.split('\n\n').slice(0, 2).join('\n\n')); say('Rewritten, shorter.') }} style={{ height: 36, padding: '0 12px', borderRadius: 999, border: `1px solid ${CTL}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Write it again, shorter</button>
            <button aria-pressed={listening} onClick={dictate} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${CTL}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>{listening ? 'Listening…' : 'Say it instead'}</button>
          </div>
          <input value={title} onChange={e => { setTitle(e.target.value); setKeptNow(false) }} style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 22, fontWeight: 800, color: INK, fontFamily: 'inherit', outline: 'none', padding: 0 }} />
          <textarea value={body} onChange={e => { setBody(e.target.value); setKeptNow(false) }} style={{ width: '100%', minHeight: 170, border: `1px solid ${HAIR}`, borderRadius: 10, padding: '12px 14px', fontSize: 15, lineHeight: '23px', color: INK, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, marginTop: 4 }}>Clips in the report · tap to play</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['0:09', '0:12', '0:07'].map((d, i) => (
              <button key={i} aria-label={`Play clip ${i + 1} of 3, ${d}`} onClick={() => playClips(['0:09', '0:12', '0:07'].map((x, k) => ({ title: `Clip ${k + 1} in the report`, sub: 'From Saturday’s film.', len: Number(x.split(':')[1]) })), 'Clips in the report', i)} style={{ flex: 1, height: 84, borderRadius: 10, border: 'none', background: GD, position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
                <span style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '1px 5px' }}>{d}</span>
              </button>
            ))}
          </div>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Who gets it</div>
            {GROUPS.map((g, i) => { const on = groups[g.k]; return (
              <button key={g.k} onClick={() => toggleGroup(g.k)} style={{ width: '100%', display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderTop: i ? `1px solid ${HAIR}` : 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${on ? GREEN : CTL}`, background: on ? GREEN : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}</span>
                <span><span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK }}>{g.title}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{g.sub}</span></span>
              </button>
            ) })}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Written from</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>Your take (4 of 5, and your note), 9 clips, the vests, and the score.</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginTop: 8 }}>A report never includes a rating or anything about one {seniors ? 'player' : 'child'}’s body or wellbeing.</div>
          </div>
          <button onClick={() => { setBody(''); setTitle(''); say('Blank page. Write your own, top to bottom.') }} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', color: INK, textAlign: 'left' }}>
            <span style={{ width: 28, height: 28, borderRadius: 6, background: PALEGREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
            <span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>Start from a blank page</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>Write your own, top to bottom</span></span>
          </button>
        </aside>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, maxWidth: 640, padding: '12px 16px', borderRadius: 14, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </YTFrame>
  )
}
