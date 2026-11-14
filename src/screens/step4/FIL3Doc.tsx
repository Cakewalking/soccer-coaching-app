import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type SideTab = 'Comments' | 'Live' | 'Opened'

export default function FIL3Doc({ onBack, onShare, onNav }: {
  onBack?: () => void
  onShare?: () => void
  onNav?: (s: string) => void
}) {
  const [parentView, setParentView] = useState(false)
  const [sideTab, setSideTab] = useState<SideTab>('Live')
  const [lastTool, setLastTool] = useState('')
  const [lastSection, setLastSection] = useState('')
  function tool(name: string) { setLastTool(name) }
  function sect(name: string) { setLastSection(name) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }} data-lasttool={lastTool} data-lastsection={lastSection}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {[
          { label: 'Home', target: 'PH1-HomeJuniorsSame' },
          { label: 'Squad', target: 'PH1-HomeJuniorsSame' },
          { label: 'Training', target: 'PH1-HomeJuniorsSame' },
          { label: 'Match day', target: 'PH1-HomeJuniorsSame' },
          { label: 'Clips', target: 'PH1-HomeJuniorsSame' },
          { label: 'Record', target: 'REC1-RecordHub' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => onNav?.(target)} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, padding: '0 10px', display: 'flex', alignItems: 'center' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </div>
          <div onClick={() => onNav?.('PH1-HomeJuniorsSame')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer' }}>U12 Sam</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center', flexShrink: 0 }}>
        {[
          { label: 'Overview', target: 'PH1-HomeJuniorsSame' },
          { label: 'Messages', target: 'PH1-HomeJuniorsSame' },
          { label: 'Calendar', target: 'PH1-HomeJuniorsSame' },
          { label: 'Fixtures and results', target: 'PH1-HomeJuniorsSame' },
          { label: 'Our style', target: 'PH1-HomeJuniorsSame' },
          { label: "Where we're at", target: 'WA1-WhereWeAt' },
          { label: 'Team staff', target: 'PH1-HomeJuniorsSame' },
          { label: 'Files', target: 'FIL1-Files' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => onNav?.(target)} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', borderBottom: label === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: label === 'Files' ? 700 : 500, color: label === 'Files' ? G : MUT, cursor: 'pointer' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* Doc metadata */}
      <div style={{ background: '#fff', padding: '4px 24px', borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: MUT }}>Doc · saved just now · shared with U12 Sam families · 12 of 17 have opened it</div>
        <div style={{ fontSize: 12, color: MUT }}>Families see the page, not the comments or who has opened it.</div>
      </div>

      {/* Doc toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 16px', display: 'flex', gap: 4, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={() => onBack?.()} style={{ fontSize: 13, color: MUT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0 8px', whiteSpace: 'nowrap', minHeight: 44, display: 'flex', alignItems: 'center' }}>Back to Files</button>
        <div style={{ width: 1, height: 24, background: LN, flexShrink: 0 }} />
        {['History', 'Download', 'Undo', 'Redo', 'Heading 2', 'B', 'I', 'U', 'Bullet list', 'Tick list', 'Align', 'Link', 'Picture', 'Table', 'Comment', 'From Clean Sheet', 'Print'].map(b => (
          <button key={b} onClick={() => tool(b)} style={{ minHeight: 44, minWidth: 44, padding: '0 7px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === b ? PALE : '#fff', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === b ? G : INK, whiteSpace: 'nowrap', flexShrink: 0 }}>{b}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexShrink: 0 }}>
          <button onClick={() => { setParentView(false); tool('Edit') }} style={{ minHeight: 44, padding: '0 10px', borderRadius: 999, border: `1.5px solid ${!parentView ? G : LN}`, background: !parentView ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: !parentView ? G : MUT, fontWeight: !parentView ? 700 : 400 }}>Edit</button>
          <button onClick={() => setParentView(true)} style={{ minHeight: 44, padding: '0 10px', borderRadius: 999, border: `1.5px solid ${parentView ? G : LN}`, background: parentView ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: parentView ? G : MUT }}>As a parent sees it</button>
          <button onClick={() => onShare?.()} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Outline */}
        <div style={{ width: 180, padding: '24px 16px', borderRight: `1px solid ${LN}`, background: '#fff', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 12 }}>Outline</div>
          {[
            'Saturday, home to Harbour Rovers',
            'Meet and kick-off',
            'Ground',
            'What to bring',
            'Hot day',
            'On duty',
            'Club header',
          ].map((h, i) => (
            <div key={h} onClick={() => sect(h)} style={{ fontSize: 13, color: lastSection === h ? G : (i === 0 ? G : MUT), fontWeight: (i === 0 || lastSection === h) ? 600 : 400, padding: '4px 0', cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center' }}>{h}</div>
          ))}
        </div>

        {/* Doc content */}
        <div style={{ flex: 1, padding: parentView ? 24 : 32, overflowY: 'auto', background: parentView ? PALE : undefined }}>
          {parentView && (
            <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', marginBottom: 16, border: `1.5px solid ${G}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 4 }}>As a parent sees it</div>
              <div style={{ fontSize: 13, color: MUT }}>This is how the document looks to families on their phones.</div>
            </div>
          )}
          {/* Club header */}
          <div style={{ background: GD, color: '#fff', borderRadius: '12px 12px 0 0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Wattle Creek FC</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Set by Wattle Creek FC. Every team's docs match.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => sect('Green')} style={{ minHeight: 44, minWidth: 44, borderRadius: '50%', background: G, border: '2px solid #fff', cursor: 'pointer' }} title="Green" />
              <div style={{ fontSize: 12, opacity: 0.7 }}>U12 Sam · Head coach</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '0 0 12px 12px', border: `1px solid ${LN}`, borderTop: 'none', padding: '28px 32px' }}>
            <div onClick={() => sect('Saturday, home to Harbour Rovers')} style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 4, cursor: 'pointer', background: lastSection === 'Saturday, home to Harbour Rovers' ? PALE : undefined, borderRadius: 6, padding: '2px 4px', minHeight: 44, display: 'flex', alignItems: 'center' }}>Saturday, home to Harbour Rovers</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>From Sam, your coach · touch 8</div>

            <div onClick={() => sect('Meet and kick-off')} style={{ background: '#f0faf5', border: `1.5px solid ${G}`, borderRadius: 10, padding: '14px 18px', marginBottom: 20, cursor: 'pointer', outline: lastSection === 'Meet and kick-off' ? `2px solid ${G}` : 'none' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G, marginBottom: 6 }}>📍 Live · kick-off and meet time</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Meet 8:40</div>
              <div style={{ fontSize: 13, color: MUT }}>Kick-off 9:00 am</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <div style={{ fontSize: 12, color: G }}>Changed from 8:45 last night</div>
                <button onClick={e => { e.stopPropagation(); sect('Add it') }} style={{ minHeight: 44, padding: '0 10px', borderRadius: 999, background: PALE, border: 'none', fontSize: 11, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Add it</button>
              </div>
            </div>

            <div onClick={() => sect('Ground')} style={{ background: '#f0faf5', border: `1.5px solid ${G}`, borderRadius: 10, padding: '14px 18px', marginBottom: 20, cursor: 'pointer', outline: lastSection === 'Ground' ? `2px solid ${G}` : 'none' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G, marginBottom: 6 }}>📍 Live · ground</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Wattle Creek Reserve, pitch 2</div>
              <div style={{ fontSize: 13, color: MUT }}>34 Reserve Road, Wattle Creek</div>
            </div>

            <div onClick={() => sect('What to bring')} style={{ cursor: 'pointer', background: lastSection === 'What to bring' ? PALE : undefined, borderRadius: 6, padding: '4px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>What to bring</div>
              <ul style={{ margin: '0 0 16px', padding: '0 0 0 20px', fontSize: 14, color: INK, lineHeight: 1.8 }}>
                <li>Boots and shin pads</li>
                <li>Water bottle (full before you arrive)</li>
                <li>Rain jacket — showers likely</li>
              </ul>
            </div>

            <div onClick={() => sect('Hot day')} style={{ background: '#fef9e7', border: `1px solid #fde68a`, borderRadius: 10, padding: '12px 16px', marginBottom: 16, cursor: 'pointer', outline: lastSection === 'Hot day' ? `2px solid #f59e0b` : 'none' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e' }}>Hot day note</div>
              <div style={{ fontSize: 12, color: '#78350f' }}>Hot day. 29° forecast. Drinks breaks each half. If it reaches 32° the club calls it off by 7:30 am and you get a message.</div>
            </div>

            <div onClick={() => sect('On duty')} style={{ cursor: 'pointer', background: lastSection === 'On duty' ? PALE : undefined, borderRadius: 6, padding: '4px', marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>On duty</div>
              <div style={{ fontSize: 14, color: MUT }}>Jess Marsh · canteen and oranges</div>
            </div>

            <div onClick={() => sect('Club header')} style={{ cursor: 'pointer', background: lastSection === 'Club header' ? PALE : undefined, borderRadius: 6, padding: '4px', marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Club header</div>
              <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>Any questions, message Sam through Clean Sheet. Have a great game!</div>
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.7, borderTop: `1px solid ${LN}`, paddingTop: 16 }}>
              Can&apos;t make it? Change Mia&apos;s answer in the app by Friday 6:00 pm so I can plan the minutes. See you there. Sam
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button onClick={() => sect('Reply')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, background: lastSection === 'Reply' ? G : PALE, color: lastSection === 'Reply' ? '#fff' : G, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Reply</button>
              <button onClick={() => sect('Nudge')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, background: lastSection === 'Nudge' ? G : PALE, color: lastSection === 'Nudge' ? '#fff' : G, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge</button>
            </div>
          </div>
        </div>

        {/* Right side panel */}
        <div style={{ width: 240, borderLeft: `1px solid ${LN}`, background: '#fff', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${LN}` }}>
            {(['Comments', 'Live', 'Opened'] as SideTab[]).map(t => (
              <button key={t} onClick={() => { setSideTab(t); tool(t) }} style={{ flex: 1, minHeight: 44, background: 'none', border: 'none', borderBottom: sideTab === t ? `2px solid ${G}` : '2px solid transparent', fontSize: 12, fontWeight: sideTab === t ? 700 : 500, color: sideTab === t ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
            ))}
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
            {sideTab === 'Live' && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Changed by itself</div>
                <div style={{ padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: G }}>Meet time changed from 8:45 to 8:40</div>
                  <div style={{ fontSize: 11, color: MUT }}>Last night at 9:12 pm · Fixture update</div>
                  <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>Rob moved the meet time from 8:45 to 8:40. The green block updated and 12 families were told.</div>
                </div>
              </div>
            )}
            {sideTab === 'Opened' && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>12 of 17 families opened</div>
                <button onClick={() => sect('Nudge')} style={{ marginBottom: 12, minHeight: 44, padding: '0 14px', borderRadius: 999, background: lastSection === 'Nudge' ? G : PALE, color: lastSection === 'Nudge' ? '#fff' : G, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge</button>
                <div style={{ fontSize: 12, color: MUT }}>1 comment from Jess Marsh</div>
              </div>
            )}
            {sideTab === 'Comments' && (
              <div>
                <div style={{ display: 'flex', gap: 10, padding: '10px 0' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>JM</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Jess Marsh</div>
                    <div style={{ fontSize: 12, color: MUT }}>Can we car pool from the ground?</div>
                    <button onClick={() => sect('Reply')} style={{ marginTop: 4, minHeight: 44, padding: '0 10px', fontSize: 11, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Reply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
