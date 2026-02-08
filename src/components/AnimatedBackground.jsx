import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, speed, distort }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(t / 4) / 2;
    mesh.current.rotation.y = Math.sin(t / 4) / 2;
    mesh.current.rotation.z = Math.sin(t / 4) / 2;
    mesh.current.position.y = position[1] + Math.sin(t / 2) / 2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        speed={speed}
        distort={distort}
        radius={1}
        transparent
        opacity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const Blob = () => {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <FloatingShape position={[-2, 1, -2]} color="#3b82f6" speed={2} distort={0.4} />
      </Float>
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <FloatingShape position={[2, -1, -3]} color="#6366f1" speed={3} distort={0.5} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={3}>
        <FloatingShape position={[0, 0, -5]} color="#a855f7" speed={1.5} distort={0.3} />
      </Float>
    </group>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050a1f]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
        
        <Blob />
        
        {/* Particle field for extra detail */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[20, 20, 20]} />
          <meshBasicMaterial wireframe color="#1e293b" transparent opacity={0.1} />
        </mesh>
      </Canvas>

      {/* Modern Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050a1f] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;