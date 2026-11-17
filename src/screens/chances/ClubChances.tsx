// The director's Chances and points tab (Teams): the table, and whatever it opens,
// kept inside the club frame with a way back.

import { useState } from 'react'
import XG5ClubChances from './XG5ClubChances'
import ChancesFlow from './ChancesFlow'
import { CHANCES, fromRow, type ClubRow } from './chanceData'
import QC10HowWeMeasure from '../capture/QC10HowWeMeasure'
import QC11ClubCaptureRules from '../capture/QC11ClubCaptureRules'

export default function ClubChances({ onNav }: { onNav?: (s: string) => void }) {
  const [team, setTeam] = useState<ClubRow | null>(null)
  const [step, setStep] = useState('XG2-ChancesSeason')
  const [page, setPage] = useState<string | null>(null)   // QC10 (with a source) or QC11
  const back = (label: string, to: () => void) => <button onClick={to} style={{ alignSelf: 'flex-start', margin: '10px 24px 0', height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{label}</button>
  const go = (id: string) => { if (id.startsWith('QC10') || id.startsWith('QC11')) setPage(id); else onNav?.(id) }
  const wrap = { display: 'flex', flexDirection: 'column', flexGrow: 1 } as const
  if (page?.startsWith('QC11')) return <div style={wrap}>{back('Back to Chances and points', () => setPage(null))}<QC11ClubCaptureRules onNav={go} /></div>
  if (page?.startsWith('QC10')) return <div style={wrap}>{back(team ? `Back to ${team.team}` : 'Back to Chances and points', () => setPage(null))}<QC10HowWeMeasure source={page.includes('#src') ? Number(page.split('#src')[1]) : undefined} /></div>
  if (team) return (
    <div style={wrap}>
      {back('Back to Chances and points', () => setTeam(null))}
      <ChancesFlow data={team.id ? CHANCES[team.id] : fromRow(team)} step={step} onStep={setStep} onNav={go} />
    </div>
  )
  return <XG5ClubChances onNav={go} onTeam={r => { setStep('XG2-ChancesSeason'); setTeam(r) }} />
}
