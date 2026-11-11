export interface TourStep {
  label: string
  caption: string
  screen?: string
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
  home: string        // screen key for "Look around" mode
  sandboxHome?: string // screen key for sandbox "Look around" (empty state)
  sections: TourSection[]
}

export const TOURS: Record<string, TourDef> = {

  coach: {
    roleLabel: "Coach \u00b7 Juniors, under 12 and under 13",
    persona: "as Sam K, U12 Sam",
    device: 'tablet',
    total: 57,
    home: 'juniorcoach',
    sandboxHome: 'home-e',
    sections: [
      { title: "Join", steps: [
        { label: "Welcome", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "OB-SignUp" },
        { label: "Account and children check", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "OB1-SignUp" },
        { label: "Team and division", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "OB3-SignUp" },
        { label: "Invite staff", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "OB4-SignUp" },
        { label: "Ready", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "OB5-SignUp" },
      ]},
      { title: "Set up", steps: [
        { label: "First-use home", caption: "First use: every screen says what to do next, so nothing starts blank.", screen: "home" },
        { label: "Set how we play", caption: "First use: every screen says what to do next, so nothing starts blank.", screen: "style" },
        { label: "Add players", caption: "First use: every screen says what to do next, so nothing starts blank.", screen: "squad" },
        { label: "Consent by player", caption: "First use: every screen says what to do next, so nothing starts blank.", screen: "P1-Consent" },
      ]},
      { title: "After a game", steps: [
        { label: "Home on Sunday", caption: "The game goes in, and about 25 minutes later the review comes back with three things to work on.", screen: "T1s-HomeSunday" },
        { label: "Add the game", caption: "The game goes in, and about 25 minutes later the review comes back with three things to work on.", screen: "addgame" },
        { label: "Match review", caption: "The game goes in, and about 25 minutes later the review comes back with three things to work on.", screen: "review" },
        { label: "Check unsure moments", caption: "The game goes in, and about 25 minutes later the review comes back with three things to work on.", screen: "clips" },
        { label: "Clips", caption: "The game goes in, and about 25 minutes later the review comes back with three things to work on.", screen: "C1-ClipsTab" },
      ]},
      { title: "Plan the week", steps: [
        { label: "This week", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "thisweek" },
        { label: "Suggested, with reasons", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "SG1-Suggested" },
        { label: "Why: the evidence", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "SG2-WhySuggested" },
        { label: "Ask in your own words", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "SG3-AskCleanSheet" },
        { label: "What worked for this team", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "SG5-WhatWorked" },
        { label: "What it uses", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "SG4-WhatItUses" },
        { label: "Drill library", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "drills" },
        { label: "Session plans", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "training" },
        { label: "Who\u2019s coming", caption: "Clean Sheet suggests drills from what keeps happening in games, which drills worked in training, the week\u2019s load and the coach\u2019s own notes. Every suggestion shows its reasons.", screen: "availability" },
      ]},
      { title: "Train", steps: [
        { label: "Home on training day", caption: "At the ground: the plan, who’s here, and what to say. It works with no signal.", screen: "T1-TabletTraining" },
        { label: "Tonight’s plan", caption: "At the ground: the plan, who’s here, and what to say. It works with no signal.", screen: "T3-TrainingTab" },
        { label: "Show the players", caption: "At the ground: the plan, who\u2019s here, and what to say. It works with no signal.", screen: "teamtalk" },
        { label: "Pitch-side: who\u2019s here", caption: "At the ground: the plan, who\u2019s here, and what to say. It works with no signal.", screen: "pitchside" },
        { label: "Pitch-side: drill", caption: "At the ground: the plan, who\u2019s here, and what to say. It works with no signal.", screen: "TR1b-PitchSideDrill" },
        { label: "How did it go", caption: "At the ground: the plan, who\u2019s here, and what to say. It works with no signal.", screen: "TR1c-PitchSideWrap" },
        { label: "No signal", caption: "At the ground: the plan, who\u2019s here, and what to say. It works with no signal.", screen: "FO1-Offline" },
      ]},
      { title: "Record and repeat", steps: [
        { label: "Choose what to record", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC1-RecordStart" },
        { label: "Drill: set-up and measures", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC3-RecordDrill" },
        { label: "Recording", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC4-Recording" },
        { label: "Results against last time", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC5-RecordResults" },
        { label: "All runs, and run it again", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC6-RunHistory" },
        { label: "Record a friendly", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC2-RecordFriendly" },
        { label: "Everything recorded", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC7-Recorded" },
        { label: "How we measure", caption: "Anything can be recorded: a friendly, a drill, a warm-up or a test. Run it again with the same set-up and see whether the change is real.", screen: "RC8-HowWeMeasure" },
      ]},
      { title: "Team chat", steps: [
        { label: "Team chat", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH1-TeamChat" },
        { label: "Ask a poll", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH4-NewPoll" },
        { label: "Poll results", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH5-PollResults" },
        { label: "Announcements", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH2-Announcements" },
        { label: "Photo consent check", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH7-PhotoCheck" },
        { label: "Photos, videos and files", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH6-Media" },
        { label: "Message actions", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH9-MessageActions" },
        { label: "Set up: who can post", caption: "Everything a team does in a messaging app, in one place: a group chat with polls, photos, videos and voice notes, and a separate channel for announcements. Polls fill in who\u2019s coming. Nobody\u2019s phone number is shared.", screen: "CH3-NewChat" },
      ]},
      { title: "Game day", steps: [
        { label: "Home on game day", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "T1g-HomeGameDay" },
        { label: "Team sheet", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "teamsheet" },
        { label: "Opposition", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "opposition" },
        { label: "Team talk", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "matchday" },
        { label: "Live game and subs", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "livegame" },
      ]},
      { title: "Players", steps: [
        { label: "Squad", caption: "Each player has one goal, checked after every game. No rankings.", screen: "T4-SquadTab" },
        { label: "Player profile", caption: "Each player has one goal, checked after every game. No rankings.", screen: "T5-PlayerProfile" },
        { label: "Goals", caption: "Each player has one goal, checked after every game. No rankings.", screen: "goals" },
        { label: "Wellness", caption: "Each player has one goal, checked after every game. No rankings.", screen: "wellness" },
        { label: "Inbox", caption: "Each player has one goal, checked after every game. No rankings.", screen: "inbox" },
        { label: "End-of-season summary per player", caption: "At the end of the season: one page for each player, drafted for the coach.", screen: "seasons" },
      ]},
    ],
  },

  miniroos: {
    roleLabel: "Coach \u00b7 MiniRoos, under 6 to under 11",
    persona: "as Tom Albers, U9 Tom",
    device: 'tablet',
    total: 27,
    home: 'miniroos',
    sandboxHome: 'miniroos-e',
    sections: [
      { title: "Join", steps: [
        { label: "Create account and children check", caption: "A volunteer coach signs up in a few minutes. Nothing about a child shows until the children check is confirmed.", screen: "OB1-SignUp" },
        { label: "Find the club", caption: "A volunteer coach signs up in a few minutes. Nothing about a child shows until the children check is confirmed.", screen: "OB2-SignUp" },
        { label: "Set up the team", caption: "A volunteer coach signs up in a few minutes. Nothing about a child shows until the children check is confirmed.", screen: "OB3-SignUp" },
        { label: "Invite a manager", caption: "A volunteer coach signs up in a few minutes. Nothing about a child shows until the children check is confirmed.", screen: "OB4-SignUp" },
      ]},
      { title: "Set up", steps: [
        { label: "Share the team link with families", caption: "First use: share one link with families and add a training night. That\u2019s all the set-up there is.", screen: "HM2e-SquadMiniRoosEmpty" },
        { label: "Add the training night", caption: "First use: share one link with families and add a training night. That\u2019s all the set-up there is.", screen: "HM3e-TrainingMiniRoosEmpty" },
      ]},
      { title: "Each week", steps: [
        { label: "Home", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM1-HomeMiniRoos" },
        { label: "Squad and who\u2019s coming", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM2-SquadMiniRoos" },
        { label: "Family chat", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "CH1-TeamChat" },
        { label: "Tonight\u2019s four games", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM3-TrainingMiniRoos" },
        { label: "Swap a game from the library", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips. This screen is shared with other ages, so it shows the under-12 team here.", screen: "drills" },
        { label: "This term, skill by skill", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips. This screen is shared with other ages, so it shows the under-12 team here." },
        { label: "Suggested games, from your taps", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "suggestions" },
        { label: "Inbox", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM7-InboxMiniRoos" },
        { label: "Calendar", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM8-CalendarMiniRoos" },
        { label: "Who\u2019s coming", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM11-ComingMiniRoos" },
        { label: "Consent, four questions", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM12-ConsentMiniRoos" },
        { label: "Team staff", caption: "Under 12 there are no scores, sensors or numbers. The week is four fun games, who\u2019s coming, and a turn for everyone. Filming is optional, for clips.", screen: "HM10-StaffMiniRoos" },
      ]},
      { title: "Game day", steps: [
        { label: "Fixtures, no scores", caption: "Clean Sheet shares out minutes, goal and captain. The coach just follows the grid.", screen: "HM9-FixturesMiniRoos" },
        { label: "Turns: minutes, goal, captain", caption: "Clean Sheet shares out minutes, goal and captain. The coach just follows the grid.", screen: "HM4-GameDayMiniRoos" },
        { label: "Film for clips", caption: "Clean Sheet shares out minutes, goal and captain. The coach just follows the grid.", screen: "RCm1-RecordMiniRoos" },
        { label: "Head knock", caption: "Clean Sheet shares out minutes, goal and captain. The coach just follows the grid.", screen: "TM7-HeadKnock" },
      ]},
      { title: "After the game", steps: [
        { label: "What we saw, in three taps", caption: "No score to enter. Three taps on what the coach saw, a best-moment clip for each family, and a thank-you to parents.", screen: "HM5-WhatWeSaw" },
        { label: "A best moment each", caption: "No score to enter. Three taps on what the coach saw, a best-moment clip for each family, and a thank-you to parents.", screen: "RCm2-MiniRoosClips" },
        { label: "Thank the parents", caption: "No score to enter. Three taps on what the coach saw, a best-moment clip for each family, and a thank-you to parents.", screen: "HM5b-ThankParents" },
      ]},
      { title: "Season", steps: [
        { label: "A child plays up for a game", caption: "Once or twice a season: a child plays up, and each family gets a kind note.", screen: "FM1-Moves" },
        { label: "End-of-season note to each family", caption: "Once or twice a season: a child plays up, and each family gets a kind note.", screen: "HM6-SeasonNotes" },
      ]},
    ],
  },

  youth: {
    roleLabel: "Coach \u00b7 Youth, under 14 to under 18",
    persona: "as Ollie Grant, U16 Ollie",
    device: 'tablet',
    total: 15,
    home: 'youth',
    sandboxHome: 'youth-e',
    sections: [
      { title: "Join and set up", steps: [
        { label: "Same as juniors", caption: "Same sign-up as juniors. The club\u2019s playing style and heading policy arrive already set.", screen: "signup" },
        { label: "Set how we play", caption: "Same sign-up as juniors. The club\u2019s playing style and heading policy arrive already set.", screen: "style" },
        { label: "Heading policy applies", caption: "Same sign-up as juniors. The club\u2019s playing style and heading policy arrive already set.", screen: "FH1-HeadingPolicy" },
      ]},
      { title: "Each week", steps: [
        { label: "Home", caption: "From under 14 the numbers come in: the review, load shared with the fitness coach, and tests.", screen: "youth" },
        { label: "Review", caption: "From under 14 the numbers come in: the review, load shared with the fitness coach, and tests. This screen is shared with other ages, so it shows the under-12 team here.", screen: "review" },
        { label: "Load with the fitness coach", caption: "From under 14 the numbers come in: the review, load shared with the fitness coach, and tests.", screen: "F3-FitnessTraining" },
        { label: "Tonight\u2019s plan", caption: "From under 14 the numbers come in: the review, load shared with the fitness coach, and tests.", screen: "training" },
        { label: "Tests", caption: "From under 14 the numbers come in: the review, load shared with the fitness coach, and tests. This screen is shared with other ages, so it shows the under-12 team here.", screen: "TL1-Tests" },
      ]},
      { title: "Game day", steps: [
        { label: "Cards and suspensions", caption: "Eleven a side: suspensions checked, the team sheet, the talk, and the live game.", screen: "FD1-Cards" },
        { label: "Team sheet", caption: "Eleven a side: suspensions checked, the team sheet, the talk, and the live game. This screen is shared with other ages, so it shows the under-12 team here.", screen: "teamsheet" },
        { label: "Team talk", caption: "Eleven a side: suspensions checked, the team sheet, the talk, and the live game.", screen: "matchday" },
        { label: "Live game, 11 a side", caption: "Eleven a side: suspensions checked, the team sheet, the talk, and the live game.", screen: "livegame11" },
      ]},
      { title: "Players", steps: [
        { label: "Messages from players, parent copied", caption: "Players this age can message the coach, with a parent always copied in. This screen is shared with other ages, so it shows the under-12 team here.", screen: "inbox" },
        { label: "Trials and talent days", caption: "Players this age can message the coach, with a parent always copied in.", screen: "FT1-Trials" },
        { label: "Moving up to seniors", caption: "Players this age can message the coach, with a parent always copied in.", screen: "seniors" },
      ]},
    ],
  },

  seniors: {
    roleLabel: "Coach \u00b7 Seniors and NPL",
    persona: "as Marko Petrovic, Men's 1sts",
    device: 'tablet',
    total: 11,
    home: 'seniors',
    sandboxHome: 'seniors-e',
    sections: [
      { title: "Set up", steps: [
        { label: "Senior teams", caption: "Senior teams add registration windows and clearances.", screen: "seniors" },
        { label: "Registration window and clearances", caption: "Senior teams add registration windows and clearances.", screen: "FN2-SeniorSquad" },
      ]},
      { title: "Each week", steps: [
        { label: "Home", caption: "For adults the week is load, the opposition and the plan.", screen: "HS1-HomeSeniors" },
        { label: "Squad load", caption: "For adults the week is load, the opposition and the plan.", screen: "FN2b-SeniorSquad" },
        { label: "Opposition", caption: "For adults the week is load, the opposition and the plan. This screen is shared with other ages, so it shows the under-12 team here.", screen: "opposition" },
        { label: "Tonight\u2019s plan", caption: "For adults the week is load, the opposition and the plan.", screen: "training" },
      ]},
      { title: "Game day", steps: [
        { label: "Cards", caption: "Cards, the talk and the live game, eleven a side.", screen: "FD1-Cards" },
        { label: "Team talk", caption: "Cards, the talk and the live game, eleven a side.", screen: "matchday" },
        { label: "Live game, 11 a side", caption: "Cards, the talk and the live game, eleven a side.", screen: "livegame11" },
      ]},
      { title: "Players", steps: [
        { label: "Trials", caption: "Adult players hold their own account and decide what\u2019s shared.", screen: "FT1-Trials" },
        { label: "Player\u2019s own app, adults", caption: "Adult players hold their own account and decide what\u2019s shared.", screen: "olderplayer" },
      ]},
    ],
  },

  ccoach: {
    roleLabel: "Co-coach or assistant",
    persona: "as Jess Marsh, U12 Sam",
    device: 'tablet',
    total: 7,
    home: 'juniorcoach',
    sandboxHome: 'cc1e-coach-e',
    sections: [
      { title: "Join", steps: [
        { label: "Invite", caption: "The head coach invites a co-coach, who sees what they\u2019ll have access to before saying yes.", screen: "IV3c-Invite" },
        { label: "What you\u2019ll see", caption: "The head coach invites a co-coach, who sees what they\u2019ll have access to before saying yes.", screen: "IV2-Invite" },
      ]},
      { title: "Each week", steps: [
        { label: "Shared home and hand-over notes", caption: "Two coaches share one home, with hand-over notes so either can run the session.", screen: "home" },
        { label: "Team staff: who does what", caption: "Two coaches share one home, with hand-over notes so either can run the session.", screen: "teamstaff" },
        { label: "Run a session pitch-side", caption: "Two coaches share one home, with hand-over notes so either can run the session.", screen: "TR1b-PitchSideDrill" },
      ]},
      { title: "Game day", steps: [
        { label: "Subs and minutes", caption: "One coach runs the subs while the other watches the game.", screen: "livegame" },
        { label: "Scouting note", caption: "One coach runs the subs while the other watches the game.", screen: "opposition" },
      ]},
    ],
  },

  fitness: {
    roleLabel: "Fitness coach",
    persona: "as Priya Shah, four teams",
    device: 'tablet',
    total: 17,
    home: 'fitnesscoach',
    sandboxHome: 'fitnesscoach-e',
    sections: [
      { title: "Join", steps: [
        { label: "Invite", caption: "A fitness coach joins by invite. What they see depends on the age of each team.", screen: "signup" },
        { label: "First-use home", caption: "A fitness coach joins by invite. What they see depends on the age of each team." },
        { label: "Fitness level by age", caption: "A fitness coach joins by invite. What they see depends on the age of each team.", screen: "coachfitness" },
      ]},
      { title: "Under 12: Play", steps: [
        { label: "Home", caption: "Under 12 it\u2019s simple: growth, a good warm-up and a few flags. No fitness testing.", screen: "F3-FitnessTraining" },
        { label: "Growth", caption: "Under 12 it\u2019s simple: growth, a good warm-up and a few flags. No fitness testing.", screen: "growth" },
        { label: "Measuring session", caption: "Under 12 it\u2019s simple: growth, a good warm-up and a few flags. No fitness testing.", screen: "GT2-MeasureSession" },
        { label: "Your part of training", caption: "Under 12 it\u2019s simple: growth, a good warm-up and a few flags. No fitness testing.", screen: "F3b-FitnessTraining" },
      ]},
      { title: "Under 13 to 16: Grow", steps: [
        { label: "Home, U13 girls", caption: "From under 13 the view grows with the players: growth spurts, load and tests against their own last result.", screen: "FT3-FitnessHomeU13G" },
        { label: "Home, U14", caption: "From under 13 the view grows with the players: growth spurts, load and tests against their own last result.", screen: "FT2-FitnessHomeU14" },
        { label: "Home, U16", caption: "From under 13 the view grows with the players: growth spurts, load and tests against their own last result.", screen: "FT4-FitnessHomeU16" },
        { label: "Tests", caption: "From under 13 the view grows with the players: growth spurts, load and tests against their own last result.", screen: "TL1-Tests" },
        { label: "Run a test", caption: "From under 13 the view grows with the players: growth spurts, load and tests against their own last result.", screen: "TL2-TestMode" },
        { label: "Results", caption: "From under 13 the view grows with the players: growth spurts, load and tests against their own last result.", screen: "TL3-TestResults" },
      ]},
      { title: "Injuries", steps: [
        { label: "Injury log and return", caption: "Every injury gets a return-to-play plan, and head knocks follow the league rule.", screen: "IL1-Injuries" },
        { label: "Concussion", caption: "Every injury gets a return-to-play plan, and head knocks follow the league rule.", screen: "FC1-Concussion" },
      ]},
      { title: "Game day", steps: [
        { label: "Load limits and fitness talk", caption: "On game day: who should play fewer minutes, and how hard it felt afterwards.", screen: "F4-FitnessMatch" },
        { label: "Effort after training", caption: "On game day: who should play fewer minutes, and how hard it felt afterwards.", screen: "playerapp" },
      ]},
    ],
  },

  goalkeeper: {
    roleLabel: "Goalkeeper coach",
    persona: "as Nick Ward, all keepers",
    device: 'tablet',
    total: 6,
    home: 'goalkeeper',
    sandboxHome: 'goalkeeper-e',
    sections: [
      { title: "Each week", steps: [
        { label: "Home", caption: "One coach looks after every keeper in the club, across all teams.", screen: "HG1-HomeKeeperCoach" },
        { label: "Keepers by team", caption: "One coach looks after every keeper in the club, across all teams.", screen: "FK1-Goalkeepers" },
        { label: "Keeper drills", caption: "One coach looks after every keeper in the club, across all teams. This screen is shared with other ages, so it shows the under-12 team here.", screen: "drills" },
        { label: "Keeper clips", caption: "One coach looks after every keeper in the club, across all teams. This screen is shared with other ages, so it shows the under-12 team here.", screen: "clips" },
      ]},
      { title: "Players", steps: [
        { label: "A keeper\u2019s profile and goal", caption: "Each keeper has one goal, and a shared club session. This screen is shared with other ages, so it shows the under-12 team here.", screen: "squad" },
        { label: "Plan the club keeper session", caption: "Each keeper has one goal, and a shared club session.", screen: "HG2-KeeperSession" },
      ]},
    ],
  },

  manager: {
    roleLabel: "Team manager",
    persona: "as Rob Owusu, U12 Sam",
    device: 'phone',
    total: 19,
    home: 'teammanager',
    sandboxHome: 'teammanager-e',
    sections: [
      { title: "Join", steps: [
        { label: "Invite", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "signup" },
        { label: "Account", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "IV1-Invite" },
        { label: "Children check", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "IV2-Invite" },
        { label: "What you\u2019ll see", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "IV3-Invite" },
        { label: "You\u2019re in", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "IV4-Invite" },
      ]},
      { title: "Each week", steps: [
        { label: "Home", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM1-ManagerHome" },
        { label: "Who\u2019s coming", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM6-ManagerWhosComing" },
        { label: "Tell parents about a change", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM3-ManagerChange" },
        { label: "Messages", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM5-ManagerMessages" },
        { label: "Set up the team chat: who can post", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM12-ManagerSetUpChat" },
        { label: "The team chat as its owner", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM14-ManagerTeamChat" },
        { label: "A poll that fills the roster", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM13-ManagerPoll" },
        { label: "Duty roster", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "TM4-DutyRoster" },
      ]},
      { title: "Game day", steps: [
        { label: "Checklist", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "TM2-ManagerGameDay" },
        { label: "Suspensions and letters", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "TM11-GameDayPapers" },
        { label: "Hot day", caption: "Earlier in the season, on a hot March morning: Football Victoria\u2019s heat rule, turned into a checklist.", screen: "TM10-Heat" },
        { label: "Head knock", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "TM7-HeadKnock" },
        { label: "Sideline report", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "TM8-SidelineReport" },
        { label: "Sign off and result", caption: "Game day: the team sheet, the talk, and fair minutes for every player.", screen: "TM9-SignOff" },
      ]},
    ],
  },

  parent: {
    roleLabel: "Parent or carer",
    persona: "as Linh Tran, Mia's mum",
    device: 'phone',
    total: 25,
    home: 'twochildren',
    sandboxHome: 'parent-e',
    sections: [
      { title: "Join", steps: [
        { label: "Invite", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "JN-Join" },
        { label: "Account", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "JN1-Join" },
        { label: "Confirm your child", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "JN2-Join" },
        { label: "What\u2019s OK to record", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "P2b-ParentConsent" },
        { label: "First-aid card", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "JN8-Join" },
        { label: "Set up your child\u2019s app", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "JN4-Join" },
        { label: "You\u2019re in", caption: "Signing up takes a few minutes, and nobody sees a child\u2019s data until their children check is confirmed.", screen: "JN5-Join" },
      ]},
      { title: "Each week", steps: [
        { label: "Your child\u2019s week", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "playerapp" },
        { label: "Can they make it?", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "AV2-ParentAvailability" },
        { label: "Messages", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM1-ParentChats" },
        { label: "Team chat", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM2-ParentTeamChat" },
        { label: "Send a photo, video or voice note", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM5-ParentAttach" },
        { label: "Photo consent check", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM10-ParentPhotoCheck" },
        { label: "Vote in a poll", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM4-ParentPoll" },
        { label: "Announcements", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM3-ParentAnnouncements" },
        { label: "A chat where parents can\u2019t post", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM8-ParentReadOnly" },
        { label: "Chat settings", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM6-ParentChatSettings" },
        { label: "Private chat with the coach", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "PM9-ParentPrivateChat" },
        { label: "Change what\u2019s recorded", caption: "The weekly jobs, done from a phone in a minute or two.", screen: "P2c-ParentConsent" },
      ]},
      { title: "When something\u2019s wrong", steps: [
        { label: "Report a message", caption: "A private route to the welfare officer that the coach can\u2019t see.", screen: "PM7-ParentReport" },
        { label: "Tell the club privately", caption: "A private route to the welfare officer that the coach can\u2019t see.", screen: "PC1-RaiseConcern" },
        { label: "Sent", caption: "A private route to the welfare officer that the coach can\u2019t see.", screen: "PC1b-ConcernSent" },
      ]},
      { title: "Season", steps: [
        { label: "Two children at the club", caption: "Things that happen once or twice a season.", screen: "PP1-TwoChildren" },
        { label: "End-of-season summary", caption: "At the end of the season: a note from the coach, with no scores or rankings.", screen: "PP2-SeasonSummary" },
        { label: "Leave and delete data", caption: "Things that happen once or twice a season.", screen: "twochildren" },
      ]},
    ],
  },

  playeryoung: {
    roleLabel: "Player under 15",
    persona: "as Mia Tran, 11",
    device: 'phone',
    total: 12,
    home: 'playerapp',
    sandboxHome: 'playeryoung-e',
    sections: [
      { title: "Join", steps: [
        { label: "How old are you?", caption: "Under 15s can\u2019t make an account. They join with a code from a parent.", screen: "JN6-Join" },
        { label: "Code from a parent", caption: "Under 15s can\u2019t make an account. They join with a code from a parent.", screen: "JN7-Join" },
        { label: "Waiting for a parent", caption: "Under 15s can\u2019t make an account. They join with a code from a parent.", screen: "JN8-Join" },
      ]},
      { title: "Each week", steps: [
        { label: "Home", caption: "A child\u2019s week: a quick check-in, a clip from the coach and one goal. No rankings and no chat: under 15s get news from the coach and a parent writes for them.", screen: "playerapp" },
        { label: "Check-in", caption: "A child\u2019s week: a quick check-in, a clip from the coach and one goal. No rankings and no chat: under 15s get news from the coach and a parent writes for them.", screen: "playerapp-checkin" },
        { label: "Done", caption: "A child\u2019s week: a quick check-in, a clip from the coach and one goal. No rankings and no chat: under 15s get news from the coach and a parent writes for them.", screen: "playerapp-done" },
        { label: "After training", caption: "A child\u2019s week: a quick check-in, a clip from the coach and one goal. No rankings and no chat: under 15s get news from the coach and a parent writes for them.", screen: "playerapp" },
        { label: "A clip from the coach", caption: "A child\u2019s week: a quick check-in, a clip from the coach and one goal. No rankings and no chat: under 15s get news from the coach and a parent writes for them.", screen: "playerapp" },
        { label: "My goals", caption: "A child\u2019s week: a quick check-in, a clip from the coach and one goal. No rankings and no chat: under 15s get news from the coach and a parent writes for them.", screen: "playerapp" },
        { label: "News from the coach, no chat", caption: "A child\u2019s week: a quick check-in, a clip from the coach and one goal. No rankings and no chat: under 15s get news from the coach and a parent writes for them.", screen: "playerapp" },
      ]},
      { title: "When something\u2019s wrong", steps: [
        { label: "You can tell someone", caption: "A child can write privately to the welfare officer. The coach can\u2019t see it.", screen: "twochildren" },
        { label: "Write to the welfare officer", caption: "A child can write privately to the welfare officer. The coach can\u2019t see it.", screen: "PC2b-TellHelen" },
      ]},
    ],
  },

  playerolder: {
    roleLabel: "Player 15 and over, and adults",
    persona: "as Cal West, 16",
    device: 'phone',
    total: 8,
    home: 'olderplayer',
    sandboxHome: 'playerolder-e',
    sections: [
      { title: "Join", steps: [
        { label: "Own account, 15 to 17", caption: "From 15, players have their own account. Under 18, a parent can still read coach messages.", screen: "olderplayer" },
        { label: "Own account, adult", caption: "From 15, players have their own account. Under 18, a parent can still read coach messages.", screen: "JN9a-Join" },
      ]},
      { title: "Each week", steps: [
        { label: "Home for older players", caption: "Older players see their own load and tests, and say when they\u2019re available.", screen: "PO1-OlderHome" },
        { label: "Messages", caption: "Older players see their own load and tests, and say when they\u2019re available.", screen: "PO6-OlderChats" },
        { label: "Players and coaches group", caption: "Older players see their own load and tests, and say when they\u2019re available.", screen: "PO7-OlderGroup" },
        { label: "Message the coach, parent copied", caption: "Older players see their own load and tests, and say when they\u2019re available.", screen: "PO2-OlderMessage" },
        { label: "Say if you\u2019re available", caption: "Older players see their own load and tests, and say when they\u2019re available.", screen: "PO3-OlderAvailability" },
        { label: "My load and tests", caption: "Older players see their own load and tests, and say when they\u2019re available.", screen: "PO4-OlderLoad" },
      ]},
    ],
  },

  director: {
    roleLabel: "Director of football",
    persona: "as Rachel M",
    device: 'tablet',
    total: 23,
    home: 'clubadmin',
    sandboxHome: 'director-e',
    sections: [
      { title: "Set up", steps: [
        { label: "First-use home", caption: "The club is set up once: import the players, choose how the club plays, set the rules.", screen: "D0-ClubEmpty" },
        { label: "Import from PlayFootball", caption: "The club is set up once: import the players, choose how the club plays, set the rules.", screen: "FP1-PlayFootball" },
        { label: "Club playing style", caption: "The club is set up once: import the players, choose how the club plays, set the rules.", screen: "style" },
        { label: "Heading policy", caption: "The club is set up once: import the players, choose how the club plays, set the rules.", screen: "FH1-HeadingPolicy" },
        { label: "Season plan", caption: "The club is set up once: import the players, choose how the club plays, set the rules.", screen: "FY1-SeasonPlan" },
      ]},
      { title: "Each week", steps: [
        { label: "Club overview", caption: "Every team on one page. The director can open any team read-only, as its coach sees it.", screen: "D1-ClubOverview" },
        { label: "Teams", caption: "Every team on one page. The director can open any team read-only, as its coach sees it.", screen: "D2-Teams" },
        { label: "One team, read-only", caption: "Every team on one page. The director can open any team read-only, as its coach sees it.", screen: "d7-u14" },
        { label: "Compare two teams", caption: "Every team on one page. The director can open any team read-only, as its coach sees it.", screen: "DX1-CompareTeams" },
        { label: "Calendar", caption: "Every team on one page. The director can open any team read-only, as its coach sees it.", screen: "DC1-Calendar" },
      ]},
      { title: "Coaches", steps: [
        { label: "All coaches", caption: "Coaches\u2019 checks, courses and meetings in one place.", screen: "D3-Coaches" },
        { label: "Courses", caption: "Coaches\u2019 checks, courses and meetings in one place.", screen: "DT1-Courses" },
        { label: "Coach meeting", caption: "Coaches\u2019 checks, courses and meetings in one place.", screen: "DM1-CoachMeeting" },
        { label: "Goalkeepers", caption: "Coaches\u2019 checks, courses and meetings in one place.", screen: "goalkeeper" },
      ]},
      { title: "Players", steps: [
        { label: "Players", caption: "Across the club: fair game time, who\u2019s ready for more, and moves between teams.", screen: "D4-Players" },
        { label: "Fair game time", caption: "Across the club: fair game time, who\u2019s ready for more, and moves between teams.", screen: "DP1-FairGameTime" },
        { label: "Ready for more", caption: "Across the club: fair game time, who\u2019s ready for more, and moves between teams.", screen: "DN1-Nominations" },
        { label: "Moves", caption: "Across the club: fair game time, who\u2019s ready for more, and moves between teams.", screen: "FM1-Moves" },
        { label: "Dispensations", caption: "Across the club: fair game time, who\u2019s ready for more, and moves between teams.", screen: "FD3-Dispensations" },
        { label: "Girls and women", caption: "Across the club: fair game time, who\u2019s ready for more, and moves between teams.", screen: "FW1-GirlsWomen" },
      ]},
      { title: "Season", steps: [
        { label: "Grading", caption: "The big jobs once a year: grading, trials and rolling teams over.", screen: "FG1-Grading" },
        { label: "Trials", caption: "The big jobs once a year: grading, trials and rolling teams over.", screen: "FT1-Trials" },
        { label: "Roll teams over to next season", caption: "The big jobs once a year: grading, trials and rolling teams over.", screen: "rollover" },
      ]},
    ],
  },

  chair: {
    roleLabel: "Chair and committee",
    persona: "as Greg Lawson",
    device: 'tablet',
    total: 8,
    home: 'chair-home',
    sandboxHome: 'chair-e',
    sections: [
      { title: "Set up", steps: [
        { label: "First-use home", caption: "First use: every screen says what to do next, so nothing starts blank.", screen: "D0c-ChairWelcome" },
      ]},
      { title: "Each month", steps: [
        { label: "Club overview", caption: "What the committee needs, written from the club\u2019s own numbers.", screen: "D1b-ClubChair" },
        { label: "Board report", caption: "What the committee needs, written from the club\u2019s own numbers.", screen: "D6-BoardReport" },
        { label: "Safeguarding", caption: "What the committee needs, written from the club\u2019s own numbers.", screen: "D5-Safeguarding" },
        { label: "Fees and volunteers", caption: "What the committee needs, written from the club\u2019s own numbers.", screen: "FV1-FeesVolunteers" },
      ]},
      { title: "Season", steps: [
        { label: "Season review", caption: "Fills in through the year and writes itself at season end.", screen: "DB2-SeasonReview" },
        { label: "League returns", caption: "Things that happen once or twice a season.", screen: "DB3-LeagueReturns" },
        { label: "Grants", caption: "Things that happen once or twice a season.", screen: "DB4-Grants" },
      ]},
    ],
  },

  coordinator: {
    roleLabel: "Club coordinator",
    persona: "as Bianca Rossi",
    device: 'tablet',
    total: 10,
    home: 'coordinator',
    sandboxHome: 'coordinator-e',
    sections: [
      { title: "Set up", steps: [
        { label: "First-use home", caption: "The coordinator starts by importing registrations.", screen: "coordinator" },
        { label: "Import from PlayFootball", caption: "The coordinator starts by importing registrations.", screen: "FP1-PlayFootball" },
      ]},
      { title: "Each week", steps: [
        { label: "Home", caption: "The jobs that keep a club running: registrations, fixtures, referees, kit and volunteers.", screen: "DCo1-CoordinatorHome" },
        { label: "Registrations", caption: "The jobs that keep a club running: registrations, fixtures, referees, kit and volunteers.", screen: "DR1-Registrations" },
        { label: "Fixtures from Dribl", caption: "The jobs that keep a club running: registrations, fixtures, referees, kit and volunteers.", screen: "FF1-LeagueSync" },
        { label: "Referees and game leaders", caption: "The jobs that keep a club running: registrations, fixtures, referees, kit and volunteers.", screen: "FR1-Referees" },
        { label: "Kit and cameras", caption: "The jobs that keep a club running: registrations, fixtures, referees, kit and volunteers.", screen: "DK1-Kit" },
        { label: "Volunteers", caption: "The jobs that keep a club running: registrations, fixtures, referees, kit and volunteers.", screen: "FV1-FeesVolunteers" },
      ]},
      { title: "Game day", steps: [
        { label: "Cards and suspensions", caption: "Suspensions and dispensations are checked before the team sheet goes in.", screen: "FD1-Cards" },
        { label: "Dispensations", caption: "Suspensions and dispensations are checked before the team sheet goes in.", screen: "FD3-Dispensations" },
      ]},
    ],
  },

  welfare: {
    roleLabel: "Welfare officer",
    persona: "as Helen Park",
    device: 'tablet',
    total: 11,
    home: 'welfare-home',
    sandboxHome: 'welfare-e',
    sections: [
      { title: "A concern arrives", steps: [
        { label: "From a parent", caption: "A concern can come from a parent, a child, a wellness alert or the sideline. Each goes only to the welfare officer.", screen: "PC1-RaiseConcern" },
        { label: "From a child", caption: "A concern can come from a parent, a child, a wellness alert or the sideline. Each goes only to the welfare officer.", screen: "PC2b-TellHelen" },
        { label: "From a wellness alert", caption: "A concern can come from a parent, a child, a wellness alert or the sideline. Each goes only to the welfare officer.", screen: "inbox" },
        { label: "From the sideline", caption: "A concern can come from a parent, a child, a wellness alert or the sideline. Each goes only to the welfare officer.", screen: "FS1-Sideline" },
      ]},
      { title: "Handle it", steps: [
        { label: "My cases", caption: "Only the welfare officer sees names. The director sees counts.", screen: "DW1-WelfareCases" },
        { label: "Nothing open", caption: "Only the welfare officer sees names. The director sees counts." },
        { label: "What the director sees", caption: "Only the welfare officer sees names. The director sees counts.", screen: "D4-Players" },
        { label: "Sideline reports", caption: "Only the welfare officer sees names. The director sees counts.", screen: "FS1b-Sideline" },
      ]},
      { title: "Also yours", steps: [
        { label: "Concussion return to play", caption: "The welfare officer also holds concussion returns, children checks and data requests.", screen: "FC1-Concussion" },
        { label: "Children checks", caption: "The welfare officer also holds concussion returns, children checks and data requests.", screen: "D5-Safeguarding" },
        { label: "Data requests", caption: "The welfare officer also holds concussion returns, children checks and data requests.", screen: "DS2-DataRequests" },
      ]},
    ],
  },

  academyowner: {
    roleLabel: "Academy owner \u00b7 Tall Timber Football Academy",
    persona: "as Dani Okafor",
    device: 'tablet',
    total: 14,
    home: 'academyowner',
    sandboxHome: 'academyowner-e',
    sections: [
      { title: "Set up", steps: [
        { label: "First use: three steps", caption: "An academy is a business, so set-up is programs, prices, coaches and child safety. There\u2019s no league or committee.", screen: "AC1e-AcademyHomeEmpty" },
        { label: "Add programs", caption: "An academy is a business, so set-up is programs, prices, coaches and child safety. There\u2019s no league or committee.", screen: "AC2-Programs" },
        { label: "Child safety, six things", caption: "An academy is a business, so set-up is programs, prices, coaches and child safety. There\u2019s no league or committee.", screen: "AC10-AcademySafety" },
        { label: "Invite coaches", caption: "An academy is a business, so set-up is programs, prices, coaches and child safety. There\u2019s no league or committee.", screen: "AC6-AcademyCoaches" },
        { label: "Link a partner club", caption: "An academy is a business, so set-up is programs, prices, coaches and child safety. There\u2019s no league or committee.", screen: "AC11-PartnerClub" },
      ]},
      { title: "Fill the places", steps: [
        { label: "Trials: booked to joined", caption: "Free trials are how academies grow. Every trial family is followed from booking to joining, so none drop off.", screen: "AC3-Trials" },
        { label: "Programs and waiting list", caption: "Free trials are how academies grow. Every trial family is followed from booking to joining, so none drop off.", screen: "AC2b-Programs" },
        { label: "Holiday clinic", caption: "Free trials are how academies grow. Every trial family is followed from booking to joining, so none drop off.", screen: "AC9-HolidayClinic" },
      ]},
      { title: "Each week", steps: [
        { label: "Home: what needs you", caption: "Clean Sheet chases fees and trial families. The owner sees only what it couldn\u2019t settle.", screen: "AC1-AcademyHome" },
        { label: "Message families", caption: "Clean Sheet chases fees and trial families. The owner sees only what it couldn\u2019t settle.", screen: "AC12-AcademyBroadcast" },
        { label: "All players", caption: "Clean Sheet chases fees and trial families. The owner sees only what it couldn\u2019t settle.", screen: "AC4-AcademyPlayers" },
        { label: "Fees and late payers", caption: "Clean Sheet chases fees and trial families. The owner sees only what it couldn\u2019t settle.", screen: "AC5-Fees" },
      ]},
      { title: "End of term", steps: [
        { label: "Approve term reports", caption: "The progress report is what parents pay for. It\u2019s drafted from session notes, checked by the coach and approved by the owner.", screen: "AC7-ReportsOut" },
        { label: "What the family reads", caption: "The progress report is what parents pay for. It\u2019s drafted from session notes, checked by the coach and approved by the owner.", screen: "academyparent" },
      ]},
    ],
  },

  academycoach: {
    roleLabel: "Academy coach \u00b7 Tall Timber Football Academy",
    persona: "as Reece Whitlam",
    device: 'tablet',
    total: 18,
    home: 'academycoach',
    sandboxHome: 'academycoach-e',
    sections: [
      { title: "Each day", steps: [
        { label: "Home: today\u2019s sessions", caption: "Several groups in one evening. Each player\u2019s own goal sits under their name during the session.", screen: "academycoach" },
        { label: "Run a session", caption: "Several groups in one evening. Each player\u2019s own goal sits under their name during the session.", screen: "ACC2-RunSession" },
        { label: "Suggested for tonight", caption: "Several groups in one evening. Each player\u2019s own goal sits under their name during the session.", screen: "ACC12-AcademySuggested" },
        { label: "Swap a drill", caption: "Several groups in one evening. Each player\u2019s own goal sits under their name during the session.", screen: "drills" },
      ]},
      { title: "Record and repeat", steps: [
        { label: "Choose what to record", caption: "Recording a drill does the coach\u2019s paperwork: session notes are written from it, and the results feed each player\u2019s plan and term report.", screen: "RC1-RecordStart" },
        { label: "Set-up and measures", caption: "Recording a drill does the coach\u2019s paperwork: session notes are written from it, and the results feed each player\u2019s plan and term report.", screen: "RC3-RecordDrill" },
        { label: "Recording", caption: "Recording a drill does the coach\u2019s paperwork: session notes are written from it, and the results feed each player\u2019s plan and term report.", screen: "RC4-Recording" },
        { label: "Results, into notes and plans", caption: "Recording a drill does the coach\u2019s paperwork: session notes are written from it, and the results feed each player\u2019s plan and term report.", screen: "RC5-RecordResults" },
      ]},
      { title: "Group chat", steps: [
        { label: "Program group chat", caption: "Each program group has a chat. Home practice goes out as a video and a poll books make-up sessions.", screen: "ACC13-AcademyChat" },
      ]},
      { title: "New players", steps: [
        { label: "Assess a trial player", caption: "A trial player is assessed in four taps, with a suggested group and a line for the family.", screen: "ACC3-TrialAssess" },
        { label: "A new player\u2019s plan", caption: "A trial player is assessed in four taps, with a suggested group and a line for the family.", screen: "ACC4-PlayerPlan" },
      ]},
      { title: "Each player", steps: [
        { label: "Plan, goal and whole week", caption: "One plan per player, their whole week across club and academy, and one-on-ones kept in open view.", screen: "ACC4b-PlayerPlan" },
        { label: "One-on-one, in open view", caption: "One plan per player, their whole week across club and academy, and one-on-ones kept in open view.", screen: "ACC5-OneOnOne" },
      ]},
      { title: "Game day", steps: [
        { label: "Saturday with the partner club", caption: "Where the academy has a partner club, its game team plays under the club. The coach gets the club\u2019s game-day screens, and the club\u2019s rules apply.", screen: "ACC7-AcademyGameDay" },
        { label: "Team sheet", caption: "Where the academy has a partner club, its game team plays under the club. The coach gets the club\u2019s game-day screens, and the club\u2019s rules apply.", screen: "teamsheet" },
        { label: "Live game", caption: "Where the academy has a partner club, its game team plays under the club. The coach gets the club\u2019s game-day screens, and the club\u2019s rules apply.", screen: "livegame11" },
        { label: "Review", caption: "Where the academy has a partner club, its game team plays under the club. The coach gets the club\u2019s game-day screens, and the club\u2019s rules apply.", screen: "review" },
      ]},
      { title: "End of term", steps: [
        { label: "Check a report draft", caption: "The coach checks each drafted report and changes any word before the owner approves it.", screen: "ACC6-ReportDraft" },
      ]},
    ],
  },

  academyparent: {
    roleLabel: "Academy parent",
    persona: "as Tess Okonkwo, mum of Kai, 13",
    device: 'phone',
    total: 13,
    home: 'academyparent',
    sandboxHome: 'academyparent-e',
    sections: [
      { title: "Join", steps: [
        { label: "Book a free trial", caption: "A parent books a free trial, gets an honest note and an offer, and can add Saturday games with the partner club on one bill.", screen: "academyparent-trial" },
        { label: "Booked", caption: "A parent books a free trial, gets an honest note and an offer, and can add Saturday games with the partner club on one bill.", screen: "academyparent-trialbooked" },
        { label: "Offer and pay", caption: "A parent books a free trial, gets an honest note and an offer, and can add Saturday games with the partner club on one bill.", screen: "acp2-offer" },
        { label: "Join the game team, one bill", caption: "A parent books a free trial, gets an honest note and an offer, and can add Saturday games with the partner club on one bill.", screen: "acp9-join" },
        { label: "Before the first session", caption: "A parent books a free trial, gets an honest note and an offer, and can add Saturday games with the partner club on one bill.", screen: "acp3-home-e" },
      ]},
      { title: "Each week", steps: [
        { label: "Home: Kai\u2019s week", caption: "The week on one screen: sessions, the goal, a note from the coach, and a make-up when they can\u2019t come.", screen: "academyparent" },
        { label: "Group chat", caption: "The week on one screen: sessions, the goal, a note from the coach, and a make-up when they can\u2019t come.", screen: "academyparent-chat" },
        { label: "Away and make-up", caption: "The week on one screen: sessions, the goal, a note from the coach, and a make-up when they can\u2019t come.", screen: "acp6-makeup" },
        { label: "Fees", caption: "The week on one screen: sessions, the goal, a note from the coach, and a make-up when they can\u2019t come.", screen: "academyparent-fees" },
      ]},
      { title: "Each term", steps: [
        { label: "Term report", caption: "The report shows five skills, then and now, against the child\u2019s own start.", screen: "academyparent-progress" },
        { label: "Holiday clinic", caption: "The report shows five skills, then and now, against the child\u2019s own start.", screen: "acp8-clinic-e" },
      ]},
      { title: "When something\u2019s wrong", steps: [
        { label: "Tell someone, sent to the right place", caption: "The parent says where it happened and the app sends it to the right person: the academy owner or the club\u2019s welfare officer.", screen: "acp10-concern" },
      ]},
      { title: "If they play elsewhere", steps: [
        { label: "Choose what to share with an unlinked club", caption: "For a child at a club with no link to the academy, the parent chooses what each coach can see.", screen: "acp7-share" },
      ]},
    ],
  },

  academyplayer: {
    roleLabel: "Academy player",
    persona: "as Kai Okonkwo, 13",
    device: 'phone',
    total: 3,
    home: 'academyplayer',
    sandboxHome: 'academyplayer-e',
    sections: [
      { title: "Each week", steps: [
        { label: "Home: my goal and skills", caption: "Under 15s join with a code from a parent. One goal, their own skills, and ten minutes of practice at home.", screen: "ACK1-AcademyPlayerHome" },
        { label: "Practice at home", caption: "Under 15s join with a code from a parent. One goal, their own skills, and ten minutes of practice at home.", screen: "ACK2-HomePractice" },
        { label: "Before a goal is set", caption: "Under 15s join with a code from a parent. One goal, their own skills, and ten minutes of practice at home.", screen: "ACK1e-AcademyPlayerHomeEmpty" },
      ]},
    ],
  },

  referee: {
    roleLabel: "Referee or game leader",
    persona: "as Zoe Park, 16",
    device: 'phone',
    total: 4,
    home: 'refereephone',
    sandboxHome: 'referee-e',
    sections: [
      { title: "Each week", steps: [
        { label: "Asked to do a game", caption: "Young referees are asked to do a game and can say yes from their phone.", screen: "refereephone" },
        { label: "My games", caption: "Young referees are asked to do a game and can say yes from their phone.", screen: "RF2-RefGames" },
      ]},
      { title: "Game day", steps: [
        { label: "Report a card or incident", caption: "After the game: report a card in a minute, and see kind feedback only.", screen: "RF3-RefReport" },
        { label: "See kind feedback", caption: "After the game: report a card in a minute, and see kind feedback only.", screen: "RF4-RefFeedback" },
      ]},
    ],
  },

  footballyear: {
    roleLabel: "The football year",
    persona: "as Sam K, U12 Sam · full year lifecycle",
    device: 'tablet',
    total: 34,
    home: 'footballyear',
    sections: [
      { title: "Year overview", steps: [
        { label: "Football year (empty)", caption: "Before anything is set, Clean Sheet asks when the season runs.", screen: "footballyear-empty" },
        { label: "Football year overview", caption: "Four phases of the year — pre-season, season, post-season, rest month — with dates, reminders and open tasks.", screen: "footballyear" },
        { label: "Club phases (empty)", caption: "The director sets the year once for every team at the club.", screen: "clubphases-empty" },
        { label: "Club phases", caption: "Every team's readiness, season dates and who does what in pre-season.", screen: "clubphases" },
        { label: "Trial window", caption: "Trial dates and rules by age group, set by the director.", screen: "trialwindow" },
      ]},
      { title: "Pre-season", steps: [
        { label: "Pre-season home", caption: "The pre-season checklist: squad, consent, baseline tests, friendlies, grading and kit.", screen: "homepreseason" },
        { label: "Provisional squad (empty)", caption: "Start the squad from last year's list.", screen: "provisionalsquad-e" },
        { label: "Provisional squad", caption: "Confirmed, trialling, waitlist and not coming back — all in one view.", screen: "provisionalsquad" },
        { label: "Trial morning", caption: "Score four trial players on three axes. Late-year birth note included.", screen: "coachtrial" },
        { label: "Baseline tests (empty)", caption: "Plan four baseline tests before pre-season starts.", screen: "baseline-empty" },
        { label: "Baseline tests", caption: "Four tests, team median trend, and missed-test players flagged.", screen: "baseline" },
        { label: "Load build", caption: "Ten-week ramp to 100%. Coming-back-slower players highlighted.", screen: "loadbuild" },
        { label: "Friendlies (empty)", caption: "Nobody nearby is looking yet — be the first to ask.", screen: "friendlies-empty" },
        { label: "Friendlies", caption: "Four nearby teams to arrange games with. Say when you're free.", screen: "friendlies" },
        { label: "Grading input", caption: "Score 17 players on two axes for division grading.", screen: "gradinginput" },
      ]},
      { title: "Season", steps: [
        { label: "Mid-season reviews", caption: "Four player chats, goals and regrade window.", screen: "midseasonreview" },
      ]},
      { title: "Post-season", steps: [
        { label: "Post-season home", caption: "Wrap-up checklist: summaries, chats, coming back, kit, presentation, review.", screen: "homepostseason" },
        { label: "Tournament (empty)", caption: "Add a tournament or gala day — a squad, a day plan and one review.", screen: "tournament-empty" },
        { label: "Tournament setup", caption: "Kingfisher Summer Cup: squad, format, fees and before-you-go checklist.", screen: "tournamentsetup" },
        { label: "Tournament day", caption: "Three games, between-games notes, Jai's ankle, minutes across the day.", screen: "tournamentday" },
        { label: "Tournament review", caption: "Sprints dropped by a third — normal for five games in two days. Guests return to their own coach.", screen: "tournamentreview" },
        { label: "Indoor team (empty)", caption: "Set up a summer team with its own fixtures.", screen: "indoorteam-empty" },
        { label: "Indoor team", caption: "Wattle Creek Fives — 8 players from 3 teams, Monday nights, just for fun.", screen: "indoorteam" },
        { label: "Coming back", caption: "12 yes, 3 not sure, 2 not coming back. Trial dates for 2027.", screen: "comingback" },
      ]},
      { title: "Rest month", steps: [
        { label: "Rest month", caption: "Nothing needs you this month. Break check for Zoe, Mia and Finn.", screen: "restmonth" },
      ]},
      { title: "Stand-in", steps: [
        { label: "Stand-in (empty)", caption: "Add someone who can lead the team while you're away.", screen: "standin-empty" },
        { label: "Stand-in", caption: "Hand over to Jess Wu 26 Sep–11 Oct. WWC check note for Linh.", screen: "standin" },
      ]},
      { title: "Phone screens", steps: [
        { label: "Parent: pre-season", caption: "Mia's place confirmed. 4 things before round 1.", screen: "parent-preseason" },
        { label: "Parent: coming back?", caption: "Is Mia coming back for 2027? Three-tap reply.", screen: "parent-comingback" },
        { label: "Parent: tournament invite", caption: "Kingfisher Summer Cup invite and payment.", screen: "parent-tournament" },
        { label: "Parent: rest month", caption: "Note from Sam, Mia's break check.", screen: "parent-restmonth" },
        { label: "Manager: tournament checklist", caption: "Entry, fees, medical forms, ball bag, directions.", screen: "manager-tournament" },
        { label: "Player: rest month", caption: "What rest actually does, and football on holiday.", screen: "player-restmonth" },
        { label: "Parent: asked to lead the team", caption: "Linh Tran asked to support. WWC check note.", screen: "standin-asked" },
      ]},
    ],
  },

  step4: {
    roleLabel: "Step 4 · All new screens",
    persona: "all 68 screens built in step 4",
    device: 'tablet',
    total: 68,
    home: 'ack1-home',
    sections: [
      { title: "Academy player", steps: [
        { label: "Academy player home", caption: "Kai's goal and skills progress.", screen: "ack1-home" },
        { label: "Academy player home (empty)", caption: "Before a goal is set.", screen: "ack1-home-empty" },
        { label: "Home practice", caption: "4-step wall-strike practice.", screen: "ack2-practice" },
        { label: "Home practice (empty)", caption: "No practice set this week.", screen: "ack2-practice-e" },
      ]},
      { title: "Academy parent", steps: [
        { label: "Offer", caption: "Advanced program offer for Kai.", screen: "acp2-offer" },
        { label: "Parent home (empty)", caption: "Before first session.", screen: "acp3-home-e" },
        { label: "Fees", caption: "$129.67 due, payment 3 of 3.", screen: "acp4-fees" },
        { label: "Progress report (empty)", caption: "First report comes in week 9.", screen: "acp5-report-e" },
        { label: "Make-up session", caption: "Pick a make-up date.", screen: "acp6-makeup" },
        { label: "Share with club", caption: "Toggle what the club can see.", screen: "acp7-share" },
        { label: "Book a clinic (empty)", caption: "Nothing to book right now.", screen: "acp8-clinic-e" },
        { label: "Join game team", caption: "U13 Timber pathway offer.", screen: "acp9-join" },
        { label: "Raise a concern", caption: "3 options, sent privately.", screen: "acp10-concern" },
      ]},
      { title: "Director view", steps: [
        { label: "Safeguarding", caption: "4 stat cards, to-do list, who-can-see grid.", screen: "d5-safeguarding" },
        { label: "Concerns", caption: "2 open, 3 closed, raise a concern.", screen: "ds1-concerns" },
        { label: "Data requests", caption: "None waiting, 3 completed.", screen: "ds2-data" },
        { label: "Grants", caption: "3 grants with Start/Remind/Claim.", screen: "db4-grants" },
        { label: "Kit", caption: "4 stat cards, kit table.", screen: "dk1-kit" },
        { label: "Nominations", caption: "11-row nominations table.", screen: "dn1-noms" },
        { label: "Nominations (empty)", caption: "Nothing here yet.", screen: "dn1-noms-e" },
        { label: "U7 Dan", caption: "7 players, 1 attention.", screen: "d7-u7" },
        { label: "U8 Hannah", caption: "10 players, 0 attention.", screen: "d7-u8" },
        { label: "U11 Girls Kate", caption: "14 players, Skill Acquisition.", screen: "d7-u11girls" },
        { label: "U11 Luke", caption: "13 players, 2 attention.", screen: "d7-u11" },
        { label: "U14 Josh", caption: "18 players, Game Training phase.", screen: "d7-u14" },
        { label: "U15 Girls Bec", caption: "15 players, 2 attention.", screen: "d7-u15girls" },
      ]},
      { title: "Tablet coach", steps: [
        { label: "Parent availability", caption: "3 sessions with yes/maybe/no.", screen: "av2-avail" },
        { label: "Team talk (dark)", caption: "Full-screen win-the-ball-back talk.", screen: "e-teamtalk" },
        { label: "MiniRoos who's coming", caption: "7 coming, 1 maybe.", screen: "hm11-coming" },
        { label: "MiniRoos training (empty)", caption: "No session set, Add training CTA.", screen: "hm3-training-e" },
        { label: "MiniRoos game day (empty)", caption: "No game this week.", screen: "hm4-gameday-e" },
        { label: "Inbox", caption: "2-pane inbox, 6 messages.", screen: "i1-inbox" },
        { label: "Inbox: GPS vests alert", caption: "3 GPS vests didn't sync.", screen: "i1-inbox-vests" },
        { label: "Tablet training home", caption: "Needs-you strip, today's training, sidebar.", screen: "t1-training" },
        { label: "Consent table", caption: "5-player consent table.", screen: "p1-consent" },
        { label: "Parent consent (phone)", caption: "Multi-step consent flow.", screen: "p2-consent" },
        { label: "Parent consent step 1", caption: "7 permissions yes/no.", screen: "p2b-consent" },
        { label: "Parent consent step 2", caption: "Confirmation + delete sheet.", screen: "p2c-consent" },
      ]},
      { title: "Empty states", steps: [
        { label: "Term planner (empty)", caption: "No term set yet.", screen: "dl2-planner-e" },
        { label: "Partner academy (empty)", caption: "None linked.", screen: "dset6-partner-e" },
        { label: "Player clips (empty)", caption: "Bottom tab nav.", screen: "pa-clips-e" },
        { label: "Player goals (empty)", caption: "You'll pick a goal with Sam.", screen: "pa-goals-e" },
        { label: "Ref feedback (empty)", caption: "Kind words show here.", screen: "rf4-feedback-e" },
        { label: "Ask Clean Sheet (empty)", caption: "Textarea and 3 examples.", screen: "sg3-ask-e" },
        { label: "Lineup (empty)", caption: "9 empty position circles.", screen: "x11-lineup-e" },
        { label: "Clips (empty)", caption: "Record/Upload buttons.", screen: "x6-clips-e" },
        { label: "Inbox (empty)", caption: "What lands here panel.", screen: "x7-inbox-e" },
      ]},
      { title: "Season features", steps: [
        { label: "Chair welcome", caption: "5 setup steps for the chair.", screen: "d0c-chair" },
        { label: "Senior squad", caption: "7 of 22, load ratio, Luca clearance pending.", screen: "fn2-squad" },
        { label: "Import from PlayFootball", caption: "14 teams, 192 players.", screen: "fp1-playfootball" },
        { label: "Trials", caption: "Women's 1sts, 5 shown, scores.", screen: "ft1-trials" },
        { label: "Fees and volunteers", caption: "3 fee groups, canteen roster.", screen: "fv1-fees" },
        { label: "Girls and women", caption: "76 girls, pathway chart.", screen: "fw1-girls" },
      ]},
      { title: "Settings", steps: [
        { label: "Club roles", caption: "6 roles table with change links.", screen: "dset2-roles" },
        { label: "Connections", caption: "5 connections, all live.", screen: "dset3-connections" },
        { label: "Partner academy", caption: "Tall Timber, 5 config items.", screen: "dset6-partner" },
        { label: "Devices (empty)", caption: "No devices, pair a camera.", screen: "set4e-devices" },
        { label: "Display", caption: "Text size, sunlight, motion, colorblind.", screen: "set6-display" },
      ]},
      { title: "Fitness coach", steps: [
        { label: "Injury log (empty)", caption: "Inline log-an-injury form.", screen: "il1e-injury-e" },
        { label: "Test library", caption: "7 tests with due dates.", screen: "tl1-tests" },
        { label: "Sprint results", caption: "Jai Patel, PB 3.84s.", screen: "tl3-sprint" },
        { label: "Sprint results (empty)", caption: "No results for Jai yet.", screen: "tl3e-sprint-e" },
      ]},
      { title: "Coaches / TM", steps: [
        { label: "Coach home (empty)", caption: "Jess Wu co-coach not yet joined.", screen: "cc1e-coach-e" },
        { label: "Who's coming", caption: "12 in, 1 maybe, 2 can't.", screen: "tm6-coming" },
        { label: "Who's coming (empty)", caption: "No game this week.", screen: "tm6e-coming-e" },
      ]},
      { title: "Record", steps: [
        { label: "Record choice", caption: "Film game/training/skill.", screen: "rcm1-record" },
        { label: "Clip picker", caption: "8 children, pick 2 for Tuesday.", screen: "rcm2-clips" },
      ]},
      { title: "Team chat", steps: [
        { label: "Team chat", caption: "Rich 3-pane chat with poll.", screen: "ch1-chat" },
      ]},
      { title: "Invite screens", steps: [
        { label: "One club, five views", caption: "Overview card: 5 roles, what each sees.", screen: "sk-roles" },
        { label: "Co-coach invite", caption: "What a co-coach sees when they're invited.", screen: "iv3c-coachinvite" },
        { label: "Fitness coach invite", caption: "What a fitness coach sees when they're invited.", screen: "iv3f-fitinvite" },
        { label: "Manager done", caption: "Team manager joins — good first things.", screen: "iv4-managerdone" },
      ]},
      { title: "Join flow — parent", steps: [
        { label: "Who's joining?", caption: "Landing screen for a team invite link.", screen: "jn-landing" },
        { label: "Create account", caption: "Parent creates account with Apple, Google or email.", screen: "jn1-create" },
        { label: "Who's your child?", caption: "Confirm child from squad list, add DOB and relationship.", screen: "jn2-child" },
        { label: "First-aid card", caption: "Parent fills in Mia's first-aid card.", screen: "jn8-firstaid" },
        { label: "Set up Mia's app", caption: "6-digit code for the child's device, can/can't list.", screen: "jn4-setup" },
        { label: "You're in, Linh", caption: "Checklist, game-day message, and CTA.", screen: "jn5-parentdone" },
      ]},
      { title: "Join flow — player", steps: [
        { label: "How old are you?", caption: "Age picker — under 15 goes via parent, 15-17 enters code, 18+ own account.", screen: "jn6-age" },
        { label: "Type your code", caption: "15-17 year old enters 6-digit parent code.", screen: "jn7-code" },
        { label: "18+ own account", caption: "Full consent toggles for an adult player.", screen: "jn9a-18plus" },
      ]},
    ],
  },

  'year-coach': {
    roleLabel: "The football year — coach",
    persona: "as Ollie, U16 coach · full year",
    device: 'tablet',
    total: 20,
    home: 'footballyear',
    sections: [
      { title: "Pre-season", steps: [
        { label: "Year at a glance",          caption: "Four phases — when each starts and what needs doing.", screen: "footballyear" },
        { label: "Home checklist",            caption: "7 items before round 1: squad, consent, baseline tests, friendlies, grading.", screen: "homepreseason" },
        { label: "Squad: confirmed & trials", caption: "Confirmed, trialling and waitlist — the squad starts here.", screen: "provisionalsquad" },
        { label: "Trial morning",             caption: "Score trial players on three axes.", screen: "coachtrial" },
        { label: "Baseline tests",            caption: "Four fitness tests, team median trend.", screen: "baseline" },
        { label: "Build up load",             caption: "10-week ramp — growing players capped automatically.", screen: "loadbuild" },
        { label: "Find friendlies",           caption: "Four nearby teams to arrange games with.", screen: "friendlies" },
        { label: "Scores for grading",        caption: "Score 17 players for division grading.", screen: "gradinginput" },
      ]},
      { title: "Season", steps: [
        { label: "Home in-season",            caption: "Tonight's session, what needs you, Saturday's game.", screen: "JuniorCoachApp" },
        { label: "Mid-season reviews",        caption: "Four player chats, goals and regrade window.", screen: "midseasonreview" },
      ]},
      { title: "Post-season", steps: [
        { label: "Home wrap-up",              caption: "5-item wrap-up: summaries, chats, coming back, kit, review.", screen: "homepostseason" },
        { label: "One player's summary",      caption: "Mia's season: 16 games, 2 of 3 goals met, three clips.", screen: "se2-playersummary" },
        { label: "Tournament squad",          caption: "Summer Cup: squad, fees and checklist.", screen: "tournamentsetup" },
        { label: "Tournament day",            caption: "Three games, between-game notes, minutes across the day.", screen: "tournamentday" },
        { label: "Tournament review",         caption: "Sprints dropped — normal for five games in two days.", screen: "tournamentreview" },
        { label: "Indoor team",               caption: "Wattle Creek Fives — 8 players, Monday nights.", screen: "indoorteam" },
        { label: "Who's coming back?",        caption: "12 yes, 3 not sure, 2 not coming back.", screen: "comingback" },
      ]},
      { title: "Rest month", steps: [
        { label: "Quiet home",                caption: "Nothing needs you this month. Break tracker for two players.", screen: "restmonth" },
        { label: "Hand over to stand-in",     caption: "Add Linh as stand-in for 26 Sep–11 Oct.", screen: "standin" },
        { label: "What stand-in sees",        caption: "Linh's view: Home, Training, Match day only. No Squad, no Clips.", screen: "standin-home" },
      ]},
    ],
  },

  'year-club': {
    roleLabel: "The football year — club",
    persona: "as Rachel, director of football",
    device: 'tablet',
    total: 14,
    home: 'clubphases',
    sections: [
      { title: "Set the year", steps: [
        { label: "Dates and phases",          caption: "Set the year once for every team at the club.", screen: "clubphases" },
        { label: "Trial dates and rules",     caption: "Trial window and rules by age group.", screen: "trialwindow" },
      ]},
      { title: "Youth", steps: [
        { label: "Youth: pre-season",         caption: "U16 Ollie's checklist — players 15+ answer for themselves.", screen: "youth-preseason" },
        { label: "Youth: post-season",        caption: "Chats, coming back, moving up to seniors.", screen: "youth-postseason" },
        { label: "Youth: rest month",         caption: "Nothing needed. Break tracker for Cal and Ryan.", screen: "youth-restmonth" },
      ]},
      { title: "Seniors", steps: [
        { label: "Seniors: pre-season",       caption: "Men's 1sts Marko — registration and clearances lead.", screen: "senior-preseason" },
        { label: "Seniors: post-season",      caption: "One-to-ones, kit, presentation night, director review.", screen: "senior-postseason" },
        { label: "Seniors: off-season",       caption: "Nothing needed. Adults choose their own break.", screen: "senior-offseason" },
      ]},
      { title: "MiniRoos and academy", steps: [
        { label: "MiniRoos: before first Saturday", caption: "U9 Tom's 6-item list. No trials, no grading.", screen: "miniroos-preseason" },
        { label: "MiniRoos: after the season",      caption: "Season notes, medals, coming back, thank helpers.", screen: "miniroos-postseason" },
        { label: "MiniRoos: rest",                  caption: "Nothing until March. Tell Bianca if coaching next year.", screen: "miniroos-rest" },
        { label: "Co-coach shared view",            caption: "Jess's checklist — each item tagged with who owns it.", screen: "ccoach-preseason" },
        { label: "Academy team (read-only)",        caption: "Men's Reserves: results, registered, training turnout.", screen: "fn3-seniorteam" },
      ]},
    ],
  },

  'year-family': {
    roleLabel: "The football year — family",
    persona: "as Linh Tran, parent of Mia",
    device: 'tablet',
    total: 16,
    home: 'parent-preseason',
    sections: [
      { title: "Parent phone", steps: [
        { label: "Pre-season",                caption: "Mia's spot confirmed. 4 things before round 1.", screen: "parent-preseason" },
        { label: "Tournament invite",         caption: "Summer Cup invite and payment.", screen: "parent-tournament" },
        { label: "Coming back?",              caption: "Is Mia coming back for 2027? Three-tap reply.", screen: "parent-comingback" },
        { label: "Rest month",                caption: "Note from Sam, Mia's break check.", screen: "parent-restmonth" },
      ]},
      { title: "Manager phone", steps: [
        { label: "Pre-season",                caption: "Before round 1: duty roster, fees, first-aid cards.", screen: "manager-preseason" },
        { label: "Post-season",               caption: "Kit back, Summer Cup, thank volunteers.", screen: "manager-postseason" },
        { label: "Rest month",                caption: "Nothing until January. Season stats.", screen: "manager-restmonth" },
        { label: "Tournament checklist",      caption: "Entry, fees, medical forms, ball bag.", screen: "manager-tournament" },
      ]},
      { title: "Player under 15", steps: [
        { label: "Pre-season",                caption: "You're in U12 Sam. Pick one thing to get better at.", screen: "player-preseason" },
        { label: "Post-season",               caption: "Coach note, 16 games, season goal met.", screen: "player-postseason" },
        { label: "Rest month",                caption: "Nothing until January. Break tracker.", screen: "player-restmonth" },
      ]},
      { title: "Player 15 and over", steps: [
        { label: "Pre-season",                caption: "Yours to do: consent, baseline tests, pick your goal.", screen: "older-preseason" },
        { label: "Post-season",               caption: "Coach note. Are you coming back? (you answer yourself).", screen: "older-postseason" },
        { label: "Rest month",                caption: "No football until January. Message Ollie. Welfare contact.", screen: "older-restmonth" },
        { label: "Player settings",           caption: "Josh Bell: what Marko can see, leave the squad, sign out.", screen: "po5s-adultsettings" },
      ]},
    ],
  },

  story: {
    roleLabel: "The idea in one minute",
    persona: "one week with an under-12 team",
    device: 'tablet',
    total: 6,
    home: '',
    sections: [
      { title: "The story", steps: [
        { label: "Saturday: the game goes in", caption: "The club films the game on whatever camera it has. Cameras with a live feed can stream straight in.", screen: "GI0-Recording" },
        { label: "The review comes back", caption: "About 25 minutes later: what went well, and three things to work on, each with a clip.", screen: "review" },
        { label: "Thursday: the plan is ready", caption: "Training is built from those three things, using drills written to the national curriculum.", screen: "T3-TrainingTab" },
        { label: "At the ground", caption: "Pitch-side, the coach sees what to set up and what to say. Growing players have their sprints capped.", screen: "TR1b-PitchSideDrill" },
        { label: "Parents are in the loop", caption: "Meanwhile, families get one simple week view on their phone, and decide what\u2019s recorded.", screen: "PA-Parent" },
        { label: "Next Saturday", caption: "The loop closes: game, plan, training, proof." },
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
  {
    section: 'PRIVATE ACADEMIES',
    roles: [
      { id: 'academyowner',  name: 'Academy owner',  device: 'Tablet', desc: 'as Dani Okafor, Tall Timber' },
      { id: 'academycoach',  name: 'Academy coach',  device: 'Tablet', desc: 'as Reece Whitlam' },
      { id: 'academyparent', name: 'Academy parent', device: 'Phone',  desc: 'as Tess Okonkwo' },
      { id: 'academyplayer', name: 'Academy player', device: 'Phone',  desc: 'as Kai Okonkwo, 13' },
    ],
  },
]
