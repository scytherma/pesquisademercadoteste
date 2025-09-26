class SalesInsights {
    constructor() {
        this.container = document.getElementById('sales-insights-content');
    }
    
    render(data) {
        this.container.innerHTML = '';
        
        // Seasonality insight
        if (data.seasonality) {
            this.addSeasonalityInsight(data.seasonality);
        }
        
        // Opportunities
        if (data.opportunities && data.opportunities.length > 0) {
            this.addOpportunities(data.opportunities);
        }
        
        // Risks
        if (data.risks && data.risks.length > 0) {
            this.addRisks(data.risks);
        }
    }
    
    addSeasonalityInsight(seasonality) {
        const seasonalityText = this.getSeasonalityText(seasonality);
        
        const insightElement = document.createElement('div');
        insightElement.className = 'insight-item animate-fade-in';
        insightElement.innerHTML = `
            <i data-lucide="calendar" class="insight-icon"></i>
            <div class="insight-content">
                <h4>Sazonalidade</h4>
                <p>${seasonalityText}</p>
            </div>
        `;
        
        this.container.appendChild(insightElement);
    }
    
    addOpportunities(opportunities) {
        const opportunitiesElement = document.createElement('div');
        opportunitiesElement.className = 'animate-fade-in animate-stagger-1';
        opportunitiesElement.innerHTML = `
            <p style="font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Oportunidades:</p>
            <div class="badges-container">
                ${opportunities.map(opportunity => `
                    <span class="badge success">${opportunity}</span>
                `).join('')}
            </div>
        `;
        
        this.container.appendChild(opportunitiesElement);
    }
    
    addRisks(risks) {
        const risksElement = document.createElement('div');
        risksElement.className = 'animate-fade-in animate-stagger-2';
        risksElement.innerHTML = `
            <p style="font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Riscos:</p>
            <div class="badges-container">
                ${risks.map(risk => `
                    <span class="badge danger">${risk}</span>
                `).join('')}
            </div>
        `;
        
        this.container.appendChild(risksElement);
    }
    
    getSeasonalityText(seasonality) {
        if (typeof seasonality === 'string') {
            return seasonality;
        }
        
        if (seasonality.peak_months && seasonality.low_months) {
            return `Picos em ${seasonality.peak_months.join(', ')} e baixas em ${seasonality.low_months.join(', ')}. Tendência: ${seasonality.trend}.`;
        }
        
        return 'Análise de sazonalidade disponível.';
    }
}