// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./employee')

// Constructor for Manager that extends from Employee
// add office number, role returns manager
class Manager extends Employee {
  constructor(name, id, email, officeNum) {
    super(name, id, email);
    this.officeNum = officeNum;
  }
  
  getOfficeNumber() {
    return this.officeNum;
  }

  getRole() {
    return 'Manager';
  }

};


module.exports = Manager;