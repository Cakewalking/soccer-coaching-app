// "Opening the drill library." used to be all a button did: a line of text. openThing
// takes that same line and does what it says:
//   · a screen that exists opens, inside the app when the app can show it, or over the top with a Back bar
//   · clips play in the clip player
//   · a message opens a box to write and send it
//   · anything else (a form, an editor, a picker with no designed screen yet) opens a short sheet to fill in and save
// What is sent or saved is kept on this device, so it is still there after a reload.

import { useEffect, useState, useSyncExternalStore } from 'react'
import ScreenLayer from './ScreenLayer'
import { goApp, hasAppNav, registerOverlay } from './sandbox/sandboxNav'
import { playClips } from './clips/clipSheet'
import { markDone, useDoneAll } from './doneStore'
import { demoToast } from './demoToast'
import { record, onBack, isOpenInHistory } from '../backState'

export type Where = 'coach' | 'mini' | 'club' | 'academy' | 'phone' | 'entry'
type Route = [RegExp, string]

// First match wins. The words are what the old lines said they were opening.
const COACH: Route[] = [
  [/^home( tab)?$/, 'T1-TabletTraining'], [/^squad( tab)?$/, 'T4-SquadTab'], [/^training( tab)?$/, 'T3-TrainingTab'], [/^match ?day( tab)?$/, 'T2-TabletMatch'], [/^record( tab)?$/, 'REC1-RecordHub'],
  [/^overview( tab)?$/, 'T1-TabletTraining'], [/^messages( tab)?$/, 'I1-Inbox'], [/^fixtures and results( tab)?$/, 'CF1-Fixtures'], [/^our style( tab)?$/, 'S1-PlayingStyle'], [/^team staff( tab)?$/, 'ST1-TeamStaff'],
  [/message search|all messages|\binbox\b|parent messages view|all parents list/, 'I1-Inbox'],
  [/welfare (chat|contact|report)|support contacts/, 'PC2-TellSomeone'],
  [/announcement/, 'CH2-Announcements'], [/new (group )?chat|people picker|add to group/, 'CH3-NewChat'], [/chat settings|role info/, 'CH8-ChatInfo'], [/poll/, 'CH5-PollResults'],
  [/seen list|held-back photo|photo consent|photo picker/, 'CH7-PhotoCheck'], [/group chats?|team chat|family chat/, 'CH1-TeamChat'],
  [/ask clean sheet|voice input/, 'ASKd4-PanelFirst'], [/selector|all teams view|miniroos view/, 'VS1-SwitchView'],
  [/drill creator/, 'DF3-OwnBasics'], [/all suggestions/, 'SG1-Suggested'],
  [/drill|game library|game picker|add to session/, 'DF0-Library'],
  [/pairing|camera setup/, 'SET4-Devices'], [/results/, 'RC5-RecordResults'],
  [/record|film-this|hand counter|manual count|video upload|post-game taps/, 'REC1-RecordHub'],
  [/team talk/, 'E-TeamTalk'], [/line-up|team sheet|minutes plan|player selector/, 'MS1-TeamSheet'], [/live game|this game|game 3/, 'L11-LiveGame11'],
  [/review/, 'R1-MatchReview'], [/season (summary|note)|all notes|draft (editor )?for|what parents see/, 'SE1-SeasonSummaries'],
  [/session|training (plan|night)|the plan|tonight|scheduler|planner|set-up editor|load plan/, 'T3-TrainingTab'],
  [/game day|saturday/, 'T2-TabletMatch'],
  [/league import|playfootball/, 'FP1-PlayFootball'], [/fixture/, 'CF1-Fixtures'],
  [/calendar|new event|date picker|booking|season dates/, 'DC1-Calendar'],
  [/consent/, 'P1-Consent'], [/parent view|what they see|preview/, 'PA-Parent'],
  [/head knock|concussion/, 'FC1-Concussion'], [/concern|incident|case details|report flow|block and report/, 'PC1-RaiseConcern'],
  [/invite|join requests|staff/, 'IV-Invite'], [/style/, 'SF0-Intro'], [/\bload\b|growth/, 'GT1-Growth'], [/measuring|next test|fitness level/, 'GT2-MeasureSession'],
  [/help|feedback form|contact form/, 'SET7-Help'], [/settings|number change/, 'SET1-Account'], [/sign-in/, 'SI1-SignIn'],
]
const MINI: Route[] = [
  [/\binbox\b|message to all families|family chat/, 'HM7-InboxMiniRoos'], [/new chat|team chat/, 'CHm1-TeamChatMiniRoos'],
  [/game library|game picker|session|training|tuesday/, 'HM3-TrainingMiniRoos'], [/best moment|review|tap editor/, 'MS3-MiniRoosReview'],
  [/season note|all notes|draft/, 'HM6-SeasonNotes'], [/fixture|saturday/, 'HM9-FixturesMiniRoos'], [/new event|calendar/, 'HM8-CalendarMiniRoos'], [/record/, 'RCm1-RecordMiniRoos'],
]
const CLUB: Route[] = [
  [/safeguarding|child safety|mandatory reporting|club course/, 'D5-Safeguarding'], [/code of conduct|sideline/, 'FS1-Sideline'],
  [/grading/, 'FG1-Grading'], [/dispensation/, 'FD3-Dispensations'], [/\bmove\b/, 'FM1-Moves'], [/trial/, 'FT1-Trials'], [/referee/, 'FR1-Referees'],
  [/score (discrepancy|fix)|regrade/, 'FF1-LeagueSync'], [/rollover/, 'DRo1-Rollover'], [/comparison/, 'DX1-CompareTeams'],
  [/all coaches|coach meeting|agenda/, 'DM1-CoachMeeting'], [/keeper/, 'FK1-Goalkeepers'], [/club calendar/, 'DC1-Calendar'], [/message to coaches/, 'MSG4-DirectorMessages'],
  [/u16 ollie|all teams/, 'D2-Teams'], [/academy link/, 'DSet6-PartnerAcademy'],
]
const ACADEMY: Route[] = [
  [/^(home|today)( tab)?$/, 'ACC1-CoachToday'], [/^(training|this week|week)( tab)?$/, 'ACT1-AcademyWeek'], [/^suggested( tab)?$/, 'ACT2-AcademySuggested'], [/^(who.s coming|coming)( tab)?$/, 'ACT4-AcademyComing'], [/^(players|squad)( tab)?$/, 'AC4-AcademyPlayers'], [/^messages( tab)?$/, 'ACC13-AcademyChat'], [/concern/, 'ACP10-AcademyConcern'],
  [/group chats?|message composer/, 'ACC13-AcademyChat'], [/report|next draft|word editor/, 'ACC6-ReportDraft'], [/trial/, 'AC3-Trials'], [/program/, 'AC2-Programs'],
  [/pairing/, 'ACC8p-PairCamera'], [/record|film-this|manual count/, 'ACC8-AcademyRecord'], [/session|reschedule/, 'ACT3-AcademySessionPlan'], [/drill/, 'ACT2-AcademySuggested'],
  [/calendar|term date/, 'ACT1-AcademyWeek'], [/child safety/, 'AC10-AcademySafety'], [/bank|fees/, 'AC5-Fees'], [/club invite|message to club/, 'AC11-PartnerClub'],
  [/game day/, 'ACC7-AcademyGameDay'], [/home practice/, 'ACK2-HomePractice'], [/ask clean sheet/, 'ASKd4-PanelFirst'],
]
const PHONE: Route[] = [
  [/\binbox\b|all messages|new chat/, 'PM1-ParentChats'], [/team chat|announcement/, 'PM2-ParentTeamChat'], [/chat settings/, 'PM6-ParentChatSettings'],
  [/photo consent/, 'PM10-ParentPhotoCheck'], [/welfare|support contacts/, 'PC2-TellSomeone'], [/report flow/, 'PM7-ParentReport'],
  [/recording settings|data download|leave squad|deletion/, 'PS3-ParentData'], [/team sheet|line-up/, 'FBp2-LineupParent'], [/fixtures?|game day/, 'TM2-ManagerGameDay'],
  [/parent view/, 'PA-Parent'], [/referee/, 'TM11l-LetterFull'], [/ask clean sheet/, 'ASKp2-PhoneAskOpen'],
]
const ENTRY: Route[] = [[/help|feedback/, 'SET7-Help'], [/sign-in/, 'SI1-SignIn'], [/invite/, 'IV-Invite'], [/safeguarding/, 'D5-Safeguarding']]
const TABLES: Record<Where, Route[]> = { coach: COACH, mini: [...MINI, ...COACH], club: [...CLUB, ...COACH], academy: ACADEMY, phone: PHONE, entry: ENTRY }

