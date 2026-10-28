const clubs = [
  { club: "10-iron", shots: 6, carry: 108 },
  { club: "Pitching wedge", shots: 5, carry: 121 },
  { club: "9-iron", shots: 7, carry: 129 },
  { club: "8-iron", shots: 7, carry: 145 },
  { club: "7-iron", shots: 7, carry: 151 },
  { club: "6-iron", shots: 9, carry: 181 },
  { club: "5-iron", shots: 6, carry: 183 },
  { club: "4-hybrid", shots: 7, carry: 208 },
  { club: "3-hybrid", shots: 8, carry: 207 },
]

const bag = [
  { club: "Driver", model: "TaylorMade M5", loft: "10.5°", measured: null },
  { club: "3-wood", model: "TaylorMade M6 Titanium", loft: "15°", measured: null },
  { club: "5-wood", model: "TaylorMade M6 Titanium", loft: "19°", measured: null },
  { club: "3-hybrid", model: "TaylorMade M6 Rescue", loft: "", measured: 207 },
  { club: "4-hybrid", model: "TaylorMade M6 Rescue", loft: "", measured: 208 },
  { club: "5-iron", model: "TaylorMade SIM", loft: "", measured: 183 },
  { club: "6-iron", model: "TaylorMade SIM", loft: "", measured: 181 },
  { club: "7-iron", model: "TaylorMade SIM", loft: "", measured: 151 },
  { club: "8-iron", model: "TaylorMade SIM", loft: "", measured: 145 },
  { club: "9-iron", model: "TaylorMade SIM", loft: "", measured: 129 },
  { club: "Pitching wedge", model: "TaylorMade SIM", loft: "", measured: 121 },
  { club: "10-iron / Approach", model: "TaylorMade SIM", loft: "", measured: 108 },
  { club: "Wedge", model: "TaylorMade Hi-Toe", loft: "52°", measured: null },
  { club: "Wedge", model: "TaylorMade Milled Grind", loft: "56°", measured: null },
  { club: "Wedge", model: "TaylorMade Hi-Toe", loft: "60°", measured: null },
]

const hybrid3 = [
  { carry: 219, total: 247, speed: 141, launch: 12, apex: 66 },
  { carry: 201, total: 224, speed: 139, launch: 8, apex: 60 },
  { carry: 202, total: 223, speed: 130, launch: 13, apex: 70 },
  { carry: 222, total: 241, speed: 142, launch: 11, apex: 75 },
  { carry: 206, total: 236, speed: 135, launch: 11, apex: 54 },
  { carry: 207, total: 224, speed: 134, launch: 12, apex: 75 },
  { carry: 200, total: 213, speed: 136, launch: 11, apex: 80 },
]

export default function GolfPage() {
  const max = Math.max(...clubs.map((c) => c.carry))
  const totalShots = clubs.reduce((n, c) => n + c.shots, 0)
  return (
    <main style={{maxWidth:1100,margin:"0 auto",padding:"48px 20px 80px",fontFamily:"system-ui, sans-serif"}}>
      <p style={{letterSpacing:2,textTransform:"uppercase",opacity:.6}}>atteres.io / golf</p>
      <h1 style={{fontSize:"clamp(38px,7vw,72px)",margin:"8px 0"}}>Golf Data</h1>
      <p style={{fontSize:20,opacity:.7}}>Toptracer session · Oct. 28, 2026 · {totalShots} measured shots</p>

      <section style={{marginTop:48}}>
        <h2>Measured average flat carry</h2>
        <div style={{display:"grid",gap:12,marginTop:20}}>
          {[...clubs].reverse().map(c => <div key={c.club} style={{display:"grid",gridTemplateColumns:"120px 1fr 80px",gap:12,alignItems:"center"}}>
            <strong>{c.club}</strong><div style={{background:"rgba(127,127,127,.15)",borderRadius:99,overflow:"hidden",height:28}}><div style={{width:`${c.carry/max*100}%`,height:"100%",background:"currentColor",opacity:.75}} /></div><span><b>{c.carry}</b> yd</span>
          </div>)}
        </div>
      </section>

      <section style={{marginTop:56,overflowX:"auto"}}><h2>Bag gapping</h2><table style={{width:"100%",borderCollapse:"collapse",fontSize:17}}><thead><tr><th align="left">Club</th><th>Shots</th><th>Avg carry</th><th>Gap</th></tr></thead><tbody>{clubs.map((c,i)=><tr key={c.club} style={{borderTop:"1px solid rgba(127,127,127,.25)"}}><td style={{padding:"14px 4px"}}>{c.club}</td><td align="center">{c.shots}</td><td align="center"><b>{c.carry} yd</b></td><td align="center">{i ? `${c.carry-clubs[i-1].carry > 0 ? "+" : ""}${c.carry-clubs[i-1].carry}` : "—"}</td></tr>)}</tbody></table></section>

      <section style={{marginTop:56,overflowX:"auto"}}><h2>Current bag</h2><p style={{opacity:.7}}>Previously identified club inventory. A dash means no reliable measured carry has been saved yet.</p><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th align="left">Club</th><th align="left">Model</th><th>Loft</th><th>Measured carry</th></tr></thead><tbody>{bag.map((c,i)=><tr key={`${c.club}-${i}`} style={{borderTop:"1px solid rgba(127,127,127,.25)"}}><td style={{padding:"13px 4px"}}><b>{c.club}</b></td><td>{c.model}</td><td align="center">{c.loft || "—"}</td><td align="center">{c.measured ? `${c.measured} yd` : "—"}</td></tr>)}</tbody></table></section>

      <section style={{marginTop:56}}><h2>3-hybrid individual shots</h2><p style={{opacity:.7}}>Readable individual values retained from the supplied Toptracer screens. Unreadable values are not invented.</p><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th>Carry</th><th>Total</th><th>Ball speed</th><th>Launch</th><th>Apex</th></tr></thead><tbody>{hybrid3.map((s,i)=><tr key={i} style={{borderTop:"1px solid rgba(127,127,127,.25)"}}><td align="center">{s.carry} yd</td><td align="center">{s.total} yd</td><td align="center">{s.speed} mph</td><td align="center">{s.launch}°</td><td align="center">{s.apex} ft</td></tr>)}</tbody></table></div></section>

      <section style={{marginTop:56,padding:24,border:"1px solid rgba(127,127,127,.3)",borderRadius:20}}><h2 style={{marginTop:0}}>What the data says</h2><p><b>Top-end overlap:</b> 4-hybrid averages 208 yd and 3-hybrid 207 yd, so they currently occupy essentially the same distance window.</p><p><b>Iron gaps:</b> 7i → 6i jumps 30 yd, while 6i → 5i is only 2 yd. These are the clearest areas to retest.</p><p><b>Speed:</b> recorded 3-hybrid shots reached 142 mph ball speed and 222 yd carry. Strike and launch consistency are useful metrics to track as the dataset grows.</p></section>
      <p style={{marginTop:40,opacity:.5}}>Data retained from prior golf inventory and Toptracer screenshots. Measured values are shown only where they were previously recorded clearly.</p>
    </main>
  )
}
