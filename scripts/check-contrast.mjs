import {readFileSync} from 'node:fs';
const source = readFileSync(new URL('../src/assets/scss/main.scss', import.meta.url),'utf8');
const luminance = value => {
 const rgb = value.slice(1).match(/../g).map(hex => parseInt(hex,16)/255).map(c => c <= .04045 ? c/12.92 : ((c+.055)/1.055)**2.4);
 return rgb[0]*.2126 + rgb[1]*.7152 + rgb[2]*.0722;
};
const ratio = (a,b) => {const values = [luminance(a),luminance(b)].sort((a,b)=>a-b);return (values[1]+.05)/(values[0]+.05)};
let checked = 0;
for (const [name,selector] of [['light',':root'],['dark','.dark']]) {
 const block = source.slice(source.indexOf(selector+' {')).split('}')[0];
 const tokens = Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[\da-f]{6})\b/gi)].map(match=>[match[1],match[2]]));
 for (const background of ['page','surface','soft']) {
  for (const foreground of ['ink','muted','accent','control-border']) {
   if (!tokens[background] || !tokens[foreground]) throw Error(`Missing ${name} palette token`);
   const value = ratio(tokens[foreground],tokens[background]);
   const minimum = foreground === 'control-border' ? 3 : 4.5;
   if (value < minimum) throw Error(`${name} ${foreground}/${background}: ${value.toFixed(3)}:1 is below ${minimum}:1`);
   checked++;
  }
 }
 console.log(`${name}: secondary text on surface ${ratio(tokens.muted,tokens.surface).toFixed(2)}:1; accent ${ratio(tokens.accent,tokens.surface).toFixed(2)}:1`);
}
console.log(`${checked} palette checks passed. Image text, composited gradients and overall WCAG conformance require separate review.`);
