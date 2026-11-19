// Messages, the same for every role: your chats, and a way to reach anyone on Clean Sheet by their
// username, from the people you already message, or through a group you share.
// What you send and who you start a chat with is kept in this browser.

import { useState, useSyncExternalStore } from 'react'
import { MES, PEOPLE, person, type Chat, type Line, type Person } from './people'
import { isRead, markRead, useRead } from '../readStore'
import { useBackState } from '../../backState'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4', HAIR = '#e9eae8', PALE = '#eef5f2'

// ── What this person has sent and started ────────────────────────────────────
type Kept = { sent: Record<string, Line[]>; started: string[] }
const KEY = 'cs_msgs_v1'
let all: Record<string, Kept> = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, Kept> } catch { return {} } })()
const subs = new Set<() => void>()
const keep = (me: string, f: (k: Kept) => Kept) => { all = { ...all, [me]: f(all[me] ?? { sent: {}, started: [] }) }; try { localStorage.setItem(KEY, JSON.stringify(all)) } catch { /* kept for this visit only */ } subs.forEach(s => s()) }
const useKept = (me: string): Kept => { useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => all, () => all); return all[me] ?? { sent: {}, started: [] } }
/** Start, or go back to, a chat with one person. Used by buttons elsewhere in an app ("Tell Sam"). */
export function startChat(me: string, handle: string) { keep(me, k => k.started.includes(handle) || MES[me]?.chats.some(c => c.id === handle) ? k : { ...k, started: [handle, ...k.started] }); wanted = { me, id: handle }; subs.forEach(s => s()) }
let wanted: { me: string; id: string } | null = null
/** True while a chat has been asked for from elsewhere in this person's app, so the app can show Messages. */
export const useChatWanted = (me: string) => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => wanted?.me === me, () => false)

