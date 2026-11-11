import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

function Icon({ d, size = 20, stroke = 'currentColor', sw = 2, fill = 'none' }: { d: string; size?: number; stroke?: string; sw?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d}/>
    </svg>
  )
}

function Toast({ msg }: { msg: string }) {
  return <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{msg}</div>
}

const SPARKLE = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'
const BACK    = 'M15 6l-6 6 6 6'
const CHEVD   = 'M6 9l6 6 6-6'
const HOME    = 'M4 11l8-7 8 7v9H4z'
const SQUAD   = 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5'
const TRAIN   = 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4'
const MATCH   = 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z'
const CLIPS   = 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z'
const RECORD  = 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z'
const MIC     = 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8'
const SEND    = 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z'
const X       = 'M18 6L6 18M6 6l12 12'

const NAV6 = [
  { id: 'home',     label: 'Home',      icon: HOME },
  { id: 'squad',    label: 'Squad',     icon: SQUAD },
  { id: 'training', label: 'Training',  icon: TRAIN },
  { id: 'matchday', label: 'Match day', icon: MATCH },
  { id: 'clips',    label: 'Clips',     icon: CLIPS },
  { id: 'record',   label: 'Record',    icon: RECORD },
]

const HOME_SUBS = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']

const EXAMPLE_QUESTIONS = [
  'Who needs a rest this week?',
  'What should we work on tonight?',
  'Is everyone getting fair minutes?',
  'Why did we concede on Saturday?',
]

