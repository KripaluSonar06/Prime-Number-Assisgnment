// Animation Utilities
export const easingFunctions = {
  easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  bounce: (t) => t < 1 / 2.75 ? 7.5625 * t * t : 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
};

export const animateValue = (from, to, duration, callback) => {
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = from + (to - from) * progress;

    callback(currentValue);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

export default { easingFunctions, animateValue };