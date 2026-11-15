import { Component, type ReactNode } from 'react'
import { ER1SomethingWrong, ERp1SomethingWrong } from './signin/ErrorScreens'

type Props = { children: ReactNode; phone?: boolean }
type State = { hasError: boolean }

// Keeps one crashing screen from taking down the whole app (FIX-LIST item 1).
// Shows ER1-SomethingWrong (ERp1 on phone) inside the frame instead of a white page.
export default class ScreenErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Surface in dev; swallowed in prod so the frame survives.
    if (typeof console !== 'undefined') console.error('Screen crashed:', error)
  }

  // Reset when the children change (e.g. navigating to another screen).
  componentDidUpdate(prev: Props) {
    if (prev.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.phone
        ? <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ERp1SomethingWrong /></div>
        : <ER1SomethingWrong />
    }
    return this.props.children
  }
}
