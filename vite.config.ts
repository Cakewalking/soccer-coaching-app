import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// On Vercel, api/ask.ts runs as a server function. This serves the same function at /api/ask from `vite` and
// `vite preview`, so Ask Clean Sheet can be tried on this machine (with ANTHROPIC_API_KEY set, or ASK_FAKE=1).
function askApi(): Plugin {
  type Use = (fn: (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, next: () => void) => void) => void
  const mount = (add: Use, load: () => Promise<{ POST: (r: Request) => Promise<Response> }>) => add(async (req, res, next) => {
    if (!req.url?.startsWith('/api/ask')) return next()
    if (req.method !== 'POST') { res.statusCode = 405; return res.end() }
    try {
      const chunks: Buffer[] = []
      for await (const c of req) chunks.push(c as Buffer)
      const headers = new Headers()
      for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v)
      const gone = new AbortController()
      res.on('close', () => { if (!res.writableEnded) gone.abort() })
      const out = await (await load()).POST(new Request(`http://${req.headers.host}${req.url}`, { method: 'POST', headers, body: Buffer.concat(chunks), signal: gone.signal }))
      res.statusCode = out.status
      out.headers.forEach((v, k) => res.setHeader(k, v))
      if (out.body) for await (const part of out.body) res.write(part)
      res.end()
    } catch (e) { console.error('ask', e); if (!res.headersSent) res.statusCode = 500; res.end() }
  })
  return {
    name: 'ask-api',
    configureServer(server) { mount(server.middlewares.use.bind(server.middlewares) as Use, () => server.ssrLoadModule('/api/ask.ts') as Promise<{ POST: (r: Request) => Promise<Response> }>) },
    configurePreviewServer(server) { mount(server.middlewares.use.bind(server.middlewares) as Use, async () => { const { createServer } = await import('vite'); const dev = await createServer({ server: { middlewareMode: true }, appType: 'custom', plugins: [] }); return dev.ssrLoadModule('/api/ask.ts') as Promise<{ POST: (r: Request) => Promise<Response> }> }) },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), askApi()],
})
