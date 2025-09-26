import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { ProductAnalysis } from "@/entities/ProductAnalysis";
import { motion, AnimatePresence } from "framer-motion";

// Importar os serviços de API
import { 
    fetchGoogleTrendsData, 
    fetchIBGEData, 
    fetchMarketplaceData 
} from "../components/services/apiServices";

import SearchSection from "../components/market/SearchSection";
import TrendChart from "../components/market/TrendChart";
import BrazilMap from "../components/market/BrazilMap";
import Demographics from "../components/market/Demographics";
import CompetitorTable from "../components/market/CompetitorTable";
import SuggestedPrice from "../components/market/SuggestedPrice";
import SalesInsights from "../components/market/SalesInsights";
import AIInsights from "../components/market/AIInsights";

export default function MarketResearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        
        setIsLoading(true);
        setAnalysisData(null);

        try {
            // 1. Busca os dados das fontes externas em paralelo
            const [trend_data, ibge_data, competitors] = await Promise.all([
                fetchGoogleTrendsData(searchTerm),
                fetchIBGEData(searchTerm),
                fetchMarketplaceData(searchTerm),
            ]);

            // 2. Usa a IA para analisar os dados coletados e gerar insights
            const aiAnalysis = await InvokeLLM({
                prompt: `Com base nos seguintes dados de mercado para o produto "${searchTerm}", gere uma análise inteligente.
                
                Dados de Tendência (Google Trends): ${JSON.stringify(trend_data)}
                Dados de Concorrência (Marketplaces): ${JSON.stringify(competitors)}
                Dados Demográficos (IBGE): Renda média de ${ibge_data.avg_income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.

                Sua tarefa é:
                a. Calcular um preço de venda sugerido, sendo competitivo mas com boa margem.
                b. Analisar a sazonalidade e tendências de crescimento/queda.
                c. Avaliar a viabilidade do produto no mercado brasileiro.
                d. Gerar recomendações de vendas específicas.

                Responda exclusivamente no formato JSON válido:
                {
                    "suggested_price": number,
                    "price_rationale": "string explicando o cálculo",
                    "seasonality": {
                        "peak_months": ["string", "string"],
                        "low_months": ["string", "string"],
                        "trend": "crescendo" | "estável" | "declinando"
                    },
                    "market_opportunity": {
                        "score": number (0-100),
                        "level": "baixa" | "média" | "alta" | "excelente",
                        "reasoning": "string"
                    },
                    "sales_recommendations": [
                        "string recomendação 1",
                        "string recomendação 2",
                        "string recomendação 3"
                    ],
                    "target_demographics": {
                        "primary_age": "string",
                        "income_range": "string",
                        "best_regions": ["string", "string", "string"]
                    }
                }`,
                response_json_schema: {
                    "type": "object",
                    "properties": {
                        "suggested_price": { "type": "number" },
                        "price_rationale": { "type": "string" },
                        "seasonality": {
                            "type": "object",
                            "properties": {
                                "peak_months": { "type": "array", "items": { "type": "string" } },
                                "low_months": { "type": "array", "items": { "type": "string" } },
                                "trend": { "type": "string", "enum": ["crescendo", "estável", "declinando"] }
                            }
                        },
                        "market_opportunity": {
                            "type": "object",
                            "properties": {
                                "score": { "type": "number" },
                                "level": { "type": "string", "enum": ["baixa", "média", "alta", "excelente"] },
                                "reasoning": { "type": "string" }
                            }
                        },
                        "sales_recommendations": { "type": "array", "items": { "type": "string" } },
                        "target_demographics": {
                            "type": "object",
                            "properties": {
                                "primary_age": { "type": "string" },
                                "income_range": { "type": "string" },
                                "best_regions": { "type": "array", "items": { "type": "string" } }
                            }
                        }
                    }
                }
            });

            // 3. Consolida todos os dados para exibição
            const consolidatedData = {
                product_name: searchTerm,
                trend_data,
                regional_data: ibge_data.regions_interest,
                demographics: {
                    avg_income: ibge_data.avg_income,
                    age_distribution: ibge_data.age_distribution
                },
                competitors,
                ai_insights: aiAnalysis,
                search_date: new Date().toISOString()
            };

            setAnalysisData(consolidatedData);

            // 4. Salva a análise no banco de dados
            await ProductAnalysis.create({
                product_name: searchTerm,
                trend_data: JSON.stringify(trend_data),
                regional_data: JSON.stringify(ibge_data.regions_interest),
                demographics: JSON.stringify({
                    avg_income: ibge_data.avg_income,
                    age_distribution: ibge_data.age_distribution
                }),
                competitors: JSON.stringify(competitors),
                ai_insights: JSON.stringify(aiAnalysis)
            });

        } catch (error) {
            console.error('Erro durante a análise:', error);
            alert('Erro ao realizar análise. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            MarketSense AI
                        </h1>
                        <p className="text-xl text-gray-600">
                            Análise Inteligente de Mercado para E-commerce
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search Section */}
                <SearchSection
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />

                {/* Results */}
                <AnimatePresence>
                    {analysisData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* First Row - Trend Chart and Map */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                <TrendChart data={analysisData.trend_data} />
                                <BrazilMap data={analysisData.regional_data} />
                            </div>

                            {/* Second Row - Demographics and Competitors */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                <Demographics data={analysisData.demographics} />
                                <CompetitorTable data={analysisData.competitors} />
                            </div>

                            {/* Third Row - Price and Insights */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                <SuggestedPrice 
                                    price={analysisData.ai_insights.suggested_price}
                                    rationale={analysisData.ai_insights.price_rationale}
                                />
                                <SalesInsights data={analysisData.ai_insights.seasonality} />
                            </div>

                            {/* Final Row - AI Insights */}
                            <AIInsights data={analysisData.ai_insights} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}