# Clean Sheet: fix list for the production site

Checked 11 November 2026, 5:40 pm to 6:40 pm, on https://soccer-coaching-app-six.vercel.app/ (build `index-DCyQI1VH.js`). For the coding agent. **This is the one current list.** It replaces the earlier crawl files. Use `NEW-DESIGNS.md` and `BUILD-DEMO.md` for how each thing should work, and `source/`, `screens/`, `text/` for each screen.

## How this was checked

- **Demo, first screen of every role:** all 20 roles, up to 24 buttons each, about 330 presses.
- **Demo, one tap in:** 9 screens (junior coach Squad, Training, Match day, Clips, Calendar, Our style, Team staff; youth Match day; director Teams and Safeguarding), 18 buttons each.
- **Guided tours:** all 308 steps opened and compared with the other steps in the same tour.
- **Sandbox:** started from the front page; all 20 roles opened; every button on the junior coach's Home pressed; Fill and Reset pressed.
- **Wording:** the 73 screens missing at 4:30 pm searched for again in the build.
- **Limits:** a button counts as dead when nothing on the page changes. A tour step counts as wrong only when it repeats another step's screen. Screens two or more taps in were mostly not opened. Phone roles were checked on their first screen only, and the parent's first screen could not be tested reliably. Layout was not compared with the design by eye.

## Fixed since 4:30 pm (do not redo)

- The director and chair no longer have the Welfare menu.
- The chair has their own, smaller menu.
- Coach Home: every button now does something. The same for MiniRoos, senior, co-coach, goalkeeper coach, team manager, both players, director, chair and referee on their first screen.
- Pre-season, post-season and rest month keep the top bar and tabs.
- Tours: 189 wrong steps down to 44.
- Sandbox end date is worked out (Wednesday 25 November), not fixed text.

## To fix, most serious first

### 1. The sandbox still cannot be used

A visitor can open it but cannot do anything in it.

- **Junior coach Home: all 8 buttons dead.** "Add players", "Add fixtures", "Connect", "Pair devices", "Turn on", "Book a 15-minute call", "Set our style", "Open inbox". There is also no top bar (Home, Squad, Training, Match day, Clips), so there is nowhere else to go.
- **"Fill" and "Reset" do nothing.**
- **Wrong person on two coach roles.** Youth coach and Senior coach both open "Welcome to Clean Sheet, Sam · U12 Sam", the junior coach's screen. They should open as Ollie (U16 Ollie) and Marko (Men's 1sts).
- **Player under 15 says "Hi Harper".** It should be Mia.
- **Six roles still show the demo club instead of an empty one:** Fitness coach, Parent, Player 15 and over, Academy coach, Academy parent, Academy player. Referee shows a real-looking game request. (Found by looking for demo names; check the other roles by eye too.)

What it must do, as a first working version (`BUILD-DEMO.md` steps 2, 5, 6 and 7):

1. Coach can add a team, add players, add a fixture and plan a session. Each is saved in the browser.
2. Every role reads that same data. Each screen shows its empty design until its list has rows, then its full design.
3. "Fill" loads the sample club into the sandbox. "Reset" asks, then empties it.
4. Every role opens as its own person on its own empty Home, inside its normal frame with its top or bottom bar.

Done when: start empty → add a team and three players as the coach → switch to Parent → the team is there. Fill → every role has data. Reset → every role is empty again.

### 2. Guided tours: 44 steps still show another step's screen

Most are the joining and sign-up steps: the tour shows the first screen of the flow for every step in it. The whole "Player 15 and over" tour (7 of 8 steps) shows one screen.

