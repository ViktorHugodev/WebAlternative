import 'videojs-youtube'

const PlayerCSS = () => {
  return (
    <>
      <h1>The implementation below is without react functions</h1>
      <div data-vjs-player>
        <video
          id="my-video"
          className="video-js vjs-theme-city"
          // playsInline
          controls
          preload="auto"
          width="400"
          height="300"
          data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=IkOVe40Sy0U"}] }'
        ></video>
      </div>
    </>
  )
}

export default PlayerCSS