import YT1YourTake from './YT1YourTake'

// The Your-take board before anything is added. What "Add a note" on Home
// opens the first time.
export default function YT1eYourTakeEmpty({ onNav }: { onNav?: (s: string) => void }) {
  return <YT1YourTake onNav={onNav} startEmpty />
}
