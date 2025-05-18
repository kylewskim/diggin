const startTimer = ({
  //
  seconds,
  onChange,
}: {
  seconds: number;
  onChange: (s: number) => void;
}) => {
  timer.isOn = true;

  timer.seconds = seconds;
  timer.onChange = onChange;

  timer.interval = setInterval(() => {
    if (timer?.seconds === undefined) {
      return;
    }

    const newSeconds = timer.seconds + 1;
    timer.seconds = newSeconds;
    onChange(newSeconds);
  }, 1000);
};

const resumeTimer = () => {
  timer.isOn = true;

  if (timer.seconds === undefined) return;
  if (timer.onChange === undefined) return;

  startTimer({
    seconds: timer.seconds,
    onChange: timer.onChange,
  });
};

const stopTimer = () => {
  timer.isOn = false;

  clearInterval(timer.interval);
};

const generateDefaultTimer = () => {
  return {
    interval: undefined,
    seconds: undefined,
    isOn: false,
    onChange: undefined,
    startTimer,
    resumeTimer,
    stopTimer,
  };
};

export const timer: {
  interval?: number;
  seconds?: number;
  isOn: boolean;
  onChange?: (seconds: number) => void;
  startTimer: ({ seconds, onChange }: { seconds: number; onChange: (seconds: number) => void }) => void;
  resumeTimer?: () => void;
  stopTimer: () => void;
} = generateDefaultTimer();
