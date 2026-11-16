import { useEffect, useState } from 'react'
import { useSandbox } from './SandboxContext'
import { updateTeam, addPlayers, removePlayer, addFixtureFull, removeFixture, addStaff, removeStaff, setSettings, nextFixture, niceDate, type SbPlayer } from './sandboxStore'
import { takeWanted, onWanted, type SetupSection } from './sandboxNav'

// Team set-up: the coach's Home in the sandbox until the team is ready.
// Everything here is saved in the browser and read by the other roles
// (parent, team manager), so a visitor can set up a real team and look around.

const INK = '#10211f', MUT = '#4a5a57', LN = '#e9eae8', G = '#2f6252', GD = '#1f4a3e', PALE = '#eef5f2', BORDER = '#c5c8c4', SANDBG = '#f6f1e9', SAND = '#cbbeb5'
const input: React.CSSProperties = { height: 44, padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', color: INK, outline: 'none', boxSizing: 'border-box', width: '100%', background: '#fff' }
const btn: React.CSSProperties = { height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }
const btnP: React.CSSProperties = { ...btn, border: 0, background: G, color: '#fff', fontWeight: 700 }
const lab: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }

const AGES = ['Under 6', 'Under 7', 'Under 8', 'Under 9', 'Under 10', 'Under 11', 'Under 12', 'Under 13', 'Under 14', 'Under 15', 'Under 16', 'Under 18', 'Seniors']
const formatFor = (age: string) => { const n = parseInt(age.replace(/\D/g, ''), 10); return !n ? '11 a side' : n <= 7 ? '4 a side, no keepers' : n <= 9 ? '7 a side' : n <= 11 ? '9 a side' : '11 a side' }
const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Anywhere']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const ROLES = ['Assistant coach', 'Team manager', 'Fitness coach', 'Goalkeeper coach']

