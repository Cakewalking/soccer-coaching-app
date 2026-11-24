# Turns a board's static source (.dc.html) into a React screen, so the screen has the board's exact words,
# sizes and colours. Reads the pack as text only. Usage: adc-convert.py <source dir> <out dir> <id> [<id> ...]
import sys, re, os, json, html
from html.parser import HTMLParser

VOID = {'input', 'path', 'br', 'img'}
ATTR = {'class': None, 'tabindex': 'tabIndex', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin',
        'viewbox': 'viewBox', 'aria-hidden': 'aria-hidden', 'rows': 'rows', 'for': 'htmlFor', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule'}

class Node:
    def __init__(s, tag, attrs): s.tag, s.attrs, s.kids = tag, attrs, []

class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True); s.root = Node('root', {}); s.stack = [s.root]
    def handle_starttag(s, tag, attrs):
        d = {}
        for k, v in attrs:
            if k not in d: d[k] = v if v is not None else ''
        n = Node(tag, d); s.stack[-1].kids.append(n)
        if tag not in VOID: s.stack.append(n)
    def handle_startendtag(s, tag, attrs):
        d = {}
        for k, v in attrs:
            if k not in d: d[k] = v if v is not None else ''
        s.stack[-1].kids.append(Node(tag, d))
    def handle_endtag(s, tag):
        if tag in VOID: return
        for i in range(len(s.stack) - 1, 0, -1):
            if s.stack[i].tag == tag: del s.stack[i:]; return
    def handle_data(s, data): s.stack[-1].kids.append(data)

def camel(k):
    k = k.strip()
    if k.startswith('-webkit-'): return 'Webkit' + ''.join(p.capitalize() for p in k[8:].split('-'))
    p = k.split('-'); return p[0] + ''.join(x.capitalize() for x in p[1:])

def style_obj(css):
    out = {}
    for decl in re.split(r';(?![^(]*\))', css):
        if ':' not in decl: continue
        k, v = decl.split(':', 1); k = camel(k); v = v.strip()
        if k in out: del out[k]
        out[k] = v
    return out

def js(v): return json.dumps(v, ensure_ascii=False)
def obj(d): return '{ ' + ', '.join(f'{k}: {js(v)}' for k, v in d.items()) + ' }'

