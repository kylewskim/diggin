import { C_TO_B } from '../constants';

export const send_C_to_B_message = ({
  //
  key,
  data,
}: {
  key: C_TO_B;
  data?: unknown;
}) => {
  chrome.runtime.sendMessage({
    key,
    data,
  });
};
