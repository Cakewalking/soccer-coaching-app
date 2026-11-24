// AD4-NextTerm: Academy owner: re-enrolment for next term, who is staying, who hasn’t said, and when open places go to the waiting list.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD4NextTerm() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Term 3</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>13 July to 18 September · 10 weeks · families could re-enrol from Monday 1 June</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Prices open for each program. Families who have already re-enrolled keep the price they saw." style={S.more}>Set Term 3 prices</Tap>
          <Tap say="24 families are reminded tomorrow at 9:00. Each one opens with what their child has improved this term." style={S.primary}>Remind 24 families</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Staying</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>52 of 80</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>One tap in the family app</span>
          </div>
          <div style={{ ...S.tile, background: '#f4e6e6', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Not yet said</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>24</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reminded once on Wednesday</span>
          </div>
          <div style={{ ...S.tile, background: '#eef5f2', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Leaving</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>4</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>3 told you why</span>
          </div>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Waiting for a place</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>5</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>All for Advanced</span>
          </div>
        </div>
        <section aria-label="By program" style={{ ...S.tile, gridColumn: 'span 7', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>By program</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.6fr 1.6fr 0.7fr 0.7fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>Program</span>
            <span style={S.th}>This term</span>
            <span style={S.th}>Staying</span>
            <span style={S.th}>Not said</span>
            <span style={S.th}>Leaving</span>
          </div>
          <Tap to="AC4-AcademyPlayers" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.6fr 1.6fr 0.7fr 0.7fr', gap: 10, alignItems: 'center', minHeight: 84, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Foundation</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>28</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', display: 'inline-block', width: 110, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: '68%', background: '#2f6252' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>19</span>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>8</span>
            <span style={{ ...S.num, fontWeight: 700 }}>1</span>
          </Tap>
          <Tap to="AC4-AcademyPlayers" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.6fr 1.6fr 0.7fr 0.7fr', gap: 10, alignItems: 'center', minHeight: 84, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Development</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>30</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', display: 'inline-block', width: 110, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: '70%', background: '#2f6252' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>21</span>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>8</span>
            <span style={{ ...S.num, fontWeight: 700 }}>1</span>
          </Tap>
          <Tap to="AC4-AcademyPlayers" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.6fr 1.6fr 0.7fr 0.7fr', gap: 10, alignItems: 'center', minHeight: 84, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Advanced</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>22</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', display: 'inline-block', width: 110, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: '55%', background: '#2f6252' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>12</span>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>8</span>
            <span style={{ ...S.num, fontWeight: 700 }}>2</span>
          </Tap>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Advanced has 2 leaving and 5 waiting.</strong>
            {' Offer those places now and the group stays full. '}
            <Tap to="AC2-Programs">Offer 2 places</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Places are held until Friday 19 June. After that, open places go to the waiting list in order, and then to new trials.</span>
        </section>
        <section aria-label="Not yet said" style={{ ...S.tile, gridColumn: 'span 5', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Not yet said</h2>
            <span style={S.cap}>Oldest first</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 78, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>JM</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Marsh family · Jonah</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced · opened the reminder twice</span>
            </span>
            <Tap say="Their number is copied. The call is yours to make." style={S.more}>Call</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 78, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>AC</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Costa family · Ana</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced · joined 3 weeks ago</span>
            </span>
            <Tap say="A reminder goes to this family now." style={S.more}>Remind</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 78, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>EB</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Brandt family · Eli</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development · hasn’t opened it</span>
            </span>
            <Tap say="A reminder goes to this family now." style={S.more}>Remind</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 78, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>MR</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Rossi family · Maya</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Foundation · hasn’t opened it</span>
            </span>
            <Tap say="A reminder goes to this family now." style={S.more}>Remind</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Showing 4 of 24. A reminder opens with the child’s progress and one button: Keep my place.</span>
        </section>
      </main>
    </>
  )
}
