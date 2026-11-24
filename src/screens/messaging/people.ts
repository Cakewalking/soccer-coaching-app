// Everyone who can be messaged on Clean Sheet, and how each person in the demo is connected to them.
// A person is reached three ways: by their username, because you already message them, or because you
// are in the same group.

export type Person = {
  /** username on the site, shown as @name */ handle: string
  name: string; ini: string; role: string; org: string
  /** under 15: no chats; anything goes to this parent instead */ parent?: string
  /** 15 to 17: a parent is copied on messages from adults */ copied?: string
  /** welfare officer: nobody else can read the chat */ private?: boolean
}

const WC = 'Wattle Creek FC', TT = 'Tall Timber Academy'
const P = (handle: string, name: string, role: string, org = WC, extra: Partial<Person> = {}): Person => ({ handle, name, role, org, ini: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(), ...extra })

export const PEOPLE: Person[] = [
  P('sam.kelly', 'Sam Kelly', 'Head coach · U12 Sam'), P('jess.marsh', 'Jess Marsh', 'Assistant coach · U12 Sam'), P('rob.owusu', 'Rob Owusu', 'Team manager · U12 Sam'),
  P('priya.shah', 'Priya Shah', 'Fitness coach · four teams'), P('nick.ward', 'Nick Ward', 'Goalkeeper coach'), P('ollie.grant', 'Ollie Grant', 'Head coach · U16 Ollie'),
  P('marko.petrovic', 'Marko Petrovic', 'Head coach · Men’s 1sts'), P('tom.albers', 'Tom Albers', 'Coach · U9 Tom'),
  P('rachel.m', 'Rachel M', 'Director of football'), P('greg.lawson', 'Greg Lawson', 'Chair'), P('bianca.rossi', 'Bianca Rossi', 'Club coordinator'),
  P('helen.park', 'Helen Park', 'Welfare officer · private', WC, { private: true }), P('ruth.tan', 'Ruth Tan', 'Registrar and referees coordinator'),
  P('linh.tran', 'Linh Tran', 'Parent · Mia and Bao'), P('kate.quinn', 'Kate Quinn', 'Parent · Harper'), P('dev.singh', 'Dev Singh', 'Parent · Noah'),
  P('mia.tran', 'Mia Tran', 'Player · U12 Sam', WC, { parent: 'linh.tran' }), P('noah.singh', 'Noah Singh', 'Player · U12 Sam', WC, { parent: 'dev.singh' }),
  P('cal.west', 'Cal West', 'Player · U16 Ollie', WC, { copied: 'his mum' }), P('zoe.park', 'Zoe Park', 'Referee', WC, { copied: 'her mum' }),
  P('dani.okafor', 'Dani Okafor', 'Owner', TT), P('reece.whitlam', 'Reece Whitlam', 'Coach · Advanced', TT),
  P('tess.okonkwo', 'Tess Okonkwo', 'Parent · Kai', TT), P('kai.okonkwo', 'Kai Okonkwo', 'Player · Advanced', TT, { parent: 'tess.okonkwo' }),
]
export const person = (handle: string) => PEOPLE.find(p => p.handle === handle)!

export type Line = { from?: string; text: string; time: string }          // no `from`: you wrote it
export type Chat = { id: string; /** a group's name, or nothing for one person */ group?: string; about?: string; members: string[]; lines: Line[]; unread?: number }
export type Me = { handle: string; /** the groups this person belongs to */ groups: { name: string; about: string; members: string[] }[]; chats: Chat[] }

const one = (id: string, lines: Line[], unread = 0): Chat => ({ id, members: [id], lines, unread })

