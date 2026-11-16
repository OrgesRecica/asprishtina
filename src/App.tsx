import { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, CalendarDays, Camera, MapPin, Menu, RotateCcw, Target, X } from 'lucide-react'
import { matches, players, sources, standings, type Match } from './data'

type Page = 'home' | 'standings' | 'roster' | 'matches'
const routes: Record<string, Page> = { '/': 'home', '/standings': 'standings', '/roster': 'roster', '/matches': 'matches' }
const nav: [Page, string, string][] = [['home', 'Ballina', '/'], ['standings', 'Renditja', '/standings'], ['roster', 'Ekipi', '/roster'], ['matches', 'Ndeshjet', '/matches']]

function getPage(): Page { return routes[window.location.pathname] ?? 'home' }

function Logo() {
  return <div className="brand"><img src="/logo.jpg" alt="Logo e KB AS Prishtina" /><span><b>AS</b> PRISHTINA</span></div>
}

function Header({ page, navigate, theme, setTheme }: { page: Page; navigate: (p: Page, path: string) => void; theme: 'vendas' | 'mysafir'; setTheme: (theme: 'vendas' | 'mysafir') => void }) {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <a href="/" onClick={e => { e.preventDefault(); navigate('home', '/'); setOpen(false) }} aria-label="AS Prishtina — Ballina"><Logo /></a>
    <button className="menu-button" aria-label={open ? 'Mbyll menynë' : 'Hap menynë'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'open' : ''} aria-label="Navigimi kryesor">
      {nav.map(([id, label, path]) => <a key={id} href={path} className={page === id ? 'active' : ''} onClick={e => {e.preventDefault(); navigate(id, path); setOpen(false)}}>{label}</a>)}
    </nav>
    <div className="header-actions"><div className="theme-switch" role="group" aria-label="Pamja e faqes"><button type="button" className={theme === 'vendas' ? 'selected' : ''} aria-pressed={theme === 'vendas'} onClick={() => setTheme('vendas')}>Vendas</button><button type="button" className={theme === 'mysafir' ? 'selected' : ''} aria-pressed={theme === 'mysafir'} onClick={() => setTheme('mysafir')}>Mysafir</button></div><a className="social-link" href={sources.instagram} target="_blank" rel="noreferrer" aria-label="AS Prishtina në Instagram"><Camera aria-hidden="true" /></a></div>
  </header>
}

