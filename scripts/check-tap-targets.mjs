#!/usr/bin/env node
// Fail if any <button> in a .tsx file has an explicit inline height < 44.
// Catches the pattern:  <button ... style={{ ... height: 32 ... }}>
// Skips height values that are clearly non-button dimensions (width-square icons
// where width === height, e.g. width: 32, height: 32 on an avatar div).
// Run: node scripts/check-tap-targets.mjs

import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

const SRC = new URL('../src', import.meta.url).pathname

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) files.push(full)
  }
  return files
}

// Find <button ... style={{ height: N ... }}> where N < 44, on a single line.
// Excludes width: N, height: N pairs (square icon containers).
const BUTTON_HEIGHT = /<button\b[^>]*style=\{[^}]*\bheight:\s*(\d+)[^}]*\}/g

let failures = 0
for (const file of walk(SRC)) {
  const src = readFileSync(file, 'utf8')
  const lines = src.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Only look at lines that contain a <button with style and height
    if (!line.includes('<button') || !line.includes('height:')) continue
    for (const m of line.matchAll(BUTTON_HEIGHT)) {
      const h = parseInt(m[1], 10)
      if (h < 44) {
        // Suppress squares (icon-only buttons where width matches height)
        const widthMatch = m[0].match(/\bwidth:\s*(\d+)/)
        if (widthMatch && widthMatch[1] === m[1]) continue
        const rel = file.replace(SRC + '/', '')
        console.error(`FAIL  ${rel}:${i + 1}  height: ${h}  (must be ≥ 44)`)
        console.error(`      ${line.trim().slice(0, 100)}`)
        failures++
      }
    }
  }
}

if (failures === 0) {
  console.log('OK  All buttons have height ≥ 44 px.')
  process.exit(0)
} else {
  console.error(`\n${failures} button(s) with height < 44 px found.`)
  process.exit(1)
}
