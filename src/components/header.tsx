import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { logout, signin } from '../services/service';
import eventBus from '../utils/event-bus';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const { authenticated, setAuthenticated, email, setEmail } =
    useContext(AuthContext);
  const [message, setMessage] = useState<string>('');

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please enter your email address')
      .email('Please enter a valid email address'),
    password: Yup.string()
      .required('Please enter your password')
      .min(8, 'Password must be at least 8 characters'),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    //  reset message
    setMessage('');

    signin(email, password).then(
      (res) => {
        setAuthenticated(true);
        setEmail(res.email);
        eventBus.dispatch('logout');
        navigate('/share');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  const logOut = () => {
    logout().then(
      () => {
        setAuthenticated(false);
        setEmail('');
        if (window.location.pathname !== '/') {
          navigate('/');
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className='header'>
      <div>
        <Link className='logo' to='/' title='Funny Movies Logo'>
          <img src={logo} alt='Funny Video logo' />
          <span className='Helvetica-Bold text-3xl font-bold tracking-tight'>
            Funny Movies
          </span>
        </Link>
      </div>
      {authenticated ? (
        <div className='container-user'>
          <div className='pt-1'>Welcome {email}</div>
          <div>
            <Link className='button' to='/share'>
              Share a Movie
            </Link>
            <button type='submit' className='button ml-2' onClick={logOut}>
              <span>Logout</span>
            </button>
          </div>
        </div>
      ) : (
        <div className='login'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className='container-user-form'>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <Field
                    name='email'
                    type='text'
                    className='form-control'
                    placeholder='email'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='form-error-message'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <Field
                    name='password'
                    type='password'
                    className='form-control'
                    placeholder='password'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='form-error-message'
                  />
                  {message && (
                    <div className='form-error-message' role='alert'>
                      {message}
                    </div>
                  )}
                </div>

                <div className='form-group'>
                  <button
                    type='submit'
                    className='button'
                    aria-label='login-btn'
                  >
                    <span>Login</span>
                  </button>
                </div>
                <div className='form-group'>
                  <Link className='button' to='/register'>
                    Register
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Header;
