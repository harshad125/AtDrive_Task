import constants from './constants';

const setItemToStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getItemFromStorage = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    return item;
  }

  return null;
};

const removeItem = (key) => localStorage.removeItem(key);

const setTokensToStorage = (token) => {
  localStorage.setItem(
    constants.localStorageKey.tokens,
    btoa(JSON.stringify(token))
  );
};

const getTokensFromStorage = () => {
  const item = localStorage.getItem(constants.localStorageKey.tokens);
  if (item) {
    try {
      const token = JSON.parse(atob(item));
      return token;
    } catch (e) {
      console.error('Failed to parse token from storage', e);
      return null;
    }
  }

  return null;
};

export default {
  setItemToStorage,
  getItemFromStorage,
  setTokensToStorage,
  getTokensFromStorage,
  removeItem,
};
