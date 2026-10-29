'use client'
import {useState} from 'react'

const sessions={
 '2026-10-29':{
  label:'October 29, 2026',kind:'Visible shot ranges',summary:'Recovered from the October 29 Toptracer screenshots. This dataset is kept separate from October 28.',
  rows:[
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
 },
 '2026-10-28':{
  label:'October 28, 2026',kind:'Measured session averages',summary:'62-shot Toptracer session across nine clubs.',
  rows:[
   {club:'10i / Approach',shots:6,carry:108},{club:'PW',shots:5,carry:121},{club:'9i',shots:7,carry:129},{club:'8i',shots:7,carry:145},{club:'7i',shots:7,carry:151},{club:'6i',shots:9,carry:181},{club:'5i',shots:6,carry:183},{club:'4H',shots:7,carry:208},{club:'3H',shots:8,carry:207}
  ]
 }
} as const
const equipment=[['Driver','TaylorMade M5','10.5°'],['3W','TaylorMade M5/M6 Titanium','15°'],['5W','TaylorMade M5/M6 Titanium','19°'],['3H','TaylorMade M6 Rescue','19°'],['4H','TaylorMade M6 Rescue','22°'],['Irons','TaylorMade M5 / SIM identification conflict','4i–PW + approach'],['Wedges','TaylorMade Hi-Toe / Milled Grind','50° / 56° / 60°'],['Putter','Nike Method Core Drone BC 002','Mallet']]
const blue='#3b82f6',border='#262b33',muted='#9299a6',panel='#101318',soft='#151922'
const card={padding:20,border:`1px solid ${border}`,borderRadius:16,background:panel}
export default function GolfPage(){
 const [day,setDay]=useState<keyof typeof sessions>('2026-10-29'); const s=sessions[day]; const is29=day==='2026-10-29';
 const oct28=sessions['2026-10-28'].rows; const max=Math.max(...oct28.map(c=>Number(c.carry))); const total=oct28.reduce((n,c)=>n+Number(c.shots),0)
 return <main style={{minHeight:'100vh',background:'#050607',color:'#f7f8fa',fontFamily:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}><div style={{maxWidth:1180,margin:'0 auto',padding:'52px 20px 96px'}}>
  <p style={{letterSpacing:2.2,textTransform:'uppercase',color:blue,fontWeight:700,fontSize:13}}>atteres.io / golf</p>
  <h1 style={{fontSize:'clamp(40px,7vw,72px)',lineHeight:1,margin:'10px 0 16px',letterSpacing:'-.045em',fontWeight:800}}>Golf Performance <span style={{color:blue}}>&</span> Data</h1>
  <p style={{fontSize:19,color:muted,maxWidth:800,lineHeight:1.6}}>Toptracer range sessions organized by date. Choose a range day to view that session by itself.</p>

  <section style={{marginTop:30,...card,display:'flex',gap:18,alignItems:'center',flexWrap:'wrap'}}><div><div style={{fontSize:12,textTransform:'uppercase',letterSpacing:1.5,color:muted,marginBottom:7}}>Range day</div><select value={day} onChange={e=>setDay(e.target.value as keyof typeof sessions)} style={{background:soft,color:'#fff',border:`1px solid ${border}`,borderRadius:10,padding:'11px 38px 11px 13px',fontSize:16,fontWeight:700}}><option value="2026-10-29">October 29, 2026</option><option value="2026-10-28">October 28, 2026</option></select></div><div style={{color:'#c5cad3',flex:'1 1 360px'}}><b style={{color:blue}}>{s.kind}</b><br/>{s.summary}</div></section>

  {is29?<><section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10,marginTop:24}}>{[['Oct. 29','selected session'],[146,'peak visible mph'],[269,'best visible total yd'],[230,'best visible 3W carry']].map(([v,l])=><div key={String(l)} style={card}><div style={{fontSize:30,fontWeight:800,color:blue}}>{v}</div><div style={{color:muted,fontSize:14,marginTop:3}}>{l}</div></div>)}</section>
  <section style={{marginTop:44}}><h2>October 29 — Toptracer data</h2><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',minWidth:800}}><thead><tr style={{color:blue}}><th align="left">Club</th><th>Carry</th><th>Total</th><th>Ball speed</th><th align="left">Best / note</th></tr></thead><tbody>{sessions['2026-10-29'].rows.map(r=><tr key={r.club} style={{borderTop:`1px solid ${border}`}}><td style={{padding:13}}><b>{r.club}</b></td><td align="center">{r.carry} yd</td><td align="center">{r.total} yd</td><td align="center">{r.speed} mph</td><td style={{padding:13,color:'#c5cad3'}}>{r.best}</td></tr>)}</tbody></table></div></section>
  <section style={{marginTop:36,padding:24,border:'1px solid #244d87',borderRadius:16,background:'#0c1420'}}><h2 style={{marginTop:0}}>October 29 findings</h2><p><b style={{color:blue}}>Top-end overlap:</b> 3W reached 230 carry / 266 total / 146 mph, essentially matching the better driver results. Driver reached about 145 mph ball speed and 269 yd total.</p><p><b style={{color:blue}}>Scoring-club control:</b> the 10i / Approach data shows a notably tighter window around 103–106 yd carry.</p><p><b style={{color:blue}}>Main opportunity:</b> create more separation between driver and 3W while tightening strike consistency through the irons.</p></section></>:
  <><section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10,marginTop:24}}>{[['Oct. 28','selected session'],[total,'measured shots'],[208,'best avg carry yd'],[9,'clubs measured']].map(([v,l])=><div key={String(l)} style={card}><div style={{fontSize:30,fontWeight:800,color:blue}}>{v}</div><div style={{color:muted,fontSize:14,marginTop:3}}>{l}</div></div>)}</section>
  <section style={{marginTop:44}}><h2>October 28 — measured carry baseline</h2><div style={{display:'grid',gap:12}}>{[...oct28].reverse().map(c=><div key={c.club} style={{display:'grid',gridTemplateColumns:'110px 1fr 80px',gap:12,alignItems:'center'}}><b>{c.club}</b><div style={{height:24,borderRadius:99,background:soft,overflow:'hidden'}}><div style={{height:'100%',width:`${Number(c.carry)/max*100}%`,background:blue}}/></div><span><b style={{color:blue}}>{c.carry}</b> yd</span></div>)}</div></section>
  <section style={{marginTop:44,overflowX:'auto'}}><h2>October 28 gapping & sample size</h2><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{color:blue}}><th align="left">Club</th><th>Shots</th><th>Avg carry</th><th>Gap</th></tr></thead><tbody>{oct28.map((c,i)=><tr key={c.club} style={{borderTop:`1px solid ${border}`}}><td style={{padding:12}}><b>{c.club}</b></td><td align="center">{c.shots}</td><td align="center"><b>{c.carry}</b> yd</td><td align="center">{i?`${Number(c.carry)-Number(oct28[i-1].carry)>=0?'+':''}${Number(c.carry)-Number(oct28[i-1].carry)} yd`:'—'}</td></tr>)}</tbody></table></section></>}

  <section style={{marginTop:54,overflowX:'auto'}}><h2>Bag snapshot</h2><table style={{width:'100%',borderCollapse:'collapse',minWidth:650}}><thead><tr style={{color:blue}}><th align="left">Club</th><th align="left">Model</th><th align="left">Loft / type</th></tr></thead><tbody>{equipment.map((r,i)=><tr key={i} style={{borderTop:`1px solid ${border}`}}>{r.map((x,j)=><td key={j} style={{padding:13,fontWeight:j===0?700:400,color:j===0?'#fff':'#c5cad3'}}>{x}</td>)}</tr>)}</tbody></table></section>
  <p style={{marginTop:44,color:muted,fontSize:14}}>Canonical golf performance record · Range-day selector added October 29, 2026</p>
 </div></main>
}