import React from 'react';
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import { useSelector } from 'react-redux';

const ShowFollow = ({ open, handleClose, title }) => {
  const auth = useSelector((store) => store.auth);
  const followers =
    title === 'Followers'
      ? auth.user?.followers
      : auth.user?.followings;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          maxWidth: 400,
          mx: 'auto',
          mt: 10,
        }}
      >
        <Typography
          variant="h6"
          id="modal-modal-title"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>
        <List>
          {followers && followers.length > 0 ? (
            followers.map((follower, index) => (
              <ListItem key={index}>
                <Avatar sx={{ mr: 2 }}>
                  {follower.firstName?.[0] || ''}
                </Avatar>
                <ListItemText
                  primary={`${follower.firstName || ''} ${
                    follower.lastName || ''
                  }`}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">
              No {title.toLowerCase()} found
            </Typography>
          )}
        </List>
      </Box>
    </Modal>
  );
};

export default ShowFollow;
