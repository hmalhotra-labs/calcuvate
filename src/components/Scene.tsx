'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import AdvancedCalculator from './AdvancedCalculator';
import LoadingScreen from './LoadingScreen';
import { useCalculator } from '@/context/CalculatorContext';

// Main scene component with camera controls
export function Scene() {
  const { selectedModel } = useCalculator();

  return (
    <>
      <LoadingScreen />
      <div className="w-full h-screen bg-[#e6e8ef]">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            minDistance={6}
            maxDistance={10}
          />

          <ambientLight intensity={0.5} />
          <spotLight
            position={[5, 10, 5]}
            angle={0.3}
            penumbra={0.8}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />

          <Suspense fallback={null}>
            <AdvancedCalculator
              position={[0, 0, 0]}
              rotation={[0, Math.PI / 6, 0]}
              color={selectedModel.color}
            />

            <ContactShadows
              position={[0, -0.15, 0]}
              opacity={0.4}
              scale={10}
              blur={1}
            />

            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default Scene;
