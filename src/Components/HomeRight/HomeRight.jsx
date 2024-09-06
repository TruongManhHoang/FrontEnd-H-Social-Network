import React, { useEffect } from 'react';
import SearchUser from '../SearchUser/SearchUser';
import PopularUserCard from './PopularUserCard';
import { Card, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAction } from '../../Redux/Auth/auth.action';

const HomeRight = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);

  return (
    <div className="pr-5">
      <SearchUser />

      <Card className="p-5 mt-5">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="subtitle1"
            className="font-semibold opacity-70"
          >
            Suggestions for you
          </Typography>
          <Typography
            variant="body2"
            className="text-xs font-semibold"
          >
            View ALL
          </Typography>
        </Box>

        <div>
          {users.users?.map((item, index) => (
            <PopularUserCard key={index} item={item} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
