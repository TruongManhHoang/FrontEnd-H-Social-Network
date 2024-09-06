import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllStory } from '../../Redux/Story/story.action';
import ShowImage from './ShowImage';

const StoryCircle = ({ item }) => {
  const dispatch = useDispatch();

  const [showImage, setShowImage] = useState(false);

  const handleOpenShowImage = () => {
    setShowImage(true);
  };

  const handleCloseShowImage = () => {
    setShowImage(false);
  };

  useEffect(() => {
    dispatch(getAllStory());
  }, [dispatch]);

  return (
    <div>
      <IconButton onClick={handleOpenShowImage}>
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{ width: '5rem', height: '5rem' }}
            src={item.image}
          />
          <p style={{ fontSize: '0.75rem' }}>
            {item.user?.firstName +
              ' ' +
              item.user?.lastName}
          </p>
        </div>
      </IconButton>
      <div>
        <ShowImage
          item={item}
          open={showImage}
          handleClose={handleCloseShowImage}
        />
      </div>
    </div>
  );
};

export default StoryCircle;
