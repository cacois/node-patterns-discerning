/**
 *  A brief example of the filter function in async.js
 */

async = require('async')
, fs = require('fs');

var arr = ['file1','file2','file3'];

async.filter(arr, fs.exists, function(results){
    // results is a list of the existing files
    console.log('Existing files: ' + results);
});