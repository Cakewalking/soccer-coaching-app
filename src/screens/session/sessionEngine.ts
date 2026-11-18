// The justified session: one function that proposes a training session.
//
//   1 What happened    film counts, vests, the coach's taps, note and ratings, the players' views, last week's feedback
//   2 What matters     the two biggest things, never more
//   3 What fits        drills written for that age, only from sources the director allows, never one that breaks a club rule
//   4 Shape            under-13s and below: an arrival game first and a game last; older teams: a warm-up first
//   5 Who is there     every part sized to the count
//   6 How much to say  rendered at the coach's level
//
// Every part carries a one-line why and at least one evidence chip. A part with no evidence is never returned.
// The national curriculum is the federation's: its drills are not loaded here, and it stays switched off as a source.

export type TeamKey = 'u11' | 'u9' | 'u12' | 'u16' | 'seniors'
export type Level = 'new' | 'some' | 'experienced'
export type SourceId = 'curriculum' | 'club' | 'worked' | 'library' | 'warmup'
export type ChipKind = 'film' | 'vests' | 'note' | 'rating' | 'players' | 'curriculum' | 'season'
export type Chip = { kind: ChipKind; text: string; mark?: 'strong' | 'estimate' }
export type Theme = 'arrival' | 'warmup' | 'firstTouch' | 'movingToHelp' | 'running' | 'oneVone' | 'striking' | 'findSpace' | 'brave' | 'winBack' | 'playOut' | 'setPieces' | 'beatPress' | 'game'
type Kind = 'all' | 'squares' | 'gate' | 'lanes' | 'unit' | 'game'

export type Drill = { id: string; name: string; theme: Theme; kind: Kind; ages: [number, number]; source: SourceId; setup: string; breaks?: 'lines' | 'heading' }
export type Sized = { line: string; groups: string; cones: number; balls: number; bibs: number; goals: number; squares: number }
export type Part = { at: string; mins: number; drill: Drill; tag: string; why: Record<Level, string>; chips: Chip[]; sized: Sized }
export type Session = { parts: Part[]; n: number; themes: Theme[]; from: 'game' | 'bye' | 'small'; headline: string; sub: string }

export const TAG: Record<Theme, string> = {
  arrival: 'ARRIVAL GAME', warmup: 'WARM-UP', firstTouch: 'FIRST TOUCH', movingToHelp: 'MOVING TO HELP', running: 'RUNNING WITH THE BALL', oneVone: '1 V 1', striking: 'STRIKING THE BALL',
  findSpace: 'FINDING SPACE', brave: 'BRAVE ON THE BALL', winBack: 'WINNING IT BACK', playOut: 'PLAYING OUT', setPieces: 'SET PIECES', beatPress: 'BEATING THE PRESS', game: 'THE GAME',
}

