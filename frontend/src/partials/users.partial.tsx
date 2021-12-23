import React from 'react';
import UserAdd from '../components/user-add/user-add';
import UserItem from '../components/user/user';
import { User } from '../interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getUserState,
  selectAllUser,
  userActions,
} from '../store/slices/user.slice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUser, getUserHobbies } from '../store/thunks/user.thunks';
import { hobbyActions } from '../store/slices/hobby.slice';
const userAddSchema = yup.object({
  name: yup.string().required(),
});
function UsersPartial() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUser);
  const { selectedUser } = useAppSelector(getUserState);
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: userAddSchema,
    onSubmit: (values) => {
      dispatch(createUser(values));
      formik.resetForm();
    },
  });
  const handleUserSelect = (user: User) => {
    dispatch(hobbyActions.removeAll());
    dispatch(userActions.selectUser(user));
    dispatch(getUserHobbies(user._id));
  };
  return (
    <div className='users-partial'>
      <UserAdd formik={formik} />
      {users.map((user) => (
        <div key={user._id} onClick={() => handleUserSelect(user)}>
          <UserItem user={user} selected={selectedUser?._id === user._id} />
        </div>
      ))}
    </div>
  );
}

export default UsersPartial;
