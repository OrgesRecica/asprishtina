import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Camera, ChevronDown, MapPin, Menu, RotateCcw, Target, X } from 'lucide-react'
import { matches, players, sources, standings, type Match } from './data'

type Page = 'home' | 'standings' | 'roster' | 'matches'
type Theme = 'vendas' | 'mysafir'
const routes: Record<string, Page> = { '/': 'home', '/standings': 'standings', '/roster': 'roster', '/matches': 'matches' }
const nav: [Page, string, string, string][] = [['home', 'Ballina', '/', '01'], ['standings', 'Renditja', '/standings', '02'], ['roster', 'Ekipi', '/roster', '03'], ['matches', 'Ndeshjet', '/matches', '04']]
const getPage = (): Page => routes[window.location.pathname] ?? 'home'

function Mark() { return <span className="mark"><img src="/logo.jpg" alt="" /><span>AS<small>PRISHTINA</small></span></span> }

function Header({ page, navigate, theme, setTheme }: { page: Page; navigate: (page: Page, path: string) => void; theme: Theme; setTheme: (theme: Theme) => void }) {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <a className="brand-link" href="/" aria-label="AS Prishtina — Ballina" onClick={event => { event.preventDefault(); navigate('home', '/'); setOpen(false) }}><Mark /></a>
    <button className="menu-button" aria-label={open ? 'Mbyll menynë' : 'Hap menynë'} aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'open' : ''} aria-label="Navigimi kryesor">{nav.map(([id, label, path, index]) => <a key={id} href={path} className={page === id ? 'active' : ''} onClick={event => { event.preventDefault(); navigate(id, path); setOpen(false) }}><small>{index}</small><span>{label}</span></a>)}</nav>
    <div className="header-tools"><div className="theme-switch" role="group" aria-label="Pamja e faqes"><button className={theme === 'vendas' ? 'selected' : ''} aria-pressed={theme === 'vendas'} onClick={() => setTheme('vendas')}>Vendas</button><button className={theme === 'mysafir' ? 'selected' : ''} aria-pressed={theme === 'mysafir'} onClick={() => setTheme('mysafir')}>Mysafir</button></div><a className="instagram" href={sources.instagram} target="_blank" rel="noreferrer" aria-label="AS Prishtina në Instagram"><Camera /></a></div>
  </header>
}

function Footer({ navigate }: { navigate: (page: Page, path: string) => void }) {
  return <footer><div className="footer-lead"><Mark /><p>Basketboll nga kryeqyteti.<br />Liga e Dytë · 2026/27</p></div><h2>Qyteti luan<br /><span>me ne.</span></h2><div className="footer-links">{nav.map(([id, label, path, index]) => <a key={id} href={path} onClick={event => { event.preventDefault(); navigate(id, path) }}><small>{index}</small>{label}</a>)}<a href={sources.instagram} target="_blank" rel="noreferrer"><small>↗</small>Instagram</a></div><p className="copyright">© 2026 KB AS Prishtina · Të dhënat: Federata e Basketbollit të Kosovës</p></footer>
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <div className={`reveal ${className}`}>{children}</div> }

function MatchCard({ match, index }: { match: Match; index: number }) {
  const final = match.status === 'final', asHome = match.home === 'AS Prishtina'
  const won = final && (asHome ? match.homeScore! > match.awayScore! : match.awayScore! > match.homeScore!)
  return <article className="match-card"><div className="match-round"><small>{String(index + 1).padStart(2, '0')}</small><span>JAVA {String(match.round).padStart(2, '0')}</span></div><div className="match-main"><div className="match-date"><strong>{match.date}</strong><span>{match.time}</span></div><div className="teams"><div className={asHome ? 'ours' : ''}><span>{match.home}</span><strong>{match.homeScore ?? '—'}</strong></div><div className={!asHome ? 'ours' : ''}><span>{match.away}</span><strong>{match.awayScore ?? '—'}</strong></div></div></div><div className="match-aside"><span className={`status ${match.status}`}>{final ? (won ? 'FITORE' : 'HUMBJE') : match.status === 'no-result' ? 'PA REZULTAT' : 'SË SHPEJTI'}</span><p><MapPin />{match.venue}</p></div></article>
}

