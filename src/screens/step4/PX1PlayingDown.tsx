import { useState } from 'react'
import { toolTarget } from '../toolTargets'
import { OpeningPanel, ChipRow, type ChipState, INK, MUT, HAIR, CTL, GREEN, PALEGREEN, AMBER } from './directorParts'

function DirFrame({ onNav, tool }: { onNav?: (s: string) => void; tool: (n: string) => void }) {
  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: GREEN, fontWeight: 700, borderBottom: `2.5px solid ${GREEN}` }
  return (
    <>
      <nav style={{ background: '#1f4a3e', height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => <button key={t} onClick={() => tool(t)} style={tnb}>{t}</button>)}
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' as const }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => onNav?.('VS1-SwitchView')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${HAIR}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button onClick={() => tool('All players')} style={snb}>All players</button>
        <button onClick={() => onNav?.('PU1-PlayingUp')} style={snb}>Pathway</button>
        <button onClick={() => onNav?.('PX1-PlayingDown')} style={snba}>Playing across</button>
        <button onClick={() => tool('Fair game time')} style={snb}>Fair game time</button>
        <div style={{ flex: 1 }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', fontSize: 13, fontWeight: 700 }}>Director of football</span>
      </nav>
    </>
  )
}

type Row = { ini: string; name: string; move: string; chips: ChipState[]; reason: string; btn: string; main?: boolean; target?: string; say?: string }
const TALK: Row[] = [
  { ini: 'EW', name: 'Eli Ward', move: 'U14 Josh → U13 Chris', chips: ['strong', 'notyet', 'some', 'strong', 'strong'], reason: 'Loses most duels', btn: 'Open Eli', main: true, target: 'PX2-LateDeveloper' },
  { ini: 'SI', name: 'Sana Iyer', move: 'U13 Girls Meg → U12 Girls Ana', chips: ['some', 'notyet', 'some', 'some', 'strong'], reason: 'Quieter since March', btn: 'Ask Meg', say: 'Meg is asked for her three taps on Sana.' },
]

export default function PX1PlayingDown({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [asked, setAsked] = useState(false)
  function tool(name: string) { const to = toolTarget(name); if (to && onNav) { onNav(to); return } setLastTool(name) }
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  const outBtn = { flex: 'none' as const, width: 150, height: 44, padding: '0 14px', borderRadius: 10, boxSizing: 'border-box' as const, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' as const, background: '#fff', color: INK, border: `1px solid ${CTL}` }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, height: 820, overflow: 'hidden', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <DirFrame onNav={onNav} tool={tool} />
      <OpeningPanel
        landing
        heading="PLAYING ACROSS · AN AGE GROUP DOWN"
        sentence="Eli Ward reads the game well and loses most of his duels. He is growing later than his year."
        support="Thursdays with the under 13s could give him the ball back. Sana is worth a talk too, and Kai has trained down since May."
        figures={[{ num: '2', label: 'worth a talk', proof: true }, { num: '1', label: 'training down now' }]}
        buttons={[{ label: 'Open Eli', main: true, onClick: () => onNav?.('PX2-LateDeveloper') }, { label: 'Nominate a player', onClick: () => say('Pick any player. Their coach is asked for a view.') }]}
      />

      <div style={{ flex: 'none', padding: '10px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'flex', padding: 3, borderRadius: 10, background: HAIR }}>
          {[{ l: 'An age group up · 3', on: false, t: 'PU1-PlayingUp' }, { l: 'An age group down · 2', on: true, t: 'PX1-PlayingDown' }, { l: 'Mixed-age sessions', on: false, t: 'PX3-BandedNight' }].map(tab => (
            <button key={tab.l} onClick={() => onNav?.(tab.t)} style={{ height: 40, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: 'none', color: INK, background: tab.on ? '#fff' : 'transparent' }}>{tab.l}</button>
          ))}
        </span>
        <span style={{ fontSize: 13, color: MUT }}>Up, down or mixed: the same idea. The right challenge for each player.</span>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px' }}>
        <section style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 36 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Worth a talk</h2>
            <span style={{ fontSize: 13, color: MUT }}>Filled: strong · pale: some · dashed: not yet</span>
          </div>
          {TALK.map((p) => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 150px', columnGap: 10, alignItems: 'center', minHeight: 70, borderTop: `1px solid ${HAIR}`, padding: '4px 0', boxSizing: 'border-box' }}>
              <span style={{ width: 40, height: 40, borderRadius: 999, background: PALEGREEN, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>{p.ini}</span>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 16, lineHeight: '22px' }}>{p.name}</strong><span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{p.move}</span></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ChipRow states={p.chips} /><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{p.reason}</span></span>
              </span>
              <button onClick={() => p.target ? onNav?.(p.target) : say(p.say!)} style={p.main ? { ...outBtn, background: GREEN, color: '#fff', border: `1px solid ${GREEN}` } : outBtn}>{p.btn}</button>
            </div>
          ))}
          <h2 style={{ margin: '6px 0 0', fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', minHeight: 30, display: 'flex', alignItems: 'center' }}>Training down now</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 150px 150px', columnGap: 10, alignItems: 'center', minHeight: 56, borderTop: `1px solid ${HAIR}` }}>
            <span style={{ width: 40, height: 40, borderRadius: 999, background: PALEGREEN, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>KO</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 16, lineHeight: '22px' }}>Kai Osei</strong><span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>U15 Boys Dan → U14 Josh</span></span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Thursdays since May · “I get on the ball again”</span>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ display: 'flex', gap: 3 }}>{Array.from({ length: 6 }, (_, i) => <span key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i < 5 ? GREEN : HAIR }} />)}</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>Week 5 of 6</span>
            </span>
            <button onClick={() => onNav?.('PX2-LateDeveloper')} style={outBtn}>Open his check-in</button>
          </div>
          <span style={{ marginTop: 'auto', paddingTop: 6, fontSize: 13, color: MUT }}>A dashed Body means “growing later than their year”, not a fault. Many here are the best footballers in their age group.</span>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, flex: 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 4 }}><span style={{ width: 32, height: 32, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>{asked ? 0 : 1}</span><h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Needs you</h2></span>
            {!asked ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, borderTop: `1px solid ${HAIR}` }}>
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>Sana Iyer</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Meg’s view, not asked yet</span></span>
                <button onClick={() => { setAsked(true); say('Meg is asked for her three taps on Sana.') }} style={{ ...outBtn, width: 'auto' }}>Ask</button>
              </span>
            ) : <span style={{ fontSize: 13, color: MUT, paddingTop: 8 }}>Asked. Meg will see it on her Home.</span>}
          </section>
          <section style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6, flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Games need the league</h2>
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Training down is the club’s call, any week. League games a year down need the league’s approval, usually before the season.</span>
            <button onClick={() => say('Opens Dispensations under League sync, with this player’s application.')} style={{ ...outBtn, width: 'auto', alignSelf: 'flex-start', marginTop: 'auto' }}>Apply for Eli</button>
          </section>
          <button onClick={() => onNav?.('PU5-Settings')} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '10px 14px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', color: INK, minHeight: 56, textAlign: 'left' }}>
            <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>What the club counts</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Growing later, the football holds up, or the coach is worried</span></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </aside>
      </main>
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </div>
  )
}