// ── The menu. Clean Sheet's own library and the club's own drills. No federation content. ──
const d = (id: string, name: string, theme: Theme, kind: Kind, ages: [number, number], source: SourceId, setup: string, breaks?: Drill['breaks']): Drill => ({ id, name, theme, kind, ages, source, setup, breaks })
export const DRILLS: Drill[] = [
  d('tag', 'Tag with a ball', 'arrival', 'all', [5, 13], 'library', 'One big square. Everyone has a ball. {taggers} in bibs.'),
  d('lights', 'Traffic lights', 'arrival', 'all', [5, 13], 'library', 'One big square. Everyone has a ball. Green is go, red is stop, amber is a turn.'),
  d('pirates', 'Pirates and treasure', 'arrival', 'all', [5, 11], 'club', 'One big square. Half have a ball, half try to win one.'),
  d('sharks', 'Sharks and minnows', 'arrival', 'all', [5, 11], 'library', 'One big square. Run your ball across without a shark touching it.'),
  d('warm', 'Warm-up with the ball', 'warmup', 'all', [12, 99], 'warmup', 'Two lanes across the pitch. A ball between two, moving all the time.'),
  d('rondo42', 'Keep-ball 4 v 2', 'firstTouch', 'squares', [9, 13], 'library', '{squares}, 10 by 10 steps. Four on the outside, two in the middle. Win it and you swap with whoever lost it.'),
  d('rondo51', 'Keep-ball 5 v 1', 'firstTouch', 'squares', [8, 13], 'library', '{squares}, 10 by 10 steps. One in the middle. Swap when the ball is won.'),
  d('twotouch', 'Two-touch squares', 'firstTouch', 'squares', [9, 16], 'club', '{squares}, 8 by 8 steps. One touch to control, one to pass.'),
  d('wallpairs', 'Wall pass pairs', 'firstTouch', 'lanes', [8, 13], 'library', 'Pairs, five steps apart. Pass, touch to the side, pass back.'),
  d('free31', 'Find the free player, 3 v 1', 'movingToHelp', 'gate', [8, 13], 'club', 'Same squares, add a gate at one end.'),
  d('support', 'Show for it, 4 v 2 to a target', 'movingToHelp', 'gate', [9, 16], 'library', 'Same squares. Score by finding the target player at the far end.'),
  d('triangles', 'Triangles, pass and move', 'movingToHelp', 'squares', [8, 14], 'library', '{squares}. Pass, then move to the empty corner.'),
  d('thirdman', 'Third-man runs, 5 v 3', 'movingToHelp', 'unit', [13, 99], 'library', 'Half a pitch. Play into feet, set, and release the runner.'),
  d('gates', 'Through the gates', 'running', 'all', [6, 12], 'library', 'One big square with gates of two cones. Run your ball through as many as you can.'),
  d('rivers', 'Cross the river', 'running', 'lanes', [6, 12], 'club', 'Two lines of cones, ten steps apart. Run the ball across without losing it.'),
  d('friend', 'Find a friend', 'findSpace', 'squares', [6, 10], 'library', '{squares}. Pass to a friend, then run to an empty corner.'),
  d('islands', 'Islands', 'findSpace', 'all', [6, 10], 'club', 'Hoops or cone islands across a big square. Only one player on an island.'),
  d('spread', 'Four corners', 'findSpace', 'squares', [6, 10], 'library', '{squares}. Three keep the ball by standing in different corners. One tries to win it.'),
  d('takeon', 'Take them on, 1 v 1 to a gate', 'brave', 'gate', [6, 11], 'library', 'Pairs with one ball. Beat your partner and run through the gate.'),
  d('kings', 'King of the ring', 'brave', 'all', [6, 11], 'club', 'One big square. Keep your ball and knock someone else’s out.'),
  d('winfive', 'Win it back in five seconds', 'winBack', 'squares', [11, 99], 'worked', '{squares}, 15 by 15 steps. Lose it and the nearest two press for five seconds.'),
  d('pressthrees', 'Pressing in threes', 'winBack', 'unit', [11, 99], 'club', 'Half a pitch. Three press together when the ball goes wide.'),
  d('counterpress', 'Lose it, win it, 4 v 4 plus 2', 'winBack', 'squares', [12, 99], 'library', '{squares}, 20 by 20 steps. A goal only counts if you won the ball back inside five seconds.'),
  d('playout', 'Play out from the keeper, 4 v 2', 'playOut', 'unit', [10, 99], 'library', 'A third of the pitch. The keeper starts every ball. Get it over the line under control.'),
  d('playout64', 'Playing out under a press, 6 v 4', 'playOut', 'unit', [12, 99], 'library', 'Half a pitch. Six build from the keeper against four who press.'),
  d('goalkicks', 'Short goal kicks, three options', 'playOut', 'unit', [10, 99], 'club', 'A third of the pitch. Centre backs split, the six shows, the full back goes high.'),
  d('corners', 'Defending corners: near post first', 'setPieces', 'unit', [13, 99], 'library', 'The box. One on the near post, one in front, the rest pick up.'),
  d('zonal', 'Corners: who stands where', 'setPieces', 'unit', [13, 99], 'club', 'The box. Walk through each player’s place, then six live corners.'),
  d('firstline', 'Beat the first line, 7 v 5', 'beatPress', 'unit', [13, 99], 'library', 'Half a pitch. Seven build against five. Score by carrying it over halfway.'),
  d('switch', 'Switch and go, 6 v 4', 'beatPress', 'unit', [13, 99], 'worked', 'Half a pitch. Draw the press to one side, then switch.'),
  d('finish', 'Cut-backs and finishing', 'striking', 'unit', [9, 99], 'worked', 'The box. A wide player cuts it back, two arrive to finish.'),
  d('shootgates', 'Shoot through the gates', 'striking', 'gate', [7, 12], 'library', 'Two goals of cones. Take a touch and strike it through.'),
  d('onevone', '1 v 1 to a line', 'oneVone', 'gate', [7, 14], 'library', 'Pairs in a lane. Beat your player and stop the ball on the line.'),
  d('game', 'Game', 'game', 'game', [5, 99], 'library', 'Take the middle cones away. Two small goals.'),
  d('game4', 'Four-goal game', 'game', 'game', [5, 99], 'library', 'Take the middle cones away. Four small goals, one in each corner.'),
  d('gamezone', 'End-zone game', 'game', 'game', [5, 99], 'club', 'Take the middle cones away. Score by stopping the ball in the end zone.'),
  d('gamekeeper', 'Game from the keeper', 'game', 'game', [8, 99], 'library', 'Take the middle cones away. Every restart comes from your keeper.'),
]
const DRILL = (id: string) => DRILLS.find(x => x.id === id)!