function ShotChallenge() {
  const [time, setTime] = useState(24), [score, setScore] = useState(0), [attempts, setAttempts] = useState(0), [streak, setStreak] = useState(0)
  const [started, setStarted] = useState(false), [result, setResult] = useState('Gati për gjuajtjen e parë'), [shot, setShot] = useState<{ id: number; made: boolean } | null>(null)
  useEffect(() => { if (!started || time === 0) return; const timer = window.setInterval(() => setTime(current => { if (current <= 1) { setStarted(false); setResult('Koha mbaroi — provo përsëri'); return 0 } return current - 1 }), 1000); return () => window.clearInterval(timer) }, [started, time])
  const shoot = () => { if (time === 0) return; setStarted(true); const accuracy = (Math.sin(performance.now() / 360) + 1) / 2, made = accuracy > .42, points = accuracy > .84 ? 3 : 2; setAttempts(value => value + 1); setShot({ id: performance.now(), made }); if (made) { setScore(value => value + points); setStreak(value => value + 1); setResult(points === 3 ? 'Tre pikë!' : 'Kosh!') } else { setStreak(0); setResult('Huqi — provo përsëri') } }
  const reset = () => { setTime(24); setScore(0); setAttempts(0); setStreak(0); setStarted(false); setShot(null); setResult('Gati për gjuajtjen e parë') }
  return <section className="challenge"><div className="challenge-score"><span>{String(time).padStart(2, '0')}</span><small>SHOT CLOCK</small></div><div className="challenge-copy"><p className="kicker">SFIDA INTERAKTIVE</p><h2>Gjuaj<br />në kohë.</h2><p>Godite butonin kur treguesi kalon në zonën e bardhë. Sa më afër qendrës, aq më e vlefshme gjuajtja.</p><div className="game-stats"><span><small>PIKË</small>{score}</span><span><small>SERIA</small>{streak}</span><span><small>GJUAJTJE</small>{attempts}</span></div></div><div className="court"><div className="court-arc" /><div className="backboard"><span /></div><div className="hoop"><span /><i /></div>{shot && <div key={shot.id} className={`game-ball ${shot.made ? 'made' : 'miss'}`}><span /></div>}<div className="accuracy-meter"><span /><i /></div><div className="game-controls"><p aria-live="polite">{result}</p><button className="shoot" onClick={shoot} disabled={time === 0}><Target />GJUAJ</button><button className="reset" onClick={reset} aria-label="Rifillo sfidën"><RotateCcw /></button></div></div></section>
}

function Home({ go }: { go: (page: Page, path: string) => void }) {
  const latest = matches.filter(match => match.status === 'final').at(-1)!
  return <main><section className="home-hero"><div className="hero-photo" /><div className="hero-title"><p>LIGA E DYTË · 2026/27</p><h1>Qyteti<br />luan<br /><span>me ne.</span></h1></div><div className="hero-score"><small>FORMA</small><strong>4—0</strong><span>PA HUMBJE</span></div><div className="hero-actions"><button onClick={() => go('matches', '/matches')}>Ndeshjet <ArrowRight /></button><button onClick={() => go('roster', '/roster')}>Ekipi <ArrowRight /></button></div><div className="hero-scroll">ZBRIT <ChevronDown /></div></section>
    <section className="season-strip" aria-label="Statistikat e sezonit"><p>SEZONI DERI TANI</p><div><strong>4–0</strong><span>BILANCI</span></div><div><strong>#1</strong><span>RENDITJA</span></div><div><strong>84.8</strong><span>PIKË / NDESHJE</span></div><div><strong>+61</strong><span>KOSH DALLIMI</span></div></section>
    <section className="latest section-pad"><Reveal className="latest-head"><p className="kicker">04 · REZULTATI I FUNDIT</p><h2>Njëqind pikë.<br /><span>Një tjetër fitore.</span></h2></Reveal><Reveal className="scoreboard"><div><small>VENDAS</small><h3>{latest.home}</h3></div><div className="score"><strong>{latest.homeScore}</strong><i>:</i><strong>{latest.awayScore}</strong><span>15 NËNTOR · PËRFUNDIMTARE</span></div><div className="away"><small>MYSAFIR</small><h3>{latest.away}</h3></div></Reveal><button className="line-link" onClick={() => go('matches', '/matches')}>Të gjitha ndeshjet <ArrowRight /></button></section>
    <ShotChallenge />
    <section className="next-game section-pad"><div><p className="kicker">05 · TAKIMI I ARDHSHËM</p><h2>21 <span>NËN</span></h2><p><CalendarDays />19:00 · PALESTRA SPORTIVE KAÇANIK</p></div><div className="next-opponents"><span>KAÇANIKU</span><b>VS</b><span>AS PRISHTINA</span></div></section></main>
}

function PageIntro({ number, label, title, note }: { number: string; label: string; title: React.ReactNode; note: string }) { return <section className="page-intro"><span className="intro-number">{number}</span><div><p className="kicker">{label}</p><h1>{title}</h1></div><p className="intro-note">{note}</p></section> }

