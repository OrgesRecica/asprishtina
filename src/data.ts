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
  { id: 377693, team: 'AS Prishtina', shortName: 'AS Prishtina', image: '/teams/as-prishtina.png', p: 4, w: 4, l: 0, scored: 339, conceded: 278, diff: 61, pts: 8, featured: true },
  { id: 1299561, team: 'KB Policia e Kosovës', shortName: 'Policia', image: '/teams/policia.webp', p: 4, w: 3, l: 1, scored: 313, conceded: 261, diff: 52, pts: 7 },
  { id: 1299562, team: 'KB Fushë Kosova', shortName: 'Fushë Kosova', image: '/teams/fushe-kosova.webp', p: 4, w: 2, l: 2, scored: 333, conceded: 345, diff: -12, pts: 6 },
  { id: 377689, team: 'KB Megasports', shortName: 'Megasports', image: '/teams/megasports.png', p: 4, w: 2, l: 2, scored: 309, conceded: 306, diff: 3, pts: 6 },
  { id: 378765, team: 'KB Kaçaniku', shortName: 'Kaçaniku', image: '/teams/kacaniku.png', p: 4, w: 1, l: 3, scored: 215, conceded: 260, diff: -45, pts: 5 },
  { id: 294910, team: 'KB Sfera Skenderai', shortName: 'Sfera', image: '/teams/sfera.png', p: 4, w: 0, l: 4, scored: 192, conceded: 251, diff: -59, pts: 4 },
]

export const sources = {
  federation: 'https://www.basketbolli.com/Shooter/Team/350',
  standings: 'https://www.sofascore.com/basketball/tournament/kosovo/liga-e-dyte/39242#id:106709',
  instagram: 'https://www.instagram.com/kb.asprishtina/'
}
