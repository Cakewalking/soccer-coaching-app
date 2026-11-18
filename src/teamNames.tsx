// Demo-data guard for shared coach screens.
//
// Many screens (Wellness, Availability, Consent, Growth and load, Review, Clips…)
// were written once with U12 Sam's players in them and are reused by the youth
// and senior coaches. Until each takes its squad as data, <TeamText> rewrites the
// U12 names on screen to the matching player in the team being shown: same line
// of the pitch, same place in the list. A youth or senior coach never sees a
// U12 child's name. Screens that already take a squad should NOT be wrapped.

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { SQUAD_PLAYERS, YOUTH_SQUAD_PLAYERS, SENIORS_SQUAD_PLAYERS, type SquadPlayer, type PosGroup } from './data'

export type OtherTeam = 'youth' | 'seniors'

const TEAM: Record<OtherTeam, { squad: SquadPlayer[]; label: string; coach: [string, string, string]; phrases: [string, string][] }> = {
  youth: {
    squad: YOUTH_SQUAD_PLAYERS, label: 'U16 Ollie', coach: ['Ollie', 'Ollie G', 'OG'],
    phrases: [['Won 3-1 at Ironbark United', 'Drew 2-2 at home with Tealside Town'], ['Won 3–1 at Ironbark United', 'Drew 2–2 at home with Tealside Town'], ['Ironbark had their best spell', 'Tealside had their best spell'], ['She wrote:', 'They wrote:'], ['if she wants', 'if they want'], ['her parent', 'their parent'], ['her coaches', 'their coaches'], ['9:30 vs Harbour Rovers', '3:30 at Harbour Rovers'], ['home to Harbour Rovers', 'away at Harbour Rovers'], ['9 a side', '11 a side'], ['under 12s', 'under 16s']],
  },
  seniors: {
    squad: SENIORS_SQUAD_PLAYERS, label: 'Men’s 1sts', coach: ['Marko', 'Marko P', 'MP'],
    // Adults: no parent wording anywhere, and no assumed pronoun.
    phrases: [['Won 3-1 at Ironbark United', 'Won 2-0 at home v Glenview Park'], ['Won 3–1 at Ironbark United', 'Won 2–0 at home v Glenview Park'], ['Ironbark had their best spell', 'Glenview had their best spell'], ['She wrote:', 'He wrote:'], ['if she wants', 'if he wants'], ['Message her parent', 'Message him'], ['Opening message to her parent.', 'Opening a message to him.'], ['Answers are seen by her coaches and her parent.', 'Answers are seen by the coaches.'], ['her coaches', 'the coaches'], ['9:30 vs Harbour Rovers', '3:00 at Banksia Park SC'], ['home to Harbour Rovers', 'away at Banksia Park SC'], ['Harbour Rovers', 'Banksia Park SC'], ['9 a side', '11 a side'], ['under 12s', 'seniors']],
  },
}

type Swap = { re: RegExp; map: Map<string, string>; inis: Map<string, string> }
const cache: Partial<Record<OtherTeam, Swap>> = {}

function build(team: OtherTeam): Swap {
  const t = TEAM[team]
  const byGroup = (sq: SquadPlayer[], g: PosGroup) => sq.filter(p => p.posGroup === g)
  const map = new Map<string, string>(), inis = new Map<string, string>(), bare = new Set<string>()
  for (const [a, b] of t.phrases) map.set(a, b)
  map.set('U12 Sam', t.label); map.set('Sam K', t.coach[1]); inis.set('SK', t.coach[2])
  // A bare "Sam" is the player unless the words around it say it is the coach.
  for (const lead of ['from Sam', 'From Sam', 'Tell Sam', 'tell Sam', 'Ask Sam', 'ask Sam', 'Coach Sam']) map.set(lead, lead.replace('Sam', t.coach[0]))
  for (const tail of ['Sam asked', 'Sam said', 'Sam sent', 'Sam set']) map.set(tail, tail.replace('Sam', t.coach[0]))
  for (const g of ['keepers', 'defenders', 'midfielders', 'forwards'] as PosGroup[]) {
    const mine = byGroup(SQUAD_PLAYERS, g), theirs = byGroup(t.squad, g)
    mine.forEach((u, k) => {
      const p = theirs[k % theirs.length], uFirst = u.name.split(' ')[0], pFirst = p.name.split(' ')[0]
      map.set(u.fullName, p.fullName); map.set(u.name, p.name); map.set(u.name.replace('.', ''), p.name.replace('.', ''))
      inis.set(u.ini, p.ini)
      map.set(uFirst, pFirst); bare.add(uFirst)
    })
  }
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // Longest first. A bare first name is left alone when a different surname follows it.
  const alts = [...map.keys()].sort((a, b) => b.length - a.length).map(k => bare.has(k) ? `${esc(k)}(?! [A-Z])` : esc(k))
  return { re: new RegExp(`(?<![A-Za-z])(${alts.join('|')})(?![A-Za-z])`, 'g'), map, inis }
}

