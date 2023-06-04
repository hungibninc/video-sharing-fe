import { useState, useEffect } from 'react';
import Video from '../components/video';
import { getVideo } from '../services/service';
import { IVideo } from '../@types/video';

const Home = () => {
  const [msgError, setMsgError] = useState<string>('');
  const [videos, setVideos] = useState<IVideo[]>([]);

  //  get video list
  useEffect(() => {
    const videolist = async () => {
      getVideo().then(
        (response) => {
          setVideos(response.data);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMsgError(resMessage);
        }
      );
    };
    videolist();
  }, []);

  return (
    <section className='dark:bg-gray-800 dark:text-gray-100'>
      {msgError ? (
        <div
          className='relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'
          role='alert'
        >
          {msgError}
        </div>
      ) : (
        videos && (
          <div className='video-list'>
            {videos.map((video) => (
              <Video key={video.id} video={video} />
            ))}
          </div>
        )
      )}

      {}
    </section>
  );
};

export default Home;
