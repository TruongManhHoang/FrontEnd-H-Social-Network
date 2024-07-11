import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
} from '@mui/material';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

const UserChatCard = ({ item }) => {
  // console.log('chat......', item);
  const auth = useSelector((state) => state.auth);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: '3.5rem',
              height: '3.5rem',
              fontSize: '1,5rem',
              bgcolor: '#191c29',
              color: 'rgb(88, 199, 250)',
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg"
            alt=""
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          auth.user?.id === item.users[0]?.id
            ? item.users[1].firstName +
              ' ' +
              item.users[1].lastName
            : item.users[0].firstName +
              ' ' +
              item.users[0].lastName
        }
        subheader={'new message'}
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
