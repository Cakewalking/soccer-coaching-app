// AD23-AddCoach: Academy owner: inviting a coach, choosing their groups, and recording that their children check was looked up and connected.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { Field, Picks, Tick } from './formKit'

export default function AD23AddCoach() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Add a coach</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>They can’t open a session until both ticks are done</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD17-Checks" style={S.more}>Cancel</Tap>
          <Tap to="AD17-Checks" style={S.primary}>Send the invite</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="Who, and their check" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>Who, and their check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
              Name
              <Field value="Mia Farrow" />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
              Mobile
              <Field value="04•• ••• 318" />
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Role</span>
            <Picks label="Role" start={1} options={['Coach', 'Assistant coach', 'Volunteer']} />
          </div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
            Groups
            <Field value="Foundation · Mon and Wed" />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
              Children check card number
              <Field value="•••• •••• 7 (hidden once saved)" />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
              Runs out
              <Field value="14 March 2031" />
            </label>
          </div>
          <Tick start={false}>I looked up her status on the government site today</Tick>
          <Tick start={false}>I have connected her to Tall Timber in the government’s service</Tick>
        </section>
        <aside aria-label="What happens" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>What happens</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>She gets an invite</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>By text, to set up her own sign-in</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>You check and connect</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>On the government’s site, then tick here</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>The record is kept</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Date and your name against each tick</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>You’re reminded</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Before a check runs out</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A volunteer has 21 days to be connected, a paid coach 7. Clean Sheet can’t do the checking for you.</span>
        </aside>
      </main>
    </>
  )
}
