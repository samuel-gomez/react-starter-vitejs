export const REFETCH_ON_WINDOWS_FOCUS = false;
export const RETRY_REQUEST = 2;
export const CACHE_TIME = 1000 * 60 * 30; // 30 min de cache

// Used when oidc configuration is disabled
export const useOidcAccessTokenMock = () => ({ accessToken: 'fake access token' });
