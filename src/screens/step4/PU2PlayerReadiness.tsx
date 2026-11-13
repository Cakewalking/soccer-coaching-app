import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function MiniBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <div style={{ fontSize: 11, color: MUT, width: 100, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 6, background: LN, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct * 100}%`, background: G, borderRadius: 999 }} />
      </div>
    </div>
  )
}

function EvidenceCard({ label, state, sentence, detail, source, warn }: { label: string; state: string; sentence: string; detail: string[]; source: string; warn?: boolean }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${warn ? '#fde68a' : LN}`, borderRadius: 14, padding: '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: warn ? '#92400e' : G, background: warn ? '#fffbeb' : PALE, borderRadius: 999, padding: '2px 10px' }}>{state}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{label}</div>
      </div>
      <div style={{ fontSize: 13, color: MUT, marginBottom: 10, lineHeight: 1.5 }}>{sentence}</div>
      {detail.map((d, i) => <MiniBar key={i} pct={0.4 + i * 0.2} label={d} />)}
      <div style={{ fontSize: 11, color: MUT, marginTop: 8 }}>Source: {source}</div>
    </div>
  )
}

export default function PU2PlayerReadiness({ onBack, onCompare, onTrial }: { onBack?: () => void; onCompare?: () => void; onTrial?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Playing across</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Mia Tran</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button onClick={onCompare} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Compare with U13s</button>
          <button onClick={() => st('Opening coach view to ask Sam.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Not yet</button>
          <button onClick={() => onTrial?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a trial</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '24px 24px 24px 32px' }}>
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Mia Tran</div>
            <div style={{ fontSize: 13, color: MUT }}>U12 Sam · U13 Girls Meg · born March 2014 · nominated by Sam on 1 June · 8 recorded games</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 0 }}>
            <EvidenceCard label="Football" state="Strong" sentence="Above their middle on 7 of 9 measures against U13 Girls Meg." detail={['Goals and assists', 'Duels won', 'Forward passes']} source="Recorded games" />
            <EvidenceCard label="Body" state="Fine to compare" sentence="Normal growth this season. No growth pain flagged." detail={['Top speed', '10 m sprint', 'Distance a game']} source="Monthly heights, tests" />
            <EvidenceCard label="Head" state="Some evidence" sentence="Sam: 'She plays up in her mind already.' Mia: 'I'd like to try it.'" detail={[]} source="Coach view, goal check-in" />
            <EvidenceCard label="Settling in" state="Some evidence" sentence="Knows 3 players in U13 Meg. Has trained with them once." detail={[]} source="Player ask, session history" />
            <EvidenceCard label="Load" state="Fine" sentence="Average 3.2 hours a week over 6 weeks. No other team sports." detail={['Weeks 1–6 load']} source="Sessions, check-ins trend" />
            <EvidenceCard label="A real place" state="Fine" sentence="U13 Meg has 14 players, game time is likely. Meg has said yes." detail={[]} source="Squad, fair-game-time rule" warn={false} />
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>What Clean Sheet suggests</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '12px', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G }}>Ready to try</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Talk with the U13s, then ask the family. If Mia says yes, plan a trial.</div>
            </div>
            <div style={{ fontSize: 12, color: MUT }}>This is a suggestion, not a decision.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Who decides</div>
            {[
              { who: 'Mia and her parents', note: 'They say yes or no first' },
              { who: 'Sam and Meg', note: 'Both coaches' },
              { who: 'You', note: 'Director, final decision' },
            ].map((w, i) => (
              <div key={i} style={{ fontSize: 12, color: MUT, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <span style={{ fontWeight: 600, color: INK }}>{w.who}</span> · {w.note}
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Worth knowing</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Mia is among the oldest in her year (March). The oldest in a year often look further ahead sooner — worth noting alongside the numbers.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
