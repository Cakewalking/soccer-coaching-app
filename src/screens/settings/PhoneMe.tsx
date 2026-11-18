// "Me" on a phone: the page a person's avatar opens. Drawn as PS4-PlayerMe (the under-15 player's page)
// and PO5s-AdultSettings (a player who decides for themselves); the other phone roles use the same page
// with their own name and rows.

import { useState } from 'react'
import { demoToast } from '../demoToast'
import { openScreen } from '../openThing'
import { useDone, markDone, clearDone } from '../doneStore'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', HAIR = '#e9eae8', LINE = '#c5c8c4'

type Row =
  | { kind: 'pick'; label: string; options: string[] }
  | { kind: 'switch'; label: string; note?: string; on: boolean; locked?: boolean }
  | { kind: 'say'; label: string; note?: string; says: string; danger?: boolean }
  | { kind: 'open'; label: string; note?: string; to: string }

type Person = { head: string; title: string; ini: string; name: string; line: string; groups: Array<{ heading?: string; rows: Row[] }>; foot?: string }

export type PhoneMeWho = 'playeryoung' | 'playerolder' | 'manager' | 'referee' | 'academyparent' | 'academyplayer'

const SEES: Row[] = [
  { kind: 'switch', label: 'Minutes and attendance', note: 'Always on while you’re in the squad', on: true, locked: true },
  { kind: 'switch', label: 'Load and test results', note: 'So sessions can be set for you', on: true },
  { kind: 'switch', label: 'Wellness check-ins', note: 'How you slept and feel', on: true },
  { kind: 'switch', label: 'Be filmed in games', note: 'Clips are shared with the squad only', on: true },
]

const copyRow: Row = { kind: 'say', label: 'Get a copy of my data', note: 'Emailed within 2 days', says: 'Asked for. A copy of your data is emailed within 2 days.' }
const signOut: Row = { kind: 'say', label: 'Sign out', says: 'Signed out on this phone.' }

const PEOPLE: Record<PhoneMeWho, Person> = {
  playeryoung: {
    head: 'U12 Sam · Wattle Creek', title: 'Me', ini: 'MT', name: 'Mia Tran', line: '#8 · central midfield',
    groups: [
      { rows: [
        { kind: 'pick', label: 'My kit colour', options: ['Green', 'Blue', 'Red', 'Yellow'] },
        { kind: 'switch', label: 'Reminders', note: 'Check-in before training', on: true },
        { kind: 'switch', label: 'Bigger writing', on: false },
      ] },
      { rows: [
        { kind: 'say', label: 'Who can see my stuff', note: 'Sam, Priya and Mum', says: 'Your coaches and your parent. Nobody else.' },
        { kind: 'open', label: 'Need to tell someone something?', note: 'Other people can help', to: 'PC2-TellSomeone' },
      ] },
    ],
    foot: 'Mum looks after the rest of your settings until you’re 15.',
  },
  playerolder: {
    head: 'U16 Ollie · Wattle Creek', title: 'Settings', ini: 'CW', name: 'Cal West', line: 'cal@example.com · mobile ending 318',
    groups: [
      { heading: 'What Ollie can see', rows: SEES },
      { rows: [
        { kind: 'switch', label: 'Reminders', note: 'Game day and training · push', on: true },
        copyRow,
        { kind: 'say', label: 'Leave the squad', note: 'Your data is kept 12 months, then deleted', says: 'Nothing has changed. Ollie is asked first, then you confirm.', danger: true },
        signOut,
      ] },
    ],
  },
  manager: {
    head: 'U12 Sam · Team manager', title: 'Settings', ini: 'RO', name: 'Rob Owusu', line: 'rob@example.com · mobile ending 771',
    groups: [
      { rows: [
        { kind: 'switch', label: 'Reminders', note: 'Game day and duty roster · push', on: true },
        { kind: 'switch', label: 'Bigger writing', on: false },
        { kind: 'say', label: 'Who can see my details', note: 'Sam and the families of U12 Sam', says: 'The coach and the families in your team. Nobody else.' },
      ] },
      { rows: [copyRow, signOut] },
    ],
  },
  referee: {
    head: 'Wattle Creek FC · referees', title: 'Me', ini: 'ZP', name: 'Zoe Park', line: 'Referee · second season',
    groups: [
      { rows: [
        { kind: 'switch', label: 'Reminders', note: 'The night before each game', on: true },
        { kind: 'switch', label: 'Bigger writing', on: false },
      ] },
      { rows: [
        { kind: 'say', label: 'Who can see my stuff', note: 'The referees’ coordinator and Mum', says: 'The referees’ coordinator and your parent. Nobody else.' },
        { kind: 'open', label: 'Need to tell someone something?', note: 'Other people can help', to: 'PC2-TellSomeone' },
      ] },
      { rows: [copyRow, signOut] },
    ],
  },
  academyparent: {
    head: 'Tall Timber · Advanced', title: 'Settings', ini: 'TO', name: 'Tess Okonkwo', line: 'tess@example.com · mobile ending 446',
    groups: [
      { heading: 'Your child', rows: [
        { kind: 'say', label: 'Kai Okonkwo', note: '13 · Advanced group', says: 'You look after Kai’s settings until he is 15.' },
      ] },
      { rows: [
        { kind: 'switch', label: 'Reminders', note: 'Sessions and fees · push', on: true },
        { kind: 'switch', label: 'Kai can be filmed in sessions', note: 'Clips are shared with his group only', on: true },
        { kind: 'say', label: 'Who can see Kai’s progress', note: 'Reece, you and Kai', says: 'His coach, you and Kai. Nobody else.' },
      ] },
      { rows: [copyRow, signOut] },
    ],
  },
  academyplayer: {
    head: 'Tall Timber · Advanced', title: 'Me', ini: 'KO', name: 'Kai Okonkwo', line: 'Advanced group',
    groups: [
      { rows: [
        { kind: 'switch', label: 'Reminders', note: 'Practice at home', on: true },
        { kind: 'switch', label: 'Bigger writing', on: false },
      ] },
      { rows: [
        { kind: 'say', label: 'Who can see my stuff', note: 'Reece and Mum', says: 'Your coach and your parent. Nobody else.' },
        { kind: 'open', label: 'Need to tell someone something?', note: 'Other people can help', to: 'PC2-TellSomeone' },
      ] },
    ],
    foot: 'Mum looks after the rest of your settings until you’re 15.',
  },
}