// What a drill is for, in the coach's words. Shared by every drill with that theme.
export const ABOUT: Record<Theme, { learn: string; gets: string; worked: string; say: string[]; leave: string[]; easier: [string, string]; harder: [string, string] }> = {
  firstTouch: { learn: 'To take a first touch away from the player closing them down', gets: 'About 30 touches under pressure in 15 minutes', worked: 'They look up before the ball arrives, not after', say: ['“Where is the space? Touch it there.”', '“Have a look before it comes.”', '“Good idea, {name}. Try it again.”'], leave: ['Don’t stop the game to fix a mistake. Let it run for two minutes, then ask one question.', 'Don’t tell them where to pass. The game is teaching that.'], easier: ['Too hard: they lose it every time', 'Make it 4 v 1'], harder: ['Too easy: 10 passes every time', 'Two touches only'] },
  movingToHelp: { learn: 'To move where the player on the ball can see them', gets: 'A new place to stand every few seconds', worked: 'The player on the ball always has two choices', say: ['“Can {name} see you?”', '“Where could you go to help?”', '“Good move. Now go again.”'], leave: ['Don’t point to where they should stand. Ask who is free.', 'Don’t coach the pass. Coach the player without the ball.'], easier: ['Too hard: nobody is free', 'Make the square bigger'], harder: ['Too easy: always a free player', 'Add a second defender'] },
  running: { learn: 'To run with the ball close, head up', gets: 'A ball at their feet for the whole game', worked: 'They look up while they run, not only at the ball', say: ['“Little touches. Keep it close.”', '“Where is the next gate?”', '“Lovely, {name}. Faster this time.”'], leave: ['Don’t line them up to take turns. Everyone goes at once.', 'Don’t worry about which foot yet.'], easier: ['Too hard: the ball runs away', 'Make the gates wider'], harder: ['Too easy: nobody loses it', 'Add two players who can steal a ball'] },
  oneVone: { learn: 'To take a player on and get past them', gets: 'Ten goes against a player their own size', worked: 'They change speed after the move', say: ['“Go at them. What happens if you slow down?”', '“Which side is open?”', '“Brave, {name}. Go again.”'], leave: ['Don’t show them a trick to copy. Let them find their own.', 'Don’t praise only the ones who get past.'], easier: ['Too hard: the defender always wins', 'Defender starts further away'], harder: ['Too easy: they walk past', 'Make the lane narrower'] },
  striking: { learn: 'To strike the ball cleanly when a chance comes', gets: 'Twenty shots in fifteen minutes', worked: 'They shoot early, without an extra touch', say: ['“See the goal, hit it.”', '“Where is the keeper standing?”', '“Good strike, {name}. Same again.”'], leave: ['Don’t queue them up. Two goals, short lines.', 'Don’t coach technique in the middle of a shot.'], easier: ['Too hard: shots miss the goal', 'Move the goal closer'], harder: ['Too easy: every shot goes in', 'Add a defender closing down'] },
  findSpace: { learn: 'To move away from the ball to where there is room', gets: 'Lots of passes to a friend who is free', worked: 'They stop bunching round the ball', say: ['“Where is there room?”', '“Can you find a corner with nobody in it?”', '“Great space, {name}.”'], leave: ['Don’t shout “spread out”. Ask where the room is.', 'Don’t put them in positions. They are finding out.'], easier: ['Too hard: they all chase the ball', 'Take the defender out'], harder: ['Too easy: always free', 'Add a second defender'] },
  brave: { learn: 'To take a player on without worrying about losing it', gets: 'A go every twenty seconds', worked: 'More of them try it in the game at the end', say: ['“Have a go. What is the worst that can happen?”', '“Which way will you go?”', '“So brave, {name}.”'], leave: ['Don’t groan when they lose it. Losing it is the practice.', 'Don’t tell them to pass.'], easier: ['Too hard: nobody gets past', 'Make the gate wider'], harder: ['Too easy: everyone gets past', 'Two gates, pick one'] },
  winBack: { learn: 'To press together the moment the ball is lost', gets: 'Eight to ten chances to win it straight back', worked: 'The nearest two go at once, without being told', say: ['“Lost it? Who is nearest?”', '“Go together, not one at a time.”', '“That is it, {name}. Five seconds.”'], leave: ['Don’t stop it to place them. Let the five seconds teach it.', 'Don’t ask for a press after a long ball. Only when it is lost close.'], easier: ['Too hard: they never win it back', 'Make the area smaller'], harder: ['Too easy: won back every time', 'Give the other team a target player'] },
  playOut: { learn: 'To stay calm and find the free player from the keeper', gets: 'Twelve builds from the back', worked: 'The first pass goes to feet, not up the pitch', say: ['“Who is free?”', '“Can you open up so you can see the pitch?”', '“Good, {name}. Take your time.”'], leave: ['Don’t tell the keeper who to pass to.', 'Don’t punish a mistake here. This is where they are meant to make them.'], easier: ['Too hard: lost every time', 'Take one presser out'], harder: ['Too easy: out every time', 'Add a presser, or limit touches'] },
  setPieces: { learn: 'Where each player stands when a corner comes in', gets: 'Ten corners, every player in their place', worked: 'The near post is covered without anyone being told', say: ['“Who has the near post?”', '“First contact is ours.”', '“Good, {name}. Stay on the post until it is clear.”'], leave: ['Don’t change the set-up after one goes in. Check who was where.', 'Don’t run this for longer than fifteen minutes.'], easier: ['Too hard: free headers', 'Walk it through twice more'], harder: ['Too easy: cleared every time', 'Vary the delivery, near and far'] },
  beatPress: { learn: 'To play through or round the first line of a press', gets: 'Ten builds against a press', worked: 'They find the spare player before the press arrives', say: ['“Where is the spare player?”', '“Draw them, then go the other way.”', '“Good, {name}. One more pass and you are out.”'], leave: ['Don’t stop it after every loss. Let them feel the press.', 'Don’t add a rule until they have had five goes.'], easier: ['Too hard: pressed every time', 'Take one presser out'], harder: ['Too easy: through every time', 'Two touches for the back four'] },
  arrival: { learn: 'That training starts with a ball and a game', gets: 'A ball each from the first minute', worked: 'Nobody is standing waiting', say: ['“Grab a ball and join in.”', '“Can you keep it away from the tagger?”', '“Nice, {name}.”'], leave: ['Don’t wait for everyone to arrive. Start with who is here.', 'Don’t explain the rules for long. Start, then fix.'], easier: ['Too hard: caught straight away', 'One tagger fewer'], harder: ['Too easy: nobody is caught', 'One more tagger'] },
  warmup: { learn: 'To get ready with the ball, not with laps', gets: 'Ten minutes moving with a ball', worked: 'Everyone is warm and has had fifty touches', say: ['“Ball between two. Keep it moving.”', '“Build it up. Not flat out yet.”', '“Good, {name}.”'], leave: ['Don’t send them on a lap.', 'Don’t stretch standing still at the start.'], easier: ['Too hard: too fast too soon', 'Walk the first two minutes'], harder: ['Too easy: nobody is warm', 'Add a race to finish'] },
  game: { learn: 'To use both ideas when it matters', gets: 'A real game, with one small rule', worked: 'You see Tuesday’s ideas without asking for them', say: ['“Play.”', '“What did we work on tonight?”', '“That is it, {name}.”'], leave: ['Don’t stop the game. Save it for the end.', 'Don’t referee every decision.'], easier: ['Too hard: one team runs away with it', 'Swap two players over'], harder: ['Too easy: no challenge', 'Make the pitch smaller'] },
}

