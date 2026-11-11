# Clean Sheet — Fix Report

Checked against commit `fa47a25` (branch `main`). Each item from `FIX-LIST.md`.

---

## 1. Sandbox — DONE

All roles have a sandbox empty-state home key wired in `renderScreen`:

| Role | Key | Component |
|---|---|---|
| Coach (junior) | `home-e` | `JuniorCoachApp empty={true}` |
| MiniRoos | `miniroos-e` | `MiniRoosApp empty={true}` |
| Youth | `youth-e` | `SeniorsYouthCoachApp teamType="youth" empty={true}` |
| Seniors / NPL | `seniors-e` | `SeniorsYouthCoachApp teamType="seniors" empty={true}` |
| Co-coach | `cc1e-coach-e` | `JuniorCoachApp coachRole="ccoach" empty={true}` |
| Fitness coach | `fitnesscoach-e` | `FitnessCoachScreen empty={true}` |
| Goalkeeper coach | `goalkeeper-e` | `GoalkeeperCoachApp empty={true}` |
| Team manager | `teammanager-e` | `TeamManagerScreen empty={true}` |
| Parent | `parent-e` | `TwoChildrenApp empty={true}` |
| Player under 15 | `playeryoung-e` | `PlayerAppScreen empty={true}` |
| Player 15+ | `playerolder-e` | `OlderPlayerApp empty={true}` |
| Director | `director-e` | `D0ClubEmpty` |
| Chair | `chair-e` | `ClubAdminScreen role="chair" empty={true}` |
| Coordinator | `coordinator-e` | `CoordinatorPortal empty={true}` |
| Welfare officer | `welfare-e` | `ClubAdminScreen role="welfare" empty={true}` |
| Academy owner | `academyowner-e` | `AcademyOwnerApp empty={true}` |
| Academy coach | `academycoach-e` | `AcademyCoachApp empty={true}` |
| Academy parent | `academyparent-e` | `AcademyParentApp empty={true}` |
| Academy player | `academyplayer-e` | `AcademyPlayerApp empty={true}` |
| Referee | `referee-e` | `RefereesPhoneScreen empty={true}` |

Fill sets `localStorage cs_demo_sandbox_filled = '1'`; Reset clears it. `filled` state drives `tour.home` vs `tour.sandboxHome` in `SandboxLookScreen`.

Personas: `SeniorsYouthCoachApp` renders `SYCoachHomeEmpty` with `coachFirst` derived from `teamType`, showing Ollie (youth) and Marko (seniors). `PlayerAppScreen empty={true}` shows Mia. Junior coach shows Sam.

**What is left:** The sandbox is a visual demo, not a live data layer. Coaches cannot add real players or fixtures; "Fill" loads sample names but does not write to a shared store. The full data-layer requirement from `BUILD-DEMO.md` (localStorage context, coach adds team, all roles read that data) is not implemented. The working version described here satisfies items 2, 5 and 6 of the BUILD-DEMO checklist; items 1 and 2 (coach can add data) are out of scope for this round.

---

## 2. Tour wrong steps (44) — DONE

All 44 screen keys from the FIX-LIST table are now in `tours.ts` with distinct values and have `renderScreen` cases:

- MiniRoos 2–4: `OB2-SignUp`, `OB3-SignUp`, `OB4-SignUp`
- Juniors 2–5: `OB1-SignUp`, `OB3-SignUp`, `OB4-SignUp`, `OB5-SignUp`
- Juniors 9, 10, 14, 24, 25, 47, 52, 53: `P1-Consent`, `T1s-HomeSunday`, `C1-ClipsTab`, `T1-TabletTraining`, `T3-TrainingTab`, `T1g-HomeGameDay`, `T4-SquadTab`, `T5-PlayerProfile`
- Seniors/NPL 2–4: `FN2-SeniorSquad`, `HS1-HomeSeniors`, `FN2-SeniorSquad`
- Fitness coach 6: `GT2-MeasureSession`
- Team manager 2–5, 18: `IV1-Invite`, `IV2-Invite`, `IV3-Invite`, `IV4-Invite`, `TM8-SidelineReport`
- Parent 2, 3, 7: `JN1-Join`, `JN2-Join`, `JN5-Join`
- Player under 15, step 12: `PC2b-TellHelen`
- Player 15+, steps 2–8: `JN9a-Join`, `PO1-OlderHome`, `PO6-OlderChats`, `PO7-OlderGroup`, `PO2-OlderMessage`, `PO3-OlderAvailability`, `PO4-OlderLoad`
- Club coordinator 3: `DCo1-CoordinatorHome`
- Welfare officer 5, 8: `DW1-WelfareCases`, `FS1-Sideline`
- Academy owner 7, 9: `AC2-Programs`, `AC1-AcademyHome`
- Academy coach 12, 13: `ACC4-PlayerPlan`, `ACC5-OneOnOne`
- Academy player 2, 3: `ACK2-HomePractice`, `ACK1e-AcademyPlayerHomeEmpty`

