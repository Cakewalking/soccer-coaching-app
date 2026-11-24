// Turns the body of each AD board (the part under the menus) into a React screen file.
// The board source is read as text only; nothing in it is run.
// usage: node ado-convert.mjs <pack source dir> <out dir> [<board number, e.g. AD7 AD16 AD1e> ...]
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
const [srcDir, outDir] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })

const CLASSES = new Set(['h2', 'cap', 'label', 'more', 'primary', 'tile', 'card', 'num', 'trow', 'th'])
const CLASS_HAS_BOX = new Set(['more', 'primary', 'tile'])
const CLASS_PADS = new Set(['more', 'primary', 'tile', 'card'])
const CLASS_SIZED = new Set(['more', 'primary', 'trow'])
const PX_OK = /^(fontSize|width|height|minHeight|minWidth|maxWidth|maxHeight|gap|rowGap|columnGap|padding|paddingTop|paddingBottom|paddingLeft|paddingRight|margin|marginTop|marginBottom|marginLeft|marginRight|borderRadius|top|left|right|bottom)$/
const NUM_OK = /^(fontWeight|flexGrow|flexShrink|opacity|zIndex|lineHeight|order)$/
const ATTR = { class: 'className', tabindex: 'tabIndex', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule', viewbox: 'viewBox', 'stroke-dasharray': 'strokeDasharray' }
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', apos: "'" }
const decode = s => s.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENT[e] ?? m)
const camel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
const str = s => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

function parse(html) {
  const root = { tag: '#root', attrs: {}, kids: [] }, stack = [root]
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=>/]+(?:="[^"]*")?)*)\s*(\/?)>/g
  let at = 0, m
  const text = t => { if (t) stack[stack.length - 1].kids.push({ text: decode(t) }) }
  while ((m = re.exec(html))) {
    text(html.slice(at, m.index)); at = re.lastIndex
    const [, close, tag, rawAttrs, selfClose] = m
    if (close) { if (stack[stack.length - 1].tag !== tag) throw new Error(`mismatched </${tag}>, open is <${stack[stack.length - 1].tag}>`); stack.pop(); continue }
    const attrs = {}
    for (const a of rawAttrs.matchAll(/([^\s=]+)(?:="([^"]*)")?/g)) if (!(a[1] in attrs)) attrs[a[1]] = a[2] === undefined ? true : decode(a[2])   // the boards write role twice; the first is the real one
    const node = { tag, attrs, kids: [] }
    stack[stack.length - 1].kids.push(node)
    if (!selfClose && tag !== 'br' && tag !== 'path') stack.push(node)
  }
  text(html.slice(at))
  if (stack.length !== 1) throw new Error('unclosed ' + stack.map(s => s.tag).join(' > '))
  return root
}

function styleOf(css) {
  const out = []
  for (const part of (css ?? '').split(';')) {
    const i = part.indexOf(':'); if (i < 0) continue
    const k = camel(part.slice(0, i).trim()), v = part.slice(i + 1).trim()
    if (!k || !v) continue
    const old = out.findIndex(([key]) => key === k); if (old >= 0) out.splice(old, 1)   // a later value wins
    out.push([k, v])
  }
  return out
}
const val = (k, v) => /^-?\d+(\.\d+)?px$/.test(v) && PX_OK.test(k) ? String(parseFloat(v)) : /^-?\d+(\.\d+)?$/.test(v) && (NUM_OK.test(k) || v === '0') ? v : str(v)

