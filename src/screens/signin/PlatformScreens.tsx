import { useRef, useState, type CSSProperties, type ReactNode } from 'react'

// Platform moments (handover v12, 24 Nov): six plain tablet pages for moments the platform had no
// screen for. A plan ending, a failed payment, cancelling, signing in after the plan has ended,
// losing access to email or phone, and a family taking back filming consent.
// Every date, name and figure is a placeholder from the boards.

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2', LINE = '#c5c8c4', ROW = '#e9eae8', BG = '#faf5ec'

type Nav = { onNav?: (s: string) => void }
type Say = (line: string) => void

const HELP = 'Help opens here: common questions, and how to reach a person.'

const LINK: CSSProperties = { minHeight: 44, display: 'inline-flex', alignItems: 'center', padding: 0, border: 0, background: 'none', color: G, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }
const BIG: CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 56, padding: '0 22px', borderRadius: 10, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 17, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }
const PRIMARY: CSSProperties = { ...BIG, border: `1px solid ${G}`, background: G, color: '#ffffff' }
const SECOND: CSSProperties = { ...BIG, border: `1px solid ${LINE}`, background: '#ffffff', color: INK }

function useSay(): [string | null, Say] {
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const say: Say = line => { setToast(line); clearTimeout(timer.current); timer.current = setTimeout(() => setToast(null), 3200) }
  return [toast, say]
}

function Page({ width, title, lead, toast, say, children }: { width: number; title: string; lead: ReactNode; toast: string | null; say: Say; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', minHeight: 'var(--frame-h, 100vh)', boxSizing: 'border-box', background: BG, fontFamily: 'var(--font-sans)', color: INK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '20px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: G, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button onClick={() => say(HELP)} style={{ ...LINK, padding: '0 8px' }}>Help</button>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px 40px' }}>
        <section style={{ width, maxWidth: '100%', flex: 'none', background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, boxSizing: 'border-box', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>{title}</h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: '23px', color: MUT }}>{lead}</p>
          {children}
        </section>
      </div>
      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: GD, color: '#ffffff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M5 12l5 5 9-10" /></svg>
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}

function List({ head, items }: { head: string; items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <strong style={{ fontSize: 15 }}>{head}</strong>
      {items.map(t => (
        <span key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: '21px' }}>
          <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: G, marginTop: 8 }} />
          <span>{t}</span>
        </span>
      ))}
    </div>
  )
}

const CLOCK = 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z'
const SHIELD = 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'

function Note({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px', borderRadius: 12, background: PALE, fontSize: 15, lineHeight: '21px' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d={icon} /></svg>
      <span>{children}</span>
    </div>
  )
}

const Actions = ({ children }: { children: ReactNode }) => <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>

/* PLT1: the billing owner, 14 days before the plan ends, and from the bill */
export function PLT1PlanEnding({ onNav }: Nav) {
  const [toast, say] = useSay()
  return (
    <Page width={640} title="Your plan ends on 30 June" lead="Wattle Creek FC · 14 days left. Nothing changes until then." toast={toast} say={say}>
      <List head="What stays" items={['Everything already recorded: film, clips, notes and reports', 'Every coach can still read it for 12 months', 'Families keep every reel they already have']} />
      <List head="What stops on 30 June" items={['New film is not analysed and sessions are not suggested', 'Team, Learn and messages from the coach close in the family app', 'Add-ons such as live game help and vests']} />
      <Actions>
        <button style={PRIMARY} onClick={() => say('The plan carries on. The next payment is 1 July.')}>Keep the plan</button>
        <button style={LINK} onClick={() => onNav?.('PRM6-Usage')}>Is it being used?</button>
        <button style={LINK} onClick={() => onNav?.('PLT3-CancelPlan')}>Let it end</button>
      </Actions>
    </Page>
  )
}

/* PLT2: the billing owner and treasurer, when a monthly payment is declined */
export function PLT2PaymentFailed({ onNav }: Nav) {
  const [toast, say] = useSay()
  return (
    <Page width={640} title="We couldn’t take this month’s payment" lead={<>The card ending <strong style={{ color: INK }}>4410</strong> was declined on 1 June.</>} toast={toast} say={say}>
      <Note icon={CLOCK}>We try again on 4 June and 8 June. Nothing is switched off before <strong>15 June</strong>.</Note>
      <List head="Who knows" items={['You and Dana Fox, the treasurer', 'Coaches and families have not been told, and see no change']} />
      <Actions>
        <button style={PRIMARY} onClick={() => say('Card details open with your payment provider.')}>Update the card</button>
        <button style={LINK} onClick={() => say('We email an invoice to the treasurer. Pay within 14 days.')}>Pay by invoice instead</button>
        <button style={LINK} onClick={() => onNav?.('PRM3-Bill')}>This month’s bill</button>
      </Actions>
    </Page>
  )
}

