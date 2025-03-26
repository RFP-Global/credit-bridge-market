
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const stateData = [
  { state: 'California', value: 87, color: '#33bbef' },
  { state: 'Texas', value: 72, color: '#8B5CF6' },
  { state: 'New York', value: 65, color: '#10b981' },
  { state: 'Florida', value: 58, color: '#F97316' },
  { state: 'Illinois', value: 45, color: '#fbd024' },
  { state: 'Pennsylvania', value: 42, color: '#f43f5e' },
  { state: 'Ohio', value: 38, color: '#06b6d4' },
  { state: 'Georgia', value: 36, color: '#8b5cf6' },
  { state: 'North Carolina', value: 34, color: '#ec4899' },
  { state: 'Michigan', value: 32, color: '#14b8a6' },
  { state: 'New Jersey', value: 30, color: '#6366f1' },
  { state: 'Virginia', value: 28, color: '#a855f7' },
  { state: 'Washington', value: 26, color: '#f59e0b' },
  { state: 'Arizona', value: 24, color: '#84cc16' },
  { state: 'Massachusetts', value: 22, color: '#06b6d4' },
  { state: 'Tennessee', value: 20, color: '#10b981' },
  { state: 'Indiana', value: 18, color: '#3b82f6' },
  { state: 'Missouri', value: 16, color: '#ef4444' },
  { state: 'Maryland', value: 14, color: '#8b5cf6' },
  { state: 'Wisconsin', value: 12, color: '#f97316' },
];

const GeoMap = ({ timeFilter }: { timeFilter: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a stylized USA map (simplified for this example)
    drawStylizedMap(ctx, rect.width, rect.height);

    // Handle mouse move for tooltips
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      // Detect which "state" is being hovered (simplified)
      const state = detectHoveredState(x, y);
      if (state) {
        const stateInfo = stateData.find(s => s.state === state);
        setHoveredState(state);
        setHoveredValue(stateInfo?.value ?? null);
      } else {
        setHoveredState(null);
        setHoveredValue(null);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [timeFilter]);

  const drawStylizedMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw state-like shapes with heat map colors
    const stateShapes = generateStateShapes(width, height);
    
    stateShapes.forEach((shape, index) => {
      const stateInfo = stateData[index % stateData.length];
      
      // Draw shape
      ctx.fillStyle = stateInfo.color + '80'; // Add transparency
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(shape[0].x, shape[0].y);
      
      for (let i = 1; i < shape.length; i++) {
        ctx.lineTo(shape[i].x, shape[i].y);
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Add glow effect based on value
      const glow = Math.min(stateInfo.value / 100 * 20, 15);
      if (glow > 5) {
        ctx.shadowColor = stateInfo.color;
        ctx.shadowBlur = glow;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Add a point in the center
      const centerX = shape.reduce((sum, pt) => sum + pt.x, 0) / shape.length;
      const centerY = shape.reduce((sum, pt) => sum + pt.y, 0) / shape.length;
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 1, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw connections between states
    ctx.strokeStyle = '#ffffff30';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < stateShapes.length; i++) {
      const shape1 = stateShapes[i];
      const center1 = {
        x: shape1.reduce((sum, pt) => sum + pt.x, 0) / shape1.length,
        y: shape1.reduce((sum, pt) => sum + pt.y, 0) / shape1.length
      };
      
      // Connect to nearby states
      for (let j = i + 1; j < stateShapes.length; j++) {
        const shape2 = stateShapes[j];
        const center2 = {
          x: shape2.reduce((sum, pt) => sum + pt.x, 0) / shape2.length,
          y: shape2.reduce((sum, pt) => sum + pt.y, 0) / shape2.length
        };
        
        const distance = Math.sqrt(
          Math.pow(center2.x - center1.x, 2) + 
          Math.pow(center2.y - center1.y, 2)
        );
        
        if (distance < 80) {
          ctx.beginPath();
          ctx.moveTo(center1.x, center1.y);
          ctx.lineTo(center2.x, center2.y);
          ctx.stroke();
        }
      }
    }
  };

  const generateStateShapes = (width: number, height: number) => {
    const shapes = [];
    
    // Create some randomized polygon shapes to represent states
    for (let i = 0; i < 20; i++) {
      const centerX = Math.random() * (width - 100) + 50;
      const centerY = Math.random() * (height - 100) + 50;
      const points = Math.floor(Math.random() * 3) + 5; // 5-7 points
      const radius = Math.random() * 20 + 15;
      
      const shape = [];
      
      for (let j = 0; j < points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const r = radius * (0.8 + Math.random() * 0.4);
        
        shape.push({
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r
        });
      }
      
      shapes.push(shape);
    }
    
    return shapes;
  };

  const detectHoveredState = (x: number, y: number) => {
    // This is a simplified example - in a real app, you'd do proper hit-testing
    // For the example, we'll just return a random state when near the center
    const centerDistance = Math.sqrt(
      Math.pow(x - canvasRef.current!.width / (2 * window.devicePixelRatio), 2) + 
      Math.pow(y - canvasRef.current!.height / (2 * window.devicePixelRatio), 2)
    );
    
    if (centerDistance < 100) {
      const index = Math.floor(Math.random() * stateData.length);
      return stateData[index].state;
    }
    
    return null;
  };

  return (
    <div className="relative w-full h-[350px]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded border border-gray-800"
      />
      
      {hoveredState && (
        <div 
          className="absolute bg-black/90 border border-gray-700 text-xs p-2 rounded pointer-events-none z-10"
          style={{ 
            left: mousePosition.x + 10, 
            top: mousePosition.y + 10
          }}
        >
          <p className="font-medium text-white">{hoveredState}</p>
          <p className="text-cyan-400">Loan Demand: {hoveredValue}</p>
        </div>
      )}
      
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <div className="h-1.5 w-8 bg-gradient-to-r from-blue-500/60 to-red-500/60 rounded-sm" />
        <div className="text-xs text-gray-400">Loan Demand</div>
      </div>
    </div>
  );
};

export default GeoMap;
