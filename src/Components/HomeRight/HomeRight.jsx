import React from 'react';
import SearchUser from '../SearchUser/SearchUser';
import PopularUserCard from './PopularUserCard';
import { Card, Box, Typography } from '@mui/material';

const popularUser = [1, 1, 1, 1, 1];

const HomeRight = () => {
  return (
    <div className='pr-5'>
      <SearchUser />

      <Card className='p-5 mt-5'>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" className='font-semibold opacity-70'>Suggestions for you</Typography>
          <Typography variant="body2" className='text-xs font-semibold'>View ALL</Typography>
        </Box>

        <div>
          {popularUser.map((item, index) => <PopularUserCard key={index} />)}
        </div>
        
      </Card>
    </div>
  );
}

export default HomeRight;
