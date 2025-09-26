class TrendChart {
    constructor() {
        this.canvas = document.getElementById('trend-chart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
        this.currentMonthInfo = document.getElementById('current-month-info');
    }
    
    render(data) {
        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }
        
        // Create gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
        
        // Create chart
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'Interesse',
                    data: data.map(item => item.value),
                    borderColor: '#3b82f6',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8
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
                                return context[0].label;
                            },
                            label: function(context) {
                                return `Interesse: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#e2e8f0',
                            drawBorder: false
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
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
        
        // Update current month info
        this.updateCurrentMonthInfo(data);
    }
    
    updateCurrentMonthInfo(data) {
        if (!data || data.length === 0) return;
        
        const currentMonth = data[data.length - 1];
        this.currentMonthInfo.innerHTML = `
            <div class="current-month-label">${currentMonth.month}</div>
            <div class="current-month-value">${currentMonth.value}</div>
        `;
    }
    
    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}