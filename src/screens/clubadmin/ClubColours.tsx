// KC1 Club colours: the director or chair picks the club's two colours and an optional crest.
// KC1e (nothing picked), KC3 (a pale main colour) and KC4 (a gold colour) are the same screen in other states.

import { useRef, useState } from 'react'
import { demoToast } from '../demoToast'
import { AMBER, CHARCOAL, CHARCOAL_NEXT, CS_GREEN, ClubScope, Crest, INK, contrast, derive, isHex, nearAmber, saveClub, useSaved, type Tiles } from '../../clubTheme'

const G = '#2f6252', MUT = '#4a5a57', LINE = '#c5c8c4', HAIR = '#e9eae8', PALE = '#eef5f2', DARK = '#1c3a33'

export const SWATCHES: [string, string][] = [['Red', '#c8102e'], ['Maroon', '#7b1e3a'], ['Orange', '#e8601c'], ['Gold', '#f2b705'], ['Green', '#1f7a4d'], ['Dark green', '#14532d'], ['Sky blue', '#7cc4ee'], ['Royal blue', '#1d4ed8'], ['Navy', '#14213d'], ['Purple', '#5b2a86'], ['Black', '#111111'], ['White', '#ffffff']]
const nameOf = (hex: string) => SWATCHES.find(s => s[1] === hex.toLowerCase())?.[0] ?? (hex.toLowerCase() === CS_GREEN ? 'Green' : 'Your colour')
const lower = (n: string) => n === 'Your colour' ? 'colour' : n.toLowerCase()

