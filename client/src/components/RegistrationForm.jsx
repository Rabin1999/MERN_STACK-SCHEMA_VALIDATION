import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    gender: '',
    course: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    gender: Yup.string().required('Gender is required'),
    course: Yup.string().required('Course is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:5000/api/students', values)
      .then(response => {
        console.log(response.data);
        setSubmitting(false);
        navigate('/thank-you'); // Navigate to Thank You page
      })
      .catch(error => {
        console.error('There was an error!', error);
        setSubmitting(false);
      });
  };

  return (
    <div className="form-container">
      <h1>Student Registration</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div role="group" aria-labelledby="gender-group">
                <label>
                  <Field type="radio" name="gender" value="male" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  Female
                </label>
                <label>
                  <Field type="radio" name="gender" value="other" />
                  Other
                </label>
              </div>
              <ErrorMessage name="gender" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="course">Course</label>
              <Field as="select" id="course" name="course">
                <option value="">Select a course</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
                <option value="course3">Course 3</option>
              </Field>
              <ErrorMessage name="course" component="div" className="error" />
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
