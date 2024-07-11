import React from 'react';
import { Card, Grid } from '@mui/material';
import Register from './Register';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';

const Authentication = () => {
  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={7}
          className="h-screen overflow-hidden"
        >
          <img
            className="h-full w-full"
            src="https://cdn1.123job.vn/123job/uploads/2020/05/26/2020_05_26______b7f56c42360eeac406ffdd7bca0c9bbd.jpg"
            alt="Background"
          />
        </Grid>
        <Grid item xs={5}>
          <div className="px-20 flex justify-center items-center h-screen">
            <Card className="card p-8 w-full">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center">
                  H Social
                </h1>
                <p className="text-center text-sm w-[70&]">
                  Connecting Lives, Sharing Stories: Your
                  Social World, Your Way
                </p>
              </div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/register"
                  element={<Register />}
                />
              </Routes>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
