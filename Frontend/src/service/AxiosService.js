import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import ApiService from './ApiService';

import { store } from '../store';
import { logout, setTokens } from '../store/reducers/authReducer';
import util from '../utlis/util';
import { toast } from 'sonner';

// const { getState, dispatch } = store; // Removing top-level destructuring to avoid circular dependency

const defaultErrorMessage = 'Opps ! something went wrong.';

const baseUrl = import.meta.env.VITE_APP_API_URL;
axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState();
    if (auth.sessionToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${auth.sessionToken}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    return { data: response?.data, error: null };
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response) {
      const { status, data } = error.response;
      if (
        status === StatusCodes.UNPROCESSABLE_ENTITY ||
        status === StatusCodes.BAD_REQUEST ||
        status === StatusCodes.NOT_FOUND
      ) {
        const { errors } = data;
        return { data: null, error: formatValidationError(errors) };
      } else if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
        toast.error(defaultErrorMessage);
        return { data: null, error: { message: defaultErrorMessage } };
      } else if (
        status === StatusCodes.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const isTokenUpdated = await refreshTokens();
        if (isTokenUpdated) {
          return await axios(originalRequest);
        } else {
          const { errors } = data;

          store.dispatch(logout());
          toast.error((errors && errors[0]?.message) || defaultErrorMessage);
          return { data: null };
        }
      } else if (status === StatusCodes.FORBIDDEN) {
        store.dispatch(logout());
        const { errors } = data;
        toast.error((errors && errors[0]?.message) || defaultErrorMessage);
        return { data: null };
      } else {
        const { errors } = data;
        toast.error((errors && errors[0]?.message) || defaultErrorMessage);
      }

      return { data: null, error: { message: defaultErrorMessage } };
    }

    return { data: null, error: { message: defaultErrorMessage } };
  }
);

const formatValidationError = (errors) => {
  const validationErrors = {};
  errors.map((err) => {
    validationErrors[err.param] = err.msg;
  });

  return validationErrors;
};

const refreshTokens = async () => {
  const state = store.getState();
  const { refreshToken } = state.auth;
  const payload = {
    refreshToken: refreshToken,
  };
  const { data } = await ApiService.authRenewTokenAsync(payload);
  if (data) {
    const token = {
      sessionToken: data,
      refreshToken: refreshToken,
    };

    store.dispatch(setTokens({ token }));
    // localStorage.setItem('token', JSON.stringify(token));
    util.setTokensToStorage(token);
    return true;
  }
  return false;
};
