import {
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  cloneElement,
} from 'react';

export const addClassToChildren = (
  children: ReactNode,
  className: string
): ReactNode => {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      const childElement = child as ReactElement;
      return cloneElement(childElement, {
        className: `${childElement.props.className || ''} ${className}`,
        children: addClassToChildren(childElement.props.children, className),
      });
    }
    return child;
  });
};
