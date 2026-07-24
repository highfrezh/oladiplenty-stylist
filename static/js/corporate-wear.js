(function() {
    'use strict';

    const sizeFilter = document.getElementById('sizeFilter');
    const sortSelect = document.getElementById('sortSelect');

    if (sizeFilter) {
        sizeFilter.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                sizeFilter.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                // Demo only: this prototype doesn't have per-product size data wired up yet.
            });
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            // Demo only: sorting logic would go here
        });
    }
})();
