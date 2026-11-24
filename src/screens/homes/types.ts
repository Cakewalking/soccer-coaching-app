// The four-part home (Homes v1, 24 Nov): Now, Progress, Development, Oversight.
// One layout (HomeFour.tsx) draws every tablet home from one of these.

/** What a control does: opens a screen, or says one line. */
export type Act = { to: string } | { say: string }

export type IconKey = 'home' | 'people' | 'calendar' | 'ball' | 'play' | 'record' | 'cap' | 'shield' | 'doc'
export type NavItem = { label: string; to: string; on?: boolean; icon?: IconKey }

export type Frame = {
  nav: NavItem[]
  sub: NavItem[]
  team: string
  avatar: string
  /** who the account page is for, when the avatar is pressed */
  who?: string
  role: string
}

/** A then-and-now figure in the dark band. */
export type Fig =
  /** a head count: a bar, with a white line for "then" */
  | { kind: 'bar'; label: string; now: number; then: number; of: number }
  /** a measure with a unit: the number, with "then" in small type under it, and no bar */
  | { kind: 'num'; label: string; value: string; unit?: string; then: string }

export type DotState = 'up' | 'same' | 'none'
export type Tone = 'green' | 'mauve' | 'rose'
export type Row = { badge: string; tone: Tone; title: string; sub: string; action: string; primary?: boolean; act: Act }
export type Meter = { label: string; n: number; of: number; note: string; to: string }
export type Link = { label: string; act: Act }

export type Block =
  /** one squad: every player as a dot, in squad order, then up to three rows */
  | { kind: 'dots'; title: string; link: Link; dots: [string, DotState][]; dotTo: string; dotOpens: string; says: Record<DotState, string>; legend: [DotState, string][]; rows: Row[]; foot: string }
  /** rows alone, each ending in one action */
  | { kind: 'rows'; name: string; title: string; link: Link; rows: Row[]; foot?: string; tight?: boolean }
  /** many squads: four number tiles. The first is the good news, the last needs a person */
  | { kind: 'tiles'; tiles: { n: string; label: string; note: string; act: Act }[] }
  /** the level below, team by team */
  | { kind: 'table'; title: string; link: Link; cols: string[]; grid: string; rows: { team: string; note: string; cells: ([number, number] | string)[]; to: string }[]; foot?: string }
  /** meters, each "N of M". Mauve below two-thirds */
  | { kind: 'meters'; name: string; title: string; mark?: 'strong' | 'tapped'; sub?: string; meters: Meter[]; foot?: string; grow?: boolean }
  /** the one "needs you" row */
  | { kind: 'needs'; count: string; title: string; sub: string; to: string }
  /** the director's list of what needs them */
  | { kind: 'needsList'; title: string; count: string; items: { label: string; to: string }[]; foot: string }
  /** the assistant's jobs: ticks, not meters */
  | { kind: 'jobs'; title: string; sub: string; jobs: { done: boolean; title: string; note: string; to: string }[]; foot: string }

export type Home = {
  id: string
  frame: Frame
  now: { day: string; chips: { title: string; sub: string; to: string }[]; other: Link; main: Link }
  progress: {
    label: string
    headline: string
    sub: string
    /** the one amber button: plays the film behind the claim. Left out where there is no film */
    film?: { label: string; say: string }
    btns: Link[]
    figs: Fig[]
  }
  left: Block[]
  right: Block[]
}
