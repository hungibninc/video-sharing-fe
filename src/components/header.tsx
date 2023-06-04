import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { logout, signin } from '../services/service';

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
          <svg
            className='mr-1'
            fill='#000000'
            width='40px'
            height='40px'
            viewBox='0 -32 576 576'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z' />
          </svg>
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
                  <button type='submit' className='button'>
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