| Tour | Step | Shows the same screen as | Should show |
|---|---|---|---|
| MiniRoos | 2. Find the club | step 1, Create account and children check | `OB2-SignUp` |
| MiniRoos | 3. Set up the team | step 1, Create account and children check | `OB3-SignUp` |
| MiniRoos | 4. Invite a manager | step 1, Create account and children check | `OB4-SignUp` |
| Juniors | 2. Account and children check | step 1, Welcome | `OB1-SignUp` |
| Juniors | 3. Team and division | step 1, Welcome | `OB3-SignUp` |
| Juniors | 4. Invite staff | step 1, Welcome | `OB4-SignUp` |
| Juniors | 5. Ready | step 1, Welcome | `OB5-SignUp` |
| Juniors | 9. Consent by player | step 8, Add players | `P1-Consent` |
| Juniors | 10. Home on Sunday | step 6, First-use home | `T1s-HomeSunday` |
| Juniors | 14. Clips | step 13, Check unsure moments | `C1-ClipsTab` |
| Juniors | 24. Home on training day | step 6, First-use home | `T1-TabletTraining` |
| Juniors | 25. Tonight’s plan | step 22, Session plans | `T3-TrainingTab` |
| Juniors | 47. Home on game day | step 6, First-use home | `T1g-HomeGameDay` |
| Juniors | 52. Squad | step 8, Add players | `T4-SquadTab` |
| Juniors | 53. Player profile | step 8, Add players | `T5-PlayerProfile` |
| Seniors and NPL | 2. Registration window and clearances | step 1, Senior teams | `FN2-SeniorSquad` |
| Seniors and NPL | 3. Home | step 1, Senior teams | `HS1-HomeSeniors` |
| Seniors and NPL | 4. Squad load | step 1, Senior teams | `FN2-SeniorSquad` |
| Fitness coach | 6. Measuring session | step 5, Growth | `GT2-MeasureSession` |
| Team manager | 2. Account | step 1, Invite | `IV1-Invite` |
| Team manager | 3. Children check | step 1, Invite | `IV2-Invite` |
| Team manager | 4. What you’ll see | step 1, Invite | `IV3-Invite` |
| Team manager | 5. You’re in | step 1, Invite | `IV4-Invite` |
| Team manager | 18. Sideline report | step 17, Head knock | `TM8-SidelineReport` |
| Parent or carer | 2. Account | step 1, Invite | `JN1-Join` |
| Parent or carer | 3. Confirm your child | step 1, Invite | `JN2-Join` |
| Parent or carer | 7. You’re in | step 6, Set up your child’s app | `JN5-Join` |
| Player under 15 | 12. Write to the welfare officer | step 11, You can tell someone | `PC2b-TellHelen` |
| Player 15 and over | 2. Own account, adult | step 1, Own account, 15 to 17 | `JN9a-Join` |
| Player 15 and over | 3. Home for older players | step 1, Own account, 15 to 17 | `PO1-OlderHome` |
| Player 15 and over | 4. Messages | step 1, Own account, 15 to 17 | `PO6-OlderChats` |
| Player 15 and over | 5. Players and coaches group | step 1, Own account, 15 to 17 | `PO7-OlderGroup` |
| Player 15 and over | 6. Message the coach, parent copied | step 1, Own account, 15 to 17 | `PO2-OlderMessage` |
| Player 15 and over | 7. Say if you’re available | step 1, Own account, 15 to 17 | `PO3-OlderAvailability` |
| Player 15 and over | 8. My load and tests | step 1, Own account, 15 to 17 | `PO4-OlderLoad` |
| Club coordinator | 3. Home | step 1, First-use home | `DCo1-CoordinatorHome` |
| Welfare officer | 5. My cases | step 4, From the sideline | `DW1-WelfareCases` |
| Welfare officer | 8. Sideline reports | step 4, From the sideline | `FS1-Sideline` |
| Academy owner | 7. Programs and waiting list | step 2, Add programs | `AC2-Programs` |
| Academy owner | 9. Home: what needs you | step 3, Child safety, six things | `AC1-AcademyHome` |
| Academy coach | 12. Plan, goal and whole week | step 11, A new player’s plan | `ACC4-PlayerPlan` |
| Academy coach | 13. One-on-one, in open view | step 11, A new player’s plan | `ACC5-OneOnOne` |
| Academy player | 2. Practice at home | step 1, Home: my goal and skills | `ACK2-HomePractice` |
| Academy player | 3. Before a goal is set | step 1, Home: my goal and skills | `ACK1e-AcademyPlayerHomeEmpty` |

Each step must show the `screen` named for it in `flows.json`, in the state the design shows. Notes:

- "First-use home", "Home on Sunday", "Home on training day" and "Home on game day" are four different states of coach Home. First-use is the empty state (`X1-HomeEmpty`).
- The `OB…`, `IV…` and `JN…` screens are one step each of a flow. Build each as its own screen.
- The 264 steps not listed here were only tested for repeats. Check a sample by eye against the pictures.

Add a test: within a tour, two steps with different `screen` values in `flows.json` must not render the same screen.

### 3. Buttons that do nothing, one tap in

First screens are now clean for most roles. One level down they are not.

| Role | Screen | Dead |
|---|---|---|
| Junior coach | Squad | "Message parents", "+ Add player", "All 16" |
| Junior coach | Training | "Edit plan" |
| Junior and youth coach | Match day | "Minutes plan", "Record", "Edit talk", "START" |
| Junior coach | Clips | "By measure", one icon button |
| Junior coach | Calendar | all three event rows, "Remind 2 families", "Pick the line-up" |
| Junior coach | Our style | all six style cards: "Keep the ball", "Build from the back", "Get forward fast", "Press high", "Hold a compact middle", "Protect our goal" |
| Junior coach | Team staff | "Email Priya a reminder" |
| Youth and senior coach | every screen | "← Switch view" |
| Club coordinator | Home | "Message all managers", "Saturday run sheet", "Ask again", "Ask families", "Check", "Remind", "View", "Calendar", "← Coach view" |
| Welfare officer | My cases | the case row ("Mia Tran · U12 Sam") does not open |
| Academy owner | Home | "Share the trial link", "+ New program", "Remind Ben" |
| Academy coach | Today | "Group chats", "Message Dani" |
| Fitness coach | Home | the "U12 Sam" team button |

Not re-tested this time, so assume they still stand (from the 11 am check): MiniRoos Squad, Training, Game day and Swap a game; goalkeeper coach Training and Clips; academy owner "Message families"; player under 15 News reactions, "Got it", "Reply"; referee "Nothing to report".

