// AC1-AcademyHome: Academy owner, home.
// Places, fees, the families behind on fees and the reports drafted are counted from the store (programs v2). The trials, attendance tile and today's list are the board's sample.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { PROGRAMS, money, paysLine, programCounts, useAcademy, weeksLate } from './academyStore'

export default function AC1AcademyHome() {
  const a = useAcademy(), all = programCounts(a), late = a.players.filter(p => p.fees_status === 'Late'), lateOwed = late.reduce((t, p) => t + p.fees_owed, 0), oldest = Math.max(0, ...late.map(weeksLate))
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Hi Dani</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Thursday 4 June · Term 2, week 7 of 10</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AC12-AcademyBroadcast" style={S.more}>Message families</Tap>
          <Tap say="Trial link copied. Anyone with it can book a free trial." style={S.more}>Share the trial link</Tap>
          <Tap to="AC2-Programs" style={S.primary}>+ New program</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Players this term</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>{all.n} of {all.cap}</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Places filled across {PROGRAMS.filter(p => programCounts(a, p).teams.length).length} programs</span>
          </div>
          <div style={{ ...S.tile, background: '#f4e6e6', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Trials this month</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>9</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>4 joined · 3 waiting on an offer</span>
          </div>
          <div style={{ ...S.tile, background: '#eef5f2', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Fees collected</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>{money(all.collected)}</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Of {money(all.billed)} billed · {money(lateOwed)} late · a player pays {paysLine(a)}</span>
          </div>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Came to training</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>91%</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Last 2 weeks · 6 make-ups booked</span>
          </div>
        </div>
        <section aria-label="Needs you" style={{ ...S.tile, borderTop: '5px solid #c39797', gridColumn: 'span 7', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Needs you</h2>
            <span style={S.cap}>3 things</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>3 trial families are waiting on an offer</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>They came last week. Offers sent within 2 days are taken up most often</span>
            </span>
            <Tap to="AC3-Trials" style={S.more}>Send offers</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{late.length} {late.length === 1 ? 'family is' : 'families are'} behind on term fees</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{money(lateOwed)} in total{oldest ? ` · the oldest is ${oldest} ${oldest === 1 ? 'week' : 'weeks'} late` : ''}</span>
            </span>
            <Tap to="AC5-Fees" style={S.more}>See who</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Ben’s children check runs out on 30 June</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>He can’t coach after that until it’s renewed</span>
            </span>
            <Tap to="AC6-AcademyCoaches" style={S.more}>Remind Ben</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Clean Sheet chases fees and trial families for you. You only see what it couldn’t settle.</span>
        </section>
        <section aria-label="Today" style={{ ...S.tile, gridColumn: 'span 5', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Today</h2>
            <span style={S.cap}>Messmate Primary School</span>
          </div>
          <Tap to="ACC2-RunSession" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ ...S.num, flex: 'none', width: 44, fontSize: 15, fontWeight: 700 }}>4:30</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Development · 9 to 11</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece · pitch 1 · 14 coming, 1 trial</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="ACC2-RunSession" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ ...S.num, flex: 'none', width: 44, fontSize: 15, fontWeight: 700 }}>5:30</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Advanced · 12 to 14</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece and Sofia · pitch 1 · 20 coming, 2 make-ups</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="ACC5-OneOnOne" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ ...S.num, flex: 'none', width: 44, fontSize: 15, fontWeight: 700 }}>6:45</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>One-on-one · Kai Okonkwo</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece · pitch 2, in open view</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>
            {`Term reports are due in week 9. ${all.report} of ${all.n} are drafted. `}
            <Tap to="AC7-ReportsOut">See reports</Tap>
          </span>
        </section>
      </main>
    </>
  )
}
