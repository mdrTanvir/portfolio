import {test} from 'node:test';
import assert from 'node:assert/strict';
import {containsSkill,findRoleEvidence} from '../src/utils/roleEvidence.mjs';
test('matches aliases case-insensitively without substring false positives',()=>{
  assert.equal(containsSkill('VUE.JS and REST APIs','JavaScript & Vue.js'),true);
  assert.equal(containsSkill('REST APIs','REST API Development'),true);
  assert.equal(containsSkill('NoSQL and GitLab','SQL & Query Optimisation'),false);
  assert.equal(containsSkill('GitLab','Git & GitHub'),false);
  assert.equal(containsSkill('Java developer','JavaScript & Vue.js'),false);
});
test('deduplicates skills and ranks only records with published skill evidence',()=>{
  const result=findRoleEvidence('Python, SQL, Excel, Python',['Python','Python','SQL & Query Optimisation','Excel Reporting'],[
    {id:'one',skills:['Python']},{id:'two',skills:['Python','SQL & Query Optimisation']},{id:'none',skills:['Docker']}
  ]);
  assert.deepEqual(result.matched,['Python','SQL & Query Optimisation','Excel Reporting']);
  assert.deepEqual(result.evidence.map(item=>item.id),['two','one']);
  assert.deepEqual(result.toolkitOnly,['Excel Reporting']);
});
test('does not invent evidence for unsupported or empty requirements',()=>{
  assert.deepEqual(findRoleEvidence('Rust and Kubernetes',['Python'],[{skills:['Python']}]),{matched:[],evidence:[],toolkitOnly:[]});
  assert.equal(findRoleEvidence('',['Python'],[{skills:['Python']}]).matched.length,0);
});
