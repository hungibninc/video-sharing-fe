import { useState, useEffect } from 'react';
import Video from '../components/video';
import { getVideo } from '../services/service';
import { IVideo } from '../@types/video';

const Videos: React.FC = () => {
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
    <section className='pt-14'>
      {msgError && (
        <div
          className='relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'
          role='alert'
        >
          {msgError}
        </div>
      )}

      {videos && (
        <div className='video-list'>
          {videos
            ? videos.map((video) => <Video key={video.id} video={video} />)
            : 'Wait for new video'}
        </div>
      )}
    </section>
  );
};

export default Videos;
