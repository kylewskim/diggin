/**
 * 애니메이션 옵션 타입
 */
interface AnimationOptions {
  color: string;
  numInsights: number;
}

/**
 * 수집 시 애니메이션 효과를 보여주는 함수
 */
export const animate = ({ color, numInsights }: AnimationOptions): void => {
  console.log('Animation triggered with color:', color, 'insights:', numInsights);

  // 컨테이너 생성
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.zIndex = '9999';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  
  // 알림 버블 생성
  const bubble = document.createElement('div');
  bubble.style.backgroundColor = color || '#4CAF50';
  bubble.style.color = 'white';
  bubble.style.padding = '10px 20px';
  bubble.style.borderRadius = '20px';
  bubble.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  bubble.style.opacity = '0';
  bubble.style.transform = 'scale(0.8)';
  bubble.style.transition = 'all 0.3s ease-in-out';
  bubble.textContent = `Collected (${numInsights})`;
  
  // 파티클 생성 함수
  const createParticles = () => {
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color || '#4CAF50';
      particle.style.opacity = '0.7';
      
      // 랜덤 위치 설정
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      // 애니메이션 설정
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = `translate(-50%, -50%)`;
      
      // 파티클 컨테이너에 추가
      container.appendChild(particle);
      
      // 애니메이션 시작
      setTimeout(() => {
        particle.style.transition = `all 0.8s ease-out`;
        particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        particle.style.opacity = '0';
      }, 10);
      
      // 파티클 제거
      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  };
  
  // DOM에 추가
  container.appendChild(bubble);
  document.body.appendChild(container);
  
  // 애니메이션 시작
  setTimeout(() => {
    bubble.style.opacity = '1';
    bubble.style.transform = 'scale(1)';
    createParticles();
  }, 10);
  
  // 애니메이션 종료 및 요소 제거
  setTimeout(() => {
    bubble.style.opacity = '0';
    bubble.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      container.remove();
    }, 300);
  }, 2000);
}; 