import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// This script runs before the main application starts.
// Its job is to hide the annoying deprecation warnings because
// --loader will give me a lot of text in my command line
register('ts-node/esm', pathToFileURL('./')); 