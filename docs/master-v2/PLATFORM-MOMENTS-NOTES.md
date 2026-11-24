# Platform moments v1 and the audit fixes: report back (24 Nov)

From `clean-sheet-handover-v12`: the `platform/` part and the two audit tables in the top-level handover. The family app part is reported in `FAMILY-APP-NOTES.md`. Everything is a demo on sample data.

## What was built

Six tablet pages in `src/screens/signin/PlatformScreens.tsx`, registered like the sign-in and sandbox pages (short code in `DemoApp.tsx`, full id in `SCREEN_ALIAS`). Each opens at `/__screen/<id>`.

| Screen | What it is |
|---|---|
| `PLT1-PlanEnding` | The plan ends in 14 days: what stays, what stops |
| `PLT2-PaymentFailed` | A monthly payment was declined |
| `PLT3-CancelPlan` | End the plan? |
| `PLT4-PlanEnded` | What a coach sees after the plan has ended |
| `PLT5-LostAccess` | Can't get the code: four routes |
| `PLT6-ConsentChanged` | A family has taken back filming consent |

Wording, sizes and colours are the boards'. The page background is `#faf5ec`. The confirmation line is the one drawn on the boards (dark green, a tick, bottom of the page, gone after about 3 seconds).

All 25 controls in the pack's table were pressed on this build at 1180 by 820. All 25 do what the table says; see `PLATFORM-MOMENTS-REPORT.csv`. Each page was compared with its picture: same layout, every tap target 44 or taller, no scrolling. The pack's pictures were drawn in a stand-in font, so a line or two breaks a few pixels differently in DM Sans.

**Ways in that were wired**

- `SI2-Code`: a new link, "Can't get the code?", under the junk-mail line. Tablet only. It was not in the build before; the label is the handover's.
- `SI6-NewDevice`: "I've changed my number" opened a blank form. It now opens `PLT5`.
- `PRM3-Bill`: a new small link under the price note, "When the plan ends", opens `PLT1`. **The handover says "from the bill" but names no control, so this label is ours. Please confirm or reword.**
- `PLT1` "Let it end" opens `PLT3`, as drawn.

**No way in, because no control is named and adding one would be new design:** `PLT2` (a payment is declined), `PLT4` (signing in after the plan has ended) and `PLT6` (a family takes back consent). These are things the system raises. They open by address only.

## Audit fixes

### a. Seven links to screens that never existed

Each control was pressed before anything was changed.

| Was | What happened when pressed | Change |
|---|---|---|
| `DP1-Pathway` on `PU1-PlayingUp` and `PX1-PlayingDown` (Pathway sub-tab) | Opened Fair game time | Now opens `PU1-PlayingUp` |
| `DP1-Pathway` on the other eight PU and PX screens | Already opened `PU1-PlayingUp` through `toolTargets.ts` | None |
| `DP1-Pathway` behind "The two teams" on the chair's home | Opened Fair game time, which is right for that button | The id is now `DP1-FairGameTime`. Same screen |
| `D7-SeasonPlan`, `D8-ClubStyle` on the four PRM screens | Already opened `FY1-SeasonPlan` and `S1-PlayingStyle` | None |
| `D7-SeasonPlan`, `D8-ClubStyle` on the director and chair home boards (`STO10`, `STO11`; pressed on `STO10`, same menu on both) | Opened older copies of the two screens | Now open `FY1-SeasonPlan` and `S1-PlayingStyle` |
| `D9-Heading`, `D10-Kit` | Not used anywhere in the build | None |
| `PU1-PlayerHome` (Back on `ECp3-PlayerLibrary`) | "Screen not yet built" | Now opens `PO1-OlderHome` |
| `PA-ParentHome` (Home tab on the old parent home) | The tab never used the id: Home returns to the old parent home | The id in the config now reads `FAM14-HomeWithClub`. Pressing Home is unchanged; see d |

