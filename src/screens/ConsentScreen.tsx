import { useState } from 'react'

const COLS = ['Filming in games', 'Boot sensors / GPS', 'Wellness check-ins', 'Clips to player', 'Club socials']

const ROWS = [
  { ini: 'EB', name: 'Ella Brandt',   sub: 'by Sarah Brandt',   cells: [true, true, true, true, false] },
  { ini: 'MT', name: 'Mia Tran',      sub: 'by Linh Tran',      cells: [true, true, true, true, true]  },
  { ini: 'AL', name: 'Ava Lindqvist', sub: 'by Erik Lindqvist', cells: [true, false, true, true, false] },
  { ini: 'NO', name: 'Noah Okafor',   sub: 'by Yemi Okafor',    cells: [true, true, true, false, false] },
  { ini: 'JP', name: 'Jai Patel',     sub: 'by Priya Patel',    cells: [true, true, true, true, true]  },
  { ini: 'LM', name: 'Leo Marsh',     sub: 'by Dan Marsh',      cells: [true, true, true, true, false] },
  { ini: 'GO', name: 'Grace Owusu',   sub: 'Waiting for parent', cells: [null, null, null, null, null]  },
  { ini: 'KR', name: 'Kai Russo',     sub: 'by Marco Russo',    cells: [true, false, true, true, false] },
]

const TILES = [
  { n: 11, label: 'All consented',    sub: 'No restrictions',      color: '#2f6252' },
  { n: 4,  label: 'Partial consent',  sub: 'Some limits set',      color: '#4a5a57' },
  { n: 1,  label: 'Waiting',          sub: 'Parent hasn\'t replied', color: '#c39797' },
]

function TickIcon({ value }: { value: boolean | null }) {
  if (value === null) {
    return (
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#f0f1ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 12h.01"/></svg>
        </span>
      </span>
    )
  }
  return (
    <span style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        background: value ? '#eef5f2' : '#fdf0ee',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={value ? '#2f6252' : '#9d7c80'} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {value
            ? <path d="M5 12l5 5 9-10"/>
            : <path d="M18 6L6 18M6 6l12 12"/>
          }
        </svg>
      </span>
    </span>
  )
}

