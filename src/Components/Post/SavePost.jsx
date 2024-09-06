import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLikeByReqUser } from '../../utils/isLikeByReqUser';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import { red } from '@mui/material/colors';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { isSaveByReqUser } from '../../utils/isSaveByReqUser';

const SavePost = ({ item }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  return (
    <Card className="">
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
      {item.image ? (
        <img
          className="w-full max-h-[30rem] object-cover object-top"
          src={item.image}
          alt=""
        />
      ) : item.video ? (
        <video
          className="w-full max-h-[30rem] object-cover object-top"
          src={item.video}
          controls
        />
      ) : null}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>

      <CardActions
        className="flex justify-between"
        disableSpacing
      >
        <div>
          <IconButton>
            {isLikeByReqUser(auth.user?.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            {isSaveByReqUser(auth.user?.id, item) ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default SavePost;
