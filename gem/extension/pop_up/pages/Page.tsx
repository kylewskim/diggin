import { PropsWithClassName } from 'ui';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { addClassToChildren } from '../utils/vanilla/addClassToChildren';

export const DEFAULT_PAGE_HEIGHT = 384;

type Props = {
  loading?: boolean;
};

export const Page = ({ loading = false, children, className }: PropsWithClassName<React.PropsWithChildren<Props>>) => {
  return (
    <div className={twMerge(clsx('relative w-[320px] border border-gray-1.5 animate-fade-in', className))}>
      {addClassToChildren(children, 'inset-0')}
      {loading && <div className="black absolute top-0 left-0 right-0" />}
    </div>
  );
};

type HeaderProps = {
  disabledBottomBorder?: boolean;
};

Page.Header = ({
  children,
  className,
  disabledBottomBorder = false,
}: PropsWithClassName<React.PropsWithChildren<HeaderProps>>) => {
  return (
    <div
      className={twMerge(
        clsx(
          'h-[48px] gap-[4px] flex justify-between items-center px-[12px]  border-gray-1.5',
          className,
          !disabledBottomBorder && 'border-b'
        )
      )}
    >
      {children}
    </div>
  );
};
