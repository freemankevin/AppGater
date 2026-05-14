// Animation delay generator
export const getStaggerDelay = (index: number, baseDelay: number = 50) => {
  return `${index * baseDelay}ms`;
};

// Animation class names
export const fadeInUp = {
  initial: 'opacity-0 translate-y-4',
  animate: 'opacity-100 translate-y-0',
};

// Custom hook for creating staggered animation effects
export const createStaggeredAnimation = (index: number, baseDelay: number = 100) => {
  return {
    animation: `fadeInUp 0.5s ease-out ${getStaggerDelay(index, baseDelay)} forwards`,
    opacity: '0',
  };
};