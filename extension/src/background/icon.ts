/**
 * 아이콘 애니메이션 관리 변수
 */
let count = 0;
let rotateEventId: number | undefined = undefined;

/**
 * 아이콘 회전 애니메이션 시작
 */
const rotateIcon = () => {
  chrome.runtime.onInstalled.addListener(() => {
    rotateEventId = setInterval(() => {
      count++;
      chrome.action.setIcon({ path: `public/animated_icon/Animated_Icon_${count % 8}.png` });
    }, 250);
  });
};

/**
 * 아이콘 회전 애니메이션 중지
 */
const stopRotation = () => {
  clearInterval(rotateEventId);
  count = 0;
  chrome.action.setIcon({ path: 'public/icon-16.png' });
};

/**
 * 세션 아이콘 설정
 */
const setIcon = (shapeId?: string) => {
  const shapeIdToUse = !shapeId ? '1' : shapeId;
  chrome.action.setIcon({ path: `public/shapes/Shape_${shapeIdToUse}.png` });
};

/**
 * 아이콘 초기화
 */
const clearIcon = () => {
  chrome.action.setIcon({ path: 'public/icon-16.png' });
};

/**
 * 아이콘 관리자 객체
 */
export const iconManager = {
  setIcon,
  clearIcon,
  rotateIcon,
  stopRotation,
}; 