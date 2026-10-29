const responses=await Promise.all(['/golf/data.json','/golf/session-2026-10-29.json'].map(url=>fetch(url)));
if(responses.some(r=>!r.ok))throw Error('Unable to load golf sessions');
const [baseline,latest]=await Promise.all(responses.map(r=>r.json()));
const sessions={[baseline.date]:baseline,[latest.date]:latest};
let data=latest,selected='Driver',filter='all',unit='yd';
const $=id=>document.getElementById(id);
const finite=n=>typeof n==='number'&&Number.isFinite(n);
const factor=()=>unit==='m'?.9144:1;
const distance=n=>finite(n)?Math.round(n*factor()):null;
const fmt=n=>finite(n)?String(Math.round(n)):'—';
const average=(rows,key)=>{const values=rows.map(r=>r[key]).filter(finite);return values.length?values.reduce((a,b)=>a+b,0)/values.length:null;};
const range=(rows,key,convert=false)=>{const v=rows.map(s=>s[key]).filter(finite);return v.length?`${fmt(convert?distance(Math.min(...v)):Math.min(...v))}–${fmt(convert?distance(Math.max(...v)):Math.max(...v))}`:'—';};
const node=(tag,text,className='')=>Object.assign(document.createElement(tag),{textContent:text??'—',className});
const dateLabel=date=>new Date(date+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
const isRange=()=>data.kind==='ranges';
const carryText=c=>isRange()?`${c.approximate?'≈':''}${c.carryRange.map(distance).join('–')}`:String(distance(c.carry));
function download(content,type,name){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const csv=v=>v===null||v===undefined?'':`"${String(v).replaceAll('"','""')}"`;
const direction=n=>finite(n)?n===0?'0':`${Math.abs(n)} ${n<0?'L':'R'}`:'—';
function stat(index,label,value,suffix,note){const el=document.querySelectorAll('.stat-grid article')[index];el.querySelector('small').textContent=label;el.querySelector('strong').replaceChildren(document.createTextNode(value),node('span',suffix));el.querySelector('p').textContent=note;}
function render(){
 document.body.classList.toggle('range-session',isRange());
 const ranged=isRange(),count=data.clubs.reduce((sum,c)=>sum+(c.count||0),0);
 $('session-label').textContent=dateLabel(data.date);$('spotlight-date').textContent=dateLabel(data.date);
 stat(0,ranged?'SESSION COVERAGE':'SHOTS IN SESSION',ranged?'Ranges':count,ranged?'only':'shots',ranged?'Shot count not established':'Toptracer displayed session count');
 stat(1,'CLUBS TRACKED',data.clubs.length,'clubs','In the selected range session');
 stat(2,ranged?'BEST VISIBLE TOTAL':'LONGEST AVG. CARRY',distance(ranged?269:208),unit,ranged?'Driver · visible result':'4-hybrid · 7 shots');
 stat(3,ranged?'PEAK VISIBLE BALL SPEED':'GAP TO EXPLORE',ranged?146:distance(30),ranged?'mph':unit,ranged?'3-wood · visible result':'7-iron to 6-iron');
 $('chart-legend').textContent=ranged?'Visible carry range':'Average flat carry';$('axis-mid').textContent=`${distance(120)} ${unit}`;$('axis-max').textContent=`${distance(240)} ${unit}`;
 $('chart-note').textContent=ranged?'Select a club. The highlighted interval shows its visible carry range, not an average.':'Select a club. Each bar shows Toptracer’s displayed session average.';
 const chart=$('carry-chart');chart.replaceChildren();
 for(const c of data.clubs.filter(c=>filter==='all'||c.group===filter)){
  const row=node('button','','bar-row');row.setAttribute('aria-pressed',String(c.id===selected));row.setAttribute('aria-label',`${c.name}: ${carryText(c)} ${unit} ${ranged?'visible carry range':'average carry'}`);
  const track=node('span','','bar-track'),fill=node('span','','bar-fill');const end=ranged?c.carryRange[1]:c.carry;fill.style.setProperty('--w',`${end/240*100}%`);
  if(ranged){fill.style.marginLeft=`${c.carryRange[0]/240*100}%`;fill.style.setProperty('--w',`${(end-c.carryRange[0])/240*100}%`);}
  track.append(fill);row.append(node('span',c.id,'club-label'),track,node('span',carryText(c),'bar-number'));row.onclick=()=>{selected=c.id;render();};chart.append(row);
 }
 $('session-coverage').textContent=ranged?'9 clubs · visible ranges':`${count} measured shots · ${data.clubs.length} clubs`;
 $('session-note').textContent=`${dateLabel(data.date)} · ${ranged?data.coverageNote:'Toptracer displayed average flat carry; recovered shot details may be partial.'}`;
 $('gap-carry-head').textContent=ranged?`Carry range (${unit})`:`Avg. flat carry (${unit})`;$('gap-head').textContent=ranged?`Total range (${unit})`:`Gap (${unit})`;
 $('gap-note').textContent=ranged?'Ranges can overlap. They do not establish average club gaps.':'Gaps compare adjacent clubs in bag order. Retest large gaps and overlaps with repeatable strikes.';
 const gaps=$('gapping-rows');gaps.replaceChildren();data.clubs.forEach((c,i)=>{const gap=i?c.carry-data.clubs[i-1].carry:null;const row=node('tr','');for(const v of [c.name,c.count??'—',carryText(c),ranged?c.totalRange.map(distance).join('–'):gap===null?'—':`${gap>=0?'+':''}${distance(gap)}`,ranged?c.note:gap===null?'Baseline':gap>20?'Large gap · retest':gap<=6?'Overlap · retest':'—'])row.append(node('td',v));gaps.append(row);});
 const c=data.clubs.find(c=>c.id===selected);$('club-name').textContent=c.name;$('club-type').textContent=c.group.toUpperCase();$('club-carry').textContent=carryText(c);$('club-unit').textContent=`${unit} ${ranged?'visible carry range':'average carry'}`;$('club-count').textContent=ranged?'Shot count unavailable':`${c.count} session shots`;
 const detail=$('club-detail');detail.replaceChildren();const grid=node('div','','club-detail-grid');
 const metrics=ranged?[[c.totalRange.map(distance).join('–'),`Total range (${unit})`],[c.speedLabel+' mph','Visible ball speed'],[c.note,'Session note']]:[[range(c.shots,'carry',true),`Recovered carry range (${unit})`],[fmt(average(c.shots,'speed'))+' mph','Avg. available ball speed'],[range(c.shots,'launch')+'°','Available launch range'],[fmt(average(c.shots,'apex'))+' ft','Avg. available apex']];
 for(const [v,l]of metrics){const cell=node('div','');cell.append(node('strong',v),node('small',l));grid.append(cell);}detail.append(grid,node('p',ranged?data.coverageNote:`${c.shots.length} of ${c.count} carry records recovered. Other metrics may be partial.`,'spotlight-note'));
 const selector=$('shot-club');selector.replaceChildren();for(const club of data.clubs)selector.append(Object.assign(node('option',club.name),{value:club.id}));selector.value=selected;renderShots(c);
 const insights=ranged?[['01 / TOP OF THE BAG','Driver and 3W overlap.','Driver reached 269 yd total; 3W reached 266 yd total and 230 yd carry. Compare repeatable strikes before drawing conclusions.'],['02 / SCORING CLUB','An approach window to build on.','The 10i / Approach showed a tighter visible cluster around 103–106 yd carry within its 97–113 yd range.'],['03 / CONSISTENCY','Use the full range.','Visible ranges show strike variation. Compare October 28 averages using the date selector; range endpoints are not changes in average performance.']]:[['01 / DISTANCE GAP','Room between the irons.','7i averages 151 yd and 6i 181 yd: a 30-yard gap. Retest them together.'],['02 / OVERLAP','Two clubs. Two yards.','6i and 5i average 181 and 183 yd. Compare repeatable strikes.'],['03 / TOP OF THE BAG','Hybrids in the same window.','3HY averages 207 yd, alongside 208 yd for 4HY. Distance alone does not separate them.']];
 document.querySelector('.insight-grid').replaceChildren(...insights.map(([label,title,text])=>{const a=node('article','');a.append(node('span',label,'insight-num'),node('h3',title),node('p',text));return a;}));
 for(const b of document.querySelectorAll('[data-filter]')){b.setAttribute('aria-pressed',String(b.dataset.filter===filter));b.disabled=b.dataset.filter!=='all'&&!data.clubs.some(c=>c.group===b.dataset.filter);}
}
function renderShots(c){
 const ranged=isRange();$('shot-title').textContent=ranged?'Behind the range':'Behind the average';$('coverage').textContent=ranged?'Range summary available · individual shots not yet transcribed':`${c.shots.length} of ${c.count} session shots recovered`;
 $('carry-head').textContent=`Carry (${unit})`;$('total-head').textContent=`Total (${unit})`;
 const summary=$('shot-summary');summary.replaceChildren();const metrics=ranged?[[carryText(c)+' '+unit,'Visible carry range'],[c.totalRange.map(distance).join('–')+' '+unit,'Visible total range'],[c.speedLabel+' mph','Visible ball speed']]:[[fmt(distance(average(c.shots,'carry')))+' '+unit,'Recovered-shot avg. carry'],[fmt(distance(Math.max(...c.shots.map(s=>s.carry))))+' '+unit,'Longest recovered carry'],[fmt(average(c.shots,'speed'))+' mph','Avg. available ball speed']];
 for(const [v,l]of metrics){const el=node('div','');el.append(node('strong',v),node('small',l));summary.append(el);}
 const body=$('shot-rows');body.replaceChildren();if(ranged){const row=node('tr',''),cell=node('td','Individual shot rows are unavailable for this session. The ranges above preserve the recovered data without inventing shots.');cell.colSpan=11;row.append(cell);body.append(row);return;}
 c.shots.forEach((s,i)=>{const row=node('tr','');for(const v of [i+1,fmt(distance(s.carry)),fmt(distance(s.total)),fmt(s.speed),fmt(s.launch),fmt(s.apex),s.hang??'—',fmt(s.landing),finite(s.curve)?direction(s.curve):finite(s.curveMagnitude)?`${s.curveMagnitude} (direction unknown)`:'—',direction(s.offline),s.source?.includes('verified')?'Screenshot checked':'Chat transcription'])row.append(node('td',v));body.append(row);});
}
$('session-date').onchange=e=>{data=sessions[e.target.value];filter='all';if(!data.clubs.some(c=>c.id===selected))selected=data.clubs[0].id;render();};
$('shot-club').onchange=e=>{selected=e.target.value;filter='all';render();};$('units').onchange=e=>{unit=e.target.value;render();};
for(const b of document.querySelectorAll('[data-filter]'))b.onclick=()=>{filter=b.dataset.filter;if(filter!=='all'&&!data.clubs.some(c=>c.id===selected&&c.group===filter))selected=data.clubs.find(c=>c.group===filter).id;render();};
$('download-data').onclick=()=>{const rows=isRange()?[['date','club','carry_min_yd','carry_max_yd','total_min_yd','total_max_yd','ball_speed_mph','approximate_carry','note'],...data.clubs.map(c=>[data.date,c.name,...c.carryRange,...c.totalRange,c.speedLabel,c.approximate,c.note])]:[['date','club','session_avg_carry_yd','session_shots','shot','carry_yd','total_yd','speed_mph','launch_deg','apex_ft','hang_sec','landing_deg','curve_ft','offline_ft','source'],...data.clubs.flatMap(c=>c.shots.map((s,i)=>[data.date,c.id,c.carry,c.count,i+1,s.carry,s.total,s.speed,s.launch,s.apex,s.hang,s.landing,s.curve,s.offline,s.source]))];download(rows.map(r=>r.map(csv).join(',')).join('\n'),'text/csv;charset=utf-8',`atteres-toptracer-${data.date}.csv`);};
render();

async function loadHistory(){
 const res=await fetch('/golf/history.json');if(!res.ok)throw new Error('Unable to load golf archive');const history=await res.json();
 $('recovery-note').textContent='October 29: nine club ranges, shot count unavailable. October 28: 61 recovered individual records from 62 session shots. Earlier summaries remain separate.';
 const summaryRows=[...history.historicalSessions,...history.partialSessionObservations.map(r=>({...r,verification:'Partial narrative record'})),...baseline.clubs.map(c=>({date:baseline.date,club:c.id,count:c.count,carry:c.carry,verification:'Summary screenshot checked'})),...latest.clubs.map(c=>({date:latest.date,club:c.id,count:null,carry:c.carryRange.join('–'),verification:'Visible range; no session average'}))].sort((a,b)=>b.date.localeCompare(a.date)||a.club.localeCompare(b.club));
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
 $('archive-download').onclick=()=>download(JSON.stringify({latestSession:latest,sessions:[latest,baseline],history},null,2),'application/json','atteres-golf-recovered-history.json');
 $('sessions-download').onclick=()=>download([['date','club','shots','carry_yd_average_or_range','source_status'],...summaryRows.map(r=>[r.date,r.club,r.count,r.carry,r.verification])].map(r=>r.map(csv).join(',')).join('\n'),'text/csv;charset=utf-8','atteres-golf-session-history.csv');
}
loadHistory().catch(()=>{$('recovery-note').textContent='Golf history could not load. Reload to try again.';});

