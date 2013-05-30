/**
 *  A brief example of the filter function in async.js
 */

async = require('async')
, fs = require('fs');

async.filter(['file1','file2','file3'], fs.exists, function(results){
    // results now equals an array of the existing files
    console.log('Existing files: ' + results);
});