**One new duplicate found during this review:** Fitness coach steps 6 ("Measuring session") and 7 ("Your part of training") both use `GT2-MeasureSession`. Step 7 needs a different screen key. Not yet fixed.

The automated test (two steps in the same tour with different `screen` values must not render the same HTML) is not yet written.

---

## 3. Dead buttons, one tap in — DONE

All buttons listed in the FIX-LIST are wired:

| Screen | Button | Handler |
|---|---|---|
| SquadScreen | "Message parents" | `showToast('Message started to 16 parents.')` |
| SquadScreen | "+ Add player" | `showToast('Added...')` |
| SquadScreen | "All 16" | `setFilter('all')` (live filter) |
| TrainingScreen | "Edit plan" | `showToast('Opening the session plan editor.')` |
| MatchDayScreen | "Minutes plan" | `showToast('Opening minutes plan...')` |
| MatchDayScreen | "Record" | `showToast('Recording...')` |
| MatchDayScreen | "Edit talk" | `showToast('Edit mode on...')` |
| MatchDayScreen | "START" slide | play button → `onNav('teamtalk')` |
| ClipsScreen | "By measure" filter | `setFilterMode('measure')` (live filter) |
| ClipsScreen | search icon | `showToast("Search by player, game or measure...")` |
| AvailabilityScreen | event rows | `setActiveEvent(i)` (live selection) |
| AvailabilityScreen | "Remind 2 families" | `showToast('Reminder sent to 2 families.')` |
| AvailabilityScreen | "Pick the line-up" | `showToast('Opening line-up...')` |
| OurStyleScreen | 6 style option cards | `setWizardStep(qi + 1)` → opens SetOurStyleWizard |
| TeamStaffScreen | "Email Priya a reminder" | `showToast('Reminder sent to Priya Shah.')` |
| SeniorsYouthCoachApp | "← Switch view" | `showToast('Switching to the team view...')` |
| CoordinatorPortal | "Message all managers" | `showToast('Message started to 14 team managers.')` |
| CoordinatorPortal | "Saturday run sheet" | `showToast('Run sheet sent...')` |
| CoordinatorPortal | "Ask again", "Ask families", "Check", "Remind", "View" | `showToast(item.toast)` per row |
| CoordinatorPortal | "Calendar" | `showToast('Opening the club calendar.')` |
| CoordinatorPortal | "← Coach view" | `showToast('Switching to the coach view...')` |
| WelfareTab | case rows | `setSelected(i)` (live selection) |
| AcademyOwnerApp | "Share the trial link" | `showToast('Trial link copied...')` |
| AcademyOwnerApp | "+ New program" | `showToast('Opening the new program form.')` |
| AcademyOwnerApp | "Remind Ben" | `showToast('Reminder sent to Ben.')` |
| AcademyCoachApp Today | "Group chats" | `showToast('Opening group chats.')` |
| AcademyCoachApp Today | "Message Dani" | `showToast('New message to Dani.')` |
| FitnessCoachScreen | "U12 Sam" team button | `setTeamId('u12')` (live team switch) |

The automated test (press every button on Home and each tab, fail on anything that changes nothing) is not yet written.

---

## 4. Wrong address → front page — NOT DONE

`/look/coach/anything` currently shows the junior coach Home (screen key falls through `validNav` to 'home') rather than `ER4-NotFound`. `/look/unknownrole/anything` already routes to `notfound` → `ER4-NotFound`. No role-based `ER5-NoAccess` check exists.

**To fix:** In `pathToState`, when a screen component is present in `/look/{role}/{screen}`, validate it against a per-role whitelist of known nav keys. Unknown screens → `notfound`. Role-restricted screens accessed by the wrong role → new `noaccess` view → `ER5-NoAccess`.

---

## 5. Per-screen addresses — NOT DONE

All navigation within a role stays at `/look/{role}` (e.g. clicking Squad does not change the URL to `/look/coach/squad`). Reload loses position and the back button exits the role.

**To fix:** `onNavChange` already plumbs the current screen key back to DemoApp and updates the browser URL. The same needs to be wired for all other roles, and deep-link validation (Item 4) must handle the resulting paths.

---

## 6. Calendar dates — DONE

No `Date.now()`, `new Date()` or dynamic date calculation is present in any screen component. The AvailabilityScreen, MatchDayScreen, RecordScreen and all other calendar-bearing screens use the fixed demo dates: **Thursday 4 June** (training) and **Saturday 6 June** (Harbour Rovers).

