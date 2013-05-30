/**
 *  A brief example of the map function in async.js
 */

async = require('async')
, fs = require('fs');

async.map(['file1','file2','file3'], fs.stat, function(err, results){
    // results is now an array of stats for each file
    console.log('File stats: ' + JSON.stringify(results));
});

