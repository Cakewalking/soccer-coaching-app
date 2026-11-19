# Learn to coach v3, player-led: report back (19 Nov)

Build: the commit that adds this file. v3 replaces v1 and v2. The 30 lessons, 60 words and 11 sources are loaded from data and shown as written. **No lesson text was changed**; `lessons.json` and `words.json` in v3 are identical to v2. A check opens all 30 lessons and compares the title, idea, steps, words, "instead of", task and every answer against `lessons.json`.

## The player

One component (`src/screens/learn/LearnPlayer.tsx`) on the course home, every lesson and the phone lesson.

- It plays in the page, with play and pause, chapters on the scrubber that jump when pressed, the time, a captions switch and full screen.
- Captions are on by default. The choice is kept against the coach.
- When it ends it shows the "Try it" still with its button. The next lesson does not start by itself.
- "Try it" is pinned at the top of the right column on the home and the lesson. At 1180 by 820 the player and "Try it" are both fully visible on both.
- Up next: the coach's own clip first when there is one (it plays in the player), then the next two lessons; on a lesson, the next lesson in the module.
- Progress is one strip of six module chips. Confidence ratings are on "Your season" only.

**No film exists, so every lesson is in the boards' "film coming" state** (`LN1n`, `LN4n`). There is no "The film" chapter anywhere. The chapters are: "Your team" when a clip fits, the lesson drawn, then "Try it". `LN1-LearnHome` and `LN4-Lesson` open as their no-film versions.

Things to know about the drawn chapter:

- The pack has no drawing per lesson, so it is the same animated practice square for all 30 lessons. Its captions are that lesson's own idea and steps, ten seconds each, which is also its length.
- "Your team" shows only for U11 Luke, on the lessons that carry a clip. It is drawn the way clips are drawn elsewhere in the app, with the lesson's example caption.
- A lesson always has an idea, so the player is never hidden. The rule "if neither exists, hide the player" never applies yet.

## The controls

All 568 controls in `LEARN-TO-COACH-REPORT.csv` were pressed on a local production build.

- 496 work as written.
- 36 work, but the check could not match them by label because the length shown differs from the board (no film exists): the "Up next" rows and six "Your team" chapters. The same controls are covered by a separate test.
- 32 are "The film" chapter on each lesson, the home and the phone. Left out on purpose: no film exists.
- 3 are the club settings switches on the director's page, labelled differently on the page. Unchanged from v2.
- 1 opens a different screen on purpose: "Preview the lesson" on How it went opens the lesson the answer points to.

## Kept from before, not on the v3 boards

- A "How it went" button beside "Back" on each lesson. The v3 lesson board drops the row of steps, which was the only way to reach that page by hand; nothing in the demo prompts it.
- Module names in the strip wrap onto two lines instead of being cut off.

## Gone from the home, as the v3 board draws it

- The course list, the confidence tile and "Talk to Rachel". The mentor is still named on the director's settings; nothing on the coach's home opens a message to her now.

## Where it lives

- Coach › Learn › Learn to coach, in every coach app (junior, assistant, youth, seniors, MiniRoos). It replaces the list of films (`GS8-WelcomeCourse`). Learn became its own top tab on 20 Nov at Booker's direction; the education centre (lessons for players and for coaches, formerly Clips › Learn) sits beside it, and Clips moved inside Record.
- Director › Coaches › Development › Coach learning (`LN9`). The sub-tabs were grouped after the pack was drawn, so it is a switch under Development, not a tab of its own.
- The phone pages (`LNp1`, `LNp2`) open by their ids. Nothing in the coach's phone app opens them yet, because the product sends no notifications.
- Every board opens by its id, drawn at U11 Luke.

## What an answer does next

92 answers across the 30 lessons.

