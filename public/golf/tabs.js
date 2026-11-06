function setupTabs(){
const main=document.querySelector('main');
const groups=[['range','Range View',['visual-shot-chart']],['analysis','Analysis',['practice-overview','golf-analysis']],['clubs','Clubs',['my-clubs','bag']],['history','Shots & history',['shot-details','golf-history']],['scorecard','Scorecard',[]]];
const bar=document.createElement('div');bar.className='dashboard-tabs';bar.setAttribute('role','tablist');bar.setAttribute('aria-label','Golf dashboard sections');
const panels=[];
for(const [id,label,ids] of groups){
 const tab=document.createElement('button');tab.type='button';tab.id='tab-'+id;tab.textContent=label;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','panel-'+id);bar.append(tab);
 const panel=document.createElement('div');panel.id='panel-'+id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;
 for(const section of ids){const content=document.getElementById(section);if(content)panel.append(content)}
 if(id==='scorecard')panel.append(document.querySelector('.scorecard'));
 panels.push({id,tab,panel});
 tab.onclick=()=>activate(id,true);
 tab.onkeydown=e=>{let i=panels.findIndex(p=>p.id===id);if(e.key==='ArrowRight')i=(i+1)%panels.length;else if(e.key==='ArrowLeft')i=(i+panels.length-1)%panels.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=panels.length-1;else return;e.preventDefault();activate(panels[i].id,true);panels[i].tab.focus()};
}
main.querySelector('.stat-grid').after(bar);bar.after(...panels.map(p=>p.panel));
function activate(id,update=false){for(const p of panels){const selected=p.id===id;p.panel.hidden=!selected;p.tab.setAttribute('aria-selected',String(selected));p.tab.tabIndex=selected?0:-1}if(update)history.replaceState(null,'','#'+id)}
function revealHash(){const id=decodeURIComponent(location.hash.slice(1));const target=document.getElementById(id);const match=panels.find(p=>p.id===id||p.panel.contains(target));if(match)activate(match.id);else activate('range')}
window.addEventListener('hashchange',revealHash);
document.addEventListener('click',e=>{const link=e.target.closest('a[href^="#"]');if(!link)return;const target=document.getElementById(link.hash.slice(1));const match=panels.find(p=>p.panel.contains(target));if(match)activate(match.id)});
document.addEventListener('golf-inspect-shots',()=>activate('analysis'),true);
revealHash();

}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupTabs,{once:true});else setupTabs();
