import { useContext, useEffect } from 'react';
import { IShare } from '../@types/share';
import { AuthContext } from '../context/auth';
import { Alert, Modal, Ripple, initTE } from 'tw-elements';

const Notification: React.FC<{ notification: IShare[] }> = ({
  notification,
}) => {
  const { email } = useContext(AuthContext);

  useEffect(() => {
    initTE({ Alert, Modal, Ripple });
  });

  return (
    <>
      {notification?.map((notify, index) => {
        if (notify.email != email) {
          return (
            <div key={index}>
              <div
                className='mb-3 hidden w-full items-center rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800 data-[te-alert-show]:inline-flex'
                role='alert'
                data-te-alert-init
                data-te-alert-show
                data-te-autohide='true'
              >
                {notify.name} just added new video {notify.title}
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Notification;
