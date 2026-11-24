# Clean Sheet Academy v9: report back (24 Nov)

From `clean-sheet-handover-v16` to `v24`, part 4: the whole academy, every screen. This replaces the Academy v1 report. Everything is a demo on sample data. The filled-in table is `ACADEMY-REPORT.csv`. The club's children checks (`DCK1`) are reported here too; the review dashboards are in `DASHBOARDS-NOTES.md` and the club-side input screens in `CLUB-FLOWS-NOTES.md`.

## Where it is

- Every screen opens by its id, for example `/__screen/AD1-AcademyHome`, `/__screen/ADC8-TeamStyle`, `/__screen/ADP9-PauseOrStop`, `/__screen/ADK1-MySkills`.
- The owner's and the coach's screens each open inside one app with the new menus. The role pill, top right, opens `ADS1-SwitchView`.
- In the family app the Club tab is `ADP1` when the child's club is an academy. "Tall Timber Academy joins" in the Demo box on the Club tab opens it.
- In the empty sandbox every owner and coach menu item shows its empty state.

## What was built

- **Owner:** `AD1` to `AD25`, an empty state for `AD1` to `AD15`, `AD17` and `AD18`, and the role switcher `ADS1`. The earlier `AC1` to `AC11` and their empty states were rebuilt from the redrawn boards. `AC12` is the earlier hand-built screen with its wording and targets brought into line.
- **Coach:** `ADC1` to `ADC18`, the empty states that are drawn, and the earlier `ACC` and `ACT` screens rebuilt from the redrawn boards. The game review `ADC7` is the dashboard.
- **Player, 13 and over:** `ADK1` to `ADK4`. The earlier `ACK1` and `ACK2` are rebuilt from the boards.
- **Family app:** `ADP1` to `ADP16` and the seven empty states that are drawn. The earlier `ACP` screens are rebuilt from the boards and carry the family app's tab bar.
- **Club:** `DCK1-ClubChecks` and its empty state, in the director's and the welfare officer's Children checks tab.
- **Menus.** Owner: Home, Programs, Players, Curriculum (Year plan, How we coach, Our style, Session quality), Coaches (Coaches, Children checks, Roster and pay, Watching a coach), Money. Coach: Today, Players, Training, Game day (This Sunday, Team sheet, Live game, Review, Our style), Record, Learn.
- **The four core skills** everywhere in the academy.

Most of the owner's, coach's, player's and old parent screens are generated from the boards' own source, so the wording, sizes and colours are the boards'. The two converters are in `scripts/design-convert/`. Running one again overwrites hand edits on `AD8`, `AD10` and the skills line on `AC7`.

## Checks

- **Owner, 398 controls:** all pressed at the board's size. 394 do what the table says. The four that differ are two Ask buttons that open the director's own Ask panel, and two stepper buttons that are switched off because the value is already at its limit.
- **Coach, player and old parent, 592 controls:** all pressed. 591 do what the table says. The one that differs is "Book the trial" on `ACP1`, which now opens the new question page first, as the handover says and the table does not.
- **Family app:** all 229 controls on the `ADP` screens were pressed. 212 pass the script as written. The other 17 were pressed by hand and work: 10 open an older page over the top, 5 are survey buttons the script mismatched, and 2 name Ari where the board names Kai. A further 125 hand checks walk the family flows end to end, and all pass.
- **Menus:** every main and sub-menu item was pressed from old and new screens, with content and empty, for the owner and the coach.
- **All 193 screens in the three v24 tables open without an error** on the final build. The tap-target check passes.
- Of the "Says" controls, many show their line and change nothing else. The table marks each one.

## Not shipped yet, behind switches

- **Ball rolling from film** (`AD8`, `AD10`): `BALL_ROLLING_FROM_FILM` in `src/screens/academy/notYet.ts` is off. `AD8` reads "Not filmed" and the target tile is hidden. **What `AD10` hides is our reading; please confirm.**
- **Film counting the skills check** (`ADC4`, `ADC13`): `FILM_COUNTS_SKILLS_CHECK` in `src/screens/academycoach/skills.ts` is off. Nothing reads "Strong" or "from film".
- **Chance values** (`ADC16` and the Chances tab on `ADC7`): behind `SHOW_CHANCE_QUALITY_TILES` in `src/screens/dashboards/kit.tsx`, which is **on** in the demo so the screens match the boards. It must be off before real academies see it.
- **`AD13` connections** and the **voucher pages**: every control says its line and nothing more. Nothing is redeemed.

## For a lawyer before launch

`LEGAL-CHECK.md` in the pack lists the questions. These are the screens in the build that state a position from it:

1. **Working with Children Check:** `AD17`, `DCK1`, `AD23`, `AC6`, and one line each on `AD1`, `AC1`, `AD16` and their empty states. They say: check before a person starts; connect within 7 days for paid coaches and 21 for volunteers; keep a record; a person not checked and connected cannot open a session or see a player; in force in Victoria from 19 October 2026.
2. **Child Safe Standards:** `AC10` says they apply to private academies. `AC10`, `AD7` and `ADP6` say one-on-ones are in open view.
3. **Filming and the age line of 13:** `ADC3`, `ADK2`, `ADP5`.
4. **Money:** `AD9` and `AD21` ("not payroll: tax, super and the right award are yours"); `AD12` (refunds, pauses, make-ups, vouchers); `AC5` and `ADP3` (three parts, no extra cost); `AC9` (refund up to 7 days before); `ADP6` (full amount back 24 hours before); `ADP9` (pause and stop); `ADP16` (vouchers).
5. **References and the passport:** `AD14`, `AD25`, `ADP13`. The family sends it, never the academy.
6. **Survey:** `AD15`, `ADP11`. Never shown by family; a group under 5 is hidden.

