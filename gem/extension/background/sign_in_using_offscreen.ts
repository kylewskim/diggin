import { log } from './utility';
import { Stage } from './constants';
import { UserCredential } from 'firebase/auth';

const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

let creatingOffscreenDocument: Promise<void> | null; // A global promise to avoid concurrency issues
const setupOffscreenDocument = async (path: string) => {
  log(Stage.OFFSCREEN_GENERATING, 'started');

  const offscreenUrl = chrome.runtime.getURL(path);

  const offScreenExists = await checkIfOffScreenExistence();

  if (offScreenExists) {
    console.warn('offScreen already exists, abort');
    return;
  }

  // create offscreen document
  if (creatingOffscreenDocument) {
    console.warn('already creatingOffscreenDocument, abort');

    await creatingOffscreenDocument;

    return;
  }

  creatingOffscreenDocument = chrome.offscreen
    .createDocument({
      url: offscreenUrl,
      reasons: [chrome.offscreen.Reason.DOM_SCRAPING],
      justification: 'authentication',
    })
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.error(e);
    });

  await creatingOffscreenDocument;

  creatingOffscreenDocument = null;

  log(Stage.OFFSCREEN_GENERATING, 'finished');
};

/**
 * documentUrls 로 필터링을 할 수는 있지만, 어짜피 off-screen 한정해서는 하나밖에 존재 할 수 없으므로 생략한다.
 */
const checkIfOffScreenExistence = async () => {
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
  });

  return existingContexts.length > 0;
};

const closeOffscreenDocument = async () => {
  if (!(await checkIfOffScreenExistence())) {
    return;
  }

  await chrome.offscreen.closeDocument();
};

const getAuth: () => Promise<UserCredential> = async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const auth = await chrome.runtime.sendMessage({
      type: 'firebase-auth',
      target: 'offscreen',
    });

    auth?.name !== 'FirebaseError' ? resolve(auth) : reject(auth);
  });
};

export const getUserCredentialUsingOffscreenDocument: () => Promise<UserCredential> = async () => {
  await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);

  log(Stage.SIGNING, 'started');
  const auth = await getAuth()
    .then((auth) => {
      log(Stage.SIGNING, `User Authenticated succeed. uid is ${auth.user.uid}`);

      return auth;
    })
    .catch((err) => {
      log(Stage.SIGNING, 'User Authenticated failed. error follows');

      if (err.code === 'auth/operation-not-allowed') {
        console.error(
          'You must enable an OAuth provider in the Firebase' +
            ' console in order to use signInWithPopup. This sample' +
            ' uses Google by default.'
        );

        return err;
      }

      console.error(err);

      return err;
    })
    .finally(closeOffscreenDocument);

  return auth;
};