const chev = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M9 6l6 6-6 6" /></svg>
const rowBtn = (first: boolean): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, width: '100%', padding: 0, border: 0, borderTop: first ? 0 : `1px solid ${HAIR}`, background: 'none', color: INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' })

function RowView({ who, row, first, onNav }: { who: PhoneMeWho; row: Row; first: boolean; onNav?: (s: string) => void }) {
  const key = `me:${who}:${row.label}`
  const saved = useDone(key)
  const [pick, setPick] = useState(0)
  const text = (note?: string, danger?: boolean) => <span style={{ flexGrow: 1, minWidth: 0 }}>
    <span style={{ display: 'block', fontSize: 15, lineHeight: '20px', fontWeight: 700, color: danger ? '#8a4b47' : INK }}>{row.label}</span>
    {note && <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{note}</span>}
  </span>
  if (row.kind === 'switch') {
    const on = saved ? !row.on : row.on
    return <button role="switch" aria-checked={on} aria-label={row.label} onClick={() => { if (row.locked) { demoToast(`${row.label}: ${row.note ?? 'always on'}.`); return } if (saved) clearDone(key); else markDone(key); demoToast(`${row.label}: ${on ? 'off' : 'on'}.`) }} style={rowBtn(first)}>
      {text(row.note)}
      <span style={{ flex: 'none', width: 52, height: 32, borderRadius: 999, background: on ? G : LINE, display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start', padding: 3, boxSizing: 'border-box', opacity: row.locked ? 0.6 : 1 }}><span style={{ width: 26, height: 26, borderRadius: 999, background: '#fff' }} /></span>
    </button>
  }
  if (row.kind === 'pick') return <button onClick={() => { const n = (pick + 1) % row.options.length; setPick(n); demoToast(`${row.label}: ${row.options[n]}.`) }} style={rowBtn(first)}>{text(row.options[pick])}{chev}</button>
  if (row.kind === 'open') return <button onClick={() => onNav ? onNav(row.to) : openScreen(row.to)} style={rowBtn(first)}>{text(row.note)}{chev}</button>
  return <button onClick={() => demoToast(row.says)} style={rowBtn(first)}>{text(row.note, row.danger)}{chev}</button>
}

export default function PhoneMe({ who, onNav }: { who: PhoneMeWho; onNav?: (s: string) => void }) {
  const p = PEOPLE[who]
  const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14 }
  return (
    <div data-screen-me={who} style={{ width: 390, minHeight: 760, margin: '0 auto', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flexGrow: 1 }}>
          <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>{p.head}</span>
          <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>{p.title}</span>
        </div>
        <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#cbbeb5', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{p.ini}</span>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ ...card, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flex: 'none', width: 52, height: 52, borderRadius: 999, background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>{p.ini}</span>
          <div>
            <span style={{ display: 'block', fontSize: 19, fontWeight: 700 }}>{p.name}</span>
            <span style={{ display: 'block', fontSize: 13, color: MUT }}>{p.line}</span>
          </div>
        </div>
        {p.groups.map((g, gi) => <div key={gi}>
          {g.heading && <div style={{ fontSize: 13, fontWeight: 700, color: MUT, padding: '4px 4px 6px' }}>{g.heading}</div>}
          <div style={{ ...card, padding: '2px 14px' }}>{g.rows.map((r, i) => <RowView key={r.label} who={who} row={r} first={i === 0} onNav={onNav} />)}</div>
        </div>)}
        {p.foot && <div style={{ marginTop: 'auto', padding: '12px 2px 4px', fontSize: 13, color: MUT }}>{p.foot}</div>}
      </div>
    </div>
  )
}