function emit(node, acts, depth, links, used, parent) {
  const pad = '  '.repeat(depth)
  if (node.text !== undefined) {
    const t = node.text
    if (!t.trim()) return /\n/.test(t) ? '' : `${pad}{' '}\n`
    return /^\s|\s$|[{}<>]/.test(t) ? `${pad}{${str(t.replace(/\s+/g, ' '))}}\n` : `${pad}${t}\n`
  }
  // The working pieces of a form (formKit): a field, a row of choices, a tick box, a money stepper.
  const words = n => n.text !== undefined ? n.text : n.kids.map(words).join('')
  const els = node.kids.filter(k => k.tag)
  if (node.tag === 'span' && parent?.tag === 'label' && /border:1px solid #c5c8c4/.test(node.attrs.style ?? '')) {
    used.add('Field'); const t = words(node).trim(), hint = /^Type /.test(t)
    return `${pad}<Field ${hint ? 'hint' : 'value'}=${t.includes('"') ? `{${str(t)}}` : `"${t}"`}${/min-height:72px/.test(node.attrs.style) ? ' lines' : ''} />\n`
  }
  if (node.attrs.role === 'radiogroup') {
    used.add('Picks'); const opts = els.map(k => words(k).trim())
    return `${pad}<Picks label="${node.attrs['aria-label']}" start={${els.findIndex(k => k.attrs['aria-checked'] === 'true')}} options={[${opts.map(str).join(', ')}]} />\n`
  }
  if (node.tag === 'a' && node.attrs.role === 'checkbox') { used.add('Tick'); return `${pad}<Tick start={${node.attrs['aria-checked'] === 'true'}}>${words(node).trim()}</Tick>\n` }
  if (node.tag === 'span' && els.length === 3 && els[0].attrs['aria-label'] === 'Lower the aim' && els[2].attrs['aria-label'] === 'Raise the aim') {
    used.add('Step'); const row = parent.kids.filter(k => k.tag), col = row.indexOf(node), heads = ['', 'group session', 'one-on-one']
    return `${pad}<Step start="${words(els[1]).trim()}" what="${words(row[0]).trim()}${parent.kids.filter(k => k.tag && k.kids.some(x => x.attrs?.['aria-label'] === 'Lower the aim')).length > 1 ? ', ' + heads[col] : ''}" />\n`
  }
  let { tag } = node
  const a = { ...node.attrs }
  const classes = (a.class ?? '').split(/\s+/).filter(Boolean); delete a.class
  for (const c of classes) if (!CLASSES.has(c)) throw new Error('unknown class ' + c)
  const pairs = styleOf(a.style); delete a.style
  const has = k => pairs.some(([key]) => key === k)
  const props = []
  if (tag === 'a') {
    tag = 'Tap'
    if (a.href) { const id = a.href.replace(/\.dc\.html$/, ''); props.push(`to="${id}"`); links.push(id) }
    else if (a.onClick) { const n = Number(a.onClick.match(/a_(\d+)/)[1]); const line = acts.get(n); if (!line) throw new Error('no line for a_' + n); props.push(`say=${line.includes('"') ? `{${str(line)}}` : `"${line}"`}`) }
    else throw new Error('a link that does nothing')
    delete a.href; delete a.onClick; delete a.role; delete a.tabindex
  }
  // the boards have no global border-box rule and this app does: keep the board's sizes
  const pads = pairs.some(([k]) => /^(padding|border)/.test(k) && k !== 'borderRadius') || classes.some(c => CLASS_PADS.has(c))
  const sized = pairs.some(([k, v]) => /^(width|height|minHeight|minWidth|maxWidth|maxHeight|flexBasis)$/.test(k) || (k === 'flex' && /px/.test(v))) || classes.some(c => CLASS_SIZED.has(c))
  if (pads && sized && !has('boxSizing') && !classes.some(c => CLASS_HAS_BOX.has(c))) pairs.push(['boxSizing', 'content-box'])
  for (const [k, v] of Object.entries(a)) {
    const name = ATTR[k] ?? k
    props.push(v === true ? name : name === 'tabIndex' ? `tabIndex={${v}}` : `${name}=${v.includes('"') ? `{${str(v)}}` : `"${v}"`}`)
  }
  // A link set in a line of words, with a look of its own (Tap only pads one that has none): padding above and below makes it a 44px target without moving the line.
  if (tag === 'Tap' && pairs.length && !pairs.some(([k]) => /^(height|minHeight|padding|display|flex)/.test(k)) && !classes.length) pairs.push(['paddingTop', '13px'], ['paddingBottom', '13px'], ['marginTop', '-13px'], ['marginBottom', '-13px'])   // the margins undo the padding where the link is a flex item
  const inline = pairs.map(([k, v]) => `${k}: ${val(k, v)}`).join(', ')
  const spread = classes.map(c => `...S.${c}`).join(', ')
  if (classes.length === 1 && !inline) props.push(`style={S.${classes[0]}}`)
  else if (spread || inline) props.push(`style={{ ${[spread, inline].filter(Boolean).join(', ')} }}`)
  const open = `<${tag}${props.length ? ' ' + props.join(' ') : ''}`
  const kids = node.kids.filter(k => k.text === undefined || k.text.trim() || !/\n/.test(k.text))
  if (!kids.length) return `${pad}${open} />\n`
  if (kids.length === 1 && kids[0].text !== undefined && !/^\s|\s$|[{}<>]/.test(kids[0].text)) return `${pad}${open}>${kids[0].text}</${tag}>\n`
  return `${pad}${open}>\n${kids.map(k => emit(k, acts, depth + 1, links, used, node)).join('')}${pad}</${tag}>\n`
}

