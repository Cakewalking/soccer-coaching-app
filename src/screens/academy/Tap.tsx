// A control on an academy owner board. `to` opens a screen by its id; `say` does the action and shows its line.
import { useContext, type CSSProperties, type ReactNode } from 'react'
import { demoToast } from '../demoToast'
import { OwnerGo } from './ownerMenu'

type Props = { to?: string; say?: string; style?: CSSProperties; children?: ReactNode; 'aria-label'?: string }

// A link set in a line of words is as tall as the words. Padding above and below makes it a 44px target without moving the line.
const IN_LINE: CSSProperties = { paddingTop: 13, paddingBottom: 13 }

export default function Tap({ to, say, style, children, ...rest }: Props) {
  const go = useContext(OwnerGo)
  const look: CSSProperties = { color: '#2f6252', cursor: 'pointer', ...(style ? null : IN_LINE), ...style }
  if (to) return (
    <a href={`/__screen/${to}`} onClick={e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); go(to) }} style={look} {...rest}>{children}</a>
  )
  const act = () => demoToast(say ?? '')
  return (
    <a role="button" tabIndex={0} onClick={act} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act() } }} style={look} {...rest}>{children}</a>
  )
}
