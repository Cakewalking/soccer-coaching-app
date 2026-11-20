# Clean Sheet Family v2: report back (20 Nov)

Build: the commit that adds this file. 19 phone screens and the club's web page, as a demo of the flows on sample data. **Nothing analyses real film.**

## Where it is

- Every screen opens by its id, in the state it is drawn in (for example `/__screen/FAM1-Welcome`, `/__screen/FAM3-Home`).
- **Nothing in the demo's role picker opens it yet.** The pack does not say where a parent with no club comes in, so there is no way in from the rest of the demo.
- The Learn tab opens the Education centre's family library with Clean Sheet's own items only: no coach, no club clips, no "We did it".

## Done means

1. A new parent goes from `FAM1` to a result on `FAM8`, spending the quoted credits after a free check. **Checked**, including "Get more credits" returning to the same quote.
1b. 50 minutes quotes 80 and 90 minutes quotes 144, from one rate table (`RATES` in `src/screens/family/familyStore.ts`). **Checked.**
2. A failed check uses no credits. **Checked.**
3. Born 2015: `FAM8`, no numbers. Born 2012: `FAM8b`, three counts each marked Estimate. **Checked.**
4. No screen can send parent-filmed content outside the named family. **Checked** on nine screens.
5. The club joining shows `FAM13` once, then `FAM14`; a matching game gives `FAM5c` with no charge. **Checked.**
6. The club count is hidden below 5. **Checked.**
7. Every control in `WIRING.md`: see below.

A test of 32 checks covers these and passes.

## The controls

All 181 controls in `FAMILY-APP-REPORT.csv` were pressed on a local production build.

- 172 work as written (four of them say the fuller "Plays here, in the page. Tap again to pause.").
- 5 work, but stay on the same page or could not be matched: Home pressed on Home, Games pressed on the results page, and the credits strip that reads "about 6 games" after the club joins.
- 3 go somewhere else on purpose: the Club tab after the club has joined opens "Your club has joined" (twice), and "All 4" shows all four games in the list.
- 1 says a line instead of opening a page: Games with no games yet.

## Stubs

- **The film.** There is no camera or upload. "Add a game" opens the check on a sample film; a dashed "Demo" box on the check lets you choose another: 50 minutes, 90 minutes, upright and shaky, child mostly out of shot, and (after the club joins) the game the club filmed.
- **The analysis.** "About 20 minutes" finishes five seconds after the page opens. Clips, reels and counts are sample data.
- **The purchase.** "Buy" adds the credits and says the app store line. No purchase sheet.
- **The share sheet and sign-in.** Both say their line.
- **Family links.** A name can be added (six at most) and switched on or off; no link is sent.
- **Pointing to the child.** "That's Ari, red 7 · change" says its line.
- **The club joining, and the family count.** A dashed "Demo" box on the Club tab switches the sample club to joined, and the count between 14 and 3.
- **The club's consent questions**, "Get a copy of everything", "Talk to us" and "Prices for clubs" say their line.
- **Delete everything and Close my account** open a sheet and, if confirmed, clear the family's data and return to the welcome.

## Rules followed where the board differs

- **After the club joins, the credits strip says "about 6 games"**, as `FAM13` and the handover say. The `FAM14` board draws "about 3".
- **A child of 12** gets no numbers. The handover names under 12 and 13 and over; 12 is treated as the younger side.
- **The "first term" row on the club page** shows only at 10 families or more, and the count only at 5 or more.
- **`FAM4` cannot be skipped the first time**: "Show me again later" goes Home, and "Add a game" brings the page back before the first check.

## Wording that is not in the pack

- The two "Demo" boxes and their labels.
- Two clip titles ("Got back to help", "Called for the ball in space"), a fourth earlier game ("v Lakeside"), and the counts for a 13-and-over child's newly analysed game. The boards name three clips and three games.
- "You need N more. This quote holds for 24 hours.", "We could not make three clips, so your N credits are back.", "No games yet. Add one from Home.", "Six is the most. Take someone off first."
- On `FAM2`, the hint for a 13-and-over birth year: "13 and over: clips, and three counts marked Estimate".
- On the check after the club joins: "at half the credits because your club has joined".
- The confirm sheets' buttons ("Keep it") and their confirmations.

## Not built

- A second child in the same film (+30 credits) is in the rate table and on the credits page; nothing lets a parent add a second child.
- A parent with children at two clubs.
- Any parent asking for a clip to be removed because their child is in it: the line is on `FAM16`; there is no form.
- A club or association's own filming rule shown on `FAM4`.
- Refunding unused credits is said, not done: there is no payment to refund.
- The quote's 24 hours is stated; nothing expires it.
- Placeholders as the handover lists them: pack prices and sizes, the rates, the "first term free" offer, and "Stored in Australia".
