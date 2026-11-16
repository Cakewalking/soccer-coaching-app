import type { ReactNode } from 'react'

// Opens any designed screen by its id on top of the app the coach is in, with a
// way back. The role apps use it for deep links that are not one of their own
// tabs (a lesson, a head-knock form, device settings), so no button is a dead end.
// DemoApp registers the renderer; this file stays free of screen imports.

let renderer: ((key: string) => ReactNode) | null = null
export function registerScreenRenderer(fn: (key: string) => ReactNode) { renderer = fn }

/** True for design ids such as "EDU3-MakeLesson" or "TM7-HeadKnock". */
export const isScreenId = (s: string) => /^[A-Z][A-Za-z0-9]*-[A-Za-z0-9]/.test(s)

export default function ScreenLayer({ screenKey, onClose, backLabel = 'Back' }: { screenKey: string; onClose: () => void; backLabel?: string }) {
  return (
    <div data-layer={screenKey} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, height: '100%', background: '#f7f8f7', fontFamily: 'var(--font-sans)' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, height: 52, padding: '0 16px', background: '#1f4a3e' }}>
        <button onClick={onClose} style={{ height: 44, padding: '0 14px 0 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          {backLabel}
        </button>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, overflow: 'auto' }}>{renderer ? renderer(screenKey) : null}</div>
    </div>
  )
}
