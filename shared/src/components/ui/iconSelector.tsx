import React, { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface IconSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  selected?: boolean;
  className?: string;
}

export const IconSelector = React.forwardRef<
  HTMLDivElement,
  IconSelectorProps
>(({ icon, selected = false, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[8px] transition-all",
        selected
          ? "bg-transparent border-line-primary-light dark:border-line-primary-dark border"
          : "bg-transparent border-line-tertiary-light dark:border-line-tertiary-dark border",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-[20px] w-[20px] items-center justify-center",
          selected
            ? "[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark"
            : "[&_svg]:text-icon-secondary-light [&_svg]:text-icon-secondary-light dark:[&_svg]:text-icon-secondary-dark dark:[&_svg]:text-icon-secondary-dark group-hover:[&_svg]:text-icon-primary-light dark:group-hover:[&_svg]:text-icon-primary-dark",
        )}
      >
        {icon}
      </div>
    </div>
  );
});

IconSelector.displayName = 'IconSelector';

export default IconSelector; 