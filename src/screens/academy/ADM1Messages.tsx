// ADM1-Messages: Academy owner: every chat in one place. Search, "+ New", filter chips, the chats with a badge where one needs
// a reply, the open chat on the right and a box to send. Drawn from the board in pack v30 (25 Nov).
// The chats are the small list in `messageStore`, which the message button in the top bar counts from: picking a chat clears
// its badge, sending adds a message, and "Ask Priya Nair" asks her in a chat of her own.
// COUNTED from the academy's list: the line under a coach's or a team's name (players, days, time) and the numbers on "All coaches" and "The whole academy".
// STILL SAMPLE: the chats themselves, and the three coaches Clean Sheet found free.
// One thing differs from the board on purpose: no chip is pressed to begin with, so every chat shows (those needing a reply first, as drawn).
// The board draws "Needs a reply" pressed with all seven chats under it.
import { useEffect, useRef, useState } from 'react'
import { demoToast } from '../demoToast'
import { S, INK } from './adStyles'
import Tap from './Tap'
import { groupOf, playersIn, teamBoard, useAcademy, type Academy } from './academyStore'
import { askCover, lastLine, needsReply, readChat, sendMessage, useChats, useCover, type Chat, type ChatKind } from './messageStore'
import { LINE, MAUVE, PALE, SAND } from './kit'

