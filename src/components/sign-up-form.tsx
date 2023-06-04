import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IMessage } from '../@types/message';
import { signup } from '../services/service';
import { AuthContext } from '../context/auth';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const { setAuthenticated, setEmail } = useContext(AuthContext);
  const [msg, setMsg] = useState<IMessage>({ type: 0, msg: '' });

  const initialValues: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  } = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .required('Please enter your email address')
      .email('Please enter a valid email address'),
    password: Yup.string()
      .required('Please enter your password')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const handleSignUpForm = (formValue: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { name, email, password } = formValue;

    //  reset message
    setMsg({ type: 0 });

    signup(name, email, password).then(
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
        setMsg({ type: 2, msg: resMessage });
      }
    );
  };

  return (
    <div className='pt-14'>
      {msg.type != 0 && (
        <div className={msg.type === 2 ? 'error-message' : 'success-message'}>
          {msg.msg}
        </div>
      )}
      <div className='relative m-auto max-w-lg border border-black px-5 pb-5 pt-10'>
        <h1 className='absolute -top-6 bg-white p-1 text-lg'>Create account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUpForm}
        >
          <Form>
            <div className='mb-6 md:flex md:items-center'>
              <div className='md:w-1/3'>
                <label htmlFor='name'>Name</label>
              </div>
              <div className='md:w-2/3'>
                <Field
                  name='name'
                  type='text'
                  className='form-control w-full'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className='form-error-message'
                />
              </div>
            </div>
            <div className='mb-6 md:flex md:items-center'>
              <div className='md:w-1/3'>
                <label htmlFor='email'>Email</label>
              </div>
              <div className='md:w-2/3'>
                <Field
                  name='email'
                  type='text'
                  className='form-control w-full'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='form-error-message'
                />
              </div>
            </div>
            <div className='mb-6 md:flex md:items-center'>
              <div className='md:w-1/3'>
                <label htmlFor='password'>Password</label>
              </div>
              <div className='md:w-2/3'>
                <Field
                  name='password'
                  type='password'
                  className='form-control w-full'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='form-error-message'
                />
              </div>
            </div>
            <div className='mb-6 md:flex md:items-center'>
              <div className='md:w-1/3'>
                <label htmlFor='password1'>Repeat Password</label>
              </div>
              <div className='md:w-2/3'>
                <Field
                  name='confirmPassword'
                  type='password'
                  className='form-control w-full'
                />
                <ErrorMessage
                  name='confirmPassword'
                  component='div'
                  className='form-error-message'
                />
              </div>
            </div>
            <div className='md:flex md:items-center'>
              <div className='md:w-1/3'></div>
              <div className='md:w-2/3'>
                <button className='button w-full' type='submit'>
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
