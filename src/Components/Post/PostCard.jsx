import React, { useState } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCommentAction,
  likePostAction,
} from '../../Redux/Post/post.action';
import { isLikeByReqUser } from '../../utils/isLikeByReqUser';

const PostCard = ({ item }) => {
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);

  console.log('post', item);

  const [showComments, setShowCommnets] = useState(false);

  const handleCreateCommnet = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
  };

  const handleLikePosts = () => {
    dispatch(likePostAction(item.id));
  };

  const handleShowCommnet = () =>
    setShowCommnets(!showComments);
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
      <img
        className="w-full max-h-[30rem] object-cover object-top"
        src={item.image}
        alt=""
      />

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
          <IconButton onClick={handleLikePosts}>
            {isLikeByReqUser(auth.user?.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleShowCommnet}>
            <ChatIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            {true ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </div>
      </CardActions>

      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateCommnet(e.target.value);
                  console.log(
                    'ender perssed',
                    e.target.value
                  );
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="write your comment...."
            />
          </div>
          <Divider />

          <div className="mx-3 space-y-2 my-5 text-xs">
            {item.comments?.map((comment) => (
              <div className="flex items-center space-x-5">
                <Avatar
                  sx={{
                    height: '2rem',
                    width: '2rem',
                    fontSize: '9rem',
                  }}
                >
                  {item.user?.firstName[0]}
                </Avatar>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