function Section({ id, n, title, done, summary, open, onToggle, children }: { id: string; n: number; title: string; done: boolean; summary: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <section data-setup={id} style={{ background: '#fff', border: `1.5px solid ${open ? G : BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
      <button onClick={onToggle} aria-expanded={open} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, padding: '10px 16px', border: 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
        <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '50%', border: done ? 'none' : `1.5px solid ${BORDER}`, background: done ? G : '#fff', color: done ? '#fff' : MUT, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {done ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg> : n}
        </span>
        <span style={{ flexGrow: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: INK }}>{title}</span>
          <span style={{ display: 'block', fontSize: 13, color: MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{summary}</span>
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && <div style={{ padding: '4px 16px 16px', borderTop: `1px solid ${LN}` }}>{children}</div>}
    </section>
  )
}

function Row({ title, sub, onRemove }: { title: string; sub?: string; onRemove: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, padding: '4px 0', borderTop: `1px solid ${LN}` }}>
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: MUT }}>{sub}</div>}
      </div>
      <button onClick={onRemove} aria-label={`Remove ${title}`} style={{ ...btn, padding: '0 12px', color: MUT }}>Remove</button>
    </div>
  )
}

export default function TeamSetup({ defaultAge = 'Under 12', onNav }: { defaultAge?: string; onNav?: (s: string) => void }) {
  const { store, update } = useSandbox()
  const team = store.teams[0]
  const [open, setOpen] = useState<SetupSection | null>(() => takeWanted() ?? (team ? (store.players.length ? (store.fixtures.length ? 'training' : 'fixtures') : 'players') : 'team'))
  useEffect(() => onWanted(() => { const w = takeWanted(); if (w) setOpen(w) }), [])
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2800) }

  // team
  const [name, setName] = useState(team?.name ?? '')
  const [age, setAge] = useState(team?.ageGroup || defaultAge)
  const [ground, setGround] = useState(team?.ground ?? '')
  // players
  const [pName, setPName] = useState(''); const [pPos, setPPos] = useState('Midfielder'); const [pParent, setPParent] = useState(''); const [pContact, setPContact] = useState('')
  const [paste, setPaste] = useState(''); const [pasteOpen, setPasteOpen] = useState(false)
  // fixtures
  const [opp, setOpp] = useState(''); const [fDate, setFDate] = useState(''); const [fTime, setFTime] = useState('09:30'); const [home, setHome] = useState(true)
  // training
  const [tDay, setTDay] = useState('Tue'); const [tTime, setTTime] = useState('17:30')
  // staff
  const [sName, setSName] = useState(''); const [sRole, setSRole] = useState(ROLES[0])

  const adults = age === 'Seniors'
  const nights = team?.trainingNights ?? []
  const staff = store.staff ?? []
  const set = store.settings ?? {}
  const done = { team: !!team, players: store.players.length >= 1, fixtures: store.fixtures.length >= 1, training: nights.length >= 1, staff: staff.length >= 1, kit: !!(set.checkins || set.camera || set.sensors) }
  const doneN = Object.values(done).filter(Boolean).length
  const toggle = (s: SetupSection) => setOpen(o => o === s ? null : s)
  const next = nextFixture(store)
  const needTeam = (fn: () => void) => { if (!team) { setOpen('team'); say('Name your team first.'); return } fn() }

  function saveTeam(e: React.FormEvent) {
    e.preventDefault()
    const n = name.trim(); if (!n) { say('Give the team a name.'); return }
    update(updateTeam(store, { name: n, ageGroup: age, ground: ground.trim() }))
    say(`${n} saved.`); setOpen(store.players.length ? null : 'players')
  }
  function addOne(e: React.FormEvent) {
    e.preventDefault()
    const n = pName.trim(); if (!n) { say('Type the player’s name.'); return }
    needTeam(() => { update(addPlayers(store, [{ name: n, position: pPos, parent: pParent.trim() || undefined, contact: pContact.trim() || undefined }])); setPName(''); setPParent(''); setPContact(''); say(`${n} added.`) })
  }
  function addPasted() {
    const rows = paste.split('\n').map(l => l.trim()).filter(Boolean).map(l => { const [n, pos] = l.split(/[,\t]/).map(x => x.trim()); const match = POSITIONS.find(p => pos && p.toLowerCase().startsWith(pos.toLowerCase().slice(0, 3))); return { name: n, position: match ?? 'Anywhere' } as Omit<SbPlayer, 'id' | 'teamId'> }).filter(r => r.name)
    if (!rows.length) { say('Paste one name per line.'); return }
    needTeam(() => { update(addPlayers(store, rows)); setPaste(''); setPasteOpen(false); say(`${rows.length} ${rows.length === 1 ? 'player' : 'players'} added.`) })
  }
  function copyLink() {
    const link = `${location.origin}/join/${(team?.name ?? 'team').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    navigator.clipboard?.writeText(link).then(() => say('Invite link copied. In the sandbox it is for show: nobody else can join.'), () => say(link))
  }
  function addGame(e: React.FormEvent) {
    e.preventDefault()
    const o = opp.trim(); if (!o || !fDate) { say('Add the other team and the date.'); return }
    needTeam(() => { update(addFixtureFull(store, { opponent: o, date: fDate, time: fTime, home })); setOpp(''); setFDate(''); say(`${home ? 'Home' : 'Away'} game against ${o} added.`) })
  }
  function addNight(e: React.FormEvent) {
    e.preventDefault()
    if (nights.some(n => n.day === tDay && n.time === tTime)) { say('That night is already in.'); return }
    needTeam(() => { update(updateTeam(store, { trainingNights: [...nights, { day: tDay, time: tTime }].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day)) })); say(`${tDay} ${tTime} added.`) })
  }
  function addHelper(e: React.FormEvent) {
    e.preventDefault()
    const n = sName.trim(); if (!n) { say('Type their name.'); return }
    needTeam(() => { update(addStaff(store, { name: n, role: sRole })); setSName(''); say(`${n} added as ${sRole.toLowerCase()}.`) })
  }
  const flip = (k: 'checkins' | 'camera' | 'sensors', label: string) => needTeam(() => { update(setSettings(store, { [k]: !set[k] })); say(`${label}: ${set[k] ? 'off' : 'on'}.`) })

  const fmtTime = (t?: string) => { if (!t) return ''; const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}` }

  return (
    <div data-screen="X1-HomeEmpty" style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 16, padding: '18px 28px 22px', boxSizing: 'border-box', overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 2 }}>
          <div style={{ flexGrow: 1 }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>{team ? `Set up ${team.name}` : 'Set up your team'}</h1>
            <div style={{ fontSize: 14, color: MUT }}>{doneN} of 6 done · saved on this device as you go</div>
          </div>
          <div aria-hidden="true" style={{ width: 160, height: 8, borderRadius: 4, background: LN }}><div style={{ width: `${(doneN / 6) * 100}%`, height: '100%', borderRadius: 4, background: G }} /></div>
        </div>

        <Section id="team" n={1} title="Your team" done={done.team} open={open === 'team'} onToggle={() => toggle('team')} summary={team ? `${team.name} · ${team.ageGroup || 'age not set'} · ${formatFor(team.ageGroup)}${team.ground ? ` · ${team.ground}` : ''}` : 'Name, age group and home ground'}>
          <form onSubmit={saveTeam} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr) minmax(0,2fr) auto', gap: 10, alignItems: 'end', paddingTop: 12 }}>
            <div><label style={lab} htmlFor="su-name">Team name</label><input id="su-name" style={input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. U12 Blues" /></div>
            <div><label style={lab} htmlFor="su-age">Age group</label><select id="su-age" style={input} value={age} onChange={e => setAge(e.target.value)}>{AGES.map(a => <option key={a}>{a}</option>)}</select></div>
            <div><label style={lab} htmlFor="su-ground">Home ground</label><input id="su-ground" style={input} value={ground} onChange={e => setGround(e.target.value)} placeholder="e.g. Riverside Reserve, pitch 2" /></div>
            <button type="submit" style={btnP}>{team ? 'Save changes' : 'Save team'}</button>
          </form>
          <div style={{ fontSize: 13, color: MUT, marginTop: 10 }}>{age} plays {formatFor(age)}.{parseInt(age.replace(/\D/g, ''), 10) < 12 ? ' No scores, ladders or sensors at this age.' : ''}</div>
        </Section>

        <Section id="players" n={2} title="Players" done={done.players} open={open === 'players'} onToggle={() => toggle('players')} summary={store.players.length ? `${store.players.length} added · ${store.players.slice(0, 4).map(p => p.name.split(' ')[0]).join(', ')}${store.players.length > 4 ? '…' : ''}` : 'Add one at a time, paste a list, or share a link'}>
          <form onSubmit={addOne} style={{ display: 'grid', gridTemplateColumns: adults ? 'minmax(0,2fr) minmax(0,1fr) auto' : 'minmax(0,2fr) minmax(0,1fr) minmax(0,1.5fr) minmax(0,1.5fr) auto', gap: 10, alignItems: 'end', paddingTop: 12 }}>
            <div><label style={lab} htmlFor="su-p">Player</label><input id="su-p" style={input} value={pName} onChange={e => setPName(e.target.value)} placeholder="First and last name" /></div>
            <div><label style={lab} htmlFor="su-pos">Position</label><select id="su-pos" style={input} value={pPos} onChange={e => setPPos(e.target.value)}>{POSITIONS.map(p => <option key={p}>{p}</option>)}</select></div>
            {!adults && <div><label style={lab} htmlFor="su-par">Parent or carer</label><input id="su-par" style={input} value={pParent} onChange={e => setPParent(e.target.value)} placeholder="Optional" /></div>}
            {!adults && <div><label style={lab} htmlFor="su-con">Their email or mobile</label><input id="su-con" style={input} value={pContact} onChange={e => setPContact(e.target.value)} placeholder="Optional" /></div>}
            <button type="submit" style={btnP}>Add player</button>
          </form>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <button style={btn} onClick={() => setPasteOpen(o => !o)}>{pasteOpen ? 'Close the list' : 'Paste a list'}</button>
            <button style={btn} onClick={copyLink}>Copy invite link</button>
          </div>
          {pasteOpen && (
            <div style={{ marginTop: 10 }}>
              <label style={lab} htmlFor="su-paste">One player per line. Add a position after a comma if you like.</label>
              <textarea id="su-paste" value={paste} onChange={e => setPaste(e.target.value)} rows={5} placeholder={'Asha Verma, Midfielder\nBen Holt, Defender\nCara Lim'} style={{ ...input, height: 'auto', padding: 12, lineHeight: 1.5, resize: 'vertical' }} />
              <button style={{ ...btnP, marginTop: 8 }} onClick={addPasted}>Add them all</button>
            </div>
          )}
          {store.players.length > 0 && <div style={{ marginTop: 12 }}>{store.players.map(p => <Row key={p.id} title={p.name} sub={[p.position, p.parent && `Parent: ${p.parent}`, p.contact].filter(Boolean).join(' · ')} onRemove={() => { update(removePlayer(store, p.id)); say(`${p.name} removed.`) }} />)}</div>}
        </Section>

        <Section id="fixtures" n={3} title="Fixtures" done={done.fixtures} open={open === 'fixtures'} onToggle={() => toggle('fixtures')} summary={store.fixtures.length ? `${store.fixtures.length} added · next: ${next ? `${niceDate(next.date)} ${next.home ? 'v' : 'at'} ${next.opponent}` : ''}` : 'Your games. Training and availability follow them'}>
          <form onSubmit={addGame} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1.2fr) minmax(0,1fr) auto auto', gap: 10, alignItems: 'end', paddingTop: 12 }}>
            <div><label style={lab} htmlFor="su-opp">Against</label><input id="su-opp" style={input} value={opp} onChange={e => setOpp(e.target.value)} placeholder="The other team" /></div>
            <div><label style={lab} htmlFor="su-date">Date</label><input id="su-date" type="date" style={input} value={fDate} onChange={e => setFDate(e.target.value)} /></div>
            <div><label style={lab} htmlFor="su-time">Kick-off</label><input id="su-time" type="time" style={input} value={fTime} onChange={e => setFTime(e.target.value)} /></div>
            <div role="group" aria-label="Home or away" style={{ display: 'flex', border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', height: 44 }}>
              {[true, false].map(h => <button key={String(h)} type="button" aria-pressed={home === h} onClick={() => setHome(h)} style={{ padding: '0 14px', border: 0, background: home === h ? G : '#fff', color: home === h ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{h ? 'Home' : 'Away'}</button>)}
            </div>
            <button type="submit" style={btnP}>Add game</button>
          </form>
          {store.fixtures.length > 0 && <div style={{ marginTop: 12 }}>{store.fixtures.map(f => <Row key={f.id} title={`${f.home ? 'v' : 'at'} ${f.opponent}`} sub={`${niceDate(f.date)}${f.time ? ` · ${fmtTime(f.time)}` : ''} · ${f.home ? 'home' : 'away'}`} onRemove={() => { update(removeFixture(store, f.id)); say('Game removed.') }} />)}</div>}
        </Section>

        <Section id="training" n={4} title="Training nights" done={done.training} open={open === 'training'} onToggle={() => toggle('training')} summary={nights.length ? nights.map(n => `${n.day} ${fmtTime(n.time)}`).join(' · ') : 'When you train each week'}>
          <form onSubmit={addNight} style={{ display: 'flex', gap: 10, alignItems: 'end', paddingTop: 12, flexWrap: 'wrap' }}>
            <div role="group" aria-label="Day" style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {DAYS.map(d => <button key={d} type="button" aria-pressed={tDay === d} onClick={() => setTDay(d)} style={{ ...btn, padding: '0 12px', background: tDay === d ? G : '#fff', color: tDay === d ? '#fff' : INK, borderColor: tDay === d ? G : BORDER }}>{d}</button>)}
            </div>
            <div style={{ width: 130 }}><label style={lab} htmlFor="su-tt">Start</label><input id="su-tt" type="time" style={input} value={tTime} onChange={e => setTTime(e.target.value)} /></div>
            <button type="submit" style={btnP}>Add night</button>
          </form>
          {nights.length > 0 && <div style={{ marginTop: 12 }}>{nights.map(n => <Row key={n.day + n.time} title={`${n.day} · ${fmtTime(n.time)}`} sub={team?.ground || undefined} onRemove={() => { update(updateTeam(store, { trainingNights: nights.filter(x => x !== n) })); say('Night removed.') }} />)}</div>}
        </Section>

        <Section id="staff" n={5} title="Coaches and helpers" done={done.staff} open={open === 'staff'} onToggle={() => toggle('staff')} summary={staff.length ? staff.map(m => `${m.name.split(' ')[0]} (${m.role.toLowerCase()})`).join(' · ') : 'An assistant coach or a team manager'}>
          <form onSubmit={addHelper} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1.5fr) auto', gap: 10, alignItems: 'end', paddingTop: 12 }}>
            <div><label style={lab} htmlFor="su-sn">Name</label><input id="su-sn" style={input} value={sName} onChange={e => setSName(e.target.value)} placeholder="Who helps you" /></div>
            <div><label style={lab} htmlFor="su-sr">What they do</label><select id="su-sr" style={input} value={sRole} onChange={e => setSRole(e.target.value)}>{ROLES.map(r => <option key={r}>{r}</option>)}</select></div>
            <button type="submit" style={btnP}>Add</button>
          </form>
          <div style={{ fontSize: 13, color: MUT, marginTop: 10 }}>In the real app each one gets an invite and needs a children check before they see any player.</div>
          {staff.length > 0 && <div style={{ marginTop: 12 }}>{staff.map(m => <Row key={m.id} title={m.name} sub={m.role} onRemove={() => { update(removeStaff(store, m.id)); say(`${m.name} removed.`) }} />)}</div>}
        </Section>

        <Section id="kit" n={6} title="Check-ins and kit" done={done.kit} open={open === 'kit'} onToggle={() => toggle('kit')} summary={[set.checkins && 'check-ins on', set.camera && 'camera connected', set.sensors && 'boots and vests paired'].filter(Boolean).join(' · ') || 'Optional. Turn on what your club has'}>
          {([['checkins', 'Wellness check-ins', 'Four quick questions, sent before every game and training session'], ['camera', 'Match camera', 'Films the game and finds the clips. Any camera the club owns'], ['sensors', 'Boots and vests', 'Running, sprints and touches. Skip this if your club has none']] as const).map(([k, title, sub], i) => (
            <button key={k} role="switch" aria-checked={!!set[k]} onClick={() => flip(k, title)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, padding: '8px 0', border: 0, borderTop: i ? `1px solid ${LN}` : 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', marginTop: i ? 0 : 8 }}>
              <span style={{ flexGrow: 1 }}><span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: INK }}>{title}</span><span style={{ display: 'block', fontSize: 13, color: MUT }}>{sub}</span></span>
              <span style={{ flex: 'none', width: 46, height: 28, borderRadius: 999, background: set[k] ? G : BORDER, position: 'relative' }}><span style={{ position: 'absolute', top: 3, left: set[k] ? 21 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff' }} /></span>
            </button>
          ))}
        </Section>
      </div>

      <aside style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: GD, color: '#fff', borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', color: '#f4c95d' }}>{team ? team.name.toUpperCase() : 'YOUR TEAM'}</div>
          <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.25, margin: '4px 0 8px' }}>{doneN === 6 ? 'You are set up.' : !team ? 'Start with a name.' : !done.players ? 'Next: add your players.' : !done.fixtures ? 'Next: add a game.' : 'Nearly there.'}</div>
          <div style={{ fontSize: 14, color: '#a9cfc0', lineHeight: 1.45 }}>{store.players.length} {store.players.length === 1 ? 'player' : 'players'} · {store.fixtures.length} {store.fixtures.length === 1 ? 'game' : 'games'} · {nights.length} training {nights.length === 1 ? 'night' : 'nights'}</div>
          {next && <div style={{ fontSize: 14, color: '#fff', marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.18)' }}>Next game: {niceDate(next.date)}{next.time ? `, ${fmtTime(next.time)}` : ''} {next.home ? 'v' : 'at'} {next.opponent}</div>}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Now look around</div>
          {[
            ['Squad', 'Your players, as the coach sees them', 'squad', done.players],
            ['Fixtures and results', 'Your games in the calendar', 'fixtures', done.fixtures],
            ['Availability', done.players && done.fixtures ? 'Who is in for each game. Mark answers yourself' : 'Needs a player and a game', 'AV1-Availability', done.players && done.fixtures],
          ].map(([t, s, target, ok]) => (
            <button key={t as string} disabled={!ok} onClick={() => onNav?.(target as string)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '6px 0', border: 0, borderTop: `1px solid ${LN}`, background: 'none', cursor: ok ? 'pointer' : 'default', fontFamily: 'inherit', textAlign: 'left', opacity: ok ? 1 : 0.55 }}>
              <span style={{ flexGrow: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{t}</span><span style={{ display: 'block', fontSize: 13, color: MUT }}>{s}</span></span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          ))}
        </div>
        <div style={{ background: PALE, borderRadius: 16, padding: '14px 16px', fontSize: 13, color: GD, lineHeight: 1.5 }}>
          <strong>Other roles read this.</strong> Use “Switch role” at the top left and open the parent or the team manager: they see your team, your games, and can answer who is coming.
        </div>
        <div style={{ background: SANDBG, border: `1px solid ${SAND}`, borderRadius: 16, padding: '14px 16px', fontSize: 13, color: INK, lineHeight: 1.5 }}>
          Film, clips, reviews and the training plan fill in after a game is recorded, so those tabs stay empty here. To see them full, press Reset at the top, then “Fill with sample data”.
        </div>
      </aside>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', maxWidth: 560, textAlign: 'center' }}>{toast}</div>}
    </div>
  )
}
