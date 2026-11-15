import EDU1Learn from './EDU1Learn'

// New board: EDU1-Learn with the Skill filter list open.
export default function EDU1fLearnFilter({ onNav }: { onNav?: (s: string) => void }) {
  return <EDU1Learn onNav={onNav} skillOpen />
}
