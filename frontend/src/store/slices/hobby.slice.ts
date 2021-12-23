import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Hobby } from '../../interfaces/hobby.interface';
import { RootState } from '../store';

export const HOBBY_FEATURE_KEY = 'hobby';

export interface HobbyEntity extends Hobby {}

export interface HobbyState extends EntityState<HobbyEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

export const hobbyAdapter = createEntityAdapter<HobbyEntity>({
  selectId: (entity) => entity._id,
});

export const initialHobbyState: HobbyState = hobbyAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const hobbySlice = createSlice({
  name: HOBBY_FEATURE_KEY,
  initialState: initialHobbyState,
  reducers: {
    add: hobbyAdapter.addOne,
    addMany: hobbyAdapter.addMany,
    remove: hobbyAdapter.removeOne,
    removeAll: hobbyAdapter.removeAll,
  },
});

export const hobbyReducer = hobbySlice.reducer;

export const hobbyActions = hobbySlice.actions;

const { selectAll, selectEntities } = hobbyAdapter.getSelectors();

export const getHobbyState = (rootState: RootState): HobbyState =>
  rootState[HOBBY_FEATURE_KEY];

export const selectAllHobby = createSelector(getHobbyState, selectAll);

export const selectHobbyEntities = createSelector(
  getHobbyState,
  selectEntities
);
