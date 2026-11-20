# Colour pass v1: report back (20 Nov)

Build: the commit that adds this file. Colour only, on every coach, club, academy, parent and player screen. No layout, wording, link or control moved. The Family app's own colours were already built from `family-app-v10`.

## The ten changes

| # | What | Done |
|---|---|---|
| 1 | Page background `#f7f8f7` to warm `#faf5ec` | Everywhere, including the page token. `#f7f9f7`, a near-white the app also used for pages, went with it |
| 2 | Greige `#cbbeb5` to pale mauve `#e8cfcf` (avatars, highlighted rows, "maybe" tiles, bar tracks) | Everywhere outside the Family app, which keeps its own avatar as its boards draw it |
| 3 | Role pill at the right of the sub-tabs: pale mauve `#f4e6e6`, writing `#10211f` | The coach frame, the app shell and the 19 boards that draw their own |
| 4 | Small capital eyebrows and table headings on light grounds: plum `#7a4b5b` | The shared eyebrow style, the stylesheet, and 344 eyebrows written inline. One that sets its own colour on a dark panel keeps it |
| 5 | Rows of big-number stat tiles: sand, pale mauve, pale green, sand | 26 rows, found by pattern: a white bordered tile, repeated in a row, holding a figure of 22px or more |
| 6 | "Needs you" with a dark header: plum `#33212b`, and the count pill's writing | Home (juniors and youth), MiniRoos Home and its board |
| 7 | "Needs you" with no dark header: a 5px mauve top edge | Keeper coach, fitness, seniors and youth, the club overview and one board. The plum-headed ones take the edge too, as the pack's pictures show |
| 8 | Second grey page tone `#f4f5f3` to `#faf5ec` | Everywhere |
| 9 | Faint grey writing to `#5c6b67` | 617 places where `#6f7f7b` was a writing colour. Borders and fills keep the old grey |
| 10 | Today marker in the MiniRoos calendar: white writing on `#40826d` | Already white in the app; nothing to change |

## Done means

- No `#f7f8f7` left in the app. No `#cbbeb5` left outside the Family app.
- Every light screen sits on `#faf5ec`.
- Amber appears only where it did before: the same 20 uses before and after.

## Checked

- Home for MiniRoos and the club overview against the pack's "after" pictures.
- All 816 screens in the master list open, with the same 58 known problems as before the change.
- Coach navigation 55 of 55, Learn to coach 25 of 25, Education centre 34 of 34, Family 89 of 89, tap targets clean.

## What to know

- **Stat tiles were found by pattern, not screen by screen.** A row built some other way (tiles written out one by one, or a shared tile component) is still white. The two "connected club" stat rows are like that.
- **The club admin's "Director of Football" line** is plain writing in the app, not a pill, so it has no mauve fill.
- **Contrast was not re-measured by script** here, as it was on the designs.
- **Dark mode tokens are untouched.**
