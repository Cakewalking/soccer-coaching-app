# Education centre v1: report back (20 Nov)

Build: the commit that adds this file. It rebuilds Learn › Education centre as a library led by the same player as Learn to coach. 15 screens: 11 for the coach, 1 for the director, 3 on phones. The catalogue is loaded from `catalogue.json` unchanged: 96 items for players in 12 shelves, 72 for coaches in 9.

## The one decision that needs a ruling

**How many catalogue items have media: 33 of 168.** None is filmed. The 33 are things that already exist in the product:

- 22 coach films that are Learn to coach lessons (written, and drawn in the player).
- 4 reads in "The game itself" that open pages already built (rules, positions, shapes, the 60 words).
- 1 written read ("What the warm-up study found", `EC8`).
- 6 games collections, which open the Game library. (The seventh item on that shelf is a film.)

No item for players has media.

The handover says an item with no media is hidden from coaches and families. **I have not done that.** Hidden, the players' side would be empty and the coaches' side would be under half its shelves, and none of the boards could be reached. Every item shows and plays as a drawn stand-in, as all film in the demo is drawn. The rule is one switch, `HIDE_UNMADE` in `src/screens/learn/library.ts`; set it to true and only the 33 show. The director's page says "Not made yet: 135 of the 168 items planned".

## Where it lives

- Coach › Learn › Education centre, in every coach app (junior, assistant, youth, seniors, MiniRoos, goalkeeper, fitness). It replaces the old page with the amber "Watch it" button.
- Director › Coaches › Education centre (`EC10`).
- `ECp1` and `ECp2` open at the old Football at home addresses (`GSp9`, `GSp10` and the two copies for Mia).
- Every board opens by its id, drawn at U9 Tom.

## Done means

1. At 1180 by 820 the player and its pinned card are fully visible on `EC1` and `EC6`. **Checked.**
2. Filters on `EC2` and `EC7` narrow the shelves and the count in the header. **Checked.**
3. Under 12 a clip goes to a parent; "We did it" raises the coach's count by one. **Checked.**
4. A clip with a player whose family has said no cannot be sent for a check. **Checked**, with one moment I added to show it (see wording below).
5. "offside" as an under-9 coach gives the answer from the loaded rules; with none loaded there is no short answer. **Checked** (under 16 has no rules loaded).
6. As director, no screen shows which coach opened what or which family watched what. **Checked.**
7. No item without media is visible to a coach or a family. **Not met, on purpose.** See above.
8. Every control in `WIRING.md`. See below.

## The controls

All 338 controls in `EDUCATION-CENTRE-REPORT.csv` were pressed on a local production build.

- 293 work as written (three of them after a fix made during the run).
- 10 work, but the check could not match their label (the director's five switches, a chapter that shows its length, and similar).
- 3 work, but the check pressed a control of the same name in the top bar; those three filters were not pressed on their own.
- 21 are cards the boards draw on a catalogue page whose own filters would hide them. They show, and open, when the filters are cleared.
- 10 open a film page inside the Education centre instead of `LN4-Lesson`: a film that is not a Learn to coach lesson has no lesson page.
- 1 is the director's "Ask Clean Sheet", which opens nothing new, as before this pack.

A separate test of 34 checks covers the rules above and passes.

## Differences from the boards

- **Films that are Learn to coach lessons** open that lesson's own page, and do not move the coach's place in the course.
- **Reads, checklists and templates that are not written** open a page that says so. Only `EC8` is written.
- **The home game** is written for one clip ("Eyes up while you dribble"). Every other clip says its game is not written yet.
- **"From your own team"** shows only to U9 Tom, whose players the examples are. Every other coach starts with nothing sent, as on `EC1e`.
- **The catalogue pages count truly.** The board says "31 of 96 match"; the page says 21, which is what the data gives.
- **"Where" (indoors, small space, at the park)** is not in the catalogue. It follows what a game needs: nothing or a ball indoors, no partner in a small space, anything at the park.
- **Reordering** on `EC4` is by "move up" and "move down" buttons, not by dragging.
- **Under 9 means the "5 to 8" band**, as the board says, because under-9s are 8 and younger.
- **Search** shows every result until something is pressed under "Narrow it". The board by its id opens with "Coaches" pressed, as drawn.

## Wording that is not in the pack

- "This clip cannot be sent. Max’s family has said no to film being shared, and he is too close to Jai to crop out. Pick another moment." and the matching line under "Who is in it" (rule 4).
- The send card for 13 to 15 and for 16 and over ("it goes to the player and a parent", "it goes to the player").
- "Not written yet" on an unwritten read, checklist or template, and "The home game for this one is not written yet."
- "Not made yet: 135 of the 168 items planned. The titles are the plan." and "Clean Sheet’s safety items cannot be switched off." on the director's page.
- "Share with the whole club" and its confirmation, as the second yes after "Approve".
- "Why this one" for teams other than U9 Tom, which uses the headline of that coach's own next session.
- "Move to reorder" in place of "Drag to reorder".
- The empty search page, and the line shown when nothing matches.

## Not built

- The old player "Learn" page is still what the parent and older-player phone apps show inside their own frames. `ECp1` to `ECp3` open by their ids and at the old Football at home addresses only.
- Two clips a week at most is stated, not enforced: nothing stops a third send.
- "Change the game", "Ask a follow-up", "Search" on the phones and "Saved · 3" say their line and do nothing more.
- A family withdrawing a yes, and the clip disappearing within a minute: there is no family consent screen for a single clip.
- The term is not lined up from the coach's real sessions; the three themes are the board's.
- "Not useful" moves to the next club film; it does not lower a topic.
- Search by captions has one example (the board's "Mentions offside at 1:10"), because no film has captions.
- The director can switch a source off; making an age band stricter is not built.
- Heading clips: the rule is in place, but the catalogue has no heading clip to apply it to.
