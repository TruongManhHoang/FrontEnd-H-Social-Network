import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { red } from '@mui/material/colors';
import VideocamIcon from '@mui/icons-material/Videocam';
import CreateReel from './CreateReel';
import ReelCard from './ReelCard';
import {
  getAllReel,
  getReelByUser,
} from '../../Redux/Reel/reel.action';

import './ReelCard.css';

const Reels = () => {
  const dispatch = useDispatch();
  const [openCreateVideo, setOpenCreateVideo] =
    useState(false);
  const auth = useSelector((store) => store.auth);
  const reels = useSelector((store) => store.reel.reels);

  useEffect(() => {
    dispatch(getAllReel());
    // Nếu muốn lấy reels của user cụ thể
    if (auth.user) {
      dispatch(getReelByUser(auth.user.id));
    }
  }, [dispatch, auth.user]);

  const handleOpenCreateReel = () => {
    setOpenCreateVideo(true);
  };
  const handleCloseCreateReel = () => {
    setOpenCreateVideo(false);
  };

  return (
    <div>
      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar className="" />
          <input
            onClick={handleOpenCreateReel}
            readOnly
            className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border-[#3b4054] border"
            type="text"
            placeholder="Create a reel"
          />
        </div>

        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton
              color="primary"
              onClick={handleOpenCreateReel}
            >
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
        </div>
      </Card>
      <Card className="">
        {reels.map((reel, index) => (
          <ReelCard key={index} item={reel} />
        ))}
      </Card>
      <CreateReel
        handleClose={handleCloseCreateReel}
        open={openCreateVideo}
      />
    </div>
  );
};

export default Reels;
