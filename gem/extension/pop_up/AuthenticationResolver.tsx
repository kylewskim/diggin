import { useEffect } from 'react';
import { useSlice } from './store/store';
import { B_TO_P, P_TO_B } from '../constants';
import { firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CollectionName, userConverter } from 'core';
import { on_message_from_B, send_P_to_B_message } from './messaging_integration';

/**
 * userid -> user
 */
export const AuthenticationResolver = ({ children }: React.PropsWithChildren<object>) => {
  const { uid, change } = useSlice.use.authentication();

  useEffect(() => {
    on_message_from_B(B_TO_P.B_TO_P_HERE_IS_USER_ID, (data) => {
      const typedData = data as {
        userId: string;
      };

      change({ uid: typedData.userId });
    });
  }, []);

  useEffect(() => {
    if (!uid || uid === '') {
      return;
    }

    const userRef = doc(
      //
      firestore,
      CollectionName.User,
      uid
    ).withConverter(userConverter);

    getDoc(userRef).then((data) => {
      change({
        user: data.data(),
      });

      send_P_to_B_message({
        key: P_TO_B.P_TO_B_LOADED_USER,
      });
    });
  }, [uid]);

  return children;
};