export default function ConsentScreen({ empty }: { empty?: boolean }) {
  const [selIdx, setSelIdx] = useState(0)
  const sel = ROWS[selIdx]

  if (empty) {
    return (
      <div style={{ flexGrow: 1, minHeight: 0, padding: '20px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 20, boxSizing: 'border-box' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Consent and privacy</div>
          <div style={{ fontSize: 14, color: '#6f7f7b', marginBottom: 20 }}>No players yet</div>
          <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: '20px 20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Parents choose what is recorded</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5, marginBottom: 16 }}>{"When you add a player, their parent gets an invite. Until they answer, the player is blurred and nothing is recorded."}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 10 }}>WHAT PARENTS ARE ASKED</div>
            {[
              { q: 'Filming in games and training', a: 'If no: blurred in every clip and left out of video stats.' },
              { q: 'Boot sensors and a GPS vest', a: "If no: they don't wear the kit." },
              { q: 'Wellness check-ins', a: "If no: they aren't asked." },
              { q: 'Clips sent to the player', a: "If no: clips stay with coaches." },
              { q: 'Club highlights and socials', a: "If no: never used in club posts." },
            ].map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderTop: '1px solid #f0f1f0' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{item.q}</div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>{item.a}</div>
              </div>
            ))}
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: 1.5, marginTop: 12, paddingTop: 10, borderTop: '1px solid #f0f1f0' }}>{"Invites go out by email and text as soon as you add a player with a parent contact."}</div>
          </div>
          <button style={{ height: 44, padding: '0 24px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add players</button>
        </div>
        <div>
          <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>Club settings · set before you invite</div>
            {[
              { label: 'Blur faces when clips leave the coaches', note: 'Only players a clip is sent to are clear' },
              { label: 'Blur the other team', note: 'Always, outside coaching' },
              { label: 'Delete full match video after 90 days', note: 'Clips you keep stay' },
              { label: 'Allow clips to be downloaded', note: 'Off: watch inside Clean Sheet only' },
              { label: 'Store everything in Australia', note: 'Video and data on Australian servers' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57' }}>{s.note}</div>
                </div>
                <div style={{ width: 44, height: 24, borderRadius: '999px', background: '#e9eae8', flexShrink: 0 }} />
              </div>
            ))}
            <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: 1.5, marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f1f0' }}>{"Parents see these settings in their invite. Changes later are emailed to every family."}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 16, boxSizing: 'border-box' }}>

      {/* Left */}
      <div style={{ minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, lineHeight: '34px', fontWeight: 700, letterSpacing: '-0.02em' }}>Consent and privacy</h1>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 12, background: '#e9eae8' }}>
            <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>Players</button>
            <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#6f7f7b' }}>Club settings</button>
          </div>
        </div>

        {/* Summary tiles */}
        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
          {TILES.map(t => (
            <button key={t.label} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
              background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 14,
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            }}>
              <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: t.color, flex: 'none' }}>{t.n}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '20px', fontWeight: 700 }}>{t.label}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{t.sub}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ flex: '0 1 auto', minHeight: 0, overflow: 'auto', background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '0 14px' }}>
          {/* Header */}
          <div style={{
            position: 'sticky', top: 0, background: '#ffffff', zIndex: 1,
            display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) repeat(5, 72px)',
            gap: 6, alignItems: 'end', height: 54, paddingBottom: 6,
            boxSizing: 'border-box', borderBottom: '1px solid #e9eae8',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Player</span>
            {COLS.map(c => (
              <span key={c} style={{ fontSize: 11, lineHeight: '13px', fontWeight: 700, color: '#4a5a57', textAlign: 'center' }}>{c}</span>
            ))}
          </div>

          {/* Rows */}
          {ROWS.map((r, ri) => (
            <div key={ri} onClick={() => setSelIdx(ri)} style={{
              display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) repeat(5, 72px)',
              gap: 6, alignItems: 'center', minHeight: 52,
              borderTop: ri === 0 ? 'none' : '1px solid #f0f1ef',
              background: ri === selIdx ? '#eef5f2' : 'transparent',
              borderRadius: ri === selIdx ? 10 : 0, padding: '0 4px',
              cursor: 'pointer',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '999px', background: '#c39797', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>{r.ini}</span>
                <span>
                  <span style={{ display: 'block', fontSize: 15, lineHeight: '20px', fontWeight: 600 }}>{r.name}</span>
                  <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: r.sub.startsWith('Waiting') ? '#9d7c80' : '#4a5a57' }}>{r.sub}</span>
                </span>
              </span>
              {r.cells.map((v, ci) => <TickIcon key={ci} value={v} />)}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <aside style={{ minHeight: 0, overflow: 'auto', background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flex: 'none', width: 48, height: 48, borderRadius: '999px', background: '#c39797', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>{sel.ini}</span>
          <span style={{ flexGrow: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 19, lineHeight: '25px', fontWeight: 700 }}>{sel.name}</span>
            <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{sel.sub}</span>
          </span>
        </div>

        <div>
          {[
            { label: 'Filming in games', means: 'Video of matches and training', state: true },
            { label: 'Boot sensors / GPS', means: 'Speed, distance, and load data', state: true },
            { label: 'Wellness check-ins', means: 'Daily mood and sleep questions', state: true },
            { label: 'Clips to player', means: 'Player can see clips tagged to them', state: true },
            { label: 'Club socials', means: 'Photos and videos on club channels', state: false },
          ].map((pm, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '9px 0', borderTop: i === 0 ? 'none' : '1px solid #e9eae8' }}>
              <span style={{
                flex: 'none', width: 22, height: 22, borderRadius: '50%', marginTop: 1,
                background: pm.state ? '#eef5f2' : '#fdf0ee',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={pm.state ? '#2f6252' : '#9d7c80'} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {pm.state ? <path d="M5 12l5 5 9-10"/> : <path d="M18 6L6 18M6 6l12 12"/>}
                </svg>
              </span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 700 }}>{pm.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: pm.state ? '#2f6252' : '#9d7c80', whiteSpace: 'nowrap' }}>{pm.state ? 'Yes' : 'No'}</span>
                </span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{pm.means}</span>
              </span>
            </div>
          ))}
        </div>

        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button style={{ height: 44, borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See history</button>
            <button style={{ height: 44, borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>What parents see</button>
          </div>
          <span style={{ fontSize: 12, lineHeight: '17px', color: '#4a5a57' }}>Only parents can change these. Coaches can ask, but can't switch anything on.</span>
        </div>
      </aside>
    </div>
  )
}
