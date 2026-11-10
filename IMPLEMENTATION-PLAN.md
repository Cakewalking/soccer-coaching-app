# Clean Sheet — implementation plan

Design source: v93 (10 Nov 2026). 510 screens across 6 product areas.
Handover folder: `/tmp/design-handoff-v3/clean-sheet-design/`

Each bucket is one coding session. Source files for every screen are in
`source/<screen>.dc.html` and `text/<screen>.txt`. PNGs are in `screens/<section>/`.

---

## Status: completed

| Bucket | What | Screens |
|---|---|---|
| 1 | Empty states across ClubAdmin and MiniRoos | X1, X2, X4, X7, X14, XP1, D0–D6 empties, HM1–4 empties |
| 2 | Missing portals (Goalkeeper Coach, Seniors/Youth Coach, Coordinator, Welfare) | GoalkeeperCoachApp, SeniorsYouthCoachApp, CoordinatorPortal |
| 3 | Hosted-demo tour mode | demo/DemoApp, demo/GuidedTour (DEMO-Start skeleton) |
| 4 | Missing screens (Rollover, Season Summaries, Older Player, Referee) | DRo1, SE1, PO1–PO5, RF1–RF4 |
| 5 | Fitness coach age variants (U12/U14/U13G/U16), Fitness Level tab, Growth/Injuries detail | FitnessCoachScreen full rewrite |
| 6 | Drill library redesign to match v93 layout | DrillLibraryMain, data.ts short labels |

---

## Remaining work — 23 buckets, ~430 screens

Ordered by impact: core product first, infrastructure and empties last.

---

### Bucket 7 · Team Chat — coach tablet side  *(~15 screens)*

The most visible missing feature. Replaces the team's messaging group.

| Screen | File | Notes |
|---|---|---|
| CH1-TeamChat | `text/CH1-TeamChat.txt` | Main chat view — poll, photo, voice, reactions, reply |
| CH2-Announcements | `text/CH2-Announcements.txt` | Who's seen it, nudge the rest |
| CH3-NewChat | `text/CH3-NewChat.txt` | Owner sets who can post |
| CH4-NewPoll | `text/CH4-NewPoll.txt` | Poll that fills availability |
| CH5-PollResults | `text/CH5-PollResults.txt` | |
| CH6-Media | `text/CH6-Media.txt` | Photos, videos and files |
| CH7-PhotoCheck | `text/CH7-PhotoCheck.txt` | Consent check before sending photo |
| CH8-ChatInfo | `text/CH8-ChatInfo.txt` | People, rules, mute, pause |
| CH9-MessageActions | `text/CH9-MessageActions.txt` | Press-and-hold sheet |
| CHm1-TeamChatMiniRoos | `text/CHm1-TeamChatMiniRoos.txt` | MiniRoos family chat |
| CH1e, CH2e, CH5e, CH6e, CHm1e | empties | First-use states |

New file: `src/screens/TeamChatScreen.tsx`

---

### Bucket 8 · Team Chat — phone side  *(~20 screens)*

Parent and player phone views of the same chat.

| Screen | File | Notes |
|---|---|---|
| PM1-ParentChats | `text/PM1-ParentChats.txt` | Message list |
| PM2-ParentTeamChat | `text/PM2-ParentTeamChat.txt` | Inside a chat |
| PM3-ParentAnnouncements | `text/PM3-ParentAnnouncements.txt` | |
| PM4-ParentPoll | `text/PM4-ParentPoll.txt` | Vote in a poll |
| PM5-ParentAttach | `text/PM5-ParentAttach.txt` | Add photo/video/voice |
| PM6-ParentChatSettings | `text/PM6-ParentChatSettings.txt` | |
| PM7-ParentReport | `text/PM7-ParentReport.txt` | Report a message |
| PM8-ParentReadOnly | `text/PM8-ParentReadOnly.txt` | When parents can't post |
| PM9-ParentPrivateChat | `text/PM9-ParentPrivateChat.txt` | Private with the coach |
| PM10-ParentPhotoCheck | `text/PM10-ParentPhotoCheck.txt` | Consent before sending |
| PO6-OlderChats | `text/PO6-OlderChats.txt` | Player 15+ message list |
| PO7-OlderGroup | `text/PO7-OlderGroup.txt` | Players-and-coaches group |
| PK1-YoungNews | `text/PK1-YoungNews.txt` | Player under 15 — news only |
| TM12-ManagerSetUpChat | `text/TM12-ManagerSetUpChat.txt` | Manager sets up chat |
| TM13-ManagerPoll | `text/TM13-ManagerPoll.txt` | Poll that fills the roster |
| TM14-ManagerTeamChat | `text/TM14-ManagerTeamChat.txt` | Manager as chat owner |
| PM1e, PM2e, PM9e | empties | |

