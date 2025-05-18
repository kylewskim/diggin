import { Gem } from 'core/src/firestore';
import { lens } from '@dhmk/zustand-lens';
import { SessionInformation } from 'core';

type State = {
  sessionInformation?: SessionInformation;
  gems: Gem[];
  change: (partial: Partial<State>) => void;
};

const slice = lens<State>((set) => {
  return {
    gems: [],
    change: (partial: Partial<State>) =>
      set((state) => {
        return {
          ...state,
          ...partial,
        };
      }),
  };
});

export { slice as appSlice };

export type { State as GemState };
