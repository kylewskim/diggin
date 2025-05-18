import { CollectionName, SessionInformation } from 'core';
import { useEffect, PropsWithChildren } from 'react';
import { useSlice } from './store/store';
import { useUserCollectionOnce } from './hooks/useUserCollection';
import { B_TO_P, P_TO_B } from '../constants';
import { on_message_from_B, send_P_to_B_message } from './messaging_integration';

/**
 * realtime DB 연동 부부
 *
 * - timer 정보를 여기서 관리한다.
 * - 다른 곳들에서는 state 를 변경, 여기서는 그것에 대한 반영을 하고, 다른 곳들에서는 read 만 하도록 하기 위함
 * @returns
 */
export const SessionResolver = ({ children }: PropsWithChildren<unknown>) => {
  const { sessionInformation, change } = useSlice.use.app();

  const [remoteGems, , , reloadRemoteGems] = useUserCollectionOnce({ collectionName: CollectionName.Gem });

  useEffect(() => {
    on_message_from_B(B_TO_P.B_TO_P_SESSION_INFORMATION_CHANGED, (data) => {
      const typedData = data as SessionInformation;

      change({
        sessionInformation: typedData,
      });
    });

    send_P_to_B_message({
      key: P_TO_B.P_TO_B_GIVE_ME_SESSION_INFORMATION,
    });
  }, []);

  useEffect(() => {
    if (!remoteGems) return;

    change({ gems: remoteGems.sort((a, b) => a.title.localeCompare(b.title)) });
  }, [remoteGems]);

  useEffect(() => {
    reloadRemoteGems?.();
  }, [sessionInformation?.selectedGemId]);

  return children;
};