// ── Teams, and what happened in their last game ─────────────────────────────
export type Player = { name: string; conf: number }   // conf: the coach's rating, used only to mix groups. Never shown.
type Evidence = { theme: Theme; weight: number; why: Record<Level, string>; chips: Chip[]; long?: string; num?: string; gameRule?: string }
export type Team = {
  key: TeamKey; label: string; coach: string; coachFull: string; ini: string; age: number; ageWord: string; day: string; time: string; mins: number[]; place: string
  squad: Player[]; polled: number; film: [string, string] | null; note: string; noteWhen: string; ratings: string; evidence: Evidence[]
  skills: Theme[]; season: { wk: number; theme: Theme; why: string }[]; worked: { t: string; note?: string; fig: string }[]; lastFeedback: string; curriculumSkill: string
  headline: string; sub: string; scoreless: boolean
}
const P = (names: string) => names.split(', ').map((name, i, a) => ({ name, conf: a.length - i }))

export const TEAMS: Record<TeamKey, Team> = {
  u11: {
    key: 'u11', label: 'U11 Luke', coach: 'Luke', coachFull: 'Luke Fraser', ini: 'LF', age: 11, ageWord: 'under-11s', day: 'Tue 23 June', time: '5:00 to 6:00', mins: [10, 15, 15, 20], place: 'Wattle Creek Reserve, pitch 3',
    squad: P('Ari, Leo, Jun, Tilly, Poppy, Remy, Sol, Hamza, Edie, Mack, Ines, Theo, Wren'), polled: 13, film: ['Recording quality: Good', '48 of 50 minutes'], note: 'They panic when someone runs at them', noteWhen: 'Sunday 8:10 am', ratings: '9 players',
    evidence: [
      { theme: 'firstTouch', weight: 10, num: '9 times', long: 'On Saturday your team lost the ball {num} playing out from the back. The week before it was 4. In most of them the first touch went straight to the player closing down.',
        why: { new: 'lost the ball 9 times playing out from the back, up from 4.', some: 'lost it 9 times playing out, up from 4. First touch into pressure.', experienced: 'Lost it 9 times playing out (was 4).' },
        chips: [{ kind: 'film', text: 'Film', mark: 'strong' }, { kind: 'note', text: 'Your note: “they panic when someone runs at them”' }, { kind: 'players', text: 'Ari and Jun rated themselves 2 for staying calm' }] },
      { theme: 'movingToHelp', weight: 8, long: 'Most passes on Saturday went to a player who was already marked. The players without the ball were standing still.',
        why: { new: 'most passes on Saturday went to a player who was marked.', some: 'most passes went to a marked player. Nobody moving to help.', experienced: 'Passes into marked players.' },
        chips: [{ kind: 'film', text: 'Film', mark: 'estimate' }, { kind: 'rating', text: 'You rated “helping the player on the ball” 2 of 5' }], gameRule: 'Goals from your keeper count double.' },
    ],
    skills: ['firstTouch', 'running', 'oneVone', 'striking'], curriculumSkill: 'First touch', lastFeedback: '7 of 9 players said it was “about right” last week. Once more.',
    season: [{ wk: 1, theme: 'oneVone', why: '' }, { wk: 2, theme: 'running', why: '' }, { wk: 3, theme: 'firstTouch', why: '' }, { wk: 4, theme: 'firstTouch', why: '' }, { wk: 5, theme: 'oneVone', why: '' }, { wk: 6, theme: 'striking', why: '' },
      { wk: 7, theme: 'oneVone', why: 'Beaten down the right 6 times' }, { wk: 8, theme: 'striking', why: 'No film · your three taps: “didn’t shoot”' }, { wk: 9, theme: 'striking', why: '3 shots all game · you rated finishing 2 of 5' }, { wk: 10, theme: 'firstTouch', why: 'Lost it 9 times playing out · your note' }],
    worked: [{ t: 'First touch, weeks 3 and 4', note: 'It crept back up in week 10', fig: 'Lost playing out: 8 to 4' }, { t: '1 v 1, weeks 5 and 7', fig: 'Beaten down the side: 6 to 3' }, { t: 'Striking the ball, weeks 8 and 9', fig: 'Shots: 3 to 7' }],
    headline: 'Two things stood out on Saturday. Tuesday works on both.', sub: 'Losing the ball playing out from the back, and standing still without it.', scoreless: false,
  },
  u9: {
    key: 'u9', label: 'U9 Tom', coach: 'Tom', coachFull: 'Tom Albers', ini: 'TA', age: 9, ageWord: 'under-9s', day: 'Tue 9 June', time: '5:00 to 5:45', mins: [10, 10, 10, 15], place: 'Wattle Creek Reserve, pitch 2',
    squad: P('Ivy, Max, Arlo, Zara, Evie, Leo, Theo, Poppy, Jude, Omar'), polled: 10, film: ['Recording quality: Good', '38 of 40 minutes'], note: 'They all chase the ball like bees', noteWhen: 'Saturday 11:40 am', ratings: '10 players',
    evidence: [
      { theme: 'findSpace', weight: 10, long: 'On Saturday the team bunched round the ball. For most of the game eight of them were inside the same small patch of the pitch.',
        why: { new: 'they bunched round the ball on Saturday. Eight of them in one small patch.', some: 'bunched round the ball. Eight in one patch.', experienced: 'Bunching: eight in one patch.' },
        chips: [{ kind: 'film', text: 'Film', mark: 'estimate' }, { kind: 'note', text: 'Your note: “they all chase the ball like bees”' }], gameRule: 'Cheer every pass to a friend in space.' },
      { theme: 'brave', weight: 8, num: 'seven of your ten', long: 'You have been working on being brave with the ball. On Saturday {num} took a player on. A month ago it was three.',
        why: { new: 'seven of your ten took a player on, up from three. Keep it going.', some: 'seven of ten took a player on (was three). Keep going.', experienced: 'Took a player on: 7 of 10 (was 3).' },
        chips: [{ kind: 'film', text: 'Film', mark: 'strong' }, { kind: 'rating', text: 'Your three taps: “brave on the ball”' }] },
    ],
    skills: ['findSpace', 'running', 'brave', 'striking'], curriculumSkill: 'Finding space', lastFeedback: '8 of 10 players said it was “about right” last week. Once more.',
    season: [{ wk: 1, theme: 'running', why: '' }, { wk: 2, theme: 'brave', why: '' }, { wk: 3, theme: 'brave', why: '' }, { wk: 4, theme: 'striking', why: '' }, { wk: 5, theme: 'findSpace', why: '' }, { wk: 6, theme: 'brave', why: '' },
      { wk: 7, theme: 'striking', why: 'Your three taps: “nobody shot”' }, { wk: 8, theme: 'brave', why: 'Three of ten took a player on' }, { wk: 9, theme: 'brave', why: 'Five of ten · your note' }, { wk: 10, theme: 'findSpace', why: 'Bunched round the ball · your note' }],
    worked: [{ t: 'Brave on the ball, weeks 8 and 9', fig: 'Took a player on: 3 to 7 of 10' }, { t: 'Striking the ball, weeks 4 and 7', fig: 'Children who had a shot: 4 to 8' }],
    headline: 'Two things stood out on Saturday. Tuesday works on both.', sub: 'Bunching round the ball, and keeping them brave on it.', scoreless: true,
  },
  u12: {
    key: 'u12', label: 'U12 Sam', coach: 'Sam', coachFull: 'Sam Kelly', ini: 'SK', age: 12, ageWord: 'under-12s', day: 'Tue 9 June', time: '5:45 to 7:00', mins: [10, 20, 20, 25], place: 'Wattle Creek Reserve, pitch 2',
    squad: P('Mia, Jai, Noah, Zoe, Harper, Grace, Leo, Ruby, Sam D, Finn, Isla, Ella, Kofi, Ben, Ava, Tom'), polled: 16, film: ['Recording quality: Good', '58 of 60 minutes'], note: 'Legs went after half time and we dropped off', noteWhen: 'Saturday 4:20 pm', ratings: '9 players',
    evidence: [
      { theme: 'winBack', weight: 10, num: '7 seconds', long: 'On Saturday it took your team {num} on average to win the ball back. Your usual is 4. After half time the nearest player went alone.',
        why: { new: 'took 7 seconds to win the ball back on Saturday. Your usual is 4.', some: '7 seconds to win it back (usual 4). Pressing one at a time.', experienced: 'Win-back time 7 s (usual 4).' },
        chips: [{ kind: 'film', text: 'Film', mark: 'strong' }, { kind: 'note', text: 'Your note: “legs went after half time and we dropped off”' }], gameRule: 'A goal inside five seconds of winning it counts double.' },
      { theme: 'playOut', weight: 8, long: 'You want goal kicks played short. On Saturday 64% were, against your target of 70%. Twice the keeper went long with a centre back free.',
        why: { new: '64% of goal kicks went short on Saturday. Your target is 70%.', some: 'goal kicks short 64% (target 70%). Free centre back missed twice.', experienced: 'Goal kicks short 64% (target 70%).' },
        chips: [{ kind: 'film', text: 'Film', mark: 'strong' }, { kind: 'rating', text: 'You rated “playing out” 3 of 5' }] },
    ],
    skills: ['winBack', 'playOut', 'oneVone', 'striking'], curriculumSkill: 'Winning it back', lastFeedback: '10 of 12 players said it was “about right” last week. Once more.',
    season: [{ wk: 1, theme: 'playOut', why: '' }, { wk: 2, theme: 'winBack', why: '' }, { wk: 3, theme: 'striking', why: '' }, { wk: 4, theme: 'winBack', why: '' }, { wk: 5, theme: 'playOut', why: '' }, { wk: 6, theme: 'striking', why: '' },
      { wk: 7, theme: 'oneVone', why: 'Beaten down the left 5 times' }, { wk: 8, theme: 'striking', why: '4 shots all game' }, { wk: 9, theme: 'playOut', why: 'Goal kicks short 58% · your note' }, { wk: 10, theme: 'winBack', why: 'Win-back time 7 seconds · your note' }],
    worked: [{ t: 'Winning it back, weeks 2 and 4', note: 'It slipped again in week 10', fig: 'Seconds to win it back: 6 to 4' }, { t: 'Playing out, weeks 5 and 9', fig: 'Goal kicks short: 58% to 64%' }, { t: 'Striking the ball, weeks 6 and 8', fig: 'Shots: 4 to 9' }],
    headline: 'Two things stood out on Saturday. Tuesday works on both.', sub: 'Slower to win the ball back, and goal kicks going long.', scoreless: false,
  },
  u16: {
    key: 'u16', label: 'U16 Ollie', coach: 'Ollie', coachFull: 'Ollie Grant', ini: 'OG', age: 16, ageWord: 'under-16s', day: 'Tue 9 June', time: '6:30 to 7:45', mins: [10, 20, 20, 25], place: 'Wattle Creek Reserve, pitch 1',
    squad: P('Cal, Theo, Ari, Owen, Ryan, Jake, Erin, Sami, Leo, Kai, Finn, Max, Dan, Josh, Tane, Ben'), polled: 16, film: ['Recording quality: Good', '78 of 80 minutes'], note: 'We kept giving it away at the back when they pressed', noteWhen: 'Saturday 6:05 pm', ratings: '12 players',
    evidence: [
      { theme: 'playOut', weight: 10, num: '9 times', long: 'On Saturday your team lost the ball {num} playing out from the back. Six of them came when Tealside pressed with three.',
        why: { new: 'lost the ball 9 times playing out. Six came against a press of three.', some: 'lost it 9 times playing out, six against a press of three.', experienced: 'Lost it 9 times playing out.' },
        chips: [{ kind: 'film', text: 'Film', mark: 'strong' }, { kind: 'note', text: 'Your note: “we kept giving it away at the back when they pressed”' }], gameRule: 'Every restart comes from your keeper.' },
      { theme: 'movingToHelp', weight: 7, long: 'When the centre backs had the ball, the midfield stayed behind their markers. Only one pass in five went forward.',
        why: { new: 'the midfield stayed behind their markers. One pass in five went forward.', some: 'midfield hiding behind markers. One pass in five forward.', experienced: 'Forward passes: one in five.' },
        chips: [{ kind: 'film', text: 'Film', mark: 'estimate' }, { kind: 'players', text: '5 players said “nobody to pass to”' }] },
    ],
    skills: ['playOut', 'winBack', 'movingToHelp', 'striking'], curriculumSkill: 'Playing out', lastFeedback: '9 of 12 players said it was “about right” last week. Once more.',
    season: [{ wk: 1, theme: 'winBack', why: '' }, { wk: 2, theme: 'striking', why: '' }, { wk: 3, theme: 'playOut', why: '' }, { wk: 4, theme: 'winBack', why: '' }, { wk: 5, theme: 'striking', why: '' }, { wk: 6, theme: 'movingToHelp', why: '' },
      { wk: 7, theme: 'winBack', why: 'Pressing one at a time · your note' }, { wk: 8, theme: 'striking', why: '5 shots, 1 on target' }, { wk: 9, theme: 'movingToHelp', why: 'Players: “nobody to pass to”' }, { wk: 10, theme: 'playOut', why: 'Lost it 9 times playing out · your note' }],
    worked: [{ t: 'Winning it back, weeks 4 and 7', fig: 'Won back inside 6 seconds: 31% to 44%' }, { t: 'Striking the ball, weeks 5 and 8', fig: 'Shots on target: 1 to 4' }],
    headline: 'Two things stood out on Saturday. Tuesday works on both.', sub: 'Losing it playing out under a press, and nobody showing for the ball.', scoreless: false,
  },
  seniors: {
    key: 'seniors', label: 'Men’s 1sts', coach: 'Marko', coachFull: 'Marko Petrovic', ini: 'MP', age: 30, ageWord: 'senior players', day: 'Tue 9 June', time: '7:30 to 9:00', mins: [15, 20, 25, 30], place: 'Wattle Creek Reserve, pitch 1',
    squad: P('Daniel, Tim, Mo, Chris, Josh, Harry, Seth, Nico, Lee, Sam, Ali, Jack, Rhys, Tom, Ed, Luca, Ben, Matt'), polled: 18, film: ['Recording quality: Good', '88 of 90 minutes'], note: 'Corners are killing us. Nobody on the post', noteWhen: 'Saturday 7:15 pm', ratings: '14 players',
    evidence: [
      { theme: 'setPieces', weight: 10, num: 'two chances', long: 'On Saturday you gave up {num} from your own corners being cleared badly, and three goals this season from near-post corners against you. Nobody stands on the post.',
        why: { new: 'two chances given up from corners, and nobody on the near post.', some: 'two chances given up from corners. Near post empty.', experienced: 'Corners: two chances given up.' },
        chips: [{ kind: 'film', text: 'Film', mark: 'strong' }, { kind: 'note', text: 'Your note: “corners are killing us. Nobody on the post”' }] },
      { theme: 'beatPress', weight: 7, long: 'Banksia Park press with a front three. Against the last team that did, you went long with 60% of your goal kicks.',
        why: { new: 'Saturday’s opponents press with a front three. Last time you went long with 60% of goal kicks.', some: 'Banksia press with three. Last time: 60% of goal kicks long.', experienced: 'Opponent presses with three.' },
        chips: [{ kind: 'film', text: 'Film', mark: 'estimate' }, { kind: 'rating', text: 'You rated “playing through a press” 2 of 5' }], gameRule: 'Carry it over halfway and the goal counts double.' },
    ],
    skills: ['setPieces', 'beatPress', 'winBack', 'striking'], curriculumSkill: 'Set pieces', lastFeedback: '11 of 14 players said it was “about right” last week. Once more.',
    season: [{ wk: 1, theme: 'winBack', why: '' }, { wk: 2, theme: 'striking', why: '' }, { wk: 3, theme: 'beatPress', why: '' }, { wk: 4, theme: 'winBack', why: '' }, { wk: 5, theme: 'striking', why: '' }, { wk: 6, theme: 'winBack', why: '' },
      { wk: 7, theme: 'striking', why: '2 goals from 14 shots' }, { wk: 8, theme: 'beatPress', why: 'Goal kicks long: 60%' }, { wk: 9, theme: 'winBack', why: 'Pressing high: 15 wins in their half' }, { wk: 10, theme: 'setPieces', why: 'Two chances given up from corners · your note' }],
    worked: [{ t: 'Winning it back, weeks 4 and 6', fig: 'Wins in their half: 9 to 15' }, { t: 'Striking the ball, weeks 5 and 7', fig: 'Shots on target: 4 to 7' }],
    headline: 'Two things stood out on Saturday. Tuesday works on both.', sub: 'Corners against you, and playing through a press.', scoreless: false,
  },
}

