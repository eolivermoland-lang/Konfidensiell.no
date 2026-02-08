import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Box } from '@react-three/drei';
import * as THREE from 'three';

const DataCube = ({ position, color, size, speed }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.2 * speed;
      mesh.current.rotation.y = t * 0.3 * speed;
      mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.4}
          emissive={color}
          emissiveIntensity={0.5}
        />
        {/* Wireframe overlay for technical look */}
        <mesh>
          <boxGeometry args={[size * 1.05, size * 1.05, size * 1.05]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
      </mesh>
    </Float>
  );
};

const InfrastructureGrid = () => {
  const gridRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    gridRef.current.position.z = (t * 0.5) % 2; // Moving floor effect
  });

  return (
    <group>
      <gridHelper 
        ref={gridRef}
        args={[100, 40, "#10b981", "#0f172a"]} 
        position={[0, -5, 0]} 
        rotation={[0, 0, 0]}
      />
      <gridHelper 
        args={[100, 40, "#06b6d4", "#0f172a"]} 
        position={[0, 15, 0]} 
        rotation={[0, 0, 0]}
        opacity={0.1}
        transparent
      />
    </group>
  );
};

const DataParticles = () => {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef();
  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={['#050a1f']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
      
      <InfrastructureGrid />
      <DataParticles />
      
      {/* Dynamic Data Nodes */}
      <DataCube position={[-4, 2, -5]} color="#10b981" size={0.8} speed={1} />
      <DataCube position={[5, 0, -8]} color="#06b6d4" size={1.2} speed={0.5} />
      <DataCube position={[-2, -3, -10]} color="#10b981" size={1.5} speed={0.8} />
      <DataCube position={[3, 4, -12]} color="#ffffff" size={0.5} speed={1.2} />
      
      <fog attach="fog" args={['#050a1f', 5, 25]} />
    </>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Cyber Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a1f]/80 via-transparent to-[#050a1f]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#050a1f_100%)] opacity-40" />
    </div>
  );
};

export default AnimatedBackground;