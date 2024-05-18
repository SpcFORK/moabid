import TestDupes from './tests/TestDupes.mjs';
import TestQDupes from './tests/TestQDupes.mjs';
import TestQSingle from './tests/TestQSingle.mjs';

import TestSingle from './tests/TestSingle.mjs';
import TestUUIDSpeed from './tests/TestUUIDSpeed.mjs';

{
  console.log('Running Tests.');
  [TestSingle, TestDupes, TestQSingle, TestQDupes, TestUUIDSpeed].forEach(async fn => {
    console.log('Running test: ' + fn.name);
    await fn();
    console.log('Test complete.');
  });
  console.log('Tests complete!');
}