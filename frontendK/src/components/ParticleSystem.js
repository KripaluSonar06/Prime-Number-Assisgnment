import React, { useEffect, useRef } from 'react';

const ParticleSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles = [];
    const particleCount = 100;
    const equations = ['2', '3', '5', '7', '11', '13', '17', '19', '23', '29', '31', '37', '41', '43', '47'];

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = Math.random() * 1 + 0.5;
        this.size = Math.random() * 7;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = Math.random() > 0.7 ? 'equation' : 'dot';
        this.equation = equations[Math.floor(Math.random() * equations.length)];
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.02;

        // Reset particle when it goes off screen
        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }

        // Subtle floating effect
        this.x += Math.sin(this.pulsePhase) * 0.1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (0.8 + Math.sin(this.pulsePhase) * 0.2);

        if (this.type === 'equation') {
          ctx.fillStyle = '#64B5F6';
          ctx.font = `${this.size * 6}px 'Times New Roman', serif`;
          ctx.textAlign = 'center';
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.fillText(this.equation, 0, 0);
        } else {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          gradient.addColorStop(0, '#64B5F6');
          gradient.addColorStop(0.5, '#42A5F5');
          gradient.addColorStop(1, 'rgba(66, 165, 245, 0)');

          ctx.fillStyle = gradient;
          ctx.translate(this.x, this.y);
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;

    function animate() {
      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.5, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(100, 181, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.globalAlpha = (150 - distance) / 150 * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleSystem;