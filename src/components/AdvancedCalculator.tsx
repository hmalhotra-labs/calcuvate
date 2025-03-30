'use client';

import { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useSpring, animated, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Material with red accent color
const redMaterial = new THREE.MeshStandardMaterial({
  color: '#b24f3b',
  roughness: 0.3,
  metalness: 0.2,
});

// Material for white calculator parts
const whiteMaterial = new THREE.MeshStandardMaterial({
  color: '#e6e8ef',
  roughness: 0.1,
  metalness: 0.1,
});

// Material for dark calculator parts
const darkMaterial = new THREE.MeshStandardMaterial({
  color: '#040404',
  roughness: 0.1,
  metalness: 0.3,
});

// Material for screen
const screenMaterial = new THREE.MeshStandardMaterial({
  color: '#040404',
  roughness: 0.05,
  metalness: 0.5,
  emissive: '#111111',
});

// Button for the calculator
function CalculatorButton({ position, color = '#e6e8ef', isRed = false, value, onPress, size = [0.8, 0.1, 0.8] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<THREE.Mesh>(null);

  // Animation for button press
  useEffect(() => {
    if (!buttonRef.current) return;

    if (isPressed) {
      gsap.to(buttonRef.current.position, {
        y: position[1] - 0.05,
        duration: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(buttonRef.current.position, {
            y: position[1],
            duration: 0.2,
            ease: 'elastic.out(1, 0.3)',
          });
          setTimeout(() => setIsPressed(false), 200);
        }
      });
    }
  }, [isPressed, position]);

  const handlePress = () => {
    setIsPressed(true);
    onPress(value);
  };

  return (
    <mesh
      ref={buttonRef}
      position={position}
      receiveShadow
      castShadow
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={handlePress}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={isRed ? '#b24f3b' : color}
        roughness={0.3}
        emissive={isHovered ? '#333333' : '#000000'}
        emissiveIntensity={isHovered ? 0.1 : 0}
      />
      <Html position={[0, size[1] / 2 + 0.01, 0]} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            color: isRed ? 'white' : 'black',
            fontSize: '8px',
            fontWeight: 'bold',
            textAlign: 'center',
            userSelect: 'none'
          }}
        >
          {value}
        </div>
      </Html>
    </mesh>
  );
}

