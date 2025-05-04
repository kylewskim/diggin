import React from 'react';
import { cn } from '../../utils';
import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export interface DBListProps {
  icon: React.ComponentType<IconProps>;
  name: string;
  insightCount?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const DBList = React.forwardRef<HTMLDivElement, DBListProps>(
  ({ icon: Icon, name, insightCount = 0, selected = false, onClick, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between px-3 w-[304px] h-12 cursor-pointer transition-colors rounded-[8px]',
          'bg-fill-secondary-light dark:bg-fill-secondary-dark hover:bg-fill-hover-secondary-light dark:hover:bg-fill-hover-secondary-dark',
          selected ? 'bg-fill-selected-secondary-light dark:bg-fill-selected-secondary-dark' : 'bg-fill-secondary-light dark:bg-fill-secondary-dark',
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-start gap-3">
        <div
            className={cn(
            "flex h-[20px] w-[20px] items-center justify-center",
            "[&>svg]:text-icon-primary-light dark:[&>svg]:text-icon-primary-dark"
            )}
            >
            <Icon />
        </div>
        <div className="flex items-start gap-2">
        <span className="text-body-md-md text-text-primary-light dark:text-text-primary-dark">{name}</span>
        <span className="text-body-md-md text-text-tertiary-light dark:text-text-tertiary-dark">{insightCount}</span>
        </div>
        </div>
      </div>
    );
  }
);

DBList.displayName = "DBList";

export default DBList; 
 
 
 
 