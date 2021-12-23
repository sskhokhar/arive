import { createAsyncThunk } from '@reduxjs/toolkit';
import { Hobby } from '../../interfaces/hobby.interface';
import { User } from '../../interfaces/user.interface';
import { APIProvider } from '../../providers/api.provider';
import { hobbyActions } from '../slices/hobby.slice';
import { userActions } from '../slices/user.slice';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (data: Partial<User>, { dispatch }) => {
    const api = new APIProvider();
    try {
      const user = await api.POST<User>('/users', data);
      dispatch(userActions.add(user));
    } catch (error) {
      throw error;
    }
  }
);
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { dispatch }) => {
    const api = new APIProvider();
    try {
      const users = await api.GET<User[]>('/users');
      dispatch(userActions.addMany(users));
    } catch (error) {
      throw error;
    }
  }
);

export const getUserHobbies = createAsyncThunk(
  'user/getUserHobbies',
  async (userId: string, { dispatch }) => {
    const api = new APIProvider();
    try {
      const hobbies = await api.GET<Hobby[]>(`/users/${userId}/hobbies`);
      dispatch(hobbyActions.addMany(hobbies));
    } catch (error) {
      throw error;
    }
  }
);
