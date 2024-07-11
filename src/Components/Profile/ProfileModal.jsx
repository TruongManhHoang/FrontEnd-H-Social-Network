import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { updateProfileAction } from '../../Redux/Auth/auth.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  outline: 'none',
  overflowY: 'scroll',
  borderRadius: 3,
};

export default function ProfileModal({
  open,
  handleClose,
}) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log('values ', values);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {
      console.log('values', values);
      dispatch(updateProfileAction(values));
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">
                Edit Profile
              </Typography>
            </div>
            <Button type="submit">Save</Button>
          </div>
          <div className="h-[15rem]">
            <img
              className="w-full h-full rounded-t-md"
              src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
              alt="Profile Cover"
            />
          </div>
          <div className="pl-5">
            <Avatar
              className="transform -translate-y-24"
              sx={{ width: '10rem', height: '10rem' }}
              src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
            />
          </div>
          <div className="space-y-3 mt-5">
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
}
