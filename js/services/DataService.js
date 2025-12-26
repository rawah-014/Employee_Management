import { EmployeeAPI } from '../api/EmployeeAPI.js';
import { EmployeeCollection } from '../models/EmployeeCollection.js';

export class DataService {
  constructor() {
    this.collection = new EmployeeCollection();
  }

  async loadEmployees() {
    try {
      const data = await EmployeeAPI.fetchEmployees(); // ✅ call static
      this.collection.setEmployees(data);
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  }

  addEmployee(employeeData) {
    this.collection.addEmployee(employeeData);
  }

  deleteEmployee(employeeId) {
    this.collection.deleteEmployee(employeeId);
  }

  search(query) {
    return this.collection.search(query);
  }

  filterByDepartments(departments) {
    return this.collection.filterByDepartments(departments);
  }

  subscribe(callback) {
    this.collection.subscribe(callback);
  }
}
