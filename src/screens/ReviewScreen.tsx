const STYLE_POINTS = [
  { label: 'Goal kicks played short',           value: '64%',  aim: '70%+',   status: 'off-target' },
  { label: 'Wins of the ball in their half',    value: '13',   aim: 'on target', status: 'on-target' },
  { label: 'Shots within 10 s of winning it',  value: '3',    aim: 'on target', status: 'on-target' },
  { label: 'Passes we let them make before a challenge', value: 'under 10', aim: 'under 10', status: 'on-target' },
  { label: 'Seconds to win it back',            value: '7 s',  aim: 'usual is 4 s', status: 'off-target' },
  { label: 'Won back within 6 seconds',         value: '40%+', aim: '40%+',   status: 'on-target' },
  { label: 'Minutes shared evenly',             value: '15 of 16', aim: 'all within 20%', status: 'close' },
  { label: 'Weaker-foot touches',               value: '18%',  aim: 'aim 20%+', status: 'close' },
]

const WORK_ON = [
  { label: 'Win the ball back faster',    value: '7 s',  clip: 'Min 16', note: 'One player pressed, the rest watched.' },
  { label: 'Keep defence and midfield closer', value: '26 m', clip: 'Min 29', note: 'Gap before 6 of their 8 chances.' },
  { label: 'Stay strong in the last 15 minutes', value: '−22%', clip: 'Min 41', note: 'Sprints dropped 22% after min 35.' },
]

const WHAT_WENT_WELL = [
  { player: 'Zoe to Jai to Mia', min: 'Min 37',  text: 'Win it, go, goal in 8 seconds' },
  { player: '',                   min: 'Min 9',   text: 'Eight passes out from the keeper · through their press' },
  { player: 'Mia',               min: 'Min 22',  text: 'Front three force the mistake · won in their half, shot 6 later' },
  { player: '',                   min: 'Min 47',  text: "Mia's goal, 3–1 · weaker foot, low across the keeper" },
]

const PLAYERS_TO_KNOW = [
  { ini: 'MT', name: 'Mia Tran',    chip: 'Star',    chipColor: '#40826d', note: 'Goal on her weaker foot. 4 scans before receiving.' },
  { ini: 'LM', name: 'Leo Marsh',   chip: 'Minutes', chipColor: '#4a5a57', note: '27 min, below his fair share. Start him Saturday.' },
  { ini: 'EB', name: 'Ella Brandt', chip: 'Wellness',chipColor: '#c39797', note: 'Felt low two days running. Quick chat tonight.' },
]

export default function ReviewScreen() {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Game header */}
      <div style={{ flex: 'none', background: '#2f6252', color: '#ffffff', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>3–1</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Won away at Ironbark United</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Sat 31 Oct · Mia, Jai and Zoe scored · 24 key clips</div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Good data for 47 of 50 min</span>
        <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          Highlights · 4 min
        </button>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', overflow: 'hidden' }}>

        {/* Left */}
        <div style={{ overflowY: 'auto', padding: '16px 28px 24px' }}>

          {/* How we played our style */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>How we played our style</span>
              <button style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Our style →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {STYLE_POINTS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
                  <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: s.status === 'on-target' ? '#40826d' : s.status === 'close' ? '#cbbeb5' : '#c39797' }} />
                  <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '19px' }}>{s.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f', flexShrink: 0 }}>{s.value}</span>
                  <span style={{ fontSize: 12, color: '#4a5a57', flexShrink: 0 }}>aim {s.aim}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', flexShrink: 0,
                    background: s.status === 'on-target' ? '#eef5f2' : s.status === 'close' ? '#f0f1ef' : '#fdf0ee',
                    color: s.status === 'on-target' ? '#2f6252' : s.status === 'close' ? '#4a5a57' : '#7a3030',
                  }}>{s.status === 'on-target' ? 'On target' : s.status === 'close' ? 'Close' : 'Off target'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work on this week */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Work on this week</span>
              <span style={{ fontSize: 13, color: '#4a5a57' }}>In Thursday's plan</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {WORK_ON.map((w, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '12px 14px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 48px', gap: 10, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ flex: 'none', width: 36, height: 24, borderRadius: 6, background: '#2f6252', color: '#ffffff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{w.clip}</span>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{w.label}</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{w.note}</span>
                  </div>
                  <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'right', color: '#10211f' }}>{w.value}</span>
                </div>
              ))}
            </div>
            <button style={{ marginTop: 10, height: 44, padding: '0 20px', borderRadius: 12, border: '1px solid #2f6252', background: '#ffffff', color: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Open Thursday's plan →
            </button>
          </div>

          {/* What went well */}
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, display: 'block', marginBottom: 10 }}>What went well</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {WHAT_WENT_WELL.map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef', fontSize: 14, lineHeight: '20px' }}>
                  <span style={{ flex: 'none', width: 48, fontSize: 12, fontWeight: 700, color: '#40826d', paddingTop: 2 }}>{w.min}</span>
                  <span style={{ flexGrow: 1 }}>{w.text}{w.player && <span style={{ color: '#4a5a57' }}> · {w.player}</span>}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: players to know */}
        <div style={{ borderLeft: '1px solid #e9eae8', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', background: '#fafafa' }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Players to know about</span>
          <span style={{ fontSize: 12, color: '#4a5a57' }}>From Saturday and this week's check-ins</span>
          {PLAYERS_TO_KNOW.map((p, i) => (
            <div key={i} style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: '#c39797', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>{p.ini}</span>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: '999px', background: p.chipColor + '22', color: p.chipColor }}>{p.chip}</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{p.note}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Minutes played (fair share 37)</span>
            {[
              { ini: 'MT', name: 'Mia Tran',   mins: 44, bar: '#c39797' },
              { ini: 'JP', name: 'Jai Patel',  mins: 43, bar: '#cbbeb5' },
              { ini: 'ZH', name: 'Zoe Hartley',mins: 39, bar: '#cbbeb5' },
              { ini: 'EB', name: 'Ella Brandt', mins: 38, bar: '#cbbeb5' },
              { ini: 'NO', name: 'Noah Okafor', mins: 37, bar: '#cbbeb5' },
              { ini: 'AL', name: 'Ava L.',      mins: 36, bar: '#7fb09d' },
              { ini: 'GO', name: 'Grace Owusu', mins: 34, bar: '#7fb09d' },
              { ini: 'LM', name: 'Leo Marsh',   mins: 27, bar: '#c39797' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', width: 20 }}>{p.ini}</span>
                <div style={{ flexGrow: 1, height: 8, borderRadius: 4, background: '#e9eae8', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: 8, borderRadius: 4, background: p.bar, width: `${(p.mins/50)*100}%` }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, width: 24, textAlign: 'right' }}>{p.mins}</span>
              </div>
            ))}
            <button style={{ marginTop: 8, fontSize: 13, color: '#2f6252', fontWeight: 600, border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>All 16 players →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
