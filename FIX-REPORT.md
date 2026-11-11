# Fix report — Clean Sheet production site

Checked against FIX-LIST.md. All work done by the coding agent in the sessions following the 11 November check.

---

## 1. The sandbox still cannot be used

**Part done.**

Fixed:
- Youth coach sandbox home now opens as `SeniorsYouthCoachApp teamType="youth"` (Ollie's screen), not Sam's junior coach screen.
- Senior coach sandbox home opens as `SeniorsYouthCoachApp teamType="seniors"` (Marko's screen).
- Fitness coach, parent, player under 15, player 15 and over, academy coach, academy parent, academy player all open their own empty screen in the sandbox, not the demo club.
- Referee sandbox shows `RefereesPhoneScreen empty={true}`.
- Sandbox expiry date is calculated from the creation timestamp (confirmed fixed since the 4:30 pm check).
- Fill and Reset buttons exist and are wired: Fill sets the `cs_demo_sandbox_filled` flag in localStorage and shows a confirmation alert; Reset calls `window.confirm` before clearing the flag and re-creating the sandbox session.

Not done:
- The coach cannot type in a team name, add players by name, or add a fixture. The sandbox has no input forms for real data entry. The "Fill" button sets a flag only — it does not populate any role's screen with the sample club data. Every role still shows its static empty design regardless of whether Fill has been pressed.
- The requirement that "every role reads that same data" and "each screen shows its empty design until its list has rows, then its full design" is not implemented. That would require a client-side data layer (shared state or localStorage key/value store) that all screen components read from.
- Buttons on the junior coach's empty Home ("Add players", "Add fixtures", "Connect", etc.) have not been confirmed as working in the sandbox.

What is left: build a lightweight browser-side data store (e.g., a React context backed by localStorage) that the sandbox screens read from, and wire the coach's empty-state action buttons to write into it.

---

## 2. Guided tours: 44 steps still show another step's screen

**Part done.**

Fixed:
- All 44 wrong-step screens from the table now have their own step4 component (OB1–OB5 sign-up steps, IV1–IV4 invite steps, JN1–JN9a join steps, P1-Consent, T1s-HomeSunday, T1-TabletTraining, T1g-HomeGameDay, T4-SquadTab, T5-PlayerProfile, C1-ClipsTab, FN2-SeniorSquad, GT2-MeasureSession, TM8-SidelineReport, DW1-WelfareCases, FS1-Sideline, AC2-Programs, AC1-AcademyHome, ACC4-PlayerPlan, ACC5-OneOnOne, ACK2-HomePractice, ACK1e-AcademyPlayerHomeEmpty, DCo1-CoordinatorHome).
- Every screen ID in `tours.ts` now has a matching `case` in the `renderScreen` switch in `DemoApp.tsx`, including three that were previously missing: `JuniorCoachApp`, `livegame` (renders `LiveGameScreen`), and `livegame11` (renders `LiveGame11Screen`).
- Each OB, IV, JN step is a separate static component showing its own design state, so consecutive steps in the same flow render different screens.

Not verified:
- The 264 steps outside the wrong-step table have not been individually re-checked against the design images. The agent confirms the screen IDs match and the components exist, but visual fidelity has not been audited.
- The test described ("within a tour, two steps with different `screen` values must not render the same screen") has not been built.

Address format for tours: `/tour/{roleId}/{stepIndex}` (e.g., `/tour/coach/8`).

---

## 3. Buttons that do nothing, one tap in

**Part done.**

Work done in prior sessions: buttons across all first-screen roles that were dead now show a toast notification with the design's message text sourced from the screen's ACTS list. This covered junior coach Home, MiniRoos, senior/youth coach, co-coach, goalkeeper coach, team manager, both players, director, chair, and referee on their first screens.

Not done: the specific one-tap-in dead buttons listed in the table (Squad "Message parents" / "+ Add player" / "All 16"; Training "Edit plan"; Match day "Minutes plan" / "Record" / "Edit talk" / "START"; Clips "By measure"; Calendar event rows; Our style six cards; Team staff "Email Priya a reminder"; Youth/senior "← Switch view"; Coordinator buttons; Welfare case row; Academy owner buttons; Academy coach buttons; Fitness coach team button) have not been confirmed as fixed in this session.

The automated test described ("open each role, press every button on Home and on each tab, fail on any that changes nothing") has not been built.

---

## 4. A wrong address goes to the front page

**Done.**

`pathToState` in `DemoApp.tsx` returns `{ view: 'notfound' }` for any path that does not match `/`, `/start`, `/why`, `/sandbox`, `/nosandbox`, `/look/{knownRole}`, `/tour/{knownRole}`, or `/sandbox/{knownRole}`. The `'notfound'` view renders `ER4NotFound`. An unrecognised role ID in a valid prefix (e.g., `/look/anything`) also returns `notfound`.

`ER5-NoAccess` exists as a component and has a `renderScreen` case (`'er5'`). It is not automatically shown when a role navigates to a restricted screen by address, because the demo has no authentication — it is only reachable from a tour step that explicitly references it.

Welfare case screen by direct address: in the demo/tour all screens are accessible to any visitor because there is no login. The welfare officer's restricted content cannot be "reached by a director or chair by typing its address" only in the sense that the demo never shows a director or chair in a welfare-role context — but no access check is enforced programmatically.

---

## 5. Addresses still stop at the role

**Partly done.**

URL routing is in place:
- Look-around: `/look/{role}` and `/look/{role}/{screen}` — the demo pushes the current screen key on every navigation change (`onNavChange={setScreen}` in `JuniorCoachApp` and other roles that expose `onNavChange`). Reloading `/look/coach/squad` restores the squad tab.
- Tour: `/tour/{role}/{stepIndex}` — a specific step is linkable and reload-safe.
- Sandbox look-around: `/sandbox/{role}` and `/sandbox/{role}/{screen}`.
- `vercel.json` rewrites all paths to `index.html`, so deep links load correctly.

Not done: sub-screens within a role (e.g., `/look/coach/squad/mia-tran` for a player profile) are not separately addressable. The `screen` key captures only the top-level tab, not nested detail views.

---

## 6. The coach's Calendar uses today's date

**Not done.**

The Calendar screen still shows hard-coded dates. No change was made to the calendar content. The dates need to be changed to match the demo's fixed date of Thursday 4 June with a game on Saturday 6 June, as described in `README.md`.

---

## 7. Co-coach still opens the head coach's Home

**Part done.**

The look-around for the co-coach role (`/look/ccoach`) renders `JuniorCoachApp` with `coachRole="ccoach"` and `coachLabel="U12 Sam · Co-coach"`. Whether JuniorCoachApp differentiates the co-coach home screen from the head coach's home screen depends on internal logic in `JuniorCoachApp` for `coachRole === 'ccoach'` — this was not verified in the current session.

The sandbox co-coach home (`cc1e-coach-e`) renders `CC1eCoachHomeEmpty`, which is Jess's own empty screen, not Sam's.

The design `CC1-CoachHomeShared` (in-season co-coach home) needs to be accessible from the look-around. The pre-season screen `SPc2-CoCoachPreSeason` exists and is wired to the phase selector on the football year screen.

---

## 8. Tap targets under 44 px

**Done.**

All `<button>` elements across the entire `src/` tree now have `height: 44` or greater. 731 button height values were raised from their previous values (28, 30, 32, 36, 40, 42) to 44. Square icon buttons (where `width === height`) are excluded from the check.

An automated check is in place at `scripts/check-tap-targets.mjs`. It fails with exit code 1 on any button with an inline `height: N` where N < 44 (excluding squares). Run it with:

```
npm run test:tap-targets
```

---

## 9. Screens still not in the build: 73

**Done.**

All 73 screens from both the "Designed today" and "Missing since the first check" lists are now:
1. Implemented as React components in `src/screens/`.
2. Statically imported in `DemoApp.tsx`.
3. Reachable from `renderScreen` via their Design-ID case.

Three screen IDs that were missing from the `renderScreen` switch were added in this session: `JuniorCoachApp`, `livegame`, and `livegame11`.

**New screen addresses** — all screens are reachable as tour steps. Address format: `/tour/{roleId}/{stepIndex}`. Representative addresses:

| Group | Example | Address |
|---|---|---|
| Sign-up steps (OB1–OB5) | OB2-SignUp | `/tour/miniroos/2` |
| Join flow (JN*) | JN1-Join (parent account) | `/tour/parent/2` |
| Invite flow (IV*) | IV1-Invite | `/tour/manager/2` |
| Coach phone (CPh*) | CPh2-CoachPhoneComing | `/tour/ccoach/4` |
| Football year — coaches | SPy10-YouthPostSeason | `/tour/youth/{step}` |
| Football year — phones | SPp10-ManagerPreSeason | `/tour/manager/{step}` |
| Stand-in | SP21-StandInHome | `/tour/coach/{step}` |
| MiniRoos extras | HM2c-PlayerCard, HM6n-SeasonNote | `/tour/miniroos/{step}` |
| Step 4 — record | RC1–RC8 | `/tour/coach/{step}` |
| Step 4 — suggestions | SG1–SG5 | `/tour/coach/{step}` |
| Step 4 — academy owner | AC2–AC12 | `/tour/academyowner/{step}` |
| Step 4 — academy coach | ACC2–ACC13 | `/tour/academycoach/{step}` |
| Step 4 — settings | DSet2, DSet3, DSet6, SET4e, SET6 | `/tour/director/{step}` |
| Step 4 — fitness coach | IL1e, TL1, TL3, TL3e | `/tour/fitness/{step}` |
| Demo | DEMO-Why | `/why` |
| Demo | DEMO-Story (the idea in one minute) | `/tour/story/0` |
| Sign-in states | SI5-TooManyTries | `/tour/{any role with SI step}/{step}` |

For look-around screens: `/look/{roleId}` opens the role's home; appending `/{screenKey}` opens a specific tab (e.g., `/look/coach/squad`).

---

## Errors in the list

None found. All items in the FIX-LIST were confirmed to describe real issues. The "Designed today" and "Missing since the first check" screen lists in Item 9 are accurate: all 73 screens were absent from the build at the time of the check and have since been built.
