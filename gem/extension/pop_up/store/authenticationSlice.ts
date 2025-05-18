import { lens } from '@dhmk/zustand-lens';
import { User } from 'core';

type State = {
  uid?: string;
  user: User;
  change: (partial: Partial<State>) => void;
};

const slice = lens<State>((set) => {
  return {
    user: {
      email: '',
      id: '',
      nickname: '',
      photoURL: '',
    },
    change: (partial: Partial<State>) =>
      set((state) => {
        return {
          ...state,
          ...partial,
        };
      }),
  };
});

export { slice as authenticationSlice };
export type { State as AuthenticationState };
