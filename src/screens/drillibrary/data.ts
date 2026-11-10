export const G     = '#2f6252'
export const G2    = '#40826d'
export const GD    = '#1f4a3e'
export const ROSE  = '#c39797'
export const INK   = '#10211f'
export const MUT   = '#4a5a57'
export const LN    = '#e8edeb'

export type AgePhase = 'discovery' | 'skill' | 'game' | 'performance'

export interface Drill {
  id: string
  name: string
  category: string
  time: number
  players: string
  phases: AgePhase[]
  area?: string
  ages?: string
  intensity?: string
  workRest?: string
  kitStr?: string
  isOurs?: boolean
  featured?: boolean
  aim?: string
  whySuggested?: string
  howItWorks?: string[]
  coachingPoints?: string[]
  keyWords?: string[]
  askPlayers?: string
  makeEasier?: string
  makeHarder?: string
  checksNote?: string
  basedOn?: string
  tags?: string[]
}

export const DRILLS: Drill[] = [
  // ── Discovery 5–9 ─────────────────────────────────────────────────────────
  { id:'d1', name:'Coervers ball mastery',          category:'First touch',       time:12, players:'Any',          phases:['discovery'], tags:['Curriculum'] },
  { id:'d2', name:'Gates dribbling',                category:'Running with the ball', time:10, players:'Any',      phases:['discovery'], tags:['Curriculum'] },
  { id:'d3', name:'Pairs passing square',           category:'First touch',       time:10, players:'Pairs',        phases:['discovery'], tags:['Curriculum'] },
  { id:'d4', name:'End zone game, 4 v 4',           category:'Games',             time:15, players:'8 players',    phases:['discovery'], tags:['Curriculum'] },
  { id:'d5', name:'1 v 1 keep-away',               category:'1 v 1',             time:10, players:'Pairs',        phases:['discovery'], tags:[] },
  { id:'d6', name:'Follow the leader dribble',      category:'Running with the ball', time:8, players:'Any',       phases:['discovery'], tags:['Curriculum'] },
  { id:'d7', name:'Traffic lights warm-up',         category:'Warm-up',           time:8,  players:'Any',          phases:['discovery'], tags:['Tested in trials'] },
  { id:'d8', name:'Kick tennis, 2 v 2',            category:'Games',             time:12, players:'4 players',    phases:['discovery'], tags:[] },
  { id:'d9', name:'Ball gymnastics',               category:'First touch',       time:10, players:'Any',          phases:['discovery'], tags:['Curriculum'] },
  { id:'d10',name:'Mini-game 4 v 4 no GK',         category:'Games',             time:15, players:'8 players',    phases:['discovery'], tags:[] },

  // ── Skill Acquisition 9–12 ────────────────────────────────────────────────
  { id:'1', name:'4 v 4 + 3 keep-ball', category:'First touch', time:15, players:'11 players', phases:['skill'], area:'30 × 25 m', ages:'Skill Acquisition · 9 to 12', intensity:'High', workRest:'4 × 3 min, 1 min rest', kitStr:'Balls, bibs, cones', featured:true, tags:['Curriculum'],
    aim:'Keep the ball with more players: scan, open up, find the free player.',
    whySuggested:'Saturday vs Ironbark United: gave the ball away in our half, 21 times. We aim for under 12.',
    howItWorks:['Two teams of 4 inside the square. 3 neutral players, one at each end and one in the middle, always play for the team with the ball. That makes it 7 v 4.','Make 6 passes in a row for a point.','Lose it and the other team is straight on the ball.'],
    coachingPoints:['Open your body so you can see both ends','Check your shoulder before the ball arrives','Pass to the free player, not the nearest one'],
    keyWords:['Scan','Free player'],
    askPlayers:'"Who was free before you got the ball?"',
    makeEasier:'Bigger square, as many touches as you like', makeHarder:'Two touches inside, one touch for neutrals',
    checksNote:'Clean Sheet checks: ball losses in our half and moves of 6+ passes, from the match camera',
    basedOn:'Based on: the positional rondo (4 v 4 + 3) used widely in youth academies' },
  { id:'2',  name:'Play out from the keeper, 6 v 4', category:'First touch',      time:20, players:'10 players', phases:['skill'], area:'30 × 25 m', featured:true, isOurs:true, tags:['Curriculum'],
    whySuggested:'Checks: goal kicks played short and ball losses in our third.' },
  { id:'3',  name:'First touch away from pressure',   category:'First touch',      time:15, players:'Groups of 3', phases:['skill'], featured:true, tags:['Curriculum'],
    whySuggested:'Checks: first touches under pressure.' },
  { id:'4',  name:'FIFA 11+ Kids warm-up',            category:'Warm-up',          time:20, players:'11 players', phases:['skill','discovery'], tags:['Tested in trials'] },
  { id:'5',  name:'Perform+ warm-up',                 category:'Warm-up',          time:10, players:'Any',        phases:['skill','discovery'], tags:['Tested in trials'] },
  { id:'6',  name:'Ball mastery square',              category:'First touch',      time:15, players:'Any',        phases:['skill'], tags:['Curriculum'] },
  { id:'8',  name:'Recognition game: 4 v 4 + 2',     category:'First touch',      time:10, players:'10 players', phases:['skill'], tags:['Research-backed'] },
  { id:'9',  name:'Receive and turn, 3 v 1 lanes',   category:'First touch',      time:15, players:'9 players',  phases:['skill'], tags:['Curriculum'] },
  { id:'10', name:'Through the gates',               category:'Striking the ball', time:12, players:'Any',       phases:['skill'], tags:['Curriculum'] },
  { id:'11', name:'Shoot on sight, 3 v 3',           category:'Striking the ball', time:15, players:'9 players', phases:['skill'], tags:['Research-backed'] },
  { id:'12', name:'Finishing, 2 v 1 to goal',        category:'Striking the ball', time:15, players:'10 players',phases:['skill'], tags:[] },
  { id:'13', name:'Run the line, end zone',           category:'Running with the ball', time:15, players:'12 players', phases:['skill'], tags:[] },
  { id:'14', name:'1 v 1 to gates',                 category:'1 v 1',            time:15, players:'8–12 players',phases:['skill'], tags:[] },
  { id:'15', name:'Defending 1 v 1, delay',         category:'1 v 1',            time:12, players:'8 players',  phases:['skill'], tags:[] },
  { id:'s1', name:'Free game 9 v 9',                category:'Games',            time:20, players:'18 players', phases:['skill'], tags:['Curriculum'] },

  // ── Game Training 12–16 ───────────────────────────────────────────────────
  { id:'g1', name:'Win it back in 6 seconds',        category:'Team movements',   time:25, players:'12 players', phases:['game'], tags:['Research-backed'],
    whySuggested:'Checks: time to win the ball back after losing it in our half.' },
  { id:'g2', name:'Three-zone press, 9 v 9',         category:'Team movements',   time:20, players:'18 players', phases:['game'], tags:['Curriculum'] },
  { id:'g3', name:'Press trigger game, 5 v 5',       category:'Team movements',   time:20, players:'10 players', phases:['game'], tags:['Curriculum'] },
  { id:'g4', name:'Transition game, no GK',          category:'Team movements',   time:20, players:'14 players', phases:['game'], tags:[] },
  { id:'g5', name:'Switch the play, 5 v 3',          category:'Running with the ball', time:15, players:'12 players', phases:['game'], tags:['Research-backed'] },
  { id:'g6', name:'Crossing and finishing, wide',    category:'Striking the ball', time:18, players:'12 players', phases:['game'], tags:[] },
  { id:'g7', name:'Defensive shape, 11 v 11 zones', category:'Team movements',   time:30, players:'22 players', phases:['game'], tags:['Curriculum'] },
  { id:'g8', name:'Set piece: corner kick delivery', category:'Set pieces',       time:15, players:'14 players', phases:['game'], tags:[] },
  { id:'g9', name:'Set piece: free kick shape',      category:'Set pieces',       time:12, players:'14 players', phases:['game'], tags:[] },
  { id:'g10',name:'Recovery run race, 2 v 1',       category:'Running with the ball', time:12, players:'10 players', phases:['game'], tags:[] },
  { id:'g11',name:'Small-sided game, tight shape',  category:'Games',            time:25, players:'10 players', phases:['game'], tags:['Research-backed'] },
  { id:'g12',name:'2 v 2 + 2 to goal, wide',       category:'Striking the ball', time:15, players:'12 players', phases:['game'], tags:[] },

  // ── Performance 16+ ───────────────────────────────────────────────────────
  { id:'p1', name:'Phase of play: build-up',         category:'Team movements',   time:30, players:'16 players', phases:['performance'], tags:['Curriculum'] },
  { id:'p2', name:'High press structure, 4-3-3',    category:'Team movements',   time:25, players:'18 players', phases:['performance'], tags:['Curriculum'] },
  { id:'p3', name:'Attacking patterns from wide',   category:'Running with the ball', time:20, players:'14 players', phases:['performance'], tags:['Research-backed'] },
  { id:'p4', name:'Counter-attack, 3 v 2 to goal', category:'Games',            time:15, players:'10 players', phases:['performance'], tags:[] },
  { id:'p5', name:'Set piece: delivery & movement', category:'Set pieces',       time:20, players:'16 players', phases:['performance'], tags:['Curriculum'] },
  { id:'p6', name:'Match scenario: winning 1–0',    category:'Games',            time:25, players:'22 players', phases:['performance'], tags:[] },
  { id:'p7', name:'Possession: break the press',    category:'First touch',      time:20, players:'14 players', phases:['performance'], tags:['Research-backed'] },
  { id:'p8', name:'Defensive transitions, 11 v 11',category:'Team movements',   time:30, players:'22 players', phases:['performance'], tags:['Curriculum'] },
  { id:'p9', name:'1 v 1 finishing, angle runs',   category:'Striking the ball', time:15, players:'12 players', phases:['performance'], tags:[] },
  { id:'p10',name:'Full 11 v 11 shape session',    category:'Games',            time:45, players:'22 players', phases:['performance'], tags:['Curriculum'] },
]

