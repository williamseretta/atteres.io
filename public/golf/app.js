const $ = id => document.getElementById(id);
const key = 'atteres-golf-v1';
let data = {current:null,history:[]};
function validRound(r) {
  return r && typeof r.course === 'string' && typeof r.player === 'string'
    && typeof r.date === 'string' && Number.isFinite(Date.parse(r.date))
    && Array.isArray(r.holes) && [9,18].includes(r.holes.length)
    && r.holes.every(h => h && Number.isInteger(h.par) && h.par >= 3 && h.par <= 6
      && (h.score === null || (Number.isInteger(h.score) && h.score >= 1 && h.score <= 30)));
}
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved && Array.isArray(saved.history)) {
    data = {current: validRound(saved.current) ? saved.current : null,
      history: saved.history.filter(validRound)};
  }
} catch {}
function save(){try{localStorage.setItem(key,JSON.stringify(data));$('status').textContent='Saved on this device.';}catch{$('status').textContent='Browser storage is unavailable. Export your scorecard before leaving.';}}
const delta=n=>n===0?'Even':n>0?`+${n}`:String(n);
function totals(r){const played=r.holes.filter(h=>h.score!==null);return {played:played.length,strokes:played.reduce((s,h)=>s+h.score,0),relative:played.reduce((s,h)=>s+h.score-h.par,0)};}
function stats(){const r=data.current,t=totals(r);$('strokes').textContent=t.strokes;$('relative').textContent=delta(t.relative);$('played').textContent=`${t.played} / ${r.holes.length}`;$('finish').disabled=t.played!==r.holes.length;}
function render(){const r=data.current;$('setup').hidden=!!r;$('card').hidden=!r;if(r){$('round-title').textContent=r.course;$('round-detail').textContent=`${r.player} · ${new Date(r.date).toLocaleDateString()}`;$('holes').replaceChildren();r.holes.forEach((h,i)=>{const tr=document.createElement('tr');const number=document.createElement('th');number.scope='row';number.textContent=i+1;tr.append(number);for(const field of ['par','score']){const td=document.createElement('td'),input=document.createElement('input');input.type='number';input.min=field==='par'?'3':'1';input.max=field==='par'?'6':'30';input.step='1';input.value=h[field]??'';input.setAttribute('aria-label',`Hole ${i+1} ${field==='score'?'strokes':'par'}`);input.addEventListener('input',()=>{const n=input.value===''?null:Number(input.value);if((n===null&&field==='par')||(n!==null&&(!Number.isInteger(n)||n<Number(input.min)||n>Number(input.max)))){input.value=h[field]??'';return;}h[field]=n;tr.lastChild.textContent=h.score===null?'—':delta(h.score-h.par);save();stats();});td.append(input);tr.append(td);}const diff=document.createElement('td');diff.textContent=h.score===null?'—':delta(h.score-h.par);tr.append(diff);$('holes').append(tr);});stats();}$('history').replaceChildren();if(!data.history.length)$('history').textContent='Your first finished round will appear here.';for(const round of [...data.history].reverse()){const t=totals(round),row=document.createElement('div');row.className='round';const name=document.createElement('span');name.textContent=`${round.course} · ${round.player} · ${new Date(round.date).toLocaleDateString()}`;const score=document.createElement('b');score.textContent=`${t.strokes} (${delta(t.relative)}) · ${round.holes.length} holes`;row.append(name,score);$('history').append(row);}}
$('new-round').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target),course=f.get('course').trim(),player=f.get('player').trim();if(!course||!player)return;data.current={course,player,date:new Date().toISOString(),holes:Array.from({length:Number(f.get('holes'))},()=>({par:4,score:null}))};save();render();});
$('finish').onclick=()=>{if(totals(data.current).played!==data.current.holes.length)return;data.history.push(data.current);data.current=null;save();render();$('status').textContent='Round complete. See you on the next tee.';};
$('discard').onclick=()=>{if(confirm('Discard this unfinished round?')){data.current=null;save();render();}};
$('export').onclick=()=>{const r=data.current;const blob=new Blob([JSON.stringify(r,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='atteres-golf-scorecard.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
render();
