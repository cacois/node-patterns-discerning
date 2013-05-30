/**
 * This code illustrates an implementation of the Request Cache 
 * pattern for handling many serial requests for a resource. 
 */

var fs = require('fs');

file = 'file.txt';

// Caching wrapper around the real fs.readFile()
var requestCache = {};
function cachingReadFile(filename, callback) {
  
  // Do we have the resource in cache?
  if (filename in requestCache) { 
    var value = requestCache[filename];

    // Behave asynchronously by delaying until next tick
    process.nextTick(function () {
      callback(null, value);
    });
    
    return;
  }

  // If not, start a new request
  fs.readFile(filename, onRead);

  // Cache the result if there is no error
  function onRead(err, contents) {
    if (!err) requestCache[filename] = contents;
    callback(err, contents);
  }
}

// Request the file 10,000 times in series
// Note: to request serially, we need to iterate 
// with callbacks, rather than within a loop
var its = 10000;
cachingReadFile(file, next);

function next(err, contents) {
  console.log('File contents: ' + contents);
  if (!(its--)) return;
  cachingReadFile(file, next);
}