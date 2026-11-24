// AD14-Pathway: Academy owner: older players moving on to clubs and programs, references asked of you, and the player passport a family can send.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD14Pathway() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Where they go next</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Advanced · 6 players turn 15 this year</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="CNp14-PlayerPassport" style={S.more}>See a passport</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="Older players" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Older players</h2>
          </div>
          <Tap to="ADC1-PlayerFile" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) minmax(0,1.1fr) 120px', gap: 10, alignItems: 'center', minHeight: 92, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>JM</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Jonah Marsh, 14</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>No club · wants to trial</span>
            </span>
            <span style={{ fontSize: 14, lineHeight: '19px' }}>Trial on Sunday 14 June at a state-league club</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Passport sent</span>
            </span>
          </Tap>
          <Tap to="ADC1-PlayerFile" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) minmax(0,1.1fr) 120px', gap: 10, alignItems: 'center', minHeight: 92, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>KO</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Kai Okonkwo, 13</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>U13 Timber, your game team</span>
            </span>
            <span style={{ fontSize: 14, lineHeight: '19px' }}>Asked about a regional program for 2027</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>Reference asked</span>
            </span>
          </Tap>
          <Tap to="ADC1-PlayerFile" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) minmax(0,1.1fr) 120px', gap: 10, alignItems: 'center', minHeight: 92, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>AC</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Ana Costa, 12</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Harbour Rovers U12</span>
            </span>
            <span style={{ fontSize: 14, lineHeight: '19px' }}>Staying at her club · here for skills</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Nothing to do</span>
            </span>
          </Tap>
          <Tap to="ADC1-PlayerFile" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) minmax(0,1.1fr) 120px', gap: 10, alignItems: 'center', minHeight: 92, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>FD</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Finn Doyle, 14</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Kestrel Park U14</span>
            </span>
            <span style={{ fontSize: 14, lineHeight: '19px' }}>Back from injury in week 9</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Later</span>
            </span>
          </Tap>
          <div style={{ borderRadius: 12, background: '#f4e6e6', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Kai’s mum has asked you for a reference.</strong>
            {' Reece has drafted it from two terms of notes. '}
            <Tap say="The reference opens to read and change. It goes to Kai’s mum, who decides where it is sent.">Read and send</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Showing 4 of 6. You see a trial only when the family tells you about it.</span>
        </section>
        <aside aria-label="The player passport" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>The player passport</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Two terms of skills</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Where they started and where they are</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Six clips</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Chosen by the player</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Your reference</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Written by the coach, signed off by you</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>What they came to</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Sessions and one-on-ones</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>The family sends it, to whoever they choose. You never send a child’s file to a club yourself.</span>
        </aside>
      </main>
    </>
  )
}
