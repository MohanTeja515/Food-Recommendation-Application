import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage' 
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ 
  user: userSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch