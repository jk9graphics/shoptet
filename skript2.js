<script>
(function () {
  const FILTER_IDS = {
    znacka: 'c-id-62',
    model: 'c-id-65',
    rok: 'c-id-68'
  };
  let debounceTimer = null;
  let hasReorderedOnce = false;
  function reorderFilters() {
    const container = document.querySelector('.filter-sections');
    const wrapper = document.querySelector('.filters');
    const znacka = document.querySelector(`[class*="${FILTER_IDS.znacka}"]`);
    const model = document.querySelector(`[class*="${FILTER_IDS.model}"]`);
    const rok = document.querySelector(`[class*="${FILTER_IDS.rok}"]`);

    if (!container || !znacka || !model || !rok) return;
    if (!hasReorderedOnce && wrapper) {
      wrapper.style.opacity = '0';
      wrapper.style.transition = 'opacity 0.2s ease';
    }
    const order = [znacka, model, rok];
    order.forEach((el, i) => {
      if (container.children[i] !== el) {
        container.insertBefore(el, container.children[i]);
      }
    });

    if (!hasReorderedOnce) {
      setTimeout(() => {
        if (wrapper) wrapper.style.opacity = '1';
        hasReorderedOnce = true;
      }, 100);
    }
  }

  function debounceReorder() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(reorderFilters, 200);
  }
  document.addEventListener('DOMContentLoaded', reorderFilters);
  const observer = new MutationObserver(debounceReorder);
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>