import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type VCard = { al: string; len: string; title: string; credit: string; tag: string; watched?: boolean }

function VideoCard({ v, onClick }: { v: VCard; onClick?: () => void }) {
  return (
    <div style={{ position: 'relative', background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = G}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = LN}
    >
      <button aria-label={v.al} onClick={onClick} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'none', zIndex: 1 }} />
      <div style={{ background: GD, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '2px 6px' }}>{v.len}</div>
        {v.watched && <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, fontWeight: 700, color: '#fff', background: G, borderRadius: 4, padding: '2px 6px' }}>Watched</div>}
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 2, lineHeight: 1.3 }}>{v.title}</div>
        <div style={{ fontSize: 11, color: MUT }}>{v.credit}</div>
        <div style={{ fontSize: 10, color: MUT, background: PALE, borderRadius: 4, display: 'inline-block', padding: '1px 6px', marginTop: 4 }}>{v.tag}</div>
      </div>
    </div>
  )
}

export default function EDU5CoachCorner({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const videos: VCard[] = [
    {
      al: '0:48 Fixing bunching with one rule Luke Fraser with U11 Luke Small game plan',
      len: '0:48', title: 'Fixing bunching with one rule', credit: 'Luke Fraser with U11 Luke', tag: 'Small game plan',
    },
    {
      al: '1:05 A session with no lines and no laps Mark Dunn with U9 Mark Planning',
      len: '1:05', title: 'A session with no lines and no laps', credit: 'Mark Dunn with U9 Mark', tag: 'Planning',
    },
    {
      al: '0:40 Getting a quiet child on the ball Ana Silva with U12 Girls Ana Everyone',
      len: '0:40', title: 'Getting a quiet child on the ball', credit: 'Ana Silva with U12 Girls Ana', tag: 'Everyone',
    },
    {
      al: '0:36 A team talk in 30 seconds Sam K with U12 Sam Talking Watched',
      len: '0:36', title: 'A team talk in 30 seconds', credit: 'Sam K with U12 Sam', tag: 'Talking', watched: true,
    },
    {
      al: '0:52 Changing a game that isn\'t working Luke Fraser with U11 Luke Small game plan',
      len: '0:52', title: "Changing a game that isn't working", credit: 'Luke Fraser with U11 Luke', tag: 'Small game plan',
    },
    {
      al: '0:44 What to say to the sideline Rachel Moore Parents',
      len: '0:44', title: 'What to say to the sideline', credit: 'Rachel Moore', tag: 'Parents',
    },
  ]

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* MiniRoos top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 20 }}>Clean Sheet</div>
        <button onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Home</button>
        {(['Squad', 'Training', 'Game day'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>{t}</button>
        ))}
        <button onClick={() => tool('Clips')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Clips</button>
        <button onClick={() => tool('Record')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Record</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => tool('U9 Tom')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>U9 Tom</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>TK</div>
        </div>
      </div>

      {/* Clips sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={() => tool('Clips-sub')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Clips</button>
        <button onClick={() => tool('Best moments')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Best moments</button>
        <button onClick={() => tool('Learn')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Learn</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>MiniRoos coach</div>
      </div>

      {/* For players / For coaches segment */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 44, gap: 0 }}>
        <button onClick={() => onNav?.('EDU1-Learn')} style={{ height: 44, padding: '0 20px', background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>For players</button>
        <button onClick={() => tool('For coaches')} style={{ height: 44, padding: '0 20px', background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>For coaches</button>
      </div>

      <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        {/* Context banner */}
        <div style={{ background: GD, borderRadius: 12, padding: '12px 20px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.07em', marginBottom: 4 }}>THIS WEEK, FROM YOUR REVIEW: CHILDREN BUNCHING ROUND THE BALL</div>
          <div style={{ fontSize: 13, color: '#fff' }}>Live game help is off for MiniRoos at Wattle Creek, so you learn to see it yourself. These show how other coaches here do that.</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>For coaches · short clips of coaches at your club doing it well</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>Watch one, then try one thing on Saturday.</div>
            <div style={{ fontSize: 12, color: MUT }}>Coaches who said yes to being filmed coaching. Children are blurred unless their family has said yes to club examples.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
            <button onClick={() => { tool('Watch the next one'); st('The lesson plays, then asks you to try one thing on Saturday.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Watch the next one</button>
            <button onClick={() => { tool('All six'); st('The six lessons in order.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>All six</button>
          </div>
        </div>

        {/* Next up */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 2 }}>NEXT UP</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Next: Reading who has had a turn, without an app. 50 seconds. Then try it on Saturday.</div>
          </div>
        </div>

        {/* How did it go — shown above grid */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>How did "no lines, no laps" go on Tuesday?</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>After you try it, let us know how it went.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { tool('Worked'); st('Noted. Rachel can see you tried it.') }} style={{ height: 44, flex: 1, borderRadius: 12, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Worked</button>
            <button onClick={() => { tool('Sort of'); st('Noted. Want to see how Mark handles the start?') }} style={{ height: 44, flex: 1, borderRadius: 12, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Sort of</button>
            <button onClick={() => { tool('Didn\'t'); st('Noted. A note goes to Rachel so she can help.') }} style={{ height: 44, flex: 1, borderRadius: 12, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Didn't</button>
          </div>
        </div>

        {/* Video card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {videos.map(v => (
            <VideoCard key={v.al} v={v} onClick={() => { tool(v.al.substring(0, 20)); st(`${v.title} plays, with three things to notice.`) }} />
          ))}
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
