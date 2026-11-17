// Chances and points: the container. Holds which chance screen is open and
// which game, reads the club's rules for this team's age band, and hands
// anything else to the app it sits in.

import { useState, type ReactNode } from 'react'
import { useCapture, allowed } from '../capture/captureStore'
import { Ico, G, INK, MUT, LINE, PALE } from '../capture/marks'
import QC10HowWeMeasure from '../capture/QC10HowWeMeasure'
import { CHANCES, type TeamChances, type TeamId } from './chanceData'
import { XG1ChancesGame, XG1eChancesNoFilm, XG2ChancesSeason, XG3LadderPPI, XG4ThreatMap } from './ChanceScreens'

export const XG_IDS = ['XG1-ChancesGame', 'XG1e-ChancesNoFilm', 'XG2-ChancesSeason', 'XG3-LadderPPI', 'XG4-ThreatMap', 'XGm1-ChancesMiniRoos', 'XGm2-ChancesSeasonMiniRoos']
export const isChanceId = (s: string) => XG_IDS.includes(s.split('#')[0])
/** Which screen a step is, whatever the team: game, season, ladder or threat. */
const kind = (id: string) => id.startsWith('XG3') ? 'ladder' : id.startsWith('XG4') ? 'threat' : id.startsWith('XG2') || id.startsWith('XGm2') ? 'season' : 'game'

const COACH_NAV = [['Home', 'T1-TabletTraining'], ['Squad', 'T4-SquadTab'], ['Training', 'T3-TrainingTab'], ['Match day', 'T2-TabletMatch'], ['Clips', 'C1-ClipsTab'], ['Record', 'REC1-RecordHub']]
const COACH_SUBS = [['Team talk', 'T2-TabletMatch'], ['Line-up and minutes', 'MS1-TeamSheet'], ['Opposition', 'OP1-Opposition'], ['Review', 'R1-MatchReview'], ['Chances', 'XG1-ChancesGame'], ['Ladder', 'XG3-LadderPPI'], ['Your take', 'YT1-YourTake']]
const MINI_NAV = [['Home', 'MS5-HomeMiniRoosSame'], ['Squad', 'HM2-SquadMiniRoos'], ['Training', 'HM3-TrainingMiniRoos'], ['Game day', 'HM4-GameDayMiniRoos'], ['Clips', 'RCm2-MiniRoosClips'], ['Record', 'RCm1-RecordMiniRoos']]
const MINI_SUBS = [['Game day', 'HM4-GameDayMiniRoos'], ['Chances', 'XGm1-ChancesMiniRoos'], ['Your take', 'YT1-YourTake']]

/** The designed frame, for a chance screen shown on its own. */
function Shell({ mini, team, sub, go, children }: { mini: boolean; team: string; sub: string; go: (s: string) => void; children: ReactNode }) {
  const nav = mini ? MINI_NAV : COACH_NAV, subs = mini ? MINI_SUBS : COACH_SUBS, on = mini ? 'Game day' : 'Match day'
  return (
    <div style={{ width: 1180, minHeight: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', background: '#f7f8f7', fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ flex: 'none', height: 64, background: G, display: 'flex', alignItems: 'center', gap: 4, padding: '0 28px' }}>
        <strong style={{ color: '#fff', fontSize: 20, letterSpacing: '-0.02em', marginRight: 14 }}>Clean Sheet</strong>
        {nav.map(([l, to]) => <button key={l} onClick={() => go(to)} aria-current={l === on ? 'page' : undefined} style={{ height: 48, padding: '0 14px', borderRadius: 12, border: 0, background: l === on ? '#40826d' : 'transparent', color: '#e9eae8', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>{l}</button>)}
        <span style={{ flexGrow: 1 }} />
        <button onClick={() => go('VS1-SwitchView')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 0, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>{team} · Wattle Creek <Ico d="M6 9l6 6 6-6" size={16} sw={2.4} /></button>
      </header>
      <nav aria-label={on} style={{ flex: 'none', height: 44, background: '#fff', borderBottom: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 28px' }}>
        {subs.map(([l, to]) => <button key={l} onClick={() => go(to)} aria-current={l === sub ? 'page' : undefined} style={{ height: 44, padding: '0 4px', border: 0, borderBottom: `3px solid ${l === sub ? G : 'transparent'}`, boxSizing: 'border-box', background: 'none', color: l === sub ? INK : MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{l}</button>)}
        <span style={{ flexGrow: 1 }} />
        <span style={{ height: 30, padding: '0 12px', borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 700 }}>{mini ? 'Coach · MiniRoos' : 'Head coach'}</span>
      </nav>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  )
}

export default function ChancesFlow({ team = 'u12', data, step, onStep, start = 'XG1-ChancesGame', onNav, framed, noFilmYet }: {
  team?: TeamId
  /** A team with no dataset of its own (a row on the director's table). */
  data?: TeamChances
  step?: string; onStep?: (id: string) => void; start?: string
  onNav?: (s: string) => void
  framed?: boolean
  /** A new team with nothing filmed: only the no-film state. */
  noFilmYet?: boolean
}) {
  const s = useCapture()
  const t = data ?? CHANCES[team]
  const [own, setOwn] = useState(start)
  const [game, setGame] = useState<'sat' | 'nofilm'>(start.startsWith('XG1e') ? 'nofilm' : 'sat')
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(x => x === m ? null : x), 3200) }
  const at = step ?? own
  const set = (id: string) => { if (onStep) onStep(id); if (step === undefined) setOwn(id) }
  const go = (target: string) => {
    if (isChanceId(target) || (framed && target.startsWith('QC10'))) { if (!target.startsWith('XG1e')) setGame('sat'); set(target); return }
    onNav?.(target)
  }
  const may = allowed(s, t.band)
  const [id, hash] = at.split('#')
  const k = kind(id)
  const p = { t, s, go, say, game, setGame }
  let body: ReactNode
  if (id.startsWith('QC10')) body = <QC10HowWeMeasure source={hash?.startsWith('src') ? Number(hash.slice(3)) : undefined} say={say} />
  else if (noFilmYet) body = <XG1eChancesNoFilm {...p} none />
  else if (k === 'ladder' && may.ladder && t.ladder) body = <XG3LadderPPI {...p} />
  else if (k === 'threat') body = <XG4ThreatMap {...p} />
  else if (k === 'season' || k === 'ladder') body = <XG2ChancesSeason {...p} />
  else body = game === 'nofilm' ? <XG1eChancesNoFilm {...p} /> : <XG1ChancesGame {...p} />
  const inner = (
    <>
      {body}
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}><Ico d="M5 12l5 5 9-10" size={20} sw={2.6} /><span>{toast}</span></div>}
    </>
  )
  if (!framed) return inner
  const mini = t.band === 'u6' || t.band === 'u8' || t.band === 'u10'
  return <Shell mini={mini} team={t.name} sub={id.startsWith('QC10') ? '' : k === 'ladder' ? 'Ladder' : 'Chances'} go={go}>{inner}</Shell>
}
