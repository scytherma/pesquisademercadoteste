
// ====================================================================
// SERVIÇOS DE API - MarketSense AI
// ====================================================================
// Este arquivo centraliza todas as integrações com APIs externas.
// Implemente suas APIs diretamente nas funções abaixo.
// ====================================================================

// --------------------------------------------------------------------
// 1. GOOGLE TRENDS API
// --------------------------------------------------------------------
export const fetchGoogleTrendsData = async (searchTerm) => {
    console.log(`[GOOGLE TRENDS] Buscando dados para: ${searchTerm}`);
    
    try {
        // IMPLEMENTAR SUA API DO GOOGLE TRENDS AQUI
        // Retorno esperado: array de objetos com { month, value }
        
        // Exemplo de implementação:
        // const response = await fetch(`https://trends.google.com/api/v1/search?term=${searchTerm}&geo=BR&timeframe=today_12_m`, {
        //     headers: {
        //         'Authorization': 'Bearer YOUR_API_KEY',
        //         'Content-Type': 'application/json'
        //     }
        // });
        // const data = await response.json();
        // return data.timeline || [];
        
        // TEMPORÁRIO - removar após implementação
        throw new Error("Google Trends API não implementada ainda");
        
    } catch (error) {
        console.error('Erro ao buscar dados do Google Trends:', error);
        // Retorna dados de fallback para não quebrar a interface
        return [
            { month: 'Jan', value: 20 },
            { month: 'Fev', value: 25 },
            { month: 'Mar', value: 45 },
            { month: 'Abr', value: 35 },
            { month: 'Mai', value: 30 },
            { month: 'Jun', value: 40 },
            { month: 'Jul', value: 50 },
            { month: 'Ago', value: 45 },
            { month: 'Set', value: 35 },
            { month: 'Out', value: 55 },
            { month: 'Nov', value: 60 },
            { month: 'Dez', value: 65 },
        ];
    }
};

// --------------------------------------------------------------------
// 2. IBGE API (Dados demográficos e regionais)
// --------------------------------------------------------------------
export const fetchIBGEData = async (searchTerm) => {
    console.log(`[IBGE] Buscando dados demográficos para: ${searchTerm}`);
    
    try {
        // IMPLEMENTAR SUA API DO IBGE AQUI
        // Retorno esperado: { avg_income, regions_interest, age_distribution }
        
        // Exemplo de implementação:
        // const [demographicsResponse, regionResponse] = await Promise.all([
        //     fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/demographics?product=${searchTerm}`),
        //     fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/regional?product=${searchTerm}`)
        // ]);
        // 
        // const demographics = await demographicsResponse.json();
        // const regional = await regionResponse.json();
        // 
        // return {
        //     avg_income: demographics.avg_income,
        //     regions_interest: regional.interest_by_state,
        //     age_distribution: demographics.age_groups
        // };
        
        // TEMPORÁRIO - remover após implementação
        throw new Error("IBGE API não implementada ainda");
        
    } catch (error) {
        console.error('Erro ao buscar dados do IBGE:', error);
        // Retorna dados de fallback para não quebrar a interface
        return {
            avg_income: 3500,
            regions_interest: {
                'SP': { level: 'excelente', value: 85 },
                'RJ': { level: 'bom', value: 70 },
                'MG': { level: 'bom', value: 65 },
                'RS': { level: 'medio', value: 45 },
                'PR': { level: 'bom', value: 60 },
                'SC': { level: 'medio', value: 50 },
                'BA': { level: 'pouco', value: 25 },
                'PE': { level: 'medio', value: 40 },
                'CE': { level: 'pouco', value: 30 }
            },
            age_distribution: {
                '18-24': 20,
                '25-34': 30,
                '35-44': 25,
                '45-54': 15,
                '55+': 10
            }
        };
    }
};

