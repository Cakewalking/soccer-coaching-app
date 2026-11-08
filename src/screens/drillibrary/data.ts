export const G     = '#2f6252'
export const G2    = '#40826d'
export const GD    = '#1f4a3e'
export const ROSE  = '#c39797'
export const INK   = '#10211f'
export const MUT   = '#4a5a57'
export const LN    = '#e8edeb'

export interface Drill {
  id: string
  name: string
  category: string
  time: number
  players: string
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
  { id:'1', name:'4 v 4 + 3 keep-ball', category:'First touch', time:15, players:'11 players', area:'30 × 25 m', ages:'Skill Acquisition · 9 to 12', intensity:'High', workRest:'4 × 3 min, 1 min rest', kitStr:'Balls, bibs, cones', featured:true, tags:['Curriculum'],
    aim:'Keep the ball with more players: scan, open up, find the free player.',
    whySuggested:'Saturday vs Ironbark United: gave the ball away in our half, 21 times. We aim for under 12.',
    howItWorks:['Two teams of 4 inside the square. 3 neutral players, one at each end and one in the middle, always play for the team with the ball. That makes it 7 v 4.','Make 6 passes in a row for a point.','Lose it and the other team is straight on the ball.'],
    coachingPoints:['Open your body so you can see both ends','Check your shoulder before the ball arrives','Pass to the free player, not the nearest one'],
    keyWords:['Scan','Free player'],
    askPlayers:'"Who was free before you got the ball?"',
    makeEasier:'Bigger square, as many touches as you like', makeHarder:'Two touches inside, one touch for neutrals',
    checksNote:'Clean Sheet checks: ball losses in our half and moves of 6+ passes, from the match camera',
    basedOn:'Based on: the positional rondo (4 v 4 + 3) used widely in youth academies' },
  { id:'2',  name:'Play out from the keeper, 6 v 4', category:'First touch', time:20, players:'10 players', area:'30 × 25 m', ages:'U10+', featured:true, tags:['Curriculum'],
    whySuggested:'Checks: goal kicks played short and ball losses in our third.' },
  { id:'3',  name:'First touch away from pressure', category:'First touch', time:15, players:'Groups of 3', ages:'9 to 12', featured:true, tags:['Curriculum'],
    whySuggested:'Checks: first touches under pressure.' },
  { id:'4',  name:'FIFA 11+ Kids warm-up',         category:'Warm-up',      time:20, players:'11 players', tags:['Tested in trials'] },
  { id:'5',  name:'Perform+ warm-up',              category:'Warm-up',      time:10, players:'Any',         tags:['Tested in trials'] },
  { id:'6',  name:'Ball mastery square',           category:'First touch',  time:15, players:'Any',         tags:['Curriculum'] },
  { id:'7',  name:'First touch away from p…',      category:'First touch',  time:15, players:'Groups of 3', tags:['Curriculum'] },
  { id:'8',  name:'Recognition game: 4 …',         category:'First touch',  time:10, players:'10 players',  tags:['Research-backed'] },
  { id:'9',  name:'Receive and turn, 3 v…',        category:'First touch',  time:15, players:'9 players',   tags:['Curriculum'] },
  { id:'10', name:'Through the gates',             category:'Striking the ball', time:12, players:'Any',    tags:['Curriculum'] },
  { id:'11', name:'Shoot on sight, 3 v 3',         category:'First touch',  time:15, players:'9 players',   tags:['Research-backed'] },
  { id:'12', name:'Finishing, 2 v 1 to goal',      category:'Striking the ball', time:15, players:'10 players', tags:[] },
  { id:'13', name:'Run the line, end zon…',        category:'Running with the ball', time:15, players:'12 players', tags:[] },
  { id:'14', name:'1 v 1 to gates',               category:'1 v 1',        time:15, players:'8–12 players', tags:[] },
  { id:'15', name:'Defending 1 v 1, dela…',       category:'1 v 1',        time:12, players:'8 players',   tags:[] },
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
  '7':  [[.3,.5,'g'],[.6,.3,'g'],[.6,.7,'g']],
  '8':  [[.2,.3,'r'],[.2,.5,'r'],[.2,.7,'r'],[.5,.4,'g'],[.5,.6,'g'],[.72,.5,'g']],
  '9':  [[.2,.3,'g'],[.2,.7,'g'],[.5,.5,'g'],[.72,.35,'r'],[.72,.65,'r']],
  '10': [[.3,.4,'g'],[.5,.2,'g'],[.7,.4,'g'],[.5,.7,'g'],[.5,.5,'r']],
  '11': [[.25,.5,'g'],[.45,.35,'g'],[.62,.5,'r'],[.82,.5,'k']],
  '12': [[.25,.5,'g'],[.45,.3,'g'],[.62,.5,'r'],[.82,.5,'k']],
  '13': [[.15,.3,'g'],[.15,.7,'g'],[.4,.2,'g'],[.4,.5,'g'],[.4,.8,'g'],[.6,.35,'r'],[.6,.65,'r'],[.78,.5,'r']],
  '14': [[.3,.5,'g'],[.65,.5,'r']],
  '15': [[.3,.5,'g'],[.65,.5,'r']],
}
export const PASS_LINES: Record<string, [number,number,number,number][]> = {
  '1': [[.2,.2,.35,.5],[.35,.5,.5,.3]],
  '2': [[.12,.5,.3,.3],[.3,.3,.5,.2]],
  '3': [[.3,.5,.6,.3]],
  '11': [[.25,.5,.45,.35]],
}
