import React, { useEffect } from 'react';
import HobbiesPartial from './partials/hobbies.partial';
import UsersPartial from './partials/users.partial';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getUsers } from './store/thunks/user.thunks';
import './App.scss';
import { getUserState } from './store/slices/user.slice';
function App() {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector(getUserState);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className='App'>
      <div className='header'>
        <h1>User Hobbies</h1>
      </div>
      <div className='partial-wrapper'>
        <div className='users-partial-main'>
          <UsersPartial />
        </div>
        <div className='hobbies-partial-main'>
          {selectedUser && <HobbiesPartial />}
        </div>
      </div>
    </div>
  );
}

export default App;
