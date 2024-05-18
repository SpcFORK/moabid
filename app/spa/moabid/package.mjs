/** @type {Record<string, string>} */
let pkg;
const STATIC_PATH = 'https://unpkg.com/moabid/package.json';
try {
  if (typeof globalThis?.window === 'undefined') pkg = await import('./package.json')
  else await fetch(STATIC_PATH).then(r => r.json()).then(r => pkg = r)
} catch (e) {
  // Just FS it
  const fs = await import('fs');
  pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
}
export default pkg;