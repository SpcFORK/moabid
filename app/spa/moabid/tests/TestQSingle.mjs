import moabid from '../index.mjs';

export default function TestQSingle() {
  for (let i = 1; i <= 10 ** 3; i *= 10) {
    let m = moabid.quickGenerateMoabID(i);
    console.log(m);
    console.log(moabid.identifyMoabID(m));
  }

  return new Promise(r => setTimeout(r, 10));
}
