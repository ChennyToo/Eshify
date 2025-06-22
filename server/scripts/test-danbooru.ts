import danbooruService from '../src/services/danbooruService.js';

type ServiceFunction = (artistTag: string, n?: number) => Promise<any>;

/**
 * Derives a human-readable test name from a service function's name.
 * @param {string} functionName The name of the function.
 * @returns {string} A user-friendly name for the test.
 */
function getTestName(functionName: string, n?: number): string {
  switch (functionName) {
    case 'getMostRecentPostByArtist':
      return 'Most Recent';
    case 'getRandomPostByArtist':
      return 'Random';
    case 'getNthMostRecentPostByArtist':
      return `${n}th Most Recent`;
    default:
      return functionName.replace('get', '').replace(/([A-Z])/g, ' $1').trim();
  }
}

/**
 * A generic test runner for Danbooru service functions.
 * @param {ServiceFunction} serviceFunction - The service function to call.
 * @param {string} artistTag - The artist tag to test with.
 * @param {number} [n] - An optional number for functions that require it.
 */
async function runTest(serviceFunction: ServiceFunction, artistTag: string, n?: number): Promise<void> {
  const testName = getTestName(serviceFunction.name, n);
  console.log(`--- Fetching ${testName.toUpperCase()} post for artist: "${artistTag}" ---`);
  try {
    const post = await serviceFunction(artistTag, n);

    if (post) {
      console.log(`✅ Success! Found a ${testName.toLowerCase()} post.`);
      console.log('  - Post ID:', post.id);
      if (post.created_at) {
        console.log('  - Created At:', post.created_at);
      }
      console.log('  - Rating:', post.rating);
      console.log('  - File URL:', post.file_url);
    } else {
      console.warn(`  ⚠️ Could not find a post for artist "${artistTag}".`);
    }
  } catch (error) {
    console.error('  ❌ Test failed.', error);
  } finally {
    console.log('--- Test Complete ---');
  }
}

/**
 * Main function to run the test script.
 */
async function main(): Promise<void> {
  const artistName = 'toosaka_asagi';
  
//   await runTest(danbooruService.getMostRecentPostByArtist, artistName);
//   console.log('');

//   await runTest(danbooruService.getRandomPostByArtist, artistName);
//   console.log('');
  
  await runTest(danbooruService.getNthMostRecentPostByArtist, artistName, 5);
}

main(); 