const Ini = ({ p, size = 40, group }: { p?: Person; size?: number; group?: string }) => <span style={{ flex: 'none', width: size, height: size, borderRadius: group ? 10 : 999, background: group ? PALE : p?.private ? '#f1e9df' : '#cbbeb5', color: group ? G : INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.32, fontWeight: 700 }}>{group ? group.split(/[ ·]+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() : p?.ini}</span>
const icon = (d: string, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
const SEARCH = 'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-4.300-4.300', BACK = 'M15 6l-6 6 6 6', PLUS = 'M12 5v14M5 12h14', SEND = 'M4 12l16-8-6 16-3-7z'

/** The rule that applies when you write to this person, in one line. */
function rule(p: Person, mine: Person): string | null {
  if (p.private) return 'Private. Nobody else at the club can read this chat.'
  if (p.copied) return `${p.name.split(' ')[0]} is under 18, so ${p.copied} is copied on this chat.`
  if (p.org !== mine.org) return `${p.name.split(' ')[0]} is at ${p.org}. They see your name, your role and your club.`
  return null
}

export default function Messaging({ me, phone = false }: { me: keyof typeof MES | string; phone?: boolean }) {
  const cfg = MES[me], mine = person(cfg.handle)
  const kept = useKept(me); useRead()
  const [open, setOpen] = useBackState<string | null>(phone ? null : cfg.chats[0].id)
  const [finding, setFinding] = useBackState(false)
  const [q, setQ] = useState(''), [filter, setFilter] = useState(''), [draft, setDraft] = useState('')
  if (wanted && wanted.me === me) { const id = wanted.id; wanted = null; queueMicrotask(() => { setFinding(false); setOpen(id) }) }

  // chats you started come first, then the ones you already had
  const begun: Chat[] = kept.started.filter(h => !cfg.chats.some(c => c.id === h)).map(h => ({ id: h, members: [h], lines: [] }))
  const chats = [...begun, ...cfg.chats].map(c => ({ ...c, lines: [...c.lines, ...(kept.sent[c.id] ?? [])], unread: isRead(`msg:${me}:${c.id}`) ? 0 : c.unread ?? 0 }))
  const title = (c: { id: string; group?: string }) => c.group ?? person(c.id).name
  const chat = chats.find(c => c.id === open) ?? null
  if (chat) markRead(`msg:${me}:${chat.id}`)
  const shown = chats.filter(c => !filter.trim() || `${title(c)} ${c.group ? '' : '@' + c.id}`.toLowerCase().includes(filter.trim().toLowerCase()))
  const send = () => { const text = draft.trim(); if (!text || !chat) return; keep(me, k => ({ ...k, sent: { ...k.sent, [chat.id]: [...(k.sent[chat.id] ?? []), { text, time: 'Now' }] } })); setDraft('') }
  const pick = (p: Person) => { const to = p.parent ?? p.handle; keep(me, k => k.started.includes(to) || cfg.chats.some(c => c.id === to) ? k : { ...k, started: [to, ...k.started] }); setQ(''); setFinding(false); setOpen(to) }

  // ── Finding someone ────────────────────────────────────────────────────────
  const term = q.trim().toLowerCase().replace(/^@/, '')
  const hit = (p: Person) => !term || p.handle.includes(term) || p.name.toLowerCase().includes(term)
  const others = PEOPLE.filter(p => p.handle !== cfg.handle)
  const messaged = new Set(chats.filter(c => !c.group).map(c => c.id)), inGroup = new Set(cfg.groups.flatMap(g => g.members))
  const sections: [string, Person[]][] = [
    ['People you message', others.filter(p => messaged.has(p.handle) && hit(p))],
    ...cfg.groups.map(g => [g.name, others.filter(p => g.members.includes(p.handle) && !messaged.has(p.handle) && hit(p))] as [string, Person[]]),
    [`Others at ${mine.org}`, term ? others.filter(p => p.org === mine.org && !messaged.has(p.handle) && !inGroup.has(p.handle) && hit(p)) : []],
    ['Elsewhere on Clean Sheet', term.length >= 2 ? others.filter(p => p.org !== mine.org && !messaged.has(p.handle) && !inGroup.has(p.handle) && hit(p)) : []],
  ]
  const seen = new Set<string>(), found = sections.map(([h, ps]) => [h, ps.filter(p => !seen.has(p.handle) && !!seen.add(p.handle))] as [string, Person[]]).filter(s => s[1].length)

  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, width: '100%', padding: '8px 16px', border: 0, borderTop: `1px solid ${HAIR}`, background: 'transparent', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }
  const field: React.CSSProperties = { width: '100%', height: 44, padding: '0 12px 0 38px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', fontFamily: 'inherit', fontSize: 15, color: INK, boxSizing: 'border-box', outline: 'none' }
  const Field = ({ value, on, hint, label }: { value: string; on: (s: string) => void; hint: string; label: string }) => <span style={{ position: 'relative', display: 'block', flexGrow: 1 }}><span style={{ position: 'absolute', left: 12, top: 13, color: MUT }}>{icon(SEARCH)}</span><input aria-label={label} value={value} onChange={e => on(e.target.value)} placeholder={hint} style={field} /></span>

  const list = (
    <section aria-label="Your chats" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: '#fff', borderRight: phone ? 0 : `1px solid ${LINE}`, width: phone ? '100%' : 340, flex: 'none' }}>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px' }}>
        {Field({ value: filter, on: setFilter, hint: 'Search your chats', label: 'Search your chats' })}
        <button onClick={() => setFinding(true)} aria-label="New message" style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>{icon(PLUS, 16)}New</button>
      </div>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        {shown.map(c => { const last = c.lines[c.lines.length - 1], p = c.group ? undefined : person(c.id); return (
          <button key={c.id} onClick={() => setOpen(c.id)} aria-current={open === c.id || undefined} style={{ ...row, background: open === c.id && !phone ? PALE : 'transparent' }}>
            <Ini p={p} group={c.group} />
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><strong style={{ fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title(c)}</strong><span style={{ flex: 'none', fontSize: 12, color: MUT }}>{last?.time ?? ''}</span></span>
              <span style={{ display: 'block', fontSize: 13, color: c.unread ? INK : MUT, fontWeight: c.unread ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{last ? `${last.from ? person(last.from).name.split(' ')[0] : 'You'}: ${last.text}` : 'No messages yet'}</span>
            </span>
            {c.unread > 0 && <span data-unread="" style={{ flex: 'none', minWidth: 20, height: 20, borderRadius: 999, background: G, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</span>}
          </button>) })}
        {!shown.length && <p style={{ margin: 0, padding: '18px 16px', fontSize: 14, color: MUT }}>No chat matches “{filter}”. Press New to find someone.</p>}
      </div>
    </section>
  )

  const finder = (
    <section aria-label="New message" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flexGrow: 1, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${HAIR}` }}>
        <button onClick={() => setFinding(false)} aria-label="Back to your chats" style={{ flex: 'none', width: 44, height: 44, borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon(BACK)}</button>
        {Field({ value: q, on: setQ, hint: 'Name or @username', label: 'Find someone by name or username' })}
      </div>
      <p style={{ margin: 0, padding: '10px 16px 4px', fontSize: 13, color: MUT }}>Anyone on Clean Sheet can be found by their username. Yours is <strong style={{ color: INK }}>@{cfg.handle}</strong>.</p>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        {found.map(([h, ps]) => <div key={h}>
          <div style={{ padding: '12px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT }}>{h}</div>
          {ps.map(p => <button key={p.handle} onClick={() => pick(p)} style={row}>
            <Ini p={p} />
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <strong style={{ display: 'block', fontSize: 15 }}>{p.name} <span style={{ fontWeight: 400, color: MUT }}>@{p.handle}</span></strong>
              <span style={{ display: 'block', fontSize: 13, color: MUT }}>{p.parent ? `Under 15, so this goes to ${person(p.parent).name}, ${p.name.split(' ')[0]}’s parent` : `${p.role} · ${p.org}`}</span>
            </span>
          </button>)}
        </div>)}
        {!found.length && <p style={{ margin: 0, padding: '18px 16px', fontSize: 14, color: MUT }}>{term ? `Nobody found for “${q.trim()}”. Check the spelling of the username.` : 'Type a name or a username.'}</p>}
      </div>
    </section>
  )

  const who = chat && !chat.group ? person(chat.id) : null, note = who ? rule(who, mine) : null
  const thread = chat && (
    <section aria-label={title(chat)} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flexGrow: 1, background: '#f7f8f7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: '#fff', borderBottom: `1px solid ${HAIR}` }}>
        {phone && <button onClick={() => setOpen(null)} aria-label="Back to your chats" style={{ flex: 'none', width: 44, height: 44, borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon(BACK)}</button>}
        <Ini p={who ?? undefined} group={chat.group} />
        <span style={{ minWidth: 0 }}><strong style={{ display: 'block', fontSize: 16 }}>{title(chat)}</strong><span style={{ display: 'block', fontSize: 13, color: MUT }}>{who ? `@${who.handle} · ${who.role} · ${who.org}` : `${chat.about} · ${chat.members.map(m => person(m).name.split(' ')[0]).join(', ')} and you`}</span></span>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {note && <div style={{ alignSelf: 'center', maxWidth: 460, background: PALE, borderRadius: 10, padding: '8px 12px', fontSize: 13, color: INK, textAlign: 'center' }}>{note}</div>}
        {!chat.lines.length && <p style={{ margin: 'auto', fontSize: 14, color: MUT }}>No messages yet. Say hello to {title(chat).split(' ')[0]}.</p>}
        {chat.lines.map((l, i) => <div key={i} style={{ alignSelf: l.from ? 'flex-start' : 'flex-end', maxWidth: '74%' }}>
          {l.from && chat.group && <span style={{ display: 'block', fontSize: 12, color: MUT, margin: '0 0 2px 4px' }}>{person(l.from).name.split(' ')[0]}</span>}
          <div style={{ background: l.from ? '#fff' : G, color: l.from ? INK : '#fff', border: l.from ? `1px solid ${HAIR}` : 0, borderRadius: 14, padding: '9px 13px', fontSize: 15, lineHeight: '21px' }}>{l.text}</div>
          <span style={{ display: 'block', fontSize: 11, color: MUT, margin: '2px 4px 0', textAlign: l.from ? 'left' : 'right' }}>{l.time}</span>
        </div>)}
      </div>
      <form onSubmit={e => { e.preventDefault(); send() }} style={{ display: 'flex', gap: 8, padding: '10px 16px 14px', background: '#fff', borderTop: `1px solid ${HAIR}` }}>
        <input aria-label={`Message ${title(chat)}`} value={draft} onChange={e => setDraft(e.target.value)} placeholder={`Message ${title(chat).split(' ')[0]}`} style={{ ...field, padding: '0 14px' }} />
        <button type="submit" aria-label="Send" disabled={!draft.trim()} style={{ flex: 'none', width: 52, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', cursor: draft.trim() ? 'pointer' : 'default', opacity: draft.trim() ? 1 : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon(SEND)}</button>
      </form>
    </section>
  )

  const frame: React.CSSProperties = { display: 'flex', minHeight: phone ? 700 : 620, height: phone ? undefined : 'calc(100vh - 190px)', fontFamily: "'DM Sans',system-ui,sans-serif", color: INK, background: '#fff' }
  if (phone) return <div data-screen-messages={me} style={{ ...frame, width: 390, margin: '0 auto', flexDirection: 'column' }}>
    {!finding && !chat && <div style={{ padding: '14px 16px 0' }}><h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Messages</h1></div>}
    {finding ? finder : chat ? thread : list}
  </div>
  return <div data-screen-messages={me} style={{ ...frame, borderTop: `1px solid ${HAIR}` }}>{list}{finding ? finder : thread ?? <p style={{ margin: 'auto', fontSize: 14, color: MUT }}>Pick a chat, or press New to find someone.</p>}</div>
}
