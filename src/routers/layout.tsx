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

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);

const Layout = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const { email, setEmail } = useContext(AuthContext);

  /** socket */
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [notification, setNotification] = useState<IShare[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected.');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected.');
      setIsConnected(false);
    });

    socket.on('share', (e) => {
      console.log(e);
      console.log(email);
      setNotification((notification) => [e, ...notification]);
      // if (email && email !== e.email) setNotification(e);
      // setNotification(e);
    });

    return () => {
      console.log('socket.off');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('share');
    };
  }, []);
  /** socket */

  /** check auth */
  useEffect(() => {
    auth().then(
      (res) => {
        setAuthenticated(true);
        setEmail(res.email);
      },
      () => {
        // no auth
      }
    );
  }, []);
  /** check auth */

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
