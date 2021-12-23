import React from 'react';
import { User } from '../../interfaces/user.interface';
import './user.scss';
interface Props {
  user?: User;
  selected?: boolean;
}

function UserItem({ user, selected }: Props) {
  return (
    <div className={`user-wrapper ${selected && 'selected'}`}>
      <span>{user?.name}</span>
    </div>
  );
}

export default UserItem;
