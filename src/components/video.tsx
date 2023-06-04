import { FC } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { IVideo } from '../@types/video';
import { getYoutubeId } from '../utils/utils';

type VideoProps = {
  video: IVideo;
};

const Video: FC<VideoProps> = ({ video }) => {
  //  youtube player
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };
  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '360',
    playerVars: {
      autoplay: 0,
    },
  };

  const description =
    'Description:<br />' + video.desc.replace(/(\r\n|\r|\n)/g, '<br />');

  return (
    <div className='video-item'>
      <YouTube
        videoId={getYoutubeId(video.url)}
        opts={opts}
        onReady={onPlayerReady}
        className='video-player'
      />

      <div className='space-y-2 lg:col-span-7'>
        <h3 className='title'>{video.title}</h3>
        <p className='dark:text-gray-400'>
          Shared by: <a href='#'>{video.email}</a>
        </p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default Video;
