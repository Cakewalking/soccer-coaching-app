# Clean Sheet Family v7: report back (20 Nov)

Build: the commit that adds this file. 40 phone screens and the club's web page, as a demo of the flows on sample data. **Nothing analyses real film.** This replaces the v2 build.

## Where it is

- Every screen opens by its id, in the state it is drawn in (for example `/__screen/FAM1-Welcome`, `/__screen/FAM3-Home`, `/__screen/FAM3m-HomeStats`).
- **Nothing in the demo's role picker opens it yet.** The pack does not say where a parent with no club comes in.
- An item on the Learn tab opens from the Education centre's library with no coach and no "We did it". (In the v2 build that page still named a coach; fixed here.)

## Done means

1. Splash to the reveal on `FAM8r` in the order given, without paying. **Checked.** Screens 1 to 8 each have one main button.
1a. A second video on the same account quotes credits. **Checked**, including too few credits (`FAM5n`), buying there, and returning to the quote.
1b. 50 minutes quotes 80, 90 minutes quotes 144, ten minutes quotes 16, a second child adds 30, all from `RATES` in `src/screens/family/familyStore.ts`. **Checked.**
2. A failed check uses no credits. **Checked.**
3. Born 2015: `FAM8` and the `FAM3` dashboard, no performance numbers. Born 2012: Reel and Stats tabs, `FAM20`, the `FAM3m` dashboard. **Checked.**
3b. Each sample video lands on its outcome, and a maybe returns no credits. **Checked.** A good check that then makes too few moments returns the credits and keeps the clip (`FAM8x`).
4. No screen can send parent-filmed content outside the named family. **Checked** on fourteen screens.
4b. Reels opens `FAM18`, Learn opens `FAM17`, the avatar opens `FAM19`. **Checked** from nine screens with tabs.
4c. A missed moment adds a clip to that reel at no cost. **Checked.**
5. The club joining shows `FAM13` once, then `FAM14`; a matching game gives `FAM5c` with no charge. **Checked.**
6. The club count is hidden below 5. **Checked.**
7. Every control in `WIRING.md`: see below.

A test of 69 checks covers these and passes.

## The controls

All 365 controls in `FAMILY-APP-REPORT.csv` were pressed on a local production build. 345 work as written. The other 20:

- **7 could not be matched by the test, and work by hand:** the chapter marks under two players ("1, 2, 3" and "0, 25, 50 min"), the credits strip on `FAM14` (it reads "about 6 full games", see below), and Mia's row on `FAM15` (it reads "3 reels", see below).
- **6 are Home pressed where Home is already that child's dashboard**, or lead to the right Home for the state: Mia's Home is `FAM3m`, and after the club joins Home is `FAM14`.
- **2 are the Club tab after the club has joined**, which opens "Your club has joined".
- **2 are `FAM4` Back and Got it**, which return to where the parent came from (Home, for a family with reels) and not always to the empty Home.
- **`FAM8` Done** goes Home when it is not the first reel. The first time it goes to `FAM6f`, as the handover says.
- **`FAM5p` "Upload this one anyway"** goes to "We can’t read this one", not to the maybe. See below.
- **1 pressed the wrong "Reel"** (the tab, not the player's chapter). Both work.

## Rules followed where the boards differ

- **"Upload this one anyway" leads to whatever the check says.** The sample that fails the phone's check is upright and shaky, and the check reads 6 of its 50 minutes, so it lands on `FAM5x`. The wiring table sends it to `FAM5b`, which would then say 31 of 50 minutes about the same video.
- **The age line is 12**, as the handover rules. The `FAM15` board still says "From 13: three counts"; it reads "From 12: numbers from a full game, marked as estimates."
- **After the club joins, the credits strip says "about 6 full games"**, as `FAM13` and the handover say. The `FAM14` board draws "about 3".
- **Mia has three full games**, because trends may appear only once there are three. The `FAM15` board gives her one reel; it reads three.
- **The first run has no tabs until Home**, as the handover says. The `FAM8` board draws tabs; they show on every later visit.
- **`FAM4` is not a forced step.**
- **Stats come only from a full game** (40 minutes or more). A short video for a child of 12 or over gets a reel and a line saying so.
- **A number with no clips behind it is not shown.** The headline "times on the ball" is not a control, as drawn.

## Stubs

- **The video.** There is no picker or upload. The first run uses one sample (50 minutes, filmed well); the upload strip counts up by itself. Afterwards a dashed "Demo" box on the check chooses a sample: 50 minutes, 90 minutes, ten minutes at the park, child mostly out of shot (a maybe), fewer moments than it looked (credits return), upright and shaky (the phone's warning, then a no), and, after the club joins, the game the club filmed.
- **The analysis.** "About 20 minutes" takes six seconds: the ring fills and clips appear. Clips, reels and stats are sample data.
- **Sign-up, sign-in, the purchase, the share sheet, notification permission.** Each does its step and says its line.
- **The directory of clubs** is a sample of seven. "I can’t find it" takes a name and suburb and holds the family as unmatched, with no count.
- **Family links.** `FAM10v` opens from a dashed "Demo" box on the share page. "Stop sending me these" switches that person off.
- **The club joining, and the family count.** A dashed "Demo" box on the Club tab.
- **Editing a child, receipts, the help form, terms, the club's consent questions, "Get a copy of everything".** One line each, as the handover allows.
- **Delete everything and Close my account** open a sheet and, if confirmed, clear the family's data and return to the splash.

## Wording that is not in the pack

- The three "Demo" boxes and their labels, and the sample videos' names.
- Stat clip titles other than the three shots drawn: "Pass to a team-mate", "Pass forward", "Took a player on", "Took a player on, came off", "Won the ball back", "Won it back in the other half". "One of these isn’t a pass / a take-on / a ball won back".
- Mia's two earlier games ("v Southbank", "v Westfield") and the opponents given to newly added videos.
- A short video's check: "We can see Ari clearly · For about 8 of the 10 minutes". On results: "A short video gets a reel and no stats. Stats come from a full game."
- Two children: the switch "Mia is in it too" on the check, and its line.
- Adding a child from the account: the page title "Add a child", the button "Add (name)", and "(name) is added."
- "Uploaded", when the upload strip reaches 100%.
- A club that already uses Clean Sheet: "(club) already uses Clean Sheet, so its games are free for you. Ask the club for your invitation."
- "This link no longer works.", "Three is the most for one video.", "Tap your child in the picture first.", "No club by that name in the list.", "Nothing for (name) yet. Add a video and we’ll find (his/her) moments."
- On `FAM2` for a child of 12 or over: "12 and over, you get clips and stats, marked as estimates."
- Using part of a video: "half of the video (the whole of it is 80)".

## Not built

- **Fair use**: five free checks a week, a paid check after that, and treating good as maybe after two returns in a row. In a demo where people try every sample, both would fire at once and make the samples land on the wrong outcome.
- **One free video per phone.** It is one per account here.
- Asking before uploading over 200 MB on mobile data, and resuming a dropped upload.
- The 30 days for missed moments and the quote's 24 hours are stated; nothing expires them.
- A parent with children at two clubs: the club is the family's.
- The page where another parent asks for a clip to be removed.
- A club or association's own filming rule shown on `FAM4`.
- The lighter set of numbers for 9 to 11, which the handover says is not approved.
- Placeholders as the handover lists them: pack prices and sizes, the rates, the check's thresholds, the "first term free" offer, and "Stored in Australia".
