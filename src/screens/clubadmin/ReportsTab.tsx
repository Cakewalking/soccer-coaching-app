import { useState } from 'react'
import { SubTabBar } from './ui'

type ReportsView = 'board' | 'grants' | 'league' | 'season' | 'fees'

export default function ReportsTab() {
  const [view, setView] = useState<ReportsView>('board')

  const p = { padding: '16px 20px' }

  return (
    <>
      <SubTabBar
        items={[
          { id: 'board', label: 'Board' },
          { id: 'grants', label: 'Grants' },
          { id: 'league', label: 'League' },
          { id: 'season', label: 'Season' },
          { id: 'fees', label: 'Fees and volunteers' },
        ]}
        active={view}
        onSelect={id => setView(id as ReportsView)}
      />

      {view === 'board' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Board report summary</div>
            <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>This month's board report</button>
          </div>
          {[
            { title: 'Registrations', value: '212 / 220 target', pct: 96, color: '#40826d' },
            { title: 'Volunteer hours', value: '840 hrs this season', pct: 72, color: '#2f6252' },
            { title: 'Safeguarding training', value: '22 of 31 coaches done', pct: 71, color: '#c3a84a' },
            { title: 'Canteen revenue', value: '$4,200 this season', pct: 60, color: '#2f6252' },
            { title: 'Parent consent', value: '204 of 212 complete', pct: 96, color: '#40826d' },
          ].map((r, i) => (
            <div key={i} style={{ padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{r.title}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>{r.value}</div>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: '#f0f1f0' }}>
                <div style={{ height: 6, borderRadius: 3, background: r.color, width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
          <button style={{ marginTop: 20, height: 40, padding: '0 20px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Export PDF for board</button>
        </div>
      )}

      {view === 'grants' && (
        <div style={p}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Grant reports</div>
          {[
            { name: 'Community sport grant 2026', due: 'Due 30 Nov', status: 'Draft' as const, body: 'Report auto-filled from season data. Review before submitting.' },
            { name: 'Girls in sport bursary', due: 'Submitted Oct', status: 'Submitted' as const, body: 'Waiting on outcome. Covers kit and coaching for girls teams.' },
          ].map((g, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{g.name}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{g.due}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: g.status === 'Draft' ? '#c39797' : '#40826d', background: g.status === 'Draft' ? '#fdf4f4' : '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>{g.status}</span>
              </div>
              <div style={{ fontSize: 13, color: '#4a5a57' }}>{g.body}</div>
              {g.status === 'Draft' && <button style={{ marginTop: 10, height: 28, padding: '0 12px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Review draft</button>}
            </div>
          ))}
        </div>
      )}

      {view === 'league' && (
        <div style={p}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>League standing · Spring 2026</div>
          {[
            { team: 'U12 Sam', coach: 'Sam K', record: '7W · 2D · 1L', pts: 23 },
            { team: 'U12 Girls Ana', coach: 'Ana Silva', record: '6W · 2D · 1L', pts: 20 },
            { team: 'U13 Girls Meg', coach: 'Meg Doyle', record: '6W · 1D · 2L', pts: 19 },
            { team: 'U14 Josh', coach: 'Josh Kerr', record: '5W · 3D · 2L', pts: 18 },
            { team: "Men's 1sts", coach: 'Marko Petrovic', record: '8W · 2D · 2L', pts: 26 },
            { team: "Women's 1sts", coach: 'Steph Lau', record: '7W · 2D · 1L', pts: 23 },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#f0f1f0', color: '#6f7f7b', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{t.team}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{t.coach}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#10211f' }}>{t.pts} pts</div>
                <div style={{ fontSize: 11, color: '#6f7f7b' }}>{t.record}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'season' && (
        <div style={p}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>End of season overview</div>
          <div style={{ background: '#fdf8f4', borderRadius: 14, padding: '14px 16px', border: '1px solid #f0dcc8', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Season not complete yet</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>End-of-season report will generate when the last fixture is recorded.</div>
          </div>
          <button style={{ height: 40, padding: '0 20px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Preview draft report</button>
        </div>
      )}

      {view === 'fees' && (
        <div style={p}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ n: '$32,400', l: 'Collected', sub: '94% of target · $1,980 outstanding', color: '#10211f' }, { n: '14', l: 'Outstanding accounts', sub: 'Oldest: 42 days overdue', color: '#c39797' }, { n: '$2,100', l: 'Hardship waivers', sub: '7 families this season', color: '#c3a84a' }].map(s => (
              <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Outstanding accounts · 14</div>
                <button style={{ height: 32, padding: '0 12px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Send all invoices</button>
              </div>
              {[
                { ini: 'EB', name: 'Ella Brennan', team: 'U14 Sam', amount: '$180', days: 42, sent: 2 },
                { ini: 'HD', name: 'Harper Day', team: 'U14 Sam', amount: '$180', days: 28, sent: 1 },
                { ini: 'RC', name: 'Riley Clark', team: 'U11 Luke', amount: '$120', days: 14, sent: 0 },
                { ini: 'SD', name: 'Scott Davis', team: "Men's 1sts", amount: '$250', days: 7, sent: 0 },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a.ini}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: '#6f7f7b' }}>{a.team} · {a.days}d overdue · {a.sent > 0 ? `${a.sent} invoice${a.sent > 1 ? 's' : ''} sent` : 'not contacted'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#c39797' }}>{a.amount}</div>
                    <button style={{ height: 24, padding: '0 10px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 11, cursor: 'pointer', marginTop: 4 }}>Send invoice</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Season fees by age group</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '6px 0', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                  {['AGE GROUP','FEE','PAID'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                </div>
                {[{ age: 'MiniRoos', fee: '$120', pct: 94 }, { age: 'Juniors', fee: '$180', pct: 97 }, { age: 'Seniors', fee: '$250', pct: 88 }, { age: 'Over 35s', fee: '$200', pct: 100 }].map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 0', borderBottom: '1px solid #f0f1f0', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{row.age}</div>
                    <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.fee}</div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: row.pct >= 95 ? '#40826d' : '#c3a84a' }}>{row.pct}%</span>
                  </div>
                ))}
                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Total collected</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: '#10211f' }}>$32,400</span>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Volunteer hours · 840 hrs</div>
                {[
                  { name: 'Canteen roster', hours: '240 hrs', people: '12 families' },
                  { name: 'Ground setup', hours: '180 hrs', people: '8 families' },
                  { name: 'BBQ on game days', hours: '160 hrs', people: '10 families' },
                ].map((v, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{v.name}</div>
                      <div style={{ fontSize: 11, color: '#6f7f7b' }}>{v.people}</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#2f6252' }}>{v.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
