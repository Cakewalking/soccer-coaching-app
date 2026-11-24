// AD23-AddCoach: Academy owner: inviting a coach, choosing their groups, and recording that their children check was looked up and connected.
// An INPUT that writes to the store (programs v2, 24 Nov): "Send the invite" calls `addCoach`, and the adult is on Children checks (AD17)
// with what was ticked here: the check current or still to look up, linked or still to link, and the course due. AD17's three counts move.
// Putting a coach in charge of a team is done on that team ("Change this team", AD20), which is where a team's coach is put in.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { useContext, useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { Field, Picks, Tick } from './formKit'
import { OwnerGo } from './ownerMenu'
import { demoToast } from '../demoToast'
import { addCoach, useAcademy } from './academyStore'

const ROLES = ['Coach', 'Assistant coach', 'Volunteer']
const label = { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 } as const
const two = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 } as const

export default function AD23AddCoach() {
  const a = useAcademy(), go = useContext(OwnerGo)
  const [f, setF] = useState({ name: 'Mia Farrow', role: 1, groups: 'Foundation · Mon and Wed', runsOut: '14 March 2031', looked: false, linked: false })
  const put = <K extends keyof typeof f>(k: K) => (v: (typeof f)[K]) => setF(x => ({ ...x, [k]: v }))
  const name = f.name.trim(), first = name.split(' ')[0] || 'They'
  function save() {
    if (!name) { demoToast('Type the coach’s name first.'); return }
    if (a.adults.some(x => x.name === name && !x.added)) { demoToast(`${name} is already on Children checks.`); return }
    addCoach({ name, role: [ROLES[f.role], f.groups.trim()].filter(Boolean).join(' · '), checkOk: f.looked, check: f.looked ? 'Current' : 'To look up', linked: f.linked, course: false })
    demoToast(`Invite sent to ${name}. ${first} is on Children checks: ${f.looked ? 'check current' : 'check still to look up'}, ${f.linked ? 'linked' : 'still to link'}, course due.${f.looked && f.linked ? '' : ` ${first} can’t open a session until both ticks are done.`}`)
    go('AD17-Checks')
  }
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Add a coach</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>They can’t open a session until both ticks are done</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD17-Checks" style={S.more}>Cancel</Tap>
          <button type="button" onClick={save} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>Send the invite</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="Who, and their check" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>Who, and their check</h2>
          <div style={two}>
            <label style={label}>Name<Field value={f.name} onChange={put('name')} /></label>
            <label style={label}>Mobile<Field value="04•• ••• 318" /></label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Role</span>
            <Picks label="Role" start={f.role} options={ROLES} onChange={put('role')} />
          </div>
          <label style={label}>Groups<Field value={f.groups} onChange={put('groups')} /></label>
          <div style={two}>
            <label style={label}>Children check card number<Field value="•••• •••• 7 (hidden once saved)" /></label>
            <label style={label}>Runs out<Field value={f.runsOut} onChange={put('runsOut')} /></label>
          </div>
          <Tick start={f.looked} onChange={put('looked')}>I looked up her status on the government site today</Tick>
          <Tick start={f.linked} onChange={put('linked')}>I have connected her to Tall Timber in the government’s service</Tick>
        </section>
        <aside aria-label="What happens" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>What happens</h2>
          {([['She gets an invite', 'By text, to set up her own sign-in'], ['You check and connect', 'On the government’s site, then tick here'], ['The record is kept', 'Date and your name against each tick'], ['You’re reminded', 'Before a check runs out']] as const).map(([t, sub], i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{t}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{sub}</span>
              </span>
            </div>
          ))}
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A volunteer has 21 days to be connected, a paid coach 7. Clean Sheet can’t do the checking for you.</span>
        </aside>
      </main>
    </>
  )
}
