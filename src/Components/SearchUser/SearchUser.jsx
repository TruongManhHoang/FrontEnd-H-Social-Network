import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();
  const searchResults = useSelector(
    (state) => state.auth.searchUser
  );

  const handleSearchUser = (e) => {
    setUserName(e.target.value);
    console.log('search user', searchResults);
    if (e.target.value) {
      dispatch(searchUser(userName));
    }
  };

  const handleClick = (id) => {
    console.log(id);
    dispatch(createChat({ userId: id }));
  };

  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#340544] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search User..."
          type="text"
          onChange={handleSearchUser}
        />
        {userName &&
          searchResults.map((item) => (
            <Card
              key={item.id}
              className="absolute w-full z-10 top-[4.5rem] cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUserName('');
                }}
                avatar={<Avatar src={item.avatar} />}
                title={item.firstName + ' ' + item.lastName}
                subheader={
                  '@' +
                  item.firstName.toLowerCase() +
                  ' ' +
                  item.lastName.toLowerCase()
                }
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
