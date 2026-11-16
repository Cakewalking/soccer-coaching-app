# The data behind every measure — where it is stored, and whether the graph number is derived from it

**Honest framing.** Clean Sheet is a front-end prototype with no server or database. All evidence lives in `src/screens/measures/data.ts` as seed data, and every sheet is built from it by `MeasureSheet.tsx`. The HANDOVER asks, for each measure, whether the graph number is **worked out from the evidence** or **kept separately** — and says kept separately counts as not done.

**The truthful answer for this prototype: the graph values are seed data that *correspond to* the evidence but are not recomputed from it at runtime** — there is no backend to count clips or read the vest. So by the strict definition, the numbers are "kept separately" in the demo. What I have done is (a) store the evidence for every measure, and (b) document, below, exactly how a real build would derive the number from it. One place it *is* literally linked in code: the film sheet's clip filters recompute the shown clip count live from the clips array (`shown.length`), and "This one is wrong" is wired to re-count via the coach's To-check list.

For each of the fourteen measures: where its evidence is stored, and the intended derivation.

| # | Measure | Evidence stored (in `data.ts`) | Number ← evidence (intended) | Demo status |
|---|---|---|---|---|
| 1 | Duels won | `film` clips (41 from 9 games), per-clip minute/outcome/game | Count of clips where her team keeps it 2 s; % = won ÷ total | Seed value matches; clip filter recomputes shown count live |
| 2 | Forward passes under pressure | `film` clips (126 from 9 games) | Count of qualifying passes ÷ games, scaled to 60 min | Seed; derivable from clips |
| 3 | Wins of the ball | `film` clips (108 from 9 games) | Count of tackles/interceptions kept 2 s ÷ games | Seed; derivable from clips |
| 4 | Growth | `hand` rows: date, measurer, value, both raw readings | The value is the average of the two readings per row | Both readings stored; value = their average |
| 5 | Top speed | `vest` rows: date, session, value, vest #, signal (incl. struck-through dropped reading) | The max of the session rows (left-out rows excluded) | Seed; the table is the evidence, graph plots the same rows |
| 6 | 10 m sprint | `test` rows: date, timer, counted value, every go | Best of the two gos per test (lower is better) | Both gos stored; counted = min |
| 7 | Distance | `vest` rows (games only) | Per-game km, scaled to 60 min, from the vest rows | Seed; plots the vest rows |
| 8 | Head | `said` list: person, role, date, exact words, how given | A tally of taps/answers; nothing averaged, words shown verbatim | Quotes stored exactly; head graph plots one dot per game answer |
| 9 | Settling in | names Mia picked + attendance (`settling`) | Count of picked names in the receiving squad | Known count (4 of 14) drives the circles |
| 10 | Load | weekly minutes from attendance + vest/team-sheet + check-ins (`load`) | Sum of minutes per week from the three sources | Weekly bars seed; cap line fixed |
| 11 | Where she would go | registrations + unnamed game-time shares (`place`) | Squad size from registrations; shares from film/team sheets | Unnamed bars seed; floor line fixed |
| 12 | Sprints a game *(not drawn)* | reuses the `vest` sheet | Count of efforts above the age sprint speed, from vest | Opens the vest sheet; its own data not built |
| 13 | Goals and assists *(not drawn)* | reuses the `film` sheet | One clip each; count ÷ games scaled to 60 min | Opens the film sheet; its own data not built |
| 14 | Touches *(not drawn)* | reuses the `film` sheet | Count per game (20 shown per game) scaled to 60 min | Opens the film sheet; its own data not built |

## Summary

Every measure that is **drawn** (1–11) stores its evidence in the prototype, and the sheet shows it (clips, the vest/test/hand tables, or the quotes). The headline number **corresponds** to that evidence and, for film, the live clip count is genuinely recomputed. But without a backend the numbers are **seed values, not runtime-derived** — so against the HANDOVER's strict bar this is **not fully done**, and I'm saying so rather than claiming otherwise. The three **undrawn** measures (12–14) reuse the film/vest sheet component, as the HANDOVER directs, until their own data is built. When a data layer exists, the "Number ← evidence" column is the contract to implement.
