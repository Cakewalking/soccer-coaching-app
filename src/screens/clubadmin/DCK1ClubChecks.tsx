// DCK1-ClubChecks: Director of football, Safeguarding: every coach and volunteer’s Working with Children Check, whether it is checked and connected to the club, the training, and what is due.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the director's frame (ClubAdminScreen).
import { S } from '../academy/adStyles'
import Tap from '../academy/Tap'

export default function DCK1ClubChecks() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Children checks</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Wattle Creek FC · 31 coaches, managers and volunteers who work with children</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="The record is on its way to your email as a spreadsheet." style={S.more}>Download the record</Tap>
          <Tap say="Enter their name and card number. You check it on the government site, then tick it here." style={S.primary}>Add a person</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Checked and connected</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>27 of 31</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Record kept for each</span>
          </div>
          <div style={{ ...S.tile, background: '#f4e6e6', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Connect soon</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>2</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Inside their 7 or 21 days</span>
          </div>
          <div style={{ ...S.tile, background: '#eef5f2', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Runs out within 8 weeks</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>1</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Meg · 12 July</span>
          </div>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Not checked</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>1</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Can’t be given a team yet</span>
          </div>
        </div>
        <section aria-label="People" style={{ ...S.tile, gridColumn: 'span 8', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>People</h2>
            <span style={S.cap}>Needs something first</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr 0.9fr 1fr 1fr 0.8fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>Person</span>
            <span style={S.th}>Role</span>
            <span style={S.th}>Status</span>
            <span style={S.th}>Connected to the club</span>
            <span style={S.th}>Safety training</span>
            <span style={S.th}>Runs out</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr 0.9fr 1fr 1fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 58, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>SK</span>
              Sam Kelly
            </span>
            <span style={{ color: '#4a5a57' }}>Head coach · U12 Sam</span>
            <span>Checked</span>
            <span>Connected</span>
            <span>Done</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Feb 2029</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr 0.9fr 1fr 1fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 58, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>LB</span>
              Luke Barros
            </span>
            <span style={{ color: '#4a5a57' }}>Head coach · U11 Luke</span>
            <span>Checked</span>
            <span>Connected</span>
            <span>Done</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Sep 2027</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr 0.9fr 1fr 1fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 58, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>MT</span>
              Meg Tully
            </span>
            <span style={{ color: '#4a5a57' }}>Head coach · U13 Girls</span>
            <span>Checked</span>
            <span>Connected</span>
            <span>Needed to renew</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#c39797', color: '#10211f', boxSizing: 'content-box' }}>12 July</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr 0.9fr 1fr 1fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 58, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>DF</span>
              Dana Fox
            </span>
            <span style={{ color: '#4a5a57' }}>Treasurer · volunteer</span>
            <span>Checked</span>
            <span>Day 16 of 21</span>
            <span>Done</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>May 2030</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr 0.9fr 1fr 1fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 58, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>JN</span>
              Jo Nair
            </span>
            <span style={{ color: '#4a5a57' }}>Team manager · volunteer</span>
            <span>Not checked</span>
            <span>Not connected</span>
            <span>Not known</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Not known</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Showing 5 of 31, the ones that need something first. A person who is not checked and connected can’t be added to a team, open a session or see a player.</span>
        </section>
        <section aria-label="What Victoria asks of the club" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>What Victoria asks of the club</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Check</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Look up the person’s status before they start</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Connect</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>7 days for paid staff, 21 for volunteers</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Keep a record</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Who, card number, when checked</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Act on a change</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>The club is told if a status changes</span>
            </span>
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>In force from 19 October 2026. Clean Sheet keeps the record and reminds people. The club does the checking and connecting in the government’s own service.</div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A summary, not legal advice. Other states differ: this follows the state the club set.</span>
        </section>
      </main>
    </>
  )
}
