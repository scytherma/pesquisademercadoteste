import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrazilSVGMap } from "./BrazilSVGMap"; // Importando o novo componente SVG

export default function BrazilMap({ data }) {
  const [selectedState, setSelectedState] = useState(null);

  const getLevelLabel = (level) => {
    const labels = {
      'excelente': 'Excelente',
      'bom': 'Bom',
      'medio': 'Médio',
      'pouco': 'Pouco'
    };
    return labels[level] || 'Indefinido';
  };

  const getLevelColor = (level) => {
    const colors = {
      'excelente': '#1e40af', // Azul escuro
      'bom': '#3b82f6',       // Azul claro
      'medio': '#fbbf24',     // Amarelo
      'pouco': '#ef4444',     // Vermelho
    };
    return colors[level] || '#9ca3af'; // Cinza padrão
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card className="h-full bg-white/60 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            Regiões de interesse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="w-full h-auto mb-4">
              <BrazilSVGMap 
                data={data}
                onStateHover={setSelectedState}
                onStateLeave={() => setSelectedState(null)}
              />
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['pouco', 'medio', 'bom', 'excelente'].map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLevelColor(level) }}
                  />
                  <span className="text-sm text-slate-600">{getLevelLabel(level)}</span>
                </div>
              ))}
            </div>

            {/* State info popup */}
            <AnimatePresence>
              {selectedState && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-xl absolute bottom-0 left-0 w-full"
                >
                  <h4 className="font-semibold text-slate-800 mb-1">{selectedState.name}</h4>
                  {selectedState.value !== undefined ? (
                    <>
                      <p className="text-sm text-slate-600 mb-2">
                        Interesse: <span className="font-medium">{selectedState.value}%</span>
                      </p>
                      <p className="text-sm">
                        <span
                          className="px-2 py-1 rounded-full text-white text-xs font-medium"
                          style={{ backgroundColor: getLevelColor(selectedState.level) }}
                        >
                          {getLevelLabel(selectedState.level)}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-slate-500">Dados indisponíveis</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}