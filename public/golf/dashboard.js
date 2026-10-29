const response=await fetch('/golf/data.json');
if(!response.ok)throw new Error('Unable to load golf data');
const data=await response.json();
const $=id=>document.getElementById(id);
let selected='4HY',filter='all',unit='yd';
const finite=n=>typeof n==='number'&&Number.isFinite(n);
const factor=()=>unit==='m'?.9144:1;
const distance=n=>finite(n)?Math.round(n*factor()):null;
const fmt=n=>finite(n)?String(Math.round(n)):'—';
const average=(rows,key)=>{const values=rows.map(r=>r[key]).filter(finite);return values.length?values.reduce((a,b)=>a+b,0)/values.length:null;};
const range=(rows,key,convert=false)=>{const v=rows.map(s=>s[key]).filter(finite);return v.length?`${fmt(convert?distance(Math.min(...v)):Math.min(...v))}–${fmt(convert?distance(Math.max(...v)):Math.max(...v))}`:'—';};
const node=(tag,text,className='')=>Object.assign(document.createElement(tag),{textContent:text,className});
function download(content,type,name){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function selectClub(id){selected=id;render();}
function render(){
 $('longest').replaceChildren(document.createTextNode(distance(208)),node('span',unit));$('big-gap').replaceChildren(document.createTextNode(distance(30)),node('span',unit));
 $('axis-mid').textContent=`${distance(120)} ${unit}`;$('axis-max').textContent=`${distance(240)} ${unit}`;
 const chart=$('carry-chart');chart.replaceChildren();
 for(const c of data.clubs.filter(c=>filter==='all'||c.group===filter)){
  const row=node('button','','bar-row');row.setAttribute('aria-pressed',String(c.id===selected));row.setAttribute('aria-label',`${c.name}: ${distance(c.carry)} ${unit} average carry, ${c.count} shots`);
  const track=node('span','','bar-track'),fill=node('span','','bar-fill');fill.style.setProperty('--w',`${c.carry/240*100}%`);track.append(fill);row.append(node('span',c.id,'club-label'),track,node('span',distance(c.carry),'bar-number'));row.onclick=()=>selectClub(c.id);chart.append(row);
 }
 $('gap-carry-head').textContent=`Avg. flat carry (${unit})`;
 $('gap-head').textContent=`Gap (${unit})`;
 const gaps=$('gapping-rows');gaps.replaceChildren();
 data.clubs.forEach((club,i)=>{
  const gap=i?club.carry-data.clubs[i-1].carry:null;
  const finding=gap===null?'Baseline':gap>20?'Large gap · retest':gap<=6?'Overlap / small gap · retest':'—';
  const row=node('tr','',gap!==null&&(gap>20||gap<=6)?'gap-review':'');
  for(const value of [club.id==='10i'?'10i / Approach':club.id,club.count,distance(club.carry),gap===null?'—':`${gap>=0?'+':''}${distance(gap)}`,finding])row.append(node('td',value));
  gaps.append(row);
 });
 const c=data.clubs.find(c=>c.id===selected);$('club-name').textContent=c.name;$('club-type').textContent=c.group==='hybrids'?'HYBRID':c.group==='wedges'?'WEDGE':'IRON';$('club-carry').textContent=distance(c.carry);$('club-unit').textContent=`${unit} average carry`;$('club-count').textContent=`${c.count} session shots`;
 const detail=$('club-detail');detail.replaceChildren();
 const grid=node('div','','club-detail-grid');
 for(const [value,label] of [[range(c.shots,'carry',true),`Recovered carry range (${unit})`],[finite(average(c.shots,'speed'))?`${fmt(average(c.shots,'speed'))} mph`:'—','Avg. available ball speed'],[range(c.shots,'launch')==='—'?'—':`${range(c.shots,'launch')}°`,'Available launch range'],[finite(average(c.shots,'apex'))?`${fmt(average(c.shots,'apex'))} ft`:'—','Avg. available apex']]){const cell=node('div','');cell.append(node('strong',value),node('small',label));grid.append(cell);}detail.append(grid);
 detail.append(node('p',`${c.shots.length} of ${c.count} carry records recovered. Other metrics may be partial; — means unavailable.`,'spotlight-note'));
 $('shot-club').value=selected;renderShots(c);
}
const direction=n=>finite(n)?n===0?'0':`${Math.abs(n)} ${n<0?'L':'R'}`:'—';
function renderShots(c){
 $('coverage').textContent=`${c.shots.length} of ${c.count} session shots recovered · ${c.shots.filter(s=>s.source?.includes('verified')).length} screenshot-checked rows`;
 $('carry-head').textContent=`Carry (${unit})`;$('total-head').textContent=`Total (${unit})`;
 const summary=$('shot-summary');summary.replaceChildren();
 for(const [v,l] of [[`${distance(average(c.shots,'carry'))} ${unit}`,'Recovered-shot avg. carry'],[`${distance(Math.max(...c.shots.map(s=>s.carry)))} ${unit}`,'Longest recovered carry'],[finite(average(c.shots,'speed'))?`${fmt(average(c.shots,'speed'))} mph`:'—','Avg. available ball speed']]){const item=node('div','');item.append(node('strong',v),node('small',l));summary.append(item);}
 const body=$('shot-rows');body.replaceChildren();
 c.shots.forEach((s,i)=>{const row=node('tr','');for(const value of [String(i+1).padStart(2,'0'),fmt(distance(s.carry)),fmt(distance(s.total)),fmt(s.speed),fmt(s.launch),fmt(s.apex),finite(s.hang)?s.hang:'—',fmt(s.landing),finite(s.curve)?direction(s.curve):finite(s.curveMagnitude)?`${s.curveMagnitude} (direction unknown)`:'—',direction(s.offline),s.source?.includes('verified')?'Screenshot checked':'Chat transcription'])row.append(node('td',value));body.append(row);});
}
for(const c of data.clubs)$('shot-club').append(Object.assign(node('option',c.name),{value:c.id}));
$('shot-club').onchange=e=>{if(filter!=='all'&&data.clubs.find(c=>c.id===e.target.value).group!==filter){filter='all';for(const b of document.querySelectorAll('[data-filter]'))b.setAttribute('aria-pressed',String(b.dataset.filter==='all'));}selectClub(e.target.value);};
$('units').onchange=e=>{unit=e.target.value;render();};
for(const b of document.querySelectorAll('[data-filter]'))b.onclick=()=>{filter=b.dataset.filter;for(const button of document.querySelectorAll('[data-filter]'))button.setAttribute('aria-pressed',String(button===b));if(filter!=='all'&&data.clubs.find(c=>c.id===selected).group!==filter)selected=data.clubs.find(c=>c.group===filter).id;render();};
const csv=v=>v===null||v===undefined?'':`"${String(v).replaceAll('"','""')}"`;
$('download-data').onclick=()=>{const lines=[['club','session_date','average_flat_carry_yd','session_shots','recovered_shot','carry_yd','total_yd','ball_speed_mph','launch_deg','apex_ft','hang_sec','landing_deg','curve_ft_signed_right','curve_ft_unsigned','offline_ft_signed_right','source']];for(const c of data.clubs)c.shots.forEach((s,i)=>lines.push([c.id,data.date,c.carry,c.count,i+1,s.carry,s.total,s.speed,s.launch,s.apex,s.hang,s.landing,s.curve,s.curveMagnitude,s.offline,s.source]));download(lines.map(r=>r.map(csv).join(',')).join('\n'),'text/csv;charset=utf-8','atteres-toptracer-2026-10-28.csv');};
render();

async function loadHistory(){
 const res=await fetch('/golf/history.json');if(!res.ok)throw new Error('Unable to load golf archive');const history=await res.json();
 $('recovery-note').textContent=data.coverageNote;
 const summaryRows=[...history.historicalSessions,...history.partialSessionObservations.map(r=>({...r,verification:'Partial narrative record'})),...data.clubs.map(c=>({date:data.date,club:c.id,count:c.count,carry:c.carry,verification:'Summary screenshot checked'}))].sort((a,b)=>b.date.localeCompare(a.date)||a.club.localeCompare(b.club));
 const dates=[...new Set(summaryRows.map(s=>s.date))];
 $('archive-count').textContent=`${summaryRows.length} club records · ${dates.length} practice dates`;
 for(const date of dates)$('history-date').append(Object.assign(node('option',date),{value:date}));
 for(const club of [...new Set(summaryRows.map(s=>s.club))].sort())$('history-club').append(Object.assign(node('option',club),{value:club}));
 function renderHistory(){const rows=summaryRows.filter(r=>($('history-date').value==='all'||r.date===$('history-date').value)&&($('history-club').value==='all'||r.club===$('history-club').value));$('session-rows').replaceChildren();for(const r of rows){const tr=node('tr','');for(const v of [r.date,r.club,fmt(r.count),`${r.carry} yd`,r.verification])tr.append(node('td',v));$('session-rows').append(tr);}if(!rows.length){const tr=node('tr',''),td=node('td','No recovered records for this combination.');td.colSpan=5;tr.append(td);$('session-rows').append(tr);}$('history-result-count').textContent=`${rows.length} records shown`;}
 $('history-date').onchange=renderHistory;$('history-club').onchange=renderHistory;renderHistory();
 const base=history.driverBaseline;
 for(const [v,l] of [[`${base.carry} yd`,'Avg. carry'],[`${base.total} yd`,'Avg. total'],[`${base.speed} mph`,'Ball speed'],[`${base.launch}°`,'Launch'],[`${base.apex} ft`,'Apex'],[`${base.landing}°`,'Landing'],[`${base.hang} sec`,'Hang time'],[direction(base.curveFt)+' ft','Curve'],[direction(base.offlineYd)+' yd','Offline']]){const cell=node('div','');cell.append(node('strong',v),node('small',l));$('driver-baseline').append(cell);}
 for(const item of history.equipment){const tr=node('tr','');for(const field of ['item','model','loft','shaft','notes'])tr.append(node('td',item[field]));$('equipment-rows').append(tr);}
 for(const entry of history.purchaseHistory){const article=node('article','','archive-note');article.append(node('small',entry.date),node('h3',entry.type),node('strong',entry.amount?`$${entry.amount.toLocaleString()}`:`$${entry.low.toLocaleString()}–$${entry.high.toLocaleString()}`),node('p',entry.notes));$('purchase-history').append(article);}
 for(const entry of history.maintenance){const article=node('article','','archive-note');article.append(node('small',entry.recorded),node('h3',entry.topic),node('p',entry.notes));$('maintenance-notes').append(article);}
 for(const entry of history.estimateHistory){const box=node('details','','archive-disclosure');box.append(node('summary',entry.label),node('p',entry.kind));if(entry.values){const dl=node('dl','');for(const [club,value]of Object.entries(entry.values)){dl.append(node('dt',club),node('dd',value));}box.append(dl);}if(entry.notes)box.append(node('p',entry.notes));$('estimate-history').append(box);}
 const specs=node('p',Object.entries(history.historicalIronLofts.values).map(([club,loft])=>`${club} ${loft}°`).join(' · '));$('historical-lofts').append(specs,node('p',history.historicalIronLofts.status,'caption'));
 for(const source of history.sources){const item=node('li','');item.append(node('strong',source.title),node('span',` — ${source.scope}`));$('source-list').append(item);}
 for(const name of history.unrecoveredAttachmentReferences)$('attachment-list').append(node('li',name));
 for(const text of history.coverage.missing)$('missing-list').append(node('li',text));
 $('archive-download').onclick=()=>download(JSON.stringify({latestSession:data,history},null,2),'application/json','atteres-golf-recovered-history.json');
 $('sessions-download').onclick=()=>download([['date','club','shots','average_carry_yd','source_status'],...summaryRows.map(r=>[r.date,r.club,r.count,r.carry,r.verification])].map(r=>r.map(csv).join(',')).join('\n'),'text/csv;charset=utf-8','atteres-golf-session-history.csv');
}
loadHistory().catch(()=>{$('recovery-note').textContent='Golf history could not load. Reload to try again.';});
