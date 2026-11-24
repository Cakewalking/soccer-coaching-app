// Which team the owner asked to change. "Change this team" on a team page sets it and opens AD20; AD20 reads it once.
// Kept for the visit only: a reload opens AD20 as a new team.
let team: string | null = null
export const changeTeam = (id: string | null) => { team = id }
export const teamToChange = () => team
