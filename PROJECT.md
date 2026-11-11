# Clean Sheet — Project Overview

*Last updated: 11 November 2026 · commit `fec062b`*

---

## What it is

Clean Sheet is a soccer coaching platform for community clubs and private academies. It covers every person connected to a team — coaches, co-coaches, fitness staff, goalkeeper coaches, team managers, parents, players, club directors, coordinators, welfare officers, academy owners, and referees — 20 roles in total.

The product is built as a **hosted interactive demo** (not a production app). Every screen in the design is reachable at `/look/{role}/{tab}`, browseable via guided tours at `/tour/{role}/{step}`, and testable in a sandbox mode at `/sandbox/{role}`. There is no back-end, no real data, and no sign-in. All sample data is fictional: **Wattle Creek FC** and **Tall Timber Football Academy**.

---

## Tech stack

| | |
|---|---|
| Framework | React 19 + TypeScript 7 |
| Build | Vite 5 |
| Lint | oxlint |
| Deployment | Vercel (`vercel.json` at root) |
| State | `useState` / `localStorage` only — no external store |
| Styling | Inline styles throughout, no CSS framework |
| Tests | One script (`scripts/check-tap-targets.mjs`) — no test framework |

```
npm run dev        # local dev server
npm run build      # tsc -b && vite build
npm run preview    # preview the build
```

---

## Repository layout

```
soccer-coaching-app/
├── src/
│   ├── App.tsx                    # Root — just mounts <DemoApp />
│   ├── main.tsx
│   └── screens/
│       ├── demo/                  # Demo shell & routing hub
│       │   ├── DemoApp.tsx        # URL router + renderScreen switch (~1 450 lines)
│       │   ├── tours.ts           # All 20 role tours + story tour
│       │   ├── DemoShell.tsx      # 48 px top bar (tablet)
│       │   ├── DemoShellPhone.tsx # Phone wrapper
│       │   ├── DemoShellSandbox.tsx
│       │   ├── DemoTourShell.tsx  # Guided tour step player
│       │   ├── DemoStart.tsx      # Role picker landing page
│       │   ├── DemoStartEmpty.tsx # Sandbox role picker
│       │   ├── DemoSignIn.tsx     # Front door (demo / sandbox)
│       │   ├── DemoPhone.tsx      # Phone-sized front door
│       │   ├── DemoWhy.tsx        # "Why trust it" screen
│       │   └── ...
│       ├── signin/                # Sign-in flow (SI1–SI7, SIP1–3)
│       │   ├── SignInFlow.tsx
│       │   ├── ErrorScreens.tsx
│       │   └── SandboxScreens.tsx
│       ├── miniroos/              # MiniRoos coach (Under 6–11, tablet)
│       │   └── MiniRoosApp.tsx
│       ├── footballyear/          # Football year / seasonal screens (SP*, SPy*, SPs*, SPm*, SPp*)
│       ├── coachphone/            # Coach on the phone (CPh*, phone)
│       │   └── CoachPhoneApp.tsx
│       ├── step4/                 # Phone screens — parents, players, academy, TM, MiniRoos
│       ├── join/                  # Join / invite flows (JN*, IV*, OB*)
│       ├── playerapp/             # Player app (phone)
│       ├── teammanager/           # Team manager (phone)
│       ├── clubadmin/             # Director, chair, welfare (tablet)
│       ├── drillibrary/           # Drill library
│       ├── clips/                 # Clips tab sub-screens
│       ├── settings/              # Settings screens (SET*, DSet*)
│       ├── dev/                   # Dev / internal screens
│       │
│       ├── JuniorCoachApp.tsx     # Junior coach U12/13 (tablet) — main 5-tab app
│       ├── SeniorsYouthCoachApp.tsx  # Youth U14-18 and seniors (tablet)
│       ├── GoalkeeperCoachApp.tsx    # Goalkeeper coach (tablet)
│       ├── FitnessCoachScreen.tsx    # Fitness coach (tablet)
│       ├── CoCoachHomeScreen.tsx     # Co-coach home
│       ├── AcademyOwnerApp.tsx       # Academy owner (tablet)
│       ├── AcademyCoachApp.tsx       # Academy coach (tablet)
│       ├── AcademyParentApp.tsx      # Academy parent (phone)
│       ├── AcademyPlayerApp.tsx      # Academy player (phone)
│       ├── TeamManagerScreen.tsx     # Team manager (phone)
│       ├── CoordinatorPortal.tsx     # Club coordinator (tablet)
│       ├── ClubAdminScreen.tsx       # Chair / welfare (tablet)
│       ├── HomeScreen.tsx            # Junior coach home tab
│       ├── SquadScreen.tsx           # Squad tab
│       ├── TrainingScreen.tsx        # Training tab
│       ├── MatchDayScreen.tsx        # Match day tab
│       ├── ClipsScreen.tsx           # Clips tab
│       ├── PACheckScreen.tsx         # Player check-in
│       └── ...                       # ~50 further screen files
├── FIX-LIST.md                   # 9-item QA checklist (11 Nov 2026)
├── FIX-REPORT.md                 # Status of each FIX-LIST item
├── IMPLEMENTATION-PLAN.md        # 23-bucket screen build plan
├── vercel.json                   # SPA rewrite rule
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

---

## Design tokens

All colours are inline — no CSS variables except `--font-sans` and `--surface-100`.

| Token | Hex | Use |
|---|---|---|
| `G` | `#2f6252` | Primary green (buttons, active states) |
| `GD` | `#1f4a3e` | Dark green (top bars) |
| `INK` | `#10211f` | Body text |
| `MUT` | `#4a5a57` | Secondary text |
| `LN` | `#e8edeb` | Dividers |
| `PALE` | `#eef5f2` | Pale green backgrounds |
| `ROSE` | `#c39797` | Accent (academy) |
| `SAND` | `#cbbeb5` | Neutral accent |