// Advanced calculator model with more detailed geometry and interactivity
export function AdvancedCalculator({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#e6e8ef' }) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [operator, setOperator] = useState('');

  // Custom material for the calculator body based on the color prop
  const customWhiteMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.1,
    metalness: 0.1,
  });

  // Animation for when the calculator is hovered
  useEffect(() => {
    if (!group.current) return;

    if (hovered) {
      gsap.to(group.current.rotation, {
        y: group.current.rotation.y + 0.2,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(group.current.rotation, {
        y: rotation[1],
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [hovered, rotation]);

  // Add calculator-wrapper class to the group div for scroll animation
  useEffect(() => {
    if (group.current) {
      // Add the calculator-wrapper class to the parent element of the group
      // Since we can't directly add class names to Three.js objects, we use a hack
      // to identify this element in the DOM for GSAP animations
      const parentElement = document.querySelector('canvas');
      if (parentElement) {
        parentElement.classList.add('calculator-wrapper');
      }
    }
  }, []);

  // Handle button press on calculator
  const handleButtonPress = (value) => {
    if (value === 'C') {
      // Clear button
      setDisplayValue('0');
      setCurrentValue('');
      setPrevValue('');
      setOperator('');
    } else if (value === '=') {
      // Equals button
      if (currentValue && prevValue && operator) {
        const current = parseFloat(currentValue);
        const previous = parseFloat(prevValue);
        let result = 0;

        switch (operator) {
          case '+':
            result = previous + current;
            break;
          case '-':
            result = previous - current;
            break;
          case '×':
            result = previous * current;
            break;
          case '÷':
            result = previous / current;
            break;
        }

        setDisplayValue(result.toString());
        setCurrentValue(result.toString());
        setPrevValue('');
        setOperator('');
      }
    } else if (['+', '-', '×', '÷'].includes(value)) {
      // Operator buttons
      if (currentValue) {
        setPrevValue(currentValue);
        setCurrentValue('');
        setOperator(value);
        setDisplayValue(value);
      }
    } else {
      // Number buttons
      if (currentValue === '0' || displayValue === '0' || displayValue === '+' || displayValue === '-' || displayValue === '×' || displayValue === '÷') {
        setCurrentValue(value);
        setDisplayValue(value);
      } else {
        setCurrentValue(currentValue + value);
        setDisplayValue(displayValue + value);
      }
    }
  };

  return (
    <group
      ref={group}
      position={position as [number, number, number]}
      rotation={rotation as [number, number, number]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main calculator body - flat with raised edge */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[5, 0.2, 7]} />
        <meshStandardMaterial {...customWhiteMaterial} />
      </mesh>

      {/* Raised edge around calculator */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[5.2, 0.1, 7.2]} />
        <meshStandardMaterial {...customWhiteMaterial} />
      </mesh>

      {/* Calculator display section */}
      <mesh position={[0, 0.2, -2.5]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.1, 1.5]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>

      {/* Calculator screen */}
      <mesh position={[0, 0.25, -2.5]} receiveShadow castShadow>
        <boxGeometry args={[3.8, 0.05, 1.3]} />
        <primitive object={screenMaterial} />
        <Html position={[0, 0.05, 0]} transform style={{ pointerEvents: 'none' }}>
          <div style={{
            color: '#42FF00',
            fontSize: '18px',
            fontFamily: 'monospace',
            width: '100px',
            textAlign: 'right',
            padding: '4px',
            userSelect: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {displayValue}
          </div>
        </Html>
      </mesh>

      {/* Calculator buttons */}
      {/* First row */}
      <CalculatorButton
        position={[-1.65, 0.15, -0.5]}
        value="C"
        isRed={true}
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[-0.55, 0.15, -0.5]}
        value="±"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[0.55, 0.15, -0.5]}
        value="%"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[1.65, 0.15, -0.5]}
        value="÷"
        onPress={handleButtonPress}
      />

      {/* Second row */}
      <CalculatorButton
        position={[-1.65, 0.15, 0.6]}
        value="7"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[-0.55, 0.15, 0.6]}
        value="8"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[0.55, 0.15, 0.6]}
        value="9"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[1.65, 0.15, 0.6]}
        value="×"
        onPress={handleButtonPress}
      />

      {/* Third row */}
      <CalculatorButton
        position={[-1.65, 0.15, 1.7]}
        value="4"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[-0.55, 0.15, 1.7]}
        value="5"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[0.55, 0.15, 1.7]}
        value="6"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[1.65, 0.15, 1.7]}
        value="-"
        onPress={handleButtonPress}
      />

      {/* Fourth row */}
      <CalculatorButton
        position={[-1.65, 0.15, 2.8]}
        value="1"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[-0.55, 0.15, 2.8]}
        value="2"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[0.55, 0.15, 2.8]}
        value="3"
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[1.65, 0.15, 2.8]}
        value="+"
        onPress={handleButtonPress}
      />

      {/* Fifth row */}
      <CalculatorButton
        position={[-1.1, 0.15, 3.9]}
        value="0"
        size={[1.9, 0.1, 0.8]}
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[0.55, 0.15, 3.9]}
        value="."
        onPress={handleButtonPress}
      />
      <CalculatorButton
        position={[1.65, 0.15, 3.9]}
        value="="
        isRed={true}
        onPress={handleButtonPress}
      />

      {/* Red accent button on the side */}
      <mesh position={[2.3, 0.2, -1.5]} receiveShadow castShadow>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <primitive object={redMaterial} />
      </mesh>
    </group>
  );
}

export default AdvancedCalculator;
