// Small things a person saved on this device (a draft, a "sent" mark, a skipped game).
// Read once when a screen opens; written when they press the button.
export function kept<T>(key: string, fallback: T): T { try { const v = localStorage.getItem(key); return v ? { ...fallback, ...JSON.parse(v) } as T : fallback } catch { return fallback } }
export function keep(key: string, value: unknown) { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* private window: kept for this visit only */ } }
