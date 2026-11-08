import { useState } from 'react'
import { COACHES_DATA, CONCERNS, CONCUSSIONS } from './data'
import { SubTabBar } from './ui'

type SafeguardingView = 'checks' | 'consent' | 'concerns' | 'datareq' | 'concussion' | 'sideline'

const STAGES = ['Rest', 'Light activity', 'Non-contact training', 'Contact training', 'Games']

export default function SafeguardingTab() {
  const [view, setView] = useState<SafeguardingView>('checks')

  const p = { padding: '16px 20px' }

  return (
    <>
      <SubTabBar
        items={[
          { id: 'checks', label: 'Children checks' },
          { id: 'consent', label: 'Consent' },
          { id: 'concerns', label: 'Concerns' },
          { id: 'datareq', label: 'Data requests' },
          { id: 'concussion', label: 'Concussion' },
          { id: 'sideline', label: 'Sideline' },
        ]}
        active={view}
        onSelect={id => setView(id as SafeguardingView)}
      />

      {view === 'checks' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Working with children checks</div>
            <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Club course</button>
          </div>
          {COACHES_DATA.map((c, i) => {
            const expiring = c.checkDays > 0 && c.checkDays <= 30
            const urgent = c.checkDays > 0 && c.checkDays <= 14
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.ini}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>{c.team}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: urgent ? '#c39797' : expiring ? '#c3a84a' : '#40826d', background: urgent ? '#fdf4f4' : expiring ? '#fdf8ed' : '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>
                  {c.check}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {view === 'consent' && (
        <div style={p}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f', marginBottom: 4 }}>Consent</div>
          <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 20 }}>What parents have agreed to, and what is still outstanding</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ n: '204 of 212', l: 'Consent forms complete', c: '#40826d' }, { n: '8', l: 'Still pending', c: '#c39797' }, { n: '0', l: 'Data requests waiting', c: '#40826d' }].map(s => (
              <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>What parents consent to</div>
            {[
              { label: 'Filming at games', pct: 96 },
              { label: 'Wellness check-ins', pct: 94 },
              { label: 'GPS vest measurements', pct: 88 },
              { label: 'Sharing clips with the team', pct: 91 },
            ].map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: '#10211f' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.pct}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: '#f0f1f0' }}><div style={{ height: 4, borderRadius: 2, background: '#2f6252', width: `${item.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'concerns' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{CONCERNS.length} concerns</div>
            <button style={{ height: 32, padding: '0 12px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Log concern</button>
          </div>
          {CONCERNS.map((c, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{c.date} · {c.team}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.status === 'open' ? '#c39797' : '#40826d', background: c.status === 'open' ? '#fdf4f4' : '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>{c.status}</span>
              </div>
              <div style={{ fontSize: 14, color: '#10211f', marginBottom: 4 }}>{c.subject}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Assigned to {c.assignee}</div>
            </div>
          ))}
        </div>
      )}

      {view === 'datareq' && (
        <div style={p}>
          <div style={{ background: '#fdf8f4', borderRadius: 14, padding: '14px 16px', border: '1px solid #f0dcc8', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Data requests</div>
            <div style={{ fontSize: 13, color: '#6f7f7b', lineHeight: '18px' }}>Parents and players can request a copy of their data. Requests must be responded to within 30 days.</div>
          </div>
          <div style={{ fontSize: 13, color: '#6f7f7b', textAlign: 'center', padding: '32px 0' }}>No pending requests</div>
        </div>
      )}

      {view === 'concussion' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, padding: p.padding }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Concussion</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>Return to play · AIS concussion guidelines 2024 · community football</div>
              </div>
              <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Log a head knock</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Returning to play</div>
              <span style={{ fontSize: 12, color: '#6f7f7b' }}>{CONCUSSIONS.length} players</span>
            </div>
            {CONCUSSIONS.map((c, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#c39797', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.ini}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{c.name} · {c.team}</div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#c39797', background: '#fdf4f4', borderRadius: 6, padding: '2px 8px' }}>Out of line-ups</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{c.headKnock}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Day {c.day} of {c.total}</div>
                  <div style={{ fontSize: 12, color: c.status.includes('No symptoms') ? '#40826d' : '#c39797' }}>{c.status}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  {STAGES.map((stage, si) => (
                    <div key={si} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ height: 4, borderRadius: 2, background: si <= c.stage ? '#2f6252' : '#f0f1f0', marginBottom: 4 }} />
                      <div style={{ fontSize: 10, color: si <= c.stage ? '#2f6252' : '#6f7f7b', fontWeight: si === c.stage ? 700 : 400 }}>{stage}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 10 }}>{c.note}</div>
                <button style={{ height: 28, padding: '0 12px', borderRadius: '999px', border: '1px solid #2f6252', background: '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{c.action}</button>
              </div>
            ))}
            <div style={{ padding: '12px 14px', background: '#fff', borderRadius: 10, border: '1px solid #e9eae8', fontSize: 12, color: '#6f7f7b' }}>
              If in doubt, sit them out. Anyone with a suspected concussion stops playing that day and sees a doctor. Coaches and managers cannot pick a player until they're cleared.
            </div>
          </div>
          <div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Concussion officer</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MB</div>
                <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Marco Bellini</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>Physio · club volunteer</div></div>
              </div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Told about every knock. <button style={{ background: 'none', border: 0, color: '#2f6252', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, padding: 0 }}>Change</button></div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>This season</div>
              {[{ label: 'Head knocks logged', value: '6' }, { label: 'Returned to play', value: '4' }, { label: 'Average days out', value: '24' }, { label: 'Played too soon', value: '0' }].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#6f7f7b' }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: row.label === 'Played too soon' ? '#40826d' : '#10211f' }}>{row.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 11, color: '#6f7f7b' }}>Senior players follow the same steps. No game until at least 21 days after the knock.</div>
            </div>
          </div>
        </div>
      )}

      {view === 'sideline' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, padding: p.padding }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f', marginBottom: 4 }}>Sideline behaviour</div>
            <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 20 }}>Reports from team managers this season</div>
            {[
              { date: '30 May', team: 'U12 Sam', desc: 'Sideline language complaint from opposing family. Coach managed on the day.', status: 'Noted' as const },
              { date: '12 Oct', team: 'U12 Sam', desc: 'Parent repeatedly coaching from the sideline despite being asked to stop.', status: 'Resolved' as const },
            ].map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{r.date} · {r.team}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: r.status === 'Noted' ? '#c3a84a' : '#40826d', background: r.status === 'Noted' ? '#fdf8ed' : '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>{r.status}</span>
                </div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Code of conduct</div>
            <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 12 }}>All parents and spectators agree to the code of conduct when their child registers.</div>
            {[{ label: 'Agreed this season', value: '204 of 212' }, { label: 'Reports this season', value: '2' }, { label: 'Escalated to committee', value: '0' }].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <span style={{ fontSize: 13, color: '#6f7f7b' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
