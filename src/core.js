export const verdictFor = (score) => score >= 80 ? 'Strongly Supported' : score >= 65 ? 'Probably Authentic' : score >= 45 ? 'Inconclusive' : score >= 25 ? 'Likely Misleading' : 'High Risk / Likely False';
export const polarityLabel = (p) => ({SUPPORTING:'Supporting', CONTRADICTING:'Contradicting', NEUTRAL:'Neutral', UNKNOWN:'Unavailable'})[p] || 'Unknown';
export function isSafeUrl(value) {
  try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) && !/^(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(u.hostname); } catch { return false; }
}
export function normalizeDomain(value) { try { return new URL(value.includes('://') ? value : `https://${value}`).hostname.replace(/^www\./, '').toLowerCase(); } catch { return ''; } }
export function calculateAssessment(dimensions) {
  const weights={sourceTransparency:20,claimConsistency:20,crossSourceAgreement:20,imageContext:15,timelineConsistency:10,contentSignals:10,evidenceQuality:5};
  const present=Object.entries(weights).filter(([key]) => Number.isFinite(dimensions[key]));
  const weight=present.reduce((sum,[,w])=>sum+w,0);
  const score=weight ? Math.round(present.reduce((sum,[key,w])=>sum+(dimensions[key]/100*w),0)/weight*100) : 50;
  return {score, verdict: verdictFor(score), confidence: present.length >= 6 ? 'High' : present.length >= 4 ? 'Medium' : 'Low', coverage: `${present.length}/${Object.keys(weights).length}`};
}
const now = '2026-08-30T09:20:00.000Z';
export const demoCase = () => {
 const dimensions={sourceTransparency:38,claimConsistency:35,crossSourceAgreement:31,imageContext:22,timelineConsistency:45,contentSignals:40,evidenceQuality:70};
 const assessment=calculateAssessment(dimensions);
 const evidence=[
 ['E-001','ARTICLE','Article retrieved','Fictional article target captured for review.','NEUTRAL','Article','2026-08-30'],
 ['E-002','DOMAIN','Limited author transparency','No named author or editorial contact was supplied in the sample article.','CONTRADICTING','Source analysis','2026-08-30'],
 ['E-003','CLAIM','Named project announcement','A public project announcement supports the existence of the Riverlight project.','SUPPORTING','Civic Ledger','2026-08-21'],
 ['E-004','IMAGE','Earlier different-context image','The local demo image fingerprint matches an earlier fictional festival gallery context.','CONTRADICTING','Demo image index','2025-11-04'],
 ['E-005','FACT_CHECK','Claim remains unverified','No configured fact-check provider is available; this is not a negative finding.','UNKNOWN','Fact check provider','2026-08-30'],
 ['E-006','TIMELINE','Date wording conflicts','The claimed completion date conflicts with the fictional public project schedule.','CONTRADICTING','Metro Record','2026-08-18'],
 ['E-007','SEARCH_RESULT','Independent reporting','Two independently authored demo sources describe a smaller pilot event.','SUPPORTING','Harbor News / Civic Ledger','2026-08-22'],
 ['E-008','METADATA','Image metadata absent','No EXIF location or capture-time data is present in the demo asset.','NEUTRAL','Local analysis','2026-08-30'],
 ['E-009','CLAIM','Attendance number unsupported','The 50,000 attendance figure is not present in the sampled independent coverage.','CONTRADICTING','Cross-source comparison','2026-08-30'],
 ['E-010','DOMAIN','HTTPS available','The fictional target uses HTTPS. This alone does not establish reliability.','SUPPORTING','Domain analysis','2026-08-30']
 ].map(([id,type,title,description,polarity,source,observedAt],i)=>({id,type,title,description,polarity,source,sourceUrl:'https://example.invalid/'+id.toLowerCase(),observedAt,confidence:[82,75,88,94,0,91,79,100,86,100][i],reliability:polarity==='UNKNOWN'?'Unavailable':'Demo evidence',metadata:{provider:source}}));
 const claims=[
 ['C-01','Riverlight opened as a completed citywide project.','event','Needs verification',56],['C-02','The launch attracted 50,000 people.','statistic','Important',78],['C-03','The image shows the Riverlight launch.','event','Important',92],['C-04','The project was finished in August 2026.','date','Needs verification',88],['C-05','Local groups funded the work.','organization','Irrelevant',42],['C-06','The project improves public safety.','causal assertion','Needs verification',38]
 ].map(([id,text,type,status,confidence])=>({id,text,type,status,confidence}));
 const timeline=[['2025-11-04','Image','Earliest observed by configured demo sources','Same image appears in a fictional Lantern Festival gallery.','E-004'],['2026-08-18','Source','Project schedule published','Independent demo reporting lists a later completion milestone.','E-006'],['2026-08-21','Source','Project announcement published','A public announcement confirms an ongoing pilot.','E-003'],['2026-08-22','Source','Independent coverage retrieved','Coverage describes a smaller event.','E-007'],['2026-08-30','Article','Target article retrieved','Investigation target added by user.','E-001']].map(([date,type,title,description,evidenceId])=>({date,type,title,description,evidenceId}));
 return {id:'DEMO-001', title:'Riverlight launch claim', target:'https://news.example.invalid/riverlight-launch', domain:'news.example.invalid', createdAt:now, status:'Complete', mode:'DEMO INVESTIGATION', assessment, dimensions, evidence, claims, timeline, image:{name:'riverlight-launch.jpg',type:'image/jpeg',dimensions:'1600 × 900',size:'382 KB',sha256:'8a0fb1c7…d211',perceptualHash:'e4a39d…9f1c',exif:'No EXIF metadata',reverse:'Reverse-search provider not configured. Local fingerprint analysis completed.'}, sources:[{name:'news.example.invalid',type:'Target publication',transparency:'Limited',last:'2026-08-30'},{name:'Civic Ledger',type:'Independent local reporting',transparency:'Named editorial team',last:'2026-08-21'},{name:'Metro Record',type:'Independent local reporting',transparency:'Named editorial team',last:'2026-08-18'}]};
};
export function graphFor(investigation) { const nodes=[{id:'article',label:'Article',kind:'article'},...investigation.claims.map(c=>({id:c.id,label:c.id,kind:'claim'})),...investigation.evidence.slice(0,6).map(e=>({id:e.id,label:e.id,kind:e.polarity.toLowerCase()}))]; const edges=[...investigation.claims.map(c=>['article',c.id,'contains claim']),...investigation.evidence.slice(0,6).map((e,i)=>[i%2?'C-02':'C-03',e.id,e.polarity.toLowerCase()])]; return {nodes,edges}; }
