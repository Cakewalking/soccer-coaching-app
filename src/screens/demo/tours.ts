export interface TourStep {
  label: string
  caption: string
  screen?: string  // optional key for which existing screen to show
}

export interface TourSection {
  title: string
  steps: TourStep[]
}

export interface TourDef {
  roleLabel: string
  persona: string
  device: 'tablet' | 'phone'
  total: number
  sections: TourSection[]
}

export const TOURS: Record<string, TourDef> = {
  coach: {
    roleLabel: 'Coach · Juniors, under 12 and under 13',
    persona: 'as Sam K, U12 Sam',
    device: 'tablet',
    total: 36,
    sections: [
      { title: 'Join', steps: [
        { label: 'Welcome', caption: 'Signing up takes a few minutes, and nobody sees a child\'s data until their children check is confirmed.', screen: 'signup' },
        { label: 'Account and children check', caption: 'Create an account and confirm your Working with Children Check before seeing any player data.' },
        { label: 'Team and division', caption: 'Your team\'s age group and format come from the club. You set your training night.' },
        { label: 'Invite staff', caption: 'Invite a co-coach, team manager, or fitness coach. They accept before they can see anything.' },
        { label: 'Ready', caption: 'Your home screen is ready. It shows what needs doing before the first game.' },
      ]},
      { title: 'Set up', steps: [
        { label: 'Add players', caption: 'Players appear when parents accept their invite. You see the list grow as families join.' },
        { label: 'Set how we play', caption: 'Pick the shape and style your team uses. This seeds the opposition and training plans.' },
        { label: 'First training plan', caption: 'The first session plan is ready before anyone trains. Adjust it on the pitch.' },
        { label: 'Camera and kit', caption: 'Pair the match camera. It syncs the recording to the right game automatically.' },
      ]},
      { title: 'After a game', steps: [
        { label: 'The recording arrives', caption: 'The game recording appears within minutes of the final whistle.', screen: 'review' },
        { label: 'The review is ready', caption: 'Key moments are tagged automatically. You add your own notes before the week starts.' },
        { label: 'What to focus on', caption: 'The app suggests one thing to work on in training, based on what it saw.' },
        { label: 'Clips for players', caption: 'Send a clip to a player or parent. It lands in their app, not in email.' },
        { label: 'Parent message', caption: 'Send the weekly summary. Parents see fair minutes, goals met, and what\'s coming.' },
      ]},
      { title: 'Plan the week', steps: [
        { label: 'Home this week', caption: 'Your home screen shows the week: training, the upcoming game, and who\'s coming.', screen: 'home' },
        { label: 'Availability', caption: 'Parents answer one question. You see it before you finalise the team.' },
        { label: 'Fitness check', caption: 'Players check in before training. You see any concerns before they arrive.' },
        { label: 'Opposition', caption: 'Add notes on the other team. These appear in your team talk on game day.' },
      ]},
      { title: 'Train', steps: [
        { label: 'Tonight\'s session', caption: 'The plan is ready when you arrive. Drills match the age group and what you\'re working on.', screen: 'training' },
        { label: 'The drill library', caption: 'Browse or search drills from the national curriculum. Add your own.' },
        { label: 'Boot sensors', caption: 'Vests and boots track load automatically during training and games.' },
        { label: 'Growth and load', caption: 'Load is capped during growth spurts. The app flags players who need rest.' },
        { label: 'Pitch-side view', caption: 'Open pitch-side mode on game day for a simple line-up and minutes tracker.' },
        { label: 'Development goals', caption: 'Each player has two or three things to work on. These sit alongside the session plan.' },
        { label: 'Wellness', caption: 'Players rate how they feel. You see it before training, not after.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Team talk', caption: 'The team talk pulls in your session focus and opposition notes. Edit it on the way to the ground.', screen: 'matchday' },
        { label: 'Line-up and minutes', caption: 'Set the line-up. Fair-minutes rules are built in — the app tells you if someone\'s short.' },
        { label: 'Live game', caption: 'Tag moments live. The camera records everything — you tag what matters.' },
        { label: 'Head-knock protocol', caption: 'Log a head knock. Parents are told straight away. The player sits out the rest of the game.' },
        { label: 'After the game', caption: 'Review the recording before you leave the ground. The key moments are already tagged.' },
      ]},
      { title: 'Players', steps: [
        { label: 'Squad overview', caption: 'See every player\'s goals, availability, check-ins, and fair-minutes balance.', screen: 'squad' },
        { label: 'Player profile', caption: 'Tap a player to see their goals, clips, check-ins, and what helps them.' },
        { label: 'Development goals', caption: 'Set two or three things to work on. Parents and players see them too.' },
        { label: 'Consent and privacy', caption: 'Parents control what\'s recorded. You see which switches are on before each session.' },
        { label: 'Messages', caption: 'Message a parent or the whole team. All messages go through the app, not your personal phone.' },
        { label: 'Injury and welfare', caption: 'Log an injury or raise a concern. It goes to the welfare officer without the club seeing.' },
      ]},
    ],
  },

  miniroos: {
    roleLabel: 'Coach · MiniRoos, under 6 to under 11',
    persona: 'as Tom Albers, U9 Tom',
    device: 'tablet',
    total: 23,
    sections: [
      { title: 'Join', steps: [
        { label: 'Create account and children check', caption: 'A volunteer coach signs up in a few minutes. Nothing about a child shows until the children check is confirmed.', screen: 'miniroos' },
        { label: 'Find the club', caption: 'Search for your club by name. The age group and format are already set.' },
        { label: 'Set up the team', caption: 'Add your training night. The calendar fills in for the whole term.' },
        { label: 'Invite a manager', caption: 'Invite a team manager or game leader. They accept before they see any data.' },
      ]},
      { title: 'Set up', steps: [
        { label: 'First-use home', caption: 'The home screen walks you through the first three things to do.', screen: 'miniroos' },
        { label: 'Share the link', caption: 'Send a link to families. As they join, the squad list grows.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Home overview', caption: 'The home screen shows training, the game, and who hasn\'t answered yet.', screen: 'miniroos' },
        { label: 'Who\'s coming', caption: 'Parents answer one question. You see it before you plan the session.' },
        { label: 'Calendar', caption: 'Training and games are on one calendar. Families see the same thing in their app.' },
        { label: 'Squad', caption: 'Each player card shows whose turn in goal and captain is due.' },
        { label: 'Training plan', caption: 'The session plan follows the Football Australia MiniRoos curriculum for the age.' },
        { label: 'Parent inbox', caption: 'Message one family or all of them. It lands in the parent app.' },
        { label: 'Game day turns', caption: 'On game day, record who went in goal and who was captain. Turns track themselves.' },
        { label: 'What I saw', caption: 'After the game, write one thing you noticed for each player. Parents see it.' },
        { label: 'Thank the families', caption: 'Send a thank-you message after the game. It goes to every family at once.' },
        { label: 'Season notes', caption: 'At the end of the season, each family gets a short note from you.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Turns tracker', caption: 'Track goal turns and captain turns on the pitch.' },
        { label: 'Pitch-side view', caption: 'Simple view for the game: who\'s playing, who\'s next, whose turn is due.' },
        { label: 'Parent message', caption: 'Send a quick message to families from the sideline.' },
      ]},
      { title: 'After the game', steps: [
        { label: 'What I saw', caption: 'Write one thing for each player while it\'s fresh.' },
        { label: 'Fixtures tab', caption: 'Results don\'t show for MiniRoos. Fixtures just show when and where.' },
      ]},
      { title: 'Season', steps: [
        { label: 'Season notes', caption: 'Each family gets a short note at the end of the season. No scores, no rankings.' },
        { label: 'Next term', caption: 'Roll into next term. Training nights and the squad carry over.' },
      ]},
    ],
  },

  youth: {
    roleLabel: 'Coach · Youth, under 14 to under 18',
    persona: 'as Ollie Grant, U16 Ollie',
    device: 'tablet',
    total: 15,
    sections: [
      { title: 'Join and set up', steps: [
        { label: 'Same as juniors', caption: 'Same sign-up as juniors. The club\'s playing style and heading policy arrive already set.', screen: 'youth' },
        { label: 'Set how we play', caption: 'You can override the club style for your team, or keep it.' },
        { label: 'Heading policy applies', caption: 'The heading policy is built in. You can\'t turn it off for youth teams.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Home this week', caption: 'The home screen shows training, the game, and who\'s coming.', screen: 'youth' },
        { label: 'Growth and load', caption: 'Players in growth spurts get a load cap. The app flags them before training.' },
        { label: 'Player check-ins', caption: 'Players 15 and over check in on their own phone. Under 15s check in through a parent.' },
        { label: 'Opposition', caption: 'Add notes on the other team for the team talk.' },
        { label: 'Development goals', caption: 'Each player has personal goals that follow them from last season.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Team talk', caption: 'The team talk pulls in opposition notes and your session focus.' },
        { label: 'Line-up', caption: 'Set the line-up. A third-of-a-game minimum applies at this age.' },
        { label: 'Live game', caption: 'Tag moments live. Cards from Dribl appear automatically.' },
        { label: 'Review', caption: 'The review is ready after the game. Players 15 and over can see their own clips.' },
      ]},
      { title: 'Players', steps: [
        { label: 'Player profiles', caption: 'Each player\'s profile shows goals, clips, and load history.' },
        { label: 'Registrations', caption: 'Registration windows and clearances appear in the squad view.' },
        { label: 'Seniors bridge', caption: 'Players who reach 18 move to their own adult account.' },
      ]},
    ],
  },

  seniors: {
    roleLabel: 'Coach · Seniors and NPL',
    persona: 'as Marko Petrovic, Men\'s 1sts',
    device: 'tablet',
    total: 11,
    sections: [
      { title: 'Set up', steps: [
        { label: 'Senior teams', caption: 'Senior teams add registration windows and clearances.', screen: 'seniors' },
        { label: 'Registration window and clearances', caption: 'Set the window. Players who haven\'t cleared can\'t go on a team sheet.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Home this week', caption: 'The home screen shows training, the game, and who\'s available.', screen: 'seniors' },
        { label: 'Squad load', caption: 'Load tracks automatically from vests and boots. Peaks flag before training.' },
        { label: 'Opposition', caption: 'Add notes on the other team for the team talk.' },
        { label: 'Dribl sync', caption: 'Dribl pushes fixtures, results, and cards. You don\'t type them in.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Team sheet', caption: 'Generate the team sheet in the format Dribl requires.' },
        { label: 'Live game', caption: 'Tag moments. Cards sync to Dribl.' },
        { label: 'Review', caption: 'The review shows pressing, sprints, and ball recovery automatically.' },
      ]},
      { title: 'Players', steps: [
        { label: 'Squad overview', caption: 'See load, availability, and registration status for every player.' },
        { label: 'Registration and clearances', caption: 'Track who\'s cleared to play. Players without a clearance are flagged on the team sheet.' },
      ]},
    ],
  },

  ccoach: {
    roleLabel: 'Co-coach or assistant',
    persona: 'as Jess Marsh, U12 Sam',
    device: 'tablet',
    total: 7,
    sections: [
      { title: 'Join', steps: [
        { label: 'Invite', caption: 'The head coach invites a co-coach, who sees what they\'ll have access to before saying yes.', screen: 'home' },
        { label: 'What you\'ll see', caption: 'Co-coaches see the same home screen as the head coach, with a co-coach badge.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Shared home view', caption: 'The home screen is the same as the head coach\'s. You can edit the training plan.', screen: 'home' },
        { label: 'Training plan', caption: 'Edit drills and notes. Changes show straight away for the head coach.' },
        { label: 'Messages', caption: 'Message families from the same inbox. All messages show who sent them.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Team talk', caption: 'You can run the team talk if the head coach isn\'t there.' },
        { label: 'Line-up', caption: 'Set the line-up and minutes. The head coach sees your changes.' },
      ]},
    ],
  },

  fitness: {
    roleLabel: 'Fitness coach',
    persona: 'as Priya Shah, four teams',
    device: 'tablet',
    total: 17,
    sections: [
      { title: 'Join', steps: [
        { label: 'Invite', caption: 'A fitness coach joins by invite. What they see depends on the age of each team.', screen: 'fitnesscoach' },
        { label: 'First-use home', caption: 'The home screen shows all assigned teams with a load summary for each.', screen: 'fitnesscoach' },
        { label: 'Fitness level by age', caption: 'Under 12s: Play focus. Under 13-16: Grow. Seniors: full load tracking.' },
      ]},
      { title: 'Under 12: Play', steps: [
        { label: 'No load targets', caption: 'Under 12s don\'t get load numbers. The app shows fun and participation.' },
        { label: 'Warm-up only', caption: 'The FIFA 11+ Kids warm-up is built into every session plan.' },
        { label: 'Growth flags', caption: 'Growth spurts are flagged. The coach sees a note, not a number.' },
        { label: 'Activity summary', caption: 'A summary of what each player did appears after training.' },
      ]},
      { title: 'Under 13 to 16: Grow', steps: [
        { label: 'Load tracking starts', caption: 'GPS vests and boot sensors track load from Under 13.' },
        { label: 'Growth sprint cap', caption: 'Sprint load is capped during rapid growth. The cap lifts automatically.' },
        { label: 'Weekly load', caption: 'See each player\'s load across all training and games this week.' },
        { label: 'High-load flag', caption: 'Players above their threshold get a flag before training, not after.' },
        { label: 'Recovery day', caption: 'The app suggests a recovery day after a high-load week.' },
        { label: 'Injury note', caption: 'Log an injury. The player\'s load data for the last 4 weeks is attached.' },
      ]},
      { title: 'Injuries', steps: [
        { label: 'Log an injury', caption: 'Log what happened, the body part, and the severity. The coach and welfare officer are told.' },
        { label: 'Return to training', caption: 'Set a return date. The player\'s load is capped until they\'re fully back.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Pre-game load', caption: 'See each player\'s load heading into the game. Flag anyone who\'s carrying too much.' },
        { label: 'Live vests', caption: 'GPS vests stream live during the game. You see sprints and distance in real time.' },
      ]},
    ],
  },

  goalkeeper: {
    roleLabel: 'Goalkeeper coach',
    persona: 'as Nick Ward, all keepers',
    device: 'tablet',
    total: 6,
    sections: [
      { title: 'Each week', steps: [
        { label: 'Home', caption: 'One coach looks after every keeper in the club, across all teams.', screen: 'goalkeeper' },
        { label: 'Keepers by team', caption: 'See every keeper\'s coaching note and session count. Click one to send a message.', screen: 'goalkeeper' },
        { label: 'Keeper drills', caption: 'Browse keeper-specific drills or build a session plan for Tuesday.' },
        { label: 'Keeper clips', caption: 'Clips from every keeper across all teams land here. Tag and share them.', screen: 'goalkeeper' },
      ]},
      { title: 'Players', steps: [
        { label: 'Coaching notes', caption: 'Write one thing for each keeper. The head coach can read it.' },
        { label: 'Session count', caption: 'Track how many sessions each keeper has had with you this term.' },
      ]},
    ],
  },

  manager: {
    roleLabel: 'Team manager',
    persona: 'as Rob Owusu, U12 Sam',
    device: 'phone',
    total: 16,
    sections: [
      { title: 'Join', steps: [
        { label: 'Invite', caption: 'Signing up takes a few minutes, and nobody sees a child\'s data until their children check is confirmed.', screen: 'teammanager' },
        { label: 'Account', caption: 'Create an account. If you have a child on the team, they link automatically.' },
        { label: 'Children check', caption: 'Confirm your Working with Children Check before you can see player data.' },
        { label: 'What you\'ll see', caption: 'You\'ll see the team\'s schedule, duties, and parent messages — not player wellness or clips.' },
        { label: 'You\'re in', caption: 'The home screen shows what\'s coming up this week.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Your week', caption: 'The home screen shows training, the game, and your duty.', screen: 'teammanager' },
        { label: 'Duty roster', caption: 'Assign canteen, oranges, and linesman duties. Parents are told automatically.' },
        { label: 'Meet time', caption: 'Set the meet time for Saturday. All families are told at once.' },
        { label: 'Messages', caption: 'Message one family or all of them. Coach messages show separately.' },
        { label: 'Calendar', caption: 'The team calendar shows training, games, and club events.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Morning message', caption: 'Send the meet time, pitch, and kit colour to all families at once.', screen: 'teammanager' },
        { label: 'Arrival check', caption: 'Tick off players as they arrive. The coach sees who\'s there.' },
        { label: 'Ground setup', caption: 'Log ground issues: muddy pitch, missing goals, missing nets.' },
        { label: 'During the game', caption: 'Log scores, cards, and injuries from the sideline.' },
        { label: 'After the game', caption: 'Send the result and a thank-you to families.' },
        { label: 'Duty reminder', caption: 'Remind families about pack-down duties after the game.' },
      ]},
    ],
  },

  parent: {
    roleLabel: 'Parent or carer',
    persona: 'as Linh Tran, Mia\'s mum',
    device: 'phone',
    total: 15,
    sections: [
      { title: 'Join', steps: [
        { label: 'Invite', caption: 'Signing up takes a few minutes, and nobody sees a child\'s data until their children check is confirmed.', screen: 'twochildren' },
        { label: 'Account', caption: 'Create an account. Add your child\'s name and date of birth.' },
        { label: 'Confirm your child', caption: 'The coach confirms your child is on the team. Until then, you see nothing.' },
        { label: 'What\'s OK to record', caption: 'Six yes-or-no choices for filming, sensors, and goals. Change any of them any time.' },
        { label: 'First-aid card', caption: 'Add anything a coach needs to know: allergies, conditions, medication.' },
        { label: 'Set up your child\'s app', caption: 'If your child is 8 or over, give them a code to sign in. You still see everything.' },
        { label: 'You\'re in', caption: 'Your home screen shows the week: training, the game, and what to answer.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Mia\'s week', caption: 'Your home screen shows the week\'s schedule, your duty, and what needs answering.', screen: 'twochildren' },
        { label: 'Can Mia make it?', caption: 'Answer one question before each training or game. The coach sees it straight away.' },
        { label: 'Mia\'s minutes', caption: 'See how many minutes Mia plays each game. Fair-share rules mean she won\'t miss out.' },
      ]},
      { title: "When something's wrong", steps: [
        { label: 'Tell the club privately', caption: 'Raise a concern without the coach seeing it. It goes straight to the welfare officer.' },
        { label: 'Head knock', caption: 'If Mia takes a knock, you\'re told straight away. She sits out the rest of the game.' },
      ]},
      { title: 'Season', steps: [
        { label: 'Season summary', caption: 'At the end of the season, Mia gets a short note from her coach and a summary of her year.', screen: 'twochildren' },
        { label: 'What\'s recorded', caption: 'Download or delete everything the club holds about your family.' },
        { label: 'Next season', caption: 'Re-register in PlayFootball. Your consent choices carry over.' },
      ]},
    ],
  },

  playeryoung: {
    roleLabel: 'Player under 15',
    persona: 'as Mia Tran, 11',
    device: 'phone',
    total: 11,
    sections: [
      { title: 'Join', steps: [
        { label: 'How old are you?', caption: 'Under 15s can\'t make an account. They join with a code from a parent.', screen: 'playerapp' },
        { label: 'Code from a parent', caption: 'A parent gives you a 6-digit code. Enter it and you\'re in.' },
        { label: 'Waiting for a parent', caption: 'If your parent hasn\'t joined yet, you wait. Nothing shows until they\'ve set consent.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Your home screen', caption: 'Your home screen shows training, the game, and your goals.', screen: 'playerapp' },
        { label: 'Check in', caption: 'Answer one question before training: how are you feeling? The coach sees it.' },
        { label: 'Your goals', caption: 'Two or three things to work on. Your coach sets them, you see them.' },
        { label: 'Clips from your coach', caption: 'If the coach sends you a clip, it lands here. Only you and your parent see it.' },
        { label: 'Your minutes', caption: 'See how many minutes you\'ve played each game.' },
        { label: 'Development goals', caption: 'Your goals update when you meet them. The coach writes a short note.' },
      ]},
      { title: "When something's wrong", steps: [
        { label: 'Tell someone privately', caption: 'Tell the welfare officer something without the coach seeing. It stays private.' },
        { label: 'Head knock', caption: 'If you take a head knock, your parent is told straight away.' },
      ]},
    ],
  },

  playerolder: {
    roleLabel: 'Player 15 and over, and adults',
    persona: 'as Cal West, 16',
    device: 'phone',
    total: 6,
    sections: [
      { title: 'Join', steps: [
        { label: 'Own account, 15 to 17', caption: 'From 15, players have their own account. Under 18, a parent can still read coach messages.', screen: 'olderplayer' },
        { label: 'Own account, adult', caption: 'At 18, the parent link drops automatically. The player controls their own data.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Your home screen', caption: 'The home screen shows training, the game, check-ins, and your goals.', screen: 'olderplayer' },
        { label: 'Check in', caption: 'Check in before training from your phone. The coach sees it.' },
        { label: 'Clips from the coach', caption: 'Clips from the match review land here. You can share them.' },
        { label: 'Your load', caption: 'See your sprint load and minutes across the last 4 weeks.' },
      ]},
    ],
  },

  director: {
    roleLabel: 'Director of football',
    persona: 'as Rachel M',
    device: 'tablet',
    total: 23,
    sections: [
      { title: 'Set up', steps: [
        { label: 'First-use home', caption: 'The club is set up once: import the players, choose how the club plays, set the rules.', screen: 'clubadmin' },
        { label: 'Import from PlayFootball', caption: 'Import all registrations in one step. Teams, ages, and player names come with them.' },
        { label: 'Club playing style', caption: 'Set the style that all coaches start with. Each coach can override it for their team.' },
        { label: 'Heading policy', caption: 'Set the club heading policy. It applies to all teams automatically.' },
        { label: 'Season plan', caption: 'Set term dates, presentation day, and the registration window.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'Club home', caption: 'The home screen shows what needs attention across all teams.', screen: 'clubadmin' },
        { label: 'Coaches overview', caption: 'See every coach\'s children check status. Flag anyone whose check is about to expire.' },
        { label: 'Upcoming games', caption: 'See all games this Saturday: grounds, referees, and camera kits.' },
        { label: 'Dribl sync', caption: 'Fixtures, results, and cards sync from Dribl. You don\'t type them in.' },
        { label: 'Safeguarding alerts', caption: 'Wellness alerts and welfare concerns come to you, not to coaches.' },
      ]},
      { title: 'Coaches', steps: [
        { label: 'Manage coaches', caption: 'Add, remove, or change a coach\'s role. Changes take effect immediately.', screen: 'clubadmin' },
        { label: 'Children checks', caption: 'See every coach\'s check status. The app emails a reminder 60 days before it expires.' },
        { label: 'Assign teams', caption: 'Assign a coach to a team. They get an invite and confirm before they see player data.' },
        { label: 'Coaching notes', caption: 'Leave a private note for a coach. They see it in their home screen.' },
      ]},
      { title: 'Players', steps: [
        { label: 'All players', caption: 'See every player across the club: team, registration, and consent status.', screen: 'clubadmin' },
        { label: 'Registration status', caption: 'See who hasn\'t finished registering in PlayFootball. Remind them in one click.' },
        { label: 'Dispensations', caption: 'Log a dispensation for a player who needs to play up or down.' },
        { label: 'Medical notes', caption: 'See first-aid cards across all teams. You don\'t see wellness check-ins.' },
        { label: 'Transfer window', caption: 'Log transfers in and out. The player\'s data follows them.' },
        { label: 'Deregistered', caption: 'Deregister a player. Their data is kept for the legal minimum and then deleted.' },
      ]},
      { title: 'Season', steps: [
        { label: 'Rollover', caption: 'Roll every team up a year for next season. Nothing changes until you press the button.', screen: 'rollover' },
        { label: 'Season review', caption: 'A summary of the season: games played, goals met, coaching notes.' },
        { label: 'Archive', caption: 'Archive the season. Historical data is kept, but doesn\'t appear in the current-season views.' },
      ]},
    ],
  },

  chair: {
    roleLabel: 'Chair and committee',
    persona: 'as Greg Lawson',
    device: 'tablet',
    total: 8,
    sections: [
      { title: 'Set up', steps: [
        { label: 'First-use home', caption: 'First use: every screen says what to do next, so nothing starts blank.', screen: 'clubadmin' },
      ]},
      { title: 'Each month', steps: [
        { label: 'Club health overview', caption: 'The board report shows registrations, coach checks, and welfare status.', screen: 'clubadmin' },
        { label: 'Registrations', caption: 'See how many families have registered vs last season at the same point.' },
        { label: 'Coaching appointments', caption: 'See every coaching appointment for the season and its status.' },
        { label: 'Grants and fees', caption: 'See income from fees and any pending grants.' },
      ]},
      { title: 'Season', steps: [
        { label: 'Annual report', caption: 'Generate the annual report for the AGM.' },
        { label: 'Next season plan', caption: 'Set the fees, divisions, and date for next season.' },
        { label: 'Rollover', caption: 'Roll every team into next season. The director handles the detail.', screen: 'rollover' },
      ]},
    ],
  },

  coordinator: {
    roleLabel: 'Club coordinator',
    persona: 'as Bianca Rossi',
    device: 'tablet',
    total: 10,
    sections: [
      { title: 'Set up', steps: [
        { label: 'First-use home', caption: 'The coordinator starts by importing registrations.', screen: 'coordinator' },
        { label: 'Import from PlayFootball', caption: 'Import all registrations in one step.' },
      ]},
      { title: 'Each week', steps: [
        { label: 'This week', caption: 'The home screen shows what needs doing before Saturday.', screen: 'coordinator' },
        { label: 'Registrations', caption: 'See who hasn\'t finished registering. Send a reminder in one click.' },
        { label: 'Fixtures', caption: 'See all this Saturday\'s games: grounds, kick-off times, and camera kits.' },
        { label: 'Referees', caption: 'See which games still need a referee or game leader. Ask again in one click.' },
        { label: 'Kit', caption: 'See which camera kits are booked and which are free.' },
        { label: 'Fees and volunteers', caption: 'See canteen, set-up, and pack-down duty fill rates across all games.' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Saturday run sheet', caption: 'Generate the Saturday run sheet: grounds, kick-offs, duties, referees.', screen: 'coordinator' },
        { label: 'During the day', caption: 'Log ground issues, late changes, and referee no-shows from your phone.' },
      ]},
    ],
  },

  welfare: {
    roleLabel: 'Welfare officer',
    persona: 'as Helen Park',
    device: 'tablet',
    total: 11,
    sections: [
      { title: 'A concern arrives', steps: [
        { label: 'From a parent', caption: 'A concern can come from a parent, a child, a wellness alert or the sideline. Each goes only to the welfare officer.', screen: 'clubadmin' },
        { label: 'From a child', caption: 'Children can raise a concern privately from their app. It goes only to the welfare officer.' },
        { label: 'From a wellness alert', caption: 'Repeated low wellness scores flag automatically.' },
        { label: 'From the sideline', caption: 'A sideline report goes to the welfare officer, not the coach.' },
      ]},
      { title: 'Handle it', steps: [
        { label: 'Review the concern', caption: 'Read the concern and any attachments. Reply or escalate.' },
        { label: 'Reply privately', caption: 'Reply to the parent or child without the coach seeing.' },
        { label: 'Involve the coach', caption: 'Choose to involve the coach. They see only what you share.' },
        { label: 'Escalate', caption: 'Escalate to Football Victoria or another body. The record is logged.' },
      ]},
      { title: 'Also yours', steps: [
        { label: 'Children checks', caption: 'See every adult\'s check status across the whole club.', screen: 'clubadmin' },
        { label: 'Head knocks', caption: 'See every head-knock record across all teams. The register is yours.' },
        { label: 'Sideline incidents', caption: 'See all sideline incident reports for the season.' },
      ]},
    ],
  },

  referee: {
    roleLabel: 'Referee or game leader',
    persona: 'as Zoe Park, 16',
    device: 'phone',
    total: 4,
    sections: [
      { title: 'Each week', steps: [
        { label: 'Asked to do a game', caption: 'Young referees are asked to do a game and can say yes from their phone.', screen: 'refereephone' },
        { label: 'My games', caption: 'See this week\'s games: ground, kick-off, and what to bring.', screen: 'refereephone' },
      ]},
      { title: 'Game day', steps: [
        { label: 'Report a card', caption: 'Log a card during the game. It syncs to Dribl automatically.' },
        { label: 'Incident report', caption: 'Log a sideline incident. It goes to the welfare officer.' },
      ]},
    ],
  },

  story: {
    roleLabel: 'The idea in one minute',
    persona: 'one week with an under-12 team',
    device: 'tablet',
    total: 6,
    sections: [
      { title: 'The story', steps: [
        { label: 'Saturday: the game goes in', caption: 'The club films the game on whatever camera it has. Cameras with a live feed can stream straight in.', screen: 'home' },
        { label: 'The review comes back', caption: 'Within minutes of the final whistle, key moments are tagged. The review is waiting on Monday morning.', screen: 'review' },
        { label: 'Thursday: the plan is ready', caption: 'The session plan is built from what the review found. It\'s ready before the coach arrives.', screen: 'training' },
        { label: 'At the ground', caption: 'On game day, the team talk and line-up are on the tablet. Fair minutes are built in.', screen: 'matchday' },
        { label: 'Parents are in the loop', caption: 'Parents see the schedule, Mia\'s minutes, and what she\'s working on — from their phone.', screen: 'parent-phone' },
        { label: 'Next Saturday', caption: 'One week later, the app knows what improved and what to work on next.', screen: 'home' },
      ]},
    ],
  },
}

export type RoleId = keyof typeof TOURS

export const ROLE_GROUPS: Array<{
  section: string
  roles: Array<{ id: RoleId; name: string; device: 'Tablet' | 'Phone'; desc: string; note?: string }>
}> = [
  {
    section: 'ON THE PITCH',
    roles: [
      { id: 'miniroos',   name: 'MiniRoos coach',    device: 'Tablet', desc: 'Under 6 to 11 · as Tom Albers' },
      { id: 'coach',      name: 'Junior coach',       device: 'Tablet', desc: 'Under 12 and 13 · as Sam K' },
      { id: 'youth',      name: 'Youth coach',        device: 'Tablet', desc: 'Under 14 to 18 · as Ollie Grant' },
      { id: 'seniors',    name: 'Senior coach',       device: 'Tablet', desc: 'Adults · as Marko Petrovic' },
      { id: 'ccoach',     name: 'Co-coach',           device: 'Tablet', desc: 'as Jess Marsh' },
      { id: 'fitness',    name: 'Fitness coach',      device: 'Tablet', desc: 'as Priya Shah' },
      { id: 'goalkeeper', name: 'Goalkeeper coach',   device: 'Tablet', desc: 'as Nick Ward' },
    ],
  },
  {
    section: 'FAMILIES',
    roles: [
      { id: 'manager',      name: 'Team manager',       device: 'Phone', desc: 'as Rob Owusu' },
      { id: 'parent',       name: 'Parent',             device: 'Phone', desc: 'as Linh Tran' },
      { id: 'playeryoung',  name: 'Player under 15',    device: 'Phone', desc: 'as Mia Tran' },
      { id: 'playerolder',  name: 'Player 15 and over', device: 'Phone', desc: 'as Cal West' },
    ],
  },
  {
    section: 'RUNNING THE CLUB',
    roles: [
      { id: 'director',    name: 'Director of football', device: 'Tablet', desc: 'as Rachel M' },
      { id: 'chair',       name: 'Chair',                device: 'Tablet', desc: 'as Greg Lawson' },
      { id: 'coordinator', name: 'Club coordinator',     device: 'Tablet', desc: 'as Bianca Rossi' },
      { id: 'welfare',     name: 'Welfare officer',      device: 'Tablet', desc: 'as Helen Park' },
      { id: 'referee',     name: 'Referee',              device: 'Phone',  desc: 'as Zoe Park, 16' },
    ],
  },
]