/** The same swap for plain strings, for anything built outside the DOM (toasts in portals, exports). */
export function teamText(team: OtherTeam, text: string): string {
  const s = (cache[team] ??= build(team))
  return text.replace(s.re, m => s.map.get(m) ?? m)
}

const ATTRS = ['placeholder', 'aria-label', 'title']

export function TeamText({ team, children }: { team?: OtherTeam | null; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || !team) return
    const s = (cache[team] ??= build(team))
    const written = new WeakMap<Node, string>()
    const isAvatar = (el: Element | null) => {
      if (!el) return false
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el)
      return r.width > 0 && r.width <= 64 && Math.abs(r.width - r.height) < 2 && parseFloat(cs.borderTopLeftRadius) >= r.width / 2 - 1
    }
    const fixText = (n: Node) => {
      const v = n.nodeValue
      if (!v || written.get(n) === v) return
      const trimmed = v.trim()
      let next = v
      if (s.inis.has(trimmed) && isAvatar(n.parentElement)) next = v.replace(trimmed, s.inis.get(trimmed)!)
      else if (trimmed.length > 2) next = teamText(team, v)
      written.set(n, next)
      if (next !== v) n.nodeValue = next
    }
    const fixEl = (el: Element) => {
      for (const a of ATTRS) { const v = el.getAttribute(a); if (v) { const nv = teamText(team, v); if (nv !== v) el.setAttribute(a, nv) } }
    }
    const walk = (n: Node) => {
      if (n.nodeType === Node.TEXT_NODE) { fixText(n); return }
      if (n.nodeType !== Node.ELEMENT_NODE) return
      fixEl(n as Element)
      const tw = document.createTreeWalker(n, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
      for (let c = tw.nextNode(); c; c = tw.nextNode()) { if (c.nodeType === Node.TEXT_NODE) fixText(c); else fixEl(c as Element) }
    }
    walk(root)
    const mo = new MutationObserver(list => {
      for (const m of list) {
        if (m.type === 'characterData') fixText(m.target)
        else if (m.type === 'attributes') fixEl(m.target as Element)
        else m.addedNodes.forEach(walk)
      }
    })
    mo.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS })
    return () => mo.disconnect()
  }, [team])
  if (!team) return <>{children}</>
  return <div ref={ref} data-team-text={team} style={{ display: 'contents' }}>{children}</div>
}

/** A plain word-for-word swap for a screen written with another team's names: the under-9s' Your take boards. */
export function SwapText({ pairs, children }: { pairs: [string, string][]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const map = new Map(pairs), esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`(?<![A-Za-z])(${[...map.keys()].sort((a, b) => b.length - a.length).map(esc).join('|')})(?![A-Za-z])`, 'g')
    const fix = (n: Node) => { const v = n.nodeValue; if (!v) return; const next = v.replace(re, m => map.get(m) ?? m); if (next !== v) n.nodeValue = next }
    const walk = (n: Node) => { if (n.nodeType === Node.TEXT_NODE) { fix(n); return } if (n.nodeType !== Node.ELEMENT_NODE) return; const tw = document.createTreeWalker(n, NodeFilter.SHOW_TEXT); for (let c = tw.nextNode(); c; c = tw.nextNode()) fix(c) }
    walk(root)
    const mo = new MutationObserver(list => { for (const m of list) { if (m.type === 'characterData') fix(m.target); else m.addedNodes.forEach(walk) } })
    mo.observe(root, { childList: true, subtree: true, characterData: true })
    return () => mo.disconnect()
  }, [pairs])
  return <div ref={ref} style={{ display: 'contents' }}>{children}</div>
}
