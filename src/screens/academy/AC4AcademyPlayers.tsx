// AC4-AcademyPlayers: Academy owner, players.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC4AcademyPlayers() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Players</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>80 this term · showing 8</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Player list downloaded." style={S.more}>Export</Tap>
          <Tap say="New message to 74 families." style={S.primary}>Message all families</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="All players" style={{ ...S.tile, gridColumn: 'span 12', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>All players</h2>
            <span style={S.cap}>Sorted by program</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', paddingBottom: 8 }}>
            <span style={S.th}>Player</span>
            <span style={S.th}>Age</span>
            <span style={S.th}>Program</span>
            <span style={S.th}>Came</span>
            <span style={S.th}>Club team</span>
            <span style={S.th}>Term report</span>
            <span style={S.th}>Fees</span>
          </div>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>KO</span>
              Kai Okonkwo
            </span>
            <span style={S.num}>13</span>
            <span>Advanced</span>
            <span style={S.num}>5 of 6</span>
            <span style={{ color: '#4a5a57' }}>U13 Timber · your game team</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Drafted</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Paid</span>
            </span>
          </Tap>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>AC</span>
              Ana Costa
            </span>
            <span style={S.num}>12</span>
            <span>Advanced</span>
            <span style={S.num}>2 of 2</span>
            <span style={{ color: '#4a5a57' }}>Harbour Rovers U12</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Too new</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Paid</span>
            </span>
          </Tap>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>JM</span>
              Jonah Marsh
            </span>
            <span style={S.num}>14</span>
            <span>Advanced</span>
            <span style={S.num}>6 of 10</span>
            <span style={{ color: '#4a5a57' }}>No club</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>To write</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#c39797', color: '#10211f', boxSizing: 'content-box' }}>3 weeks late</span>
            </span>
          </Tap>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>TL</span>
              Theo Lindqvist
            </span>
            <span style={S.num}>11</span>
            <span>Development</span>
            <span style={S.num}>5 of 5</span>
            <span style={{ color: '#4a5a57' }}>Banksia Park U11</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>To write</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#2f6252', boxSizing: 'content-box' }}>On a plan</span>
            </span>
          </Tap>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RS</span>
              Ruby Sandhu
            </span>
            <span style={S.num}>10</span>
            <span>Development</span>
            <span style={S.num}>10 of 10</span>
            <span style={{ color: '#4a5a57' }}>Wattle Creek U10</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Drafted</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Paid</span>
            </span>
          </Tap>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>EB</span>
              Eli Brandt
            </span>
            <span style={S.num}>9</span>
            <span>Development</span>
            <span style={S.num}>7 of 10</span>
            <span style={{ color: '#4a5a57' }}>Kestrel Park U9</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>To write</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#c39797', color: '#10211f', boxSizing: 'content-box' }}>1 week late</span>
            </span>
          </Tap>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>MR</span>
              Maya Rossi
            </span>
            <span style={S.num}>6</span>
            <span>Foundation</span>
            <span style={S.num}>5 of 6</span>
            <span style={{ color: '#4a5a57' }}>No club</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>To write</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Paid</span>
            </span>
          </Tap>
          <Tap to="ACC4-PlayerPlan" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr 0.8fr 1.3fr 0.9fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>HP</span>
              Hugo Pereira
            </span>
            <span style={S.num}>7</span>
            <span>Foundation</span>
            <span style={S.num}>9 of 10</span>
            <span style={{ color: '#4a5a57' }}>Wattle Creek U7</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Drafted</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Paid</span>
            </span>
          </Tap>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>16 players are in U13 Timber, your game team at Wattle Creek FC. For players at other clubs, the parent chooses what is shared.</span>
        </section>
      </main>
    </>
  )
}
