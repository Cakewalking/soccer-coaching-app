# Clean Sheet Family v13: report back (23 Nov)

Build: the commit that adds this file. 44 phone screens and the club's web page, as a demo of the flows on sample data. **Nothing analyses real film.** This replaces the v12 build.

## Where it is

- Every screen opens by its id, in the state it is drawn in (for example `/__screen/FAM1-Welcome`, `/__screen/FAM3-Home`, `/__screen/FAM20-GameStats`).
- **Nothing in the demo's role picker opens it yet.** The pack does not say where a parent with no club comes in.
- An item on the Learn tab opens from the Education centre's library with no coach and no "We did it". (In the v2 build that page still named a coach; fixed here.)

## v13: the walkthrough rebuilt (handover v8, 23 Nov)

`FAMt1` to `FAMt3` are rebuilt as the boards draw them: a picture, an amber step label, the heading, one line that says what to do, and three ticked benefits. Same controls (Skip, Next). Step 3's picture is the results card from the splash, with two clips; the tilted clip cards are gone from the app. Nothing else in the pack changed, and the wiring table is the same 360 controls.

- **The fourth panel stays** (Booker, 20 Nov; not in the pack), so step 3 still has "Next" and "Upload my first video" is on the fourth. Steps 1 to 3 show three dots and "Step n of 3"; the fourth has the label "WITH YOUR CLUB" and no dots.
- **With `SHOW_XG` off**, step 3 says "game stats like passes and shots" and its picture shows shots, as the handover asks.
- **On a short screen** (under 780 tall) the pictures are smaller and step 3 shows one clip, so the button stays in view. Checked at 667 and 844 tall.
- **Two of the ticks are promises the demo does not keep for real:** "Upload carries on if you leave the app" (there is no upload) and "No card needed" (the purchase is a stub).

All 360 controls were pressed again on this build, with the same result as v12. A test of 78 checks covers v11 to v13; 76 pass, and the other two are the brand-new visitor described below.

## v12: chances created, progressive passes, and what the club adds (handover v7, 23 Nov)

The colour pass in this pack is the same file as before and is already built. Everything below is the Family app.

- **The Stats tab has six tiles**, in the board's order: passes completed ("9 went forward"), expected goals (xG), chances created ("0.4 expected assists (xA)"), progressive passes ("Moved it well up the pitch"), took a player on, won the ball back. Each opens its clips and can be corrected, and the number and xA change.
- **The club pitch no longer leans on the club's camera.** Reworded as the boards draw them: the Club tab's table (Filming, Numbers "side by side", Minutes and positions "From the team sheet"), tour panel one ("Every game, filmed for you.", 3 dots of 12 against 12 of 12), the greyed row on Stats ("Minutes, positions and the team's numbers"), the season line on Home, `FAM22`, and `FAM5c`. None of "sees the whole pitch", "every minute", "all 70 minutes" or "firmer numbers" is left on any family screen (checked on 22 screens).
- **"About 20 minutes"** on the splash, and tour panel three reads "Get the reel and the numbers."
- **`FAM22` is drawn for Ari**, and `FAM14` says "your own film".
- **Home before any full game** shows totals (videos, moments, length of highlights) in place of the three numbers, as the handover says.
- **`SHOW_XG` now covers xA as well.** Off, the Stats tab shows shots, goals and chances created as plain counts with no xG or xA line, which is what "Do not ship yet" asks for. It is on in the demo because the boards draw it.

A test covers v11 and v12, the first run from the splash to Home, and the splash on three screen heights. All pass but two, which open a retired page's own address as a brand-new visitor, who is rightly shown the splash (for a signed-in family both open the replacement).

## v11: stats and xG for every age, and a rebuilt splash (colour pack v6, 23 Nov)

