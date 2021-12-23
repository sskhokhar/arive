import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';
import { RootState } from '../store';
import { getUsers } from '../thunks/user.thunks';

export const USER_FEATURE_KEY = 'user';

export interface UserEntity extends User {}

export interface UserState extends EntityState<UserEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
  selectedUser: User | null;
}

export const userAdapter = createEntityAdapter<UserEntity>({
  selectId: (entity) => entity._id,
});

export const initialUserState: UserState = userAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  selectedUser: null,
});

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {
    add: userAdapter.addOne,
    addMany: userAdapter.addMany,
    selectUser: (state, { payload }: PayloadAction<User>) => {
      state.selectedUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = (action.payload as any)?.message || 'There was an error';
      })
      .addCase(getUsers.fulfilled, (state) => {
        state.loadingStatus = 'loaded';
        state.error = null;
      });
  },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

const { selectAll, selectEntities } = userAdapter.getSelectors();

export const getUserState = (rootState: RootState): UserState =>
  rootState[USER_FEATURE_KEY];

export const selectAllUser = createSelector(getUserState, selectAll);

export const selectUserEntities = createSelector(getUserState, selectEntities);
