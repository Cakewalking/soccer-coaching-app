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

export default function AvailabilityScreen() {
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
            { label: 'Sat 7 Nov · 9:30', sub: 'vs Harbour Rovers', active: true },
            { label: 'Tonight · 6:00', sub: 'Training', active: false },
            { label: 'Sat 14 Nov · 9:00', sub: 'at Kestrel Park', active: false },
          ].map(f => (
            <button key={f.label} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${f.active ? '#2f6252' : '#c5c8c4'}`, background: f.active ? '#eef5f2' : '#ffffff', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: f.active ? '#2f6252' : '#4a5a57' }}>{f.label}</div>
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
          <button style={{ height: 40, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 'auto' }}>
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
            <button style={{ marginTop: 12, width: '100%', height: 40, borderRadius: 10, border: '1px solid #2f6252', background: '#ffffff', color: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
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
    </div>
  )
}
