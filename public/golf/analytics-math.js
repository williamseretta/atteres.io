export const mean=a=>a.length?a.reduce((s,n)=>s+n,0)/a.length:null;
export function quantile(a,p){if(!a.length)return null;const s=[...a].sort((a,b)=>a-b),i=(s.length-1)*p,lo=Math.floor(i);return s[lo]+(s[Math.ceil(i)]-s[lo])*(i-lo)}
export function sd(a){if(a.length<2)return null;const m=mean(a);return Math.sqrt(a.reduce((sum,v)=>sum+(v-m)**2,0)/a.length)}
export function group(rows,key){const out=new Map();for(const r of rows){const k=typeof key==='function'?key(r):r[key];if(!out.has(k))out.set(k,[]);out.get(k).push(r)}return out}
export const summary=a=>({p10:quantile(a,.1),q1:quantile(a,.25),median:quantile(a,.5),q3:quantile(a,.75),p90:quantile(a,.9)});
export const targetHit=(s,t)=>Number.isFinite(s.offline)&&Number.isFinite(s.carry)&&(s.offline/(t.width/2))**2+((s.carry-t.carry)/(t.depth/2))**2<=1;
export const missZone=(s,t)=>[s.carry>t.carry+t.depth/2?'long':s.carry<t.carry-t.depth/2?'short':'on',s.offline< -t.width/2?'left':s.offline>t.width/2?'right':'center'];
