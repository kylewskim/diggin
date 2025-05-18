import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children: React.ReactNode;
  disableTopBorder?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const Container = ({
  //
  children,
  className,
  style,
  disableTopBorder = false,
  onClick,
}: Props) => {
  return (
    <div
      className={twMerge(
        clsx(
          //
          `h-[48px] flex items-center px-[12px]`,
          !disableTopBorder && 'border-gray-1.5 border-t',
          onClick && 'cursor-pointer',
          className
        )
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};
