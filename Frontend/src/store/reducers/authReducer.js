import { createSlice } from '@reduxjs/toolkit';
import util from '../../utlis/util';

const initialState = {
  user: null,
  sessionToken: null,
  refreshToken: null,
  socket: null,
  isUserLogout: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.sessionToken = token?.sessionToken;
      state.refreshToken = token?.refreshToken;
      state.isUserLogout = false;
      util.setTokensToStorage(token);
    },
    setTokens(state, action) {
      const { token } = action.payload;
      if (token && token.sessionToken) {
        state.sessionToken = token.sessionToken;
      }
      if (state?.refreshToken === null) {
        state.refreshToken = token?.refreshToken;
      }
    },
    logout(state, action) {
      state.refreshToken = null;
      state.sessionToken = null;
      state.user = null;
      state.isUserLogout = true;
      util.removeItem('Tokens');
    },
  },
});

export default auth.reducer;

export const { login, setTokens, logout } = auth.actions;