- **Carry on in order: 31. Built.**
- **Point at a lesson (move one up, repeat this one, offer one again): 14. Built.** The lesson becomes "This week" and says "your last answer pointed here".
- **Do something in the product: 47. Not built.** The answer is saved and the line is kept against the coach, but nothing else in the product changes. They are:

  - 1.2 How to read your session in Clean Sheet · “One part I didn’t get”: That drill’s full explanation opens
  - 1.2 How to read your session in Clean Sheet · “Didn’t open it”: A reminder two hours before training
  - 1.3 Setting up before the players arrive · “Had to move things”: A one-page set-up picture is added to your run sheets
  - 1.3 Setting up before the players arrive · “Ran out of time”: Your sessions are proposed with a simpler set-up for three weeks
  - 1.4 Your first two minutes · “Some did”: A tip is added to next week’s run sheet
  - 1.5 When it is not working · “Moved on”: That drill is swapped out of your suggestions for a month
  - 2.1 Head knocks: if in doubt, sit them out · “I don’t know our first-aider”: A message to your club is drafted for you
  - 2.1 Head knocks: if in doubt, sit them out · “Not yet”: A reminder before Saturday’s game
  - 2.2 Heat, storms and bad air · “Couldn’t find our rule”: Your director is told a coach couldn’t find it, without your name
  - 2.2 Heat, storms and bad air · “Not yet”: A reminder on the next day over 30 degrees
  - 2.3 Injuries: what you do and what you don’t · “No kit”: A request to your club is sent for you
  - 2.3 Injuries: what you do and what you don’t · “Can’t find the contacts”: A short guide opens
  - 2.4 Being a safe adult · “My check has expired or isn’t recorded”: Your club’s welfare officer is told, and you get the renewal link
  - 2.4 Being a safe adult · “Not yet”: A reminder in three days
  - 2.5 When something worries you · “Found and saved”: Module finished. Your club is told the module is done, nothing else
  - 2.5 When something worries you · “We don’t seem to have one”: Your director is told a coach couldn’t find the welfare officer
  - 2.5 When something worries you · “Not yet”: A reminder in three days
  - 3.1 Starting with a game · “Waited for more players”: An arrival game for two is added to your library
  - 3.1 Starting with a game · “Hardly anyone was there at 5:00”: Your poll message to families is changed to ask for 4:55
  - 3.2 Keeping everyone busy · “Hard to watch both”: A tip on where to stand is added
  - 3.2 Keeping everyone busy · “Not enough players to split”: Your sessions are proposed for one group until numbers rise
  - 3.3 Getting their attention without shouting · “It took a while”: We suggest practising the signal as a game next week
  - 3.3 Getting their attention without shouting · “Had to shout”: A 30-second film on making the signal a game
  - 3.4 One game, three versions · “One version fell flat”: That version is dropped from your run sheets
  - 3.5 Finishing on a game · “Ran out of time for the game”: Your sessions are proposed with shorter middle parts
  - 4.1 Say less · “One ran long”: Carry on, with a timer tip on your run sheet
  - 4.3 Wait for the answer · “I got to five and nothing”: A tip on “tell a partner” is added
  - 4.4 Praise the effort, name the action · “Most of them”: The players you missed are shown first next week
  - 4.4 Praise the effort, name the action · “I forgot”: A reminder is pinned to the top of your run sheet
  - 4.6 One thing at a time · “Drifted to two or three”: Carry on, with the one thing pinned on your run sheet
  - 5.1 The team talk in one minute · “It ran long”: “Say less” is added to your Saturday reminders
  - 5.1 The team talk in one minute · “Forgot the idea from training”: Tuesday’s idea is shown on your match-day screen
  - 5.2 Fair turns · “Changed it during the game”: We show what the change did to minutes, and ask why
  - 5.2 Fair turns · “Didn’t use it”: A two-minute film on reading the turns plan
  - 5.3 Your own sideline · “Couldn’t”: We suggest asking your assistant to tap your arm each time
  - 5.4 Half-time in three minutes · “I did the talking”: “Say less” is added to your Saturday reminders
  - 5.5 After the whistle · “Did both”: Module finished. Tuesday’s session is built from your taps
  - 5.5 After the whistle · “Forgot the taps”: A reminder at 6 pm
  - 5.5 After the whistle · “Hard day”: A short film on talking to a team after a heavy loss
  - 6.1 Your first message to parents · “Edited, not sent”: A reminder in two days
  - 6.1 Your first message to parents · “Not yet”: A reminder before your next game
  - 6.2 The parents’ sideline · “One parent is still coaching”: A short script for a quiet word, and your manager’s number
  - 6.2 The parents’ sideline · “It got heated”: Your club’s welfare officer is suggested. You choose whether to contact them
  - 6.3 Sharing the load · “They said no”: Two more names are suggested from who comes most often
  - 6.3 Sharing the load · “Not yet”: A reminder on Thursday
  - 6.4 A hard conversation · “I have one of these now”: A catch-up is drafted, and your mentor is suggested
  - 6.4 A hard conversation · “Not yet”: No reminder. It’s here when you need it

"Add to Tuesday's run sheet" on a lesson is built: the run sheet shows the reminder with the part's time.

## Rules followed where the board differs

- **Films.** None exist. See "The player" above.
- **No count below 3 on the director's page.** The board shows 1 and 2 for the last two modules; the page shows "Fewer than 3".
- **The coach's own clip** shows only for U11 Luke, whose clip is the board's example. Other teams have no fitting clip, so there is no "Your team" chapter and no clip in "Up next".
- **The game itself.** The rules show only for under 10 and 11; other ages say "Ask your club". Positions and "Other shapes" show only for 9 a side.
- **Try it** names the same part of the coach's own next session, with its own time, when the lesson's example names a part of the under-11s' session.

## Wording that is not in the pack

- "Because" lines on the starting page for answers the board does not show (other worries, 5 and 20 minutes, other age groups).
- The headline on the course page for modules other than 4, and "Why now" for lessons other than 4.2.
- "What comes next, and why" for answers other than Silence on lesson 4.2.
- "Paused." and "Captions on." from the player, and "films are being made; lessons work without them" on every home, not only the no-film board.
- "What happened?" as the second question on lessons other than 4.2 (the phone board's wording).
- The team numbers on the module, progress and how-it-went pages are the boards' examples. A new club's coach sees none of them.

## Not built

- This week's lesson is not matched to the main drill of the next session; it follows the last answer, then the coach's order.
- Asking "How did it go?" 15 minutes after the session, and the six-weekly rating prompt: there is no clock in the demo. Both pages open by hand.
- The pace (one lesson a fortnight, a week, or two a week) is shown but nothing is held back.
- The mentor only seeing the season page when sharing is on: there is no mentor view.
- The three club settings on the director's page save, but do not change what a coach sees.
