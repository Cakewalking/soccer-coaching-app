import React from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

function DirShell({ navActive = 'Teams', sideItems, sideActive, title, sub, ctaLabel }: {
  navActive?: string; sideItems?: string[]; sideActive?: string; title: string; sub: string; ctaLabel?: string
}) {
  const tabs = ['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports']
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {tabs.map(t => <div key={t} style={{ fontSize: 13, fontWeight: t === navActive ? 700 : 500, color: t === navActive ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {sideItems && (
          <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
            {sideItems.map(item => (
              <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: item === sideActive ? 700 : 500, color: item === sideActive ? G : MUT, background: item === sideActive ? PALE : 'transparent', borderLeft: item === sideActive ? `3px solid ${G}` : '3px solid transparent', cursor: 'pointer' }}>{item}</div>
            ))}
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ textAlign: 'center' as const, maxWidth: 440 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 14, color: MUT, marginBottom: ctaLabel ? 20 : 0 }}>{sub}</div>
            {ctaLabel && <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>{ctaLabel}</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

function HMShell({ navActive = 'Today', title, sub, ctaLabel }: { navActive?: string; title: string; sub: string; ctaLabel?: string }) {
  const tabs = ['Today', 'Squad', 'Training', 'Game day', 'Messages', 'Calendar']
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {tabs.map(t => <div key={t} style={{ fontSize: 13, fontWeight: t === navActive ? 700 : 500, color: t === navActive ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>)}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Kangaroos · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>ME</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' as const, maxWidth: 440 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: ctaLabel ? 20 : 0 }}>{sub}</div>
          {ctaLabel && <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>{ctaLabel}</button>}
        </div>
      </div>
    </div>
  )
}

function AcOwnerShell({ navActive = 'Home', title, sub, ctaLabel }: { navActive?: string; title: string; sub: string; ctaLabel?: string }) {
  const tabs = ['Home', 'Players', 'Trials', 'Coaches', 'Reports', 'Settings']
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 28, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {tabs.map(t => <div key={t} style={{ fontSize: 13, fontWeight: t === navActive ? 700 : 500, color: t === navActive ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>)}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Tall Timber Academy</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>TT</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' as const, maxWidth: 440 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: ctaLabel ? 20 : 0 }}>{sub}</div>
          {ctaLabel && <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>{ctaLabel}</button>}
        </div>
      </div>
    </div>
  )
}

function AcCoachShell({ title, sub, ctaLabel }: { title: string; sub: string; ctaLabel?: string }) {
  const sideItems = ['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested']
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 28, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Today', 'Players', 'Game day', 'Library'].map(t => <div key={t} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>)}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Tall Timber Academy</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>RW</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', flex: 1 }}>
        <div style={{ background: '#fff', borderRight: `1px solid ${LN}`, padding: '12px 0' }}>
          {sideItems.map(item => <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, color: MUT, cursor: 'pointer' }}>{item}</div>)}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ textAlign: 'center' as const, maxWidth: 440 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 14, color: MUT, marginBottom: ctaLabel ? 20 : 0 }}>{sub}</div>
            {ctaLabel && <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>{ctaLabel}</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

function CoachShell({ navActive = 'Squad', title, sub, ctaLabel }: { navActive?: string; title: string; sub: string; ctaLabel?: string }) {
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => <div key={t} style={{ fontSize: 13, fontWeight: t === navActive ? 700 : 500, color: t === navActive ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>)}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' as const, maxWidth: 440 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: ctaLabel ? 20 : 0 }}>{sub}</div>
          {ctaLabel && <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>{ctaLabel}</button>}
        </div>
      </div>
    </div>
  )
}

// ─── Director empties ─────────────────────────────────────────────────────────

export function D2eTeamsEmpty() {
  return <DirShell navActive="Teams" title="No teams yet" sub="Add your first team and assign a head coach to get started." ctaLabel="Add a team" />
}
export function D3eCoachesEmpty() {
  return <DirShell navActive="Coaches" title="No coaches yet" sub="Invite coaches by email. They'll set up their own account and appear here once they've joined." ctaLabel="Invite a coach" />
}
export function D4ePlayersEmpty() {
  return <DirShell navActive="Players" title="No players yet" sub="Players are added when families complete registration. You can also add them manually." ctaLabel="Add a player" />
}
export function D5eSafeguardingEmpty() {
  return <DirShell navActive="Safeguarding" title="All clear" sub="No welfare concerns, head knocks or safeguarding flags have been raised this season." />
}
export function D6eBoardReportEmpty() {
  return <DirShell navActive="Reports" title="No reports yet" sub="Board reports are generated at the end of each month. The first one will appear after the season is underway." />
}
export function DB2eSeasonReviewEmpty() {
  return <DirShell navActive="Reports" title="Season review not ready" sub="The season review is available from the last day of the season. It compiles the whole year across all teams." />
}
export function DB3eLeagueReturnsEmpty() {
  return <DirShell navActive="Reports" title="No league returns yet" sub="League returns will be ready after each round is complete and synced from Dribl." />
}
export function DB4eGrantsEmpty() {
  return <DirShell navActive="Reports" title="No grant data yet" sub="Grant-ready reports pull from your season data. They'll appear here once the season is underway." ctaLabel="Learn about grant reports" />
}
export function DC1eCalendarEmpty() {
  return <DirShell navActive="Teams" title="Calendar empty" sub="Once teams are added and fixtures are synced, all games, training sessions and club events appear here." ctaLabel="Sync fixtures" />
}
export function DCo1eCoordinatorHomeEmpty() {
  return <DirShell navActive="Teams" title="Nothing here yet" sub="Once teams and fixtures are set up, your coordinator view will show upcoming sessions and anything that needs attention." />
}
export function DK1eKitEmpty() {
  return <DirShell navActive="Teams" title="No kit or cameras logged" sub="Add your camera kit and training equipment here so coaches can book what they need each week." ctaLabel="Add kit" />
}
export function DSet3eClubConnectionsEmpty() {
  return (
    <DirShell
      navActive="Club"
      sideItems={['Club details', 'People and roles', 'Connections', 'Club rules', 'Plan', 'Partner academies']}
      sideActive="Connections"
      title="No connections yet"
      sub="Connect to Dribl to sync fixtures and results automatically. Connect to your registration provider to keep player data up to date."
      ctaLabel="Connect to Dribl"
    />
  )
}
export function DSet4eClubRulesEmpty() {
  return (
    <DirShell
      navActive="Club"
      sideItems={['Club details', 'People and roles', 'Connections', 'Club rules', 'Plan', 'Partner academies']}
      sideActive="Club rules"
      title="Club rules not set"
      sub="Set the rules that apply across every team — fair game time, filming, heading and messaging policies. Coaches can't override these."
      ctaLabel="Set club rules"
    />
  )
}
export function DM1eCoachMeetingEmpty() {
  return <DirShell navActive="Coaches" title="No meeting notes yet" sub="Schedule a coach meeting and notes will appear here afterwards. Regular meetings keep the whole club coaching the same way." ctaLabel="Schedule a meeting" />
}
export function DP1eFairGameTimeEmpty() {
  return <DirShell navActive="Players" title="No fair game time data yet" sub="Fair game time tracking starts once coaches record their first game. All U13 and under teams are covered automatically." />
}
export function DR1eRegistrationsEmpty() {
  return <DirShell navActive="Players" title="No registrations yet" sub="Once families register, players appear here. Connect to your registration provider to sync automatically." ctaLabel="Connect registration" />
}
export function DS1eConcernsEmpty() {
  return <DirShell navActive="Safeguarding" title="No concerns raised" sub="Welfare concerns, head knocks and safeguarding flags raised by any coach or family will appear here. All clear." />
}
export function DS2eDataRequestsEmpty() {
  return <DirShell navActive="Players" title="No data requests" sub="Requests from families to access, correct or delete their data will appear here. Nothing pending." />
}
export function DT1eCoursesEmpty() {
  return <DirShell navActive="Coaches" title="No courses on record" sub="As coaches complete coaching badges, their qualifications show here. You can also add them manually." ctaLabel="Add a qualification" />
}
export function DW1eWelfareCasesEmpty() {
  return <DirShell navActive="Safeguarding" title="No welfare cases" sub="Open welfare cases are tracked here. Helen Park is your welfare officer and can be contacted privately by anyone." />
}
export function DX1eCompareTeamsEmpty() {
  return <DirShell navActive="Reports" title="No comparison data yet" sub="Once teams have played a few games, you can compare how they're playing against the club's style targets." />
}

// ─── MiniRoos empties ──────────────────────────────────────────────────────────

export function HM1eHomeMiniRoosEmpty() {
  return <HMShell navActive="Today" title="Nothing on today" sub="Your next session appears here on the day. Add training and game days to your calendar to get started." ctaLabel="Add a session" />
}
export function HM6eSeasonNotesEmpty() {
  return <HMShell navActive="Squad" title="No season notes yet" sub="Notes from each session build up here over the season — what you spotted, who to keep an eye on." />
}
export function HM7eInboxMiniRoosEmpty() {
  return <HMShell navActive="Messages" title="Inbox empty" sub="Messages from your club, announcements from the director, and replies from families will appear here." />
}
export function HM8eCalendarMiniRoosEmpty() {
  return <HMShell navActive="Calendar" title="Calendar empty" sub="Add training sessions and game days. They'll appear here and families will get a reminder 48 hours before." ctaLabel="Add a session" />
}
export function HM9eFixturesMiniRoosEmpty() {
  return <HMShell navActive="Calendar" title="No fixtures yet" sub="Fixtures sync automatically once your club connects to Dribl. Or you can add them yourself." ctaLabel="Add a fixture" />
}
export function HM10eStaffMiniRoosEmpty() {
  return <HMShell navActive="Squad" title="No staff listed" sub="Add helpers — a co-coach, manager or volunteer — so families know who's involved with the team." ctaLabel="Add a helper" />
}
export function HM11eComingMiniRoosEmpty() {
  return <HMShell navActive="Today" title="No availability yet" sub="Families answer who's coming once you post an upcoming session. No answers yet for this event." />
}
export function HM12eConsentMiniRoosEmpty() {
  return <HMShell navActive="Squad" title="All consents up to date" sub="No outstanding consent forms. Families complete these at registration and they're renewed each season." />
}

// ─── Academy owner empties ─────────────────────────────────────────────────────

export function AC3eTrialsEmpty() {
  return <AcOwnerShell navActive="Trials" title="No trials yet" sub="Run a trial session to assess new players. Add a trial date and players can register through the academy's page." ctaLabel="Set up a trial" />
}
export function AC4eAcademyPlayersEmpty() {
  return <AcOwnerShell navActive="Players" title="No players yet" sub="Players appear here once they've joined a program. Run a trial or enrol players directly." ctaLabel="Add a player" />
}
export function AC5eFeesEmpty() {
  return <AcOwnerShell navActive="Home" title="No fees set" sub="Set program fees so families can pay when they enrol. Payments and outstanding balances are tracked here." ctaLabel="Set up fees" />
}
export function AC6eAcademyCoachesEmpty() {
  return <AcOwnerShell navActive="Coaches" title="No coaches yet" sub="Invite coaches to Tall Timber Academy. They'll set up their own account and can record sessions straight away." ctaLabel="Invite a coach" />
}
export function AC7eReportsEmpty() {
  return <AcOwnerShell navActive="Reports" title="No reports yet" sub="Term reports are drafted from coach notes and sent to families at the end of each term. Nothing ready yet." />
}
export function AC8eAcademyRecordEmpty() {
  return <AcOwnerShell navActive="Home" title="Nothing recorded yet" sub="Game day recordings appear here once a coach records a session. Clips and data are ready within an hour." />
}
export function AC9eHolidayClinicEmpty() {
  return <AcOwnerShell navActive="Home" title="No holiday clinics set up" sub="Holiday clinics are a great way to bring in new players. Set a date and open registrations." ctaLabel="Create a clinic" />
}
export function AC10eAcademySafetyEmpty() {
  return <AcOwnerShell navActive="Home" title="All clear" sub="No welfare concerns, head knocks or safeguarding flags have been raised. All coaches have current checks." />
}
export function AC11ePartnerClubEmpty() {
  return <AcOwnerShell navActive="Home" title="No partner clubs yet" sub="Partner clubs can share player data with the academy so coaches can track both club and academy progress together." ctaLabel="Add a partner club" />
}
export function AC12eAcademyBroadcastEmpty() {
  return <AcOwnerShell navActive="Home" title="No broadcasts sent" sub="Send updates to all academy families at once. Previous broadcasts will appear here." ctaLabel="Send a broadcast" />
}

// ─── Academy coach empties ─────────────────────────────────────────────────────

export function ACC2eRunSessionEmpty() {
  return <AcCoachShell title="No session plan yet" sub="Build today's plan from the drill library or use a suggested session. Plans are ready in about two minutes." ctaLabel="Build a plan" />
}
export function ACC3eTrialAssessEmpty() {
  return <AcCoachShell title="No trial players today" sub="Trial players are listed here when they're registered for today's session. Add a trial player to get started." ctaLabel="Add a trial player" />
}
export function ACC4ePlayerPlanEmpty() {
  return <AcCoachShell title="No player plans yet" sub="Individual plans are built from each player's goals and assessment notes. They appear here once a session is recorded." ctaLabel="Start a plan" />
}
export function ACC5eOneOnOneEmpty() {
  return <AcCoachShell title="No one-on-ones booked" sub="Book a one-on-one for a player who needs focused work on a specific skill. Parents are notified automatically." ctaLabel="Book a one-on-one" />
}
export function ACC6eReportDraftEmpty() {
  return <AcCoachShell title="No report drafts yet" sub="Reports are drafted from your session notes as the term progresses. Nothing ready yet." />
}
export function ACC7eAcademyGameDayEmpty() {
  return <AcCoachShell title="No game day today" sub="When a game is scheduled, it appears here. Record the session afterwards to build clips and player stats." />
}
export function ACC8eAcademyRecordEmpty() {
  return <AcCoachShell title="Nothing recorded yet" sub="Record a session to build clips and player stats. Recording is available during and after any session." ctaLabel="Record a session" />
}
export function ACC12eAcademySuggestedEmpty() {
  return <AcCoachShell title="No suggestions yet" sub="Clean Sheet builds suggestions from your session notes and player goals. Run a few sessions first." />
}
export function ACC13eAcademyChatEmpty() {
  return <AcCoachShell title="No chats yet" sub="Group chats with your session groups appear here. Send an announcement to get started." ctaLabel="Start a chat" />
}

// ─── Chat empties ──────────────────────────────────────────────────────────────

export function CH1eTeamChatEmpty() {
  return (
    <CoachShell navActive="Home" title="No messages yet" sub="Team chat with parents and players will appear here. Start by saying hello." ctaLabel="Send a message" />
  )
}
export function CH2eAnnouncementsEmpty() {
  return (
    <CoachShell navActive="Home" title="No announcements yet" sub="Announcements go to everyone at once and can't be replied to. Good for game day reminders and venue changes." ctaLabel="Post an announcement" />
  )
}
export function CH5ePollResultsEmpty() {
  return (
    <CoachShell navActive="Home" title="No polls yet" sub="Run a poll to ask your squad a question. Results appear here as people answer." ctaLabel="Create a poll" />
  )
}
export function CH6eMediaEmpty() {
  return (
    <CoachShell navActive="Home" title="No photos or videos shared" sub="Photos and videos shared in the team chat appear here. Parents can see and download anything shared with the squad." />
  )
}

// ─── MiniRoos chat ─────────────────────────────────────────────────────────────

export function CHm1TeamChatMiniRoos() {
  return (
    <HMShell navActive="Messages" title="Team chat · Kangaroos" sub="Messages between you, parents and helpers. Players under 15 are not in this chat." />
  )
}
export function CHm1eTeamChatMiniRoosEmpty() {
  return (
    <HMShell navActive="Messages" title="No messages yet" sub="Start the season by introducing yourself to the Kangaroos families." ctaLabel="Say hello" />
  )
}

// ─── Player/parent empties ─────────────────────────────────────────────────────

export function PM1eParentChatsEmpty() {
  const PhoneWrap = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <div style={{ width: 390, background: '#fff', borderRadius: 24, border: `1px solid ${LN}`, overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
        {children}
      </div>
    </div>
  )
  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Messages</div>
      </div>
      <div style={{ padding: '48px 20px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No messages yet</div>
        <div style={{ fontSize: 14, color: MUT }}>Messages from coaches and announcements will appear here.</div>
      </div>
    </PhoneWrap>
  )
}

export function PM2eParentTeamChatEmpty() {
  const PhoneWrap = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <div style={{ width: 390, background: '#fff', borderRadius: 24, border: `1px solid ${LN}`, overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
        {children}
      </div>
    </div>
  )
  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Team chat</div>
      </div>
      <div style={{ padding: '48px 20px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No team chat yet</div>
        <div style={{ fontSize: 14, color: MUT }}>The coach hasn't started a team chat yet. You'll be notified when one opens.</div>
      </div>
    </PhoneWrap>
  )
}

export function PM9eParentPrivateChatEmpty() {
  const PhoneWrap = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <div style={{ width: 390, background: '#fff', borderRadius: 24, border: `1px solid ${LN}`, overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
        {children}
      </div>
    </div>
  )
  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Private chat</div>
      </div>
      <div style={{ padding: '48px 20px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No messages yet</div>
        <div style={{ fontSize: 14, color: MUT }}>Private messages with the head coach will appear here. For welfare concerns, use the report button instead.</div>
      </div>
    </PhoneWrap>
  )
}

export function AV2eParentAvailabilityEmpty() {
  const PhoneWrap = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <div style={{ width: 390, background: '#fff', borderRadius: 24, border: `1px solid ${LN}`, overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
        {children}
      </div>
    </div>
  )
  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Availability</div>
      </div>
      <div style={{ padding: '48px 20px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>Nothing coming up</div>
        <div style={{ fontSize: 14, color: MUT }}>When the coach posts upcoming sessions, you'll be asked if your child can make it.</div>
      </div>
    </PhoneWrap>
  )
}

// ─── Fitness empties ───────────────────────────────────────────────────────────

export function FC1eConcussionEmpty() {
  return <CoachShell navActive="Squad" title="No concussion history" sub="Head knock reports and return-to-play trackers will appear here. All clear for this season." />
}
export function FK1eGoalkeepersEmpty() {
  return <CoachShell navActive="Squad" title="No goalkeeper data yet" sub="Goalkeeper-specific stats and training notes appear here once a goalkeeper has been recorded in a session." />
}

// ─── Team sheet empty ──────────────────────────────────────────────────────────

export function MS1eTeamSheetEmpty() {
  return (
    <CoachShell navActive="Match day" title="No team sheet yet" sub="The team sheet is built from your availability answers. Post the game to families to get answers back." ctaLabel="Post upcoming game" />
  )
}

// ─── Older player home (PO) ────────────────────────────────────────────────────

function PlayerPhoneShell({ title, sub, ctaLabel }: { title: string; sub: string; ctaLabel?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <div style={{ width: 390, background: '#fff', borderRadius: 24, border: `1px solid ${LN}`, overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Home', 'Clips', 'Body', 'Messages'].map(t => (
              <div key={t} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ padding: '48px 20px', textAlign: 'center' as const }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: ctaLabel ? 20 : 0 }}>{sub}</div>
          {ctaLabel && <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>{ctaLabel}</button>}
        </div>
      </div>
    </div>
  )
}

export function PO1eOlderHomeEmpty() {
  return <PlayerPhoneShell title="Nothing on today" sub="Your next session will appear here when the coach posts it. Check back closer to match day." />
}
export function PO2eOlderClipsEmpty() {
  return <PlayerPhoneShell title="No clips yet" sub="Clips tagged for you will appear here after games. Ask your coach if you're not seeing any." />
}
export function PO4eOlderBodyEmpty() {
  return <PlayerPhoneShell title="No body data yet" sub="Wellness check-ins, fitness test results and growth data will appear here once your coach starts tracking." ctaLabel="Do a check-in" />
}
