import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from './Redux/Auth/auth.action';

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem('jwt');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt)).finally(() =>
        setLoading(false)
      );
    } else {
      setLoading(false);
    }
  }, [dispatch, jwt]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
      <Route
        path="/*"
        element={
          auth.user ? <HomePage /> : <Authentication />
        }
      />
      <Route
        path="/message"
        element={
          auth.user ? <Message /> : <Authentication />
        }
      />
    </Routes>
  );
}

export default App;
