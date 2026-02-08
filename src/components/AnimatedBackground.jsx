import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ServerTower = ({ position, scale, speed }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 2;
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
      {/* Glow outlines */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.1} />
      </mesh>
    </mesh>
  );
};

const DataStreams = () => {
  const count = 40;
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

const MovingLine = ({ start, end, speed }) => {
  const lineRef = useRef();
  useFrame((state) => {
    const t = (state.clock.getElapsedTime() * speed) % 1;
    lineRef.current.position.lerpVectors(start, end, t);
  });

  return (
    <mesh ref={lineRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#06b6d4" />
    </mesh>
  );
};

const Scene = () => {
  const towers = useMemo(() => {
    return Array.from({ length: 25 }, () => ({
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
      <fog attach="fog" args={['#050a1f', 5, 30]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#06b6d4" />

      {/* Massive Server Towers */}
      {towers.map((t, i) => (
        <ServerTower key={i} {...t} />
      ))}

      {/* Moving Data */}
      <DataStreams />

      {/* Floor Grid */}
      <gridHelper args={[100, 50, "#10b981", "#0f172a"]} position={[0, -8, 0]} opacity={0.3} transparent />
      
      {/* Ceiling Grid */}
      <gridHelper args={[100, 50, "#06b6d4", "#0f172a"]} position={[0, 12, 0]} opacity={0.1} transparent />
    </>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Professional Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050a1f] via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.1),transparent_40%)]" />
    </div>
  );
};

export default AnimatedBackground;