def convert(src_dir, out_dir, bid):
    s = open(f'{src_dir}/{bid}.dc.html', encoding='utf-8').read()
    css = re.search(r'<style>(.*?)</style>', s, re.S).group(1)
    classes, tagbase = {}, {}
    for sel, body in re.findall(r'([^{}]+)\{([^}]*)\}', css):
        sel = sel.strip()
        if re.fullmatch(r'\.[a-z0-9]+', sel): classes[sel[1:]] = style_obj(body)
        elif sel in ('a', 'button'): tagbase[sel] = style_obj(body)
        elif sel != 'body': print('  css not handled:', sel)
    acts = {int(i): (k, p) for i, k, p in re.findall(r'\[(\d+), "(\w+)", ("(?:[^"\\]|\\.)*")\]', s[s.index('const ACTS'):s.index('const DONE')])} if 'const ACTS' in s else {}
    acts = {i: (k, json.loads(p)) for i, (k, p) in acts.items()}
    m = re.search(r'const DONE = (\{.*?\});', s)
    done = json.loads(m.group(1)) if m else {}
    body = s[s.index('<x-dc>') + 6:s.index('</x-dc>')]
    body = re.sub(r'<helmet>.*?</helmet>', '', body, flags=re.S)
    p = P(); p.feed(body)
    root = [k for k in p.root.kids if isinstance(k, Node)][0]
    rs = style_obj(root.attrs.get('style', ''))
    tablet = rs.get('width') == '1180px'
    used_classes, uses = set(), {'sheet': False, 'say': False, 'go': False}
    NEW_INPUTS = bid.split('-')[0] in ('ADC10', 'ADC11', 'ADC12', 'ADC13', 'ADC14', 'ADC15', 'ADC17', 'ADK3', 'ADK4')
    groups, counters = [], []   # taps that stay tapped; counts that go up and down
    def walk(n):
        if not isinstance(n, Node): return
        if n.attrs.get('role') == 'radiogroup':
            rs = []
            def find(m):
                for k in m.kids:
                    if isinstance(k, Node):
                        if k.attrs.get('role') == 'radio': rs.append(k)
                        else: find(k)
            find(n)
            on = [r for r in rs if r.attrs.get('aria-checked') == 'true']
            plain = all(all(isinstance(k, str) for k in r.kids) for r in rs)
            if len(on) == 1 and plain and len(rs) > 1:
                ons = on[0].attrs.get('style', '')
                offs = [r.attrs.get('style', '') for r in rs if r.attrs.get('style', '') != ons]
                if offs and len(set(offs)) == 1:
                    g = len(groups)
                    groups.append({'on': style_obj(ons), 'off': style_obj(offs[0]), 'scale': sum(1 for r in rs if r.attrs.get('style', '') == ons) > 1, 'init': rs.index(on[0])})
                    for i, r in enumerate(rs): r.radio = (g, i)
        kids = [k for k in n.kids if isinstance(k, Node)]
        txt = lambda m: ''.join(k for k in m.kids if isinstance(k, str)).strip() if all(isinstance(k, str) for k in m.kids) else None
        minus = [k for k in kids if txt(k) == '−' and 'onclick' in k.attrs]; plus = [k for k in kids if txt(k) == '+' and 'onclick' in k.attrs]
        if NEW_INPUTS and len(minus) == 1 and len(plus) == 1:
            between = kids[kids.index(minus[0]) + 1:kids.index(plus[0])]
            if len(between) == 1 and txt(between[0]) is not None:
                c = len(counters); v = txt(between[0]); counters.append(int(v) if v.isdigit() else None)
                minus[0].counter = (c, -1); plus[0].counter = (c, 1); between[0].countval = c
        for k in n.kids: walk(k)
    walk(root)
    CAP = {'ADC13-CheckEntry': 6}.get(bid, 99)
    A_RESET = {'border': '0', 'padding': '0', 'margin': '0', 'background': 'transparent', 'font': 'inherit', 'textAlign': 'inherit', 'textDecoration': 'underline', 'cursor': 'pointer', **tagbase.get('a', {})}
    B_BASE = tagbase.get('button', {})

    def text(t, lone):
        if not t.strip(): return '' if ('\n' in t or lone) else "{' '}"
        t = re.sub(r'\s+', ' ', t)
        t = t.replace('Five skills', 'Four core skills').replace('five skills', 'four core skills')   # the handover's rule; these two boards still say five
        if lone: t = t.strip()
        if re.search(r'[{}<>]', t) or t != t.strip() or '"' in t and False: return '{' + js(t) + '}'
        return t

    def disp(n):
        d = None
        for c in (n.attrs.get('class', '') or '').split(): d = classes.get(c, {}).get('display', d)
        return style_obj(n.attrs.get('style', '')).get('display', d)

    def emit(n, ind, pdisp='flex'):
        pad = '  ' * ind
        if n.tag == 'sc-if':
            v = n.attrs.get('value', '')
            mm = re.match(r'\{\{\s*sh_(\w+)\s*\}\}', v)
            if not mm: return ''   # the board's own toast: the app's toast says the line instead
            uses['sheet'] = True
            inner = ''.join(emit(k, ind + 2, 'block') for k in n.kids if isinstance(k, Node))
            return f"{pad}{{sheet === {js(mm.group(1))} && (\n{pad}  <>\n{inner}{pad}  </>\n{pad})}}\n"
        tag, a = n.tag, dict(n.attrs)
        ownst = n.attrs.get('style', '')
        if NEW_INPUTS and tag in ('span', 'div') and all(isinstance(k, str) for k in n.kids) and re.search(r'min-height:(4[4-9]|[5-9]\d)px', ownst) and re.search(r'border:1px solid #(c5c8c4|8d9794)', ownst) and 'background:#ffffff' in ownst:
            fs = style_obj(ownst); val = re.sub(r'\s+', ' ', ''.join(n.kids)).strip()
            one = fs.get('padding', '').startswith('0 ')
            for k in ('display', 'alignItems'): fs.pop(k, None)
            if one: fs['height'] = fs.pop('minHeight')
            fs.update({'fontFamily': 'inherit', 'color': 'inherit', 'width': '100%', 'display': 'block'})
            if not one: fs['resize'] = 'none'
            sty = 'style={{ ' + ', '.join(f'{k}: {js(v)}' for k, v in fs.items()) + ' }}'
            if one: return f'{pad}<input defaultValue={js(val)} {sty} />\n'
            return f'{pad}<textarea defaultValue={js(val)} rows={{{3 if "72px" in ownst else 1}}} {sty} />\n'
        if hasattr(n, 'countval'):
            sty = 'style={{ ' + ', '.join(f'{k}: {js(v)}' for k, v in style_obj(ownst).items()) + ' }}'
            cl = ''.join(f'...C.{c}, ' for c in (n.attrs.get('class', '') or '').split() if c in classes)
            for c in (n.attrs.get('class', '') or '').split():
                if c in classes: used_classes.add(c)
            return f"{pad}<{tag} style={{{{ {cl}{sty[8:-3]} }}}}>{{count[{n.countval}] ?? '–'}}</{tag}>\n"
        st, spreads, props = {}, [], []
        for c in (a.pop('class', '') or '').split():
            if c in classes: spreads.append(f'C.{c}'); used_classes.add(c)
        own = style_obj(a.pop('style', ''))
        radio = getattr(n, 'radio', None)
        if radio:
            g, i = radio; G_ = groups[g]
            own = {k: v for k, v in own.items() if G_['on'].get(k) == v and G_['off'].get(k) == v}   # what does not change with the tap
        click = None
        oc = a.pop('onclick', None)
        if oc:
            mm = re.match(r'\{\{\s*(\w+)\s*\}\}', oc); name = mm.group(1)
            if name == 'shClose': click = 'setSheet(null)'; uses['sheet'] = True
            elif name.startswith('shDone_'): click = f"{{ setSheet(null); demoToast({js(done[name[7:]])}) }}"; uses['sheet'] = uses['say'] = True
            elif name.startswith('a_'):
                kind, payload = acts[int(name[2:])]
                if kind == 'toast': click = f'demoToast({js(payload)})'; uses['say'] = True
                else: click = f'setSheet({js(payload)})'; uses['sheet'] = True
                if hasattr(n, 'radio'):
                    g, i = n.radio; click = f'{{ setPick(p => p.map((v, k) => k === {g} ? {i} : v)); {click} }}'
                if hasattr(n, 'counter'):
                    c, d = n.counter
                    how = f'(v ?? 0) >= {CAP} ? v : (v ?? 0) + 1' if d > 0 else 'v === null || v <= 0 ? v : v - 1'
                    click = f'{{ setCount(c => c.map((v, k) => k === {c} ? ({how}) : v)); {click} }}'
        href = a.pop('href', None)
        if href:
            if href.startswith('toast:'): click = f'demoToast({js(re.sub(chr(92) + ".dc" + chr(92) + ".html$", "", html.unescape(href[6:])))})'; uses['say'] = True
            else:
                target = re.sub(r'\.dc\.html$', '', href); click = f'go({js(target)})'; uses['go'] = True
        base = {}
        if tag == 'a':
            if click: tag = 'button'; base = dict(A_RESET); a.pop('tabindex', None)
            else: tag = 'span'
            if a.get('role') == 'button': a.pop('role')
        elif tag == 'button': base = dict(B_BASE); base.setdefault('fontFamily', 'inherit')
        if tag == 'button' and 'textDecoration' in base and any('textDecoration' in classes.get(c, {}) for c in (n.attrs.get('class', '') or '').split()): base.pop('textDecoration')
        # an anchor drawn as a block fills its line; a button does not unless told to
        if n.tag == 'a' and tag == 'button' and pdisp not in ('flex', 'grid', 'inline-flex') and disp(n) in ('flex', 'grid', 'block') and 'width' not in own: base['width'] = '100%'; base['boxSizing'] = 'border-box'
        # a link in a line of writing is drawn at the height of the words: give it a 44px target without moving the line
        if n.tag == 'a' and tag == 'button' and not any(k in own for k in ('height', 'minHeight', 'display', 'padding', 'width', 'flex')) and not spreads: base.update({'display': 'inline-flex', 'alignItems': 'center', 'minHeight': '44px', 'margin': '-12px 0'})
        over = set(own)
        if radio: over |= set(groups[radio[0]]['on']) | set(groups[radio[0]]['off'])
        for sp in spreads: over |= set(classes[sp[2:]])
        st = {k: v for k, v in base.items() if k not in over}
        # order: tag base, then classes, then the element's own style
        parts = []
        if st: parts.append(', '.join(f'{k}: {js(v)}' for k, v in st.items()))
        parts += [f'...{sp}' for sp in spreads]
        if own: parts.append(', '.join(f'{k}: {js(v)}' for k, v in own.items()))
        if radio:
            g, i = radio
            parts.append(f"...({f'{i} <= pick[{g}]' if groups[g]['scale'] else f'pick[{g}] === {i}'} ? R[{g}].on : R[{g}].off)")
        for k, v in a.items():
            if k == 'value' and tag == 'input': props.append(f'defaultValue={js(v)}'); continue
            if k == 'aria-checked' and radio: props.append(f'aria-checked={{pick[{radio[0]}] === {radio[1]}}}'); continue
            if k in ('aria-checked', 'aria-current') : props.append(f'{k}={js(v)}'); continue
            if k == 'rows': props.append(f'rows={{{int(v)}}}'); continue
            kk = ATTR.get(k, k)
            if kk is None: continue
            props.append(f'{kk}={js(v)}')
        if click: props.append(f'onClick={{() => {click}}}')
        # a round control drawn smaller than 44px (a player's dot): the button is a clear 44px-tall target and the dot sits inside it, so the row does not move
        px = lambda v: int(v[:-2]) if re.fullmatch(r'\d+px', v or '') else None
        if n.tag == 'a' and tag == 'button' and px(own.get('height')) and px(own.get('height')) < 44 and own.get('width') == own.get('height') and all(isinstance(k, str) for k in n.kids):
            h = px(own['height']); look = {k: v for k, v in own.items() if k not in ('flex', 'textDecoration')}
            hit = {'border': '0', 'padding': '0', 'margin': f'-{(44 - h) // 2}px 0', 'background': 'transparent', 'font': 'inherit', 'cursor': 'pointer', 'flex': 'none', 'width': own['width'], 'height': '44px', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}
            return f"{pad}<button {' '.join(props)} style={{{{ {', '.join(f'{k}: {js(v)}' for k, v in hit.items())} }}}}><span style={{{{ {', '.join(f'{k}: {js(v)}' for k, v in look.items())} }}}}>{text(''.join(n.kids), True)}</span></button>\n"
        if parts: props.append('style={{ ' + ', '.join(parts) + ' }}')
        open_ = f'<{tag}' + (' ' + ' '.join(props) if props else '')
        if tag == 'textarea':
            t = ''.join(k for k in n.kids if isinstance(k, str)).strip()
            return f'{pad}{open_}{" defaultValue=" + js(t) if t else ""} />\n'
        kids = n.kids
        if n.tag in VOID or not kids: return f'{pad}{open_} />\n'
        if all(isinstance(k, str) for k in kids):
            t = text(''.join(kids), True)
            return f'{pad}{open_}>{t}</{tag}>\n' if t else f'{pad}{open_} />\n'
        out = f'{pad}{open_}>\n'
        for i, k in enumerate(kids):
            if isinstance(k, str):
                t = text(k, False)
                if t == "{' '}" and (i == 0 or i == len(kids) - 1): t = ''
                if t: out += f'{pad}  {t}\n'
            else: out += emit(k, ind + 1, disp(n) or ('block' if n.tag in ('div', 'section', 'main', 'aside', 'nav') else 'inline'))
        return out + f'{pad}</{tag}>\n'

    name = bid.replace('-', '')
    kids = [k for k in root.kids if isinstance(k, Node)]
    nav = ''
    hasnav = tablet and 'aria-label="Main"' in body
    if hasnav:
        top, sub, rest = kids[0], kids[1], kids[2:]
        flat = lambda n: ''.join(flat(k) if isinstance(k, Node) else k for k in n.kids)
        def current(n, acc):
            if isinstance(n, Node):
                if n.attrs.get('aria-current') == 'page': acc.append(re.sub(r'\s+', ' ', flat(n)).strip())
                for k in n.kids: current(k, acc)
            return acc
        main, subl = current(top, []), current(sub, [])
        MAIN = {'Today': 'today', 'Players': 'players', 'Training': 'training', 'Game day': 'gameday', 'Record': 'record', 'Learn': 'learn'}
        nav = f"      {{!inApp && <CoachNav active=\"{MAIN[main[0]]}\"" + (f' sub={js(subl[0])}' if subl else '') + ' go={go} />}\n'
        uses['go'] = True
    else: rest = kids
    inner = ''.join(emit(k, 3, 'flex') for k in rest)
    for k in ('width', 'height', 'overflow'): rs.pop(k, None)
    rs['fontFamily'] = "var(--font-sans, 'DM Sans', system-ui, sans-serif)"
    L = [f"// {bid}, as the academy pack draws it (handover v24): the board's own words, sizes and colours.",
         f"// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.", '']
    if uses['sheet'] or groups or counters: L.append("import { useState } from 'react'")
    if tablet: L.append("import { useContext } from 'react'")
    if uses['say']: L.append("import { demoToast } from '../../demoToast'")
    if hasnav: L += ["import CoachNav from '../CoachNav'", "import { InCoachApp, coachGo } from '../menu'"]
    elif tablet: L.append("import { InCoachApp, coachGo } from '../menu'")
    elif uses['go']: L.append("import { coachGo } from '../menu'")
    L.append('')
    if used_classes:
        L.append('const C = {')
        for c in sorted(used_classes): L.append(f'  {c}: {obj(classes[c])},')
        L.append('} as const'); L.append('')
    if groups:
        L.append('// A tapped choice and an untapped one, for each group of choices.')
        L.append('const R = [')
        for g in groups:
            diff = lambda a_, b_: {k: v for k, v in a_.items() if b_.get(k) != v}
            on, off = diff(g['on'], g['off']), diff(g['off'], g['on'])
            for k in set(on) - set(off): off[k] = 'none' if k == 'border' else 'initial'
            for k in set(off) - set(on): on[k] = '0' if k == 'border' else 'initial'
            L.append(f'  {{ on: {obj(on)}, off: {obj(off)} }},')
        L.append('] as const'); L.append('')
    L.append(f'export default function {name}({{ onNav }}: {{ onNav?: (id: string) => void }}) {{')
    if uses['go']: L.append('  const go = coachGo(onNav)')
    else: L.append('  void onNav')
    if uses['sheet']: L.append('  const [sheet, setSheet] = useState<string | null>(null)')
    if groups: L.append('  const [pick, setPick] = useState<number[]>([' + ', '.join(str(g['init']) for g in groups) + '])   // which choice is tapped in each group')
    if counters: L.append('  const [count, setCount] = useState<(number | null)[]>([' + ', '.join('null' if c is None else str(c) for c in counters) + '])   // null: not had a turn')
    if tablet:
        L.append('  const inApp = useContext(InCoachApp)')
        L.append('  return (')
        L.append("    <div data-board=" + js(bid) + " style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), " + ', '.join(f'{k}: {js(v)}' for k, v in rs.items()) + ' }}>')
    else:
        L.append('  return (')
        L.append("    <div data-board=" + js(bid) + " style={{ width: 390, height: 844, overflow: 'hidden', " + ', '.join(f'{k}: {js(v)}' for k, v in rs.items()) + ' }}>')
    src = '\n'.join(L) + '\n' + nav + inner + '    </div>\n  )\n}\n'
    if tablet: src = src.replace("import { useState } from 'react'\nimport { useContext } from 'react'", "import { useContext, useState } from 'react'")
    for old, new in POST.get(bid, []):
        if src.count(old) != 1: print('  POST PATCH DID NOT APPLY', bid, old[:60], src.count(old))
        src = src.replace(old, new)
    os.makedirs(out_dir, exist_ok=True)
    open(f'{out_dir}/{name}.tsx', 'w', encoding='utf-8').write(src)
    print(bid, '->', name, 'tablet' if tablet else 'phone', len(src))

POST = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'adc-convert-post.json'), encoding='utf-8')) if os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'adc-convert-post.json')) else {}
for b in sys.argv[3:]: convert(sys.argv[1], sys.argv[2], b)
