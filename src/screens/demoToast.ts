// A toast any button can raise without owning toast state. Used as the default
// for demo buttons that have no screen behind them yet, so nothing is a dead end.
let el: HTMLDivElement | null = null
let timer: ReturnType<typeof setTimeout> | undefined

export function demoToast(msg: string) {
  if (typeof document === 'undefined') return
  if (!el) {
    el = document.createElement('div')
    el.setAttribute('role', 'status')
    Object.assign(el.style, { position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: '400', padding: '12px 20px', borderRadius: '12px', background: '#1f4a3e', color: '#fff', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', fontSize: '15px', fontWeight: '600', boxShadow: '0 8px 24px rgba(16,33,31,0.25)', maxWidth: '560px', textAlign: 'center' })
  }
  el.textContent = msg
  if (!el.isConnected) document.body.appendChild(el)
  clearTimeout(timer)
  timer = setTimeout(() => el?.remove(), 3000)
}
