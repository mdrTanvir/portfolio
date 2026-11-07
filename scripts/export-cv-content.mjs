import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
function readData(file, start, result) {
  let source = readFileSync(new URL(`src/config/data/${file}.ts`, root), 'utf8');
  source = source.slice(source.indexOf(start)).replace(/export default [^;\n]+;?/g, '').replace(/export const /g, 'const ');
  return vm.runInNewContext(`${source}\nJSON.stringify(${result})`, {}, {timeout: 1000});
}
const content = {
  profile: JSON.parse(readData('data', 'const fullName', 'siteData')),
  experiences: JSON.parse(readData('experiences', 'const experiences', 'orderedExperiences')),
  educations: JSON.parse(readData('educations', 'const educations', 'educations')),
  projects: JSON.parse(readData('projects', 'export const projects', 'projects')),
  skills: JSON.parse(readData('skills', 'const skills', 'skills')),
};
process.stdout.write(JSON.stringify(content, null, 2));
