import {
  Avatar,
  Box,
  Button,
  Card,
  Tab,
  Tabs,
} from '@mui/material';
import React from 'react';
import PostCard from '../Post/PostCard';
import UserReelCard from '../Reels/UserReelCard';
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';

const tabs = [
  { value: 'post', name: 'Post' },
  { value: 'reels', name: 'Reels' },
  { value: 'saved', name: 'Saved' },
  { value: 'report', name: 'Report' },
];
const posts = [1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedPost = [1, 1, 1];

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState('post');

  const { auth } = useSelector((store) => store);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const firstName = auth.user?.firstName || '';
  const lastName = auth.user?.lastName || '';
  const followers = auth.user?.followers || 0;
  const followings = auth.user?.followings || 0;

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
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

        <div className="p-3">
          <div>
            <h1 className="py-1 font-bold text-x1">
              {`${firstName} ${lastName}`}
            </h1>
            <p>
              @
              {firstName && lastName
                ? `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
                : ''}
            </p>
          </div>

          <div className="flex gap-2 items-center py-3">
            <span>{`${followers} follower`}</span>
            <span>{`${followers} follower`}</span>
            <span>{`${followings} following`}</span>
          </div>

          <div>
            <p>Hi my name is Hoang</p>
          </div>
        </div>
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

          <div className="flex justify-center">
            {value === 'post' ? (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((item, index) => (
                  <div className="border border-slate-100">
                    <PostCard item={item} key={index} />
                  </div>
                ))}
              </div>
            ) : value === 'reels' ? (
              <div className="flex justify-center flex-wrap gap-2 my-10 ">
                {reels.map((item, index) => (
                  <UserReelCard key={index} />
                ))}
              </div>
            ) : value === 'saved' ? (
              <div className="space-y-5 w-[70%] my-10">
                {savedPost.map((item, index) => (
                  <div
                    className="border border-slate-100"
                    key={index}
                  >
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal
          open={open}
          handleClose={handleClose}
        />
      </section>
    </Card>
  );
};

export default Profile;