function CoachTopBar({ onNav, askButton }: { onNav: (id: string) => void; askButton?: React.ReactNode }) {
  return (
    <div style={{ background: GD, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 2, height: 56, flexShrink: 0 }}>
      <span style={{ color: '#e9eae8', fontWeight: 800, fontSize: 16, marginRight: 10 }}>Clean Sheet</span>
      {NAV6.map(tab => (
        <button key={tab.id} onClick={() => onNav(tab.id)}
          style={{ height: 48, padding: '0 14px', borderRadius: 12, background: tab.id === 'home' ? G2 : 'transparent', color: '#e9eae8', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          <Icon d={tab.icon} size={18}/> {tab.label}
        </button>
      ))}
      <div style={{ flex: 1 }}/>
      {askButton}
      <button onClick={() => onNav('team')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e9eae8', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 8 }}>
        U12 Sam · Wattle Creek <Icon d={CHEVD} size={14}/>
      </button>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginLeft: 8 }}>SK</div>
    </div>
  )
}

function CoachSubNav({ activeSub, onNav }: { activeSub: string; onNav: (id: string) => void }) {
  return (
    <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4, flexShrink: 0 }}>
      {HOME_SUBS.map(tab => (
        <button key={tab} onClick={() => onNav('sub:' + tab)}
          style={{ height: 44, padding: '0 4px', marginRight: 16, fontSize: 15, fontWeight: 600, color: tab === activeSub ? G : MUT, background: 'transparent', border: 'none', borderBottom: `3px solid ${tab === activeSub ? G : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
          {tab}
        </button>
      ))}
    </div>
  )
}

// ASK1 — Home with Ask box
export function AskHome({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [input, setInput] = useState('')
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      <CoachTopBar onNav={(id) => t(`${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}/>
      <CoachSubNav activeSub="Overview" onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id} opens.`)}/>
      {/* Page content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
        {/* Ask box — top of content area */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', marginBottom: 24, boxShadow: '0 2px 8px rgba(16,33,31,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon d={SPARKLE} size={20} stroke={G}/>
            <span style={{ fontSize: 14, fontWeight: 700, color: G }}>Ask Clean Sheet</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask Clean Sheet about your team…"
              style={{ flex: 1, height: 44, padding: '0 14px', borderRadius: 10, border: `1.5px solid ${LN}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: INK }}
            />
            <button onClick={() => t('Voice input opens.')} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
              <Icon d={MIC} size={18}/>
            </button>
            <button onClick={() => t('Opening Ask Clean Sheet panel (ASK3).')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
            {EXAMPLE_QUESTIONS.map(q => (
              <button key={q} onClick={() => { setInput(q); t('Opening Ask Clean Sheet panel (ASK3).') }}
                style={{ padding: '6px 12px', borderRadius: 100, border: `1px solid ${LN}`, background: PALE, color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {q}
              </button>
            ))}
          </div>
        </div>
        {/* Rest of home page (placeholder tiles) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {[
            { title: 'Tonight\'s session', sub: '17 coming · Messmate Primary', emoji: '📋' },
            { title: 'Squad available', sub: '15 of 18 · 3 responses pending', emoji: '👥' },
            { title: 'Last Saturday', sub: 'Wattle Creek 2–1 Glen Waverley', emoji: '⚽' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{card.title}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{card.sub}</div>
            </div>
          ))}
        </div>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// ASK2 — Ask minimised (floating button on any screen)
export function AskMinimised({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7', position: 'relative' }}>
      <CoachTopBar onNav={(id) => t(`${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}/>
      <CoachSubNav activeSub="Overview" onNav={() => t('Tab opens.')}/>
      {/* Background content (player summary placeholder) */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px', marginBottom: 14 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 4 }}>Mia Tran</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>U12 Sam · Midfielder</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[{ n: '12', l: 'Games' }, { n: '8', l: 'Goals' }, { n: '58%', l: 'Minutes' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center', background: PALE, borderRadius: 10, padding: '10px' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: G }}>{s.n}</div>
                <div style={{ fontSize: 11, color: MUT }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: 16, opacity: 0.5 }}>
          <div style={{ height: 12, background: LN, borderRadius: 6, marginBottom: 8, width: '70%' }}/>
          <div style={{ height: 10, background: LN, borderRadius: 6, width: '50%' }}/>
        </div>
      </div>
      {/* Floating Ask button */}
      <button onClick={() => t('Ask Clean Sheet panel opens (ASK3).')}
        style={{ position: 'absolute', bottom: 28, right: 28, height: 48, padding: '0 20px', borderRadius: 100, background: GD, color: '#fff', border: 'none', boxShadow: '0 6px 20px rgba(16,33,31,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, fontFamily: 'inherit' }}>
        <Icon d={SPARKLE} size={18} stroke="#fff"/> Ask Clean Sheet
      </button>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// ASK3 — Ask open (panel with answer)
export function AskOpen({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [input, setInput] = useState('')
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const sources = [
    { n: 'A', label: 'Game minutes', note: 'Last 9 games, U12 Sam' },
    { n: 'B', label: 'Squad size and availability', note: 'As of this week' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7', position: 'relative' }}>
      <CoachTopBar onNav={(id) => t(`${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}/>
      <CoachSubNav activeSub="Overview" onNav={() => t('Tab opens.')}/>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0 }}>
        {/* Background content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', opacity: 0.4, pointerEvents: 'none', userSelect: 'none' as const }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 4 }}>Mia Tran</div>
            <div style={{ fontSize: 13, color: MUT }}>U12 Sam · Midfielder</div>
          </div>
        </div>
        {/* Ask panel */}
        <aside role="dialog" aria-label="Ask Clean Sheet" style={{ width: 380, flexShrink: 0, borderLeft: `1px solid ${LN}`, background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 20px rgba(16,33,31,0.08)' }}>
          {/* Panel header */}
          <div style={{ padding: '16px 18px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon d={SPARKLE} size={18} stroke={G}/>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>Ask Clean Sheet</span>
            <button onClick={() => t('Panel closed.')} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
              <Icon d={X} size={14}/>
            </button>
          </div>
          {/* Transcript */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
            {/* Question */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: '14px 14px 2px 14px', background: GD, color: '#fff', fontSize: 13, lineHeight: 1.5 }}>
                How much of the season has Mia Tran played?
              </div>
            </div>
            {/* Answer */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Icon d={SPARKLE} size={14} stroke={G}/>
                <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>Clean Sheet</span>
              </div>
              <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.6 }}>
                Mia has played <strong>58% of available minutes</strong> this season — 9 of the last 12 games. She was absent for one game and came off at half-time twice, both times with a note from Priya about her hamstring load. She's under the equal-minutes threshold for U12.
              </div>
            </div>
            {/* Sources */}
            <div style={{ background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>What I used</div>
              {sources.map((s, i) => (
                <div key={s.n} style={{ display: 'flex', gap: 10, padding: i > 0 ? '8px 0 0' : '0', marginTop: i > 0 ? 8 : 0, borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{s.note}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Safety note */}
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6, borderTop: `1px solid ${LN}`, paddingTop: 12 }}>
              It answers from what you can see as head coach. It never sends anything by itself — anything it suggests needs your approval.
              <br/><br/>
              Wellness answers and welfare concerns are never used.
            </div>
          </div>
          {/* Composer */}
          <div style={{ padding: '12px 14px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something else…"
              style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}/>
            <button onClick={() => t('Opening voice input.')} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
              <Icon d={MIC} size={16}/>
            </button>
            <button onClick={() => t('Question sent.')} style={{ width: 36, height: 36, borderRadius: 8, background: G, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={SEND} size={16} stroke="#fff"/>
            </button>
          </div>
        </aside>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// ASK3e — Ask open, first time
export function AskOpenFirst({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [input, setInput] = useState('')
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7', position: 'relative' }}>
      <CoachTopBar onNav={(id) => t(`${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}/>
      <CoachSubNav activeSub="Overview" onNav={() => t('Tab opens.')}/>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0 }}>
        {/* Background */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', opacity: 0.4, pointerEvents: 'none', userSelect: 'none' as const }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
            <div style={{ height: 16, background: LN, borderRadius: 6, width: '60%', marginBottom: 8 }}/>
            <div style={{ height: 12, background: LN, borderRadius: 6, width: '40%' }}/>
          </div>
        </div>
        {/* Panel — first time empty state */}
        <aside role="dialog" aria-label="Ask Clean Sheet" style={{ width: 380, flexShrink: 0, borderLeft: `1px solid ${LN}`, background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 20px rgba(16,33,31,0.08)' }}>
          <div style={{ padding: '16px 18px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon d={SPARKLE} size={18} stroke={G}/>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>Ask Clean Sheet</span>
            <button onClick={() => t('Panel closed.')} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
              <Icon d={X} size={14}/>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 18px' }}>
            <div style={{ color: G, marginBottom: 14, textAlign: 'center' }}><Icon d={SPARKLE} size={36} stroke={G} sw={1.5}/></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6, textAlign: 'center' }}>Ask in your own words</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginBottom: 20, textAlign: 'center' }}>
              Ask about your team and Clean Sheet finds the answer in your data. It won't guess or make things up.
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Try asking</div>
              {EXAMPLE_QUESTIONS.map(q => (
                <button key={q} onClick={() => { setInput(q); t('Question ready — tap Ask.') }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: `1px solid ${LN}`, background: PALE, color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 8 }}>
                  {q}
                </button>
              ))}
            </div>
            <div style={{ background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', fontSize: 12, color: MUT, lineHeight: 1.6 }}>
              Only uses what your role can already see. Wellness answers and welfare concerns are never used.
            </div>
          </div>
          <div style={{ padding: '12px 14px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask your first question…"
              style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}/>
            <button onClick={() => t('Opening voice input.')} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
              <Icon d={MIC} size={16}/>
            </button>
            <button onClick={() => t('Question sent — ASK3 panel opens with answer.')} style={{ width: 36, height: 36, borderRadius: 8, background: G, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={SEND} size={16} stroke="#fff"/>
            </button>
          </div>
        </aside>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// ASKp1 — Phone with floating sparkle button
export function AskPhoneButton({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7', maxWidth: 390, margin: '0 auto', position: 'relative' }}>
      {/* Phone header */}
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, flexShrink: 0 }}>
        <button onClick={() => t('Back.')} style={{ background: 'transparent', border: 'none', color: '#e9eae8', cursor: 'pointer', padding: 0 }}>
          <Icon d={BACK} size={20} stroke="#e9eae8"/>
        </button>
        <span style={{ flex: 1, color: '#e9eae8', fontSize: 15, fontWeight: 700 }}>Wattle Creek FC | Home</span>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>SK</div>
      </div>
      {/* Phone content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {[
          { emoji: '📋', t: 'Tonight\'s training', s: '5:00pm · Messmate Primary' },
          { emoji: '👥', t: '17 of 18 coming', s: '1 no answer' },
          { emoji: '📅', t: 'Calendar', s: 'No fixture this Saturday' },
        ].map(card => (
          <div key={card.t} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{card.emoji}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{card.t}</div>
            <div style={{ fontSize: 12, color: MUT }}>{card.s}</div>
          </div>
        ))}
      </div>
      {/* Phone bottom bar + floating sparkle */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 20px', flexShrink: 0, position: 'relative' }}>
        {['Home', 'Squad', 'Training', 'Clips'].map(tab => (
          <button key={tab} onClick={() => t(`${tab} opens.`)} style={{ background: 'transparent', border: 'none', fontSize: 11, fontWeight: 600, color: tab === 'Home' ? G : MUT, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontFamily: 'inherit' }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: tab === 'Home' ? PALE : 'transparent' }}/>
            {tab}
          </button>
        ))}
        {/* Floating round sparkle button above nav bar */}
        <button onClick={() => t('Ask Clean Sheet opens — ASKp2.')}
          aria-label="Ask Clean Sheet"
          style={{ position: 'absolute', top: -26, right: 20, width: 52, height: 52, borderRadius: '50%', background: GD, color: '#fff', border: '3px solid #fff', boxShadow: '0 4px 16px rgba(16,33,31,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d={SPARKLE} size={22} stroke="#fff"/>
        </button>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

// ASKp2 — Phone with Ask bottom sheet
export function AskPhoneOpen({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [input, setInput] = useState('')
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7', maxWidth: 390, margin: '0 auto', position: 'relative' }}>
      {/* Phone header */}
      <div style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, flexShrink: 0 }}>
        <button onClick={() => t('Back.')} style={{ background: 'transparent', border: 'none', color: '#e9eae8', cursor: 'pointer', padding: 0 }}>
          <Icon d={BACK} size={20} stroke="#e9eae8"/>
        </button>
        <span style={{ flex: 1, color: '#e9eae8', fontSize: 15, fontWeight: 700 }}>Wattle Creek FC | Mia</span>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>LT</div>
      </div>
      {/* Background content (dimmed) */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, opacity: 0.3, pointerEvents: 'none', userSelect: 'none' as const }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ height: 14, background: LN, borderRadius: 4, width: '60%', marginBottom: 8 }}/>
          <div style={{ height: 10, background: LN, borderRadius: 4, width: '40%' }}/>
        </div>
      </div>
      {/* Ask bottom sheet */}
      <div style={{ background: '#fff', borderTop: `2px solid ${LN}`, borderRadius: '20px 20px 0 0', padding: '0 0 24px', flexShrink: 0, maxHeight: '70%', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 -4px 24px rgba(16,33,31,0.12)' }}>
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: LN }}/>
        </div>
        {/* Sheet header */}
        <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon d={SPARKLE} size={16} stroke={G}/>
          <span style={{ fontSize: 14, fontWeight: 700, color: G, flex: 1 }}>Ask Clean Sheet</span>
          <button onClick={() => t('Sheet closed.')} style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
            <Icon d={X} size={12}/>
          </button>
        </div>
        {/* Answer */}
        <div style={{ overflowY: 'auto', padding: '0 16px 12px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <div style={{ maxWidth: '85%', padding: '8px 12px', borderRadius: '12px 12px 2px 12px', background: GD, color: '#fff', fontSize: 13, lineHeight: 1.5 }}>
              What does Mia need for Saturday?
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', fontSize: 13, color: INK, lineHeight: 1.6 }}>
              A friendly at Glenview, 10:00 am. She's been averaging 58% of minutes, so she should get a full first half. Priya's hamstring note says no more than 60 continuous minutes.
            </div>
          </div>
          <div style={{ fontSize: 11, color: MUT, lineHeight: 1.5, marginBottom: 4 }}>
            Answers only from what you can see as Mia's parent. Nothing about other children.
          </div>
        </div>
        {/* Composer */}
        <div style={{ padding: '10px 16px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something else…"
            style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}/>
          <button onClick={() => t('Opening voice input.')} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
            <Icon d={MIC} size={16}/>
          </button>
          <button onClick={() => t('Question sent.')} style={{ width: 36, height: 36, borderRadius: 8, background: G, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={SEND} size={16} stroke="#fff"/>
          </button>
        </div>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

export default AskHome
