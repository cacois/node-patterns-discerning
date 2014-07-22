/**
 *  Examples of reading a file many times concurrently, using
 *  both the standard Node.js fs module and scale-fs
 */

/*
var fs = require('fs');
 
// 245 appears to be the maximum number of file
// handles for a single process in OSX. This
// should throw an error, while 245 iterations won't.
var ctr = 0;
for (var i = 0; i < 246; i++) {
   fs.readFile('file1', function(){
        ctr++;
    });
}

setTimeout(function(){
  console.log("I read the file " + ctr + " times");
}, 1000);
*/


// On the other hand, this is what happens when we use
// scale-fs
var fs = require('scale-fs');
ctr = 0;

for (var i = 0; i < 10000; i++) {
   fs.readFile('file1', function(){
        ctr++;
   });
}

setTimeout(function(){
  console.log("I _think_ I read " + ctr + " files");
}, 1000);
