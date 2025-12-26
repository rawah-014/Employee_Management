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
      return data.users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.company?.title || 'Employee',
        department: user.company?.department || 'General'
      }));
    } catch (error) {
      console.error('EmployeeAPI Error:', error);
      return [];
    }
  }
}
