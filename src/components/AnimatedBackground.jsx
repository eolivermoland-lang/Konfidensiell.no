import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, MeshWobbleMaterial, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Monolith = ({ position, scale, speed, color }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      // Sophisticated architectural movement
      mesh.current.position.y = position[1] + Math.sin(t * speed) * 3;
      mesh.current.rotation.y = t * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#0f172a" 
        metalness={1} 
        roughness={0.1} 
        transparent 
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
      {/* High-end neon edges */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </mesh>
  );
};

const City = () => {
  const buildings = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 40
      ],
      scale: [
        Math.random() * 4 + 2,
        Math.random() * 20 + 10,
        Math.random() * 4 + 2
      ],
      speed: Math.random() * 0.3 + 0.05,
      color: Math.random() > 0.5 ? "#10b981" : "#06b6d4"
    }));
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <Monolith key={i} {...b} />
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={['#050a1f']} />
      <fog attach="fog" args={['#050a1f', 15, 60]} />
      <ambientLight intensity={0.4} />
      
      {/* Volumetric style lights */}
      <pointLight position={[20, 40, 20]} intensity={3} color="#10b981" />
      <pointLight position={[-20, 40, -20]} intensity={3} color="#06b6d4" />
      <spotLight position={[0, 50, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" castShadow />
      
      <City />
      
      {/* High-detail floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -15, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#020617" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <gridHelper args={[200, 60, "#10b981", "#050a1f"]} position={[0, -14.9, 0]} opacity={0.2} transparent />
    </>
  );
};

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#050a1f]" />;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050a1f]">
      <Canvas 
        shadows
        dpr={[1, 2]} // Back to high quality for PC, scales for mobile
        gl={{ 
          antialias: true, // Re-enable for premium look
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera makeDefault position={[20, 35, 25]} rotation={[-Math.PI / 4, Math.PI / 5, 0]} fov={50} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,10,31,0.6)_100%)]" />
    </div>
  );
};

export default AnimatedBackground;