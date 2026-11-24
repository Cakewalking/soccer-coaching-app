// Chances and points, XG1 to XG4 and the MiniRoos pair (XGm1, XGm2).
// Copy is from chance-metrics-v2/source. Every number comes from chanceData,
// so xG − xGA = xGD and season totals equal the games shown.
// No amber on a chance number: they are estimates.

import { playClips } from '../clips/clipSheet'
import type { ReactNode } from 'react'
import { Mark, Src, Ico, IC, Btn, Note, tile, h2, cap, label, G, INK, MUT, LINE, PALE, DARK } from '../capture/marks'
import { Page, col, ListRow } from '../capture/CaptureScreens'
import { allowed, type CapState } from '../capture/captureStore'
import { fmt1, signed, satGame, season, aboutGoals, rankLadder, ordinal, THREAT, type TeamChances, type Shot } from './chanceData'

export type Go = (target: string) => void
export interface ChanceProps { t: TeamChances; s: CapState; go: Go; say: (m: string) => void; game: 'sat' | 'nofilm'; setGame: (g: 'sat' | 'nofilm') => void }

const src = (go: Go) => (n: number) => go(`QC10-HowWeMeasure#src${n}`)
const isMini = (t: TeamChances) => t.band === 'u6' || t.band === 'u8' || t.band === 'u10'
const ids = (t: TeamChances) => isMini(t)
  ? { game: 'XGm1-ChancesMiniRoos', season: 'XGm2-ChancesSeasonMiniRoos' }
  : { game: 'XG1-ChancesGame', season: 'XG2-ChancesSeason' }

/** Pick the game: the one with film, or the one without. */
function GamePicker({ t, game, setGame }: Pick<ChanceProps, 't' | 'game' | 'setGame'>) {
  return (
    <select aria-label="Which game" value={game} onChange={e => setGame(e.target.value as 'sat' | 'nofilm')} style={{ height: 44, maxWidth: 230, padding: '0 10px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600 }}>
      <option value="sat">{t.sat.line.replace(`${t.name} · `, '')}</option>
      <option value="nofilm">{t.noFilm.line.replace(`${t.name} · `, '')} · no film</option>
    </select>
  )
}

// ── The shot map ─────────────────────────────────────────────────────────────

const radius = (v: number) => 5 + 19.6 * Math.sqrt(v)
function Dot({ sh, onOpen, what }: { sh: Shot; onOpen: () => void; what: string }) {
  const r = radius(sh.v)
  return (
    <g>
      <circle cx={sh.x} cy={sh.y} r={r} fill={sh.goal ? '#fff' : 'rgba(255,255,255,0.14)'} stroke="#fff" strokeWidth="2.5" />
      {sh.goal && <path d={`M${sh.x - r * 0.4} ${sh.y}l${r * 0.28} ${r * 0.3} ${r * 0.5}-${r * 0.55}`} stroke={G} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {/* every dot opens its clip; the tap area is 44px or more */}
      <circle cx={sh.x} cy={sh.y} r={Math.max(r, 23)} fill="transparent" role="button" tabIndex={0} aria-label={what} style={{ cursor: 'pointer' }} onClick={onOpen} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }} />
    </g>
  )
}
function ShotMap({ t }: { t: TeamChances }) {
  const mini = isMini(t), g = t.sat
  const goals = (n: number) => mini ? '' : `, ${n} ${n === 1 ? 'goal' : 'goals'}`
  const open = (whose: string, sh: Shot) => playClips([{ title: `${whose}, ${odds(sh.v)}${sh.goal ? ', went in' : ''}`, sub: 'From the match film, starting five seconds before the shot.', len: 10 }], 'Sunday’s shots')
  const odds = (v: number) => `about 1 in ${Math.max(2, Math.round(1 / v))}`
  return (
    <svg viewBox="0 0 710 362" role="group" aria-label={`Shot map. Your team, attacking right: ${g.ours.length} shots${goals(g.scored)}. The other team, attacking left: ${g.theirs.length} shots${goals(g.theirGoals)}. Bigger circles are better chances. Filled circles with a tick ${mini ? 'went in' : 'are goals'}.`} style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, background: G }}>
      <g stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.9"><rect x="22" y="30" width="666" height="306" /><path d="M355 30v306" /><circle cx="355" cy="183" r="38" /><rect x="22" y="113" width="70" height="140" /><rect x="618" y="113" width="70" height="140" /></g>
      <text x="28" y="20" fontSize="13" fontWeight="700" fill="#fff">Their chances · {g.theirs.length} shots{goals(g.theirGoals)}</text>
      <text x="682" y="20" textAnchor="end" fontSize="13" fontWeight="700" fill="#fff">Your chances · {g.ours.length} shots{goals(g.scored)}</text>
      {g.theirs.map((sh, i) => <Dot key={`t${i}`} sh={sh} onOpen={() => open('Their shot', sh)} what={`Their shot, ${odds(sh.v)}${sh.goal ? ', went in' : ''}. Open the clip`} />)}
      {g.ours.map((sh, i) => <Dot key={`o${i}`} sh={sh} onOpen={() => open('Your shot', sh)} what={`Your shot, ${odds(sh.v)}${sh.goal ? ', went in' : ''}. Open the clip`} />)}
      <circle cx="237" cy="349" r="5" fill="rgba(255,255,255,0.14)" stroke="#fff" strokeWidth="2" /><circle cx="255" cy="349" r="9" fill="rgba(255,255,255,0.14)" stroke="#fff" strokeWidth="2" />
      <text x="271" y="353" fontSize="12" fontWeight="700" fill="#dcefe8">Bigger = better chance</text><circle cx="427" cy="349" r="8" fill="#fff" /><text x="441" y="353" fontSize="12" fontWeight="700" fill="#dcefe8">Goal</text>
    </svg>
  )
}

