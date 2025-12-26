export class PaginationComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.pageChangeCallback = null;
  }
  // Registers a callback to be invoked when the page changes
  onPageChange(callback) {
    this.pageChangeCallback = callback;
  }

  render({ totalItems, pageSize, currentPage }) {
    this.container.innerHTML = "";

    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages <= 1) return;

    const wrapper = document.createElement("div");
    wrapper.className = "pagination";

    // Prev
    const prevBtn = this.createButton("Prev", currentPage > 1, () => {
      this.pageChangeCallback?.(currentPage - 1);
    });
    wrapper.appendChild(prevBtn);

    // Page numbers (simple window)
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let p = start; p <= end; p++) {
      const btn = this.createButton(String(p), true, () => {
        this.pageChangeCallback?.(p);
      });

      if (p === currentPage) {
        btn.disabled = true;
        btn.classList.add("active");
      }

      wrapper.appendChild(btn);
    }

    // Next
    const nextBtn = this.createButton("Next", currentPage < totalPages, () => {
      this.pageChangeCallback?.(currentPage + 1);
    });
    wrapper.appendChild(nextBtn);

    this.container.appendChild(wrapper);
  }

  createButton(label, enabled, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.disabled = !enabled;
    btn.addEventListener("click", onClick);
    return btn;
  }
}
