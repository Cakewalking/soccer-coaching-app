import { useMemo, useState } from 'react'
import qrcode from 'qrcode-generator'
import { type RoleId } from './tours'
import DemoPhone from './DemoPhone'
import { COLUMNS, MORE_TOURS, ROLE_COUNT, RoleColumn, DeviceIcon, useColumns, useTight, INK, MUT, G, GD, BORDER, PALE, BG } from './rolePicker'

// STA3-PickRole (and STA3l, the same screen with "Look around" chosen).
// Every role in one view: four columns, one row per role, one tap each.

interface Props {
  onTour: (role: RoleId) => void
  onLook: (role: RoleId) => void
  onStory: () => void
  onWhy: () => void
  onSandbox?: () => void
  initialMode?: Mode
}

type Mode = 'tour' | 'look'
const KEY = 'cs_pick_mode'
// Remembered for the visit only: a new visit starts on Guided tour again.
const readMode = (): Mode => { try { return sessionStorage.getItem(KEY) === 'look' ? 'look' : 'tour' } catch { return 'tour' } }

// A real, scannable code for this site's own start address. Drawn as one SVG path.
function QrCode({ text }: { text: string }) {
  const d = useMemo(() => {
    const qr = qrcode(0, 'M'); qr.addData(text); qr.make()
    const n = qr.getModuleCount(); let path = ''
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`
    return { n, path }
  }, [text])
  return (
    <span style={{ flex: 'none', width: 76, height: 76, padding: 6, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 10, boxSizing: 'border-box', display: 'block' }}>
      <svg viewBox={`0 0 ${d.n} ${d.n}`} width="100%" height="100%" shapeRendering="crispEdges" role="img" aria-label="QR code that opens the phone start"><path d={d.path} fill={INK} /></svg>
    </span>
  )
}

const note: React.CSSProperties = { background: PALE, borderRadius: 16, padding: '14px 14px', marginTop: 10, fontSize: 13, color: INK, lineHeight: 1.45 }
const link: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: 0, border: 0, background: 'none', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', textAlign: 'left' }

export default function DemoStart({ onTour, onLook, onStory, onWhy, onSandbox, initialMode }: Props) {
  const [mode, setModeState] = useState<Mode>(() => initialMode ?? readMode())
  const [phoneStart, setPhoneStart] = useState(false)
  const cols = useColumns(), tight = useTight()
  const setMode = (m: Mode) => { setModeState(m); try { sessionStorage.setItem(KEY, m) } catch { /* private window */ } }
  const pick = (id: RoleId) => mode === 'tour' ? onTour(id) : onLook(id)
  const doing = mode === 'tour' ? 'Opens the guided tour.' : 'Opens their home screen.'

  if (phoneStart) return (
    <div style={{ minHeight: '100vh', background: '#e8e9e7' }}>
      <div style={{ width: 390, maxWidth: '100%', margin: '0 auto', background: BG, minHeight: '100vh', position: 'relative' }}>
        <DemoPhone onLook={onLook} onWhy={onWhy} onSandbox={onSandbox ?? (() => {})} onAllRoles={() => setPhoneStart(false)} />
      </div>
    </div>
  )

  const extra: Record<string, React.ReactNode> = {
    families: (
      <div style={{ ...note, display: 'flex', gap: 12, alignItems: 'center' }}>
        <QrCode text={`${window.location.origin}/start`} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>Try these on your phone</div>
          <button style={link} onClick={() => setPhoneStart(true)}>Scan, or open the phone start</button>
        </div>
      </div>
    ),
    'running-the-club': (
      <div style={note}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>Not sure where to start?</div>
        <button style={link} onClick={() => pick('coach')}>Start as the junior coach →</button>
      </div>
    ),
    'private-academies': (
      <div style={note}><strong>The same app, set up for an academy.</strong> Terms and programs in place of seasons. Trials, fees and a progress report each term.</div>
    ),
  }

  return (
    <div data-screen={mode === 'tour' ? 'STA3-PickRole' : 'STA3l-PickRoleLook'} style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)', color: INK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: INK, minHeight: 44, display: 'flex', alignItems: 'center', gap: 12, padding: '0 32px' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Demo.</span>
        <span style={{ fontSize: 14, color: '#fff', flexGrow: 1, minWidth: 0 }}>Wattle Creek FC, Tall Timber Academy and everyone in them are made up. Nothing you tap is saved.</span>
        {onSandbox && <button onClick={onSandbox} style={{ flex: 'none', height: 44, padding: 0, border: 0, background: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', whiteSpace: 'nowrap' }}>Start with an empty club instead</button>}
      </div>

      <div style={{ flexGrow: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '20px 32px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flexGrow: 1 }}>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>Pick who you are</h1>
            <p style={{ margin: '4px 0 0', fontSize: 16, color: MUT }}>{ROLE_COUNT} roles, one tap each. Every role is on this screen.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button onClick={onWhy} style={{ height: 48, padding: '0 18px', borderRadius: 12, border: `1px solid ${BORDER}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Why trust it</button>
            <button onClick={onStory} style={{ height: 48, padding: '0 18px', borderRadius: 12, border: `1px solid ${BORDER}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
              The idea in one minute
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', margin: '14px 0 16px' }}>
          <span id="pick-mode" style={{ fontSize: 14, fontWeight: 700 }}>When I pick a role</span>
          <div role="radiogroup" aria-labelledby="pick-mode" style={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 3, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14 }}>
            {([['tour', 'Guided tour', 'walk me through their week'], ['look', 'Look around', 'open their home screen']] as const).map(([m, t, s]) => (
              <button key={m} role="radio" aria-checked={mode === m} onClick={() => setMode(m)} style={{ minHeight: 44, padding: '0 16px', borderRadius: 11, border: 0, background: mode === m ? G : 'transparent', color: mode === m ? '#fff' : INK, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{t}</span><span style={{ fontSize: 13, color: mode === m ? '#fff' : MUT }}>{s}</span>
              </button>
            ))}
          </div>
          {cols === 2 && <nav aria-label="Groups" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>{COLUMNS.map(c => <a key={c.key} href={`#group-${c.key}`} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, fontWeight: 700, color: G }}>{c.title}</a>)}</nav>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 16, alignItems: 'start' }}>
          {COLUMNS.map(col => (
            <div key={col.key} style={{ minWidth: 0 }}>
              <RoleColumn col={col} rowHeight={cols === 4 && tight ? 52 : 60} showSub doing={doing} onPick={pick} />
              {extra[col.key]}
            </div>
          ))}
        </div>

        <div style={{ flexGrow: 1, minHeight: 16 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0 20px', flexWrap: 'wrap', fontSize: 13, color: MUT }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><DeviceIcon phone={false} /> Made for a tablet or laptop</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><DeviceIcon phone /> Made for a phone</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            Longer tours:
            {MORE_TOURS.map(t => <button key={t.id} onClick={() => onTour(t.id)} style={{ ...link, color: GD, padding: '0 6px', fontWeight: 600 }}>{t.name.replace('The year — ', 'The year, ').replace(' · every role', '')}</button>)}
          </span>
          <span style={{ flexGrow: 1 }} />
          <span>Change role any time from the bar at the top.</span>
        </div>
      </div>
    </div>
  )
}
