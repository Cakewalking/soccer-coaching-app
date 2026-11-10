import { useState } from 'react'

type CaseStatus = 'new' | 'ontrack'

const CASES: Array<{ ini: string; name: string; desc: string; from: string; date?: string; status: CaseStatus }> = [
  { ini: 'MT', name: 'Mia Tran · U12 Sam',      desc: 'Left out at training, upset twice this fortnight',   from: 'From her mum, Linh · Thu 4 Jun · wants a call',  status: 'new' },
  { ini: '?',  name: 'A player · U13 Girls Meg', desc: 'Very quiet since changing schools',                  from: 'From coach Meg Doyle · 27 May · family meeting held', status: 'ontrack' },
  { ini: '?',  name: 'Away spectator · U14 Josh game', desc: 'Shouting at the referee',                     from: 'From Josh Kerr · 1 Jun · sent to Kingfisher United', status: 'ontrack' },
]

function StatusBadge({ status }: { status: CaseStatus }) {
  if (status === 'new') return <span style={{ padding: '3px 10px', borderRadius: '999px', background: '#fdf4f4', color: '#8a4f4f', fontSize: 12, fontWeight: 700 }}>New</span>
  return <span style={{ padding: '3px 10px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252', fontSize: 12, fontWeight: 700 }}>On track</span>
}

export default function WelfareTab() {
  const [selected, setSelected] = useState(0)
  const [toastMsg, setToastMsg] = useState('')
  function showToast(m: string) { setToastMsg(m); setTimeout(() => setToastMsg(''), 3000) }

  return (
    <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 14, alignItems: 'start' }}>
      {/* Case list */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>My cases</h2>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>Welfare officer · 3 open · only you see names and details</span>
          </div>
          <button onClick={() => showToast('Opening concern form.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>Log a concern yourself</button>

          <div style={{ fontSize: 13, color: '#4a5a57', fontWeight: 700, marginBottom: 6 }}>Open · Newest first</div>
          {CASES.map((c, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 0', border: 'none', borderTop: '1px solid #e9eae8', background: selected === i ? '#f7fcf9' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}>
              <div style={{ width: 40, height: 40, borderRadius: '999px', background: c.status === 'new' ? '#fdf4f4' : '#e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, color: '#10211f' }}>{c.ini}</div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{c.name}</span>
                  <StatusBadge status={c.status} />
                </div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>{c.desc}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{c.from}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ padding: '12px 16px', borderRadius: 14, background: '#f7f8f7', border: '1px solid #e9eae8', fontSize: 13, color: '#4a5a57', lineHeight: '19px' }}>
          The director and the chair see only that a case exists and whether it's on track. If a concern is about an adult's behaviour towards a child, the club may have to tell Victoria's Social Services Regulator within 3 business days. Check with Football Victoria.
        </div>
      </section>

      {/* Case detail */}
      {selected === 0 ? (
        <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Mia Tran</div>
            <span style={{ padding: '4px 12px', borderRadius: '999px', background: '#fdf8e8', color: '#7a5a00', fontSize: 13, fontWeight: 700 }}>Call by Sat 6 Jun</span>
          </div>

          <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '12px 14px', fontSize: 14, lineHeight: '21px', color: '#10211f', marginBottom: 14, fontStyle: 'italic' as const }}>
            "Mia has come home upset after training twice this fortnight. She says she's left out when they pick passing groups."
          </div>

          {[
            { label: 'Raised by',    value: 'Linh Tran, mum' },
            { label: 'About',        value: 'Her own child' },
            { label: 'Wants',        value: 'A phone call' },
            { label: 'Who can see this', value: 'Only you' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: '1px solid #e9eae8' }}>
              <span style={{ width: 110, flexShrink: 0, fontSize: 13, color: '#4a5a57' }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{r.value}</span>
            </div>
          ))}

          <div style={{ padding: '10px 12px', marginTop: 10, borderRadius: 12, background: '#eef5f2', fontSize: 13, color: '#2f6252', lineHeight: '19px' }}>
            Sam, her coach, doesn't know this was raised. Talk to Linh first and agree what Sam is told.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
            <button onClick={() => showToast('Opening call with Linh.')} style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Call Linh</button>
            <button onClick={() => showToast('Adding a note.')} style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Add a note</button>
            <button onClick={() => showToast('Opening mandatory reporting guide.')} style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Must this be reported?</button>
          </div>
        </aside>
      ) : (
        <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center', minHeight: 200 }}>
          <StatusBadge status={CASES[selected].status} />
          <div style={{ fontSize: 15, fontWeight: 700 }}>{CASES[selected].name}</div>
          <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '19px' }}>{CASES[selected].from}</div>
          <button onClick={() => showToast('Opening case details.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>View details</button>
        </aside>
      )}

      {toastMsg && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '12px 22px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 50, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}>{toastMsg}</div>
      )}
    </div>
  )
}
