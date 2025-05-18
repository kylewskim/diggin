import { InsightType, B_TO_C, B_TO_P, C_TO_B, P_TO_B, DigginState } from './enums';

/**
 * 메시지 인터페이스
 */
export interface Message {
  key: B_TO_P | P_TO_B | B_TO_C | C_TO_B;
  data?: any;
}

/**
 * 세션 정보 인터페이스
 */
export interface SessionInformation {
  userId: string;
  state: DigginState;
  elapsedTimeInSeconds: number;
  numInsights?: number;
  sessionId?: string;
  holeId?: string;
  holeName?: string;
  shapeId?: string; // 아이콘 ID
  lastUpdated?: number;
  createdAt?: number;
  textEntries?: Record<string, TextEntry>; // Realtime DB에서의 텍스트 엔트리 구조
}

/**
 * Content Script에서 Background Script로 보내는 데이터 타입
 */
export interface C_TO_B_DATA {
  type: InsightType;
  value: string;
  url: string;
  title?: string;
  timestamp?: string;
  highlight: boolean;
}

/**
 * Gem 인터페이스
 */
export interface Gem {
  id?: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt?: string;
  elapsedTimeInSeconds: number;
  shapeId: string;
  userId: string;
}

/**
 * Insight 인터페이스
 */
export interface Insight {
  id?: string;
  gemId: string;
  type: InsightType;
  value: string;
  url: string;
  highlight: boolean;
  createdAt: string;
}

/**
 * 컬렉션 이름
 */
export enum CollectionName {
  User = 'users',
  Gem = 'gems',
  Insight = 'insights',
  Session = 'sessions',
}

/**
 * URL 관련 인터페이스
 */
export interface URLInfo {
  location: string;
}

/**
 * 텍스트 엔트리 인터페이스 - 클립보드에서 수집된 텍스트
 */
export interface TextEntry {
  id: string;
  userId: string;
  holeId: string;
  sessionId: string;
  content: string;
  sourceUrl: string;
  sourceTitle?: string;
  createdAt: number;
  sessionTime?: number; // 세션 내 시간 (초)
  isBookmarked?: boolean;
}

/**
 * Hole (프로젝트) 인터페이스
 */
export interface Hole {
  id: string;
  userId: string;
  name: string;
  icon?: string;
  createdAt: number;
  updatedAt?: number;
}

/**
 * 세션 상태 인터페이스 (로컬 스토리지용)
 */
export interface SessionState {
  userId: string;
  sessionId: string;
  holeId?: string;
  isActive: boolean;
  startTime?: number | null;
  savedDuration: number;
  lastUpdated: number;
  numInsights?: number;
} 