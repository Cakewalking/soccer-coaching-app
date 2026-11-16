# Master handover v2: control report

Checked 17 November 2026 against the local build of `main` plus uncommitted work, by pressing every control in `CONTROLS.csv`
at `/__screen/<id>` in a headless browser. The filled file is `docs/master-v2/CONTROLS.csv` (last column).

| Status | Controls |
|---|---|
| works | 2411 |
| line of text only | 556 |
| wrong target | 1075 |
| missing | 6320 |
| not checked | 175 |

## How to read it

- **works**: the target screen was shown, or (for a tab or sheet) the screen changed. For "Says" controls that change the screen, saving across a refresh was not checked.
- **line of text only**: a confirmation line appeared and nothing else changed.
- **wrong target**: the note says where it went. "stayed on X" means the screen changed but `data-screen` did not report the target.
- **missing**: no control with that label was found on the built screen, or pressing it did nothing. The note says which.
- **not checked**: the design label is filled from data (`{{ … }}`), so it could not be matched by text.

## Limits

- Most "missing" rows are menu items. Many screens opened by id render without their role's menu frame, so the shared menu labels are not on the page. They work in Look around.
- Labels are matched by text. Where the build's wording or demo names differ from the design (the build uses one consistent squad), the row reads "missing" although the control exists.
- A press on an item that is already selected reads "pressing it does nothing".

## Ids from part 5b and part 8

- `DP1-Pathway`: sent to `PU1-PlayingUp` as ruled. No Pathway screen exists.
- `FBp1-FormationPhone`: not built.
- `D7-SeasonPlan`, `D8-ClubStyle`: sent to `FY1-SeasonPlan`, `S1-PlayingStyle`.
- Flow maps (`FL-*`), `DEMO-*` shells and tours, `LOGO*`: not screens; not registered.

## Screens with the most open rows

| Screen | missing | wrong target | works |
|---|---|---|---|
| `FL-coach-juniors` | 57 | 0 | 0 |
| `DEMO-Start` | 44 | 0 | 0 |
| `FB1c-FormationShare` | 41 | 1 | 7 |
| `PU8d-MeasurePasses` | 40 | 0 | 1 |
| `PU8e-MeasureWins` | 40 | 0 | 1 |
| `PU8a-MeasureFilm` | 38 | 0 | 3 |
| `CH1-TeamChat` | 33 | 0 | 0 |
| `PU8k-MeasureGrowth` | 33 | 0 | 0 |
| `PU8g-MeasureTest` | 33 | 0 | 0 |
| `PU8j-MeasureLoad` | 33 | 0 | 0 |
| `FB1l-FormationSaved` | 33 | 0 | 8 |
| `CH9-MessageActions` | 26 | 6 | 11 |
| `PU8b-MeasureVest` | 32 | 0 | 0 |
| `PU8f-MeasureDistance` | 32 | 0 | 0 |
| `PU8c-MeasureSaid` | 32 | 0 | 0 |
| `PU8h-MeasureSettling` | 32 | 0 | 0 |
| `PU8i-MeasurePlace` | 32 | 0 | 0 |
| `FB1x-FormationOwn` | 32 | 0 | 8 |
| `FB1s-FormationSeniors` | 30 | 1 | 6 |
| `CH2-Announcements` | 27 | 3 | 3 |
| `DP1-FairGameTime` | 29 | 1 | 0 |
| `RC7-Recorded` | 26 | 3 | 0 |
| `DR1-Registrations` | 29 | 0 | 2 |
| `CH2e-AnnouncementsEmpty` | 28 | 0 | 0 |
| `DEMO-StartEmpty` | 27 | 0 | 0 |
