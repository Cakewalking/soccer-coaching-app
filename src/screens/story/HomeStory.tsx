import { useState } from 'react'

// Home that tells a story (STO1–STO22). Shared four-part layout driven by a
// per-screen config. Measurements from HANDOVER-HOME.md. Amber #f4c95d only in
// the four listed places (proof small line, newest bar + number, proof main
// button, needs-you count). DM Sans, weights 400/700.

const DARK = '#1c3a33', PALE = '#a9cfc0', AMBER = '#f4c95d', INK = '#10211f'
const GREEN = '#2f6252', PALEG = '#dcefe8', BORDER = '#c5c8c4', HAIR = '#e9eae8'
const GREY = '#4a5a57', FACEBG = '#eef5f2'

type Bar = { n: string; when: string; amber?: boolean }
type StatusLine = { label: string; value: string }
type Face = { ini: string; has: boolean }
type MomentRow = { ini: string; title: string; sub: string; action: string; target?: string }

export type FrameNavItem = { label: string; target?: string; active?: boolean }
export type HomeCfg = {
  id: string
  role: string            // role chip text e.g. "Coach · MiniRoos"
  team: string            // team pill text
  avatar: string          // avatar initials
  topNav: FrameNavItem[]  // top nav (Home, Squad, …) — target set = open, else existing
  subNav: FrameNavItem[]  // sub nav (Overview, Messages, …)
  ask: string
  askTarget: string
  proof: {
    label: string
    headline: string
    second: string
    bars?: Bar[]
    unit?: string
    reel?: { duration: string; chips: string[]; caption: string }  // one clickable block (existing)
    status?: StatusLine[]
    statusCaption?: string
    mainBtn: string
    mainTarget?: string
    outlineBtn?: string
    outlineTarget?: string
  }
  ready: {
    when: string
    title: string
    text: string
    chips?: string[]
    pale?: string
    btn1: string
    btn1Target?: string
    btn2?: string
  }
  moments: {
    title: string
    link: string
    faces: Face[]
    rows: MomentRow[]
    foot: string
  }
  done: { title: string; lines: string[]; next: string }
  needs: { count: number; title: string; sub?: string; target?: string }
}

function Face({ ini, has }: Face) {
  return (
    <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, color: has ? GREEN : GREY, background: has ? FACEBG : HAIR, opacity: has ? 1 : 0.55, boxShadow: has ? `0 0 0 2px #fff, 0 0 0 4px ${GREEN}` : undefined }}>{ini}</span>
  )
}

function Bars({ bars, unit }: { bars: Bar[]; unit?: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
      {bars.map((b, i) => (
        <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 64 }}>
          <strong style={{ fontSize: b.amber ? 22 : 16, lineHeight: '24px', color: b.amber ? AMBER : PALE }}>{b.n}</strong>
          <span style={{ width: '100%', height: Math.max(8, parseInt(b.n) ? Math.round((parseInt(b.n) / Math.max(...bars.map(x => parseInt(x.n) || 1))) * 34) : 8), borderRadius: '6px 6px 0 0', background: b.amber ? AMBER : 'rgba(255,255,255,0.28)' }} />
          <span style={{ fontSize: 12, lineHeight: '16px', color: PALE, whiteSpace: 'nowrap' }}>{b.when}</span>
        </span>
      ))}
      {unit && <span style={{ alignSelf: 'center', fontSize: 13, lineHeight: '18px', color: PALE, maxWidth: 150 }}>{unit}</span>}
    </span>
  )
}

