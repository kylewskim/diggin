import { B_TO_P } from '../constants';

let ports: chrome.runtime.Port[] = [];

chrome.runtime.onConnect.addListener((port) => {
  ports.push(port);

  port.onDisconnect.addListener(() => {
    ports = ports.filter((p) => p !== port);
  });
});

export const send_B_to_P_message = ({
  //
  key,
  data,
}: {
  key: B_TO_P;
  data?: unknown;
}) => {
  ports.forEach((port) => {
    port.postMessage({
      key,
      data,
    });
  });
};
