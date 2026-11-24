import type { PhoneCfg } from './HomeStory'

// The one phone Home still on the older layout: STO21, a copy of the academy family app's Club tab (ADP1).
// STO16 to STO20 and STO22 are the four-part phone homes in ../homesphone (homes handover v26).

export const STO21: PhoneCfg = {
  id: 'STO21-HomeStoryAcademyParent', roleLine: 'Tall Timber · Advanced', greeting: 'Kai’s week', avatar: 'TO',
  tabs: [{ label: 'Home', target: 'ACP3-AcademyParentHome' }, { label: 'Progress', target: 'ACP5-ProgressReport' }, { label: 'Learn', target: 'LEARN-AcademyParent' }, { label: 'Book', target: 'ACP8-BookClinic' }, { label: 'Fees', target: 'ACP4-ParentFees' }, { label: 'Messages', target: 'MSG-academyparent' }],
  blocks: [
    { kind: 'proof', label: 'KAI · ADVANCED · WEEK 7 OF 10', headline: 'Kai’s weak-foot pass has moved from Getting There to Strong.', second: 'Reece filmed the same drill in week 3 and week 7. Here are both.', clip: { duration: '0:15', note: 'Before and after. Only you, Kai and his coaches can see this.' }, btn: 'Watch 15 seconds', btnTarget: 'ACP5-ProgressReport' },
    { kind: 'list', label: 'THIS WEEK', title: 'Thursday and Sunday', text: 'Thu 5:30 pm at Messmate Primary. Sun 10:00 am game with U13 Timber.', action: 'Kai can’t make one', actionTarget: 'ACP6-MakeUp' },
    { kind: 'done', title: 'Done for you', lines: ['Term report lands Fri 26 June, with clips', 'Fees are paid to the end of term', 'July clinic: a place is held until 12 June'] },
  ],
}

export const PHONE_CONFIGS: Record<string, PhoneCfg> = {
  'STO21-HomeStoryAcademyParent': STO21,
}
