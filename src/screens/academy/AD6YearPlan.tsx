// AD6-YearPlan: Academy owner: the year’s curriculum by program and term, built on the four core skills, with the balance across the year.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD6YearPlan() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Year plan</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>2026 · four terms · this is week 7 of Term 2</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Families see the plan for their child’s program in the app." style={S.more}>Share with families</Tap>
          <Tap to="AD22-ChangeBlock" style={S.primary}>Change a block</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px' }}>
        <section aria-label="Year plan" style={{ ...S.tile, gap: 8, padding: '14px 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '118px repeat(4, minmax(0,1fr))', gap: 8, alignItems: 'center' }}>
            <span />
            <span style={S.th}>Term 1</span>
            <span style={S.th}>Term 2 · now</span>
            <span style={S.th}>Term 3</span>
            <span style={S.th}>Term 4</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Foundation</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Ages 5 to 8</span>
            </span>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Running with the ball</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Stopping and turning</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '2px solid #2f6252' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>First touch</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One against one</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Striking the ball</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Running with the ball</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One against one</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Small games</strong>
            </Tap>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Development</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Ages 9 to 11</span>
            </span>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>First touch</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Striking the ball</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '2px solid #2f6252' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>First touch on the move</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One against one</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Running with the ball</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Striking the ball</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One against one</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Playing through</strong>
            </Tap>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Advanced</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Ages 12 to 14</span>
            </span>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>First touch under pressure</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Playing out</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '2px solid #2f6252' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One against one</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Finishing, weaker foot</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Striking the ball</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Winning it back</strong>
            </Tap>
            <Tap to="ACT1-AcademyWeek" style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 12, padding: '10px 12px', minHeight: 158, boxSizing: 'border-box', justifyContent: 'center', textDecoration: 'none', color: '#10211f', background: '#ffffff', border: '1px solid #c5c8c4' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 1 TO 5</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Running with the ball</strong>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>WEEKS 6 TO 10</span>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Breaking lines</strong>
            </Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Each block is five weeks on one skill. Suggested sessions, home practice and the term report all follow the block the group is in.</span>
        </section>
        <aside aria-label="Balance" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>Balance across the year</h2>
          <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Weeks on each core skill, Development</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 14 }}>First touch</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 80, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '80%', background: '#2f6252' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>10</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 14 }}>One against one</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 80, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '80%', background: '#2f6252' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>10</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 14 }}>Striking the ball</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 80, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '80%', background: '#2f6252' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>10</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 14 }}>Running with the ball</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 80, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '40%', background: '#2f6252' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>5</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 14 }}>Your own: Playing through</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 80, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '40%', background: '#2f6252' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>5</span>
          </div>
          <div style={{ borderRadius: 12, background: '#f4e6e6', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Running with the ball gets half the time of the others.</strong>
            {' Swap a block if that isn’t what you meant.'}
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>The four core skills are Football Australia’s, written for ages 9 to 12. Your own blocks, such as Playing out, sit beside them.</div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Goalkeepers follow the group plan, with their own block of one-on-ones.</span>
        </aside>
      </main>
    </>
  )
}
