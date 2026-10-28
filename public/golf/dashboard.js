const response = await fetch('/golf/data.json');
if (!response.ok) throw new Error('Unable to load golf data');
const data = await response.json();
const $ = id => document.getElementById(id);
let selected='4HY', filter='all', unit='yd';
const factor=()=>unit==='m'?.9144:1;
const distance=n=>Math.round(n*factor());
const average=(rows,key)=>rows.reduce((s,r)=>s+r[key],0)/rows.length;
function selectClub(id){selected=id;render();}
function render(){
 $('longest').replaceChildren(document.createTextNode(distance(208)),Object.assign(document.createElement('span'),{textContent:unit}));
 $('big-gap').replaceChildren(document.createTextNode(distance(30)),Object.assign(document.createElement('span'),{textContent:unit}));
 $('axis-mid').textContent=`${distance(120)} ${unit}`;$('axis-max').textContent=`${distance(240)} ${unit}`;
 const chart=$('carry-chart');chart.replaceChildren();
 for(const c of data.clubs.filter(c=>filter==='all'||c.group===filter)){
  const row=document.createElement('button');row.className='bar-row';row.setAttribute('aria-pressed',String(c.id===selected));row.setAttribute('aria-label',`${c.name}: ${distance(c.carry)} ${unit} average carry, ${c.count} shots`);
  const label=Object.assign(document.createElement('span'),{className:'club-label',textContent:c.id});
  const track=Object.assign(document.createElement('span'),{className:'bar-track'}),fill=Object.assign(document.createElement('span'),{className:'bar-fill'});fill.style.setProperty('--w',`${c.carry/240*100}%`);track.append(fill);
  row.append(label,track,Object.assign(document.createElement('span'),{className:'bar-number',textContent:distance(c.carry)}));row.onclick=()=>selectClub(c.id);chart.append(row);
 }
 const c=data.clubs.find(c=>c.id===selected);$('club-name').textContent=c.name;$('club-type').textContent=c.group==='hybrids'?'HYBRID':c.group==='wedges'?'WEDGE':'IRON';$('club-carry').textContent=distance(c.carry);$('club-unit').textContent=`${unit} average carry`;$('club-count').textContent=`${c.count} session shots`;
 const detail=$('club-detail');detail.replaceChildren();
 if(c.shots.length){
  const grid=document.createElement('div');grid.className='club-detail-grid';
  for(const [value,label] of [[`${Math.min(...c.shots.map(s=>distance(s.carry)))}–${Math.max(...c.shots.map(s=>distance(s.carry)))}`,`Carry range (${unit})`],[`${Math.round(average(c.shots,'speed'))} mph`,'Avg. ball speed'],[`${Math.min(...c.shots.map(s=>s.launch))}–${Math.max(...c.shots.map(s=>s.launch))}°`,'Launch range'],[`${Math.round(average(c.shots,'apex'))} ft`,'Avg. apex']]){const cell=document.createElement('div');cell.append(Object.assign(document.createElement('strong'),{textContent:value}),Object.assign(document.createElement('small'),{textContent:label}));grid.append(cell);}detail.append(grid);
 }
 detail.append(Object.assign(document.createElement('p'),{className:'spotlight-note',textContent:c.shots.length?`Details from ${c.shots.length} visible shots${c.shots.length<c.count?` of ${c.count} in this club’s session`:''}.`:'The session summary is available for this club. Individual shot details were not present in the recovered screenshots.'}));
 $('shot-club').value=selected;renderShots(c);
}
function renderShots(c){
 $('coverage').textContent=c.shots.length?`${c.shots.length} of ${c.count} session shots available · screenshot transcription`:'Summary only · Individual shots are not available for this club.';
 $('carry-head').textContent=`Carry (${unit})`;$('total-head').textContent=`Total (${unit})`;
 const summary=$('shot-summary');summary.replaceChildren();summary.hidden=!c.shots.length;
 if(c.shots.length)for(const [v,l] of [[`${distance(average(c.shots,'carry'))} ${unit}`,'Visible-shot avg. carry'],[`${distance(Math.max(...c.shots.map(s=>s.carry)))} ${unit}`,'Longest visible carry'],[`${Math.round(average(c.shots,'speed'))} mph`,'Avg. ball speed']]){const item=document.createElement('div');item.append(Object.assign(document.createElement('strong'),{textContent:v}),Object.assign(document.createElement('small'),{textContent:l}));summary.append(item);}
 const body=$('shot-rows');body.replaceChildren();
 c.shots.forEach((s,i)=>{const row=document.createElement('tr');for(const value of [String(i+1).padStart(2,'0'),distance(s.carry),distance(s.total),s.speed,s.launch,s.apex])row.append(Object.assign(document.createElement('td'),{textContent:value}));body.append(row);});
 if(!c.shots.length){const row=document.createElement('tr'),cell=document.createElement('td');cell.colSpan=6;cell.textContent='No individual shot records available. Select a hybrid or the 5-iron to explore the recovered shots.';row.append(cell);body.append(row);}
}
for(const c of data.clubs)$('shot-club').append(Object.assign(document.createElement('option'),{value:c.id,textContent:c.name}));
$('shot-club').onchange=e=>{if(filter!=='all'&&data.clubs.find(c=>c.id===e.target.value).group!==filter){filter='all';for(const b of document.querySelectorAll('[data-filter]'))b.setAttribute('aria-pressed',String(b.dataset.filter==='all'));}selectClub(e.target.value);};
$('units').onchange=e=>{unit=e.target.value;render();};
for(const b of document.querySelectorAll('[data-filter]'))b.onclick=()=>{filter=b.dataset.filter;for(const button of document.querySelectorAll('[data-filter]'))button.setAttribute('aria-pressed',String(button===b));if(filter!=='all'&&data.clubs.find(c=>c.id===selected).group!==filter)selected=data.clubs.find(c=>c.group===filter).id;render();};
$('download-data').onclick=()=>{const lines=['club,session_date,average_flat_carry_yd,session_shots,visible_shot,carry_yd,total_yd,ball_speed_mph,launch_deg,apex_ft'];for(const c of data.clubs){if(!c.shots.length)lines.push([c.id,data.date,c.carry,c.count,'','','','','',''].join(','));else c.shots.forEach((s,i)=>lines.push([c.id,data.date,c.carry,c.count,i+1,s.carry,s.total,s.speed,s.launch,s.apex].join(',')));}const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='atteres-toptracer-2026-10-28.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
render();
