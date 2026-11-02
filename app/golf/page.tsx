'use client'
import {useMemo,useState} from 'react'

const oct28=[
 {club:'10i / Approach',shots:6,carry:108},{club:'PW',shots:5,carry:121},{club:'9i',shots:7,carry:129},{club:'8i',shots:7,carry:145},{club:'7i',shots:7,carry:151},{club:'6i',shots:9,carry:181},{club:'5i',shots:6,carry:183},{club:'4H',shots:7,carry:208},{club:'3H',shots:8,carry:207}
]
const oct29=[
 {club:'Driver',carry:'200–230',total:'235–269',speed:'up to 145',best:'269 total'},
 {club:'3W',carry:'205–230',total:'217–266',speed:'up to 146',best:'230 carry / 266 total'},
 {club:'5W',carry:'191–217',total:'195–240',speed:'129–140',best:'217 carry / 233 total'},
 {club:'4H',carry:'182–210',total:'190–229',speed:'122–138',best:'210 carry / 226 total'},
 {club:'7i',carry:'~150–184',total:'~158–192',speed:'up to 125',best:'184 carry / 192 total'},
 {club:'8i',carry:'135–158',total:'139–164',speed:'99–113',best:'158 carry / 164 total'},
 {club:'9i',carry:'116–149',total:'120–151',speed:'89–110',best:'149 carry / 151 total'},
 {club:'10i / Approach',carry:'97–113',total:'99–115',speed:'78–88',best:'tight 103–106 carry cluster'},
 {club:'LW',carry:'68–107',total:'69–108',speed:'64–84',best:'32–46° visible launch window'}
]
const equipment=[['Driver','TaylorMade M5','10.5°'],['3W','TaylorMade M5/M6 Titanium','15°'],['5W','TaylorMade M5/M6 Titanium','19°'],['3H','TaylorMade M6 Rescue','19°'],['4H','TaylorMade M6 Rescue','22°'],['Irons','TaylorMade M5 / SIM identification conflict','4i–PW + approach'],['Wedges','TaylorMade Hi-Toe / Milled Grind','50° / 56° / 60°'],['Putter','Nike Method Core Drone BC 002','Mallet']]
const blue='#3b82f6',border='#262b33',muted='#9299a6',panel='#101318',soft='#151922'
const card={padding:20,border:`1px solid ${border}`,borderRadius:16,background:panel}
const tabs=['Overview','Bag','Sessions','Analysis'] as const
type Tab=typeof tabs[number]

function Panel({title,children,sub}:{title:string,children:React.ReactNode,sub?:string}){return <section style={{...card}}><h3 style={{margin:'0 0 5px',fontSize:19}}>{title}</h3>{sub&&<p style={{margin:'0 0 18px',color:muted,fontSize:13,lineHeight:1.45}}>{sub}</p>}{children}</section>}
function EmptyViz({children}:{children:React.ReactNode}){return <div style={{minHeight:190,border:`1px dashed ${border}`,borderRadius:12,display:'grid',placeItems:'center',padding:24,textAlign:'center',color:muted,background:'#0b0d11'}}>{children}</div>}

