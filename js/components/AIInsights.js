class AIInsights {
    constructor() {
        this.container = document.getElementById('ai-insights-content');
    }
    
    render(insights) {
        this.container.innerHTML = '';
        
        // Viability Assessment
        this.addViabilityAssessment(insights);
        
        // Detailed Recommendations
        this.addRecommendations(insights);
        
        // Market Analysis Summary
        this.addMarketSummary();
    }
    
    addViabilityAssessment(insights) {
        const viabilityElement = document.createElement('div');
        viabilityElement.className = 'viability-assessment animate-fade-in';
        
        const viabilityIcon = this.getViabilityIcon(insights.market_opportunity?.level || insights.viability);
        const viabilityBadge = this.getViabilityBadge(insights.market_opportunity?.level || insights.viability);
        
        viabilityElement.innerHTML = `
            <i data-lucide="${viabilityIcon.icon}" class="viability-icon ${viabilityIcon.class}"></i>
            <div class="viability-content">
                <div class="viability-header">
                    <h4 class="viability-title">Viabilidade do Produto</h4>
                    <span class="viability-badge ${viabilityBadge.class}">
                        ${viabilityBadge.label}
                    </span>
                </div>
                ${insights.market_opportunity?.reasoning ? `
                    <p style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">
                        ${insights.market_opportunity.reasoning}
                    </p>
                ` : ''}
            </div>
        `;
        
        this.container.appendChild(viabilityElement);
    }
    
    addRecommendations(insights) {
        const recommendationsElement = document.createElement('div');
        recommendationsElement.className = 'recommendations-section animate-fade-in animate-stagger-1';
        
        const recommendationsText = insights.recommendations || 
            (insights.sales_recommendations ? insights.sales_recommendations.join('. ') + '.' : 
            'Recomendações baseadas na análise de mercado.');
        
        recommendationsElement.innerHTML = `
            <h4 class="recommendations-title">
                <i data-lucide="check-circle"></i>
                Recomendações detalhadas
            </h4>
            <p class="recommendations-text">${recommendationsText}</p>
        `;
        
        this.container.appendChild(recommendationsElement);
    }
    
    addMarketSummary() {
        const summaryElement = document.createElement('div');
        summaryElement.className = 'market-summary animate-fade-in animate-stagger-2';
        
        summaryElement.innerHTML = `
            <div class="summary-item">
                <div class="summary-icon analysis">✓</div>
                <p class="summary-label">Análise Completa</p>
                <p class="summary-value">Mercado Analisado</p>
            </div>
            
            <div class="summary-item">
                <div class="summary-icon ai">IA</div>
                <p class="summary-label">Inteligência Artificial</p>
                <p class="summary-value">Insights Gerados</p>
            </div>
            
            <div class="summary-item">
                <div class="summary-icon pricing">$</div>
                <p class="summary-label">Precificação</p>
                <p class="summary-value">Preço Calculado</p>
            </div>
        `;
        
        this.container.appendChild(summaryElement);
    }
    
    getViabilityIcon(viability) {
        const level = viability?.toLowerCase() || '';
        
        if (level.includes('alta') || level.includes('boa') || level.includes('excelente')) {
            return { icon: 'check-circle', class: 'good' };
        }
        if (level.includes('baixa')) {
            return { icon: 'x-circle', class: 'bad' };
        }
        return { icon: 'alert-circle', class: 'medium' };
    }
    
    getViabilityBadge(viability) {
        const level = viability?.toLowerCase() || '';
        
        if (level.includes('alta') || level.includes('boa') || level.includes('excelente')) {
            return { label: viability, class: 'good' };
        }
        if (level.includes('baixa')) {
            return { label: viability, class: 'bad' };
        }
        return { label: viability, class: 'medium' };
    }
}