// Flag carry or offline values outside Tukey's 1.5-IQR fences, per club.
export function withoutOutliers(rows){
 const groups=new Map(),removed=new Set();
 for(const shot of rows){const club=shot.name||(typeof shot.club==='string'?shot.club:shot.club?.name);if(!club||club==='Unspecified club')continue;if(!groups.has(club))groups.set(club,[]);groups.get(club).push(shot)}
 const quantile=(values,p)=>{const i=(values.length-1)*p,lo=Math.floor(i),hi=Math.ceil(i);return values[lo]+(values[hi]-values[lo])*(i-lo)};
 for(const group of groups.values())for(const metric of ['carry','offline']){const values=group.map(s=>s[metric]).filter(Number.isFinite).sort((a,b)=>a-b);if(values.length<8)continue;const q1=quantile(values,.25),q3=quantile(values,.75),iqr=q3-q1;if(iqr<=0)continue;for(const shot of group)if(Number.isFinite(shot[metric])&&(shot[metric]<q1-1.5*iqr||shot[metric]>q3+1.5*iqr))removed.add(shot)}
 return rows.filter(s=>!removed.has(s));
}
