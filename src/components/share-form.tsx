import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IMessage } from '../@types/message';
import { shareVideo } from '../services/service';

const ShareForm: React.FC = () => {
  const [msg, setMsg] = useState<IMessage>({ type: 0, msg: '' });

  const initialValues: {
    url: string;
  } = {
    url: '',
  };

  const validationSchema = Yup.object().shape({
    url: Yup.string()
      .required('Please enter Youtube Url')
      .min(8, 'Password must be at least 8 characters'),
  });

  return (
    <>
      <div className='pt-14'>
        {msg.type != 0 && (
          <div className={msg.type === 2 ? 'error-message' : 'success-message'}>
            {msg.msg}
          </div>
        )}
        <div className='relative m-auto max-w-lg border border-black px-5 pb-5 pt-10'>
          <h1 className='absolute -top-6 bg-white p-1 text-lg'>
            Share a Youtube movie
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              const { url } = values;

              //  reset message
              setMsg({ type: 0 });

              shareVideo(url).then(
                () => {
                  actions.resetForm();
                  setMsg({ type: 1, msg: 'Thanks for your Youtube video' });
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
            }}
          >
            <Form>
              <div className='mb-6 md:flex md:items-center'>
                <div className='md:w-1/3'>
                  <label htmlFor='url'>Youtube Url:</label>
                </div>
                <div className='md:w-2/3'>
                  <Field
                    name='url'
                    type='text'
                    className='form-control w-full'
                    placeholder='https://www.youtube.com/watch?v=JJEKPqSlXvk'
                  />
                  <ErrorMessage
                    name='url'
                    component='div'
                    className='form-error-message'
                  />
                </div>
              </div>
              <div className='md:flex md:items-center'>
                <div className='md:w-1/3'></div>
                <div className='md:w-2/3'>
                  <button className='button w-full' type='submit'>
                    Share
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ShareForm;
