import { B_TO_P, P_TO_B } from '../constants';

export const send_P_to_B_message = ({
  //
  key,
  data,
}: {
  key: P_TO_B;
  data?: unknown;
}) => {
  console.log({
    key,
    data,
  });
  chrome.runtime.sendMessage({
    key,
    data,
  });
};

export const on_message_from_B = (
  //
  key: B_TO_P,
  callback: (data?: unknown) => void
) => {
  chrome.runtime.onMessage.addListener(
    ({
      key: _key,
      data,
    }: {
      //
      key: B_TO_P;
      data: unknown;
    }) => {
      console.log({
        key: _key,
        data,
      });

      if (key !== _key) return;

      callback(data);
    }
  );
};
