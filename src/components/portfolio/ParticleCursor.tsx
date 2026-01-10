import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Cursor interaction states
type CursorState = 'default' | 'hover' | 'drag' | 'text' | 'resize' | 'loading';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

// Particle system component
const ParticleSystem = ({ 
  mousePosition, 
  cursorState,
  trail 
}: { 
  mousePosition: { x: number; y: number }; 
  cursorState: CursorState;
  trail: TrailPoint[];
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const trailRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  
  // Particle count based on state
  const particleCount = useMemo(() => {
    switch (cursorState) {
      case 'hover': return 64;
      case 'drag': return 96;
      case 'text': return 48;
      case 'loading': return 80;
      default: return 42;
    }
  }, [cursorState]);

  // Create particle geometry
  const { positions, velocities, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    
    // Mint color from design system: hsl(160, 72%, 46%)
    const mintColor = new THREE.Color().setHSL(160 / 360, 0.72, 0.46);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.3;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      
      sizes[i] = Math.random() * 3 + 1;
      
      // Slight color variation
      const hueOffset = (Math.random() - 0.5) * 0.05;
      const tempColor = new THREE.Color().setHSL(
        160 / 360 + hueOffset, 
        0.72 + (Math.random() - 0.5) * 0.1, 
        0.46 + (Math.random() - 0.5) * 0.1
      );
      colors[i3] = tempColor.r;
      colors[i3 + 1] = tempColor.g;
      colors[i3 + 2] = tempColor.b;
    }
    
    return { positions, velocities, sizes, colors };
  }, [particleCount]);

  // Trail geometry
  const trailGeometry = useMemo(() => {
    const maxTrailPoints = 30;
    const positions = new Float32Array(maxTrailPoints * 3);
    const sizes = new Float32Array(maxTrailPoints);
    const colors = new Float32Array(maxTrailPoints * 3);
    
    return { positions, sizes, colors, maxTrailPoints };
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    
    timeRef.current += delta;
    const time = timeRef.current;
    
    const positionAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const sizeAttr = particlesRef.current.geometry.attributes.size as THREE.BufferAttribute;
    
    // Shape parameters based on cursor state
    let targetRadius = 0.3;
    let rotationSpeed = 1;
    let expansionFactor = 1;
    let zDepth = 0.2;
    
    switch (cursorState) {
      case 'hover':
        targetRadius = 0.5;
        rotationSpeed = 2;
        expansionFactor = 1.5;
        zDepth = 0.4;
        break;
      case 'drag':
        targetRadius = 0.7;
        rotationSpeed = 3;
        expansionFactor = 2;
        zDepth = 0.3;
        break;
      case 'text':
        targetRadius = 0.15;
        rotationSpeed = 0.5;
        expansionFactor = 0.5;
        zDepth = 0.1;
        break;
      case 'resize':
        targetRadius = 0.6;
        rotationSpeed = 1.5;
        expansionFactor = 1.8;
        zDepth = 0.5;
        break;
      case 'loading':
        targetRadius = 0.4 + Math.sin(time * 4) * 0.2;
        rotationSpeed = 4;
        expansionFactor = 1 + Math.sin(time * 2) * 0.5;
        zDepth = 0.3;
        break;
    }
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Get current position
      let x = positionAttr.array[i3];
      let y = positionAttr.array[i3 + 1];
      let z = positionAttr.array[i3 + 2];
      
      // Add velocity with damping
      x += velocities[i3] * expansionFactor;
      y += velocities[i3 + 1] * expansionFactor;
      z += velocities[i3 + 2];
      
      // Calculate target position based on shape
      const angle = (i / particleCount) * Math.PI * 2 + time * rotationSpeed;
      const spiralOffset = Math.sin(time * 2 + i * 0.5) * 0.1;
      
      let targetX, targetY, targetZ;
      
      switch (cursorState) {
        case 'text':
          // Vertical line shape for text cursor
          targetX = 0;
          targetY = ((i / particleCount) - 0.5) * targetRadius * 2;
          targetZ = Math.sin(time * 3 + i) * 0.05;
          break;
        case 'drag':
          // Arrow/directional shape
          const arrowT = i / particleCount;
          targetX = Math.cos(angle) * targetRadius * (1 - arrowT * 0.5);
          targetY = Math.sin(angle) * targetRadius * (1 - arrowT * 0.5) + arrowT * 0.3;
          targetZ = Math.sin(time * 2 + i * 0.3) * zDepth;
          break;
        case 'resize':
          // Cross/expand shape
          const quadrant = Math.floor((i / particleCount) * 4);
          const localT = (i % (particleCount / 4)) / (particleCount / 4);
          const dirs = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
          targetX = dirs[quadrant][0] * localT * targetRadius;
          targetY = dirs[quadrant][1] * localT * targetRadius;
          targetZ = Math.sin(time * 2 + i * 0.2) * zDepth;
          break;
        case 'loading':
          // Pulsing orbit
          const orbitAngle = angle + Math.sin(time * 3) * 0.5;
          targetX = Math.cos(orbitAngle) * targetRadius;
          targetY = Math.sin(orbitAngle) * targetRadius;
          targetZ = Math.cos(time * 4 + i * 0.5) * zDepth;
          break;
        default:
          // Default spherical shape
          targetX = Math.cos(angle) * (targetRadius + spiralOffset);
          targetY = Math.sin(angle) * (targetRadius + spiralOffset);
          targetZ = Math.sin(time * 2 + i * 0.2) * zDepth;
      }
      
      // Smooth interpolation to target
      const lerpFactor = 0.08;
      x = THREE.MathUtils.lerp(x, targetX, lerpFactor);
      y = THREE.MathUtils.lerp(y, targetY, lerpFactor);
      z = THREE.MathUtils.lerp(z, targetZ, lerpFactor);
      
      positionAttr.array[i3] = x;
      positionAttr.array[i3 + 1] = y;
      positionAttr.array[i3 + 2] = z;
      
      // Animate sizes
      const baseSizeMultiplier = cursorState === 'hover' ? 1.5 : cursorState === 'drag' ? 2 : 1;
      sizeAttr.array[i] = sizes[i] * baseSizeMultiplier * (1 + Math.sin(time * 3 + i) * 0.3);
    }
    
    positionAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    
    // Update trail
    if (trailRef.current && trail.length > 0) {
      const trailPosAttr = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const trailSizeAttr = trailRef.current.geometry.attributes.size as THREE.BufferAttribute;
      const trailColorAttr = trailRef.current.geometry.attributes.color as THREE.BufferAttribute;
      
      for (let i = 0; i < trailGeometry.maxTrailPoints; i++) {
        const i3 = i * 3;
        if (i < trail.length) {
          const point = trail[i];
          // Convert screen coords to normalized
          const nx = (point.x / window.innerWidth) * 2 - 1;
          const ny = -(point.y / window.innerHeight) * 2 + 1;
          
          trailPosAttr.array[i3] = nx * 3;
          trailPosAttr.array[i3 + 1] = ny * 3;
          trailPosAttr.array[i3 + 2] = -0.1 - i * 0.02;
          
          const ageFactor = 1 - point.age;
          trailSizeAttr.array[i] = 4 * ageFactor;
          
          // Fade color based on age
          const mintColor = new THREE.Color().setHSL(160 / 360, 0.72, 0.46);
          trailColorAttr.array[i3] = mintColor.r * ageFactor;
          trailColorAttr.array[i3 + 1] = mintColor.g * ageFactor;
          trailColorAttr.array[i3 + 2] = mintColor.b * ageFactor;
        } else {
          trailSizeAttr.array[i] = 0;
        }
      }
      
      trailPosAttr.needsUpdate = true;
      trailSizeAttr.needsUpdate = true;
      trailColorAttr.needsUpdate = true;
    }
  });

  // Convert mouse position to 3D
  const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
  const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;

  return (
    <>
      {/* Main particle cluster */}
      <group position={[mouseX * 3, mouseY * 3, 0]}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              count={particleCount}
              array={sizes}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particleCount}
              array={colors}
              itemSize={3}
            />
          </bufferGeometry>
          <shaderMaterial
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexShader={`
              attribute float size;
              attribute vec3 color;
              varying vec3 vColor;
              varying float vAlpha;
              
              void main() {
                vColor = color;
                vAlpha = 0.8;
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
              }
            `}
            fragmentShader={`
              varying vec3 vColor;
              varying float vAlpha;
              
              void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                
                float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
                gl_FragColor = vec4(vColor, alpha);
              }
            `}
          />
        </points>
      </group>
      
      {/* Trail particles */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailGeometry.maxTrailPoints}
            array={trailGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={trailGeometry.maxTrailPoints}
            array={trailGeometry.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={trailGeometry.maxTrailPoints}
            array={trailGeometry.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vAlpha;
            
            void main() {
              vColor = color;
              vAlpha = 0.6;
              
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            varying float vAlpha;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
              gl_FragColor = vec4(vColor, alpha);
            }
          `}
        />
      </points>
    </>
  );
};

const ParticleCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const trailIntervalRef = useRef<number | null>(null);

  // Detect cursor state based on hovered element
  const detectCursorState = useCallback((target: EventTarget | null): CursorState => {
    if (isDragging) return 'drag';
    
    if (target instanceof HTMLElement) {
      const computedStyle = window.getComputedStyle(target);
      const cursorStyle = computedStyle.cursor;
      
      // Check for text selection
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return 'text';
      }
      
      // Check for text input elements
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        cursorStyle === 'text'
      ) {
        return 'text';
      }
      
      // Check for resize cursors
      if (
        cursorStyle.includes('resize') ||
        cursorStyle === 'ew-resize' ||
        cursorStyle === 'ns-resize' ||
        cursorStyle === 'nwse-resize' ||
        cursorStyle === 'nesw-resize'
      ) {
        return 'resize';
      }
      
      // Check for interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        cursorStyle === 'pointer' ||
        target.getAttribute('role') === 'button'
      ) {
        return 'hover';
      }
    }
    
    return 'default';
  }, [isDragging]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const newState = detectCursorState(e.target);
      setCursorState(newState);
    };

    const handleMouseDown = () => {
      setIsDragging(true);
      setCursorState('drag');
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        setCursorState('text');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [detectCursorState]);

  // Trail update
  useEffect(() => {
    const updateTrail = () => {
      const { x, y } = mousePosition;
      const last = lastPositionRef.current;
      
      // Only add point if moved significantly
      const distance = Math.sqrt(Math.pow(x - last.x, 2) + Math.pow(y - last.y, 2));
      
      if (distance > 5) {
        setTrail(prev => {
          const newTrail = [{ x, y, age: 0 }, ...prev.slice(0, 29)];
          return newTrail.map((point, i) => ({
            ...point,
            age: Math.min(1, point.age + 0.05 + i * 0.02)
          })).filter(p => p.age < 1);
        });
        lastPositionRef.current = { x, y };
      } else {
        // Age existing points
        setTrail(prev => 
          prev.map(point => ({
            ...point,
            age: Math.min(1, point.age + 0.03)
          })).filter(p => p.age < 1)
        );
      }
    };

    trailIntervalRef.current = window.setInterval(updateTrail, 16);
    
    return () => {
      if (trailIntervalRef.current) {
        clearInterval(trailIntervalRef.current);
      }
    };
  }, [mousePosition]);

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem 
          mousePosition={mousePosition} 
          cursorState={cursorState}
          trail={trail}
        />
      </Canvas>
    </div>
  );
};

export default ParticleCursor;