// ── Sources and rules (set by the director on GS11) ─────────────────────────
export type Rules = { sources: Record<SourceId, boolean>; endWithGame: boolean; noLines: boolean; warmupFirst: boolean; noHeadingU12: boolean }
export const SOURCES: { id: SourceId; name: string; sub: string; drills: string; ages: string; by: string; locked?: string }[] = [
  { id: 'curriculum', name: 'National curriculum', sub: 'Games and practices for each age phase', drills: '212', ages: 'U6 to seniors', by: 'Federation', locked: 'Waiting for the federation’s agreement' },
  { id: 'club', name: 'Wattle Creek’s own', sub: 'Added by your coaches', drills: '46', ages: 'U8 to U16', by: 'Rachel M' },
  { id: 'worked', name: 'Sessions that worked here', sub: 'Shared by coaches after they moved a team’s numbers', drills: '9', ages: 'U9 to U15', by: 'The coach and you' },
  { id: 'library', name: 'Clean Sheet’s library', sub: 'Extra games, matched to the curriculum', drills: '130', ages: 'U6 to seniors', by: 'Clean Sheet' },
  { id: 'warmup', name: 'Warm-up for injury prevention', sub: 'The standard children’s warm-up', drills: '1 set', ages: 'U7 to U13', by: 'Federation' },
]
export const DEFAULT_RULES: Rules = { sources: { curriculum: false, club: true, worked: true, library: true, warmup: true }, endWithGame: true, noLines: true, warmupFirst: true, noHeadingU12: true }

