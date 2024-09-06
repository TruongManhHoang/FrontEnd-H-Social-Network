import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  Menu,
  MenuItem,
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
  deletePostAction,
  getAllPostAction,
  likePostAction,
  savePostAction,
} from '../../Redux/Post/post.action';
import { isLikeByReqUser } from '../../utils/isLikeByReqUser';
import { isSaveByReqUser } from '../../utils/isSaveByReqUser';
import UpdatePostModal from '../CreatePost/UpdatePostModal';

const PostCard = ({ item }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openUpdatePostModal, setOpenUpdatePostModal] =
    useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
  };

  const handleOpenUpdatePostModal = () => {
    setOpenUpdatePostModal(true);
    handleMenuClose();
  };

  const handleCloseUpdatePostModal = () => {
    setOpenUpdatePostModal(false);
  };

  const handleLikePosts = () => {
    dispatch(likePostAction(item.id));
  };
  const handleDeletePosts = () => {
    if (auth.user?.id !== item.user?.id) {
      alert('Bạn không thể xóa bài viết này.');
      return;
    }

    if (
      window.confirm(
        'Bạn có chắc muốn xóa bài viết này không?'
      )
    ) {
      dispatch(deletePostAction(item.id));
    }
  };

  const handleSavePost = () => {
    dispatch(savePostAction(item.id));
  };

  const handleShowComment = () =>
    setShowComments(!showComments);

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [dispatch]);
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            />
          }
          action={
            <>
              <IconButton
                aria-controls={
                  open ? 'basic-menu' : undefined
                }
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={handleOpenUpdatePostModal}
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDeletePosts}>
                  Delete
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          }
          title={`${item.user?.firstName} ${item.user?.lastName}`}
          subheader={`@${item.user?.firstName}_${item.user?.lastName}`}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {item.caption}
          </Typography>
        </CardContent>
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
            <IconButton onClick={handleShowComment}>
              <ChatIcon />
            </IconButton>
          </div>
          <div>
            <IconButton onClick={handleSavePost}>
              {isSaveByReqUser(auth.user?.id, item) ? (
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
                    handleCreateComment(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
                type="text"
                placeholder="write your comment...."
              />
            </div>
            <Divider />
            <div className="mx-3 space-y-2 my-5 text-base">
              {item.comments?.map((comment) => (
                <div
                  className="flex items-center space-x-2"
                  key={comment.id}
                >
                  <Avatar
                    sx={{
                      height: '2rem',
                      width: '2rem',
                      fontSize: '1rem',
                    }}
                  >
                    {comment.user?.firstName[0]}
                  </Avatar>
                  <div className="flex flex-col font-bold">
                    <span>{`${comment.user?.firstName} ${comment.user?.lastName}`}</span>
                    <p>{comment.content}</p>
                  </div>
                  <IconButton
                    aria-label="settings"
                    size="small"
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>
          </section>
        )}
      </Card>
      <UpdatePostModal
        handleClose={handleCloseUpdatePostModal}
        open={openUpdatePostModal}
        item={item}
      />
    </>
  );
};

export default PostCard;
