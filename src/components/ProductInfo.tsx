'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useCalculator } from '@/context/CalculatorContext';

export function ProductInfo() {
  const { selectedModel } = useCalculator();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    );
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col justify-center px-12 pointer-events-none z-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-md">
          <div ref={titleRef} className="mb-4 product-title">
            <div className="text-xs text-gray-500 mb-2">★</div>
            <h1 className="text-4xl font-light tracking-tight text-gray-800 uppercase mb-2">
              <span className="block">About</span>
              <span className="block">{selectedModel.name}</span>
            </h1>
          </div>

          <p ref={descRef} className="text-sm text-gray-600 mb-8 max-w-sm product-description">
            {selectedModel.description}
          </p>

          <div ref={ctaRef} className="flex items-center space-x-4 product-cta">
            <button className="bg-gray-800 text-white px-6 py-3 text-sm font-medium rounded-none pointer-events-auto flex items-center">
              <span className="mr-2">►</span>
              Play Video
            </button>
            <button className="bg-white border border-gray-300 text-gray-800 px-6 py-3 text-sm font-medium rounded-none pointer-events-auto">
              ${selectedModel.price.toFixed(2)} - Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center space-x-6">
            <div className="text-xs font-medium px-3 py-1">Product Features</div>
            <div className="text-xs text-gray-500 px-3 py-1">Design Features</div>
            <div className="text-xs text-gray-500 px-3 py-1">Specifications</div>
            <div className="text-xs text-gray-500 px-3 py-1">User Guide</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
