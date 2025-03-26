
import { useState, useEffect, useRef } from 'react';

// Sample data for US states with loan demand values
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

// Simple US state coordinate map (simplified for visualization purposes)
// These coordinates are approximations and not geographically accurate
const stateCoordinates = {
  // West Coast
  'California': { x: 0.10, y: 0.40, width: 0.10, height: 0.20 },
  'Washington': { x: 0.12, y: 0.15, width: 0.08, height: 0.08 },
  'Oregon': { x: 0.12, y: 0.25, width: 0.08, height: 0.10 },
  'Nevada': { x: 0.15, y: 0.40, width: 0.08, height: 0.12 },
  'Arizona': { x: 0.18, y: 0.52, width: 0.08, height: 0.10 },
  
  // Mountain West
  'Idaho': { x: 0.20, y: 0.25, width: 0.07, height: 0.12 },
  'Montana': { x: 0.25, y: 0.18, width: 0.10, height: 0.08 },
  'Wyoming': { x: 0.28, y: 0.28, width: 0.08, height: 0.07 },
  'Colorado': { x: 0.28, y: 0.38, width: 0.08, height: 0.07 },
  'New Mexico': { x: 0.28, y: 0.50, width: 0.08, height: 0.09 },
  'Utah': { x: 0.22, y: 0.38, width: 0.06, height: 0.09 },
  
  // Midwest
  'North Dakota': { x: 0.38, y: 0.18, width: 0.07, height: 0.06 },
  'South Dakota': { x: 0.38, y: 0.25, width: 0.07, height: 0.06 },
  'Nebraska': { x: 0.38, y: 0.32, width: 0.09, height: 0.06 },
  'Kansas': { x: 0.38, y: 0.39, width: 0.09, height: 0.06 },
  'Oklahoma': { x: 0.38, y: 0.46, width: 0.09, height: 0.06 },
  'Texas': { x: 0.35, y: 0.55, width: 0.12, height: 0.15 },
  
  // Northern Midwest
  'Minnesota': { x: 0.46, y: 0.18, width: 0.07, height: 0.09 },
  'Iowa': { x: 0.46, y: 0.30, width: 0.07, height: 0.06 },
  'Missouri': { x: 0.46, y: 0.38, width: 0.07, height: 0.08 },
  'Arkansas': { x: 0.46, y: 0.48, width: 0.07, height: 0.06 },
  'Louisiana': { x: 0.46, y: 0.57, width: 0.07, height: 0.07 },
  
  // Great Lakes
  'Wisconsin': { x: 0.54, y: 0.22, width: 0.06, height: 0.08 },
  'Illinois': { x: 0.54, y: 0.32, width: 0.05, height: 0.10 },
  'Michigan': { x: 0.60, y: 0.22, width: 0.06, height: 0.08 },
  'Indiana': { x: 0.60, y: 0.32, width: 0.05, height: 0.08 },
  'Ohio': { x: 0.65, y: 0.32, width: 0.05, height: 0.07 },
  
  // South
  'Kentucky': { x: 0.60, y: 0.40, width: 0.08, height: 0.05 },
  'Tennessee': { x: 0.60, y: 0.45, width: 0.08, height: 0.05 },
  'Mississippi': { x: 0.54, y: 0.50, width: 0.06, height: 0.08 },
  'Alabama': { x: 0.60, y: 0.50, width: 0.06, height: 0.08 },
  'Georgia': { x: 0.67, y: 0.50, width: 0.07, height: 0.08 },
  'Florida': { x: 0.70, y: 0.60, width: 0.08, height: 0.10 },
  
  // Northeast
  'New York': { x: 0.73, y: 0.25, width: 0.07, height: 0.07 },
  'Pennsylvania': { x: 0.71, y: 0.32, width: 0.07, height: 0.05 },
  'New Jersey': { x: 0.78, y: 0.32, width: 0.03, height: 0.05 },
  'Massachusetts': { x: 0.80, y: 0.25, width: 0.06, height: 0.03 },
  'Connecticut': { x: 0.80, y: 0.28, width: 0.03, height: 0.02 },
  'Vermont': { x: 0.78, y: 0.22, width: 0.03, height: 0.03 },
  'New Hampshire': { x: 0.80, y: 0.22, width: 0.03, height: 0.03 },
  'Maine': { x: 0.83, y: 0.19, width: 0.04, height: 0.05 },
  'Rhode Island': { x: 0.82, y: 0.27, width: 0.02, height: 0.02 },
  
  // South Atlantic
  'Virginia': { x: 0.73, y: 0.37, width: 0.07, height: 0.05 },
  'West Virginia': { x: 0.70, y: 0.37, width: 0.05, height: 0.05 },
  'Maryland': { x: 0.76, y: 0.35, width: 0.04, height: 0.03 },
  'Delaware': { x: 0.78, y: 0.37, width: 0.02, height: 0.02 },
  'North Carolina': { x: 0.73, y: 0.42, width: 0.08, height: 0.05 },
  'South Carolina': { x: 0.73, y: 0.47, width: 0.06, height: 0.05 },
  
  // Non-contiguous
  'Alaska': { x: 0.12, y: 0.75, width: 0.10, height: 0.10 },
  'Hawaii': { x: 0.22, y: 0.75, width: 0.06, height: 0.03 },
};

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

    // Draw map
    drawUSMap(ctx, rect.width, rect.height);

    // Handle mouse move for tooltips
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      // Detect which state is being hovered
      const state = detectHoveredState(x, y, rect.width, rect.height);
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

  const drawUSMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Title
    ctx.fillStyle = '#888';
    ctx.font = '10px Arial';
    ctx.fillText('United States', 10, 20);

    // Add subtle coastlines
    ctx.beginPath();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    // East Coast outline (simplified)
    ctx.moveTo(width * 0.83, height * 0.17); // Maine
    ctx.lineTo(width * 0.82, height * 0.65); // Florida coast
    // Gulf Coast
    ctx.lineTo(width * 0.35, height * 0.65); // Texas coast
    // West Coast
    ctx.moveTo(width * 0.10, height * 0.65);
    ctx.lineTo(width * 0.10, height * 0.15); // California to Washington
    ctx.stroke();

    // Draw states with heat map coloring
    Object.entries(stateCoordinates).forEach(([stateName, coords]) => {
      const stateInfo = stateData.find(s => s.state === stateName);
      if (!stateInfo) return;
      
      const x = width * coords.x;
      const y = height * coords.y;
      const w = width * coords.width;
      const h = height * coords.height;
      
      // Create state shape (rounded rectangle for simplicity)
      ctx.beginPath();
      const radius = 4;
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      
      // Fill with heat map color
      ctx.fillStyle = stateInfo.color + '80'; // Add transparency
      ctx.fill();
      
      // Stroke
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Add glow effect based on value
      const glow = Math.min(stateInfo.value / 100 * 20, 15);
      if (glow > 5) {
        ctx.shadowColor = stateInfo.color;
        ctx.shadowBlur = glow;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Add state label
      ctx.fillStyle = '#ccc';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(stateName, x + w / 2, y + h / 2 + 3);
      
      // Add state value
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px Arial';
      ctx.fillText(stateInfo.value.toString(), x + w / 2, y + h / 2 - 3);
    });
    
    // Draw connections between neighboring states
    ctx.strokeStyle = '#ffffff20';
    ctx.lineWidth = 0.3;
    
    // Draw some sample connections (this would ideally be defined as a graph of neighboring states)
    drawConnections(ctx, width, height);
    
    // Add compass
    drawCompass(ctx, width - 40, 40, 15);
    
    // Add legend
    drawLegend(ctx, width - 120, height - 40);
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Define some connections for visual effect
    const connections = [
      ['California', 'Nevada'],
      ['California', 'Oregon'],
      ['Nevada', 'Oregon'],
      ['Nevada', 'Utah'],
      ['Nevada', 'Arizona'],
      ['Arizona', 'New Mexico'],
      ['Arizona', 'Utah'],
      ['Utah', 'Colorado'],
      ['Colorado', 'New Mexico'],
      ['Colorado', 'Wyoming'],
      ['Colorado', 'Kansas'],
      ['Kansas', 'Missouri'],
      ['Missouri', 'Illinois'],
      ['Illinois', 'Indiana'],
      ['Indiana', 'Ohio'],
      ['Ohio', 'Pennsylvania'],
      ['Pennsylvania', 'New York'],
      ['New York', 'Massachusetts'],
      ['Georgia', 'Florida'],
      ['Georgia', 'South Carolina'],
      ['North Carolina', 'South Carolina'],
      ['North Carolina', 'Virginia'],
      ['Virginia', 'Maryland'],
      ['Texas', 'Louisiana'],
      ['Texas', 'Oklahoma'],
      ['Oklahoma', 'Kansas'],
    ];
    
    connections.forEach(([state1, state2]) => {
      const coords1 = stateCoordinates[state1 as keyof typeof stateCoordinates];
      const coords2 = stateCoordinates[state2 as keyof typeof stateCoordinates];
      
      if (coords1 && coords2) {
        const x1 = width * (coords1.x + coords1.width / 2);
        const y1 = height * (coords1.y + coords1.height / 2);
        const x2 = width * (coords2.x + coords2.width / 2);
        const y2 = height * (coords2.y + coords2.height / 2);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    });
  };

  const drawCompass = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.strokeStyle = '#555';
    ctx.fillStyle = '#333';
    
    // Outer circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // N
    ctx.fillStyle = '#ccc';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', x, y - size + 8);
    
    // E
    ctx.fillText('E', x + size - 8, y);
    
    // S
    ctx.fillText('S', x, y + size - 3);
    
    // W
    ctx.fillText('W', x - size + 8, y);
    
    // Pointer
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 4, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x + size / 4, y);
    ctx.closePath();
    ctx.fillStyle = '#ffffff30';
    ctx.fill();
  };

  const drawLegend = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#555';
    ctx.fillRect(x, y - 15, 100, 30);
    ctx.strokeRect(x, y - 15, 100, 30);
    
    // Gradient bar
    const gradient = ctx.createLinearGradient(x + 5, y, x + 85, y);
    gradient.addColorStop(0, '#33bbef80');
    gradient.addColorStop(0.4, '#8B5CF680');
    gradient.addColorStop(0.7, '#F9731680');
    gradient.addColorStop(1, '#fbd02480');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x + 5, y, 80, 8);
    ctx.strokeStyle = '#666';
    ctx.strokeRect(x + 5, y, 80, 8);
    
    // Labels
    ctx.fillStyle = '#aaa';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Low', x + 5, y - 5);
    ctx.fillText('High', x + 85, y - 5);
    ctx.fillText('Loan Demand', x + 45, y + 20);
  };

  const detectHoveredState = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
    // Detect which state the mouse is hovering over
    for (const [stateName, coords] of Object.entries(stateCoordinates)) {
      const stateX = canvasWidth * coords.x;
      const stateY = canvasHeight * coords.y;
      const stateW = canvasWidth * coords.width;
      const stateH = canvasHeight * coords.height;
      
      if (x >= stateX && x <= stateX + stateW && y >= stateY && y <= stateY + stateH) {
        return stateName;
      }
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
