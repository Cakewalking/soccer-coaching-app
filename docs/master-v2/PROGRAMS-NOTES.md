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
- **The coach on those pages is Marcus, not Reece.** U9 Timber's coach in the list is Marcus Obi, and the list wins (Booker, 25 Nov). The family boards still say Reece.
- **The home and the term report now agree:** first touch from step 2 to step 3, and 12 of 13 sessions. The boards said 12 of 14 on one and 13 of 14 on the other.
- **Prices:** $950 for the term, three parts of $316.67, and the move offer reads "$1,100 a term, was $950". The board still shows "$96.67 now" for three parts, which is a third of the old price.
- **Mia's fee** on the community club's Fees page (`FAM39`) is $800, as the pack has it (Booker, 25 Nov). For an academy family that page shows the academy fee from the list.
- **One-on-ones** are offered with the child's own coach (Marcus) and Dani.

## Where the build differs from the boards

- **Player page, "Worth knowing":** 28 boards say "coming, moving and paid up" for a player who owes money. The build says what is owed.
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

## The coach's week, redrawn (Booker, 25 Nov)

`ACT1-AcademyWeek` now shows one team's week: U13 Timber on Tuesday and Thursday, and its game on Sunday. The team, the times, the 16 players and the week of term are read from the list. The plans in each row are still sample. The board is not redrawn in the pack; it still shows three programs.

## Not done

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

---

# Packs v29 to v32 (25 Nov): report back

Four packs arrived in a row and were built together. Only `programs/` changed in each. The notes above are the v28 build; where they disagree with this section, this section is newer. The table of controls (`PROGRAMS-REPORT.csv`) now has 353 rows.

## What was built

| Pack | What | Screens |
|---|---|---|
| v29 | Fuller Oversight on the owner home | `AD1-AcademyHome` |
| v29 | Trials end with the coach's recommendation | `ACC3-TrialAssess` rebuilt, `ADT1-TrialDecision` new, `AC3-Trials` new columns |
| v29 | Every team trains Monday to Thursday | the data file, `AD3-Timetable`, and every screen that names a day or a time |
| v30 | Messages on every screen | a button in the owner's and the coach's top bar, `ADM1-Messages` new |
| v30 | Figures say where they come from | `AD15-Families`, `AD2-Health` rebuilt, `AC10-AcademySafety` |
| v30 | The partner club as a story, with its fee | `AC11-PartnerClub` rebuilt |
| v31 | Fees run themselves | `AC5-Fees` rebuilt |
| v31 | A page for each coach | `ADCO01-Coach` to `ADCO17-Coach`, one template |
| v31 | Watching a coach | `AD10-WatchCoach` is the list, `ADW1-WatchSession` new |
| v31 | Curriculum down to the night, and a drill library | `AD6-YearPlan` rebuilt, `ADQ1-Session`, `ADL1-DrillLibrary`, `ADL2-Drill` new |
| v32 | The academy coach home, taller and fuller | `ACC1-CoachToday` rebuilt |
| v32 | A tile is as tall as its content | `ACC1`, `ACC1e`, `AD1` |