/* PLT3: the billing owner chooses to end the plan */
export function PLT3CancelPlan({ onNav }: Nav) {
  const [toast, say] = useSay()
  return (
    <Page width={660} title="End the plan?" lead="Wattle Creek FC · paid until 30 June, so it ends then." toast={toast} say={say}>
      <List head="For coaches" items={['They can read everything for 12 months, and download their season', 'Nothing new is filmed, analysed or suggested']} />
      <List head="For families" items={['Team, Learn and coach messages close. They are told on 30 June', 'Their own reels and credits are not affected']} />
      <List head="For the club’s data" items={['Kept for 12 months, then deleted. You can export it or delete it sooner', 'Come back within 12 months and everything is as you left it']} />
      <Actions>
        <button style={PRIMARY} onClick={() => onNav?.('PRM1-FeaturesByTeam')}>Keep the plan</button>
        <button style={SECOND} onClick={() => say('The plan ends on 30 June. You can change your mind before then.')}>End on 30 June</button>
      </Actions>
    </Page>
  )
}

/* PLT4: any coach, signing in after the plan has ended */
export function PLT4PlanEnded({ onNav }: Nav) {
  const [toast, say] = useSay()
  return (
    <Page width={600} title="Wattle Creek FC’s plan has ended" lead={<>You can still read everything until <strong style={{ color: INK }}>30 June 2027</strong>. New film isn’t analysed and sessions aren’t suggested.</>} toast={toast} say={say}>
      <Note icon={SHIELD}>Your players’ data is safe and has not been shared or sold. The club can delete it sooner.</Note>
      <Actions>
        <button style={PRIMARY} onClick={() => onNav?.('T1-TabletTraining')}>Open in read-only</button>
        <button style={LINK} onClick={() => say('A file with your sessions, notes and reports is on its way to your email.')}>Download my season</button>
        <button style={LINK} onClick={() => say('Sent to Rosa Marin, the billing owner.')}>Ask the club to restart</button>
      </Actions>
    </Page>
  )
}

const ROUTES: [string, string, string][] = [
  ['I have a new mobile number', 'We send the code to your email, then you change the number', 'Code sent to your email. After it, you set the new number.'],
  ['I have a new email', 'We text the code, then you change the email', 'Code texted. After it, you set the new email.'],
  ['I’ve lost both', 'Your club’s admin confirms it’s you. For Wattle Creek FC that is Rosa Marin', 'Rosa Marin has been asked to confirm you. You get a link once she does.'],
  ['I am the club’s admin', 'We call the club’s registered number. One to two working days', 'We will call the club’s registered number within two working days.'],
]

/* PLT5: club staff who cannot get the sign-in code. From "Can't get the code?" and "I've changed my number" */
export function PLT5LostAccess({ onNav }: Nav) {
  const [toast, say] = useSay()
  return (
    <Page width={600} title="Can’t get the code?" lead="Pick what has changed." toast={toast} say={say}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {ROUTES.map(([head, sub, line]) => (
          <button key={head} onClick={() => say(line)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, padding: 0, border: 0, borderTop: `1px solid ${ROW}`, background: 'none', color: INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
            <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 16 }}>{head}</strong>
              <span style={{ fontSize: 14, color: MUT }}>{sub}</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M9 6l6 6-6 6" /></svg>
          </button>
        ))}
      </div>
      <Actions>
        <button style={LINK} onClick={() => onNav?.('SI1-SignIn')}>Back to sign in</button>
      </Actions>
    </Page>
  )
}

/* PLT6: the child's coaches and the director, when a family takes back filming consent */
export function PLT6ConsentChanged({ onNav }: Nav) {
  const [toast, say] = useSay()
  return (
    <Page width={660} title="A family has taken back filming consent" lead="Ari K · U11 Luke · from today, Tuesday 16 June" toast={toast} say={say}>
      <List head="Done for you" items={['Ari is blurred in all film from today, at training and in games', '4 clips of Ari shared with the team come down within 7 days', 'Ari’s numbers from club film are deleted. Your written notes stay']} />
      <List head="For you to do" items={['2 of your playlists include Ari. Swap those clips', 'Nothing else changes: Ari trains and plays as normal']} />
      <Note icon={SHIELD}>Please don’t ask the family why. They can give consent again at any time, and you’ll be told if they do.</Note>
      <Actions>
        <button style={PRIMARY} onClick={() => onNav?.('CL1-Playlists')}>Fix the 2 playlists</button>
        <button style={LINK} onClick={() => onNav?.('T1-TabletTraining')}>Done</button>
        <button style={LINK} onClick={() => onNav?.('P1-Consent')}>Consent for the whole team</button>
      </Actions>
    </Page>
  )
}
