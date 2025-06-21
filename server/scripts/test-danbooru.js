import danbooruService from '../src/services/danbooruService.js';

/**
 * Derives a human-readable test name from a service function's name.
 * @param {string} functionName The name of the function (e.g., 'getMostRecentPostByArtist').
 * @returns {string} A user-friendly name for the test.
 */
function getTestName(functionName) {
  switch (functionName) {
    case 'getMostRecentPostByArtist':
      return 'Most Recent';
    case 'getRandomPostByArtist':
      return 'Random';
    default:
      // Fallback for unknown functions: 'getExample' -> 'Example'
      return functionName.replace('get', '').replace(/([A-Z])/g, ' $1').trim();
  }
}

/**
 * A generic test runner for Danbooru service functions.
 * @param {function} serviceFunction - The service function to call (e.g., danbooruService.getMostRecentPostByArtist).
 * @param {string} artistTag - The artist tag to test with.
 */
async function runTest(serviceFunction, artistTag) {
  const testName = getTestName(serviceFunction.name);
  console.log(`--- Fetching ${testName.toUpperCase()} post for artist: "${artistTag}" ---`);
  try {
    const post = await serviceFunction(artistTag);

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
 * You can change the artist names in this function to test different artists.
 * List of functions:
 * danbooruService.getMostRecentPostByArtist
 * danbooruService.getRandomPostByArtist
 */

async function main() {
  const artistName = 'toosaka_asagi';
  // await runTest(danbooruService.getMostRecentPostByArtist, artistName);

  // console.log(''); // Add a blank line for readability

  await runTest(danbooruService.getRandomPostByArtist, artistName);
}

main(); 