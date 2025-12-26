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


  //virtual scrolling
  renderVirtual(employees, rowHeight = 44) {
    // Clear container
    this.container.innerHTML = '';

    // Outer scroll area (we use the container itself as scroll host)
    const scrollHost = this.container;

    // Spacer simulates full height
    const spacer = document.createElement('div');
    spacer.style.position = 'relative';
    spacer.style.height = `${employees.length * rowHeight}px`;
    scrollHost.appendChild(spacer);

    // Table wrapper that will move inside spacer
    const table = document.createElement('table');
    table.className = 'employee-table';
    table.style.position = 'absolute';
    table.style.top = '0';
    table.style.left = '0';
    table.style.right = '0';

    table.appendChild(this.createHeader());

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    spacer.appendChild(table);

    const renderChunk = () => {
      const scrollTop = scrollHost.scrollTop;
      const viewportHeight = scrollHost.clientHeight;

      const startIndex = Math.floor(scrollTop / rowHeight);
      const visibleCount = Math.ceil(viewportHeight / rowHeight) + 6; // buffer rows
      const endIndex = Math.min(employees.length, startIndex + visibleCount);

      // Move the table down to match scroll position
      table.style.transform = `translateY(${startIndex * rowHeight}px)`;

      // Render only visible rows
      tbody.innerHTML = '';
      for (let i = startIndex; i < endIndex; i++) {
        const emp = employees[i];
        tbody.appendChild(this.createRow(emp));
      }
    };

    // Keep reference to remove/rebind if needed
    if (this._onScroll) scrollHost.removeEventListener('scroll', this._onScroll);

    this._onScroll = () => renderChunk();
    scrollHost.addEventListener('scroll', this._onScroll);

    // Initial render
    scrollHost.scrollTop = 0;
    renderChunk();
  }

  createRow(emp) {
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

    return row;
  }

}


