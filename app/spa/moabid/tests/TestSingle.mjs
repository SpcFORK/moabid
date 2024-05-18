import moabid from '../index.mjs';

export default function TestSingle() {
  for (let i = 1; i <= 10 ** 3; i *= 10) {
    let m = moabid.generateMoabID(i);
    console.log(m);
    console.log(moabid.identifyMoabID(m));
  }

  return new Promise(r => setTimeout(r, 10));
}
