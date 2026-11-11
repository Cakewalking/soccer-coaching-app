import { createContext, useContext } from 'react'
import type { SandboxStore } from './sandboxStore'

interface SandboxCtx {
  store: SandboxStore
  update: (s: SandboxStore) => void
  active: boolean  // true when this component tree is inside the sandbox
}

const DEFAULT_STORE: SandboxStore = {
  teams: [], players: [], fixtures: [], sessions: [], messages: [],
}

export const SandboxContext = createContext<SandboxCtx>({
  store: DEFAULT_STORE,
  update: () => {},
  active: false,
})

export function useSandbox() {
  return useContext(SandboxContext)
}
