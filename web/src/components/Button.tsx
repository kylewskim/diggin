import React from 'react';
import { Button as SharedButton, ButtonProps } from '@shared/components/ui/button';

// 웹 프로젝트에서 공유 컴포넌트를 제대로 사용하기 위한 래퍼 컴포넌트
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    // 모든 props를 그대로 전달하면서 shared의 Button 컴포넌트 사용
    return <SharedButton {...props} ref={ref} />;
  }
);

Button.displayName = 'Button'; 