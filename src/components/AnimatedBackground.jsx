import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let frame = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const draw = () => {
      // THE BASE BACKGROUND COLOR
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
      
      const gridSize = 50;
      const columns = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;
      
      frame += 0.015;

      // Draw Grid Lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'; // BRIGHTER BLUE
      ctx.lineWidth = 0.5;

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          const waveX = Math.sin(frame + (i * 0.5) + (j * 0.3)) * 15;
          const waveY = Math.cos(frame + (i * 0.3) + (j * 0.5)) * 15;

          // Draw connections
          if (i < columns - 1) {
            const nextWaveX = Math.sin(frame + ((i + 1) * 0.5) + (j * 0.3)) * 15;
            const nextWaveY = Math.cos(frame + ((i + 1) * 0.3) + (j * 0.5)) * 15;
            ctx.moveTo(x + waveX, y + waveY);
            ctx.lineTo((i + 1) * gridSize + nextWaveX, y + nextWaveY);
          }

          if (j < rows - 1) {
            const nextWaveX = Math.sin(frame + (i * 0.5) + ((j + 1) * 0.3)) * 15;
            const nextWaveY = Math.cos(frame + (i * 0.2) + ((j + 1) * 0.5)) * 15;
            ctx.moveTo(x + waveX, y + waveY);
            ctx.lineTo(x + nextWaveX, (j + 1) * gridSize + nextWaveY);
          }
        }
      }
      ctx.stroke();

      // Draw Glowing Nodes
      for (let i = 0; i < columns; i += 2) {
        for (let j = 0; j < rows; j += 2) {
          const x = i * gridSize;
          const y = j * gridSize;
          const waveX = Math.sin(frame + (i * 0.5) + (j * 0.3)) * 15;
          const waveY = Math.cos(frame + (i * 0.3) + (j * 0.5)) * 15;

          ctx.beginPath();
          ctx.arc(x + waveX, y + waveY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.8)'; // BRIGHT PURPLE
          ctx.fill();
          
          // Outer Glow
          ctx.beginPath();
          ctx.arc(x + waveX, y + waveY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default AnimatedBackground;
