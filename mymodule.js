/**
 * This is a brief example of a module, showing exposed
 * attributes/methods and the ability to encapsulate other
 * functionality in a namespace/scope local to the module.
 */

var privateVal = 'I am Private!';

module.exports = {
    answer: 42,
    add: function(x, y) {
        console.log(privateVal);
        return x + y;
    }

}
