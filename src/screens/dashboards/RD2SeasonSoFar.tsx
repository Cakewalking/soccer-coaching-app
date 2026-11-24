// RD2-SeasonSoFar: the club coach's season as a dashboard. Replaces GS7-SeasonLookBack.
// Each tile is the average over the filmed games; the small chart is measures on target in each of the last five.

import { CLUB_SEASON as S } from './data'
import { playMeasure, playReel } from './GameReviewDash'
import { Columns, DashPage, G, GridTile, HAIR, HeadLink, MUT, MeasureTile, PersonRow, PlayFilm, RightColumn, SideList, Strip, StripTab, StyleHeadlines, num } from './kit'

export default function RD2SeasonSoFar({ go, tight = false, chances = true }: { go: (id: string) => void; tight?: boolean; chances?: boolean }) {
  const of = S.measures.length
  return (
    <DashPage id="RD2-SeasonSoFar" tight={tight}>
      <Strip big={S.big} title={S.title} detail={S.detail} tight={tight}>
        <StripTab on onClick={() => go('RD2-SeasonSoFar')}>Season</StripTab>
        {chances && <StripTab onClick={() => go('XG2-ChancesSeason')}>Chances</StripTab>}
        <StripTab onClick={() => go('RC7-Recorded')}>Each game</StripTab>
        <PlayFilm onClick={() => playReel('Season reel', 'U12 Sam, the season so far. 6 minutes.', 'The season reel plays. 6 minutes.')}>Season reel · 6 min</PlayFilm>
      </Strip>
      <StyleHeadlines tight={tight} measures={S.measures} styleLine="on target on average" fixLabel="Furthest from the aim" chances={chances ? S.chances : undefined} />
      <Columns>
        <GridTile tight={tight} title="Our style, across the season" cols={4} rows={2} caption={S.caption}
          links={<><HeadLink onClick={() => go('RC8-HowWeMeasure')}>What the marks mean</HeadLink><HeadLink onClick={() => go('S1-PlayingStyle')}>Our style</HeadLink></>}>
          {S.measures.map(m => <MeasureTile key={m.name} m={m} tight={tight} onPlay={() => playMeasure(m, 'U12 Sam, this season')} />)}
        </GridTile>
        <RightColumn>
          <SideList title="Style, last five games" link={<HeadLink onClick={() => go('RC7-Recorded')}>Each game</HeadLink>}>
            <div role="img" aria-label={`Measures on target in the last five games: ${S.lastFive.map(g => g[1]).join(', ')} of ${of}`} style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: tight ? 104 : 120, padding: '8px 2px 0', borderTop: `1px solid ${HAIR}` }}>
              {S.lastFive.map(([round, n]) => (
                <span key={round} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <strong style={{ ...num, fontSize: 15 }}>{n}</strong>
                  <span style={{ width: '100%', height: n * (tight ? 9 : 11), borderRadius: '8px 8px 0 0', background: n >= 5 ? G : '#a9cfc0' }} />
                  <span style={{ fontSize: 12, color: MUT }}>{round}</span>
                </span>
              ))}
            </div>
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Measures on target, out of {of}.</span>
          </SideList>
          <SideList grow title="What has moved" link={<HeadLink onClick={() => go('FY1-SeasonPlan')}>Season plan</HeadLink>}>
            {S.moved.map(p => <PersonRow key={p.name} {...p} onClick={() => go('S1-PlayingStyle')} />)}
          </SideList>
        </RightColumn>
      </Columns>
    </DashPage>
  )
}
