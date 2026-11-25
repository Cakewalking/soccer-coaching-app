// Ask Clean Sheet, the browser's side: sends one question to the demo's server function (api/ask.ts) and reads the answer as it streams.
//
// What goes with the question:
//   - the asker's role, in words;
//   - what the demo knows for that role (a summary a screen can register with `setAskContext`), and
//   - the words on the screen the person has open, so the answer uses the same names and numbers they are looking at;
//   - the labels of the screens they can open, so the answer can end by offering one.
// Everything here is the demo's sample data. Nothing a real person typed elsewhere is sent.

export type AskTurn = { role: 'user' | 'assistant'; text: string }
/** Why an answer did not come, in the panel's own words. */
export type AskError = 'not_configured' | 'slow_down' | 'busy' | 'failed' | 'declined' | 'cut_short' | 'offline'
export const ASK_ERROR: Record<AskError, string> = {
  not_configured: 'Ask Clean Sheet is not switched on for this demo yet. Its key needs setting up.',
  slow_down: 'That is a lot of questions in a short time. Give it a few minutes and ask again.',
  busy: 'Ask Clean Sheet is busy right now. Try again in a minute.',
  failed: 'That question could not be answered. Try asking it another way.',
  declined: 'Ask Clean Sheet cannot help with that one.',
  cut_short: 'The answer was cut short. Ask for the part you need.',
  offline: 'Ask Clean Sheet could not be reached. Check the connection and try again.',
}

// ── what the demo knows for a role: a screen or an app registers a function that writes it ──
const extra = new Map<string, () => string>()
/** Register what the demo knows for whoever is using an app (returns a function that takes it away again). Keep it to plain lines of text. */
export function setAskContext(key: string, write: () => string) { extra.set(key, write); return () => { if (extra.get(key) === write) extra.delete(key) } }

const SCREEN_MAX = 9_000
/** The words on the screen behind the Ask panel. `skip` is the panel itself, so a question is not answered from its own chat. */
function screenWords(skip?: Element | null) {
  const root = document.querySelector('#root') ?? document.body
  // The panel is marked on the live page for a moment, so the copy can be made without it.
  skip?.setAttribute('data-ask-skip', '')
  const copy = root.cloneNode(true) as HTMLElement
  skip?.removeAttribute('data-ask-skip')
  copy.querySelectorAll('[data-ask-skip]').forEach(n => n.remove())
  return tidy(copy)
}
function tidy(el: HTMLElement) {
  el.querySelectorAll('script,style,svg,[aria-hidden="true"]').forEach(n => n.remove())
  // Block-level pieces become lines, so "Name" and "11 of 16" do not run together.
  el.querySelectorAll('div,section,li,tr,p,h1,h2,h3,button,a').forEach(n => n.append('\n'))
  const t = (el.textContent ?? '').split('\n').map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n')
  return t.length > SCREEN_MAX ? `${t.slice(0, SCREEN_MAX)}\n(The rest of the screen is not included.)` : t
}

export function askContext(skip?: Element | null) {
  const known = [...extra.values()].map(f => { try { return f() } catch { return '' } }).filter(Boolean).join('\n\n')
  const seen = screenWords(skip)
  return [known && `What the demo knows for this role (sample data):\n${known}`, seen && `The screen that is open (its words, top to bottom):\n${seen}`].filter(Boolean).join('\n\n')
}

/** An answer may end with "OPEN: <label>": the screen to offer. Returns the words without that line, and the label when it is one of `places`. */
export function splitOpen(answer: string, places: string[]) {
  const m = /\n?\s*OPEN:\s*(.+?)\s*$/.exec(answer)
  if (!m) return { text: answer.trim(), open: undefined as string | undefined }
  const label = places.find(p => p.toLowerCase() === m[1].toLowerCase())
  return { text: answer.slice(0, m.index).trim(), open: label }
}

/**
 * Ask one question. `onText` is called with the whole answer so far each time more arrives.
 * Resolves with the finished answer, or with an error to word from `ASK_ERROR` (and whatever arrived before it).
 */
export async function ask(o: { role: string; question: string; history: AskTurn[]; places?: string[]; skip?: Element | null; signal?: AbortSignal; onText?: (soFar: string) => void }): Promise<{ text: string; error?: AskError }> {
  let res: Response
  try {
    res = await fetch('/api/ask', {
      method: 'POST', signal: o.signal, headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: o.role, question: o.question, history: o.history.slice(-8), places: o.places ?? [], context: askContext(o.skip) }),
    })
  } catch { return { text: '', error: 'offline' } }
  if (!res.ok || !res.body) {
    const code = await res.json().then(j => j?.error as string, () => '')
    return { text: '', error: res.status === 503 || res.status === 404 ? 'not_configured' : code === 'slow_down' ? 'slow_down' : res.status === 429 || res.status >= 500 ? 'busy' : 'failed' }
  }
  const reader = res.body.getReader(), dec = new TextDecoder()
  let buf = '', text = '', error: AskError | undefined
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      buf += dec.decode(value, { stream: true })
      let i: number
      while ((i = buf.indexOf('\n')) >= 0) {
        const raw = buf.slice(0, i); buf = buf.slice(i + 1)
        if (!raw.trim()) continue
        let msg: { t?: string; e?: string; done?: boolean }
        try { msg = JSON.parse(raw) } catch { continue }
        if (typeof msg.t === 'string') { text += msg.t; o.onText?.(text) }
        if (msg.e) error = (msg.e in ASK_ERROR ? msg.e : 'failed') as AskError
      }
    }
  } catch { if (!o.signal?.aborted) error = error ?? 'offline' }
  return { text, error }
}
