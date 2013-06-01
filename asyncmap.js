/**
 *  A brief example of the map function in async.js
 */

async = require('async')
, fs = require('fs');

var arr = ['file1','file2','file3'];

async.map(arr, fs.stat, function(err, results){
    // results is an array of stats for each file
    console.log('File stats: ' + 
                 JSON.stringify(results));
});
