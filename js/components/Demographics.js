class Demographics {
    constructor() {
        this.canvas = document.getElementById('demographics-chart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
        this.avgIncomeInfo = document.getElementById('avg-income-info');
    }
    
    render(data) {
        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }
        
        // Prepare demographic data
        const demographicData = [
            { category: 'Baixa', value: data.avg_income * 0.6 },
            { category: 'Média', value: data.avg_income },
            { category: 'Alta', value: data.avg_income * 1.8 }
        ];
        
        // Create chart
        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: demographicData.map(item => item.category),
                datasets: [{
                    label: 'Renda',
                    data: demographicData.map(item => item.value),
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderColor: [
                        '#3b82f6',
                        '#6366f1',
                        '#8b5cf6'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#374151',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 12,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return `Renda ${context[0].label}`;
                            },
                            label: function(context) {
                                return `R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: '#e2e8f0',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
        
        // Update average income info
        this.updateAvgIncomeInfo(data.avg_income);
    }
    
    updateAvgIncomeInfo(avgIncome) {
        this.avgIncomeInfo.innerHTML = `
            <p class="avg-income-label">Renda média</p>
            <p class="avg-income-value">R$ ${avgIncome.toLocaleString('pt-BR')}</p>
        `;
    }
    
    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}