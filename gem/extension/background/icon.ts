let count = 0;

let rotateEventId: number | undefined = undefined;

const rotateIcon = () => {
  chrome.runtime.onInstalled.addListener(() => {
    rotateEventId = setInterval(() => {
      count++;

      chrome.action.setIcon({ path: `animated_icon/Animated_Icon_${count % 8}.png` });
    }, 250);
  });
};

const stopRotation = () => {
  clearInterval(rotateEventId);

  count = 0;

  chrome.action.setIcon({ path: 'icons/16.png' });
};

const setIcon = (shapeId?: number) => {
  const shapeIdToUse = !shapeId ? 0 : shapeId < 1 || shapeId > 6 ? 0 : shapeId;

  chrome.action.setIcon({ path: `gems/Shape_${shapeIdToUse}.png` });
};

const clearIcon = () => {
  chrome.action.setIcon({ path: 'icons/16.png' });
};

export const iconManager = {
  setIcon,
  clearIcon,
  rotateIcon,
  stopRotation,
};
