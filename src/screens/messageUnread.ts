import { useSyncExternalStore } from 'react'

// Unread counts for the coach's Messages, shared by the chat list and the badge
// on the Messages tab so opening a chat clears both.
// Chats already opened are remembered, so they stay read after a reload.
const KEY = 'cs_chats_read_v1'
const opened: string[] = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[] } catch { return [] } })()
let unread: Record<string, number> = Object.fromEntries(Object.entries({ team: 2, coaching: 1 }).map(([k, v]) => [k, opened.includes(k) ? 0 : v]))
const subs = new Set<() => void>()
const total = () => Object.values(unread).reduce((a, b) => a + b, 0)

export function markRead(chat: string) {
  if (!unread[chat]) return
  unread = { ...unread, [chat]: 0 }
  if (!opened.includes(chat)) { opened.push(chat); try { localStorage.setItem(KEY, JSON.stringify(opened)) } catch { /* read for this visit only */ } }
  subs.forEach(f => f())
}
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }
export const useUnread = () => useSyncExternalStore(subscribe, () => unread)
export const useUnreadTotal = () => useSyncExternalStore(subscribe, total)
