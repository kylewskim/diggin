/**
 * 세션 상태를 나타내는 열거형
 */
export enum DigginState {
  IDLE = 'IDLE',       // 세션이 활성화되어 있지 않음
  DIGGIN = 'DIGGIN',   // 세션이 활성화되어 데이터 수집 중
  PAUSED = 'PAUSED',   // 세션이 일시 중지됨
}

/**
 * Background Script와 Content Script 간 메시지 타입
 */
export enum B_TO_C {
  B_TO_C_ANIMATE = 'B_TO_C_ANIMATE',
  B_TO_C_COPY_SAVED = 'B_TO_C_COPY_SAVED',
}

/**
 * Content Script와 Background Script 간 메시지 타입
 */
export enum C_TO_B {
  C_TO_B_DATA = 'C_TO_B_DATA',
  C_TO_B_COPY_EVENT = 'C_TO_B_COPY_EVENT',
}

/**
 * Background Script와 Popup 간 메시지 타입
 */
export enum B_TO_P {
  B_TO_P_CHANGE_URL = 'B_TO_P_CHANGE_URL',
  B_TO_P_SESSION_INFORMATION_CHANGED = 'B_TO_P_SESSION_INFORMATION_CHANGED',
  B_TO_P_HERE_IS_USER_ID = 'B_TO_P_HERE_IS_USER_ID',
}

/**
 * Popup과 Background Script 간 메시지 타입
 */
export enum P_TO_B {
  P_TO_B_SIGN_IN_REQUEST = 'P_TO_B_SIGN_IN_REQUEST',
  P_TO_B_SIGN_OUT_REQUEST = 'P_TO_B_SIGN_OUT_REQUEST',
  P_TO_B_CHANGE_STATE = 'P_TO_B_CHANGE_STATE',
  P_TO_B_OPEN = 'P_TO_B_OPEN',
  P_TO_B_URL_CHANGED = 'P_TO_B_URL_CHANGED',
  P_TO_B_GIVE_ME_SESSION_INFORMATION = 'P_TO_B_GIVE_ME_SESSION_INFORMATION',
  P_TO_B_LOADED_USER = 'P_TO_B_LOADED_USER',
  P_TO_B_PAUSE_DIGGIN = 'P_TO_B_PAUSE_DIGGIN',
  P_TO_B_SELECTED_GEM = 'P_TO_B_SELECTED_GEM',
  P_TO_B_START_DIGGIN = 'P_TO_B_START_DIGGIN',
}

/**
 * 인사이트 타입 열거형
 */
export enum InsightType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

// 메시지 타입
export enum MessageType {
  GET_AUTH_STATUS = 'GET_AUTH_STATUS',
  RESTORE_AUTH = 'RESTORE_AUTH',
  GET_CLIPBOARD_DATA = 'GET_CLIPBOARD_DATA',
  START_SESSION = 'START_SESSION',
  PAUSE_SESSION = 'PAUSE_SESSION',
  RESUME_SESSION = 'RESUME_SESSION',
  STOP_SESSION = 'STOP_SESSION',
  SESSION_CONTINUE = 'SESSION_CONTINUE',
} 