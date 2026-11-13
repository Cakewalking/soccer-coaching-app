import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type LCard = { al: string; len: string; title: string; credit: string; tag: string; meta?: string }

function LessonCard({ c, onClick }: { c: LCard; onClick?: () => void }) {
  return (
    <div style={{ position: 'relative', background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = G}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = LN}
    >
      <button aria-label={c.al} onClick={onClick} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'none', zIndex: 1 }} />
      <div style={{ background: GD, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '2px 6px' }}>{c.len}</div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 2, lineHeight: 1.3 }}>{c.title}</div>
        <div style={{ fontSize: 11, color: MUT, marginBottom: 4 }}>{c.credit}</div>
        <div style={{ fontSize: 11, color: MUT, background: PALE, borderRadius: 4, display: 'inline-block', padding: '2px 8px' }}>{c.tag}</div>
        {c.meta && <div style={{ fontSize: 11, color: G, marginTop: 4 }}>{c.meta}</div>}
      </div>
    </div>
  )
}

export default function EDU1Learn({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  function tool(name: string) { setLastTool(name) }

  const picked: LCard[] = [
    {
      al: '0:14 Stepping up together U14 Josh back four · v Ironbark Staying compact 1 of 4 in Staying compact 9 of 16 watched',
      len: '0:14', title: 'Stepping up together', credit: 'U14 Josh back four · v Ironbark', tag: 'Staying compact', meta: '9 of 16 watched',
    },
    {
      al: '0:11 Closing the space behind the press Grace Reid, U12 Sam · v Tealside Town Defender 5 of 16 watched',
      len: '0:11', title: 'Closing the space behind the press', credit: 'Grace Reid, U12 Sam · v Tealside Town', tag: 'Defender', meta: '5 of 16 watched',
    },
  ]

  const series = [
    { id: 's1', num: '4', title: 'Staying compact', meta: 'Under 12 and older · 1 of 4 watched', desc: 'Staying compact: 4 lessons in order, about 2 minutes.' },
    { id: 's2', num: '5', title: 'Playing out from the back', meta: 'Under 11 and older', desc: 'Playing out from the back: 5 lessons in order, about 2 minutes.' },
    { id: 's3', num: '3', title: 'In goal: starting spots', meta: 'Keepers, any age', desc: 'In goal: starting spots: 3 lessons in order, about 2 minutes.' },
  ]

  const more: LCard[] = [
    {
      al: '0:09 Scanning before the ball arrives Ava Walsh, U13 Girls Meg Building up',
      len: '0:09', title: 'Scanning before the ball arrives', credit: 'Ava Walsh, U13 Girls Meg', tag: 'Building up',
    },
    {
      al: '0:08 First touch away from pressure Tane Waru, U14 Josh',
      len: '0:08', title: 'First touch away from pressure', credit: 'Tane Waru, U14 Josh', tag: 'Attacking',
    },
    {
      al: '0:07 Weak-foot finish across the keeper Leo Costa, U13 Chris',
      len: '0:07', title: 'Weak-foot finish across the keeper', credit: 'Leo Costa, U13 Chris', tag: 'Midfielder',
    },
    {
      al: '0:12 Starting position for a through ball Ruby Lane, U12 Sam · in goal Striker',
      len: '0:12', title: 'Starting position for a through ball', credit: 'Ruby Lane, U12 Sam · in goal', tag: 'Striker',
    },
  ]

  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {open ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
    </svg>
  )

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 20 }}>Clean Sheet</div>
        {(['Home', 'Squad', 'Training', 'Match day'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>{t}</button>
        ))}
        <button onClick={() => tool('Clips')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Clips</button>
        <button onClick={() => onNav?.('REC1-RecordHub')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Record</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => tool('U12 Sam')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Clips sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['By game', 'By measure', 'By player', 'Playlists'].map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>{t}</button>
        ))}
        <button onClick={() => tool('Learn')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Learn</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* For players / For coaches + controls */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 52, gap: 12 }}>
        <div style={{ display: 'flex', border: `1.5px solid ${LN}`, borderRadius: 999, overflow: 'hidden' }}>
          <button style={{ height: 44, padding: '0 20px', background: G, border: 'none', fontSize: 13, color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>For players</button>
          <button onClick={() => tool('For coaches')} style={{ height: 44, padding: '0 20px', background: '#fff', border: 'none', fontSize: 13, color: MUT, fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit' }}>For coaches</button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => tool('Club style')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Club style
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button onClick={() => tool('By position')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>By position
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button onClick={() => onNav?.('EDU3-MakeLesson')} style={{ height: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Make one from a clip</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        {/* Intro note */}
        <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>Short clips of Wattle Creek players doing it well, with what to notice.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: MUT }}>Grace, Ruby and Mia are examples this term. Each has said yes, and so has a parent. Other children are blurred. No opposition player is named. Only things done well.</div>
          <button onClick={() => onNav?.('EDU2-Lesson')} style={{ height: 44, minWidth: 44, fontSize: 12, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, padding: '0 4px', whiteSpace: 'nowrap' }}>Who</button>
        </div>

        {/* Picked for this week */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ background: GD, borderRadius: 10, padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.07em' }}>PICKED FOR THIS WEEK · YOUR GAP BETWEEN THE LINES IS 26 M, TARGET 18</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {picked.map(c => <LessonCard key={c.al} c={c} onClick={() => onNav?.('EDU2-Lesson')} />)}
          </div>
        </div>

        {/* Club series */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Club series</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {series.map((s, i) => (
              <div key={s.id}>
                <button
                  onClick={() => { setExpanded(expanded === s.id ? null : s.id); tool(s.id) }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', background: 'none', border: 'none', borderBottom: i < series.length - 1 && expanded !== s.id ? `1px solid ${LN}` : 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{s.num} {s.title}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{s.meta}</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}><ChevronIcon open={expanded === s.id} /></span>
                </button>
                {expanded === s.id && (
                  <div style={{ padding: '0 20px 14px', borderBottom: i < series.length - 1 ? `1px solid ${LN}` : 'none' }}>
                    <div style={{ fontSize: 13, color: MUT }}>{s.desc}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* More lessons */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>More lessons</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {more.map(c => <LessonCard key={c.al} c={c} onClick={() => onNav?.('EDU2-Lesson')} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