type Filter = 'reply' | ChatKind
const CHIPS: [Filter, string][] = [['reply', 'Needs a reply'], ['coach', 'Coaches'], ['team', 'Teams'], ['family', 'Families'], ['club', 'Partner club']]
const chip = (on: boolean) => ({ flex: 'none', height: 44, padding: '0 12px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', font: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxSizing: 'border-box', ...(on ? { background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' } : { background: '#ffffff', border: '1px solid #c5c8c4', color: INK }) } as const)

/** The number on a chat with many people, and the line under the name of the open chat, counted from the list. */
function facts(a: Academy, c: Chat): { badge: string; title: string; sub: string; links: [string, string][] } {
  const g = c.team ? groupOf(a, c.team) : undefined, n = g ? playersIn(a, g.id).length : 0
  if (c.id === 'coaches') return { badge: String(a.groups.length), title: c.title, sub: `${a.groups.length} coaches · one for each team`, links: [['Coaches', 'AC6-AcademyCoaches']] }
  if (c.id === 'all') return { badge: String(a.players.length), title: c.title, sub: `${a.players.length} families · ${a.groups.length} teams`, links: [['Message families', 'AC12-AcademyBroadcast']] }
  if (c.kind === 'team' && g) return { badge: c.badge, title: `${g.name} · ${n} families`, sub: `${n} families · ${g.coach} coaches · you can read every team chat`, links: [['The team', teamBoard(g)]] }
  if (c.kind === 'coach' && g) return { badge: c.badge, title: c.title, sub: `Coach · ${g.name} · ${n} players · ${g.when.replace(/ · (\d+:\d+).*/, ', $1')}`, links: [['His team', teamBoard(g)], ['Timetable', 'AD3-Timetable']] }
  if (c.kind === 'coach') return { badge: c.badge, title: c.title, sub: c.title.split(' · ')[1] ?? 'Coach', links: [['Timetable', 'AD3-Timetable']] }
  if (c.kind === 'club') return { badge: c.badge, title: c.title, sub: 'Registrar · your teams play on Sunday as Wattle Creek teams', links: [['Partner club', 'AC11-PartnerClub']] }
  return { badge: c.badge, title: c.title, sub: `${c.title.split(' · ')[1] ?? 'Family'}${g ? ` · trial with ${g.name}` : ''}`, links: c.id === 'meera' ? [['Arjun’s trial', 'ADT1-TrialDecision']] : [] }
}

export default function ADM1Messages() {
  const a = useAcademy(), chats = useChats(), cover = useCover()
  const [openId, setOpenId] = useState(chats[0]?.id ?? ''), [filter, setFilter] = useState<Filter | null>(null), [find, setFind] = useState(''), [draft, setDraft] = useState('')
  const open = chats.find(c => c.id === openId) ?? chats[0], waiting = needsReply(chats)
  const q = find.trim().toLowerCase()
  const shown = chats.filter(c => (!filter || (filter === 'reply' ? c.unread > 0 : c.kind === filter)) && (!q || facts(a, c).title.toLowerCase().includes(q)))
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }) }, [open?.msgs.length, openId])
  if (!open) return <main style={{ flexGrow: 1, padding: 28 }}><span style={S.cap}>No chats yet.</span></main>

  const pick = (c: Chat) => { setOpenId(c.id); setDraft(''); readChat(c.id) }
  const send = () => { if (sendMessage(open.id, draft)) { setDraft(''); demoToast(`Sent to ${open.short}.`) } }
  const f = facts(a, open), coverTeam = groupOf(a, cover.team)
  const ask = (coach: string) => {
    const team = a.groups.find(g => g.coach === coach), first = coach.split(' ')[0]
    askCover(coach, team?.name ?? 'Tall Timber', coverTeam?.name ?? 'the team')
    demoToast(`${first} is asked to take ${coverTeam?.name ?? 'the team'} on ${cover.day}.${coach === cover.free[0] ? ' Sam’s plan is attached.' : ''}`)
  }

  return (
    <main style={{ flexGrow: 1, minHeight: 0, height: 712, display: 'grid', gridTemplateColumns: '400px minmax(0,1fr)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: '#ffffff', borderRight: '1px solid #c5c8c4' }}>
        <div style={{ flex: 'none', display: 'flex', gap: 8, padding: '12px 14px 8px' }}>
          <label style={{ flexGrow: 1, minWidth: 0, height: 44, border: '1px solid #c5c8c4', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', color: '#4a5a57', boxSizing: 'border-box' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3" /></svg>
            <input value={find} onChange={e => setFind(e.target.value)} placeholder="Search people and teams" aria-label="Search people and teams" style={{ flexGrow: 1, minWidth: 0, height: 40, border: 0, outline: 'none', background: 'transparent', font: 'inherit', fontSize: 14, color: INK }} />
          </label>
          <Tap to="AC12-AcademyBroadcast" style={S.primary}>+ New</Tap>
        </div>
        <div role="group" aria-label="Show" style={{ flex: 'none', display: 'flex', gap: 6, padding: '0 14px 10px', flexWrap: 'wrap' }}>
          {CHIPS.map(([id, label]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(filter === id ? null : id)} style={chip(filter === id)}>{label}{id === 'reply' && waiting ? ` · ${waiting}` : ''}</button>)}
        </div>
        <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {shown.map(c => { const k = facts(a, c), on = c.id === open.id; return (
            <button key={c.id} data-chat={c.id} aria-current={on ? 'true' : undefined} aria-label={`${k.title}${c.unread ? `, ${c.unread} to answer` : ''}`} onClick={() => pick(c)}
              style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, padding: '0 14px', border: 0, borderTop: `1px solid ${LINE}`, font: 'inherit', textAlign: 'left', cursor: 'pointer', color: INK, background: on ? PALE : '#ffffff' }}>
              <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: c.unread ? MAUVE : SAND, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{k.badge}</span>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 14, lineHeight: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.title}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lastLine(c)}</span>
              </span>
              <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                <span style={{ fontSize: 11, color: '#4a5a57' }}>{c.time}</span>
                {c.unread > 0 && <span style={{ minWidth: 20, height: 20, borderRadius: 999, background: '#c39797', color: INK, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</span>}
              </span>
            </button>
          ) })}
          {shown.length === 0 && <span style={{ ...S.cap, padding: '14px', borderTop: `1px solid ${LINE}` }}>{q ? `Nobody called “${find.trim()}” here.` : filter === 'reply' ? 'Nothing needs a reply.' : 'No chats here yet.'}</span>}
        </div>
        <span style={{ ...S.cap, flex: 'none', padding: '10px 14px' }}>Anyone under 18 is only ever messaged with a parent in the chat. Coaches message their own teams. You can read every team chat.</span>
      </div>
      <div aria-label={`Chat with ${open.name}`} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: '#ffffff', borderBottom: '1px solid #c5c8c4' }}>
          <span style={{ flex: 'none', minWidth: 40, height: 40, borderRadius: 999, background: MAUVE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: f.badge.length > 2 ? 13 : 16, fontWeight: 700 }}>{f.badge}</span>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{open.name}</strong><span style={{ fontSize: 12, color: '#33443f' }}>{f.sub}</span></span>
          {f.links.map(([label, to]) => <Tap key={to} to={to} style={S.more}>{label}</Tap>)}
        </div>
        <div role="log" aria-label="Messages" style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 20px' }}>
          {open.msgs.map((m, i) => { const mine = m.from === 'me', named = !mine && (open.kind === 'team' || open.id === 'coaches'); return (
            <div key={i} style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start', gap: 2 }}>
              <span style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: 16, fontSize: 15, lineHeight: '21px', ...(mine ? { background: PALE, border: '1px solid #cfe3da' } : { background: '#ffffff', border: '1px solid #c5c8c4' }) }}>{named && <strong>{m.from}: </strong>}{m.text}</span>
              <span style={{ fontSize: 11, color: '#4a5a57' }}>{mine ? `You · ${m.time}` : m.time}</span>
            </div>
          ) })}
          {open.id === cover.chat && coverTeam && (
            <div style={{ ...S.tile, flex: 'none', gap: 6, padding: '12px 14px', borderColor: '#c39797', background: MAUVE }}>
              <strong style={{ fontSize: 14 }}>{cover.asked ? `${cover.asked} is asked to take ${coverTeam.name} at ${cover.at} on ${cover.day}` : `Clean Sheet found three coaches free at ${cover.at} on ${cover.day}`}</strong>
              <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {cover.free.filter(n => n !== cover.asked).map((n, i) => <button key={n} onClick={() => ask(n)} style={{ ...(i === 0 && !cover.asked ? S.primary : S.more), font: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Ask {n}{cover.asked ? ' instead' : ''}</button>)}
              </span>
              <span style={S.cap}>{cover.asked ? `Waiting on ${cover.asked.split(' ')[0]}. ` : ''}Foundation coaches finish at 5:20. Whoever says yes is paid for the session, and the families are told.</span>
            </div>
          )}
          <div ref={end} />
        </div>
        <form onSubmit={e => { e.preventDefault(); send() }} style={{ flex: 'none', display: 'flex', gap: 8, padding: '12px 20px', background: '#ffffff', borderTop: '1px solid #c5c8c4' }}>
          <input value={draft} onChange={e => setDraft(e.target.value)} placeholder={`Message ${open.short}`} aria-label={`Message ${open.short}`} style={{ flexGrow: 1, minWidth: 0, height: 44, border: '1px solid #c5c8c4', borderRadius: 12, padding: '0 14px', font: 'inherit', fontSize: 15, color: INK, boxSizing: 'border-box', background: '#ffffff' }} />
          <button type="submit" disabled={!draft.trim()} style={{ ...S.primary, font: 'inherit', fontSize: 15, fontWeight: 600, cursor: draft.trim() ? 'pointer' : 'default', ...(draft.trim() ? null : { background: '#eceeed', borderColor: '#c5c8c4', color: '#4a5a57' }) }}>Send</button>
        </form>
      </div>
    </main>
  )
}
