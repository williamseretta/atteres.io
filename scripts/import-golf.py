import csv,json,collections,re,pathlib,shutil,math
import sys
out=pathlib.Path(__file__).resolve().parents[1]/'public/golf';p=pathlib.Path(sys.argv[1])
with p.open(newline='') as f: rows=list(csv.DictReader(f))[1:]
def num(v):
 try:return float(v) if v.strip() else None
 except:return None
def signed(v):
 m=re.fullmatch(r'([+-]?[\d.]+)\s*([LR])?',v.strip())
 return float(m[1])*(-1 if m[2]=='L' else 1) if m else None
shots=[]
for i,r in enumerate(rows):
 s={'id':i+1,'number':r['Shot number'],'date':r['Date'][:10],'time':r['Date'],'club':r['Club type'] or 'Unspecified club','classification':r['Classification'],'carry':num(r['Carry']),'total':num(r['Total']),'offline':signed(r['Offline carry']),'totalOffline':signed(r['Offline']),'apex':num(r['Peak height']),'speed':num(r['Ball speed']),'clubSpeed':num(r['Club speed']),'launch':num(r['Vertical Launch angle']),'landing':num(r['Landing angle']),'hang':num(r['Hang time']),'curve':signed(r['Curve']),'backspin':num(r['Backspin']),'smash':num(r['Smash factor'])}
 assert s['carry'] is not None and all(not isinstance(v,float) or math.isfinite(v) for v in s.values())
 shots.append(s)
(out/'swingsync-data.json').write_text(json.dumps({'source':p.name,'distanceUnit':'yd','speedUnit':'mph','dateGrouping':'UTC date from source','shots':shots},separators=(',',':')))
shutil.copyfile(p,out/'swingsync-shots.csv')
print(f'Imported {len(shots)} shots across {len(set(s["date"] for s in shots))} dates')
import runpy
runpy.run_path(str(pathlib.Path(__file__).with_name('build-golf-performance.py')),run_name='__main__')
