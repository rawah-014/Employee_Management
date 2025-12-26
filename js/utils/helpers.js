export function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export function exportEmployeesToJSON(employees) {
  const data = employees.map(e => ({
    id: e.id,
    name: e.name,
    email: e.email,
    role: e.role,
    department: e.department
  }));

  downloadFile(
    'employees.json',
    JSON.stringify(data, null, 2),
    'application/json'
  );
}

export function exportEmployeesToCSV(employees) {
  const headers = ['id', 'name', 'email', 'role', 'department'];

  const rows = employees.map(e => [
    e.id,
    escapeCSV(e.name),
    escapeCSV(e.email),
    escapeCSV(e.role),
    escapeCSV(e.department)
  ].join(','));

  const csv = [headers.join(','), ...rows].join('\n');

  downloadFile('employees.csv', csv, 'text/csv');
}

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const s = String(value).replace(/"/g, '""');
  // wrap with quotes to safely handle commas/newlines
  return `"${s}"`;
}