// --------------------------------------------------------------------
// 3. MARKETPLACES APIs (Mercado Livre, Shopee, etc.)
// --------------------------------------------------------------------
export const fetchMarketplaceData = async (searchTerm) => {
    console.log(`[MARKETPLACES] Buscando concorrentes para: ${searchTerm}`);
    
    try {
        // Busca dados de todos os marketplaces em paralelo
        const [mercadoLivreData, shopeeData] = await Promise.all([
            fetchMercadoLivreProducts(searchTerm),
            fetchShopeeProducts(searchTerm)
        ]);
        
        // Combina todos os resultados
        return [...mercadoLivreData, ...shopeeData];
        
    } catch (error) {
        console.error('Erro ao buscar dados dos marketplaces:', error);
        // Retorna dados de fallback para não quebrar a interface
        return [
            { name: `${searchTerm} Premium`, price: 89.90, rating: 4.5, marketplace: 'Mercado Livre' },
            { name: `${searchTerm} Standard`, price: 65.50, rating: 4.2, marketplace: 'Shopee' },
            { name: `${searchTerm} Básico`, price: 45.00, rating: 3.8, marketplace: 'Mercado Livre' },
            { name: `${searchTerm} Deluxe`, price: 120.00, rating: 4.7, marketplace: 'Shopee' },
            { name: `${searchTerm} Pro`, price: 95.75, rating: 4.3, marketplace: 'Mercado Livre' }
        ];
    }
};

// --------------------------------------------------------------------
// 4. MERCADO LIVRE API ESPECÍFICA
// --------------------------------------------------------------------
export const fetchMercadoLivreProducts = async (searchTerm) => {
    console.log(`[MERCADO LIVRE] Buscando produtos para: ${searchTerm}`);
    
    try {
        // IMPLEMENTAR SUA INTEGRAÇÃO COM API DO MERCADO LIVRE AQUI
        // Retorno esperado: array de objetos com { name, price, rating, marketplace, url }
        
        // Exemplo de implementação:
        // const response = await fetch(`${MARKETPLACE_APIS.MERCADO_LIVRE}/search?q=${encodeURIComponent(searchTerm)}&limit=${MARKETPLACE_CONFIG.MERCADO_LIVRE.maxResults}`, {
        //     headers: {
        //         'Authorization': `Bearer ${API_KEYS.MERCADO_LIVRE}`,
        //         'Content-Type': 'application/json'
        //     }
        // });
        // 
        // const data = await response.json();
        // 
        // return data.results?.map(item => ({
        //     name: item.title,
        //     price: item.price,
        //     rating: item.reviews?.rating_average || 0,
        //     marketplace: 'Mercado Livre',
        //     url: item.permalink,
        //     reviews_count: item.reviews?.total || 0,
        //     seller_reputation: item.seller?.reputation || null,
        //     shipping: item.shipping || null
        // })) || [];
        
        // TEMPORÁRIO - remover após implementação
        throw new Error("Mercado Livre API não implementada ainda");
        
    } catch (error) {
        console.error('Erro ao buscar produtos do Mercado Livre:', error);
        return [];
    }
};

// --------------------------------------------------------------------
// 5. SHOPEE API ESPECÍFICA
// --------------------------------------------------------------------
export const fetchShopeeProducts = async (searchTerm) => {
    console.log(`[SHOPEE] Buscando produtos para: ${searchTerm}`);
    
    try {
        // IMPLEMENTAR SUA INTEGRAÇÃO COM API DA SHOPEE AQUI
        // Retorno esperado: array de objetos com { name, price, rating, marketplace, url }
        
        // Exemplo de implementação:
        // const response = await fetch(`${MARKETPLACE_APIS.SHOPEE}/search/search_items?keyword=${encodeURIComponent(searchTerm)}&limit=${MARKETPLACE_CONFIG.SHOPEE.maxResults}&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'User-Agent': 'Mozilla/5.0 (compatible; MarketSenseBot/1.0)' // Shopee API often requires a User-Agent
        //     }
        // });
        // 
        // const data = await response.json();
        // 
        // return data.items?.map(item => ({
        //     name: item.item_basic?.name || item.name,
        //     price: (item.item_basic?.price || item.price) / MARKETPLACE_CONFIG.SHOPEE.priceConversion,
        //     rating: (item.item_basic?.item_rating?.rating_star || item.rating) || 0, // Keep original if not on 5-star scale for now, normalize later
        //     marketplace: 'Shopee',
        //     url: `https://shopee.com.br/product/${item.shopid}/${item.itemid}`,
        //     reviews_count: item.item_basic?.item_rating?.rating_count?.[0] || 0,
        //     discount: item.item_basic?.raw_discount || 0,
        //     shipping_fee: item.item_basic?.shipping_fee || 0
        // })) || [];
        
        // TEMPORÁRIO - remover após implementação
        throw new Error("Shopee API não implementada ainda");
        
    } catch (error) {
        console.error('Erro ao buscar produtos da Shopee:', error);
        return [];
    }
};

