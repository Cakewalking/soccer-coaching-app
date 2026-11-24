// AD22-ChangeBlock: Academy owner: changing one five-week block in the year plan, and what follows from it.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
// From pack v31 it writes: "Change the block" puts the chosen skill (or the owner's own name) in the block the year plan asked to
// change (`openBlock` in `curriculum.ts`), and the year, the term's grid and the balance on AD6 follow. Opened by its address it is the
// board's block: Development, Term 3, weeks 1 to 5. Kept while the app is open.
import { useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { Field, Picks } from './formKit'
import { useAcademy } from './academyStore'
import { Open } from './curriculumKit'
import { PHASES, useCurriculum, yearOf, setBlock, pickAge, phaseOfAge } from './curriculum'

export default function AD22ChangeBlock() {
  const a = useAcademy(), c = useCurriculum(), { phase, term, i } = c.block, was = yearOf(a, c, phase)[term - 1]?.[i]
  const [pick, setPick] = useState(Math.max(0, a.skills.indexOf(was?.skill ?? ''))), [own, setOwn] = useState('')
  // the block is changed, and the year plan opens on an age in that phase
  const change = () => { const name = own.trim(); setBlock(phase, term, i, name ? { title: name, skill: null } : { title: a.skills[pick], skill: a.skills[pick] }); if (phaseOfAge(c.age) !== phase) pickAge(Math.min(PHASES[phase].hi, PHASES[phase].lo + 1)) }
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Change a block</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>{PHASES[phase]?.program} · Term {term} · weeks {i ? '6 to 10' : '1 to 5'}{was ? ` · now ${was.title}` : ''}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD6-YearPlan" style={S.more}>Cancel</Tap>
          <Open to="AD6-YearPlan" before={change} style={S.primary}>Change the block</Open>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="What should these five weeks be about?" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>What should these five weeks be about?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>A core skill</span>
            <Picks label="A core skill" start={pick} options={a.skills} onChange={setPick} />
          </div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
            Or one of your own
            <Field hint="Type a name, such as Playing through" onChange={setOwn} />
            <span style={{ fontSize: 12, fontWeight: 400, color: '#4a5a57' }}>Your own blocks get sessions from the drills you tag to them.</span>
          </label>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>Development gets half the time on running with the ball that it gets on the other skills, so this block is worth keeping.</div>
        </section>
        <aside aria-label="What follows the block" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>What follows the block</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Suggested sessions</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>10 sessions are re-suggested</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Practice at home</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Matches the block from week 1</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>The term report</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Says what the group worked on</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Families</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>See the plan for their child’s group</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Sessions a coach has already planned are kept until the coach changes them.</span>
        </aside>
      </main>
    </>
  )
}
