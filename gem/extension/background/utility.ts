import { Stage } from './constants';

export const log = (stage: Stage, message?: string) => {
  console.log(`[${stage}] ${message}`);
};
