export class TableComponent {
  constructor(containerId, onDelete) {
    this.container = document.getElementById(containerId);
    this.onDelete = onDelete;
  }

  render(employees) {
    this.container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'employee-table';

    table.appendChild(this.createHeader());
    table.appendChild(this.createBody(employees));

    this.container.appendChild(table);
  }

  createHeader() {
    const thead = document.createElement('thead');
    const row = document.createElement('tr');

    ['Name', 'Role', 'Department', 'Actions'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      row.appendChild(th);
    });

    thead.appendChild(row);
    return thead;
  }

  createBody(employees) {
    const tbody = document.createElement('tbody');

    employees.forEach(emp => {
      const row = document.createElement('tr');

      row.appendChild(this.createCell(emp.name));
      row.appendChild(this.createCell(emp.role));
      row.appendChild(this.createCell(emp.department));

      const actionCell = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';

      deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this employee?')) {
          this.onDelete(emp.id);
        }
      });

      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);

      tbody.appendChild(row);
    });

    return tbody;
  }

  createCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
  }
}
