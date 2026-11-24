# Junior games on Sunday: report back (24 Nov)

From `SUNDAY.md` in the v24 pack. The rule: every junior and MiniRoos game is on a Sunday. Senior games stay on Saturday. Everything is a demo on sample data, and the sample year is 2026.

## What was changed

- **About 1,000 places in 276 files.** Before, `src/` said Sat or Saturday 1,161 times in 303 files. Now it says it 180 times in 88 files, and each one left is listed below.
- **The word and the date move together.** Sat 6 June is now Sun 7 June, Sat 30 May is Sun 31 May, Sat 13 June is Sun 14 June, and so on. A date that was already a Sunday in 2026 (Sat 14 Jun, Sat 21 Jun, Sat 7 June, Sat 13 Dec, Sat 1 Nov, Sat 31 May) kept its number and only the day name changed.
- **Week strips.** Saturday now reads Rest and Sunday holds the game, on the coach's home, the fitness coach's home, the youth coach's home, the MiniRoos home and week, and the boards `T1` and `HM1`. No strip has two Sundays or a gap.
- **Calendars.** The MiniRoos calendar has its games on 7, 14 and 21 June. The director's calendar reads Sunday 7 Jun, 14 games.
- **Day counts.** "2 days to Harbour Rovers" is now 3 days. The youth coach's "Game in 2 days" is now 3.
- **Dates with no day name** that were game Saturdays moved too: chart labels (9 May is 10 May), round 1 (11 April is 12 April), grading games (14 to 28 March is 15 to 29 March), a few clip and note dates. About 35 places.
- **Tours and stories** say Sunday wherever the screens do.

## Seniors stay on Saturday

- Senior data was left alone: the Men's 1sts home, fixtures, availability, formation, chances, session, story and the adult player's page.
- Many coach screens are written once for a junior team and shown to the senior coach with the names swapped (`src/teamNames.tsx`). That swap now also puts the game day back to Saturday for seniors. Two real Sundays are kept: the last day of the week, and the day the next plan is suggested.
- Screens that are told the team now pick the day from it: squad list, player profile, formation, line-ups, where we're at, messages, ratings, the session screens, the match day toast.
- The senior coach's app was walked tab by tab after the change. It reads Saturday everywhere it did before.

## Left on Saturday, and why

- **Seniors:** all of the above.
- **Saturday is now the rest day** in the week strips.
- **Not a game day:** the club course (Sat 20 Jun), trial days, the holiday dates (Sat 27 June to Sun 12 July), the come-and-try day, a place held until Saturday 16 May, the Saturday make-up session, a welfare "call by" date, the day stamps on private welfare messages, a program start date, a coaching course, the end of season lunch poll, set-up help hours, a survey's time choices, the stand-in's start date, and the lists of weekday names.
- **Head knock dates** (Sat 23 May, Sat 30 May) and one training injury. Nothing says they happened in a game, and moving them changes the day counts. The "earliest game" line now says Sun 14 Jun.
- **Not a day at all:** "Sat out 2" on the team sheet, and the name of a link, "Match day tab (Sat)".
- **The folders that were out of scope** (family, academy, dashboards, club flows) were not touched, apart from three sample lines in `dashboards/data.ts` that still said Saturday for U9 Tom and U16 Ollie.

## Things a person needs to look at

- **The summer cup** (`SP10`, `SP11`, `SP12`, `SPp3`, `SPp6`) is still Sat 21 and Sun 22 November, with group games on the Saturday. A two-day cup does not fit the rule. Say whether it should be one day.
- **The director's small month view** (Club, older calendar tab) still lists Sat 9 and Sat 16 and "Today, Sat 8 Nov". Its dates did not agree with each other before, so it was left.
- **`ACT1-AcademyWeek`** (academy coach, out of scope) still shows the game team on SAT. `ACC7` says Sunday.
- **Photo day** moved with the games to Sunday 21 June, because the message says it is after the morning games. Move it back if the club holds it on its own day.
- **The review row is gone from the week strips.** Sunday used to read "Review, once it's in". Sunday now holds the game, and the review comes back the same day.
- **`T1s-HomeSunday`** is the day after a game, so it now reads Monday 8 Jun. Its name still says Sunday.
- **The start page** now says "An edge on game day" and "They get a result on Sunday".
- **Pre-season.** Friendlies and grading games moved to Sundays. A trial morning was already on Sun 22 March, which is now also a grading day. The free dates for a friendly are three Sundays, where there were three Saturdays and one Sunday.
- **The MiniRoos calendar** had every date one column to the right. That is fixed, or the games would have sat under Monday.
- **The stand-in's fortnight** ends with the game and the hand back on the same day, Sun 11 Oct.
- **Old mismatches that are still there:** the week header reads "Mon 2 to Sun 7 Jun" (Monday is the 1st); the review dashboard dates the Ironbark game Sun 7 June where the fixture list says Sun 31 May; the opposition page says "home" for an away game.

## How it was checked

- One scripted pass made the plain swaps, with seniors, non-game Saturdays and week strips held back. Those were then done by hand, about 150 places.
- Every Sat and Saturday left in `src/` was read and put in one of the groups above.
- `npx tsc -b` passes. `npx oxlint` on the changed files gives no errors.
- On screen at 1180 by 820: the junior, youth, senior and MiniRoos coach apps were walked tab by tab and every line naming a day was read. About 55 more screens were opened by id and read the same way: director, coordinator, team manager, parent, young and older player, referee, keeper and fitness coach, pre-season boards, stories.
- 13 screens were looked at as pictures: coach home, the day-after home, this week, fixtures, MiniRoos home and calendar, the director's home and calendar, team manager home, parent home, two children, older player home, stand-in home.
- Not pressed: toasts and pop-up sheets. Their words were changed and read in the code only.
