import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';

const UserReelCard = ({ item }) => {
  return (
    <div>
      <Card className="reel-card mb-5">
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${item.user?.firstName} ${item.user?.lastName}`}
          subheader={`@${item.user?.firstName}_${item.user?.lastName}`}
        />
        <CardContent className="reel-card-content">
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {item.title}
          </Typography>
        </CardContent>
        {item.video ? (
          <video
            className="reel-video"
            src={item.video}
            controls
          />
        ) : null}
      </Card>
    </div>
  );
};

export default UserReelCard;
