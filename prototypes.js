/** 
 * Some example code to show the behavior of JavaScript prototypes
 */

function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

Person.prototype = {
  salute: function () {
    return "Hello world, my name is " + this.firstname;
  },
  marital_status: 'Single'
};

var p = new Person("Philip", "Fry");
console.log(p.salute());
console.log(p.marital_status);

// only shows original attributes, not added prototype attrs
console.log(p);
// but the expanded attributes are still there!
console.log(p.marital_status);
// Add a new prototype object structure to this object 
// instance. Note: this overwrites the previous prototype, 
// so marital_status and salute() will no longer be defined
var employee = {salary: 100, title: 'Delivery Boy'};
p.__proto__ = employee;

//marital_status no longer defined
console.log(p.marital_status);

console.log(p.firstname);
console.log(p.lastname);
console.log(p.salary);
console.log(p.title);
console.log(p.marital_status);