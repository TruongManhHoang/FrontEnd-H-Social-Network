import React, { useState } from 'react';
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { createReel } from '../../Redux/Reel/reel.action';
import { uploadToCloudinary } from '../../utils/uploadToCloundniry';
import ImageIcon from '@mui/icons-material/Image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6rem',
  outline: 'none',
};

const CreateReel = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectVideo, setSelectVideo] = useState('');

  const user = useSelector((state) => state.auth.user);

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(
      event.target.files[0],
      'video'
    );
    setSelectVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue('video', videoUrl);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      video: '',
    },
    onSubmit: (values) => {
      console.log('formik values', values);
      dispatch(createReel(values));
      handleClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-4 items-center mb-4">
            <Avatar />
            <div>
              <p className="font-bold text-lg">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm">
                @{user?.firstName?.toLowerCase()}{' '}
                {user?.lastName?.toLowerCase()}
              </p>
            </div>
          </div>

          <textarea
            className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm"
            name="title"
            placeholder="Write caption"
            rows="4"
            value={formik.values.title}
            onChange={formik.handleChange}
          ></textarea>

          <div className="flex space-x-5 items-center mt-5">
            <div>
              <input
                type="file"
                accept="video/*"
                onChange={handleSelectVideo}
                style={{ display: 'none' }}
                id="video-input"
              />
              <label htmlFor="video-input">
                <IconButton
                  color="primary"
                  component="span"
                >
                  <VideoCallIcon />
                </IconButton>
              </label>
              <span>Video</span>
            </div>
          </div>
          {selectVideo && (
            <div>
              <img
                className="h-[10rem]"
                src={selectVideo}
                alt=""
              />
            </div>
          )}
          <div className="flex w-full justify-end mt-4">
            <Button
              variant="contained"
              type="submit"
              sx={{ borderRadius: '1.5rem' }}
            >
              Create
            </Button>
          </div>
        </form>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreateReel;
