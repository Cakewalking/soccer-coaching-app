# After-the-game: the nine rules — how each is enforced, and where

**Honest framing first.** Clean Sheet (this repo) is a **front-end prototype**: React components with mock data, no server, no auth, no database. The HANDOVER asks for enforcement "in the data and the server, not only the screens," and says a rule enforced only by hiding something on a screen counts as not done. **There is no server here to enforce anything.** What I have built is a single demo data model (`src/screens/aftergame/data.ts`) where visibility and the averaging rules are **correct by construction** — the screens physically cannot read data they are not given, and the privacy-sensitive maths (own-child exclusion, the three-rater threshold) lives in functions, not in the markup. That is the strongest form the rules can take without a backend. Every rule below is therefore marked **demo-modelled, not server-enforced**, and item 9 in particular needs a real data layer.

One line per rule: how it is enforced, and where.

1. **A coach's ratings and notes are seen only by that coach.**
   The coach's data lives in `COACH_GAME`, `COACH_GAME_RATINGS`, `COACH_NOTES` (`data.ts`) and is imported **only** by the coach boards `YT1YourTake`, `YT3PlayerNotes`, `YT4VotesAwards`. It is never imported by the parent board `YTp1ParentVotes` or any Ask surface. *(demo-modelled, not server-enforced)*

2. **A parent's ratings are seen only by that parent and the team's head coach.**
   `PARENT_RATINGS` is an array keyed by parent. The parent board reads **one** entry (`ME = PARENT_RATINGS[0]` in `YTp1ParentVotes.tsx`); the coach sees others only as an aggregate through `parentAverage()`, never another parent's raw row. No other board imports `PARENT_RATINGS`. *(demo-modelled, not server-enforced)*

3. **Parents give ratings only — no notes, no free text.**
   `YTp1ParentVotes.tsx` contains only 1-to-5 `<button>`s; there is no `<input>`, `<textarea>`, or any free-text control anywhere on the parent board. *(enforced in the component — there is no text field to type into)*

4. **Ratings work the same for every age group, MiniRoos included.**
   The rating control is the same 1-to-5 buttons on `YTp1`/`YT3` for every team; there is no age switch or age-conditional branch in the rating UI. *(demo-modelled)*

5. **A parent may rate their own child; it is stored and shown to that parent and the coach, and left out of every average and award.**
   `parentAverage(playerId)` filters `set.ownChildId !== playerId` before averaging and returns `null` below three raters (`data.ts`). Verified numerically: Mia's own parent rates her 4, but her average is **4.5** (the others), not the naive **4.45** that includes the own-child rating; a player with zero raters returns a dash. `awards()` is built from `SEASON` averages, which follow the same exclusion. `YTp1` shows the own child with a "Your child" label. *(demo-modelled; the exclusion is a pure function, tested)*

6. **A match report never contains a rating, or anything about one child's body or wellbeing.**
   `YT2MatchReport.tsx` renders prose only; no rating value or wellbeing field from `data.ts` is imported into it, and the "Written from" panel states the rule in the UI. There is no code path that injects a rating into the report body. *(demo-modelled; by construction the report has no rating input)*

7. **The awards page is seen only by the head coach.**
   `YT4VotesAwards` renders inside the coach `YTFrame` (role "Head coach"); it is routed only under the coach Match-day/Home paths, never under any parent route in `DemoApp`. *(demo-modelled, not server-enforced)*

8. **Nothing here appears in Ask Clean Sheet answers for anyone but the person allowed to see it.**
   No function in `aftergame/data.ts` is imported by, or wired into, any Ask surface. A director asking "who is our best under 12" cannot get a ratings-built answer because the ratings data is not reachable from Ask. *(demo-modelled; enforced by absence of any Ask → ratings link)*

9. **A data request or deletion from a parent covers the ratings they gave; a rating of a child is that child's data too.**
   **Not fully met in the prototype.** The model keys every rating by parent (`parentId`) and by player (`ownChildId` / the rated player id), so a deletion *could* be scoped to "this parent's ratings" and "this child's ratings," but there is **no live `DS2-DataRequests` flow wired to it** — that needs the real data layer. Flagged here rather than hidden. *(demo-modelled; deletion flow out of scope for a front-end prototype)*

## Summary

Rules 1, 2, 3, 5, 6, 8 are enforced by **construction** in this prototype — the data simply is not reachable from the surfaces that must not see it, and the sensitive maths is in tested functions. Rules 4 and 7 are demo-modelled by routing/UI. **Rule 9 is not met** without a backend and is called out as such. None of this is a substitute for server-side enforcement; when a data layer exists, these same shapes (per-parent keying, own-child exclusion, coach-only vs parent+coach reads) should be re-implemented and enforced there.
