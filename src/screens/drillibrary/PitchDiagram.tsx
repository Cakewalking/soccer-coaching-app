import { G, ROSE, LAYOUTS, PASS_LINES } from './data'

export default function PitchDiagram({ id, w = 110, h = 72 }: { id: string; w?: number; h?: number }) {
  const pts = LAYOUTS[id] ?? [[.3,.4,'g'],[.6,.4,'r']]
  const lines = PASS_LINES[id] ?? []
  const r = Math.min(w, h) * 0.072
  return (
    <svg width={w} height={h} style={{ display:'block', background:'#eef4f1', borderRadius:5 }}>
      <rect x={w*.08} y={h*.1} width={w*.84} height={h*.8} rx={2} fill="none" stroke="#c5d4cd" strokeWidth={1} strokeDasharray="3 2"/>
      {lines.map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={w*x1} y1={h*y1} x2={w*x2} y2={h*y2} stroke={G} strokeWidth={1.2} strokeDasharray="4 2" opacity={.6}/>
      ))}
      {pts.map(([x,y,t], i) => (
        <circle key={i} cx={w*x} cy={h*y} r={r}
          fill={t==='g'?G : t==='r'?ROSE : t==='k'?'#1a1a1a' : '#888'}
          stroke="#fff" strokeWidth={.8}/>
      ))}
    </svg>
  )
}
