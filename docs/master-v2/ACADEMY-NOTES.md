# Clean Sheet Academy v1: report back (24 Nov)

From `clean-sheet-handover-v15`, part 4. 26 new screens: 15 for the academy owner (`AD1` to `AD15`), 6 for the academy coach (`ADC1` to `ADC6`) and 5 for the academy inside the family app (`ADP1` to `ADP5`). Everything is a demo on sample data. The filled-in table is `ACADEMY-REPORT.csv`.

## Where it is

- Every screen opens by its id, for example `/__screen/AD1-AcademyHome`, `/__screen/ADC1-PlayerFile`, `/__screen/ADP1-AcademyHome`.
- The owner's look-around Home (`/look/academyowner`) is now `AD1`. It used to be the story home `STO14`, which keeps its own address. `STORY_HOME` in `src/screens/AcademyOwnerApp.tsx` puts it back.
- In the family app, the Club tab is `ADP1` when the child's club is an academy. The sample academy, Tall Timber Academy, is in the club list, and "Tall Timber Academy joins" in the Demo box on the Club tab opens it.

## What was built

- **Owner:** `AD1` to `AD15`, in `src/screens/academy/`. `AD1` replaces `AC1` as Home.
- **Coach:** `ADC1` to `ADC6`, in `src/screens/academycoach/`. `ADC1` replaces `ACC4` as the coach's player screen; `ACC4` opens from the goal card.
- **Family app:** `ADP1` to `ADP5`, in `src/screens/family/FamilyApp.tsx`.
- **Menus, on every academy screen, old and new.** Owner: Home, Programs, Players, Curriculum, Coaches, Money. Coach: Today, Players, Training, Game day, Record, Learn. The sub-menus are the handover's table. Each menu is one table in code (`ownerMenu.ts`, `academycoach/menu.ts`).
- **The four core skills** replace the five on `ACC4`, `ACC6` and `ACP5`, and also on the trial assessment (`ACC3`), the academy player's home (`ACK1`) and the owner's reports (`AC7`), because the handover says "everywhere in the academy". Say if you want any of those three put back.

## Checks

- All 245 controls in the pack's table were pressed on a local build at the board's size. Every "Opens" control opens the screen the table names. Notes against a row in the table say where the screen that opens is an older one with different sample data, or where a "Says" control shows its line and changes nothing else.
- Every menu and sub-menu item was pressed from old and new screens, for the owner and the coach.
- All 26 screens were compared with their pictures. No tap target is under 44px.
- The four totals in "Done means" reconcile: `AD4` 52 + 24 + 4 = 80; `AD11` $25,180 less $5,600 less $3,735 is $15,845; `AD9` $1,160 over 30 sessions; `AD2` 62 + 18 = 80.
- The family app's earlier 93 checks still pass, and the tap-target check passes.

## Not shipped yet, behind switches

- **Ball rolling from film** (`AD8`, `AD10`): `BALL_ROLLING_FROM_FILM` in `src/screens/academy/notYet.ts` is off. `AD8` reads "Not filmed" for every coach and the target tile is hidden. On `AD10` the film-timed session shape is hidden and the four ratings stay. **The handover names `AD10` but it has no target tile, so what is hidden there is our reading. Please confirm.**
- **Film counting the skills check** (`ADC4`): `FILM_COUNTS_SKILLS_CHECK` in `src/screens/academycoach/skills.ts` is off. All four stations read "You counted". The wording of the off state is ours, because it is not drawn.
- **`AD13` connections** and the **`AD12` voucher check**: every control says its line and nothing more.

## Where the build differs from the pack

