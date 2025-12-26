import { DataService } from "./services/DataService.js";
import { TableComponent } from "./components/TableComponent.js";
import { SearchComponent } from "./components/SearchComponent.js";
import { PaginationComponent } from "./components/PaginationComponent.js";
import {
  exportEmployeesToCSV,
  exportEmployeesToJSON,
} from "./utils/helpers.js";

class App {
  constructor() {
    this.dataService = new DataService();

    this.pageSize = 10;
    this.currentPage = 1;
    this.currentQuery = "";

    this.table = new TableComponent("tableContainer", (id) => {
      this.dataService.deleteEmployee(id);

      // after delete, ensure current page is not out of range
      const total = this.getFilteredData().length;
      const totalPages = Math.max(1, Math.ceil(total / this.pageSize));
      this.currentPage = Math.min(this.currentPage, totalPages);

      this.render();
    });

    this.search = new SearchComponent(document.getElementById("searchInput"));

    this.pagination = new PaginationComponent(
      document.getElementById("paginationContainer")
    );
    this.pagination.onPageChange((page) => {
      this.currentPage = page;
      this.render();
    });
  }

  async init() {
    await this.dataService.loadEmployees();
    this.setupAddEmployeeModal();

    this.search.onSearch((query) => {
      this.currentQuery = query;
      this.currentPage = 1; // reset page when searching
      this.render();
    });

    this.render();

    // Export buttons
    document.getElementById("exportCSV").addEventListener("click", () => {
      exportEmployeesToCSV(this.dataService.collection.employees);
    });

    document.getElementById("exportJSON").addEventListener("click", () => {
      exportEmployeesToJSON(this.dataService.collection.employees);
    });
  }

  getFilteredData() {
    // search returns employees filtered by name/role/department
    return this.dataService.search(this.currentQuery);
  }

  getPaginatedData(data) {
    const start = (this.currentPage - 1) * this.pageSize;
    return data.slice(start, start + this.pageSize);
  }

  render() {
    const filtered = this.getFilteredData();
    const pageData = this.getPaginatedData(filtered);

    this.table.render(pageData);

    this.pagination.render({
      totalItems: filtered.length,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
    });
  }

  // add employee model
  setupAddEmployeeModal() {
    const dialog = document.getElementById("employeeDialog");
    const addBtn = document.getElementById("addEmployeeBtn");
    const cancelBtn = document.getElementById("cancelEmployee");
    const form = document.getElementById("employeeForm");

    addBtn.addEventListener("click", () => {
      form.reset();
      dialog.showModal();
    });

    cancelBtn.addEventListener("click", () => {
      dialog.close();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("empName").value.trim();
      const email = document.getElementById("empEmail").value.trim();
      const role = document.getElementById("empRole").value.trim();
      const department = document.getElementById("empDept").value.trim();

      // simple id generation
      const newId = Date.now();

      this.dataService.addEmployee({
        id: newId,
        name,
        email,
        role,
        department,
      });

      dialog.close();

      // reset pagination to show the new record clearly
      this.currentQuery = "";
      this.currentPage = 1;
      this.render();
    });
  }
}

new App().init();