// ── Sizing: every part is redrawn for the number who are there ──────────────
const squaresFor = (n: number) => n >= 10 ? 3 : n >= 8 ? 2 : 1
const words = ['No', 'One', 'Two', 'Three', 'Four']
export function size(drill: Drill, n: number, older = false): Sized {
  const sq = squaresFor(n), side = Math.floor(n / 2), plus = n % 2
  const kit = { cones: 4 * sq + 4, balls: sq, bibs: side, goals: 0, squares: sq }
  const squares = sq === 1 ? 'One square' : `${words[sq]} squares`
  if (drill.kind === 'all') { const t = n >= 12 ? 3 : n >= 7 ? 2 : 1; return { ...kit, balls: n, bibs: drill.theme === 'warmup' ? 0 : t, line: drill.id === 'tag' ? `${words[t]} tagger${t > 1 ? 's' : ''}` : `All ${n} together`, groups: `All ${n} together` } }
  if (drill.kind === 'game') { const g = `${side} v ${side}${plus ? ' plus 1' : ''}`; return { ...kit, balls: 1, goals: 2, line: `${g}${!older && n < 10 ? ', smaller pitch' : ''}`, groups: g } }
  if (drill.kind === 'unit' || drill.kind === 'lanes') return { ...kit, cones: 8, balls: Math.ceil(n / 2), line: n >= 14 ? 'Two groups, swap after 8 minutes' : 'One group, everyone in', groups: n >= 14 ? 'Two groups' : 'One group' }
  if (drill.id === 'rondo42') return { ...kit, line: n >= 12 ? 'Three squares of 4 v 2, one spare' : n >= 10 ? 'Three squares: one 4 v 2, two 3 v 1' : n >= 8 ? 'Two squares: one 4 v 2, one 3 v 1 that rotates' : 'One square, 4 v 2 plus a rotating player', groups: squares }
  if (drill.kind === 'gate') return { ...kit, line: n >= 12 ? 'Three squares of 3 v 1' : n >= 10 ? 'Three squares, one spare rotates' : n >= 8 ? 'Two squares, one spare rotates' : 'One square, swap every 2 minutes', groups: squares }
  return { ...kit, line: n >= 12 ? 'Three squares' : n >= 8 ? 'Two squares' : 'One square, swap every 2 minutes', groups: squares }
}
/** Mixed groups: sorted by the coach's rating and dealt round, so each has a confident player and a quieter one. Never labelled by ability. */
export function groups(present: Player[], k: number): Player[][] {
  const out: Player[][] = Array.from({ length: Math.max(1, k) }, () => [])
  ;[...present].sort((a, b) => b.conf - a.conf).forEach((p, i) => out[i % out.length].push(p))
  return out
}
export function teamsFor(present: Player[]): { bibs: Player[]; none: Player[]; spare: Player | null } {
  const sorted = [...present].sort((a, b) => b.conf - a.conf), spare = sorted.length % 2 ? sorted[sorted.length - 1] : null
  const rest = spare ? sorted.slice(0, -1) : sorted
  return { bibs: rest.filter((_, i) => i % 2 === 0), none: rest.filter((_, i) => i % 2 === 1), spare }
}