const summary = []
// AD8 and AD10 carry hand edits (the BALL_ROLLING_FROM_FILM switch) and AC12 has sheets this script cannot draw, so they are only written when named.
// Programs v2 (24 Nov): these screens are now templates counted from the academy's list (src/screens/academy/academyStore.ts), written by hand
// over the kit in src/screens/academy/kit.tsx, or carry counts from it. Converting a board over them would put typed-in numbers back, so they
// too are only written when named. The team and player boards (ADG, ADF) are never converted: each is one template (TeamPage, PlayerPage).
const COUNTED = /^(AC1|AC2|AC4|AC5|AC6|AC7|AD1|AD2|AD3|AD4|AD5|AD9|AD11|AD13|AD15|AD16|AD17|AD19|AD20|AD21|AD23|AD24)-/
const only = process.argv.slice(4)
for (const file of readdirSync(srcDir).filter(f => /^(A[CD]\d+|DCK1|ADS1)e?-.*\.dc\.html$/.test(f)).filter(f => only.length ? only.includes(f.split('-')[0]) : !/^(AD8|AD10|AC12|DCK1e?)-/.test(f) && !COUNTED.test(f)).sort()) {
  const id = file.replace('.dc.html', ''), name = id.replace('-', '')
  const html = readFileSync(`${srcDir}/${file}`, 'utf8')
  const title = decode(html.match(/<title>([^<]*)<\/title>/)[1])
  const start = html.indexOf('<div style="width:1180px;height:820px'); let end = html.indexOf('<sc-if', start); if (end < 0) end = html.indexOf('</x-dc>', start), end = html.lastIndexOf('</div>', end)
  if (start < 0 || end < 0) throw new Error(id + ': frame not found')
  const frame = parse(html.slice(start, end) + '</div>').kids[0]
  const blocks = frame.kids.filter(k => k.tag)
  // The rebuilt home (v26) has no heading line of its own: the bar, the menu, then the page.
  const bare = blocks.length === 3 && blocks[2].tag === 'main'
  if (!bare && (blocks.length !== 4 || blocks[3].tag !== 'main')) throw new Error(`${id}: expected bar, menu, heading, main; found ${blocks.map(b => b.tag).join(', ')}`)
  const acts = new Map(JSON.parse(html.match(/const ACTS = (\[.*\]);/)?.[1] ?? '[]').map(([n, kind, line]) => { if (kind !== 'toast') throw new Error(id + ': a sheet'); return [n, line] }))
  const links = []
  const used = new Set()
  const body = bare ? emit(blocks[2], acts, 3, links, used) : emit(blocks[2], acts, 3, links, used) + emit(blocks[3], acts, 3, links, used)
  // The club's children checks sit in the director's frame, in another folder; they use the same pieces.
  const club = id.startsWith('DCK'), from = club ? '../academy/' : './'
  const out = `// ${id}: ${title}.\n// Drawn from the board in the academy handover (24 Nov). The menus above it are ${club ? "the director's frame (ClubAdminScreen)" : "the owner app's own (OwnerHeader)"}.\nimport { S } from '${from}adStyles'\nimport Tap from '${from}Tap'\n${used.size ? `import { ${[...used].sort().join(', ')} } from '${from}formKit'\n` : ''}\nexport default function ${name}() {\n  return (\n    <>\n${body}    </>\n  )\n}\n`
  writeFileSync(`${outDir}/${name}.tsx`, out)
  summary.push(`${id} -> ${name}.tsx · ${out.split('\n').length} lines · opens ${[...new Set(links)].join(', ') || 'nothing'}`)
}
console.log(summary.join('\n'))
