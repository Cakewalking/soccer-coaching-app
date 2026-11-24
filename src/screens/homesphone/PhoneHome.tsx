// The phone home in four parts, as the homes handover draws it (v26, 24 Nov): one layout for every role on a phone.
//   Now          a slim strip: the next thing in the calendar and the one button the person needs today
//   Progress     the dark band: one sentence, then-and-now figures, and one button. It is amber only when film sits behind the claim
//   Development  two rows: who has moved and who needs something
//   Oversight    is anything slipping: counted rows and a needs-you row. On a child's home this part is "My week" and nothing in it is a warning
// The words and wiring for each role are in data.ts.
import { useState, type CSSProperties, type ReactNode } from 'react'
import { useBackState } from '../../backState'
import { demoToast } from '../demoToast'

/** What a control does: `to` opens that screen, `say` does the thing and says its line. */
export type Ctl = { to?: string; say?: string }
export type PhoneHomeCfg = {
  id: string
  roleLine: string
  greeting: string
  avatar: string
  /** the person's own settings page, opened from the avatar (not on the board; the old home had it) */
  me?: string
  now: { title: string; sub: string; btn: string } & Ctl
  progress: { label: string; headline: string; figures: { label: string; then: string; now: string }[]; btn: { label: string; /** film sits behind the claim: the one amber button */ film: boolean } & Ctl }
  dev: { title: string; rows: ({ chip: string; chipBg: string; title: string; sub: string } & Ctl)[] }
  /** `name` is "Oversight", or "My week" on a child's home */
  over: { name: string; title: string; rows: ({ label: string; value: string; warn?: boolean } & Ctl)[] }
  /** the first tab is this page */
  tabs: ({ label: string; icon: string } & Ctl)[]
  /** ways in that the board does not draw, as plain links under the last part */
  links?: { label: string; to: string }[]
}

