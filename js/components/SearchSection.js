class SearchSection {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.searchButtonText = this.searchButton.querySelector('.search-button-text');
        this.loadingIcon = this.searchButton.querySelector('.search-loading-icon');
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isLoading) {
                this.handleSearch();
            }
        });
        
        this.searchButton.addEventListener('click', () => {
            if (!this.isLoading) {
                this.handleSearch();
            }
        });
        
        // Input validation
        this.searchInput.addEventListener('input', () => {
            this.updateButtonState();
        });
        
        // Initial state
        this.updateButtonState();
    }
    
    handleSearch() {
        const searchTerm = this.searchInput.value.trim();
        if (!searchTerm) return;
        
        // Dispatch custom event
        const searchEvent = new CustomEvent('search', {
            detail: { searchTerm }
        });
        document.dispatchEvent(searchEvent);
    }
    
    setLoading(loading) {
        this.isLoading = loading;
        this.searchButton.disabled = loading;
        this.searchInput.disabled = loading;
        
        if (loading) {
            this.searchButtonText.style.display = 'none';
            this.loadingIcon.classList.remove('hidden');
        } else {
            this.searchButtonText.style.display = 'block';
            this.loadingIcon.classList.add('hidden');
        }
        
        this.updateButtonState();
    }
    
    updateButtonState() {
        const hasValue = this.searchInput.value.trim().length > 0;
        this.searchButton.disabled = this.isLoading || !hasValue;
    }
    
    getSearchTerm() {
        return this.searchInput.value.trim();
    }
    
    setSearchTerm(term) {
        this.searchInput.value = term;
        this.updateButtonState();
    }
}