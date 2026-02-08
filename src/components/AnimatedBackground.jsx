import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

const ArcticOrb = ({ position, color, size, speed, distort }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.15;
      mesh.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.5}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" />
      
      {/* Arctic Emerald Orbs */}
      <ArcticOrb position={[0, 0, -2]} color="#10b981" size={2.2} speed={1} distort={0.3} />
      <ArcticOrb position={[-5, 2, -5]} color="#06b6d4" size={1.5} speed={2} distort={0.4} />
      <ArcticOrb position={[5, -2, -5]} color="#10b981" size={1.8} speed={1.5} distort={0.5} />
      <ArcticOrb position={[2, 4, -7]} color="#f1f5f9" size={1} speed={2.5} distort={0.3} />
      
      {/* Subtle Moving Lattice */}
      <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 0, -10]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.05} />
      </mesh>
    </>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0f172a] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Arctic Overlay Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(6,184,212,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[#0f172a]/20 pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;