const rowBtn = { display: 'grid', gridTemplateColumns: '38px minmax(0,1fr) 78px 20px', alignItems: 'center', gap: 6, minHeight: 50, padding: '4px 0', width: '100%', background: 'none', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' } as const
const play = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>

// ── XG1 / XGm1 · one game ────────────────────────────────────────────────────

export function XG1ChancesGame({ t, s, go, game, setGame }: ChanceProps) {
  const mini = isMini(t), g = t.sat, n = satGame(t), may = allowed(s, t.band)
  const names = may.xa && g.setUp.length > 0
  const better = n.xgd > 0
  const head = mini
    ? (better ? 'Your team made more and better chances than it gave up.' : 'The other team made more and better chances this time.')
    : `Your chances were worth ${aboutGoals(n.xg)}. You scored ${g.scored}.`
  const sub = mini
    ? 'No result is kept in MiniRoos. This is about how they played. One game is a guide.'
    : `${better ? (g.scored >= Math.round(n.xg) ? 'You made the better chances and finished them well.' : 'You made the better chances but did not take them all.') : 'They made the better chances.'} One game is a guide, not a verdict.`
  return (
    <Page id={ids(t).game} title="Chances" sub={mini ? g.line : `${g.line}${g.result ? ` · ${g.result}` : ''}`} go={go} cols="minmax(0,1fr) 372px"
      right={<><GamePicker t={t} game={game} setGame={setGame} /><Btn big onClick={() => go('QC10-HowWeMeasure')}>How we measure</Btn><Btn primary big onClick={() => go(ids(t).season)}>Season so far</Btn></>}>
      <div style={col}>
        <section aria-label="This game" style={{ borderRadius: 20, background: DARK, color: '#fff', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '10px 26px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: '1 1 300px', minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>EXPECTED GOALS (xG) · ONE GAME</span>
            <strong style={{ fontSize: 24, lineHeight: '30px', letterSpacing: '-0.02em' }}>{head}</strong>
            <span style={{ fontSize: 14, lineHeight: '20px', color: '#a9cfc0' }}>{sub}</span>
          </span>
          {[[fmt1(n.xg), 'Your chances', `xG · ${g.ours.length} shots`], [fmt1(n.xga), 'Their chances', `xGA · ${g.theirs.length} shots`], [signed(n.xgd), 'Difference', 'xGD']].map(([v, a, b]) => (
            <span key={a} data-figure={b.split(' ')[0]} style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 34, lineHeight: '38px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{v}</strong>
              <strong style={{ fontSize: 14, lineHeight: '19px' }}>{a}</strong>
              <span style={{ fontSize: 13, lineHeight: '17px', color: '#a9cfc0' }}>{b}</span>
            </span>
          ))}
        </section>
        <section aria-label="Shot map" style={{ ...tile, padding: '12px 18px 16px', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <h2 style={h2}>Where the chances came from</h2>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ ...cap, fontSize: 13 }}>Being tuned for this age group</span><Mark kind="estimate" /></span>
          </div>
          <ShotMap t={t} />
        </section>
      </div>
      <div style={col}>
        <section aria-label="Your best chances" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, paddingBottom: 6 }}><h2 style={{ ...h2, whiteSpace: 'nowrap' }}>Your best chances</h2><span style={{ ...cap, fontSize: 12, whiteSpace: 'nowrap' }}>How often a shot like it goes in</span></div>
          {g.best.map(b => (
            <button key={b.min} style={rowBtn} onClick={() => playClips(g.best.map(x => ({ title: `${x.min} · ${x.who}${x.goal && !mini ? ' · goal' : ''}`, sub: `${x.what}.`, len: 11 })), 'Your best chances', g.best.indexOf(b))}>
              <strong style={{ fontSize: 14, color: MUT }}>{b.min}</strong>
              <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{b.who}{b.goal && !mini ? ' · goal' : ''}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{b.what}</span></span>
              <strong style={{ fontSize: 14, textAlign: 'right', whiteSpace: 'nowrap' }}>{b.odds}</strong>{play}
            </button>
          ))}
        </section>
        <section aria-label={names ? 'Who set them up' : 'How the chances were made'} style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}>
            <h2 style={h2}>{names ? <>Who set them up <span style={{ fontWeight: 400, color: MUT }}>· xA</span></> : 'How the chances were made'}</h2><Mark kind="estimate" />
          </div>
          {names
            ? g.setUp.map(u => (
              <div key={u.who} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: 10, minHeight: 50, padding: '4px 0', borderTop: `1px solid ${LINE}` }}>
                <span style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 14, lineHeight: '19px' }}><strong>{u.who}</strong> <span style={{ color: MUT }}>· {u.n} chances</span></span><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{u.what}</span></span>
                <strong style={{ fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{fmt1(u.v)}</strong>
              </div>
            ))
            : g.how.map(h => (
              <div key={h.t} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: 10, minHeight: 50, padding: '4px 0', borderTop: `1px solid ${LINE}` }}>
                <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{h.t}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{h.d}</span></span>
                <strong style={{ fontSize: 14, whiteSpace: 'nowrap' }}>{h.n} chances</strong>
              </div>
            ))}
        </section>
        {mini
          ? <Note title="No names at this age">For under-10s your club shows chances for the team, not each child. Chances are valued for a {t.format} pitch and {t.ageWord} goals <Src n={13} onOpen={src(go)} />.</Note>
          : <Note title="What a chance is worth">Each shot gets a value from where it was taken, the angle, and whether it was a foot or a head <Src n={13} onOpen={src(go)} />. Ours is worked out from {t.ageWord} games on this size of pitch, not from professional games.</Note>}
      </div>
    </Page>
  )
}

