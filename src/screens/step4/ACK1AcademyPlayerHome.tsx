const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACK1AcademyPlayerHome() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber · Advanced</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>KO</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Hi Kai</div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        {/* Goal */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Your goal this term</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 4 }}>Score with your left foot in a game</div>
          <div style={{ fontSize: 13, color: G }}>3 in training so far. Keep going.</div>
        </div>

        {/* Practice */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Practice at home</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, color: INK }}>Left-foot wall strikes · 10 minutes</div>
              <div style={{ fontSize: 12, color: MUT }}>2 of 3 done this week</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Your skills</div>
          {['Ball mastery', 'First touch', 'One against one', 'Passing', 'Finishing'].map(skill => (
            <div key={skill} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 14, color: INK }}>{skill}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1,2,3,4,5].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= 3 ? G : LN }} />)}
              </div>
            </div>
          ))}
        </div>

        {/* Clip */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>From Reece: your left-foot finish</div>
          <div style={{ fontSize: 13, color: G, fontStyle: 'italic' }}>"Look how your hips open here."</div>
        </div>

        <div style={{ fontSize: 12, color: MUT, textAlign: 'center' as const }}>Only you, your mum and your coaches see this.</div>
      </div>
    </div>
  )
}
