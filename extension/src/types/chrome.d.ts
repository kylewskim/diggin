// Chrome API에 대한 타입 정의
declare namespace chrome {
  namespace runtime {
    const id: string;
    const lastError: { message: string } | undefined;
    function getManifest(): any;
  }

  namespace identity {
    function getAuthToken(options: { interactive: boolean }, callback: (token: string | null) => void): void;
    function removeCachedAuthToken(options: { token: string }, callback: () => void): void;
    function clearAllCachedAuthTokens(callback: () => void): void;
    function launchWebAuthFlow(options: { url: string; interactive: boolean }, callback: (responseUrl?: string) => void): void;
  }
} 
 
 
 
 
 