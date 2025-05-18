/**
 * 타이머 설정 인터페이스
 */
interface TimerOptions {
  seconds: number;
  onChange: (seconds: number) => void;
}

/**
 * 타이머 시작 함수
 */
const startTimer = ({
  seconds,
  onChange,
}: TimerOptions) => {
  timer.isOn = true;
  timer.seconds = seconds;
  timer.onChange = onChange;

  timer.interval = setInterval(() => {
    if (timer.seconds === undefined) {
      return;
    }

    const newSeconds = timer.seconds + 1;
    timer.seconds = newSeconds;
    onChange(newSeconds);
  }, 1000);
};

/**
 * 타이머 재개 함수
 */
const resumeTimer = () => {
  timer.isOn = true;

  if (timer.seconds === undefined) return;
  if (timer.onChange === undefined) return;

  startTimer({
    seconds: timer.seconds,
    onChange: timer.onChange,
  });
};

/**
 * 타이머 중지 함수
 */
const stopTimer = () => {
  timer.isOn = false;
  clearInterval(timer.interval);
};

/**
 * 타이머 초기화 함수
 */
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

/**
 * 타이머 객체
 */
export const timer: {
  interval?: number;
  seconds?: number;
  isOn: boolean;
  onChange?: (seconds: number) => void;
  startTimer: ({ seconds, onChange }: TimerOptions) => void;
  resumeTimer: () => void;
  stopTimer: () => void;
} = generateDefaultTimer(); 