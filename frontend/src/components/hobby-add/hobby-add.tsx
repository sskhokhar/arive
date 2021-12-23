import React from 'react';
import './hobby-add.scss';
interface Props {
  formik?: any;
}

function HobbyAdd({ formik }: Props) {
  return (
    <form onSubmit={formik?.handleSubmit}>
      <div className='hobby-add-wrapper'>
        <div className='select-wrapper'>
          <select
            name='passionLevel'
            placeholder='Select Passion Level'
            value={formik?.values?.passionLevel}
            onChange={formik?.handleChange}
          >
            <option value=''>Select Passion Level</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
            <option value='Very-High'>Very High</option>
          </select>
        </div>
        <input
          name='name'
          type='text'
          className='input'
          placeholder='Enter Hobby Name'
          value={formik?.values?.name}
          onChange={formik?.handleChange}
        />
        <input
          name='year'
          type='text'
          className='input'
          placeholder='Enter Hobby Year'
          value={formik?.values?.year}
          onChange={formik?.handleChange}
        />
        <div>
          <button type='submit' className='btn btn-primary'>
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default HobbyAdd;