- **One Home and one results screen, at any age.** `FAM3-Home` is the latest reel, three numbers from the latest full game, game by game, and the greyed season card. `FAM8-Results` has the Reel and Stats tabs, the reel, "Ari's game in numbers", one thing done well with "4 more", and the greyed team-moments row. "What Ari does most", "From Ari's coach" and "Try this at home" are gone. Nothing in the app reads a child's age to decide what they see.
- **`FAM3m-HomeStats` and `FAM8b-Results13` are retired.** Their board links open a page that says so, with "Open the screen that replaces it". Their own addresses (`/family/FAM3m-HomeStats`) open the replacement.
- **xG** is on the splash, Home (the tile and each game's row), the results card and the Stats tab ("Expected goals (xG) · 3 shots · 1 goal", which opens the shot clips). Each shot says how often one like it goes in, and xG is the sum, to one decimal place. Taking a shot away, or adding one, changes it. No trend, average or verdict anywhere.
- **xG can be switched off in one place.** The handover says not to ship the number until there is a model for junior pitches and goals. `SHOW_XG` in `src/screens/family/familyStore.ts` is on for the demo; set to false, every screen shows shots and goals as before.
- **The splash is rebuilt** as the board draws it: wordmark, the heading, one line, the white card (three sample numbers, two sample clips, "Watch the sample reel · 0:48"), the small print, then "Get started" and "I have an account". Only those three are controls. The tilted cards and the pill under the wordmark are gone. The drawn film sits behind under the darker wash.
- **Words:** `FAM2` "You get clips and game stats, whatever their age." and `FAM15` "Every age: clips and game stats, each number marked as an estimate."

## New in v8

- **The locked pattern**: a dashed grey card, a greyed preview and the dark "With your club" pill. One on Home (the season card), one on Stats, one on Results, one on Reels. None in the first run, on the check or credit screens, with no club picked, or once the club has joined. Each opens the tour.
- **The tour** `FAMk1` to `FAMk3`, ending in "Tell my club". "Show me" on the Club tab opens it; Close returns to the Club tab.
- **The Club tab** compares "You now" with "With your club".
- **Home** lists videos game by game. Trends, and anything across videos, are gone.
- **`FAM22`** shows once for a child, on the way Home after their third full game, and never after the club joins. The sample family has already seen it for Mia.
- **Stats** drops the thirds of the pitch, as the board does.

- **A fourth tour panel, `FAMt4-Tour`** (Booker, 20 Nov: a screen in the start-up flow about the club signing up and what it gives the parent). "Better still with your club." with four benefits. It is not in the pack, so the wording is not from a board, and it sets aside the rule of nothing about the club in the first run. "Upload my first video" moves to it from panel three.

A test of 89 checks covered v7's "done means" and these on the v8 build. It was not re-run for v11; the v11 checks are listed above.

## v9: prices

2 credits a minute (it was 1.6): a 50-minute game is 100 credits, ten minutes is 20, a second child adds 40. Packs: 100 for $10 ("1 full game"), 275 for $25 ("Nearly 3 full games", 25 extra), 600 for $50 ("6 full games", 100 extra). The sample family holds 300 credits. All of it comes from `RATES` and `PACKS` in `src/screens/family/familyStore.ts`.

"Use just part of it" offers the first minutes the balance covers (with 40 credits, "The first 20 minutes is 40 credits"), not half the video.

## v10: colour

Colour only, as the handover says. Green for things you do. Amber for the child's moments and anything free: the main button on the splash, tour and reveal, the play buttons, the progress ring, "Free", the upload target, the moment-card edge, "See all" and the credits count on `FAM14`. Mauve for "with your club": the pill, the locked cards, the Club tab's column, and the club tour on plum with a mauve button. The page is warm `#faf5ec`, number tiles rotate through the four tints, and the selected pack is pale amber. Amber is not on any Estimate chip or stat number. `FAMc1` stays green.

The fourth tour panel (not in the pack) keeps the tour's dark ground and amber button.

## The splash on a short screen

Under 780 tall (such as a phone's browser with its bars) the splash shows one sample clip, not two, and slightly smaller writing, so "Get started" and "I have an account" stay in view without scrolling. Checked at 667, 740 and 844 tall.

## Phones and cameras that follow the play (colour pack v2, 20 Nov)

Words only, on nine screens, as the handover lists: the splash (now its small print, "A camera that follows the play works too."), tour panel one, the upload screen ("Got some football on film?", "From your phone or your camera"), a new card on "Before you film", and "your film" or "your camera" where the app compared the club with "your phone" (Reels, Stats, the club tour, "Your club filmed this one", and the club's web page). The fourth tour panel, which is not in the pack, follows the same wording.

Not built: the upload picker accepting large files exported from a camera's own app. There is no picker in the demo.

## Screens size to the phone (Booker, 20 Nov)

The boards are 390 by 844. The app is as wide as the phone it is on (to 430) and at least as tall as the phone shows, and on Home "Add a video" and the credits are pinned above the tabs.

## Each page has its own address (Booker, 20 Nov)

`/family/<page id>`, for example `/family/FAM3-Home`. A refresh stays on the page with the family as the parent left it, and Back and Forward step one page at a time. `/family` opens Home. A board link (`/__screen/FAM…`) still opens the sample state it is drawn in; the first tap from there moves to the app's own address. A test of 17 checks covers this.

## Done means (v7's list)

1. Splash to the reveal on `FAM8r` in the order given, without paying. **Checked.** Screens 1 to 8 each have one main button.
1a. A second video on the same account quotes credits. **Checked**, including too few credits (`FAM5n`), buying there, and returning to the quote.
1b. At the pack's rate, 50 minutes quoted 80 and 90 minutes 144; at Design's rate of 20 Nov they quote 100 and 180, ten minutes quotes 20, and a second child adds 30, all from `RATES` in `src/screens/family/familyStore.ts`. **Checked.**
2. A failed check uses no credits. **Checked.**
3. **Superseded by v11.** A child born in 2015 and a child born in 2012 get the same thing: the `FAM3` dashboard with numbers, the Reel and Stats tabs, and `FAM20`. **Checked** for both sample children.
3b. Each sample video lands on its outcome, and a maybe returns no credits. **Checked.** A good check that then makes too few moments returns the credits and keeps the clip (`FAM8x`).
4. No screen can send parent-filmed content outside the named family. **Checked** on fourteen screens.
4b. Reels opens `FAM18`, Learn opens `FAM17`, the avatar opens `FAM19`. **Checked** from nine screens with tabs.
4c. A missed moment adds a clip to that reel at no cost. **Checked.**
5. The club joining shows `FAM13` once, then `FAM14`; a matching game gives `FAM5c` with no charge. **Checked.**
6. The club count is hidden below 5. **Checked.**
7. Every control in `WIRING.md`: see below.


## The controls

All 360 controls in `FAMILY-APP-REPORT.csv` (the v12 and v13 table) were pressed on a local production build of v13. 347 work as written. The other 13:

- **`FAMt3` "Upload my first video"** is on the fourth tour panel; panel three has "Next".
- **4 work, and read differently from the board:** the credits strip on `FAM14` ("about 6 full games"), Mia's row on `FAM15` ("3 reels"), and the two minute marks on `FAM9a` ("35" and "70 min", see below).
- **4 are Home pressed where Home depends on the family:** on `FAM14` Home is already that page; after the club joins Home is `FAM14`; and `FAM4` Back and Got it return to where the parent came from, not always to the empty Home.
- **2 are the Club tab after the club has joined**, which opens "Your club has joined".
- **`FAM8` Done** goes Home when it is not the first reel. The first time it goes to `FAM6f`, as the handover says.
- **`FAM5p` "Upload this one anyway"** goes to "We can’t read this one", not to the maybe. See below.

## Rules followed where the boards differ

- **"Upload this one anyway" leads to whatever the check says.** The sample that fails the phone's check is upright and shaky, and the check reads 6 of its 50 minutes, so it lands on `FAM5x`. The wiring table sends it to `FAM5b`, which would then say 31 of 50 minutes about the same video.
- **Ari's sample games are 70 minutes long**, as the `FAM20` board draws ("in the 44 minutes Ari was on screen, of 70", a shot in the 58th minute). The `FAM9a` board draws the same game as 50 minutes, so its bar here runs "0, 35, 70 min". The first video in the first run is still the 50-minute sample the check screens draw. The v12 handover confirms "of 70".
- **Ari has three full games.** The `FAM3` board lists two; the third (v Northgate City) is what makes `FAM22` due, and its numbers are not from a board.
- **After the club joins, the credits strip says "about 6 full games"**, as `FAM13` and the handover say. The `FAM14` board draws "about 3".
- **Mia has three full games**, with her own numbers so the two children do not show the same figures. The `FAM15` board gives her one reel; it reads three. The handover says Mia appears only in the child switch; her games are kept so the switch has something to show.
- **The first run has no tabs until Home**, as the handover says. The `FAM8` board draws tabs; they show on every later visit.
- **`FAM4` is not a forced step.**
- **Stats come only from a full game** (40 minutes or more). A short video gets a reel and a line saying so.
- **A number with no clips behind it is not shown.** The headline "times on the ball" is not a control, as drawn.

## Stubs

- **The video.** There is no picker or upload. The first run uses one sample (50 minutes, filmed well); the upload strip counts up by itself. Afterwards a dashed "Demo" box on the check sets the sample (Booker, 20 Nov: a slider, not a list): **any length from 1 to 90 minutes**, and how it was filmed: well, child mostly out of shot (a maybe), fewer moments than it looked (credits return), upright and shaky (the phone's warning, then a no), and, after the club joins, the game the club filmed. The quote and what the check reads follow from the two. Under 20 minutes is read as a short video.
- **The analysis.** "About 20 minutes" takes six seconds: the ring fills and clips appear. Clips, reels and stats are sample data.
- **Sign-up, sign-in, the purchase, the share sheet, notification permission.** Each does its step and says its line.
- **The directory of clubs** is a sample of seven. "I can’t find it" takes a name and suburb and holds the family as unmatched, with no count.
- **A second child for a walked-through account.** A dashed "Demo" box on `FAM15` adds Mia with three games, so the child switch and two children in one video can be seen without a board link.
- **Family links.** `FAM10v` opens from a dashed "Demo" box on the share page. "Stop sending me these" switches that person off.
- **The club joining, and the family count.** A dashed "Demo" box on the Club tab. "What the club sees" (the club's web page) moved into it, because the v8 Club tab has no button for it.
- **Editing a child, receipts, the help form, terms, the club's consent questions, "Get a copy of everything".** One line each, as the handover allows.
- **Delete everything and Close my account** open a sheet and, if confirmed, clear the family's data and return to the splash.

## Wording that is not in the pack

- The three "Demo" boxes and their labels, and the sample videos' names.
- How often each of Mia's shots, and the shots in a newly added video, goes in. A shot or a chance the parent adds with "We missed one" is given 1 in 4 until it is looked at.
- On the clips behind chances created: "Pass that led to a shot" and "the shot goes in 1 in 4", so that xA is its clips. "Progressive pass" on the clips behind that tile. With `SHOW_XG` off, the chances tile's second line is "Passes that led to a shot".
- The fourth tour panel (not in the pack) now says "Every game, filmed for you · Nothing to set up or upload".
- Stat clip titles other than the three shots drawn: "Pass to a team-mate", "Pass forward", "Took a player on", "Took a player on, came off", "Won the ball back", "Won it back in the other half". "One of these isn’t a pass / a take-on / a ball won back".
- Mia's two earlier games ("v Southbank", "v Westfield") and the opponents given to newly added videos.
- A short video's check: "We can see Ari clearly · For about 8 of the 10 minutes". On results: "A short video gets a reel and no stats. Stats come from a full game."
- Two children: the switch "Mia is in it too" on the check, and its line.
- Adding a child from the account: the page title "Add a child", the button "Add (name)", and "(name) is added."
- "Uploaded", when the upload strip reaches 100%.
- A club that already uses Clean Sheet: "(club) already uses Clean Sheet, so its games are free for you. Ask the club for your invitation."
- "This link no longer works.", "Three is the most for one video.", "Tap your child in the picture first.", "No club by that name in the list.", "Nothing for (name) yet. Add a video and we’ll find (his/her) moments."
- Using part of a video: "half of the video (the whole of it is 80)".

## Not built

- **Fair use**: five free checks a week, a paid check after that, and treating good as maybe after two returns in a row. In a demo where people try every sample, both would fire at once and make the samples land on the wrong outcome.
- **One free video per phone.** It is one per account here.
- Asking before uploading over 200 MB on mobile data, and resuming a dropped upload.
- The 30 days for missed moments and the quote's 24 hours are stated; nothing expires them.
- A parent with children at two clubs: the club is the family's.
- The page where another parent asks for a clip to be removed.
- A club or association's own filming rule shown on `FAM4`.
- **A model for xG and xA on junior pitches and goals.** Every shot's worth here is a sample figure. See `SHOW_XG` above.
- A club setting for showing a child's own chances under 10, and numbers on family links (they share the reel only). The handover lists both as undecided.
- The measure of a progressive pass (a quarter of the pitch towards goal, or into the final third). The six here are sample clips.
- Placeholders as the handover lists them: pack prices and sizes, the rates, the check's thresholds, the "first term free" offer, and "Stored in Australia".
