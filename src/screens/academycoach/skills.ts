// The four core skills, used on every academy screen. Five steps each.
export const CORE_SKILLS = ['First touch', 'Running with the ball', 'One against one', 'Striking the ball'] as const
export type CoreSkill = typeof CORE_SKILLS[number]
export const SKILL_STEPS = 5

/**
 * Do not ship yet: film counting the skills check (ADC4) is not validated.
 * While this is false every station is the coach's own taps and is labelled "You counted".
 * Turn it on only once film counting of the wall passes and the cone run has been checked;
 * those two stations then show the Strong chip, as the board draws them.
 */
export const FILM_COUNTS_SKILLS_CHECK: boolean = false
