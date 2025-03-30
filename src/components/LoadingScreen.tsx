'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function LoadingScreen() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      // Wait a bit before hiding the loading screen
      const timeout = setTimeout(() => {
        setShowLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!showLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#e6e8ef] flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 bg-[#b24f3b] animate-pulse rounded-full mb-4"></div>
        <h1 className="text-3xl font-light uppercase tracking-widest mb-4">Calcuvate</h1>
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#b24f3b] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {active ? `Loading ${Math.round(progress)}%` : 'Ready'}
        </p>
      </div>
    </div>
  );
}
