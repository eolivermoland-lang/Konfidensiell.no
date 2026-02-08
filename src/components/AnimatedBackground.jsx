import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

const Blob = ({ position, color, speed, distort }) => {
  return (
    <Float speed={4} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} position={position} scale={1.5}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
      
      <Blob position={[-3, 1, -2]} color="#3b82f6" speed={2} distort={0.4} />
      <Blob position={[3, -1, -3]} color="#6366f1" speed={3} distort={0.5} />
      <Blob position={[0, 2, -5]} color="#a855f7" speed={1.5} distort={0.3} />
      
      {/* Moving stars background */}
      <StarsLayer />
    </>
  );
};

const StarsLayer = () => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  
  return (
    <mesh ref={ref} scale={10}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color="#1e293b" 
        wireframe 
        transparent 
        opacity={0.1} 
      />
    </mesh>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050a1f]">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Vivid Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050a1f] via-transparent to-transparent pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;