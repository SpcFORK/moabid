// Moabid
// UID alternative  SpcFORK 2024

/**
 * Digital sum is great for finding smallest divisor!
 * @param {number} n - The number to be reduced.
 * @returns {number} The digital sum of the number.
 */
function digiSum(n = 0) {
  while (n >= 10) n = n.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  return n;
}

// Get a very deviated version hash  thing.
// import packageJSON from './package.json';
const packageJSON = (await import('./package.mjs')).default;
console.log(packageJSON);
const VERSION = parseInt((packageJSON?.version || '99.99.99').split('.').map(digiSum).join(''), 36);

// ---

/**
 * Generates a random byte using crypto API.
 * @returns {string} A random byte in base 36.
 */
function randomByte() {
  const arr = new Uint32Array(1);
  (crypto || window.crypto).getRandomValues(arr);
  return arr[0].toString(36);
}

// (2^32 − 1)
const U32LIM = Math.pow(2, 32) - 1;
/**
 * Generates a quick random byte using Math.random.
 * @returns {string} A quick random byte in base 36.
 */
function quickRandomByte() {
  const arr = new Uint32Array(1).fill(0).map(() => Math.random() * U32LIM)
  return arr[0].toString(36)
}

/**
 * Chunks the array and applies a callback to each chunk.
 * @param {Array} array - The array to be chunked.
 * @param {number} chunkSize - Size of each chunk.
 * @param {Function} callback - The callback to apply on each chunk.
 * @returns {Array} Array of processed chunks.
 */
function chunkArrayWithCallback(array = [], chunkSize = 0, callback) {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) chunks.push(callback(array.slice(i, i + chunkSize)))
  return chunks
}

/**
 * Chunks then joins the array elements.
 * @param {Array} array - The array to chunk and join.
 * @param {number} chunkSize - Size of each chunk.
 * @returns {Array} Array with joined chunk elements.
 */
function chunkJoinArray(array = [], chunkSize = 0) {
  return chunkArrayWithCallback(array, chunkSize, chunk => chunk.join(''))
}


/**
 * Generates a job with a specific length and callback function.
 * @param {number} length - The length of the job.
 * @param {Function} cb - The callback function to generate random bytes.
 * @returns {string} The generated job ID.
 */
function doJob(length = 8, cb) {
  const timestamp = Date.now();
  let id = timestamp.toString(36);
  let digilen = digiSum(length);
  let randomBytesArr = chunkArrayWithCallback(
    new Array(length).fill(0), digilen, () => cb()
  );

  let randomBytes = chunkJoinArray(randomBytesArr, digilen).join('').padEnd(length, 'f')

  return `${randomBytes}~${VERSION}~${id}`;
}

/**
 * Generates a MoabID with a specified length using the randomByte function.
 * @param {number} length - The length of the MoabID.
 * @returns {string} The generated MoabID.
 */
function generateMoabID(length = 8) {
  return doJob(length, randomByte);
}

/**
 * Quickly generates a MoabID with a specified length using the quickRandomByte function.
 * @param {number} length - The length of the MoabID.
 * @returns {string} The generated MoabID.
 */
function quickGenerateMoabID(length = 8) {
  return doJob(length, quickRandomByte);
}

/**
 * Identifies a MoabID and extracts its meaningful components.
 * @param {string} mid - The MoabID to be identified.
 * @returns {{date: string, randomBytes: string}} An object containing the date and random bytes.
 */
function identifyMoabID(mid = '') {
  let separatorIdx1 = mid.lastIndexOf('~'),
    randomBytesAndVer = mid.slice(0, separatorIdx1),
    separatorIdx2 = randomBytesAndVer.lastIndexOf('~'),
    randomBytes = randomBytesAndVer.slice(0, separatorIdx2),
    id = mid.slice(separatorIdx1 + 1),
    timestamp = parseInt(id, 36),
    dateParsed = new Date(timestamp),
    dateString = dateParsed.toISOString()
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