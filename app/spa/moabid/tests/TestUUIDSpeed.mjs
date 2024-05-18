export default async function TestUUIDSpeed() {
  let arrs = [];
  for (let i = 0; i < 100 ** 2; i++)
    arrs.push(crypto.randomUUID());
  await new Promise(r => setTimeout(r, 10)); // Throttle to prevent crash
  console.log(arrs);
}
