import test from 'node:test'; import assert from 'node:assert/strict';
import {isSafeUrl,normalizeDomain,calculateAssessment,verdictFor,demoCase,graphFor} from '../src/core.js';
test('URL validation prevents private and malformed URLs',()=>{assert.equal(isSafeUrl('https://example.org/a'),true);assert.equal(isSafeUrl('http://127.0.0.1/x'),false);assert.equal(isSafeUrl('wrong'),false)});
test('domain normalization is stable',()=>assert.equal(normalizeDomain('HTTPS://www.Example.org/path'),'example.org'));
test('scoring normalizes missing dimensions',()=>{const a=calculateAssessment({sourceTransparency:80,claimConsistency:60});assert.equal(a.score,70);assert.equal(a.verdict,'Probably Authentic')});
test('verdict bands and deterministic demo graph work',()=>{assert.equal(verdictFor(44),'Likely Misleading');const d=demoCase();assert.equal(d.assessment.score,36);assert.equal(d.evidence.length,10);assert.ok(graphFor(d).edges.length>4)});
