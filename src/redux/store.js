import { configureStore } from '@reduxjs/toolkit'; 

import reducer from './slice';

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
});

// export const RootState = typeof store.getState;
// export const AppDispatch = typeof store.dispatch;

export default store;
