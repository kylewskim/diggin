import { useEffect, useRef, useState } from 'react';

type Event = (seconds: number) => void;

type State = {
  seconds: number;
  isRunning: boolean;
};

/**
 * @field seconds
 *
 * @method startTimer - 모든 세팅은 여기서
 * @method pauseTimer
 * @method resumeTimer
 * @method finishTimer - clean up 알아서
 */
export const useTimer = () => {
  const [state, setState] = useState<State>({
    seconds: 0,
    isRunning: false,
  });

  const intervalRef = useRef<number>(1);
  const onChangeRef = useRef<Event>((seconds: number) => console.log('Change', seconds));
  const onPauseRef = useRef<Event>((seconds: number) => console.log('Pause', seconds));
  const onFinishRef = useRef<Event>((seconds: number) => console.log('Finish', seconds));

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        const seconds = state.seconds + 1;

        setState((s) => {
          if (onChangeRef.current) {
            onChangeRef.current(seconds);
          }

          return {
            ...s,
            seconds,
          };
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [state]);

  const startTimer = ({
    //
    seconds,
    onChange,
    onPause,
    onFinish,
  }: {
    seconds: number;
    onChange: (seconds: number) => void;
    onPause: (seconds: number) => void;
    onFinish: (seconds: number) => void;
  }) => {
    onChangeRef.current = onChange;
    onPauseRef.current = onPause;
    onFinishRef.current = onFinish;

    setState({
      seconds,
      isRunning: true,
    });
  };

  const pauseTimer = () => {
    const seconds = state.seconds;

    onPauseRef.current(seconds);

    setState((s) => {
      return {
        ...s,
        isRunning: false,
      };
    });
  };

  const resumeTimer = () => {
    setState((s) => ({
      ...s,
      isRunning: true,
    }));
  };

  const finishTimer = () => {
    const seconds = state.seconds;

    onFinishRef.current(seconds);

    setState((s) => {
      return {
        ...s,
        isRunning: false,
      };
    });
  };

  return {
    //
    seconds: state.seconds,
    startTimer,
    pauseTimer,
    resumeTimer,
    finishTimer,
  };
};
