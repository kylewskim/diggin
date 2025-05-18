import { animate } from './diggin_animation';
import { send_C_to_B_message } from './messaging_integration';

type MessageFromBackgroundScript = {
  type: B_TO_C;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

enum C_TO_B {
  C_TO_B_DATA = 'C_TO_B_DATA',
}

enum B_TO_C {
  B_TO_C_CONTEXT_MENU_TEXT = 'B_TO_C_CONTEXT_MENU_TEXT',
  B_TO_C_CONTEXT_MENU_IMAGE = 'B_TO_C_CONTEXT_MENU_IMAGE',
  B_TO_C_ANIMATE = 'B_TO_C_ANIMATE',
}

type C_TO_B_DATA = {
  type: InsightType;
  value: string;
  url: string;
  highlight: boolean;
};

enum InsightType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

const sendToServiceWorker = ({ type, value }: { type: InsightType; value: string }) => {
  console.table({
    type,
    value,
  });

  send_C_to_B_message({
    key: C_TO_B.C_TO_B_DATA,
    data: {
      type,
      value,
      url: window.location.href,
      highlight: false,
    } as C_TO_B_DATA,
  });
};

document.addEventListener('copy', () => {
  const copiedText = window.getSelection()?.toString();

  if (!copiedText) return;

  sendToServiceWorker({
    type: InsightType.TEXT,
    value: copiedText,
  });
});

chrome.runtime.onMessage.addListener(async (message: MessageFromBackgroundScript) => {
  console.log('message from background script', message);

  switch (message.type) {
    case B_TO_C.B_TO_C_ANIMATE: {
      const { color, numInsights } = message.data;

      animate({ color, numInsights });

      break;
    }
  }
});