function Footer({ navigate }: { navigate: (p: Page, path: string) => void }) {
  return <footer><div className="footer-mark">AS<span>PR</span></div><div><p className="eyebrow">QYTETI LUAN ME NE</p><h2>Prishtinë.<br/>Prej parketit.</h2></div><div className="footer-nav">{nav.map(([id, label, path]) => <a key={id} href={path} onClick={e => {e.preventDefault(); navigate(id, path)}}>{label}</a>)}<a href={sources.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div><p className="copyright">© 2026 KB AS Prishtina<br/>Të dhënat: Federata e Basketbollit të Kosovës</p></footer>
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const isFinal = match.status === 'final'
  const asHome = match.home === 'AS Prishtina'
  const won = isFinal && (asHome ? match.homeScore! > match.awayScore! : match.awayScore! > match.homeScore!)
  return <article className={`match-card ${compact ? 'compact' : ''}`}>
    <div className="match-meta"><span>JAVA {String(match.round).padStart(2, '0')}</span><span className={`status ${match.status}`}>{isFinal ? (won ? 'FITORE' : 'HUMBJE') : match.status === 'no-result' ? 'PA REZULTAT' : 'SË SHPEJTI'}</span></div>
    <div className="match-date"><b>{match.date}</b><span>{match.time}</span></div>
    <div className="teams"><div className={asHome ? 'our-team' : ''}><span>{match.home}</span><strong>{match.homeScore ?? '—'}</strong></div><div className={!asHome ? 'our-team' : ''}><span>{match.away}</span><strong>{match.awayScore ?? '—'}</strong></div></div>
    <p className="venue"><MapPin size={15} aria-hidden="true" />{match.venue}</p>
  </article>
}

function ShotChallenge() {
  const [time, setTime] = useState(24)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [streak, setStreak] = useState(0)
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState('Gati për gjuajtjen e parë')
  const [shot, setShot] = useState<{ id: number; made: boolean } | null>(null)

  useEffect(() => {
    if (!started || time === 0) return
    const timer = window.setInterval(() => {
      setTime(current => {
        if (current <= 1) {
          setStarted(false)
          setResult('Koha mbaroi — provo përsëri')
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [started, time])

  const shoot = () => {
    if (time === 0) return
    setStarted(true)
    const accuracy = (Math.sin(performance.now() / 360) + 1) / 2
    const made = accuracy > .42
    const points = accuracy > .84 ? 3 : 2
    setAttempts(value => value + 1)
    setShot({ id: performance.now(), made })
    if (made) {
      setScore(value => value + points)
      setStreak(value => value + 1)
      setResult(points === 3 ? 'Tre pikë!' : 'Kosh!')
    } else {
      setStreak(0)
      setResult('Huqi — provo përsëri')
    }
  }

  const reset = () => {
    setTime(24); setScore(0); setAttempts(0); setStreak(0); setStarted(false); setShot(null)
    setResult('Gati për gjuajtjen e parë')
  }

  return <section className="challenge-section section-pad">
    <div className="challenge-copy">
      <p className="eyebrow">SFIDA INTERAKTIVE</p>
      <h2>24 sekonda.<br/>Sa pikë mundesh?</h2>
      <p>Godite butonin kur treguesi kalon në zonën e bardhë. Sa më afër qendrës, aq më e vlefshme gjuajtja.</p>
      <div className="challenge-stats" aria-label="Rezultati i sfidës">
        <div><span>KOHA</span><strong>{time}</strong></div>
        <div><span>PIKË</span><strong>{score}</strong></div>
        <div><span>SERIA</span><strong>{streak}</strong></div>
        <div><span>GJUAJTJE</span><strong>{attempts}</strong></div>
      </div>
    </div>
    <div className="shot-game">
      <div className="court-lines" aria-hidden="true" />
      <div className="backboard" aria-hidden="true"><span /></div>
      <div className="hoop" aria-hidden="true"><span /><i /></div>
      {shot && <div key={shot.id} className={`game-ball ${shot.made ? 'made' : 'miss'}`} aria-hidden="true"><span /></div>}
      <div className="accuracy-meter" aria-hidden="true"><span className="hot-zone"/><i /></div>
      <div className="game-controls">
        <p aria-live="polite">{result}</p>
        <button className="shoot-button" onClick={shoot} disabled={time === 0}><Target aria-hidden="true" />GJUAJ</button>
        <button className="reset-button" onClick={reset} aria-label="Rifillo sfidën"><RotateCcw aria-hidden="true" /></button>
      </div>
    </div>
  </section>
}

function Home({ go }: { go: (p: Page, path: string) => void }) {
  const latest = matches.filter(m => m.status === 'final').at(-1)!
  return <>
    <main>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-copy"><p className="eyebrow">LIGA E DYTË · 2026/27</p><h1>QYTETI<br/><em>LUAN</em><br/>ME NE.</h1><div className="hero-actions"><button className="button primary" onClick={() => go('matches','/matches')}>SHIKO NDESHJET <ArrowRight aria-hidden="true" /></button><button className="text-button" onClick={() => go('roster','/roster')}>NJOFTONI EKIPIN <ArrowDownRight aria-hidden="true" /></button></div></div>
        <div className="scroll-cue">ZBRIT <ArrowDownRight size={18}/></div>
      </section>
      <section className="ticker" aria-label="Statistikat e sezonit"><div><strong>4–0</strong><span>BILANCI</span></div><div><strong>#1</strong><span>RENDITJA</span></div><div><strong>84.8</strong><span>PIKË / NDESHJE</span></div><div><strong>+61</strong><span>KOSH DALLIMI</span></div></section>
      <section className="latest-section section-pad">
        <Reveal><div className="section-heading"><div><p className="eyebrow">NGA PARKETI</p><h2>Ndeshja<br/>e fundit.</h2></div><button className="circle-button" onClick={() => go('matches','/matches')} aria-label="Shiko të gjitha ndeshjet"><ArrowRight /></button></div></Reveal>
        <Reveal className="featured-score"><div className="score-side"><span>VENDAS</span><h3>{latest.home}</h3></div><div className="big-score"><span>{latest.homeScore}</span><i>:</i><span>{latest.awayScore}</span><b>15 NËNTOR · FITORE</b></div><div className="score-side right"><span>MYSAFIR</span><h3>{latest.away}</h3></div></Reveal>
      </section>
      <ShotChallenge />
      <section className="next-game section-pad"><Reveal><p className="eyebrow">TAKIMI I ARDHSHËM</p><div className="next-grid"><div><h2>21<br/><em>NËN</em></h2><p>19:00 · KAÇANIK</p></div><div className="versus"><span>KAÇANIKU</span><b>VS</b><span>AS PRISHTINA</span></div><CalendarDays className="watermark" aria-hidden="true" /></div></Reveal></section>
    </main>
  </>
}

function PageHero({ index, label, title, children }: { index: string; label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return <section className="page-hero section-pad"><span className="page-index">{index}</span><div><p className="eyebrow">{label}</p><h1>{title}</h1>{children}</div></section>
}

function Standings() {
  return <main><PageHero index="01" label="LIGA E DYTË · MESHKUJT" title={<>KREU ËSHTË<br/><em>I YNI.</em></>}><p className="hero-note">Renditje provizore pas fitores së 15 nëntorit. Të dhënat e ekipeve të tjera mbeten sipas tabelës së fundit të publikuar nga FBK.</p></PageHero><section className="table-section section-pad"><div className="table-wrap"><table><thead><tr><th>#</th><th>EKIPI</th><th>N</th><th>F</th><th>H</th><th>+</th><th>−</th><th>DIF</th><th>PIKË</th></tr></thead><tbody>{standings.map((row,i)=><tr key={row.team} className={row.featured ? 'featured-row' : ''}><td>{String(i+1).padStart(2,'0')}</td><td><span className="mini-crest">{row.team.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><b>{row.team}</b></td><td>{row.p}</td><td>{row.w}</td><td>{row.l}</td><td>{row.scored}</td><td>{row.conceded}</td><td>{row.diff>0?'+':''}{row.diff}</td><td><strong>{row.pts}</strong></td></tr>)}</tbody></table></div><div className="legend"><span>N · Ndeshje</span><span>F · Fitore</span><span>H · Humbje</span><span>DIF · Diferenca</span><a href={sources.standings} target="_blank" rel="noreferrer">BURIMI FBK ↗</a></div></section></main>
}

function Roster() {
  return <main><PageHero index="02" label="ROSTERI · 2026/27" title={<>FYTYRAT E<br/><em>PRISHTINËS.</em></>}><p className="hero-note">16 lojtarë. Energji e re, identitet i njëjtë.</p></PageHero><section className="coach-section section-pad"><div><p className="eyebrow">KRYETRAJNERI</p><h2>Shefqet<br/>Xhaka</h2></div><div className="coach"><img src="/players/shefqet-xhaka.jpg" alt="Shefqet Xhaka"/><div><span>KRYETRAJNER</span><h3>Shefqet Xhaka</h3><p>Licenca #2524</p></div></div></section><section className="roster-grid section-pad">{players.map((p,i)=><Reveal key={p.name} className="player-card"><div className="player-image"><img src={p.image} alt={p.name} loading="lazy"/><span>{String(i+1).padStart(2,'0')}</span></div><p>LICENCA #{p.license}</p><h2>{p.name}</h2></Reveal>)}</section></main>
}

function Matches() {
  const [filter,setFilter] = useState<'all'|'final'|'upcoming'>('all')
  const visible = matches.filter(m => filter==='all' || (filter==='final' ? m.status==='final' : m.status!=='final'))
  return <main><PageHero index="03" label="KALENDARI · 2026/27" title={<>ÇDO NDESHJE.<br/><em>ÇDO POEN.</em></>}><p className="hero-note">Rezultatet dhe kalendari i Ligës së Dytë.</p></PageHero><section className="matches-section section-pad"><div className="filters" role="group" aria-label="Filtro ndeshjet">{([['all','TË GJITHA'],['final','REZULTATET'],['upcoming','TË ARDHSHMET']] as const).map(([id,label])=><button key={id} className={filter===id?'active':''} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><div className="matches-grid">{visible.map(m=><MatchCard key={m.round} match={m}/>)}</div><p className="data-note">Rezultatet e xhirove 1, 2, 3 dhe 4 janë përfshirë në bilancin e ekipit. <a href={sources.federation} target="_blank" rel="noreferrer">Shiko kalendarin në FBK ↗</a></p></section></main>
}

export function App() {
  const [page,setPage] = useState<Page>(getPage)
  const [theme,setTheme] = useState<'vendas' | 'mysafir'>(() => window.localStorage.getItem('asprishtina-theme') === 'mysafir' ? 'mysafir' : 'vendas')
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem('asprishtina-theme', theme) }, [theme])
  const navigate = (next: Page, path: string) => { window.history.pushState({},'',path); setPage(next); window.scrollTo({top:0,behavior:'smooth'}) }
  useEffect(()=>{ const pop=()=>setPage(getPage()); addEventListener('popstate',pop); return()=>removeEventListener('popstate',pop)},[])
  useEffect(()=>{ document.title = `${nav.find(n=>n[0]===page)?.[1]} — KB AS Prishtina`; const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('in-view')),{threshold:.12}); document.querySelectorAll('.reveal').forEach(el=>observer.observe(el)); return()=>observer.disconnect()},[page])
  const content = useMemo(()=> page==='home'?<Home go={navigate}/>:page==='standings'?<Standings/>:page==='roster'?<Roster/>:<Matches/>,[page])
  return <div className="app"><Header page={page} navigate={navigate} theme={theme} setTheme={setTheme}/>{content}<Footer navigate={navigate}/></div>
}
