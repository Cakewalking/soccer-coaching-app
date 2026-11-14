import type { HomeCfg } from './HomeStory'

// MiniRoos coach frame, shared by STO1–STO3.
const MINIROOS_TOPNAV = [
  { label: 'Home', target: 'MS5-HomeMiniRoosSame', active: true },
  { label: 'Squad' }, { label: 'Training' }, { label: 'Game day' }, { label: 'Clips' }, { label: 'Record' },
]
const MINIROOS_SUBNAV = [
  { label: 'Overview', target: 'MS5-HomeMiniRoosSame', active: true },
  { label: 'Messages' }, { label: 'Calendar' }, { label: 'Fixtures' },
  { label: 'Our style', target: 'MS1-MiniRoosStyle' },
  { label: "Where we're at", target: 'MS2-MiniRoosWhereWeAt' },
  { label: 'Team staff' },
]
const MINIROOS_FACES = [
  { ini: 'AK', has: true }, { ini: 'PD', has: true }, { ini: 'IV', has: false }, { ini: 'MX', has: false },
  { ini: 'OH', has: true }, { ini: 'EB', has: true }, { ini: 'JP', has: true }, { ini: 'SH', has: false },
  { ini: 'LH', has: true }, { ini: 'NO', has: true },
]

export const STO1: HomeCfg = {
  id: 'STO1-HomeStoryMiniRoos',
  role: 'Coach · MiniRoos', team: 'U9 Tom · Wattle Creek', avatar: 'TA',
  topNav: MINIROOS_TOPNAV, subNav: MINIROOS_SUBNAV,
  ask: 'Ask about U9 Tom… Who hasn’t had a moment this term?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SATURDAY AT NORTHGATE CITY · NO SCORE KEPT',
    headline: 'You worked on being brave with the ball. On Saturday, seven of your ten took a player on.',
    second: 'A month ago it was three. Ella did it for the first time.',
    bars: [{ n: '3', when: '9 May' }, { n: '5', when: '23 May' }, { n: '7', when: 'Sat 6 June', amber: true }],
    unit: 'children who took a player on',
    reel: { duration: '0:40', chips: ['Arlo', 'Poppy', 'Ella', 'Jai', '+3'], caption: 'Seven moments, one from each child who did it. Made from Saturday’s film.' },
    mainBtn: 'Play 40 seconds',
    outlineBtn: 'What we saw', outlineTarget: 'MS3-MiniRoosReview',
  },
  ready: {
    when: 'TUE 9 JUNE · 5:00 pm · WATTLE CREEK RESERVE',
    title: 'Tuesday is ready',
    text: 'Four games built from Saturday. They bunched round the ball, so next is finding a friend in space.',
    chips: ['45 minutes', 'A ball each', 'No laps, no lines'],
    pale: 'You have not had to plan a session since round 2.',
    btn1: 'Open the games', btn2: 'Swap one',
  },
  moments: {
    title: 'A moment for every child', link: 'All moments', faces: MINIROOS_FACES,
    rows: [
      { ini: 'AK', title: 'Arlo · first go in goal', sub: 'Saturday · 12 seconds of film', action: 'Send' },
      { ini: 'PD', title: 'Poppy · took a player on', sub: 'Saturday · her goal for this term', action: 'Send' },
    ],
    foot: '7 of 10 have had one this term. Ivy, Max and Sami are next.',
  },
  done: {
    title: 'Done for you',
    lines: ['Reminder sent to 2 families', 'Saturday’s turns lined up', 'Four parents asked to be game leader', 'Thank-you to parents drafted'],
    next: 'Next: Sat 13 June, 8:30 at home',
  },
  needs: { count: 2, title: 'Two things need you', sub: 'Game leader for Saturday · one message' },
}

export const TABLET_CONFIGS: Record<string, HomeCfg> = {
  'STO1-HomeStoryMiniRoos': STO1,
}
