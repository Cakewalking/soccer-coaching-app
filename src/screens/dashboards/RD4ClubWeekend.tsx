// RD4-ClubWeekend: the director's Teams › This weekend. One tile per team, with its measures on target
// out of the club's 8. Results are small grey words on purpose: under 12s have no table.
// "Coaches to talk to" is for a conversation. It is never a ranking shown to coaches.
// The director's menu is taller than the board's, so the spacing is the tight one: all twelve tiles stay in view.

import { CLUB_WEEKEND as W } from './data'
import { Columns, DashPage, GridTile, HeadLink, Headline, Headlines, INK, LOOK, PersonRow, RightColumn, SideList, Strip, StripTab, SureMark, TEAM_ON_TARGET_FROM, num, plain, teamState } from './kit'

function TeamTile({ team, result, onTarget, of, onClick }: { team: string; result: string; onTarget: number | null; of: number; onClick: () => void }) {
  const st = teamState(onTarget), look = LOOK[st]
  if (onTarget === null) return (
    <button data-dash-tile="" onClick={onClick} aria-label={`${team}. Not filmed. Open all teams`} style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 16, padding: '8px 12px', background: '#ffffff', border: `1px dashed ${look.edge}`, minHeight: 0, minWidth: 0 }}>
      <strong style={{ fontSize: 14, lineHeight: '18px' }}>{team}</strong>
      <strong style={{ ...num, fontSize: 26, lineHeight: '30px' }}>–</strong>
      <span style={{ fontSize: 12, color: INK, marginTop: 'auto' }}>Not filmed</span>
    </button>
  )
  return (
    <button data-dash-tile="" onClick={onClick} aria-label={`${team}. ${result}. ${onTarget} of ${of} on target: ${look.says}. Open its review`} style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 16, padding: '8px 12px', background: look.bg, border: `1px solid ${look.edge}`, minHeight: 0, minWidth: 0 }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'stretch', gap: 6 }}>
        <strong style={{ fontSize: 14, lineHeight: '18px' }}>{team}</strong>
        <span style={{ fontSize: 12, color: INK }}>{result}</span>
      </span>
      <strong style={{ ...num, fontSize: 26, lineHeight: '30px', whiteSpace: 'nowrap' }}>{onTarget} of {of}</strong>
      {/* the state in words, for a reader who cannot tell the tints apart */}
      <span style={{ fontSize: 11, lineHeight: '14px', fontWeight: 700 }}>{look.says}</span>
      <span role="img" aria-label={`${onTarget} of ${of} on target`} style={{ display: 'flex', alignSelf: 'stretch', gap: 3, marginTop: 'auto' }}>
        {Array.from({ length: of }, (_, k) => <span key={k} style={{ flex: 1, height: 10, borderRadius: 3, background: k < onTarget ? look.bar : '#ffffff' }} />)}
      </span>
    </button>
  )
}

export default function RD4ClubWeekend({ go }: { go: (id: string) => void }) {
  const filmed = W.teams.filter(t => t[2] !== null) as Array<[string, string, number]>
  const average = filmed.reduce((n, t) => n + t[2], 0) / filmed.length
  const atAim = filmed.filter(t => teamState(t[2]) === 'on').length
  const off = filmed.filter(t => teamState(t[2]) === 'off').map(t => t[0])
  const names = off.length > 1 ? `${off.slice(0, -1).join(', ')} and ${off[off.length - 1]}` : off[0]
  return (
    <DashPage id="RD4-ClubWeekend" tight>
      <Strip tight big={W.big} title={W.title} detail={W.detail}>
        <StripTab on onClick={() => go('RD4-ClubWeekend')}>This weekend</StripTab>
        <StripTab onClick={() => go('DB2-SeasonReview')}>Season</StripTab>
        <StripTab onClick={() => go('DX1-CompareTeams')}>Compare two teams</StripTab>
      </Strip>
      <Headlines count={4}>
        <Headline tight label="Club style" big={`${average.toFixed(1)} of ${W.clubMeasures}`} line="on target, on average" extra={<SureMark sure="Strong" />} />
        <Headline tight label={`Teams at ${TEAM_ON_TARGET_FROM} or more`} big={`${atAim} of ${filmed.length}`} line="playing the club’s way" />
        <Headline tight label="Minutes shared" big={W.minutesShared[0]} line={W.minutesShared[1]} extra={<SureMark sure="Strong" />} />
        {off.length
          ? <Headline tight fix label="Worth a look" big={`${off.length} team${off.length === 1 ? '' : 's'}`} line={names} />
          : <Headline tight label="Worth a look" big="Nothing off target" line="every filmed team is on target or close" />}
      </Headlines>
      <Columns>
        <GridTile tight title="Every team, this weekend" cols={4} rows={3} caption={`Measures on target, out of the club’s ${W.clubMeasures}. Results are shown small on purpose: under 12s have no table. Tap a team for its review.`}
          links={<><HeadLink onClick={() => go('S1-PlayingStyle')}>Club style</HeadLink><HeadLink onClick={() => go('D2-Teams')}>All teams</HeadLink></>}>
          {W.teams.map(([team, result, n]) => <TeamTile key={team} team={team} result={result} onTarget={n} of={W.clubMeasures} onClick={() => go(n === null ? 'D2-Teams' : 'RD1-GameReview')} />)}
        </GridTile>
        <RightColumn>
          <SideList title="Off target most often" link={<HeadLink onClick={() => go('DM1-CoachMeeting')}>Coach meeting</HeadLink>}>
            {W.offMostOften.map(p => <PersonRow key={p.name} {...p} onClick={() => go('DM1-CoachMeeting')} />)}
          </SideList>
          <SideList grow title="Coaches to talk to" link={<HeadLink onClick={() => go('D3-Coaches')}>All coaches</HeadLink>}>
            {W.coaches.map(p => <PersonRow key={p.mark} {...p} onClick={() => go('D3-Coaches')} />)}
          </SideList>
        </RightColumn>
      </Columns>
    </DashPage>
  )
}
