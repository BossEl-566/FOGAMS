// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from '../features/users/userSlice'
import { themeReducer } from '../features/theme/themeSlice' // 👈 import your theme reducer
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
}

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer, // 👈 include the theme slice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