Every button must open a screen, open a sheet, or show the message the design gives it. The design's message for each button is in `source/<screen>.dc.html` in the `ACTS` list.

Add a test that opens each role, presses every button on Home and on each tab, and fails on any that changes nothing.

### 4. A wrong address goes to the front page

`/look/coach/anything` quietly returns to the start screen. It should show `ER4-NotFound` (already built). An address the role may not open should show `ER5-NoAccess`. Confirm the welfare cases screen cannot be reached by a director or chair by typing its address, not only that the menu item is gone.

### 5. Addresses still stop at the role

Squad, a player, Training, a clip: all stay at `/look/coach`. Reload goes back to Home and the back button leaves the role. Give each screen its own address under the role, for example `/look/coach/squad` and `/look/coach/squad/mia-tran`. The same for `/sandbox/…` and `/tour/…` (a tour step should be linkable: `/tour/coach/12`).

### 6. The coach's Calendar uses today's date

Calendar shows "Sat 7 Nov", "Sat 14 Nov". Everywhere else the demo is fixed at Thursday 4 June with a game on Saturday 6 June. Use the demo's dates everywhere (`README.md` has them), or the screens contradict each other.

### 7. Co-coach still opens the head coach's Home

Jess Marsh sees Sam's Home with the same tabs and buttons. The design: `CC1-CoachHomeShared` in season and `SPc2-CoCoachPreSeason` in pre-season. Each job shows whose it is; squad, style and goals stay with the head coach; wellness shows as a count.

### 8. Tap targets under 44 px

| Role | Under 44 px on the first screen |
|---|---|
| Director | 31 of 31 |
| Chair | 16 of 16 |
| Welfare officer | 19 of 25 |
| Youth and senior coach | 11 of 17 |
| Junior coach and co-coach | 9 of 24 |
| Academy owner | 9 of 14 |
| Club coordinator | 9 of 16 |
| Fitness coach | 7 of 11 |

Measured in a 1225 px wide window. Every button, tab and link must be at least 44 px high. Add a test that fails on any that is not.

### 9. Screens still not in the build: 73, none added since 4:30 pm

Found by searching the build for each screen's wording, so open the picture before building in case it exists with different words.

**Designed today (28):**
- Sign-in: `SI5-TooManyTries`
- Coach on the phone: `CPh2-CoachPhoneComing`, `CPh3-CoachPhoneMessages`, `CPh4-CoachPhoneGame`, `CPh5-CoachPhonePlan`, `CPh1e`, `CPh4e`
- Coaches through the year: `SPy10`, `SPy16`, `SPs10`, `SPs16`, `SPm2`, `SPm10`
- Phones through the year: `SPp10`, `SPp11`, `SPp14`, `SPp15`, `SPp16`, `SPp17`
- Stand-in: `SP21-StandInHome`
- Screens that buttons only described: `FN3-SeniorTeam`, `HM2c-PlayerCardMiniRoos`, `HM6n-SeasonNoteOne`, `HM1r-NotesBack`, `SE2-PlayerSummary`, `PO5s-AdultSettings`, `C1s-ClipSearch`, `ACC8p-PairCamera`

**Missing since the first check (45):**
- Football year: `SP15-ComingBack`, `SP16-RestMonth`, `SP20-StandIn`, `SPp1`, `SPp2`, `SPp3`, `SPp4`, `SPp6`, `SPp7`, `SPp8`
- Set our style: `SF1` to `SF6` (this is also why the six style cards in item 3 are dead)
- Add a game: `GI1-Wearables`, `GI2-WhosWho`, `GI3-Analysing`, `GI4-Ready`
- Settings: `DSet2-ClubRoles`, `DSet3-ClubConnections`, `DSet6-PartnerAcademy`, `SET4e-DevicesEmpty`, `SET6-Display`
- Fitness: `IL1e-InjuriesEmpty`, `TL1-Tests`, `TL3-TestResults`, `TL3e-TestResultsEmpty`
- Sign-up: `OB2-SignUp`, `OB4-SignUp`, `OB5-SignUp`
- Player check-in: `PA-PlayerApp`, `PA-Check`
- Demo: `DEMO-Story`, `DEMO-Why`
- Others: `ACP7-ShareWithClub`, `ACP9-JoinGameTeam`, `CC1e-CoachHomeSharedEmpty`, `TM6e-WhosComingEmpty`, `I1e-InboxVests`, `P1-Consent`, `RCm1-RecordMiniRoos`, `RCm2-MiniRoosClips`, `FP1-PlayFootball`

## Order of work

1. Sandbox (item 1).
2. Tours (item 2), building the sign-up and joining screens they need.
3. Dead buttons one tap in (item 3), building Set our style on the way.
4. Wrong addresses and addresses per screen (items 4 and 5).
5. Demo dates, co-coach, tap targets (items 6, 7, 8).
6. The remaining screens (item 9).

## Report back

One file, `FIX-REPORT.md`: each numbered item here with done, part done or not done; for part done, what is left; the address of every new screen; and anything in this list that turned out to be wrong.
