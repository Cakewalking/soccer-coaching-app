// Many drawn screens carry their own copy of a role's menu. Those buttons used to
// record a name only ("Squad tab") and go nowhere. This maps each name to the
// design screen it stands for, so the button opens it.
const TARGETS: Record<string, string> = {
  'Squad tab': 'T4-SquadTab', 'Training tab': 'T3-TrainingTab', 'Clips tab': 'C1-ClipsTab', 'Clips': 'C1-ClipsTab',
  'Match day tab': 'T2-TabletMatch', 'Match day tab (Sat)': 'T2-TabletMatch', 'Match day › Review': 'R1-MatchReview', 'Review': 'R1-MatchReview',
  'Open the plan': 'T3-TrainingTab', 'Learn': 'EDU1-Learn',
  'Home › Fixtures and results': 'CF1-Fixtures', 'Home › Our style': 'S1-PlayingStyle', 'Home › Inbox': 'I1-Inbox', 'Home › Team staff': 'ST1-TeamStaff',
  'Players': 'D4-Players', 'Teams': 'D2-Teams', 'Coaches': 'D3-Coaches', 'Safeguarding': 'D5-Safeguarding',
  'Reports › Board report': 'D6-BoardReport', 'Club › Overview': 'STO10-HomeStoryDirector', 'Club › Calendar': 'DC1-Calendar', 'Fair game time': 'DP1-FairGameTime',
  'switcher': 'VS1-SwitchView', 'U12 Sam': 'VS1-SwitchView', 'U12 Sam · Wattle Creek': 'VS1-SwitchView', 'Whole club': 'VS1-SwitchView',
  // ids the designs point at that have no screen: rulings from the master handover, part 5b
  'DP1-Pathway': 'PU1-PlayingUp', 'D8-ClubStyle': 'S1-PlayingStyle', 'D7-SeasonPlan': 'FY1-SeasonPlan',
}
export const toolTarget = (name: string): string | undefined => TARGETS[name]
