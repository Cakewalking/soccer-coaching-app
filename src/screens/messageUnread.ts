import { useSyncExternalStore } from 'react'

// Unread counts for the coach's Messages, shared by the chat list and the badge
// on the Messages tab so opening a chat clears both.
let unread: Record<string, number> = { team: 2, coaching: 1 }
const subs = new Set<() => void>()
const total = () => Object.values(unread).reduce((a, b) => a + b, 0)

export function markRead(chat: string) {
  if (!unread[chat]) return
  unread = { ...unread, [chat]: 0 }
  subs.forEach(f => f())
}
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }
export const useUnread = () => useSyncExternalStore(subscribe, () => unread)
export const useUnreadTotal = () => useSyncExternalStore(subscribe, total)
