import { Employee } from './Employee.js';

export class EmployeeCollection {
  constructor() {
    this.employees = [];
    this.subscribers = [];
  }

  setEmployees(rawEmployees) {
    this.employees = rawEmployees.map(emp => new Employee(emp));
    this.notify();
  }

  addEmployee(employeeData) {
    const employee = new Employee(employeeData);
    this.employees.push(employee);
    this.notify();
  }

  deleteEmployee(id) {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.notify();
  }

  search(query) {
    if (!query) return this.employees;
    return this.employees.filter(emp => emp.matchesSearch(query));
  }

  filterByDepartments(departments) {
    if (!departments || departments.length === 0) return this.employees;
    return this.employees.filter(emp =>
      departments.includes(emp.department)
    );
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.employees));
  }
}
