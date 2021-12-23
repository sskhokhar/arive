import React from 'react';
import { Hobby } from '../../interfaces/hobby.interface';
import './hobby.scss';
interface Props {
  hobby?: Hobby;
  onDelete?: (id: string) => void;
}

function HobbyItem({ hobby, onDelete }: Props) {
  return (
    <div className='hobby-wrapper'>
      <span>Passion Level: {hobby?.passionLevel}</span>
      <span>Name: {hobby?.name}</span>
      <span>Since: {hobby?.year}</span>
      <span>
        <button
          className='btn btn-warn'
          onClick={() => onDelete && onDelete(hobby?._id as string)}
        >
          Delete
        </button>
      </span>
    </div>
  );
}

export default HobbyItem;
