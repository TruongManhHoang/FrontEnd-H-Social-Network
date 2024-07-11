import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import {
  useLocation,
  Routes,
  Route,
} from 'react-router-dom';
import HomeRight from '../../Components/HomeRight/HomeRight';
import SideBar from '../../Components/Sidebar/SideBar';
import MiddlePart from '../../Components/MiddlePart/MiddlePart';
import Profile from '../../Components/Profile/Profile';
import Reels from '../../Components/Reels/Reels';
import CreateReelsForm from '../../Components/CreateReelsForm/CreateReelsForm';
import { getProfileAction } from '../../Redux/Auth/auth.action';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isProfileRoute =
    location.pathname.includes('/profile');

  const jwt = localStorage.getItem('jwt');

  const { auth } = useSelector((store) => store);
  console.log('auth', auth);
  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, [dispatch, jwt]);
  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <SideBar />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          lg={isProfileRoute ? 9 : 6}
          className="px-5 flex justify-center"
        >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="reels" element={<Reels />} />
            <Route
              path="create-reels"
              element={<CreateReelsForm />}
            />
            <Route
              path="profile/:id"
              element={<Profile />}
            />
          </Routes>
        </Grid>
        {!isProfileRoute && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
