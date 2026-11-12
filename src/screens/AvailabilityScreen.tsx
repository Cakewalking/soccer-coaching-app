import { useState } from 'react'

function AvailabilityEmpty() {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const EmptyCol = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{title}</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#4a5a57' }}>0</span>
      </div>
      {[70, 55, 65].map((w, i) => (
        <div key={i} style={{ height: 54, border: '1px dashed #c5c8c4', borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
          <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
        </div>
      ))}
    </div>
  )
  return (
    <div style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Availability</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>No players or fixtures yet</span>
      </div>
      <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', flexShrink: 0 }}>
        <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Know who's in before you pick</div>
          <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>Each week, parents get one question for every game and session: can they make it? Answers land here, sorted.</div>
        </div>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr)) 300px', gap: 12, overflow: 'hidden' }}>
        <EmptyCol title="In" />
        <EmptyCol title="Maybe" />
        <EmptyCol title="Can't make it" />
        <EmptyCol title="No answer" />
        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Two things first</div>
          {[
            { n: 1, title: 'Add your players', sub: 'With a parent contact for each', btn: 'Add players' },
            { n: 2, title: 'Add your fixtures and sessions', sub: 'Questions go out a week before each', btn: 'Add fixtures' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 12 }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: '#2f6252', color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.n}</span>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 8, lineHeight: '16px' }}>{item.sub}</div>
                <button onClick={() => st('Opening setup.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{item.btn}</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', background: '#f7f8f7', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>
            <strong>What parents see:</strong> "Can Mia play on Saturday?" with Yes, Maybe or No, and space for a reason.
          </div>
        </aside>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}

const IN = [
  { ini: 'AL', name: 'Ava Lindqvist',  note: '' },
  { ini: 'TR', name: 'Tom Reyes',      note: '' },
  { ini: 'LM', name: 'Leo Marsh',      note: '' },
  { ini: 'GO', name: 'Grace Owusu',    note: '' },
  { ini: 'MT', name: 'Mia Tran',       note: '' },
  { ini: 'JP', name: 'Jai Patel',      note: '' },
  { ini: 'EB', name: 'Ella Brandt',    note: 'Low check-ins this week' },
  { ini: 'IM', name: 'Isla Morgan',    note: '' },
  { ini: 'OB', name: 'Oscar Brennan',  note: '' },
  { ini: 'NO', name: 'Noah Okafor',    note: '' },
]
const MAYBE = [{ ini: 'RC', name: 'Ruby Chen',  note: 'Might have a school concert' }]
const CANT  = [
  { ini: 'KR', name: 'Kai Russo',    note: 'Away: family wedding' },
  { ini: 'LN', name: 'Lily Nguyen',  note: 'Sick, back next week' },
]
const NO_ANS = [
  { ini: 'SD', name: 'Sam Delaney',  note: '' },
  { ini: 'HQ', name: 'Harper Quinn', note: '' },
]

const GOOD_TO_KNOW = [
  'Kai and Lily are out. Grace covers left back.',
  "Harper's parent hasn't answered consent either. She can play but won't be filmed.",
  'Noah and Zoe have sprint caps from Priya.',
]

function PlayerPill({ ini, name, note }: { ini: string; name: string; note: string }) {
  return (
    <div style={{ padding: '10px 12px', background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '999px', background: '#c39797', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>{ini}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{name}</span>
      </span>
      {note && <span style={{ fontSize: 12, color: '#4a5a57', paddingLeft: 36, lineHeight: '16px' }}>{note}</span>}
    </div>
  )
}

function Column({ title, count, items, accent }: { title: string; count: number; items: typeof IN; accent?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{title}</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: accent ?? '#10211f', lineHeight: '26px' }}>{count}</span>
      </div>
      {items.map((p, i) => <PlayerPill key={i} {...p} />)}
    </div>
  )
}

export default function AvailabilityScreen({ empty }: { empty?: boolean }) {
  if (empty) return <AvailabilityEmpty />
  const [activeEvent, setActiveEvent] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Availability</h1>
          <span style={{ fontSize: 13, color: '#4a5a57' }}>17 players · answers from parents and players</span>
        </div>
        <div style={{ flexGrow: 1 }} />
        {/* Upcoming fixtures */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Sat 6 Jun · 9:30', sub: 'vs Harbour Rovers' },
            { label: 'Tonight · 6:00', sub: 'Training' },
            { label: 'Sat 13 Jun · 9:00', sub: 'at Kestrel Park' },
          ].map((f, i) => (
            <button key={f.label} onClick={() => setActiveEvent(i)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${activeEvent === i ? '#2f6252' : '#c5c8c4'}`, background: activeEvent === i ? '#eef5f2' : '#ffffff', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: activeEvent === i ? '#2f6252' : '#4a5a57' }}>{f.label}</div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>{f.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 300px', gap: 12, overflow: 'hidden' }}>

        {/* Kanban columns */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Column title="In" count={IN.length} items={IN} accent="#2f6252" />
        </div>
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Column title="Maybe" count={MAYBE.length} items={MAYBE} />
        </div>
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Column title="Can't make it" count={CANT.length} items={CANT} accent="#c39797" />
        </div>
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>No answer</span>
            <span style={{ fontSize: 20, fontWeight: 700, lineHeight: '26px' }}>{NO_ANS.length}</span>
          </div>
          {NO_ANS.map((p, i) => <PlayerPill key={i} {...p} />)}
          <button onClick={() => showToast('Reminder sent to 2 families.')} style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 'auto' }}>
            Remind 2 families
          </button>
        </div>

        {/* Right summary panel */}
        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ background: '#eef5f2', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2f6252', marginBottom: 4 }}>Saturday vs Harbour Rovers</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252', lineHeight: '38px' }}>{IN.length} in of 17</div>
            <div style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', marginTop: 6 }}>Enough for a 9 a side with 3 subs. Fair share is about 38 minutes each.</div>
            <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: '#c5d8d0' }}>
              <div style={{ height: 6, borderRadius: 3, background: '#2f6252', width: `${(IN.length/17)*100}%` }} />
            </div>
            <button onClick={() => showToast('Opening line-up for Saturday vs Harbour Rovers.')} style={{ marginTop: 12, width: '100%', height: 44, borderRadius: 10, border: '1px solid #2f6252', background: '#ffffff', color: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Pick the line-up
            </button>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Good to know</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {GOOD_TO_KNOW.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>
                  <span style={{ flex: 'none', width: 6, height: 6, borderRadius: '999px', background: '#40826d', marginTop: 6 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>
            Answers close Friday 6 pm. We'll remind anyone who hasn't answered at 4 pm.
          </div>
        </aside>
      </div>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
