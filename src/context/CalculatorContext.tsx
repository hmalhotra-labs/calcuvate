'use client';

import { createContext, useContext, useState } from 'react';

// Types for calculator models
export type CalculatorModel = {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
};

// Define calculator models
export const calculatorModels: CalculatorModel[] = [
  {
    id: 'classic',
    name: 'Calcuvate Classic',
    color: '#e6e8ef',
    price: 79.99,
    description: 'The original Calcuvate with a sleek white design. Perfect for everyday calculations.',
    features: [
      'Minimalist design',
      'Solar powered',
      'Basic arithmetic functions',
      'Memory storage',
      'Auto-off after 5 minutes'
    ],
    specifications: {
      'Dimensions': '5.2 × 7.2 × 0.4 inches',
      'Weight': '180 grams',
      'Power': 'Solar with battery backup',
      'Display': 'LCD display with backlight',
      'Materials': 'High-grade aluminum and recycled plastic',
      'Buttons': '20 tactile buttons'
    }
  },
  {
    id: 'pro',
    name: 'Calcuvate Pro',
    color: '#272727',
    price: 129.99,
    description: 'For professionals who demand precision. The Pro model features advanced mathematical functions.',
    features: [
      'Sleek black finish',
      'Scientific calculator functions',
      'Programmable memory',
      'USB-C charging',
      'Backlit display',
      'Tactile button feedback'
    ],
    specifications: {
      'Dimensions': '5.5 × 7.5 × 0.5 inches',
      'Weight': '210 grams',
      'Power': 'Rechargeable Li-ion battery',
      'Display': 'High contrast OLED display',
      'Materials': 'Anodized aluminum body',
      'Buttons': '25 pressure-sensitive buttons'
    }
  },
  {
    id: 'pastel',
    name: 'Calcuvate Pastel',
    color: '#FFD1DC',
    price: 89.99,
    description: 'Add a splash of color to your desk with the Pastel edition. Same great functionality with a vibrant look.',
    features: [
      'Vibrant pastel pink finish',
      'Compact and lightweight',
      'Enhanced display brightness',
      'Water-resistant coating',
      'Customizable sound feedback'
    ],
    specifications: {
      'Dimensions': '5.0 × 7.0 × 0.3 inches',
      'Weight': '160 grams',
      'Power': 'Solar with battery backup',
      'Display': 'Color-adjustable LCD',
      'Materials': 'Bio-plastic with soft-touch coating',
      'Buttons': '20 silent-press buttons'
    }
  },
  {
    id: 'limited',
    name: 'Calcuvate Limited Edition',
    color: '#b29700',
    price: 199.99,
    description: 'The premium Limited Edition with a gold finish. Only 1,000 units produced worldwide.',
    features: [
      'Exclusive gold finish',
      'Numbered collector series',
      'Premium leather carrying case',
      'Extended 5-year warranty',
      'Bluetooth connectivity',
      'Custom engraving option'
    ],
    specifications: {
      'Dimensions': '5.2 × 7.2 × 0.4 inches',
      'Weight': '220 grams',
      'Power': 'Dual power (solar and USB-C)',
      'Display': 'Sapphire glass OLED display',
      'Materials': 'Gold-plated aluminum with hardwood accents',
      'Buttons': '20 precision-engineered buttons with haptic feedback'
    }
  }
];

// Create context
interface CalculatorContextType {
  selectedModel: CalculatorModel;
  setSelectedModel: (model: CalculatorModel) => void;
  compareMode: boolean;
  setCompareMode: (compare: boolean) => void;
  comparedModels: CalculatorModel[];
  addToCompare: (model: CalculatorModel) => void;
  removeFromCompare: (modelId: string) => void;
}

const defaultContext: CalculatorContextType = {
  selectedModel: calculatorModels[0],
  setSelectedModel: () => {},
  compareMode: false,
  setCompareMode: () => {},
  comparedModels: [],
  addToCompare: () => {},
  removeFromCompare: () => {}
};

export const CalculatorContext = createContext<CalculatorContextType>(defaultContext);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<CalculatorModel>(calculatorModels[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedModels, setComparedModels] = useState<CalculatorModel[]>([]);

  const addToCompare = (model: CalculatorModel) => {
    if (comparedModels.length < 3 && !comparedModels.some(m => m.id === model.id)) {
      setComparedModels([...comparedModels, model]);
    }
  };

  const removeFromCompare = (modelId: string) => {
    setComparedModels(comparedModels.filter(model => model.id !== modelId));
  };

  return (
    <CalculatorContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
        compareMode,
        setCompareMode,
        comparedModels,
        addToCompare,
        removeFromCompare
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export const useCalculator = () => useContext(CalculatorContext);
