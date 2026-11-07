import csv,json,pathlib,collections,statistics,sys
root=pathlib.Path(__file__).resolve().parents[1]
with open(sys.argv[1],newline='') as f: rows=list(csv.DictReader(f))[1:]
rows.sort(key=lambda s:(s['Date'],int(s['Shot number']) if s['Shot number'].isdigit() else 0))
def num(s,k):
 try:return float(s[k])
 except:return None
scored=[s for s in rows if num(s,'Total score') is not None]
groups=collections.defaultdict(list)
for s in scored:
 if s['Club type']:groups[s['Club type']].append(num(s,'Total score'))
clubs=[{'club':c,'shots':len(v),'score':round(statistics.mean(v),2)} for c,v in groups.items()]
points=[];total=0
for i,s in enumerate(scored):
 total+=num(s,'Total score')
 if i%10==0 or i==len(scored)-1:points.append({'shot':i+1,'date':s['Date'][:10],'score':round(total/(i+1),3)})
dates=collections.defaultdict(list)
for s in scored:dates[s['Date'][:10]].append(num(s,'Total score'))
result={'shots':len(rows),'scoredShots':len(scored),'clubs':clubs,'cumulative':points,'sessions':[{'date':d,'shots':len(v),'score':round(statistics.mean(v),2)} for d,v in dates.items()]}
(root/'public/golf/performance-data.json').write_text(json.dumps(result,separators=(',',':')))
print('Built performance scores for',len(scored),'shots')