function ProofInner({ p, nav, tool }: { p: HomeCfg['proof']; nav: (s: string) => void; tool: (s: string) => void }) {
  const mainBtn: React.CSSProperties = { height: 46, padding: '0 18px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none', background: AMBER, color: INK, cursor: 'pointer', fontFamily: 'inherit' }
  const outBtn: React.CSSProperties = { height: 46, padding: '0 18px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: `1px solid ${PALE}`, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 28, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>{p.label}</span>
        <h1 style={{ margin: 0, fontSize: 27, lineHeight: '34px', letterSpacing: '-0.02em', color: '#fff', fontWeight: 700 }}>{p.headline}</h1>
        <span style={{ fontSize: 15, lineHeight: '21px', color: PALE }}>{p.second}</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 4, gap: 16 }}>
          {p.bars ? <Bars bars={p.bars} unit={p.unit} /> : <span />}
          <span style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <button onClick={() => p.mainTarget ? nav(p.mainTarget) : tool(p.mainBtn)} style={mainBtn}>{p.mainBtn}</button>
            {p.outlineBtn && <button onClick={() => p.outlineTarget ? nav(p.outlineTarget) : tool(p.outlineBtn!)} style={outBtn}>{p.outlineBtn}</button>}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {p.reel ? (
          <button onClick={() => tool(p.reel!.caption)} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
            <span style={{ height: 132, borderRadius: 12, background: 'rgba(255,255,255,0.10)', border: `1px solid ${PALE}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, position: 'relative' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.85 }}><path d="M8 5l11 7-11 7z" /></svg>
              <span style={{ position: 'absolute', left: 10, bottom: 10, fontSize: 12, fontWeight: 700, background: 'rgba(0,0,0,0.35)', padding: '2px 8px', borderRadius: 6 }}>{p.reel.duration}</span>
            </span>
            <span style={{ display: 'flex', gap: 6 }}>
              {p.reel.chips.map(c => <span key={c} style={{ flex: 1, height: 30, borderRadius: 6, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{c}</span>)}
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: PALE }}>{p.reel.caption}</span>
          </button>
        ) : p.status ? (
          <>
            {p.status.map(s => (
              <button key={s.label} onClick={() => tool(s.label)} style={{ minHeight: 44, padding: '0 12px', borderRadius: 10, background: 'rgba(255,255,255,0.10)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ color: PALE }}>{s.label}</span><strong>{s.value}</strong>
              </button>
            ))}
            {p.statusCaption && <span style={{ fontSize: 13, lineHeight: '18px', color: PALE }}>{p.statusCaption}</span>}
          </>
        ) : null}
      </div>
    </div>
  )
}

function CardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', minHeight: 0, ...style }}>{children}</div>
}

function ReadyCard({ r, nav, tool }: { r: HomeCfg['ready']; nav: (s: string) => void; tool: (s: string) => void }) {
  return (
    <div style={{ background: GREEN, border: `1px solid ${GREEN}`, borderRadius: 16, padding: '14px 16px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>{r.when}</span>
      <strong style={{ fontSize: 22, lineHeight: '27px', letterSpacing: '-0.01em' }}>{r.title}</strong>
      <span style={{ fontSize: 14, lineHeight: '20px' }}>{r.text}</span>
      {r.chips && <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{r.chips.map(c => <span key={c} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 700 }}>{c}</span>)}</span>}
      {r.pale && <span style={{ fontSize: 13, lineHeight: '18px', color: PALEG, marginTop: 'auto' }}>{r.pale}</span>}
      <span style={{ display: 'flex', gap: 8, marginTop: r.pale ? 0 : 'auto' }}>
        <button onClick={() => r.btn1Target ? nav(r.btn1Target) : tool(r.btn1)} style={{ flex: 1, height: 46, borderRadius: 12, background: '#fff', color: INK, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{r.btn1}</button>
        {r.btn2 && <button onClick={() => tool(r.btn2!)} style={{ height: 46, padding: '0 16px', borderRadius: 12, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{r.btn2}</button>}
      </span>
    </div>
  )
}

function MomentsCard({ m, nav, tool }: { m: HomeCfg['moments']; nav: (s: string) => void; tool: (s: string) => void }) {
  return (
    <CardShell style={{ gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <strong style={{ fontSize: 17, lineHeight: '23px' }}>{m.title}</strong>
        <button onClick={() => tool(m.link)} style={{ minHeight: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, color: GREEN, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{m.link}</button>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '4px 4px 6px', flexWrap: 'wrap' }}>{m.faces.map((f, i) => <Face key={i} {...f} />)}</div>
      {m.rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 54, borderTop: `1px solid ${HAIR}`, paddingTop: 8 }}>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: FACEBG, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{row.ini}</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, lineHeight: '20px', fontWeight: 700, color: INK }}>{row.title}</div>
            <div style={{ fontSize: 13, lineHeight: '18px', color: GREY }}>{row.sub}</div>
          </span>
          <button onClick={() => row.target ? nav(row.target) : tool(`${row.action}:${row.ini}`)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{row.action}</button>
        </div>
      ))}
      <span style={{ fontSize: 14, lineHeight: '20px', color: GREY, marginTop: 'auto', borderTop: `1px solid ${HAIR}`, paddingTop: 8 }}>{m.foot}</span>
    </CardShell>
  )
}

function RightColumn({ done, needs, nav, tool }: { done: HomeCfg['done']; needs: HomeCfg['needs']; nav: (s: string) => void; tool: (s: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
      <CardShell style={{ gap: 7, flex: 1 }}>
        <strong style={{ fontSize: 17, lineHeight: '23px' }}>{done.title}</strong>
        {done.lines.map((l, i) => (
          <span key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 14, lineHeight: '19px' }}>
            <span style={{ flexShrink: 0, display: 'flex', marginTop: 1 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>
            <span>{l}</span>
          </span>
        ))}
        <span style={{ fontSize: 14, lineHeight: '20px', color: GREY, marginTop: 'auto' }}>{done.next}</span>
      </CardShell>
      {needs.count > 0 ? (
        <button onClick={() => needs.target ? nav(needs.target) : tool('needs')} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, flexShrink: 0 }}>{needs.count}</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, lineHeight: '20px', fontWeight: 700, color: INK }}>{needs.title}</div>
            {needs.sub && <div style={{ fontSize: 13, lineHeight: '18px', color: GREY }}>{needs.sub}</div>}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GREY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      ) : (
        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 16px', fontSize: 15, fontWeight: 700, color: GREY }}>Nothing needs you</div>
      )}
    </div>
  )
}

function Frame({ cfg, nav, tool, children }: { cfg: HomeCfg; nav: (s: string) => void; tool: (s: string) => void; children: React.ReactNode }) {
  const tnb = (it: FrameNavItem): React.CSSProperties => ({ height: 56, padding: '0 12px', background: it.active ? 'rgba(255,255,255,0.14)' : 'none', color: it.active ? '#fff' : 'rgba(255,255,255,0.75)', border: 'none', borderRadius: it.active ? 10 : 0, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 })
  const snb = (it: FrameNavItem): React.CSSProperties => ({ height: 44, minWidth: 44, padding: '0 10px', background: 'none', color: it.active ? GREEN : GREY, borderBottom: it.active ? `2px solid ${GREEN}` : '2px solid transparent', border: 'none', fontSize: 13, fontWeight: it.active ? 700 : 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 })
  const click = (it: FrameNavItem) => () => it.target ? nav(it.target) : tool(it.label)
  return (
    <div data-lasttool="" style={{ width: 1180, minHeight: 820, background: '#f4f6f5', fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: DARK, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16 }}>Clean Sheet</span>
        {cfg.topNav.map(it => <button key={it.label} onClick={click(it)} style={tnb(it)}>{it.label}</button>)}
        <div style={{ flex: 1 }} />
        <button onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12 }}>{cfg.team}</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#b9777a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{cfg.avatar}</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${HAIR}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        {cfg.subNav.map(it => <button key={it.label} onClick={click(it)} style={snb(it)}>{it.label}</button>)}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: GREY, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>{cfg.role}
        </span>
      </nav>
      {children}
    </div>
  )
}

export function HomeStoryTablet({ cfg, onNav }: { cfg: HomeCfg; onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const nav = (s: string) => onNav?.(s)
  const tool = (s: string) => { setLastTool(s); setToast(s); setTimeout(() => setToast(null), 2500) }
  return (
    <div data-lasttool={lastTool}>
      <Frame cfg={cfg} nav={nav} tool={tool}>
        <div style={{ padding: '14px 28px 0' }}>
          <button onClick={() => nav(cfg.askTarget)} style={{ width: '100%', height: 52, borderRadius: 14, border: `1px solid ${HAIR}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={GREEN} aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" /></svg>
            <span style={{ fontSize: 15, color: GREY }}>{cfg.ask}</span>
          </button>
        </div>
        <div style={{ padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.08fr) 300px', gridTemplateRows: 'auto minmax(0,1fr)', flex: 1 }}>
          <div style={{ gridColumn: '1 / 4', background: DARK, borderRadius: 20, padding: '18px 24px' }}>
            <ProofInner p={cfg.proof} nav={nav} tool={tool} />
          </div>
          <ReadyCard r={cfg.ready} nav={nav} tool={tool} />
          <MomentsCard m={cfg.moments} nav={nav} tool={tool} />
          <RightColumn done={cfg.done} needs={cfg.needs} nav={nav} tool={tool} />
        </div>
      </Frame>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600 }}>{toast}</div>}
    </div>
  )
}
