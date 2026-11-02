import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {quantile,sd,group,targetHit,missZone} from '../public/golf/analytics-math.js';
assert.equal(quantile([10,20,30,40],.5),25);
assert.equal(quantile([4],.9),4);
assert.equal(quantile([],.5),null);
assert.equal(sd([4]),null);
assert.equal(sd([0,2]),1);
const target={carry:150,width:30,depth:20};
assert(targetHit({carry:150,offline:0},target));
assert(targetHit({carry:150,offline:15},target));
assert(!targetHit({carry:160,offline:15},target));
assert(!targetHit({carry:150,offline:null},target));
assert.deepEqual(missZone({carry:170,offline:-25},target),['long','left']);
const {shots}=JSON.parse(readFileSync(new URL('../public/golf/swingsync-data.json',import.meta.url)));
const zones=group(shots,s=>missZone(s,target).join('/'));
assert.equal([...zones.values()].reduce((n,rows)=>n+rows.length,0),shots.length);
for(const rows of group(shots,'club').values()){
 const hits=rows.filter(s=>targetHit(s,target));
 assert(hits.length<=rows.length);
 const values=rows.map(s=>s.carry);
 assert(quantile(values,.1)<=quantile(values,.5));
 assert(quantile(values,.5)<=quantile(values,.9));
}
console.log(`Golf analytics checks passed on ${shots.length} source records.`);
