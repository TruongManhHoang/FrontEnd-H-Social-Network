import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom'; // Corrected import for navigate

const initialValues = { email: '', password: '' };

// Uncomment and define validation schema using Yup for form validation
// import * as Yup from 'yup';
// const validationSchema = Yup.object({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
// });

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Corrected function name

  const handleSubmit = (values) => {
    console.log('handle submit', values);
    dispatch(loginUserAction({ data: values }));
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema} // Uncomment after defining validation schema
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div>
            <Field
              as={TextField}
              name="email"
              placeholder="Email"
              type="email"
              variant="outlined" // Corrected variant spelling
              fullWidth
            />
            <ErrorMessage
              name="email"
              component={'div'}
              className="text-red-500"
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="password"
              placeholder="Password"
              type="password"
              variant="outlined" // Corrected variant spelling
              fullWidth
            />
            <ErrorMessage
              name="password"
              component={'div'}
              className="text-red-500"
            />
          </div>
          <Button
            sx={{ padding: '.8rem 0rem' }}
            fullWidth
            type="submit"
            variant="contained" // Corrected variant spelling
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center mt-4">
        <p>If you don't have an account?</p>
        <Button onClick={() => navigate('/register')}>
          Register
        </Button>
      </div>
    </>
  );
};

export default Login;
