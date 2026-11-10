export const PLAYERS = [
  { ini: 'MT', name: 'Mia',   fullName: 'Mia Tran'     },
  { ini: 'NO', name: 'Noah',  fullName: 'Noah Okafor'  },
  { ini: 'EB', name: 'Ella',  fullName: 'Ella Brandt'  },
  { ini: 'JP', name: 'Jai',   fullName: 'Jai Patel'    },
  { ini: 'ZH', name: 'Zoe',   fullName: 'Zoe Hartley'  },
  { ini: 'AL', name: 'Ava',   fullName: 'Ava Lewin'    },
  { ini: 'LM', name: 'Leo',   fullName: 'Leo Marsh'    },
  { ini: 'GO', name: 'Grace', fullName: 'Grace Osei'   },
  { ini: 'TR', name: 'Tom',   fullName: 'Tom Rivera'   },
]

export const GAME_FULL: Record<string, { title: string; sub: string }> = {
  ironbark:  { title: 'Ironbark United · Sat 30 May · Won 3–1',  sub: 'Full match recorded · highlights are 4 min · review ready' },
  saltmarsh: { title: 'Saltmarsh FC · Sat 23 May · Lost 1–2',    sub: 'Full match recorded · highlights are 3 min' },
  northgate: { title: 'Northgate FC · Sat 16 May · Drew 1–1',    sub: 'Full match recorded · highlights are 2 min' },
  bayside:   { title: 'Tealside Town · Sat 9 May · Won 2–0',     sub: 'Full match recorded · highlights are 4 min' },
}

export const MEASURE_INFO: Record<string, string> = {
  'Pressing high':     'Wins of the ball in their half · Our target 12 a game · last 4 games 10 a game · from Our style',
  'Winning it back':   'Our target under 6 s · last 4 games avg 7 s · from Our style',
  'Building out':      'Our target 8 passes a game · last 4 games avg 7 · from Our style',
  'Counter-attacks':   'Our target 2 goals a game · from Our style',
  'Gap between lines': 'Our target under 20 m · last 4 games avg 26 m · from Our style',
  'Goals and chances': 'On target, great goals, ones that got away · from Our style',
}

export const PLAYLISTS = [
  { id: 'pl1', title: 'Team talk · Harbour Rovers', clips: 5, dur: '4 min', note: 'Ready for Saturday' },
  { id: 'pl2', title: 'Pressing: what good looks like', clips: 9, dur: 'from 4 games', note: 'Used in 3 team talks' },
  { id: 'pl3', title: 'Back-post defending', clips: 4, dur: 'Leo and Grace', note: 'For Thursday' },
  { id: 'pl4', title: 'Goals of the season', clips: 18, dur: '', note: 'Shared with families' },
]

export const SHARED_CLIPS = [
  { ini: 'MT', name: 'Mia Tran',    clip: 'Min 47 · weaker-foot goal vs Ironbark', status: 'Watched twice',   note: 'Linh liked it',           statusColor: '#40826d' },
  { ini: 'LM', name: 'Leo Marsh',   clip: 'Min 24 · runner lost at the back post',  status: 'Watched',         note: 'goal reminder attached',  statusColor: '#40826d' },
  { ini: 'NO', name: 'Noah Okafor', clip: 'Min 10 · early shot, low to the corner', status: 'Not watched yet', note: '',                        statusColor: '#c39797' },
  { ini: 'JP', name: 'Jai Patel',   clip: 'Min 37 · look up, switch of play',       status: 'Watched',         note: '',                        statusColor: '#40826d' },
]

export const TO_CHECK_ITEMS = [
  { id: 'tc1', label: 'A win in their half?', game: 'Ironbark', min: 24 },
  { id: 'tc2', label: "Who is this?",          game: 'Ironbark', min: 34 },
  { id: 'tc3', label: 'A goal?',               game: 'Ironbark', min: 44 },
]

export const TO_CHECK_OPTIONS = ['Yes, in their half', 'Yes, but in our half', 'No, they kept it']

export function resultColor(r: 'W' | 'L' | 'D') {
  if (r === 'W') return { background: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { background: '#c39797', color: '#10211f' }
  return { background: '#e9eae8', color: '#10211f' }
}