// --------------------------------------------------------------------
// 6. CONFIGURAÇÕES E CONSTANTES PARA MARKETPLACES
// --------------------------------------------------------------------

// URLs base das APIs
export const MARKETPLACE_APIS = {
    MERCADO_LIVRE: 'https://api.mercadolibre.com/sites/MLB',
    SHOPEE: 'https://shopee.com.br/api/v4'
};

// Configurações específicas por marketplace
export const MARKETPLACE_CONFIG = {
    MERCADO_LIVRE: {
        maxResults: 10,
        requiredFields: ['title', 'price', 'permalink'],
        timeout: 8000
    },
    SHOPEE: {
        maxResults: 10,
        priceConversion: 100000, // Shopee usa micro-moedas (ex: 100000 = R$1.00)
        timeout: 8000
    }
};

// --------------------------------------------------------------------
// 7. FUNÇÃO UTILITÁRIA PARA NORMALIZAR DADOS DOS MARKETPLACES
// --------------------------------------------------------------------
export const normalizeMarketplaceData = (rawData, source) => {
    switch (source) {
        case 'mercadolivre':
            return rawData.map(item => ({
                name: item.title?.substring(0, 50) + (item.title?.length > 50 ? '...' : ''),
                price: parseFloat(item.price) || 0,
                rating: item.reviews?.rating_average || 0,
                marketplace: 'Mercado Livre',
                url: item.permalink,
                reviews_count: item.reviews?.total || 0
            }));
            
        case 'shopee':
            return rawData.map(item => ({
                name: item.name?.substring(0, 50) + (item.name?.length > 50 ? '...' : ''),
                price: (parseFloat(item.price) || 0) / MARKETPLACE_CONFIG.SHOPEE.priceConversion,
                rating: parseFloat(item.rating) || 0,
                marketplace: 'Shopee',
                url: `https://shopee.com.br/product/${item.shopid}/${item.itemid}`,
                reviews_count: item.reviews_count || 0
            }));
            
        default:
            return rawData;
    }
};

// --------------------------------------------------------------------
// 8. FUNÇÃO PARA TESTAR CONECTIVIDADE DAS APIS
// --------------------------------------------------------------------
export const testMarketplaceAPIs = async () => {
    const testTerm = "smartphone";
    
    console.log("🧪 Testando conectividade das APIs de Marketplaces...");
    
    try {
        const mercadoLivreTest = await fetchMercadoLivreProducts(testTerm);
        console.log("✅ Mercado Livre:", mercadoLivreTest.length > 0 ? "Conectado e retornou dados" : "Conectado, mas sem dados ou erro interno");
    } catch (error) {
        console.log("❌ Mercado Livre: Erro de conexão ou API não implementada. Detalhes:", error.message);
    }
    
    try {
        const shopeeTest = await fetchShopeeProducts(testTerm);
        console.log("✅ Shopee:", shopeeTest.length > 0 ? "Conectado e retornou dados" : "Conectado, mas sem dados ou erro interno");
    } catch (error) {
        console.log("❌ Shopee: Erro de conexão ou API não implementada. Detalhes:", error.message);
    }
};

// --------------------------------------------------------------------
// 9. CONFIGURAÇÕES E CONSTANTES GERAIS
// --------------------------------------------------------------------

// CONFIGURAR SUAS CHAVES DE API AQUI
export const API_KEYS = {
    GOOGLE_TRENDS: 'YOUR_GOOGLE_TRENDS_API_KEY',
    MERCADO_LIVRE: 'YOUR_MERCADOLIBRE_API_KEY', 
    SHOPEE: 'YOUR_SHOPEE_API_KEY',
    IBGE: 'YOUR_IBGE_API_KEY' // Se necessário
};

// Configurações de timeout e retry
export const API_CONFIG = {
    timeout: 10000, // 10 segundos
    retries: 3,
    rateLimit: 1000 // 1 segundo entre chamadas
};

// Função utilitária para fazer requests com retry
export const apiRequest = async (url, options = {}, retries = API_CONFIG.retries) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
        
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        if (retries > 0 && error.name !== 'AbortError') {
            console.log(`Tentativa falhou para ${url}, tentando novamente... (${retries} tentativas restantes)`);
            await new Promise(resolve => setTimeout(resolve, API_CONFIG.rateLimit));
            return apiRequest(url, options, retries - 1);
        }
        throw error;
    }
};