- **The chat button shows on `ADP1` to `ADP5`.** The boards do not draw it, but the family handover puts it on every green header once the club has joined. Say if an academy should not have it.
- **`ADP` headings read "Ari · Tall Timber Academy".** The boards say "Ari K"; the family app does not hold a surname.
- **After "Keep my place"**, the card on `ADP1` reads "Ari's place is kept. A receipt is in Fees." and the button goes. After "Not coming back" it reads "Ari's place has been released." With three parts picked, the button reads "Keep my place · $96.67 now". After a chat is booked its row says when. None of this is drawn.
- **"Not coming back" says its line** and releases the place. The two questions are not drawn, so they are not built.
- **The make-up link on `ADP1`** opens the older make-up page (`ACP6`), which names Kai, the older sample child.
- **The team pages, the coach page and Fees in the family app** show the same sample week for an academy as for a club, with Reece as the coach.
- **Owner Home's sub-menu has two more items**, Messages and Academy colours, after the handover's seven. They were already built and had nowhere else to go.
- **The Ask Clean Sheet button** stays on the owner's and the coach's screens. The boards do not draw it.
- **`ADC2` is sorted by first name.** The board says "Sorted by name" but its drawn order is not alphabetical.
- **`ACC4` and `ACC8` open different things by address:** `ACC4-PlayerPlan` opens the player plan (it used to open the players list, which `ADC2` replaces), and `ACC8-AcademyRecord` opens the Record page with its menu (it used to open the full-screen recording, which is still at `ACC11`).

## Not built

- Empty states for the 26 screens. They are not drawn. In the empty sandbox the new screens show their sample state.
- What sits behind most "Says" controls: the skills check itself, spoken notes, the other players' panes on `ADC3`, `ADC4` and `ADC5` (only Kai's is drawn), reminders, cover requests, the spreadsheet import, the export.
- The `AD5` check chips opening the notes and clips behind them, and a `Strong` chip showing the film it came from. Both are rules in the handover with no control in the wiring.
- Totals and the mauve tile on `AD3` are the drawn figures, not worked out from data.
- An academy version of the view switcher, of the player passport and of Learn. Those controls open the club's (Wattle Creek FC, Mia Tran, Luke Fraser).
- Game day's Team sheet, Live game and Review for the academy coach open the club coach's screens over the top.

## Things in the pack that do not agree

Built as drawn; listed so they can be fixed in the designs.

- **Players up a step:** 61 of 80 on `AD1`; the rows on `AD8` add to 67 of 88; `STO14` says 71 of 80.
- **Fees billed:** $23,020 on `AD1` and `AC5`; $25,180 on `AD11`. The gap is the one-on-ones.
- **One-on-one coach cost:** $300 for the term on `AD11`; $100 a fortnight on `AD9`, which is $500.
- **Advanced:** 5 waiting on `AD2` and `AD4`, but 2 empty places on `AD11`. The group is 22 on `ADC2`, `ADC5` and `ADC6`, 20 on `ADC3`, 23 on `ADC4`.
- **`AD14`** is headed "6 players turn 15 this year"; the players listed are 12, 13 and 14.
- **`AD15`** says 58 of 74 families; 80 players with 8 sibling families is 72.
- **`AD12`** says 3 of 4 supported places; `AC5` says 2 scholarship families. The late payers' names differ between `AC5` and `AD2`/`AD12`.
- **`ADC1`:** the handover says a gap of one step raises the mauve note. The board has a gap of one on First touch with no note.
- **Kai's mum** is Adaeze on `ADC5` and Tess on the older `ACC5`.
- **Dates:** the handover says Term 2, week 7, Thursday 4 June. `ADC4` is set in week 8, `ADC5` in week 9, and the older `ACT1` reads "term 3, week 4".
- **Sample that opens from a control but belongs to someone else:** the 4:30 Development row on `AD1` opens `ACC2`, drawn for 5:30 Advanced; every `AD3` tile opens the one `ACT3` plan; "Turn it on for Development" on `AD15` opens `ADC6`, drawn for Advanced; "Make-ups owed" on `AD12` opens the parent's phone screen.

## For Booker to decide

- The four items the handover lists as undecided: the "Worth a call" thresholds, the number of reminders, whether `ACC4`, `ACC6` and `ACP5` are redrawn, and whether the owner sees each coach's ratings in a two-coach academy.
- What `AD10` hides while ball rolling is off (above).
- Whether the owner's look-around Home should be `AD1` or the story home.
- Whether the chat button belongs on the academy's family pages.
