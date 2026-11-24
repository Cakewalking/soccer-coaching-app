# Homes v1: report back (24 Nov)

From `clean-sheet-handover-v26` (and the academy part of v25). Every role's home is rebuilt with the same four parts, in the same order: Now, Progress, Development, Oversight. The ids are the same as before, so every menu link still opens them. Everything is a demo on sample data. The filled-in table is `HOMES-REPORT.csv`. The pack has no wiring table for the homes, so the table was read from each board's own links.

## What was built

| Home | Role | Where the role sees it |
|---|---|---|
| `STO1`, `STO2`, `STO3` | MiniRoos coach (after a game, training day, no camera) | `STO1` is the live Home; `STO2` and `STO3` open by address |
| `STO4` to `STO9` | Senior, junior, youth, assistant, fitness and goalkeeper coach | Live Home |
| `STO10` to `STO13` | Director, chair, coordinator, welfare officer | Live Home |
| `STO16`, `STO18`, `STO19`, `STO20` | Team manager, player under 15, player 15 and over, referee (phone) | Live Home |
| `STO17` | Parent in the older parent screens (phone) | The parent look-around, as before |
| `CPh1` | Coach on a phone | Live Home, in season |
| `ACC1`, `AD1` | Academy coach, academy owner | Live Home. `STO15` and `STO14` open the same two |
| `ACK1` | Academy player (phone) | Live Home. `STO22` opens the same one |
| `ADP1` | Academy family, in the family app | The Club tab. `STO21` and the academy parent look-around open the same one |

- The tablet homes are one layout with one set of data for each role (`src/screens/homes/`). The phone homes are another (`src/screens/homesphone/`).
- The old full-width Ask bar is gone from every home. Ask is the round button in the top bar.
- Empty homes are unchanged.

## Checks

- **Tablet homes, 409 controls:** all pressed at 1180 by 820 against the table read from the boards. All work. The 190 controls in the body of the homes were pressed again inside each role's live app.
- **Phone and academy homes, 148 controls:** all pressed. All work.
- **The family app's academy home (`ADP1`):** compared with its picture, and its flows walked by hand (keep a place, book a chat, practice, the report, the tabs). The family app's 125 hand checks pass.
- All 216 screens in the current packs open without an error on the final build. The tap-target check passes.
- By eye against the pack's pictures: `STO1`, `STO4`, `STO5`, `STO10`, `STO11`, `STO13`, `STO16`, `STO17`, `STO19`, `CPh1`, `ACK1`, `ACC1`, `AD1`, `ADP1`. The rest were checked by size, by an overlay and by the press run.

## Rules, and where the boards do not follow them

The rule and the board disagree in these places. Each line says which one the build follows.

- **Amber.** The rule says amber is only the film button and the proof marks. Every board also draws the "PROGRESS" label, the bars and the big figures in the dark band in amber. Built as drawn.
- **Meters turn mauve below two-thirds.** The tablet homes work this out from the numbers. On `ACC1` and `AD1` the boards draw five meters the other way (for example "Term reports drafted, 4 of 22" is green, and "Families sent a clip, 16 of 22" is mauve). Those two homes are built as drawn.
- **Nothing on a child's home is a warning.** `STO19` draws the "Load · High · capped" row with a mauve "!". The build follows the rule and shows a plain dot.
- **Tap targets.** The boards draw 30px dots and 40px table rows. The row of dots is one 44px button, and table rows are 44px.
- **The Strong mark on oversight.** `AD1`'s table has none on the board. Built as drawn.

## Where the build differs from the boards

- **Each role's app keeps its own menu.** The boards draw a coach menu with Clips; the build has Record and Learn.
- **`STO8` and `STO10` scroll about 35px.** The pictures clip the same content.
- **`CPh1` keeps two plain links** the board does not draw, "Before kick-off" and "Log an incident". Nothing else on the coach's phone leads to those screens. It scrolls about 45px because of them.
- **`ACK1` keeps its three plain links** to the player's skills, clips and check-in.
- **The avatar opens the person's settings**, as before. The boards draw it plain.
- **"Your take"** is gone from the homes. The new boards have none.
- **`ADP1`:** the heading reads "Ari · Tall Timber Academy" (the family app holds no surname). After a choice the home says so: the place kept or released, the chat booked, the place paused. A Demo box under the home opens the screens that arrive by notification.
- **The academy parent look-around** now opens the family app at `ADP1`, since academy parents use the family app.

## Tours

Tour steps open whole screens, so none is broken. Five captions described the old homes and are reworded to fit the new ones: the junior coach's two Home steps, the MiniRoos Home step, the director's Club overview step and the welfare officer's Home step.

## Not built

- The older parent home `STO17` is built at its id, but the older parent screens are retired as a product. Where it opens from is unchanged.
- Old code for the earlier homes is still in the repo (`src/screens/story/configs.ts` and the tablet half of `HomeStory.tsx`). Nothing shows it.
- The Family app's own Home (`FAM3`, `FAM14`) is not changed. The handover says to ask if it should be rebuilt the same way.

## Things in the pack that do not agree

- **`ADP1` and the term report.** The home says first touch went from step 2 to step 3, running with the ball from 2 to 3, and 12 of 14 sessions. The term report (`ADP2`) says first touch 2 to 4, running with the ball 3 to 3, and 13 of 14.
- **`STO16`:** the headline says "14 are coming"; the figure is "Families who've answered, 14 of 16".
- **Lit tabs point elsewhere.** On several boards the lit Home tab links to another screen, so pressing it leaves the home. Built as drawn.
- **`STO8`:** the fitness home draws the coach's menu, with coach screens as targets.
- **`STO10`:** "Players sent a clip this month" opens a coach's clips tab from the director's home.
- **Referee:** the Messages tab is gone, so the referee's messages have no way in from that home. **Parent (`STO17`):** the Learn tab is gone.
- **The academy tables** in the pack still carry the old `ACK1`; the new one is only in the homes folder.

## For Booker to decide

- Whether the meters on `ACC1` and `AD1` should follow the two-thirds rule or the boards.
- Whether the older player's "Load · High" row should carry the warning mark the board draws.
- Whether the coach's phone home keeps its two extra links.
- Whether the Family app's own Home should be rebuilt the same way.
