class BrazilMap {
    constructor() {
        this.container = document.getElementById('brazil-map');
        this.legend = document.getElementById('map-legend');
        this.popup = document.getElementById('state-popup');
        this.data = null;
        this.selectedState = null;
    }
    
    render(data) {
        this.data = data;
        this.createMap();
        this.createLegend();
    }
    
    createMap() {
        // Simplified Brazil map representation
        // In a real implementation, you would use SVG paths for each state
        this.container.innerHTML = `
            <div class="brazil-states">
                ${Object.entries(this.data).map(([state, info]) => `
                    <div class="state-item" data-state="${state}">
                        <div class="state-indicator" style="background-color: ${this.getLevelColor(info.level)}"></div>
                        <span class="state-name">${state}</span>
                        <span class="state-value">${info.value}%</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add event listeners
        this.container.querySelectorAll('.state-item').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const state = e.currentTarget.dataset.state;
                this.showStatePopup(state, this.data[state]);
            });
            
            item.addEventListener('mouseleave', () => {
                this.hideStatePopup();
            });
        });
    }
    
    createLegend() {
        const levels = ['pouco', 'medio', 'bom', 'excelente'];
        this.legend.innerHTML = levels.map(level => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${this.getLevelColor(level)}"></div>
                <span class="legend-label">${this.getLevelLabel(level)}</span>
            </div>
        `).join('');
    }
    
    showStatePopup(stateName, stateData) {
        this.selectedState = { name: stateName, ...stateData };
        
        this.popup.innerHTML = `
            <h4 class="state-name">${stateName}</h4>
            ${stateData.value !== undefined ? `
                <p class="state-interest">
                    Interesse: <span style="font-weight: 500;">${stateData.value}%</span>
                </p>
                <p>
                    <span class="state-level" style="background-color: ${this.getLevelColor(stateData.level)}">
                        ${this.getLevelLabel(stateData.level)}
                    </span>
                </p>
            ` : `
                <p style="font-size: 0.875rem; color: #64748b;">Dados indisponíveis</p>
            `}
        `;
        
        this.popup.classList.remove('hidden');
        this.popup.classList.add('animate-scale-in');
    }
    
    hideStatePopup() {
        this.popup.classList.add('hidden');
        this.popup.classList.remove('animate-scale-in');
        this.selectedState = null;
    }
    
    getLevelLabel(level) {
        const labels = {
            'excelente': 'Excelente',
            'bom': 'Bom',
            'medio': 'Médio',
            'pouco': 'Pouco'
        };
        return labels[level] || 'Indefinido';
    }
    
    getLevelColor(level) {
        const colors = {
            'excelente': '#1e40af',
            'bom': '#3b82f6',
            'medio': '#fbbf24',
            'pouco': '#ef4444'
        };
        return colors[level] || '#9ca3af';
    }
}

// Add CSS for the simplified map
const mapStyles = `
<style>
.brazil-states {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
}

.state-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
}

.state-item:hover {
    background: #f1f5f9;
    transform: translateY(-1px);
}

.state-indicator {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
}

.state-name {
    font-weight: 500;
    color: #1e293b;
    min-width: 2rem;
}

.state-value {
    font-size: 0.875rem;
    color: #64748b;
    margin-left: auto;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', mapStyles);