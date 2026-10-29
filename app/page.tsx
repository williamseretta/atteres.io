import type { Metadata } from 'next'
import styles from './home.module.css'
export const metadata: Metadata = {title:'Atteres — William Baird Seretta',description:'Golf, daytrade, The Manic Moose, and projects. A home for the things I’m into.'}
const destinations = [
  {number:'01',title:'Golf',description:'The game. The gear. The next round.',href:'/golf',icon:'⚑'},
  {number:'02',title:'Daytrade',description:'Markets, mindset, and discipline.',href:'/daytrade',icon:'↗'},
  {number:'03',title:'The Manic Moose',description:'A space for ideas and expression.',href:'/manic-moose',icon:'moose'},
  {number:'04',title:'Projects',description:'Things I’m building and exploring.',href:'/projects',icon:'+'},
]
export default function Home(){return <div className={styles.home}>
  <header className={styles.header}><a href="/" className={styles.wordmark}>atteres<span>.</span></a><span className={styles.name}>WILLIAM BAIRD SERETTA</span><a href="#explore" className={styles.toplink}>Explore <span>↘</span></a></header>
  <main><section className={styles.hero}><div className={styles.intro}><p className={styles.eyebrow}><span/> A PERSONAL CORNER OF THE INTERNET</p><h1>A few interests.<br/>One home<span>.</span></h1><p className={styles.subtitle}>A place for what moves me.<br/>On the course, in the markets, and somewhere new.</p><a href="#explore" className={styles.explore}>Find your way <span>↓</span></a></div><div className={styles.art}><img src="/brand/wbs-green.jpg" alt="William Baird Seretta — white WBS monogram on forest green" width="1774" height="887"/><div className={styles.caption}><span>WBS / ATTERES.IO</span><span>ALWAYS EXPLORING ↗</span></div></div></section>
  <section id="explore" className={styles.destinations} aria-label="Explore Atteres"><div className={styles.sectionLabel}><span>FOUR WAYS IN</span><span>FOLLOW YOUR CURIOSITY</span></div><div className={styles.grid}>{destinations.map(d=><a className={styles.card} href={d.href} key={d.title}><div className={styles.cardTop}><span>{d.number}</span>{d.icon==='moose'?<img src="/brand/manic-moose.jpeg" alt="" width="48" height="48"/>:<span className={styles.symbol} aria-hidden="true">{d.icon}</span>}</div><div><h2>{d.title}</h2><p>{d.description}</p></div><span className={styles.arrow} aria-hidden="true">↗</span></a>)}</div></section></main>
  <footer className={styles.footer}><span>© {new Date().getFullYear()} ATTERES</span><span>A LITTLE FOCUS. A LOT OF CURIOSITY.</span><a href="#">Back to top ↑</a></footer>
</div>}
