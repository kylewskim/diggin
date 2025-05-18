import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from 'ui';

type Props = {
  onClick: () => void;
};

export const ShuffleButton = ({ onClick }: Props) => {
  const [animating, setAnimating] = useState(0);

  const diceRef = useRef<SVGSVGElement>(null);

  const handleClick = () => {
    setAnimating((prev) => prev + 1);

    onClick();
  };

  useLayoutEffect(() => {
    if (animating) {
      if (diceRef.current) {
        diceRef.current.classList.remove('animate-roll-dice');
        void diceRef.current.getBBox();
        diceRef.current.classList.add('animate-roll-dice');
      }

      const interval = setInterval(() => {
        setAnimating(0);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [animating]);

  return (
    <div
      className="flex group space-x-[4px] p-[6px] gap-[4px] rounded-[4px] bg-gray-0.5 items-center cursor-pointer hover:bg-gray-1 pr-[12px]"
      onClick={handleClick}
    >
      <Icon
        ref={diceRef}
        iconName="Dice"
        className={clsx(animating ? 'animate-roll-dice' : 'group-hover:animate-tilt-dice animate-untilt-dice')}
      />
      <span className="text-gray-7"> Shuffle</span>
    </div>
  );
};
