import React from 'react';
import './user-add.scss';
interface Props {
  formik?: any;
}

function UserAdd({ formik }: Props) {
  return (
    <form onSubmit={formik?.handleSubmit}>
      <div className='user-add-wrapper'>
        <input
          name='name'
          type='text'
          placeholder='Enter User Name'
          className={`input ${formik?.errors?.name && 'error'}`}
          value={formik?.name}
          onChange={formik?.handleChange}
        />
        <button type='submit' className='btn btn-primary'>
          Add
        </button>
      </div>
    </form>
  );
}

export default UserAdd;
