import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

const Building = ({ position, scale, speed, color }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.scale.y = scale[1] + Math.sin(t * speed) * (scale[1] * 0.15);
      mesh.current.position.y = mesh.current.scale.y / 2 - 10;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          transparent 
          opacity={0.25}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Visual top cap */}
      <mesh position={[0, scale[1] * 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[scale[0] * 1.1, scale[2] * 1.1]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const City = ({ isMobile }) => {
  const buildingCount = isMobile ? 15 : 35; // Significant reduction for mobile
  const buildings = useMemo(() => {
    return Array.from({ length: buildingCount }, () => ({
      position: [
        (Math.random() - 0.5) * 35,
        0,
        (Math.random() - 0.5) * 35
      ],
      scale: [
        Math.random() * 2 + 2,
        Math.random() * 12 + 8,
        Math.random() * 2 + 2
      ],
      speed: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.5 ? "#10b981" : "#06b6d4"
    }));
  }, [buildingCount]);

  return (
    <group>
      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}
    </group>
  );
};

const Scene = ({ isMobile }) => {
  return (
    <>
      <color attach="background" args={['#050a1f']} />
      <fog attach="fog" args={['#050a1f', 10, 45]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[20, 30, 10]} intensity={1.5} color="#10b981" />
      <pointLight position={[-20, 30, -10]} intensity={1.5} color="#06b6d4" />
      
      <City isMobile={isMobile} />
      
      <gridHelper args={[150, 40, "#10b981", "#050a1f"]} position={[0, -10, 0]} opacity={0.15} transparent />
      
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
};

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => setMounted(true), 200);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#050a1f]" />;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050a1f]">
      <Canvas 
        dpr={isMobile ? [1, 1] : [1, 1.5]} // Lower resolution on mobile for speed
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[12, 22, 12]} rotation={[-Math.PI / 3.5, Math.PI / 6, 0]} fov={isMobile ? 65 : 55} />
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050a1f] opacity-90" />
    </div>
  );
};

export default AnimatedBackground;