# Connected club: report back

Pack: `connected-club-v1` (17 Nov). Control-by-control results are in `CONNECTED-CLUB-REPORT.csv`.

## Build

- Screens and menus: commit `9993ebd`.
- Record › Devices fix (same day): commit `10269d5`.
- Live at https://soccer-coaching-app-six.vercel.app/

## Result

- 290 controls: 288 work, 2 are not built as drawn (the family view rows for a third child).
- "Done means" 1 to 5 pass on the local build and on the deployed site.

## "Who sees it" rules that are not enforced on a server

The demo has no server. Every rule below is kept only by which screen shows what; nothing stops a person opening another role's screen by its address.

| # | Feature | Rule | How the demo keeps it |
|---|---|---|---|
| 1 | Player rates their own game | That player and the head coach only | Shown on that team's "Their take, next to yours" and nowhere else |
| 2 | Session feedback | Totals once 5 answer, never who said what | Answers are stored without a name; "Under 5" below five |
| 3 | Player's own goal | Player and head coach | Phone screen only; no coach approval step is built |
| 4 | Watch a session | That coach and the director | Director screen only; the coach's own view is fixed text |
| 5 | Coach load | Director; each coach sees their own row first | Director screen only; no coach view is built |
| 6 | Sessions that worked elsewhere | Coaches in the same club, with the coach's agreement | Fixed list; "Share one of yours" says a line and stores nothing |
| 7 | Season report | That family, after the coach sends | The parent screen is reachable before the coach presses send |
| 8 | Catch-ups | That family and the coach | Booking is shared through the browser's own storage |
| 9 | Family view | That family, two or more children | Card on the two-child parent home only |
| 10 | Two questions a term | No names stored; by team once 5 answer | Stored with no name; a team under five shows "Under 5" |
| 11 | Handover | Family sees it first, then the next coach | The pass button has two steps; the family's phone view is not built |
| 12 | Passport | The family owns the file | Switches are saved; no file or link is made |
| 14 | Load outside the club | Coach and fitness coach see the total | The total is stored; no coach screen shows it yet |
| 16 | Incident log | Welfare officer and that player's parent | Says a line; a head knock opens `FC1-Concussion` |
| 17 | Sideline rating | Director and welfare officer, by team | Moves the team's figure on Club climate |
| 18 | Sponsors | Totals only | Fixed figures |
| 19 | Pitches | Coaches see their own slots | Director screen only |

## Asking rules

- Enforced in the demo: a player's weekly limit, a parent's weekly limit, a question switched off for the club, and the count of questions held back.
- Shown as words only: one reminder never two, quiet hours, exam weeks, the daily limit, and "the game question goes first".

## Where it differs from the drawings

- Teams and coaches use the club's coach-named teams (U13 Chris, U14 Josh, U15 Girls Bec and so on).
- Family view uses the demo's two children, and is a card on the parent home rather than the landing screen.
- Seniors do not get Season reports, Catch-ups or Handover.
- Positions says "7 of 9 so far": the drawing's own table adds up to 7, its text says 6.
- "What else did you do?" is Cal in U16 Ollie, not Kim in U15 Girls.
- "How did you go?" is the game v Tealside Town, to match the rest of the demo.
- Ask Clean Sheet opens the working panel in place.
