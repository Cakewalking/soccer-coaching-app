# Club colours v2: report back (18 Nov, evening)

Build: the commit that adds this version of the file. All 229 controls in `CLUB-COLOURS-REPORT.csv` were pressed on a local production build: 218 work as written; 5 (Ask Clean Sheet on the director's screens) open the Ask panel in place; 4 on the two Home boards open Your take, which replaced those screens earlier; 2 (the team switcher on the Home boards) are present under a longer label and were not pressed.

## What v2 changed

- The big dark tiles take the club's colours. `club-tile-big`: the darker club colour when white reads on it at 9 to 1 or better, otherwise charcoal. `club-tile-next`: the main colour, unless it is close to amber.
- Big tiles setting on the Club colours screen: "In your colours" (default) or "Charcoal".
- The sample club, Redgum United, is red and black.
- On those tiles, muted writing and film thumbnails go neutral, and a pale next tile gets dark writing.
- Tiles are found the same way as the older bars: while colours are on, the darkest green block is a story or lead tile, and a large green block that is not a bar or a control is a next tile. With red and black set, 152 of the 766 master screens have a recoloured tile and no large green surface is left outside pitches.

## How it is built

- `src/clubTheme.tsx` holds the four tokens (`--club-main`, `--club-second`, `--club-on-main`, `--club-on-second`) and the worked-out line colour. A screen marks what it is (`data-club-bar`, `data-club-tab`, `data-club-pill`, `data-club-band`, `data-club-home`, `data-club-away`, `data-club-badge`) and the theme colours the marks. With nothing set there is no theme on the page at all.
- Saved per club in this browser (`cs_club_colours_v1`). The demo club and the sandbox club are separate.

## Where the colours show

- The top bar, active tab, 4px line and crest in every role's app, and the phone header for every phone role.
- The older screens that draw their own top bar: while colours are on, a full-width green strip at the top of a screen is found and marked as the bar. With a red club set, 555 of the 766 master screens have a club bar; the rest have no bar, or only tiles, which never change.
- Our players in the session set-up pictures, the formation builder, the team-sheet pitch and the drill library diagrams. The other side is always off-white with a dark outline.
- The live season report (Coach › Squad › Season reports): band, crest and "Made with Clean Sheet". Every PDF the app saves: the band, a line in the second colour and the footer.
- The share page a trial pack opens (`/share/...`).
- The academy is its own club: Owner › Home › Academy colours sets it for the academy's coach, parent and player.
- The boards: KC1c, KC2, KC5 to KC10, KCp1 to KCp3.

## Left alone on purpose

- The demo's own bar, the role picker, sign-in and start page, and the "Your children" header: Clean Sheet green.
- Squad-list badges and the live-game pitch: their colours and rings already mean something (availability, share of minutes), so the club's colour stays off them.

## Not built because the thing itself does not exist yet

- Shared clip cards, match cards, sponsor pages, and emails and texts from the club: there is no such screen in the product to put a band on.
- A parent with children at two clubs is on the KCp boards only. The demo parent's two children are both at Wattle Creek.
- A crest image is kept in this browser only.

## Kept off for contrast

None. A pale main colour gets dark writing, and two colours closer than 1.5 to 1 swap the line and active tab to white or dark.

## Decisions for Booker

- The handover says the demo club stays green. The demo starts green, but a director in the demo can pick and save colours for this browser, so the feature can be shown. Say if the demo should be locked to green.
- The check notes ("Easy to read", "The line under the bar and the active tab stand out", "Nothing can be mistaken for proof") show in every state; boards KC3 and KC4 draw some rows without them.
- Wording not in the pack: the check shown when two colours are very close, the crest line once a crest is added, and "Academy colours" with "Save for the whole academy".
