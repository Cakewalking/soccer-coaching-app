// The academy coach's menu drawn: six items, the same shape as a club coach, with the sub-menu
// for the item that is open. Every academy coach screen, old and new, draws this one.

import type { ReactNode } from 'react'
import { CHATS_TO_ANSWER, COACH_CHATS, COACH_MENU, SWITCH_ROLE, SWITCH_VIEW, type CoachMain } from './menu'

const ICON: Record<CoachMain, string> = {
  today:    'M4 11l8-7 8 7v9H4z',
  players:  'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
  training: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4',
  gameday:  'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  record:   'M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0',
  learn:    'M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z',
}

const Svg = ({ d, size = 20, sw = 2 }: { d: string; size?: number; sw?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d={d} /></svg>
)

/**
 * `active` is the main item that is open and `sub` the label of the sub-menu item showing.
 * `go` is handed the id of the screen an item opens. `extra` sits before the academy pill.
 */
export default function CoachNav({ active, sub, go, extra, onAccount }: { active: CoachMain; sub?: string; go: (id: string) => void; extra?: ReactNode; onAccount?: () => void }) {
  const subs = COACH_MENU.find(m => m.id === active)?.subs ?? []
  const face = { width: 44, height: 44, borderRadius: 999, background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flex: 'none' } as const
  return (
    <header style={{ flex: 'none', fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <div data-club-bar="" style={{ height: 64, boxSizing: 'border-box', padding: '0 22px', display: 'flex', alignItems: 'center', gap: 12, background: '#2f6252' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Clean Sheet</div>
        <nav aria-label="Main" style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          {COACH_MENU.map(m => {
            const on = m.id === active
            return (
              <button key={m.id} data-club-tab={on ? 'on' : 'off'} aria-current={on ? 'page' : undefined} onClick={() => go(m.opens)}
                style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, border: 0, background: on ? '#40826d' : 'transparent', color: on ? '#ffffff' : '#e9eae8', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <Svg d={ICON[m.id]} />{m.label}
              </button>
            )
          })}
        </nav>
        {/* Messages, on every coach screen (pack v30): between the menu and the academy's name. The badge is pale mauve, never an error colour. */}
        <button data-club-keep="" data-messages={CHATS_TO_ANSWER} onClick={() => go(COACH_CHATS)} aria-label={CHATS_TO_ANSWER ? `Messages, ${CHATS_TO_ANSWER} need a reply` : 'Messages'}
          style={{ position: 'relative', flex: 'none', width: 44, height: 44, marginRight: extra ? 0 : 8, borderRadius: 999, border: 0, padding: 0, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', cursor: 'pointer' }}>
          <Svg d="M4 5h16v11H8l-4 4z" />
          {CHATS_TO_ANSWER > 0 && <span style={{ position: 'absolute', top: -3, right: -3, minWidth: 20, height: 20, boxSizing: 'border-box', padding: '0 4px', borderRadius: 999, background: '#f4e6e6', border: '1.5px solid #c39797', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{CHATS_TO_ANSWER}</span>}
        </button>
        {extra}
        <button data-club-keep="" onClick={() => go(SWITCH_VIEW)} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 0, background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, boxSizing: 'border-box', whiteSpace: 'nowrap', cursor: 'pointer', flex: 'none' }}>
          Tall Timber <Svg d="M6 9l6 6 6-6" size={16} sw={2.4} />
        </button>
        {onAccount
          ? <button data-club-keep="" onClick={onAccount} aria-label="Your account and settings" style={{ ...face, border: 0, padding: 0, fontFamily: 'inherit', cursor: 'pointer' }}>RW</button>
          : <div data-club-keep="" aria-label="Your profile" style={face}>RW</div>}
      </div>
      <div style={{ height: 44, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24, background: '#ffffff', borderBottom: '1px solid #c5c8c4' }}>
        <nav aria-label={COACH_MENU.find(m => m.id === active)?.label} style={{ display: 'flex', gap: 24, flexGrow: 1, height: 44 }}>
          {subs.map(s => {
            const on = s.label === sub
            return (
              <button key={s.label} aria-current={on ? 'page' : undefined} onClick={() => go(s.opens)}
                style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 4px', border: 0, borderBottom: `3px solid ${on ? '#40826d' : 'transparent'}`, background: 'transparent', color: on ? '#10211f' : '#4a5a57', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, boxSizing: 'border-box', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {s.label}
              </button>
            )
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
          {/* The role pill is 32 high as drawn; the button around it is 44. */}
          <button onClick={() => go(SWITCH_ROLE)} style={{ display: 'flex', alignItems: 'center', height: 44, border: 0, padding: 0, background: 'transparent', fontFamily: 'inherit', cursor: 'pointer' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
            <Svg d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0" size={14} sw={2.4} />Academy coach
          </span>
          </button>
        </div>
      </div>
    </header>
  )
}
