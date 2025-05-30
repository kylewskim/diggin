import { StoreApi, UseBoundStore, create } from 'zustand';
import { withLenses } from '@dhmk/zustand-lens';
import { authenticationSlice } from './authenticationSlice';
import { immer } from 'zustand/middleware/immer';
import { appSlice } from './appSlice';

type RootState = {
  authentication: typeof authenticationSlice;
  app: typeof appSlice;
};

const store = create<RootState>()(
  immer(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    withLenses((set, get) => {
      return {
        authentication: authenticationSlice,
        app: appSlice,
      };
    })
  )
);

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useSlice = createSelectors(store);
