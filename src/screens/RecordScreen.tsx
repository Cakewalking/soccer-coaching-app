import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

type View =
  | 'start' | 'friendly' | 'drill'
  | 'recording' | 'recording-error'
  | 'results' | 'results-first'
  | 'history' | 'history-first'
  | 'recorded' | 'howwemeasure'

// ─── Shared ───────────────────────────────────────────────────────────────────

function PageHeader({ title, sub, onBack, right }: { title: string; sub?: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <div style={{ padding: '20px 28px 0', display: 'flex', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
      {onBack && (
        <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4, flexShrink: 0 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

function Chip({ label, note, dim }: { label: string; note?: string; dim?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: dim ? 0.5 : 1 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: dim ? LN : G2, flexShrink: 0 }}/>
      <div>
        <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{label}</span>
        {note && <span style={{ fontSize: 13, color: MUT }}> · {note}</span>}
      </div>
    </div>
  )
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: ok ? PALE : '#fdf4f4', color: ok ? G : ROSE }}>{label}</span>
  )
}

function SectionHead({ label }: { label: string }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>{label}</div>
}

function InfoRow({ label, value, action }: { label: string; value?: string; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
      <span style={{ fontSize: 14, color: MUT, flex: 1 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{value}</span>
      {action && <button style={{ marginLeft: 10, fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>{action}</button>}
    </div>
  )
}


function StepList({ steps }: { steps: { n: string; title: string; note?: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
      {steps.map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.title}</div>
            {s.note && <div style={{ fontSize: 12, color: MUT }}>{s.note}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── RC1 — Record Start ───────────────────────────────────────────────────────

function StartView({ empty, onFriendly, onDrill, onRecorded, onHowWeMeasure, onRunAgain }:
  { empty: boolean; onFriendly: () => void; onDrill: () => void; onRecorded: () => void; onHowWeMeasure: () => void; onRunAgain: () => void }) {

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, padding: '32px 0 24px' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round"><circle cx={12} cy={12} r={3}/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: INK }}>No camera or sensors paired yet</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, maxWidth: 400 }}>Pair a camera, or start with your phone. Any camera that saves a video file works. With no kit at all you can still record a test with a phone timer.</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Pair a camera</button>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Record with a phone</button>
        </div>
      </div>
      <SectionHead label="What each bit of kit adds"/>
      <StepList steps={[
        { n: '1', title: 'A camera', note: 'Clips, and where the ball was won and lost' },
        { n: '2', title: 'GPS vests', note: 'Sprints, distance and top speed' },
        { n: '3', title: 'Boot sensors', note: 'Touches, and which foot' },
      ]}/>
    </div>
  )

  const recordOptions = [
    { label: 'A league game', note: 'Sat 6 Jun vs Harbour Rovers · matched to your fixture', onClick: onDrill },
    { label: 'A friendly', note: 'Any game outside the fixture list. You choose whether it counts', onClick: onFriendly },
    { label: 'A training drill', note: '4 tonight', onClick: onDrill },
    { label: 'A warm-up', note: 'The same warm-up each week shows how sharp they are', onClick: onDrill },
    { label: 'A test', note: 'Sprint, jump, turn or your own. Each player against their own last result', onClick: onDrill },
  ]

  const runAgainItems = [
    { count: 3, name: 'Win it back in 6 seconds', type: 'Drill · last run 26 May' },
    { count: 5, name: '11+ Kids warm-up', type: 'Warm-up · last run Tuesday' },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Sub-header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: MUT }}>Film it, wear the sensors, then see what changed since last time</div>
        </div>
        <button onClick={onHowWeMeasure} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' as const }}>How we measure</button>
        <button onClick={onRecorded} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' as const }}>Everything recorded · 14</button>
      </div>

      {/* What are you recording */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>What are you recording?</div>
        {recordOptions.map((opt, i) => (
          <button key={opt.label} onClick={opt.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: 'none', borderBottom: i < recordOptions.length - 1 ? `1px solid ${LN}` : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'inherit', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{opt.note}</div>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>

      {/* Kit */}
      <div>
        <SectionHead label="Kit"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { label: 'Match camera', status: 'Connected · battery 82%', ok: true },
            { label: 'Boot sensors', status: '16 pairs charged', ok: true },
            { label: 'GPS vests', status: '12 of 15 synced', ok: false, warn: true },
          ].map((k, i) => (
            <div key={k.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{k.label}</div>
                <div style={{ fontSize: 12, color: k.warn ? ROSE : G2, marginTop: 2 }}>{k.status}</div>
              </div>
              <StatusBadge ok={k.ok} label={k.ok ? 'Ready' : 'Check'}/>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>No kit tonight? Record with a phone, and time or count by hand.</div>
      </div>

      {/* Run one again */}
      <div>
        <SectionHead label="Run one again"/>
        {runAgainItems.map(item => (
          <div key={item.name} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{item.count}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{item.type}</div>
            </div>
            <button onClick={onRunAgain} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Again</button>
          </div>
        ))}
        <div style={{ fontSize: 12, color: MUT }}>Running it again uses the same set-up, so the comparison is fair.</div>
      </div>
    </div>
  )
}

// ─── RC2 — Record a friendly ──────────────────────────────────────────────────

function FriendlyView({ onStart }: { onStart: () => void }) {
  const [counts, setCounts] = useState<'separate' | 'league'>('separate')
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 13, color: MUT }}>A game outside the league fixture list</div>
        <button onClick={onStart} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Save and start on the day</button>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>The game</div>
        <InfoRow label="Against" value="Kestrel Park U12" action="Change"/>
        <InfoRow label="When" value="Tuesday 9 June, 6:00 pm" action="Change"/>
        <InfoRow label="Where" value="Wattle Creek Reserve, pitch 2" action="Change"/>
        <InfoRow label="Format" value="9 a side · 2 halves of 25 minutes" action="Change"/>
        <div style={{ padding: '10px 16px' }}>
          <div style={{ fontSize: 14, color: MUT, marginBottom: 6 }}>Trying out</div>
          <div style={{ fontSize: 14, color: INK }}>A back three, and Mia in midfield</div>
          <button style={{ fontSize: 13, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginTop: 4 }}>Edit</button>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Does it count?</div>
        {([
          { id: 'separate', label: 'Keep it separate', note: 'Shows under Friendlies. Season numbers and Playing our way don\'t move' },
          { id: 'league', label: 'Count it with league games', note: 'Use when the friendly was a proper test' },
        ] as const).map(opt => (
          <label key={opt.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: opt.id === 'separate' ? `1px solid ${LN}` : 'none', cursor: 'pointer' }}>
            <div onClick={() => setCounts(opt.id)} style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${counts === opt.id ? G : LN}`, background: counts === opt.id ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {counts === opt.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{opt.note}</div>
            </div>
          </label>
        ))}
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT, lineHeight: 1.5 }}>Fair game time is tracked either way, and families are asked who's coming like any other game.</div>
      </div>

      <div>
        <SectionHead label="What we'll measure"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { label: 'Your style, as in league games', note: 'The same 10 measures, so you can compare', on: true, icon: '10' },
            { label: 'Minutes for every player', note: 'From the line-up, exact', on: true, icon: 'M' },
            { label: 'What you\'re trying out', note: 'Clips of the back three are grouped for you', on: true, icon: '+' },
          ].map((m, i) => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: m.on ? G : LN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{m.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{m.note}</div>
              </div>
              <StatusBadge ok={m.on} label="On"/>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHead label="Kit for the day"/>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Match camera', 'GPS vests', 'Boot sensors'].map(k => (
            <div key={k} style={{ flex: 1, padding: '10px 12px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, textAlign: 'center' as const }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Only players whose parents said yes are filmed or tracked. Kestrel Park's players are never named.</div>
      </div>
    </div>
  )
}

// ─── RC3 — Record a drill ─────────────────────────────────────────────────────

function DrillView({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: GD, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Win it back in 6 seconds</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 10 }}>Third on tonight's plan</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Pick another drill</button>
          <button onClick={onStart} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: '#fff', color: GD, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Start recording →</button>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, flex: 1, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>The set-up</div>
          <span style={{ fontSize: 12, color: G2, fontWeight: 600 }}>Same as last time</span>
        </div>
        <InfoRow label="Players" value="12 · 6 against 6" action="Change"/>
        <InfoRow label="Area" value="30 by 20 metres" action="Change"/>
        <InfoRow label="Rounds" value="4 rounds of 3 minutes" action="Change"/>
        <InfoRow label="Rule" value="Lose it, then win it back inside 6 seconds for a point" action="Change"/>
        <InfoRow label="Camera" value="Behind the halfway cone, with the whole area in view" action="Check view"/>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: MUT }}>Sensors</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: G2 }}>Boots on 12 · vests on 12</span>
          </div>
        </div>
        <div style={{ padding: '12px 16px', fontSize: 12, color: MUT, lineHeight: 1.5 }}>This set-up is saved with the drill. "Run it again" brings it back exactly, so the comparison is fair.</div>
      </div>

      <div>
        <SectionHead label="What we'll measure"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { label: 'Seconds to win it back', note: 'From losing the ball to winning it', src: 'Match camera' },
            { label: 'Won back within 6 seconds', note: 'Share of times they got it back in time', src: 'Match camera' },
            { label: 'Sprints after losing it', note: 'Bursts in the first 3 seconds', src: 'GPS vests' },
            { label: 'Touches per player', note: 'So nobody hides', src: 'Boot sensors' },
          ].map((m, i) => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 3 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{m.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{m.note}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: G2, background: PALE, padding: '2px 8px', borderRadius: 999 }}>{m.src}</span>
            </div>
          ))}
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G2 }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Count something by hand
          </button>
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Last run: Tue 26 May, run 2 of 2. Tonight will be run 3.</div>
      </div>
    </div>
  )
}

// ─── RC4 — Recording ──────────────────────────────────────────────────────────

function RecordingView({ error, onStop }: { error: boolean; onStop: () => void }) {
  if (error) return (
    <div style={{ flex: 1, background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', gap: 16 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(195,151,151,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={ROSE} strokeWidth={2} strokeLinecap="round"><path d="M12 9v4M12 17h.01M10.3 3l-7.6 13A2 2 0 004.4 19h15.2a2 2 0 001.7-3L13.7 3a2 2 0 00-3.4 0z"/></svg>
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Camera not found</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, maxWidth: 320 }}>Check it's switched on and near the tablet. Or carry on without it: vests and boots still record, and you can count the wins by hand.</div>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
        <button style={{ height: 44, padding: '0 20px', borderRadius: 999, border: `1px solid rgba(255,255,255,0.3)`, background: 'transparent', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Try again</button>
        <button onClick={onStop} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: '#fff', color: GD, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record without the camera</button>
      </div>
      <div style={{ marginTop: 8, textAlign: 'left' as const, maxWidth: 300 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Without the camera you still get</div>
        <StepList steps={[{ n:'1', title:'Sprints and distance', note:'From the vests' }, { n:'2', title:'Touches', note:'From the boots' }, { n:'3', title:'Your own count', note:'Tap each time they win it back' }]}/>
      </div>
    </div>
  )

  return (
    <div style={{ flex: 1, background: '#0e1a17', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Title bar */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: ROSE, flexShrink: 0 }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Win it back in 6 seconds · run 3</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Works with no signal. Uploads when you're back online.</div>
        </div>
      </div>

      {/* Round + timer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}>Round 2 of 4</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>1:42</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Left in this round</div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 20px', maxWidth: 380, fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginTop: 8, textAlign: 'center' as const }}>
          "Nearest three, go now. Everyone else, get behind the ball."
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8, justifyContent: 'center' }}>
        {['Next round', 'Mark a moment', 'Pause'].map(a => (
          <button key={a} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{a}</button>
        ))}
        <button onClick={onStop} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: ROSE, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Stop and save</button>
      </div>

      {/* Status bar */}
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
        {[
          { label: 'Match camera', note: 'Whole area in view', ok: true },
          { label: 'GPS vests', note: '12 of 12 sending', ok: true },
          { label: 'Boot sensors', note: "11 of 12 · Oscar's aren't on", ok: false },
        ].map(d => (
          <div key={d.label} style={{ flex: 1, minWidth: 140, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '8px 12px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: d.ok ? 'rgba(255,255,255,0.75)' : ROSE }}>{d.label}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{d.note}</div>
          </div>
        ))}
      </div>

      {/* Live stat */}
      <div style={{ margin: '0 20px 20px', background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>5 of 8</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>won back inside 6 seconds</div>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'right' as const, maxWidth: 180 }}>Last run they finished on 44%. Full results about 10 minutes after you stop.</div>
      </div>
    </div>
  )
}

// ─── RC5 — Results ────────────────────────────────────────────────────────────

function ResultsView({ firstRun, onHistory, onHowWeMeasure }:
  { firstRun: boolean; onHistory: () => void; onHowWeMeasure: () => void }) {

  const metrics = [
    { label: 'SECONDS TO WIN IT BACK', value: firstRun ? '6.1 s' : '4.6 s', prev: firstRun ? null : '5.4 s', verdict: firstRun ? null : 'Real change', dir: 'down' },
    { label: 'WON BACK WITHIN 6 SECONDS', value: firstRun ? '35%' : '58%', prev: firstRun ? null : '44%', verdict: firstRun ? null : 'Real change', dir: 'up' },
    { label: 'SPRINTS AFTER LOSING IT', value: firstRun ? '27' : '31', prev: firstRun ? null : '29', verdict: firstRun ? null : 'About the same', dir: 'up' },
    { label: 'TOUCHES PER PLAYER', value: firstRun ? '34' : '38', prev: firstRun ? null : '36', verdict: firstRun ? null : 'About the same', dir: 'up' },
  ]

  const players = [
    { ini: 'AL', name: 'Ava Lindgren', note: 'Pressing sooner: 1.9 s to 1.4 s', status: 'Better' },
    { ini: 'EB', name: 'Ella Brooks', note: 'Lighter night, 2 rounds only', status: 'Not compared' },
    { ini: 'JP', name: 'Jai Patel', note: 'Same as last run', status: 'Same' },
    { ini: 'MT', name: 'Mia Tran', note: 'Won it back 4 times, up from 2', status: 'Better' },
    { ini: 'NO', name: 'Noah Okafor', note: 'Kept to 3 sprints, as planned', status: 'Not compared' },
    { ini: 'OB', name: 'Oscar Brennan', note: 'No boot sensors, so no touches', status: 'Part missing' },
  ]

  const statusColor = (s: string) => s === 'Better' ? G : s === 'Same' ? MUT : ROSE

  if (firstRun) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 13, color: MUT }}>Tonight · 12 players · your starting point</div>
        <button style={{ marginLeft: 'auto', height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Add to next week</button>
        <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Clips · 4</button>
      </div>
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>This is your starting point</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5, marginBottom: 10 }}>Tonight: 6.1 seconds to win it back, and 35% inside 6 seconds. Run it again with the same set-up to see what changes.</div>
        <button onClick={onHistory} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add to next week</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: MUT, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: INK, letterSpacing: '-0.03em' }}>{m.value}</div>
          </div>
        ))}
      </div>
      <StepList steps={[
        { n: '1', title: 'Same set-up, saved', note: 'Area, rounds and numbers' },
        { n: '2', title: 'Each measure, side by side', note: 'With whether the change is real' },
        { n: '3', title: 'Each player', note: 'Against their own last run' },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const }}>
        <div style={{ fontSize: 13, color: MUT, flex: 1 }}>Tonight · 12 players · same set-up as run 2</div>
        <button onClick={onHistory} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>All runs</button>
        <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Clips · 6</button>
        <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Add to next week</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: MUT, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: INK, letterSpacing: '-0.03em' }}>{m.value}</div>
            {m.prev && (
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 12, color: MUT }}>was {m.prev}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.verdict === 'Real change' ? G : MUT }}>{m.verdict}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <SectionHead label="Each player, against their own last run"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {players.map((p, i) => (
            <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < players.length - 1 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: statusColor(p.status), flexShrink: 0 }}>{p.status}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 6 }}>In name order, never ranked. Showing 6 of 12.</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6 }}>What it means</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>They're winning it back faster, and it's more than a normal up and down. Sprints and touches haven't really moved.</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>How we know it's real</div>
        <StepList steps={[
          { n: '1', title: 'Same set-up', note: 'Area, rounds and numbers matched run 2' },
          { n: '2', title: 'Bigger than the usual wobble', note: 'For this drill that\'s about 8% between runs' },
          { n: '3', title: 'One more run settles it', note: 'Three in a row makes a trend' },
        ]}/>
        <button onClick={onHowWeMeasure} style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>How we measure →</button>
      </div>
    </div>
  )
}

// ─── RC6 — Run History ────────────────────────────────────────────────────────

function HistoryView({ firstRun, onRunAgain }: { firstRun: boolean; onRunAgain: () => void }) {
  const runs = [
    { n: 'Run 1', date: 'Tue 12 May', players: 12, time: '6.1 s', pct: '35%', sprints: 27, note: 'First run' },
    { n: 'Run 2', date: 'Tue 26 May', players: 11, time: '5.4 s', pct: '44%', sprints: 29, note: 'Lily away' },
    { n: 'Run 3', date: 'Thu 4 Jun',  players: 12, time: '4.6 s', pct: '58%', sprints: 31, note: 'Tonight' },
  ]

  if (firstRun) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 13, color: MUT }}>1 run so far</div>
      <div style={{ background: PALE, borderRadius: 14, padding: '16px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: GD, marginBottom: 6 }}>One run isn't a comparison yet</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5, marginBottom: 12 }}>Run it again with the same set-up and the two line up here. Three runs make a trend.</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button onClick={onRunAgain} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Run it again</button>
          <button style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>See run 1</button>
        </div>
      </div>
      <SectionHead label="What makes it fair"/>
      <StepList steps={[
        { n: '1', title: 'Same area and rounds', note: 'Saved with the drill' },
        { n: '2', title: 'About the same numbers', note: 'One player either way is fine' },
        { n: '3', title: 'A week or two apart', note: 'Long enough for training to show' },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 13, color: MUT, flex: 1 }}>3 runs since 12 May · same set-up each time</div>
        <button onClick={onRunAgain} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Run it again</button>
        <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Change the set-up</button>
      </div>

      {/* Trend charts */}
      {[
        { label: 'Seconds to win it back · lower is better', vals: [6.1, 5.4, 4.6], unit: 's' },
        { label: 'Won back within 6 seconds · higher is better', vals: [35, 44, 58], unit: '%' },
      ].map(chart => (
        <div key={chart.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 12 }}>{chart.label}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 60 }}>
            {chart.vals.map((v, i) => {
              const max = Math.max(...chart.vals)
              const min = Math.min(...chart.vals)
              const range = max - min || 1
              const pct = chart.unit === 's'
                ? (1 - (v - min) / range) * 70 + 15
                : ((v - min) / range) * 70 + 15
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: i === 2 ? G : INK }}>{v}{chart.unit}</div>
                  <div style={{ width: '100%', height: Math.round(pct), background: i === 2 ? G : LN, borderRadius: '4px 4px 0 0' }}/>
                  <div style={{ fontSize: 11, color: MUT }}>Run {i + 1}</div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 90px 60px 70px 70px 60px 1fr', padding: '8px 14px', borderBottom: `1px solid ${LN}`, gap: 6 }}>
          {['RUN', 'WHEN', 'PLAYERS', 'TO WIN IT BACK', 'INSIDE 6 S', 'SPRINTS', 'NOTE'].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</div>
          ))}
        </div>
        {runs.map((r, i) => (
          <div key={r.n} style={{ display: 'grid', gridTemplateColumns: '60px 90px 60px 70px 70px 60px 1fr', padding: '10px 14px', borderBottom: i < runs.length - 1 ? `1px solid ${LN}` : 'none', gap: 6, background: i === 2 ? PALE : '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.n}</div>
            <div style={{ fontSize: 12, color: MUT }}>{r.date}</div>
            <div style={{ fontSize: 13, color: INK }}>{r.players}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.time}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.pct}</div>
            <div style={{ fontSize: 13, color: INK }}>{r.sprints}</div>
            <div style={{ fontSize: 12, color: MUT }}>{r.note}</div>
          </div>
        ))}
      </div>

      <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', fontSize: 13, color: GD, lineHeight: 1.5 }}>Three runs in the same direction is a trend. The team is clearly quicker to win the ball back than four weeks ago.</div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Is it a fair comparison?</div>
        <Chip label="Same area and rounds" note="30 by 20 m · 4 rounds of 3 minutes"/>
        <div style={{ height: 8 }}/>
        <Chip label="Same rule" note="Win it back inside 6 seconds"/>
        <div style={{ height: 8 }}/>
        <Chip label="Run 2 had 11 players" note="Close enough. Shown with a note" dim/>
        <div style={{ marginTop: 12, padding: '10px 12px', background: PALE, borderRadius: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD }}>Does it show on Saturday?</div>
          <div style={{ fontSize: 12, color: G, marginTop: 2 }}>In league games the same measure went from 7 seconds to 5 over those four weeks.</div>
          <button style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>See it in the last review</button>
        </div>
      </div>
    </div>
  )
}

// ─── RC7 — Everything recorded ────────────────────────────────────────────────

function RecordedView({ empty, onRecord, onHowWeMeasure, onResults }:
  { empty: boolean; onRecord: () => void; onHowWeMeasure: () => void; onResults: () => void }) {

  const [tab, setTab] = useState('All')
  const tabs = ['All · 14', 'League games · 8', 'Friendlies · 1', 'Drills · 3', 'Warm-ups · 1', 'Tests · 1']

  const rows = [
    { type: 'Drill',   what: 'Win it back in 6 seconds · run 3', when: 'Tonight',    kit: 'Camera · vests · boots', status: 'Ready',         action: 'Open' },
    { type: 'Warm-up', what: '11+ Kids warm-up · run 5',         when: 'Tue 2 Jun',  kit: 'Vests',                  status: 'Ready',         action: 'Open' },
    { type: 'League',  what: 'Ironbark United · won 3–1',        when: 'Sat 30 May', kit: 'Camera · vests · boots', status: 'Ready',         action: 'Review' },
    { type: 'Test',    what: '20 m sprint race',                  when: 'Thu 28 May', kit: 'Phone timer · boots',    status: 'Ready',         action: 'Open' },
    { type: 'Drill',   what: 'Win it back in 6 seconds · run 2', when: 'Tue 26 May', kit: 'Camera · vests · boots', status: 'Ready',         action: 'Open' },
    { type: 'League',  what: 'Saltmarsh · drew 1–1',             when: 'Sat 23 May', kit: 'Camera · boots',         status: 'Ready',         action: 'Review' },
    { type: 'Friendly',what: 'Banksia Park U12 · kept separate', when: 'Wed 20 May', kit: 'Camera',                 status: 'Ready',         action: 'Review' },
    { type: 'Drill',   what: 'Rondo, 5 against 2 · run 1',       when: 'Tue 19 May', kit: 'Boots',                  status: 'Starting point',action: 'Run again' },
  ]

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, padding: '32px 0 20px' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: LN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><rect x={3} y={3} width={18} height={18} rx={2}/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: INK }}>Nothing recorded yet</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, maxWidth: 400 }}>Record a game, a friendly, a drill, a warm-up or a test. Each one lands here, ready to open or run again.</div>
        <button onClick={onRecord} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record something</button>
      </div>
      <SectionHead label="A good first three"/>
      <StepList steps={[
        { n: '1', title: "Saturday's game", note: 'Your first match review' },
        { n: '2', title: 'One drill you repeat', note: 'So you can see it improve' },
        { n: '3', title: 'A sprint race', note: "Each player's starting point" },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', padding: '8px 20px 0', background: '#fff', borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        {tabs.map(t => {
          const key = t.split(' ·')[0]
          const active = tab === key
          return (
            <button key={t} onClick={() => setTab(key)} style={{ height: 44, padding: '0 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 700 : 400, color: active ? INK : MUT, borderBottom: active ? `2px solid ${G2}` : '2px solid transparent', boxSizing: 'border-box' as const, whiteSpace: 'nowrap' as const }}>{t}</button>
          )
        })}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px' }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 90px 150px 100px 90px', padding: '8px 0', borderBottom: `1px solid ${LN}`, marginBottom: 2 }}>
          {['TYPE', 'WHAT', 'WHEN', 'CAPTURED WITH', 'STATUS', ''].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 90px 150px 100px 90px', padding: '12px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT }}>{r.type}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK, paddingRight: 8 }}>{r.what}</div>
            <div style={{ fontSize: 12, color: MUT }}>{r.when}</div>
            <div style={{ fontSize: 12, color: MUT }}>{r.kit}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: r.status === 'Ready' ? G2 : MUT }}>{r.status}</div>
            <button onClick={r.action === 'Open' || r.action === 'Review' ? onResults : onRecord} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 700, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>{r.action}</button>
          </div>
        ))}
        <div style={{ padding: '12px 0', fontSize: 12, color: MUT }}>Full game video is deleted after 90 days. Clips and numbers stay for the season.</div>
        <button onClick={onHowWeMeasure} style={{ display: 'block', marginTop: 4, fontSize: 13, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>How we measure →</button>
      </div>

      <div style={{ padding: '12px 28px', borderTop: `1px solid ${LN}`, flexShrink: 0 }}>
        <button onClick={onRecord} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Record
        </button>
      </div>
    </div>
  )
}

// ─── RC8 — How we measure ─────────────────────────────────────────────────────

function HowWeMeasureView() {
  const measures = [
    { measure: 'Seconds to win it back', plain: 'From losing the ball to winning it again', from: 'Match camera', sure: 'Good', runs: '2' },
    { measure: 'Passes completed', plain: 'Passes that reach a teammate', from: 'Match camera', sure: 'Good', runs: '1' },
    { measure: 'Where we win the ball', plain: 'Which third of the pitch', from: 'Match camera', sure: 'Good', runs: '2' },
    { measure: 'Sprints', plain: 'Short bursts close to top speed', from: 'GPS vests', sure: 'Good outdoors', runs: '1' },
    { measure: 'Top speed', plain: 'Fastest moment in the session', from: 'Vests or boots', sure: 'Good', runs: '1' },
    { measure: 'Touches, and which foot', plain: 'Every touch of the ball', from: 'Boot sensors', sure: 'Good', runs: '1' },
    { measure: 'Minutes played', plain: 'Time on the pitch', from: 'Line-up taps', sure: 'Exact', runs: '1' },
    { measure: 'Sprint and jump tests', plain: 'Best of two goes', from: 'Phone timer', sure: 'Fair', runs: '2' },
    { measure: 'Counted by hand', plain: 'Anything you tap yourself', from: 'You', sure: 'Fair', runs: '2' },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 13, color: MUT }}>What each number is, where it comes from, and how far to trust it</div>

      {/* Measures table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 80px 60px', padding: '10px 14px', borderBottom: `1px solid ${LN}`, gap: 8 }}>
          {['MEASURE', 'IN PLAIN WORDS', 'COMES FROM', 'HOW SURE', 'RUNS'].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</div>
          ))}
        </div>
        {measures.map((m, i) => (
          <div key={m.measure} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 80px 60px', padding: '10px 14px', borderBottom: i < measures.length - 1 ? `1px solid ${LN}` : 'none', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{m.measure}</div>
            <div style={{ fontSize: 12, color: MUT }}>{m.plain}</div>
            <div style={{ fontSize: 12, color: G2, fontWeight: 600 }}>{m.from}</div>
            <div style={{ fontSize: 12, color: MUT }}>{m.sure}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>{m.runs}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: MUT }}>{"\"Runs needed\" is how many recordings it takes before a comparison means anything."}</div>

      {/* Three rules */}
      <div>
        <SectionHead label="Three rules"/>
        <StepList steps={[
          { n: '1', title: 'Same set-up, or it isn\'t a comparison', note: 'Saved with every drill and test' },
          { n: '2', title: 'A real change beats the usual wobble', note: 'Every result says which it is' },
          { n: '3', title: 'Each player against themselves', note: 'Never ranked under 13' },
        ]}/>
      </div>

      {/* By age */}
      <div>
        <SectionHead label="By age"/>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { label: 'Under 12', note: 'Filming for clips. No scores, sensors or style numbers', badge: 'U' },
            { label: 'U12 and up', note: 'Camera, boots and vests, with style numbers', badge: '12' },
          ].map((a, i) => (
            <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < 1 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: i === 0 ? PALE : G, color: i === 0 ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{a.badge}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{a.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{a.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.5 }}>At every age, only players whose parents said yes are filmed or tracked. Everyone else is blurred and left out.</div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RecordScreen({ empty = false }: { empty?: boolean }) {
  const [view, setView] = useState<View>('start')

  const goStart = () => setView('start')

  const header = () => {
    const titles: Partial<Record<View, { title: string; sub?: string }>> = {
      start:            { title: 'Record' },
      friendly:         { title: 'Record a friendly' },
      drill:            { title: 'Record a drill' },
      recording:        { title: 'Recording' },
      'recording-error':{ title: 'Recording' },
      results:          { title: 'Win it back in 6 seconds · run 3' },
      'results-first':  { title: 'Win it back in 6 seconds · run 1' },
      history:          { title: 'Win it back in 6 seconds · all runs' },
      'history-first':  { title: 'Win it back in 6 seconds · all runs' },
      recorded:         { title: 'Everything recorded' },
      howwemeasure:     { title: 'How we measure' },
    }
    return titles[view] ?? { title: 'Record' }
  }

  if (view === 'recording' || view === 'recording-error') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <RecordingView error={view === 'recording-error'} onStop={() => setView('results')}/>
      </div>
    )
  }

  const { title, sub } = header()
  const showBack = view !== 'start'

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <PageHeader title={title} sub={sub} onBack={showBack ? goStart : undefined}/>
      {view === 'start'          && <StartView empty={empty} onFriendly={() => setView('friendly')} onDrill={() => setView('drill')} onRecorded={() => setView('recorded')} onHowWeMeasure={() => setView('howwemeasure')} onRunAgain={() => setView('drill')}/>}
      {view === 'friendly'       && <FriendlyView onStart={() => setView('recording-error')}/>}
      {view === 'drill'          && <DrillView onStart={() => setView('recording')}/>}
      {view === 'results'        && <ResultsView firstRun={false} onHistory={() => setView('history')} onHowWeMeasure={() => setView('howwemeasure')}/>}
      {view === 'results-first'  && <ResultsView firstRun={true}  onHistory={() => setView('history-first')} onHowWeMeasure={() => setView('howwemeasure')}/>}
      {view === 'history'        && <HistoryView firstRun={false} onRunAgain={() => setView('drill')}/>}
      {view === 'history-first'  && <HistoryView firstRun={true}  onRunAgain={() => setView('drill')}/>}
      {view === 'recorded'       && <RecordedView empty={empty} onRecord={goStart} onHowWeMeasure={() => setView('howwemeasure')} onResults={() => setView('results')}/>}
      {view === 'howwemeasure'   && <HowWeMeasureView />}
    </div>
  )
}
