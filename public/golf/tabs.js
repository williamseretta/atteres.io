function setupTabs(){
const main=document.querySelector('main');
const groups=[['range','Range View',['visual-shot-chart']],['performance','Performance',['session-visuals','performance-overview']],['analysis','Analysis',['golf-analysis']],['heatmaps','Heatmaps',['heatmap-explorer']],['clubs','Clubs',['my-clubs']],['history','Shots & history',['shot-details','golf-history']]];
const bar=document.createElement('div');bar.className='dashboard-tabs';bar.setAttribute('role','tablist');bar.setAttribute('aria-label','Golf dashboard sections');
const panels=[];
for(const [id,label,ids] of groups){
 const tab=document.createElement('button');tab.type='button';tab.id='tab-'+id;tab.textContent=label;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','panel-'+id);bar.append(tab);
 const panel=document.createElement('div');panel.id='panel-'+id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;
 for(const section of ids){const content=document.getElementById(section);if(content)panel.append(content)}
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

// Build section navigation as asynchronous charts finish loading.
function setupSectionNavigation() {
 const definitions = [
  { id: 'performance', selector: '#session-visuals h2, #performance-overview h3' },
  { id: 'analysis', selector: '#golf-analysis .an-card > h3, #an-detail-heading' },
 ];
 for (const definition of definitions) {
  const panel = document.getElementById('panel-' + definition.id);
  if (!panel) continue;
  const nav = document.createElement('nav');
  nav.className = 'section-tabs';
  nav.setAttribute('aria-label', definition.id === 'performance' ? 'Performance sections' : 'Analysis sections');
  panel.prepend(nav);
  const update = () => {
   const headings = [...panel.querySelectorAll(definition.selector)];
   nav.replaceChildren(...headings.map((heading, index) => {
    const target = heading.parentElement;
    if (!target.id) target.id = definition.id + '-section-' + index;
    const link = document.createElement('a');
    link.href = '#' + target.id;
    link.textContent = heading.textContent;
    if (location.hash === link.hash) link.setAttribute('aria-current', 'location');
    link.onclick = () => {
     for (const item of nav.children) item.removeAttribute('aria-current');
     link.setAttribute('aria-current', 'location');
    };
    return link;
   }));
  };
  const observer = new MutationObserver(records => {
   if (records.some(record => !nav.contains(record.target))) update();
  });
  observer.observe(panel, { childList: true, subtree: true });
  window.addEventListener('hashchange', update);
  update();
 }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupSectionNavigation, { once: true });
else setupSectionNavigation();

import './fullscreen.js';
