import { useContext } from 'react';
import { IShare } from '../@types/share';
import { AuthContext } from '../context/auth';

const Notification = ({ notification }: { notification: IShare[] }) => {
  const { email } = useContext(AuthContext);
  return (
    <>
      {notification?.map((notification, index) => {
        return (
          <div key={index} className=''>
            {email != notification.email && (
              <p>
                {notification.title} just added from{' '}
                <strong>{notification.name}</strong>
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Notification;
