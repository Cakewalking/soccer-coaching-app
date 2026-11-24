// ADS1-SwitchView: The academy, every role in one place: owner, coach, family and player, each opening that role’s home.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function ADS1SwitchView() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>See it as…</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Tall Timber Academy · one academy, four views</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }} />
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(4, minmax(0,1fr))' }}>
        <Tap to="AD1-AcademyHome" style={{ display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 20, border: '1px solid #c5c8c4', background: '#ffffff', padding: 22, textDecoration: 'none', color: '#10211f' }}>
          <span style={{ flex: 'none', width: 56, height: 56, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>DO</span>
          <strong style={{ fontSize: 22, lineHeight: '28px' }}>Academy owner</strong>
          <span style={{ fontSize: 15, lineHeight: '21px', color: '#4a5a57' }}>Dani. Programs, families, coaches, money and the health of the academy.</span>
          <span style={{ ...S.primary, marginTop: 'auto', alignSelf: 'flex-start' }}>Open</span>
        </Tap>
        <Tap to="ACC1-CoachToday" style={{ display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 20, border: '1px solid #c5c8c4', background: '#ffffff', padding: 22, textDecoration: 'none', color: '#10211f' }}>
          <span style={{ flex: 'none', width: 56, height: 56, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>RW</span>
          <strong style={{ fontSize: 22, lineHeight: '28px' }}>Academy coach</strong>
          <span style={{ fontSize: 15, lineHeight: '21px', color: '#4a5a57' }}>Reece. Today’s sessions, player files, film, the game review and style.</span>
          <span style={{ ...S.primary, marginTop: 'auto', alignSelf: 'flex-start' }}>Open</span>
        </Tap>
        <Tap to="ADP1-AcademyHome" style={{ display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 20, border: '1px solid #c5c8c4', background: '#ffffff', padding: 22, textDecoration: 'none', color: '#10211f' }}>
          <span style={{ flex: 'none', width: 56, height: 56, borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>DB</span>
          <strong style={{ fontSize: 22, lineHeight: '28px' }}>Family</strong>
          <span style={{ fontSize: 15, lineHeight: '21px', color: '#4a5a57' }}>Ari’s parent, on the phone. Next session, the term report, keeping a place.</span>
          <span style={{ ...S.primary, marginTop: 'auto', alignSelf: 'flex-start' }}>Open</span>
        </Tap>
        <Tap to="ACK1-AcademyPlayerHome" style={{ display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 20, border: '1px solid #c5c8c4', background: '#ffffff', padding: 22, textDecoration: 'none', color: '#10211f' }}>
          <span style={{ flex: 'none', width: 56, height: 56, borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>KO</span>
          <strong style={{ fontSize: 22, lineHeight: '28px' }}>Player, 13 and over</strong>
          <span style={{ fontSize: 15, lineHeight: '21px', color: '#4a5a57' }}>Kai, on the phone. His goal, practice, his own clips and how he thinks he’s going.</span>
          <span style={{ ...S.primary, marginTop: 'auto', alignSelf: 'flex-start' }}>Open</span>
        </Tap>
      </main>
    </>
  )
}
