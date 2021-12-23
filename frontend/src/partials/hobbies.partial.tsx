import React from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { hobbyActions, selectAllHobby } from '../store/slices/hobby.slice';
import HobbyAdd from '../components/hobby-add/hobby-add';
import * as yup from 'yup';
import HobbyItem from '../components/hobby/hobby';
import { getUserState } from '../store/slices/user.slice';
import { createHobby, deleteHobby } from '../store/thunks/hobby.thunks';
const hobbySchema = yup.object({
  name: yup.string().required(),
  passionLevel: yup.mixed().oneOf(['Very-High', 'High', 'Medium', 'Low']),
  year: yup.string().required(),
});
function HobbiesPartial() {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector(getUserState);
  const hobbies = useAppSelector(selectAllHobby);
  const formik = useFormik({
    initialValues: {
      name: '',
      passionLevel: '',
      year: '',
    },
    validationSchema: hobbySchema,
    onSubmit: (values) => {
      dispatch(
        createHobby({
          ...values,
          user: selectedUser?._id,
          passionLevel: formik.values.passionLevel as
            | 'Very-High'
            | 'High'
            | 'Medium'
            | 'Low',
        })
      );
      formik.resetForm();
    },
  });
  const handleHobbyDelete = (id: string) => {
    if (window.confirm('Are you sure want to delete?')) {
      dispatch(deleteHobby(id));
    }
  };
  return (
    <div className='hobbies-partial'>
      <HobbyAdd formik={formik} />
      {hobbies.map((hobby) => (
        <div key={hobby._id}>
          <HobbyItem hobby={hobby} onDelete={handleHobbyDelete} />
        </div>
      ))}
    </div>
  );
}

export default HobbiesPartial;
