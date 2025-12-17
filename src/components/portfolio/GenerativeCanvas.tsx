import { useRef, useState, useEffect, useMemo } from 'react';

interface GenerativeCanvasProps {
  onComplete: () => void;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8;
    this.life = 1.0;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

const GenerativeCanvas = ({ onComplete }: GenerativeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const innovationSteps = useMemo(() => [
    "DISCOVER",
    "DEFINE",
    "STRATEGIZE",
    "IDEATE",
    "PROTOTYPE",
    "TEST",
    "LAUNCH"
  ], []);

  const config = {
    headColor: '#21cb98',
    tailColor: 'rgba(33, 203, 152, 0.6)',
    targetColor: '#FFFFFF',
    segmentDist: 25,
    speed: 0.12,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let snake = [{ x: mouse.x, y: mouse.y, text: "HANI" }];
    let target: { x: number; y: number; text: string; scale: number; active: boolean } | null = null;
    let particles: Particle[] = [];
    let frameCount = 0;
    let stepIndex = 0;

    const getRandomPos = () => ({
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * (canvas.height - 100) + 50
    });

    const spawnTarget = () => {
      if (stepIndex >= innovationSteps.length) {
        target = null;
        return;
      }
      const pos = getRandomPos();
      const word = innovationSteps[stepIndex];
      target = { ...pos, text: word, scale: 0, active: true };
    };

    const init = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      mouse = { x: canvas.width / 2, y: canvas.height / 2 };
      snake = [{ x: mouse.x, y: mouse.y, text: "HANI" }];
      stepIndex = 0;
      setCurrentStepIndex(0);
      setIsGameWon(false);
      spawnTarget();
    };

    const animate = () => {
      frameCount++;

      ctx.fillStyle = 'rgba(17, 17, 17, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const head = snake[0];
      head.x += (mouse.x - head.x) * config.speed;
      head.y += (mouse.y - head.y) * config.speed;

      for (let i = 1; i < snake.length; i++) {
        const curr = snake[i];
        const prev = snake[i - 1];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > config.segmentDist) {
          const angle = Math.atan2(dy, dx);
          curr.x = prev.x - Math.cos(angle) * config.segmentDist;
          curr.y = prev.y - Math.sin(angle) * config.segmentDist;
        }
      }

      if (target) {
        if (target.scale < 1) target.scale += 0.05;
        const floatY = Math.sin(frameCount * 0.05) * 5;

        ctx.save();
        ctx.translate(target.x, target.y + floatY);
        ctx.scale(target.scale, target.scale);

        ctx.font = "900 24px 'Anton', sans-serif";
        ctx.fillStyle = config.targetColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(target.text, 0, 0);

        ctx.beginPath();
        ctx.arc(0, 0, 40 + Math.sin(frameCount * 0.1) * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.stroke();

        ctx.restore();

        const distToHead = Math.hypot(head.x - target.x, head.y - target.y);
        if (distToHead < 40) {
          for (let k = 0; k < 15; k++) particles.push(new Particle(target.x, target.y, config.headColor));

          snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
            text: target.text
          });

          stepIndex++;
          setCurrentStepIndex(stepIndex);

          if (stepIndex >= innovationSteps.length) {
            target = null;
            setIsGameWon(true);
          } else {
            spawnTarget();
          }
        }
      }

      ctx.beginPath();
      ctx.moveTo(head.x, head.y);
      for (let i = 1; i < snake.length; i++) {
        ctx.lineTo(snake[i].x, snake[i].y);
      }
      ctx.strokeStyle = config.headColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = snake.length - 1; i >= 0; i--) {
        const segment = snake[i];
        const isHead = i === 0;

        ctx.save();
        ctx.translate(segment.x, segment.y);

        ctx.font = isHead ? "900 16px 'Anton', sans-serif" : "700 12px 'JetBrains Mono', monospace";
        const textWidth = ctx.measureText(segment.text).width;

        if (!isHead) {
          ctx.fillStyle = '#111';
          ctx.strokeStyle = '#21cb98';
          ctx.lineWidth = 1;
          ctx.strokeRect(-textWidth / 2 - 5, -15, textWidth + 10, 30);
          ctx.fillRect(-textWidth / 2 - 5, -15, textWidth + 10, 30);
        } else {
          ctx.fillStyle = '#21cb98';
          ctx.fillRect(-textWidth / 2 - 10, -20, textWidth + 20, 40);
        }

        ctx.fillStyle = isHead ? '#000' : '#21cb98';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(segment.text, 0, 0);

        ctx.restore();
      }

      particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(index, 1);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [innovationSteps]);

  return (
    <div ref={containerRef} className="w-full h-[70vh] bg-surface-dark relative overflow-hidden group cursor-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      <div className="absolute top-8 left-8 pointer-events-none z-20">
        <h3 className="text-primary font-mono text-xl font-bold">PROCESS: {currentStepIndex} / {innovationSteps.length}</h3>
        <div className="flex gap-1 mt-2">
          {innovationSteps.map((_, i) => (
            <div key={i} className={`h-1 w-8 ${i < currentStepIndex ? 'bg-primary' : 'bg-secondary'}`}></div>
          ))}
        </div>
        <p className="text-muted-foreground text-xs tracking-widest uppercase mt-4">
          {currentStepIndex === 0 ? "Collect the first step: DISCOVER" :
            currentStepIndex < innovationSteps.length ? "Next Step Unlocked" : "Process Complete"}
        </p>
      </div>

      {currentStepIndex === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[10vw] font-display text-surface-dark select-none leading-none opacity-50 animate-pulse" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>START</h2>
        </div>
      )}

      {isGameWon && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/40 backdrop-blur-sm transition-all duration-500">
          <div className="text-center">
            <h2 className="text-6xl font-display text-secondary-foreground mb-6 animate-bounce">READY?</h2>
            <button
              onClick={onComplete}
              className="bg-primary text-primary-foreground px-8 py-4 text-xl font-bold uppercase tracking-widest hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(33,203,152,0.6)] cursor-pointer pointer-events-auto"
            >
              Let's Start Your Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerativeCanvas;