Update: `src/screens/playerapp/PlayerAppScreen.tsx`, `src/screens/teammanager/TeamManagerScreen.tsx`
New: `src/screens/ParentChatScreen.tsx`

---

### Bucket 9 · Record & Measure  *(~14 screens)*

Film a game, drill or warm-up; see results against last time.

| Screen | File | Notes |
|---|---|---|
| RC1-RecordStart | `text/RC1-RecordStart.txt` | Choose what to record |
| RC2-RecordFriendly | `text/RC2-RecordFriendly.txt` | Does a friendly count? |
| RC3-RecordDrill | `text/RC3-RecordDrill.txt` | Set up and measures |
| RC4-Recording | `text/RC4-Recording.txt` | Live recording — no top bar |
| RC5-RecordResults | `text/RC5-RecordResults.txt` | Results vs last time |
| RC6-RunHistory | `text/RC6-RunHistory.txt` | All runs, run again |
| RC7-Recorded | `text/RC7-Recorded.txt` | Everything recorded |
| RC8-HowWeMeasure | `text/RC8-HowWeMeasure.txt` | Reference for every measure |
| RCm1-RecordMiniRoos | `text/RCm1-RecordMiniRoos.txt` | MiniRoos: film for clips |
| RCm2-MiniRoosClips | `text/RCm2-MiniRoosClips.txt` | A best moment each |
| RC1e, RC4e, RC5e, RC6e, RC7e, RCm2e | empties | |

New file: `src/screens/RecordScreen.tsx`

---

### Bucket 10 · Suggestions  *(~11 screens)*

Clean Sheet suggests drills from the last game, trend, sensor load, coach notes.

| Screen | File | Notes |
|---|---|---|
| SG1-Suggested | `text/SG1-Suggested.txt` | Ranked list with reasons + evidence strength |
| SG2-WhySuggested | `text/SG2-WhySuggested.txt` | Evidence behind one suggestion |
| SG3-AskCleanSheet | `text/SG3-AskCleanSheet.txt` | Ask in plain words |
| SG4-WhatItUses | `text/SG4-WhatItUses.txt` | What it uses and never does |
| SG5-WhatWorked | `text/SG5-WhatWorked.txt` | Drills followed by better numbers |
| SGm1-SuggestedMiniRoos | `text/SGm1-SuggestedMiniRoos.txt` | From taps, no numbers |
| SG1e, SG3e, SG5e, SGm1e | empties | |

New file: `src/screens/SuggestionsScreen.tsx`

---

### Bucket 11 · Academy Owner  *(~22 screens)*

Owner: home, programs, trials, players, fees, coaches, reports, clinic, safety, partner club, broadcast.

| Screen | File |
|---|---|
| AC1-AcademyHome | `text/AC1-AcademyHome.txt` |
| AC2-Programs | `text/AC2-Programs.txt` |
| AC3-Trials | `text/AC3-Trials.txt` |
| AC4-AcademyPlayers | `text/AC4-AcademyPlayers.txt` |
| AC5-Fees | `text/AC5-Fees.txt` |
| AC6-AcademyCoaches | `text/AC6-AcademyCoaches.txt` |
| AC7-ReportsOut | `text/AC7-ReportsOut.txt` |
| AC9-HolidayClinic | `text/AC9-HolidayClinic.txt` |
| AC10-AcademySafety | `text/AC10-AcademySafety.txt` |
| AC11-PartnerClub | `text/AC11-PartnerClub.txt` |
| AC12-AcademyBroadcast | `text/AC12-AcademyBroadcast.txt` |
| AC1e–AC12e (all empties) | see source/ |

