import { useState } from 'react'
import { SQUAD_PLAYERS, POS_GROUP_LABELS, type SquadPlayer, type PosGroup, type Role } from '../data'

interface Props {
  role: Role
  onPlayerProfile: (ini: string) => void
}

type Filter = 'all' | 'ready' | 'manage' | 'checkin' | 'goals'

function statusDot(status: SquadPlayer['status']): string {
  if (status === 'ready')   return '#40826d'
  if (status === 'manage')  return '#d4a844'
  if (status === 'checkin') return '#008080'
  return '#a3b0ad'
}

function avatarBg(status: SquadPlayer['status']): string {
  if (status === 'checkin') return '#c39797'
  if (status === 'missing') return '#d0d4d2'
  return '#cbbeb5'
}

function wellnessColor(w: number): string {
  if (w < 3.0) return '#9d7c80'
  if (w < 3.8) return '#10211f'
  return '#2f6252'
}

const POS_GROUPS: PosGroup[] = ['keepers', 'defenders', 'midfielders', 'forwards']

function PlayerCard({ p, selected, onClick }: { p: SquadPlayer; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
      padding: '8px 10px', border: 0, borderRadius: 10,
      background: selected ? '#e8f2ee' : 'transparent',
      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      outline: selected ? '2px solid #40826d' : 'none',
    }}>
      <div style={{ position: 'relative', flex: 'none', width: 36, height: 36 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '999px',
          background: avatarBg(p.status), color: '#10211f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700,
        }}>{p.ini}</div>
        <span style={{
          position: 'absolute', bottom: 0, right: 0, width: 10, height: 10,
          borderRadius: '999px', background: statusDot(p.status),
          border: '1.5px solid #ffffff',
        }} />
      </div>
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f', lineHeight: '17px' }}>{p.name}</div>
        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '16px' }}>{p.note}</div>
      </div>
      <div style={{ flex: 'none', fontSize: 14, fontWeight: 700, color: p.wellness ? wellnessColor(p.wellness) : '#a3b0ad' }}>
        {p.wellness ?? '—'}
      </div>
    </button>
  )
}

function RightPanel({ p, onProfile }: { p: SquadPlayer; onProfile: () => void }) {
  const alertColors: Record<string, { bg: string; text: string; label: string }> = {
    checkin: { bg: '#fdf0ee', text: '#7a3030', label: 'Check in · Low wellness' },
    manage:  { bg: '#fdf8e8', text: '#7a5a00', label: 'Manage load'             },
    missing: { bg: '#f7f8f7', text: '#4a5a57', label: 'No check-in today'       },
    ready:   { bg: '#edf8f2', text: '#2f6252', label: 'All good'                },
  }
  const alert = alertColors[p.status]

  const alertDesc =
    p.status === 'checkin' ? 'Have a quick chat before warm-up. Keep it light if she wants.' :
    p.status === 'manage'  ? `${p.note}. Monitor their load tonight.` :
    p.status === 'missing' ? 'No wellness check-in received. Chase before training.' :
    'Player is ready to train at full load.'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '999px', flex: 'none',
          background: avatarBg(p.status), color: '#10211f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700,
        }}>{p.ini}</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', lineHeight: '25px' }}>{p.fullName}</div>
          <div style={{ fontSize: 14, color: '#4a5a57' }}>{p.pos}</div>
        </div>
      </div>

      {/* Alert box */}
      <div style={{ background: alert.bg, borderRadius: 12, padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: alert.text, marginBottom: 4 }}>{alert.label}</div>
        <div style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{alertDesc}</div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {/* Wellness */}
        <div style={{ background: '#f7f8f7', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 4 }}>Wellness</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: p.wellness ? wellnessColor(p.wellness) : '#a3b0ad' }}>
            {p.wellness ?? '—'}
          </div>
          {p.wellness && <div style={{ fontSize: 11, color: '#6f7f7b' }}>of 5</div>}
        </div>

        {/* Load */}
        <div style={{ background: '#f7f8f7', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 4 }}>Load</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: p.load > 110 ? '#9d7c80' : '#10211f' }}>{p.load}%</div>
          <div style={{ marginTop: 4, height: 4, borderRadius: 2, background: '#e9eae8', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 4, borderRadius: 2, background: p.load > 110 ? '#c39797' : '#40826d', width: `${Math.min(100, p.load)}%` }} />
            {/* 110% marker */}
            <div style={{ position: 'absolute', top: -2, left: `${Math.min(100, 91)}%`, width: 1, height: 8, background: '#6f7f7b' }} />
          </div>
          <div style={{ fontSize: 10, color: '#6f7f7b', marginTop: 3 }}>of usual</div>
        </div>

        {/* Minutes */}
        <div style={{ background: '#f7f8f7', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 4 }}>Minutes</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', lineHeight: '25px' }}>{p.minutesUsed}</div>
          <div style={{ fontSize: 12, color: '#6f7f7b' }}>/ {p.minutes}</div>
        </div>
      </div>

      {/* Dev goal */}
      <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b' }}>Development goal</div>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: '999px',
            background: p.devGoalStatus === 'on-track' ? '#e8f2ee' : '#fdf0ee',
            color: p.devGoalStatus === 'on-track' ? '#2f6252' : '#7a3030',
          }}>{p.devGoalStatus === 'on-track' ? 'On track' : 'Needs work'}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>{p.devGoal}</div>
        <div style={{ height: 4, borderRadius: 2, background: '#e9eae8' }}>
          <div style={{ height: 4, borderRadius: 2, background: p.devGoalStatus === 'on-track' ? '#40826d' : '#c39797', width: p.devGoalStatus === 'on-track' ? '68%' : '30%' }} />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onProfile} style={{
          flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff',
          fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
        }}>Full profile</button>
        <button style={{
          flex: 1, height: 44, borderRadius: 10, border: 0, background: '#2f6252',
          fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff',
        }}>Message parent</button>
      </div>
    </div>
  )
}

