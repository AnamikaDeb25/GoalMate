import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appSlice from './slice/appSlice';
import configureMiddleware from './middleWare/configureMiddleware';
import userSlice from './slice/userSlice';
import localSlice from './slice/localSlice';

// Create a persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['appSlice', 'userSlice', 'localSlice'],
};

// Create a root reducer
const rootReducer = combineReducers({
  userSlice,
  appSlice,
  localSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: configureMiddleware,
});

export const persistor = persistStore(store);