export const MES: Record<string, Me> = {
  fitness: {
    handle: 'priya.shah',
    groups: [
      { name: 'Coaching team · U12 Sam', about: 'Coaches only', members: ['sam.kelly', 'jess.marsh'] },
      { name: 'Coaching team · U16 Ollie', about: 'Coaches only', members: ['ollie.grant'] },
      { name: 'All coaches', about: `${WC} · every coach`, members: ['sam.kelly', 'jess.marsh', 'ollie.grant', 'marko.petrovic', 'tom.albers', 'nick.ward'] },
    ],
    chats: [
      { id: 'g:u12', group: 'Coaching team · U12 Sam', about: 'Coaches only', members: ['sam.kelly', 'jess.marsh'], unread: 1, lines: [
        { from: 'sam.kelly', text: 'Can we look at sprint numbers before Thursday?', time: '11:32 am' },
        { text: 'I’ll have the data from the vests ready by Wednesday night.', time: '11:40 am' },
        { from: 'sam.kelly', text: 'Great. Is tonight’s block still fifteen minutes?', time: '3:05 pm' },
      ] },
      one('ollie.grant', [
        { text: 'Sore legs are down from six players to two since we capped sprints.', time: 'Mon' },
        { from: 'ollie.grant', text: 'They finished Sunday strong. Keep the cap for another week?', time: 'Mon' },
      ], 1),
      one('dev.singh', [
        { from: 'dev.singh', text: 'Noah says his knee is sore after Tuesday.', time: 'Tue' },
        { text: 'Thanks for telling me. I have capped his sprints tonight and Sam knows.', time: 'Tue' },
      ]),
      one('helen.park', [{ from: 'helen.park', text: 'Thanks for letting me know. I’ll take it from here. Nobody else can read this.', time: 'Sat' }]),
    ],
  },
  coordinator: {
    handle: 'bianca.rossi',
    groups: [
      { name: 'Committee', about: `${WC} · committee only`, members: ['rachel.m', 'greg.lawson', 'helen.park', 'ruth.tan'] },
      { name: 'All coaches', about: `${WC} · every coach`, members: ['sam.kelly', 'jess.marsh', 'ollie.grant', 'marko.petrovic', 'tom.albers', 'nick.ward', 'priya.shah'] },
      { name: 'Team managers', about: `${WC} · every team manager`, members: ['rob.owusu'] },
    ],
    chats: [
      one('sam.kelly', [
        { from: 'sam.kelly', text: 'Hi Bianca, do you know which pitch we have this Sunday?', time: '2:08 pm' },
        { text: 'Let me check for you…', time: '2:10 pm' },
        { text: 'Yes, pitch 2 from 9:00. I’ll put the cones out early.', time: '2:14 pm' },
        { from: 'sam.kelly', text: 'Brilliant, thank you!', time: '2:15 pm' },
      ]),
      { id: 'g:coaches', group: 'All coaches', about: `${WC} · every coach`, members: ['sam.kelly', 'ollie.grant', 'tom.albers'], unread: 2, lines: [
        { text: 'Photo day is Sunday 21 June. Team times are on the calendar.', time: 'Mon' },
        { from: 'tom.albers', text: 'Thanks. U9 Tom can do any time before 10.', time: 'Mon' },
        { from: 'ollie.grant', text: 'U16 Ollie are away that day. Can we do the Thursday?', time: '9:20 am' },
      ] },
      one('ruth.tan', [
        { text: 'Two games on Sunday still have no referee.', time: 'Yesterday' },
        { from: 'ruth.tan', text: 'I have asked Zoe for the 8:30. One to go.', time: 'Yesterday' },
      ], 1),
      one('rachel.m', [{ from: 'rachel.m', text: 'Counts for the committee are in.', time: 'Mon' }, { text: 'On it.', time: 'Mon' }]),
    ],
  },
  academyowner: {
    handle: 'dani.okafor',
    groups: [
      { name: 'Tall Timber coaches', about: `${TT} · coaches only`, members: ['reece.whitlam'] },
      { name: 'Advanced · families', about: `${TT} · Tue and Thu`, members: ['tess.okonkwo'] },
    ],
    chats: [
      one('reece.whitlam', [
        { text: 'Can you take the 4:15 on Friday?', time: 'Wed' },
        { from: 'reece.whitlam', text: 'Yes. I’ll run the same session as Tuesday.', time: 'Wed' },
      ]),
      { id: 'g:adv', group: 'Advanced · families', about: `${TT} · Tue and Thu`, members: ['tess.okonkwo'], unread: 1, lines: [
        { text: 'July clinic bookings are open.', time: 'Mon' },
        { from: 'tess.okonkwo', text: 'Booked for Kai. Thank you.', time: '4:15 pm' },
      ] },
      one('rachel.m', [
        { from: 'rachel.m', text: 'Three of our under-13s are asking about your Advanced group.', time: 'Tue' },
        { text: 'Send them to a trial on Thursday. I’ll tell you how they go.', time: 'Tue' },
      ], 1),
    ],
  },
  academyparent: {
    handle: 'tess.okonkwo',
    groups: [{ name: 'Advanced · families', about: `${TT} · Tue and Thu`, members: ['dani.okafor', 'reece.whitlam'] }],
    chats: [
      one('reece.whitlam', [
        { text: 'Kai did all three practices!', time: '4:15 pm' },
        { from: 'reece.whitlam', text: 'I saw. His first touch on Tuesday showed it.', time: '4:40 pm' },
      ], 1),
      { id: 'g:adv', group: 'Advanced · families', about: `${TT} · Tue and Thu`, members: ['dani.okafor', 'reece.whitlam'], lines: [
        { from: 'dani.okafor', text: 'July clinic bookings are open.', time: 'Mon' },
        { text: 'Booked for Kai. Thank you.', time: 'Mon' },
      ] },
      one('dani.okafor', [{ from: 'dani.okafor', text: 'Kai’s make-up session is Thursday at 4:15.', time: 'Wed' }]),
    ],
  },
}
