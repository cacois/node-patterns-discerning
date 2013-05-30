/**
 * This code illustrates an implementation of the combination of 
 * Request Batch and Request Cache patterns to robustly handle many 
 * concurrent requests for a resource. 
 */

var fs = require('fs');

file = 'file.txt';

// Wrapper for both caching and batching of requests
var requestBatches = {}, requestCache = {}, cacheLifetime = 1000;
function readFile(filename, callback) {

  // Do we have the resource in cache?
  if (filename in requestCache) {
    var value = requestCache[filename];
    
    // Behave asynchronously by delaying until next tick
    process.nextTick(function () {
      callback(null, value);
    });

    return;
  }
  // Otherwise, is there a batch for this file?
  if (filename in requestBatches) {
    requestBatches[filename].push(callback);
    return;
  }

  // If neither, create new batch and request
  var callbacks = requestBatches[filename] = [callback];
  fs.readFile(filename, onRead);

  // Cache the result if no error and flush batch
  function onRead(err, file) {
    if (!err) requestCache[filename] = file;
    delete requestBatches[filename];
    
    for (var i = 0;i < callbacks.length; i++) {
      callbacks[i](err, file);
    }
  }
}

// Execution: Request the same resource 10,000 times using 100 parallel chains
var its = 10000;

function startChain() {
  readFile(file, iterate);
}

function iterate(err, contents) {
  console.log('File contents: ' + contents);
  
  if (its-- <= 0) return;
  readFile(file, iterate);
}

// Kick off 100 parallel chains
for (var i = 0; i < 100; i++) {
  startChain();
}