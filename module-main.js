/**
 * This is the launchable example usage code that goes along 
 * with the co-located mymodule.js. It shows what data can 
 * and cannot be accessed from the module.
 */

mod = require('./mymodule');
 
console.log('The answer: '+ mod.answer);
 
var sum = mod.add(4,5);
console.log('Sum: ' + sum);
console.log('This should fail: ' + mod.privateVal);