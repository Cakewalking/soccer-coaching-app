// ADC13-CheckEntry, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext, useState } from 'react'
import { demoToast } from '../../demoToast'
import { FILM_COUNTS_SKILLS_CHECK } from '../skills'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ADC13CheckEntry({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [count, setCount] = useState<(number | null)[]>([4, 3, 5, 2, 4, 5, 3, null])   // null: not had a turn
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC13-CheckEntry" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Skills check" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Station 3 · One against one</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Gets past a defender · out of 6 goes each · group 1 of 3</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ADC4-SkillsCheck")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Back to the check</button>
          <button onClick={() => go("ADC4-SkillsCheck")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Next station</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="Tap + each time they get past" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>Tap + each time they get past</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>KO</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Kai</strong>
              <button aria-label="Kai: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 0 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Kai: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[0] ?? '–'}</strong>
              <button aria-label="Kai: one more" onClick={() => { setCount(c => c.map((v, k) => k === 0 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Kai: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>AC</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Ana</strong>
              <button aria-label="Ana: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 1 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Ana: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[1] ?? '–'}</strong>
              <button aria-label="Ana: one more" onClick={() => { setCount(c => c.map((v, k) => k === 1 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Ana: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>JM</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Jonah</strong>
              <button aria-label="Jonah: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 2 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Jonah: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[2] ?? '–'}</strong>
              <button aria-label="Jonah: one more" onClick={() => { setCount(c => c.map((v, k) => k === 2 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Jonah: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>FB</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Finn</strong>
              <button aria-label="Finn: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 3 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Finn: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[3] ?? '–'}</strong>
              <button aria-label="Finn: one more" onClick={() => { setCount(c => c.map((v, k) => k === 3 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Finn: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>LN</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Lola</strong>
              <button aria-label="Lola: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 4 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Lola: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[4] ?? '–'}</strong>
              <button aria-label="Lola: one more" onClick={() => { setCount(c => c.map((v, k) => k === 4 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Lola: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>ZA</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Zane</strong>
              <button aria-label="Zane: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 5 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Zane: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[5] ?? '–'}</strong>
              <button aria-label="Zane: one more" onClick={() => { setCount(c => c.map((v, k) => k === 5 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Zane: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>IT</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Isla</strong>
              <button aria-label="Isla: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 6 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Isla: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[6] ?? '–'}</strong>
              <button aria-label="Isla: one more" onClick={() => { setCount(c => c.map((v, k) => k === 6 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Isla: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "8px 10px" }}>
              <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>NP</span>
              <strong style={{ flexGrow: "1", fontSize: "15px" }}>Noah</strong>
              <button aria-label="Noah: one fewer" onClick={() => { setCount(c => c.map((v, k) => k === 7 ? (v === null || v <= 0 ? v : v - 1) : v)); demoToast("Noah: one fewer.") }} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #c5c8c4", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#10211f", fontSize: "20px", fontWeight: "700" }}>−</button>
              <strong style={{ ...C.num,  width: "54px", textAlign: "center", fontSize: "20px" }}>{count[7] ?? '–'}</strong>
              <button aria-label="Noah: one more" onClick={() => { setCount(c => c.map((v, k) => k === 7 ? ((v ?? 0) >= 6 ? v : (v ?? 0) + 1) : v)); demoToast("Noah: one more.") }} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", background: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>+</button>
            </div>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>{count[7] === null ? 'Noah hasn’t had his turn. ' : ''}Opens from “Start the check”.</span>
        </section>
        <aside aria-label="Today" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>Today’s four stations</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>1 · First touch</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>{FILM_COUNTS_SKILLS_CHECK ? 'Counted from film' : 'You tap'}</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>2 · Running with the ball</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>{FILM_COUNTS_SKILLS_CHECK ? 'Timed from film' : 'You time it'}</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>3 · One against one</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>You tap · {count.filter(v => v !== null).length} of 8 done</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>4 · Striking the ball</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>You tap</span>
            </span>
          </div>
          <div style={{ borderRadius: "12px", background: "#eef5f2", padding: "10px 12px", fontSize: "14px", lineHeight: "20px" }}>
            <strong>Height, at station 1.</strong>
            {" Standing, shoes off, twice a term. Used only for growth and load. Only coaches see it."}
          </div>
          <button onClick={() => demoToast("Tap a player and enter their height in centimetres.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, alignSelf: "flex-start", marginTop: "8px" }}>Enter heights</button>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>A missed go isn’t entered. A player who is away does the check next week.</span>
        </aside>
      </main>
    </div>
  )
}
