import moabid from '../index.mjs';

export default async function TestQDupes() {
  let cache = {};
  for (let i = 8; i < 10; i++) {
    // Add IDs to cache up until 100 or until we encounter a duplicate to throw
    for (let j = 0; j < 1000; j++) {
      let m = moabid.quickGenerateMoabID(i);
      let a = moabid.identifyMoabID(m).randomBytes;
      if (!cache[a])
        cache[a] = true;
      else
        throw new Error('Duplicate ID generated');
    }

    await new Promise(r => setTimeout(r, 10)); // Throttle to prevent crash
    console.log('Valid!', i);
  }
  console.log(cache);
  console.log('Done!');
}
