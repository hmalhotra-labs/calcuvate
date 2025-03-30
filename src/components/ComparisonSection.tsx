'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator, CalculatorModel } from '@/context/CalculatorContext';

export function ComparisonSection() {
  const {
    compareMode,
    setCompareMode,
    comparedModels,
    removeFromCompare
  } = useCalculator();

  if (!compareMode || comparedModels.length === 0) return null;

  // All specification keys from all models
  const allSpecKeys = Array.from(
    new Set(
      comparedModels.flatMap(model =>
        Object.keys(model.specifications)
      )
    )
  );

  return (
    <motion.div
      className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-12 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-light">Compare Models</h2>
          <button
            onClick={() => setCompareMode(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕ Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {comparedModels.map((model) => (
            <div key={model.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div
                className="h-24 flex items-center justify-center"
                style={{ backgroundColor: model.color }}
              >
                <span className="text-xl font-light text-white drop-shadow-md">
                  {model.name}
                </span>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium">${model.price.toFixed(2)}</div>
                  <button
                    onClick={() => removeFromCompare(model.id)}
                    className="text-xs text-gray-500 hover:text-gray-800"
                  >
                    Remove
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {model.description}
                </p>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h3 className="text-sm font-medium mb-2">Key Features</h3>
                  <ul className="space-y-1">
                    {model.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="text-[#b24f3b] mr-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {model.features.length > 3 && (
                      <li className="text-xs text-gray-400">
                        +{model.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <button className="w-full bg-gray-800 text-white py-2 text-sm">
                  Select This Model
                </button>
              </div>
            </div>
          ))}

          {/* Empty slot */}
          {comparedModels.length < 3 && (
            <div className="bg-gray-50 shadow-sm rounded-lg overflow-hidden border border-dashed border-gray-200 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-gray-400 mb-2">Add another model</div>
                <div className="text-xs text-gray-500">
                  Select "Compare" from the model selector
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-light mb-6">Detailed Comparison</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left text-sm font-medium text-gray-500 w-1/4">Specification</th>
                  {comparedModels.map(model => (
                    <th key={model.id} className="py-3 text-left text-sm font-medium text-gray-900">
                      {model.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSpecKeys.map(key => (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-500">{key}</td>
                    {comparedModels.map(model => (
                      <td key={model.id} className="py-3 text-sm">
                        {model.specifications[key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ComparisonSection;
