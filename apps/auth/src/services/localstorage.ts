import { AuthDAO, LOCAL_STORAGE_KEYS } from '@enroute/definitions';

export const saveToken = (authResponse: AuthDAO) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, authResponse.jwt);
  window.dispatchEvent(new Event('setAuthToken'));
};

export const saveUserId = (_id: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, _id);
};

export const getUserId = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
};
export const removeUserId = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_ID);
};
