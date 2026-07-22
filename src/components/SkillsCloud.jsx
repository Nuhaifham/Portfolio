import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsCloud({ skills }) {
  const containerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [connections, setConnections] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const rotationRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef({ x: 0.003, y: 0.003 });
  const scaleProgress = useRef({ val: 0, vel: 0 });

  // Map skills to spherical distribution (Fibonacci Sphere algorithm)
  useEffect(() => {
    const qty = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const initialPoints = skills.map((skill, index) => {
      const y = 1 - (index / (qty - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * index;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      return {
        ...skill,
        ox: x,
        oy: y,
        oz: z,
        index,
      };
    });

    // Calculate connections between close points
    const calculatedConnections = [];
    for (let i = 0; i < qty; i++) {
      for (let j = i + 1; j < qty; j++) {
        const dist = Math.sqrt(
          Math.pow(initialPoints[i].ox - initialPoints[j].ox, 2) +
          Math.pow(initialPoints[i].oy - initialPoints[j].oy, 2) +
          Math.pow(initialPoints[i].oz - initialPoints[j].oz, 2)
        );
        if (dist < 1.4) {
          calculatedConnections.push([i, j]);
        }
      }
    }

    setConnections(calculatedConnections);
    setPoints(initialPoints);
  }, [skills]);

  // Handle animation loop
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [springVal, setSpringVal] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const tick = () => {
      rotationRef.current.x += speedRef.current.x;
      rotationRef.current.y += speedRef.current.y;

      // Spring-up animation on load/intersection
      const target = 1;
      const diff = target - scaleProgress.current.val;
      scaleProgress.current.vel += diff * 0.04;
      scaleProgress.current.vel *= 0.85;
      scaleProgress.current.val += scaleProgress.current.vel;

      setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
      setSpringVal(scaleProgress.current.val);

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    speedRef.current.x = (e.clientY - centerY) / (rect.height / 2) * 0.01;
    speedRef.current.y = (e.clientX - centerX) / (rect.width / 2) * 0.01;
  };

  const handleMouseLeave = () => {
    // Return to gentle rotation
    speedRef.current.x = 0.003;
    speedRef.current.y = 0.003;
  };

  // 3D rotation projection calculations
  const sinX = Math.sin(rotation.x);
  const cosX = Math.cos(rotation.x);
  const sinY = Math.sin(rotation.y);
  const cosY = Math.cos(rotation.y);

  const radius3D = (typeof window !== "undefined" && window.innerWidth < 640 ? 150 : 230) * Math.max(0.001, springVal);

  const projectedPoints = points.map((point) => {
    // Rotate around X axis
    const y1 = point.oy * cosX - point.oz * sinX;
    const z1 = point.oz * cosX + point.oy * sinX;

    // Rotate around Y axis
    const x2 = point.ox * cosY + z1 * sinY;
    const z2 = z1 * cosY - point.ox * sinY;

    // Depth scale factors
    const depth = (z2 + 2) / 3 * springVal;
    const opacity = (z2 + 1.5) / 2.5 * springVal;

    const left = x2 * radius3D;
    const top = y1 * radius3D;

    return {
      ...point,
      left,
      top,
      scale: depth,
      opacity,
      depthZ: z2,
    };
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto flex items-center justify-center overflow-visible select-none"
      style={{ height: "550px", minHeight: "550px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Connector Lines */}
      <svg
        className="absolute left-1/2 top-1/2 pointer-events-none overflow-visible w-0 h-0"
        style={{ zIndex: 0 }}
      >
        {connections.map(([i, jIndex], idx) => {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[jIndex];
          if (!p1 || !p2) return null;

          const isHighlighted = hoveredIndex !== null && (i === hoveredIndex || jIndex === hoveredIndex);
          const avgDepth = (p1.depthZ + p2.depthZ) / 2;
          const lineOpacity = Math.max(0.05, (avgDepth + 1) / 2.5) * springVal;

          return (
            <line
              key={idx}
              x1={p1.left}
              y1={p1.top}
              x2={p2.left}
              y2={p2.top}
              stroke="var(--color-primary)"
              strokeWidth={isHighlighted ? "2.5" : "1.2"}
              opacity={isHighlighted ? 0.75 : lineOpacity * 0.25}
              className={isHighlighted ? "animate-pulse" : "transition-opacity duration-300"}
            />
          );
        })}
      </svg>

      {/* Floating Skill Tags */}
      {projectedPoints.map((point, index) => {
        const isHovered = hoveredIndex === index;
        return (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/70 dark:bg-gray-900/70 border-white/60 dark:border-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-[0_0_15px_var(--color-primary)]/20 shadow-sm"
            style={{
              transform: `translate(calc(-50% + ${point.left}px), calc(-50% + ${point.top}px)) scale(${point.scale * (isHovered ? 1.25 : 1)})`,
              opacity: point.opacity,
              zIndex: Math.round((point.depthZ + 2) * 100),
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="text-lg flex items-center justify-center">{point.icon}</span>
            <span className={`text-xs font-bold transition-colors duration-300 ${isHovered ? 'text-[var(--color-primary)]' : 'text-gray-800 dark:text-gray-200'}`}>
              {point.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