const INK = '#10211f', GREEN = '#2f6252', DARK = '#1c3a33', AMBER = '#f4c95d', GREY = '#4a5a57', LINE = '#c5c8c4', HAIR = '#e9eae8', MINT = '#cfe6dc'
const FONT = "var(--font-sans, 'DM Sans', system-ui, sans-serif)"
const plain: CSSProperties = { margin: 0, padding: 0, border: 0, background: 'transparent', font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer' }
const card: CSSProperties = { flex: 'none', background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }
const TICK = 'M5 12l5 5 9-10', BANG = 'M12 7v6M12 17v.5', CHEVRON = 'M9 6l6 6-6 6'

function Icon({ d, size, width = 2, color = 'currentColor' }: { d: string; size: number; width?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d={d} /></svg>
}

/**
 * One phone home. A control opens its screen the way the old home's did: in place under a "Back to Home" bar when the
 * host passes `renderTarget` (look-around), otherwise through `onNav`. A line is said with the app's toast.
 */
export default function PhoneHome({ cfg, onNav, renderTarget }: { cfg: PhoneHomeCfg; onNav?: (id: string) => void; renderTarget?: (id: string) => ReactNode }) {
  const [said, setSaid] = useState('')
  const [open, setOpen] = useBackState<string | null>(null)
  const say = (line: string) => { setSaid(line); demoToast(line) }
  const go = (id: string) => {
    if (id === cfg.id) { setOpen(null); return }   // a row that names this page stays here
    if (renderTarget) setOpen(id); else onNav?.(id)
  }
  const press = (c: Ctl) => () => { if (c.to) go(c.to); else if (c.say) say(c.say) }

  if (open && renderTarget) return (
    <div style={{ width: 390, minHeight: 844, margin: '0 auto', background: '#faf5ec', display: 'flex', flexDirection: 'column', fontFamily: FONT }}>
      <div style={{ padding: '10px 16px', borderBottom: `1px solid ${HAIR}`, background: '#fff', flexShrink: 0 }}>
        <button onClick={() => setOpen(null)} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: `1px solid ${LINE}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon d="M19 12H5M12 5l-7 7 7 7" size={13} width={2.5} />
          Back to Home
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>{renderTarget(open)}</div>
    </div>
  )

  const child = cfg.over.name === 'My week'   // nothing on a child's home is a warning
  const p = cfg.progress
  const avatar = <span style={{ width: 40, height: 40, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{cfg.avatar}</span>

  return (
    <div data-phone-home={cfg.id} data-lasttool={said} style={{ width: 390, minHeight: 844, boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: FONT, display: 'flex', flexDirection: 'column' }}>
      <header data-club-bar="" style={{ flex: 'none', padding: '12px 18px', background: GREEN, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ flexGrow: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: MINT }}>{cfg.roleLine}</span>
          <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>{cfg.greeting}</span>
        </span>
        {cfg.me
          ? <button onClick={() => go(cfg.me!)} aria-label="Your account and settings" data-club-keep="" style={{ ...plain, flex: 'none', width: 44, height: 44, margin: -2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{avatar}</button>
          : <span style={{ flex: 'none' }}>{avatar}</span>}
      </header>

      <div style={{ flexGrow: 1, minHeight: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <section aria-label="Now" style={{ flex: 'none', borderRadius: 14, background: '#ffffff', border: `1px solid ${LINE}`, padding: '8px 8px 8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 14, lineHeight: '18px' }}>{cfg.now.title}</strong>
            <span style={{ fontSize: 12, lineHeight: '16px', color: GREY }}>{cfg.now.sub}</span>
          </span>
          <button onClick={press(cfg.now)} style={{ ...plain, flex: 'none', height: 44, padding: '0 16px', borderRadius: 12, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', background: GREEN, color: '#ffffff', border: `1px solid ${GREEN}` }}>{cfg.now.btn}</button>
        </section>

        <section aria-label="Progress" style={{ flex: 'none', borderRadius: 16, background: DARK, color: '#ffffff', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>{p.label}</span>
          <strong style={{ fontSize: 18, lineHeight: '23px', letterSpacing: '-0.01em' }}>{p.headline}</strong>
          {p.figures.map(f => (
            <span key={f.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8, minHeight: 26, borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 4, boxSizing: 'content-box' }}>
              <span style={{ flexGrow: 1, fontSize: 13, lineHeight: '18px', color: '#ffffff' }}>{f.label}</span>
              <span style={{ fontSize: 12, color: MINT, whiteSpace: 'nowrap' }}>{f.then}</span>
              <Icon d="M5 12h14M13 6l6 6-6 6" size={12} width={2.2} color={MINT} />
              <strong style={{ fontSize: 17, color: AMBER, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{f.now}</strong>
            </span>
          ))}
          <button onClick={press(p.btn)} data-film={p.btn.film ? '' : undefined} style={{ ...plain, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700, ...(p.btn.film ? { background: AMBER, color: INK } : { border: '1px solid #ffffff', color: '#ffffff', boxSizing: 'content-box' }) }}>
            {p.btn.film && <Icon d="M8 5l11 7-11 7z" size={15} />}
            {p.btn.label}
          </button>
        </section>

        <section aria-label="Development" style={card}>
          <strong style={{ fontSize: 15, lineHeight: '20px', paddingBottom: 4 }}>{cfg.dev.title}</strong>
          {cfg.dev.rows.map(r => (
            <button key={r.title} onClick={press(r)} style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: `1px solid ${HAIR}`, color: INK }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: r.chipBg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.chip}</span>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>{r.title}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: GREY }}>{r.sub}</span>
              </span>
              <Icon d={CHEVRON} size={14} width={2.4} />
            </button>
          ))}
        </section>

        <section aria-label={cfg.over.name} style={card}>
          <strong style={{ fontSize: 15, lineHeight: '20px', paddingBottom: 4 }}>{cfg.over.title}</strong>
          {cfg.over.rows.map(r => {
            const warn = !!r.warn && !child
            return (
              <button key={r.label} onClick={press(r)} data-needs-you={warn ? '' : undefined} style={{ ...plain, display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, borderTop: `1px solid ${HAIR}`, color: INK }}>
                <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: warn ? '#f4e6e6' : '#eef5f2' }}>
                  {/* a row the board marks as a warning is drawn as a plain dot on a child's home */}
                  {r.warn && child ? <span style={{ width: 6, height: 6, borderRadius: 999, background: INK }} /> : <Icon d={warn ? BANG : TICK} size={12} width={2.8} />}
                </span>
                <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>{r.label}</span>
                <strong style={{ fontSize: 14, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{r.value}</strong>
              </button>
            )
          })}
        </section>

        {cfg.links && (
          <span style={{ flex: 'none', alignSelf: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '-4px 0' }}>
            {cfg.links.map(l => <button key={l.to} onClick={() => go(l.to)} style={{ ...plain, minHeight: 44, padding: '0 7px', fontSize: 13, fontWeight: 700, color: GREEN, textDecoration: 'underline' }}>{l.label}</button>)}
          </span>
        )}
      </div>

      <nav aria-label="Main" style={{ flex: 'none', display: 'flex', borderTop: `1px solid ${LINE}`, background: '#ffffff' }}>
        {cfg.tabs.map((t, i) => (
          // The first tab is this page: it stays here and never opens the screen it names over the top.
          <button key={t.label} aria-current={i === 0 ? 'page' : undefined} onClick={i === 0 ? () => setOpen(null) : press(t)} style={{ ...plain, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: i === 0 ? GREEN : GREY }}>
            <Icon d={t.icon} size={22} />
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
