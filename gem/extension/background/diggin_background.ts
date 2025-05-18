/* eslint-disable @typescript-eslint/no-unused-vars */
import { CollectionName, DigginState, Gem, Insight, addDocument, gemConverter, insightConverter } from 'core';
import { B_TO_C, B_TO_P, C_TO_B, C_TO_B_DATA, Message, P_TO_B } from '../constants';
import { auth, database, firestore, signInWithOffscreenPopUp } from './firebase_instances';
import { signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { ref, get, update, set } from 'firebase/database';
import { urls } from '../pop_up/utils/constants/url';
import { session, startSession } from './session_management';
import { send_B_to_P_message } from './messaging_integration';

/* -------------------------------------------------------------------------- */
/*                                    0. 인증                                   */
/* -------------------------------------------------------------------------- */

chrome.runtime.onMessage.addListener(async (message: Message, sender, sendResponse) => {
  if (message.key !== P_TO_B.P_TO_B_SIGN_IN_REQUEST) return;

  console.table({
    message,
    sender,
    sendResponse,
  });

  await signInWithOffscreenPopUp();
});

chrome.runtime.onMessage.addListener(async (message: Message, sender, sendResponse) => {
  if (message.key !== P_TO_B.P_TO_B_SIGN_OUT_REQUEST) return;

  console.table({
    message,
    sender,
    sendResponse,
  });

  signOut(auth);
});

/**
 * 1. 텍스트 수집
 */

chrome.runtime.onMessage.addListener(async (message: Message, sender) => {
  if (message.key !== C_TO_B.C_TO_B_DATA) return;

  if (session.data?.state !== DigginState.DIGGIN) {
    console.warn('Not in diggin state');

    return;
  }

  console.log('Content -> Background', message);

  if (!auth.currentUser) {
    console.error('No user');

    return;
  }

  if (!session.data) {
    console.error('No session data');

    return;
  }

  const tellToContentScript = async ({ numInsights, color }: { numInsights: number; color: string }) => {
    console.log('telling to content script', 'numInsights', numInsights, 'color', color);

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab?.id) {
      chrome.tabs.sendMessage(tab?.id, {
        type: B_TO_C.B_TO_C_ANIMATE,
        data: {
          numInsights,
          color,
        },
      });
    }
  };

  if (!sender.tab?.id) {
    console.error('No tab id');

    return;
  }

  if (!auth.currentUser) return;

  const { uid } = auth.currentUser;

  const nodeRef = ref(database, uid);

  const {
    //
    numInsights,
    selectedGemId,
    color,
  } = session.data;

  const collectionRef = collection(firestore, CollectionName.User, uid, CollectionName.Insight).withConverter(
    insightConverter
  );

  const newNumInsights = numInsights + 1;

  update(nodeRef, {
    numInsights: newNumInsights,
  });

  tellToContentScript({
    numInsights: newNumInsights,
    color,
  });

  const data = message.data as C_TO_B_DATA;

  await addDocument(collectionRef, {
    createdAt: new Date().toISOString(),
    gemId: selectedGemId!,
    ...data,
  });
});

chrome.runtime.onMessage.addListener(async (message: Message, sender, sendResponse) => {
  const uid = auth.currentUser?.uid;

  console.log('Popup -> Background', message);

  switch (message.key) {
    case P_TO_B.P_TO_B_OPEN: {
      if (!uid) {
        send_B_to_P_message({
          key: B_TO_P.B_TO_P_CHANGE_URL,
          data: {
            location: urls.sign_in,
          },
        });

        return;
      }

      if (!session.data) {
        startSession(uid);
      }

      send_B_to_P_message({
        key: B_TO_P.B_TO_P_HERE_IS_USER_ID,
        data: {
          userId: uid,
        },
      });

      break;
    }
    case P_TO_B.P_TO_B_URL_CHANGED: {
      session.location = message.data.location;

      break;
    }

    case P_TO_B.P_TO_B_GIVE_ME_SESSION_INFORMATION: {
      if (session.data) {
        send_B_to_P_message({
          key: B_TO_P.B_TO_P_SESSION_INFORMATION_CHANGED,
          data: session.data,
        });
      }

      break;
    }
    case P_TO_B.P_TO_B_LOADED_USER: {
      send_B_to_P_message({
        key: B_TO_P.B_TO_P_CHANGE_URL,
        data: {
          location: session.location ?? urls.home,
        },
      });

      break;
    }
    case P_TO_B.P_TO_B_PAUSE_DIGGIN: {
      if (!uid) {
        console.error('no uid');

        return;
      }

      const realtimeNodeRef = ref(database, uid);

      update(realtimeNodeRef, {
        state: DigginState.PAUSED,
      });

      break;
    }
    case P_TO_B.P_TO_B_SELECTED_GEM: {
      const gemId = message.data.gemId;

      if (!uid) {
        console.error('no uid');

        return;
      }

      const realtimeNodeRef = ref(database, uid);

      update(realtimeNodeRef, {
        selectedGemId: gemId,
      });

      break;
    }

    case P_TO_B.P_TO_B_START_DIGGIN: {
      if (!uid) {
        console.error('no uid');

        return;
      }

      const realtimeNodeRef = ref(database, uid);

      if (!session.data?.selectedGemId) {
        console.error('No selected gem id');

        return;
      }

      const gemId = session.data?.selectedGemId;

      const gemDoc = doc(firestore, CollectionName.User, uid, CollectionName.Gem, gemId).withConverter(gemConverter);

      const gemData = await getDoc(gemDoc);

      const { color, elapsedTimeInSeconds, shapeId } = gemData.data() as unknown as Gem;

      const insightsRef = collection(firestore, CollectionName.User, uid, CollectionName.Insight).withConverter(
        insightConverter
      );

      const insights = (await getDocs(insightsRef)).docs.filter((doc) => {
        const insight = doc.data() as unknown as Insight;

        return insight.gemId === gemId;
      });

      set(realtimeNodeRef, {
        selectedGemId: gemId,
        state: DigginState.DIGGIN,
        shapeId,
        elapsedTimeInSeconds,
        color,
        numInsights: insights.length,
      });

      break;
    }
    case P_TO_B.P_TO_B_RESUME_DIGGIN: {
      if (!uid) {
        console.error('no uid');

        return;
      }

      const realtimeNodeRef = ref(database, uid);

      update(realtimeNodeRef, {
        state: DigginState.DIGGIN,
      });

      break;
    }
    case P_TO_B.P_TO_B_STOP_DIGGIN: {
      if (!uid) {
        console.error('no uid');

        return;
      }

      const realtimeNodeRef = ref(database, uid);

      set(realtimeNodeRef, {
        state: DigginState.IDLE,
      });

      break;
    }

    default:
      break;
  }
});
