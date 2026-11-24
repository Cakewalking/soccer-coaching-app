// AD19-SupportedPlace: Academy owner: giving a family a reduced or free place, for how long, with a private note only the owner sees.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { Field, Picks } from './formKit'

export default function AD19SupportedPlace() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>A supported place</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Reduced or free, for a family who needs it</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD12-Credits" style={S.more}>Cancel</Tap>
          <Tap to="AD12-Credits" style={S.primary}>Save</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="Who and how much" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>Who and how much</h2>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
            Family
            <Field value="Brandt family · Eli, Development" />
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>What they pay for the term</span>
            <Picks label="What they pay for the term" start={1} options={['Full · $290', 'Half · $145', 'Nothing']} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>For how long</span>
            <Picks label="For how long" start={0} options={['This term', 'Until I change it']} />
          </div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
            A note for you
            <Field value="Asked on 12 May. Review before Term 4." />
            <span style={{ fontSize: 12, fontWeight: 400, color: '#4a5a57' }}>Only you can read this.</span>
          </label>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A family can ask from Fees in their app (“Help with fees”), which sends you a private message.</span>
        </section>
        <aside aria-label="Who can tell" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>Who can tell</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Only you</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>It shows in Credits and pauses</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Not coaches</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Eli looks like any other player</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Not other families</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Nothing in chat or lists</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>The family’s receipt</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Shows what they paid, nothing more</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>You set how many supported places you offer: 4 now, 3 in use.</span>
        </aside>
      </main>
    </>
  )
}
