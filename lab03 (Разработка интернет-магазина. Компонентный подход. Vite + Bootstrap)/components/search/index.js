export class SearchComponent {
    constructor(parent, onSearch) {
        this.parent = parent;
        this.onSearch = onSearch;
        this.searchQuery = '';
    }

    setSearchQuery(query) {
        this.searchQuery = query;
        const searchInput = this.parent.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = query;
        }
    }

    render() {
        const searchHTML = `
            <div class="search-container">
                <input 
                    type="text" 
                    class="search-input" 
                    placeholder="Поиск товаров..."
                    value="${this.searchQuery}"
                >
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', searchHTML);
        const searchInput = this.parent.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => this.onSearch(e));
    }
} 