The addresses `/__screen/DP1-Pathway`, `/__screen/D7-SeasonPlan`, `/__screen/D8-ClubStyle` and `/__screen/PA-ParentHome` still open what they did. Nothing links to them now.

### b. Screens with no way in

| Screen | Found | Done |
|---|---|---|
| `XG5-ClubChances` | The director has it at Teams, Results, "Chances and points". Nothing on Reports. `XG2` had no "Whole club" | "Whole club" added to `XG2-ChancesSeason`. No row added to Reports: it would be a second way to the same page. Say if you want it |
| `EC10-DirectorLibrary` | The director has it at Coaches, "Education centre", not under Club | None |
| `FN3-SeniorTeam` | No way in. The senior team cards could not be tapped | The Men's Reserves card on the director's Seniors list opens it. The other three cards do not, because `FN3` is drawn for Men's Reserves only |
| `ACC8p-PairCamera` | "Pair a camera" on the academy coach's empty Record page only said a line | It now opens `ACC8p` |
| `MSGp3-RefereeMessages` | The referee's home has a Messages tab that opens it. The `RF2-RefGames` board has no Messages control | None |
| `PRM5-CoachAsk` | The button on `PRM4-CoachOff` is labelled "Ask Rachel" and only said a line | It now opens `PRM5`. Label left as built |
| `PU7-CoachView` | No way in from Squad | **Not done.** The table names no label. Needs a decision on what the row says and which player shows it |
| `B1-CoachAndFitness` | No way in from Home | **Not done.** There is no "Jo" in the build (the fitness coach is Priya Shah), and the Home page has no slot for it |
| `CN2-SelfVsCoach` | It is inside Match day, Your take. The player profile has no link | Not added |
| `CN15-PositionHistory` | MiniRoos Squad has a "Positions" sub-tab that opens it. There is no "Positions played" on one child | Not added |
| `GS11-DrillSources`, `GS6-NothingToGoOn` | `GS2` had no link to `GS11`. `GS1` already shows `GS6` when there is nothing to go on | "Where this comes from" added to `GS2-DrillWhy` |
| `LN5-HowItWent`, `LN9-ClubCoachLearning` | Both are reachable: `LN5` inside the course, `LN9` at director, Coaches, "Coach learning" | None |
| `PO5s-AdultSettings` | The avatar on the older player's home opens the settings page that replaced it | None |
| `QCp1-BeforeKickOffPhone` | The coach's phone Home has a row that opens it in season. The `CPh4` board has no "Check the camera" | Not added |
| Player phone screens, "For you" list | No such list. The older player's home already links `CNp1`, `CNp5`, `CNp16` and the passport; the younger player's links `CNp3`; the Learn tab opens the player's Learn page. `ECp3`, `PUp2`, `LNp1`, `LNp2` and `CNp12` have no link from a player home | **Not done.** It needs a title and a line for each row, and the build has no setting for what the club has turned on |
| Old parent phone screens | Retired | Nothing added |

### c. Sign-in lands everyone on the coach home

**The demo's sign-in does not know who is signing in.** "Sign in" on `SI2-Code` stays on the code page, and "Finish signing in" on `SI6` says "Signing in." Nobody lands anywhere, so there is nothing to route by role. Nothing was changed. The demo's way into each role is the role picker. Routing by role belongs with real accounts.

### d. One parent app

