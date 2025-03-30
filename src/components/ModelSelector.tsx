'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCalculator, calculatorModels, CalculatorModel } from '@/context/CalculatorContext';

export function ModelSelector() {
  const { selectedModel, setSelectedModel, addToCompare, comparedModels } = useCalculator();
  const [showTooltip, setShowTooltip] = useState('');

  return (
    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 z-20">
      <div className="bg-white/90 backdrop-blur-sm shadow-lg p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-3">Choose Model</h3>

        <div className="space-y-3">
          {calculatorModels.map((model) => (
            <div
              key={model.id}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => setSelectedModel(model)}
                className={`relative w-8 h-8 rounded-full transition-all duration-200 border-2 ${
                  selectedModel.id === model.id
                    ? 'border-gray-800 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: model.color }}
                onMouseEnter={() => setShowTooltip(model.id)}
                onMouseLeave={() => setShowTooltip('')}
              >
                {showTooltip === model.id && (
                  <div className="absolute right-full mr-2 whitespace-nowrap bg-gray-800 text-white text-xs py-1 px-2 rounded">
                    {model.name}
                  </div>
                )}
              </button>

              <button
                onClick={() => addToCompare(model)}
                disabled={comparedModels.some(m => m.id === model.id)}
                className={`text-xs ${
                  comparedModels.some(m => m.id === model.id)
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {comparedModels.some(m => m.id === model.id) ? 'Added' : 'Compare'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-1">
            {selectedModel.name}
          </div>
          <div className="text-sm font-medium">
            ${selectedModel.price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelSelector;