export const FIX_ITEMS = [
  { label:'Gave the ball away in our half', stat:'21 times · aim under 12' },
  { label:'Slow to win it back',            stat:'7 seconds · aim under 4' },
  { label:'Gap between defence and midfield', stat:'26 m · aim under 18 m' },
]

type Dot = [number, number, string]
export const LAYOUTS: Record<string, Dot[]> = {
  '1':  [[.2,.2,'g'],[.5,.15,'g'],[.8,.2,'g'],[.2,.8,'g'],[.5,.85,'g'],[.8,.8,'g'],[.35,.5,'r'],[.65,.5,'r'],[.5,.3,'r'],[.5,.65,'k']],
  '2':  [[.12,.5,'g'],[.3,.3,'g'],[.3,.7,'g'],[.5,.2,'g'],[.5,.5,'g'],[.5,.8,'g'],[.7,.35,'r'],[.7,.65,'r'],[.82,.25,'r'],[.82,.75,'r']],
  '3':  [[.3,.5,'g'],[.6,.3,'g'],[.6,.7,'g']],
  '4':  [[.3,.4,'g'],[.5,.2,'g'],[.7,.4,'g'],[.5,.7,'g'],[.5,.5,'r']],
  '5':  [[.2,.3,'g'],[.2,.7,'g'],[.5,.5,'g'],[.8,.3,'r'],[.8,.7,'r']],
  '6':  [[.2,.5,'g'],[.4,.3,'g'],[.4,.7,'g'],[.65,.3,'r'],[.65,.7,'r']],
  'd1': [[.3,.3,'g'],[.5,.5,'g'],[.7,.3,'g'],[.5,.7,'g']],
  'd2': [[.2,.5,'g'],[.4,.3,'g'],[.6,.5,'g'],[.8,.3,'g']],
  'd3': [[.3,.5,'g'],[.7,.5,'g']],
  'd4': [[.2,.3,'g'],[.2,.7,'g'],[.4,.5,'g'],[.6,.3,'r'],[.6,.7,'r'],[.8,.5,'r']],
  'd5': [[.3,.5,'g'],[.6,.5,'r']],
  'd6': [[.2,.5,'g'],[.4,.4,'g'],[.6,.6,'g'],[.8,.5,'g']],
  'd7': [[.2,.3,'g'],[.4,.3,'g'],[.6,.3,'g'],[.8,.3,'g'],[.3,.7,'g'],[.5,.7,'g'],[.7,.7,'g']],
  'd8': [[.25,.5,'g'],[.45,.35,'g'],[.65,.5,'r'],[.75,.35,'r']],
  'd9': [[.3,.5,'g'],[.5,.3,'g'],[.7,.5,'g'],[.5,.7,'g']],
  'd10':[[.2,.3,'g'],[.2,.7,'g'],[.5,.5,'g'],[.7,.3,'r'],[.7,.7,'r'],[.9,.5,'r']],
  '8':  [[.2,.3,'r'],[.2,.5,'r'],[.2,.7,'r'],[.5,.4,'g'],[.5,.6,'g'],[.72,.5,'g']],
  '9':  [[.2,.3,'g'],[.2,.7,'g'],[.5,.5,'g'],[.72,.35,'r'],[.72,.65,'r']],
  '10': [[.3,.4,'g'],[.5,.2,'g'],[.7,.4,'g'],[.5,.7,'g'],[.5,.5,'r']],
  '11': [[.25,.5,'g'],[.45,.35,'g'],[.62,.5,'r'],[.82,.5,'k']],
  '12': [[.25,.5,'g'],[.45,.3,'g'],[.62,.5,'r'],[.82,.5,'k']],
  '13': [[.15,.3,'g'],[.15,.7,'g'],[.4,.2,'g'],[.4,.5,'g'],[.4,.8,'g'],[.6,.35,'r'],[.6,.65,'r'],[.78,.5,'r']],
  '14': [[.3,.5,'g'],[.65,.5,'r']],
  '15': [[.3,.5,'g'],[.65,.5,'r']],
  's1': [[.15,.3,'g'],[.15,.7,'g'],[.3,.5,'g'],[.5,.3,'g'],[.5,.7,'g'],[.65,.5,'g'],[.8,.3,'r'],[.8,.7,'r'],[.95,.5,'r']],
  'g1': [[.2,.3,'r'],[.2,.5,'r'],[.2,.7,'r'],[.5,.4,'g'],[.5,.6,'g'],[.72,.5,'g']],
  'g2': [[.15,.5,'g'],[.3,.3,'g'],[.3,.7,'g'],[.5,.4,'g'],[.5,.6,'g'],[.65,.35,'r'],[.65,.65,'r'],[.8,.5,'r']],
  'g3': [[.2,.3,'g'],[.2,.7,'g'],[.5,.5,'g'],[.72,.35,'r'],[.72,.65,'r']],
  'g4': [[.2,.3,'g'],[.2,.7,'g'],[.4,.5,'g'],[.6,.5,'r'],[.8,.3,'r'],[.8,.7,'r']],
  'g5': [[.15,.3,'g'],[.15,.7,'g'],[.4,.2,'g'],[.4,.5,'g'],[.4,.8,'g'],[.6,.35,'r'],[.6,.65,'r'],[.78,.5,'r']],
  'g6': [[.1,.5,'g'],[.3,.3,'g'],[.5,.5,'g'],[.6,.2,'g'],[.75,.4,'r'],[.9,.5,'r']],
  'g7': [[.15,.2,'g'],[.15,.5,'g'],[.15,.8,'g'],[.5,.2,'g'],[.5,.5,'g'],[.5,.8,'g'],[.75,.2,'r'],[.75,.5,'r'],[.75,.8,'r']],
  'g8': [[.2,.5,'g'],[.4,.2,'g'],[.4,.8,'g'],[.6,.4,'g'],[.6,.6,'g'],[.8,.3,'r'],[.8,.7,'r']],
  'g9': [[.2,.3,'g'],[.2,.7,'g'],[.4,.5,'g'],[.6,.3,'r'],[.6,.7,'r'],[.8,.5,'r']],
  'g10':[[.2,.5,'g'],[.45,.35,'g'],[.65,.5,'r']],
  'g11':[[.2,.3,'g'],[.2,.7,'g'],[.5,.5,'g'],[.72,.35,'r'],[.72,.65,'r']],
  'g12':[[.2,.3,'g'],[.4,.5,'g'],[.6,.3,'r'],[.8,.5,'r']],
  'p1': [[.1,.5,'g'],[.25,.3,'g'],[.25,.7,'g'],[.45,.2,'g'],[.45,.5,'g'],[.45,.8,'g'],[.65,.35,'r'],[.65,.65,'r'],[.8,.5,'r']],
  'p2': [[.15,.3,'g'],[.15,.7,'g'],[.3,.5,'g'],[.5,.2,'g'],[.5,.5,'g'],[.5,.8,'g'],[.7,.35,'r'],[.7,.65,'r'],[.85,.5,'r']],
  'p3': [[.1,.2,'g'],[.3,.3,'g'],[.5,.5,'g'],[.7,.3,'g'],[.85,.2,'r'],[.85,.5,'r']],
  'p4': [[.2,.5,'g'],[.4,.35,'g'],[.4,.65,'g'],[.65,.5,'r'],[.85,.5,'r']],
  'p5': [[.2,.3,'g'],[.2,.7,'g'],[.4,.5,'g'],[.6,.2,'g'],[.6,.8,'g'],[.8,.5,'r']],
  'p6': [[.15,.2,'g'],[.15,.5,'g'],[.15,.8,'g'],[.4,.35,'g'],[.4,.65,'g'],[.65,.2,'r'],[.65,.5,'r'],[.65,.8,'r'],[.9,.5,'r']],
  'p7': [[.2,.3,'g'],[.2,.7,'g'],[.5,.5,'g'],[.72,.35,'r'],[.72,.65,'r']],
  'p8': [[.15,.2,'g'],[.15,.5,'g'],[.15,.8,'g'],[.5,.2,'g'],[.5,.5,'g'],[.5,.8,'g'],[.75,.2,'r'],[.75,.5,'r'],[.75,.8,'r']],
  'p9': [[.2,.5,'g'],[.45,.3,'g'],[.65,.5,'r'],[.85,.5,'k']],
  'p10':[[.1,.2,'g'],[.1,.5,'g'],[.1,.8,'g'],[.35,.35,'g'],[.35,.65,'g'],[.6,.2,'r'],[.6,.5,'r'],[.6,.8,'r'],[.85,.35,'r'],[.85,.65,'r']],
}
export const PASS_LINES: Record<string, [number,number,number,number][]> = {
  '1': [[.2,.2,.35,.5],[.35,.5,.5,.3]],
  '2': [[.12,.5,.3,.3],[.3,.3,.5,.2]],
  '3': [[.3,.5,.6,.3]],
  '11': [[.25,.5,.45,.35]],
  'p4': [[.2,.5,.4,.35],[.4,.35,.65,.5]],
  'g5': [[.15,.3,.4,.2]],
}

export const PHASE_LABEL_TO_ID: Record<string, AgePhase | null> = {
  'Discovery 5–9':          'discovery',
  'Skill Acquisition 9–12': 'skill',
  'Game Training 12–16':    'game',
  'Performance 16+':        'performance',
  'All':                    null,
  '5–9':                    'discovery',
  '9–12':                   'skill',
  '12–16':                  'game',
  '16+':                    'performance',
  'All ages':               null,
}
