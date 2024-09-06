import {
  Avatar,
  CardHeader,
  IconButton,
} from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction } from '../../Redux/Auth/auth.action';
import { isFollowReqUser } from '../../utils/isFollowReqUser';

const PopularUserCard = ({ item }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const [isFollowing, setIsFollowing] = useState(
    isFollowReqUser(auth.user?.id, item)
  );

  const handleFollow = () => {
    dispatch(followUserAction(item.id));
    setIsFollowing((prev) => !prev); // Toggle trạng thái theo dõi
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: red[500],
              height: '2rem',
              width: '2rem',
              fontSize: '1rem',
            }}
            aria-label="recipe"
          >
            {item.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton onClick={handleFollow}>
            <span
              className={`text-base ${
                isFollowing ? 'text-blue-500' : 'text-black'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </span>
          </IconButton>
        }
        title={`${item.firstName} ${item.lastName}`}
        subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}`}
      />
    </div>
  );
};

export default PopularUserCard;