// ── XG1e · a game with no film ───────────────────────────────────────────────

export function XG1eChancesNoFilm({ t, go, game, setGame, none }: ChanceProps & { none?: boolean }) {
  return (
    <Page id="XG1e-ChancesNoFilm" title="Chances" sub={none ? `${t.name} · no game filmed yet` : t.noFilm.line} go={go} cols="minmax(0,1fr) 348px"
      right={<>{!none && <GamePicker t={t} game={game} setGame={setGame} />}<Btn big onClick={() => go('QC10-HowWeMeasure')}>How we measure</Btn></>}>
      <section aria-label="No film" style={{ ...tile, alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12, padding: '48px 24px', minHeight: 520, alignSelf: 'stretch' }}>
        <span style={{ width: 72, height: 72, borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={IC.film} size={30} /></span>
        <strong style={{ fontSize: 22, lineHeight: '28px', letterSpacing: '-0.01em' }}>No film for this game, so no chance numbers</strong>
        <span style={{ fontSize: 15, lineHeight: '22px', color: MUT, maxWidth: 460 }}>Chances are worked out from where each shot was taken. Without film we can’t see that. Your score, minutes and ratings are all still here.</span>
        <Btn primary onClick={() => go('YT1-YourTake')}>Open your take on the game</Btn>
        <Btn onClick={() => go('QC1-CapturePlan')}>Film the next one</Btn>
      </section>
      <div style={col}>
        <section aria-label="What this game still gives" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What this game still gives</h2>
          <ListRow ok title="The score and who played" sub={none ? 'From your team sheet' : 'A friendly, so it is not on the ladder'} />
          <ListRow ok title="Your ratings and match report" sub="From you, after the game" />
          <ListRow ok={false} title="Chances for and against" sub="Needs film" />
        </section>
        <Note title="The season line skips this game">A game with no film is left out of the chances trend. It is never filled in with a guess.</Note>
      </div>
    </Page>
  )
}

// ── XG2 / XGm2 · the season ──────────────────────────────────────────────────

function ChanceChart({ t }: { t: TeamChances }) {
  const g = t.games.filter(x => x.film)
  const X0 = 40, X1 = 590, y = (v: number) => 202 - v * 75.2, x = (i: number) => X0 + (i / Math.max(1, g.length - 1)) * (X1 - X0)
  const made = g.map((p, i) => `${x(i)},${y(p.made)}`), given = g.map((p, i) => `${x(i)},${y(p.given)}`)
  const last = g.length - 1
  return (
    <svg viewBox="0 0 700 232" role="img" aria-label={`Chances made and given up over ${g.length} games. Made: ${g.map(p => p.made).join(', ')}. Given up: ${g.map(p => p.given).join(', ')}.`} style={{ display: 'block', width: '100%', maxWidth: 700, height: 'auto' }}>
      {[0, 0.5, 1, 1.5, 2, 2.5].map(v => <g key={v}><path d={`M${X0} ${y(v)}H${X1}`} stroke="#e3e5e2" strokeWidth="1" /><text x="32" y={y(v) + 4} textAnchor="end" fontSize="12" fill={MUT}>{v}</text></g>)}
      <polygon points={[...made, ...[...given].reverse()].join(' ')} fill={PALE} />
      <polyline points={given.join(' ')} fill="none" stroke={INK} strokeWidth="2" strokeDasharray="5 5" />
      <polyline points={made.join(' ')} fill="none" stroke={G} strokeWidth="2.5" />
      {g.map((p, i) => <g key={i}><rect x={x(i) - 4} y={y(p.given) - 4} width="8" height="8" fill="#fff" stroke={INK} strokeWidth="2" /><circle cx={x(i)} cy={y(p.made)} r="4" fill={G} stroke="#fff" strokeWidth="1.5" /><text x={x(i)} y="224" textAnchor={i === 0 ? 'start' : 'middle'} fontSize="12" fill={MUT}>{p.label}</text></g>)}
      <text x={X1 + 12} y={y(g[last].made) + 4} fontSize="13" fontWeight="700" fill={G}>Chances made</text>
      <text x={X1 + 12} y={y(g[last].given) + 4} fontSize="13" fontWeight="700" fill={INK}>Given up</text>
    </svg>
  )
}

function Tile({ head, value, mark, sub }: { head: string; value: string; mark: ReactNode; sub: string }) {
  return (
    <div data-tile={head} style={{ ...tile, padding: '10px 14px', gap: 2 }}>
      <span style={label}>{head}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ fontSize: 27, lineHeight: '34px', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{value}</strong>{mark}</span>
      <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{sub}</span>
    </div>
  )
}

export function XG2ChancesSeason({ t, s, go }: ChanceProps) {
  const mini = isMini(t), se = season(t), may = allowed(s, t.band)
  const enough = se.games >= s.trendAfter
  const est = <Mark kind="estimate" />
  const numbers: [string, string, string, boolean][] = [
    ['Chances made', 'xG', `Goals an average ${t.ageWord} team scores from your shots`, false],
    ['Chances given up', 'xGA', 'The same, for shots against you', false],
    ['Difference', 'xGD', 'Made minus given up. Above zero is good', false],
    ['Points', 'PPI', 'Your points a game, weighted by who you played', true],
  ]
  return (
    <Page id={ids(t).season} title="Chances this season" sub={`${t.name} · ${t.seasonLine} · ${t.format}`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('XG5-ClubChances')}>Whole club</Btn><Btn big onClick={() => go(ids(t).game)}>Sunday’s game</Btn><Btn primary big onClick={() => go('XG4-ThreatMap')}>Where the danger comes from</Btn></>}>
      <div style={col}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>
          <Tile head="Chances made · xG" value={fmt1(se.xg)} mark={est} sub={mini ? `About ${Math.round((se.xg / se.games) * 2) / 2} a game` : `You scored ${t.goalsFor}`} />
          <Tile head="Given up · xGA" value={fmt1(se.xga)} mark={est} sub={mini ? `About ${Math.round((se.xga / se.games) * 2) / 2} a game` : `You let in ${t.goalsAgainst}`} />
          <Tile head="Difference · xGD" value={signed(se.xgd)} mark={est} sub={mini ? (t.diffNote ?? `${signed(se.perGame)} a game`) : `Goal difference is ${signed(se.goalDiff, 0)}`} />
          {se.row && may.ladder
            ? <Tile head="Points · PPI" value={se.row.ppi.toFixed(2)} mark={<Mark kind="strong" />} sub={`${ordinal(se.row.pos)} of ${se.of}${t.division ? ` in ${t.division.replace(/^Under \d+ /, '')}` : ''}`} />
            : <Tile head="Points · PPI" value="—" mark={<Mark kind="not" label="No ladder" />} sub={mini ? 'MiniRoos has no ladder' : 'Ladder and points are off for this age'} />}
        </div>
        <section aria-label={mini ? 'Game by game' : 'Round by round'} style={{ ...tile, padding: '12px 18px', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}><h2 style={h2}>{mini ? 'Game by game' : 'Round by round'}</h2><span style={{ ...cap, fontSize: 13 }}>Goals’ worth of chances in each game</span></div>
          {enough ? <ChanceChart t={t} /> : <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '24px 0' }}><Mark kind="needs" label={`${se.games} of ${s.trendAfter} games`} /><span style={{ ...cap, fontSize: 13 }}>A trend is shown after {s.trendAfter} games with film.</span></div>}
          <span style={{ ...cap, fontSize: 13 }}>The shaded gap is the difference. {mini ? 'Two games had no film and are left out. They are never filled in with a guess.' : 'A game with no film is left out of this line. It is never filled in with a guess.'}</span>
        </section>
        <section aria-label="What it says" style={{ ...tile, padding: '12px 18px 14px', gap: 6 }}>
          <h2 style={h2}>What it says</h2>
          <span style={{ fontSize: 15, lineHeight: '22px' }}>{t.reading.before}<strong>{t.reading.bold}</strong>{t.reading.after}</span>
        </section>
      </div>
      <div style={col}>
        {mini
          ? <section aria-label="What MiniRoos teams get" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
              <h2 style={{ ...h2, paddingBottom: 6 }}>What MiniRoos teams get</h2>
              <ListRow ok title="Chances made, given up, difference" sub="xG, xGA, xGD. For the team" />
              <ListRow ok title="Where the danger comes from" sub="Threat added (xT). For the team, after 5 games" />
              <ListRow ok={may.xa} title="Who set up each chance" sub={may.xa ? 'xA. On for this age at your club. Coach only' : 'xA. Off under 10 at your club'} />
              <ListRow ok={false} title="Points and ladder" sub="PPI. MiniRoos has no ladder" />
            </section>
          : <section aria-label="The four numbers" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
              <h2 style={{ ...h2, paddingBottom: 4 }}>The four numbers</h2>
              {numbers.map(([a, b, c, link], i) => {
                const body = <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}><span style={{ fontSize: 14, lineHeight: '19px', color: INK }}><strong>{a}</strong> <span style={{ color: MUT }}>· {b}</span></span><span style={{ fontSize: 13, lineHeight: '17px', color: MUT, fontWeight: 400 }}>{c}</span></span>
                const st = { display: 'flex', alignItems: 'center', gap: 8, minHeight: 50, padding: '4px 0', width: '100%', borderTop: i ? `1px solid ${LINE}` : undefined } as const
                return link && may.ladder && t.ladder
                  ? <button key={a} onClick={() => go('XG3-LadderPPI')} style={{ ...st, background: 'none', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', cursor: 'pointer' }}>{body}<Ico d={IC.chev} size={16} sw={2.4} /></button>
                  : <div key={a} style={st}>{body}</div>
              })}
            </section>}
        <Note title="Read it over a run of games">A game has too few shots for its chance numbers to settle <Src n={14} onOpen={src(go)} />. {mini ? 'Each child takes very few shots, so we show the team.' : <>We show the season, and call a change real only when it is outside the usual swing <Src n={6} onOpen={src(go)} />.</>}</Note>
        {mini
          ? <Note title="What families see">Nothing here goes to families of under-10s unless your club turns it on. Under-10 and under-11 families see the team’s chances in plain words.</Note>
          : <Note title="Not a mark for a striker">It takes a very large number of shots before these numbers say anything about one player’s finishing <Src n={14} onOpen={src(go)} />. We show them for the team.</Note>}
      </div>
    </Page>
  )
}

// ── XG3 · ladder with PPI ────────────────────────────────────────────────────

export function XG3LadderPPI({ t, go }: ChanceProps) {
  const rows = rankLadder(t.ladder ?? []), you = rows.find(r => r.you)!
  const grid = '34px minmax(0,1fr) 58px 58px 86px 110px 74px 96px'
  const level = rows.find(r => !r.you && r.points === you.points)
  const round = you.played
  const next = t.toPlay && rows.find(r => r.team === t.toPlay!.next)
  return (
    <Page id="XG3-LadderPPI" title="Ladder" sub={`${t.division} · after round ${round}`} go={go} cols="minmax(0,1fr) 332px"
      right={<><Btn big onClick={() => go('XG2-ChancesSeason')}>Chances this season</Btn><Btn big onClick={() => go('CF1-Fixtures')}>Fixtures and results</Btn></>}>
      <section aria-label="Ladder" style={{ ...tile, gap: 0, padding: '14px 12px 12px', alignSelf: 'stretch', minHeight: 560 }}>
        <div role="table" aria-label={`${t.division} ladder`}>
          <div role="row" style={{ display: 'grid', gridTemplateColumns: grid, alignItems: 'end', padding: '0 8px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7a4b5b', lineHeight: '15px' }}>
            <span /><span role="columnheader">Team</span><span role="columnheader">Played</span><span role="columnheader">Points</span><span role="columnheader">Points a game</span><span role="columnheader">Opponents’ points a game</span><span role="columnheader">PPI</span><span role="columnheader">On PPI</span>
          </div>
          {rows.map(r => (
            <div key={r.team} role="row" data-you={r.you || undefined} style={{ display: 'grid', gridTemplateColumns: grid, alignItems: 'center', minHeight: 46, padding: '0 8px', borderTop: `1px solid ${LINE}`, borderRadius: r.you ? 8 : 0, background: r.you ? PALE : undefined, fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>
              <strong role="cell">{r.pos}</strong>
              <strong role="cell" style={{ fontSize: 16 }}>{r.team}{r.you ? ' · you' : ''}</strong>
              <span role="cell">{r.played}</span><strong role="cell">{r.points}</strong><span role="cell">{r.ppg.toFixed(2)}</span><span role="cell">{r.opp.toFixed(2)}</span>
              <strong role="cell" data-ppi>{r.ppi.toFixed(2)}</strong>
              <span role="cell" style={{ fontSize: 13, fontWeight: r.move ? 700 : 400, color: r.move ? INK : MUT, display: 'flex', alignItems: 'center', gap: 4 }}>{r.move > 0 ? <>↑ Up {r.move}</> : r.move < 0 ? <>↓ Down {-r.move}</> : 'Same'}</span>
            </div>
          ))}
        </div>
        <span style={{ ...cap, fontSize: 13, marginTop: 'auto', padding: '12px 8px 0' }}>Points are from results entered by the league. PPI is points a game times your opponents’ points a game.</span>
      </section>
      <div style={col}>
        <section aria-label="Your PPI" style={{ ...tile, padding: '12px 16px 14px', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}><span style={label}>Points, weighted by who you played</span><Mark kind="strong" /></div>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong data-ppi style={{ fontSize: 40, lineHeight: '44px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{you.ppi.toFixed(2)}</strong><span style={{ ...cap, fontSize: 15 }}>{ordinal(you.pos)} of {rows.length}</span></span>
          <span style={{ fontSize: 14, lineHeight: '20px' }}>{level
            ? `You and ${level.team} both have ${you.points} points. Yours came against ${you.opp > level.opp ? 'stronger' : 'weaker'} teams, so your PPI is ${you.opp > level.opp ? 'higher' : 'lower'}.`
            : `Your ${you.ppg.toFixed(2)} points a game came against opponents averaging ${you.opp.toFixed(2)}.`}</span>
        </section>
        {t.toPlay && (
          <section aria-label="Still to play" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
            <h2 style={{ ...h2, paddingBottom: 6 }}>Still to play</h2>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderTop: `1px solid ${LINE}` }}>
              <span style={{ fontSize: 14, lineHeight: '19px' }}><strong>{t.toPlay.left} games left</strong> <span style={{ color: MUT }}>· opponents average {t.toPlay.oppAvg.toFixed(2)}</span></span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{t.toPlay.oppAvg < you.opp ? 'Easier' : 'Harder'} than the {you.opp.toFixed(2)} you have faced so far</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderTop: `1px solid ${LINE}` }}>
              <span style={{ fontSize: 14, lineHeight: '19px' }}><strong>Next: {t.toPlay.next}</strong>{next && <span style={{ color: MUT }}> · {next.pos === 1 ? 'top' : ordinal(next.pos)}, {next.ppg.toFixed(2)} a game</span>}</span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{t.toPlay.nextSub}</span>
            </div>
          </section>
        )}
        <Note title="From results, not film">This number needs no camera. It is right as soon as the league’s results are in.</Note>
        <Note title="MiniRoos">Under 6 to under 11 have no ladder, so there is no PPI for those teams. They do get chances, on Game day.</Note>
      </div>
    </Page>
  )
}

// ── XG4 · where the danger comes from (team xT) ──────────────────────────────

export function XG4ThreatMap({ t, go }: ChanceProps) {
  const filmed = t.games.filter(g => g.film).length, enough = filmed >= 5
  return (
    <Page id="XG4-ThreatMap" title="Where the danger comes from" sub={`${t.name} · last 5 games with film · threat added (xT)`} go={go} cols="minmax(0,1fr) 372px"
      right={<><Btn big onClick={() => go('QC10-HowWeMeasure')}>How we measure</Btn><Btn primary big onClick={() => go(ids(t).season)}>Chances this season</Btn></>}>
      <div style={col}>
        <section aria-label="Threat map" style={{ ...tile, padding: '12px 18px 16px', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <h2 style={h2}>{enough ? t.threat.head : 'Not enough games with film yet'}</h2>
            <span style={{ display: 'flex', gap: 6 }}>{enough ? <Mark kind="estimate" /> : <Mark kind="needs" label="Needs 5 games" />}<Mark kind="needs" label="Team only" /></span>
          </div>
          {enough ? (
            <svg viewBox="0 0 710 380" role="img" aria-label="Threat map, attacking right. The brightest squares are in front of goal and down the left side in the final third. There is a second, fainter patch in midfield on the right." style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, background: G }}>
              {THREAT.map((column, c) => column.map((o, r) => <rect key={`${c}-${r}`} x={21 + c * 55.83} y={29 + r * 40.5} width="53.8" height="38.5" rx="3" fill="#fff" opacity={o} />))}
              <g stroke="#fff" strokeWidth="2" fill="none" opacity="0.55"><rect x="20" y="28" width="670" height="324" /><path d="M355 28v324" /><rect x="620" y="116" width="70" height="148" /><rect x="20" y="116" width="70" height="148" /></g>
              <text x="20" y="19" fontSize="13" fontWeight="700" fill="#fff">Your goal</text><text x="690" y="19" textAnchor="end" fontSize="13" fontWeight="700" fill="#fff">You attack this way →</text>
              <text x="20" y="371" fontSize="12" fontWeight="700" fill="#dcefe8">Left side at the top</text><text x="690" y="371" textAnchor="end" fontSize="12" fontWeight="700" fill="#dcefe8">Brighter = more danger added from there</text>
            </svg>
          ) : <span style={{ ...cap, padding: '24px 0' }}>The threat map needs five games with film. This team has {filmed}.</span>}
        </section>
        {enough && (
          <section aria-label="What it says" style={{ ...tile, padding: '12px 18px 14px', gap: 6 }}>
            <h2 style={h2}>What it says</h2>
            <span style={{ fontSize: 15, lineHeight: '22px' }}>{t.threat.says}<strong>{t.threat.bold}</strong></span>
          </section>
        )}
      </div>
      <div style={col}>
        <section aria-label="Moves that added most" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Moves that added most on Sunday</h2>
          {t.threat.moves.map(m => (
            <button key={m.min} style={rowBtn} onClick={() => playClips(t.threat.moves.map(x => ({ title: `${x.min} · ${x.who}`, sub: `${x.what}.`, len: 9 })), 'Moves that added most', t.threat.moves.indexOf(m))}>
              <strong style={{ fontSize: 14, color: MUT }}>{m.min}</strong>
              <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{m.who}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{m.what}</span></span>
              <strong style={{ fontSize: 14, textAlign: 'right' }}>Clip</strong>{play}
            </button>
          ))}
        </section>
        <Note title="How it works">Each square of the pitch has a value: how often a team scores soon after having the ball there. A pass or run that moves the ball to a better square adds threat <Src n={15} onOpen={src(go)} />.</Note>
        <Note title="Why it is for the team only">It rests on where every pass started and ended, which one camera gives as an estimate. Added up over a team and five games it is useful. For one child in one game it is noise.</Note>
        <Note title="Breaking lines">Counting how many opponents a pass takes out needs every opponent’s exact position. We count passes that break a line instead.</Note>
      </div>
    </Page>
  )
}
