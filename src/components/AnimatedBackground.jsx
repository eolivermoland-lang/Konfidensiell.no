import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

const Building = ({ position, scale, speed, color }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      // Massive pulsing movement
      mesh.current.scale.y = scale[1] + Math.sin(t * speed) * (scale[1] * 0.2);
      // Keep base at the bottom
      mesh.current.position.y = mesh.current.scale.y / 2 - 10;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.5}
        />
        {/* Detail wireframe */}
        <mesh scale={[1.05, 1, 1.05]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
        </mesh>
      </mesh>
      {/* Top light cap */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

const City = () => {
  const buildingCount = 45;
  const buildings = useMemo(() => {
    return Array.from({ length: buildingCount }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        0,
        (Math.random() - 0.5) * 40
      ],
      scale: [
        Math.random() * 3 + 2, // Width
        Math.random() * 15 + 10, // Height
        Math.random() * 3 + 2  // Depth
      ],
      speed: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? "#10b981" : "#06b6d4"
    }));
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={['#050a1f']} />
      <fog attach="fog" args={['#050a1f', 10, 50]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[20, 30, 10]} intensity={2} color="#10b981" />
      <pointLight position={[-20, 30, -10]} intensity={2} color="#06b6d4" />
      
      <City />
      
      {/* Massive bottom grid for scale */}
      <gridHelper args={[200, 50, "#10b981", "#050a1f"]} position={[0, -10, 0]} opacity={0.2} transparent />
      
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
};

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#050a1f]" />;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050a1f]">
      <Canvas 
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        {/* Top-down perspective camera */}
        <PerspectiveCamera makeDefault position={[15, 25, 15]} rotation={[-Math.PI / 3, Math.PI / 6, 0]} fov={55} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050a1f] opacity-80" />
    </div>
  );
};

export default AnimatedBackground;