Tablet screens are **1180 px** wide. Phone screens are **390 px** wide. All tap targets are **≥ 44 px**.

---

## URL structure

| URL | What it shows |
|---|---|
| `/` | Sign-in / front door |
| `/start` | Role picker |
| `/why` | Why trust it (DemoWhy) |
| `/look/{role}` | Browse a role's app — no tour overlay |
| `/look/{role}/{tab}` | Browse a role at a specific tab |
| `/tour/{role}` | Guided tour, step 0 |
| `/tour/{role}/{step}` | Guided tour, specific step |
| `/sandbox` | Sandbox home (create or open) |
| `/sandbox/{role}` | Sandbox role view |

Invalid role or tab → `ER4-NotFound`. Roles that exist but don't support sub-nav → no sub-path (URL stays at `/look/{role}`).

**Roles with per-tab URL tracking** (tab taps update `/look/{role}/{tab}`):

| Role | Tabs |
|---|---|
| `coach`, `ccoach` | home · squad · training · matchday · clips |
| `youth`, `seniors` | home · squad · training · matchday · clips |
| `miniroos` | home · squad · training · gameday |
| `goalkeeper` | home · keepers · training · clips |
| `fitness` | home · squad · training · matchday |
| `academyowner` | home · programs · players · coaches · money |
| `academycoach` | today · players · gameday · library |

---

## The 20 roles

### On the pitch (tablet)

| Role ID | Name | Persona | App component |
|---|---|---|---|
| `miniroos` | MiniRoos coach | Tom Albers, U6–11 | `MiniRoosApp` |
| `coach` | Junior coach | Sam K, U12–13 | `JuniorCoachApp` |
| `youth` | Youth coach | Ollie Grant, U14–18 | `SeniorsYouthCoachApp teamType="youth"` |
| `seniors` | Senior coach | Marko Petrovic, adults | `SeniorsYouthCoachApp teamType="seniors"` |
| `ccoach` | Co-coach | Jess Marsh | `JuniorCoachApp coachRole="ccoach"` |
| `fitness` | Fitness coach | Priya Shah | `FitnessCoachScreen` |
| `goalkeeper` | Goalkeeper coach | Nick Ward | `GoalkeeperCoachApp` |

