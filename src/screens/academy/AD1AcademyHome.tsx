// AD1-AcademyHome: Academy owner, home: progress across the whole academy, the players who need something, whether every coach is doing the basics, and what needs the owner.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD1AcademyHome() {
  return (
    <>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'content-box' }}>
        <section aria-label="Now" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: '1px solid #c5c8c4', padding: '8px 10px 8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <strong style={{ fontSize: 15, whiteSpace: 'nowrap' }}>Hi Dani · Thu 4 June · Term 2, week 7 of 10</strong>
          <Tap to="AD3-Timetable" style={{ height: 44, padding: '0 14px', borderRadius: 12, background: '#eef5f2', display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', color: '#10211f', whiteSpace: 'nowrap', boxSizing: 'content-box' }}>
            <strong style={{ fontSize: 13, lineHeight: '16px' }}>Today</strong>
            <span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f' }}>3 sessions · 34 coming</span>
          </Tap>
          <Tap to="AC5-Fees" style={{ height: 44, padding: '0 14px', borderRadius: 12, background: '#eef5f2', display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', color: '#10211f', whiteSpace: 'nowrap', boxSizing: 'content-box' }}>
            <strong style={{ fontSize: 13, lineHeight: '16px' }}>Fees</strong>
            <span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f' }}>$21,180 of $23,020</span>
          </Tap>
          <span style={{ flexGrow: 1 }} />
          <Tap to="AC12-AcademyBroadcast" style={S.more}>Message families</Tap>
          <Tap say="Trial link copied. Anyone with it can book a free trial." style={S.primary}>Share the trial link</Tap>
        </section>
        <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <section aria-label="Progress" style={{ flex: 'none', borderRadius: 18, background: '#1c3a33', color: '#ffffff', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#f4c95d' }}>PROGRESS · THE WHOLE ACADEMY · THIS TERM</span>
                  <strong style={{ fontSize: 25, lineHeight: '31px', letterSpacing: '-0.01em' }}>Sixty-one of your 80 players are up a step this term.</strong>
                  <span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>On at least one core skill since week 1. At this point last term it was 44 of 72.</span>
                </span>
                <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' }}>
                  <Tap say="One then-and-now clip from each program. 60 seconds." style={{ height: 44, padding: '0 16px', borderRadius: 999, background: '#f4c95d', color: '#10211f', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'content-box' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8 5l11 7-11 7z" />
                    </svg>
                    The term in 60 seconds
                  </Tap>
                  <Tap to="AC4-AcademyPlayers" style={{ height: 44, padding: '0 16px', borderRadius: 999, border: '1px solid #ffffff', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'content-box' }}>By player</Tap>
                </span>
              </div>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', marginTop: 4 }}>
                <span style={{ flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 12, color: '#cfe6dc', whiteSpace: 'nowrap' }}>Foundation</span>
                  <span role="img" aria-label="Foundation: 22 of 28" style={{ display: 'block', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}>
                    <span style={{ display: 'block', height: '100%', width: '79%', background: '#f4c95d' }} />
                  </span>
                  <span style={{ fontSize: 13 }}>
                    <strong style={S.num}>22</strong>
                    {' of 28'}
                  </span>
                </span>
                <span style={{ flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 12, color: '#cfe6dc', whiteSpace: 'nowrap' }}>Development</span>
                  <span role="img" aria-label="Development: 24 of 30" style={{ display: 'block', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}>
                    <span style={{ display: 'block', height: '100%', width: '80%', background: '#f4c95d' }} />
                  </span>
                  <span style={{ fontSize: 13 }}>
                    <strong style={S.num}>24</strong>
                    {' of 30'}
                  </span>
                </span>
                <span style={{ flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 12, color: '#cfe6dc', whiteSpace: 'nowrap' }}>Advanced</span>
                  <span role="img" aria-label="Advanced: 15 of 22" style={{ display: 'block', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}>
                    <span style={{ display: 'block', height: '100%', width: '68%', background: '#f4c95d' }} />
                  </span>
                  <span style={{ fontSize: 13 }}>
                    <strong style={S.num}>15</strong>
                    {' of 22'}
                  </span>
                </span>
              </div>
            </section>
            <div aria-label="Development" style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
              <Tap to="AD5-GroupMoves" style={{ ...S.tile, gap: 2, padding: '10px 14px', background: '#eef5f2', textDecoration: 'none', color: '#10211f', borderColor: '#cfe3da' }}>
                <strong style={{ ...S.num, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em' }}>2</strong>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>Ready to move up</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>Ruby and Hugo</span>
              </Tap>
              <Tap to="AC4-AcademyPlayers" style={{ ...S.tile, gap: 2, padding: '10px 14px', background: '#ffffff', textDecoration: 'none', color: '#10211f' }}>
                <strong style={{ ...S.num, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em' }}>6</strong>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>On the same step for two terms</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>Worth a word with their coach</span>
              </Tap>
              <Tap to="AC4-AcademyPlayers" style={{ ...S.tile, gap: 2, padding: '10px 14px', background: '#ffffff', textDecoration: 'none', color: '#10211f' }}>
                <strong style={{ ...S.num, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em' }}>5</strong>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>No goal set</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>4 of them in Foundation</span>
              </Tap>
              <Tap to="AD2-Health" style={{ ...S.tile, gap: 2, padding: '10px 14px', background: '#f4e6e6', textDecoration: 'none', color: '#10211f', borderColor: '#c39797' }}>
                <strong style={{ ...S.num, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em' }}>3</strong>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>Families worth a call</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>Missing sessions, not re-enrolled</span>
              </Tap>
            </div>
            <section aria-label="Oversight" style={{ ...S.tile, gap: 4, padding: '12px 16px', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={S.h2}>Oversight · is every coach doing the basics?</h2>
                <Tap to="AD8-SessionQuality" style={{ fontSize: 14, fontWeight: 700, paddingTop: 13, paddingBottom: 13, marginTop: -13, marginBottom: -13 }}>Session quality</Tap>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.1fr 0.9fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
                <span style={S.th}>Coach</span>
                <span style={S.th}>Notes written</span>
                <span style={S.th}>Goals set</span>
                <span style={S.th}>Clips to families</span>
                <span style={S.th}>Up a step</span>
              </div>
              <Tap to="AD10-WatchCoach" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 44, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RW</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: 14, lineHeight: '18px' }}>Reece Whitlam</strong>
                    <span style={{ fontSize: 12, color: '#4a5a57' }}>Development, Advanced</span>
                  </span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '94%', background: '#2f6252' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>49 of 52</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '98%', background: '#2f6252' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>51 of 52</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '77%', background: '#2f6252' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>40 of 52</span>
                </span>
                <span style={{ ...S.num, fontWeight: 700 }}>39 of 52</span>
              </Tap>
              <Tap to="AD10-WatchCoach" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 44, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>SM</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: 14, lineHeight: '18px' }}>Sofia Marin</strong>
                    <span style={{ fontSize: 12, color: '#4a5a57' }}>Foundation</span>
                  </span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '79%', background: '#a86b78' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>22 of 28</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '100%', background: '#2f6252' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>28 of 28</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '68%', background: '#a86b78' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>19 of 28</span>
                </span>
                <span style={{ ...S.num, fontWeight: 700 }}>22 of 28</span>
              </Tap>
              <Tap to="AD10-WatchCoach" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 44, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>DO</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: 14, lineHeight: '18px' }}>You</strong>
                    <span style={{ fontSize: 12, color: '#4a5a57' }}>One-on-ones</span>
                  </span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '100%', background: '#2f6252' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>8 of 8</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '100%', background: '#2f6252' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>8 of 8</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 'none', display: 'inline-block', width: 56, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                    <span style={{ display: 'block', height: '100%', width: '75%', background: '#2f6252' }} />
                  </span>
                  <span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>6 of 8</span>
                </span>
                <span style={{ ...S.num, fontWeight: 700 }}>5 of 8</span>
              </Tap>
              <span style={{ ...S.cap, marginTop: 'auto' }}>Notes are for the last 3 weeks. Sofia’s Foundation families have had the fewest clips.</span>
            </section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <section aria-label="Families" style={{ ...S.tile, gap: 2, padding: '12px 14px' }}>
              <h2 style={S.h2}>Are families staying?</h2>
              <Tap to="AD4-NextTerm" style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 60, justifyContent: 'center', borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: 14, lineHeight: '18px' }}>Staying for Term 3</strong>
                  <strong style={{ ...S.num, fontSize: 15, whiteSpace: 'nowrap' }}>52 of 80</strong>
                </span>
                <span role="img" aria-label="52 of 80" style={{ display: 'block', height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', width: '65%', background: '#2f6252' }} />
                </span>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>24 not yet said · 4 leaving</span>
              </Tap>
              <Tap to="AD15-Families" style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 60, justifyContent: 'center', borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: 14, lineHeight: '18px' }}>Families sent a clip this term</strong>
                  <strong style={{ ...S.num, fontSize: 15, whiteSpace: 'nowrap' }}>59 of 80</strong>
                </span>
                <span role="img" aria-label="59 of 80" style={{ display: 'block', height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', width: '74%', background: '#2f6252' }} />
                </span>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>Families who see progress tend to stay</span>
              </Tap>
            </section>
            <section aria-label="Needs you" style={{ ...S.tile, gap: 0, padding: '12px 14px', flexGrow: 1, borderTop: '4px solid #c39797' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}>
                <h2 style={S.h2}>Needs you</h2>
                <span style={S.cap}>5 things</span>
              </div>
              <Tap to="AC3-Trials" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>3 trial families are waiting on an offer</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Tap>
              <Tap to="AD4-NextTerm" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>24 families haven’t said about Term 3</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Tap>
              <Tap to="AC5-Fees" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>4 families are behind on fees</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Tap>
              <Tap to="AD3-Timetable" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>Advanced needs cover on Thu 11 June</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Tap>
              <Tap to="AD17-Checks" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8', textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>Ben’s children check runs out 30 June</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Tap>
              <span style={{ ...S.cap, marginTop: 'auto' }}>Only what Clean Sheet couldn’t settle for you.</span>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
