import { InsightType } from 'core';

export type Message = {
  key: B_TO_C | B_TO_P | P_TO_B | C_TO_B;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

/* -------------------------------------------------------------------------- */
/*                               Content Script                               */
/* -------------------------------------------------------------------------- */

export enum B_TO_C {
  B_TO_C_CONTEXT_MENU_TEXT = 'B_TO_C_CONTEXT_MENU_TEXT',
  B_TO_C_CONTEXT_MENU_IMAGE = 'B_TO_C_CONTEXT_MENU_IMAGE',
  B_TO_C_ANIMATE = 'B_TO_C_ANIMATE',
}

export enum C_TO_B {
  C_TO_B_DATA = 'C_TO_B_DATA',
}

/* -------------------------------------------------------------------------- */
/*                                   Pop Up                                   */
/* -------------------------------------------------------------------------- */

export enum B_TO_P {
  B_TO_P_HERE_IS_USER_ID = 'B_TO_P_HERE_IS_USER_ID',
  B_TO_P_CHANGE_URL = 'B_TO_P_CHANGE_URL',
  B_TO_P_SESSION_INFORMATION_CHANGED = 'B_TO_P_SESSION_INFORMATION_CHANGED',
}

export enum P_TO_B {
  P_TO_B_OPEN = 'P_TO_B_OPEN',
  P_TO_B_SIGN_IN_REQUEST = 'P_TO_B_SIGN_IN_REQUEST',
  P_TO_B_SIGN_OUT_REQUEST = 'P_TO_B_SIGN_OUT_REQUEST',
  P_TO_B_SELECTED_GEM = 'P_TO_B_SELECTED_GEM',
  P_TO_B_GIVE_ME_SESSION_INFORMATION = 'P_TO_B_GIVE_ME_SESSION_INFORMATION',

  P_TO_B_URL_CHANGED = 'P_TO_B_URL_CHANGED',
  P_TO_B_LOADED_USER = 'P_TO_B_LOADED_USER',

  P_TO_B_START_DIGGIN = 'P_TO_B_START_DIGGIN',
  P_TO_B_STOP_DIGGIN = 'P_TO_B_STOP_DIGGIN',
  P_TO_B_PAUSE_DIGGIN = 'P_TO_B_PAUSE_DIGGIN',
  P_TO_B_RESUME_DIGGIN = 'P_TO_B_RESUME_DIGGIN',
}

export type C_TO_B_DATA = {
  type: InsightType;
  value: string;
  url: string;
  highlight: boolean;
};