## Where the build differs from the pack

Owner:
- **Home until set-up is done.** There is no stored set-up progress. Home is `AD1`, and `AD16` has its own place under Home. In the empty sandbox Home is `AD1e`, whose button opens `AD16`.
- **The role pill is a button on every screen** and always shows all four roles. The handover says a person with one role sees no button.
- **`AD23`**: the two ticks hold, but "Send the invite" works either way, and the card number is not hidden once saved.
- **The club's Safeguarding sub-menu** keeps its six existing tabs. `DCK1` is the Children checks tab and "Welfare cases" is added at the end. There is no "Overview" item, because that tab has no overview page.
- **Messages and Academy colours** still follow the owner's Home sub-menu. They were already built and have no other place.

Coach and player:
- **`ADK2`**: a picked clip has a dark edge and a white tick. The board marks it in amber, and amber is for proof only.
- **`ADC2`** is sorted by first name. The board says "Sorted by name" and draws another order.
- **`ACK1`** has three plain links to `ADK1`, `ADK2` and `ADK4`, which the handover names and the board does not draw.
- **`ACP4`** has a "Have a sport voucher?" link, for the same reason.
- **`ADC17` "No"** says its line. It does not ask which number or open `GP8`.
- **What is typed on one screen does not show on another.** A goal saved on `ADC10`, the four lines on `ADC12` and the steps on `ADK1` do not appear on `ADC1`. The step rule from `ADC11` and the team style from `ADC8` and `ADC9` do carry across.
- **`ADC3`, `ADC4` and `ADC5`** show Kai's pane only. The others are not drawn.

Family app:
- **Headings read "Ari · Tall Timber Academy".** The boards say "Ari K"; the family app holds no surname.
- **The chat button shows on the academy's pages.** The boards do not draw it; the family handover puts it on every green header once the club has joined.
- **Empty states open by address,** and "Before Ari starts" in the Demo box on `ADP1` opens the first. The sample family always has something to show.
- **Screens that arrive by notification** (`ADP6`, `ADP7`, `ADP11`, `ADP12`, `ADP14`) open from the Demo box on `ADP1`.
- **`ADP13`** names the child in the switch. The board draws Kai. Its row on `ADP1` shows from the year a player turns 15, so the sample family reaches it from the Demo box.
- **`ADP9` "Stop this term"** shows the academy's rule and a button, "Ask for the unused weeks back". The board draws only the pause.
- **After a choice,** `ADP1` says so: the place kept or released, the chat booked, the place paused. None of that is drawn.
- **Links that leave the family app** for an older page open it over the top: make-ups, "Message Reece", the passport, the trial pages, Fees and "share it". Those older pages still name Kai.
- **The team pages, the coach page and Fees** show the same sample week for an academy as for a club, with Reece as the coach.

## Not built

- Empty states for `AD16`, `AD19` to `AD25`, `ADS1`, `ADC10`, `ADC12`, `ADC14` to `ADC18` and the `ADK` screens. None is drawn.
- What sits behind most "Says" controls: sends, reminders, spoken notes, the spreadsheet column pickers, entering heights.
- Totals and the mauve tile on `AD3` are the drawn figures, not worked out from data.
- The owner's guided tour has no new steps.
- The older short addresses `academyparent` and `academyplayer` still show the earlier parent and player apps with their old tab bars. The board ids do not.
- Old code that no longer shows at any board id is still in the repo where other files import it.

## Things in the pack that do not agree

Built as drawn; listed so the designs can be fixed.

- **Dates:** `AD17` and `DCK1` say the Victorian rules are in force from 19 October 2026, and the sample day is 4 June 2026. `ACT1` reads "term 3, week 4" with a game on "SAT 6"; `ACC7` says Sunday 7 June.
- **Coaches checked:** 3 of 4 on `AD16`; all four on `AD17`.
- **Players up a step:** 61 of 80 on `AD1`; the rows on `AD8` add to 67 of 88.
- **Advanced:** 5 waiting on `AD2` and `AD4`, 2 empty places on `AD11`. The group is 22 on most coach boards, 20 on four, 11 on the training boards, 23 on `ADC4`.
- **Ana Costa** joined 3 weeks ago on `AD4` and on 2 June on `AC3` and `AC4`.
- **Kai's mum** is Adaeze on `ADC5` and Tess on `ACC5`, `ACC4` and `ACP4`.
- **`AD18e`** says six questions; the style set-up it opens has five.
- **`AD21`** uses "Aim down one step" and "Aim up one step" as the lines for changing a pay rate.
- **`AC11` "How it works"** opens a welfare concern form.
- **`ADC14`** is about Ruby but opens from Kai's file.
- **`ADC1`**: the handover says a gap of one step raises the mauve note; the board draws it for one skill where two have a gap.
- **The Menus table** in the handover still lists Review as `R1` and Learn as `LN1`; the boards and the wiring say `ADC7` and `ADC18`.
- **`ACP1` and `ACP4`** boards do not draw the links to `ADP15` and `ADP16` that the handover describes.
- **`ACC4e` and `ACP5e`** still say "five skills". Built as four.

## For Booker to decide

- What `AD10` hides while ball rolling is off.
- Whether the owner's look-around Home is `AD1` or the story home (`STORY_HOME` in `AcademyOwnerApp.tsx`).
- Whether the chat button belongs on the academy's family pages.
- Whether `AC12` should be redrawn to match its board.
- Junior games on Sunday across the older club screens (`SUNDAY.md`): not done in this build; it is the next job.