New file: `src/screens/academy/AcademyOwnerScreen.tsx`

---

### Bucket 12 · Academy Coach  *(~22 screens)*

Coach: today, session, trial assess, player plan, one-on-one, report, game day, record, results, suggestions, chat.

| Screen | File |
|---|---|
| ACC1-CoachToday | `text/ACC1-CoachToday.txt` |
| ACC2-RunSession | `text/ACC2-RunSession.txt` |
| ACC3-TrialAssess | `text/ACC3-TrialAssess.txt` |
| ACC4-PlayerPlan | `text/ACC4-PlayerPlan.txt` |
| ACC5-OneOnOne | `text/ACC5-OneOnOne.txt` |
| ACC6-ReportDraft | `text/ACC6-ReportDraft.txt` |
| ACC7-AcademyGameDay | `text/ACC7-AcademyGameDay.txt` |
| ACC8-AcademyRecord | `text/ACC8-AcademyRecord.txt` |
| ACC9-AcademyRecordDrill | `text/ACC9-AcademyRecordDrill.txt` |
| ACC10-AcademyRecordResults | `text/ACC10-AcademyRecordResults.txt` |
| ACC11-AcademyRecording | `text/ACC11-AcademyRecording.txt` |
| ACC12-AcademySuggested | `text/ACC12-AcademySuggested.txt` |
| ACC13-AcademyChat | `text/ACC13-AcademyChat.txt` |
| ACC1e–ACC13e (all empties) | see source/ |

New file: `src/screens/academy/AcademyCoachScreen.tsx`

---

### Bucket 13 · Academy Parent & Player  *(~22 screens)*

Parent: book trial, offer, fees, report, home, make-up, clinic, concern, chat, share with club.
Player: home, home practice.

| Screen | File |
|---|---|
| ACP1-BookTrial | `text/ACP1-BookTrial.txt` |
| ACP1b-TrialBooked | `text/ACP1b-TrialBooked.txt` |
| ACP2-Offer | `text/ACP2-Offer.txt` |
| ACP3-AcademyParentHome | `text/ACP3-AcademyParentHome.txt` |
| ACP4-ParentFees | `text/ACP4-ParentFees.txt` |
| ACP5-ProgressReport | `text/ACP5-ProgressReport.txt` |
| ACP6-MakeUp | `text/ACP6-MakeUp.txt` |
| ACP7-ShareWithClub | `text/ACP7-ShareWithClub.txt` |
| ACP8-BookClinic | `text/ACP8-BookClinic.txt` |
| ACP9-JoinGameTeam | `text/ACP9-JoinGameTeam.txt` |
| ACP10-AcademyConcern | `text/ACP10-AcademyConcern.txt` |
| ACP11-AcademyParentChat | `text/ACP11-AcademyParentChat.txt` |
| ACK1-AcademyPlayerHome | `text/ACK1-AcademyPlayerHome.txt` |
| ACK2-HomePractice | `text/ACK2-HomePractice.txt` |
| ACP3e, ACP4e, ACP5e, ACP8e, ACP11e, ACK1e, ACK2e | empties |

New files: `src/screens/academy/AcademyParentApp.tsx`, `src/screens/academy/AcademyPlayerApp.tsx`

---

### Bucket 14 · MiniRoos new screens  *(~16 screens)*

Six new tabs added to the MiniRoos coach view.

