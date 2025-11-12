"use client"
import React, { useEffect, useRef } from 'react';

export const Grid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.strokeStyle = '#5c5c5c73';
      ctx.lineWidth = 1;

      const gridSize = 15;

      const numCols = Math.floor(canvas.width / gridSize);
      const numRows = Math.floor(canvas.height / gridSize);

      const actualGridWidth = numCols * gridSize;
      const actualGridHeight = numRows * gridSize;

      const offsetX = (canvas.width - actualGridWidth) / 2;
      const offsetY = (canvas.height - actualGridHeight) / 2;

      for (let i = 0; i <= numCols; i++) {
        const x = offsetX + (i * gridSize);
        ctx.beginPath();
        ctx.moveTo(x, offsetY);
        ctx.lineTo(x, offsetY + actualGridHeight);
        ctx.stroke();
      }

      for (let i = 0; i <= numRows; i++) {
        const y = offsetY + (i * gridSize);
        ctx.beginPath();
        ctx.moveTo(offsetX, y);
        ctx.lineTo(offsetX + actualGridWidth, y);
        ctx.stroke();
      }
    };

    // Initial draw
    drawGrid();

    // Handle window resize
    const handleResize = () => {
      drawGrid();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full object-cover opacity-[0.3]" />;
};