### Families (phone)

| Role ID | Name | Persona | App component |
|---|---|---|---|
| `manager` | Team manager | Rob Owusu | `TeamManagerScreen` |
| `parent` | Parent | Linh Tran | `TwoChildrenApp` |
| `playeryoung` | Player under 15 | Mia Tran | `PlayerAppScreen` |
| `playerolder` | Player 15+ | Cal West | `OlderPlayerApp` |

### Running the club (tablet / phone)

| Role ID | Name | Persona | App component |
|---|---|---|---|
| `director` | Director of football | Rachel M | `D1ClubOverview` etc. |
| `chair` | Chair | Greg Lawson | `ClubAdminScreen role="chair"` |
| `coordinator` | Club coordinator | Bianca Rossi | `CoordinatorPortal` |
| `welfare` | Welfare officer | Helen Park | `ClubAdminScreen role="welfare"` |
| `referee` | Referee | Zoe Park, 16 | `RefereesPhoneScreen` |

### Private academies (tablet / phone)

| Role ID | Name | Persona | App component |
|---|---|---|---|
| `academyowner` | Academy owner | Dani Okafor | `AcademyOwnerApp` |
| `academycoach` | Academy coach | Reece Whitlam | `AcademyCoachApp` |
| `academyparent` | Academy parent | Tess Okonkwo | `AcademyParentApp` |
| `academyplayer` | Academy player | Kai Okonkwo, 13 | `AcademyPlayerApp` |

---

## Sandbox

The sandbox allows exploration with and without sample data. Each role has an empty-state home accessible via key `{role}-e` (e.g. `home-e`, `miniroos-e`). Fill / Reset buttons write to `localStorage` key `cs_demo_sandbox_filled`. The sandbox has no sign-in and sends no emails or push notifications.

---

## Screen count

404 `.tsx` files in `src/screens/`. The design spec covers ~510 screens; ~180 were built in Buckets 1–6, the remainder across later buckets and ongoing work.

Every screen that has a design file ID (e.g. `SP15-ComingBack`, `CPh2-CoachPhoneComing`) has a corresponding `case` in `renderScreen` in `DemoApp.tsx`, reachable at `/look/{role}` by navigating to it or by opening `/look/{any-role}` and entering the design ID directly.

---

## FIX-LIST status (11 Nov 2026)

All 9 items resolved. See `FIX-REPORT.md` for detail.

| # | Item | Status |
|---|---|---|
| 1 | Sandbox empty states for all 19 roles | Done |
| 2 | 44 tour steps showing wrong screen | Done |
| 3 | Dead buttons (one tap in) | Done |
| 4 | Wrong address → 404 not front page | Done |
| 5 | Per-screen addresses (URL per tab) | Done |
| 6 | Calendar dates (no dynamic Date.now()) | Done |
| 7 | Co-coach home distinct from head coach | Done |
| 8 | Tap targets ≥ 44 px across all roles | Done |
| 9 | 73 screens missing from build by design ID | Done |

---

## Hard constraints

These rules must never be broken in any edit:

1. **All sample data is fictional.** Wattle Creek FC, Tall Timber Football Academy, and every person in them. Never substitute real clubs, grounds or people.
2. **No real communication.** No email, SMS or push notification is ever sent. The sandbox has no sign-in and no email address.
3. **No real club data.** No route in either mode can reach a real club's data.
4. **Under 12 rules.** No scores, no rankings, no sensors, no style numbers. Clips only.
5. **Rankings from U13 only.**
6. **Equal game time enforced up to U13.**
