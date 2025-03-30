'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '@/context/CalculatorContext';

export function SpecificationsSection() {
  const { selectedModel } = useCalculator();
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-30 transition-all duration-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'features'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'specifications'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
        </div>

        <div className="overflow-hidden">
          {activeTab === 'features' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <h2 className="text-2xl font-light mb-4">{selectedModel.name}</h2>
                <p className="text-gray-600 mb-6">{selectedModel.description}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedModel.color }}
                  ></div>
                  <span className="text-sm text-gray-500">
                    {selectedModel.color === '#e6e8ef' ? 'Classic White' :
                     selectedModel.color === '#272727' ? 'Matte Black' :
                     selectedModel.color === '#FFD1DC' ? 'Pastel Pink' : 'Metallic Gold'}
                  </span>
                </div>

                <div className="mb-2 text-xl font-medium">
                  ${selectedModel.price.toFixed(2)}
                </div>

                <button className="bg-gray-900 text-white px-6 py-3 text-sm font-medium mt-4">
                  Add to Cart
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {selectedModel.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#b24f3b] mr-2">•</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'specifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <h2 className="text-2xl font-light mb-4">Technical Specifications</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Detailed specifications for the {selectedModel.name}.
                </p>

                <div className="space-y-4">
                  {Object.entries(selectedModel.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-2">
                      <div className="text-xs text-gray-500">{key}</div>
                      <div className="text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <div
                    className="w-32 h-32 rounded-lg shadow-lg"
                    style={{ backgroundColor: selectedModel.color }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xl font-light text-gray-400">
                      {selectedModel.name}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecificationsSection;
