export class EmployeeAPI {
  static API_URL = 'https://dummyjson.com/users';

  static async fetchEmployees() {
    try {
      const response = await fetch(this.API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();

      // Normalize data shape
      const employees = data.users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.company?.title || 'Employee',
        department: user.company?.department || 'General'
      }));

      // Create a large dataset for virtual scrolling demo
      const big = [];
      for (let i = 0; i < 20; i++) {
        big.push(
          ...employees.map(e => ({
            ...e,
            id: e.id + i * 1000
          }))
        );
      }

      return big;
    } catch (error) {
      console.error('EmployeeAPI Error:', error);
      return [];
    }
  }
}
