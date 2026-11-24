// AD25-Reference: Academy owner: reading the coach’s draft reference for a player, changing it, and sending it to the family, who decide where it goes.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { Field, Tick } from './formKit'

export default function AD25Reference() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Reference for Kai Okonkwo</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Asked for by his mum, Tess, on 2 June · drafted by Reece</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="A note to Reece opens." style={S.more}>Ask Reece to change it</Tap>
          <Tap say="Sent to Tess. She chooses who sees it." style={S.primary}>Send to Tess</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="The reference" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>The reference</h2>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
            In your words
            <Field value="Kai joined Tall Timber’s Advanced group in May and plays for our U13 game team. He takes players on with confidence and his first touch has moved up a step since he joined. He is working on his left foot and scored with it on 31 May. He is coachable, turns up, and leads the warm-up." lines />
            <span style={{ fontSize: 12, fontWeight: 400, color: '#4a5a57' }}>Tap to change any sentence.</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
              From
              <Field value="Dani Okafor, Tall Timber Academy" />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
              Contact for a club
              <Field value="dani@talltimber.example" />
            </label>
          </div>
          <Tick start={true}>Attach his player passport: skills, six clips, attendance</Tick>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A family asks from their app. You are never asked by a club directly.</span>
        </section>
        <aside aria-label="Where it goes" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>Where it goes</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>To the family</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Tess gets it in her app</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>She sends it on</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>To whoever she chooses</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Never from you</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>You don’t send a child’s file to a club</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Kept</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A copy stays in Kai’s file</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Written from Reece’s notes since May: 5 of 6 sessions, and his steps on each skill.</span>
        </aside>
      </main>
    </>
  )
}