// ── The one function ─────────────────────────────────────────────────────────
export type Input = { team: Team; n: number; rules: Rules; swaps?: Record<number, string>; bye?: boolean; filmless?: boolean }
const fits = (x: Drill, team: Team, rules: Rules) => team.age >= x.ages[0] && team.age <= x.ages[1] && rules.sources[x.source] && !(rules.noLines && x.breaks === 'lines') && !(rules.noHeadingU12 && team.age < 12 && x.breaks === 'heading')
/** Drills for a theme that this team may be offered, best first. */
export function menu(theme: Theme, team: Team, rules: Rules): Drill[] {
  const ok = DRILLS.filter(x => x.theme === theme && fits(x, team, rules))
  return ok.length ? ok : DRILLS.filter(x => x.theme === theme && team.age >= x.ages[0] && team.age <= x.ages[1] && x.source !== 'curriculum' && rules.sources.library)
}
const clock = (start: string, add: number) => { const [h, m] = start.split(':').map(Number); const t = h * 60 + m + add; return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }

export function proposeSession({ team, n, rules, swaps = {}, bye = false, filmless = false }: Input): Session {
  const young = team.age <= 13, start = team.time.split(' ')[0]
  const pick = (theme: Theme, i: number) => DRILL(swaps[i] ?? '') ?? menu(theme, team, rules)[0] ?? DRILL('game')
  const all = (s: string): Record<Level, string> => ({ new: s, some: s, experienced: s })
  let plan: { theme: Theme; why: Record<Level, string>; chips: Chip[] }[]
  let from: Session['from'] = bye ? 'bye' : 'game', headline = team.headline, sub = team.sub

  // 1 and 2 · what happened, and the two things that matter most
  const ev = [...team.evidence].sort((a, b) => b.weight - a.weight).slice(0, 2)
    .map(e => filmless ? { ...e, chips: e.chips.filter(c => c.kind !== 'film' && c.kind !== 'vests') } : e).filter(e => e.chips.length)
  const covered = (t: Theme) => team.season.filter(w => w.theme === t).length
  const least = [...team.skills].sort((a, b) => covered(a) - covered(b))[0]
  const openChip: Chip = young ? { kind: 'curriculum', text: 'Curriculum: start with a game' } : { kind: 'vests', text: 'Vests', mark: 'strong' }
  const openWhy = young ? all(bye ? 'everyone on a ball from the first minute.' : 'everyone is on a ball from the first minute.') : all('sprint distance fell late on Saturday. Build up with the ball, no laps.')
  const endChip: Chip = { kind: 'curriculum', text: 'Curriculum: end with a game' }

  if (bye || !ev.length) {
    // Nothing to go on: the least-covered skill for this age, and last week's main game once more. Never an invented reason.
    from = 'bye'; const last = team.season[team.season.length - 1].theme
    headline = 'No game on Saturday, so this week comes from the curriculum.'
    sub = `Next for ${team.ageWord} is ${TAG[least].toLowerCase().replace('1 v 1', '1 v 1')}. You have not worked on it since round ${Math.max(1, ...team.season.filter(w => w.theme === least).map(w => w.wk))}.`
    plan = [
      { theme: young ? 'arrival' : 'warmup', why: openWhy, chips: [openChip] },
      { theme: least, why: all(`the core skill you have done least: ${words[covered(least)]?.toLowerCase() ?? covered(least)} session${covered(least) === 1 ? '' : 's'} of ten.`), chips: [{ kind: 'curriculum', text: `Curriculum, ${team.age <= 11 ? 'under 10 and 11' : team.ageWord}` }, { kind: 'season', text: 'Your season so far' }] },
      { theme: last, why: all(team.lastFeedback.replace(/^(\d)/, '$1').replace(/^./, c => c.toLowerCase())), chips: [{ kind: 'players', text: 'The players’ three taps' }] },
      { theme: 'game', why: all(least === 'running' ? 'run the ball over halfway and your goal counts double.' : `one rule for ${TAG[least].toLowerCase()}, then let them play.`), chips: [endChip] },
    ]
  } else {
    const rule = ev.find(e => e.gameRule)?.gameRule ?? ''
    plan = [
      { theme: young ? 'arrival' : 'warmup', why: openWhy, chips: [openChip] },
      ...ev.map(e => ({ theme: e.theme, why: e.why, chips: e.chips })),
      { theme: 'game' as Theme, why: all(`both ideas in a real game.${rule ? ` ${rule}` : ''}`), chips: young ? [endChip] : [{ kind: 'note' as ChipKind, text: `Your note: “${team.note.charAt(0).toLowerCase() + team.note.slice(1)}”` }] },
    ]
  }
  // Fewer than six: small games only, and the coach is told first.
  if (n < 6 && n > 0) { from = 'small'; headline = `Only ${n} are coming, so this is a different session.`; sub = 'Small games only. Same reasons, less waiting.' }

  // 3, 4, 5 · what fits, in shape, sized for who is there
  let t = 0
  const parts: Part[] = plan.map((p, i) => {
    let drill = pick(p.theme, i)
    if (from === 'bye' && i === 0 && !swaps[0]) drill = menu(p.theme, team, rules)[1] ?? drill   // a different arrival game from last week
    if (i === 1 && plan[2] && drill.id === pick(plan[2].theme, 2).id) drill = menu(p.theme, team, rules)[1] ?? drill
    if (from === 'bye' && i === 2 && !swaps[i]) drill = { ...drill, name: `${drill.name}, again` }
    const sized = size(drill, n, !young)
    if (drill.kind === 'game') drill = { ...drill, name: `${drill.id === 'game' ? 'Game' : drill.name}: ${sized.groups}` }
    const part = { at: clock(start, t), mins: team.mins[i] ?? 15, drill, tag: TAG[p.theme], why: p.why, chips: p.chips, sized }
    t += part.mins
    return part
  }).filter(p => p.chips.length > 0)   // a part with no evidence is not allowed on the screen
  return { parts, n, themes: plan.slice(1, 3).map(p => p.theme), from, headline, sub }
}

/** What changed when the count moved: part by part, and the kit. */
export function whatChanged(a: Session, b: Session): { part: string; was: string; now: string }[] {
  const kit = (s: Session) => { const cones = Math.max(...s.parts.map(p => p.sized.cones)), bibs = Math.max(...s.parts.map(p => p.sized.bibs)); return `${cones}, ${s.n}, ${bibs}` }
  const rows = a.parts.map((p, i) => ({ part: p.drill.kind === 'game' ? 'Game' : p.drill.name.split(',')[0].replace(' 4 v 2', ''), was: p.drill.kind === 'game' ? p.sized.groups : p.sized.line, now: b.parts[i]?.sized.line ?? '' }))
  return [...rows.filter(r => r.was !== r.now), { part: 'Cones, balls, bibs', was: kit(a), now: kit(b) }]
}
/** Kit for the whole session: the most of each that any one part needs. */
export function kit(s: Session) { return { cones: Math.max(...s.parts.map(p => p.sized.cones)), balls: Math.max(...s.parts.map(p => p.sized.balls)), bibs: Math.max(...s.parts.map(p => p.sized.bibs)), goals: Math.max(...s.parts.map(p => p.sized.goals)) } }
