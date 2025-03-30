'use client';

import dynamic from 'next/dynamic';
import ScrollAnimation from '@/components/ScrollAnimation';
import { CalculatorProvider } from '@/context/CalculatorContext';
import { AnimatePresence } from 'framer-motion';

// Dynamic imports for components with client-side only features
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const ProductInfo = dynamic(() => import('@/components/ProductInfo'), { ssr: false });
const ModelSelector = dynamic(() => import('@/components/ModelSelector'), { ssr: false });
const SpecificationsSection = dynamic(() => import('@/components/SpecificationsSection'), { ssr: false });
const ComparisonSection = dynamic(() => import('@/components/ComparisonSection'), { ssr: false });
const CompareButton = dynamic(() => import('@/components/CompareButton'), { ssr: false });

export default function Home() {
  return (
    <CalculatorProvider>
      <ScrollAnimation>
        <main className="relative w-full h-screen overflow-hidden">
          <Header />
          <ProductInfo />
          <ModelSelector />
          <Scene />
          <SpecificationsSection />
          <AnimatePresence>
            <ComparisonSection />
          </AnimatePresence>
          <CompareButton />
        </main>
      </ScrollAnimation>
    </CalculatorProvider>
  );
}