New stores, each beside the academy's list in `src/screens/academy/`: `trialStore.ts` (trial players and the coach's assessment), `messageStore.ts` (the owner's chats), `coachStore.ts` (coach pay, details and watching), `curriculum.ts` (the plan, the nights, the drills and swaps, over `data/academy-curriculum.json`).

## Checks

- **All 342 screens** in the v32 pack open without an error on the final build. Type check, lint and build are clean. The tap-target check passes.
- **Family app:** 125 hand checks pass. A family tapping "Not coming back" still moves U9 Timber on `AD4` from 10 staying to 9. The survey page writes its five answers to the player in the academy's list.
- **Numbers against the boards, by script:** 17 team pages (12 identical; four differ on grammar and one on a rounding point), 226 player pages (198 identical; 28 differ on the fees line on purpose), 17 coach pages (all numbers match), the coach's team list and 16 player pages (no number differs).
- **The live test still passes:** the roll for Jonah in `ACC2` moves him from 23 of 27 to 24 of 28 on his file, the team list, the coach home and the owner's team page, and holds after a reload.
- **Trials, end to end:** the coach's "Send to Dani" moves the card to "Recommended · your call"; the owner's decision screen shows the coach's own words; "Offer a place" opens the offer. Dragging cards still works on the new columns, and a tap opens the card.
- **Oversight:** taking goals and clips from ten players turned a team's tile mauve and changed the line that names which teams to look at.
- **Messages:** the badge in the top bar counts down as chats are opened; "Ask Priya Nair" does it and says so.
- **Fees:** "Paid another way" moved the fees list, the team page, the player page, `AD11` and `AD1`. "Offer a plan to all" emptied the list and held after a reload.
- **Curriculum:** 483 scripted checks. The rule in the handover rebuilds the data's under-13 grid exactly; all 40 nights open their own session for three ages.
- **Layout rule:** no tile on `AD1`, `ACC1`, `ACC1e`, the club homes or the phone homes grows when the window is made taller.
- One older family check script stops part-way at a step that is out of date ("That's not right" has opened Help since an earlier pack). It is the script that is stale, not the app.

## Counted, and still sample

**Newly counted:** Oversight's meters and tiles; places at a trial player's age; the timetable; the survey (answers, averages, share of 4 or 5, by program); "Worth a call"; the partner club fee (216 game players at $150); the fees tiles and list; coach pay (sessions × rate, term and year so far); each coach's four basics; on the coach home: who came by week, staying for Term 3, survey answered, report drafts, this week's four nights; the grid, the balance of sessions, a night's minutes, and how often a drill is in the plan.

**Still sample, each marked in the code:**
- Trial players are not in the academy's list, so a trial dragged to Joined adds no player. The trial list and all chats go back to the sample on a reload.
- Health: the earlier terms, the year's trials (58 of 97) and why families left. Families: the comments and "I enjoyed today".
- Coach pages: mobile, email, emergency contact, first aid, the agreement rows, past pay days. The full mobile is made up, and "confirm it is you" has no real check behind it.
- Watching: filmed dates for every coach but Sofia, and the coach's own marks.
- Curriculum: the data names drills for striking the ball only, and has words for one drill. So the year outside the written term, equipment, which drill sits on which night, and the grids for under 6 to under 11 (built by the handover's rule) are ours. Wednesdays for those ages read "Topic not written yet".
- Coach home: Sunday's result and its numbers, the family's comment, the thing to try, the "needs you" line.
- Ball rolling is still switched off, so it is hidden on `ACC1`, `AD8` and `ADW1` where the boards draw it.

## Where the build differs from the boards

- **Trials (`AC3`):** cards can be dragged (Booker, 25 Nov). A card dragged somewhere it has not earned says so plainly, for example "No recommendation yet".
- **`ACC3`:** opens filled in as the board draws Arjun. After "Send to Dani" the taps lock. "If a place opens" shows only when the recommendation is another team.
- **`ADM1`:** no chip is pressed to begin with.
- **`AC5`:** "Paid another way" asks cash or bank transfer first. "Offer a plan" moves the family to "On a plan" at once.
- **`AD10` and the coach page:** "Pick a session" and "Watch a session" open the session. On the boards the two point at each other. "I watched one in person" works, and `ADW1` has a "Mark a moment" row.
- **Curriculum:** Swap changes the drill in place, with "Put back". "Used this term" is counted from the plan, so five drills read "Not used this term". "By the end of term" uses the academy's own step lines. `AD22-ChangeBlock` now really changes the block.
- **Coach home:** the nights say what the data says (who came, which night was filmed), not the board's typed lines. Sunday is at Wattle Creek FC.
- **Times the boards have not caught up with:** the coach's one-on-one is Friday 4:15 (`ACC5` still draws Thursday 6:45); review chats moved to Friday 19 June because their slots fell inside training; one-on-ones in the family app are Friday and Saturday with Dani and Reece.
- **Rounding:** two attendance figures read 93% where the pack has 92%. The pack rounds 92.5 down.
- **The coach's week (`ACT1`):** the build keeps the one-team week. The v30 and v32 boards are still the old three-program week with a Saturday game at another club.
- **The older owner Messages page** is no longer reachable; the menu opens `ADM1`.

## Not done

- Asking a coach to cover does not clear "U13 Gold needs cover" on `AD1` or `AD3`.
- "Message the club", "Message these families" and "Message Ben" open Messages on the first chat.
- "Change the fee" for the partner club opens `AD21`, which has no field for it.
- "Attach a drill" on `ADW1` is a link only. A swap on the owner's side does not reach the coach's session plan, or the other way.
- Swapping a whole night; "Save as the plan", "Share with families", "+ Add a drill".
- The offer screen (`ACP2`) shows its own sample family whoever the offer is for.
- The older parent and player apps still say Tuesday and Thursday at 4:30.

## Things in the packs that do not agree

- **`AC5`:** the rule is three tries and two reminders, but three rows on the list are one week late with two tries and one reminder.
- **`AD10`:** "Feedback opened 7 of 6".
- **Coach pages:** five coaches are paid for seven sessions in a fortnight where the page says they ran every session.
- **`AD15`:** the trust panel says "40 to 75 answers" and "8 to 14" a team; the table and the data say 77, and 7 to 15.
- **`AC3`:** "June so far · 4 joined", with Kai and Ana joined in May.
- **`ADT1`:** "5 families waiting for Advanced" above "Nobody is waiting for U13 Gold".
- **`ACC1`:** Sunday at "Redgum Reserve" beside "at Wattle Creek"; the nights' "came" counts do not match the roll; "can you cover U13 Gold" at the time Reece trains his own team.
- **`ACP2`:** Advanced at 5:30 to 6:40; `ADP3` says 4:30 for an under 9. The build reads the time from the team.
- **Drill library:** Weak-foot gates is used 7 times on one screen and 14 on another; "Most used first" over a list in file order; all 24 sample drills are striking drills.

## For Booker to decide

- Should an offered payment plan stay on the fees list until the family accepts?
- The fees list: 13 families as drawn, or only the 10 who meet the page's own rule?
- "Watch next" names a coach as lowest on two basics. Is that too close to ranking coaches?
- Grids for under 6 to under 11: built by rule as now, or shown as not written yet?
- Equipment for a night: the most any one part needs (as built), or added up?
- The drill drawing uses amber cones. Keep, or recolour, since amber is proof only?
- Should the trial assessment open filled in, and lock after sending?

---

# Packs v33 and v34 (25 Nov): the coach's session plan and who's coming

Two coach screens, each rebuilt. `ACT3-AcademySessionPlan` (v33) and `ACT4-AcademyComing` (v34).

## What was built

- **`ACT3`, the session plan.** A dark band for tonight's one thing; a card for each part with a set-up drawing, how tonight's numbers split into groups, film, and seven lines (Why, Set-up, How it runs, Say, Look for, Easier, Harder); the wrap-up; and a right column (one thing each, why tonight looks like this, who and what, when it's done, open view).
- **It is the same session the owner sees in `ADQ1`.** A swap by the coach shows on the owner's year plan and session screen; a swap by the owner shows on the coach's plan as "Dani put this in".
- **Pitch view** has no board in the pack. It is built inside `ACT3`: one part at a time in big type, with a countdown that starts, pauses and resets, and the two taps at the end.
- **`ACT4`, who's coming.** A band of five numbers; one table for the team in name order with a square for every session this term and a line on what it shows; and a right column (the card for someone who has missed the last three and not answered, by night, does coming matter, make-ups).
- **Tonight's answers from parents** are not in the data. They are one marked sample, in one place (`coachTeam.ts`), read by the coach home, the session plan and who's coming. The roll takes over as soon as it is taken.

## Checks

- All 342 screens open without an error on the final build; type check, lint and build are clean. The family app's 125 hand checks pass.
- 69 scripted checks on the two screens pass: every control pressed, every button 44px or more, tiles the same height in a short and a tall window.
- **`ACT4` against the board:** the band, all 16 rows and the trial row, by night and "Does coming matter?" all match. The data gave nothing different from the picture.
- **The roll moves both:** marking Jonah here removes the mauve card, changes his row and the band, and adds a square to every row. With two more players away, the groups on each card of the session plan change.
- **Swap, there and back:** coach swaps on `ACT3`, it shows on the coach home, the owner's year plan and `ADQ1`; the owner swaps another part there and both show on `ACT3`; "Put back" clears the coach's.
- The curriculum's 483 checks still pass.

## Where the build differs from the boards

- **A coach's swap is kept for that coach's team, not for the whole age.** Otherwise Reece's swap would change U13 Gold's night too. `ADQ1` says a part was swapped for that team but does not yet name the drill put in.
- **The coach home's "Swap a drill" opens the session plan**, where each part has its own Swap. The board links it to the suggestions screen.
- **Times:** the library gives the third drill 15 minutes; the board says 20. The build shows 65 minutes in the 70-minute slot.
- **"Four goals" has no film** in the library, so its card says "No film yet · film it tonight". The board draws a film.
- **Equipment** is added up from the drills ("10 balls, 24 cones, 6 bibs"); the board says 16, 24 and 8.
- **One thing each** reads each player's goal from the list, and lists Sienna as well as Ana, since both have no goal.
- **"Not coming" and "No answer"** are two rows (Mila; Jonah), following v34. The v33 board puts both under "Not coming".
- **`ACT4`:** each night shows its count under the bar, by the rule that a rate is shown with its count.

## Not done, or still sample

- A swapped-in drill with no written words shows only "Look for", and says the rest is not written yet.
- The set-up drawings are the library's sketches. Film playback is a line of text.
- Sunday's "2 of 11 chances", the filming line and who is coming in from U13 Gold are sample.
- The library's "used" counts do not count a coach's team swap.

## Things in the packs that do not agree

- The curriculum data makes under 13s week 7 Thursday a small-games night with no drills; the v33 board gives it four striking drills. The build follows the board for that night.
- v33 says "Not coming: Jonah, Mila"; v34 says Mila is away and Jonah has not answered.

## For Booker to decide

- A coach's swap: for their own team only (as built), or for every team at that age?
- Should the coach home's "Swap a drill" open the session plan (as built) or the suggestions screen (as drawn)?