export default function GolfPage(){
 const [tab,setTab]=useState<Tab>('Overview'); const [day,setDay]=useState<'2026-10-29'|'2026-10-28'>('2026-10-29'); const [club,setClub]=useState('7i'); const [showShots,setShowShots]=useState(false)
 const total=oct28.reduce((n,c)=>n+c.shots,0), max=Math.max(...oct28.map(c=>c.carry))
 const gaps=useMemo(()=>oct28.map((c,i)=>({...c,gap:i?c.carry-oct28[i-1].carry:null})),[])
 const selected=oct29.find(x=>x.club===club) || oct29[4]
 return <main style={{minHeight:'100vh',background:'#050607',color:'#f7f8fa',fontFamily:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}><div style={{maxWidth:1180,margin:'0 auto',padding:'52px 20px 96px'}}>
  <p style={{letterSpacing:2.2,textTransform:'uppercase',color:blue,fontWeight:700,fontSize:13}}>atteres.io / golf</p>
  <h1 style={{fontSize:'clamp(40px,7vw,72px)',lineHeight:1,margin:'10px 0 16px',letterSpacing:'-.045em',fontWeight:800}}>Golf Performance <span style={{color:blue}}>&</span> Data</h1>
  <p style={{fontSize:19,color:muted,maxWidth:850,lineHeight:1.6}}>A personal Toptracer analytics dashboard for distance, gapping, dispersion, shot shape, trajectory and progress over time.</p>
  <nav style={{display:'flex',gap:8,flexWrap:'wrap',margin:'28px 0 30px'}}>{tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{border:`1px solid ${tab===t?blue:border}`,background:tab===t?'#102344':panel,color:tab===t?'#fff':'#b7bdc8',padding:'10px 16px',borderRadius:999,fontWeight:750,cursor:'pointer'}}>{t}</button>)}</nav>

  {tab==='Overview'&&<div style={{display:'grid',gap:18}}>
   <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:10}}>{[['74.6','Golf Index'],['269 yd','best visible total'],['146 mph','peak visible speed'],[total,'Oct. 28 measured shots']].map(([v,l])=><div key={String(l)} style={card}><div style={{fontSize:30,fontWeight:800,color:blue}}>{v}</div><div style={{color:muted,fontSize:14,marginTop:3}}>{l}</div></div>)}</section>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(310px,1fr))',gap:18}}>
    <Panel title="William Golf Index" sub="Prototype personal score. It will become data-driven as shot-level history grows."><div style={{fontSize:52,fontWeight:850}}>74.6 <span style={{fontSize:16,color:'#8dd7a5'}}>↑ 3.8</span></div>{[['Distance',82],['Accuracy',68],['Consistency',71],['Flight',77]].map(([n,v])=><div key={String(n)} style={{display:'grid',gridTemplateColumns:'95px 1fr 35px',gap:10,alignItems:'center',marginTop:10,fontSize:13}}><span>{n}</span><div style={{height:8,background:soft,borderRadius:99}}><div style={{width:`${v}%`,height:'100%',background:blue,borderRadius:99}}/></div><b>{v}</b></div>)}</Panel>
    <Panel title="Latest session findings" sub="October 29, 2026"><p><b style={{color:blue}}>Top-end overlap:</b> 3W reached 230 carry / 266 total / 146 mph, essentially matching the stronger driver results.</p><p><b style={{color:blue}}>Scoring control:</b> 10i / Approach shows a tight visible 103–106 yd carry cluster.</p><p><b style={{color:blue}}>Focus:</b> create driver/3W separation and tighten iron strike consistency.</p></Panel>
   </div>
   <Panel title="Bag fingerprint" sub="Current performance profile. Exact dispersion, launch and consistency fields populate when those shot-level measurements are available."><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',minWidth:700}}><thead><tr style={{color:blue}}><th align="left">Club</th><th>Carry</th><th>Total</th><th>Speed</th><th>Dispersion</th><th>Launch</th></tr></thead><tbody>{oct29.map(r=><tr key={r.club} style={{borderTop:`1px solid ${border}`}}><td style={{padding:12}}><b>{r.club}</b></td><td align="center">{r.carry}</td><td align="center">{r.total}</td><td align="center">{r.speed}</td><td align="center" style={{color:muted}}>—</td><td align="center" style={{color:muted}}>{r.club==='LW'?'32–46° visible':'—'}</td></tr>)}</tbody></table></div></Panel>
  </div>}

  {tab==='Bag'&&<div style={{display:'grid',gap:18}}>
   <Panel title="Bag distance map" sub="October 28 measured carry baseline"><div style={{display:'grid',gap:12}}>{[...oct28].reverse().map(c=><div key={c.club} style={{display:'grid',gridTemplateColumns:'110px 1fr 80px',gap:12,alignItems:'center'}}><b>{c.club}</b><div style={{height:24,borderRadius:99,background:soft,overflow:'hidden'}}><div style={{height:'100%',width:`${c.carry/max*100}%`,background:blue}}/></div><span><b style={{color:blue}}>{c.carry}</b> yd</span></div>)}</div></Panel>
   <Panel title="Gapping analysis" sub="Large jumps are easy to spot; near-overlaps identify clubs that may need more data or fitting review."><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{color:blue}}><th align="left">Club</th><th>Shots</th><th>Avg carry</th><th>Gap</th></tr></thead><tbody>{gaps.map(c=><tr key={c.club} style={{borderTop:`1px solid ${border}`}}><td style={{padding:12}}><b>{c.club}</b></td><td align="center">{c.shots}</td><td align="center">{c.carry} yd</td><td align="center" style={{color:c.gap!==null&&Math.abs(c.gap)>=20?'#f2b96b':'inherit'}}>{c.gap===null?'—':`${c.gap>=0?'+':''}${c.gap} yd`}</td></tr>)}</tbody></table></div></Panel>
   <Panel title="Equipment"><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',minWidth:650}}><tbody>{equipment.map((r,i)=><tr key={i} style={{borderTop:i?`1px solid ${border}`:'none'}}>{r.map((x,j)=><td key={j} style={{padding:13,fontWeight:j===0?700:400,color:j===0?'#fff':'#c5cad3'}}>{x}</td>)}</tr>)}</tbody></table></div></Panel>
  </div>}

  {tab==='Sessions'&&<div style={{display:'grid',gap:18}}>
   <section style={{...card,display:'flex',gap:18,alignItems:'center',flexWrap:'wrap'}}><div><div style={{fontSize:12,textTransform:'uppercase',letterSpacing:1.5,color:muted,marginBottom:7}}>Range day</div><select value={day} onChange={e=>setDay(e.target.value as any)} style={{background:soft,color:'#fff',border:`1px solid ${border}`,borderRadius:10,padding:'11px 38px 11px 13px',fontSize:16,fontWeight:700}}><option value="2026-10-29">October 29, 2026</option><option value="2026-10-28">October 28, 2026</option></select></div><div style={{color:'#c5cad3'}}>{day==='2026-10-29'?'Visible shot ranges recovered from Toptracer screenshots.':'62-shot measured carry baseline across nine clubs.'}</div></section>
   {day==='2026-10-29'?<Panel title="October 29 — Toptracer data"><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',minWidth:800}}><thead><tr style={{color:blue}}><th align="left">Club</th><th>Carry</th><th>Total</th><th>Ball speed</th><th align="left">Best / note</th></tr></thead><tbody>{oct29.map(r=><tr key={r.club} style={{borderTop:`1px solid ${border}`}}><td style={{padding:13}}><b>{r.club}</b></td><td align="center">{r.carry} yd</td><td align="center">{r.total} yd</td><td align="center">{r.speed} mph</td><td style={{padding:13,color:'#c5cad3'}}>{r.best}</td></tr>)}</tbody></table></div></Panel>:<Panel title="October 28 — measured baseline"><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><tbody>{oct28.map(r=><tr key={r.club} style={{borderTop:`1px solid ${border}`}}><td style={{padding:12}}><b>{r.club}</b></td><td>{r.shots} shots</td><td><b style={{color:blue}}>{r.carry} yd</b> avg carry</td></tr>)}</tbody></table></div></Panel>}
   <Panel title="Session comparison" sub="Direct metric-to-metric comparisons will fill automatically where both sessions contain the same measured fields."><EmptyViz>October 28 contains measured averages while October 29 currently contains recovered visible ranges. The dashboard preserves that distinction instead of inventing comparable averages.</EmptyViz></Panel>
  </div>}

  {tab==='Analysis'&&<div style={{display:'grid',gap:18}}>
   <section style={{...card,display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}><b>Analyze club</b><select value={club} onChange={e=>setClub(e.target.value)} style={{background:soft,color:'#fff',border:`1px solid ${border}`,borderRadius:10,padding:'10px 34px 10px 12px'}}>{oct29.map(r=><option key={r.club}>{r.club}</option>)}</select><span style={{color:muted}}>Visible carry {selected.carry} yd · speed {selected.speed} mph</span></section>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(330px,1fr))',gap:18}}>
    <Panel title="True dispersion ellipse" sub="Shot dots + 50% and 80% dispersion envelopes"><EmptyViz>Ready for shot-level offline + carry coordinates.<br/>Target line and average landing point will overlay automatically.</EmptyViz></Panel>
    <Panel title="Shot-pattern heatmap" sub="Density view of directional and distance tendencies"><EmptyViz>Heatmap activates when individual landing coordinates are available.</EmptyViz></Panel>
    <Panel title="Carry vs offline" sub="Each shot becomes one point"><EmptyViz>Scatter view reserved for carry + offline pairs.</EmptyViz></Panel>
    <Panel title="Left / right miss profile" sub="Left · center · right percentages"><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,alignItems:'end',height:170}}>{['LEFT','CENTER','RIGHT'].map((x,i)=><div key={x} style={{textAlign:'center'}}><div style={{height:[54,110,38][i],background:soft,border:`1px solid ${border}`,borderRadius:'8px 8px 2px 2px'}}/><small style={{color:muted}}>{x}<br/>awaiting data</small></div>)}</div></Panel>
    <Panel title="Shot-shape analyzer" sub="Pull · draw · straight · fade · push"><EmptyViz>Curve + offline data will classify each shot and reveal your dominant pattern.</EmptyViz></Panel>
    <Panel title="Ball-speed efficiency" sub="Carry ÷ ball speed, tracked as a personal comparison metric"><EmptyViz>Scatter plot activates when individual carry and ball-speed readings are paired.</EmptyViz></Panel>
    <Panel title="Launch window" sub="Ball speed vs launch angle"><EmptyViz>Personal launch windows will be learned from your own history rather than generic targets.</EmptyViz></Panel>
    <Panel title="Trajectory profile" sub="Current shot · club average · best shot · previous session"><div style={{height:210,position:'relative',overflow:'hidden',border:`1px solid ${border}`,borderRadius:12,background:'#0b0d11'}}><div style={{position:'absolute',left:'5%',right:'5%',bottom:28,borderTop:`1px solid ${border}`}}/><div style={{position:'absolute',left:'9%',bottom:30,width:'78%',height:'62%',borderTop:`2px solid ${blue}`,borderRadius:'50% 50% 0 0',transform:'rotate(-3deg)'}}/><span style={{position:'absolute',left:16,bottom:8,color:muted,fontSize:12}}>BALL</span><span style={{position:'absolute',right:16,bottom:8,color:muted,fontSize:12}}>LANDING</span><span style={{position:'absolute',left:'47%',top:22,color:muted,fontSize:12}}>APEX</span></div></Panel>
   </div>
   <Panel title="Improvement over time" sub="Carry · speed · offline · dispersion · launch · apex · consistency"><EmptyViz>Longitudinal trend lines will grow as additional dated sessions are added.</EmptyViz></Panel>
   <Panel title="Individual shots" sub="Kept collapsed to preserve the clean dashboard layout"><button onClick={()=>setShowShots(!showShots)} style={{background:soft,color:'#fff',border:`1px solid ${border}`,borderRadius:9,padding:'10px 14px',cursor:'pointer',fontWeight:700}}>{showShots?'Hide shots':'Show shots'}</button>{showShots&&<div style={{marginTop:14,color:muted}}>Shot-level rows will appear here as exact Toptracer readings are added. Current recovered data is stored as ranges and summaries, so no individual readings are fabricated.</div>}</Panel>
  </div>}
  <p style={{marginTop:44,color:muted,fontSize:14}}>Canonical golf performance record · Analytics expansion added November 1, 2026 · Unavailable shot-level values are intentionally left unfilled.</p>
 </div></main>
}