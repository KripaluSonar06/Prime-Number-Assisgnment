// Particle System Utilities
export class MathParticleGenerator {
  constructor() {
    this.equations = ['π', '∑', '∞', 'φ', '∆', '∫', '√', 'α', 'β', 'γ'];
    this.primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  }

  getRandomEquation() {
    return this.equations[Math.floor(Math.random() * this.equations.length)];
  }

  createParticleField(canvas, particleCount = 80) {
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 1 + 0.5,
        size: Math.random() * 3 + 1,
        type: Math.random() > 0.7 ? 'equation' : 'dot',
        content: this.getRandomEquation(),
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    return particles;
  }
}

export default MathParticleGenerator;