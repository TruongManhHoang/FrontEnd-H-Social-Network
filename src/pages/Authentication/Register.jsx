import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
};
// const validationSchema={email:Yup.string().email("Invalid email").required("Email is required"),
//   password:Yup.String().min(6, "Password must be least 6 character").required("Password is required")
// };
export const Register = () => {
  const [gender, setGender] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    values.gender = gender;
    console.log('handle submit', values);
    dispatch(registerUserAction({ data: values }));
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div>
            <Field
              as={TextField}
              name="firstName"
              placeholder="First Name"
              type="text"
              varian="outlined"
              fullWidth
            />
            <ErrorMessage
              name="firstName"
              component={'div'}
              className="text-red-500"
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="lastName"
              placeholder="Last Name"
              type="text"
              varian="outlined"
              fullWidth
            />
            <ErrorMessage
              name="lastName"
              component={'div'}
              className="text-red-500"
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="email"
              placeholder="Email"
              type="email"
              varian="outlined"
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
              varian="outlined"
              fullWidth
            />
            <ErrorMessage
              name="password"
              component={'div'}
              className="text-red-500"
            />
          </div>
          <div>
            <RadioGroup
              row
              aria-labelledby="gender"
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="other"
              />
              <ErrorMessage
                name="gender"
                component={'div'}
                className="text-red-500"
              />
            </RadioGroup>
          </div>
          <Button
            sx={{ padding: '.8rem 0rem' }}
            fullWidth
            type="submit"
            variant="contained" // Corrected variant spelling
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center mt-4">
        <p>If you have already account?</p>
        <Button onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Register;
