export enum LocalStorageItemKeys {
  GEM_RECENT_GEM_ID = 'gem_recentGemId',
  GEM_LAST_GEM_ID = 'gem_lastGemId',
  USER_ID = 'user_id',
  USER_ACCESS_TOKEN = 'user_accessToken',
  USER_REFRESH_TOKEN = 'user_refreshToken',
}

// Object for key types
type LocalStorageItem = {
  [LocalStorageItemKeys.GEM_RECENT_GEM_ID]: string;
  [LocalStorageItemKeys.GEM_LAST_GEM_ID]: number;
  [LocalStorageItemKeys.USER_ID]: string;
  [LocalStorageItemKeys.USER_ACCESS_TOKEN]: string;
  [LocalStorageItemKeys.USER_REFRESH_TOKEN]: string;
};

// Define a type for the keys
type keys = keyof LocalStorageItem;

export const localStorageHandler = {
  // Get item from local storage
  get: <K extends keys>(key: K): LocalStorageItem[K] | undefined => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        // Key not found in local storage
        return undefined;
      }
      // Parse and return the data
      return JSON.parse(serializedData);
    } catch (error) {
      console.error(`Error while getting item from local storage`, error);
      return undefined;
    }
  },

  // Set item in local storage
  set: <K extends keys>(key: K, data: LocalStorageItem[K]): boolean => {
    try {
      // Serialize the data before storing
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      // Return true on success
      return true;
    } catch (error) {
      console.error(`Error while setting item in local storage`, error);
      // Return false on failure
      return false;
    }
  },
};
