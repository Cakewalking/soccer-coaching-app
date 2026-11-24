// The owner's chats (pack v30, 25 Nov): one small list that `ADM1-Messages` shows and changes, and that the message button in the
// owner's top bar counts from. Sample, kept while the app is open: a chat is not in the academy's list of players.
// A chat is with a coach, all coaches, a team's families, a single family, the partner club, or the whole academy.
// Anyone under 18 is only ever messaged with a parent in the chat, so there is no chat with a player here.

import { useSyncExternalStore } from 'react'

/** The filter chip a chat sits under. The whole academy sits under Families. */
export type ChatKind = 'coach' | 'team' | 'family' | 'club'
export type Msg = { /** 'me' is the owner; anyone else is named */ from: string; text: string; time: string }
export type Chat = {
  id: string; kind: ChatKind
  /** the line in the list: "Sam Whitford · coach, U13 Gold" */ title: string
  /** the name at the top of the open chat, and the first name used in "Message Sam" */ name: string; short: string
  /** initials, or a number for a chat with many people */ badge: string
  /** the team this chat is about (a group id in the academy's list), when there is one */ team?: string
  /** when the last message came, as shown in the list */ time: string
  /** the list's shorter line for the first message, until another message comes */ preview?: string
  /** messages from them that the owner has not opened: the chat needs a reply */ unread: number
  msgs: Msg[]
}
/** The one action a message carries in the sample: Sam is away, and Clean Sheet found three coaches free at that time. */
export type Cover = { chat: string; team: string; day: string; at: string; free: string[]; /** the coach the owner asked */ asked?: string }

const SAMPLE: Chat[] = [
  { id: 'sam', kind: 'coach', title: 'Sam Whitford · coach, U13 Gold', name: 'Sam Whitford', short: 'Sam', badge: 'SW', team: 'U13Gold', time: '7:12 am', unread: 1, preview: 'I’m away Thursday 11 June. Can someone take Gold?', msgs: [
    { from: 'Sam', text: 'Morning Dani. I’m away Thursday 11 June for a family thing. Can someone take Gold? Plan is written.', time: '7:12 am' }] },
  { id: 'meera', kind: 'family', title: 'Meera Mehta · Arjun’s mum', name: 'Meera Mehta', short: 'Meera', badge: 'MM', team: 'U13Timber', time: '6:50 am', unread: 1, msgs: [
    { from: 'Meera', text: 'Thank you for last night. When will we hear?', time: '6:50 am' }] },
  { id: 'club', kind: 'club', title: 'Wattle Creek FC · registrar', name: 'Wattle Creek FC', short: 'the registrar', badge: 'WC', time: 'Tue', unread: 1, msgs: [
    { from: 'Registrar', text: 'Seven of yours still to register for Sunday.', time: 'Tue' }] },
  { id: 'coaches', kind: 'coach', title: 'All coaches', name: 'All coaches', short: 'all coaches', badge: '17', time: 'Mon', unread: 0, msgs: [
    { from: 'me', text: 'Term reports are due to me in week 9.', time: 'Mon' }] },
  { id: 'u13', kind: 'team', title: 'U13 Timber · 16 families', name: 'U13 Timber', short: 'U13 Timber’s families', badge: 'U13', team: 'U13Timber', time: 'Mon', unread: 0, msgs: [
    { from: 'Reece', text: 'Sunday 10:00 at Redgum, meet 9:15.', time: 'Mon' }] },
  { id: 'reece', kind: 'coach', title: 'Reece Whitlam · coach, U13 Timber', name: 'Reece Whitlam', short: 'Reece', badge: 'RW', team: 'U13Timber', time: 'Wed', unread: 0, msgs: [
    { from: 'me', text: 'Can you take the under 13s on your own on Thursday? I’m at the partner club.', time: 'Wed' },
    { from: 'Reece', text: 'Yes. I’ll run the same session as Tuesday.', time: 'Wed' }] },
  { id: 'all', kind: 'family', title: 'The whole academy', name: 'The whole academy', short: 'every family', badge: '226', time: '1 June', unread: 0, msgs: [
    { from: 'me', text: 'Term 3 places open on Monday 1 June.', time: '1 June' }] },
]
const COVER: Cover = { chat: 'sam', team: 'U13Gold', day: 'Thursday 11 June', at: '6:35', free: ['Priya Nair', 'Tom Ashby', 'Lena Fischer'] }

let chats = SAMPLE, cover = COVER
const subs = new Set<() => void>()
const tell = () => subs.forEach(f => f())
const sub = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }
export function useChats() { return useSyncExternalStore(sub, () => chats, () => chats) }
export function useCover() { return useSyncExternalStore(sub, () => cover, () => cover) }
/** Chats that need a reply: the number on the message button in the top bar. */
export const needsReply = (list: Chat[]) => list.filter(c => c.unread > 0).length
export function useNeedsReply() { return needsReply(useChats()) }
export function resetChats() { chats = SAMPLE; cover = COVER; tell() }

/** The last line of a chat as the list shows it: "You: …" for the owner's own, the sender's name in a chat with many people. */
export function lastLine(c: Chat) { const m = c.msgs[c.msgs.length - 1]; if (!m) return ''; if (c.preview && c.msgs.length === 1) return c.preview; return m.from === 'me' ? `You: ${m.text}` : c.kind === 'team' || c.id === 'coaches' ? `${m.from}: ${m.text}` : m.text }

/** Picking a chat opens it, which clears its badge. */
export function readChat(id: string) { if (!chats.some(c => c.id === id && c.unread)) return; chats = chats.map(c => c.id === id ? { ...c, unread: 0 } : c); tell() }
/** A message from the owner. Sending is an answer, so the chat no longer needs a reply. */
export function sendMessage(id: string, text: string, time = 'Now') {
  const t = text.trim(); if (!t) return false
  chats = chats.map(c => c.id === id ? { ...c, unread: 0, time, msgs: [...c.msgs, { from: 'me', text: t, time }] } : c); tell()
  return true
}
/** "Ask Priya Nair": the coach is asked in a chat of their own, with the plan, and the chat it came from says so. Asking another coach moves the ask. */
export function askCover(coach: string, role: string, teamName: string) {
  if (!cover.free.includes(coach)) return
  const first = coach.split(' ')[0], id = `cover-${first.toLowerCase()}`, was = cover.asked
  const ask: Msg = { from: 'me', text: `Can you take ${teamName} on ${cover.day} at ${cover.at}? Sam’s plan is attached. You are paid for the session.`, time: 'Now' }
  const asked: Chat = { id, kind: 'coach', title: `${coach} · coach, ${role}`, name: coach, short: first, badge: coach.split(' ').map(w => w[0]).join(''), time: 'Now', unread: 0, msgs: [ask] }
  const note: Msg = { from: 'me', text: was && was !== coach ? `I’ve asked ${first} instead. I’ll tell you when it is settled.` : `I’ve asked ${first} to take Gold. I’ll tell you when it is settled.`, time: 'Now' }
  const rest = chats.filter(c => c.id !== id && !(was && c.id === `cover-${was.split(' ')[0].toLowerCase()}`))
  chats = [asked, ...rest.map(c => c.id === cover.chat ? { ...c, unread: 0, time: 'Now', msgs: [...c.msgs, note] } : c)]
  cover = { ...cover, asked: coach }; tell()
}
