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
          ? "border border-line-primary-light dark:border-line-primary-dark"
          : "border border-line-tertiary-light dark:border-line-tertiary-dark hover:border-line-secondary-light dark:hover:border-line-secondary-dark",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-[20px] w-[20px] items-center justify-center",
          selected
            ? "[&>svg]:text-icon-primary-light dark:[&>svg]:text-icon-primary-dark"
            : "[&>svg]:text-icon-secondary-light dark:[&>svg]:text-icon-secondary-dark group-hover:[&>svg]:text-icon-primary-light dark:group-hover:[&>svg]:text-icon-primary-dark",
        )}
      >
        {icon}
      </div>
    </div>
  );
});

IconSelector.displayName = "IconSelector";

export default IconSelector; 