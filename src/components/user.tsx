import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Store } from '../types';
import { addUser } from '../store/user/user.action';

export interface Props {
  user: [];
  children?: React.ReactNode;
}

const User: React.FC<Props> = ({ user }) => {
  const [input, setinput] = useState('');
  const userList: Array<string> = useSelector(
    (state: Store) => state.user.userList
  );
  const dispatch: Dispatch = useDispatch();
  const handleInputChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setinput(e.target.value);
  };

  const handleAddUser = () => {
    dispatch(addUser(input));
    setinput('');
  };

  return (
    <div>
      <input value={input} onChange={handleInputChange} />
      <button type="button" onClick={handleAddUser}>
        add
      </button>
      <ul>
        {userList.map((item: string) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default User as React.FunctionComponent;
