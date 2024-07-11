import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Card, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';
import { getAllStory } from '../../Redux/Story/story.action';
import StoryCircle from '../Story/StoryCircle';
import CreateStoryModal from '../Story/CreateStoryModal';
import './MiddlePart.css';

const MiddlePart = () => {
  const dispatch = useDispatch();

  const postState = useSelector((store) => store.post);
  const storyState = useSelector((store) => store.story);

  console.log('post store', postState);
  console.log('story store', storyState);

  const [openCreatePostModal, setOpenCreatePostModal] =
    useState(false);
  const [openCreateStoryModal, setOpenCreateStoryModal] =
    useState(false);

  const handleCloseCreatePostModal = () =>
    setOpenCreatePostModal(false);
  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log('Open post modal...');
  };

  const handleOpenCreateStoryModal = () =>
    setOpenCreateStoryModal(true);
  const handleCloseCreateStoryModal = () =>
    setOpenCreateStoryModal(false);

  const storyContainerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = storyContainerRef;
    if (direction === 'left') {
      current.scrollBy({ left: -200, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    dispatch(getAllPostAction());
    dispatch(getAllStory());
  }, [dispatch, postState.newComment]);

  return (
    <div className="px-20">
      <section className="py-5 flex items-center p-5 rounded-b-md relative">
        <button
          className="arrow-button left"
          onClick={() => scroll('left')}
        >
          &#9664;
        </button>
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: '5rem', height: '5rem' }}>
            <IconButton
              onClick={handleOpenCreateStoryModal}
            >
              <AddIcon sx={{ fontSize: '3rem' }} />
            </IconButton>
          </Avatar>
          <p>New</p>
        </div>
        <div
          className="story-container"
          ref={storyContainerRef}
        >
          {storyState.stories.map((item, index) => (
            <StoryCircle key={index} item={item} />
          ))}
        </div>
        <button
          className="arrow-button right"
          onClick={() => scroll('right')}
        >
          &#9654;
        </button>
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar className="" />
          <input
            onClick={handleOpenCreatePostModal}
            readOnly
            className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border-[#3b4054] border"
            type="text"
          />
        </div>

        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton
              color="primary"
              onClick={handleOpenCreatePostModal}
            >
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton
              color="primary"
              onClick={handleOpenCreatePostModal}
            >
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton
              color="primary"
              onClick={handleOpenCreatePostModal}
            >
              <ArticleIcon />
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
        {postState.posts.map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>
      <div>
        <CreatePostModal
          handleClose={handleCloseCreatePostModal}
          open={openCreatePostModal}
        />
      </div>
      <div>
        <CreateStoryModal
          handleClose={handleCloseCreateStoryModal}
          open={openCreateStoryModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
