export class Employee {
  constructor({ id, name, email, role, department }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.department = department;
  }

  matchesSearch(query) {
    const q = query.toLowerCase();
    return (
      this.name.toLowerCase().includes(q) ||
      this.role.toLowerCase().includes(q) ||
      this.department.toLowerCase().includes(q)
    );
  }
}