export default function SquadScreen({ onPlayerProfile }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<SquadPlayer>(
    SQUAD_PLAYERS.find(p => p.ini === 'EB')!
  )

  const counts = {
    all:    SQUAD_PLAYERS.length,
    ready:  SQUAD_PLAYERS.filter(p => p.status === 'ready').length,
    manage: SQUAD_PLAYERS.filter(p => p.status === 'manage').length,
    checkin:SQUAD_PLAYERS.filter(p => p.status === 'checkin' || p.status === 'missing').length,
    goals:  SQUAD_PLAYERS.filter(p => p.devGoalStatus === 'needs-work').length,
  }

  const visible = SQUAD_PLAYERS.filter(p => {
    if (filter === 'all')    return true
    if (filter === 'ready')  return p.status === 'ready'
    if (filter === 'manage') return p.status === 'manage'
    if (filter === 'checkin')return p.status === 'checkin' || p.status === 'missing'
    if (filter === 'goals')  return p.devGoalStatus === 'needs-work'
    return true
  })

  const filters: Array<{ id: Filter; label: string; color: string }> = [
    { id: 'all',     label: `All ${counts.all}`,             color: '#10211f' },
    { id: 'ready',   label: `Ready ${counts.ready}`,         color: '#40826d' },
    { id: 'manage',  label: `Manage load ${counts.manage}`,  color: '#d4a844' },
    { id: 'checkin', label: `Check in ${counts.checkin}`,    color: '#008080' },
    { id: 'goals',   label: `Goals need work ${counts.goals}`,color: '#40826d' },
  ]

  // bottom stats
  const devOnTrack = SQUAD_PLAYERS.filter(p => p.devGoalStatus === 'on-track').length
  const wellnessAvg = (SQUAD_PLAYERS.filter(p => p.wellness).reduce((s, p) => s + (p.wellness ?? 0), 0) / SQUAD_PLAYERS.filter(p => p.wellness).length).toFixed(1)
  const overloaded = SQUAD_PLAYERS.filter(p => p.load > 110)

  return (
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>

      {/* Main column */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 24px 24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Squad</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>16 players · Thursday 5 Nov · 2 days to Harbour Rovers</span>
          <div style={{ flexGrow: 1 }} />
          <button style={{ height: 40, padding: '0 16px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Message parents</button>
          <button style={{ height: 40, padding: '0 16px', borderRadius: '999px', border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>+ Add player</button>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: `1px solid ${filter === f.id ? f.color : '#e9eae8'}`,
              background: filter === f.id ? '#10211f' : '#ffffff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              color: filter === f.id ? '#ffffff' : '#10211f',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {f.id !== 'all' && <span style={{ width: 8, height: 8, borderRadius: '999px', background: filter === f.id ? '#ffffff' : f.color, flexShrink: 0 }} />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Position groups: 4 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 24 }}>
          {POS_GROUPS.map(group => {
            const players = visible.filter(p => p.posGroup === group)
            const all = SQUAD_PLAYERS.filter(p => p.posGroup === group)
            return (
              <div key={group}>
                <div style={{ padding: '0 10px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b' }}>
                    {POS_GROUP_LABELS[group]}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b' }}>{all.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {players.map(p => (
                    <PlayerCard key={p.ini} p={p} selected={selected.ini === p.ini} onClick={() => setSelected(p)} />
                  ))}
                  {players.length === 0 && (
                    <div style={{ padding: '12px 10px', fontSize: 13, color: '#a3b0ad' }}>None in this filter</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Note */}
        <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 20 }}>
          Numbers show today's wellness check-in, out of 5. &nbsp;
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '999px', background: '#40826d', display: 'inline-block' }} /> Ready &nbsp;
            <span style={{ width: 8, height: 8, borderRadius: '999px', background: '#d4a844', display: 'inline-block' }} /> Manage load &nbsp;
            <span style={{ width: 8, height: 8, borderRadius: '999px', background: '#008080', display: 'inline-block' }} /> Check in
          </span>
        </div>

        {/* Bottom stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {/* Dev goals */}
          <div style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 8 }}>Development goals</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>{devOnTrack} of 16 on track</div>
            <div style={{ height: 6, borderRadius: 3, background: '#e9eae8', marginBottom: 6 }}>
              <div style={{ height: 6, borderRadius: 3, background: '#40826d', width: `${(devOnTrack/16)*100}%` }} />
            </div>
            <div style={{ fontSize: 13, color: '#4a5a57' }}>{counts.goals} need work · {16 - devOnTrack - counts.goals} to set</div>
          </div>

          {/* Wellness */}
          <div style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 8 }}>Wellness this week</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>{wellnessAvg} / 5</div>
            <div style={{ fontSize: 13, color: '#4a5a57' }}>Up from 3.6 · 11 of 16 checked in today</div>
          </div>

          {/* Load */}
          <div style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 8 }}>Load this week</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>{overloaded.length} above usual</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
              {overloaded.map(p => (
                <span key={p.ini} style={{ background: '#fdf8e8', border: '1px solid #e9d88a', borderRadius: '999px', padding: '2px 8px', fontSize: 12, fontWeight: 600, color: '#7a5a00' }}>{p.fullName.split(' ')[0]}</span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#4a5a57' }}>Team load 118% of plan</div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', padding: '24px 20px', overflowY: 'auto', background: '#ffffff' }}>
        <RightPanel p={selected} onProfile={() => onPlayerProfile(selected.ini)} />
      </div>
    </div>
  )
}