| Screen | File | Notes |
|---|---|---|
| HM5-WhatWeSaw | `text/HM5-WhatWeSaw.txt` | Coach notes after a game |
| HM5b-ThankParents | `text/HM5b-ThankParents.txt` | Phone — thank parents after game |
| HM6-SeasonNotes | `text/HM6-SeasonNotes.txt` | Season-long notes |
| HM7-InboxMiniRoos | `text/HM7-InboxMiniRoos.txt` | Inbox for MiniRoos coach |
| HM8-CalendarMiniRoos | `text/HM8-CalendarMiniRoos.txt` | Calendar tab |
| HM9-FixturesMiniRoos | `text/HM9-FixturesMiniRoos.txt` | Fixtures, no scores |
| HM10-StaffMiniRoos | `text/HM10-StaffMiniRoos.txt` | Team staff tab |
| HM11-ComingMiniRoos | `text/HM11-ComingMiniRoos.txt` | Who's coming |
| HM12-ConsentMiniRoos | `text/HM12-ConsentMiniRoos.txt` | Consent (3 questions) |
| HM6e, HM7e, HM8e, HM9e, HM10e, HM11e, HM12e | empties | |

Update: `src/screens/miniroos/MiniRoosScreen.tsx` (add new tabs)

---

### Bucket 15 · Fitness & Goalkeeper Coach extras  *(~12 screens)*

Growth measuring session, test mode, test results over time, goalkeeper coach home and session.

| Screen | File |
|---|---|
| GT2-MeasureSession | `text/GT2-MeasureSession.txt` |
| TL2-TestMode | `text/TL2-TestMode.txt` |
| TL3-TestResults | `text/TL3-TestResults.txt` |
| PE1-EffortRating | `text/PE1-EffortRating.txt` |
| B1-CoachAndFitness | `text/B1-CoachAndFitness.txt` |
| HG1-HomeKeeperCoach | `text/HG1-HomeKeeperCoach.txt` |
| HG2-KeeperSession | `text/HG2-KeeperSession.txt` |
| F3e-FitnessTrainingEmpty | `text/F3e-FitnessTrainingEmpty.txt` |
| F4e-FitnessMatchEmpty | `text/F4e-FitnessMatchEmpty.txt` |
| GT1e-GrowthEmpty | `text/GT1e-GrowthEmpty.txt` |
| HG1e, HG2e, TL3e | empties | |

Update: `src/screens/FitnessCoachScreen.tsx` (add TL tabs, GT2 modal)
Update: `src/screens/GoalkeeperCoachApp.tsx` (add HG2 session screen)

---

### Bucket 16 · Youth and Senior Coach homes + Co-coach  *(~10 screens)*

New home screens for different team levels, plus co-coach view.

| Screen | File |
|---|---|
| HY1-HomeYouth | `text/HY1-HomeYouth.txt` |
| HS1-HomeSeniors | `text/HS1-HomeSeniors.txt` |
| CC1-CoachHomeShared | `text/CC1-CoachHomeShared.txt` |
| CC1e-CoachHomeSharedEmpty | `text/CC1e-CoachHomeSharedEmpty.txt` |
| DCo1-CoordinatorHome | `text/DCo1-CoordinatorHome.txt` |
| DCo1e-CoordinatorHomeEmpty | `text/DCo1e-CoordinatorHomeEmpty.txt` |
| DW1e-WelfareCasesEmpty | `text/DW1e-WelfareCasesEmpty.txt` |
| SE1e-SeasonSummariesEmpty | `text/SE1e-SeasonSummariesEmpty.txt` |

Update: `src/screens/HomeScreen.tsx` (add HY1/HS1 variants)
Update: `src/screens/CoordinatorPortal.tsx` (match v93 layout)

---

### Bucket 17 · Updated tablet core screens  *(~20 screens)*

Changes to core screens since v82. Match new layout from PNGs.

| Screen | Key change |
|---|---|
| T1-TabletTraining | Last game one tap away; inbox badge |
| T3-TrainingTab | Updated |
| T5-PlayerProfile | Updated |
| C1-ClipsTab | By measure view updated |
| I1-Inbox | Updated |
| S1-PlayingStyle | Updated |
| WK1-ThisWeek | Updated |
| CF1-Fixtures | Updated |
| AV2-ParentAvailability | Updated |
| DRo1-Rollover, DRo1e-RolloverEmpty | Match v93 |

