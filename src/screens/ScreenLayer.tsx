import { createContext, useLayoutEffect, useRef, type ReactNode } from 'react'
import { SandboxContext } from './sandbox/SandboxContext'

const DEMO_CTX = { store: { teams: [], players: [], fixtures: [], sessions: [], messages: [] }, update: () => {}, active: false }

// Opens any designed screen by its id on top of the app the coach is in, with a
// way back. The role apps use it for deep links that are not one of their own
// tabs (a lesson, a head-knock form, device settings), so no button is a dead end.
// DemoApp registers the renderer; this file stays free of screen imports.

/** Set while a screen is shown as a layer, so a screen with its own Done or Close button can take the coach back. */
export const LayerCloseContext = createContext<(() => void) | null>(null)
/** Who is signed in to the app the layer was opened from, as "Name · role, team". Settings shows it. */
export const LayerWhoContext = createContext<string | null>(null)

let renderer: ((key: string) => ReactNode) | null = null
export function registerScreenRenderer(fn: (key: string) => ReactNode) { renderer = fn }

/** True for design ids such as "EDU3-MakeLesson" or "TM7-HeadKnock". */
export const isScreenId = (s: string) => /^[A-Z][A-Za-z0-9]*-[A-Za-z0-9]/.test(s)

// Many older screens were drawn as whole pages, with their own "Clean Sheet" header, menu, team
// pill and avatar (always U12 Sam's). Opened from another team's app, that second header is the
// wrong look and the wrong team. A layer therefore hides the opened screen's own header and menu
// row: the app the coach came from stays the only frame, and the Back bar is the way out.
function hideOwnChrome(root: HTMLElement) {
  for (const el of root.querySelectorAll<HTMLElement>('div,span,strong,button,a')) {
    if (el.childElementCount !== 0 || el.textContent?.trim() !== 'Clean Sheet') continue
    let bar = el
    while (bar.parentElement && bar.parentElement !== root && bar.parentElement.getBoundingClientRect().height <= 96 && bar.parentElement.getBoundingClientRect().height > 0) bar = bar.parentElement
    const r = bar.getBoundingClientRect()
    if (bar === el || r.width < 600 || r.height > 96) continue          // a phone header, or the words in a sentence
    const next = bar.nextElementSibling as HTMLElement | null
    bar.setAttribute('data-own-chrome', '')
    if (next && next.getBoundingClientRect().height <= 64 && next.querySelectorAll('button,a').length >= 3) next.setAttribute('data-own-chrome', '')   // its menu row
    break
  }
}
if (typeof document !== 'undefined' && !document.getElementById('own-chrome-style')) {
  const st = document.createElement('style'); st.id = 'own-chrome-style'; st.textContent = '[data-own-chrome]{display:none!important}'; document.head.appendChild(st)
}

// `example`: show the filled demo version even inside the sandbox, where the same
// screen would otherwise read the visitor's own (empty) team.
export default function ScreenLayer({ screenKey, onClose, backLabel = 'Back', example = false, who = null }: { screenKey: string; onClose: () => void; backLabel?: string; example?: boolean; who?: string | null }) {
  const body = renderer ? renderer(screenKey) : null
  const bodyRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const root = bodyRef.current; if (!root) return
    hideOwnChrome(root)
    const mo = new MutationObserver(() => { if (!root.querySelector('[data-own-chrome]')) hideOwnChrome(root) })   // the screen inside moved on to another one
    mo.observe(root, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [screenKey])
  return (
    <div data-layer={screenKey} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, height: '100%', background: '#f7f8f7', fontFamily: 'var(--font-sans)' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, height: 52, padding: '0 16px', background: '#1f4a3e' }}>
        <button onClick={onClose} style={{ height: 44, padding: '0 14px 0 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          {backLabel}
        </button>
      </div>
      <div ref={bodyRef} style={{ flexGrow: 1, minHeight: 0, overflow: 'auto' }}><LayerCloseContext.Provider value={onClose}><LayerWhoContext.Provider value={who}>{example ? <SandboxContext.Provider value={DEMO_CTX}>{body}</SandboxContext.Provider> : body}</LayerWhoContext.Provider></LayerCloseContext.Provider></div>
    </div>
  )
}
