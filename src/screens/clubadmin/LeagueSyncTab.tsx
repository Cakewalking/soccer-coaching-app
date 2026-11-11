import { useState } from 'react'
import { EmptyCard, FOOTER_DEFAULT } from './ui'

const THIS_WEEKEND = [
  { time: '9:00',  team: 'U9 Mark',    comp: 'Kangaroos',  opp: 'Glenview Park',   venue: 'Home · pitch 4',               changed: false },
  { time: '9:30',  team: 'U10 Nadia',  comp: 'Wallabies',  opp: 'Tealside Town',   venue: 'Away · Elderberry Park',       changed: false },
  { time: '9:30',  team: 'U12 Sam',    comp: 'Division 1', opp: 'Harbour Rovers',  venue: 'Home · pitch 2',               changed: false },
  { time: '12:30', team: 'U13 Chris',  comp: 'Division 2', opp: 'Glenview Park',   venue: "Away · moved from 12:00",      changed: true  },
  { time: '1:30',  team: 'U14 Josh',   comp: 'Division 1', opp: 'Ironbark United', venue: 'Away · Ironbark Park',         changed: false },
  { time: '3:30',  team: 'U16 Ollie',  comp: 'Division 1', opp: 'Harbour Rovers',  venue: 'Away · new venue',             changed: true  },
]

const RESULTS_BACK = [
  { team: 'U12 Sam',       score: 'Won 3–1 v Ironbark United',  status: 'sent'    },
  { team: 'U12 Girls Ana', score: 'Won 2–0 v Glenview Park',    status: 'sent'    },
  { team: 'U13 Chris',     score: 'Drew 1–1 v Tealside Town',   status: 'sent'    },
  { team: 'U14 Josh',      score: 'Won 2–1 v Kingfisher United', status: 'waiting' },
  { team: 'U16 Ollie',     score: 'Lost 1–3 v Glenview Park',   status: 'differs' },
]

export default function LeagueSyncTab({ empty }: { empty?: boolean }) {
  const [toastMsg, setToastMsg] = useState('')
  function showToast(m: string) { setToastMsg(m); setTimeout(() => setToastMsg(''), 3000) }

  if (empty) return <EmptyCard icon="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" title="Not connected to Dribl yet" desc="Connect once and fixtures, venues and changes come in for every team from U12 up." cta="Connect Dribl" items={[{ title: 'Changes reach families', desc: 'Calendar, roster, reminders' }, { title: 'Results go back', desc: 'After the manager confirms' }]} footer={FOOTER_DEFAULT} />

  return (
    <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, alignItems: 'start' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Sync banner */}
        <div style={{ background: '#eef5f2', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Synced with Dribl 6:02 am today</div>
            <div style={{ fontSize: 13, color: '#4a5a57' }}>Fixtures come in from Dribl, Football Victoria's system · U12 and up results go back</div>
          </div>
        </div>

        {/* This weekend */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>This weekend from the league</h2>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>Sat 6 Jun · 6 of 14 games</span>
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '48px minmax(0,1fr) 90px minmax(0,1fr) 90px', gap: '0 10px', borderBottom: '1px solid #e9eae8', paddingBottom: 6, marginBottom: 2 }}>
            {['Time', 'Team', '', 'Against', ''].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>{h}</span>
            ))}
          </div>
          {THIS_WEEKEND.map((g, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px minmax(0,1fr) 90px minmax(0,1fr) 90px', gap: '0 10px', alignItems: 'center', minHeight: 52, borderTop: '1px solid #f0f1ef' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#4a5a57' }}>{g.time}</span>
              <span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{g.team}</span>
                <span style={{ display: 'block', fontSize: 12, color: '#4a5a57' }}>{g.comp}</span>
              </span>
              <span style={{ fontSize: 13, color: '#4a5a57' }}></span>
              <span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{g.opp}</span>
                <span style={{ display: 'block', fontSize: 12, color: '#4a5a57' }}>{g.venue}</span>
              </span>
              <span>
                {g.changed ? (
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: '#fdf4f4', color: '#8a4f4f', fontSize: 12, fontWeight: 700 }}>Changed</span>
                ) : (
                  <span style={{ fontSize: 13, color: '#4a5a57' }}>Same</span>
                )}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 13, color: '#4a5a57', borderTop: '1px solid #e9eae8', paddingTop: 10 }}>When the league moves a game, the team's calendar, the duty roster and parents' reminders change too. 2 changes this week.</div>
        </div>

        {/* Results back */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700 }}>Results to the league</h2>
          <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 10 }}>Sat 30 May</div>
          {RESULTS_BACK.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: i > 0 ? '1px solid #f0f1ef' : 'none' }}>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{r.team}</div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>{r.score}</div>
              </div>
              {r.status === 'sent'    && <span style={{ fontSize: 13, color: '#2f6252', fontWeight: 600 }}>Sent</span>}
              {r.status === 'waiting' && <span style={{ fontSize: 13, color: '#7a5a00', fontWeight: 600 }}>Waiting for manager</span>}
              {r.status === 'differs' && <button onClick={() => showToast('Opening score discrepancy for U16 Ollie.')} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: 0, background: '#c39797', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#10211f' }}>Fix</button>}
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 12, color: '#4a5a57', borderTop: '1px solid #e9eae8', paddingTop: 10 }}>MiniRoos (U6–U11) don't keep scores, so nothing is sent. From U12, the home team enters the score in Dribl within 48 hours when there's no league referee. The team manager confirms it first.</div>
        </div>
      </section>

      {/* Sidebar */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700 }}>About Dribl</h2>
        <p style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', margin: '0 0 12px' }}>Dribl is Football Victoria's match management system. Fixtures, results and team registrations flow through it.</p>
        <p style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', margin: '0 0 12px' }}>Clean Sheet syncs at 6 am every day and again after any fixture changes.</p>
        <button onClick={() => showToast('Syncing with Dribl now.')} style={{ height: 44, width: '100%', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Sync now</button>
      </aside>

      {toastMsg && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '12px 22px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 50, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}>{toastMsg}</div>
      )}
    </div>
  )
}
