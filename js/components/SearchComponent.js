export class SearchComponent {
  constructor(inputElement) {
    this.input = inputElement;
    this.searchCallback = null;
    this.debounceTimer = null;

    this.input.addEventListener('input', (e) => {
      const value = e.target.value;

      // Debounce: wait 200ms after typing stops
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        if (this.searchCallback) {
          this.searchCallback(value);
        }
      }, 200);
    });
  }

  onSearch(callback) {
    this.searchCallback = callback;
  }
}
