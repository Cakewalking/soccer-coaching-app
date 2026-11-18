# The justified session: report back

Pack: `justified-session-v1` (18 Nov). Control-by-control results are in `JUSTIFIED-SESSION-REPORT.csv`.

## Result

- 80 controls: 75 work exactly as listed, 2 work with different words, 3 are explained in the report (Ask opens the working panel; the club drill library is a tab switch; the national curriculum switch is locked off on purpose).
- "Done means" 1 to 5 pass on a local build.

## How a session is chosen

One function, `proposeSession` in `src/screens/session/sessionEngine.ts`. It takes the team, who is there, the director's sources and rules, and the coach's swaps, and returns the parts. Each part carries a one-line why and its evidence chips. A part with no evidence is dropped before it reaches the screen.

The same function draws the session for every team from that team's own game: U11 Luke (as drawn), U9 Tom, U12 Sam, U16 Ollie and the Men's 1sts.

## Which drill sources are live

| Source | State | Note |
|---|---|---|
| National curriculum | Off, and locked | No federation drills are loaded. The switch cannot be turned on in the app until there is an agreement |
| Wattle Creek's own | On | Demo drills written for this build |
| Sessions that worked here | On | Demo drills written for this build |
| Clean Sheet's library | On | Demo drills written for this build |
| Warm-up for injury prevention | On | One warm-up, for teams above under-13 |

The drill names, set-ups and coaching points in the library are written for this demo. None is taken from the federation's curriculum.

## Where it differs from the drawings

- **Curriculum switch:** drawn "On", built off and locked, as the handover's rule says.
- **Curriculum chips:** "Curriculum: start with a game" and "end with a game" are kept as drawn. They name a principle, not a federation drill. Say if these should be reworded while the source is off.
- **Other teams:** the boards show U11 Luke. Each coach app shows its own team's session, with its own evidence, in the same layout.
- **Tabs:** "Tuesday's session" replaces "Tonight's session" and "Suggested" in every coach app. This week, Drill library, Growth and load, What landed and Worked elsewhere are kept.
- **Start session:** the old "Tonight's session" tab had a Start session button for the pitch-side mode. It is now on the run sheet in the junior, youth and seniors apps.
- **A week with no game:** a button under the session switches to the bye-week view and back, so `GS6` can be reached without waiting for a bye.
- **Swap for the closing game:** three game variants were added so every part has something to swap to.
- **Older teams:** above under-13 the first part is a warm-up, not an arrival game, and its evidence is the vests.
- **Football at home:** the demo parent (Mia, U12 Sam) gets her own copy from the parent home. Filters show a film that fits any picked filter, and this week's two always show.

## Rules not enforced by a server

The demo has no server. These are kept only by which screen shows what.

- Only the coach sees their level.
- Nobody else sees what a coach has watched.
- "We did it" sends the coach one tick: the tick is stored, and no coach screen shows it yet.
- The poll going out once, the one reminder, and the closing time are words and a single-use button, not scheduled sends.
- "After ten sessions ask once" is not built.
