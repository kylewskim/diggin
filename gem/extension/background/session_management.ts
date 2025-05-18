import { ref, onValue, update, set } from 'firebase/database';
import { auth, database } from './firebase_instances';
import { DigginState, SessionInformation } from 'core';
import { iconManager } from './icon';
import { timer } from './timer';
import { B_TO_P } from '../constants';
import { urls } from '../pop_up/utils/constants/url';
import { send_B_to_P_message } from './messaging_integration';

/**
 * user id 가 바뀔 수 있기는 한데
 */

export const session: {
  data?: SessionInformation;
  location?: string;
} = {};

// 완전 처음상태
export const startSession = async (uid: string) => {
  console.log('starting session');

  const nodeRef = ref(database, uid);

  onValue(nodeRef, async (snapshot) => {
    if (snapshot.exists() === false) {
      console.log('snapshot does not exist');

      set(nodeRef, {
        state: DigginState.IDLE,
      } as SessionInformation);

      return;
    }

    /* -------------------------------------------------------------------------- */
    /*                         session information exists                         */
    /* -------------------------------------------------------------------------- */

    const newSessionData = snapshot.val() as unknown as SessionInformation;

    console.log('[BackgroundScript]', 'snapshot changed. changed snapshot follows');
    console.log(newSessionData);

    /* -------------------------------------------------------------------------- */
    /*                                 validation                                 */
    /* -------------------------------------------------------------------------- */

    switch (newSessionData.state) {
      case DigginState.IDLE:
      case DigginState.DIGGIN: {
        {
          session.location = urls.home;

          send_B_to_P_message({
            key: B_TO_P.B_TO_P_CHANGE_URL,
            data: {
              location: session.location,
            },
          });

          break;
        }
      }
      default: {
        break;
      }
    }

    session.data = newSessionData;

    processByState();

    /* -------------------------------------------------------------------------- */
    /*                               notify to popup                              */
    /* -------------------------------------------------------------------------- */

    syncBackgroundSessionInformationToPopUp();
  });
};

const syncBackgroundSessionInformationToPopUp = async () => {
  if (!session.data) {
    console.error('no session data to process failed to sync to Popup');

    return;
  }
  await send_B_to_P_message({
    key: B_TO_P.B_TO_P_SESSION_INFORMATION_CHANGED,
    data: session.data,
  });
};

const processByState = () => {
  if (!session.data) {
    console.error('no session data to process');

    return;
  }

  if (auth.currentUser === null) {
    console.error('no user');

    return;
  }

  const { uid } = auth.currentUser;

  const { state, elapsedTimeInSeconds } = session.data;

  switch (state) {
    case DigginState.DIGGIN: {
      iconManager.setIcon(session.data?.shapeId);

      if (timer.isOn) {
        timer.seconds = session.data.elapsedTimeInSeconds;

        break;
      }

      timer.startTimer({
        seconds: elapsedTimeInSeconds,
        onChange: (seconds) => {
          const nodeRef = ref(database, uid);

          update(nodeRef, {
            elapsedTimeInSeconds: seconds,
          });
        },
      });
      break;
    }
    case DigginState.PAUSED: {
      iconManager.clearIcon();
      timer.stopTimer();

      break;
    }
    case DigginState.IDLE: {
      iconManager.clearIcon();
      break;
    }
  }
};
