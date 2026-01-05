/**
 * Donkieskraal Shop Functionality
 * Handles search, category filtering, and sorting for the shop page.
 */

document.addEventListener('DOMContentLoaded', () => {
    const desktopSearchInput = document.getElementById('desktop-search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const categoryFilters = document.getElementById('category-filters');
    const sortSelect = document.getElementById('sort-select');
    const productGrid = document.getElementById('product-grid');
    const resultsCount = document.getElementById('results-count');
    const productCards = Array.from(document.querySelectorAll('.product-card'));

    if (!productGrid || productCards.length === 0) return;

    // Initial state
    let state = {
        searchTerm: '',
        categories: ['all'],
        sortBy: 'popular'
    };

    /**
     * Filters and sorts products based on the current state.
     */
    function updateDisplay() {
        // 1. Filter
        const filteredCards = productCards.filter(card => {
            const matchesSearch = card.dataset.name.toLowerCase().includes(state.searchTerm.toLowerCase());
            const matchesCategory = state.categories.includes('all') || state.categories.includes(card.dataset.category);
            return matchesSearch && matchesCategory;
        });

        // 2. Sort
        const sortedCards = [...filteredCards].sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            const nameA = a.dataset.name.toLowerCase();
            const nameB = b.dataset.name.toLowerCase();

            switch (state.sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    // In a real app, this would use a date. For now, we'll use price as a proxy or just keep original order.
                    return 0;
                default: // 'popular'
                    return 0; // Keep original DOM order
            }
        });

        // 3. Render
        productGrid.innerHTML = '';
        sortedCards.forEach(card => {
            card.style.display = 'block';
            productGrid.appendChild(card);
        });

        // Hide cards that don't match
        productCards.forEach(card => {
            if (!sortedCards.includes(card)) {
                card.style.display = 'none';
            }
        });

        // 4. Update count
        if (resultsCount) {
            resultsCount.textContent = sortedCards.length;
        }
    }

    // --- Event Listeners ---

    // Search Input (Desktop)
    if (desktopSearchInput) {
        desktopSearchInput.addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            updateDisplay();
        });
    }

    // Search Input (Mobile)
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            updateDisplay();
        });
    }

    // Category Filters
    if (categoryFilters) {
        categoryFilters.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const value = e.target.value;
                const checkboxes = Array.from(categoryFilters.querySelectorAll('input[type="checkbox"]'));

                if (value === 'all') {
                    // If 'All' is checked, uncheck others. If unchecked, keep at least one checked if possible.
                    if (e.target.checked) {
                        checkboxes.forEach(cb => { if (cb.value !== 'all') cb.checked = false; });
                    }
                } else {
                    // If a specific category is checked, uncheck 'All'
                    if (e.target.checked) {
                        const allCb = checkboxes.find(cb => cb.value === 'all');
                        if (allCb) allCb.checked = false;
                    }
                }

                // Update state
                state.categories = checkboxes
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);

                // Default to 'all' if none checked
                if (state.categories.length === 0) {
                    const allCb = checkboxes.find(cb => cb.value === 'all');
                    if (allCb) {
                        allCb.checked = true;
                        state.categories = ['all'];
                    }
                }

                updateDisplay();
            }
        });
    }

    // Sort Select
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            updateDisplay();
        });
    }

    console.log('Shop JS Loaded and Initialized');
});