Update: `src/screens/HomeScreen.tsx`, `TrainingScreen.tsx`, `ClipsScreen.tsx`, `InboxScreen.tsx`, `OurStyleScreen.tsx`, `ThisWeekScreen.tsx`, `FixturesScreen.tsx`, `AvailabilityScreen.tsx`, `RolloverScreen.tsx`

---

### Bucket 18 · Director view updates + Club Settings  *(~25 screens)*

Updated D7-* read-only team pages (12 teams), Director overview, Calendar, CompareTeams, new DSet screens.

| Screen | File |
|---|---|
| D3-Coaches | Updated |
| D7-U7 through D7-U16 (12 screens) | Each team's read-only page |
| DC1-Calendar | Updated |
| DX1-CompareTeams | Updated |
| DSet4-ClubRules | New |
| DSet5-ClubPlan | New |
| DSet6-PartnerAcademy | New |
| D0-ClubEmpty, D0c-ChairWelcome | Updated |
| DSet4e, DSet6e | empties |

Update: `src/screens/clubadmin/ClubAdminScreen.tsx`
New: `src/screens/clubadmin/ClubSettingsExtra.tsx`

---

### Bucket 19 · Team Manager updates + Phone new screens  *(~18 screens)*

Manager gets chat setup screens; older player gets home and load screens.

| Screen | File |
|---|---|
| TM3-ManagerChange | Updated |
| TM5-ManagerMessages | Updated |
| TM11-GameDayPapers | Updated |
| PO1-OlderHome | New phone home |
| PO1e-OlderHomeEmpty | |
| PO4-OlderLoad | Load screen |
| PO4e-OlderLoadEmpty | |
| PO5-AdultPlayerHome | Adult player home |
| PP1-TwoChildren | Parent with two children |
| PP2-SeasonSummary | Phone season summary |
| PP2e-SeasonSummaryEmpty | |

Update: `src/screens/teammanager/TeamManagerScreen.tsx`
Update: `src/screens/playerapp/PlayerAppScreen.tsx`

---

### Bucket 20 · Settings & Sign-up updates  *(~20 screens)*

All 7 coach settings screens updated; parent and player settings; sign-up updated.

| Screen | File |
|---|---|
| SET1–SET7 | All changed in v93 |
| DSet1–DSet3 | Club settings updated |
| PS1–PS4 | Phone parent/player settings |
| OB-SignUp, OB1–OB5 | Sign-up flow updated |
| XP1-PlayerEmpty | Updated |

Update: `src/screens/settings/SettingsScreen.tsx`
Update: `src/screens/SignupScreen.tsx`

---

### Bucket 21 · Hosted demo shell & sign-in  *(~10 screens)*

The 48px bar and the front door for the hosted demo.

| Screen | File | Notes |
|---|---|---|
| DEMO-SignIn | `text/DEMO-SignIn.txt` | Front door: demo or sandbox |
| DEMO-Shell | `text/DEMO-Shell.txt` | Tablet bar (every demo screen) |
| DEMO-ShellPhone | `text/DEMO-ShellPhone.txt` | Phone bar |
| DEMO-ShellSandbox | `text/DEMO-ShellSandbox.txt` | Sandbox bar |
| DEMO-StartEmpty | `text/DEMO-StartEmpty.txt` | Sandbox role picker |
| DEMO-Phone | `text/DEMO-Phone.txt` | Phone start (QR code lands here) |
| DEMO-Why | `text/DEMO-Why.txt` | Why trust it |

Update: `src/screens/demo/DemoApp.tsx`

---

### Bucket 22 · Demo tours  *(~22 screens)*

20 role tours + Story tour. Each is a step-by-step walkthrough driven by `flows.json`.

