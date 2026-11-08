import { useState } from 'react'
import { CLIPS, CLIPS_GAMES, CLIPS_MEASURES, type GameClip } from '../data'

type FilterMode = 'game' | 'measure' | 'player'
type TypeFilter = 'all' | 'good' | 'work'

function ClipsEmpty({ activeTab }: { activeTab: number }) {
  if (activeTab === 1) {
    return (
      <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
        <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Playlists and shared clips</h1>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>Nothing yet</span>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
              {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />)}
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Save the clips that teach</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Group clips into playlists for team talks, or send a clip to one player with a note. They arrive after your first recorded game.</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#fff"/></svg>
                  Record your first game
                </button>
                <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
              </div>
            </div>
          </div>
          {[65, 50, 60, 45, 55, 48].map((w, i) => (
            <div key={i} style={{ height: 44, border: '1px dashed #c5c8c4', borderRadius: 10, marginBottom: 6, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
            </div>
          ))}
        </div>
        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>What you'll see</div>
          {[
            { icon: 'M4 6h16M4 12h8M4 18h12', title: 'Playlists for team talks', body: 'Build once, reuse' },
            { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', title: 'Clips sent to players', body: 'Parents see them too' },
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944', title: 'No-consent players blurred', body: 'Never in shared clips' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Clips of a player whose parents said no to filming are never shared.</div>
        </aside>
      </main>
    )
  }

  if (activeTab === 3) {
    return (
      <main style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 14 }}>
          <span style={{ width: 48, height: 48, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Nothing to check</div>
          <div style={{ fontSize: 14, color: '#4a5a57', textAlign: 'center', lineHeight: '20px', maxWidth: 320 }}>After each recorded game, the few moments Clean Sheet isn't sure about wait here for a quick yes or no from you.</div>
          <button style={{ height: 40, padding: '0 20px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#fff"/></svg>
            Record your first game
          </button>
        </div>
        <aside style={{ borderLeft: '1px solid #e9eae8', padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 14, background: '#fafafa', overflowY: 'auto' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>What lands here</div>
          {[
            { title: 'Close calls', body: 'Was it a win of the ball, a shot, a goal?' },
            { title: "Who's who", body: "When a shirt number can't be read." },
            { title: 'Anything you report', body: 'Tap "Something look wrong?" on any number.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: '#10211f', color: '#ffffff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
              </div>
            </div>
          ))}
        </aside>
      </main>
    )
  }

  // Browse (tab 0) or Shared with players (tab 2) empty
  const measures = ['Pressing high', 'Winning it back', 'Building out', 'Counter-attacks']
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Clips</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>No clips yet</span>
        </div>
        <div style={{ flexGrow: 1 }} />
        <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4-4 4M12 4v12"/></svg>
          Upload a video
        </button>
        <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#fff"/></svg>
          Record a game
        </button>
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, padding: '14px 28px 18px', overflow: 'hidden' }}>
        <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
              {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />)}
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#40826d', marginBottom: 6 }}>Your first clips</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Clips find themselves</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>After each recorded game, Clean Sheet cuts out the key moments and tags them to your style: pressing, building out, goals and more.</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', title: 'Record a game', body: 'The XbotGo camera films it. Clips are ready about 25 minutes after.', btn: 'Record' },
                  { icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4-4 4M12 4v12', title: 'Upload a video', body: 'Any phone or camera recording of a full game or training.', btn: 'Upload' },
                  { icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zM8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72', title: 'Connect the camera', body: 'Pair your XbotGo Falcon so games come in on their own.', btn: 'Connect' },
                ].map(opt => (
                  <div key={opt.title} style={{ background: '#f7f8f7', borderRadius: 10, padding: '12px 12px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5a57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 6 }} aria-hidden="true"><path d={opt.icon}/></svg>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{opt.title}</div>
                    <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px', marginBottom: 8 }}>{opt.body}</div>
                    <button style={{ height: 30, padding: '0 12px', borderRadius: 8, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{opt.btn}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Browse by game, measure or player</div>
              <span style={{ fontSize: 13, color: '#4a5a57' }}>Measures come from your style</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {measures.map((m, i) => (
                <div key={i} style={{ padding: '6px 12px', borderRadius: '999px', background: '#f0f1ef', fontSize: 13, fontWeight: 600, color: '#4a5a57' }}>
                  {m} <span style={{ color: '#6f7f7b' }}>0 clips</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {[0,1,2,3,4,5,6,7].map(i => (
                <div key={i} style={{ aspectRatio: '16/10', border: '1px dashed #c5c8c4', borderRadius: 10, background: '#f7f8f7' }} />
              ))}
            </div>
          </div>
        </div>

        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>How clips work</div>
          {[
            { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Found for you', body: 'Every press, build-up, counter and goal is cut out of the full match.' },
            { icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', title: 'Tagged to your style', body: 'Each clip is linked to a measure, so you can see good examples and ones to work on.' },
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Checked by you', body: 'Anything Clean Sheet is unsure about waits in To check.' },
            { icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', title: 'Shared safely', body: 'Players only get clips if their parent agreed. Other players are blurred.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Full match video is deleted after 90 days. Clips you keep stay until the end of the season.</div>
        </aside>
      </div>
    </div>
  )
}

const PLAYERS = [
  { ini: 'MT', name: 'Mia',  fullName: 'Mia Tran'   },
  { ini: 'NO', name: 'Noah', fullName: 'Noah Owen'   },
  { ini: 'EB', name: 'Ella', fullName: 'Ella Brandt' },
  { ini: 'JP', name: 'Jai',  fullName: 'Jai Patel'   },
  { ini: 'ZH', name: 'Zoe',  fullName: 'Zoe Hartley' },
]

const GAME_FULL: Record<string, { title: string; sub: string }> = {
  ironbark:  { title: 'Ironbark United · Sat 31 Oct · Won 3–1',  sub: 'Full match recorded · highlights are 4 min · review ready' },
  saltmarsh: { title: 'Saltmarsh FC · Sat 24 Oct · Lost 1–2',    sub: 'Full match recorded · highlights are 3 min' },
  northgate: { title: 'Northgate FC · Sat 17 Oct · Drew 1–1',    sub: 'Full match recorded · highlights are 2 min' },
  bayside:   { title: 'Bayside FC · Sat 10 Oct · Won 2–0',       sub: 'Full match recorded · highlights are 4 min' },
}

const MEASURE_INFO: Record<string, string> = {
  'Pressing high':     'Our target 5 wins a game · last 4 games avg 4 · from Our style',
  'Winning it back':   'Our target under 6 s · last 4 games avg 7 s · from Our style',
  'Building out':      'Our target 8 passes a game · last 4 games avg 7 · from Our style',
  'Counter-attacks':   'Our target 2 goals a game · from Our style',
  'Gap between lines': 'Our target under 20 m · last 4 games avg 26 m · from Our style',
  'Won in their half': 'Our target 12 a game · last 4 games 10 a game · from Our style',
}

function resultColor(r: 'W' | 'L' | 'D') {
  if (r === 'W') return { bg: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { bg: '#c39797', color: '#10211f' }
  return { bg: '#e9eae8', color: '#10211f' }
}

function PitchThumb({ type, measures }: { type: GameClip['type']; measures: string[] }) {
  const color = type === 'good' ? '#2f6252' : '#9d7c80'
  const isMid = measures.includes('Building out')
  const isHigh = measures.includes('Pressing high') || measures.includes('Won in their half')
  return (
    <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 8, background: '#10211f', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="4" y="4" width="152" height="92" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
        <line x1="80" y1="4" x2="80" y2="96" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <circle cx="80" cy="50" r="12" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
        {isHigh && <>
          <circle cx="40" cy="25" r="4" fill={color} opacity="0.9"/>
          <circle cx="60" cy="20" r="4" fill={color} opacity="0.9"/>
          <circle cx="50" cy="35" r="4" fill="rgba(255,255,255,0.4)" opacity="0.9"/>
          <line x1="40" y1="25" x2="50" y2="35" stroke={color} strokeWidth="1.5" opacity="0.7"/>
        </>}
        {isMid && <>
          <circle cx="80" cy="50" r="4" fill={color} opacity="0.9"/>
          <circle cx="60" cy="45" r="4" fill={color} opacity="0.9"/>
          <circle cx="100" cy="55" r="4" fill="rgba(255,255,255,0.4)" opacity="0.9"/>
          <line x1="60" y1="45" x2="80" y2="50" stroke={color} strokeWidth="1.5" opacity="0.7"/>
        </>}
        {!isHigh && !isMid && <>
          <circle cx="120" cy="30" r="4" fill={color} opacity="0.9"/>
          <circle cx="110" cy="50" r="4" fill={color} opacity="0.9"/>
          <circle cx="130" cy="50" r="4" fill="rgba(255,255,255,0.4)" opacity="0.9"/>
        </>}
      </svg>
      <div style={{
        position: 'absolute', top: 6, left: 6,
        background: type === 'good' ? 'rgba(64,130,109,0.9)' : 'rgba(157,124,128,0.9)',
        color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '2px 6px',
      }}>{type === 'good' ? 'Good example' : 'To work on'}</div>
    </div>
  )
}

function ClipCard({ clip, selected, onClick }: { clip: GameClip; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', gap: 8, padding: 12,
      border: `1.5px solid ${selected ? '#40826d' : '#e9eae8'}`,
      borderRadius: 12, background: selected ? '#f0f8f4' : '#ffffff',
      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
    }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <PitchThumb type={clip.type} measures={clip.measures} />
        <span style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 11, borderRadius: 4, padding: '2px 6px' }}>{clip.duration}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f', lineHeight: '17px' }}>{clip.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 11, color: '#6f7f7b' }}>{clip.gameLabel} · min {clip.min}</span>
        {clip.taggedBy && <span style={{ fontSize: 11, background: '#e8f2ee', color: '#2f6252', borderRadius: 4, padding: '1px 5px', fontWeight: 600 }}>Tagged by you</span>}
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {clip.players.map(ini => (
          <span key={ini} style={{ width: 24, height: 24, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{ini}</span>
        ))}
      </div>
    </button>
  )
}

function ClipDetail({ clip }: { clip: GameClip }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}>
        <PitchThumb type={clip.type} measures={clip.measures} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: '#6f7f7b' }}>Min {clip.min}</span>
          <span style={{ width: 1, height: 12, background: '#e9eae8', display: 'block' }} />
          <span style={{ fontSize: 13, color: '#6f7f7b' }}>{clip.duration}</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', lineHeight: '23px', marginBottom: 8 }}>{clip.title}</div>
        <div style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57', marginBottom: 10 }}>{clip.desc}</div>
      </div>
      {clip.stat1Label && (
        <div style={{ background: '#f7f8f7', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#4a5a57' }}>{clip.stat1Value}</span>
            <span style={{ fontWeight: 700, color: '#10211f' }}>{clip.stat1Label}</span>
          </div>
          {clip.stat2Label && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#4a5a57' }}>{clip.stat2Value}</span>
            <span style={{ fontWeight: 700, color: '#10211f' }}>{clip.stat2Label}</span>
          </div>}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {clip.measures.map(m => (
          <span key={m} style={{ background: '#e8f2ee', color: '#2f6252', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>{m}</span>
        ))}
        <span style={{ background: '#f7f8f7', border: '1px solid #e9eae8', color: '#6f7f7b', borderRadius: 6, padding: '3px 8px', fontSize: 12 }}>{clip.half}</span>
        {clip.gameResult && (
          <span style={{ ...resultColor(clip.gameResult), borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 700 }}>{clip.gameLabel}</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add to team talk</button>
        <button style={{ height: 44, borderRadius: 10, border: 0, background: '#40826d', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send to {clip.players.length} players</button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Add to playlist</button>
          <button style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Draw on it</button>
        </div>
      </div>
    </div>
  )
}

function DropChip({ label }: { label: string }) {
  return (
    <button style={{
      height: 32, padding: '0 12px', borderRadius: '999px',
      border: '1px solid #e9eae8', background: '#ffffff',
      fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#6f7f7b',
      display: 'flex', alignItems: 'center', gap: 4,
    }}>
      {label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  )
}

const PLAYLISTS = [
  { id: 'pl1', title: 'Team talk · Harbour Rovers', clips: 5, dur: '4 min', note: 'Ready for Saturday' },
  { id: 'pl2', title: 'Pressing: what good looks like', clips: 9, dur: 'from 4 games', note: 'Used in 3 team talks' },
  { id: 'pl3', title: 'Back-post defending', clips: 4, dur: 'Leo and Grace', note: 'For Thursday' },
  { id: 'pl4', title: 'Goals of the season', clips: 18, dur: '', note: 'Shared with families' },
]
const SHARED_CLIPS = [
  { ini: 'MT', name: 'Mia Tran',    clip: 'Min 47 · weaker-foot goal vs Ironbark', status: 'Watched twice', note: 'Linh liked it', statusColor: '#40826d' },
  { ini: 'LM', name: 'Leo Marsh',   clip: 'Min 24 · runner lost at the back post',  status: 'Watched',       note: 'goal reminder attached', statusColor: '#40826d' },
  { ini: 'NO', name: 'Noah Okafor', clip: 'Min 10 · early shot, low to the corner', status: 'Not watched yet', note: '', statusColor: '#c39797' },
  { ini: 'JP', name: 'Jai Patel',   clip: 'Min 37 · look up, switch of play',       status: 'Watched',       note: '', statusColor: '#40826d' },
]
const TO_CHECK_ITEMS = [
  { id: 'tc1', label: 'A win in their half?', game: 'Ironbark', min: 24 },
  { id: 'tc2', label: "Who is this?",          game: 'Ironbark', min: 34 },
  { id: 'tc3', label: 'A goal?',               game: 'Ironbark', min: 44 },
]
const TO_CHECK_OPTIONS = ['Yes, in their half', 'Yes, but in our half', 'No, they kept it']

function PlaylistsTab() {
  return (
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flexGrow: 1, padding: '24px 32px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', letterSpacing: '-0.02em' }}>Playlists and shared clips</div>
          <div style={{ flexGrow: 1 }} />
          <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            New playlist
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 20 }}>
          {/* Playlists */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 12 }}>Playlists</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PLAYLISTS.map(pl => (
                <button key={pl.id} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: '#1f4a3e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{pl.title}</div>
                    <div style={{ fontSize: 13, color: '#6f7f7b' }}>{pl.clips} clips{pl.dur ? ` · ${pl.dur}` : ''}</div>
                    <div style={{ fontSize: 12, color: '#4a5a57', marginTop: 2 }}>{pl.note}</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
                </button>
              ))}
            </div>
          </div>

          {/* Shared with players */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 12 }}>
              Shared with players <span style={{ color: '#4a5a57', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>· Their parents see them too</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
              {SHARED_CLIPS.map((s, i) => (
                <div key={s.ini} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.ini}</div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 1 }}>{s.clip}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.statusColor }}>{s.status}</span>
                    {s.note && <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.note}</div>}
                  </div>
                </div>
              ))}
              <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f1f0', fontSize: 12, color: '#6f7f7b', background: '#fafafa' }}>
                Lily isn't filmed, by her parents' choice, so she never appears in shared or team clips.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToCheckTab() {
  const [activeItem, setActiveItem] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const allDone = TO_CHECK_ITEMS.every(item => answers[item.id])
  const doneCount = Object.keys(answers).length

  if (allDone) {
    return (
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: 220, flex: 'none', borderRight: '1px solid #e9eae8', padding: '20px', overflowY: 'auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>To check</div>
          <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 12 }}>All done</div>
          <div style={{ height: 4, background: '#40826d', borderRadius: 2, marginBottom: 14, width: '100%' }} />
          {TO_CHECK_ITEMS.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: '1px solid #f0f1f0' }}>
              <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{item.game} · min {item.min}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, fontSize: 12, color: '#6f7f7b', lineHeight: '17px' }}>
            Only moments Clean Sheet is less than 80% sure about end up here. Most games have two or three.
          </div>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 }}>
          <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#10211f' }}>All checked. Thanks!</div>
          <div style={{ fontSize: 14, color: '#4a5a57', textAlign: 'center', lineHeight: '20px', maxWidth: 400 }}>
            Wins in their half stays at 13. The minute-47 clip and its running data moved to Finn. Zoe's chance is logged as saved.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ height: 40, padding: '0 20px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See the updated review</button>
            <button onClick={() => setAnswers({})} style={{ height: 40, padding: '0 20px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back to clips</button>
          </div>
        </div>
      </div>
    )
  }

  const item = TO_CHECK_ITEMS[activeItem]
  return (
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Left list */}
      <div style={{ width: 220, flex: 'none', borderRight: '1px solid #e9eae8', padding: '20px', overflowY: 'auto' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>To check</div>
        <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 10 }}>{TO_CHECK_ITEMS.length - doneCount} of {TO_CHECK_ITEMS.length} left · Ironbark United</div>
        <div style={{ height: 4, background: '#e9eae8', borderRadius: 2, overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ height: '100%', background: '#40826d', width: `${(doneCount / TO_CHECK_ITEMS.length) * 100}%`, transition: 'width 0.4s' }} />
        </div>
        {TO_CHECK_ITEMS.map((it, i) => (
          <button key={it.id} onClick={() => setActiveItem(i)} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderTop: '1px solid #f0f1f0',
            border: 0, background: 'transparent', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: '999px', flexShrink: 0,
              background: answers[it.id] ? '#40826d' : i === activeItem ? '#10211f' : '#e9eae8',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {answers[it.id]
                ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                : <span style={{ fontSize: 11, fontWeight: 700, color: i === activeItem ? '#fff' : '#6f7f7b' }}>{i + 1}</span>
              }
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{it.label}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>{it.game} · min {it.min}</div>
            </div>
          </button>
        ))}
        <div style={{ marginTop: 16, fontSize: 12, color: '#6f7f7b', lineHeight: '17px' }}>Only moments Clean Sheet is less than 80% sure about end up here. Most games have two or three.</div>
      </div>

      {/* Center: video + why */}
      <div style={{ flexGrow: 1, padding: '20px 24px', overflowY: 'auto', borderRight: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 12 }}>{item.game} · min {item.min}</div>
        <div style={{ background: '#1f4a3e', borderRadius: 14, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, position: 'relative' }}>
          <div style={{ width: 50, height: 50, borderRadius: '999px', border: '2px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </div>
          <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 12, color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: '2px 8px' }}>0:09 · plays twice, slowed down</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Why Clean Sheet isn't sure</div>
        <p style={{ margin: '0 0 12px', fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>
          Jai and their defender reached the ball together, right on halfway. It's hard to tell who got there first, and which side of the line it was.
        </p>
        <div style={{ fontSize: 13, color: '#6f7f7b', background: '#f7f9f7', borderRadius: 10, padding: '10px 12px' }}>
          Affects: wins of the ball in their half (13), Jai's pressing stats.
        </div>
      </div>

      {/* Right: answer */}
      <div style={{ width: 280, flex: 'none', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 6 }}>Clean Sheet thinks: won in their half by Jai · 62% sure</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>{item.label}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {TO_CHECK_OPTIONS.map(opt => (
            <button key={opt} onClick={() => setAnswers(a => ({ ...a, [item.id]: opt }))} style={{
              height: 44, padding: '0 16px', borderRadius: 12, textAlign: 'left',
              border: `1.5px solid ${answers[item.id] === opt ? '#40826d' : '#e9eae8'}`,
              background: answers[item.id] === opt ? '#f0f8f4' : '#fff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: answers[item.id] === opt ? 700 : 400,
              color: '#10211f', cursor: 'pointer',
            }}>{opt}</button>
          ))}
        </div>
        <button style={{ fontSize: 13, color: '#6f7f7b', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', marginBottom: 16 }}>Not sure, skip for now</button>
        <button onClick={() => { if (answers[item.id]) setActiveItem(i => Math.min(i + 1, TO_CHECK_ITEMS.length - 1)) }} disabled={!answers[item.id]} style={{
          height: 44, borderRadius: 12, border: 0, background: answers[item.id] ? '#2f6252' : '#c5c8c4',
          color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: answers[item.id] ? 'pointer' : 'not-allowed', opacity: answers[item.id] ? 1 : 0.6,
        }}>
          Confirm
        </button>
        <div style={{ marginTop: 10, fontSize: 12, color: '#6f7f7b' }}>Your answer updates the review straight away.</div>
      </div>
    </div>
  )
}

export default function ClipsScreen({ empty, activeTab = 0 }: { empty?: boolean; activeTab?: number }) {
  if (empty) return <ClipsEmpty activeTab={activeTab} />
  if (activeTab === 1 || activeTab === 2) return <PlaylistsTab />
  if (activeTab === 3) return <ToCheckTab />
  const [filterMode, setFilterMode] = useState<FilterMode>('game')
  const [activeGame, setActiveGame] = useState<string>('all')
  const [activeMeasure, setActiveMeasure] = useState<string | null>(null)
  const [activePlayer, setActivePlayer] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [selected, setSelected] = useState<GameClip>(CLIPS[0])

  const baseFiltered = CLIPS.filter(c => {
    if (filterMode === 'game'    && activeGame)      return activeGame === 'all' || c.game === activeGame
    if (filterMode === 'measure' && activeMeasure)   return c.measures.includes(activeMeasure)
    if (filterMode === 'player'  && activePlayer)    return c.players.includes(activePlayer)
    return true
  })

  const filtered = baseFiltered.filter(c => {
    if (typeFilter === 'good') return c.type === 'good'
    if (typeFilter === 'work') return c.type === 'work'
    return true
  })

  // Context header data
  const game = activeGame !== 'all' ? CLIPS_GAMES.find(g => g.id === activeGame) : null
  const gameCtx = game ? GAME_FULL[game.id] : null
  const playerInfo = activePlayer ? PLAYERS.find(p => p.ini === activePlayer) : null
  const playerClipCount = activePlayer ? CLIPS.filter(c => c.players.includes(activePlayer)).length : CLIPS.length

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Primary filter bar */}
      <div style={{ flex: 'none', padding: '14px 32px 0', borderBottom: '1px solid #e9eae8', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#10211f', letterSpacing: '-0.02em' }}>Clips</span>
            <span style={{ fontSize: 14, color: '#6f7f7b', marginLeft: 10 }}>{CLIPS.length} clips · {CLIPS_GAMES.length} games</span>
          </div>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', gap: 2, background: '#f7f8f7', borderRadius: '999px', padding: 3 }}>
            {(['game', 'measure', 'player'] as FilterMode[]).map(m => (
              <button key={m} onClick={() => setFilterMode(m)} style={{
                height: 32, padding: '0 16px', borderRadius: '999px', border: 0,
                background: filterMode === m ? '#ffffff' : 'transparent',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                color: filterMode === m ? '#10211f' : '#6f7f7b',
                boxShadow: filterMode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}>By {m}</button>
            ))}
          </div>
          <button style={{ width: 40, height: 40, borderRadius: '999px', border: '1px solid #e9eae8', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
        </div>

        {/* Mode-specific chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 12 }}>
          {filterMode === 'game' && <>
            <button onClick={() => setActiveGame('all')} style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: `1.5px solid ${activeGame === 'all' ? '#40826d' : '#e9eae8'}`,
              background: activeGame === 'all' ? '#f0f8f4' : '#ffffff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
            }}>All games <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.length}</span></button>
            {CLIPS_GAMES.map(g => {
              const rc = resultColor(g.result)
              return (
                <button key={g.id} onClick={() => setActiveGame(g.id)} style={{
                  height: 36, padding: '0 14px', borderRadius: '999px',
                  border: `1.5px solid ${activeGame === g.id ? '#40826d' : '#e9eae8'}`,
                  background: activeGame === g.id ? '#f0f8f4' : '#ffffff',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  color: '#10211f', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ ...rc, width: 20, height: 20, borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{g.result}</span>
                  {g.label}
                  <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.filter(c => c.game === g.id).length}</span>
                </button>
              )
            })}
          </>}
          {filterMode === 'measure' && CLIPS_MEASURES.map(m => (
            <button key={m} onClick={() => setActiveMeasure(activeMeasure === m ? null : m)} style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: `1.5px solid ${activeMeasure === m ? '#40826d' : '#e9eae8'}`,
              background: activeMeasure === m ? '#f0f8f4' : '#ffffff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '999px', background: activeMeasure === m ? '#40826d' : '#c5c8c4', flexShrink: 0 }} />
              {m}
              <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.filter(c => c.measures.includes(m)).length}</span>
            </button>
          ))}
          {filterMode === 'player' && <>
            <button onClick={() => setActivePlayer(null)} style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: `1.5px solid ${!activePlayer ? '#40826d' : '#e9eae8'}`,
              background: !activePlayer ? '#f0f8f4' : '#ffffff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
            }}>Everyone <span style={{ fontWeight: 400, fontSize: 12, color: '#6f7f7b' }}>{CLIPS.length} clips</span></button>
            {PLAYERS.map(p => (
              <button key={p.ini} onClick={() => setActivePlayer(activePlayer === p.ini ? null : p.ini)} style={{
                height: 36, padding: '0 14px', borderRadius: '999px',
                border: `1.5px solid ${activePlayer === p.ini ? '#40826d' : '#e9eae8'}`,
                background: activePlayer === p.ini ? '#f0f8f4' : '#ffffff',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ width: 20, height: 20, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{p.ini}</span>
                {p.name}
                <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.filter(c => c.players.includes(p.ini)).length}</span>
              </button>
            ))}
          </>}
        </div>
      </div>

      {/* Selected context header */}
      {(filterMode === 'game' && gameCtx) || (filterMode === 'measure' && activeMeasure) || (filterMode === 'player' && playerInfo) ? (
        <div style={{ flex: 'none', padding: '12px 32px', borderBottom: '1px solid #e9eae8', background: '#fafafa', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>
              {filterMode === 'game' && gameCtx?.title}
              {filterMode === 'measure' && activeMeasure}
              {filterMode === 'player' && playerInfo && `${playerInfo.fullName} · ${playerClipCount} clips this season`}
            </div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>
              {filterMode === 'game' && gameCtx?.sub}
              {filterMode === 'measure' && activeMeasure && MEASURE_INFO[activeMeasure]}
              {filterMode === 'player' && 'Share a good example and one to work on before Saturday'}
            </div>
          </div>
          <button style={{
            flex: 'none', height: 36, padding: '0 16px', borderRadius: '999px',
            border: 0, background: '#10211f', color: '#ffffff',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            {filterMode === 'game' && gameCtx ? 'Highlights' : `Play all ${filtered.length}`}
          </button>
        </div>
      ) : null}

      {/* Secondary filter row (All / Good / To work on + dropdowns) */}
      <div style={{ flex: 'none', padding: '10px 32px', borderBottom: '1px solid #e9eae8', background: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
        {(['all', 'good', 'work'] as TypeFilter[]).map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} style={{
            height: 32, padding: '0 14px', borderRadius: '999px',
            border: `1px solid ${typeFilter === t ? '#40826d' : '#e9eae8'}`,
            background: typeFilter === t ? '#f0f8f4' : '#ffffff',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            color: typeFilter === t ? '#2f6252' : '#6f7f7b',
          }}>{t === 'all' ? 'All' : t === 'good' ? 'Good' : 'To work on'}</button>
        ))}
        <div style={{ width: 1, height: 20, background: '#e9eae8', margin: '0 4px' }} />
        <DropChip label="Area" />
        <DropChip label="Half" />
        <DropChip label="Source" />
        <DropChip label="Found by" />
        <div style={{ flexGrow: 1 }} />
        <span style={{ fontSize: 13, color: '#6f7f7b' }}>{filtered.length} clips</span>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Clip grid */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {filtered.map(clip => (
              <ClipCard key={clip.id} clip={clip} selected={selected.id === clip.id} onClick={() => setSelected(clip)} />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: 'span 3', padding: 40, textAlign: 'center', color: '#6f7f7b', fontSize: 15 }}>No clips match this filter.</div>
            )}
          </div>
        </div>

        {/* Right detail panel */}
        <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', padding: '20px', overflowY: 'auto', background: '#ffffff' }}>
          <ClipDetail clip={selected} />
        </div>
      </div>
    </div>
  )
}
