import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';

const CrystalOrb = ({ position, color, size, speed, distort }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.2;
      mesh.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.5}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#8b5cf6" />
      
      {/* Large Central "Energy" Hub */}
      <CrystalOrb position={[0, 0, -2]} color="#2563eb" size={2} speed={1} distort={0.3} />
      
      {/* Surrounding Orbs */}
      <CrystalOrb position={[-4, 2, -4]} color="#3b82f6" size={1.2} speed={2} distort={0.5} />
      <CrystalOrb position={[4, -2, -4]} color="#7c3aed" size={1.5} speed={1.5} distort={0.4} />
      <CrystalOrb position={[2, 3, -6]} color="#60a5fa" size={0.8} speed={3} distort={0.6} />
      
      {/* Moving Tech Grid */}
      <gridHelper args={[100, 50, "#1e293b", "#0f172a"]} rotation={[Math.PI / 4, 0, 0]} position={[0, -10, 0]} opacity={0.2} transparent />
    </>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020617] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Visual Polish Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#020617_100%)] opacity-60" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/5 via-transparent to-purple-600/5" />
    </div>
  );
};

export default AnimatedBackground;