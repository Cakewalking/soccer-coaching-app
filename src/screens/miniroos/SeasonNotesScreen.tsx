import { useState } from 'react'
import { EmptyCard } from '../clubadmin/ui'

type NoteStatus = 'sent' | 'draft' | 'todo'

const PLAYERS: Array<{ ini: string; name: string; status: NoteStatus; note?: string }> = [
  { ini: 'IC', name: 'Ivy',   status: 'sent',  note: 'Dribbling at players' },
  { ini: 'MB', name: 'Max',   status: 'sent',  note: 'Brave in goal' },
  { ini: 'AK', name: 'Arlo',  status: 'draft', note: 'Joined in term 2, now a captain' },
  { ini: 'ZM', name: 'Zara',  status: 'draft', note: 'Passes early' },
  { ini: 'LW', name: 'Leo',   status: 'draft', note: 'Found his voice' },
  { ini: 'EN', name: 'Evie',  status: 'draft', note: 'Left foot' },
  { ini: 'TS', name: 'Theo',  status: 'todo' },
  { ini: 'PD', name: 'Poppy', status: 'todo' },
  { ini: 'OH', name: 'Omar',  status: 'todo' },
  { ini: 'JL', name: 'Jude',  status: 'todo' },
]

const STATUS_LABEL: Record<NoteStatus, string> = {
  sent: 'Sent',
  draft: 'Draft',
  todo: 'To write',
}
const STATUS_COLORS: Record<NoteStatus, { bg: string; color: string }> = {
  sent:  { bg: '#eef5f2', color: '#2f6252' },
  draft: { bg: '#f5f3ef', color: '#7a5a00' },
  todo:  { bg: '#f0f1ef', color: '#4a5a57' },
}

function ArloDetail({ onSend, onEdit }: { onSend: () => void; onEdit: () => void }) {
  return (
    <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>AK</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Arlo Kaur</div>
          <div style={{ fontSize: 12, color: '#4a5a57' }}>To his dad, Raj · drafted from your game notes</div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4a5a57', marginBottom: 6 }}>He loved</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Being captain', 'Treasure island', 'Scoring', 'His turn in goal'].map(t => (
            <span key={t} style={{ padding: '4px 10px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252', fontSize: 13, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4a5a57', marginBottom: 6 }}>He got better at</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Joining in', 'Dribbling', 'Passing', 'Listening'].map(t => (
            <span key={t} style={{ padding: '4px 10px', borderRadius: '999px', background: '#f0f1ef', color: '#4a5a57', fontSize: 13, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '12px 14px', fontSize: 14, lineHeight: '21px', color: '#10211f', marginBottom: 16 }}>
        Arlo joined us in term 2 and by June he was captain. He loves Treasure island and now dribbles with his head up. Thank you for getting him to every session. See you next year!
      </div>

      <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 14 }}>No scores or comparisons. Two things he loved, two he got better at, in your words.</div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{ flexGrow: 1, height: 44, borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }} onClick={onSend}>Send to Arlo's dad</button>
        <button onClick={onEdit} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
      </div>
    </aside>
  )
}

export default function SeasonNotesScreen({ empty, onBack }: { empty?: boolean; onBack?: () => void }) {
  const [selected, setSelected] = useState('Arlo')
  const [toast, setToast] = useState('')
  const draftCount = PLAYERS.filter(p => p.status === 'draft').length

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2800) }

  if (empty) return <EmptyCard icon="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5" title="A short note for every family" desc="At the end of the season, Clean Sheet drafts a note for each child from what you tapped after games. You check it and send it." sidebarTitle="What goes in" items={[{ title: 'Two things they loved', desc: '' }, { title: 'Two things they got better at', desc: '' }]} footer="Never a score or a comparison." />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      {/* Header */}
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div>
          {onBack && <button onClick={onBack} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer', marginBottom: 8 }}>← Back</button>}
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Season notes</h1>
          <div style={{ fontSize: 14, color: '#4a5a57', marginTop: 2 }}>One short note for each family · 2 sent, {draftCount} drafted, 4 to write</div>
        </div>
        <button onClick={() => showToast(`Sent ${draftCount} draft notes.`)} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
          Send the {draftCount} drafts
        </button>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px', overflow: 'hidden' }}>
        {/* Player list */}
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {PLAYERS.map(p => {
            const sc = STATUS_COLORS[p.status]
            const isSelected = selected === p.name
            return (
              <button
                key={p.ini}
                onClick={() => setSelected(p.name)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', border: 'none', borderTop: '1px solid #e9eae8', background: isSelected ? '#f7fcf9' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const, minHeight: 60 }}
              >
                <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                  {p.note && <div style={{ fontSize: 13, color: '#4a5a57', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{p.note}</div>}
                </div>
                <span style={{ flexShrink: 0, padding: '3px 10px', borderRadius: '999px', fontSize: 12, fontWeight: 700, ...sc }}>{STATUS_LABEL[p.status]}</span>
              </button>
            )
          })}
        </section>

        {/* Detail */}
        {selected === 'Arlo' ? (
          <ArloDetail onSend={() => showToast("Sent to Arlo's dad, Raj.")} onEdit={() => showToast("Opening draft editor for Arlo.")} />
        ) : (
          <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>
              {PLAYERS.find(p => p.name === selected)?.ini ?? '?'}
            </div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{selected}</div>
            {PLAYERS.find(p => p.name === selected)?.status === 'todo' ? (
              <>
                <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>The draft for {selected} builds from what you tap after each game.</div>
                <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }} onClick={() => showToast('Opening draft for ' + selected + '.')}>Start a draft</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14, color: '#4a5a57' }}>Draft ready to review.</div>
                <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }} onClick={() => showToast('Opening draft for ' + selected + '.')}>Review draft</button>
              </>
            )}
          </aside>
        )}
      </main>

      {toast && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '12px 22px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 50, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}>{toast}</div>
      )}
    </div>
  )
}
