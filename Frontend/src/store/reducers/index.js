import { combineReducers } from "@reduxjs/toolkit";

import auth from './authReducer.js';
import cart from './cartReducer.js';

const reducers = combineReducers({
    auth,
    cart
});

export default reducers;