import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from 'react-redux';
import { createStory } from '../../Redux/Story/story.action';
import { uploadToCloudinary } from '../../utils/uploadToCloundniry';

const CreateStoryModal = ({ open, handleClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '6rem',
    outline: 'none',
  };

  const [selectedImage, setSelectedImage] = useState();

  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      image: '',
      caption: '',
    },
    onSubmit: (values) => {
      console.log('formik values', values);
      dispatch(createStory(values));
    },
  });

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(
      event.target.files[0],
      'image'
    );
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue('image', imageUrl);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex space-x-4">
              <Avatar />
              <div>
                <div>
                  <p className="font-bold text-lg">
                    {user?.firstName + ' ' + user?.lastName}
                  </p>
                  <p className="text-sm">
                    @
                    {user?.firstName?.toLowerCase() +
                      ' ' +
                      user?.lastName?.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            <textarea
              className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm"
              name="caption"
              id=""
              placeholder="write caption"
              rows="4"
              value={formik.values.caption}
              onChange={formik.handleChange}
            ></textarea>

            <div className="flex space-x-5 items-center mt-5">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  style={{ display: 'none' }}
                  id="image-input"
                />

                <label htmlFor="image-input">
                  <IconButton
                    color="primary"
                    component="span"
                  >
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>
            </div>
            {selectedImage && (
              <div>
                <img
                  className="h-[10rem"
                  src={selectedImage}
                  alt=""
                />
              </div>
            )}
            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: '1.5rem' }}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreateStoryModal;