- A parent who joins from a club invite (`JN-Join`, "I'm a parent or carer") now ends in the family app: "Go to Mia's week" opened a blank form and now opens `FAM14-HomeWithClub`.
- It opens the board address (`/__screen/FAM14-HomeWithClub`). The app's own address (`/family/FAM14-HomeWithClub`) shows the welcome page to a family with nothing saved, so it was not used. Change it in `JoinFlow.tsx` if the app should decide.
- The join steps before it (create a parent account, confirm the child, first-aid card, set up Mia's app) are the old parent flow, unchanged. The family arriving is Linh and Mia at Wattle Creek; the family app's sample family is Dana and Ari at Hillview.

**Places that still lead a person into the old parent app.** None were removed.

1. The role pickers (`STA3`, `STA3l`, `STA3e`, `STA3p`): the "Parent" row, as Linh Tran. It opens `/tour/parent`, `/look/parent` and `/sandbox/parent`.
2. `/look/parent`: the old home `STO17-HomeStoryParent`, or the old pre-season, tournament and rest-month parent pages by phase.
3. Tours in `tours.ts`: the parent tour (31 steps; at least 18 old parent screens); the story tour (`PA-Parent`, `PA-Check`); the settings tour (`PS1`, `PS2`, `PS3`); the football year and step 4 tours (four parent season pages each).
4. Coach-side "what parents see" links: `openThing` sends "parent view", "what they see" and "preview" to `PA-Parent`; Availability opens `AV2-ParentAvailability`; the season report opens `CNp9-SeasonReportParent`; the club colour boards open `KCp1` to `KCp3`.
5. Phone-side lines in `openThing` (inbox, team chat, photo consent, data, line-up) open `PM1`, `PM2`, `PM6`, `PM7`, `PM10`, `PS3` and `FBp2`.
6. Old parent screens that send each other home to `STO17`: the connected-club phones (`CNp9` to `CNp19`), the parent chances page, the parent line-up, the home library and the education phone's family side.
7. `PUp2-PlayerAsk` opens `PUp1-ParentAsk`; the Ask phone boards open `FILp1` and `MSGp1`.
8. The join flow's parent steps, above.

### e. Known inconsistencies: coach navigation

The live coach apps all read Home, Squad, Training, Match day, Record, Learn (junior, MiniRoos, youth, seniors, assistant, fitness). The goalkeeper coach reads "Keepers" in place of Squad. These older drawn boards disagree:

- The chances boards opened by id (`XG1` to `XG4`): Home, Squad, Training, Match day, Clips, Record.
- The fault pages (`ER1` to `ER5`): Home, Squad, Training, Match day, Clips.
- Older MiniRoos boards (`PRM4-CoachOff`, the `HM` and `STMs` sets): "Game day", with Clips.
- `/look/<coach>/clips` and `/look/miniroos/gameday` are still accepted as addresses.

Nothing was changed for this.

## For the owner to decide

- **The billing owner's name.** The boards say Rosa Marin (`PLT4`, `PLT5`). The build's director and billing owner is Rachel Moore, also "RM". The pages are built as drawn.
- **The card.** `PLT2` says the card ending 4410. The bill says 4821.
- **"Open in read-only"** opens the coach app as normal. Nothing in the build is read-only.
- **`PLT6` "Done"** opens U12 Sam's Home, as the table says. The screen is about U11 Luke's team.
- **"Keep the plan"** says a line on `PLT1` and opens Features by team on `PLT3`. Built as wired.
- **`PLT6` is built but must not go live** until the privacy review has covered taking back consent (handover, "Do not ship yet").
- The label "When the plan ends" on the bill, and whether "Can't get the code?" should also be on the wrong-code page and the phone sign-in.
- Whether the old parent app's entries in the list above come out.

## Checks

- Pressed: all 25 platform controls; both sign-in entry points and the bill link; every changed link in a; the new or rewired controls in b (`FN3`, `ACC8p`, `PRM5`, `GS11`, "Whole club" from the coach's and the director's side); the parent join path to its end.
- Read in the code only: `GS6` from `GS1`, `LN5`, `LN9`, `CN2` inside Match day, the coach phone's row to `QCp1`, and the list of old parent entries.
- `npx tsc -b` is clean outside `src/screens/family/`. `npx oxlint` on the changed files shows no new warnings.
- Scripts: `plt-sweep.mjs`, `plt-press.mjs` and `plt-labels.mjs` in the session's `pw` folder.
