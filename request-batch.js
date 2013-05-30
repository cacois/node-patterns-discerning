/**
 * This code illustrates an implementation of the Request Batch 
 * pattern for handling many concurrent requests for a resource. 
 */

var fs = require('fs');

file = 'file.txt';

// Batching wrapper for fs.readFile()
var requestBatches = {};
function batchedReadFile(filename, callback) {
  // Is there already a batch for this file?
  if (filename in requestBatches) {
    // if so, push callback into batch
    requestBatches[filename].push(callback);
    return;
  }

  // If not, start a new request
  var callbacks = requestBatches[filename] = [callback];
  fs.readFile(filename, onRead);
  
  // Flush out the batch on complete
  function onRead(err, file) {
    delete requestBatches[filename];
    for(var i = 0;i < callbacks.length; i++) {
      // execute callback, passing arguments along
      callbacks[i](err, file);
    }
  }
}

// Request the same resource 10,000 times at once
for (var i = 0; i < 10000; i++) {
  batchedReadFile(file, onComplete);
}

function onComplete(err, file) {
  if (err) throw err;
  else console.log('File contents: ' + file);
}