function Standings() { return <main><PageIntro number="02" label="LIGA E DYTË · MESHKUJT" title={<>Kreu është<br /><span>i yni.</span></>} note="Renditje provizore pas fitores së 15 nëntorit. Të dhënat e ekipeve të tjera mbeten sipas tabelës së fundit të publikuar nga FBK." /><section className="standings section-pad"><div className="table-header"><p>RENDITJA / 2026—27</p><a href={sources.standings} target="_blank" rel="noreferrer">BURIMI FBK ↗</a></div><div className="table-wrap"><table><thead><tr><th>#</th><th>EKIPI</th><th>N</th><th>F</th><th>H</th><th>+</th><th>−</th><th>DIF</th><th>PIKË</th></tr></thead><tbody>{standings.map((row, index) => <tr key={row.team} className={row.featured ? 'featured' : ''}><td>{String(index + 1).padStart(2, '0')}</td><td><span className="team-code">{row.team.split(' ').map(word => word[0]).join('').slice(0, 2)}</span><strong>{row.team}</strong></td><td>{row.p}</td><td>{row.w}</td><td>{row.l}</td><td>{row.scored}</td><td>{row.conceded}</td><td>{row.diff > 0 ? '+' : ''}{row.diff}</td><td><strong>{row.pts}</strong></td></tr>)}</tbody></table></div><div className="legend"><span>N · Ndeshje</span><span>F · Fitore</span><span>H · Humbje</span><span>DIF · Diferenca</span></div></section></main> }

function Roster() { return <main><PageIntro number="03" label="ROSTERI · 2026/27" title={<>Njerëzit<br /><span>e parketit.</span></>} note="16 lojtarë. Energji e re, identitet i njëjtë." /><section className="coach-feature"><div className="coach-label"><p>01 / KRYETRAJNERI</p><h2>Shefqet<br />Xhaka</h2><span>LICENCA #2524</span></div><img src="/players/shefqet-xhaka.jpg" alt="Shefqet Xhaka" /><div className="coach-quote"><span>“</span><p>Disiplinë në lojë.<br />Karakter në çdo posedim.</p></div></section><section className="roster section-pad"><div className="roster-heading"><p>02 / LOJTARËT</p><span>16 FYTYRA · NJË EKIP</span></div><div className="roster-list">{players.map((player, index) => <Reveal key={player.name} className="player"><div className="player-number">{String(index + 1).padStart(2, '0')}</div><div className="player-photo"><img src={player.image} alt={player.name} loading="lazy" /></div><div className="player-info"><small>LICENCA #{player.license}</small><h2>{player.name}</h2></div></Reveal>)}</div></section></main> }

function Matches() { const [filter, setFilter] = useState<'all' | 'final' | 'upcoming'>('all'); const visible = matches.filter(match => filter === 'all' || (filter === 'final' ? match.status === 'final' : match.status !== 'final')); return <main><PageIntro number="04" label="KALENDARI · 2026/27" title={<>Çdo ndeshje.<br /><span>Çdo poen.</span></>} note="Rezultatet dhe kalendari i Ligës së Dytë." /><section className="matches section-pad"><div className="matches-toolbar"><p>{String(visible.length).padStart(2, '0')} TAKIME</p><div className="filters" role="group" aria-label="Filtro ndeshjet">{([['all', 'TË GJITHA'], ['final', 'REZULTATET'], ['upcoming', 'TË ARDHSHMET']] as const).map(([id, label]) => <button key={id} className={filter === id ? 'active' : ''} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div></div><div className="match-list">{visible.map((match, index) => <MatchCard key={match.round} match={match} index={index} />)}</div><p className="data-note">Rezultatet e xhirove 1, 2, 3 dhe 4 janë përfshirë në bilancin e ekipit. <a href={sources.federation} target="_blank" rel="noreferrer">Shiko kalendarin në FBK ↗</a></p></section></main> }

export function App() {
  const [page, setPage] = useState<Page>(getPage), [theme, setTheme] = useState<Theme>(() => window.localStorage.getItem('asprishtina-theme') === 'mysafir' ? 'mysafir' : 'vendas')
  const navigate = (next: Page, path: string) => { window.history.pushState({}, '', path); setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem('asprishtina-theme', theme) }, [theme])
  useEffect(() => { const pop = () => setPage(getPage()); addEventListener('popstate', pop); return () => removeEventListener('popstate', pop) }, [])
  useEffect(() => { document.title = `${nav.find(item => item[0] === page)?.[1]} — KB AS Prishtina`; const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('in-view')), { threshold: .1 }); document.querySelectorAll('.reveal').forEach(element => observer.observe(element)); return () => observer.disconnect() }, [page])
  const content = useMemo(() => page === 'home' ? <Home go={navigate} /> : page === 'standings' ? <Standings /> : page === 'roster' ? <Roster /> : <Matches />, [page])
  return <div className="app"><Header page={page} navigate={navigate} theme={theme} setTheme={setTheme} />{content}<Footer navigate={navigate} /></div>
}
