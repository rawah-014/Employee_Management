export class FilterComponent {
  constructor(selectEl, clearBtnEl) {
    this.selectEl = selectEl;
    this.clearBtnEl = clearBtnEl;
    this.changeCallback = null;

    this.selectEl.addEventListener('change', () => {
      this.changeCallback?.(this.getSelectedValues());
    });

    this.clearBtnEl.addEventListener('click', () => {
      Array.from(this.selectEl.options).forEach(opt => (opt.selected = false));
      this.changeCallback?.([]);
    });
  }

  onChange(callback) {
    this.changeCallback = callback;
  }

  setOptions(departments) {
    // remove duplicates + sort
    const unique = Array.from(new Set(departments)).sort();

    this.selectEl.innerHTML = '';
    unique.forEach(dep => {
      const opt = document.createElement('option');
      opt.value = dep;
      opt.textContent = dep;
      this.selectEl.appendChild(opt);
    });
  }

  getSelectedValues() {
    return Array.from(this.selectEl.selectedOptions).map(o => o.value);
  }
}
