class SuggestedPrice {
    constructor() {
        this.priceElement = document.getElementById('suggested-price');
    }
    
    render(price, rationale) {
        this.priceElement.innerHTML = `R$ ${price.toFixed(2)}`;
        
        // Add animation
        this.priceElement.classList.add('animate-scale-in');
        
        // Add rationale as tooltip or additional info if needed
        if (rationale) {
            this.priceElement.title = rationale;
        }
        
        // Animate the price value
        this.animatePrice(0, price);
    }
    
    animatePrice(start, end) {
        const duration = 1000; // 1 second
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (end - start) * easeOut;
            
            this.priceElement.innerHTML = `R$ ${currentValue.toFixed(2)}`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}