import React from 'react';
import { SingleLineTextField, SingleLineTextFieldProps } from '../../../shared/src/components/ui/textField/singleLine';

// utils 경로 이슈를 해결하기 위한 래퍼 컴포넌트
export const TextField = React.forwardRef<HTMLInputElement, SingleLineTextFieldProps>(
  (props, ref) => {
    return <SingleLineTextField {...props} ref={ref} />;
  }
);

TextField.displayName = 'TextField'; 