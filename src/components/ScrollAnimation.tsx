'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get elements to animate on scroll
    const title = document.querySelector('.product-title');
    const description = document.querySelector('.product-description');
    const cta = document.querySelector('.product-cta');
    const calculatorWrapper = document.querySelector('.calculator-wrapper');

    // Create a timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      }
    });

    if (calculatorWrapper) {
      tl.to(calculatorWrapper, {
        rotation: '+=0.3',
        y: '+=50',
        duration: 2,
      });
    }

    if (title) {
      tl.to(title, {
        x: '-=100',
        opacity: 0.7,
        duration: 2,
      }, 0);
    }

    if (description) {
      tl.to(description, {
        x: '-=120',
        opacity: 0.5,
        duration: 2,
      }, 0.2);
    }

    if (cta) {
      tl.to(cta, {
        x: '-=140',
        opacity: 0.3,
        duration: 2,
      }, 0.4);
    }

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {children}
    </div>
  );
}
