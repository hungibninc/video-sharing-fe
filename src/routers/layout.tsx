import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import {
  IShare,
  ServerToClientEvents,
  ClientToServerEvents,
} from '../@types/share';
import '../assets/tailwind/tailwind.output.css';

import { auth } from '../services/service';
import { AuthContext } from '../context/auth';
import Header from '../components/header';
import Notification from '../components/notification';
import eventBus from '../utils/event-bus';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);

const Layout = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const { setEmail } = useContext(AuthContext);

  /** check auth */
  useEffect(() => {
    auth().then((res) => {
      setAuthenticated(true);
      setEmail(res.email);
    });
  }, []);
  /** check auth */

  /** notify new video */
  const [notification, setNotification] = useState<IShare[]>([]);

  useEffect(() => {
    socket.on('share', (e) => {
      setNotification([e]);
    });

    eventBus.on('logout', resetNotification);

    return () => {
      socket.off('share');
      eventBus.remove('logout', resetNotification);
    };
  }, []);

  //  reset Notification event when logout
  const resetNotification = () => {
    setNotification([]);
  };
  /** notify new video */

  return (
    <div className='container mx-auto mb-20 px-4'>
      <Header />
      <div className='content'>
        {authenticated && notification && (
          <Notification notification={notification}></Notification>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
