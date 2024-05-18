// Moabid
// UID alternative  SpcFORK 2024

/** Digital sum is great for finding smallest divisor ! */
function digiSum(n = 0) {
  while (n >= 10) n = n.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  return n;
}

function randomByte() {
  const arr = new Uint32Array(1);
  (crypto || window.crypto).getRandomValues(arr);
  return arr[0].toString(36)
}

// (2^32 − 1)
const U32LIM = Math.pow(2, 32) - 1;
function quickRandomByte() {
  const arr = new Uint32Array(1).fill(0).map(() => Math.random() * U32LIM)
  return arr[0].toString(36)
}

function chunkArrayWithCallback(array = [], chunkSize = 0, callback) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) chunks.push(callback(array.slice(i, i + chunkSize)));
  return chunks;
}

function chunkJoinArray(array = [], chunkSize = 0) {
  return chunkArrayWithCallback(array, chunkSize, chunk => chunk.join(''));
}

function doJob(length = 8, cb) {
  const timestamp = Date.now();
  let id = timestamp.toString(36);
  let digilen = digiSum(length);
  let randomBytesArr = chunkArrayWithCallback(
    new Array(length).fill(0), digilen, () => cb()
  );

  let randomBytes = chunkJoinArray(randomBytesArr, digilen).join('').padEnd(length, 'f')

  return `${randomBytes}~${id}`;
}

function generateMoabID(length = 8) {
  return doJob(length, randomByte);
}

function quickGenerateMoabID(length = 8) {
  return doJob(length, quickRandomByte);
}

function identifyMoabID(mid = '') {
  let separatorIdx = mid.lastIndexOf('~'),
    randomBytes = mid.slice(0, separatorIdx),
    id = mid.slice(separatorIdx + 1),
    timestamp = parseInt(id, 36),
    dateParsed = new Date(timestamp),
    dateString = dateParsed.toISOString().slice(0, 10)
  return {
    date: dateString,
    randomBytes,
  }
}

export default {
  digiSum,
  generateMoabID,
  quickGenerateMoabID,
  identifyMoabID,
}