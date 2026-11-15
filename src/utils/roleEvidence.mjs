const aliases = {
  'Python':['python'], 'Pandas':['pandas'], 'Scikit-learn':['scikit-learn','sklearn'],
  'Clustering':['clustering','k-means','ward clustering'],
  'Time Series Forecasting':['time series','forecasting'], 'Jupyter':['jupyter'],
  'PHP':['php'], 'PHP-ML':['php-ml'], 'Raspberry Pi / Sense HAT':['raspberry pi','sense hat'],
  'IoT':['iot','internet of things'], 'PHP & Laravel':['laravel'],
  'JavaScript & Vue.js':['javascript','vue.js','vuejs','vue'],
  'REST API Development':['rest api','rest apis','restful'], 'Git & GitHub':['git','github'],
  'SQL & Query Optimisation':['sql','query optimisation','query optimization'],
  'Data Validation':['data validation','data checks'], 'SAP Reporting':['sap'],
  'Excel Reporting':['excel'], 'Data Analytics':['data analytics','data analysis'],
  'Statistical Analysis':['statistical analysis','statistics','anova'],
  'Machine Learning':['machine learning'], 'Incident Investigation':['incident investigation'],
  'Software Troubleshooting':['troubleshooting','software troubleshooting'],
  'Software Testing & QA':['software testing','testing','quality assurance','qa'],
  'Operational Systems':['operational systems'], 'Customer Service':['customer service','customer support'],
  'User Training & Documentation':['user training','documentation'],
  'Accessibility & UX':['accessibility','user experience','ux'], 'Agile Delivery':['agile','sprint planning'],
  'Cloud Deployment':['cloud deployment'], 'Docker':['docker'], 'Vercel':['vercel'],
};
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function containsSkill(text,name) {
  return [name,...(aliases[name] || [])].some(term => new RegExp(`(^|[^a-z0-9])${escape(term)}(?=$|[^a-z0-9])`,'i').test(text));
}
/** Find published skill terms and rank evidence by the number of linked skills. No suitability score. */
export function findRoleEvidence(text,catalog,records) {
  const matched = [...new Set(catalog)].filter(name => containsSkill(text,name));
  const evidence = records.map(record => ({...record,matched:matched.filter(name => record.skills.some(skill => containsSkill(skill,name)))}))
    .filter(record => record.matched.length).sort((a,b)=>b.matched.length-a.matched.length);
  const toolkitOnly = matched.filter(name => !evidence.some(record => record.matched.includes(name)));
  return {matched,evidence,toolkitOnly};
}
