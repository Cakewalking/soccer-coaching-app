// An in-page "are you sure?" that does not freeze the page.
// window.confirm blocks every update until it is answered, so the browser counts
// the whole wait as one slow interaction. This resolves a promise instead.
export function confirmDialog(message: string, okLabel = 'Yes', cancelLabel = 'Cancel'): Promise<boolean> {
  return new Promise(resolve => {
    const last = document.activeElement as HTMLElement | null
    const veil = document.createElement('div')
    Object.assign(veil.style, { position: 'fixed', inset: '0', zIndex: '500', background: 'rgba(16,33,31,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' })
    const box = document.createElement('div')
    box.setAttribute('role', 'alertdialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', message)
    Object.assign(box.style, { width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 20px 50px rgba(16,33,31,0.3)' })
    const text = document.createElement('div')
    text.textContent = message
    Object.assign(text.style, { fontSize: '17px', fontWeight: '700', color: '#10211f', lineHeight: '1.4', marginBottom: '18px' })
    const row = document.createElement('div')
    Object.assign(row.style, { display: 'flex', gap: '8px', justifyContent: 'flex-end' })
    const mk = (label: string, primary: boolean) => {
      const b = document.createElement('button')
      b.type = 'button'; b.textContent = label
      Object.assign(b.style, { height: '44px', padding: '0 18px', borderRadius: '10px', fontFamily: 'inherit', fontSize: '15px', fontWeight: '700', cursor: 'pointer', border: primary ? '0' : '1px solid #c5c8c4', background: primary ? '#2f6252' : '#fff', color: primary ? '#fff' : '#10211f' })
      return b
    }
    const cancel = mk(cancelLabel, false), ok = mk(okLabel, true)
    const done = (v: boolean) => { document.removeEventListener('keydown', onKey); veil.remove(); last?.focus?.(); resolve(v) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') done(false) }
    cancel.onclick = () => done(false); ok.onclick = () => done(true)
    veil.onclick = e => { if (e.target === veil) done(false) }
    document.addEventListener('keydown', onKey)
    row.append(cancel, ok); box.append(text, row); veil.append(box); document.body.append(veil)
    cancel.focus()
  })
}
