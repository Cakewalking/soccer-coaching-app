# Club-side input flows v1: report back (24 Nov)

From `clean-sheet-handover-v22` and `v23`, part 6. Ten input screens: eight on the tablet (`GP1` to `GP8`, and the empty state `GP1e`) and two in the family app (`GPp1`, `GPp2`). Everything is a demo on sample data. The filled-in table is `CLUB-FLOWS-REPORT.csv`.

## What was built

| Screen | What it is | Opens from |
|---|---|---|
| `GP1-AfterTraining`, `GP1e` | Notes and "better tonight" after a session | "Save and finish" on the pitch-side screen; Training, "After training" |
| `GP2-AddPlayer` | Add a player by hand | "+ Add player" on Squad |
| `GP3-ChangeRole` | Change a person's role | Each "Change" on Club roles |
| `GP4-LinkAcademy` | Link an academy | "Link an academy" on the empty partner-academy page |
| `GP5-AddSponsor` | Add a sponsor | "Add a sponsor" on Sponsors |
| `GP6-SendLesson` | Send a lesson to players | "Send to players" on a lesson (`EDU2`) |
| `GP7-MiniGoal` | A goal for a MiniRoos child | "Change the goal" and "Set a goal" on the child's page |
| `GP8-ReportNumber` | This number looks wrong | "That's not right" on `QC9`; "Tell us a number looks wrong" on `QC10` |
| `GPp1-ClubSurvey` | The club's survey, twice a season | A Demo box on the family app's Club page |
| `GPp2-TellMyClub` | One email to the club, sent for the parent | The last step of the club tour; "Have us send it for you" on the older Tell my club page |

Each opens by its id, for example `/__screen/GP1-AfterTraining`.

## Checks

- All 91 tablet rows in the pack's table were pressed at 1180 by 820: 90 do what the table says, and one differs on purpose (the sponsor box, below).
- Every button that was rewired was pressed, and the nine tablet screens were compared with their pictures.
- The two family pages were compared with their pictures and pressed by hand: each survey question, Send, Read it first, Send, and both ways between the two Tell my club pages.

## Tell my club: the rule changed (Booker, 24 Nov)

A parent can send the message themselves, or have Clean Sheet send one short email from them. Both pages say so, and each links to the other. The lines that used to say "We never contact your club" on the Tell my club, pick-a-club, add-a-club and add-a-child pages now say we contact the club only if the parent asks.

## Rules that are kept

- **`GP1`**: only the head coach and the assistant coach can open it.
- **`GP2`**: five fields, none of them medical or consent. A player added by hand shows "waiting on parent · no filming until consent is given".
- **`GP3`**: every role with children saves as "can't start until a children check is on record".
- **`GP5`**: the box for a logo on children's clips and reels can never be ticked. The wiring table has it say "ticked"; the ledger says it can never be, and the build follows the ledger. Gambling and alcohol names are refused.
- **`GP6`**: no table of who watched, and no watch time.
- **`GP7`**: a goal with a number in it is not saved.
- **`GP8`**: after sending, the number reads "Being checked".
- **`GPp1`**: sent without a name. All five questions need an answer.
- **`GPp2`**: the email needs a name, who gets it, and an email or mobile.

## Where the build differs from the pack

- **Ways in that are not done, because the named button is not in the build:** `GP1` from the coach's phone; `GP2` from `X5-ProfileEmpty` and `HM2c`; `GP4` from the filled partner-academy page; `GP6` from `EDU6` and `CL1-Playlists`; `GP7` from a child's card on `HM2`; `GP8` from `RC8-HowWeMeasure`. Say which of these you want and where the button sits.
- **`GPp2` from the club's web page (`FAMc1`)** is not done: that page has no Tell my club button.
- **Seniors** get a line, "Share the team link with the new player.", from "+ Add player". They have no parent to invite, so `GP2` does not fit.
- **`GP6` has a row of name pills** under "Pick players", so the count sent is real. The board does not draw it.
- **"Being checked" shows on `GP8` only.** The ledger wants it on every screen that shows the number. The review dashboards do not show it yet.
- **`GP1`** shows the six players drawn, not the whole squad, and "Better" does not yet tick the player's goal on the goals page.
- **The frames are the build's own.** The coach's menu has Record and Learn; the director's has no sub-menu row while `GP3` to `GP5` are open; `GP7` opens for the build's under-9 team.
- **`GPp1`** names the family's own club (Hillview). The board says Wattle Creek.

## Not built

- **Junior games on Sunday.** `SUNDAY.md` in the v23 pack says every junior and MiniRoos game is on a Sunday and lists the older club screens that still say Saturday. That change is being made separately.

## Things in the pack that do not agree

- `GP5-AddSponsor#15` in the wiring (above).
- `GP2`'s board lights Squad but draws Home's sub-menu.
- `GP8-ReportNumber#17`, "Add a clip", says "The clip plays."
- The playlists page in the build says "Watched twice", which does not fit `GP6`'s rule that the coach sees who watched, not how often.
- `GPp2`'s wiring sends its tabs to the pages a family sees after the club has joined, though the page is for a family whose club has not.
