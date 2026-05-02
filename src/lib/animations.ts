// 动画延迟生成器
export const getStaggerDelay = (index: number, baseDelay: number = 50) => {
  return `${index * baseDelay}ms`;
};

// 动画类名
export const fadeInUp = {
  initial: 'opacity-0 translate-y-4',
  animate: 'opacity-100 translate-y-0',
};

// 创造交错动画效果的自定义hook
export const createStaggeredAnimation = (index: number, baseDelay: number = 100) => {
  return {
    animation: `fadeInUp 0.5s ease-out ${getStaggerDelay(index, baseDelay)} forwards`,
    opacity: '0',
  };
};