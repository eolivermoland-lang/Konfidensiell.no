import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950/0 via-slate-950/50 to-slate-950 pointer-events-none" />
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default AnimatedBackground;