| Screen | Role |
|---|---|
| DEMO-Start | Role picker (changed) |
| DEMO-Story | The idea in 1 minute |
| DEMO-TourCoachMiniroos | MiniRoos coach |
| DEMO-TourCoach | Junior coach |
| DEMO-TourCoachYouth | Youth coach |
| DEMO-TourCoachSeniors | Senior coach |
| DEMO-TourCoCoach | Co-coach |
| DEMO-TourFitness | Fitness coach |
| DEMO-TourKeeperCoach | Goalkeeper coach |
| DEMO-TourManager | Team manager |
| DEMO-TourParent | Parent |
| DEMO-TourPlayerYoung | Player under 15 |
| DEMO-TourPlayerOlder | Player 15+ |
| DEMO-TourDirector | Director of football |
| DEMO-TourChair | Chair |
| DEMO-TourCoordinator | Club coordinator |
| DEMO-TourWelfare | Welfare officer |
| DEMO-TourAcademyOwner | Academy owner |
| DEMO-TourAcademyCoach | Academy coach |
| DEMO-TourAcademyParent | Academy parent |
| DEMO-TourAcademyPlayer | Academy player |
| DEMO-TourReferee | Referee |

Source: `flows.json` has every step and screen.
Update: `src/screens/demo/GuidedTour.tsx`

---

### Bucket 23 · Remaining empty states  *(~50 screens)*

All empties not built in earlier buckets. Quick to build: static layouts with an empty-state card.

Covers: `DB2e, DB3e, DB4e, DC1e, DK1e, EX1e, X5, TR1e, X8, TC1e, DM1e, DN1e, DP1e, DR1e, AV1e, X15, X16, X17, DS1e, DS2e, DT1e, AV2e, DX1e, FC1e, FF1e, X12, FG1e, FK1e, FM1e, FN1e, FR1e, X13, FS1e, FT1e (Trials), FV1e, FW1e, FY1e, PAe-ClipsEmpty, PAe-GoalsEmpty, PAe-ParentEmpty, PO2e, PO4e, RF4e, F2-FitnessSquad, F5-FitnessReview (archive)`

---

## Screen count summary

| Bucket | Screens |
|---|---|
| 7 — Team Chat tablet | ~15 |
| 8 — Team Chat phone | ~20 |
| 9 — Record & Measure | ~14 |
| 10 — Suggestions | ~11 |
| 11 — Academy Owner | ~22 |
| 12 — Academy Coach | ~22 |
| 13 — Academy Parent & Player | ~22 |
| 14 — MiniRoos new screens | ~16 |
| 15 — Fitness & Keeper extras | ~12 |
| 16 — Youth/Senior/Co-coach homes | ~10 |
| 17 — Updated tablet core | ~20 |
| 18 — Director + Club Settings | ~25 |
| 19 — Team Manager + Phone updates | ~18 |
| 20 — Settings & Sign-up updates | ~20 |
| 21 — Demo shell & sign-in | ~10 |
| 22 — Demo tours | ~22 |
| 23 — Remaining empty states | ~50 |
| **Total remaining** | **~329** |
| **Already done (Buckets 1–6)** | ~180 |
| **Grand total** | **~510** |

---

## Rules to follow in every bucket

From `README.md`:

- Font DM Sans. Tap targets ≥ 44 px.
- Greens only: `#2f6252`, `#40826d`, `#1f4a3e`. Ink `#10211f`. Muted `#4a5a57`. Lines `#c5c8c4` / `#e9eae8`. Pale green `#eef5f2`. Rose `#c39797`. Sand `#cbbeb5`.
- No text on `#9d7c80` (mauve) or `#738678` (moss).
- All data fictional. Wattle Creek FC. Tall Timber Football Academy. Never swap in real clubs or people.
- Build command: `npx tsc -b`. Must be clean before committing.
- Tablet screens 1180 px wide. Phone screens 390 px wide.
- Every page has an empty state.
- Plain language, sentence case.
- Under 12: clips only, no scores, no rankings, no sensors, no style numbers.
- Rankings appear from U13 only.
- Equal game time enforced up to U13.
