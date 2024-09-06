import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Tab,
  Tabs,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../Post/PostCard';
import UserReelCard from '../Reels/UserReelCard';
import ProfileModal from './ProfileModal';
import ShowFollow from './ShowFollow';
import {
  getAllReel,
  getReelByUser,
} from '../../Redux/Reel/reel.action';
import {
  getAllPostAction,
  getUsersPostAction,
} from '../../Redux/Post/post.action';
import SavePost from '../Post/SavePost';

const tabs = [
  { value: 'post', name: 'Post' },
  { value: 'reels', name: 'Reels' },
  { value: 'saved', name: 'Saved' },
  { value: 'report', name: 'Report' },
];

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openFollow, setOpenFollow] = useState(false);
  const [followType, setFollowType] = useState('');

  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenFollow = (type) => {
    setFollowType(type);
    setOpenFollow(true);
  };
  const handleCloseFollow = () => setOpenFollow(false);

  const [value, setValue] = useState('post');

  const auth = useSelector((store) => store.auth);
  const reels = useSelector((store) => store.reel.reels);
  const posts = useSelector((store) => store.post.posts);
  const postsUser = useSelector(
    (store) => store.post.posts.users
  );
  // const following = useSelector(
  //   (store) => store.auth.follow
  // );

  console.log('Following', auth.user.followings);
  useEffect(() => {
    dispatch(getAllPostAction());
    if (auth.user) {
      dispatch(getUsersPostAction(auth.user.id));
    }
    dispatch(getAllReel());
    if (auth.user) {
      dispatch(getReelByUser(auth.user.id));
    }
  }, [dispatch, auth.user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        {/* Profile Header */}
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
            alt="Profile Cover"
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: '9rem', height: '10rem' }}
            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
          />
          <Button
            sx={{ borderRadius: '20px' }}
            variant="outlined"
            onClick={handleOpenProfileModal}
          >
            Edit Profile
          </Button>
        </div>
        {/* Profile Information */}
        <div className="p-3">
          <div>
            <h1 className="py-1 font-bold text-x1">{`${auth.user?.firstName} ${auth.user?.lastName}`}</h1>
            <p>
              @
              {auth.user?.firstName && auth.user?.lastName
                ? `${auth.user?.firstName.toLowerCase()}_${auth.user?.lastName.toLowerCase()}`
                : ''}
            </p>
          </div>
          <div className="flex gap-2 items-center py-3">
            <Button
              onClick={() => handleOpenFollow('followers')}
            >
              {`${auth.user?.followers?.length} follower`}
            </Button>
            <Button
              onClick={() => handleOpenFollow('followings')}
            >
              {`${auth.user?.followings?.length} following`}
            </Button>
          </div>
          <div>
            <p>Hi my name is {auth.user?.firstName}</p>
          </div>
        </div>
        {/* Tabs for Post, Reels, Saved, Report */}
        <section>
          <Box
            sx={{
              width: '100%',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item, index) => (
                <Tab
                  value={item.value}
                  label={item.name}
                  wrapped
                  key={index}
                />
              ))}
            </Tabs>
          </Box>
          {/* Tab Content */}
          <div className="flex justify-center">
            {value === 'post' ? (
              // Display Posts
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((item, index) => (
                  <div
                    className="border border-slate-100"
                    key={index}
                  >
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === 'reels' ? (
              // Display Reels
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((reel, index) => (
                  <UserReelCard key={index} item={reel} />
                ))}
              </div>
            ) : value === 'saved' ? (
              // Display Saved Posts
              <div className="space-y-5 w-[70%] my-10">
                {postsUser && postsUser.length > 0 ? (
                  postsUser.map((user, index) => (
                    <SavePost item={user} />
                  ))
                ) : (
                  <p>No saved posts found</p>
                )}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      {/* Profile Modal */}
      <section>
        <ProfileModal
          open={open}
          handleClose={handleClose}
        />
        <ShowFollow
          open={openFollow}
          handleClose={handleCloseFollow}
          title={
            followType === 'followers'
              ? 'Followers'
              : 'Followings'
          }
        />
      </section>
    </Card>
  );
};

export default Profile;
