Employee Management System

A lightweight employee management dashboard built with HTML5, CSS3, and modern vanilla JavaScript. The application retrieves employee data from the DummyJSON Users API, organizes it through a modular client-side architecture, and provides practical tools for browsing and managing employee records.



Features

Loads employee records from an external REST API.

Normalizes API responses into a consistent employee model.

Searches employees by name, role, or department.

Uses a 200 ms debounce to keep search input responsive.

Filters employees by one or more departments.

Adds new employees through a native browser dialog.

Deletes employees after user confirmation.

Exports the current employee collection as CSV or JSON.

Uses virtual scrolling for result sets larger than 50 records.

Provides reusable table, search, filter, and pagination components.

Runs entirely in the browser with no package installation or build step.

Technology Stack

Technology

Purpose

HTML5

Semantic page structure, controls, form, and dialog

CSS3

Layout, table styling, filters, modal, and scrollable viewport

JavaScript ES6+

Application logic, modules, models, components, and API integration

Fetch API

Retrieves employee data from DummyJSON

Blob and Object URL APIs

Generates downloadable CSV and JSON files

Project Structure

Employee_Management/
├── css/
│   └── style.css
├── js/
│   ├── api/
│   │   └── EmployeeAPI.js
│   ├── components/
│   │   ├── FilterComponent.js
│   │   ├── PaginationComponent.js
│   │   ├── SearchComponent.js
│   │   └── TableComponent.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── EmployeeCollection.js
│   ├── services/
│   │   └── DataService.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── index.html
└── README.md

Architecture

Layer

Responsibility

EmployeeAPI

Fetches users from DummyJSON and maps the response to the application's employee structure

Employee

Represents one employee and contains employee-specific search behavior

EmployeeCollection

Stores employees and provides add, delete, search, filter, and subscriber notification operations

DataService

Coordinates API access and exposes the employee collection to the application

UI components

Render the table, search control, department filter, pagination, and virtualized rows

App

Initializes the application, manages UI state, combines search and filtering, and coordinates rendering

Export helpers

Convert employee records to CSV or JSON and trigger browser downloads

Getting Started

Prerequisites

You only need:

A modern web browser.

A small local HTTP server, such as Python's built-in server or the VS Code Live Server extension.

The project uses JavaScript modules, so it should be served over HTTP instead of opening index.html directly from the file system.

Run Locally

Clone the repository:

git clone https://github.com/rawah-tech/Employee_Management.git
cd Employee_Management

Start a local server.

On Windows:

py -m http.server 5500

On macOS or Linux:

python3 -m http.server 5500

Open http://localhost:5500 in your browser.

How to Use

Wait for the employee records to load.

Enter a name, role, or department in the search field.

Select one or more departments to narrow the results further.

Use Clear to remove the department selection.

Select Add Employee to create a new in-memory record.

Select Delete beside an employee to remove that record.

Use Export CSV or Export JSON to download the current employee collection.

Demo Data and Virtual Scrolling

The application retrieves users from:

https://dummyjson.com/users

The returned records are normalized into the following structure:

{
  id,
  name,
  email,
  role,
  department
}

To demonstrate performance with a larger collection, the API layer expands the returned sample data 20 times and assigns unique IDs to the generated records. When more than 50 results are visible, the table renders only the rows inside the current scroll viewport, plus a small buffer.

Current Scope

Employee additions and deletions are stored only in browser memory.

Refreshing the page restores the API-generated demo dataset.

Changes are not written back to DummyJSON.

CSV and JSON exports contain the full current in-memory collection, not only the filtered rows.

The application depends on internet access to retrieve its initial demo data.

Authentication, authorization, database persistence, editing, automated tests, and a production backend are not included yet.

Possible Improvements

Add an edit-employee workflow.

Connect the interface to a persistent REST API and database.

Add loading, empty, and user-facing error states.

Add stronger form validation and duplicate detection.

Update department filters when new departments are added.

Add unit, integration, and end-to-end tests.

Improve responsive styling and keyboard accessibility.

Add continuous integration and deploy the application with GitHub Pages.

Author

Rawah Hassan

GitHub: @rawah-tech

Repository: Employee Management System

Acknowledgements

Demo employee data is provided by DummyJSON.
