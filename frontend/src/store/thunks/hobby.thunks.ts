import { createAsyncThunk } from '@reduxjs/toolkit';
import { Hobby } from '../../interfaces/hobby.interface';
import { APIProvider } from '../../providers/api.provider';
import { hobbyActions } from '../slices/hobby.slice';

export const createHobby = createAsyncThunk(
  'hobby/createHobby',
  async (data: Partial<Hobby>, { dispatch }) => {
    const api = new APIProvider();
    try {
      const hobby = await api.POST<Hobby>('/hobbies', data);
      dispatch(hobbyActions.add(hobby));
    } catch (error) {
      throw error;
    }
  }
);
export const deleteHobby = createAsyncThunk(
  'hobby/deleteHobby',
  async (hobbyId: string, { dispatch }) => {
    const api = new APIProvider();
    try {
      await api.DELETE(`/hobbies/${hobbyId}`);
      dispatch(hobbyActions.remove(hobbyId));
    } catch (error) {
      throw error;
    }
  }
);
