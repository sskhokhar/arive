import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { hobbyReducer, HOBBY_FEATURE_KEY } from './slices/hobby.slice';
import { userReducer, USER_FEATURE_KEY } from './slices/user.slice';

export const store = configureStore({
  reducer: {
    [USER_FEATURE_KEY]: userReducer,
    [HOBBY_FEATURE_KEY]: hobbyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