const tile: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, display: 'flex', flexDirection: 'column' }
const h2: React.CSSProperties = { margin: 0, fontSize: 17, fontWeight: 700, color: INK }
const btn = (primary = false): React.CSSProperties => ({ height: 44, padding: '0 18px', borderRadius: 10, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', flex: 'none' })

function Picker({ label, value, onPick }: { label: string; value: string; onPick: (hex: string, name: string) => void }) {
  const wheel = useRef<HTMLInputElement>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}><strong style={{ fontSize: 15 }}>{label}</strong><span style={{ fontSize: 13, color: MUT }}>{nameOf(value)}</span></span>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SWATCHES.map(([name, hex]) => { const on = value.toLowerCase() === hex; return <button key={name} role="radio" aria-checked={on} aria-label={name} onClick={() => { onPick(hex, name); demoToast(`${name} picked. The preview changes straight away.`) }} style={{ flex: 'none', width: 44, height: 44, borderRadius: 999, boxSizing: 'border-box', background: hex, border: on ? `3px solid ${INK}` : '1px solid #8d9794', outline: on ? '3px solid #ffffff' : 'none', outlineOffset: -6, padding: 0, cursor: 'pointer' }} /> })}
      </div>
      <button onClick={() => { wheel.current?.click(); demoToast('Type a colour code, or pick from a colour wheel.') }} style={{ ...btn(), alignSelf: 'flex-start', padding: '0 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, position: 'relative' }}>
        <span style={{ width: 18, height: 18, borderRadius: 4, background: value, border: '1px solid #8d9794' }} />
        Exact colour: {value.toUpperCase()}
        <input ref={wheel} type="color" value={value} aria-label={`${label}, exact colour`} tabIndex={-1} onChange={e => { if (isHex(e.target.value)) onPick(e.target.value.toLowerCase(), nameOf(e.target.value)) }} style={{ position: 'absolute', left: 0, bottom: 0, width: 1, height: 1, opacity: 0, border: 0, padding: 0 }} />
      </button>
    </div>
  )
}

const Tick = () => <span style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>
const Check = ({ a, b }: { a: string; b?: string }) => <div style={{ display: 'flex', gap: 10, padding: '9px 0', borderTop: `1px solid ${LINE}`, alignItems: 'flex-start' }}><Tick /><span><strong style={{ display: 'block', fontSize: 15, lineHeight: '20px' }}>{a}</strong>{b && <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span>}</span></div>

/** `storeKey` is the club being set. `start` is the state a board is drawn in. */
export default function ClubColours({ storeKey = 'demo', club = 'Wattle Creek FC', start, title = 'Club colours', by = 'the director or the chair', whole = 'club' }: { storeKey?: string; club?: string; start?: { main: string; second: string; tiles?: Tiles }; title?: string; by?: string; whole?: string }) {
  const saved = useSaved(storeKey)
  const [main, setMain] = useState(saved?.main ?? start?.main ?? CS_GREEN)
  const [second, setSecond] = useState(saved?.second ?? start?.second ?? '#ffffff')
  const [crest, setCrest] = useState<string | undefined>(saved?.crest)
  const [tiles, setTiles] = useState<Tiles>(saved?.tiles ?? start?.tiles ?? 'colours')
  const file = useRef<HTMLInputElement>(null)
  const untouched = main === CS_GREEN && second === '#ffffff' && !saved?.on && !start   // nothing picked yet
  const c = derive(main, second, crest, club, tiles), inColours = derive(main, second, crest, club, 'colours')
  const bothWhite = !c.pale && second.toLowerCase() !== '#ffffff' && contrast('#ffffff', second) >= 4.5
  const mn = nameOf(main), sn = nameOf(second), gold = nearAmber(main) ? mn : nearAmber(second) ? sn : null

  return (
    <div data-screen-colours={untouched ? 'not-set' : 'set'} style={{ padding: '14px 24px 28px', display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'DM Sans',system-ui,sans-serif", color: INK, background: '#faf5ec' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h1>
        <span style={{ flexGrow: 1, fontSize: 14, color: MUT }}>{untouched ? `${club} · not set yet · you are on Clean Sheet green` : tiles === 'charcoal' ? `${club} · big tiles set to charcoal` : `${club} · set once by ${by} · everyone at the ${whole} sees it`}</span>
        <button style={btn()} onClick={() => { saveClub(storeKey, { main, second, crest, tiles, on: false }); demoToast('Back to Clean Sheet green. Your colours are kept in case you change your mind.') }}>Back to green</button>
        <button style={btn(true)} onClick={() => { saveClub(storeKey, { main, second, crest, tiles, on: true }); demoToast(`Saved. Everyone at the ${whole} sees the new colours next time they open Clean Sheet.`) }}>Save for the whole {whole}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 348px', gap: 14, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {untouched && <section style={{ background: DARK, color: '#fff', borderRadius: 14, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#cfe6dc' }}>TWO TAPS</span>
            <strong style={{ fontSize: 22, lineHeight: '28px' }}>Make Clean Sheet look like your {whole}.</strong>
            <span style={{ fontSize: 14, color: '#cfe6dc' }}>Pick your main colour and your second colour. Coaches, players and families see them from their next visit.</span>
          </section>}
          <section aria-label="Your two colours" style={{ ...tile, padding: '14px 18px 12px', gap: 12 }}>
            <h2 style={h2}>Your two colours</h2>
            <Picker label="Main colour" value={main} onPick={setMain} />
            <Picker label="Second colour" value={second} onPick={setSecond} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <strong style={{ fontSize: 15 }}>Big tiles</strong>
              <div role="radiogroup" aria-label="Big tiles" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {([['colours', 'In your colours', 'Darker colour on the story tile', inColours.tileBig, inColours.tileNext], ['charcoal', 'Charcoal', 'Colours on the bar and crest only', CHARCOAL, CHARCOAL_NEXT]] as [Tiles, string, string, string, string][]).map(([id, t, d, a, b]) => <button key={id} role="radio" aria-checked={tiles === id} onClick={() => { setTiles(id); demoToast(`Big tiles: ${t}. The preview changes straight away.`) }} style={{ minHeight: 56, borderRadius: 10, border: tiles === id ? `2px solid ${INK}` : `1px solid ${LINE}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', textAlign: 'left', fontFamily: 'inherit', color: INK, cursor: 'pointer' }}>
                  <span style={{ display: 'flex', gap: 3, flex: 'none' }}><span style={{ width: 26, height: 34, borderRadius: 5, background: a, border: '1px solid #8d9794' }} /><span style={{ width: 18, height: 34, borderRadius: 5, background: b, border: '1px solid #8d9794' }} /></span>
                  <span><strong style={{ display: 'block', fontSize: 14 }}>{t}</strong><span style={{ display: 'block', fontSize: 12, color: MUT }}>{d}</span></span>
                </button>)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: `1px solid ${HAIR}`, paddingTop: 10 }}>
              <Crest size={34} club={c} />
              <span style={{ flexGrow: 1 }}><strong style={{ display: 'block', fontSize: 15 }}>Club crest</strong><span style={{ display: 'block', fontSize: 13, color: MUT }}>{crest ? 'Your crest is on. It shows beside the club’s name.' : 'No crest yet. We draw a shield in your colours until you add one.'}</span></span>
              <button style={btn()} onClick={() => { file.current?.click(); demoToast('Pick an image. Square works best.') }}>{crest ? 'Change the crest' : 'Add a crest'}</button>
              <input ref={file} type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => { if (typeof r.result === 'string') setCrest(r.result) }; r.readAsDataURL(f) }} />
            </div>
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <section aria-label="How it will look" style={{ ...tile, padding: '14px 16px', gap: 10 }}>
            <h2 style={h2}>How it will look</h2>
            <ClubScope main={main} second={second} crest={crest} name={club} tiles={tiles}>
              <div data-club-bar="" style={{ height: 42, borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', gap: 4, padding: '0 0 0 14px', background: G, color: '#fff', overflow: 'hidden' }}>
                <strong style={{ fontSize: 15, marginRight: 8 }}>Clean Sheet</strong>
                {['Home', 'Squad', 'Training'].map((t, i) => <span key={t} data-club-tab={i === 2 ? 'on' : 'off'} style={{ fontSize: 13, fontWeight: 600, padding: '7px 10px' }}>{t}</span>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 8 }}>
                <div style={{ background: untouched ? DARK : c.tileBig, color: '#fff', borderRadius: 8, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-start' }}><strong style={{ fontSize: 10 }}>Seven of your ten took a player on</strong><span style={{ background: AMBER, color: INK, borderRadius: 4, fontSize: 9, fontWeight: 700, padding: '1px 6px' }}>7</span></div>
                <div style={{ background: untouched ? G : c.tileNext, color: untouched ? '#fff' : c.onNext, borderRadius: 8, padding: '8px 10px' }}><strong style={{ fontSize: 10 }}>Tuesday is ready</strong></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div data-club-bar="" style={{ padding: '8px 10px', background: G, color: '#fff' }}><span style={{ display: 'block', fontSize: 9 }}>U11 Luke · for Ari</span><strong style={{ fontSize: 13 }}>Hi Dana</strong></div>
                  <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 10, color: MUT }}>Sunday 9:30, home</span><span style={{ background: G, color: '#fff', borderRadius: 6, fontSize: 10, fontWeight: 700, textAlign: 'center', padding: '4px 0' }}>Ari is coming</span></div>
                </div>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div data-club-band="" style={{ padding: '8px 10px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Crest size={20} /><span><strong style={{ display: 'block', fontSize: 12 }}>{club}</strong><span style={{ display: 'block', fontSize: 9 }}>Season report · Ari D</span></span></div>
                  <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 10, color: MUT, flexGrow: 1 }}>Played in 14 of 16 games</span><span style={{ background: AMBER, color: INK, borderRadius: 4, fontSize: 9, fontWeight: 700, padding: '2px 6px' }}>Strong</span></div>
                </div>
              </div>
            </ClubScope>
          </section>
          <section aria-label="We checked" style={{ ...tile, padding: '14px 16px 6px' }}>
            <h2 style={{ ...h2, paddingBottom: 8 }}>We checked</h2>
            {untouched ? <><Check a="You are on Clean Sheet green" b="Nothing to check" /><Check a={crest ? 'Your crest is on' : 'No crest yet'} b={crest ? undefined : 'A shield stands in'} /></> : <>
              {c.pale ? <Check a={`${mn} is too light for white writing`} b="We use dark writing on it instead. Nothing for you to do" /> : <Check a={bothWhite ? `White writing on your ${lower(mn)} and your ${lower(sn)}` : `White writing on your ${lower(mn)}`} b="Easy to read" />}
              {c.tooClose ? <Check a={`${mn} and ${lower(sn)} are very close`} b={`The line under the bar and the active tab use ${c.pale ? 'dark' : 'white'} instead, so they still stand out`} /> : <Check a={`${mn} and ${lower(sn)} are far enough apart`} b="The line under the bar and the active tab stand out" />}
              {gold ? <Check a={`Your ${lower(gold)} is close to our amber, so we keep them apart`} b={`Amber is how Clean Sheet marks proof. Your ${lower(gold)} stays on the bar, crest and kit, and out of the tiles`} /> : <Check a="Not close to amber" b="Nothing can be mistaken for proof" />}
            </>}
          </section>
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', fontSize: 13, lineHeight: '19px' }}><strong style={{ display: 'block' }}>What stays the same at every club</strong>Buttons stay green and proof stays amber, so a button or a “Strong” figure means the same thing wherever you coach.</div>
        </div>
      </div>
    </div>
  )
}
