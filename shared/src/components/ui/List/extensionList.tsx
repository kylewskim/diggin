import React, { forwardRef } from 'react';
import { cn } from '../../../utils';
import * as Icons from '../../../icons';
import { Button } from '../button';

export type ListType = 'default' | 'add' | 'manage';
export type ListState = 'default' | 'hover' | 'selected' | 'active';

export interface ListProps {
  type?: ListType;
  state?: ListState;
  label: string;
  count?: number;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  value?: string;
  className?: string;
}

export const ExtensionList = forwardRef<HTMLDivElement, ListProps>(
  ({ 
    type = 'default', 
    state = 'default', 
    label, 
    count = 0, 
    placeholder = 'Write a new session name',
    onSubmit,
    onCancel,
    onChange,
    onClick,
    value = '',
    className 
  }, ref) => {
    
    // Default 타입 렌더링
    if (type === 'default') {
      return (
        <div 
          ref={ref}
          className={cn(
            'w-full h-12 min-w-[240px] px-3 rounded-lg flex justify-between items-center transition-colors',
            state === 'hover' 
              ? 'bg-fill-hover-secondary-light dark:bg-fill-hover-secondary-dark cursor-pointer' 
              : state === 'selected' 
                ? 'bg-fill-selected-secondary-light dark:bg-fill-selected-secondary-dark cursor-pointer' 
                : 'bg-fill-secondary-light dark:bg-fill-secondary-dark hover:bg-fill-hover-secondary-light dark:hover:bg-fill-hover-secondary-dark cursor-pointer',
            className
          )}
          onClick={onClick}
        >
          <div className="flex justify-start items-start gap-2">
            <div className="text-body-md-md text-text-primary-light dark:text-text-primary-dark leading-none">
              {label}
            </div>
            <div className="text-body-md-md text-text-tertiary-light dark:text-text-tertiary-dark leading-none">
              {count}
            </div>
          </div>
        </div>
      );
    }

    // Add 타입 렌더링
    if (type === 'add') {
      const isActive = state === 'active' || value?.length > 0;
      
      return (
        <div 
          ref={ref}
          className={cn(
            'w-full h-12 min-w-[240px] px-3 rounded-lg flex justify-between items-center gap-2',
            'bg-fill-onsurface-light dark:bg-fill-onsurface-dark',
            className
          )}
        >
          <div className="flex justify-start items-center flex-1">
            <input
              type="text"
              className="bg-transparent text-body-md-md w-full outline-none text-text-primary-light dark:text-text-primary-dark placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-start items-center gap-1">
            <Button
              variant="tertiary"
              size="sm"
              isIconOnly
              disabled={!value}
              onClick={() => value && onSubmit?.(value)}
              leftIcon={<Icons.CheckIcon />}
            />
            <Button
              variant="tertiary"
              size="sm"
              isIconOnly
              disabled={false}
              onClick={onCancel}
              leftIcon={<Icons.CloseIcon />}
            />
          </div>
        </div>
      );
    }

    // Manage 타입 렌더링
    if (type === 'manage') {
      return (
        <div 
          ref={ref}
          className={cn(
            'w-full h-12 min-w-[240px] pl-3 pr-2.5 rounded-lg flex justify-start items-center gap-4 transition-colors',
            state === 'hover' 
              ? 'bg-fill-hover-secondary-light dark:bg-fill-hover-secondary-dark cursor-pointer' 
              : state === 'selected' 
                ? 'bg-fill-selected-secondary-light dark:bg-fill-selected-secondary-dark cursor-pointer' 
                : 'bg-fill-secondary-light dark:bg-fill-secondary-dark hover:bg-fill-hover-secondary-light dark:hover:bg-fill-hover-secondary-dark cursor-pointer',
            className
          )}
          onClick={onClick}
        >
          <div className="flex justify-start items-center gap-4">
            <Icons.ReorderIcon className="w-4 h-4 text-icon-secondary-light dark:text-icon-secondary-dark" />
            <div className="text-body-md-md text-text-primary-light dark:text-text-primary-dark leading-none">
              {label}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
);

ExtensionList.displayName = 'ExtensionList';

export default ExtensionList; 
 
 
 
 
 