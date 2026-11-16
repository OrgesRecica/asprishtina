export type Player = { name: string; license: string; image: string }
export type Match = { date: string; time: string; round: number; home: string; away: string; homeScore?: number; awayScore?: number; venue: string; status: 'final' | 'upcoming' | 'no-result' }

export const players: Player[] = [
  ['Ben Basha', '2533', 'ben-basha.jpg'],
  ['Ensar Berisha', '2526', 'ensar-berisha.jpg'],
  ['Armend Gashi', '2537', 'armend-gashi.jpg'],
  ['Lunik Gaxherri', '2536', 'lunik-gaxherri.jpg'],
  ['Eris Hajdini', '2529', 'eris-hajdini.jpg'],
  ['Alban Hasani', '2540', 'alban-hasani.jpg'],
  ['Ilir Hasani', '2531', 'ilir-hasani.jpg'],
  ['Andi Koqinaj', '2542', 'andi-koqinaj.jpg'],
  ['Fabian Mehmeti', '2541', 'fabian-mehmeti.jpg'],
  ['Diellor Podrimaj', '2528', 'diellor-podrimaj.jpg'],
  ['Orges Reçica', '2530', 'orges-recica.jpg'],
  ['Arber Shala', '2535', 'arber-shala.jpg'],
  ['Andi Spahiu', '2534', 'andi-spahiu.jpg'],
  ['Renat Sylejmani', '2527', 'renat-sylejmani.jpg'],
  ['Ardit Xhemajli', '2525', 'ardit-xhemajli.jpg'],
  ['Rinor Zhdrella', '2532', 'rinor-zhdrella.jpg'],
].map(([name, license, image]) => ({ name, license, image: `/players/${image}` }))

export const matches: Match[] = [
  { date: '25 TET 2026', time: '—', round: 1, home: 'Sfera', away: 'AS Prishtina', homeScore: 55, awayScore: 80, venue: 'Skenderaj', status: 'final' },
  { date: '01 NËN 2026', time: '17:00', round: 2, home: 'AS Prishtina', away: 'Policia e Kosovës', homeScore: 77, awayScore: 63, venue: 'Palestra Sportive Imperium · Prishtinë', status: 'final' },
  { date: '07 NËN 2026', time: '20:00', round: 3, home: 'Megasports', away: 'AS Prishtina', homeScore: 68, awayScore: 82, venue: 'Sezai Surroi · Prizren', status: 'final' },
  { date: '15 NËN 2026', time: '18:00', round: 4, home: 'AS Prishtina', away: 'Fushë Kosova', homeScore: 100, awayScore: 92, venue: 'Palestra Sportive Imperium · Prishtinë', status: 'final' },
  { date: '21 NËN 2026', time: '19:00', round: 5, home: 'Kaçaniku', away: 'AS Prishtina', venue: 'Palestra Sportive Kaçanik', status: 'upcoming' },
  { date: '07 SHK 2027', time: '—', round: 6, home: 'AS Prishtina', away: 'Sfera', venue: 'Prishtinë', status: 'upcoming' },
  { date: '14 SHK 2027', time: '—', round: 7, home: 'Policia e Kosovës', away: 'AS Prishtina', venue: 'Prishtinë', status: 'upcoming' },
  { date: '21 SHK 2027', time: '—', round: 8, home: 'AS Prishtina', away: 'Megasports', venue: 'Prishtinë', status: 'upcoming' },
  { date: '28 SHK 2027', time: '—', round: 9, home: 'Fushë Kosova', away: 'AS Prishtina', venue: 'Prishtinë', status: 'upcoming' },
  { date: '07 MAR 2027', time: '—', round: 10, home: 'AS Prishtina', away: 'Kaçaniku', venue: 'Prishtinë', status: 'upcoming' },
]

export const standings = [
  { team: 'AS Prishtina', p: 4, w: 4, l: 0, scored: 339, conceded: 278, diff: 61, pts: 8, featured: true },
  { team: 'Fushë Kosova', p: 3, w: 2, l: 1, scored: 254, conceded: 235, diff: 19, pts: 5 },
  { team: 'Megasports', p: 3, w: 1, l: 2, scored: 217, conceded: 235, diff: -18, pts: 4 },
  { team: 'Policia e Kosovës', p: 2, w: 1, l: 1, scored: 143, conceded: 124, diff: 19, pts: 3 },
  { team: 'Sfera', p: 2, w: 0, l: 2, scored: 134, conceded: 166, diff: -32, pts: 2 },
  { team: 'Kaçaniku', p: 2, w: 0, l: 2, scored: 119, conceded: 168, diff: -49, pts: 2 },
]

export const sources = {
  federation: 'https://www.basketbolli.com/Shooter/Team/350',
  standings: 'https://kosovo.basketball/Results?leagueId=155',
  instagram: 'https://www.instagram.com/kb.asprishtina/'
}
