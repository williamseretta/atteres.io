const clubs = [
  { club: "10i / Approach", shots: 6, carry: 108 }, { club: "PW", shots: 5, carry: 121 },
  { club: "9i", shots: 7, carry: 129 }, { club: "8i", shots: 7, carry: 145 },
  { club: "7i", shots: 7, carry: 151 }, { club: "6i", shots: 9, carry: 181 },
  { club: "5i", shots: 6, carry: 183 }, { club: "4H", shots: 7, carry: 208 },
  { club: "3H", shots: 8, carry: 207 },
]
const bag = [
  ["Driver","TaylorMade M5","10.5°"],["3W","TaylorMade M6 Titanium","15°"],["5W","TaylorMade M6 Titanium","19°"],
  ["3H","TaylorMade M6 Rescue",""],["4H","TaylorMade M6 Rescue",""],
  ["5i–Approach","TaylorMade irons","model identification varies in prior photos",""],
  ["Wedge","TaylorMade Hi-Toe","52°"],["Wedge","TaylorMade Milled Grind","56°"],["Wedge","TaylorMade Hi-Toe","60°"],
  ["Putter","Nike Method Core Drone BC 002",""],["Bag","Bag Boy stand bag / IDS",""],
]
const hybrid3 = [
  [219,247,141,12,66],[201,224,139,8,60],[202,223,130,13,70],[222,241,142,11,75],[206,236,135,11,54],[207,224,134,12,75],[200,213,136,11,80]
]
const hybrid4 = [
  [196,211,138,8,67],[215,227,140,14,106],[193,227,142,4,37],[214,235,138,13,73],[217,231,140,12,88],[214,226,137,14,97],[205,222,141,7,64]
]
const iron5 = [
  [192,204,125,17,85],[187,202,124,16,74],[202,217,129,15,83],[187,206,123,15,65],[165,174,120,16,75]
]
const driverBaseline = {carry:194,total:220,speed:139,launch:13,apex:67,landing:31,curve:"7 ft right",offline:"2 yd left"}

function ShotTable({title, data}:{title:string,data:number[][]}) { return <section style={{marginTop:42}}><h3>{title}</h3><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th>Carry</th><th>Total</th><th>Ball speed</th><th>Launch</th><th>Apex</th></tr></thead><tbody>{data.map((s,i)=><tr key={i} style={{borderTop:"1px solid rgba(127,127,127,.25)"}}>{s.map((v,j)=><td key={j} align="center" style={{padding:10}}>{v}{j<2?" yd":j===2?" mph":j===3?"°":" ft"}</td>)}</tr>)}</tbody></table></div></section> }

export default function GolfPage(){
 const max=Math.max(...clubs.map(c=>c.carry)); const totalShots=clubs.reduce((n,c)=>n+c.shots,0)
 return <main style={{maxWidth:1100,margin:"0 auto",padding:"48px 20px 80px",fontFamily:"system-ui,sans-serif"}}>
  <p style={{letterSpacing:2,textTransform:"uppercase",opacity:.6}}>atteres.io / golf</p><h1 style={{fontSize:"clamp(40px,7vw,72px)",margin:"8px 0"}}>Golf Performance</h1>
  <p style={{fontSize:20,opacity:.7}}>Consolidated golf dataset · equipment, Toptracer sessions and individual shots</p>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginTop:36}}>{[[totalShots,"Toptracer shots"],[9,"clubs measured"],[222,"best saved 3H carry"],[142,"peak saved hybrid speed"]].map(([v,l])=><div key={l} style={{padding:20,border:"1px solid rgba(127,127,127,.3)",borderRadius:18}}><div style={{fontSize:32,fontWeight:700}}>{v}</div><div style={{opacity:.65}}>{l}</div></div>)}</section>
  <section style={{marginTop:50}}><h2>Carry map</h2><p style={{opacity:.65}}>Oct. 28, 2026 Toptracer session averages.</p><div style={{display:"grid",gap:12}}>{[...clubs].reverse().map(c=><div key={c.club} style={{display:"grid",gridTemplateColumns:"90px 1fr 80px",gap:12,alignItems:"center"}}><b>{c.club}</b><div style={{height:28,borderRadius:99,background:"rgba(127,127,127,.15)",overflow:"hidden"}}><div style={{height:"100%",width:`${c.carry/max*100}%`,background:"currentColor",opacity:.72}}/></div><span><b>{c.carry}</b> yd</span></div>)}</div></section>
  <section style={{marginTop:50,overflowX:"auto"}}><h2>Gapping & sample size</h2><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th align="left">Club</th><th>Shots</th><th>Avg carry</th><th>Gap</th></tr></thead><tbody>{clubs.map((c,i)=><tr key={c.club} style={{borderTop:"1px solid rgba(127,127,127,.25)"}}><td style={{padding:12}}><b>{c.club}</b></td><td align="center">{c.shots}</td><td align="center">{c.carry} yd</td><td align="center">{i?`${c.carry-clubs[i-1].carry>=0?"+":""}${c.carry-clubs[i-1].carry} yd`:"—"}</td></tr>)}</tbody></table></section>
  <section style={{marginTop:50}}><h2>Driver baseline</h2><p><b>{driverBaseline.carry} yd carry · {driverBaseline.total} yd total · {driverBaseline.speed} mph ball speed</b></p><p style={{opacity:.72}}>Launch {driverBaseline.launch}° · Apex {driverBaseline.apex} ft · Landing {driverBaseline.landing}° · Curve {driverBaseline.curve} · Offline {driverBaseline.offline}</p></section>
  <section style={{marginTop:50}}><h2>Recovered individual shots</h2><p style={{opacity:.65}}>Only values that were readable and retained from uploaded Toptracer screens are included. Session averages above remain authoritative for the complete 62-shot session.</p><ShotTable title="3-hybrid" data={hybrid3}/><ShotTable title="4-hybrid" data={hybrid4}/><ShotTable title="5-iron" data={iron5}/></section>
  <section style={{marginTop:50,overflowX:"auto"}}><h2>Equipment inventory</h2><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th align="left">Club</th><th align="left">Model</th><th align="left">Loft / note</th></tr></thead><tbody>{bag.map((b,i)=><tr key={i} style={{borderTop:"1px solid rgba(127,127,127,.25)"}}><td style={{padding:12}}><b>{b[0]}</b></td><td>{b[1]}</td><td>{b[2]||"—"}</td></tr>)}</tbody></table><p style={{opacity:.6}}>Older photo-based iron identifications conflict (M5/SIM), so the canonical dataset marks the iron model as unverified rather than inventing certainty.</p></section>
  <section style={{marginTop:50,padding:24,border:"1px solid rgba(127,127,127,.3)",borderRadius:20}}><h2 style={{marginTop:0}}>Current findings</h2><p><b>Hybrid overlap:</b> 4H averages 208 yd versus 207 yd for 3H.</p><p><b>Largest iron gap:</b> 7i → 6i is +30 yd.</p><p><b>5i/6i overlap:</b> only +2 yd from 6i to 5i.</p><p><b>4H launch variability:</b> retained shots range from 4° to 14°, indicating substantial delivery/strike variation.</p><p><b>Next priority:</b> repeat sessions to establish stable playing carries and quantify dispersion before changing clubs based on a single session.</p></section>
  <p style={{marginTop:42,opacity:.5}}>Canonical golf page. Raw measured values are separated from derived observations; missing or unreadable values are not fabricated.</p>
 </main>
}
