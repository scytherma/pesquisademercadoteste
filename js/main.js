// Main Application Class
class MarketSenseApp {
    constructor() {
        this.searchSection = new SearchSection();
        this.trendChart = new TrendChart();
        this.brazilMap = new BrazilMap();
        this.demographics = new Demographics();
        this.competitorTable = new CompetitorTable();
        this.suggestedPrice = new SuggestedPrice();
        this.salesInsights = new SalesInsights();
        this.aiInsights = new AIInsights();
        
        this.resultsSection = document.getElementById('results-section');
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Listen for search events
        document.addEventListener('search', (e) => {
            this.handleSearch(e.detail.searchTerm);
        });
        
        // Add some sample data for demonstration
        this.addSampleDataButton();
    }
    
    async handleSearch(searchTerm) {
        if (this.isLoading) return;
        
        this.setLoading(true);
        this.hideResults();
        
        try {
            console.log(`Iniciando análise para: ${searchTerm}`);
            
            // 1. Busca os dados das fontes externas em paralelo
            const [trendData, ibgeData, competitors] = await Promise.all([
                fetchGoogleTrendsData(searchTerm),
                fetchIBGEData(searchTerm),
                fetchMarketplaceData(searchTerm)
            ]);
            
            // 2. Gera insights de IA
            const aiAnalysis = await generateAIInsights(
                searchTerm, 
                trendData, 
                competitors, 
                ibgeData.avg_income
            );
            
            // 3. Consolida todos os dados
            const analysisData = {
                product_name: searchTerm,
                trend_data: trendData,
                regional_data: ibgeData.regions_interest,
                demographics: {
                    avg_income: ibgeData.avg_income,
                    age_distribution: ibgeData.age_distribution
                },
                competitors: competitors,
                ai_insights: aiAnalysis,
                search_date: new Date().toISOString()
            };
            
            // 4. Renderiza os resultados
            this.renderResults(analysisData);
            
            console.log('Análise concluída com sucesso!');
            
        } catch (error) {
            console.error('Erro durante a análise:', error);
            this.showError('Erro ao realizar análise. Tente novamente.');
        } finally {
            this.setLoading(false);
        }
    }
    
    renderResults(data) {
        // Render each component
        this.trendChart.render(data.trend_data);
        this.brazilMap.render(data.regional_data);
        this.demographics.render(data.demographics);
        this.competitorTable.render(data.competitors);
        this.suggestedPrice.render(data.ai_insights.suggested_price, data.ai_insights.price_rationale);
        this.salesInsights.render(data.ai_insights);
        this.aiInsights.render(data.ai_insights);
        
        // Show results with animation
        this.showResults();
        
        // Re-initialize Lucide icons for new content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    setLoading(loading) {
        this.isLoading = loading;
        this.searchSection.setLoading(loading);
    }
    
    showResults() {
        this.resultsSection.classList.remove('hidden');
        this.resultsSection.classList.add('show');
        
        // Animate cards with stagger
        const cards = this.resultsSection.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.classList.add('animate-fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    hideResults() {
        this.resultsSection.classList.add('hidden');
        this.resultsSection.classList.remove('show');
    }
    
    showError(message) {
        // Simple error display - could be enhanced with a proper modal/toast
        alert(message);
    }
    
    addSampleDataButton() {
        // Add a sample data button for demonstration
        const sampleButton = document.createElement('button');
        sampleButton.textContent = 'Testar com dados de exemplo';
        sampleButton.className = 'search-button';
        sampleButton.style.marginTop = '1rem';
        sampleButton.style.width = '100%';
        
        sampleButton.addEventListener('click', () => {
            this.searchSection.setSearchTerm('smartphone');
            this.handleSearch('smartphone');
        });
        
        document.querySelector('.search-content').appendChild(sampleButton);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarketSenseApp();
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});