// ── what is showing ──────────────────────────────────────────────────────────
type Sheet = { kind: 'message' | 'form'; title: string; to?: string; said: string }
type State = { screen?: string; sheet?: Sheet } | null
let state: State = null
const subs = new Set<() => void>()
const show = (s: State) => { state = s; subs.forEach(f => f()) }
// Opening adds a history entry; closing goes back to it, so the browser's Back and the Close button do the same thing.
const set = (s: State) => { if (s) { show(s); record('ov:open', JSON.stringify(s)) } else if (isOpenInHistory('ov:open')) window.history.back(); else show(null) }
if (typeof window !== 'undefined') onBack(bag => { const v = bag['ov:open']; if (!v && state) show(null); else if (typeof v === 'string' && v !== JSON.stringify(state)) show(JSON.parse(v) as State) })

registerOverlay(id => set({ screen: id }))

/** A line that may be an action ("Opening fees…") or just a confirmation ("Reminder sent."): do the first, say the second. */
export function sayOrOpen(said: string, where: Where, sayIt: (m: string) => void = demoToast) { if (/^Opening\s|\sopens\.+$|^A (private )?message .* opens\./i.test(said)) openThing(said.replace(/^A (private )?message (to )?/i, 'message to ').replace(/\. Only you.*$/, ''), where); else sayIt(said) }

