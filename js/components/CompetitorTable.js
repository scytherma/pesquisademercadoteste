class CompetitorTable {
    constructor() {
        this.table = document.getElementById('competitors-table');
        this.tbody = this.table.querySelector('tbody');
    }
    
    render(competitors) {
        this.tbody.innerHTML = '';
        
        competitors.forEach((competitor, index) => {
            const row = this.createCompetitorRow(competitor, index);
            this.tbody.appendChild(row);
        });
    }
    
    createCompetitorRow(competitor, index) {
        const row = document.createElement('tr');
        row.className = 'animate-fade-in';
        row.style.animationDelay = `${index * 0.1}s`;
        
        const priceBadge = this.getPriceBadge(competitor.price);
        
        row.innerHTML = `
            <td>
                <div class="product-name">${competitor.name}</div>
            </td>
            <td>
                <div class="price-info">
                    <span class="price-value">R$ ${competitor.price.toFixed(2)}</span>
                    <span class="price-badge ${priceBadge.class}">${priceBadge.label}</span>
                </div>
            </td>
            <td>
                <div class="rating-display">
                    <div class="stars">
                        ${this.renderStars(competitor.rating)}
                    </div>
                    <span class="rating-value">${competitor.rating.toFixed(1)}</span>
                </div>
            </td>
        `;
        
        return row;
    }
    
    renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const filled = i <= Math.round(rating);
            stars.push(`
                <i data-lucide="star" class="star ${filled ? 'filled' : 'empty'}"></i>
            `);
        }
        return stars.join('');
    }
    
    getPriceBadge(price) {
        if (price < 50) {
            return { label: "Baixo", class: "low" };
        } else if (price < 150) {
            return { label: "Médio", class: "medium" };
        } else {
            return { label: "Alto", class: "high" };
        }
    }
}