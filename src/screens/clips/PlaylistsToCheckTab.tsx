import { useState } from 'react'
import { PLAYLISTS, SHARED_CLIPS, TO_CHECK_ITEMS, TO_CHECK_OPTIONS } from './clipData'

export function PlaylistsTab() {
  return (
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flexGrow: 1, padding: '20px 24px', overflowY: 'auto', borderRight: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Playlists</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PLAYLISTS.map(pl => (
            <div key={pl.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#fff', borderRadius: 12, border: '1px solid #e9eae8', cursor: 'pointer' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 3, flex: 'none' }}>
                {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 4, background: c }} />)}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{pl.title}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{pl.clips} clips{pl.dur ? ` · ${pl.dur}` : ''}</div>
              </div>
              {pl.note && <span style={{ fontSize: 12, background: '#eef5f2', color: '#2f6252', borderRadius: 6, padding: '3px 8px', fontWeight: 600 }}>{pl.note}</span>}
            </div>
          ))}
        </div>
        <button style={{ marginTop: 14, height: 44, borderRadius: 12, border: '1px dashed #c5c8c4', background: 'transparent', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>+ New playlist</button>
      </div>
      <div style={{ width: 300, flex: 'none', padding: '20px', overflowY: 'auto' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Shared with players</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SHARED_CLIPS.map((s, i) => (
            <div key={i} style={{ padding: '12px 14px', background: '#fff', borderRadius: 12, border: '1px solid #e9eae8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.ini}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{s.name}</span>
              </div>
              <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 4 }}>{s.clip}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: s.statusColor }}>{s.status}</span>
                {s.note && <span style={{ fontSize: 11, color: '#6f7f7b' }}>· {s.note}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ToCheckTab() {
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
          <div style={{ marginTop: 16, fontSize: 12, color: '#6f7f7b', lineHeight: '17px' }}>Only moments Clean Sheet is less than 80% sure about end up here.</div>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 }}>
          <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#10211f' }}>All checked. Thanks!</div>
          <div style={{ fontSize: 14, color: '#4a5a57', textAlign: 'center', lineHeight: '20px', maxWidth: 400 }}>Wins in their half stays at 13. The minute-47 clip and its running data moved to Mia. Zoe's chance is logged as saved.</div>
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
      <div style={{ width: 220, flex: 'none', borderRight: '1px solid #e9eae8', padding: '20px', overflowY: 'auto' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>To check</div>
        <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 10 }}>{TO_CHECK_ITEMS.length - doneCount} of {TO_CHECK_ITEMS.length} left · Ironbark United</div>
        <div style={{ height: 4, background: '#e9eae8', borderRadius: 2, overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ height: '100%', background: '#40826d', width: `${(doneCount / TO_CHECK_ITEMS.length) * 100}%`, transition: 'width 0.4s' }} />
        </div>
        {TO_CHECK_ITEMS.map((it, i) => (
          <button key={it.id} onClick={() => setActiveItem(i)} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', border: 0, background: 'transparent', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', borderTop: '1px solid #f0f1f0',
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

      <div style={{ flexGrow: 1, padding: '20px 24px', overflowY: 'auto', borderRight: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 12 }}>{item.game} · min {item.min}</div>
        <div style={{ background: '#1f4a3e', borderRadius: 14, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, position: 'relative' }}>
          <div style={{ width: 50, height: 50, borderRadius: '999px', border: '2px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </div>
          <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 12, color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: '2px 8px' }}>0:09 · plays twice, slowed down</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Why Clean Sheet isn't sure</div>
        <p style={{ margin: '0 0 12px', fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>Jai and their defender reached the ball together, right on halfway. It's hard to tell who got there first, and which side of the line it was.</p>
        <div style={{ fontSize: 13, color: '#6f7f7b', background: '#f7f9f7', borderRadius: 10, padding: '10px 12px' }}>Affects: wins of the ball in their half (13), Jai's pressing stats.</div>
      </div>

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
        }}>Confirm</button>
        <div style={{ marginTop: 10, fontSize: 12, color: '#6f7f7b' }}>Your answer updates the review straight away.</div>
      </div>
    </div>
  )
}
