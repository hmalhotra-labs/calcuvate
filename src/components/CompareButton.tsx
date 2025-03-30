'use client';

import { motion } from 'framer-motion';
import { useCalculator } from '@/context/CalculatorContext';

export function CompareButton() {
  const {
    compareMode,
    setCompareMode,
    comparedModels
  } = useCalculator();

  if (comparedModels.length === 0) return null;

  return (
    <motion.button
      className="fixed bottom-8 right-8 bg-gray-800 text-white rounded-full shadow-lg z-40 flex items-center gap-2 px-6 py-3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setCompareMode(!compareMode)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="w-5 h-5 rounded-full bg-[#b24f3b] flex items-center justify-center text-xs font-bold">
        {comparedModels.length}
      </span>
      <span className="text-sm font-medium">
        {compareMode ? 'Hide Comparison' : 'Compare Models'}
      </span>
    </motion.button>
  );
}

export default CompareButton;
