
import React, { useRef, useEffect } from 'react';

// --- Types ---
interface Vector {
  x: number;
  y: number;
}

// --- Classes ---

class TwinklingStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.2 + 0.2;
    this.alpha = Math.random();
    this.twinkleSpeed = Math.random() * 0.05 + 0.01;
    this.phase = Math.random() * Math.PI * 2;
  }

  update() {
    this.phase += this.twinkleSpeed;
    // Twinkle effect using sine wave for smooth transition
    this.alpha = (Math.sin(this.phase) + 1) / 2 * 0.8 + 0.2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // Pale gold / white for stars
    ctx.fillStyle = `rgba(255, 250, 230, ${this.alpha * 0.6})`;
    ctx.shadowBlur = 4 * this.alpha;
    ctx.shadowColor = "#FFF";
    ctx.fill();
    ctx.restore();
  }
}

class DustParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  growth: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedY = -(Math.random() * 0.8 + 0.2);
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.maxOpacity = Math.random() * 0.5 + 0.2;
    this.opacity = 0;
    this.growth = 0.01;
  }

  update(width: number, height: number) {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.opacity < this.maxOpacity) {
      this.opacity += this.growth;
    }

    if (this.y < -10) {
      this.y = height + 10;
      this.x = Math.random() * width;
      this.opacity = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
    ctx.fill();
  }
}

class FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  friction: number = 0.96;
  gravity: number = 0.06;
  alpha: number = 1;
  decay: number;
  color: string;
  size: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 6 + 2;
    this.vx = Math.cos(angle) * velocity;
    this.vy = Math.sin(angle) * velocity;
    this.decay = Math.random() * 0.015 + 0.005;
    this.color = color;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// --- Component ---

const CanvasScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<TwinklingStar[]>([]);
  const dustParticles = useRef<DustParticle[]>([]);
  const fireworkParticles = useRef<FireworkParticle[]>([]);
  const colors = ["#FFD700", "#DAA520", "#B8860B", "#F0E68C", "#FFFACD"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initScene();
    };

    const initScene = () => {
      // Initialize Stars
      stars.current = Array.from({ length: 80 }, () => new TwinklingStar(canvas.width, canvas.height));
      // Initialize Dust
      dustParticles.current = Array.from({ length: 120 }, () => new DustParticle(canvas.width, canvas.height));
    };

    const createFirework = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 60; i++) {
        fireworkParticles.current.push(new FireworkParticle(x, y, color));
      }
    };

    const handleClick = (e: MouseEvent) => {
      createFirework(e.clientX, e.clientY);
    };

    const animate = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars update/draw (drawn first, in the background)
      stars.current.forEach(s => {
        s.update();
        s.draw(ctx);
      });

      // Dust update/draw
      dustParticles.current.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      // Firework update/draw
      fireworkParticles.current = fireworkParticles.current.filter(p => p.alpha > 0);
      fireworkParticles.current.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full cursor-pointer bg-transparent"
    />
  );
};

export default CanvasScene;