/** Open a screen by its id: in the app when it can, or over the top with a Back bar. */
export function openScreen(id: string) { if (hasAppNav()) goApp(id, ''); else set({ screen: id }) }

const tidy = (m: string) => m.replace(/^sub:/, '').replace(/^Opening\s+/i, '').replace(/\s+opens\.?$/i, '').replace(/[.…]+$/, '').replace(/^(the|a|an)\s+/i, '').trim()
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Do what the line says. `where` is the kind of app the button sits in. */
export function openThing(said: string, where: Where = 'coach') {
  const what = tidy(said), low = what.toLowerCase()
  if (!what) { demoToast(said); return }
  if (/^clips( tab)?$/.test(low)) { openScreen('C1-ClipsTab'); return }
  if (/\bclips?\b|\bfilm\b(?!-)/.test(low) && !/picker|settings/.test(low)) { const n = Number(low.match(/(\d+) clips/)?.[1] ?? 1); playClips(Array.from({ length: Math.min(n, 8) }, (_, k) => ({ title: n > 1 ? `Clip ${k + 1} of ${n}` : cap(what), sub: 'From the match film.', len: 9 })), cap(what)); return }
  const to = low.match(/^(?:message|chat|call|private thread)(?: to| with)? (.+)$/)?.[1] ?? (/^new message|message composer|message editor|announcement compose|change message|reply$/.test(low) ? '' : undefined)
  if (to !== undefined && !/coaches$/.test(low)) { set({ sheet: { kind: 'message', title: to ? `Message to ${what.replace(/^(message|chat|call|private thread)( to| with)? /i, '')}` : cap(what), to, said } }); return }
  const hit = TABLES[where].find(([re]) => re.test(low))
  if (hit) { if (where === 'phone' || where === 'entry' || where === 'academy') set({ screen: hit[1] }); else openScreen(hit[1]); return }
  set({ sheet: { kind: 'form', title: cap(what), said } })
}

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4'

export function OpenHost() {
  const s = useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state)
  const kept = useDoneAll()
  const [text, setText] = useState('')
  const sheet = s?.sheet, key = sheet ? `thing:${sheet.title}` : ''
  useEffect(() => { setText(sheet ? kept[key] ?? '' : '') /* open on what was saved last time */ }, [sheet]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!s) return; const k = (e: KeyboardEvent) => { if (e.key === 'Escape') set(null) }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [s])
  if (!s) return null
  if (s.screen) return <div data-open-screen={s.screen} style={{ position: 'fixed', inset: 0, zIndex: 450, background: '#f7f8f7', display: 'flex', flexDirection: 'column' }}><ScreenLayer screenKey={s.screen} onClose={() => set(null)} backLabel="Back" /></div>
  if (!sheet) return null
  const msg = sheet.kind === 'message'
  const save = () => {
    if (!text.trim()) { demoToast(msg ? 'Write the message first.' : 'Type something to save.'); return }
    markDone(key, text.trim()); set(null)
    demoToast(msg ? `Sent${sheet.to ? ` to ${sheet.title.replace(/^Message to /, '')}` : ''}.` : `${sheet.title}: saved.`)
  }
  const btn = { minHeight: 44, padding: '0 16px', borderRadius: 10, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' } as const
  return (
    <div data-open-sheet role="dialog" aria-modal="true" aria-label={sheet.title} onClick={e => { if (e.target === e.currentTarget) set(null) }} style={{ position: 'fixed', inset: 0, zIndex: 450, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <form onSubmit={e => { e.preventDefault(); save() }} style={{ width: 'min(520px, 100%)', background: '#fff', borderRadius: 18, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12, color: INK }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ margin: 0, flexGrow: 1, fontSize: 20, lineHeight: '26px' }}>{sheet.title}</h2>
          <button type="button" onClick={() => set(null)} aria-label="Close" style={{ ...btn, width: 44, padding: 0, border: `1px solid ${LINE}`, background: '#fff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
        </div>
        <label htmlFor="open-thing" style={{ fontSize: 13, fontWeight: 700, color: MUT }}>{msg ? 'Your message' : kept[key] ? 'Saved before. Change it and save again' : 'Write it here'}</label>
        <textarea id="open-thing" autoFocus value={text} onChange={e => setText(e.target.value)} style={{ minHeight: msg ? 120 : 84, padding: '10px 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15, lineHeight: '22px', color: INK, resize: 'vertical' }} />
        <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>{msg ? 'In this demo the message is kept on this device and goes to nobody.' : 'In this demo this is kept on this device. The full screen for it is not built yet.'}</span>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={() => set(null)} style={{ ...btn, border: `1px solid ${LINE}`, background: '#fff', color: INK }}>Cancel</button>
          <button type="submit" style={{ ...btn, border: 0, background: G, color: '#fff' }}>{msg ? 'Send' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}
