import { firebaseConfig } from 'core';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  Unsubscribe,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth/web-extension';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getUserCredentialUsingOffscreenDocument } from './sign_in_using_offscreen';
import { LocalStorageKeys } from './local_storage';
import { startSession } from './session_management';

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);

let onAuthStateChangeUnsubscriber: Unsubscribe | null;
/**
 * 1. user-credential 을 가져온다.
 * 2. provider 를 입힌, auth-credential 로 재생성한다.
 * 3. pop-up 에 전달하기 위해 auth-state change 리스너를 등록한다.
 * 4. 2번에서 만들어진 auth-credential 을 사용해 service-worker 상에서의 sign-in 을 진행한다.
 *    // TODO - 3번 리스너가 등록된 상태에서 추가되는것이 관리하기 편한데, auth-state change 의 기존 리스너가 있으면 문제가 생길 수도 있을 것 같다.
 *
 * listening clients (pop-up 혹은 그 외) 에 전달하는 정보는 무엇이 되어야할까
 *
 * 1. pop-up 에서도 별도의 인증을 하는 것이 좋을 것 같다.
 *
 * 아마 access-token 없이는 사실 firestore 나 realtime-db 역시 사용 못하기 때문.
 *
 * 2. user credential 보다는 auth credential
 *
 * provider 처리를 여러군데서 할 필요는 없을 것 같다.
 * pop-up 쪽에서는 google 로 로그인했는지, 무엇으로 로그인 했는지 알 필요가 없을 것 같다.
 */
export const signInWithOffscreenPopUp = async () => {
  /* -------------------------------------------------------------------------- */
  /*                                  Register                                  */
  /* -------------------------------------------------------------------------- */
  if (onAuthStateChangeUnsubscriber) {
    onAuthStateChangeUnsubscriber();
  }

  onAuthStateChangeUnsubscriber = onAuthStateChanged(auth, async (user) => {
    if (user) {
      startSession(user.uid);

      return;
    } else {
      // sendMessage(MessageKey.AUTHENTICATION_INFORMATION_CHANGED, null);
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                         Check Authentication State                         */
  /* -------------------------------------------------------------------------- */
  const currentUser = auth.currentUser;

  if (currentUser) {
    /* -------------------------------------------------------------------------- */
    /*                    Authentication State: already signed-in                   */
    /* -------------------------------------------------------------------------- */
    console.log('currentUser already exists');

    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                      Authentication State: not signed-in                     */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                        not sign-in try local storage                       */
  /* -------------------------------------------------------------------------- */

  const { [LocalStorageKeys.GOOGLE_ID_TOKEN]: idToken } = await chrome.storage.local.get(
    LocalStorageKeys.GOOGLE_ID_TOKEN
  );

  if (idToken) {
    console.log('idToken exists in local storage');

    const googleAuthCredential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, googleAuthCredential);

    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                          not sign-in manual login                          */
  /* -------------------------------------------------------------------------- */

  const userCredential = await getUserCredentialUsingOffscreenDocument();
  const googleAuthCredential = GoogleAuthProvider.credentialFromResult(userCredential);

  if (googleAuthCredential) {
    await signInWithCredential(auth, googleAuthCredential);
  }
};
