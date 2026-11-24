# Clean Sheet dashboards v1: report back (24 Nov)

From the `dashboards/` folder of the handover, as it stands in v23: the first pack (v19), the one change in v20 (the academy coach's "Our style" link opens `ADC8-TeamStyle`), and the four empty states added in v23. Six screens and five empty states: the game review redrawn as a dashboard, for six roles. Everything is a demo on sample data. The filled-in table is `DASHBOARDS-REPORT.csv`.

## What was built, and where it opens from

One layout, in `src/screens/dashboards/kit.tsx`: the dark result strip, the headline tiles, the grid, and the 330px right column. Every screen below is made from those same pieces.

| Screen | Opens at | Opens from, in the live app |
|---|---|---|
| `RD1-GameReview` | `/__screen/RD1-GameReview` | Club coach: Match day, After, Review. Assistant coach the same. |
| `RD2-SeasonSoFar` | `/__screen/RD2-SeasonSoFar` | Club coach: Home, Team, Where we're at, "Season so far". Also the Season tab on `RD1`, and Training, Plan, Season so far. |
| `RD3-MiniRoosReview` | `/__screen/RD3-MiniRoosReview` | MiniRoos coach: Match day, Review. |
| `RD4-ClubWeekend` | `/__screen/RD4-ClubWeekend` | Director: Teams, This weekend. |
| `RD5-CoachPhoneReview` | `/__screen/RD5-CoachPhoneReview` | Coach's phone: Game tab, "Game review" under "Last game". Back returns to the Game tab. |
| `ADC7-GameReview` | `/__screen/ADC7-GameReview` | Academy coach: Game day, Review. |
| `ADC7e-GameReviewEmpty` | `/__screen/ADC7e-GameReviewEmpty` | The same place when the academy has nothing in it yet. |
| `RD2e-SeasonSoFarEmpty` | `/__screen/RD2e-SeasonSoFarEmpty` | A new team's coach: Training, Plan, Season so far. |
| `RD3e-MiniRoosReviewEmpty` | `/__screen/RD3e-MiniRoosReviewEmpty` | A new MiniRoos team's coach: Match day, Review. |
| `RD4e-ClubWeekendEmpty` | `/__screen/RD4e-ClubWeekendEmpty` | A new club's director: Teams, This weekend. |
| `RD5e-CoachPhoneReviewEmpty` | `/__screen/RD5e-CoachPhoneReviewEmpty` | The phone's empty Game tab, "Game review". |

The five empty states share one component, `src/screens/dashboards/DashEmpty.tsx` (the phone's is in `RD5CoachPhoneReview.tsx`).

## What replaced what

- **`R1-MatchReview` opens `RD1`.** The list is gone from Match day › Review. The id, the menu, "Last review" on Where we're at and every older link to the review open the dashboard.
- **`GS7-SeasonLookBack` opens `RD2`.** In U12 Sam's app the Training tab "Season so far" now shows `RD2` as well.
- **`MS3-MiniRoosReview` opens `RD3`.**
- **`X8-ReviewEmpty` is unchanged** and is what Match day › Review shows for a team with no games.
- **The youth and senior coaches get the same dashboard** on Match day › Review, with their own result on the strip. This is not drawn. The numbers are U12 Sam's, as they were on the old list. The seniors' grid has seven tiles, because seniors do not have "Minutes shared evenly".

## What left the review, and where it still is

- **Minutes-played bars.** Gone from the review. Minutes are on Match day › Line-up and minutes, and on Squad. On the review they sit behind the "Minutes shared evenly" tile and "All 16".
- **The load and fitness list.** Gone from the review. It is on Training › Growth and load, Squad › Wellness, and the fitness coach's own Match day screen.
- **"What went well"** and the one-line link to Chances also went with the list. Chances is now a tab on the strip. "What went well" is not on any dashboard board, so it is not on the screen. Say if it should come back.
- On the old MiniRoos review, "Thank the parents" was a button. It now opens from What we saw, which the dashboard links to.

## Behind a switch

- **`SHOW_CHANCE_QUALITY_TILES`** in `src/screens/dashboards/kit.tsx`. It is **on**, so the demo shows the screens as drawn, with "Our chances" and "Their chances". The handover says these two tiles must not ship until junior shot values are validated. Turn it off and the headline row is "Our style" and the thing to fix, on `RD1`, `RD2`, `ADC7` and the youth and senior reviews. **It must be turned off before this goes to real clubs, unless the shot values have been signed off.**
- The two tiles and the Chances tab also go when the club's own rules hide chances from a team, as the old review did.

## Placeholders, named in code

All in `src/screens/dashboards/kit.tsx`:

- `CLOSE_WITHIN_SHARE_OF_AIM = 0.15`: Close is within 15% of the aim.
- `TEAM_ON_TARGET_FROM = 5` and `TEAM_CLOSE_FROM = 4`: on `RD4`, 5 or more is on target, 4 is close, 3 or fewer is off.

The tile states, the "Our style" count and blocks, "Slowest to fix", "Furthest from the aim", "Club style 4.5 of 8", "Teams at 5 or more" and "Worth a look" are worked out from the sample numbers with these rules. Three tiles are kept as drawn where the rule gives a different answer. They are listed at the end.

## Where the build differs from the boards

- **`RD1` has a fourth tab on the strip, "Season".** The handover says `RD2` opens from "the Season tab on `RD1`", but the board draws only Review, Chances and Your take. The tab is there so the route exists. Say if it should go.
- **Where we're at has a new button, "Season so far".** The handover says `RD2` opens from Home › Where we're at, but nothing on that screen is drawn for it. In the live app `RD2` shows with Home and "Where we're at" lit. The board lights nothing under Home.
- **The club coach's menu is the live one.** The boards draw Home, Squad, Training, Match day, Clips, Record, with five items under Match day. The live app has Home, Squad, Training, Match day, Record, Learn, and folds Match day into Before, After and Ladder with a row of switches under it. That row takes 45px, so on `RD1` and `RD2` the spacing between the parts is a few pixels tighter than drawn. All eight tiles are in view at 1180 by 820, and also with the demo bar showing.
- **The director's frame is the live one**, which is taller than the board's and draws its menu differently. `RD4` uses the same tighter spacing. All twelve tiles are in view at 1180 by 820.
- **"This weekend" sits after "Teams" in the director's sub-menu.** The live sub-menu has no "Compare two teams" item to sit before: Compare is a button on All teams. The "Compare two teams" tab on the strip opens that same compare screen.
- **Each team tile on `RD4` also says On target, Close or Off target in words.** The board shows the state by colour and count only. The rule is that no tile relies on colour alone.
- **On `RD5` every tile and every row has its Strong or Estimate mark.** The board draws none, but the rule is that every number carries one, and two of the three "Work on this week" numbers are estimates.
- **Writing on tints is ink (`#10211f`)**, as the rule says. The source files use a grey for the aim words on tinted tiles and plum for the label on the mauve headline tile.
- **`RD3` in the live MiniRoos app shows U9 Tom**, the app's own sample team: 8 children, Saturday at Northgate City, Poppy, Leo and Arlo. `/__screen/RD3-MiniRoosReview` shows U8 Wombats in their own menu, as drawn.
- **Every filmed team on `RD4` opens U12 Sam's review.** Only one review is drawn. In the director's app it opens over the top with a Back bar.
- **A "Says" control plays the demo clip player and shows its line.** There is no film in the demo, so the player runs for the clip's length.
- **The Ask Clean Sheet button** stays on the coach's and the academy coach's screens. The boards do not draw it there.
- **"How to film a game" on `RD2e` and `RD5e`** opens `RC1-RecordStart` over the top with a Back bar, as the table says. The live app's own Record tab is a different, newer screen.
- **"Game review" on the phone's empty Game tab** is a button under "No game today". Nothing is drawn for how a coach gets to `RD5e`.
- **`ADC7` inside the academy coach's app:** four small lines were added to `src/screens/AcademyCoachApp.tsx` so Game day › Review shows under the coach's menu instead of over the top with a Back bar.

## Not built

- **A way to `RD2e` from Home in a new team's app.** The empty Where we're at screen has no "Season so far" button, and the empty review (`X8`) has no Season tab, so a new coach reaches `RD2e` from Training only.
- **The measure with no film.** The tile for it is built (a dash, no bar, "Not filmed", white with a dashed edge) and is used for Seniors on `RD4`. No style measure in the sample data is without film, so it is not on show on `RD1`.
- **"Nothing off target".** Built as the rule says (a white tile), but no sample screen reaches it.
- **Real clips, reels and highlights.** Every play control opens the demo player.
- **`RD2` for the youth, senior and MiniRoos coaches.** It is drawn for U12 Sam only. Their Training › Season so far still shows the older session look-back.
- **`RD4` for the chair and the coordinator** shows too, because they share the director's Teams tab. Say if it should be the director's only.

## Checks

- All 133 controls in the v23 table were pressed on a local build at the board's size (1180 by 820, and 390 by 844 for the phone). Every "Opens" control opens the screen the table names, or the live frame's own version of it where the table's notes say so. Every "Says" control plays the demo player and shows its line.
- Also pressed in the live apps: Match day › Review for the head coach, the assistant coach, the youth coach and the senior coach; Home › Where we're at › Season so far; the Season tab on `RD1`; Training › Season so far; the MiniRoos coach's Match day › Review and its three links; the director's Teams › This weekend and its links to All teams, Compare and a team's review; the academy coach's Game day › Review; the phone's Game tab › Game review and Back. In the empty apps: the coach's Season so far and Review, the MiniRoos Review, the director's This weekend, and the phone.
- All eleven screens were compared with their pictures. Every tile is in view without scrolling. No tap target is under 44px. Each screen has one amber button or none.
- Not checked by pressing: the screens with `SHOW_CHANCE_QUALITY_TILES` off, and a team whose club rules hide chances. Both were read in code only.

## For the owner to decide

1. Turn `SHOW_CHANCE_QUALITY_TILES` off for launch, or sign off the junior shot values.
2. Confirm 15% for Close, and 5 and 4 for a team on `RD4`.
3. Keep or drop the "Season" tab on `RD1`.
4. The Training tab "Season so far" used to show the session look-back: sessions run, set against what the age group should learn. In U12 Sam's app it now shows `RD2`, which is about games. If the session look-back should stay, it needs its own place.
5. Should "What went well" have a place on the dashboard?
6. Should the youth and senior coaches have the dashboard now, with U12 Sam's numbers, or wait for their own?

## Things in the pack that do not agree

Built as drawn unless it says otherwise.

- **Three tiles are drawn in a state the Close rule does not give.** `RD1` and `ADC7`: goal kicks 64% against 70% is 9% short, so Close by the rule, but drawn Off target. `RD2`: 5 s against an aim of 4 s is 25% over, so Off target by the rule, but drawn Close. `RD3`: 7 of 9 is 22% short, so Off target by the rule, but drawn Close. The headline counts (4 of 8, 2 close, 2 off) follow the drawings. If the rule is right the counts change.
- **"Work on this week" rows.** The rule says each row is an off-target or close measure from the grid. The second and third rows drawn (the gap between lines, sprints late in the game) are not among the eight tiles.
- **`RD2`'s routes.** The handover says it opens from Where we're at and from a Season tab on `RD1`. Neither control is drawn.
- **Proof marks.** "Every number carries Strong, Estimate or You tapped", but `RD5` draws none, and the headline tiles on `RD3`, two on `RD4`, the team tiles on `RD4` and the chart on `RD2` have none.
- **Names of two lines at most.** "Their passes before we challenge" is drawn on four lines and "Goal kicks played short" on three.
- **"Thursday's plan"** on `RD1` opens the proposed session, which the app calls "Tuesday's session".
- **Dates.** `RD1` says Sunday 7 June. The coach's phone has U12 Sam playing Banksia Park on Saturday 6 June, and the old review said Saturday 31 October.
- **`ADC7`'s "Our style".** The dashboards folder still says `S1-PlayingStyle`. The academy folder in v20 says `ADC8-TeamStyle`. Built as v20.
- **"Club style" on `RD4`** opens `S1-PlayingStyle`, which is a coach's own style screen for U12 Sam, not the club's.