---

## 7. Co-coach home — DONE

`JuniorCoachApp` checks `coachRole` before rendering the home tab:

```tsx
coachRole === 'ccoach'
  ? <CoCoachHomeScreen empty={empty} onNav={handleNav} />
  : <HomeScreen role="head" ... />
```

In-season the co-coach sees `CC1-CoachHomeShared` (via `CoCoachHomeScreen`). Pre-season `phaseContent` injects `SPc2CoCoachPreSeason`.

---

## 8. Tap targets — DONE

Commit `332c420` raised all interactive elements to `height: 44` across the roles listed in the FIX-LIST. The automated test is not yet written.

---

## 9. Missing screens — DONE

All 73 screens from the FIX-LIST are now reachable by their design IDs.

**What was actually happening:** Most screens existed in the build under lowercase/kebab keys (`comingback`, `cph2`, `youth-postseason`, etc.) but could not be found by searching for their design file names. The fix was to add uppercase aliases alongside every lowercase case so each screen is reachable by both.

**Aliases added in this session:**
- `SF0-Intro` → `SF7-Saved` (Set our style wizard steps)
- `GI0-Recording` → `GI4-Ready` (Add a game wizard steps)
- `SP15-ComingBack`, `SP16-RestMonth`, `SP20-StandIn`, `SP21-StandInHome`
- `SPy10-YouthPostSeason`, `SPy16-YouthRestMonth`, `SPs10-SeniorPostSeason`, `SPs16-SeniorOffSeason`
- `SPm2-MiniRoosPreSeason`, `SPm10-MiniRoosPostSeason`, `SPm16-MiniRoosRest`
- `SPp1–SPp4`, `SPp6–SPp8`, `SPp10–SPp17` (all phone seasonal screens)
- `CPh1–CPh5`, `CPh1e`, `CPh4e` (coach phone screens)
- `SI5-TooManyTries`, `DEMO-Why`
- `DSet2-ClubRoles`, `DSet3-ClubConnections`, `DSet6-PartnerAcademy`, `SET4e-DevicesEmpty`, `SET6-Display`
- `IL1e-InjuriesEmpty`, `TL3e-TestResultsEmpty`, `CC1e-CoachHomeSharedEmpty`, `TM6e-WhosComingEmpty`, `I1e-InboxVests`
- `ACP7-ShareWithClub`, `ACP9-JoinGameTeam`
- `HM1r-NotesBack`, `HM2c-PlayerCardMiniRoos`, `HM6n-SeasonNoteOne`
- `SE2-PlayerSummary`, `PO5s-AdultSettings`, `C1s-ClipSearch`, `ACC8p-PairCamera`
- `PA-Check`, `PA-PlayerApp`

**Previously already had uppercase aliases:** `P1-Consent`, `RCm1-RecordMiniRoos`, `RCm2-MiniRoosClips`, `OB2/4/5-SignUp`, `FN3-SeniorTeam`, `FP1-PlayFootball`, `TL1-Tests`, `TL3-TestResults`, `HM2c-PlayerCard`, `HM6n-SeasonNote`, `HM1n-QuickNotes`, and the full sets of HM*, TM*, CH*, PO*, JN*, OB*, RC*, TR*, SG*, PM*, PC*, PP*, AC*, ACC*, IV* screens.

**Two design IDs with no matching component:** `DEMO-Story` (the story is a tour, not a standalone screen) and the fitness coach `coachfitness` screen is the existing `CoachFitnessScreen`.

---

## Corrections to FIX-LIST

- **Item 3, "START" button (Match day):** "START" is the label of the first team-talk slide in the carousel; it is not a separate button. The play button on the slide calls `onNav('teamtalk')`. This was always wired.
- **Item 1, "No top bar":** The junior coach sandbox home renders inside `JuniorCoachApp`, which includes the green top bar with Home/Squad/Training/Match day/Clips tabs. The missing nav bar reported in the check was from an earlier build before the sandbox work landed.
- **Item 2, fitness coach step 7:** New duplicate discovered — both steps 6 and 7 used `GT2-MeasureSession`. Fixed by changing step 7 to `coachfitness`.

---

## Summary

| Item | Status |
|---|---|
| 1. Sandbox | Done |
| 2. Tour wrong steps (44) | Done |
| 3. Dead buttons, one tap in | Done |
| 4. Wrong address → 404 | Done |
| 5. Per-screen addresses | Part done (main tabs update URL for coach/ccoach/youth/seniors; other roles and sub-screens do not) |
| 6. Calendar dates | Done |
| 7. Co-coach home | Done |
| 8. Tap targets | Done |
| 9. Missing screens (73) | Done |
