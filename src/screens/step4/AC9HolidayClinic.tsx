import OwnerHeader from '../academy/OwnerHeader'
import { openScreen } from '../openThing'
import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function Bar({ pct, label }: { pct: number; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
      <div style={{ height: 6, borderRadius: 3, background: LN, overflow: 'hidden', width: 180 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: G, borderRadius: 3 }} />
      </div>
      <div style={{ fontSize: 12, color: MUT }}>{label}</div>
    </div>
  )
}

export default function AC9HolidayClinic({ onNav }: { onBack?: () => void; onNav?: (id: string) => void }) {
  const [done, setDone] = useState<string[]>([])
  const mark = (k: string) => setDone(d => d.includes(k) ? d : [...d, k])
  const is = (k: string) => done.includes(k)

  return (
    <div style={{ width: 1180, background: '#faf5ec', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>

      {/* The owner's menu: six main items and the screens under each (academy handover, 24 Nov) */}
      <OwnerHeader current="AC9-HolidayClinic" onGo={onNav ?? openScreen} />

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>July holiday clinic</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Mon 6 to Wed 8 July · $180 · open to anyone</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => mark('copy')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${is('copy') ? G : '#c5c8c4'}`, background: is('copy') ? PALE : '#fff', color: is('copy') ? G : INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{is('copy') ? '✓ Link copied' : 'Copy the booking link'}</button>
          <button onClick={() => mark('msg')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: is('msg') ? '#40826d' : G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>{is('msg') ? '✓ Message sent' : 'Message booked families'}</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, alignItems: 'start' }}>

        {/* Left 8 cols */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 8px', display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>Bookings</div>
            <div style={{ fontSize: 13, color: MUT }}>31 of 40 places</div>
          </div>
          {/* Row 1: Ages 6-8 */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', borderTop: `1px solid ${LN}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: G, flexShrink: 0 }}>14</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>Ages 6 to 8</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>Mon to Wed · 9:00 to 12:00</div>
              <div style={{ marginTop: 6 }}><Bar pct={88} label="14 of 16" /></div>
            </div>
          </div>
          {/* Row 2: Ages 9-12 */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', borderTop: `1px solid ${LN}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: G, flexShrink: 0 }}>17</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>Ages 9 to 12</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>Mon to Wed · 9:00 to 12:00</div>
              <div style={{ marginTop: 6 }}><Bar pct={71} label="17 of 24" /></div>
            </div>
          </div>
          {/* Row 3: New to academy */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', borderTop: `1px solid ${LN}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: '#f5ede0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#7a5c2e', flexShrink: 0 }}>12</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>New to the academy</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>12 of the 31 have never trained with you</div>
            </div>
            <button onClick={() => mark('invite')} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: `1px solid ${is('invite') ? G : '#c5c8c4'}`, background: is('invite') ? PALE : '#fff', color: is('invite') ? G : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>{is('invite') ? '✓ 12 invited' : 'Invite to a trial'}</button>
          </div>
          <div style={{ padding: '10px 18px 14px', borderTop: `1px solid ${LN}` }}>
            <div style={{ color: MUT, fontSize: 13 }}>Clinic families pay when they book. A place can be cancelled for a full refund up to 7 days before.</div>
          </div>
        </div>

        {/* Right 4 cols */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Revenue tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>Taken so far</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: INK, lineHeight: 1.1 }}>$5,580</div>
            <div style={{ fontSize: 13, color: MUT }}>31 places at $180</div>
          </div>
          {/* Each day tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 12 }}>Each day</div>
            {[
              { letter: 'S', bold: 'Sign in and out', gray: 'A named adult collects each child' },
              { letter: 'H', bold: 'Hot day plan', gray: 'Follows the heat rule, with shade breaks' },
              { letter: 'F', bold: 'First-aid cards', gray: 'Allergies and who to call' },
            ].map((row, i) => (
              <div key={row.letter} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: i === 0 ? 0 : 12, borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: G, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{row.letter}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{row.bold}</div>
                  <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{row.gray}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
