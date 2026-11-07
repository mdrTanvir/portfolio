import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const content = execFileSync(process.execPath, [new URL('./export-cv-content.mjs', import.meta.url).pathname]);
const hash = createHash('sha256').update(content).digest('hex');
const pdf = readFileSync(new URL('../src/public/Md-Tanvir-Rahman-Resume.pdf', import.meta.url), 'latin1');
if (!pdf.includes(`Portfolio content SHA256 ${hash}`)) {
  console.error('The CV is out of sync with website content. Regenerate the PDF using the README instructions.');
  process.exit(1);
}
console.log('CV matches the current website content snapshot.');
