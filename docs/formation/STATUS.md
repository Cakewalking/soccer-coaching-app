# Squad › Formation — build status (formation-v1)

Built from the 16 Nov 2026 handover (`formation-v1.zip`).

## Done

- **Formation builder** (`src/screens/formation/FormationBuilder.tsx`), one parameterised component covering the tablet boards: `FB1-Formation`, `FB1d/FB1t` (tap placement), `FB1x-FormationOwn`, `FB1l-FormationSaved` (game picker), `FB1c-FormationShare`, `FB1s-FormationSeniors`, `FB1m-FormationMiniRoos`, `FB1e-FormationEmpty`.
  - Shape tabs per age (7: 2-3-1/3-2-1/2-2-2 · 9: 3-3-2/3-2-3/2-4-2/4-3-1 · 11: 4-3-3/4-4-2/4-2-3-1/3-5-2) with dot pictures, "Your own", "More shapes".
  - Pitch `#1c3a33` with stripes, markings, "ATTACKING THIS WAY ↑", player tokens (number, name+pos pill, captain C, note line), empty dashed spots.
  - **Tap-then-tap placement**: bench→empty (place), bench→player (swap), pitch→empty (move), pitch→player (swap), pitch→bench (return). Keyboard-reachable (tokens/rows are buttons). Toasts match the wiring lines.
  - Shape switch keeps players (nearest-spot remap, keeper pinned); extra players drop to bench.
  - Checks strip (3 boxes, warnings on sand), half/quarter switch, **Fill it for me**, **Clear**, **Undo** (20 steps), **Save**, **Use on the team sheet** → Match day.
  - **Game picker** menu (coming up + start-from-one-that-worked). **Share sheet** (preview, who/when, first-names-only privacy note, Save picture / Print / Send).
- **Parent view** (`LineupParent.tsx`, `FBp2`): read-only, child ringed, half switch, first-names-only bench line, Message / "is coming".
- **Squad nav updated** to the design in Junior and Seniors/Youth coach apps: `Players · Formation · Line-ups that worked · Development goals · Wellness · Availability · Consent and privacy`. "Line-ups" renamed to "Line-ups that worked" (same `SQ1-BestLineups` screen).
- **Routes** wired in `DemoApp` for all `FB1*` / `FBp2` ids.
- Geometry + rosters + checks in `src/screens/formation/formationData.ts`, from `formations.json` and the wiring tables.

## Deferred / honest gaps

- **True pointer drag** (lifted token following the finger, drop-target highlight, 150 ms glide). The spec's tap-then-tap path is fully implemented and is the tested, accessible primary interaction; live drag is a visual enhancement not yet added.
- ~~MiniRoos squad-nav restructure~~ — **done**: MiniRoos Squad is now Players · Formation · Who's coming · Consent · Season notes, with the Formation board wired in.
- **Coach phone** `FBp1-FormationPhone` — not built.
- **Season summaries / Fitness coach** were dropped from the Squad nav per the handover. Both screens still exist and keep their own `/look` routes, but they no longer appear in the Squad menu. Flag if they need a new home.
- Per handover "Not designed yet": More-shapes list, second-half/quarter *distinct* line-ups (parts share one placement in this build), full checks on phone, printed page / saved picture, MiniRoos family turns view, player's own view, live-game subs.

## Verified (headless, happy-dom)

Juniors: render, bench + not-available, checks, full pitch, tap-swap (Finn↔Harper), Clear→9 empty, Undo restore, Fill repopulate, shape switch, Share sheet + Send, game picker. Seniors: 4-3-3, one empty RW, suspended Ryan Cole, right-wing check, no parts. MiniRoos: quarters, "Waiting for a turn", Ivy first-go-in-goal, 2-3-1. Parent: child sentence, first-names-only bench, is-coming. 24/24 pass.
