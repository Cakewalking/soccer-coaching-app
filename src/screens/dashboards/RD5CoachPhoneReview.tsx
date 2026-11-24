// RD5-CoachPhoneReview: the game review on the coach's phone. The same eight tiles in two columns,
// number at 28px, no bars. The score card has the one round amber play button.
// Opens from "Game review" on the phone's Game tab (CPh4); Back returns there.

import { openScreen } from '../openThing'
import { CLUB_GAME as GAME } from './data'
import { playMeasure, playMinute, playReel } from './GameReviewDash'
import { AMBER, HAIR, INK, LINE, LOOK, PlayIcon, STRIP, SureMark, num, plain, stateOf, tally } from './kit'

/** RD5e: no game has been filmed yet. One sentence, one button. */
function Empty({ onFilm }: { onFilm: () => void }) {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '22px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ alignSelf: 'center', width: 56, height: 56, borderRadius: 999, background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" /></svg>
        </span>
        <strong style={{ fontSize: 17, lineHeight: '22px', textAlign: 'center' }}>No game filmed yet</strong>
        <span style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57', textAlign: 'center' }}>Film Sunday’s game and the review is here about 20 minutes after you upload.</span>
        <button onClick={onFilm} style={{ ...plain, height: 48, marginTop: 6, borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#ffffff', fontSize: 15, fontWeight: 600, textAlign: 'center' }}>How to film a game</button>
      </div>
    </div>
  )
}

export default function RD5CoachPhoneReview({ onBack, empty = false }: { onBack: () => void; /** RD5e: nothing filmed yet */ empty?: boolean }) {
  const t = tally(GAME.measures)
  const [team, day] = GAME.detail.split(' · ')
  const where = `${team}, ${day}`
  return (
    <div data-board={empty ? 'RD5e-CoachPhoneReviewEmpty' : 'RD5-CoachPhoneReview'} style={{ width: 390, minHeight: 844, boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '12px 18px', background: '#2f6252', color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} aria-label="Back" style={{ ...plain, flex: 'none', width: 44, height: 44, marginLeft: -8, padding: 0, border: 0, borderRadius: 999, background: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <span style={{ flexGrow: 1 }}>
          <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>{empty ? team : `${team} · ${day}`}</span>
          <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>Game review</span>
        </span>
        <span aria-label="Your profile" style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>SK</span>
      </div>
      {empty ? <Empty onFilm={() => openScreen('RC1-RecordStart')} /> :
      <div style={{ flexGrow: 1, minHeight: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ borderRadius: 16, background: STRIP, color: '#ffffff', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <strong style={{ ...num, fontSize: 36, lineHeight: '40px', whiteSpace: 'nowrap' }}>{GAME.big}</strong>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>{GAME.title.replace('Won away at', 'Won at')}</strong>
            <span style={{ fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>{t.on} of {t.of} on target · {t.close} close · {t.off} off</span>
          </span>
          <button data-play-film="" onClick={() => playReel('Highlights', `${where}. 4 minutes.`, 'The highlights play. 4 minutes.')} aria-label="Play highlights, 4 minutes" style={{ ...plain, flex: 'none', width: 44, height: 44, padding: 0, border: 0, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayIcon size={18} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {GAME.measures.map(m => {
            const look = LOOK[stateOf(m)]
            return (
              <button key={m.name} data-dash-tile="" onClick={() => playMeasure(m, where, 'The clips behind this number play.')} aria-label={`${m.name}. ${m.value}. ${look.says}. ${m.sure}. Play the clips`} style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 14, padding: '10px 12px', background: look.bg, border: `1px solid ${look.edge}`, minWidth: 0 }}>
                <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 700, minHeight: 32 }}>{m.name}</span>
                <strong style={{ ...num, fontSize: 28, lineHeight: '32px', whiteSpace: 'nowrap' }}>{m.value}</strong>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{look.says}</span>
                  <SureMark sure={m.sure} size={11} />
                </span>
              </button>
            )
          })}
        </div>
        <div style={{ background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '10px 14px 2px', display: 'flex', flexDirection: 'column' }}>
          <strong style={{ fontSize: 15, paddingBottom: 2 }}>Work on this week</strong>
          {GAME.work.slice(0, 3).map(w => (
            <button key={w.minute} onClick={() => playMinute(w, where)} aria-label={`${w.title}. ${w.value}, ${w.sure}. Play the clip from minute ${w.minute}`} style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, padding: 0, border: 0, borderTop: `1px solid ${HAIR}`, background: 'transparent' }}>
              <span style={{ flexGrow: 1, fontSize: 14, fontWeight: 700 }}>{w.title}</span>
              <SureMark sure={w.sure} size={11} />
              <strong style={{ ...num, fontSize: 16, whiteSpace: 'nowrap', minWidth: 44, textAlign: 'right' }}>{w.value}</strong>
            </button>
          ))}
        </div>
      </div>}
    </div>
  )
}
