# Programs, teams and players v2: report back (24 Nov)

From `clean-sheet-handover-v28` (which replaces v27). The academy's screens are no longer pictures with numbers typed in. Every number is counted from one list of 226 players in 17 teams, and the screens that take input change that list. Everything is a demo on sample data. The table of controls is `PROGRAMS-REPORT.csv`.

## What was wrong, and what it does now

- **Every program's "Open" showed the same eight players.** Each "Open" on Programs now opens that team, with its own players.
- **Every player opened Kai.** Every row and every dot opens that player's own page, for the owner and for the coach.
- **One coach ran a whole age band.** There are 17 teams, each with its own coach. Reece coaches U13 Timber, 16 players.
- **Players were shown at other clubs.** Every team plays at Wattle Creek FC.

## How it is built

- **One list:** `src/screens/academy/data/academy-data.json`, the pack's own file. **One store:** `src/screens/academy/academyStore.ts`, which counts everything from it and holds what a person changes. Changes are kept in the browser; the sample itself is never edited.
- **Two templates, not 243 screens:** the team page (`ADG01-Team` to `ADG17-Team`) and the player page (`ADF01-Player` to `ADF226-Player`). The coach's view of a player is a third, for Reece's 16 (`ADC1-PlayerFile` for Kai, `ADCP167-Player` to `ADCP181-Player`).
- The handover's routes (`/programs`, `/team/:id`, `/player/:id`) are the board ids in this demo, for example `/__screen/ADG14-Team` and `/__screen/ADF57-Player`.

## Checks

- **The store's totals match the handover:** 17 teams, 226 players, 240 places, $219,800 billed, $20,675 owed.
- **Numbers against the boards, by script:** all 17 team pages match. All 226 player pages were compared: 198 are identical and 28 differ on one line on purpose (below). The coach's team list and all 16 of the coach's player pages match.
- **"Open" on all 17 teams** lands on its own team. A player row opens that player, and Back returns to their team. All 16 rows and all 16 dots on the coach's side open their own player.
- **The live test from the handover passes.** Taking the roll for Jonah in `ACC2` moved him from 10 of 13 to 11 of 14 on his file, the coach's team list, the coach's home and the owner's team page, and it held after a reload. The same was checked for a step (`ADC11`), a note, a goal (`ADC10`), a clip (`ADC3`) and a report (`ACC6`).
- **Owner inputs:** paying a late fee in `AC5` moved the team page, the player page, `AD11` and `AD1`. Changing the coach rate and pitch hire in `AD21` moved `AD9`, `AD11` and a team page. `AD23` added a coach to the children checks; `AD20` added a team.
- **Family app to owner:** a family tapping "Not coming back" moved U9 Timber on `AD4-NextTerm` from 10 staying to 9, with 1 leaving, and the player's page to "Leaving".
- All 254 screens in the current packs open without an error on the final build. The family app's 125 hand checks and the tap-target check pass.
- By eye against the pack's pictures: `ADG14`, `ADF59`, `AC2`, `AD1`, `AD11`, `ACC1`, `ADC2`, one coach player page, and the family pages. The rest were checked by the numbers script.

## Counted, and still sample

**Counted from the list:** everything on the team and player pages; `AC2`, `AC4`, `AC6`, `AD4`, `AD5`, `AD11`, `AD17`'s people; pay on `AD9`; every tile on `AD3`; fees, progress, tiles and the coach table on `AD1`; the coach's home, team list, roll, after-session taps, goals, clips and report drafts; and in the family app the coach's name, the price, sessions been to, the steps and the Term 3 answer.

**Still sample, each marked in the code:**
- `AD10` and `AD12`, as the handover says.
- "Followed the plan" and "ball rolling" on `AD8`. Ball rolling is still switched off.
- The earlier terms, trials and why families left on `AD2`; the survey scores on `AD15`.
- The waiting list of 5, the holiday clinic, one-on-ones, cover, and how often a family was reminded.
- Children checks are not in the data file. The sample sits in one constant in the store.
- On the coach's side: the session plan, the film itself, who booked which review chat, and the scaled counts on the older coach screens.

## The family app

- The sample family's Ari is **Ari Kovac in U9 Timber** in the academy's list. The academy pages count from his record.
- **The coach on those pages is Marcus, not Reece.** U9 Timber's coach in the list is Marcus Obi. The family boards still say Reece.
- **The home and the term report now agree:** first touch from step 2 to step 3, and 12 of 13 sessions. The boards said 12 of 14 on one and 13 of 14 on the other.
- **Prices:** $950 for the term, three parts of $316.67, and the move offer reads "$1,100 a term, was $950". The board still shows "$96.67 now" for three parts, which is a third of the old price.
- **Not applied:** the pack changes Mia's fee on the community club's Fees page (`FAM39`) from $260 to $800. That looks like the academy price swap reaching a screen that is not the academy's, so it is left at $260. For an academy family that page shows the academy fee from the list.

## Where the build differs from the boards

- **Player page, "Worth knowing":** 28 boards say "coming, moving and paid up" for a player who owes money. The build says what is owed.
- **`AC5-Fees`** has "Mark as paid" and a "Paying in parts" list, which the board does not draw. The board still shows four old families.
- **`AD21-RatesCosts`** is one rate for every coach and half a pitch for a term. The earlier board had three coaches at three rates.
- **`AD20-NewProgram`** doubles as "Change this team". **`AD23-AddCoach`** does not put a coach in charge of a team; that is done in `AD20`.
- **`AD1`:** the fees chip shows the price a player pays beside the total. "Ready to move up" and the three coaches are in list order.
- **`AC2`:** the third "Worth knowing" line counts open places by program. The board's line is not true of the data.
- **Coach home:** dots are in name order; the clip row names the first player who is up a step with no clip sent; the reports meter is mauve because 9 of 16 is under two-thirds.
- **`ACC2`:** each player is Mark here, Here or Away, with "Mark the rest here", because today has no roll until someone takes it.
- **`ADC11`** starts with nobody tapped. The board pre-fills six.
- **`ADC2` "A goal set"** says Ana and Sienna are to go. The board says Ana only; both have no goal in the data.
- **A coach sees no fees:** the coach's player page says "coming and moving", and has no fees row.
- **Grammar:** four team boards say "1 families haven't" or "1 things". The build says "1 family hasn't" and "1 thing".

## Not done

- `ACT1-AcademyWeek` still shows "Reece's groups" across three programs. The pack did not change it, and it needs a redraw.
- `ADC14-SuggestMove` is about a player in another coach's team. Its link from Kai's file is removed; it opens by address.
- `ACC4-PlayerPlan` and `ADC12` are still typed for Kai.
- `AC1`'s Today list and `AC12`'s "seen" counts keep the board's older figures.
- Empty states are unchanged.
- Changing a team's price does not change what late families already owe.

## Things in the pack that do not agree

- **Kai's mum** is Temi in the data, Tess on `ACC13`, `ACC4` and `ACP4`, and Adaeze on the older `ADC5`. The coach's review chats now use Temi.
- **`AC12`** says "Send to 226 families" beside "All families · 80".
- **`AC5`** has new totals over the four old late families.
- **`ACC2`**, **`ACC10`** and **`ACT4`** boards name players who are not in the data. The build uses the team's real names.
- **`ACP4`:** the offer and Term 3 are $1,100, but its instalments are still $129.67 and $90.
- **Kai's goal** reads "his left foot" in the data and "my left foot" on `ADC10`.

## For Booker to decide

- Whether the family pages should name Marcus (from the list) or Reece (as drawn).
- Whether Mia's community club fee should really be $800.
- Whether `ACT1` is redrawn for one team.
