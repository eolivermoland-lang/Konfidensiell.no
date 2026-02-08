import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

const ServerTower = ({ position, scale, speed }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(t * speed) * 2;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#10b981" 
        metalness={0.9} 
        roughness={0.1} 
        transparent 
        opacity={0.2}
        emissive="#10b981"
        emissiveIntensity={0.2}
      />
      <mesh scale={[1.02, 1.02, 1.02]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.1} />
      </mesh>
    </mesh>
  );
};

const MovingLine = ({ start, end, speed }) => {
  const lineRef = useRef();
  useFrame((state) => {
    const t = (state.clock.getElapsedTime() * speed) % 1;
    if (lineRef.current) {
      lineRef.current.position.lerpVectors(start, end, t);
    }
  });

  return (
    <mesh ref={lineRef}>
      <sphereGeometry args={[0.05, 6, 6]} /> {/* Reduced segments */}
      <meshBasicMaterial color="#06b6d4" />
    </mesh>
  );
};

const DataStreams = () => {
  const count = 30; // Reduced count
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => ({
      start: new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, -20),
      end: new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, 10),
      speed: Math.random() * 0.2 + 0.1
    }));
  }, []);

  return (
    <group>
      {lines.map((line, i) => (
        <MovingLine key={i} {...line} />
      ))}
    </group>
  );
};

const Scene = () => {
  const towers = useMemo(() => {
    return Array.from({ length: 20 }, () => ({ // Reduced count
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 10,
        Math.random() * -15
      ],
      scale: [Math.random() * 2 + 1, Math.random() * 10 + 5, Math.random() * 2 + 1],
      speed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <>
      <color attach="background" args={['#050a1f']} />
      <fog attach="fog" args={['#050a1f', 5, 35]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />

      {towers.map((t, i) => (
        <ServerTower key={i} {...t} />
      ))}

      <DataStreams />

      <gridHelper args={[100, 40, "#10b981", "#0f172a"]} position={[0, -8, 0]} opacity={0.2} transparent />
      <gridHelper args={[100, 40, "#06b6d4", "#0f172a"]} position={[0, 12, 0]} opacity={0.05} transparent />
      
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
};

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mounting the canvas to prioritize UI rendering
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#050a1f]" />;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas 
        dpr={[1, 1.5]} // Cap DPR for performance
        gl={{ antialias: false, powerPreference: "high-performance" }} // Disable antialias for speed
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050a1f] via-transparent to-transparent opacity-90" />
    </div>
  );
};

export default AnimatedBackground;